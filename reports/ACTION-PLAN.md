# tupbebek.com — SEO Audit Aksiyon Planı

**Tarih:** 2026-05-10
**Aggregate skor:** 59/100
**Hedef skor (3 ay):** 80/100

Bu plan **etki × efor** matrisine göre sıralanmıştır. Her aksiyon için: hangi dosya, ne değişecek, beklenen kazanım, kaç saat. Kaynak audit raporları her satırda referans olarak verildi.

---

## SPRINT 0 — Aynı Gün İçinde Bitir (Toplam ~4 saat, büyük kazanım)

Bu beş madde tek başına aggregate skoru ~10 puan yükseltir. Sıra ile yapılabilir; hiçbiri diğerine bağımlı değil.

### S0-1 · Sitemap'i canlıda erişilebilir hale getir

**Sorun:** `tupbebek.com/sitemap-index.xml` → 404. Cloudflare `_worker.js` static asset'leri yutuyor.

**Yapılacak:**
1. Build sonrası `dist/_routes.json` dosyasına `exclude` array'e ekle:
   ```json
   {
     "version": 1,
     "include": ["/*"],
     "exclude": ["/sitemap-index.xml", "/sitemap-0.xml", "/robots.txt", "/llms.txt"]
   }
   ```
2. `astro.config.mjs` build hook'unda commit edilmesini garanti et.
3. Deploy sonrası iki URL için `curl -I` ile 200 doğrula.
4. GSC'de sitemap'i yeniden submit et.

**Etki:** GSC indexation acquisition restored, AI crawler discovery restored. **Critical #1 fix.**
**Süre:** 30 dk
**Kaynak:** `seo-audit-technical.md` C1, `seo-audit-sitemap.md`

### S0-2 · Güvenlik header bloğu ekle

**Yapılacak:** `public/_headers` en üstüne ekle:

```
/*
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Frame-Options: SAMEORIGIN
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; font-src 'self'; script-src 'self' 'unsafe-inline'; connect-src 'self' https:; frame-ancestors 'self';
```

CSP'yi önce `Content-Security-Policy-Report-Only` ile deploy edip 48 saat izleyin — false positive olmadığını gördükten sonra enforcing'e geçin.

**Etki:** YMYL trust signal güçlendi, mixed-content riski sıfırlandı.
**Süre:** 30 dk + 48h izleme
**Kaynak:** `seo-audit-technical.md` H1

### S0-3 · `trailingSlash: 'always'` ekle ve redirect zincirini tek hop'a düşür

**Yapılacak:** `astro.config.mjs`:

```js
export default defineConfig({
  trailingSlash: 'always',
  // ... rest
});
```

Build sonrası 3 örnek redirect'i test et: `curl -IL https://tupbebek.com/eski-url` — 2 hop yerine 1 hop görmelisin.

**Etki:** Crawl budget kazanımı, link equity tek hop'ta aktarılıyor.
**Süre:** 10 dk + test
**Kaynak:** `seo-audit-technical.md` H2

### S0-4 · `image.service: noop` kaldır → Sharp pipeline'ı geri aç

**Yapılacak:** `astro.config.mjs` içinden:

```diff
- image: { service: { entrypoint: 'astro/assets/services/noop' } },
```

satırını kaldır. Sharp default'a dönsün.

Build et — `dist/_astro/` içinde optimized WebP variants görmelisin.

**Etki:** Tüm yeni eklenen görseller otomatik optimize. CLS riski azalır (width/height otomatik enjekte edilir).
**Süre:** 10 dk + 1 build doğrulama
**Kaynak:** `seo-audit-performance.md` Fix 1

### S0-5 · 21 MB PNG'yi WebP'ye çevir (embryoscope-yapay-zeka)

**Yapılacak:**
1. `public/e-kitap/images/embryoscope-kapak-2026.png` veya makaledeki bağıntılı dosyayı bul.
2. Sharp veya `scripts/convert-to-webp.mjs` ile 1200×630 WebP'ye çevir.
3. Article markdown'da reference güncelle.
4. Eski PNG'yi sil (commit history'de kalır).

