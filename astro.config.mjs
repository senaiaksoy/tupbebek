import mdx from "@astrojs/mdx";
import { defineConfig, squooshImageService } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "static",
  integrations: [mdx()],
  image: {
    domains: ["tupbebek.com", "img.youtube.com"],
    service: squooshImageService(),
  },
});
