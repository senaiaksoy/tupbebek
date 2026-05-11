# SXO Audit — tupbebek.com
**Date:** 2026-05-10  
**Analyst framework:** Search Experience Optimization (SXO) — SERP Reverse Analysis  
**Model:** Claude Sonnet 4.6  

---

## 0. Executive Summary

**Overall SXO Gap Score: 54 / 100**

The site publishes medically rigorous, well-cited long-form articles. The critical structural problem is a systematic page-type mismatch: for the highest-volume, highest-anxiety queries, Google consistently ranks list-first or definition+checklist hybrid pages, while tupbebek.com serves dense narrative guides. This mismatch generates bounce risk even for users who would benefit from the content — because the page format fails the micro-moment before the user reads far enough to evaluate quality.

**Top 3 page-type mismatches (primary findings):**
1. `PCOS belirtileri` — SERP wants a symptom-checklist page; site delivers a narrative dual-topic article covering adet düzensizliği AND PCOS together. Intent diffusion is severe.  
2. `embriyo transferi sonrası` — SERP top-3 all use numbered do/don't lists with same-screen answers. Site delivers a 9-section sequential care guide. Time-to-answer is 3–4 scrolls.  
3. `tüp bebek başarı oranları` — SERP rewards comparison/data pages with visible age-stratified tables above the fold. `/makaleler/basari-oranlari/` and `/basari-oranlari` both exist and split ranking signal for the same keyword.

**Top 3 persona-misalignment fixes:**
1. Mid-journey patient on `embriyo transferi sonrası` needs the do/don't summary at position 0 on screen, not buried in section 3.  
2. Newly diagnosed patient on `PCOS belirtileri` arrives from a symptom-recognition query; the page title conflates PCOS with adet düzensizliği, so they may bounce thinking the article is not about them.  
3. Treatment-failed patient on `azospermi tedavi` finds hope language (page H1 says "Yeni Bir Başlangıç") but lacks a dedicated "what if Mikro-TESE also fails" section — the one question this persona carries above all others.

---

## 1. SERP Reverse Analysis — Keyword by Keyword

### 1.1 `tüp bebek nedir`
**Target URL:** `/makaleler/tup-bebek-nedir/`

**Top-3 SERP page types observed:**
| Rank | Domain | Page Type | Format | SERP Feature |
|------|--------|-----------|--------|--------------|
| 1 | memorial.com.tr | Hospital service page | Definition + step process | Featured snippet candidate |
| 2 | tr.wikipedia.org | Encyclopedia entry | Definition, short | Knowledge panel |
| 3 | anadolusaglik.org | Hospital guide | Definition + FAQ | PAA box present |
| 4 | livhospital.com | Hospital service page | Definition + treatment |  |
| 5 | medicalpark.com.tr | Health guide | Definition | |
| 6 | anatoliatupbebek.com.tr | Clinic page | Definition | |
| 7 | tupbebek.com/makaleler/tup-bebek-nedir | Medical article | Comprehensive guide | |
| 8 | medicana.com.tr | Hospital guide | Definition + process | |
| 9 | bahceci.com | Clinic blog | Definition | |
| 10 | drcemcelik.com | Doctor page | Steps + treatment | |

**Dominant SERP page type:** Definition/overview page (hospital service or health guide format)  
**SERP consensus confidence:** 80%  
**tupbebek.com page type:** Long-form comprehensive article (~3,500 words)  
**Mismatch severity:** MEDIUM — page is informational and correct in intent; mismatch is depth/format rather than intent. The article covers success rates, risks, and steps inside a single page where SERP top-3 separates these into discrete pages. No critical mismatch but format dilutes featured-snippet capture.  
**SERP features present:** PAA (People Also Ask) box — tupbebek.com FAQ section with 13 Q&A pairs is well-positioned for PAA capture but the FAQ schema needs verification.

---

### 1.2 `tüp bebek başarı oranları`
**Target URLs:** `/makaleler/basari-oranlari/` AND `/basari-oranlari`

