# tupbebek.com — Tam SEO Audit Raporu

**Audit tarihi:** 2026-05-10
**Site tipi:** Bağımsız Türkçe medikal yayın portali (YMYL — üreme sağlığı / infertilite)
**Teknik yığın:** Astro 4.x SSG + Cloudflare Pages + Pagefind
**Audit kapsamı:** 64 makale + ~40 statik sayfa, sitemap'te ~90 URL
**Uzman ajan sayısı:** 11 paralel (technical, content, schema, sitemap, performance, visual, geo, sxo, cluster, backlinks, images)
**Atlanılan ajanlar (uygun değil):** local, maps, ecommerce, google (API yok), dataforseo (MCP yok), drift (baseline yok)

---

## 1. Aggregate SEO Health Score: **59 / 100**

| Kategori | Skor | Ağırlık | Katkı |
|---|---|---|---|
| Technical SEO | 61 | 22% | 13.4 |
| Content Quality + E-E-A-T | 70 | 23% | 16.1 |
| On-Page / SXO | 57 | 20% | 11.4 |
| Schema / Structured Data | 39 | 10% | 3.9 |
| Performance (CWV) | 60 | 10% | 6.0 |
| AI Search Readiness (GEO) | 48 | 10% | 4.8 |
| Images | 62 | 5% | 3.1 |
| **TOPLAM** | — | 100% | **58.7** |

**Yardımcı kategori skorları (ağırlığa dahil değil):**
- Sitemap: 54 / 100
- Cluster (içerik mimarisi): 54 / 100
- Visual UX: 74 / 100
- Backlinks: Yetersiz veri (yeni yayın profili, beklenen baseline)

**Genel değerlendirme:** İçerik düzeyinde site Türkiye IVF nişinde **en güçlü kaynaklardan biri** (PubMed/DOI atıfları, kanıt derecelendirmesi, isimlendirilmiş tıbbi inceleme, editöryal süreç şeffaflığı). Ancak **delivery katmanı** (sitemap erişilebilirliği, JSON-LD UTF-8 kodlaması, görsel optimizasyonu, schema kapsamı) AI ve klasik arama motorlarının bu içeriği çıkartıp atfetmesini engelliyor. Site bir publisher olarak teknik olarak hazır değil, içerik olarak hazır.

---

## 2. Kritik Bulgular (CRITICAL — derhal müdahale)

### C1. Sitemap canlıda 404 dönüyor

`https://tupbebek.com/sitemap-index.xml` ve `https://tupbebek.com/sitemap-0.xml` her ikisi de **404 dönüyor**. Dosyalar `dist/` içinde mevcut ama Cloudflare `_worker.js` `/*` isteklerini static asset servisinden önce yakalıyor.

**Etki:** Google Search Console sitemap submission başarısız, GSC keşif yavaşladı, tüm AI crawler'lar sitemap üzerinden discovery yapamıyor. Yeni veya güncellenmiş makaleler aylarca indekslenmeyebilir.

**Kaynak:** `reports/seo-audit-technical.md`, `reports/seo-audit-sitemap.md`

### C2. JSON-LD'de UTF-8 bozulması — tüm sayfalar

Türkçe diyakritikler `ş, ğ, ı, ü, ö, ç` JSON-LD bloklarında `?` olarak görünüyor: `"Yay?n Kurulu"`, `"sreme Sa??l???"`, `"T?bbi Dan??ma Kurulu"`. Schema okumaya çalışan her crawler ve AI motoru bu stringleri eşleştiremez.

**Etki:** Marka entity-graph görünmez hale geliyor, E-E-A-T sinyallerinin tamamı kaybediyor, AI Overviews ve Perplexity gibi yüzeylerde atıf alma şansı sıfırlanıyor.

