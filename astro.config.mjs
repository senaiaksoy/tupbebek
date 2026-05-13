import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import remarkInlineEvidence from './src/utils/remarkInlineEvidence.mjs';
import remarkMedicalCompliance from './src/utils/remarkMedicalCompliance.mjs';

function getArticleDates() {
  const articlesDir = path.resolve('./src/content/articles');
  const dates = new Map();
  try {
    for (const file of fs.readdirSync(articlesDir)) {
      if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
      const content = fs.readFileSync(path.join(articlesDir, file), 'utf-8');
      const lastModMatch = content.match(/lastModified:\s*(\d{4}-\d{2}-\d{2})/);
      const publishMatch = content.match(/publishDate:\s*(\d{4}-\d{2}-\d{2})/);
      const slug = file.replace(/\.mdx?$/, '');
      const date = lastModMatch?.[1] || publishMatch?.[1];
      if (date) dates.set(slug, date);
    }
  } catch {
    // Filesystem may not be ready
  }
  return dates;
}
const articleDates = getArticleDates();

// Static-page lastmod derived from git mtime of the source .astro file.
// Falls back to filesystem mtime if git isn't available (e.g. preview environments).
function getStaticPageDates() {
  const pagesDir = path.resolve('./src/pages');
  const dates = new Map();
  function walk(dir, urlPrefix) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fp = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'api') continue;
        // /makaleler/ index gets its lastmod from the newest article date below.
        if (entry.name === 'makaleler') continue;
        walk(fp, `${urlPrefix}${entry.name}/`);
        continue;
      }
      if (!entry.name.endsWith('.astro')) continue;
      if (entry.name.startsWith('[') || entry.name === '404.astro') continue;
      const slug = entry.name === 'index.astro' ? '' : entry.name.replace(/\.astro$/, '/');
      const url = `${urlPrefix}${slug}`;
      let iso;
      try {
        const rel = path.relative(process.cwd(), fp).replace(/\\/g, '/');
        const out = execSync(`git log -1 --format=%cI -- "${rel}"`, { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
        if (out) iso = out;
      } catch {
        // git unavailable — fall back below
      }
      if (!iso) {
        try { iso = fs.statSync(fp).mtime.toISOString(); } catch {}
      }
      if (iso) dates.set(url, iso);
    }
  }
  try { walk(pagesDir, '/'); } catch {}
  // /makaleler/ index → max article date
  if (articleDates.size > 0) {
    let max = '0';
    for (const d of articleDates.values()) if (d > max) max = d;
    if (max !== '0') dates.set('/makaleler/', new Date(max).toISOString());
  }
  return dates;
}
const staticPageDates = getStaticPageDates();

export default defineConfig({
  site: 'https://tupbebek.com',
  output: 'hybrid',
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [remarkMedicalCompliance, remarkInlineEvidence],
  },
  adapter: cloudflare({
    platformProxy: { enabled: true },
    routes: {
      extend: {
        exclude: [
          { pattern: '/sitemap-index.xml' },
          { pattern: '/sitemap-0.xml' },
          { pattern: '/robots.txt' },
          { pattern: '/llms.txt' },
        ],
      },
    },
  }),
  integrations: [
    tailwind(),
    sitemap({
      // Exclude pages that 301 to another canonical URL — they should not appear in the sitemap.
      // See public/_redirects for the matching 301 rules.
      filter: (page) => {
        const redirectingPaths = [
          'https://tupbebek.com/sorunlar/',
          'https://tupbebek.com/sorunlar',
          'https://tupbebek.com/yayin-sureci/',
          'https://tupbebek.com/yayin-sureci',
          'https://tupbebek.com/aciklanamayan-kisirlik/',
          'https://tupbebek.com/aciklanamayan-kisirlik',
          'https://tupbebek.com/tup-bebek-fiyatlari/',
          'https://tupbebek.com/tup-bebek-fiyatlari',
          'https://tupbebek.com/kvkk/',
          'https://tupbebek.com/kvkk',
        ];
        return !redirectingPaths.includes(page);
      },
      serialize(item) {
        const match = item.url.match(/\/makaleler\/([^/]+)/);
        if (match) {
          const slug = match[1];
          const date = articleDates.get(slug);
          if (date) item.lastmod = new Date(date).toISOString();
          return item;
        }
        // Static pages: derive lastmod from git mtime of the source .astro file.
        try {
          const u = new URL(item.url);
          const pathOnly = u.pathname;
          const iso = staticPageDates.get(pathOnly);
          if (iso) item.lastmod = iso;
        } catch {}
        return item;
      },
    }),
    mdx(),
  ],
  build: {
    inlineStylesheets: 'always',
  },
});