**Etki:** `/makaleler/embryoscope-yapay-zeka/` LCP 8s+ → ~2.5s. Bu sayfada Performance skoru 35 → 75.
**Süre:** 20 dk
**Kaynak:** `seo-audit-performance.md` Fix 1, `seo-audit-images.md`

---

## SPRINT 1 — Bu Hafta İçinde (Toplam ~12 saat)

### S1-1 · JSON-LD UTF-8 bozulmasını düzelt **[CRITICAL]**

**Sorun:** Türkçe diyakritikler JSON-LD'de `?` çıkıyor (`"Yay?n Kurulu"`, `"sreme Sa??l???"`).

**Tanı yolu:**
1. `curl -I https://tupbebek.com/ | grep -i content-type` — `charset=utf-8` var mı doğrula.
2. View source — `<meta charset="UTF-8">` `<head>`'in ilk elementi mi?
3. JSON-LD block'larındaki Türkçe stringler `.astro` template'ten mi geliyor yoksa runtime'da `new Date()` gibi hesaplanıyor mu?
4. Cloudflare worker `_worker.js` text response'ları rewrite ediyor mu (Buffer/Response.text() ile gzip rebuilding)?

**Yapılacak:**
- Schema component'larında (`ArticleSchema.astro`, `BaseLayout.astro`, `EditorKunyesi.astro`) Türkçe içeren string'leri Unicode escape ile yaz veya `JSON.stringify` üzerinden geçir (otomatik UTF-8 normalize).
- Eğer `_worker.js` Response.text() ile dönüyorsa `Response.arrayBuffer()` kullan veya `TextEncoder('utf-8')` ile encoding belirle.

**Etki:** Tüm sayfalarda entity matching restored. AI Overviews ve Perplexity için marka görünür hale geliyor.
**Süre:** 2-4 saat
**Kaynak:** `seo-audit-schema.md` Critical #1, `seo-audit-geo.md`

### S1-2 · Hub vs. article duplicate-intent çakışmasını çöz **[CRITICAL]**

**4 confirmed pair + 2 SXO ek conflict = 6 pair**

| Hub | Article | Önerilen Aksiyon |
|---|---|---|
| `/aciklanamayan-infertilite/` | `/makaleler/aciklanamayan-infertilite/` | Hub'ı landing+yönlendirme yap (article'a link), article'ı canonical bırak |
| `/basari-oranlari/` | `/makaleler/basari-oranlari/` | Hub data-first ranking aldı (SXO findings), article'ı 301 hub'a |
| `/basarisiz-denemeler/` | `/makaleler/basarisiz-denemeler/` | Article'ı kalanlardan daha derin yap, hub'ı 301 article'a |
| `/genetik-testler/` | `/makaleler/genetik-testler/` | Article'ı canonical, hub'ı listing/intro |
| `iui-nedir` (2 URL) | — | `/makaleler/iui-nedir/` canonical, diğeri 301 |
| `endometriozis-tup-bebek` (2 URL) | — | Cluster leader ata, diğerleri canonical bu URL'i göstersin |

Her pair için karar: hangisi canonical, diğeri `<link rel="canonical">` veya 301 redirect.

**Etki:** İç PageRank tek URL'de toplanıyor. Hedef anahtar kelimelerde 2-5 sıra atlama mümkün.
**Süre:** 2 saat (karar + uygulama + redirect)
**Kaynak:** `seo-audit-sitemap.md`, `seo-audit-sxo.md`, `seo-audit-cluster.md`

### S1-3 · FAQPage schema'yı `/sss/` sayfasına ekle

