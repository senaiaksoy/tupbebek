import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig, squooshImageService } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://tupbebek.com",
  output: "hybrid",
  integrations: [mdx(), sitemap()],

  image: {
    domains: ["tupbebek.com", "img.youtube.com"],
    service: squooshImageService(),
  },

  build: {
    inlineStylesheets: "always",
  },

  adapter: cloudflare()
});
