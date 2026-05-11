# tupbebek.com — Content Quality & E-E-A-T Audit
**Audit date:** 2026-05-10  
**Scope:** 64 articles (`src/content/articles/`) + schema (`src/content/config.ts`)  
**Auditor role:** Content Quality Specialist (Google September 2025 QRG)

---

## 1. Frontmatter Field Coverage (64 articles)

| Field | Present | % | Notes |
|---|---|---|---|
| `author` | 64 / 64 | 100% | All populated; 6 use object form (name/title/credentials), rest use string |
| `medicalReviewer` | 64 / 64 | 100% | All populated |
| `reviewDate` | 64 / 64 | 100% | All populated |
| `recommendationGrade` | 64 / 64 | 100% | All populated |
| `references` | 62 / 64 | 97% | 2 articles missing (see §2) |
| `lastModified` | 64 / 64 | 100% | All populated |

**Summary:** The schema is exceptionally well enforced. Only the `references` field has gaps.

---

## 2. Articles Missing Required E-E-A-T Fields

### Missing `references`:
1. **`embryoscope-yapay-zeka`** — References exist only as inline markdown hyperlinks in the body, not as structured frontmatter `references:` array. This breaks schema-level citation readiness and prevents JSON-LD reference rendering.
2. **`yumurta-dondurma-rehberi`** — No `references:` frontmatter block at all, despite citing Goldman (Brigham), Doyle (Shady Grove), Cascante (NYU) by name in body text. Inline citations lack DOI/PMID.

### Secondary E-E-A-T gaps (not "missing" fields, but quality issues):
- **`tup-bebek-nedir`** — `author` is listed as editorial board ("tupbebek.com Yayın Kurulu") rather than named clinician. For the cornerstone YMYL page on the site, this weakens authoritativeness.
- **`adet-duzensizligi-pcos`**, **`tup-bebek-sureci-rehber`**, **`embriyo-transferi-sonrasi-bakim`** — Same editorial board author attribution for high-traffic YMYL pages.
- **`basarisiz-denemeler`** — `reviewDate: 2026-04-06` but `lastModified: 2024-03-31`. The review date post-dates the last modification by 2 years, suggesting a review was recorded without a corresponding content update.

---

## 3. `recommendationGrade` Distribution (64 articles)

| Grade | Count | % | Meaning |
|---|---|---|---|
| A | 4 | 6.3% | Very strong evidence (RCT-level) |
| B | 47 | 73.4% | Strong evidence (systematic reviews, guidelines) |
| C | 11 | 17.2% | Moderate / observational evidence |
| D/E | 2 | 3.1% | Low or expert-opinion evidence |

**Grade A articles:** `era-testi-iluzyon`, `bagisiklik-tedavileri`, `endometriyal-scratching`, `hidrosalpinx-ve-kisirlik`

**Grade D/E articles:** `istanbul-tup-bebek-doktoru`, `iyi-tup-bebek-merkezi`

**Assessment:** The B-dominant distribution is clinically appropriate for this topic mix. Grade A is correctly reserved for the highest-evidence interventions. The two D/E articles are local landing pages — their low evidence grade is a correct declaration of intent (service/SEO content), not a quality failure.

---

## 4. Thin Content — Articles Under ~1200 Words on YMYL Topics

The following are substantive YMYL articles (not `status: draft` redirect stubs) with critically thin word counts:

| Slug | Words | Status | Issue |
|---|---|---|---|
| `hiperprolaktinemi-prolaktinom` | 154 | draft | Redirect stub — 2-line body, correctly in draft |
| `myomlar-ve-kisirlik` | 169 | draft | Redirect stub — correctly in draft |
| `pkos-ve-tup-bebek` | 181 | draft | Redirect stub — correctly in draft |
| `dondurulmus-embriyo-transferi` | 186 | **published** | **CRITICAL:** Published YMYL article with near-zero body content |
| `basarisiz-denemeler` | 339 | **published** | **CRITICAL:** Major YMYL topic (failed IVF) covered in 3 bullet-point sections |
| `beta-hcg-testi` | 379 | **published** | Key post-transfer diagnostic, insufficient depth |
| `akraba-evliligi` | 394 | **published** | Thin on YMYL topic |
| `aciklanamayan-infertilite` | 403 | **published** | Unexplained infertility — significant search demand, thin |
| `asherman-sendromu` | 414 | **published** | Surgical topic requiring depth |
| `yumurtalik-kistleri-dogurganlik` | 420 | **published** | Ovarian cysts — high search intent, thin |
| `azospermi-mikro-tese` | 431 | **published** | Major male-factor topic, needs expansion |
| `adet-gorememe` | 459 | **published** | Amenorrhea — YMYL, thin |
| `alkol-ve-fertilite` | 481 | **published** | Borderline acceptable |
| `adet-duzensizligi-pcos` | 503 | **published** | PCOS intro page — lacks clinical depth |

