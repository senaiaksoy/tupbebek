# Backlink Profile Audit — tupbebek.com
**Date:** 2026-05-12
**Data tier:** Tier 0 — no API credentials found (`scripts/backlinks_auth.py` absent)
**Method:** Static code analysis + qualitative gap assessment
**Confidence:** No numeric Backlink Health Score issued — fewer than 4 scoring factors have quantitative data. See INSUFFICIENT DATA notice below.

---

## Hard Constraint Check

| Check | Status | Detail |
|---|---|---|
| 301 redirect to senaiaksoy.net | PASS | No match in `_redirects` or `astro.config.mjs` |
| 301 redirect to draksoyivf.com | PASS | No match in `_redirects` or `astro.config.mjs` |
| Outbound hyperlinks to those domains | PASS | Only `mailto:dr@senaiaksoy.net` present (Footer, contact, legal pages) — not a navigational link |
| `mailto:` as implicit brand signal | WARN | The email address appears in Footer, iletisim, gizlilik-politikasi, kullanim-kosullari, and the Resend email template. It is compliant (no link juice, no redirect) but creates a visible association. Consider a `@tupbebek.com` contact address for full independence signalling. |

No Critical issues detected on the hard constraint.

---

## INSUFFICIENT DATA Notice

No Common Crawl script, Moz API, Bing Webmaster, or DataForSEO credentials are configured in this repository. Quantitative metrics (referring domain count, DA distribution, toxic link ratio, anchor text breakdown, link velocity) cannot be calculated. The remainder of this audit is qualitative: expected link gap analysis and a compliant acquisition strategy.

To enable quantitative analysis: run `/seo backlinks setup` or install `extensions/dataforseo/install.sh`.

---

## Expected Link Profile for This Site Type

tupbebek.com is a Turkish-language, independent, ad-free medical editorial portal with 62+ published articles, structured data, and a 40-page hierarchy. Based on the content surface and niche, a healthy backlink profile would typically include the following referring domain categories.

| Domain type | Example targets | Current likelihood | Priority |
|---|---|---|---|
| Turkish university hospital pages | hh.edu.tr, istanbul.edu.tr tip fak. | Low — portal is new/relaunched | High |
| .gov.tr health bodies | saglik.gov.tr, thsk.saglik.gov.tr | Very low — rarely link out | Medium |
| ESHRE / ASRM / WHO | eshre.eu, asrm.org, who.int | Very low — they do not link TR portals | Low |
| Turkish medical journalism | t24.com.tr saglik, milliyet saglik | Possible if press coverage acquired | High |
| Patient-community forums | uludagsozluk derivatives, forum.jigolo (health) | Likely organic but low-authority | Low |
| Science aggregators | dergipark.org.tr (open Turkish journals) | Achievable via author cross-refs | High |
| Fertility podcast / YouTube notes | Turkish fertility YouTubers' descriptions | Achievable, topically aligned | Medium |
| Wikipedia Turkish health articles | tr.wikipedia.org | Achievable via citation additions | Medium |

---

## Link Acquisition Strategy (Compliance-Constrained)

The site operates under SB 12 November 2025 regulations and must remain structurally independent from Dr. Aksoy's clinical entities. The following tactics are permitted and aligned.

**High priority — editorial and academic**

1. DergiPark author profiles: Articles where Dr. Aksoy is listed as author can reference tupbebek.com as the public-facing summary resource (not a clinic link). Each DergiPark page that includes an author bio or supplementary URL becomes a .edu/.org-adjacent citation.
2. Wikipedia Turkish articles on IVF, ICSI, PGT, endometriosis, and male infertility: tupbebek.com articles cite PubMed sources that also appear in Wikipedia's reference lists. Adding tupbebek.com as a Turkish-language external resource on those Wikipedia pages is editorially defensible and commonly done for national-language health portals.
3. Turkish medical associations (TJOD — Turk Jinekoloji ve Obstetrik Dernegi, TSRM): Request listing as a patient-information resource in their "Hasta Bilgilendirme" sections. This is a content partnership, not a clinic referral.

**Medium priority — press and media**

4. Health desk outreach to national media (Hurriyet Saglik, Milliyet Saglik, NTV Saglik): Offer editorial comment on infertility statistics (TurkStat, ESHRE data). Author credit naturally produces do-follow links from high-DA Turkish news domains.
5. The e-kitap (nutrition plan PDF) is a linkable asset. Outreach to nutrition and dietitian blogs (Turkish RDs writing about fertility diets) can produce relevant, topically coherent links without clinical association.

**Explicitly prohibited by project constraints**

- Link exchanges with IVF clinics (breaches independence declaration).
- Paid placements on health directories that mix clinic listings (creates implied affiliation).
- Any reciprocal link arrangement with senaiaksoy.net or draksoyivf.com (even nofollow links should follow the passive-career-note protocol defined in CLAUDE.md, not bulk reciprocal patterns).

---

## Structural Observations from Code Review

- The `/dr-senai-aksoy*` path 301-redirects to `/hakkimizda` — correct, keeping brand equity internal.
- The `/randevu*` redirect to `/iletisim` is appropriate and does not leak to a clinic booking system.
- 62 published articles with proper schema markup (MedicalWebPage + Article + reviewedBy) give strong programmatic signals for link-worthiness, but these only convert to backlinks if the content is discovered. A targeted content seeding campaign (points 4-5 above) is the gap.
- The yayin-kurulu (editorial board) page, if populated with verifiable academic names and ORCID links, is the single highest-leverage trust signal for attracting .edu.tr inbound links.

---

## Recommended Next Steps

| Action | Priority | Effort |
|---|---|---|
| Set up Moz API credentials for quantitative baseline | Critical | Low |
| Populate yayin-kurulu with ORCID / institutional affiliations | High | Medium |
| Submit to TJOD patient-resource listing | High | Low |
| Add tupbebek.com to Wikipedia TR fertility articles as external resource | High | Low |
| Create DergiPark author profile link to site | Medium | Low |
| E-kitap outreach to Turkish RD / nutrition blogs | Medium | Medium |
| Replace `dr@senaiaksoy.net` with a `@tupbebek.com` email | Medium | Low |

For E-E-A-T content signals that support link-worthiness, run `/seo content tupbebek.com`.
For technical crawlability affecting link equity flow, run `/seo technical tupbebek.com`.
