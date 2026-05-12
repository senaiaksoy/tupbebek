# SXO Audit — tupbebek.com
**Date:** 2026-05-12 | **Analyst model:** Claude Sonnet 4.6 | **Live SERP data:** Not available (WebSearch denied); SERP patterns derived from training-data knowledge of Turkish Google results through mid-2025. Treat SERP classifications as informed estimates, not live snapshots.

---

## Query 1 — "tüp bebek nedir"

### SERP Profile (estimated)
| Signal | Observation |
|---|---|
| Dominant page type | Long-form informational article (single-topic explainer, 1,000–2,000 words) |
| Secondary type | Clinic landing pages with FAQ blocks (Memorial, Medicana, Anadolu Sağlık) |
| SERP features | Definition box / AI Overview likely triggered; PAA questions present (e.g., "tüp bebek kaç gün sürer", "tüp bebek başarı oranı"); no dominant video carousel |
| Schema signals | FAQ / MedicalWebPage in top results |

### tupbebek.com page: `/makaleler/tup-bebek-nedir` (linked from `/tedavi-yontemleri`)
The page is referenced as a destination but does not exist as a standalone published Markdown article in `src/content/articles/`. The route is served from a card on `/tedavi-yontemleri`. The card description ("In-vitro fertilizasyon ve intrasitoplazmik sperm enjeksiyonu tekniklerinin klinik entegrasyonu") uses clinical/academic register, not searcher-level plain language.

**Page type classification:** Hub/category card — NOT a standalone definitional article.

**Mismatch severity: CRITICAL**
Google rewards a dedicated, long-form explainer for "tüp bebek nedir". tupbebek.com has no published article at this slug. The `/ivf-rehberi` page covers IVF steps but does not open with a plain "what is it" definition, and its H1 ("Tüp Bebek (IVF) Adım Adım Rehber") targets the procedural intent, not the definitional intent.

**Missing SERP features:**
- No definition lead paragraph optimised for featured snippet extraction
- No FAQ schema answering "nedir" style questions on the definitional page
- No PAA coverage for: "tüp bebek ile normal hamilelik farkı nedir", "kaç deney tüpü kullanılır", "tüp bebek ağrılı mı"

---

## Query 2 — "tüp bebek tedavisi aşamaları"

### SERP Profile (estimated)
| Signal | Observation |
|---|---|
| Dominant page type | Step-by-step procedural guide, numbered list format, 800–1,500 words |
| Secondary type | YouTube embeds / video results (clinic explainer videos rank visibly) |
| SERP features | Video carousel present; PAA covers "yumurta toplama nasıl yapılır", "embriyo transferi ne zaman", "iğneler ne zaman başlar" |
| Schema signals | HowTo or ordered list structure; some sites use Article schema |

### tupbebek.com page: `/ivf-rehberi`
**Strengths:** Excellent structural match — 6-step numbered section, clinical accuracy, success rate data module, 4-item FAQ block, internal links to related articles. H1 and title are well-aligned to the procedural intent.

**Page type classification:** Procedural guide — ALIGNED with SERP consensus.

**Mismatch severity: MEDIUM** (structurally aligned but missing two high-value signals)

**Gaps:**
1. No embedded YouTube video. The SERP for this query shows video carousels; Dr. Aksoy's channel (`@DocentDrSenaiAksoy`) is referenced in frontmatter defaults but no `videoId` is set on this page, so the `YouTubeEmbed` component never fires. This is a missed rich result and trust signal.
2. The FAQ section has 4 items but no `FAQPage` JSON-LD schema. The `/sss` page has FAQ schema but it is decoupled from `/ivf-rehberi`, so PAA coverage is not attributable to this URL.
3. The CTA block says "kişiye özel değerlendirme için doktorunuzla görüşmenizi öneririz" with no e-book or lead-capture link — the editorial CTA opportunity (`/e-kitap-indir`) is absent from this high-traffic page.

---

## Query 3 — "ICSI nedir" / "mikroenjeksiyon nedir"

### SERP Profile (estimated)
| Signal | Observation |
|---|---|
| Dominant page type | Definition + procedure explainer, typically 600–1,200 words, sometimes with comparison table (IVF vs ICSI) |
| Secondary type | Forum threads (Uludağ Sözlük, forum.jinekoloji.org) and clinic FAQ pages |
| SERP features | Definition box; PAA: "ICSI ile IVF farkı nedir", "mikroenjeksiyon başarı oranı", "ICSI kimlere yapılır" |
| Schema signals | FAQ or MedicalWebPage schema in top results |

### tupbebek.com page: No dedicated published article for "ICSI nedir"
`/tedavi-yontemleri` mentions "ICSI" in the IVF card description (one sentence of clinical jargon). `/ivf-rehberi` mentions "Klasik IVF veya ICSI (mikroenjeksiyon) yöntemi kullanılır" in Step 4, a single clause. There is no slug such as `/makaleler/icsi-nedir` or `/makaleler/mikroenjeksiyon` in the published article set.

**Page type classification:** Incidental mention on a hub page — NOT a standalone article.

**Mismatch severity: CRITICAL**
No page exists that Google can rank for this query. Mid-treatment patients researching ICSI specifically will not find tupbebek.com in the SERP; they will land on clinic pages or forum threads.

---

## Persona Scoring

