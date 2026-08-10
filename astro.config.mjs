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
import remarkRemoveFaqSchema from './src/utils/remarkRemoveFaqSchema.mjs';

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

const redirectOnlyRoutePatterns = [
  // Legacy language/English URLs are not content routes. Let Cloudflare Pages
  // _redirects handle them before Astro can render a 200 fallback.
  '/ar',
  '/ar/*',
  '/fr',
  '/fr/*',
  '/treatment',
  '/treatment/*',
  '/ivf-in-turkey',
  '/ivf-in-turkey/*',
  '/ivf-explained',
  '/ivf-explained/*',
  '/cost-of-ivf',
  '/cost-of-ivf/*',
  '/success-rates*',
  '/before-you-come',
  '/before-you-come/*',
  '/about-us',
  '/about-us/*',
  '/contact-us',
  '/contact-us/*',
  '/aciklanamayan-kisirlik',
  '/kisirlik-nedenleri/aciklanamayan-kisirlik',
  // /videolar/* legacy YouTube embed pages — handled by _redirects.
  '/videolar',
  '/videolar/*',
  // Legacy Turkish slugs handled by _redirects. Without these, the Worker
  // catches the no-slash variant, middleware adds trailing slash, then
  // _redirects fires — creating a 2-hop chain. The `*` suffix matches both
  // bare path and trailing-slash variants in one rule (CF 100-rule limit).
  '/asilama*',
  '/baslarken*',
  '/dogurganligin-korunmasi*',
  '/dr-senai-aksoy*',
  '/embriyo-dondurma*',
  '/embriyo-transferi-sonrasi-kanama*',
  '/embriyo-transferi-sonrasi-neler-yapmaliyim*',
  '/erkegin-degerlendirilmesi*',
  '/erkekte-kisirlik-nedenleri*',
  '/histeroskopi*',
  '/hizmetler*',
  '/kadinda-kisirlik-nedenleri*',
  '/kadinin-degerlendirilmesi*',
  '/kisirlik-tanisi-konmasi*',
  '/kvkk*',
  '/laparoskopi*',
  '/preimplantasyon-genetik-tani*',
  '/randevu*',
  '/sik-sorulan-sorular*',
  '/sorunlar*',
  '/sperm-analizi*',
  '/tedavi-sirasinda-karsilasilan-sorunlar*',
  '/tedavi-sureci*',
  '/tedaviler*',
  '/tedaviniz*',
  '/tedaviye-baslamadan-once*',
  '/tesatese*',
  '/tup-bebek-asamalari*',
  '/tup-bebek-basari-oranlari*',
  '/tup-bebek-evraklari-ve-testleri*',
  '/tup-bebek-fiyatlari*',
  '/tup-bebek-tedavim-tuttu-mu*',
  '/tup-bebek-tedavisinde-catlatma-ignesi*',
  '/tup-bebek-tedavisinde-nelere-dikkat-etmelisiniz*',
  '/tup-bebek-tedavisinde-preimplantasyon-genetik-tani*',
  '/tup-bebek-ve-mikroenjeksiyon*',
  '/tup-bebekte-ozel-uygulamalar*',
  '/yasiniz-ve-kisirlik*',
  '/yayin-sureci*',
  '/yazar*',
  '/yumurtaliklarin-asiri-uyarilmasi*',
  '/yumurtalik-rezervi-degerlendirme*',
  '/yumurtlama-takibi*',
  // Hub-consolidation: /makaleler/X -> /X/
  '/makaleler/aciklanamayan-infertilite*',
  '/makaleler/basari-oranlari*',
  '/makaleler/basarisiz-denemeler*',
  '/makaleler/dondurulmus-embriyo-transferi*',
  '/makaleler/erkek-kisirligi-besin-takviyeleri*',
  '/makaleler/hiperprolaktinemi-prolaktinom*',
  '/makaleler/myomlar-ve-kisirlik*',
  '/makaleler/pkos-ve-tup-bebek*',
];

