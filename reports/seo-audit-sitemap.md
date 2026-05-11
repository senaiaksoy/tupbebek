# Sitemap SEO Audit — tupbebek.com
**Audit date:** 2026-05-10  
**Files audited:** `dist/sitemap-index.xml`, `dist/sitemap-0.xml`  
**Source cross-checked:** `src/content/articles/` (48 .md files), `src/pages/**/*.astro` (36 pages), `public/_redirects`, `public/robots.txt`

---

## 1. XML Validity and Namespaces

| Check | Result |
|---|---|
| XML well-formed | PASS |
| Encoding UTF-8 | PASS |
| sitemap-index namespace | PASS |
| urlset namespace | PASS |
| `priority` / `changefreq` tags | PASS — none present |
| `news` namespace declared but unused | FAIL — remove |
| `xhtml` namespace declared but unused | FAIL — remove |
| `image` namespace declared but unused | FAIL — remove (opportunity, see §7) |
| `video` namespace declared but unused | FAIL — remove |

The `urlset` opening tag declares four extra namespaces (`news`, `xhtml`, `image`, `video`) but uses zero corresponding elements. This adds noise and signals unfinished intent to validators. Strip all four until the matching tags are actually populated.

---

## 2. URL Count: Expected vs Actual

### Static/hub pages

Pages with a `.astro` source file (excluding `404.astro` and `[...slug].astro`):

```
index, aciklanamayan-infertilite, basari-oranlari, basarisiz-denemeler,
beslenme-yasam, cerez-politikasi, duygusal-destek, e-kitap-indir,
editoryal-politika, endometriozis-adenomyozis, erkek-infertilitesi,
fertilite-koruma, genetik-testler, gizlilik-politikasi, hakkimizda,
hormon-paneli, ilac-rehberi, iletisim, ivf-rehberi, kadin-infertilitesi,
kullanim-kosullari, makaleler/index, pgt-merkezi, psikolojik-destek,
rehberler, sorunlar, sss, tani-sureci, tedavi-yontemleri,
tibbi-sorumluluk-reddi, tibbi-sozluk, transfer-sureci, yas-ve-fertilite,
yayin-kurulu, yayin-sureci
```
Count: **35 static pages** (including homepage)

### Article source files

48 `.md` files in `src/content/articles/`. Five are zombie duplicates superseded by redirects (see §2b). Active unique article slugs: **43**.

### Expected total: 35 + 43 = **78 URLs**

### Actual sitemap-0.xml count: **90 URLs**

The sitemap is *larger* than the verified source inventory, which is the inverse of the expected finding. Explanation in §2a and §2b.

---

### 2a. Articles IN sitemap with NO source `.md` file (sitemap orphans)

These 12 slugs appear under `/makaleler/` in the sitemap but have no corresponding file in `src/content/articles/`. They either route to a dynamic page built from a different data source, or they are stale entries pointing to content that was removed or not yet created.

| Sitemap URL | Source file found |
|---|---|
| `/makaleler/bagisiklik-tedavileri/` | NO |
| `/makaleler/duygusal-dayaniklik-rehberi/` | NO |
| `/makaleler/dusuk-amh-hamilelik/` | NO |
| `/makaleler/embriyo-transferi-gun-secimi/` | NO |
| `/makaleler/endometriyal-scratching/` | NO |
| `/makaleler/era-testi-iluzyon/` | NO |
| `/makaleler/ivf-oncesi-histeroskopi/` | NO |
| `/makaleler/iyi-tup-bebek-merkezi/` | NO |
| `/makaleler/izotretinoin-sperm/` | NO |
| `/makaleler/laboratuvar-raporu-yorumlama/` | NO |
| `/makaleler/varikosel-nedir-ne-zaman-ameliyat-gerekir/` | NO |
| `/makaleler/yumurta-dondurma-rehberi/` | NO |

**Action:** Verify these pages return HTTP 200. If they are built from a secondary content source (e.g. a CMS or different collection), document that source. If they 404, remove them from the sitemap immediately. The prior finding that the live sitemap may 404 makes this the highest-risk item — a sitemap full of 404 URLs is actively harmful to crawl budget.

---

### 2b. Source files NOT in sitemap (potential missing pages)

Five `.md` files exist in `src/content/articles/` but are absent from the sitemap. All five are old slugs that have 301 redirects defined in `_redirects`, confirming they are superseded:

