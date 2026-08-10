import fs from 'node:fs';
import path from 'node:path';

const host = 'tupbebek.com';
const key = process.env.INDEXNOW_KEY || '0f4d9a83c7e24156b8a1d36e5f729c04';
const keyLocation = `https://${host}/${key}.txt`;
const endpoint = 'https://api.indexnow.org/indexnow';
const distDir = path.resolve('dist');

function sitemapUrls() {
  if (!fs.existsSync(distDir)) {
    throw new Error('dist bulunamadı. --sitemap kullanmadan önce npm run build çalıştırın.');
  }

  return fs.readdirSync(distDir)
    .filter((fileName) => /^sitemap.*\.xml$/u.test(fileName))
    .flatMap((fileName) => {
      const xml = fs.readFileSync(path.join(distDir, fileName), 'utf8');
      return [...xml.matchAll(/<loc>(https:\/\/tupbebek\.com\/[^<]+)<\/loc>/gu)]
        .map((match) => match[1])
        .filter((url) => !/\/sitemap[^/]*\.xml$/u.test(url));
    });
}

function parseUrls(args) {
  const useSitemap = args.includes('--sitemap');
  const explicit = args
    .filter((arg) => arg !== '--sitemap')
    .flatMap((arg) => arg.split(','))
    .map((arg) => arg.trim())
    .filter(Boolean);
  const candidates = useSitemap ? [...explicit, ...sitemapUrls()] : explicit;
  const urls = [...new Set(candidates)];

  for (const value of urls) {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.hostname !== host) {
      throw new Error(`Yalnızca https://${host}/ URL'leri gönderilebilir: ${value}`);
    }
  }

  if (urls.length === 0) {
    throw new Error('Gönderilecek URL yok. URL verin veya --sitemap kullanın.');
  }
  if (urls.length > 10_000) {
    throw new Error(`IndexNow tek istekte en fazla 10000 URL kabul eder; bulunan: ${urls.length}.`);
  }
  return urls;
}

async function main() {
  const urlList = parseUrls(process.argv.slice(2));
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key, keyLocation, urlList }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`IndexNow HTTP ${response.status}: ${body.slice(0, 500)}`);
  }

  console.log(`IndexNow accepted ${urlList.length} URL(s) for ${host}.`);
}

main().catch((error) => {
  console.error(`IndexNow submission failed: ${error.message}`);
  process.exit(1);
});