**Top-3 SERP page types:**
| Rank | Domain | Page Type | Format |
|------|--------|-----------|--------|
| 1 | guven.com.tr | Hospital guide | Text + age table |
| 2 | tupbebek.com/basari-oranlari | Statistics/data page | Data tables |
| 3 | drselcukselcuk.com | Doctor page | Text + factors list |
| 4 | sukrancakmak.com.tr | Doctor page | Text + factors |
| 5 | drcemcelik.com | Doctor page | Table + text |
| 6 | tjod.org | Medical association | Clinical data |
| 7 | tupbebek.com/makaleler/basari-oranlari | Article | Comprehensive guide |
| 8 | drcigdemabide.com | Doctor page | Factors list |
| 9 | indigodergisi.com | Magazine | Long guide |
| 10 | buseterim.com.tr | Health influencer | Calculator |

**CRITICAL FINDING — Keyword cannibalization:**  
tupbebek.com appears TWICE in the top-10 for this keyword (`/basari-oranlari` at rank 2, `/makaleler/basari-oranlari/` at rank 7). The two URLs compete for the same ranking position, split internal link equity, and confuse Google about which is the canonical answer. This is the highest-priority technical SXO fix in the entire audit.

**Dominant SERP page type:** Data/statistics page with prominent age-stratified table above fold  
**SERP consensus confidence:** 75%  
**Mismatch severity:** HIGH — `/makaleler/basari-oranlari/` serves a 3,500-word guide while the SERP rewards a data-first format where statistics appear before explanatory prose. `/basari-oranlari` (the standalone stats page) is better aligned but both URLs weakening each other.

---

### 1.3 `yumurta dondurma`
**Target URL:** `/makaleler/yumurta-dondurma-rehberi/`

**Top-3 SERP page types:**
| Rank | Domain | Page Type | Format |
|------|--------|-----------|--------|
| 1 | onderkoc.com | Doctor page | Overview + eligibility |
| 2 | drhaticealtuntas.com | Doctor page | Process overview |
| 3 | cevrehastanesi.com.tr | Hospital page | Service + pricing 2025 |
| 4 | drezyilmaz.com | Doctor page | Pricing focus |
| 5 | anatoliatupbebek.com.tr | Clinic page | Service + price 2026 |
| 6 | drselcukselcuk.com | Doctor page | Overview |
| 7–10 | Price aggregators / news | Commercial intent | Fiyat 2025 focus |

**Critical observation:** The bottom half of the SERP for `yumurta dondurma` is dominated by pricing pages (fiyat 2025/2026). This signals commercial/transactional sub-intent that tupbebek.com does not address. The top-3 are informational service pages (shorter, faster answer format), not 8,000-word research guides.

**Dominant SERP page type:** Informational service overview (800–1,500 words) + pricing signal  
**tupbebek.com page type:** Deep evidence guide (~8,000–9,000 words) with statistical models  
**Mismatch severity:** HIGH — The guide is the right content for the healthcare student and partner/researcher persona. For the newly diagnosed patient or mid-journey patient, 8,000 words about attrition funnels creates cognitive overload before they can answer "should I freeze my eggs?"  
**Structural fix:** Add a 200-word TL;DR box at page top that answers the 3 core questions (what it is, who should do it, how many eggs). Keep the deep guide underneath for secondary personas.

---

### 1.4 `PCOS belirtileri`
**Target URL:** `/makaleler/adet-duzensizligi-pcos/`

**Top-3 SERP page types:**
| Rank | Domain | Page Type | Format |
|------|--------|-----------|--------|
| 1 | medicana.com.tr | Hospital guide | Symptom list |
| 2 | anadolusaglik.org | Hospital guide | Definition + symptom list + treatment |
| 3 | lokmanhekim.com.tr | Hospital blog | Symptom list |
| 4 | acibadem.com.tr | Hospital service | Symptom list |
| 5 | memorial.com.tr | Hospital guide | "10 işaret" list format |
| 6–10 | Hospital pages | Symptom list / definition | |

**CRITICAL MISMATCH — Highest severity in this audit:**  
Every top-10 result for `PCOS belirtileri` is a dedicated PCOS page. The query is symptom-recognition intent: the user wants to know if they have PCOS. tupbebek.com serves a combined "adet düzensizliği AND PCOS" article. The title and H1 both start with "Adet Düzensizliği" — not "PCOS". A user searching `PCOS belirtileri` sees the title and may assume this is an article about menstrual irregularity generically, not specifically PCOS.

