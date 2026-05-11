# Schema.org / JSON-LD Audit — tupbebek.com
**Audit date:** 2026-05-10  
**Platform:** Astro 4.x (Static)  
**Auditor:** Schema.org markup specialist (schema-caveman mode)

---

## 1. Schema Inventory — What Exists

| URL | Schema types found | Source |
|---|---|---|
| `https://tupbebek.com/` | `MedicalWebPage` | BaseLayout global |
| `https://tupbebek.com/makaleler/tup-bebek-nedir/` | `MedicalWebPage` (global), `BreadcrumbList`, `["MedicalWebPage","Article"]`, `Person` (editor), `MedicalWebPage` (reviewedBy patch) | BaseLayout + Breadcrumbs + ArticleSchema + EditorKunyesi (x2) |
| `https://tupbebek.com/yayin-kurulu/` | `MedicalWebPage` (global), `BreadcrumbList` | BaseLayout + Breadcrumbs |

---

## 2. Validation Results — Block by Block

### 2.1 BaseLayout — Global `MedicalWebPage`

**Source file:** `src/layouts/BaseLayout.astro`

| Property | Status | Notes |
|---|---|---|
| `@context` | PASS | `https://schema.org` |
| `@type` | PASS | `MedicalWebPage` |
| `name` | PASS | From page `title` prop |
| `description` | PASS | From page `description` prop |
| `url` | PASS | Absolute canonical URL |
| `inLanguage` | PASS | `tr-TR` |
| `isPartOf.@type` | PASS | `WebSite` |
| `isPartOf.publisher` | PASS | `Organization` with logo |
| `logo.url` | FAIL | Points to `favicon.svg` — Google requires a proper logo image (recommended: PNG/WebP, min 112×112px). A favicon does not qualify as an `Organization.logo` for rich results. |
| `author` | WARN | `Organization` with no `@id`, no `sameAs`, URL points to `/hakkimizda` which has no matching Organization entity — cross-reference breaks. |
| `reviewedBy` | FAIL | URL `https://tupbebek.com/hakkimizda#board` returns a 404 fragment (no dedicated editorial board page). Schema.org `reviewedBy` should point to a dereferenceable URL or use a named `@id`. |
| `lastReviewed` | PASS | `2026-04-07` (ISO 8601) |
| `medicalAudience.audienceType` | WARN | `"Patient"` is a valid string, but schema.org prefers `audienceType` to be drawn from the `MedicalAudienceType` enumeration values: `"Clinician"`, `"MedicalResearcher"`, `"Patient"`, `"Caregiver"`. `"Patient"` is correct but should be cross-checked as Google validates enum case-sensitively. |
| `specialty` | FAIL | `"Üreme Sağlığı"` (rendered as garbled UTF-8 in live output: `"sreme Sa??l???"`). The specialty value is not an enumerated `MedicalSpecialty` value. Schema.org MedicalSpecialty enumerates specific values like `"ReproductiveMedicine"`. Free-text Turkish names are not enumerated. |
| `@id` | FAIL | Missing. Without `@id`, this entity cannot be referenced by other blocks in a knowledge graph. |
| **UTF-8 encoding** | CRITICAL | Live output shows garbled Turkish characters (`Yay?n Kurulu`, `sreme Sa??l???`, `T?bbi Dan??ma Kurulu`). All Turkish diacritics (ş, ğ, ı, ü, ö, ç) are destroyed. This means Googlebot receives invalid JSON-LD with corrupted string values. Root cause: `is:inline set:html` with Astro's encoding pipeline or server UTF-8 headers. |

---

### 2.2 `ArticleSchema.astro` — `["MedicalWebPage", "Article"]`

**Source file:** `src/components/ArticleSchema.astro`  
**Live example:** `https://tupbebek.com/makaleler/tup-bebek-nedir/`