**Kaynak:** `reports/seo-audit-schema.md` (Critical #1)

### C3. 21 MB PNG bir makalede LCP'yi yıkıyor

`/makaleler/embryoscope-yapay-zeka/` sayfasında `embryoscope-kapak-2026.png` **21,148,929 bayt** (5504×3072 ham export). Kök neden: `astro.config.mjs` içinde `image.service: noop` Sharp pipeline'ını **devre dışı bırakmış**.

**Etki:** Bu sayfada median mobile bağlantıda LCP 8+ saniye — "poor" bandının çok altında. Performance skorunu site bazında 35-45 bandına çekiyor.

**Kaynak:** `reports/seo-audit-performance.md`, `reports/seo-audit-images.md`

### C4. 4 hub vs. /makaleler/ duplicate-intent çakışması

Aynı topic için iki indekslenmiş URL — Google hangisini sıralayacağına karar veriyor (genellikle daha zayıf olanı seçiyor):

| Hub URL | Article URL |
|---|---|
| `/aciklanamayan-infertilite/` | `/makaleler/aciklanamayan-infertilite/` |
| `/basari-oranlari/` | `/makaleler/basari-oranlari/` |
| `/basarisiz-denemeler/` | `/makaleler/basarisiz-denemeler/` |
| `/genetik-testler/` | `/makaleler/genetik-testler/` |

SXO ajanı `IUI nedir` ve `endometriozis tüp bebek` için 2 ek conflict işaretledi.

**Etki:** İç PageRank bölünüyor, Google kanonizasyon kaybediyor, anahtar konu rotaları için sıralama düşük.

**Kaynak:** `reports/seo-audit-sitemap.md`, `reports/seo-audit-sxo.md`, `reports/seo-audit-cluster.md`

### C5. 11 yayında YMYL makale "thin content" eşiğinin altında

`/makaleler/dondurulmus-embriyo-transferi/` (186 kelime), `basarisiz-denemeler/` (339), `beta-hcg-testi/` (379), `aciklanamayan-infertilite/` (403), `asherman-sendromu/` (414), `yumurtalik-kistleri-dogurganlik/` (420), `azospermi-mikro-tese/` (431), `adet-gorememe/` (459), `alkol-ve-fertilite/` (481), `adet-duzensizligi-pcos/` (503), `akraba-evliligi/` (394).

**Etki:** Google Eylül 2025 QRG bu YMYL sayfaları topical comprehensiveness için değerlendirir — bu sayfalar arama niyetini karşılamıyor. Kalite-bazlı sıralama baskılaması riski.

**Kaynak:** `reports/seo-audit-content.md` (Bölüm 4)

### C6. Sitemap'te 12 zombie URL — kaynak dosyası yok

Sitemap'te listelenen 12 slug `src/content/articles/` dizininde markdown kaynak dosyasına sahip değil: `bagisiklik-tedavileri`, `duygusal-dayaniklik-rehberi`, `dusuk-amh-hamilelik`, `embriyo-transferi-gun-secimi`, `endometriyal-scratching`, `era-testi-iluzyon`, `ivf-oncesi-histeroskopi`, `iyi-tup-bebek-merkezi`, `izotretinoin-sperm`, `laboratuvar-raporu-yorumlama`, `varikosel-nedir-ne-zaman-ameliyat-gerekir`, `yumurta-dondurma-rehberi`.

**Etki:** 90-URL sitemap'te %13 defekt oranı. Eğer prod'da 404 dönüyorlarsa Google sitemap güvenini düşürüyor.

**Kaynak:** `reports/seo-audit-sitemap.md`

---

## 3. Yüksek Öncelikli Bulgular (HIGH)

### H1. `public/_headers` güvenlik bloğu eksik
HSTS, CSP, X-Frame-Options, Permissions-Policy hiçbiri yok. Yalnızca Cloudflare default `nosniff` + `Referrer-Policy` var. YMYL medical publisher için zayıf güvenlik sinyali, E-E-A-T'ye negatif katkı.

### H2. `_redirects` iki-hop zincir
Her makale URL'sinde: `_redirects 301 → target without trailing slash → Cloudflare 308 → trailing-slash version`. Astro `trailingSlash: 'ignore'` Cloudflare Pages'in trailing-slash enforcement'ı ile çakışıyor.

**Fix:** `astro.config.mjs` içinde `trailingSlash: 'always'` ekle — zincir tek-hop'a iner.

### H3. LCP preload yok hiçbir sayfada
`<link rel="preload" as="image">` ve `fetchpriority="high"` site genelinde mevcut değil. Tüm sayfalarda LCP +300-600 ms kaybediyor.

### H4. FAQPage schema yok `/sss/` sayfasında
12 Q&A var ama yapılandırılmamış. AI Overviews ve Perplexity'nin medical Q&A için en çok cite ettiği schema tipi. Tek başına en yüksek-leverage AI görünürlük müdahalesi.

### H5. `/yayin-kurulu/` sayfasında Person schema yok
16 kredensiyallı uzman (Koç, Hacettepe, Ankara Tıp profesörleri, ESHRE üyesi, bir hukukçu) plain HTML olarak listelenmiş. YMYL E-E-A-T'nin tek başına en yüksek levyesi — eksik.

### H6. `Organization` schema sitewide eksik
Sabit `@id`'li tek bir kanonik Organization yok. Tüm makale, board üyesi, WebSite referansları tek bir yayın node'una resolve edemiyor. Knowledge graph ilişkileri kurulamıyor.

### H7. `Organization.logo` favicon'a işaret ediyor
Google rich results validator favicon'ı kabul etmiyor (min 112×112px PNG/WebP gerekli). Bu Article rich results eligibility'sini bozuyor.

### H8. `Article.image` ImageObject değil, string URL
`width`, `height`, `caption` zorunlu Article rich results için — string URL geçersiz.

### H9. Cluster: 13 hub için 0-1 spoke article
`yas-ve-fertilite` (0 spoke), `hormon-paneli` (0 spoke), `tani-sureci` (1 spoke) — navigation'da promote ediliyor ama içerik yok. PageRank kaybı, kullanıcı bounce.

### H10. SXO: `embriyo transferi sonrası` ve `PCOS belirtileri` page-type mismatch
SERP'te checklist / symptom-list formatı kazanıyor; tupbebek 2500 kelimelik narrative guide veriyor. Kullanıcı bounce, Google quality signal negatif.

### H11. 47/64 makalede yazar "tupbebek.com Yayın Kurulu"
Cornerstone YMYL sayfalarda named clinician yok. Experience signal'i sulanıyor.

### H12. 2 makalenin yapılandırılmış referansı yok
`embryoscope-yapay-zeka` ve `yumurta-dondurma-rehberi` — inline citations var, frontmatter `references` array yok. JSON-LD `citation` rendering kırılmış.

---

## 4. Orta Öncelikli Bulgular (MEDIUM)

| # | Bulgu | Kaynak |
|---|---|---|
| M1 | `og:image` tüm hub sayfalarında 1024×1024 square fallback (1200×630 olmalı) | images |
| M2 | Image sitemap fırsatı kullanılmamış (article featured images) | sitemap |
| M3 | `lastReviewed` her sayfada build tarihine eşit (dinamik `new Date()`) | schema |
| M4 | `BreadcrumbList` "Ana Sayfa" iki kez (position 1 ve 2) | schema |
| M5 | `Article.url` trailing slash yok, canonical ise var | schema |
| M6 | `reviewedBy` URL ölü fragment anchor `hakkimizda#board` | schema |
| M7 | Mobile e-kitap formu fold altına düşüyor | visual |
| M8 | Mobile cookie banner content flow'a inline render — her sayfada CTA'yı aşağı itiyor | visual |
| M9 | 19 touch target < 44×44px (makaleler sayfasında %77 compliance) | visual |
| M10 | `/sorunlar/` ve `/yayin-sureci/` sitemap'te ama `_redirects`'te redirect kuralı var | sitemap |
| M11 | `basarisiz-denemeler` `lastModified: 2024-03-31` ama `reviewDate: 2026-04-06` — internal inconsistency | content |
| M12 | 4 namespace declaration sitemap'te kullanılmıyor (news, xhtml, image, video) | sitemap |
| M13 | 22 hub/static sayfada `lastmod` yok | sitemap |
| M14 | Logo `<img>` `width`/`height` attribute eksik — CLS risk | performance |
| M15 | `image.service: noop` Sharp pipeline'ı tüm site için kapalı (sadece embryoscope değil) | performance |
| M16 | `embryoscope-yapay-zeka` bazı kaynakları Tier 3 (CarefulTrip, Preprints.org, Substack) | content |
| M17 | `tup-bebek-nedir` çift `## Giriş` heading hierarchy bozuk | content |
| M18 | Endometriozis için 3 article — clear canonical cluster leader eksik | content |
| M19 | PCOS overlap — `adet-duzensizligi-pcos` çok thin, `opk-ve-ivf` ile çakışma riski | content |
| M20 | `e-kitap/images/` 12 JPEG = 8.5 MB, WebP'ye dönüştürülmemiş | images |
| M21 | `/sss/` 12 Q&A'da FAQPage schema yok (H4 ile bağlantılı) | schema |
| M22 | "Hızlı Cevap" / TL;DR callout tüm makalelerde yok — AI passage citability düşük | geo |

---

## 5. Düşük Öncelikli Bulgular (LOW)

- L1: `Crawl-delay: 1` robots.txt'de — modern büyük arama motorları ignore ediyor, kaldırılabilir
- L2: 5 zombie `.md` source dosyası `src/content/articles/` içinde (zaten redirect target'ları var)
- L3: AI bot için explicit `Allow:` rules eklenebilir (sinyal değeri var, technical engel değil)
- L4: Search input mobile fold üstünde değil — collapse'lı search bar hero'ya eklenebilir
- L5: Article page 4 namespace sitemap-news/video/image declared but unused
- L6: Bazı makalelerde `imageAlt` çok jenerik
- L7: `BaseLayout` `og:image:width=1200` hardcoded — gerçek görsel boyutuyla eşleşmeyebilir
- L8: Hub sayfalarda H1 fold altında (dead zone before content)
- L9: Footer / global nav search ARA icon mobile bottom nav'da — direkt input istek

---

## 6. Pozitif Bulgular — Site Güçlü Yanları

Bu bölüm denetim değil — korunması gereken stratejik kazanımlar:

1. **Frontmatter schema enforcement %100** — 64/64 makalede `author`, `medicalReviewer`, `reviewDate`, `recommendationGrade`, `lastModified` populated. Niş içinde en disiplinli editöryal sistem.
2. **`recommendationGrade` Oxford CEBM benzeri sistem** — A: 4, B: 47, C: 11, D/E: 2 — clinical appropriate dağılım.
3. **PMID + DOI atıfları structured ScholarlyArticle olarak** — 60/64 makalede PMID var. AI citation altyapısı operasyonel olarak doğru.
4. **Tier 1 kaynak kullanımı** — JAMA, Lancet, NEJM, Cochrane, Human Reproduction, Fertility & Sterility, ESHRE, HFEA, ASRM düzenli atıflanıyor.
5. **`era-testi-iluzyon` makalesi nişin altın standardı** — Grade A, 20+ structured ref, JAMA RCT, FAQPage JSON-LD, opinionated clinical voice. Bu format diğer cornerstone makalelere replike edilmeli.
6. **TTFB Cloudflare'da iyi** (~80-150ms) — altyapı seçimi doğru.
7. **WebP coverage ana `public/images/` dizininde %92** (Sharp pipeline kapalı olmasına rağmen önceden manuel çevrim yapılmış).
8. **Editöryal şeffaflık** — `/editoryal-politika/`, `/yayin-sureci/`, `/yayin-kurulu/` mevcut.
9. **Regulatory hygiene** — patient testimonial yok, before/after yok, price table yok, baby photo yok — SB 12 Kasım 2025 Yönetmeliği'ne tam uyumlu.
10. **`era-testi-iluzyon` AI citation readiness skoru: 95/100** — Türkiye IVF nişinde tek başına bir lider.
11. **`yumurta-dondurma-rehberi` first-person clinical voice + spesifik data** — 4200 kelime, Goldman/Cascante/Doyle çalışmaları cited, original "loss funnel" tablosu.

---

## 7. Audit Çıktı Dosyaları

| Kategori | Dosya |
|---|---|
| Bu rapor | [reports/FULL-AUDIT-REPORT.md](reports/FULL-AUDIT-REPORT.md) |
| Aksiyon planı | [reports/ACTION-PLAN.md](reports/ACTION-PLAN.md) |
| Technical SEO | [reports/seo-audit-technical.md](reports/seo-audit-technical.md) |
| Content + E-E-A-T | [reports/seo-audit-content.md](reports/seo-audit-content.md) |
| Schema | [reports/seo-audit-schema.md](reports/seo-audit-schema.md) |
| Sitemap | [reports/seo-audit-sitemap.md](reports/seo-audit-sitemap.md) |
| Performance | [reports/seo-audit-performance.md](reports/seo-audit-performance.md) |
| Visual UX | [reports/seo-audit-visual.md](reports/seo-audit-visual.md) |
| GEO / AI | [reports/seo-audit-geo.md](reports/seo-audit-geo.md) |
| SXO | [reports/seo-audit-sxo.md](reports/seo-audit-sxo.md) |
| Cluster | [reports/seo-audit-cluster.md](reports/seo-audit-cluster.md) |
| Backlinks | [reports/seo-audit-backlinks.md](reports/seo-audit-backlinks.md) |
| Images | [reports/seo-audit-images.md](reports/seo-audit-images.md) |
| Screenshots | [reports/screenshots/](reports/screenshots/) |

---

*Audit: 11 paralel uzman ajan + manuel GEO konsolidasyonu. Skill: `/seo-audit`. Tarih: 2026-05-10.*
