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
const ARTICLES_DIR = path.resolve('src/content/articles');
const OUTPUT = path.resolve('src/data/imageDimensions.json');
const RESPONSIVE_OUTPUT = path.resolve('src/data/imageVariants.json');
const GENERATED_DIR = path.join(PUBLIC_DIR, 'generated', 'article-heroes');
const RESPONSIVE_WIDTHS = [640, 960, 1280];

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

async function getArticleHeroPaths() {
  const entries = await fs.readdir(ARTICLES_DIR, { withFileTypes: true });
  const paths = new Set();

  for (const entry of entries) {
    if (!entry.isFile() || !/\.mdx?$/iu.test(entry.name)) continue;
    const source = await fs.readFile(path.join(ARTICLES_DIR, entry.name), 'utf8');
    const match = source.match(/^image:\s*["']?([^"'\r\n]+)["']?\s*$/mu);
    const imagePath = match?.[1]?.trim();
    if (imagePath?.startsWith('/images/')) paths.add(imagePath);
  }

  return [...paths].sort();
}

function generatedName(imagePath, width) {
  const withoutExt = imagePath.replace(/^\/images\//u, '').replace(/\.[^.]+$/u, '');
  const safeStem = withoutExt.replace(/[^a-z0-9_-]+/giu, '-').replace(/-+/gu, '-');
  return `${safeStem}-w${width}.webp`;
}

async function buildResponsiveVariants(imagePath) {
  const sourcePath = path.join(PUBLIC_DIR, imagePath.replace(/^\//u, ''));
  const metadata = await sharp(sourcePath).metadata();
  if (!metadata.width || !metadata.height) return [];

  const sourceStat = await fs.stat(sourcePath);
  const variants = [];
  for (const width of RESPONSIVE_WIDTHS.filter((candidate) => candidate < metadata.width)) {
    const fileName = generatedName(imagePath, width);
    const outputPath = path.join(GENERATED_DIR, fileName);
    let shouldGenerate = true;

    try {
      const outputStat = await fs.stat(outputPath);
      shouldGenerate = outputStat.mtimeMs < sourceStat.mtimeMs;
    } catch {
      // Missing output is generated below.
    }

    if (shouldGenerate) {
      await sharp(sourcePath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .toFile(outputPath);
    }

    const generatedMeta = await sharp(outputPath).metadata();
    if (generatedMeta.width && generatedMeta.height) {
      variants.push({
        src: `/generated/article-heroes/${fileName}`,
        width: generatedMeta.width,
        height: generatedMeta.height,
      });
    }
  }

  return variants;
}

async function main() {
  const files = await walk(IMAGES_DIR);
  const manifest = {};
  const responsiveManifest = {};
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

  await fs.mkdir(GENERATED_DIR, { recursive: true });
  const heroPaths = await getArticleHeroPaths();
  for (const imagePath of heroPaths) {
    try {
      const variants = await buildResponsiveVariants(imagePath);
      if (variants.length > 0) responsiveManifest[imagePath] = variants;
    } catch (err) {
      console.warn(`[responsive] sharp failed for ${imagePath}:`, err.message);
    }
  }

  await fs.mkdir(path.dirname(OUTPUT), { recursive: true });
  await fs.writeFile(OUTPUT, JSON.stringify(manifest, null, 2) + '\n');
  await fs.writeFile(RESPONSIVE_OUTPUT, JSON.stringify(responsiveManifest, null, 2) + '\n');
  console.log(`[manifest] wrote ${ok} entries (${fail} failed) → ${path.relative(process.cwd(), OUTPUT)}`);
  console.log(`[responsive] wrote ${Object.keys(responsiveManifest).length} hero entries → ${path.relative(process.cwd(), RESPONSIVE_OUTPUT)}`);
}

main().catch(err => {
  console.error('[manifest] fatal:', err);
  process.exit(1);
});