| Property | Status | Notes |
|---|---|---|
| `@context` | PASS | `https://schema.org` |
| `@type` | PASS | Array `["MedicalWebPage","Article"]` — valid dual-type |
| `headline` | PASS | `"Tüp bebek nedir, kimlere uygulanır?"` — 45 chars, well under 110 limit |
| `description` | PASS | Present |
| `url` | FAIL | `https://tupbebek.com/makaleler/tup-bebek-nedir` — **missing trailing slash**. The live canonical URL is `https://tupbebek.com/makaleler/tup-bebek-nedir/`. This creates a URL mismatch that Google may treat as a separate non-canonical page. |
| `inLanguage` | PASS | `tr-TR` |
| `image` | PASS | Absolute URL `https://tupbebek.com/images/makaleler/tup-bebek-nedir.webp` |
| `image` as `ImageObject` | FAIL | `image` is a raw string URL, not an `ImageObject`. Google requires `ImageObject` with `url`, `width`, `height` (and optionally `caption`) for Article rich results. |
| `datePublished` | PASS | `2024-09-27` ISO 8601 |
| `dateModified` | PASS | `2026-04-03` ISO 8601 |
| `author.@type` | PASS | `Person` |
| `author.name` | PASS | `"Doç. Dr. Senai Aksoy"` |
| `author.jobTitle` | PASS | Present |
| `author.qualifications` | WARN | `qualifications` is not a standard schema.org property on `Person`. Use `hasCredential` (`EducationalOccupationalCredential`) or `description` instead. |
| `author.sameAs` | PASS | YouTube URL present |
| `author.affiliation` | FAIL | Missing. Google's Article documentation recommends `author.affiliation` as an `Organization` for E-E-A-T. `worksFor` is used in EditorKunyesi but not in ArticleSchema's `authorSchema` object. |
| `author.url` | FAIL | Missing from `authorSchema` object in `ArticleSchema.astro`. The Person entity has no URL, so Googlebot cannot associate it with the fuller Person entity in `EditorKunyesi`. |
| `author.@id` | FAIL | Missing — prevents entity graph linking between `ArticleSchema` `author` and `EditorKunyesi` `Person`. |
| `reviewedBy` | PASS (conditional) | Present when `medicalReviewer` frontmatter exists — correct conditional logic |
| `reviewedBy.@type` | WARN | Logic uses `"Organization"` when name contains "Kurul" — correct for this article, but `jobTitle` on an `Organization` is invalid (jobTitle is a `Person`-only property). Remove `jobTitle` when `@type` is `Organization`. |
| `lastReviewed` | PASS | `2026-04-09` ISO 8601 |
| `publisher.logo` | FAIL | Same favicon.svg issue as global schema |
| `publisher.logo` as `ImageObject` | PASS | Correct type, wrong URL |
| `about.@type` | PASS | `MedicalCondition` |
| `medicalAudience` | PASS | Same caveats as global |
| `specialty` | WARN | `"Reproductive Medicine"` — this is a free-text string, not a schema.org MedicalSpecialty enumeration value. The enumerated value is `https://schema.org/ReproductiveMedicine`. Use the enum URI or the short-form `"ReproductiveMedicine"`. |
| `citation` | PASS | Present, `ScholarlyArticle` type, DOI + PMID identifiers, `isPartOf` Periodical |
| `citation.author` | WARN | `author` value is a plain string (`"Steptoe PC, Edwards RG"`). Schema.org expects `author` to be a `Person` or `Organization` entity, not a string. For citations this is a minor issue but causes validation warnings. |
| `@id` | FAIL | Missing on the article entity |
| **UTF-8 encoding** | CRITICAL | Same garbling seen in live output — all Turkish diacritics corrupted |

---

### 2.3 `Breadcrumbs.astro` — `BreadcrumbList`

**Source file:** `src/components/Breadcrumbs.astro`

| Property | Status | Notes |
|---|---|---|
| `@context` | PASS | `https://schema.org` |
| `@type` | PASS | `BreadcrumbList` |
| `itemListElement` | FAIL | **Duplicate position 1 and 2 both resolve to Ana Sayfa / `https://tupbebek.com/`**. Live output for article page: position 1 = Ana Sayfa, position 2 = Ana Sayfa (duplicate), position 3 = Makaleler, position 4 = Tup Bebek Nedir. The root cause is in the `generateBreadcrumbs` utility — the function returns a breadcrumbs array that already includes the home segment, then Breadcrumbs.astro hardcodes position 1 as Ana Sayfa AND spreads the array starting at `index + 2`. This creates a phantom duplicate position. |
| `item` URLs | FAIL | Position 4 item URL is `https://tupbebek.com/makaleler/tup-bebek-nedir` — **no trailing slash**, while the canonical is with trailing slash. |
| `item` for last crumb | WARN | The final `ListItem` (current page) includes an `item` property. Google's documentation states the last breadcrumb does not need `item`. This is not an error but can cause confusion. |
| `position` numbering | FAIL | Due to duplicate Ana Sayfa, positions 1-4 are misrepresented. Should be 1-3: Home → Makaleler → Article. |