**The three draft redirect stubs** (`hiperprolaktinemi-prolaktinom`, `myomlar-ve-kisirlik`, `pkos-ve-tup-bebek`) are intentional architectural choices (consolidation into richer canonical articles). Their thin content is correct. They should remain `status: draft` or be explicitly `noindex: true`.

**The 11 published articles** with under ~600 words on YMYL topics are the genuine thin-content risk. Google's September 2025 QRG evaluates YMYL medical content for topical comprehensiveness. These pages will not satisfy a user with a medical question and expose the site to quality-related ranking suppression.

---

## 5. `lastModified` Freshness — Articles Older Than 12 Months

Cutoff: 2025-05-10 (12 months before audit date)

| Slug | lastModified | Status |
|---|---|---|
| `basarisiz-denemeler` | **2024-03-31** | **STALE — 25 months** |
| `dondurulmus-embriyo-transferi` | 2025-11-10 | Fresh |

**Result:** Only 1 article is stale by the 12-month threshold: `basarisiz-denemeler`. All other 63 articles were last modified after May 2025. Freshness is excellent across the corpus.

**Note on `basarisiz-denemeler`:** This article has a `reviewDate: 2026-04-06` recorded in frontmatter despite `lastModified: 2024-03-31`. This is internally inconsistent and could appear deceptive to a Google quality rater — a 2026 review date on a 2024 body. The body should be updated or the `lastModified` date corrected to match the actual most recent content change.

---

## 6. Duplicate / Near-Duplicate Intent Flags

### PCOS Overlap (3 articles)
| Slug | Intent | Overlap Risk |
|---|---|---|
| `adet-duzensizligi-pcos` | PCOS symptoms + menstrual irregularity intro | HIGH overlap with below |
| `pkos-ve-tup-bebek` | PCOS + IVF (draft/redirect stub to `opk-ve-ivf`) | Redirect stub — benign |
| `opk-ve-ivf` | PCOS + IVF strategy (canonical target) | Correct consolidation |

The consolidation of `pkos-ve-tup-bebek` → `opk-ve-ivf` is architecturally sound. However, `adet-duzensizligi-pcos` (503 words) and `opk-ve-ivf` share significant thematic overlap in PCOS diagnosis. If `adet-duzensizligi-pcos` targets informational search ("adet düzensizliği neden olur") and `opk-ve-ivf` targets transactional fertility search ("PCOS tüp bebek"), the intent split is defensible — but only if `adet-duzensizligi-pcos` is expanded with sufficient clinical depth to stand alone.

### Success Rates Overlap (2 articles)
| Slug | Angle | Overlap Risk |
|---|---|---|
| `basari-oranlari` | Factors affecting IVF success, lab technology | MEDIUM |
| `yasa-gore-tup-bebek-basari-oranlari` | Age-stratified rates + Turkish legal limits | MEDIUM |

These two articles target related but distinct search queries ("tüp bebek başarı oranları" vs "yaşa göre tüp bebek başarı oranları"). The legal-angle differentiation (`yasa-gore-`) is meaningful. However, both articles contain age-stratified rate tables. Internal linking from `basari-oranlari` to `yasa-gore-` should be audited to ensure they reinforce rather than compete.

### Endometriosis Overlap (3 articles)
| Slug | Angle |
|---|---|
| `endometriozis-tup-bebek` | Surgery-first vs IVF-first decision (2025 SVIDOE data) |
| `endometriozis-akilli-stratejiler` | General endometriosis + IVF strategy guide |
| `endometrioma` | Chocolate cysts specifically, shorter piece |

