# tupbebek.com — GEO / AI-Search Readiness Audit

**Audit date:** 2026-05-10
**Scope:** Generative Engine Optimization for ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews, Bing Copilot
**Method:** robots.txt + llms.txt + schema cross-reference + passage-level sample
**Live checks:** llms.txt → 404, robots.txt → Allow: / (no per-bot rules)

---

## GEO Score: 48 / 100

The site has strong *content fundamentals* that AI engines reward (PubMed/DOI citations, declared evidence grades, named medical reviewers, structured editorial process), but the *delivery layer* is broken in ways that prevent AI engines from extracting and attributing those signals:

- UTF-8 corruption destroys every Turkish entity name in JSON-LD (`"Yay?n Kurulu"`, `"sreme Sa??l???"`) — AI models that key on schema for entity resolution receive garbage.
- No `FAQPage` schema on `/sss/` — the #1 schema type AI Overviews and ChatGPT cite for medical Q&A.
- No `Person` schema for the 16-member editorial board on `/yayin-kurulu/` — for YMYL, this is the single highest E-E-A-T lever.
- No `llms.txt` — minor signal individually, but a publisher-friendly readiness marker.
- No explicit Allow rules for AI agents — neutral, not blocking, but adds no welcome signal.

The article-level citation infrastructure (PMIDs, DOIs, ScholarlyArticle) is operationally correct; once the schema and encoding layer is fixed, this site has more raw AI-citation material than the Turkish IVF commercial competitors.

---

## AI Crawler Access Matrix

| Bot | Status | Note |
|---|---|---|
| GPTBot (OpenAI training) | Allowed via wildcard | No explicit Allow — neutral |
| OAI-SearchBot (ChatGPT search) | Allowed | No explicit Allow |
| ChatGPT-User (browse) | Allowed | No explicit Allow |
| ClaudeBot | Allowed | No explicit Allow |
| anthropic-ai | Allowed | No explicit Allow |
| PerplexityBot | Allowed | No explicit Allow |
| Google-Extended (Gemini/SGE training) | Allowed | No explicit Allow |
| Googlebot | Allowed | Standard SERP |
| Bingbot / Copilot | Allowed | Standard SERP |
| applebot / applebot-extended | Allowed | No explicit Allow |
| Amazonbot | Allowed | No explicit Allow |
| CCBot (Common Crawl) | Allowed | Required for many LLM training sets |

**Verdict:** Access is technically open. Adding explicit per-agent `Allow:` blocks is a low-cost signal that the publisher actively welcomes AI crawling — useful as a YMYL credibility cue.

---

## Top 3 AI-Visibility Blockers

### 1. UTF-8 corruption in JSON-LD (CRITICAL, cross-ref schema audit)

Turkish diacritics in author names, organization names, page titles, and breadcrumb labels render as `?` in the served HTML. AI entity-resolvers parse these strings; they cannot match `"Yay?n Kurulu"` to "Yayın Kurulu", `"Doc. Dr. Senai Aksoy"` to the real-world entity. The result: tupbebek.com is invisible to entity-graph lookups even when the content is excellent.

**Fix:** root cause in JSON-LD string construction (hardcoded Turkish in `.astro` components served without explicit UTF-8 encoding). Schema audit (`reports/seo-audit-schema.md`) has exact locations.

### 2. No FAQPage schema on /sss/ (HIGH)

The 12-question FAQ exists in HTML but with zero structured markup. Google AI Overviews, Perplexity, and ChatGPT all preferentially surface FAQPage-marked questions when answering user queries because (a) the question is pre-parsed, (b) the answer is bounded, (c) attribution to the source is unambiguous. Without it, the site competes against marked-up competitor FAQs and loses.

**Fix:** add `@type: FAQPage` with `mainEntity` array on `/sss/`. See schema audit report for ready-to-paste JSON-LD.

### 3. No Person schema for editorial board (HIGH)

Sixteen named specialists with university affiliations, ESHRE membership, and academic credentials are listed on `/yayin-kurulu/` as plain HTML. For an AI assistant asked "Tüpbebek.com güvenilir mi?", the Person schema with `alumniOf`, `memberOf`, `hasCredential`, `knowsAbout` directly answers the question. Without schema, the assistant relies on parsing plain text — unreliable, often skipped.

---

## Top 5 Quick Wins