---

### 2.4 `EditorKunyesi.astro` — `Person` + `MedicalWebPage` (reviewedBy patch)

**Source file:** `src/components/EditorKunyesi.astro`

| Property | Status | Notes |
|---|---|---|
| `Person.@type` | PASS | `Person` |
| `Person.name` | PASS | `Doç. Dr. Senai Aksoy` |
| `Person.jobTitle` | PASS | Present |
| `Person.description` | WARN | `description` used for specialty subtitle — acceptable but `hasCredential` would be more semantically precise for the "Üreme Tıbbı" credential. |
| `Person.url` | WARN | Points to `https://tupbebek.com/hakkimizda` — this page has no corresponding `Person` entity schema, so the URL is a dangling reference. Should point to a dedicated `Person` page (e.g., `/yayin-kurulu/#senai-aksoy`) with matching `@id`. |
| `Person.sameAs` | PASS | YouTube URL |
| `Person.worksFor` | PASS | `MedicalOrganization` with `PostalAddress` |
| `Person.medicalSpecialty` | PASS | `MedicalSpecialty` entity |
| `Person.knowsAbout` | PASS | Array of `MedicalSpecialty` |
| `Person.hasCredential` | PASS | `EducationalOccupationalCredential` present |
| `Person.alumniOf` | FAIL | Missing. The bio text mentions Cerrahpaşa Tıp Fakültesi, Paris René Descartes Üniversitesi, Franche-Comté Üniversitesi. These are high-value E-E-A-T signals for a medical YMYL site. |
| `Person.memberOf` | FAIL | Missing. Bio mentions ESHRE and TSRM membership. These are powerful authority signals that should be in the Person schema. |
| `Person.@id` | FAIL | Missing — prevents the Person entity in EditorKunyesi from linking to the `author` in ArticleSchema. |
| `reviewedBy patch` schema | WARN | Emitting a standalone `MedicalWebPage` block with only `reviewedBy` and `lastReviewed` creates a **floating, incomplete entity** — it has no `url`, no `name`, no `@id`. This cannot be reconciled with the primary `MedicalWebPage` from ArticleSchema. Use `@id` to merge or drop this secondary block. |
| `lastReviewed` in patch | FAIL | Set to `new Date()` at build time — this means all pages show the build date as review date regardless of actual review. This is factually incorrect and potentially deceptive for Google's E-E-A-T assessment. |

---

### 2.5 `/yayin-kurulu/` Page

**Source file:** `src/pages/yayin-kurulu.astro`

| Finding | Status | Notes |
|---|---|---|
| Schema emitted | INFO | Only the global `MedicalWebPage` + `BreadcrumbList` — no per-person schemas |
| 16 board members listed in data | FAIL | Not one `Person` entity is emitted in JSON-LD for any board member. The page has rich credential/bio data that is invisible to search engines in structured form. |
| Organization schema | FAIL | No `Organization` entity for tupbebek.com editorial board exists anywhere on the site. The `reviewedBy` Organization in BaseLayout is an inline object, not a referenceable entity. |

---

### 2.6 `/sss/` Page

**Source file:** `src/pages/sss.astro`

| Finding | Status | Notes |
|---|---|---|
| `FAQPage` schema | FAIL | Page contains 12 Q&A pairs in `<details>`/`<summary>` markup — zero structured data for them. |
| FAQPage eligibility | INFO | tupbebek.com is a commercial/informational medical publisher, not a government or healthcare authority site. Google removed FAQPage rich results for most commercial sites (August 2023). However, `FAQPage` schema still benefits AI/LLM citation indexing and is not harmful. Recommended: add with the understanding that Google rich results are unlikely but GEO/AI discoverability improves. |

