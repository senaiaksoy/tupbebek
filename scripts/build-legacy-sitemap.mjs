#!/usr/bin/env node
// Build public/sitemap-legacy.xml from the GSC "Page with redirect" export.
//
// Why: John Mueller's standing guidance is to keep an *old* sitemap listing
// redirecting URLs live for ~6 months so Googlebot rediscovers them, follows
// the 301, and drops them from the index faster than passive aging would.
//
// Input  : CSV at $GSC_REDIRECT_CSV (default: ./data/gsc-redirect-urls.csv).
//          First column must be the URL; header row tolerated.
// Output : public/sitemap-legacy.xml
//
// IMPORTANT: This sitemap is intentionally separate from sitemap-0.xml. The
// canonical sitemap must contain ONLY destination URLs; the legacy sitemap
// is the one Google should crawl to confirm the 301s. Submit it in GSC,
// and delete after ~6 months.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const INPUT = process.env.GSC_REDIRECT_CSV || path.join(ROOT, 'data', 'gsc-redirect-urls.csv');
const OUTPUT = path.join(ROOT, 'public', 'sitemap-legacy.xml');

function parseUrls(csv) {
  const urls = new Set();
  const lines = csv.split(/\r?\n/);
  for (const raw of lines) {
    if (!raw.trim()) continue;
    // First column up to comma
    const first = raw.split(',')[0].trim();
    if (!first || first === 'URL' || first.toLowerCase() === 'url') continue;
    if (!/^https?:\/\//i.test(first)) continue;
    urls.add(first);
  }
  return [...urls];
}

function buildXml(urls, lastmod) {
  const items = urls
    .map((url) => `  <url>\n    <loc>${escapeXml(url)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>yearly</changefreq>\n    <priority>0.1</priority>\n  </url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<!-- Legacy redirect sitemap. Lists URLs that 301 to canonical destinations.\n     Keep live ~6 months to accelerate Google's reconciliation of "Page with redirect".\n     After that, delete this file and remove from robots.txt. -->\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`;
}

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

if (!fs.existsSync(INPUT)) {
  console.error(`Input CSV not found at ${INPUT}.`);
  console.error('Set GSC_REDIRECT_CSV=<path> or place the export at data/gsc-redirect-urls.csv.');
  process.exit(1);
}

const csv = fs.readFileSync(INPUT, 'utf-8');
const urls = parseUrls(csv);
const lastmod = new Date().toISOString().slice(0, 10);
fs.writeFileSync(OUTPUT, buildXml(urls, lastmod), 'utf-8');
console.log(`Wrote ${urls.length} URLs to ${path.relative(ROOT, OUTPUT)}`);
