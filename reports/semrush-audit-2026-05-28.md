# SEMrush Audit - 2026-05-28

Source: `C:/Users/KC3/Downloads/tupbebek.com_mega_export_20260528.csv`

Scope: 99 crawled URLs, 102 SEMrush issue columns.

## Executive Summary

The audit has one clear technical priority: built HTML contains literal JavaScript template placeholders that crawlers interpret as internal links. This explains the sitewide `Broken internal links` signal on 93 URLs.

The second priority is title length cleanup on 36 URLs. This is not a site health emergency, but it is worth fixing because many medical article titles exceed 75-100 characters after appending `| tupbebek.com`.

Structured data warnings affect 65 URLs, matching the original number of `FAQPage` JSON-LD blocks found in the build. Local JSON parsing found no invalid JSON, but a stricter visibility check found 40 FAQ questions that existed in JSON-LD without matching visible page questions. Those invisible FAQ schema entries have now been removed.

HSTS is already present on the apex `https://tupbebek.com/`, but the `www` 301 response does not include the HSTS header before redirecting. SEMrush flags `https://www.tupbebek.com/` for this.

## Implementation Status

Updated on 2026-05-28:

- Fixed crawler-visible placeholder internal links in search and quick-nav rendering.
- Added post-build checks for placeholder links, title length, and broader link hygiene.
- Added article `seoTitle` support and shortened the flagged title set.
- Encoded DOI URLs that contain parentheses in rendered links and JSON-LD.
- Switched visible scientific reference links to prefer PubMed when `pmid` is available.
- Removed stale DOI metadata that resolved to 404 from affected references.
- Reduced repeated HTML payload by moving Tailwind CSS out of inline page HTML and deduplicating the mega menu initializer.
- Added structured-data verification and removed FAQPage entries that were not backed by visible page questions.
- Added `npm run verify:semrush-audit` as a single post-build audit gate and wired it into the guarded `npm run deploy` flow before Cloudflare upload.
- Removed public `mailto:` / visible email triggers so Cloudflare no longer injects `/cdn-cgi/l/email-protection` links into live HTML.
- Added `npm run verify:live-semrush` for post-deploy live spot checks against the original SEMrush issue classes.
- Added a Cloudflare Response Header Transform Rule so `https://www.tupbebek.com/` 301 responses include HSTS.
- Deployed successfully to the canonical Cloudflare Pages project `tupbebek`.
- Latest verified deployment URL: `https://f3a6638f.tupbebek-3wk.pages.dev`.
- Rebuilt successfully and verified:
  - `npm run build`
  - `npm run verify:placeholder-links`
  - `npm run verify:link-hygiene`
  - `npm run verify:html-weight`
  - `npm run verify:title-lengths`
  - `npm run verify:structured-data`
  - `npm run verify:semrush-audit`
  - `npm run verify:live-semrush`
  - `npm run verify:live-semrush:pending-hsts`
  - `npm run verify:seo`
  - `npm run verify:deploy-target`

Remaining non-code or follow-up items:

- Run a fresh SEMrush recrawl so the external crawler can drop historical findings from the previous crawl.
- `/cdn-cgi/l/email-protection` is still a Cloudflare-reserved 404 URL if opened directly, but the live site no longer links to it after removing public email triggers.
- FAQPage JSON-LD is syntactically valid and now locally checked against visible page questions; sample URLs should still be spot-checked in Google Rich Results Test after deploy.
- `Content not optimized` affects only the same four pages that also had low text-to-HTML ratio and other technical flags in the original crawl; local post-fix checks show they have valid titles, descriptions, one H1, and 1,900+ visible words each.

## SEMrush Issue Counts

| Issue | Affected URLs / Count |
|---|---:|
| Low text to HTML ratio | 93 |
| Broken internal links | 93 |
| Structured data that contains markup errors | 65 |
| Title element is too long | 36 |
| Broken external links | 26 |
| External pages or resources with 403 HTTP status code | 4 |
| Content not optimized | 4 |
| No HSTS support | 1 |
| 4xx errors | 1 |

## P0 - Broken Internal Links From Placeholder URLs

SEMrush reports broken internal links on 93 pages. A local scan of `dist` confirms crawler-visible placeholder URLs:

| Broken target pattern | Built occurrences | Source |
|---|---:|---|
| `/undefined/` | 95 | Search result URL handling |
| `/$%7BsafeUrl%7D/` | 95 | Search result template string |
| `/${image}` / page-relative variants | 95+ | Search result image template string |
| `/$%7Bresult.image%7D/` | 1 | Hero search image template string |

Likely source files:

- `src/components/HeroSearch.astro`
- `src/components/SearchAutocomplete.astro`