---

## 3. Critical Issues Summary

| # | Issue | Priority | Affected Pages |
|---|---|---|---|
| 1 | UTF-8 encoding corruption — all Turkish diacritics garbled in live JSON-LD | CRITICAL | All pages |
| 2 | BreadcrumbList duplicate Ana Sayfa (positions 1+2 identical) | HIGH | All non-home pages |
| 3 | Article `url` missing trailing slash vs canonical | HIGH | All article pages |
| 4 | `logo` pointing to `favicon.svg` instead of a proper logo image | HIGH | All pages |
| 5 | `Article.image` is a string, not `ImageObject` with width/height | HIGH | All article pages |
| 6 | `reviewedBy` URL `hakkimizda#board` is a dead fragment | HIGH | All pages (global schema) |
| 7 | `MedicalWebPage` reviewedBy patch: floating entity, build-date `lastReviewed` | HIGH | All article pages |
| 8 | Missing `@id` on all entities (no knowledge graph cross-linking) | HIGH | All pages |
| 9 | `author` in ArticleSchema missing `url`, `affiliation`, `@id` | MEDIUM | All article pages |
| 10 | `Person` missing `alumniOf`, `memberOf` (ESHRE, TSRM) | MEDIUM | Article pages |
| 11 | `specialty` values not using enumerated MedicalSpecialty URIs | MEDIUM | All pages |
| 12 | `jobTitle` on Organization `reviewedBy` entity (invalid property) | MEDIUM | Articles with board reviewer |
| 13 | `qualifications` non-standard property on Person | LOW | All article pages |
| 14 | No `Person` schema for board members on `/yayin-kurulu/` | HIGH | `/yayin-kurulu/` |
| 15 | No `FAQPage` schema on `/sss/` | MEDIUM | `/sss/` |
| 16 | No standalone `Organization` entity for tupbebek.com | MEDIUM | Sitewide |

---

## 4. Missing Schema Opportunities

### 4.1 Board Member `Person` Entities — `/yayin-kurulu/`
The editorial board page lists 16 credentialed specialists including professors from Koç Üniversitesi, Hacettepe, and clinicians from Amerikan Hastanesi. None has structured data. This is a major missed E-E-A-T signal for a YMYL medical publisher. Every board member should have a `Person` block with `alumniOf`, `memberOf`, `knowsAbout`, `hasCredential`.

### 4.2 `FAQPage` — `/sss/`
Twelve question-answer pairs are present in the HTML but invisible to crawlers as structured data. While Google rich results are unlikely for a commercial medical site, `FAQPage` markup is actively used by ChatGPT, Perplexity, and Google's AI Overviews for citation sourcing.

### 4.3 `Organization` Root Entity — Sitewide
No canonical `Organization` entity with `@id` exists. The publisher object appears inline in multiple blocks but is never declared as a referenceable entity. A root `Organization` enables all articles, board members, and the WebSite to reference a single authoritative entity.

### 4.4 `MedicalCondition` for Hub Pages
Pages like `/endometriozis-adenomyozis/`, `/kadin-infertilitesi/`, `/pcos/` (implied from article references) are condition hub pages with no `MedicalCondition` schema. These are strong candidates for condition-level structured data including `signOrSymptom`, `possibleTreatment`, `associatedAnatomy`.

---

## 5. Ready-to-Paste JSON-LD — Top 3 Gaps