| # | Action | Effort | AI Impact |
|---|---|---|---|
| 1 | Fix UTF-8 corruption in JSON-LD strings | 2-4h | Restores entity matching for every page |
| 2 | Add FAQPage schema to /sss/ + per-article FAQ sections where applicable | 1-2h | Direct citation lift in AI Overviews / Perplexity |
| 3 | Add Person schema for all 16 board members on /yayin-kurulu/ | 2-3h | E-E-A-T signal for YMYL, entity-graph indexing |
| 4 | Publish /llms.txt | 30 min | Publisher-friendly marker; surfaces site map to LLM agents that respect the spec |
| 5 | Add a "Hızlı Cevap" callout box + per-article TL;DR at the top of every article | 4-6h ongoing | Passage-level citability — AI engines extract bounded answer blocks |

---

## llms.txt — Ready to Paste

Save as `D:\A-klasör\tupbebek\public\llms.txt`:

```
# tupbebek.com
> Türkiye'nin bağımsız, reklamsız, bilimsel üreme sağlığı ve infertilite referans portalı. Baş Editör: Doç. Dr. Senai Aksoy. Tıbbi Danışma Kurulu onaylı içerik. Hasta tedavi reklamı içermez; tüm öneriler bilimsel kanıt derecesi (A/B/C/D-E) ile sunulur.

## Hakkında
- [Hakkımızda](https://tupbebek.com/hakkimizda/)
- [Yayın Kurulu](https://tupbebek.com/yayin-kurulu/)
- [Editöryal Politika](https://tupbebek.com/editoryal-politika/)
- [Yayın Süreci](https://tupbebek.com/yayin-sureci/)
- [Tıbbi Sorumluluk Reddi](https://tupbebek.com/tibbi-sorumluluk-reddi/)

## Ana Rehberler
- [IVF Rehberi](https://tupbebek.com/ivf-rehberi/)
- [Tanı Süreci](https://tupbebek.com/tani-sureci/)
- [Tedavi Yöntemleri](https://tupbebek.com/tedavi-yontemleri/)
- [Kadın İnfertilitesi](https://tupbebek.com/kadin-infertilitesi/)
- [Erkek İnfertilitesi](https://tupbebek.com/erkek-infertilitesi/)
- [Yaş ve Fertilite](https://tupbebek.com/yas-ve-fertilite/)
- [Hormon Paneli](https://tupbebek.com/hormon-paneli/)
- [Genetik Testler (PGT)](https://tupbebek.com/genetik-testler/)
- [Sık Sorulan Sorular](https://tupbebek.com/sss/)
- [Tıbbi Sözlük](https://tupbebek.com/tibbi-sozluk/)

## Yayın İlkeleri
- Tüm makaleler Tıbbi Danışma Kurulu incelemesinden geçer.
- Klinik öneriler Oxford CEBM benzeri kanıt hiyerarşisiyle derecelendirilir (A, B, C, D/E).
- Kaynaklar: ESHRE, ASRM, Cochrane, WHO, PubMed (DOI ile).
- Klinik reklamı, indirim, garanti, hasta yorumu, öncesi/sonrası fotoğrafı içermez (T.C. Sağlık Bakanlığı 12 Kasım 2025 Tanıtım Yönetmeliği uyumlu).
```

---

## Passage-Level Citability — Sample Article Findings

Sample: `/makaleler/tup-bebek-nedir/`

| Signal | Status |
|---|---|
| Standalone definition at top | Partial — no "Hızlı Cevap" / TL;DR callout |
| Numeric stats with inline citation | Good — references list at bottom, but stats not always linked passage-level |
| Q&A sub-blocks within article | Absent |
| Glossary tooltips | Present (tibbi-sozluk integration) |
| Visible reviewer + reviewDate | Present in UI |
| Schema-level reviewedBy | Present but UTF-8 corrupted |
| External authority links | PubMed/DOI yes; ESHRE/ASRM as anchor links yes |

**Per-article checklist for new content:**

1. Open with a "Hızlı Cevap" callout (2-3 sentences) that fully answers the head question — AI engines extract this.
2. Embed inline citations next to every numeric claim — not just in the references list.
3. Add one or two `<details>` Q&A blocks for the most common follow-up questions.
4. Use `<dfn>` on the first occurrence of every glossary term — pairs with the existing tooltip system.
5. End with a "Kısa Özet" box that an AI engine can quote as a stand-alone summary.

---

## Cross-Reference Notes

- Schema fixes are a hard prerequisite. See `reports/seo-audit-schema.md` Critical items 1-3.
- Sitemap 404 (per `reports/seo-audit-technical.md` and `reports/seo-audit-sitemap.md`) currently blocks AI crawlers that discover content via the sitemap index. Fix first.
- UTF-8 root cause: hardcoded Turkish strings in Astro component templates may be served via a code path that strips encoding. Validate by running `curl -I https://tupbebek.com/ | grep -i content-type` and verifying explicit `charset=utf-8`.
