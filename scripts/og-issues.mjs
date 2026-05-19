// Extract all problematic OG images from og-audit.json grouped by issue
import { readFile } from 'fs/promises';
const d = JSON.parse(await readFile('.seo-baselines/og-audit.json', 'utf-8'));

const groups = {
  oversizeRaw: [],     // >= 3000px width (5504×3072, 3072×2048)
  bannerWide: [],      // ratio > 2.2 (1440×500, 1440×497, 1235×338, 1440×550, 2880×1000)
  metaMismatch: [],    // declared != actual
  altGeneric: [],      // alt < 20 chars or matches "Doç. Dr." only
};

for (const r of d.results) {
  if (!r.dims || !r.og?.image) continue;
  const { w, h } = r.dims;
  const ratio = w / h;
  const declaredW = parseInt(r.og.width);
  const declaredH = parseInt(r.og.height);

  if (w >= 3000) groups.oversizeRaw.push({ url: r.url, img: r.og.image, w, h, ratio: ratio.toFixed(2) });
  if (ratio > 2.2) groups.bannerWide.push({ url: r.url, img: r.og.image, w, h, ratio: ratio.toFixed(2) });
  if (declaredW !== w || declaredH !== h) groups.metaMismatch.push({ url: r.url, img: r.og.image, declared: `${declaredW}x${declaredH}`, actual: `${w}x${h}` });
  if (r.og.alt && (r.og.alt.length < 20 || /^Doç\. Dr\. Senai Aksoy$/i.test(r.og.alt.trim()))) groups.altGeneric.push({ url: r.url, alt: r.og.alt });
}

// Dedupe by image url
const uniq = (arr, key) => [...new Map(arr.map(x => [x[key], x])).values()];

console.log('=== Oversize RAW (>=3000px) ===', groups.oversizeRaw.length, 'pages,', uniq(groups.oversizeRaw, 'img').length, 'unique images');
for (const x of uniq(groups.oversizeRaw, 'img')) console.log(`  ${x.w}x${x.h} (${x.ratio}:1) — ${x.img}`);

console.log('\n=== Banner wide (>2.2:1) ===', groups.bannerWide.length, 'pages,', uniq(groups.bannerWide, 'img').length, 'unique images');
for (const x of uniq(groups.bannerWide, 'img')) console.log(`  ${x.w}x${x.h} (${x.ratio}:1) — ${x.img}`);

console.log('\n=== Meta mismatch ===', groups.metaMismatch.length);
for (const x of uniq(groups.metaMismatch, 'img')) console.log(`  declared=${x.declared} actual=${x.actual} — ${x.img}`);

console.log('\n=== Alt generic/short ===', groups.altGeneric.length);
for (const x of groups.altGeneric) console.log(`  "${x.alt}" — ${x.url}`);