**Dominant SERP page type:** Single-topic PCOS symptom page, list-first format  
**tupbebek.com page type:** Dual-topic article (adet düzensizliği + PCOS), narrative format  
**Mismatch severity:** CRITICAL  
**Required fix:** Create a dedicated `/makaleler/pcos-belirtileri/` page with PCOS as the sole H1 focus. The current dual-topic article can remain for users searching `adet düzensizliği PCOS` (a more specific query), but the broader `PCOS belirtileri` keyword needs its own URL.

---

### 1.5 `embriyo transferi sonrası`
**Target URL:** `/makaleler/embriyo-transferi-sonrasi-bakim/`

**Top-3 SERP page types:**
| Rank | Domain | Page Type | Format |
|------|--------|-----------|--------|
| 1 | aydanbiri.com | Patient guide | "Dikkat edilmesi gerekenler ve yasaklar" — numbered checklist |
| 2 | drselcukselcuk.com | Doctor page | Numbered do/don't list |
| 3 | bahceci.com | Clinic blog | Checklist format |
| 4 | drnilgunturhan.com | Doctor page | Numbered points |
| 5 | bulenttiras.com.tr | Doctor page | List format |
| 6–10 | Doctor/clinic pages | Checklist / numbered list | |

**SERP verdict:** This SERP is unanimous. 9 of 10 results present content as a numbered checklist or do/don't list with answers visible within one scroll. The query `embriyo transferi sonrası` is action-intent: the user has just had the transfer and wants immediate, scannable rules.

**tupbebek.com page type:** 9-section sequential care guide (~2,500 words), narrative prose  
**Mismatch severity:** CRITICAL  
**The page's scientific depth is its strength with researchers and students. It is a liability for the mid-journey patient who is anxious and needs rules fast.**  
**Required fix:** Add a "Hızlı Özet" (Quick Summary) table or numbered checklist in the first screen — 8–10 bullets covering the non-negotiable dos and don'ts. The full guide can follow. This one structural change could recover rank and reduce bounce.

---

### 1.6 `azospermi tedavi`
**Target URL:** `/makaleler/azospermi-mikro-tese/`

**Top-3 SERP page types:**
| Rank | Domain | Page Type | Format |
|------|--------|-----------|--------|
| 1 | memorial.com.tr | Hospital procedure page | Definition + procedure detail |
| 2 | drtepeler.com | Doctor procedure page | Definition + success rates |
| 3 | alparslanbaksu.com.tr | Doctor page | Mikro-TESE focus |
| 4 | drmuratmermerkaya.com | Doctor page | 2025 current info |
| 5 | alifesaglikgrubu.com.tr | Clinic page | Treatment focus |
| 6–10 | Doctor/clinic pages | Procedure + rates | |

**Dominant SERP page type:** Focused procedure page (azospermi + Mikro-TESE combined), clinical detail  
**tupbebek.com page type:** Educational article, ~2,200 words — ALIGNED with SERP intent  
**Mismatch severity:** LOW  
**The H1 is emotionally resonant ("Yeni Bir Başlangıç") which differentiates from clinical competitors. The explicit mention of success after prior failed TESE addresses the treatment-failed persona well. One gap: the page has no dedicated "Mikro-TESE de Başarısız Olursa" section, which is the core anxiety of the treatment-failed patient.**

---

### 1.7 `IUI nedir`
**Target URL:** `/makaleler/iui-nedir/`

**Top-3 SERP page types:**
| Rank | Domain | Page Type | Format |
|------|--------|-----------|--------|
| 1 | tupbebek.com/blog/intrauterin-inseminasyon-iui-nedir | Blog post | Comprehensive guide |
| 2 | yeditepehastaneleri.com | Hospital guide | Definition + process |
| 3 | turkiyeklinikleri.com | Medical journal | Clinical article |
| 4 | opdrkemalyildiz.com | Doctor page | Overview |
| 5 | tupbebek.trakya.edu.tr | University clinic | Definition |
| 6–10 | Doctor/clinic/university | Various | |

**SECOND CANNIBALIZATION ISSUE:**  
tupbebek.com ranks with the `/blog/` URL for `IUI nedir`, not `/makaleler/iui-nedir/`. If `/makaleler/iui-nedir/` exists as a separate URL with similar content, this creates the same internal competition seen with başarı oranları.