### GAP 1 — Root Organization Entity (add to BaseLayout.astro, sitewide)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://tupbebek.com/#organization",
  "name": "tupbebek.com",
  "url": "https://tupbebek.com",
  "logo": {
    "@type": "ImageObject",
    "@id": "https://tupbebek.com/#logo",
    "url": "https://tupbebek.com/images/og/tupbebek-logo.png",
    "width": 512,
    "height": 512,
    "caption": "tupbebek.com — Üreme Sağlığı Bilgi Portalı"
  },
  "description": "Tüp bebek (IVF), infertilite nedenleri, tanı süreci ve tedavi yöntemleri hakkında bilimsel, güncel bilgi portalı.",
  "inLanguage": "tr-TR",
  "sameAs": [
    "https://www.youtube.com/@DocentDrSenaiAksoy"
  ],
  "foundingDate": "2024",
  "knowsAbout": [
    "Tüp Bebek (IVF)",
    "Üreme Sağlığı",
    "İnfertilite Tedavisi",
    "Yardımcı Üreme Teknikleri"
  ],
  "memberOf": {
    "@type": "Organization",
    "name": "ESHRE — European Society of Human Reproduction and Embryology",
    "url": "https://www.eshre.eu"
  }
}
```

**Implementation note:** Replace `logo.url` with the actual PNG logo path. This entity should be emitted once in `BaseLayout.astro` alongside the existing `MedicalWebPage` block. All other blocks should reference it via `"publisher": {"@id": "https://tupbebek.com/#organization"}`.

---

### GAP 2 — Board Member Person Entities (add to `/yayin-kurulu/` page)

A representative example for the two senior members. The same pattern should be applied to all 16 board members.

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "tupbebek.com Tıbbi Yayın Kurulu",
  "description": "tupbebek.com bünyesindeki tıbbi içeriklerin bilimsel denetimini üstlenen uzman kurul",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Person",
        "@id": "https://tupbebek.com/yayin-kurulu/#senai-aksoy",
        "name": "Doç. Dr. Senai Aksoy",
        "jobTitle": "Kadın Hastalıkları ve Doğum Uzmanı",
        "description": "Üreme Tıbbı ve Yardımcı Üreme Teknikleri — Kurul Editörü",
        "url": "https://tupbebek.com/yayin-kurulu/#senai-aksoy",
        "sameAs": [
          "https://www.youtube.com/@DocentDrSenaiAksoy"
        ],
        "alumniOf": [
          {
            "@type": "EducationalOrganization",
            "name": "İstanbul Üniversitesi Cerrahpaşa Tıp Fakültesi"
          },
          {
            "@type": "EducationalOrganization",
            "name": "Université de Franche-Comté"
          },
          {
            "@type": "EducationalOrganization",
            "name": "Université Paris René Descartes"
          }
        ],
        "memberOf": [
          {
            "@type": "Organization",
            "name": "ESHRE — European Society of Human Reproduction and Embryology",
            "url": "https://www.eshre.eu"
          },
          {
            "@type": "Organization",
            "name": "TSRM — Türkiye Üreme Sağlığı ve İnfertilite Derneği"
          }
        ],
        "hasCredential": {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Doçent Doktor",
          "recognizedBy": {
            "@type": "Organization",
            "name": "Üniversitelerarası Kurul (ÜAK)"
          }
        },
        "knowsAbout": [
          {"@type": "MedicalSpecialty", "name": "ReproductiveMedicine"},
          {"@type": "MedicalSpecialty", "name": "Obstetrics"},
          "ICSI",
          "IVF",
          "Yardımcı Üreme Teknikleri"
        ],
        "worksFor": {
          "@type": "MedicalOrganization",
          "name": "Lotus Nişantaşı",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Halaskargazi Cad. No: 38-66, Kat: 5, Ofis: 92",
            "addressLocality": "Şişli",
            "addressRegion": "İstanbul",
            "postalCode": "34371",
            "addressCountry": "TR"
          }
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Person",
        "@id": "https://tupbebek.com/yayin-kurulu/#bulent-urman",
        "name": "Prof. Dr. Bülent Urman",
        "jobTitle": "Kadın Hastalıkları ve Doğum Uzmanı — Üreme Endokrinolojisi ve İnfertilite",
        "url": "https://tupbebek.com/yayin-kurulu/#bulent-urman",
        "alumniOf": [
          {
            "@type": "EducationalOrganization",
            "name": "Ankara Üniversitesi Tıp Fakültesi"
          },
          {
            "@type": "EducationalOrganization",
            "name": "Hacettepe Üniversitesi"
          },
          {
            "@type": "EducationalOrganization",
            "name": "University of British Columbia"
          }
        ],
        "memberOf": [
          {
            "@type": "Organization",
            "name": "ESHRE"
          },
          {
            "@type": "Organization",
            "name": "ASRM — American Society for Reproductive Medicine"
          },
          {
            "@type": "Organization",
            "name": "TSRM"
          }
        ],
        "hasCredential": {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Profesör",
          "recognizedBy": {
            "@type": "EducationalOrganization",
            "name": "Koç Üniversitesi Tıp Fakültesi"
          }
        },
        "worksFor": {
          "@type": "MedicalOrganization",
          "name": "VKV Amerikan Hastanesi Üreme Sağlığı Merkezi"
        }
      }
    }
  ]
}
```

