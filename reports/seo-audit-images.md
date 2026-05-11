# tupbebek.com SEO Image Audit

**Date:** 2026-05-10  
**Data source:** Image Audit (static analysis) - filesystem + frontmatter + Astro layout/component scan + captured prerender HTML at reports/tmp-home.html and reports/tmp-article.html.  
**Brand constraints applied:** no baby/infant photos, no patient faces, no before/after, palette deep navy #2563a8 + mint #3a8a66 + soft apricot #b8860b, medical vector aesthetic, editable text overlay (do not rasterize Inter/Manrope).  
**Note:** Generation MCP (nanobanana-mcp) was NOT invoked - this report is a plan only.

---

## 1. Executive Summary

**Image SEO Score: 62 / 100**

**Strengths:**
- 100% of articles (64/64) populate both image and imageAlt frontmatter.
- 92% WebP adoption in public/images/ (114 WebP / 4 PNG / 5 JPEG / 1 SVG).
- Article og:image is unique per article (no global fallback for articles).
- Alt text is Turkish-localized and keyword-rich.

**Critical issues (cost the 38 points):**
- **Aspect ratio failure:** 52 of 64 article images are NOT 1200x630. Most are 1440x500 banners (ratio 2.88) or 3072x2048 originals (ratio 1.50). The og:image:width=1200 + og:image:height=630 meta tags are hardcoded but the real files do not match.
- **OG fallback is wrong shape:** Global fallback /images/home/luxury-embryo.webp is 1024x1024 square. All 35 non-article pages (homepage, hubs, legal) inherit it. They do not pass a custom image= prop to BaseLayout.astro.
- **Oversized originals:** 11 files exceed 1 MB. embryoscope-kapak-2026.png is **21 MB** (5504x3072).
- **No ImageObject schema** on article images - just a flat URL string in JSON-LD.
- **e-kitap dir is all JPEG** (12 files, 8.5 MB). 0% WebP coverage there.
- **1 broken reference:** /images/endometriozis-adenomyozis.png is hardcoded in src/pages/endometriozis-adenomyozis.astro:105, file does not exist.

---

## 2. Image Audit Summary

| Metric | Value | Status |
|---|---|---|
| Total images in public/images/ | 124 | - |
| Total images in public/e-kitap/images/ | 12 | - |
| Total physical image files in public/ | 137 | - |
| Articles with image: frontmatter populated | 64 / 64 | Pass |
| Articles with imageAlt: frontmatter populated | 64 / 64 | Pass |
| Articles with unique og:image (not global fallback) | 64 / 64 | Pass |
| Hub/marketing pages with unique og:image | 0 / 35 | Fail |
| Article OG images at true 1200x630 (within 10% ratio) | 12 / 64 | Fail |
| Global OG fallback dimensions correct | 1024x1024 (should be 1200x630) | Fail |
| Schema ImageObject (with width/height/caption) used | 0 / 64 articles | Fail |
| WebP adoption - public/images/ | 92% (114/124) | Pass |
| WebP adoption - public/e-kitap/images/ | 0% (0/12) | Fail |
| Average WebP file size (public/images/) | ~84 KB | Pass |
| Files over 200 KB | 17 | Warning |
| Orphan files (not referenced in src/) | 26 | Warning |
| Broken references in code | 1 | Fail |
| Duplicate files | 1 pair (ASCII + Turkish filename) | Warning |

---

## 3. Format and Size Findings

### 3.1 Oversized files (>= 200 KB) - priority compression targets

