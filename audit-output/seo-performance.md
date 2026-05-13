# Core Web Vitals Audit — tupbebek.com
**Date:** 2026-05-12 | **Method:** Static source analysis (no live PSI/CrUX data — Bash unavailable)
**Stack:** Astro 4.x hybrid · Cloudflare Pages · Self-hosted woff2 · Sharp WebP · Pagefind

> All metric estimates are lab-equivalent inferences from source code. Validate against CrUX field data via [CrUX Vis](https://cruxvis.withgoogle.com) or `python scripts/crux_history.py https://tupbebek.com --json` before treating any metric as confirmed.

---

## 1. Homepage — https://tupbebek.com/

### Estimated Metrics
| Metric | Estimate | Status |
|--------|----------|--------|
| LCP    | ~2.2–3.0 s | Needs monitoring |
| INP    | ~80–130 ms | Good |
| CLS    | ~0.05–0.12 | Needs monitoring |
| TTFB   | ~80–150 ms | Good (Cloudflare edge) |
| FCP    | ~1.4–2.0 s | Good |

### Top 3 Bottlenecks

**1. LCP candidate: featured article hero image — no `fetchpriority` propagation from BaseLayout.**
`HeroSection.astro` correctly sets `fetchpriority="high"` and `loading="eager"` on the featured image. However, `BaseLayout.astro` only emits `<link rel="preload" as="image">` when an `image=` prop is passed. The homepage `index.astro` does NOT pass `image=` to BaseLayout, so no preload hint exists for the LCP image — it is discovered late during render.

*Fix:* Export the featured article's image URL from `HeroSection` data fetching back to `index.astro` and pass it as the `image` prop to `BaseLayout`. Alternatively, add a `<link rel="preload">` directly inside `HeroSection.astro` using `<Fragment slot="head">` or an equivalent mechanism.

**2. Material Symbols Outlined uses `font-display: block` — render-blocking icon paint.**
In BaseLayout the `@font-face` for Material Symbols Outlined is declared with `font-display: block`. This means all icon glyphs are invisible until the woff2 file loads, causing a flash of invisible text (FOIT) that can delay LCP if any icon sits in the critical viewport. Three trust-bar icons (`verified`, `groups`, `update`, `block`) render above the fold on the homepage.

*Fix:* Change `font-display: block` → `font-display: swap` for Material Symbols. The icons are decorative and already aria-hidden, so a brief layout swap is preferable to blocking paint. Apply `aria-hidden="true"` at render time (the current inline script runs after DOMContentLoaded — too late).

**3. Four CSS files imported in BaseLayout are inlined by Astro build (`inlineStylesheets: 'always'`) but animations.css is 471 lines of keyframes, several unused on the homepage.**
The combined inlined CSS includes `animations.css` (471 lines), `tokens.css` (288 lines), and `globals.css` (662 lines) — roughly 80–100 KB unminified. Cloudflare Pages will compress this, but unused keyframe rules (`slideIn`, `fadeOut`, `pulse-soft`, `gradient-move`, `glow`) inflate the critical-path payload.

*Fix:* Move `animations.css` to a `<link rel="stylesheet" media="print" onload="this.media='all'">` non-blocking load, or split animations into a separate file imported only by components that actually use them. Alternatively, enable Astro's CSS tree-shaking by scoping animations to the components that use them with `<style>` blocks rather than a global file.

---

## 2. Article page — https://tupbebek.com/makaleler/[slug]/

### Estimated Metrics
| Metric | Estimate | Status |
|--------|----------|--------|
| LCP    | ~2.8–3.8 s | Needs Improvement |
| INP    | ~100–180 ms | Good |
| CLS    | ~0.05–0.10 | Good |
| TTFB   | ~80–150 ms | Good |
| FCP    | ~1.4–1.8 s | Good |

### Top 3 Bottlenecks

**1. Article hero image uses `loading="lazy"` despite being above the fold.**
In `[...slug].astro` line 147, the hero image is rendered with `loading="lazy"` and `decoding="async"`. For a page where this image is typically the first large visual element (high probability LCP candidate), lazy loading delays the browser's fetch until after layout — pushing LCP 300–800 ms later than necessary.

*Fix:* Change the article hero image to `loading="eager"` and add `fetchpriority="high"`. The `BaseLayout` already has a preload slot: ensure the article `image` prop flows through to `BaseLayout` (it does via `sanitizedImage` on line 89) — confirm the preload `<link>` in BaseLayout emits correctly for all articles with images.

**2. Pagefind JS bundle loaded on every article page even when search modal is never opened.**
`SearchAutocomplete.astro` is included globally via `BaseLayout`. The Pagefind module (`/pagefind/pagefind.js`) is loaded lazily on first `openSearchModal()` call, which is good. However, the `fallbackData` (all article metadata serialized via `getSearchData()`) is eagerly serialized and injected into a `define:vars` script block on every page load, adding several KB of inline JSON to every article page's HTML.

*Fix:* Defer `fallbackData` injection. Load it only when the search modal is opened (fetch `/search-index.json` on demand), or consider moving the fallback data to a small static JSON endpoint. This reduces per-page HTML payload by an estimated 5–15 KB.

**3. TableOfContents and RelatedArticles rendered server-side with no skeleton — potential CLS on hydration.**
The sticky sidebar contains `TableOfContents` (client-side heading scan) and `RelatedArticles`. If either component shifts layout after the initial SSG paint, CLS will register. The sidebar is `hidden lg:block` so mobile is safe, but desktop users may see a layout shift if the TOC height changes as headings are discovered.

*Fix:* Reserve explicit `min-height` on the TOC container matching the expected rendered height, or render the TOC fully at build time from the article's heading AST (which is available during SSG).

---

## 3. E-book landing — https://tupbebek.com/e-kitap-indir

### Estimated Metrics
| Metric | Estimate | Status |
|--------|----------|--------|
| LCP    | ~3.0–4.5 s | Needs Improvement / Poor risk |
| INP    | ~60–100 ms | Good |
| CLS    | ~0.08–0.15 | Needs monitoring |
| TTFB   | ~80–150 ms | Good |
| FCP    | ~1.5–2.0 s | Good |

### Top 3 Bottlenecks

**1. Cover image (2816×1536 px JPEG) has no preload and is sized far larger than its rendered slot.**
`e-kitap-indir.astro` line 36 renders `/e-kitap/images/cover.jpg` at full declared dimensions of 2816×1536 with `loading="eager"`. The image renders inside a `w-full` column container capped at ~560 px on desktop. Serving a 2816 px JPEG for a ~560 px slot means the browser downloads roughly 5–10× the necessary pixels, delaying LCP significantly.

*Fix:* Convert `cover.jpg` to WebP using `scripts/convert-image.mjs` (already in the project). Add a `srcset` with at least two sizes (560w, 1120w for 2x retina). Add `<link rel="preload" as="image" href="/e-kitap/images/cover.webp" imagesrcset="...">` in BaseLayout by passing the image prop from this page. Set `width="560" height="306"` to match the actual rendered slot and prevent CLS.

**2. The page passes no `image=` prop to BaseLayout, so no LCP preload hint is emitted.**
The `e-kitap-indir.astro` BaseLayout call has no `image` prop. This means `BaseLayout` never emits the `<link rel="preload" as="image">` hint, and the cover JPEG — the LCP element — is only discovered when the parser reaches the `<img>` tag in the body.

*Fix:* Add `image="/e-kitap/images/cover.webp"` (after conversion) to the BaseLayout call and add `fetchpriority="high"` to the `<img>` element.

**3. Sticky form column uses `lg:sticky lg:top-24` — no reserved height causes CLS on mobile reorder.**
On mobile the grid stacks as: header (order-1) → form (order-2) → cover+benefits (order-3). If the cover image loads late, the form block shifts downward, contributing to CLS. Since `cover.jpg` has no explicit height declared relative to its rendered slot, the browser cannot reserve space before the image loads.

*Fix:* Add explicit `aspect-ratio: 16/9` (or matching inline style) to the cover image container `<div>` so the browser reserves space before the image bytes arrive. Combined with the WebP/srcset fix above, this should bring CLS to ≤0.05 on this page.

---

## Priority Summary

| Priority | Fix | Affects | Expected Impact |
|----------|-----|---------|-----------------|
| 1 | Pass `image=` prop + `fetchpriority="high"` on article hero | Article LCP | −400–800 ms LCP |
| 2 | Convert cover.jpg → WebP + add srcset + preload hint | E-book LCP | −600–1500 ms LCP |
| 3 | Pass featured image from HeroSection to BaseLayout preload | Homepage LCP | −200–500 ms LCP |
| 4 | `font-display: block` → `swap` for Material Symbols | All pages FCP | −100–300 ms FCP |
| 5 | Defer `fallbackData` inline JSON from SearchAutocomplete | All pages payload | −5–15 KB per page |
| 6 | Reserve explicit height on TOC container | Article CLS | CLS −0.03–0.08 |
| 7 | Extract `animations.css` from critical inline path | All pages CSS payload | −20–40 KB critical CSS |
