/**
 * Resize homepage guide card images to display-appropriate width (PSI oversizing).
 * Run via prebuild; updates files in place and refreshes image manifest.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const TARGET_WIDTH = 800;

const targets = [
  'public/images/home/erkek-infertilitesi.webp',
  'public/images/home/kadin-infertilitesi.webp',
];

async function resizeInPlace(relPath) {
  const abs = path.resolve(relPath);
  const meta = await sharp(abs).metadata();
  if ((meta.width ?? TARGET_WIDTH) <= TARGET_WIDTH) {
    console.log(`[resize] skip ${relPath} (${meta.width}px)`);
    return;
  }

  const before = (await fs.stat(abs)).size;
  const buffer = await sharp(abs)
    .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toBuffer();

  const outPath = `${abs}.new`;
  await fs.writeFile(outPath, buffer);
  await fs.rm(abs, { force: true });
  await fs.rename(outPath, abs);
  console.log(`[resize] ${relPath}: ${before} → ${buffer.length} bytes`);
}

async function recompressLogo() {
  const abs = path.resolve('public/images/logo-tupbebek-sm.webp');
  const before = (await fs.stat(abs)).size;
  const buffer = await sharp(abs)
    .webp({ quality: 68, effort: 6 })
    .toBuffer();

  const outPath = `${abs}.new`;
  await fs.writeFile(outPath, buffer);
  if (buffer.length < before) {
    await fs.rm(abs, { force: true });
    await fs.rename(outPath, abs);
    console.log(`[resize] logo-tupbebek-sm.webp: ${before} → ${buffer.length} bytes`);
    return;
  }
  await fs.rm(outPath, { force: true });
  console.log(`[resize] skip logo-tupbebek-sm.webp (already optimal)`);
}

for (const target of targets) {
  await resizeInPlace(target);
}
await recompressLogo();