**Yapılacak:**
- `src/pages/sss.astro` içinde 12 Q&A'yı JSON-LD `FAQPage` `mainEntity` array'e map et.
- Schema ajanı raporunda hazır JSON örneği var.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Tüp bebek nedir?", "acceptedAnswer": { "@type": "Answer", "text": "..." } },
    ...
  ]
}
</script>
```

**Etki:** AI Overviews, Perplexity, ChatGPT'de FAQ-cite eligibility açılıyor.
**Süre:** 1 saat
**Kaynak:** `seo-audit-schema.md` Top 3 #3, `seo-audit-geo.md`

### S1-4 · Person schema'yı `/yayin-kurulu/` sayfasına ekle

**Yapılacak:** 16 board üyesi için her birine ayrı Person JSON-LD, `alumniOf`, `memberOf`, `hasCredential`, `knowsAbout` populate. Mümkünse `sameAs` ile PubMed/ResearchGate/üniversite profil linkleri.

**Etki:** YMYL E-E-A-T'nin en yüksek-leverage tek hamlesi. AI entity-graph indexing açılıyor.
**Süre:** 2-3 saat (16 üye × ~10 dk)
**Kaynak:** `seo-audit-schema.md` Top 3 #2

### S1-5 · Site-wide `Organization` schema (`@id` ile)

**Yapılacak:** `BaseLayout.astro` içinde tek bir kanonik Organization block. `@id: https://tupbebek.com/#organization` — tüm diğer schema bu @id'yi referans alır.

- `name`, `legalName`, `url`, `logo: ImageObject` (en az 112×112 PNG/WebP — favicon yetersiz!),
- `sameAs`: YouTube, LinkedIn, akademik profil linkleri
- `address`, `contactPoint` (uygunsa)
- `foundingDate`, `editorialPolicy: https://tupbebek.com/editoryal-politika/`

**Etki:** Tüm makale ve board üyesi schema'ları tek yayın node'una resolve. Knowledge graph relations enabled.
**Süre:** 1 saat
**Kaynak:** `seo-audit-schema.md` Top 3 #1

### S1-6 · Sitemap'i temizle

**Yapılacak:**
1. 12 zombie URL'i prod'da test et (`curl -I`). 404 dönenleri sitemap'ten ve `_redirects`'ten çıkar.
2. `/sorunlar/` ve `/yayin-sureci/` sitemap'ten çıkar (zaten redirect target'ı vardır).
3. 4 unused namespace declaration'ı sitemap-0.xml builder'dan kaldır.
4. `basarisiz-denemeler` `lastmod: 2024-03-31` → frontmatter'dan re-build → 2026 date'i alır.
5. 22 static page için `lastmod` build script'ine ekle.

**Etki:** Sitemap defect rate %13 → 0. GSC trust restored.
**Süre:** 1.5 saat
**Kaynak:** `seo-audit-sitemap.md`

### S1-7 · LCP preload site-wide

**Yapılacak:** `BaseLayout.astro` içinde dynamic LCP image preload:

```astro
{lcpImage && (
  <link rel="preload" as="image" href={lcpImage} fetchpriority="high" />
)}
```

Article template'inde featured image'ı `lcpImage` prop'una geçir.

**Etki:** LCP -300-600ms tüm sayfalarda.
**Süre:** 30 dk
**Kaynak:** `seo-audit-performance.md` Fix 2

### S1-8 · llms.txt yayınla

**Yapılacak:** `public/llms.txt` oluştur. Tam içerik `seo-audit-geo.md` raporunda hazır.

**Etki:** AI publisher readiness sinyali. Düşük etki ama düşük efor.
**Süre:** 15 dk
**Kaynak:** `seo-audit-geo.md` Top 5 #4

---

## SPRINT 2 — Bu Ay İçinde (Toplam ~25 saat)

### S2-1 · 11 thin YMYL makalesini genişlet **[CRITICAL]**

Hedef: her makale en az 1200-1500 kelime, recommendationGrade'i hak edecek depth.

Öncelik sırası (search volume × duplicate intent risk):