**Implementation note:** Generate this block dynamically from the `boardMembers` array already in `yayin-kurulu.astro`. Map `bio` text patterns to extract `alumniOf` and `memberOf` values. Add `id` anchors to each board member card HTML (`id="senai-aksoy"` etc.) so the `@id` URLs become dereferenceable.

---

### GAP 3 — `FAQPage` for `/sss/`

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "name": "Sıkça Sorulan Sorular — Tüp Bebek ve İnfertilite Tedavisi",
  "description": "Tedavi süreci, başarı oranları ve tıbbi protokoller hakkında en çok merak edilen soruların kanıta dayalı yanıtları.",
  "url": "https://tupbebek.com/sss/",
  "inLanguage": "tr-TR",
  "author": {
    "@id": "https://tupbebek.com/#organization"
  },
  "reviewedBy": {
    "@id": "https://tupbebek.com/yayin-kurulu/#senai-aksoy"
  },
  "mainEntity": [
    {
      "@type": "Question",
      "name": "SGK tüp bebek tedavisini hangi şartlarda karşılayabilir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SGK desteği; yaş, evlilik durumu, belirli tıbbi raporlar, ön değerlendirme ve başvuru koşullarına bağlıdır. Uygulama şartları dönemsel mevzuat ve kurum sözleşmelerine göre değişebildiği için hastanın güncel evrak ve raporlarıyla birlikte kendi merkezi üzerinden doğrulama yapması gerekir."
      }
    },
    {
      "@type": "Question",
      "name": "SGK kapsamında kaç deneme hakkı vardır?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Uygun koşulları sağlayan hastalarda en sık referans verilen çerçeve, 3 denemeye kadar SGK desteği olabileceğidir. Ancak her denemenin aynı kapsamda değerlendirilmesi garanti değildir; rapor yenileme, merkez seçimi ve ilaca ilişkin şartlar etkili olabilir."
      }
    },
    {
      "@type": "Question",
      "name": "Tüp bebek tedavisi ne kadar sürer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Standart bir tüp bebek siklusu, adet döneminin ikinci veya üçüncü günü başlar ve yaklaşık 15-20 günlük bir süreci kapsar. Bu süreç; yumurtalıkların uyarılması, yumurta toplama (OPU) ve embriyo transferi aşamalarından oluşur. Dondurulmuş embriyo transferi veya PGT gerektirdiğinde toplam süre iki aya yayılabilir."
      }
    },
    {
      "@type": "Question",
      "name": "Yaşın başarı oranları üzerindeki etkisi nedir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kadın yaşı, tüp bebek başarısındaki en kritik bağımsız değişkendir. 35 yaş altındaki hastalarda başarı oranları en yüksek seviyededir; 40 yaş ve sonrasında over rezervindeki azalma ve oosit kalitesindeki düşüş nedeniyle oranlar kademeli olarak azalmaktadır."
      }
    },
    {
      "@type": "Question",
      "name": "Transfer sonrası dinlenme süreci nasıl olmalıdır?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Modern klinik çalışmalar, transfer sonrası günlerce yatak istirahatinin gebelik oranlarını artırmadığını kanıtlamıştır. İşlem günü kısa bir istirahat yeterlidir. Sonraki günlerde aşırı fiziksel efordan kaçınmak kaydıyla günlük sosyal yaşama dönülmesi tavsiye edilir."
      }
    },
    {
      "@type": "Question",
      "name": "PGT testi her hastaya uygulanmalı mıdır?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Preimplantasyon Genetik Tanı (PGT), rutin bir uygulama olmayıp endikasyon bazlıdır. Genellikle ileri anne yaşı, tekrarlayan düşük öyküsü, başarısız tüp bebek denemeleri veya bilinen genetik hastalık taşıyıcılığı durumlarında önerilir."
      }
    },
    {
      "@type": "Question",
      "name": "Erkek infertilitesi tanısı nasıl konur?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Erkek infertilitesi tanısı semen analizi ile başlar. WHO 2021 standartlarına göre en az 15 milyon/mL sperm konsantrasyonu, %40 toplam motilite ve %4 normal morfoloji normal kabul edilir. Analiz anormal çıktığında hormon paneli (FSH, LH, Testosteron) yapılır."
      }
    },
    {
      "@type": "Question",
      "name": "Azospermi (sperm sayısı sıfır) tedavi edilebilir mi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Azospermi, obstrüktif (tıkanıklık) veya nonobstrüktif (üretim sorunu) olabilir. Obstrüktif azospermi cerrahi çözüm ile tedavi edilebilir. Nonobstrüktif azospermide TESE veya microTESE prosedürü ile testisten sperm çıkarılıp ICSI ile kullanılabilir."
      }
    }
  ]
}
```

**Implementation note:** Add to `sss.astro` frontmatter script block. Note the `author` and `reviewedBy` reference the `@id` URIs that will exist once Gap 1 and Gap 2 are implemented — demonstrating why the root Organization and Person entities should be implemented first.

---

## 6. Additional Recommended Fixes

### Fix 1 — UTF-8 Encoding (CRITICAL, must fix first)
All JSON-LD blocks using `set:html={JSON.stringify(...)}` in Astro are serving garbled Turkish characters in the live build. Verify:
1. The `Content-Type: text/html; charset=UTF-8` response header is sent.
2. The Astro build output encoding is UTF-8 (check `astro.config.mjs` for any encoding overrides).
3. The `JSON.stringify()` call should not be the issue — test by adding `JSON.stringify(obj, null, 0)` and inspecting the static `.html` file in the `dist/` folder before deployment.
4. If the `.html` file is correct but the live response is garbled, the issue is in the hosting/CDN layer (likely a charset declaration mismatch).

### Fix 2 — BreadcrumbList Duplicate Root
In `Breadcrumbs.astro`, the issue is that `Astro.site` resolves to `https://tupbebek.com/` and the `breadcrumbs` array returned by `generateBreadcrumbs` may include a root or leading segment that, when spread starting at `index + 2`, creates a second position for the home URL.

