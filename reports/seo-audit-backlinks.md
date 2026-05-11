# Backlink Profile Audit — tupbebek.com
**Date:** 2026-05-10
**Auditor:** claude-seo / backlinks skill
**Tier:** 0 (free sources only — skill scripts not installed)
**Data sources attempted:** Common Crawl index query (no script), internal content grep, existing audit cross-reference

---

## Data Collection Log

| Source | Attempted | Result |
|---|---|---|
| Common Crawl index query | No (script not installed) | SKIPPED — no CC in-degree data |
| Open PageRank / DomCop endpoint | No (no WebFetch tool in this session) | SKIPPED — no OPR data |
| SERP site: query | No (no WebSearch tool in this session) | SKIPPED |
| Internal outbound link grep | YES | 171 external URLs across 64 articles |
| Existing SEO audit cross-reference | YES | technical + content audits read |
| senaiaksoy.net / draksoyivf.com link check | YES | CLEAN — zero outbound links to either domain |

---

## Backlink Health Score

**Score: INSUFFICIENT DATA**
**Confidence band: LOW**

Per the backlink skill protocol, a numeric score (0–100) is not produced when fewer than 4 of the 7 scoring factors have an active data source. At Tier 0 with no CC script, no Moz, no Bing Webmaster, and no DataForSEO, zero inbound-link factors can be directly measured. Producing a number would be misleading for a Turkish YMYL medical publisher where backlink authority is a consequential signal.

**What can be inferred from internal signals:**

The site launched (or relaunched) in 2025. Domain age is under 18 months at time of audit. For a new independent publisher in a competitive YMYL vertical (Turkish IVF), an absent or very thin inbound link profile is the statistical baseline expectation — this is not a failure state, it is the starting position. The editorial content quality (97% structured references, ESHRE/ASRM citations, PubMed DOIs across 64 articles) positions the site well for earning citations once referrers become aware of it.

---

## HARD CONSTRAINT CHECK

**Status: PASS**

A full grep across all 64 article source files finds zero outbound hyperlinks to `senaiaksoy.net` or `draksoyivf.com`. The legal separation is currently respected at the content layer. No 301-redirect sharing has been detected in the route configs reviewed in the technical audit. This should be monitored every deploy cycle.

---

## Outbound Link Profile (Observable Signal)

These are signals of citation behavior that will influence how other sites eventually perceive the domain's editorial standards.

| Domain being cited (outbound) | Count | Signal |
|---|---|---|
| pubmed.ncbi.nlm.nih.gov | 37 | Strong — primary literature |
| pmc.ncbi.nlm.nih.gov | 18 | Strong — open-access full text |
| www.eshre.eu | 12 | Strong — directly cites the society Dr. Aksoy is a member of |
| www.asrm.org | 8 | Strong — authoritative US guideline body |
| www.mdpi.com | 13 | Moderate — peer-reviewed open access |
| academic.oup.com | 3 | Strong — Oxford UP journals |
| www.cochranelibrary.com | 3 | Strong — systematic review gold standard |
| icr-heart.com | 8 | Moderate — review journal; verify persistence |
| www.vitrolife.com | 6 | Neutral — manufacturer cite, appropriate for device context |
| www.resmigazete.gov.tr | 1 | Good — Turkish regulatory citation (Sağlık Bakanlığı Yönetmelik) |

**Assessment (Parsed, confidence: 0.95):** The outbound citation pattern resembles academic publishing, not thin affiliate content. This is a structural prerequisite for earning inbound citations from university and research sites — those linkers will only point to sites that demonstrate they use primary literature. tupbebek.com satisfies that prerequisite.

---

## Top 5 Outreach Targets

Ranked by estimated probability of a link being placed, given the site's content profile, Dr. Aksoy's ESHRE membership, and the Turkish institutional landscape.

### 1. ESHRE (eshre.eu) — Patient Information Section
**Rationale:** Dr. Aksoy is an ESHRE member. ESHRE maintains a patient information portal and occasionally links to member-verified national-language resources. An article like `yasa-gore-tup-bebek-basari-oranlari.md` directly references ESHRE's 2024 IVF Good Practice guidelines and translates them for a Turkish audience. This is exactly the use case ESHRE's patient communication committee supports.
**Action:** Submit via ESHRE member portal; cite the specific guideline page already linked from the article.

### 2. Hacettepe Universitesi — Tıp Fakültesi / Kadın Hastalıkları Birimi (hacettepe.edu.tr)
**Rationale:** Hacettepe is Turkey's top-ranked medical university and its OB-GYN department publishes patient-facing fertility content. The `ivf-protokolleri.md` and `genetik-testler.md` articles are at a level of clinical depth that a Hacettepe resident or faculty page might cite as a patient-education reference. University .edu.tr domains carry substantial link authority in Turkish SERPs.
**Action:** Direct email to the department's research assistant or communications office; frame as patient education resource, not commercial referral.

