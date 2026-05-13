# tupbebek.com — Tam SEO Audit Raporu

**Tarih:** 2026-05-12
**Son güncelleme:** 2026-05-12 (post-fix; ayrıntı: ACTION-PLAN.md)
**Kapsam:** 9 uzman ajan (paralel) + bağımsızlık kısıtı doğrulaması

> **NOT (post-audit reality-check):** Audit ajanlarının "kritik içerik boşluğu" bulgularının önemli kısmı **çıktığında zaten çözülmüştü** (legacy `.md`'ler draft, `tup-bebek-nedir.mdx` + `mikroenjeksiyon-icsi-nedir.mdx` yayında, 301'ler `_redirects`'te). Düzeltilmiş başlangıç skoru ~**78/100**. Bu oturumda H1+H2+H4+L4+M5a uygulandı. Detay: [ACTION-PLAN.md](ACTION-PLAN.md).
**Site Tipi:** Bağımsız Türkçe IVF/üreme sağlığı eğitim portali (klinik **değil**)
**Stack:** Astro 4.x Hybrid + Cloudflare Pages + Pagefind

---

## Executive Summary — SEO Health Score

| Kategori | Ağırlık | Skor | Ağırlıklı |
|---|---:|---:|---:|
| Technical SEO | 22% | 81 | 17.8 |
| Content Quality (E-E-A-T) | 23% | 75 | 17.3 |
| On-Page / SXO | 20% | 60 | 12.0 |
| Schema / Structured Data | 10% | 82 | 8.2 |
| Performance (CWV) | 10% | 65 | 6.5 |
| AI Search Readiness (GEO) | 10% | 74 | 7.4 |
| Images | 5% | 70 | 3.5 |
| **TOPLAM** | **100%** | | **72.7 / 100** |

**Genel değerlendirme:** Sağlam altyapı (Astro hybrid, MedicalWebPage şeması, EEATBadge, 16-üyeli yayın kurulu, llms.txt mevcut). Asıl darboğaz **içerik mimarisi**: temel "tüp bebek nedir" ve "ICSI nedir" makaleleri eksik, 5 cannibalize eden legacy `.md` dosya, ve `lastModified` tarihlerinin %78'i aynı güne kümelenmiş — Google lastmod sinyalini iskontoya düşürecek.

### Top 5 Kritik Bulgu

1. **İçerik boşluğu:** `/makaleler/tup-bebek-nedir` ve `/makaleler/icsi-nedir` yayınlanmamış — Türkçe IVF arama hacminin en büyük iki sorgusunda site yarışmıyor (SXO Gap 35 ve 28/100).
2. **5 cannibalize eden legacy `.md` dosya** (PKOS, hiperprolaktinemi, miyom, erkek beslenmesi, başarı oranları) — aynı slug'larda iki sürüm, draft değil, 301 hedeflenmemiş.
3. **lastmod tarihi kümelenmesi:** 55 makalenin 43'ü `2026-05-12` tarihinde — Google bu sinyali güvenilmez sayar.
4. **Sitemap statik sayfalarda lastmod yok** — sadece /makaleler/ pathlerine `serialize()` hook uygulanıyor; 33 hub/category sayfa lastmod'suz çıkıyor.
5. **CSP Report-Only** modda — YMYL medikal sitede gerçek koruma yok, sadece raporlama.

### Top 5 Hızlı Kazanım

1. `BaseLayout.astro` viewport: `width=device-width` → `width=device-width, initial-scale=1` (1 satır).
2. Article hero `&lt;img&gt;` `loading="lazy"` → `loading="eager" fetchpriority="high"` ([...slug].astro:147-153) — LCP 400-800ms düşüş.
3. `BaseLayout.astro` `&lt;link rel="alternate" hreflang="tr"&gt;` eklenmesi — TR AI Overview eligibility.
4. `robots.txt`'e GPTBot/ClaudeBot/PerplexityBot/Google-Extended/OAI-SearchBot için explicit `Allow: /` blokları.
5. `_redirects` ile 5 legacy `.md` slug'ı kanonik MDX karşılıklarına 301 — cannibalization derhal biter.

### Bağımsızlık Kısıtı Doğrulaması — ✅ PASS

- `senaiaksoy.net` veya `draksoyivf.com`'a **hiçbir 301 redirect yok** (`_redirects`, `astro.config.mjs` taranmış).
- Tüm referanslar `mailto:dr@senaiaksoy.net` formatında (4 yerde) — link juice transferi yok.
- **Öneri (Düşük):** Marka bağımsızlığı için contact adresini `@tupbebek.com` adresine taşımak görsel netliği artırır.

---

## 1. Technical SEO (81/100)

**HIGH**
- **H1** — CSP `Report-Only` modda; YMYL site için enforce edilmiş `Content-Security-Policy` gerekli.
- **H2** — Viewport meta'da `initial-scale=1` eksik (`BaseLayout.astro:128`).
- **H3** — Article hero img `loading="lazy"` ama preload var; çelişkili — `fetchpriority="high"` + `loading="eager"` olmalı.

**MEDIUM**
- M1 — Sitemap filter eksik; `_redirects` SSR redirect'leri sitemap'e sızabilir.
- M2 — `robots.txt` AI crawler direktifleri yok (GPTBot, ClaudeBot vb. implicit allow).
- M3 — RSS feed sitemap'te referans yok.
- M4 — Dual redirect path (Cloudflare + Astro SSR) — duplicate, maintenance riski.
- M5 — `Crawl-delay: 1` gereksiz (Googlebot ignore eder).

**LOW** — IndexNow yok, hreflang minimal (TR-only doğru), Material Symbols `font-display: block` (FOIT riski).

---

## 2. Content Quality & E-E-A-T (75/100)

**Güçlü yanlar:** 62 yayında makale, Doç. Dr. Aksoy'un yayın kurulu başkanlığı, ortalamada zengin PubMed/DOI referansları, `recommendationGrade` A/B/C/D-E sistemi, `EEATBadge` her makalede, `MedicalDisclaimer` otomatik enjekte ediliyor.

**Boşluklar:**
- 5 makale `status: draft` ama dosya yayında — `genetik-testler.md` ve `basari-oranlari.md` tam içerikli ama Google'a görünmüyor.
- Referans yokluğu: 1 makale (ajan kontrol etti).
- Bazı eski `.md` dosyalar MDX karşılıklarıyla cannibalize ediyor (bkz. Cluster bulguları).
- "Kesin/garanti/en iyi" ihlali tespit edilmedi (uyum yüksek).
- Hub `.astro` sayfalarında `HizliCevap` bloğu yok — sadece MDX article'larda var.

---

## 3. On-Page / SXO (60/100)

**Persona ortalaması:** 71/100. Portföy SXO Gap skoru **44/100** (3 hedef sorguda).

| Sorgu | Best Match | Severity | Gap |
|---|---|---|---|
| tüp bebek nedir | YOK | CRITICAL | 35 |
| tüp bebek tedavisi aşamaları | /ivf-rehberi | MEDIUM | 68 |
| ICSI nedir | YOK | CRITICAL | 28 |

**Düzeltmeler:** 2 yeni makale (tup-bebek-nedir, icsi-nedir), 2 draft yayınlama, FAQPage JSON-LD `/ivf-rehberi`'ye, `videoId` frontmatter ekleme.

---

## 4. Schema / Structured Data (82/100)

`MedicalWebPage` + `Article` @graph her makalede, `reviewedBy` + `citation` (DOI+PMID) eksiksiz, `BreadcrumbList` doğru. `Organization` + `WebSite` sitewide.

**Eksik fırsatlar:**
- `FAQPage` sadece `/sss`'te — `/ivf-rehberi`'nin 4-item FAQ bloğu schema'sız.
- `VideoObject` `videoId` olan makalelerde yok.
- `Person` (Dr. Aksoy) standalone sayfa yok → knowledge-graph entity zayıf.
- `MedicalProcedure` IVF/ICSI/PGT konularında yok.
- `Organization.foundingDate: "2025"` ama Hakkımızda 1996 — çelişki.

---

## 5. Performance / CWV (65/100)

Tüm tahminler statik analiz; CrUX field data yok.

| Sayfa | LCP tahmini |
|---|---|
| Anasayfa | 2.2-3.0s |
| Article | 2.8-3.8s |
| E-kitap LP | 3.0-4.5s |

**Top 7 fix:** article hero eager+fetchpriority, e-kitap cover WebP+srcset, homepage image prop, Material Symbols `font-display: swap`, Pagefind fallbackData on-demand, TOC sidebar `min-height`, animations.css critical path'den çıkar.

---

## 6. AI Search Readiness / GEO (74/100)

**llms.txt mevcut** — iyi iskelet, ama makale listesi enumerated değil, license clause yok.

**Platform skoru:** AIO TR 70, Perplexity 76, ChatGPT 68, Bing Copilot 72, Claude 74, Gemini 71.

**Anahtar boşluklar:**
- `hreflang="tr"` eksik → TR AIO routing zayıf.
- AI crawler için explicit `User-agent` blokları yok.
- Standalone yazar sayfası yok (`/yazar/senai-aksoy/`).
- ORCID/Google Scholar `sameAs`'ta yok.
- Hub `.astro` sayfalar `HizliCevap` direkt-cevap bloğu içermiyor.

---

## 7. Sitemap (75/100)

88 URL, valid XML, draft'lar doğru filtrelenmiş, redirect-target'lar hariç tutulmuş.

**Sorunlar:**
- 33 statik sayfada `lastmod` yok (sadece /makaleler/ serialize ediliyor).
- 55 makaleden 43'ü aynı `lastmod` tarihinde (2026-05-12) — sinyal güvenilmez.
- 4 `.md` slug'ı `.astro` ile çakışıyor, draft değil — duplicate route riski.

---

## 8. Backlinks (data yok)

Moz/DataForSEO/Bing API yok → kantitatif skor verilemedi. Hard constraint (klinik domainlere 301) **PASS**.

**Stratejik öneriler:** Wikipedia TR IVF maddesine kaynak ekleme, TJOD listing, ORCID popülasyonu, e-kitap'ı dietisyen blog'larına seed.

---

## 9. Content Architecture / Cluster

6 küme tespit edildi. 65 makale haritalandırıldı.

| Küme | Hub | Spoke | Durum |
|---|---|---|---|
| IVF Süreci | /ivf-rehberi | 8 | OHSS, ilk muayene, "kaç deneme" eksik |
| Embriyo & Transfer | /transfer-sureci | 14 | 4 add-on cannibalize (ERA, Embryoglue vb.) |
| Kadın İnfertilitesi | /kadin-infertilitesi | 14 | PCOS x3, hiperprolaktinemi x2 (cannibalize) |
| Erkek İnfertilitesi | /erkek-infertilitesi | 7 | Sperm analizi, DNA fragmantasyonu eksik |
| Genetik & PGT | /pgt-merkezi | - | PGT-A yok; iki hub var (redundant) |
| Cerrahi & Yapısal | YOK | 10 | Hub eksik; recurrent implantation failure missing |

**Cannibalize 5 makale:** pkos-ve-tup-bebek, hiperprolaktinemi-prolaktinom, erkek-kisirligi-besin-takviyeleri, myomlar-ve-kisirlik, basari-oranlari → MDX karşılıklarına 301 ya da `status: draft`.

---

## Detay Raporlar

- [seo-technical.md](seo-technical.md)
- [seo-content.md](seo-content.md)
- [seo-schema.md](seo-schema.md)
- [seo-sitemap.md](seo-sitemap.md)
- [seo-performance.md](seo-performance.md)
- [seo-geo.md](seo-geo.md)
- [seo-sxo.md](seo-sxo.md)
- [seo-backlinks.md](seo-backlinks.md)
- [seo-cluster.md](seo-cluster.md)
