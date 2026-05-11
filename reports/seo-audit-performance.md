# Core Web Vitals / Performance Audit — tupbebek.com
**Date:** 2026-05-10  
**Method:** Static HTML source analysis + HTTP HEAD probes (PSI rate-limited)  
**Stack:** Astro 4.16.19, hybrid SSG, Cloudflare Pages, `_worker.js`

---

## Per-Page Estimated Performance Score

| Page | Est. Score | LCP Risk | INP Risk | CLS Risk |
|------|-----------|----------|----------|----------|
| `/` (Homepage) | **72–78** | Medium — no hero `<img>` preload | Low | Low |
| `/makaleler/` | **74–80** | Low — no large hero image | Low | Low |
| `/makaleler/tup-bebek-nedir/` | **68–74** | Medium — 206 KB WebP, no preload | Low | Low |
| `/makaleler/embryoscope-yapay-zeka/` | **35–45** | **CRITICAL** — 21.1 MB PNG, no preload | Low | Low |
| `/e-kitap-indir/` | **72–78** | Medium — no hero preload | Low | Low |

Scores are lab-model estimates. Validate against CrUX field data once the site has sufficient traffic.

---

## Top 3 CWV Risk Findings

### 1. CRITICAL — 21.1 MB PNG on embryoscope article (LCP)
`/images/makaleler/embryoscope-kapak-2026.png` is confirmed at **21,148,929 bytes** via HEAD probe. The OG meta declares dimensions 5504×3072 — this is the raw export. `image.service` is set to `noop` in `astro.config.mjs`, meaning Astro's Sharp pipeline is **completely disabled**; no build-time compression or WebP conversion runs for any image. This single file will dominate LCP on the article page, pushing it well past 4 s on most connections. The `_headers` rule gives `/images/*` only 7-day cache (`max-age=604800`), not `immutable`, so repeat visitors still pay a revalidation round-trip.

### 2. SITE-WIDE — No LCP hero image preload (`<link rel="preload" as="image">`)
Every page uses fonts as the only preloads (Inter, Manrope, Material Symbols — all correctly preloaded as `woff2`). The LCP candidate on each page is a background or content image loaded without any `as="image"` preload hint:
- Homepage: `luxury-embryo.webp` appears only in OG meta, not in a visible `<img>` — the actual hero may be CSS `background-image` or a JS-rendered component, meaning the browser cannot discover it until CSS parses.
- Article pages: hero images (`tup-bebek-nedir.webp`, `embryoscope-kapak-2026.png`) appear only in OG meta, not in `<img>` tags in the static HTML. No `fetchpriority="high"` attribute observed anywhere.

### 3. LOGO IMAGE — Missing `width`/`height` attributes (CLS risk)
`/images/logo-tupbebek-sm.webp` rendered via `<img id="logo-icon">` carries **no `width` or `height` attributes** on every page. The element uses Tailwind `h-8 w-auto`, which sets height via CSS but the browser cannot compute aspect ratio before the image loads. If the logo is above the fold and loads after layout, this causes measurable CLS. The image itself is small (5.6 KB) so the timing window is short, but on slow connections it shifts the nav bar.

---

## Top 3 Fixes (Prioritized by Expected Impact)

### Fix 1 — Re-enable Sharp and convert embryoscope PNG to WebP (Impact: very high)
In `astro.config.mjs`, the `image.service.entrypoint: 'astro/assets/services/noop'` line must be removed (or replaced with the default Sharp service). Then replace all `<img>` usages of `embryoscope-kapak-2026.png` with Astro's `<Image>` component, which will emit a compressed WebP at an appropriate display resolution (e.g., 1200×630 for article hero). Expected result: ~21 MB → ~80–120 KB, reducing LCP on that page from estimated >8 s to under 2.5 s on median connections.

If a raw 5504×3072 source PNG must be retained for editorial reasons, add a Sharp-processed WebP copy to `/images/makaleler/embryoscope-kapak-2026.webp` at build time and reference that in the article MDX. Also change the `_headers` image rule to include `immutable` once filenames are content-hashed.

### Fix 2 — Add `<link rel="preload" as="image">` for each page's LCP image
For each route, identify the above-the-fold image that will be the LCP element and add a preload to `<head>`. In Astro this belongs in the layout's `<head>` slot, conditionally set via frontmatter prop. Example:

```html
<link rel="preload" as="image" href="/images/makaleler/tup-bebek-nedir.webp"
      fetchpriority="high" type="image/webp">
```

Also add `fetchpriority="high"` directly on the `<img>` element for the hero. This alone typically saves 300–600 ms of LCP on Cloudflare Pages at ~80 ms TTFB because it allows the browser to fetch the image in parallel with HTML parse rather than waiting for layout.

### Fix 3 — Add explicit `width`/`height` to the logo `<img>` tag
In the shared nav/header component, change:
```html
<img id="logo-icon" src="/images/logo-tupbebek-sm.webp" alt="…" class="h-8 w-auto …">
```
to:
```html
<img id="logo-icon" src="/images/logo-tupbebek-sm.webp" alt="…"
     width="120" height="32" class="h-8 w-auto …">
```
Use the image's actual pixel dimensions (or the intended display size). This allows the browser to reserve space before the image loads, eliminating the CLS contribution from the nav bar on all five pages simultaneously.

---

## Stack Notes

- **Inline CSS (101 KB per page):** `inlineStylesheets: 'always'` eliminates render-blocking external stylesheets — a genuine LCP benefit. The 101 KB payload is large but avoids a blocking round-trip; trade-off is acceptable for Cloudflare edge delivery.
- **HTML document size (137–148 KB):** Larger than expected for a content page. The 101 KB of inlined Tailwind CSS accounts for most of it. Consider `inlineStylesheets: 'auto'` with a byte threshold (e.g., `{ threshold: 8192 }`) to inline only critical CSS and externalize the rest with `defer`.
- **GTM/GA:** Loaded via `script.async = true` injected from an inline `<script>`, which is a valid async pattern. No render-blocking third-party scripts detected.
- **Astro hoisted JS:** Article pages load `/_astro/hoisted.BlA8G6gz.js` as `type="module"` (deferred by default). No blocking JS found.
- **Font cache:** `/fonts/*` correctly set to `max-age=31536000, immutable` — no FOIT/FOUT risk after first load.
- **Image cache:** `/images/*` at `max-age=604800` (7 days) without `immutable`. Once Sharp is re-enabled and images carry content-hash filenames, upgrade to `immutable`.