All three target distinct facets of the endometriosis topic. `endometrioma` is a condition-specific entry. `endometriozis-tup-bebek` has a clinical decision-making angle. `endometriozis-akilli-stratejiler` is broader. These are defensible as a content cluster if they cross-link correctly. However, a user searching "endometriozis tüp bebek" could land on any of the three — the site needs a clear canonical cluster leader.

### Myoma Overlap (3 articles)
| Slug | Status | Notes |
|---|---|---|
| `myomlar-ve-kisirlik` | draft (redirect stub) | Correctly consolidated |
| `miyomlar-ve-tup-bebek` | published | IVF-specific angle |
| `miyom-ameliyati` | published | Surgery-specific angle |

Consolidation strategy is correct. No active duplication risk.

### Hyperprolactinemia Overlap (2 articles)
| Slug | Status |
|---|---|
| `hiperprolaktinemi-prolaktinom` | draft (redirect stub) → `hiperprolaktinemi-ve-kisirlik` |
| `hiperprolaktinemi-ve-kisirlik` | published (canonical) |

Correctly handled.

---

## 7. References Quality — DOI Presence and Source Tier

### DOI Coverage
- **62 of 64 articles** have at least one reference with a `doi:` field.
- **2 missing** (`embryoscope-yapay-zeka`, `yumurta-dondurma-rehberi`) — references not in structured frontmatter.
- Among the 62 articles with structured references, DOI coverage per article ranges from 1 to 7 entries.

### Source Tier Analysis

**Tier 1 (highest authority) — well represented:**
- JAMA (era-testi-iluzyon), The Lancet (tup-bebek-nedir, adet-duzensizligi-pcos), NEJM (pkos-ve-tup-bebek), Cochrane (embriyo-transferi-sonrasi-bakim), Human Reproduction (multiple), Fertility and Sterility (multiple)
- ESHRE, HFEA, ASRM as institutional sources (era-testi-iluzyon, embryoscope-yapay-zeka)

**Tier 2 (solid clinical journals):**
- Reproductive BioMedicine Online, Journal of Clinical Endocrinology, Endocrine Reviews — well used

**Tier 3 / Weaker sources:**
- `embryoscope-yapay-zeka` references include CarefulTrip (a medical tourism aggregator), Preprints.org (non-peer-reviewed), and Vitrolife's own product pages. These are not peer-reviewed and undermine the article's reference quality despite the body being clinically strong.
- `yumurta-dondurma-rehberi` cites Brigham and Women's, NYU Langone, and Shady Grove by institution name in body text but without corresponding structured references with DOIs.

### PMID Coverage
- PMID present in at least one reference in 60 of 64 articles (94%).
- Strong signal for AI citation readiness and LLM training data trustworthiness.

---

## 8. Deep-Read: 5 Representative Articles

### `tup-bebek-nedir` — IVF Basics
- **Word count:** ~1,800 (adequate for topic minimum)
- **E-E-A-T:** Author listed as editorial board, not named clinician — weakens Experience signal for a cornerstone YMYL page. Three strong DOI-backed references (Steptoe/Edwards 1978, ESHRE ART 2023, Agarwal 2021).
- **Content quality:** Comprehensive coverage of IVF stages, indications, risks, success rates. Success rate percentages (20-30%, 40-50% etc.) presented without source attribution in-text — figures appear in body but the references are general overviews rather than age-specific data papers. {{kanit:C}} inline evidence tags present but success rate figures lack precision.
- **AI content markers:** Heavy use of generic bulleted lists ("1. Yüksek Gebelik Şansı") and generic section headers without unique clinical insight. The "Sözlük" (glossary) at the end is distinctive and valuable. Some generic AI phrasing present ("birçok çiftin en büyük arzularından biridir").
- **Structural issue:** Double `## Giriş` heading after the lead paragraph creates a heading hierarchy error.
- **AI citation readiness:** Moderate. FAQ section present but not structured as JSON-LD.