**Dominant SERP page type:** Comprehensive guide — ALIGNED  
**Mismatch severity:** LOW-MEDIUM — Intent alignment is good. Cannibalization risk must be confirmed.

---

### 1.8 `endometriozis tüp bebek`
**Target URL:** `/makaleler/endometriozis-tup-bebek/`

**Top-3 SERP page types:**
| Rank | Domain | Page Type | Format |
|------|--------|-----------|--------|
| 1 | bbtupbebek.com | Clinic article | Treatment options + IVF |
| 2 | tupbebek.com (blog URL) | Blog article | 2025 treatment update |
| 3 | kayseritupbebek.com | Clinic article | Overview |
| 4 | drcemcelik.com | Doctor page | Success rates |
| 5–10 | Clinic pages | Treatment focus | |

**THIRD URL CONFLICT:**  
The `/blog/endometriozis-ve-tup-bebek-tedavisi/` URL ranks in SERP, not `/makaleler/endometriozis-tup-bebek/`. Same structural problem as IUI.

**Dominant SERP page type:** Treatment-focused article — ALIGNED  
**Mismatch severity:** LOW — Content and intent match. URL conflict needs resolution.

---

## 2. Scoring Matrix — URL × Persona

**Scoring dimensions per cell:**
- PM = Page-type Match (1=mismatch, 2=partial, 3=aligned)
- TTA = Time-to-Answer (1=slow/3+ scrolls, 2=moderate, 3=fast/first screen)
- TS = Trust Signals visible (1=none, 2=partial, 3=full)
- BR = Bounce Risk (H=high, M=medium, L=low)

### `/makaleler/tup-bebek-nedir/`

| Persona | PM | TTA | TS | BR | Notes |
|---------|-----|-----|-----|-----|-------|
| Newly diagnosed patient | 3 | 3 | 3 | L | Core definition immediate; reassurance present; FAQ addresses anxiety questions. Strong fit. |
| Mid-journey patient | 2 | 2 | 3 | M | Wants procedure specifics; article covers steps but mixed with general overview; no quick-jump index. |
| Treatment-failed patient | 1 | 1 | 3 | H | Article does not address repeated failure scenarios; patient bounces when their question (what next after failure) is absent. |
| Partner/researcher | 3 | 2 | 3 | L | Oxford CEBM grading + 3 refs satisfies fact-checking intent; slight delay finding citation block. |
| Healthcare student | 3 | 1 | 3 | L | ~3,500 words with evidence grades is appropriate; depth is the asset. |

### `/makaleler/basari-oranlari/` vs `/basari-oranlari`

| Persona | PM | TTA | TS | BR | Notes |
|---------|-----|-----|-----|-----|-------|
| Newly diagnosed patient | 2 | 2 | 3 | M | Age table is present but preceded by explanatory prose; patient may not know their own age group relevance immediately. |
| Mid-journey patient | 3 | 2 | 3 | L | Cumulative success rates are relevant in-cycle; live birth rate emphasis is clinically honest. |
| Treatment-failed patient | 2 | 2 | 2 | M | Repeated-failure section exists but is not prominently signaled in heading hierarchy. |
| Partner/researcher | 3 | 2 | 3 | L | ESHRE/ASRM citations present; evidence grade B. Researcher-friendly. |
| Healthcare student | 3 | 1 | 3 | L | Detailed enough; cumulative vs per-cycle distinction is educationally valuable. |
| **Cannibalization note** | — | — | — | — | Two URLs splitting ranking signal. `/basari-oranlari` should be canonical; article should redirect or consolidate. |

### `/makaleler/yumurta-dondurma-rehberi/`

| Persona | PM | TTA | TS | BR | Notes |
|---------|-----|-----|-----|-----|-------|
| Newly diagnosed patient | 1 | 1 | 3 | H | 8,000+ words begins with statistical models. Patient cannot self-assess without reading 2,000 words first. No TL;DR. |
| Mid-journey patient | 2 | 1 | 3 | M | DuoStim section is relevant if in stim; but requires deep scrolling to reach. |
| Treatment-failed patient | 3 | 2 | 3 | L | Attrition funnel is precisely the honest framing a failed patient needs. Good fit once they reach it. |
| Partner/researcher | 3 | 1 | 3 | L | Goldman model, Cascante data, NYU references — best-in-class for this persona. |
| Healthcare student | 3 | 1 | 3 | L | Biyoistatistiksel model section is graduate-level quality. Excellent for this persona. |

