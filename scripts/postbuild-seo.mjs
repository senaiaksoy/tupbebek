#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const siteOrigin = 'https://tupbebek.com';

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function hasFileExtension(pathname) {
  return /\.[a-z0-9]+$/iu.test(pathname);
}

function shouldNormalizePath(pathname) {
  if (pathname === '/' || pathname.endsWith('/')) return false;
  if (hasFileExtension(pathname)) return false;
  if (pathname.startsWith('/api/')) return false;
  return true;
}

function normalizeUrl(value) {
  if (
    !value ||
    value.startsWith('#') ||
    value.startsWith('mailto:') ||
    value.startsWith('tel:') ||
    value.startsWith('javascript:')
  ) {
    return value;
  }

  let parsed;
  try {
    parsed = new URL(value, siteOrigin);
  } catch {
    return value;
  }

  if (parsed.origin !== siteOrigin || !shouldNormalizePath(parsed.pathname)) {
    return value;
  }

  parsed.pathname = `${parsed.pathname}/`;
  if (/^https?:\/\//iu.test(value)) {
    return parsed.toString();
  }
  return `${parsed.pathname}${parsed.search}${parsed.hash}`;
}

function rewriteHtml(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  const updated = original.replace(
    /\b(href|action)=(["'])(.*?)\2/giu,
    (fullMatch, attr, quote, value) => {
      const normalized = normalizeUrl(value);
      return normalized === value ? fullMatch : `${attr}=${quote}${normalized}${quote}`;
    }
  );

  if (updated !== original) {
    fs.writeFileSync(filePath, updated, 'utf8');
    return 1;
  }
  return 0;
}

function writeSitemapAlias() {
  const sitemapIndexPath = path.join(distDir, 'sitemap-index.xml');
  const sitemapAliasPath = path.join(distDir, 'sitemap.xml');
  if (!fs.existsSync(sitemapIndexPath)) return false;

  fs.copyFileSync(sitemapIndexPath, sitemapAliasPath);
  return true;
}

if (!fs.existsSync(distDir)) {
  throw new Error('dist directory not found. Run astro build before postbuild-seo.');
}

const htmlFiles = walk(distDir).filter((filePath) => filePath.endsWith('.html'));
const rewrittenHtmlFiles = htmlFiles.reduce((count, filePath) => count + rewriteHtml(filePath), 0);
const sitemapAliasWritten = writeSitemapAlias();

console.log(
  `SEO postbuild: normalized links in ${rewrittenHtmlFiles} HTML file(s); ` +
  `sitemap.xml alias ${sitemapAliasWritten ? 'written' : 'skipped'}.`
);