1. `aciklanamayan-infertilite` — high-search, hub ile çakışıyor (S1-2 ile birlikte halletmek lazım)
2. `adet-duzensizligi-pcos` — Rotterdam kriterleri, AMH/AFC, Letrozole vs. Clomid, OHSS-PCOS ekle
3. `basarisiz-denemeler` — "ne yapılır" framework + ERA testi referansı (era-testi-iluzyon ile cross-link)
4. `dondurulmus-embriyo-transferi` — Frozen vs. fresh comparison, FET protokolleri
5. `azospermi-mikro-tese` — Mikro-TESE detayı, sperm extraction success rates
6. `yumurtalik-kistleri-dogurganlik` — Endometrioma, dermoid, simple cyst — her biri farklı management
7. `beta-hcg-testi` — HCG kinetics, ectopic risk, biochemical pregnancy
8. `aspekt-asherman-sendromu` — Histeroskopik tedavi detayı
9. `akraba-evliligi` — PGT-M endikasyonu
10. `adet-gorememe` — Amenore differential (primary vs secondary)
11. `alkol-ve-fertilite` — Spesifik doz-yanıt eğrisi

**Yapılacak per article:**
- En az 3 yeni section (each ≥200 kelime)
- 2-3 yeni structured reference (DOI ile)
- 1 internal link to related cornerstone
- Frontmatter `lastModified` güncelle

**Etki:** YMYL quality signal güçlenir. SXO ajanı findings'lerine göre topical comprehensiveness eksiği kapatılır.
**Süre:** 11 makale × ~1.5 saat = 16 saat (editöryal süreçle birlikte)
**Kaynak:** `seo-audit-content.md` Bölüm 4

### S2-2 · 47 makalede yazar attribution'ı named clinician'a güncelle

**Sorun:** `author: tupbebek.com Yayın Kurulu` cornerstone YMYL'de E-E-A-T kaybı.

**Yapılacak:**
- Her makale için gerçek primary author'ı belirle (sourcing/research/writing'i kim yaptı).
- Frontmatter `author` object form'a geçir: `{name, title, credentials}`.
- Eğer gerçekten bir komite eseri ise `author: "Doç. Dr. Senai Aksoy"` + `additionalAuthors` veya `contributors` field eklenebilir.

**Etki:** Schema reviewedBy + author resolve eden gerçek Person entities. AI authority signal.
**Süre:** 5 saat (47 makale, batch update)
**Kaynak:** `seo-audit-content.md` Bölüm 2

### S2-3 · Cluster: thin hub'lara spoke makale planı

| Hub | Mevcut Spoke | Hedef | Eklenmesi gereken |
|---|---|---|---|
| `yas-ve-fertilite` | 0 | 4 | "Yaşa göre over rezervi", "35+ İVF stratejisi", "AMH yaş düşüşü", "Egg quality ve yaş" |
| `hormon-paneli` | 0 | 5 | "AMH referans aralıkları", "FSH/LH interpretation", "Estradiol kinetics", "Prolaktin yorumu", "TSH ve fertilite" |
| `tani-sureci` | 1 | 4 | "Spermiogram okuma", "HSG ne zaman", "Pelvik USG bulguları", "Endometrial biopsi" |
| `genetik-testler` | mevcut | +2 | "PGT-A ne zaman", "Karyotip endikasyonu" |
| `ilac-rehberi` | 0 | 3 | "Gonadotropin protokolü", "Trigger shot timing", "GnRH agonist vs antagonist" |

**Etki:** 14 yeni spoke article → 5 hub PageRank fed → orphans absorb edilir.
**Süre:** 14 makale × ~2.5 saat editöryal süreç + 1 saat planlama = ~36 saat (Sprint 3'e taşıyın)
**Kaynak:** `seo-audit-cluster.md`

### S2-4 · Per-article "Hızlı Cevap" + FAQ pattern

**Yapılacak:**
- Layout component'ında üst-tarafa `<aside class="hizli-cevap">` slot ekle.
- Her makale frontmatter'ına `summary` field ekle (2-3 cümle, head question'ı tam cevaplar).
- Article body'sine 2-3 `<details>` Q&A block ekle (manuel veya yarı-otomatik).