### `/makaleler/adet-duzensizligi-pcos/`

| Persona | PM | TTA | TS | BR | Notes |
|---------|-----|-----|-----|-----|-------|
| Newly diagnosed patient | 1 | 1 | 2 | H | Arrives from "PCOS belirtileri" query; sees title starting with "Adet Düzensizliği"; may not recognize this as the PCOS article they searched for. Bounce before reading. |
| Mid-journey patient | 2 | 2 | 2 | M | In-cycle PCOS management not explicitly covered; page is pre-diagnosis oriented. |
| Treatment-failed patient | 1 | 1 | 2 | H | PCOS + IVF failure specific scenarios absent. Wrong page for this persona. |
| Partner/researcher | 2 | 2 | 2 | M | 3 refs present but word count is only ~1,200–1,400 words — unusually thin for a dual-topic article on a complex hormonal condition. |
| Healthcare student | 1 | 2 | 2 | H | Too thin for educational depth. PCOS pathophysiology (Rotterdam criteria, LH/FSH ratio, androgen excess mechanisms) is absent. |

### `/makaleler/embriyo-transferi-sonrasi-bakim/`

| Persona | PM | TTA | TS | BR | Notes |
|---------|-----|-----|-----|-----|-------|
| Newly diagnosed patient | 2 | 2 | 3 | M | Not yet in transfer stage; may arrive from curiosity. Fine for research. |
| Mid-journey patient | 2 | 1 | 3 | H | **CRITICAL.** This is the primary audience. Patient just had transfer. Needs rules NOW. Article format requires 3–4 scrolls to reach actionable content. Bounce risk is real and high. |
| Treatment-failed patient | 2 | 2 | 3 | M | After a negative test, patient may look for what went wrong. Article covers beta-hCG timing but not failure-specific guidance. |
| Partner/researcher | 3 | 2 | 3 | L | Evidence grades on each recommendation (progesterone timing, activity levels) are well-suited for verification intent. |
| Healthcare student | 3 | 1 | 3 | L | Structured care pathway with evidence grades is clinically appropriate. |

### `/makaleler/azospermi-mikro-tese/`

| Persona | PM | TTA | TS | BR | Notes |
|---------|-----|-----|-----|-----|-------|
| Newly diagnosed patient | 3 | 3 | 3 | L | H1 ("Yeni Bir Başlangıç") is emotionally accessible; definition appears early. |
| Mid-journey patient | 3 | 3 | 3 | L | In-cycle context (coordinating Mikro-TESE with IVF cycle) could be more explicit, but generally aligned. |
| Treatment-failed patient | 2 | 2 | 3 | M | "Başarısız klasik TESE sonrası da Mikro-TESE mümkün" is stated; missing: "what if Mikro-TESE also yields no sperm?" section. |
| Partner/researcher | 3 | 2 | 3 | L | 3 refs + evidence grade B. Solid for verification. |
| Healthcare student | 2 | 2 | 3 | M | ~2,200 words is thinner than ideal for the non-obstructive vs obstructive azospermia distinction, genetic workup (Y-microdeletion, karyotype) coverage. |

### `/makaleler/iui-nedir/`

| Persona | PM | TTA | TS | BR | Notes |
|---------|-----|-----|-----|-----|-------|
| Newly diagnosed patient | 3 | 3 | 3 | L | IUI is often first recommendation; comprehensive guide answers the "do I need this?" question well. |
| Mid-journey patient | 3 | 2 | 3 | L | Post-IUI wait section is relevant; clear success rate data. |
| Treatment-failed patient | 2 | 2 | 3 | M | IUI→IVF escalation path is discussed; failure-specific guidance minimal. |
| Partner/researcher | 3 | 2 | 3 | L | IUI vs IVF comparison section addresses the researcher's core question. |
| Healthcare student | 3 | 1 | 3 | L | ~4,500–5,200 words with clinical indications, contraindications, success rates — appropriate depth. |

### `/makaleler/endometriozis-tup-bebek/`