The code uses HTML template literals inside Astro `<script define:vars>`. In the built output, `href="${safeUrl}"` becomes `href="/$%7BsafeUrl%7D/"`, and similar image placeholders are emitted into every page.

Recommended fix:

1. Replace search-result `innerHTML = template literal` rendering with DOM construction or safe string concatenation that Astro will not rewrite.
2. Escape text fields (`title`, `description`, `category`) before insertion if string rendering remains.
3. Add a post-build check that fails on crawler-visible placeholder URLs: `undefined`, `%7B`, `${`, `result.url`, `safeUrl`, `result.image`, `image}` in `href`/`src`.

Implemented:

- `HeroSearch.astro` and `SearchAutocomplete.astro` now avoid Astro-rewritten `href`/`src` placeholders in result HTML.
- Quick-nav selectors now use string concatenation instead of template-literal CSS selectors that were emitted as `#${entry.target.id}`.
- `src/utils/breadcrumbs.ts` now avoids generating the missing `/yazar/` parent breadcrumb for the author page.
- `scripts/verify-no-placeholder-links.mjs` fails the build verification if crawler-visible placeholder links return.

Verification run:

- `npm run verify:seo` passed.
- `npm run verify:placeholder-links` passed.
- Additional raw built-HTML internal-link scan found 0 broken normal-page internal links after the fix.

## P1 - Title Elements Too Long

SEMrush flags 36 titles. Examples:

| URL | Title length | Current title |
|---|---:|---|
| `/makaleler/asherman-sendromu/` | 111 | Asherman Sendromu (Rahim Ici Yapışıklık): Tanı, Histeroskopik Tedavi ve Sonraki Gebelik Yönetimi \| tupbebek.com |
| `/makaleler/pgt-a-bas-editor-kosesi/` | 109 | Baş Editör Köşesi - PGT-A Üzerine Bir Not: Genetik Tarama Ne Zaman Yarar, Ne Zaman Pazarlanır? \| tupbebek.com |
| `/makaleler/akraba-evliligi/` | 108 | Akraba Evliliği ve Genetik Risk: Taşıyıcılık Taraması, Genetik Danışmanlık ve PGT-M Yaklaşımı \| tupbebek.com |
| `/makaleler/adet-gorememe/` | 103 | Amenore (Adet Görememe): Primer ve Sekonder Tipler, Tanı Algoritması ve Tedavi Yaklaşımı \| tupbebek.com |
| `/makaleler/yasa-gore-tup-bebek-basari-oranlari/` | 98 | Yaşa Göre Tüp Bebek Başarı Oranları: 30, 35, 40 Yaş ve Üzeri İçin Gerçekçi Beklenti \| tupbebek.com |

Recommended fix:

- Add an optional shorter SEO title field, for example `seoTitle`, to article/static page metadata.
- Keep H1/title editorially rich, but render `<title>` from `seoTitle` where present.
- Target roughly 50-65 characters before brand suffix, and avoid promotional wording.

Implemented:

- Added optional `seoTitle` to the article content schema.
- Updated article layout title rendering to use `seoTitle` when present.
- Added shorter `seoTitle` values to the flagged article set and shortened 3 static page titles.
- Added `scripts/verify-title-lengths.mjs`.

Verification run:

- `npm run verify:title-lengths` passed with max rendered title length 75.

## P1 - Structured Data Warnings

SEMrush flags 65 URLs for structured data markup errors. Initial local build inspection found:

- 382 JSON-LD scripts across 95 built HTML files.
- 0 JSON parse errors.
- 65 `FAQPage` blocks.
- Basic FAQ integrity passed: every FAQPage had a `mainEntity` array with `Question`, `name`, `acceptedAnswer`, `Answer`, and `text`.
- A stricter visible-content check found 40 FAQ questions that were present in JSON-LD but not visible as matching page questions.

The 65 SEMrush warnings match the 65 FAQPage count exactly, so the likely issue is one of:

- SEMrush-specific rich result validation for FAQ markup.
- A property-level schema warning not caught by JSON syntax parsing.
- FAQPage usage on pages where SEMrush expects visible matching FAQ content or a different rich-result policy.

Implemented:

- Added `scripts/verify-structured-data.mjs` and `npm run verify:structured-data`.
- The verifier parses all built JSON-LD, checks FAQPage structure, blocks standalone top-level `Question` nodes, verifies FAQ question names are visible in page content, and checks article/breadcrumb essentials.
- Added `scripts/sync-visible-faq-schema.mjs` as a maintenance helper for aligning article FAQ schema with built visible questions.
- Removed 40 invisible FAQ schema entries across 21 article files.
- Removed the invalid FAQPage block from `mikroenjeksiyon-icsi-nedir.mdx`, where none of the schema questions matched the visible FAQ section.