### Persona A — Newly diagnosed couple seeking definitions
*Journey stage: Awareness. Query pattern: "tüp bebek nedir", "ICSI nedir"*

| Dimension | Score (/25) | Evidence |
|---|---|---|
| Relevance | 12 | No dedicated "nedir" articles; definitional content buried in hub cards |
| Clarity | 18 | `/ivf-rehberi` prose is clear and appropriately plain; hub card descriptions are too clinical |
| Trust | 22 | EEATBadge, MedicalDisclaimer, author credentials, medical reviewer — strong E-E-A-T signals |
| Action | 8 | No e-book CTA on definition-intent pages; no "start here" pathway for first-time visitors |
| **Total** | **60/100** | |

**Priority fix:** Create `/makaleler/tup-bebek-nedir` and `/makaleler/icsi-nedir` as dedicated published articles. Add `LeadMagnet` component (e-book CTA) at article end.

### Persona B — Patient mid-treatment researching a procedure
*Journey stage: Consideration. Query pattern: "tüp bebek tedavisi aşamaları", "embriyo transferi sonrası"*

| Dimension | Score (/25) | Evidence |
|---|---|---|
| Relevance | 22 | `/ivf-rehberi` step-by-step matches this intent precisely |
| Clarity | 21 | Step icons, numbered flow, success rate grid are scannable and clinically accurate |
| Trust | 22 | Author/reviewer chain visible in article template; ESHRE data cited in success rate section |
| Action | 10 | No video embed despite Dr. Aksoy having a YouTube channel; no FAQ schema for PAA capture; no e-book link |
| **Total** | **75/100** | |

**Priority fix:** Add `videoId` frontmatter pointing to the most relevant Dr. Aksoy video. Add inline `FAQPage` JSON-LD to `/ivf-rehberi`. Add `LeadMagnet` to the page CTA block.

### Persona C — Clinician or medical student fact-checking
*Journey stage: Decision / validation. Query pattern: "IVF protokolü", "PGT endikasyonları"*

| Dimension | Score (/25) | Evidence |
|---|---|---|
| Relevance | 20 | Published Markdown articles (e.g., `genetik-testler.md`, `basari-oranlari.md`) have ESHRE/ASRM citations, DOI references, `recommendationGrade` |
| Clarity | 20 | Prose-medical CSS, evidence grade card, reference list are profession-appropriate |
| Trust | 23 | Dual author + reviewer attribution, `reviewDate`, DOI-linked citations, Oxford CEBM grade system |
| Action | 14 | No printable/PDF view for clinical reference; no direct DOI deeplinking in `ReferenceList`; `/genetik-testler` article is `status: draft` (not indexed) |
| **Total** | **77/100** | |

**Priority fix:** Publish `genetik-testler.md` and `basari-oranlari.md` (both currently `status: draft`). Add `doi:` anchor links in `ReferenceList` component output.

---

## SXO Gap Score Summary

| Query | Page Match | Mismatch | SXO Gap Score |
|---|---|---|---|
| tüp bebek nedir | No dedicated page | CRITICAL | 35/100 |
| tüp bebek tedavisi aşamaları | `/ivf-rehberi` — aligned | MEDIUM | 68/100 |
| ICSI nedir | No dedicated page | CRITICAL | 28/100 |
| **Portfolio average** | | | **44/100** |

---

## Top 5 Prioritised Recommendations

1. **Create `/makaleler/tup-bebek-nedir` as a published article.** ~1,200 words, plain-language definition, inline IVF-vs-ICSI comparison, FAQ schema (min 5 PAA-style questions), `LeadMagnet` CTA. This is the single highest-traffic gap.

2. **Create `/makaleler/icsi-nedir` as a published article.** ~800 words, IVF vs ICSI comparison table, "kimlere uygulanır" list, FAQ schema. Cross-link bidirectionally with `/ivf-rehberi`.

3. **Publish `genetik-testler.md` and `basari-oranlari.md`.** Both are marked `status: draft` despite being complete. They are invisible to Google and to Persona C. Remove the draft status or confirm intent to keep as hub-page replacements.

4. **Add `videoId` to `/ivf-rehberi` and the two new articles.** Dr. Aksoy's YouTube channel is already wired into the article template (`YouTubeEmbed`). A relevant video embed signals expertise, increases dwell time, and competes in the video carousel on the "aşamaları" query.

5. **Add `FAQPage` JSON-LD to `/ivf-rehberi` and the two new articles.** The SSS page has FAQ schema but it is a separate URL. Inline FAQ schema on the procedure guide gives each page independent PAA eligibility, which is table-stakes for Turkish IVF SERPs in 2025–2026.

---

## Limitations

- Live SERP data was unavailable (WebSearch permission denied). SERP classifications are based on training-data patterns for Turkish Google through mid-2025. Actual ranking URLs, featured snippet holders, and PAA question text should be verified with a live SERP tool (e.g., Semrush TR, Sistrix, or manual search) before implementing structural changes.
- `/makaleler/tup-bebek-nedir` is linked from `/tedavi-yontemleri` but no corresponding file exists in `src/content/articles/`. It may exist as a future stub not yet committed; this could not be confirmed without live site access.
- Page load speed and Core Web Vitals were not assessed (no Lighthouse run available in this session).
- Competitor backlink profiles and domain authority comparisons were not performed.

---

*Generate a PDF report? Use `/seo google report`*