export default defineConfig({
  site: 'https://tupbebek.com',
  output: 'hybrid',
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [remarkMedicalCompliance, remarkRemoveFaqSchema, remarkInlineEvidence],
  },
  adapter: cloudflare({
    platformProxy: { enabled: true },
    routes: {
      extend: {
        exclude: [
          // Pagefind static assets are generated AFTER `astro build` (postbuild
          // `npx pagefind --site dist`), so they are not in the adapter's auto
          // static-route list. Without this exclude, requests to /pagefind/*
          // fall through to the Worker, which applies the `trailingSlash: 'always'`
          // 301 — e.g. `…​.pf_meta` → `…​.pf_meta/` (404). Pagefind's internal
          // fetch then hangs, leaving the search UI stuck on "Aranıyor...".
          // Excluding the prefix makes Cloudflare serve these files statically.
          { pattern: '/pagefind/*' },
          { pattern: '/sitemap-index.xml' },
          { pattern: '/sitemap-0.xml' },
          { pattern: '/robots.txt' },
          { pattern: '/llms.txt' },
          ...redirectOnlyRoutePatterns.map((pattern) => ({ pattern })),
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
        // Exact-URL exclusion list for pages that 301 to a canonical URL.
        // SSR redirect stubs were deleted from src/pages; the _redirects file
        // is the single source of truth for these. This list keeps the
        // sitemap clean even if a static .astro page later collides with a
        // _redirects source pattern.
        const redirectingPaths = new Set([
          // Section 1: Eski site ana sayfa ve kategori redirect'leri
          'https://tupbebek.com/sorunlar/',
          'https://tupbebek.com/yayin-sureci/',
          'https://tupbebek.com/kvkk/',
          // Section 2b: Hub / makale duplicate-intent konsolidasyonu
          'https://tupbebek.com/makaleler/aciklanamayan-infertilite/',
          'https://tupbebek.com/makaleler/basari-oranlari/',
          'https://tupbebek.com/makaleler/basarisiz-denemeler/',
          'https://tupbebek.com/makaleler/genetik-testler/',
          // Section 2: Eski makale -> yeni makale 301'leri
          'https://tupbebek.com/makaleler/hiperprolaktinemi-prolaktinom/',
          'https://tupbebek.com/makaleler/myomlar-ve-kisirlik/',
          'https://tupbebek.com/makaleler/pkos-ve-tup-bebek/',
          'https://tupbebek.com/makaleler/dondurulmus-embriyo-transferi/',
          'https://tupbebek.com/makaleler/erkek-kisirligi-besin-takviyeleri/',
          // Section 3-4: Eski TR sayfa URL'leri (hub/article'a 301)
          'https://tupbebek.com/aciklanamayan-kisirlik/',
          'https://tupbebek.com/tup-bebek-fiyatlari/',
          'https://tupbebek.com/dr-senai-aksoy/',
          'https://tupbebek.com/erkekte-kisirlik-nedenleri/',
          'https://tupbebek.com/kadinin-degerlendirilmesi/',
          'https://tupbebek.com/asilama/',
          'https://tupbebek.com/hizmetler/',
          'https://tupbebek.com/preimplantasyon-genetik-tani/',
          'https://tupbebek.com/sperm-analizi/',
          'https://tupbebek.com/tedaviler/',
          'https://tupbebek.com/randevu/',
          'https://tupbebek.com/tedaviye-baslamadan-once/',
          'https://tupbebek.com/yumurtalik-rezervi-degerlendirme/',
          'https://tupbebek.com/kisirlik-tanisi-konmasi/',
          'https://tupbebek.com/baslarken/',
          'https://tupbebek.com/tup-bebek-tedavim-tuttu-mu/',
          'https://tupbebek.com/embriyo-transferi-sonrasi-kanama/',
          'https://tupbebek.com/embriyo-transferi-sonrasi-neler-yapmaliyim/',
          'https://tupbebek.com/tup-bebek-evraklari-ve-testleri/',
          'https://tupbebek.com/tup-bebek-asamalari/',
          'https://tupbebek.com/tup-bebek-tedavisinde-preimplantasyon-genetik-tani/',
          'https://tupbebek.com/dogurganligin-korunmasi/',
          'https://tupbebek.com/embriyo-dondurma/',
          'https://tupbebek.com/tup-bebek-tedavisinde-catlatma-ignesi/',
          'https://tupbebek.com/laparoskopi/',
          'https://tupbebek.com/tup-bebek-ve-mikroenjeksiyon/',
          'https://tupbebek.com/tup-bebek-tedavisinde-nelere-dikkat-etmelisiniz/',
          'https://tupbebek.com/tup-bebek-basari-oranlari/',
          'https://tupbebek.com/sik-sorulan-sorular/',
          'https://tupbebek.com/tedavi-sureci/',
          'https://tupbebek.com/yumurtaliklarin-asiri-uyarilmasi/',
          'https://tupbebek.com/yasiniz-ve-kisirlik/',
          'https://tupbebek.com/histeroskopi/',
          'https://tupbebek.com/tesatese/',
          'https://tupbebek.com/yumurtlama-takibi/',
          'https://tupbebek.com/videolar/',
        ]);
        return !redirectingPaths.has(page);
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
    // Inline Tailwind to eliminate render-blocking 100KB+ external CSS (PSI LCP).
    inlineStylesheets: 'always',
  },
});
