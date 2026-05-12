# tupbebek.com — Content Cluster Architecture Audit
**Date:** 2026-05-12 | **Articles audited:** 65 | **Analyst:** SEO Cluster Agent

---

## Cluster Map Overview

Six hub-and-spoke clusters are proposed. Hub pages already exist as `.astro` landing pages for most clusters; the gaps are at the spoke (article) level and in structured internal linking.

---

## Cluster 1 — IVF Süreci (Core Process)
**Hub page:** `/ivf-rehberi` — EXISTS  
**Pillar intent:** Informational / Commercial crossover (highest-volume entry point)

### Assigned spokes (existing articles)
| Slug | Title |
|---|---|
| `tup-bebek-nedir` | Tüp Bebek Nedir? |
| `tup-bebek-sureci-rehber` | Süreç Nasıl İlerler? |
| `ivf-protokolleri` | IVF Protokolleri (Antagonist, Uzun, Mini, DuoStim) |
| `kac-yumurta-gerekir` | Kaç Yumurta Gerekir? |
| `yasa-gore-tup-bebek-basari-oranlari` | Yaşa Göre Başarı Oranları |
| `basari-oranlari` | Başarı Oranları ve Etki Eden Etkenler |
| `tup-bebek-yanlis-bilinenler` | 10 Yaygın Yanlış İnanç |
| `iui-nedir` | IUI / Aşılama Nedir? |

### Coverage gaps
- No "tüp bebek maliyeti / nasıl karşılanır" article (cost framing without price list is legally permissible as general information)
- No "ilk muayenede neler beklenir" patient-preparation spoke
- No "OHSS nedir, nasıl önlenir" standalone article (OHSS risk is touched in `opk-ve-ivf` but not addressed for general IVF patients)

### Top 3 priority new articles
1. **`ohss-nedir-nasil-onlenir`** — High-volume symptom query; bridges to PCOS and protokol spokes
2. **`tup-bebek-ilk-muayene-hazirlik`** — Decision-stage patient intent; feeds IUI and process spokes
3. **`tup-bebek-kac-deneme-yapilir`** — Common post-failure question; bridges to Cluster 5

---

## Cluster 2 — Embriyo Laboratuvarı & Transfer
**Hub page:** `/transfer-sureci` — EXISTS  
**Pillar intent:** Informational (mid-treatment patients)

### Assigned spokes
| Slug | Title |
|---|---|
| `mikroenjeksiyon-icsi-nedir` | Mikroenjeksiyon (ICSI) Nedir? |
| `embriyo-transferi-gun-secimi` | 3. Gün mü, 5. Gün mü? |
| `taze-dondurulmus-transfer` | Taze mi, Dondurulmuş Transfer mi? |
| `dondurulmus-embriyo-transferi` | Dondurulmuş Embriyo Transferi (FET) |
| `embriyo-transferi-sonrasi-bakim` | Transfer Sonrası Bakım |
| `beta-hcg-testi` | Beta-hCG Testi Yorumu |
| `kimyasal-gebelik` | Kimyasal Gebelik |
| `laboratuvar-raporu-yorumlama` | 4AA, 3BB Embriyo Gradesi |
| `embryoscope-yapay-zeka` | EmbryoScope ve YZ Destekli Seçim |
| `embryoglue-faydalari` | Embryoglue (Add-On) |
| `era-testi-iluzyon` | ERA Testi Gerçeği |
| `endometriyal-scratching` | Endometriyal Scratching |
| `bagisiklik-tedavileri` | Bağışıklık Tedavileri (Add-On) |
| `vajinal-mikrobiyom-fiv` | Vajinal Mikrobiyom |

### Coverage gaps
- No blastosist kültürü vs. kleavaj evresi transfer karşılaştırması (overlaps day-3/5 but deserves own depth)
- No "dondurulmuş embriyo transferi hazırlığı" spoke (process detail beyond taze/dondurulmuş comparison)
- Add-on articles exist but no overarching "IVF add-on rehberi" spoke to consolidate Embryoglue/ERA/Scratching/Immunotherapy

### Top 3 priority new articles
1. **`ivf-add-on-rehberi`** — Aggregates 4 existing add-on spokes; reduces cannibalization between them
2. **`fet-hazirlik-protokol`** — High post-FET search volume; bridges taze/dondurulmuş and transfer-sonrası
3. **`blastosist-kulturu-nedir`** — Lab-stage explainer; bridges embryoscope and gün-seçimi spokes

---

## Cluster 3 — Kadın İnfertilitesi
**Hub page:** `/kadin-infertilitesi` — EXISTS  
**Pillar intent:** Informational

