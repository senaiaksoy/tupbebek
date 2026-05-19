import { readFile } from 'fs/promises';

const baselinePath = '.seo-baselines/baseline-2026-05-19.json';
const sample = JSON.parse(await readFile(baselinePath, 'utf-8'));

// Build expanded URL list — sample + crawl sitemap for breadth
const seed = sample.urls.map(u => u.url).filter(Boolean);

// Pull sitemap for full coverage
let allUrls = [...seed];
try {
  const sm = await fetch('https://tupbebek.com/sitemap-index.xml').then(r => r.text());
  const subs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  for (const sub of subs) {
    const child = await fetch(sub).then(r => r.text()).catch(() => '');
    const urls = [...child.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
    allUrls.push(...urls);
  }
} catch (e) {
  console.log('Sitemap fetch failed:', e.message);
}
allUrls = [...new Set(allUrls)];
console.log(`Auditing ${allUrls.length} URLs for OG meta + image dimensions...\n`);

const probeImage = async (url) => {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    if (!res.ok) return { ok: false, status: res.status };
    const ct = res.headers.get('content-type') || '';
    const len = res.headers.get('content-length');
    return { ok: true, contentType: ct, sizeBytes: len ? parseInt(len) : null };
  } catch (e) {
    return { ok: false, error: e.message };
  }
};

// We can't get image dimensions from HEAD alone — parse from URL filename if available, otherwise fetch a chunk
const dimsFromUrl = (url) => {
  const m = url.match(/(\d{3,4})x(\d{3,4})/);
  return m ? { w: parseInt(m[1]), h: parseInt(m[2]) } : null;
};

const fetchImageDims = async (url) => {
  // For optimization, fetch first 32KB and parse with image-size — but pure JS sniff:
  try {
    const res = await fetch(url, { headers: { Range: 'bytes=0-65535' } });
    const buf = Buffer.from(await res.arrayBuffer());
    // JPEG
    if (buf[0] === 0xFF && buf[1] === 0xD8) {
      let off = 2;
      while (off < buf.length) {
        if (buf[off] !== 0xFF) break;
        const marker = buf[off + 1];
        const segLen = buf.readUInt16BE(off + 2);
        if (marker >= 0xC0 && marker <= 0xCF && marker !== 0xC4 && marker !== 0xC8 && marker !== 0xCC) {
          const h = buf.readUInt16BE(off + 5);
          const w = buf.readUInt16BE(off + 7);
          return { w, h };
        }
        off += 2 + segLen;
      }
    }
    // PNG
    if (buf[0] === 0x89 && buf[1] === 0x50) {
      const w = buf.readUInt32BE(16);
      const h = buf.readUInt32BE(20);
      return { w, h };
    }
    // WebP
    if (buf.slice(0, 4).toString() === 'RIFF' && buf.slice(8, 12).toString() === 'WEBP') {
      const fourcc = buf.slice(12, 16).toString();
      if (fourcc === 'VP8X') {
        const w = (buf.readUIntLE(24, 3)) + 1;
        const h = (buf.readUIntLE(27, 3)) + 1;
        return { w, h };
      } else if (fourcc === 'VP8 ') {
        const w = buf.readUInt16LE(26) & 0x3fff;
        const h = buf.readUInt16LE(28) & 0x3fff;
        return { w, h };
      } else if (fourcc === 'VP8L') {
        const b1 = buf.readUInt32LE(21);
        const w = (b1 & 0x3fff) + 1;
        const h = (((b1 >> 14) & 0x3fff)) + 1;
        return { w, h };
      }
    }
    return null;
  } catch {
    return null;
  }
};

const results = [];
const ogImages = new Map(); // dedupe image fetches

