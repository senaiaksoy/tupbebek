# Technical SEO Audit — tupbebek.com
**Date:** 2026-05-10  
**Platform:** Astro 4.16.19 + Cloudflare Pages  
**Auditor:** Claude (seo-technical skill)

---

## Score: 61 / 100

---

## 1. Crawlability

### robots.txt
**Status: PASS (with warnings)**

File: `public/robots.txt`

- Syntax valid. `Allow: /` before `Disallow:` is redundant but harmless.
- `Crawl-delay: 1` — Googlebot ignores this directive; it has no effect for Google. Fine for Bing.
- `Disallow: /_astro/` — correct, prevents crawling of hashed asset chunks.
- `Disallow: /api/` — correct.
- **Sitemap reference points to `https://tupbebek.com/sitemap-index.xml` — CONFIRMED 404 LIVE.**

### Sitemap Reachability
**Status: CRITICAL FAIL**

| URL | Live Status |
|---|---|
| `https://tupbebek.com/sitemap-index.xml` | **404 Not Found** |
| `https://tupbebek.com/sitemap-0.xml` | **404 Not Found** |

**Root cause confirmed:** Both `dist/sitemap-index.xml` and `dist/sitemap-0.xml` exist in the build output. The `_routes.json` uses `"include": ["/*"]` with no explicit exclusion of the sitemap paths. However, Cloudflare Pages' Worker (`_worker.js`) is intercepting all `/*` requests before static asset serving, meaning the static XML files are not served — the Worker handles the request and finds no matching route, returning 404. The sitemap files are generated correctly by `@astrojs/sitemap` at build time but are unreachable live because the hybrid/SSR Worker swallows the request.

**Fix:** Either add `/sitemap-index.xml` and `/sitemap-0.xml` to the `exclude` list in `_routes.json` (so Cloudflare serves them as static assets), or add explicit static passthrough in the Cloudflare adapter config.

---

## 2. Indexability

### Canonical Tags
**Status: PASS (with redirect inconsistency)**

| URL fetched | Canonical declared | Status |
|---|---|---|
| `https://tupbebek.com/` | `https://tupbebek.com/` | Correct |
| `https://tupbebek.com/makaleler/tup-bebek-nedir/` | `https://tupbebek.com/makaleler/tup-bebek-nedir/` | Correct |
| `https://tupbebek.com/makaleler/opk-ve-ivf/` | `https://tupbebek.com/makaleler/opk-ve-ivf/` | Correct |
| `https://tupbebek.com/makaleler/dusuk-amh-hamilelik/` | `https://tupbebek.com/makaleler/dusuk-amh-hamilelik/` | Correct |

Self-referencing canonicals are consistent with trailing-slash URLs. 

**Issue:** Article URLs without trailing slash (e.g., `/makaleler/tup-bebek-nedir`) return **308 Permanent Redirect** to the trailing-slash version. This is Cloudflare Pages' default behavior enforcing trailing slashes on static pages. The canonical declared in HTML matches the trailing-slash URL, which is correct. However, the `_redirects` file contains many legacy source paths **without** trailing slashes pointing to targets also without trailing slashes (e.g., `/makaleler/tup-bebek-nedir`). When Cloudflare then 308-redirects those to the trailing-slash version, inbound links create two-hop chains: `old-path → _redirects 301 → /makaleler/slug → Cloudflare 308 → /makaleler/slug/`. This is a **High** priority fix.

### noindex
No pages audited carried `noindex`. Homepage `meta name="robots" content="index, follow"` — correct.

---

## 3. Security Headers

**Status: HIGH FAIL**

Live headers on `https://tupbebek.com/` (confirmed via curl):

| Header | Status | Value |
|---|---|---|
| `Strict-Transport-Security` (HSTS) | **MISSING** | Not present |
| `Content-Security-Policy` (CSP) | **MISSING** | Not present |
| `X-Frame-Options` | **MISSING** | Not present |
| `X-Content-Type-Options` | Present | `nosniff` |
| `Referrer-Policy` | Present | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | **MISSING** | Not present |