Current local verification after cleanup:

- 381 JSON-LD scripts parsed successfully.
- 64 FAQPage blocks found.
- 58 article routes checked for Article + MedicalWebPage essentials.
- 93 BreadcrumbList nodes checked.
- 0 structured-data verification failures.
- Google's current FAQPage guidance still allows FAQ structured data for authoritative health-focused sites when FAQ content is visible and uses one accepted answer per question.

## P2 - External Link Problems

SEMrush flags 26 broken external links and 4 external 403 resources. The local link report also shows multiple external academic sources returning 403/404/timeouts, especially:

- `academic.oup.com`
- `cochranelibrary.com`
- `mdpi.com`
- `researchgate.net`
- malformed or localized PMC/NCBI/Frontiers paths containing `/makaleler/`

Recommended fix:

- For citations, prefer DOI links, PubMed pages, or publisher landing pages that return stable 200/3xx responses.
- Replace localized accidental URLs such as `pmc.ncbi.nlm.nih.gov/makaleler/...` with canonical English paths.
- Keep legitimate 403 publisher pages only if they are academically important, but consider adding DOI/PubMed alternatives in references.

Implemented:

- Added `scripts/verify-link-hygiene.mjs` to fail on malformed translated external paths, Cloudflare email-protection links, placeholder links, and unencoded DOI parentheses in built `href`/`src` values.
- Updated rendered DOI links and article JSON-LD citation `sameAs` URLs to encode DOI parentheses as `%28` / `%29`.
- Updated video embed scripts to create iframe URLs with DOM APIs instead of literal placeholder HTML strings.
- Updated `ReferenceList.astro` so visible citation links prefer PubMed URLs when a PMID is available, falling back to DOI and then explicit URL.
- Removed DOI fields that resolved as 404 from these references:
  - `beta-hcg-testi.mdx`
  - `akraba-evliligi.mdx`
  - `azospermi-mikro-tese.mdx`
  - `adet-gorememe.mdx`
  - `erkek-dogurganlik-besin-takviyeleri.mdx`
  - `embriyo-transferi-sonrasi-bakim.mdx`
  - `adet-duzensizligi-pcos.mdx`
  - `kanser-ve-fertilite.mdx`
  - `tup-bebek-sureci-rehber.mdx`
  - `yumurtlama-takibi.mdx`
  - `tup-bebek-nedir.mdx`
  - `yumurta-dondurma-rehberi.mdx`

Verification run:

- `npm run verify:link-hygiene` passed.
- Current source scan did not find the stale localized PMC/NCBI/Frontiers `/makaleler/` URLs from the old link report.
- Built HTML live-link check after the cleanup: 394 external `href/src` targets checked, 0 live 404s found.
- Remaining 403s are publisher/bot-blocking behavior, not confirmed broken URLs. ASRM URLs that Node fetch reported as errors returned 200 with `curl`.

## P2 - HSTS On `www`

Live header check on 2026-05-28:

- `https://tupbebek.com/` returns `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.
- `https://www.tupbebek.com/` first returns a 301 to the apex with `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.
- `public/_headers` already includes the global HSTS header, so the remaining issue is specifically the redirect response before Pages serves the apex page.
- Repo-side attempt: moving the HTTPS `www` redirect into the Worker did not change the live first response; Cloudflare's domain-level redirect still runs before the Worker. The current Wrangler OAuth scopes include `zone:read` but not zone/rules write permission, so this cannot be fixed from the current repo session.
- Final fix: a Cloudflare Response Header Transform Rule was added for `http.host eq "www.tupbebek.com"`.

Cloudflare rule:

- Area: Rules -> Transform Rules -> Modify Response Header
- Condition: `http.host eq "www.tupbebek.com"`
- Action: Set response header
- Header name: `Strict-Transport-Security`
- Header value: `max-age=63072000; includeSubDomains; preload`

After saving the rule, re-check with:

```bash
curl -I --max-redirs 0 https://www.tupbebek.com/
```

Current verification:

- `npm run verify:live-semrush` passes live checks for the 9-page sample.
- `curl -I --max-redirs 0 https://www.tupbebek.com/` confirms the 301 response now includes HSTS.

## P2 - 4xx `/cdn-cgi/l/email-protection`

SEMrush flags one 404:

- `https://tupbebek.com/cdn-cgi/l/email-protection`

This is Cloudflare email-obfuscation related. The current source search did not find direct references to `email-protection` or `data-cfemail`, so it may be historical crawl residue or injected behavior.

Repo-side checks:

- Source search found no active `data-cfemail` or `email-protection` markup outside audit reports and verifier scripts.
- `scripts/verify-link-hygiene.mjs` now fails if a future build emits `/cdn-cgi/l/email-protection` links.
- `scripts/verify-link-hygiene.mjs` also fails public built HTML that contains `mailto:` links or the protected public email address.

Live check on 2026-05-28:

- Before the final cleanup, Cloudflare injected `/cdn-cgi/l/email-protection#...` for the public `dr@senaiaksoy.net` footer email.
- After replacing public email links with `/iletisim/`, live sample pages returned 0 `/cdn-cgi/l/email-protection`, 0 `mailto:`, and 0 visible protected email hits.
- `npm run verify:live-semrush:pending-hsts` now includes this check for live sample pages.
- Direct requests to `https://tupbebek.com/cdn-cgi/l/email-protection` still return Cloudflare 404, but this URL is no longer emitted by the site.

Recommended follow-up:

- Re-crawl after deploying the repo fixes. If SEMrush still discovers this URL as linked, check Cloudflare Scrape Shield / Email Address Obfuscation and disable it for this zone.

Recommended fix:

- Re-crawl after the placeholder-link fix.
- If it persists, disable Cloudflare Email Address Obfuscation for this site or ensure no protected email markup is emitted.

## P3 - Low Text To HTML Ratio

SEMrush flags 93 URLs. Given the site is Astro with repeated header, search, cookie consent, JSON-LD, analytics consent code, and rich medical page UI, this is expected to be noisy. It is not the first repair target.

Recommended fix:

- First remove placeholder links and reduce inline search UI script bloat if practical.
- Defer content-ratio work unless Search Console or ranking data shows thin-page symptoms.

Implemented:

- Changed `astro.config.mjs` from `build.inlineStylesheets: 'always'` to `build.inlineStylesheets: 'never'`, so the 100KB+ Tailwind CSS payload is emitted as cacheable CSS assets instead of being embedded in every HTML document.
- Moved the mega menu initializer out of each `MegaMenuItem` instance and into `Header.astro`, reducing duplicate inline scripts.
- Added `scripts/verify-html-weight.mjs` to fail if Astro-built pages regain large inline CSS or duplicate mega menu initializers.

Measured impact on representative flagged pages:

| Page | Before HTML bytes | After HTML bytes | Before ratio | After ratio |
|---|---:|---:|---:|---:|
| `/erkek-infertilitesi/` | 333,072 | 206,434 | 5.89% | 9.50% |
| `/kadin-infertilitesi/` | 331,645 | 205,007 | 5.37% | 8.69% |
| `/psikolojik-destek/` | 322,600 | 195,948 | 5.54% | 9.12% |
| `/sss/` | 316,335 | 189,683 | 4.90% | 8.17% |

Browser smoke verification:

- Local static server opened `/sss/`, `/erkek-infertilitesi/`, and `/kadin-infertilitesi/`.
- CSS loaded via stylesheet links.
- Header remained fixed.
- Desktop mega menu opened and set `aria-expanded="true"`.
- No horizontal overflow found at 1366px viewport.

## P3 - Content Not Optimized

SEMrush flags 4 URLs:

- `/erkek-infertilitesi/`
- `/kadin-infertilitesi/`
- `/psikolojik-destek/`
- `/sss/`

These are the same pages that also had `Broken internal links`, `Low text to HTML ratio`, and, for the first three, structured-data warnings in the original crawl. The issue appears to be a compound SEMrush content-quality flag rather than a missing-H1 or low-word-count failure.

Post-fix local checks:

| Page | Title length | Meta description length | H1 count | Visible words |
|---|---:|---:|---:|---:|
| `/erkek-infertilitesi/` | 42 | 134 | 1 | 2,428 |
| `/kadin-infertilitesi/` | 42 | 150 | 1 | 2,244 |
| `/psikolojik-destek/` | 74 | 150 | 1 | 2,157 |
| `/sss/` | 36 | 152 | 1 | 1,943 |

No separate content rewrite is recommended from this signal alone. Re-crawl after deploy should show whether the technical fixes clear this coupled warning.

## Priority Action Plan

1. Fixed `HeroSearch.astro` and `SearchAutocomplete.astro` so built HTML no longer contains placeholder href/src values.
2. Added post-build verifiers for placeholder links, link hygiene, HTML weight, title length, structured data, and canonical SEO.
3. Added `seoTitle` support and shortened the 36 flagged titles.
4. Cleaned external citations with 404/malformed URLs and added link hygiene checks.
5. Cleaned FAQPage JSON-LD so structured FAQ questions match visible page questions.
6. Rebuild, deploy, and run a fresh SEMrush recrawl.
7. Add HSTS to the `www` redirect response in Cloudflare.