| Old source file | Redirects to |
|---|---|
| `dondurulmus-embriyo-transferi.md` | `/makaleler/taze-dondurulmus-transfer/` |
| `hiperprolaktinemi-prolaktinom.md` | `/makaleler/hiperprolaktinemi-ve-kisirlik/` |
| `myomlar-ve-kisirlik.md` | `/makaleler/miyomlar-ve-tup-bebek/` |
| `pkos-ve-tup-bebek.md` | `/makaleler/opk-ve-ivf/` |
| `erkek-kisirligi-besin-takviyeleri.md` | `/makaleler/erkek-dogurganlik-besin-takviyeleri/` |

These are zombie source files. If the slug router picks them up, they will render duplicate content at an old URL that also has a redirect defined — a redirect loop risk. Delete or mark `draft: true` on all five.

---

## 3. lastmod Accuracy

### Missing lastmod on static/hub pages

All 22 hub-level pages in the sitemap have no `lastmod` element (homepage, hakkimizda, iletisim, sss, makaleler index, and all hub category pages). Google states it ignores `lastmod` when the value appears unreliable, but providing real dates on high-priority pages helps with crawl scheduling.

**Recommendation:** Add `lastmod` to at minimum the homepage, hakkimizda, sss, and makaleler index using the date of last meaningful content change.

### lastmod anomaly: basarisiz-denemeler

```
/makaleler/basarisiz-denemeler/ → lastmod 2024-03-31
```

Every other article carries a 2026-03 or later date. This is almost certainly a typo — the year should be `2026`. A 2024 date makes Google treat this article as two years stale while peers are freshly dated.

### Timestamp format

All dates use ISO 8601 with time component (`2026-04-03T00:00:00.000Z`). The date-only format (`2026-04-03`) is equally valid per the sitemap protocol and is less verbose. Either is acceptable; the midnight-UTC timestamp is not wrong, just unnecessarily long.

---

## 4. Hub vs Article Duplicate Intent Pairs

The following URL pairs exist simultaneously in the sitemap, where a hub page and a `/makaleler/` article share the same topic. Both are indexed, creating keyword cannibalization risk.

| Hub page | Article page |
|---|---|
| `/aciklanamayan-infertilite/` | `/makaleler/aciklanamayan-infertilite/` |
| `/basari-oranlari/` | `/makaleler/basari-oranlari/` |
| `/basarisiz-denemeler/` | `/makaleler/basarisiz-denemeler/` |
| `/genetik-testler/` | `/makaleler/genetik-testler/` |

**What to evaluate for each pair:**
- If the hub page is a thin category/nav page and the article is the substantive content: add `<link rel="canonical">` on the hub page pointing to the article, and remove the hub URL from the sitemap.
- If both pages have substantial unique content (hub = overview + links, article = deep-dive): differentiate the `<title>` and `<h1>` clearly and keep both in the sitemap.
- The `/aciklanamayan-infertilite/` pair is the most prominent because the hub slug is identical to the article slug. This will likely confuse Google as to which URL to rank.

---

## 5. Trailing Slash Consistency and Querystrings

All 90 sitemap URLs end with a trailing slash. No querystrings detected. **PASS.**

`robots.txt` correctly points to `https://tupbebek.com/sitemap-index.xml`. **PASS.**

---

## 6. Cross-Check: _redirects and robots.txt Disallow

### Redirected URLs present in sitemap (HIGH severity)

Two sitemap entries resolve to 301 redirects per `_redirects`:

| Sitemap URL | Redirects to | Rule in _redirects |
|---|---|---|
| `/sorunlar/` | `/kadin-infertilitesi/` | Line 17 |
| `/yayin-sureci/` | `/editoryal-politika/` | Line 18 |

A URL that 301-redirects should not appear in the sitemap. Google will follow the redirect and index the destination, but the sitemap entry wastes crawl budget and may cause Google to discount the sitemap's reliability. Remove both from the sitemap and confirm their destination URLs are listed instead.

- `/kadin-infertilitesi/` is in the sitemap. PASS.
- `/editoryal-politika/` is in the sitemap. PASS.

So the fix is simply removing `/sorunlar/` and `/yayin-sureci/` from `sitemap-0.xml`.

### robots.txt Disallow

Disallowed paths: `/api/`, `/_astro/`. Neither appears in the sitemap. **PASS.**

---

## 7. Image Sitemap Opportunity

The `image` namespace is declared but no `<image:image>` tags are used. Article pages have featured images (typical for medical content sites of this type). Adding image sitemap entries for article featured images provides:

- Eligibility for Google Image Search results, which can drive additional organic traffic for medical/health topics.
- Better crawl signals for visual content.

**Recommended implementation pattern:**