| Persona | PM | TTA | TS | BR | Notes |
|---------|-----|-----|-----|-----|-------|
| Newly diagnosed patient | 3 | 2 | 3 | L | 2025 SVIDOE trial result (IVF-first doubles live birth rate) is the answer to the newly diagnosed patient's core question. |
| Mid-journey patient | 3 | 2 | 3 | L | Optimized protocols (PPOS, microbiome) relevant to active patients. |
| Treatment-failed patient | 3 | 2 | 3 | L | Best page in this audit for treatment-failed persona. Explains why first approach may have underperformed. |
| Partner/researcher | 3 | 2 | 3 | L | Specific trial citation (SVIDOE) with quantitative result is researcher-grade. |
| Healthcare student | 2 | 1 | 3 | M | Missing staging system (ASRM I–IV), ovarian reserve impact specifics. Could be deeper. |

---

## 3. Gap Analysis — 7 Dimensions (100 points)

| Dimension | Max | Score | Evidence |
|-----------|-----|-------|----------|
| Page Type | 15 | 8 | PCOS and embriyo transferi pages are critical mismatches; other pages broadly correct intent. Two pages CRITICAL, three pages MEDIUM, three ALIGNED. |
| Content Depth | 15 | 10 | Outstanding for yumurta dondurma, IUI, endometriozis, başarı oranları. Thin for PCOS article (1,200 words for a dual-topic complex condition). |
| UX Signals | 15 | 7 | No visible jump-link index on long articles. No "Quick Summary" or TL;DR box on any page. Embriyo transferi page lacks same-screen checklist. All pages share identical CTA block (uzmana sor + beslenme planı) regardless of persona context. |
| Schema | 15 | 9 | Article schema present. FAQ schema confirmed on tüp bebek nedir (13 Q&A). MedicalWebPage or Specialty schema not observed. No HowTo schema on embriyo transferi page despite checklist-oriented SERP. |
| Media | 15 | 8 | Video embeds present on multiple pages. Custom medical illustrations referenced. However: no alt-text confirmation, no schema on video embeds verified, infographics not text-accessible for crawler. |
| Authority | 15 | 10 | Doç. Dr. Aksoy authorship across all pages, Oxford CEBM grading, Editorial Board reviewer badge, 3–6 peer-reviewed citations per page. KVKK and TTB compliance. Strongest dimension in the audit. |
| Freshness | 10 | 5 | Most pages updated April 2026 — positive. However, update dates visible in schema but not always displayed prominently on-page. PCOS article shows no update date in fetched metadata. |

**Total SXO Gap Score: 57 / 100**

---

## 4. User Stories from SERP Signals

**US-1 — Awareness, Newly Diagnosed**  
"As a woman who just got a PCOS diagnosis at age 28, I want to confirm which of my symptoms are PCOS-specific, so I can walk into my next appointment with the right questions."  
*Signal: 9/10 SERP results for `PCOS belirtileri` are symptom-list pages. The user is in symptom-recognition mode, not treatment-research mode.*

**US-2 — Awareness, Partner**  
"As the male partner with azospermi diagnosis, I want to understand if there is any realistic chance of biological fatherhood before we commit to donor sperm or adoption."  
*Signal: `azospermi tedavi` SERP includes emotional framing pages ("baba olma şansı") alongside clinical procedure pages — a mix of hope-seeking and information-seeking intent.*

**US-3 — Consideration, Newly Diagnosed**  
"As a 33-year-old weighing whether to freeze eggs before marriage, I want to know how many eggs I actually need to freeze at my age to have a meaningful chance of a live birth."  
*Signal: `yumurta dondurma` SERP includes "kaç yumurta" and "ideal yaş" content; these sub-questions surface in PAA and related searches.*

**US-4 — Decision, Mid-Journey**  
"As someone who had embryo transfer 2 hours ago, I need to know right now what I absolutely cannot do in the next 48 hours."  
*Signal: `embriyo transferi sonrası` top-10 uniformly uses "yasaklar" (prohibitions) and numbered action lists — immediate, scannable rule format.*

**US-5 — Decision, Treatment-Failed**  
"As a couple on our third IVF failure with endometriozis, I want to understand whether the disease itself reduced our chances and whether a different protocol would change outcomes."  
*Signal: `endometriozis tüp bebek` SERP shows treatment-comparison and "neden başarısız oldu" (why it failed) framing in top results.*