### Assigned spokes
| Slug | Title |
|---|---|
| `kadin-kisirligi-tup-bebek` | Kadın Kısırlığı: Nedenler, Tanı, Tedavi |
| `dusuk-amh-hamilelik` | Düşük AMH ile Hamile Kalınır mı? |
| `over-prp` | Yumurtalık PRP |
| `yumurtlama-takibi` | Yumurtlama Takibi |
| `yumurtalik-kistleri-dogurganlik` | Yumurtalık Kistleri |
| `adet-duzensizligi-pcos` | Adet Düzensizliği ve PCOS |
| `adet-gorememe` | Amenore |
| `pkos-ve-tup-bebek` | PKOS ve Tüp Bebek |
| `opk-ve-ivf` | PCOS ve Tüp Bebek / OHSS |
| `hiperprolaktinemi-ve-kisirlik` | Hiperprolaktinemi ve Kısırlık |
| `hiperprolaktinemi-prolaktinom` | Hiperprolaktinemi / Prolaktinom |
| `aciklanamayan-infertilite` | Açıklanamayan İnfertilite |
| `hidrosalpinx-ve-kisirlik` | Hidrosalpinx |
| `akinti-kasinti-koku` | Akıntı/Kaşıntı/Koku |

**Cannibalization warning:** `pkos-ve-tup-bebek` (legacy .md) and `opk-ve-ivf` + `adet-duzensizligi-pcos` overlap significantly on PCOS. The legacy `pkos-ve-tup-bebek.md` should be noindexed or redirected to `opk-ve-ivf`.  
**Cannibalization warning:** `hiperprolaktinemi-prolaktinom.md` (legacy) duplicates `hiperprolaktinemi-ve-kisirlik.mdx`. Legacy should be consolidated.

### Coverage gaps
- No "tüp tıkanıklığı (tubal factor)" spoke — hidrosalpinx exists but the broader tubal infertility topic is missing
- No "erken menopoz / POI" spoke
- No "tiroid ve kısırlık" spoke (high search volume, frequently linked to PCOS/AMH discussions)

### Top 3 priority new articles
1. **`tiroid-kisirlik-iliskisi`** — Cross-links to AMH, PCOS, açıklanamayan infertilite spokes; high commercial intent
2. **`erken-menopoz-poi`** — Growing patient cohort; bridges AMH, over-prp, and yumurta-dondurma
3. **`tubal-faktor-infertilite`** — Fills the uterine-tube gap; cross-links hidrosalpinx and histeroskopi

---

## Cluster 4 — Erkek İnfertilitesi
**Hub page:** `/erkek-infertilitesi` — EXISTS  
**Pillar intent:** Informational

### Assigned spokes
| Slug | Title |
|---|---|
| `azospermi-mikro-tese` | Azospermi ve Mikro-TESE |
| `cerrahi-sperm-arama-tese` | Micro-TESE / TESA / TESE Rehberi |
| `varikosel-nedir-ne-zaman-ameliyat-gerekir` | Varikosel |
| `erkek-dogurganlik-besin-takviyeleri` | Erkek Doğurganlığı Takviyeleri (.mdx) |
| `erkek-kisirligi-besin-takviyeleri` | Erkek Kısırlığında Besin Takviyeleri (legacy .md) |
| `cep-telefonu-sperm-kalitesi` | Cep Telefonu ve Sperm |
| `izotretinoin-sperm` | İzotretinoin ve Sperm |

**Cannibalization warning:** `erkek-dogurganlik-besin-takviyeleri.mdx` and `erkek-kisirligi-besin-takviyeleri.md` are near-duplicate topics. Legacy .md should be noindexed.

### Coverage gaps
- No "sperm analizi nasıl yorumlanır" spoke (morphology, motility, concentration explainer)
- No "DNA fragmantasyonu" spoke (rising clinical test; high patient search volume)
- No "erkek infertilitesi ilaç tedavileri" spoke

### Top 3 priority new articles
1. **`sperm-analizi-yorumlama`** — Entry-level diagnostic spoke; highest volume in the cluster
2. **`sperm-dna-fragmantasyonu`** — Growing clinical relevance; bridges mikroenjeksiyon and azospermi spokes
3. **`erkek-infertilitesi-ilac-tedavisi`** — Bridges varikosel and takviye spokes; rounds out non-surgical options

---

## Cluster 5 — Genetik & Özel Durumlar
**Hub page:** `/pgt-merkezi` + `/genetik-testler` — BOTH EXIST (possible hub redundancy)