| File | Size | Dimensions | Use | Action |
|---|---|---|---|---|
| makaleler/embryoscope-kapak-2026.png | 21 MB | 5504x3072 | OG for embryoscope-yapay-zeka.md | Recompress to 1200x630 WebP (~150 KB) |
| makaleler/over-prp-surec-infografik.jpeg | 2.5 MB | 5504x3072 | Inline | Resize 1600x900 WebP |
| makaleler/embryoscope-isleyis-infografik-1.jpeg | 2.5 MB | 5504x3072 | Inline | Resize 1600x900 WebP |
| makaleler/alkol-ve-fertilite.webp | 2.2 MB | 5504x3072 | Article hero | Resize 1200x630 WebP |
| makaleler/adet-duzensizligi-pcos.webp | 1.7 MB | 5504x3072 | Article hero | Resize 1200x630 WebP |
| makaleler/embryoscope-euploid-aneuploid-gelisim-hizi-3.png | 1.5 MB | 1536x1024 | Inline diagram | Convert to WebP (~150 KB) |
| makaleler/akraba-evliligi.webp | 1.5 MB | 5504x3072 | Article hero | Resize 1200x630 WebP |
| makaleler/adet-gorememe.webp | 1.2 MB | 5504x3072 | Article hero | Resize 1200x630 WebP |
| library/psikoloji/danismanlik-gorusmesi.webp | 1.1 MB | 5632x3072 | Library | Resize 1200x630 WebP |
| makaleler/embryoscope-idascore-sema-2.png | 1.0 MB | 1536x1024 | Inline diagram | Convert to WebP (~120 KB) |
| makaleler/asherman-sendromu.webp | 1.0 MB | 5504x3072 | Article hero | Resize 1200x630 WebP |
| library/psikoloji/yas-iyilesmeler.webp | 0.9 MB | 2048x2048 | Library | Resize 1200x630 WebP |
| e-kitap/images/cover.jpg | 3.3 MB | 2816x1536 | E-book cover | Convert WebP + 1200x630 OG variant |
| e-kitap/images/erkek-besinleri.jpg | 0.9 MB | 5504x3072 | E-book | Convert WebP, 1280x720 |
| e-kitap/images/akdeniz-diyet-tabagi.jpg | 0.8 MB | 1024x1024 | E-book | Convert WebP |
| e-kitap/images/Detoks-besinleri.jpg | 0.8 MB | 5632x3072 | E-book | Convert WebP, resize |
| e-kitap/images/hucresel-beslenme.jpg + Turkish-diacritic copy | 0.7 MB each | 1024x1024 | E-book | DUPLICATE - delete diacritic copy |

**Quick-win savings (no AI cost):**
- Resizing 8 article heroes from 5504x3072 to 1200x630 WebP: ~10 MB saved
- Converting 12 e-kitap JPEGs to WebP at sensible sizes: ~6 MB saved
- Converting 4 inline PNG diagrams to WebP: ~3 MB saved
- **Total: ~19 MB removed from the public bundle.**

### 3.2 Aspect ratio audit (article OG images)

