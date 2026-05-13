# Sitemap Audit — tupbebek.com
**Date:** 2026-05-12 | **Auditor:** Claude Code (Sitemap Architecture)

---

## Validation Results

| Check | Status | Detail |
|---|---|---|
| XML well-formed | PASS | Both index and sitemap-0.xml parse cleanly |
| URL count (50k limit) | PASS | 88 URLs total — single file, no splitting needed |
| Sitemap index | PASS | `/sitemap-index.xml` → `/sitemap-0.xml` correctly |
| robots.txt reference | PASS | `Sitemap: https://tupbebek.com/sitemap-index.xml` present |
| `priority` / `changefreq` | PASS | Absent from all entries — correct |
| Draft articles excluded | PASS | 5 draft `.md` articles not in sitemap |
| Redirect pages excluded | PASS | 5 redirecting paths filtered in `astro.config.mjs` |
| `lastmod` on articles | PASS | All 55 article URLs carry real `lastmod` from `lastModified` or `publishDate` frontmatter |
| `lastmod` on static pages | FAIL | 33 static/category pages have no `lastmod` at all |
| `lastmod` date clustering | WARNING | 43 of 55 articles share the same date (2026-05-12) — looks mass-updated; Google may treat as unreliable |
| Location page threshold | INFO | 1 location page (`istanbul-tup-bebek-doktoru`) — well below the 30-page warning threshold |

---

## lastmod Coverage Gap

All 33 non-article URLs (homepage, category hubs, policy pages, SSS, rehberler, etc.) are emitted without any `lastmod`. The `serialize()` hook in `astro.config.mjs` only injects dates for `/makaleler/` paths; it silently skips everything else.

**Fix:** Extend `serialize()` with a static date map for the known hub pages, or derive their dates from the corresponding `.astro` file's git commit timestamp at build time.

---

## Stale Slug Overlap

Four `.md` content files share slugs with static `.astro` pages (`aciklanamayan-infertilite`, `basari-oranlari`, `basarisiz-denemeler`, `genetik-testler`). The Astro `[...slug].astro` dynamic route would try to render these as `/makaleler/<slug>/`, but the static pages at `/<slug>/` are the canonical destination. Because those `.md` files do not carry `status: draft`, they could generate duplicate `/makaleler/` routes at build time if `getPublishedArticles()` ever picks them up.

**Recommendation:** Set `status: draft` on these four `.md` files to be explicit, or delete them if the static page is the permanent canonical form.

---

## Draft Articles (Correctly Excluded)

The following five articles are `status: draft` and correctly absent from the sitemap:

- `dondurulmus-embriyo-transferi` — merged into `taze-dondurulmus-transfer`
- `erkek-kisirligi-besin-takviyeleri` — superseded by `erkek-dogurganlik-besin-takviyeleri`
- `hiperprolaktinemi-prolaktinom` — superseded by `hiperprolaktinemi-ve-kisirlik`
- `myomlar-ve-kisirlik` — superseded by `miyomlar-ve-tup-bebek`
- `pkos-ve-tup-bebek` — superseded by `adet-duzensizligi-pcos`

---

## Location Page Assessment

`/makaleler/istanbul-tup-bebek-doktoru/` is the only city/location-qualified page. Content covers clinic evaluation criteria (lab quality, ESHRE accreditation, success rate methodology) rather than just swapping a city name. Does not trigger the 30-page warning gate.

---

## Priority Actions

1. **FAIL — Add `lastmod` to 33 static pages.** Extend `serialize()` in `astro.config.mjs` with a static date map.
2. **WARNING — Review clustered `2026-05-12` lastmod dates.** If those 43 articles were not substantively changed on the same day, restore their actual `lastModified` values to preserve signal accuracy.
3. **LOW — Set `status: draft`** on the four `.md` files that overlap with static `.astro` page slugs to eliminate ambiguity.
