# tupbebek.com — Öncelikli Aksiyon Planı

**SEO Health Score:** 72.7 / 100 → Hedef 90+
**Tarih:** 2026-05-12
**Son güncelleme:** 2026-05-12 (reality-check + uygulanan fix'ler)

Aksiyonlar etki/efor oranına göre sıralandı. Her satır: dosya/lokasyon → değişiklik → beklenen etki.

---

## ✅ UYGULANAN (2026-05-12, bu oturumda)

| # | Aksiyon | Dosya | Durum |
|---|---|---|---|
| H1 | Viewport `initial-scale=1` eklendi | `src/layouts/BaseLayout.astro:128` | ✅ live |
| H2 | Article hero `loading="eager" fetchpriority="high"` | `src/pages/makaleler/[...slug].astro:147-152` | ✅ live |
| H4 | AI crawler explicit `User-agent` blokları (10 bot) | `public/robots.txt` | ✅ live |
| L4 | Obsolete `Crawl-delay: 1` kaldırıldı | `public/robots.txt` | ✅ live |
| M5a | `Organization.foundingDate` 2025 → 1996 düzeltildi | `src/layouts/BaseLayout.astro:73` | ✅ live |
| H5 | Sitemap `serialize()` statik sayfalar için git mtime'dan lastmod üretiyor (88/88 URL kapsamlı, önceden 55/88) | `astro.config.mjs` | ✅ build doğrulandı |
| H6 | `/ivf-rehberi` FAQ → tek kaynak `faqs[]` + inline `FAQPage` JSON-LD (4 soru); ek olarak CTA `/makaleler/basari-oranlari` → `/basari-oranlari/` (301 hop kaldırıldı) | `src/pages/ivf-rehberi.astro` | ✅ live |
| H8 | E-kitap cover 3.3 MB JPG → 4 boyutta WebP `<picture>` (480/768/1200/1600w) + JPG fallback; mobile yükü **3300→29 KB (%99)**, masaüstü **3300→184 KB (%94)**; BaseLayout preload + `fetchpriority="high"` | `scripts/convert-ebook-cover.mjs` (yeni), `src/pages/e-kitap-indir.astro`, `public/e-kitap/images/cover-{480,768,1200,1600}.webp` + `cover-1200.jpg` | ✅ live |
| M2 | llms.txt genişletildi: **Yazar Kimliği** (Doç. Dr. Aksoy biyo + YouTube), **Makaleler** (55 yayında makale tam URL listesi), **Lisans ve Kullanım** (AI alıntı izni — kaynak belirtilerek serbest, ticari yeniden paketleme yasak), **Ana Rehberler** 22 hub'a kadar genişletildi. 4.8KB → 9.3KB | `public/llms.txt` | ✅ live (55/55 makale) |
| M1 | **`/yazar/senai-aksoy/`** standalone bio sayfası: full editöryal CV (5 diploma, 3 milestone, ESHRE/TSRM, YouTube), **Person + ProfilePage JSON-LD** (`@id`=`/yazar/senai-aksoy/#person`, `alumniOf`×5, `memberOf`×2, `knowsAbout`×7, `hasOccupation`); `sameAs`: YouTube + **ORCID** (0000-0003-4110-5290) + **Google Scholar**. `ArticleSchema.astro` Dr. Aksoy makaleleri için `author.@id` referansını bu Person entity'sine bağlıyor → tüm 50+ makale tek canonical knowledge-graph node'una resolve oluyor. | `src/pages/yazar/senai-aksoy.astro` (yeni), `src/components/ArticleSchema.astro` | ✅ live |
| M9 | PGT hub konsolidasyonu: scope ayrıştırma + cross-link disambiguation banner'ları. `/genetik-testler/` = ebeveyn/taşıyıcı testleri, `/pgt-merkezi/` = embriyo PGT-A/M/SR. **Yanlış yönlendirilen 9 link düzeltildi:** glossary.ts'de 5 PGT term (PGT-SR, Anöploidi, Öploidi, Mozaik, Translokasyon) `/makaleler/genetik-testler` → `/pgt-merkezi`; 4 makale (era-testi-iluzyon, pgt-m, kimyasal-gebelik, laboratuvar-raporu-yorumlama) PGT-A bahsederken `/genetik-testler/` linkleri `/pgt-merkezi/`'ye yönlendirildi. | `src/pages/{genetik-testler,pgt-merkezi}.astro`, `src/data/glossary.ts`, 4 makale | ✅ live |

---

## ⚠️ AUDIT REALITY-CHECK BULGULARI (audit ajanları yanılmıştı)

| Audit iddiası | Gerçek durum |
|---|---|
| C1 "/makaleler/tup-bebek-nedir yok" | ✅ `tup-bebek-nedir.mdx` yayında, refs+grade B |
| C2 "/makaleler/icsi-nedir yok" | ✅ `mikroenjeksiyon-icsi-nedir.mdx` yayında |
| C3 "5 legacy `.md` cannibalize" | ✅ Hepsi `status: "draft"` + `_redirects`'te 301 var |
| C4 "draft makaleleri yayına al" | ❌ Kasten draft — hub'lara konsolide edilmiş |
| H3 "hreflang eksik" | ✅ `hreflang="tr-TR"` + `x-default` zaten var |
| GEO "HizliCevap hub'larda yok" | Article'larda "Kısa cevap" zaten render ediliyor |

**Düzeltilmiş health score tahmini:** ~78/100 (audit'in pre-fix tahmininden daha iyi başlangıç).

---

## CRITICAL (kalan)

### ~~C1-C4~~ ZATEN HALLEDİLMİŞ (yukarıdaki reality-check tablosuna bakın).

### C5. CSP'yi enforce moda geçir
**Dosya:** `public/_headers`
**Aksiyon:** `Content-Security-Policy-Report-Only` → `Content-Security-Policy`. Önce 1 hafta `report-only` izle, sonra promote et.
**Etki:** YMYL medikal site güvenlik baseline'ı.

---

## HIGH (kalan, 1 hafta içinde)

### ~~H1-H4 UYGULANDI~~ — yukarıdaki uygulanan tablosuna bakın.

### ~~H5 UYGULANDI~~
**Aksiyon 1 (statik sayfa lastmod boşluğu): ✅** — `astro.config.mjs` `serialize()` hook'u artık `git log -1 --format=%cI` ile her `.astro` dosyasının son commit tarihini lastmod olarak yazıyor; git yoksa `fs.statSync.mtime` fallback. `/makaleler/` index sayfası en güncel makale tarihini taşıyor. Sitemap kapsamı: 88/88 URL (önceden 55/88).
**Aksiyon 2 (makale lastmod kümelenmesi): ⏭️ NO-OP** — 61/64 makalenin 2026-05-11/12 tarihinde lastmod'a sahip olması son commit dalgasının (`seo: improve ...`, `seo: add contextual internal links`) gerçek sonucu. Tarihler dürüst → sentetik düzleştirme yapılmadı. Disiplin: bundan sonra `lastModified`'a sadece içerik anlamlı şekilde değişirse dokun.

### ~~H6 UYGULANDI~~ — `/ivf-rehberi` FAQ schema live, PAA eligibility açıldı.

### H7. Hub `.astro` sayfalarına `HizliCevap` opener
**Dosyalar:** `/basari-oranlari`, `/aciklanamayan-infertilite`, `/ivf-rehberi`, `/pgt-merkezi`, `/kadin-infertilitesi`, `/erkek-infertilitesi`, `/transfer-sureci`, `/tedavi-yontemleri`
**Aksiyon:** İlk 60 kelimede direkt cevap callout ekle (MDX'teki HizliCevap pattern'i).
**Etki:** GEO citability hub'larda eşitlenir.

### ~~H8 UYGULANDI~~ — E-kitap cover 3.3 MB → 29 KB (mobile) / 184 KB (desktop). LCP −600-1500ms beklenir.

---

## MEDIUM (1 ay içinde)

### ~~M1 UYGULANDI~~ — `/yazar/senai-aksoy/` live, Person `@id` 50+ makaleye bağlandı. **TODO (manuel):** ORCID + Google Scholar URL'leri `personSchema.sameAs` array'ine eklenmeli; Wikipedia entity oluşturulduğunda da. Bu dosyada `sameAs` dizisini düzenle.

### ~~M2 UYGULANDI~~ — `public/llms.txt`: Yazar Kimliği + 55 makale + Lisans + 22 hub. 4.8KB → 9.3KB.

### M3. Top 12 yeni makale (Cluster önerisi)
**Sıralı:**
1. tekrarlayan-implantasyon-basarisizligi
2. sperm-analizi-yorumlama
3. ohss-nedir-nasil-onlenir
4. tekrarlayan-dusuk-nedenleri
5. tiroid-kisirlik-iliskisi
6. pgt-a-anoplodi-taramasi
7. ivf-add-on-rehberi
8. erken-menopoz-poi
9. sperm-dna-fragmantasyonu
10. tup-bebek-ilk-muayene-hazirlik
11. adenomyozis-nedir-tup-bebek
12. tasiyicilik-testi-nedir

### M4. Cluster 6 hub sayfası
**Yeni:** `/rahim-ve-fertilite` (veya benzeri) — endometriozis/adenomyozis/Asherman/miyom/histeroskopi spoke'larını topla.

### M5. Schema fırsatları
- `VideoObject` `videoId` olan makalelerde.
- `MedicalProcedure` IVF/ICSI/PGT-A/PGT-M.
- `Organization.foundingDate` 1996'ya düzelt (Hakkımızda ile tutarlılık).

### M6. `Person` ve `Organization` `sameAs` zenginleştirme
ORCID, Google Scholar, ESHRE üyelik URL'leri, TSRM, YouTube — tümü `sameAs` array'inde.

### M7. Performans ince ayar
- Material Symbols `font-display: swap`.
- TOC sidebar `min-height` / `aspect-ratio` (CLS).
- `animations.css` critical path'den çıkar (defer).

### M8. Marka tutarlılığı
**Dosyalar:** Footer, /iletisim, /gizlilik-politikasi, /kullanim-kosullari + Resend email template
**Aksiyon:** `mailto:dr@senaiaksoy.net` → `mailto:editor@tupbebek.com` (veya benzeri).
**Etki:** Bağımsız marka kimliğinin görsel netliği.

### ~~M9 UYGULANDI~~ — Audit'in "birini spoke'a indir" önerisi yerine **scope ayrıştırma** stratejisi izlendi: iki hub farklı konuları kapsadığı tespit edildi (ebeveyn vs embriyo PGT). Disambiguation banner'ları + 9 yanlış yönlendirilen link düzeltildi.

---

## LOW (Backlog)

- L1. IndexNow protokol implementation (Cloudflare integration).
- L2. `og:image:alt` description yerine gerçek görsel alt.
- L3. RSS feed'i `robots.txt`'e ekle.
- L4. `Crawl-delay: 1` direktifini kaldır.
- L5. Wikipedia TR IVF maddesinde kaynak olarak ekleme (editoryal başvuru).
- L6. TJOD ve TSRM patient-info listing başvurusu.
- L7. Moz / DataForSEO API setup → bir sonraki audit cycle'da backlink baseline.
- L8. Yandex Webmaster Tools doğrulama (TR'de %4-5 share).
- L9. SGK tüp bebek 2025 makalesi (yüksek hacimli AIO query).
- L10. SSR redirect `.astro` dosyalarını sil (Cloudflare `_redirects` ile duplicate).

---

## Tahmini Etki

| Aşama | Süre | Hedef Skor |
|---|---|---|
| CRITICAL tamamlandı | 1 hafta | 78 |
| HIGH tamamlandı | 1 ay | 86 |
| MEDIUM tamamlandı | 3 ay | 92 |
| LOW tamamlandı + 12 yeni makale | 6 ay | 95+ |

**Bir sonraki audit:** 60 gün sonra (drift baseline yakalanırsa `seo-drift` aktif edilebilir).