| Ratio class | Count | Example | Impact |
|---|---|---|---|
| ~1.91 (1200x630, OG-correct) | 12 | embryoglue.webp 1600x720 | OK - meta matches file |
| 2.88 (1440x500 banner) | ~40 | library/hastalik/*.webp series | Wider than OG; sides cropped on Twitter/Facebook |
| 1.50 (3:2 photo) | ~8 | makaleler/tup-bebek-nedir.webp 3072x2048 | Taller than OG; letterboxed |
| 1.00 (square) | 3 | basari_oranlari_hero.webp 512x512, luxury-embryo.webp 1024x1024 | Severe - declared 1200x630 in meta is a lie |
| 3.84 (panorama) | 1 | ivf_tedavi_sureci.webp 1080x281 | Severe crop on social cards |

src/layouts/BaseLayout.astro:99-100 hardcodes the dimension meta regardless of the real file.

---

## 4. OG Image Coverage

### 4.1 Article pages

- Set by src/pages/makaleler/[...slug].astro:80 via image={sanitizedImage} from entry.data.image.
- 64 of 64 articles set this. **Coverage 100%.**
- But **52 of 64** point to files that do not match the declared 1200x630 ratio.

### 4.2 Hub / marketing pages

The following 35 pages do NOT pass an image= prop to BaseLayout, so all inherit the global fallback https://tupbebek.com/images/home/luxury-embryo.webp (1024x1024 square):

```
/                                /aciklanamayan-infertilite        /basari-oranlari
/basarisiz-denemeler             /beslenme-yasam                   /cerez-politikasi
/duygusal-destek                 /e-kitap-indir                    /editoryal-politika
/endometriozis-adenomyozis       /erkek-infertilitesi              /fertilite-koruma
/genetik-testler                 /gizlilik-politikasi              /hakkimizda
/hormon-paneli                   /ilac-rehberi                     /iletisim
/ivf-rehberi                     /kadin-infertilitesi              /kullanim-kosullari
/makaleler                       /pgt-merkezi                      /psikolojik-destek
/rehberler                       /sorunlar                         /sss
/tani-sureci                     /tedavi-yontemleri                /tibbi-sorumluluk-reddi
/tibbi-sozluk                    /transfer-sureci                  /yas-ve-fertilite
/yayin-kurulu                    /yayin-sureci
```

**Top 10 hubs by SEO priority (need unique OG images first):**

1. / - homepage
2. /makaleler - content index
3. /kadin-infertilitesi - pillar
4. /erkek-infertilitesi - pillar
5. /tedavi-yontemleri - pillar
6. /tani-sureci - pillar
7. /sorunlar - pillar
8. /rehberler - guides hub
9. /hakkimizda - E-E-A-T trust page
10. /yayin-kurulu - E-E-A-T board page

---

## 5. Alt-Text Quality Spot Check

64 / 64 articles have imageAlt. Sample assessment:

- **Strong (descriptive, keyword-natural):** adet duzensizligi ve polikistik over sendromu pcos illustrasyonu, micro-TESE cerrahi sperm arama ameliyati ve mikroskop altinda inceleme, yumurta dondurma sureci vitrifikasyon laboratuvari.
- **Borderline keyword-stuffed:** hiperprolaktinemi yuksek prolaktin hormonu ve kisirlik iliskisi (acceptable but verging on listing).
- **Weak (too short, mirrors title):** embryoglue embriyo yapistiricisi faydalari (no diacritics).
- **Inconsistent diacritics:** Some omit Turkish diacritics, others include them. Recommend a normalisation pass.

No alt text is missing; no purely decorative-empty alt. **Alt-text grade: B+.**

---

## 6. Schema ImageObject Findings

src/components/ArticleSchema.astro:130 currently emits a flat URL string for the article image, not an ImageObject. Recommended fix - emit:

```json
"image": {
  "@type": "ImageObject",
  "url": "https://tupbebek.com/images/makaleler/<file>.webp",
  "width": 1200,
  "height": 630,
  "caption": "<imageAlt value>"
}
```

**Cross-reference with reports/seo-audit-schema.md:** the schema agent flagged the same gap and additionally recommends creating /images/brand/tupbebek-logo.png (512x512, PNG). Google Organization-logo validator does not accept the current favicon.svg reference. Both audits agree.

ImageObject IS used in two places today:
- BaseLayout.astro:45 - publisher logo using favicon.svg (rejected by validator)
- ArticleSchema.astro:141 - publisher logo, same issue

---

## 7. Orphan and Broken Files

### 7.1 Orphans (in public/ but not referenced) - 26 files

Likely safe to delete (after manual confirmation):

- /images/erkek-infertilitesi.webp (root, 406 KB, 3072x2048) - duplicate of home/erkek-infertilitesi.webp (35 KB, 1200x800)?
- /images/logo-tupbebek.webp (65 KB) - redundant with logo-tupbebek-sm.webp (6 KB)?
- /images/senai-aksoy.webp (root, 65 KB) vs /images/hakkimizda/senai-aksoy.webp + 4 per-hub copies
- /images/makaleler/microscope.webp, /images/makaleler/scientist.webp
- /images/rehberler/clinical-prep.webp, senai-aksoy-5.webp
- /images/sorunlar/cell-biology.webp, hormonal-cycles.webp, senai-aksoy-4.webp
- /images/sss/scientific-viz.webp, senai-aksoy-2.webp
- /images/tani-sureci/abstract-cells.webp, consultation.webp, dna-cells.webp, senai-aksoy-3.webp
- /images/tedavi-yontemleri/clinical-lab.webp, lab-microscope.webp, petri-dish.webp
- /images/hakkimizda/clinical-review.webp

Likely served directly (DO NOT delete without checking PDF/landing-page references):

- All 12 files in /e-kitap/images/ - only cover.jpg is referenced from source (src/pages/e-kitap-indir.astro:33). The other 11 are likely embedded in the PDF or linked elsewhere.

### 7.2 Broken (referenced in source, file missing) - 1

| Reference | Found at | Action |
|---|---|---|
| /images/endometriozis-adenomyozis.png | src/pages/endometriozis-adenomyozis.astro:105 | Create asset OR swap <img src> to existing library image |

### 7.3 Duplicate - 1 pair

/e-kitap/images/hucresel-beslenme.jpg and the Turkish-diacritic variant in the same directory. Same content, ASCII vs Turkish filename. Keep the ASCII copy; delete the diacritic version.

---

## 8. Per-Page Image Generation Plan

All prompts honour brand constraints:

- No babies, no patient faces, no before/after.
- Palette: deep navy #2563a8 + mint #3a8a66 + soft apricot #b8860b, neutral grays.
- Medical vector / editorial illustration aesthetic, no photorealism.
- No baked-in text - render Inter/Manrope at build time via Astro <Image> overlay component, do not rasterize labels into pixels.

**Target ratios:**
- OG / Twitter card: **1200 x 630** (1.91:1)
- Article hero / 16:9: **1600 x 900**
- Card thumbnail: **800 x 450**

### 8.1 Priority - top 10 hub pages missing unique OG

| # | Page | Slug | Use | Prompt (no text in image) | Filename | Aspect | Priority |
|---|---|---|---|---|---|---|---|
| 1 | Homepage | / | og | Abstract editorial illustration: layered organic shapes in deep navy and mint, subtle DNA double-helix motif, soft gradient backdrop, gold accent line in apricot, no figures, premium medical-journal aesthetic, generous negative space top-right for headline overlay | /images/og/homepage-og.webp | 1200x630 | Critical |
| 2 | Makaleler hub | /makaleler | og | Flat vector library: stacked open-book outlines and abstract paper sheets in navy/mint, faint hexagonal molecular pattern in background, soft apricot bookmark accent, no faces | /images/og/makaleler-og.webp | 1200x630 | Critical |
| 3 | Kadin infertilitesi | /kadin-infertilitesi | og | Anatomical vector: stylised ovary cross-section with follicle development arc, navy line work on cream backdrop, mint highlight on dominant follicle, apricot accent on luteal phase, no patient figures, anatomy-chart aesthetic | /images/og/kadin-infertilitesi-og.webp | 1200x630 | Critical |
| 4 | Erkek infertilitesi | /erkek-infertilitesi | og | Vector microscope lab scene: sperm motility schematic with curved arrow trails, navy + mint linework, lab petri-dish silhouette in apricot, hexagonal lab grid background, no human figures | /images/og/erkek-infertilitesi-og.webp | 1200x630 | High |
| 5 | Tedavi yontemleri | /tedavi-yontemleri | og | Process diagram: 4-step horizontal flow with navy circles, mint connecting line, apricot terminal node, abstract gametes and embryo icons in flat-vector style, no human imagery | /images/og/tedavi-yontemleri-og.webp | 1200x630 | High |
| 6 | Tani sureci | /tani-sureci | og | Diagnostic flow chart: navy clipboard outline + mint checkmark column + apricot timeline arrow, ultrasound waveform decorative line, clinical illustration style, no people | /images/og/tani-sureci-og.webp | 1200x630 | High |
| 7 | Sorunlar | /sorunlar | og | Conceptual vector: branching tree of medical icons (cell, ovary, sperm, hormone molecule) on a navy gradient, mint highlight on each node, apricot root, no faces | /images/og/sorunlar-og.webp | 1200x630 | High |
| 8 | Rehberler | /rehberler | og | Editorial vector: stacked guide booklets in navy + mint with apricot ribbon, faint anatomical line drawings in background, no people, generous left padding for headline overlay | /images/og/rehberler-og.webp | 1200x630 | Medium |
| 9 | Hakkimizda | /hakkimizda | og | Trust / credibility vector: navy shield outline framing an abstract caduceus (replace snake motif with stylised mint olive branch), apricot certification ribbon, clean white background | /images/og/hakkimizda-og.webp | 1200x630 | High |
| 10 | Yayin kurulu | /yayin-kurulu | og | Editorial board vector: navy desk silhouette with mint pen + manuscript outline, apricot peer-review stamp icon, hexagonal scientific pattern faint backdrop, no faces | /images/og/yayin-kurulu-og.webp | 1200x630 | Medium |

### 8.2 Top 10 articles - re-render at correct OG aspect ratio

These articles have a unique image but the file has wrong aspect ratio for OG. Generate a new OG-specific variant.

| # | Article slug | Current file | Current dims | New prompt | Filename | Priority |
|---|---|---|---|---|---|---|
| 1 | embryoscope-yapay-zeka | embryoscope-kapak-2026.png (21 MB) | 5504x3072 | EmbryoScope time-lapse incubator vector cross-section, mint embryo cluster inside, navy data-overlay shapes (no text), apricot AI scoring rings, lab aesthetic | /images/og/embryoscope-yapay-zeka-og.webp | Critical |
| 2 | tup-bebek-nedir | tup-bebek-nedir.webp | 3072x2048 | IVF process overview: 5-stage navy/mint icon flow (ovary > egg > fertilisation > embryo > uterus outline), apricot accent on transfer step, no people | /images/og/tup-bebek-nedir-og.webp | Critical |
| 3 | pkos-ve-tup-bebek | library/hastalik/pkos-ve-ivf.webp | 1440x500 | PCOS ovary anatomy vector: cyst-studded ovary cross-section in navy/mint linework, apricot hormonal-cycle line graph overlay, no faces | /images/og/pkos-ve-tup-bebek-og.webp | High |
| 4 | endometriozis-tup-bebek | library/hastalik/endometriosis_tedavi.webp | 1440x500 | Endometriosis vector: stylised uterus + scattered apricot tissue dots indicating ectopic foci, navy linework, mint laparoscopic instrument silhouette | /images/og/endometriozis-tup-bebek-og.webp | High |
| 5 | over-prp | over-prp-2026-kapak.jpeg | 3072x2048 | PRP ovary rejuvenation vector: ovary cross-section receiving navy syringe, golden platelet particles in apricot, mint regeneration glow, no faces | /images/og/over-prp-og.webp | High |
| 6 | yumurta-dondurma-rehberi | yumurta-dondurma-rehberi.webp | 5504x3072 | Egg vitrification vector: cryotank cross-section with mint vapour, navy egg cells inside, apricot temperature gauge, no people | /images/og/yumurta-dondurma-rehberi-og.webp | High |
| 7 | azospermi-mikro-tese | azospermi-mikro-tese.webp | 5504x3072 | Micro-TESE vector: navy microscope outline + mint testicular tissue map with apricot sperm dots, surgical schematic style, no faces | /images/og/azospermi-mikro-tese-og.webp | High |
| 8 | kac-yumurta-gerekir | library/embriyo/yumurta-sayisi.webp | 1440x550 | Statistical vector: navy ovary outline + mint dot grid representing egg yield, apricot probability curve overlay, no rasterized numbers | /images/og/kac-yumurta-gerekir-og.webp | Medium |
| 9 | genetik-testler | library/embriyo/pgt.webp | 1440x500 | PGT vector: navy blastocyst embryo outline + mint trophectoderm biopsy needle, apricot DNA double-helix in background, lab schematic | /images/og/genetik-testler-og.webp | Medium |
| 10 | iui-nedir | library/tedavi/iac.webp | 1440x500 | IUI procedure vector: navy uterus cross-section + mint catheter line + apricot sperm cloud, schematic style, no patient body | /images/og/iui-nedir-og.webp | Medium |

### 8.3 E-book

| Page | Prompt | Filename | Aspect | Priority |
|---|---|---|---|---|
| /e-kitap-indir | E-book vector cover scene: navy hardcover book opening upward, mint pages with abstract nutrition icons (olive branch, almond, leafy-green silhouettes in apricot), apricot bookmark, no food photography, no people | /images/og/e-kitap-indir-og.webp | 1200x630 | High |

---

## 9. Implementation Roadmap

### Phase 1 - Critical fixes (no AI cost, pure pipeline / dev work)

1. Resize oversized hero images to 1200x630 WebP using sharp (embryoscope-kapak-2026.png + 8 article heroes).
2. Convert all /e-kitap/images/*.jpg to WebP at sensible sizes.
3. Fix broken reference: create or swap /images/endometriozis-adenomyozis.png in src/pages/endometriozis-adenomyozis.astro:105.
4. Delete duplicate /e-kitap/images/ Turkish-diacritic filename (keep ASCII).
5. Update src/layouts/BaseLayout.astro:99-100 to stop hardcoding 1200x630 meta - either pass real dimensions per page or remove the width/height meta tags until images match.
6. Update src/components/ArticleSchema.astro:130 to emit ImageObject with width, height, caption: d.imageAlt.
7. Create publisher logo PNG /images/brand/tupbebek-logo.png (512x512 transparent) and update both BaseLayout.astro:46 and ArticleSchema.astro:142 per reports/seo-audit-schema.md.

### Phase 2 - Hub OG generation (requires nanobanana-mcp)

11 prompts in section 8.1 + 8.3. Generate to /images/og/*.webp at 1200x630. Batch in one session. After generation, set image="/images/og/<slug>-og.webp" on each hub page <BaseLayout> call.

### Phase 3 - Article OG re-render (requires nanobanana-mcp)

10 prompts in section 8.2. Keep the existing in-body hero image for the article body; add a new OG-specific image and update each article image: frontmatter to point to the new /images/og/*-og.webp.

Optional: add a new optional ogImage field to src/content/config.ts so authors can keep the in-body hero and the OG card separate.

### Phase 4 - Long-tail OG

Remaining 44 articles. Sort by GSC impression volume (data workflow in reports/gsc-coverage-redirect-analysis.md) and prioritise top quartile first.

---

## 10. Cost Estimation

(Fill in once nanobanana-mcp per-image pricing is confirmed.)

| Phase | Images | Per-image cost | Subtotal |
|---|---|---|---|
| Phase 2 - hub OG | 11 | ? | ? |
| Phase 3 - top-10 article OG | 10 | ? | ? |
| Phase 4 - long-tail article OG | 44 | ? | ? |

Recommend running Phase 2 first as a single batch - 11 images covers the highest-visibility surfaces with only image= prop changes per hub page (no schema changes required).

---

## 11. References

- src/layouts/BaseLayout.astro (lines 23, 98-103, 109) - OG / Twitter meta source.
- src/components/ArticleSchema.astro (line 130) - flat image string in Article JSON-LD.
- src/pages/makaleler/[...slug].astro (line 80) - only place where image prop is currently passed.
- src/content/config.ts (lines 42-43) - frontmatter schema for image + imageAlt.
- reports/seo-audit-schema.md - cross-reference for ImageObject + publisher-logo gap.
- reports/tmp-home.html, reports/tmp-article.html - captured prerender showing live OG meta tags.