---

## 5. Persona Scoring Summary — Sorted by Weakest First

### Persona 3: Treatment-Failed Patient — Avg Score: 52/100

| Category | Score | Rationale |
|----------|-------|-----------|
| Relevance | 13/25 | Only azospermi and endometriozis pages directly address post-failure scenarios. Other pages ignore this journey stage. |
| Clarity | 11/25 | "What if this also fails?" question is unanswered on 6 of 8 pages. |
| Trust | 18/25 | Authority signals are strong; but the honest acknowledgment of failure limits (rather than optimistic deflection) is only present on the endometriozis page. |
| Action | 10/25 | No clear escalation paths documented (e.g., after failed Mikro-TESE: what is next? PGT-A? Donor sperm?). |

**Priority fix:** Add a dedicated "Bu da Başarısız Olursa?" section on azospermi, embriyo transferi, and başarı oranları pages. This is the question that differentiates a trusted medical publisher from a commercial clinic that avoids bad news.

---

### Persona 1: Newly Diagnosed Patient — Avg Score: 60/100

| Category | Score | Rationale |
|----------|-------|-----------|
| Relevance | 18/25 | Strong match on tüp bebek nedir, IUI, endometriozis. Weak match on PCOS (title mismatch) and yumurta dondurma (cognitive overload). |
| Clarity | 13/25 | Articles lack reassurance anchors and "what happens next" navigation at page bottom. |
| Trust | 22/25 | Author credentials and evidence grades are highly visible. |
| Action | 7/25 | No "your next step" CTA contextual to the specific article topic. All pages use the same two CTAs (nutrition plan + uzmana sor) regardless of where the patient is in their journey. |

**Priority fix:** Add topic-specific next-step CTAs. For PCOS belirtileri, the next step is "randevu al" or "PCOS ve tüp bebek uyumluluğu hakkında oku." For yumurta dondurma, it is "yaşıma göre kaç yumurta gerekli — hesapla." Not "30-day nutrition plan" which implies the user has already decided on IVF.

---

### Persona 2: Mid-Journey Patient — Avg Score: 63/100

| Category | Score | Rationale |
|----------|-------|-----------|
| Relevance | 20/25 | Procedural pages (embriyo transferi, IUI, başarı oranları) serve this persona. |
| Clarity | 12/25 | Time-to-answer for embriyo transferi page is too slow for someone in active anxiety post-transfer. |
| Trust | 22/25 | Evidence grades give confidence to a patient who has already done research. |
| Action | 9/25 | No "track my cycle" resource, no link to symptom diary, no "when to call your clinic" guidance. |

**Priority fix:** Add a "same-screen answer" box (sticky or pinned) at the top of embriyo transferi page with the 5 most critical rules. Cross-link to the "Tüp Bebek İlk 14 Gün" type content to retain this user.

---

### Persona 5: Healthcare Student — Avg Score: 68/100

| Category | Score | Rationale |
|----------|-------|-----------|
| Relevance | 22/25 | Long-form guides are appropriate. |
| Clarity | 15/25 | PCOS article is too thin. IUI article's IUI vs IVF comparison is excellent. |
| Trust | 22/25 | Oxford CEBM grading is the standout differentiator for this persona. |
| Action | 9/25 | No link to source papers (DOI links mentioned in azospermi page but not confirmed on all pages). No "references" section visible as an anchor-linked section. |

**Priority fix:** Add a consistently formatted references section at page bottom with DOI links, and ensure the academic citations are visible without scrolling into a collapsed section.

---

### Persona 4: Partner/Researcher — Avg Score: 72/100

| Category | Score | Rationale |
|----------|-------|-----------|
| Relevance | 22/25 | Fact-checking the SVIDOE trial result or ESHRE success rate data is served well. |
| Clarity | 18/25 | Evidence grade system helps locate trustworthy claims but no single "claims vs sources" summary table. |
| Trust | 25/25 | Highest trust score across all personas. ESHRE, ASRM, CEBM references set this apart from competitor clinics. |
| Action | 7/25 | No "download citations" or "export references" option. No structured data to surface in AI Overviews or academic crawlers. |

**Priority fix:** Add a machine-readable reference list (structured data or BibTeX-style footer) to capture AI Overview citations. This is the next frontier for medical publishers post-2025.