for (const url of allUrls) {
  try {
    const html = await fetch(url).then(r => r.text());
    // Match content="..." or content='...' — quote-aware, so apostrophes inside
    // double-quoted content are not treated as terminators.
    const metaProp = (name) => {
      const m = html.match(new RegExp(`<meta\\s+property=["']${name}["']\\s+content=("([^"]*)"|'([^']*)')`, 'i'));
      return m ? (m[2] ?? m[3]) : undefined;
    };
    const metaName = (name) => {
      const m = html.match(new RegExp(`<meta\\s+name=["']${name}["']\\s+content=("([^"]*)"|'([^']*)')`, 'i'));
      return m ? (m[2] ?? m[3]) : undefined;
    };
    const og = {
      title: metaProp('og:title'),
      desc: metaProp('og:description'),
      image: metaProp('og:image'),
      type: metaProp('og:type'),
      width: metaProp('og:image:width'),
      height: metaProp('og:image:height'),
      alt: metaProp('og:image:alt'),
    };
    const tw = {
      card: metaName('twitter:card'),
      image: metaName('twitter:image'),
    };

    let dims = null;
    let imgInfo = null;
    if (og.image) {
      if (ogImages.has(og.image)) {
        ({ dims, imgInfo } = ogImages.get(og.image));
      } else {
        imgInfo = await probeImage(og.image);
        dims = await fetchImageDims(og.image);
        ogImages.set(og.image, { dims, imgInfo });
      }
    }

    results.push({ url, og, tw, dims, imgInfo });
  } catch (e) {
    results.push({ url, error: e.message });
  }
}

// Report
const missing = results.filter(r => !r.og?.image);
const noAlt = results.filter(r => r.og?.image && !r.og?.alt);
const noDims = results.filter(r => r.og?.image && (!r.og?.width || !r.og?.height));
const noTwitter = results.filter(r => !r.tw?.card);

console.log('--- SUMMARY ---');
console.log(`Total URLs: ${results.length}`);
console.log(`Missing og:image: ${missing.length}`);
console.log(`Missing og:image:alt: ${noAlt.length}`);
console.log(`Missing og:image:width/height: ${noDims.length}`);
console.log(`Missing twitter:card: ${noTwitter.length}`);
console.log(`Unique og:image URLs: ${ogImages.size}`);

// Dimension analysis
console.log('\n--- DIMENSION ANALYSIS (actual fetched) ---');
const ratios = new Map();
for (const [url, { dims }] of ogImages) {
  if (!dims) continue;
  const ratio = (dims.w / dims.h).toFixed(2);
  const key = `${dims.w}x${dims.h} (${ratio}:1)`;
  ratios.set(key, (ratios.get(key) || 0) + 1);
}
for (const [k, v] of [...ratios].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k} — ${v} image(s)`);
}

// Show 5 representative with full meta
console.log('\n--- SAMPLE (first 5 with full meta) ---');
for (const r of results.slice(0, 5)) {
  if (r.error) { console.log(`\n${r.url} — ERROR ${r.error}`); continue; }
  console.log(`\n${r.url}`);
  console.log(`  og:title  : ${r.og.title?.slice(0, 70)}`);
  console.log(`  og:image  : ${r.og.image}`);
  console.log(`  og:width/h: ${r.og.width || '—'} × ${r.og.height || '—'}  (declared)`);
  if (r.dims) console.log(`  fetched   : ${r.dims.w} × ${r.dims.h}  (ratio ${(r.dims.w / r.dims.h).toFixed(3)}:1)`);
  console.log(`  og:alt    : ${r.og.alt ? r.og.alt.slice(0, 80) : '(MISSING)'}`);
  console.log(`  twitter   : card=${r.tw.card} image=${r.tw.image ? 'yes' : '(MISSING)'}`);
  if (r.imgInfo?.sizeBytes) console.log(`  size      : ${(r.imgInfo.sizeBytes / 1024).toFixed(1)} KB ${r.imgInfo.contentType}`);
}

// Issue list
if (missing.length || noAlt.length || noDims.length) {
  console.log('\n--- ISSUES ---');
  if (missing.length) {
    console.log(`\nMissing og:image (${missing.length}):`);
    for (const r of missing.slice(0, 10)) console.log(`  - ${r.url}`);
  }
  if (noAlt.length) {
    console.log(`\nMissing og:image:alt (${noAlt.length}):`);
    for (const r of noAlt.slice(0, 10)) console.log(`  - ${r.url}`);
  }
  if (noDims.length) {
    console.log(`\nMissing og:image:width/height meta (${noDims.length}):`);
    for (const r of noDims.slice(0, 10)) console.log(`  - ${r.url}`);
  }
}

// Save full report
await import('fs/promises').then(fs => fs.writeFile('.seo-baselines/og-audit.json', JSON.stringify({ capturedAt: new Date().toISOString(), summary: { total: results.length, missingImage: missing.length, missingAlt: noAlt.length, missingDims: noDims.length, missingTwitter: noTwitter.length, uniqueImages: ogImages.size }, results }, null, 2)));
console.log('\nFull report: .seo-baselines/og-audit.json');