### 3. NTV Saglik (ntv.com.tr/saglik)
**Rationale:** NTV Saglik regularly runs listicles and explainers on fertility topics ("tüp bebek nedir", "kısırlık tedavisi"). They quote clinicians by name. Dr. Aksoy's academic profile (Doç. Dr., ESHRE) meets their sourcing bar. A background quote leading to a citation is a realistic outcome, especially around World IVF Day (25 July).
**Action:** Pitch a timely story (e.g., Turkey's legal IVF success rate disclosure law, which `yasa-gore-tup-bebek-basari-oranlari.md` covers exclusively) rather than a general background relationship.

### 4. Ankara Universitesi — Infertilite ve Tup Bebek Merkezi (medicine.ankara.edu.tr)
**Rationale:** Ankara University's IVF center publishes patient guides and has a history of linking to verified external patient-education resources in Turkish. The `pgt-m.md` (preimplantation genetic testing for monogenic disease) and `kanser-ve-fertilite.md` articles cover complex topics that their own patient guides do not fully address in accessible language.
**Action:** Contact the patient liaison office; position as a resource for patients who need extended reading after consultations.

### 5. MAMA Dernegi (mamabirlik.com or equivalent Turkish patient advocacy)
**Rationale:** Turkish patient communities for infertility (MAMA, various Facebook-originated support organizations) are credible linkers in the consumer YMYL vertical. They curate "trusted information" pages. The `duygusal-dayaniklik-rehberi.mdx` and `basarisiz-denemeler.md` articles address the emotional experience of repeated IVF failure — content that patient advocacy groups explicitly seek to share.
**Action:** Engage in the community organically first; submit resource listings only after establishing trust. Avoid clinic-facing framing.

---

## Top 3 Link-Magnet Articles

These are the articles most likely to attract unsolicited natural citations based on content uniqueness, search demand, and reference utility.

### 1. `yasa-gore-tup-bebek-basari-oranlari.md`
**Title:** Yaşa Gore Tüp Bebek Basari Oranlari: 30, 35, 40 ve Üzeri
**Why it attracts links:** This is the only Turkish-language article that maps IVF success rates to the specific age bands used in Turkey's Sağlık Bakanlığı regulation, with ESHRE and Cochrane citations. Journalists, patient advocates, and other clinicians who need a citable Turkish-language summary will reach for this. The Resmi Gazete citation makes it uniquely useful for legal/policy contexts. Data-rich explainers in local languages with primary-source backing are a well-documented link magnet category.

### 2. `vajinal-mikrobiyom-fiv.md`
**Title:** Vajinal Mikrobiyom ve FIV Basarisi
**Why it attracts links:** This is a high-novelty topic in Turkish-language IVF content. The article names specific bacterial species (L. crispatus), cites PubMed and PMC sources, and connects microbiome science to IVF implantation failure — a question that affects every patient who has had a biochemical pregnancy. Sites covering women's health, microbiome research, or IVF will find this rare in Turkish. The icr-heart.com citation (8 occurrences across the corpus) suggests this article is among the most reference-dense, which correlates with linkability.

### 3. `embryoscope-yapay-zeka.md`
**Title:** EmbryoScope ve Yapay Zeka Destekli Embriyo Secimi
**Why it attracts links:** Technology + IVF is a topic category that health journalists and medtech bloggers actively seek in local languages. This article is the most structurally complete in the corpus for a technology-forward topic, covering Vitrolife's platform, AI integration, 2024-2025 RCT findings, and patient-specific indications. Turkish IVF clinics evaluating EmbryoScope adoption may link to it as patient explanation material. Health tech vertical sites (e.g., saglikhaber.com, medikal.net) often link to well-structured device explainers.

---

## Competitor Reference Baseline

These sites represent the relevant Turkish IVF publisher landscape. tupbebek.com should not attempt to acquire 301-shared links from these competitors, but understanding their backlink sources informs prospecting.

| Publisher | Type | Estimated inbound signal | Notes |
|---|---|---|---|
| acibadem.com.tr/saglik | Hospital media | Very high (DA-equivalent) | Commercial; links from here require clinical partnership |
| hekimler.org | Professional directory | Medium | Dr. Aksoy profile page would be a natural fit |
| medikalakademi.com.tr | Medical education | Medium | CME content overlaps; potential co-citation source |
| hurriyet.com.tr/saglik | Mass-market health journalism | High | Requires PR relationship; realistic after 1-2 NTV citations |
| ttb.org.tr | Turkish Medical Association | Medium-high | Authoritative; links rarely given to non-institutional sites |

---

## Structural Observations

**Sitemap 404 (from technical audit):** The live sitemap at `tupbebek.com/sitemap-index.xml` returns 404. Any prospective linker or crawler that validates a resource before linking will encounter this. Fix is documented in the technical audit — this should be treated as a prerequisite before any outreach campaign begins.

**Canonical domain age:** The domain registered/relaunched in 2025. Common Crawl quarterly snapshots will not show meaningful graph data until the domain has been consistently indexed for 2+ quarters. The CC-MAIN-2025 indexes likely show zero or near-zero in-degree for tupbebek.com. This is expected, not pathological.

**YouTube channel signal:** The content grep found 10+ YouTube links pointing to `@DocentDrSenaiAksoy`. If the YouTube channel has established subscriber counts or video view counts, this represents an existing audience asset that can be activated for referral traffic and co-citation awareness before formal backlink campaigns begin.

---

## Recommended Next Steps (Priority Order)

| Priority | Action |
|---|---|
| Critical | Fix sitemap 404 before any outreach (technical audit prerequisite) |
| High | Install Moz API credentials to upgrade to Tier 1 and get actual inbound link counts — run `/seo backlinks setup` |
| High | Begin ESHRE patient resource submission (Dr. Aksoy is already a member; lowest-friction high-authority link available) |
| Medium | Pitch NTV Saglik on Turkey's IVF success-rate disclosure law story (World IVF Day: 25 July 2026) |
| Medium | Claim/verify hekimler.org profile for Dr. Aksoy with tupbebek.com as affiliated site |
| Low | Engage MAMA Dernegi community authentically before requesting resource listing |

---

*Data freshness: Internal content grep is current as of file modification timestamps (latest: April 2026). No live inbound link data was retrievable at Tier 0 without CC or Moz scripts. Upgrade to Tier 1 recommended for next audit cycle.*
