#!/usr/bin/env node
// Detect articles whose hero image has heavy bokeh blur on top AND bottom edges.
// Method: Laplacian variance per horizontal strip; flag when top & bottom strips
// are significantly less "sharp" than the middle.

import { readdir, readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(process.cwd());
const ARTICLES_DIR = path.join(ROOT, 'src', 'content', 'articles');
const PUBLIC_DIR = path.join(ROOT, 'public');

const LAPLACIAN = {
  width: 3,
  height: 3,
  kernel: [0, -1, 0, -1, 4, -1, 0, -1, 0],
};

function extractImagePath(frontmatter) {
  const m = frontmatter.match(/^image:\s*["']?([^"'\n\r]+)["']?\s*$/m);
  return m ? m[1].trim() : null;
}

function resolveImage(imgField) {
  if (!imgField) return null;
  // strip query, leading slash
  const clean = imgField.split('?')[0].split('#')[0];
  const rel = clean.startsWith('/') ? clean.slice(1) : clean;
  const full = path.join(PUBLIC_DIR, rel);
  return existsSync(full) ? full : null;
}

function stripVariance(buf, width, yStart, yEnd) {
  // signed laplacian; sharp returns uint8 — center value =4*c - sum(neighbors) clipped.
  // Use raw output then compute variance.
  let sum = 0;
  let sumSq = 0;
  let n = 0;
  for (let y = yStart; y < yEnd; y++) {
    const row = y * width;
    for (let x = 0; x < width; x++) {
      const v = buf[row + x];
      sum += v;
      sumSq += v * v;
      n++;
    }
  }
  const mean = sum / n;
  return sumSq / n - mean * mean;
}

async function measure(imgPath) {
  const TARGET_W = 800;
  const pipeline = sharp(imgPath)
    .grayscale()
    .resize({ width: TARGET_W, withoutEnlargement: false })
    .convolve(LAPLACIAN);
  const { data, info } = await pipeline.raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const stripH = Math.floor(height * 0.15);
  const midStart = Math.floor(height * 0.4);
  const midEnd = Math.floor(height * 0.6);
  const topVar = stripVariance(data, width, 0, stripH);
  const botVar = stripVariance(data, width, height - stripH, height);
  const midVar = stripVariance(data, width, midStart, midEnd);
  return { width, height, topVar, midVar, botVar };
}

const files = (await readdir(ARTICLES_DIR)).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));

const results = [];
const missing = [];
for (const f of files) {
  const full = path.join(ARTICLES_DIR, f);
  const raw = await readFile(full, 'utf8');
  const txt = raw.replace(/\r\n/g, '\n');
  const fmMatch = txt.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) continue;
  const imgField = extractImagePath(fmMatch[1]);
  const imgPath = resolveImage(imgField);
  if (!imgPath) {
    missing.push({ slug: f, image: imgField });
    continue;
  }
  try {
    const m = await measure(imgPath);
    const topRatio = m.topVar / (m.midVar || 1);
    const botRatio = m.botVar / (m.midVar || 1);
    results.push({
      slug: f.replace(/\.mdx?$/, ''),
      image: imgField,
      midVar: m.midVar,
      topVar: m.topVar,
      botVar: m.botVar,
      topRatio,
      botRatio,
      minEdgeRatio: Math.min(topRatio, botRatio),
      maxEdgeRatio: Math.max(topRatio, botRatio),
    });
  } catch (e) {
    missing.push({ slug: f, image: imgField, error: e.message });
  }
}

// Threshold: both top & bottom strips < 50% of middle sharpness AND middle has real detail
const FLAG_RATIO = 0.5;
const MIN_MID_VAR = 50; // ignore flat/dim images
const flagged = results
  .filter(r => r.midVar >= MIN_MID_VAR && r.topRatio < FLAG_RATIO && r.botRatio < FLAG_RATIO)
  .sort((a, b) => (a.topRatio + a.botRatio) - (b.topRatio + b.botRatio));

console.log(`\nScanned: ${results.length}   Missing: ${missing.length}\n`);
console.log(`Flagged (top<${FLAG_RATIO}x mid AND bot<${FLAG_RATIO}x mid):\n`);
console.log('slug'.padEnd(48), 'top/mid'.padStart(8), 'bot/mid'.padStart(8), 'mid'.padStart(8));
console.log('-'.repeat(76));
for (const r of flagged) {
  console.log(
    r.slug.padEnd(48),
    r.topRatio.toFixed(2).padStart(8),
    r.botRatio.toFixed(2).padStart(8),
    r.midVar.toFixed(0).padStart(8),
  );
}

console.log(`\nTotal flagged: ${flagged.length}`);

if (process.argv.includes('--all')) {
  console.log('\n--- All results (sorted by min edge ratio) ---');
  results
    .sort((a, b) => a.minEdgeRatio - b.minEdgeRatio)
    .forEach(r => {
      console.log(
        r.slug.padEnd(48),
        r.topRatio.toFixed(2).padStart(8),
        r.botRatio.toFixed(2).padStart(8),
        r.midVar.toFixed(0).padStart(8),
      );
    });
}

if (missing.length) {
  console.log('\nSkipped (image not found / error):');
  missing.forEach(m => console.log(' -', m.slug, '→', m.image, m.error ? `(${m.error})` : ''));
}
