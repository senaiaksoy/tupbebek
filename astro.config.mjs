import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import fs from 'node:fs';
import path from 'node:path';
import remarkInlineEvidence from './src/utils/remarkInlineEvidence.mjs';

// Build article lastmod map from frontmatter
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
    // Filesystem may not be ready (e.g. WSL2 Plan9 share init)
  }
  return dates;
}
const articleDates = getArticleDates();

// https://astro.build/config
export default defineConfig({
  site: 'https://tupbebek.com',
  output: 'hybrid',
  markdown: {
    remarkPlugins: [remarkInlineEvidence],
  },
  redirects: {
    '/makaleler/hiperprolaktinemi-prolaktinom': '/makaleler/hiperprolaktinemi-ve-kisirlik',
    '/makaleler/myomlar-ve-kisirlik': '/makaleler/miyomlar-ve-tup-bebek',
    '/makaleler/pkos-ve-tup-bebek': '/makaleler/opk-ve-ivf',
    '/makaleler/dondurulmus-embriyo-transferi': '/makaleler/taze-dondurulmus-transfer',
    '/blog/akinti-kasinti-koku-mantar-mi-bakteriyel-vajinoz-mu/': '/makaleler/akinti-kasinti-koku',
    '/blog/tup-bebek-bagisiklik-tedavileri-ve-riskler/': '/makaleler/bagisiklik-tedavileri',
    '/blog/ivf-oncesi-histeroskopi-rif-hastalari/': '/makaleler/ivf-oncesi-histeroskopi',
    '/blog/embryoscope-yapay-zeka-embriyo-secimi/': '/makaleler/embryoscope-yapay-zeka',
    '/blog/yumurta-dondurma-kac-tanesi-gerekli-yaş-grupları/': '/makaleler/yumurta-dondurma-rehberi',
    '/blog/yumurta-dondurma-kac-tanesi-gerekli-ya%C5%9F-gruplar%C4%B1/': '/makaleler/yumurta-dondurma-rehberi',
    '/blog/izotretinoin-noa-sperm-uretimi/': '/makaleler/izotretinoin-sperm',
    '/blog/embriyo-tup-bebek-laboratuvar-raporu-yorumlama/': '/makaleler/laboratuvar-raporu-yorumlama',
    '/tup-bebek-tedavim-tuttu-mu/': '/makaleler/beta-hcg-testi',
    '/blog/istanbul-tup-bebek-doktoru-merkezi-secimi-rehberi/': '/makaleler/istanbul-tup-bebek-doktoru',
    '/blog/akraba-evliligi-neden-tehlikelidir/': '/makaleler/akraba-evliligi',
    '/blog/embriyo-transferi-kacinci-gunde-yapilmalidir/': '/makaleler/embriyo-transferi-gun-secimi',
    '/blog/dondurulmus-embriyo-transferi-protokolleri-karsilastirma/': '/makaleler/taze-dondurulmus-transfer',
    '/blog/vajinal-mikrobiyom-fiv-basarisi/': '/makaleler/vajinal-mikrobiyom-fiv',
    '/blog/endometriozis-ve-tup-bebek-tedavisi/': '/makaleler/endometriozis-tup-bebek',
    '/blog/kisirlik-ve-endometriozis-icin-akilli-stratejiler/': '/makaleler/endometriozis-akilli-stratejiler',
    '/blog/azospermi-mikro-tese-ikinci-deneme/': '/makaleler/azospermi-mikro-tese',
    '/blog/tup-bebekte-basarili-sonuc-icin-kac-yumurta-gerekir/': '/makaleler/kac-yumurta-gerekir',
    '/blog/yumurtlama-takibi-ve-iliski-planlamasi-nedir/': '/makaleler/yumurtlama-takibi',
    '/blog/saglikli-bir-cinsel-hayat-icin-ne-yapmali/': '/beslenme-yasam',
    '/blog/taze-dondurulmus-embriyo-transferi/': '/makaleler/taze-dondurulmus-transfer',
    '/blog/miyom-ameliyati-ne-zaman-gerekir/': '/makaleler/miyom-ameliyati',
    '/blog/dusuk-amh/': '/makaleler/dusuk-amh-hamilelik',
    '/blog/fiv-basarisizligi-sonrasi-ne-yapmali-dr-senai-aksoy/': '/makaleler/basarisiz-denemeler',
    '/embriyo-transferi-sonrasi-kanama/': '/makaleler/embriyo-transferi-sonrasi-bakim',
    '/embriyo-transferi-sonrasi-neler-yapmaliyim/': '/makaleler/embriyo-transferi-sonrasi-bakim',
    '/tup-bebek-evraklari-ve-testleri/': '/tani-sureci',
    '/blog/ivf-protokolleri-istanbul/': '/makaleler/ivf-protokolleri',
    '/blog/hiperprolaktinemi-ve-kisirlik/': '/makaleler/hiperprolaktinemi-ve-kisirlik',
    '/blog/myomlar-ve-kisirlik/': '/makaleler/myomlar-ve-kisirlik',
    '/blog/kimyasal-gebelik/': '/makaleler/kimyasal-gebelik',
  },
  adapter: cloudflare({
    platformProxy: { enabled: true },
  }),
  integrations: [
    tailwind(),
    sitemap({
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
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop'
    }
  },
});