```xml
<url>
  <loc>https://tupbebek.com/makaleler/tup-bebek-nedir/</loc>
  <lastmod>2026-04-03</lastmod>
  <image:image>
    <image:loc>https://tupbebek.com/images/tup-bebek-nedir.jpg</image:loc>
    <image:title>Tüp Bebek Nedir?</image:title>
  </image:image>
</url>
```

Either populate this for all articles (requires confirming image URLs are stable) or remove the `image` namespace declaration until it is implemented.

---

## 8. Live Sitemap Status (Prior Finding)

The prior finding flagged that the live sitemap at `https://tupbebek.com/sitemap-index.xml` may return 404. This audit cannot perform live HTTP requests, but the structural risk is real: if Cloudflare Pages is not serving the `dist/` output correctly, or if the deploy has not propagated, both sitemap files would 404. Confirm via `curl -I https://tupbebek.com/sitemap-index.xml` and `curl -I https://tupbebek.com/sitemap-0.xml` from a shell with network access. If either returns non-200, the entire sitemap signal is lost from Google Search Console.

---

## Fixes Required Summary

### Critical
1. Verify HTTP status of all 12 sitemap-orphan article URLs (no source `.md` found). Remove any that return non-200.
2. Confirm live sitemap files return HTTP 200 — if not, diagnose the Cloudflare Pages deployment.

### High
3. Remove `/sorunlar/` and `/yayin-sureci/` from the sitemap (they are 301 redirects).
4. Delete or draft-flag 5 zombie source `.md` files (`dondurulmus-embriyo-transferi`, `hiperprolaktinemi-prolaktinom`, `myomlar-ve-kisirlik`, `pkos-ve-tup-bebek`, `erkek-kisirligi-besin-takviyeleri`) to prevent the router from rendering them as live duplicate pages.
5. Resolve the 4 hub/article duplicate-intent pairs with explicit canonicalization decisions.

### Medium
6. Fix `basarisiz-denemeler` lastmod from `2024-03-31` to `2026-03-31`.
7. Add `lastmod` to the homepage, hakkimizda, sss, and makaleler index pages.

### Low / Info
8. Strip the 4 unused namespace declarations (`news`, `xhtml`, `image`, `video`) from the `urlset` opening tag, or populate `image` tags if image sitemap is implemented.

---

## Score and Summary (350-word version)

**Score: 54 / 100**

**Missing URLs:** 0 legitimate pages are missing from the sitemap. The gap runs the other direction — 12 sitemap entries have no verified source file, making them potential 404s.

**Top 3 fixes:**

1. **Audit the 12 orphaned article URLs for HTTP 200.** These are sitemap entries with no `.md` source file: `bagisiklik-tedavileri`, `duygusal-dayaniklik-rehberi`, `dusuk-amh-hamilelik`, `embriyo-transferi-gun-secimi`, `endometriyal-scratching`, `era-testi-iluzyon`, `ivf-oncesi-histeroskopi`, `iyi-tup-bebek-merkezi`, `izotretinoin-sperm`, `laboratuvar-raporu-yorumlama`, `varikosel-nedir-ne-zaman-ameliyat-gerekir`, `yumurta-dondurma-rehberi`. If they 404, they must be removed. A sitemap with 404 entries signals low quality to Google and degrades crawl budget across the domain.

2. **Remove the two redirecting URLs from the sitemap** (`/sorunlar/` and `/yayin-sureci/`). These are defined as 301 redirects in `_redirects`. Submitting redirect URLs in a sitemap wastes crawl budget and reduces Googlebot's confidence in the sitemap's accuracy.

3. **Resolve the 4 hub/article cannibalization pairs** (`aciklanamayan-infertilite`, `basari-oranlari`, `basarisiz-denemeler`, `genetik-testler`). Each topic has two competing URLs in the sitemap. Without a canonical signal differentiating them, Google will choose which to rank — and may choose the thinner hub page over the substantive article, or suppress both. For each pair: if the hub is thin, canonicalize it to the article and remove it from the sitemap. If both have distinct value, ensure `<title>` and `<h1>` are clearly differentiated.

**Score breakdown:**

| Area | Score |
|---|---|
| XML validity | 90/100 (unused namespaces) |
| URL accuracy | 40/100 (12 unverified orphans, 2 redirect entries) |
| lastmod | 55/100 (1 year-typo, all hub pages missing dates) |
| Canonical/intent | 50/100 (4 duplicate pairs unresolved) |
| Structure | 80/100 (trailing slash consistent, no querystrings) |
| robots/redirects alignment | 70/100 (2 redirect URLs in sitemap) |