**Etki:** AI passage citability +20-30 puan. Bounce rate düşer (kullanıcı hızlı cevap görür).
**Süre:** Pattern component 2 saat + 64 makale × 15 dk = ~18 saat (Sprint 3'e bölünebilir)
**Kaynak:** `seo-audit-geo.md`, `seo-audit-sxo.md`

### S2-5 · `Article.image` → ImageObject

`ArticleSchema.astro:130` flat string emit ediyor. Şu hale getir:

```js
image: {
  "@type": "ImageObject",
  url: d.image,
  width: 1200,
  height: 630,
  caption: d.imageAlt
}
```

**Süre:** 30 dk
**Kaynak:** `seo-audit-schema.md`

### S2-6 · Organization logo: 112×112+ proper image

Brand asset olarak `public/images/brand/tupbebek-logo.png` (en az 600×600, transparent BG) oluştur. Schema'da `Organization.logo` buraya işaret etsin.

**Süre:** 30 dk (designer'a brief verme zamanı dahil)
**Kaynak:** `seo-audit-schema.md`

### S2-7 · `lastReviewed` runtime'da değil, frontmatter'dan al

**Sorun:** `EditorKunyesi.astro` `new Date()` yazıyor — her sayfada build tarihi, yanlış.

**Yapılacak:** `reviewDate` frontmatter'dan oku, schema'ya ISO format ile yaz.

**Süre:** 15 dk
**Kaynak:** `seo-audit-schema.md`

### S2-8 · Mobile cookie banner: fixed overlay'e dönüştür

**Sorun:** Inline content flow — her sayfada CTA'yı aşağı itiyor.

**Yapılacak:** `CookieConsent.astro` component'ında `position: fixed; bottom: 0;` + body padding-bottom dinamik.

**Süre:** 1 saat
**Kaynak:** `seo-audit-visual.md`

### S2-9 · Mobile e-kitap formu fold üstüne taşı

**Sorun:** `/e-kitap-indir/` mobile column order'da form en altta.

**Yapılacak:** CSS reorder: `flex-direction: column-reverse` veya semantic markup'ı form-first hale getir.

**Süre:** 30 dk
**Kaynak:** `seo-audit-visual.md`

---

## SPRINT 3 — Önümüzdeki Çeyrek (Toplam ~60 saat)

### S3-1 · 14 yeni spoke article (S2-3'ten taşınan)

Cluster gaps. Editöryal kapasiteye göre haftada 2-3.

### S3-2 · 64 makaleye Hızlı Cevap + FAQ pattern roll-out

S2-4'ten taşınan.

### S3-3 · Image sitemap implementation

Article featured images için image sitemap. Astro sitemap plugin'i `image` extension'ı destekliyor.

**Süre:** 1 saat
**Kaynak:** `seo-audit-sitemap.md`

### S3-4 · Outreach kampanyası — Top 5 hedef

`seo-audit-backlinks.md` raporundan:

1. **ESHRE patient resources** (eshre.eu) — Dr. Aksoy member submission. `yasa-gore-tup-bebek-basari-oranlari` makalesini öner.
2. **Hacettepe Üniversitesi Kadın Hastalıkları** — `ivf-protokolleri`, `genetik-testler` patient guide olarak öner.
3. **NTV Sağlık** — World IVF Day 25 Temmuz 2026 etrafında `yasa-gore-tup-bebek-basari-oranlari` pitch.
4. **Ankara Üniversitesi İnfertilite Merkezi** — `pgt-m`, `kanser-ve-fertilite` patient liaison ofisi.
5. **MAMA Derneği** — `duygusal-dayaniklik-rehberi`, `basarisiz-denemeler` patient advocacy.

**Etki:** Yetkili .edu.tr + ESHRE backlinks → topical authority sıçraması.
**Süre:** Her hedef için 2-3 saat (research + tailored pitch + follow-up) = ~12 saat
**Kaynak:** `seo-audit-backlinks.md`

### S3-5 · 35 hub/marketing sayfası için unique OG image (1200×630)

Banana / nanobanana-mcp ile generate edilebilir. `seo-audit-images.md` raporunda her hub için hazır prompt var (navy + mint + apricot palette, baby-free, no text in image).

**Yöntem:** Banana MCP ile batch (11 hub) ilk önce — feedback alıp diğer 24'ü ona göre.

**Süre:** Prompt → revize → final ≈ 35 × 30 dk = ~17 saat (paralel)
**Kaynak:** `seo-audit-images.md`

### S3-6 · `embryoscope-yapay-zeka` ve `yumurta-dondurma-rehberi` references frontmatter

Mevcut inline citations'ı structured `references:` array'e taşı. DOI/PMID ile.

**Süre:** 2 saat
**Kaynak:** `seo-audit-content.md` Bölüm 2

### S3-7 · `embryoscope-yapay-zeka` Tier 3 references replace

CarefulTrip, Preprints.org, Vitrolife product page atıflarını peer-reviewed eşdeğerleriyle değiştir. PubMed search ile clinical RCT bul.

**Süre:** 2 saat
**Kaynak:** `seo-audit-content.md` Bölüm 7

---

## DEVAM EDEN İŞLER (Haftalık ritm)

- **W1**: Yeni makale eklerken `summary` + `references` (DOI + PMID) + `recommendationGrade` zorunlu — bu zaten Zod schema'da, içerik prensibinde sıkı tutun.
- **W2**: Cornerstone makaleleri 6 ayda bir review — `lastModified` ve `reviewDate` güncelle.
- **W3**: GSC weekly check — yeni 404, redirect chain, sitemap status.
- **W4**: Backlink monitoring — referring domains 3 ayda bir audit (Open PageRank tier 0 ile).

---

## METRİK PANELİ — Audit Sonrası İzlenecekler

| Metrik | Mevcut | 1 ay hedef | 3 ay hedef |
|---|---|---|---|
| Aggregate Score | 59 | 72 | 80 |
| Sitemap status (live 200) | 404 | 200 | 200 |
| GSC submitted URLs | 90 | 100+ | 120+ |
| GSC indexed | bilinmiyor | +20% | +50% |
| UTF-8 JSON-LD validation | FAIL | PASS | PASS |
| FAQPage schema count | 1 | 8+ | 20+ |
| Person schema count | 1 | 17 | 17 |
| Thin published articles (<800w) | 11 | 5 | 0 |
| LCP < 2.5s mobile | %60 | %85 | %95 |
| AI citation readiness avg | 58 | 70 | 80 |

---

## NOTLAR

- **Konsolidasyon önceliği:** Sprint 0 ve Sprint 1'in S1-1 (UTF-8), S1-2 (duplicate intent), S1-3 (FAQPage), S1-4 (Person schema) birlikte gitmeli — bunlar birbirine bağlı E-E-A-T zinciri.
- **Sharp pipeline'ı geri açtığınızda** `image.service: noop` neden vardı kontrol edin — muhtemelen önceki bir build hatası workaround'u idi. Sharp şu an macOS/Linux/Windows hepsinde stabil; Cloudflare Pages build'inde sorun çıkmaz.
- **Regulatory hygiene'i koruyun:** Audit boyunca patient testimonial, before/after, klinik CTA önerilmedi. Bu chart üzerindeki güç bu site'ın stratejik diferansiyatörü.
- **Backlink stratejisi:** Hızlı domain authority sıçraması beklenmiyor (publisher 2025 relaunch). 6-12 ayda organic build edilecek. Sprint 3 outreach'i ESHRE üzerinden başlayın — en yüksek-otorite single link.

---

*Plan: 11 audit ajan + manuel konsolidasyon. Bu plan revize edilmek üzere — fix'leri yaptıkça `git diff` kontrol edip ölçümleri güncelleyin.*