### `yumurta-dondurma-rehberi` — Egg Freezing Guide
- **Word count:** ~4,200 (excellent depth)
- **E-E-A-T:** Strong first-person clinical voice ("Kliniğimde geçirdiğim 30+ yılda..."). Multiple specific institutional data references (Goldman/Brigham, Doyle/Shady Grove, Cascante/NYU). 30+ year experience signals prominent. However, no structured `references:` frontmatter — all citations are in-body name drops without DOI/PMID.
- **Content quality:** Outstanding. Specific quantitative data (Goldman model: 37-year-old needs 10 eggs for 50% CLBR; Cascante: 15-year dataset from 543 patients). "Loss funnel" table (15 eggs → ~1 live birth) is original clinical communication. DuoStim protocol explanation is detailed and differentiated. "Optimism gap" (NYU study: patients estimate 50%, actual is 20-30%) is quotable and specific.
- **AI citation readiness:** Very high. Data tables, numbered lists, specific statistics, FAQ section. Missing structured schema (FAQPage JSON-LD).
- **Critical gap:** No `references:` frontmatter. The inline citations ("Goldman modeli", "Cascante çalışması") without DOIs cannot be verified by crawlers or AI systems.

### `era-testi-iluzyon` — ERA Test Analysis
- **Word count:** ~7,000+ (exceptional depth)
- **E-E-A-T:** Highest E-E-A-T score in corpus. Author: Doç. Dr. Senai Aksoy (named clinician with full credentials). Grade A evidence. 20+ structured references with DOI and PMID. JAMA RCT (Doyle 2022, DOI: 10.1001/jama.2022.20438), Human Reproduction (Richter 2023), HFEA and ESHRE institutional positions. FAQPage JSON-LD schema embedded. Financial data (Vitrolife goodwill impairment 9.7 billion SEK) adds unique authoritative depth not found elsewhere.
- **Content quality:** Exceptional. Original insight: comparison tables (Industry vs. Independent research), HFEA traffic-light table, legal implications, bioethics framework (Beauchamp & Childress). Clinically opinionated ("ERA uygulamasının derhal durdurulması gerektiğini") with evidence backing.
- **Concerns:** One reference (Gleicher 2025, "Reproductive Times" Substack) cites a Substack publication — this is a Tier 3 source that could be challenged. The reference to an "FDA 2024 final rule" that was "stopped by federal court in 2025" needs date-checking for accuracy.
- **AI citation readiness:** Highest in corpus. Quotable facts, structured JSON-LD, numbered references, institution + DOI + PMID.

### `embriyo-transferi-sonrasi-bakim` — Post-Transfer Care
- **Word count:** ~1,100 (borderline thin for topic)
- **E-E-A-T:** Editorial board author. Three solid references with DOI/PMID (Craciunas 2014 on bed rest, Rao 2018 on activity, Cochrane 2015 on progesterone). Evidence tags ({{kanit:A}}, {{kanit:B}}) used correctly throughout.
- **Content quality:** Clinically accurate and well-organized. The bed-rest guidance ({{kanit:A}} — short rest, not prolonged) correctly reflects current evidence. However, the article lacks specificity that would differentiate it from generic IVF post-care content found on any fertility site. No original insight or case-based illustration. The "acupuncture" mention ({{kanit:C}}) is appropriately hedged.
- **AI content markers:** Structure is formulaic. Each section follows identical bullet-list format. No first-person clinical voice. Generic phrasing: "en önemlidir", "büyük önem taşır", "paha biçilemezdir." Reads as template-generated content with evidence tags added.
- **AI citation readiness:** Moderate. No FAQ, no schema, no tables.

### `adet-duzensizligi-pcos` — PCOS/Menstrual Irregularity
- **Word count:** 503 (critically thin for YMYL topic)
- **E-E-A-T:** Editorial board author. Three DOI-backed references (Bozdag 2016 PCOS prevalence in Human Reproduction, Teede 2018 international guidelines, Munro 2022 The Lancet). Good reference quality for the article's length. `reviewDate: 2026-04-06` — recent.
- **Content quality:** Extremely thin. Five-item PCOS symptom list, four-bullet etiology section, four-item treatment list. No discussion of Rotterdam criteria, no AMH/AFC in diagnosis, no OHSS risk in PCOS IVF, no letrozole vs. clomiphene comparison (despite the Legro 2014 NEJM study being cited elsewhere). This article does not satisfy search intent for "PCOS tedavisi" or "PCOS tüp bebek" at any meaningful depth.
- **Structural issue:** Ends abruptly without conclusion, FAQ, or internal linking to `opk-ve-ivf` (the richer PCOS IVF article). A user landing here will immediately bounce.
- **AI citation readiness:** Very low. No tables, no FAQ, no schema, insufficient data points to quote.