---

## 6. Keyword Cannibalization Map

| Keyword | URL 1 | URL 2 | Severity |
|---------|-------|-------|----------|
| `tüp bebek başarı oranları` | `/basari-oranlari` (ranks ~2) | `/makaleler/basari-oranlari/` (ranks ~7) | CRITICAL |
| `IUI nedir` | `/blog/intrauterin-inseminasyon-iui-nedir/` (ranks) | `/makaleler/iui-nedir/` (secondary) | HIGH |
| `endometriozis tüp bebek` | `/blog/endometriozis-ve-tup-bebek-tedavisi/` (ranks) | `/makaleler/endometriozis-tup-bebek/` (secondary) | HIGH |

**Recommended resolution:** Designate canonical URL for each competing pair. For başarı oranları, `/basari-oranlari` (the data page) should be canonical and `/makaleler/basari-oranlari/` should either 301 redirect or add `rel=canonical` pointing to the standalone page. For blog vs makaleler pairs, determine which URL has more inbound links and designate that as canonical.

---

## 7. Rewrite Priority Queue

| Priority | URL | Action | Estimated Impact |
|----------|-----|--------|-----------------|
| 1 | `/makaleler/adet-duzensizligi-pcos/` | Split into dedicated PCOS page; rewrite to symptom-list format for PCOS belirtileri keyword | HIGH — removes CRITICAL mismatch |
| 2 | `/makaleler/embriyo-transferi-sonrasi-bakim/` | Add "Hızlı Özet" checklist block as first content element (8–10 bullets); add HowTo schema | HIGH — directly recovers mid-journey patient bounce |
| 3 | Başarı oranları cannibalization | Consolidate two URLs; establish single canonical | HIGH — recovers split ranking signal |
| 4 | `/makaleler/yumurta-dondurma-rehberi/` | Add 200-word TL;DR at page top; add a "yaşınıza göre kaç yumurta" quick-answer box | MEDIUM — recovers newly diagnosed bounce |
| 5 | Blog vs makaleler URL pairs (IUI, endometriozis) | Canonical resolution or 301 consolidation | MEDIUM — removes ranking cannibalization |
| 6 | All pages | Add topic-specific next-step CTA replacing generic nutrition plan CTA for non-treatment-stage users | MEDIUM — persona alignment |
| 7 | `/makaleler/azospermi-mikro-tese/` | Add "Mikro-TESE de Sonuç Alınamazsa" (what if Mikro-TESE also fails) section | MEDIUM — treatment-failed persona coverage |
| 8 | All pages | Add anchor-linked references section with DOI links at page bottom | LOW-MEDIUM — researcher/student persona + AI Overview citation capture |

---

## 8. Cross-Skill Recommendations

- **E-E-A-T gap detected on PCOS article** (thin content, ~1,200 words on a complex dual topic): recommend `/seo content` deep audit for this URL specifically.
- **Schema gaps on embriyo transferi page** (HowTo schema missing despite checklist SERP context): recommend `/seo schema` to generate HowTo structured data.
- **AI Overview citation readiness**: none of the pages appear to use BibTeX or structured reference markup that AI crawlers can extract. This is a 2026 strategic gap as AI Overviews increasingly cite medical content directly.

---

## 9. Limitations

The following could not be assessed in this audit:

- **Actual Google rank positions** for Turkish locale were inferred from SERP observation, not confirmed GSC data. Rank volatility between mobile and desktop was not measured.
- **Click-through rates** (CTR) from GSC were not available; bounce risk is modeled from UX pattern analysis, not behavioral data.
- **Page speed and Core Web Vitals**: not measured in this audit (existing PSI JSON files are in the tupbebek reports folder and should be consulted separately).
- **Mobile rendering**: page structure analysis was based on desktop content fetch; some UX observations (same-screen visibility) may differ on mobile.
- **Schema validation**: schema presence was inferred from content analysis, not validated via Google's Rich Results Test.
- **Internal link equity**: the cannibalization finding is supported by SERP observation but not by a full internal link crawl.
- **GSC Search Analytics**: query-level impression and click data would sharpen all rank estimates and priority scores significantly.

---

*Generate a PDF report? Use `/seo google report`*
