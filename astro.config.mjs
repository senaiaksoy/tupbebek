import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import fs from 'node:fs';
import path from 'node:path';
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
        }
        return item;
      },
    }),
    mdx(),
  ],
  build: {
    inlineStylesheets: 'always',
  },
});
