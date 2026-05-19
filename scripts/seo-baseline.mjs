import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { createHash } from 'crypto';

const urls = [
  'https://tupbebek.com/',
  'https://tupbebek.com/makaleler/',
  'https://tupbebek.com/makaleler/tup-bebek-nedir/',
  'https://tupbebek.com/makaleler/pgt-a-bas-editor-kosesi/',
  'https://tupbebek.com/makaleler/era-testi-bas-editor-kosesi/',
  'https://tupbebek.com/makaleler/yumurta-dondurma-rehberi/',
  'https://tupbebek.com/makaleler/hidrosalpinx-ve-kisirlik/',
  'https://tupbebek.com/makaleler/pcos-yeni-adi-pmos/',
];

const extract = (html, regex) => {
  const m = html.match(regex);
  return m ? m[1].trim() : null;
};
const extractAll = (html, regex) => {
  const out = [];
  let m;
  const re = new RegExp(regex, 'gi');
  while ((m = re.exec(html)) !== null) out.push(m[1].trim());
  return out;
};

const snapshots = [];
for (const url of urls) {
  try {
    const res = await fetch(url);
    const status = res.status;
    const html = await res.text();
    const hash = createHash('sha256').update(html).digest('hex').slice(0, 16);

    const snap = {
      url,
      status,
      title: extract(html, /<title>([^<]+)<\/title>/i),
      description: extract(html, /<meta\s+name=["']description["']\s+content=["']([^"']+)/i),
      canonical: extract(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)/i),
      robots: extract(html, /<meta\s+name=["']robots["']\s+content=["']([^"']+)/i),
      og: {
        title: extract(html, /<meta\s+property=["']og:title["']\s+content=["']([^"']+)/i),
        description: extract(html, /<meta\s+property=["']og:description["']\s+content=["']([^"']+)/i),
        image: extract(html, /<meta\s+property=["']og:image["']\s+content=["']([^"']+)/i),
        type: extract(html, /<meta\s+property=["']og:type["']\s+content=["']([^"']+)/i),
      },
      h1: extractAll(html, '<h1[^>]*>([^<]+)</h1>'),
      h2Count: (html.match(/<h2[^>]*>/gi) || []).length,
      h3Count: (html.match(/<h3[^>]*>/gi) || []).length,
      imgCount: (html.match(/<img\s/gi) || []).length,
      figureCount: (html.match(/<figure[^>]*>/gi) || []).length,
      jsonLdCount: (html.match(/<script[^>]*type=["']application\/ld\+json["']/gi) || []).length,
      htmlSizeBytes: html.length,
      htmlHash: hash,
    };
    snapshots.push(snap);
    console.log(`✓ ${url} (${status}, ${Math.round(html.length/1024)}KB, hash:${hash})`);
  } catch (e) {
    snapshots.push({ url, error: e.message });
    console.log(`✗ ${url}: ${e.message}`);
  }
}

const baseline = {
  capturedAt: new Date().toISOString(),
  capturedBy: 'manual-baseline-script',
  context: 'Post-imagery-overhaul + drafts cleanup + medical-reviewer schema change. Branch claude/determined-goldstine-a3e5ae, commit 7ac85de7+.',
  urls: snapshots,
};

if (!existsSync('.seo-baselines')) await mkdir('.seo-baselines');
const file = `.seo-baselines/baseline-${new Date().toISOString().slice(0,10)}.json`;
await writeFile(file, JSON.stringify(baseline, null, 2));
console.log(`\nBaseline saved: ${file}`);
console.log(`Captured ${snapshots.length} URLs.`);