---

## 9. Overall E-E-A-T Scoring

### Site-level E-E-A-T Assessment

| Factor | Weight | Score (0–10) | Weighted | Notes |
|---|---|---|---|---|
| **Experience** | 20% | 7.5 | 1.50 | Strong in MDX flagship articles (era-testi, yumurta-dondurma-rehberi) with 30+ year clinical voice. Weak in .md articles using editorial board attribution. |
| **Expertise** | 25% | 8.0 | 2.00 | Credentials declared (Doç. Dr., Üreme Tıbbı Uzmanı). recommendationGrade system is a genuine differentiator. Technical accuracy confirmed in read articles. |
| **Authoritativeness** | 25% | 7.0 | 1.75 | JAMA, Lancet, Cochrane, ESHRE, HFEA citations present. FAQPage schema on best articles. External institution references (ASRM, ESHRE guidelines cited by name). Weakened by 47 articles with anonymous editorial board author. |
| **Trustworthiness** | 30% | 8.5 | 2.55 | Medical disclaimer consistent. Regulatory compliance notes (Turkish regulation 12.11.2025). No patient testimonials, no before/after, no prices — correct regulatory hygiene. HTTPS assumed. Published/draft status system transparent. |
| **TOTAL** | 100% | — | **7.80 / 10** | — |

**Site-level E-E-A-T: 7.80 / 10 — Strong, with targeted gaps**

---

## 10. AI Citation Readiness Score

| Article | Score | Reason |
|---|---|---|
| `era-testi-iluzyon` | 95/100 | JSON-LD, 20+ refs with DOI/PMID, tables, quotable facts, named author |
| `yumurta-dondurma-rehberi` | 72/100 | Outstanding body, named author, quantitative data — but no frontmatter refs |
| `embryoscope-yapay-zeka` | 65/100 | Good body data, named author — refs only as inline markdown, no DOI in schema |
| `embriyo-transferi-sonrasi-bakim` | 45/100 | Good refs in frontmatter, no FAQ/schema, generic content |
| `adet-duzensizligi-pcos` | 28/100 | Thin body, no tables, no FAQ, no schema |

**Site average AI citation readiness:** approximately 58/100. Top articles are very strong; the bottom third of the corpus is largely invisible to LLM citation.

---

## 11. AI-Generated Content Quality Assessment (Sept 2025 QRG)

**Not flagged as problematic AI content:**
- `era-testi-iluzyon`, `yumurta-dondurma-rehberi`, `embryoscope-yapay-zeka` — demonstrate genuine clinical insight, specific numerical data, opinionated first-person voice, and original analysis not found in generic sources.

**Flagged for generic AI content patterns:**
- `tup-bebek-nedir` — repetitive bulleted structure, generic motivational closing ("Her çiftin hikâyesi özeldir"), success rate figures without specific sourcing.
- `embriyo-transferi-sonrasi-bakim` — template-like section structure, no original clinical insight, every section ends with the same "danışmanız önemlidir" formula.
- `adet-duzensizligi-pcos` — four-symptom list, four-cause list, four-treatment options, no unique perspective.
- `basarisiz-denemeler` — three bullet-point sections presented as a "guide," identical structure to generic IVF counseling content.
- `tup-bebek-sureci-rehber` (553 words) — step-by-step IVF process with no differentiation from standard clinic brochure content.

The pattern: MDX files with named-author attribution (Doç. Dr. Senai Aksoy) consistently demonstrate genuine E-E-A-T. Plain `.md` files with editorial board attribution frequently show generic AI-assist patterns without unique clinical voice.

---

## 12. Detailed Findings: Output File

Full findings written to: `D:\A-klasör\tupbebek\reports\seo-audit-content.md`

---

*End of audit — tupbebek.com content quality, 2026-05-10*
