import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://tupbebek.com',
  output: 'hybrid',
  redirects: {
    '/makaleler/hiperprolaktinemi-prolaktinom': '/makaleler/hiperprolaktinemi-ve-kisirlik',
    '/makaleler/myomlar-ve-kisirlik': '/makaleler/miyomlar-ve-tup-bebek',
    '/makaleler/pkos-ve-tup-bebek': '/makaleler/opk-ve-ivf',
    '/makaleler/dondurulmus-embriyo-transferi': '/makaleler/taze-dondurulmus-transfer',
  },
  adapter: cloudflare({
    platformProxy: { enabled: true },
  }),
  integrations: [
    tailwind(),
    sitemap(),
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