### Assigned spokes
| Slug | Title |
|---|---|
| `genetik-testler` | PGT Nedir, Ne Zaman Gerekir? (legacy .md) |
| `pgt-m` | PGT-M: Tek Gen Hastalıkları |
| `pgt-cinsiyet-secimi` | PGT ile Cinsiyet Seçimi (Türkiye'de yasal mı?) |
| `akraba-evliligi` | Akraba Evliliği ve Genetik Risk |
| `kanser-ve-fertilite` | Kanser ve Fertilite Koruma |
| `yumurta-dondurma-rehberi` | Yumurta Dondurma |
| `basarisiz-denemeler` | Başarısız Denemeler (legacy .md) |
| `bagisiklik-tedavileri` | Bağışıklık Tedavileri |

**Hub redundancy note:** `/pgt-merkezi` and `/genetik-testler` serve overlapping purposes. Recommend designating `/pgt-merkezi` as the PGT-specific hub and `/genetik-testler` as a broader diagnostic spoke within Cluster 1 or 3.

### Coverage gaps
- No "PGT-A nedir" standalone article (PGT-M exists but PGT-A/anöploidi taraması is missing)
- No "taşıyıcılık testi nedir" spoke
- `basarisiz-denemeler.md` is categorized as "Rehber" and sits awkwardly here — better fits a new Cluster 6

### Top 3 priority new articles
1. **`pgt-a-anoplodi-taramasi`** — Logical sibling to pgt-m; fills the most-searched PGT variant
2. **`tasiyicilik-testi-nedir`** — Bridges akraba-evliligi and pgt-m spokes
3. **`tekrarlayan-dusuk-nedenleri`** — High-volume topic; currently absent; bridges genetic cluster and Cluster 6

---

## Cluster 6 — Cerrahi & Yapısal Sorunlar
**Hub page:** `/kadin-infertilitesi` (currently shared with Cluster 3) — NO DEDICATED HUB  
**Status: THIN CLUSTER — hub page missing**

### Assigned spokes (currently orphaned or misclassified)
| Slug | Title |
|---|---|
| `endometriozis-tup-bebek` | Endometriozis ve Tüp Bebek |
| `endometriozis-akilli-stratejiler` | Endometriozis: Tanı, Rezerv, IVF Stratejileri |
| `endometrioma` | Endometrioma: Ameliyat, AMH, IVF |
| `hormonal-tedavi-adenomyozis` | Adenomyozis Hormonal Tedavi |
| `asherman-sendromu` | Asherman Sendromu |
| `miyomlar-ve-tup-bebek` | Miyomlar ve Tüp Bebek |
| `miyom-ameliyati` | Miyom Ameliyatı Karar Rehberi |
| `myomlar-ve-kisirlik` | Myomlar ve Kısırlık (legacy .md) |
| `endoskopik-cerrahi-histeroskopi` | Histeroskopi Rehberi |
| `ivf-oncesi-histeroskopi` | IVF Öncesi Histeroskopi |

**Cannibalization warning:** `miyomlar-ve-tup-bebek`, `miyom-ameliyati`, and `myomlar-ve-kisirlik.md` (legacy) cover nearly the same topic. Legacy .md should be consolidated.  
**Thin cluster:** The `/endometriozis-adenomyozis` page exists as a landing page but it only covers two conditions. A broader `/cerrahi-hazirlik` or `/rahim-ve-fertilite` hub is needed to anchor the full spoke set.

### Top 3 priority new articles
1. **`rahim-icinde-cerrahi-hazirlik`** — Hub connector: links Asherman, histeroskopi, endometriyal prep spokes
2. **`adenomyozis-nedir-tup-bebek`** — Current adenomyozis coverage is only hormonal-treatment-focused; a diagnostic/overview spoke is missing
3. **`tekrarlayan-implantasyon-basarisizligi`** — Cross-cluster connector (Clusters 2, 5, 6); very high commercial intent

---

## Orphan Articles (No Clear Cluster Home)
| Slug | Issue |
|---|---|
| `duygusal-dayaniklik-rehberi` | "Psikolojik Destek" category has no hub; `/psikolojik-destek` page exists but 0 spokes link to it |
| `aciklanamayan-kisirlik` | Static page, no corresponding article |
| `alkol-ve-fertilite` | Only lifestyle article; `/beslenme-yasam` hub exists but no other lifestyle spokes in article corpus |
| `istanbul-tup-bebek-doktoru` | Navigational/commercial intent; `/iyi-tup-bebek-merkezi` is sibling — both could anchor a "Merkez Seçimi" mini-cluster |
| `iyi-tup-bebek-merkezi` | Same issue — see above |
| `basarisiz-denemeler` | Needs a home in Cluster 5 or a "Sonraki Adım" mini-cluster |

---

## Internal Link Matrix

### Mandatory (pillar ↔ spoke, bidirectional)
- `/ivf-rehberi` ↔ all Cluster 1 spokes (8 articles)
- `/transfer-sureci` ↔ all Cluster 2 spokes (14 articles)
- `/kadin-infertilitesi` ↔ all Cluster 3 spokes (14 articles)
- `/erkek-infertilitesi` ↔ all Cluster 4 spokes (7 articles)
- `/pgt-merkezi` ↔ pgt-m, pgt-cinsiyet-secimi, akraba-evliligi (3 articles)
- `/endometriozis-adenomyozis` ↔ all Cluster 6 spokes (10 articles)

### Recommended (spoke-to-spoke within cluster)
- `ivf-protokolleri` → `kac-yumurta-gerekir` → `yasa-gore-tup-bebek-basari-oranlari`
- `taze-dondurulmus-transfer` ↔ `dondurulmus-embriyo-transferi` (merge candidates; for now bidirectional link)
- `embriyo-transferi-gun-secimi` → `laboratuvar-raporu-yorumlama` → `embryoscope-yapay-zeka`
- `era-testi-iluzyon` → `endometriyal-scratching` → `embryoglue-faydalari` (add-on skeptic trail)
- `azospermi-mikro-tese` ↔ `cerrahi-sperm-arama-tese` (bidirectional; near-sibling topics)
- `endometrioma` → `endometriozis-tup-bebek` → `endometriozis-akilli-stratejiler`
- `miyomlar-ve-tup-bebek` ↔ `miyom-ameliyati` (bidirectional)
- `ivf-oncesi-histeroskopi` → `endoskopik-cerrahi-histeroskopi`

### Optional (cross-cluster semantic links)
- `dusuk-amh-hamilelik` → `over-prp` (Cluster 3 → 3)
- `opk-ve-ivf` → `ivf-protokolleri` (Cluster 3 → Cluster 1)
- `azospermi-mikro-tese` → `mikroenjeksiyon-icsi-nedir` (Cluster 4 → Cluster 2)
- `pgt-m` → `akraba-evliligi` (Cluster 5 internal)
- `kanser-ve-fertilite` → `yumurta-dondurma-rehberi` (Cluster 5 internal)
- `duygusal-dayaniklik-rehberi` → `basarisiz-denemeler` (orphan ↔ orphan; both link to `/psikolojik-destek`)

---

## Cannibalization Flags Summary
| Legacy article | Duplicate of | Recommendation |
|---|---|---|
| `pkos-ve-tup-bebek.md` | `opk-ve-ivf.mdx` | Noindex legacy; add redirect |
| `hiperprolaktinemi-prolaktinom.md` | `hiperprolaktinemi-ve-kisirlik.mdx` | Noindex legacy; add redirect |
| `erkek-kisirligi-besin-takviyeleri.md` | `erkek-dogurganlik-besin-takviyeleri.mdx` | Noindex legacy; add redirect |
| `myomlar-ve-kisirlik.md` | `miyomlar-ve-tup-bebek.mdx` + `miyom-ameliyati.mdx` | Noindex legacy; add redirect |
| `basari-oranlari.md` | `yasa-gore-tup-bebek-basari-oranlari.mdx` | Keep both if content is differentiated; otherwise merge |

---

## Content Calendar — 12 New Articles Ranked by Strategic Value

| Rank | Slug | Cluster | Rationale |
|---|---|---|---|
| 1 | `tekrarlayan-implantasyon-basarisizligi` | C2/C6 | Highest commercial intent; cross-cluster connector; no current coverage |
| 2 | `sperm-analizi-yorumlama` | C4 | Highest search volume in erkek cluster; entry-point diagnostic |
| 3 | `ohss-nedir-nasil-onlenir` | C1 | High-volume symptom query; bridges PCOS and protokol spokes |
| 4 | `tekrarlayan-dusuk-nedenleri` | C5/C6 | Emotionally important topic; bridges genetic and structural clusters |
| 5 | `tiroid-kisirlik-iliskisi` | C3 | High monthly volume; adds hormonal depth missing from current kadin cluster |
| 6 | `pgt-a-anoplodi-taramasi` | C5 | Logical sibling to pgt-m; fills most-searched PGT variant gap |
| 7 | `ivf-add-on-rehberi` | C2 | Reduces add-on article cannibalization; high editorial credibility value |
| 8 | `erken-menopoz-poi` | C3 | Growing cohort; AMH + PRP + yumurta-dondurma spoke connector |
| 9 | `sperm-dna-fragmantasyonu` | C4 | Rising clinical test adoption; bridges azospermi and mikroenjeksiyon |
| 10 | `tup-bebek-ilk-muayene-hazirlik` | C1 | Decision-stage patient intent; top-of-funnel for e-book conversion |
| 11 | `adenomyozis-nedir-tup-bebek` | C6 | Diagnostic overview missing; current adenomyozis article is treatment-only |
| 12 | `tasiyicilik-testi-nedir` | C5 | Bridges akraba-evliligi and pgt-m; rising genetic awareness in target audience |
