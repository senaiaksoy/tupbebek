/**
 * Hero görsel boyut manifest üreteci.
 *
 * Tüm `public/images/**` görsellerinin gerçek width/height boyutlarını
 * disk'ten okuyup `src/data/imageDimensions.json` dosyasına yazar.
 * Bu manifest Astro/Cloudflare Workers bundle'ına Node deps olmadan
 * dahil edilir — runtime'da sadece JSON lookup yapılır.
 *
 * `npm run build` öncesinde otomatik çalışır (package.json prebuild hook).
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve('public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const OUTPUT = path.resolve('src/data/imageDimensions.json');

const EXTS = new Set(['.webp', '.jpg', '.jpeg', '.png', '.avif']);

async function walk(dir, out = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, out);
    } else if (EXTS.has(path.extname(entry.name).toLowerCase())) {
      out.push(full);
    }
  }
  return out;
}

async function main() {
  const files = await walk(IMAGES_DIR);
  const manifest = {};
  let ok = 0;
  let fail = 0;

  for (const file of files) {
    const rel = '/' + path.relative(PUBLIC_DIR, file).split(path.sep).join('/');
    try {
      const meta = await sharp(file).metadata();
      if (meta.width && meta.height) {
        manifest[rel] = { width: meta.width, height: meta.height };
        ok++;
      } else {
        fail++;
      }
    } catch (err) {
      console.warn(`[manifest] sharp failed for ${rel}:`, err.message);
      fail++;
    }
  }

  await fs.mkdir(path.dirname(OUTPUT), { recursive: true });
  await fs.writeFile(OUTPUT, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`[manifest] wrote ${ok} entries (${fail} failed) → ${path.relative(process.cwd(), OUTPUT)}`);
}

main().catch(err => {
  console.error('[manifest] fatal:', err);
  process.exit(1);
});