The `public/_headers` file only sets caching rules for `/e-kitap/*`, `/fonts/*`, and `/images/*` paths. It has **no global security header block** at all. HSTS is especially important for a medical publisher — its absence means HTTPS is not enforced at the browser level between visits.

**Fix:** Add a global block at the top of `public/_headers`:

```
/*
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; ...
```

---

## 4. URL Structure & Redirects

**Status: HIGH — redirect chain risk**

`public/_redirects` analysis:

- 292 lines, well-structured, specific before wildcard — architecture is correct.
- **Two-hop chain risk:** `_redirects` sends old slugs (no trailing slash) to new slugs (no trailing slash) via 301; Cloudflare then issues a 308 to add the trailing slash. Googlebot follows chains but PageRank dilution and crawl waste apply.
- **`/blog/*` wildcard catch-all (line 285)** fires for any unmapped `/blog/` URL → `/makaleler`. This is intentional and safe.
- **Domain redirect issue:** Lines 10–12 redirect `draksoyivf.com` variants to `https://www.draksoyivf.com/:splat`, not to `tupbebek.com`. This is a separate domain; these rules appear misplaced in the tupbebek.com Cloudflare Pages project and will never fire (Cloudflare Pages only applies `_redirects` for the project's own domain). They are dead weight.
- **Quoted URL on line 236:** `"/blog/opk-ve ivf/"` — the quotes and space in the URL slug are malformed. This rule may not match correctly depending on Cloudflare's parsing.
- GSC recommendation to strip `gclid`, `fbclid`, `utm_*` from canonical URLs: **not yet implemented** in `_redirects`. Still pending.
- GSC recommendation to enforce non-www canonical at edge: The live `www.tupbebek.com` 301 redirects to `https://tupbebek.com/` (confirmed). This is handled at Cloudflare DNS/Page Rules level, not in `_redirects` — acceptable.

---

## 5. astro.config.mjs

**Status: PASS (with sitemap concern)**

- `output: 'hybrid'` — correct for mixed SSR+static.
- `adapter: cloudflare({ platformProxy: { enabled: true } })` — correct.
- `site: 'https://tupbebek.com'` — correct, matches canonicals.
- No `trailingSlash` config set — defaults to `'ignore'` in Astro 4.x. Cloudflare Pages enforces trailing slashes independently via 308. This mismatch between Astro's "ignore" and Cloudflare's enforcement creates the two-hop chain described above. Setting `trailingSlash: 'always'` in `astro.config.mjs` would align them.
- `@astrojs/sitemap` configured with `serialize()` for `lastmod` injection — good.
- No `i18n` config despite `hreflang="tr-TR"` and `hreflang="x-default"` on pages. Hreflang is rendered manually; this is fine but should be validated (defer to `seo-hreflang` sub-skill).

---

## 6. HTTP → HTTPS / www Handling

**Status: PASS**

- `http://tupbebek.com/` → `301` → `https://tupbebek.com/` (single hop, Cloudflare-managed).
- `http://www.tupbebek.com/` → `301` → `https://tupbebek.com/` (single hop).
- `https://www.tupbebek.com/` → `301` → `https://tupbebek.com/` (single hop).

All single-hop. Non-www is canonical. Consistent.

---

## 7. UTF-8 / Charset

**Status: PASS**

Live homepage HTTP response header: `Content-Type: text/html; charset=utf-8` — correct.  
HTML `<meta charset="UTF-8">` is the first element in `<head>` — correct position.

The prior schema audit flagged UTF-8 corruption in **structured data** (likely escaped Turkish characters in JSON-LD or garbled `ş`, `ğ`, `ı` in schema strings). This is **not** a charset declaration problem — the transport and HTML declaration are both correct. The corruption likely originates in how schema strings are constructed in Astro components (hardcoded ASCII approximations instead of proper Unicode). Verify in `/src/components/` schema files.

---

## 8. JavaScript Rendering

**Status: PASS**

- Pages render server-side (Astro hybrid SSR). Full HTML is present in the initial response body — confirmed by extracting `<title>`, canonical, and meta tags directly from `curl` output without JS execution.
- GA4 is lazy-loaded via `<script>` after page load. No render-blocking scripts detected in `<head>`.
- `build.inlineStylesheets: 'always'` means all Tailwind CSS is inlined — eliminates render-blocking stylesheet requests. Good for LCP.

---

## 9. Core Web Vitals (Source Inspection)

**Status: MEDIUM risk**

- **LCP:** Hero image `/images/home/luxury-embryo.webp` referenced in OG tags. No `<link rel="preload">` for this image detected in homepage `<head>`. For LCP, the above-the-fold hero image should be preloaded. Risk: LCP in 2.5–4s range.
- **INP:** Minimal client-side JS. Astro islands pattern limits interactivity overhead. Low INP risk.
- **CLS:** `build.inlineStylesheets: 'always'` prevents FOUC. `image.service: noop` means no automatic `width`/`height` injection on `<img>` tags — if images lack explicit dimensions in templates, CLS risk is elevated. Verify image tags in article templates.
- `<meta name="viewport" content="width=device-width">` is present but missing `initial-scale=1` — technically valid but non-standard. Some older tools flag this.

---

## 10. IndexNow Protocol

**Status: NOT IMPLEMENTED**

No IndexNow key file detected in `dist/` or `public/`. No IndexNow submission endpoint referenced in `astro.config.mjs` or any build script. Given the volume of redirect changes (427 GSC redirect URLs), IndexNow submission to Bing/Yandex would accelerate recrawl of canonical URLs.

---

## 11. GSC Recommendations Cross-Check

From `reports/gsc-coverage-redirect-analysis.md`:

| GSC Recommendation | Status |
|---|---|
| 1. Single-hop HTTP→HTTPS, non-www→www | Implemented (Cloudflare-level) |
| 2. Deterministic trailing slash policy | Partial — Cloudflare enforces 308 but Astro config not aligned |
| 3. Strip `gclid`/`fbclid`/`utm_*` from canonicals | Not implemented |
| 4. Expand legacy path aliases (high-frequency) | Implemented — 292 rules cover major paths |
| 5. Re-submit sitemap + validate in GSC | Blocked — sitemap returns 404 live |

---

## Top 5 Issues by Severity

| # | Issue | Severity |
|---|---|---|
| 1 | `sitemap-index.xml` and `sitemap-0.xml` return 404 live — Cloudflare Worker intercepts static XML before serving | **CRITICAL** |
| 2 | HSTS, CSP, X-Frame-Options, Permissions-Policy missing from `_headers` — no global security block | **HIGH** |
| 3 | Two-hop redirect chains: `_redirects` 301 → Cloudflare 308 on all article URLs without trailing slash | **HIGH** |
| 4 | No LCP hero image preload (`<link rel="preload">`) for `/images/home/luxury-embryo.webp` | **MEDIUM** |
| 5 | `image.service: noop` disables width/height auto-injection — CLS risk if article `<img>` tags lack explicit dimensions | **MEDIUM** |

---

## Top 3 Quick Wins

**QW1 — Fix sitemap 404 (30 min):**  
Add to `dist/_routes.json` exclude list (and ensure it persists post-build):
```json
"/sitemap-index.xml",
"/sitemap-0.xml"
```
Or set in `astro.config.mjs` adapter config: verify Cloudflare adapter's `staticPaths` option. After deploy, resubmit both URLs in GSC.

**QW2 — Add global security headers (15 min):**  
Prepend a `/*` block to `public/_headers` with HSTS (`max-age=63072000; includeSubDomains; preload`), `X-Frame-Options: SAMEORIGIN`, and `Permissions-Policy`. This also satisfies Google's "secure connection" signal for E-E-A-T on a medical publisher.

**QW3 — Align trailing slash policy (10 min):**  
Add `trailingSlash: 'always'` to `astro.config.mjs`. This makes Astro generate redirect links with trailing slashes, eliminating the 308 second hop for all `_redirects` destinations. Verify `_redirects` target paths also end with `/`.

---

*Audit scope: robots.txt, live sitemaps, security headers, _redirects, astro.config.mjs, canonical tags on homepage + 3 articles, HTTP/HTTPS/www handling, charset, Core Web Vitals signals, IndexNow, GSC cross-check.*
