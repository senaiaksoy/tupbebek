import sharp from 'sharp';
import { readdirSync, statSync, existsSync, mkdirSync, unlinkSync, readFileSync, writeFileSync } from 'fs';
import { isTagged, tagBuffer } from './tag-ai-images.mjs';
import { join, dirname, basename } from 'path';

const PUBLIC_DIR = join(process.cwd(), 'public/images');

function getAllFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      files.push(...getAllFiles(fullPath));
    } else if (/\.(jpg|jpeg|png|gif)$/i.test(entry)) {
      files.push(fullPath);
    }
  }
  return files;
}

const files = getAllFiles(PUBLIC_DIR);
console.log(`Found ${files.length} images to convert\n`);

let totalSaved = 0;
const results = [];

for (const file of files) {
  const dir = dirname(file);
  const name = basename(file);
  const ext = name.split('.').pop().toLowerCase();
  const webpName = name.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
  const webpPath = join(dir, webpName);

  // Skip if already exists and target is smaller
  const originalSize = statSync(file).size;

  const img = sharp(file);
  const metadata = await img.metadata();
  const quality = metadata.width > 1200 ? 75 : 80;

  const buf = await img
    .webp({ quality, effort: 6 })
    .toBuffer();

  const webpSize = buf.length;

  if (existsSync(webpPath) && statSync(webpPath).size <= webpSize) {
    console.log(`  ⏭️  ${name} (WebP already optimal)`);
    continue;
  }

  // sharp metadata'yı atar; kaynaktaki IPTC yapay zekâ etiketini WebP'ye taşı.
  writeFileSync(webpPath, isTagged(readFileSync(file)) ? tagBuffer(buf, '.webp') ?? buf : buf);

  const saved = originalSize - webpSize;
  const pct = ((saved / originalSize) * 100).toFixed(1);
  totalSaved += saved;
  results.push({ name, originalSize, webpSize, pct });

  console.log(`  ✅ ${name} → ${webpName} (${(originalSize/1024).toFixed(0)}K → ${(webpSize/1024).toFixed(0)}K, -${pct}%)`);
}

console.log(`\n---`);
console.log(`Converted ${results.length} images`);
console.log(`Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB (${((totalSaved / results.reduce((sum, r) => sum + r.originalSize, 0)) * 100).toFixed(1)}%)`);
