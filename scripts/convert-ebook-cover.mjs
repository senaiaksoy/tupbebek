// Generate responsive WebP variants for the e-kitap cover image.
// Source: 2816×1536 JPEG (~3.3 MB) — rendered at ~560px column width.
// Output: 480w / 768w / 1200w / 1600w WebP + 1200w JPEG fallback.
import sharp from 'sharp';
import fs from 'node:fs';

const input = 'public/e-kitap/images/cover.jpg';
const widths = [480, 768, 1200, 1600];

for (const w of widths) {
  const out = `public/e-kitap/images/cover-${w}.webp`;
  await sharp(input)
    .resize({ width: w, withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toFile(out);
  const size = fs.statSync(out).size;
  console.log(`${out}: ${(size / 1024).toFixed(1)} KB`);
}

// JPEG fallback at the median size for browsers without WebP.
const jpgOut = 'public/e-kitap/images/cover-1200.jpg';
await sharp(input)
  .resize({ width: 1200, withoutEnlargement: true })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(jpgOut);
console.log(`${jpgOut}: ${(fs.statSync(jpgOut).size / 1024).toFixed(1)} KB`);