The fix is to ensure `generateBreadcrumbs` returns only non-root segments (no leading home item), and that the breadcrumb component hardcodes position 1 only once:

```typescript
// In generateBreadcrumbs — strip any root/home segment from returned array
// In Breadcrumbs.astro — the spread should start at position 2, not repeat home
```

### Fix 3 — Article URL Trailing Slash
In `ArticleSchema.astro`, change:
```typescript
"url": url,  // currently constructed without trailing slash
```
Ensure `articleUrl` in `makaleler/[...slug].astro` is:
```typescript
const articleUrl = `https://tupbebek.com/makaleler/${entry.slug}/`;
//                                                             ^^ trailing slash
```

### Fix 4 — Image as ImageObject
In `ArticleSchema.astro`, replace the string `image` with an `ImageObject`:
```typescript
...(d.image ? {
  "image": {
    "@type": "ImageObject",
    "url": d.image.startsWith('http') ? d.image : `https://tupbebek.com${d.image}`,
    "width": 1200,
    "height": 630,
    "caption": d.imageAlt || d.title
  }
} : {}),
```
For correct `width`/`height`, either store dimensions in frontmatter or standardize all article OG images to a fixed dimension (1200×630 is the OG standard already declared in BaseLayout meta tags, so this is consistent).

### Fix 5 — Drop the Floating ReviewedBy Patch in EditorKunyesi
The second `MedicalWebPage` block in `EditorKunyesi.astro` (the `reviewedBySchema`) should be removed. The `reviewedBy` relationship is already correctly set in `ArticleSchema.astro` when `medicalReviewer` frontmatter is present. The patch creates a conflicting, incomplete duplicate entity. If the intent is to add the editor as a second reviewer beyond the board, merge the `reviewedBy` data into `ArticleSchema` as a second `reviewedBy` value (schema.org allows an array).

### Fix 6 — Logo URL
Create or reference an actual logo PNG (minimum 112×112px, ideally 512×512px square) and update all `logo` references. The current `favicon.svg` is not accepted by Google's Organization logo validator. Suggested path: `/images/brand/tupbebek-logo.png`.

### Fix 7 — Add `@id` to Core Entities
Add stable `@id` URIs to all reusable entities:
- Organization: `"@id": "https://tupbebek.com/#organization"`
- WebSite: `"@id": "https://tupbebek.com/#website"`
- Primary Person (Senai Aksoy): `"@id": "https://tupbebek.com/yayin-kurulu/#senai-aksoy"`
- Each Article: `"@id": "{articleUrl}#article"`

### Fix 8 — `specialty` Enumeration
Replace free-text specialty values with schema.org MedicalSpecialty enumeration values:
- For global `MedicalWebPage`: `"specialty": "https://schema.org/ReproductiveMedicine"`
- For articles: same — `"ReproductiveMedicine"` is the correct short-form value

### Fix 9 — Remove `jobTitle` from Organization `reviewedBy`
In `ArticleSchema.astro`, the reviewer detection logic:
```typescript
const reviewerSchema = d.medicalReviewer ? {
    "@type": d.medicalReviewer.includes('Kurul') ? "Organization" : "Person",
    "name": d.medicalReviewer,
    ...(d.reviewerTitle ? { "jobTitle": d.reviewerTitle } : {}),
} : undefined;
```
When `@type` is `"Organization"`, `jobTitle` must be omitted. Fix:
```typescript
const isOrg = d.medicalReviewer.includes('Kurul');
const reviewerSchema = d.medicalReviewer ? {
    "@type": isOrg ? "Organization" : "Person",
    "name": d.medicalReviewer,
    ...(!isOrg && d.reviewerTitle ? { "jobTitle": d.reviewerTitle } : {}),
} : undefined;
```

---

## 7. E-E-A-T Schema Signal Checklist

| Signal | Current status | Recommendation |
|---|---|---|
| Named author with `Person` entity | Partial — only primary editor | Extend to all 16 board members |
| `alumniOf` for medical credentials | Missing | Add to EditorKunyesi + board member schemas |
| `memberOf` (ESHRE, ASRM, TSRM) | Missing | High-priority for YMYL trust |
| `hasCredential` | Partial — only primary editor | Extend to board members |
| `knowsAbout` | Partial — only primary editor | Extend to board members |
| Editorial process documented in schema | Missing | `CreativeWorkSeries` or `WebSite.description` can reference the editorial policy URL |
| `citation` on articles | Good — PMID/DOI present | Fix `citation.author` string → Person entity |
| `reviewedBy` linked to named Person | Partial — patches exist but floating | Consolidate into ArticleSchema with `@id` |
| `lastReviewed` accuracy | Broken — build date used | Use `reviewDate` frontmatter consistently |
| Publisher `Organization` with `@id` | Missing | Implement root Organization entity (Gap 1) |

---

## 8. Schema Quality Score

| Category | Score | Max | Notes |
|---|---|---|---|
| Required properties present | 14 | 20 | Missing `@id`, logo, image dimensions, trailing slash URL |
| Property value correctness | 7 | 20 | UTF-8 corruption alone drops score severely; specialty enum mismatch; invalid jobTitle on Org |
| Entity cross-referencing | 2 | 15 | No `@id` anywhere; floating patch schemas; dangling URL references |
| E-E-A-T schema depth | 8 | 20 | Article schema is good; Person has knowsAbout/hasCredential for primary editor; but board members invisible |
| Missing schema opportunities | 5 | 15 | FAQPage, board Person entities, root Organization, MedicalCondition hubs all absent |
| Breadcrumb correctness | 3 | 10 | Duplicate root item, wrong URL trailing slash |

**Total: 39 / 100**

The implementation shows genuine architectural intent — dual MedicalWebPage+Article typing, citation arrays with PMID/DOI, reviewedBy, medicalAudience — but is undermined by the UTF-8 encoding bug (which makes all Turkish content illegible to crawlers), duplicate breadcrumbs, and a near-total absence of `@id`-based entity linking that prevents any knowledge graph from forming.

---

*Report generated 2026-05-10 | tupbebek.com schema audit v1.0*
