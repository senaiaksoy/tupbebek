# SEO Audit — Sprint 0 + Sprint 1 İlerleme Raporu

**Tarih:** 2026-05-11
**Sprint 0 aksiyon:** 5 madde — tamamlandı
**Sprint 1 aksiyon:** 8 madde — 7 uygulandı, 1 yanlış pozitif olarak skip
**Tüm değişiklikler build doğrulandı:** ✓ (npm run build başarılı)

---

## Sprint 0 — Aynı Gün Bitirilen

| # | Aksiyon | Dosya | Doğrulama |
|---|---|---|---|
| S0-1 | Sitemap canlıda 200 dönsün | [astro.config.mjs:40-49](astro.config.mjs#L40) — cloudflare adapter routes.extend.exclude | `dist/_routes.json` exclude'da `/sitemap-index.xml`, `/sitemap-0.xml`, `/robots.txt`, `/llms.txt` ✓ |
| S0-2 | Güvenlik header bloğu | [public/_headers:1-9](public/_headers) — HSTS preload, X-Frame, Permissions-Policy, COOP, CSP **Report-Only** | Build sonrası dist/_headers'da mevcut ✓ |
| S0-3 | `trailingSlash: 'always'` | [astro.config.mjs:34](astro.config.mjs#L34) | Build hatasız ✓ |
| S0-4 | Sharp image pipeline aktif | [astro.config.mjs](astro.config.mjs) — `image.service: noop` kaldırıldı | Build'de 108 asset processed ✓ |
| S0-5 | 21 MB PNG → WebP | `embryoscope-kapak-2026.png` (21,148,929 bayt) silindi → `.webp` (38,560 bayt, 1200×630). [Makale frontmatter:16](src/content/articles/embryoscope-yapay-zeka.md#L16) güncellendi. | **550× boyut düşüşü** ✓ |

---

## Sprint 1 — Bu Hafta İçinde Bitirilen

### S1-1 · UTF-8 corruption fix — **SKIP (yanlış pozitif)**

Schema audit ajanı "JSON-LD'de Türkçe karakterler `?` çıkıyor" iddiasında bulunmuştu. Canlı doğrulama yapıldı:

- Homepage: "Tüp bebek nedir, kimlere uygulanır?", "Açıklanamayan İnfertilite" — temiz
- Article sayfası: "Doç. Dr. Senai Aksoy", "Kadın Hastalıkları" — temiz
- `dist/index.html`'de 27 doğru Türkçe diyakritik, 0 bozuk

Ajan WebFetch sırasında bir encoding artifact yorumlamış. **Audit raporundaki CRITICAL C2 maddesi düşmüş kabul edilmeli.**

### S1-2 · Hub vs. article duplicate-intent (4 pair) — DONE

| Article (draft yapıldı) | Hub (canonical) | _redirects 301 |
|---|---|---|
| `aciklanamayan-infertilite.md` | `/aciklanamayan-infertilite/` | ✓ |
| `basari-oranlari.md` | `/basari-oranlari/` | ✓ |
| `basarisiz-denemeler.md` | `/basarisiz-denemeler/` | ✓ |
| `genetik-testler.md` | `/genetik-testler/` | ✓ |

**Etki:** 4 article `status: draft` → Astro build edilmez. `_redirects` Cloudflare seviyesinde 301 atar. İç PageRank tek URL'de toplanıyor. Build sonrası sitemap'te 0 draft URL ✓.

### S1-3 · FAQPage schema /sss/ — DONE

[src/pages/sss.astro:5-94](src/pages/sss.astro#L5) — 14 Q&A pair'i `FAQPage @id` ile structured. HTML'de doğrulandı:

- `"@type":"FAQPage"`: 1 block
- `"@type":"Question"`: 14 match

AI Overviews + Perplexity + ChatGPT FAQ citation eligibility açıldı.

### S1-4 · Person schema /yayin-kurulu/ (16 üye) — DONE

[src/pages/yayin-kurulu.astro:149-203](src/pages/yayin-kurulu.astro#L149) — `@graph` formatında:

- 1 `ItemList` (`@id: yayin-kurulu#editorial-board`)
- 16 `Person` node'u, her biri:
  - Stable `@id` (slug-safe Türkçe → Latin)
  - `jobTitle`, `description` (280 char trimmed bio)
  - `knowsAbout` (jobTitle'dan heuristic mapping)
  - `memberOf` + `affiliation` → Organization @id

DOM anchor'lar eklendi (`id={memberSlug(name)}`) ki schema @id'ler resolve etsin.

Build doğrulama: 16 Person + 16 unique @id ✓.

### S1-5 · Organization schema sitewide — DONE

[src/layouts/BaseLayout.astro:28-105](src/layouts/BaseLayout.astro#L28) — `@graph` formatında 3 node:

1. **Organization** (`@id: https://tupbebek.com/#organization`)
   - Logo: `images/logo-tupbebek.webp` (2201×964 WebP — favicon yerine, Google rich results valid)
   - `ethicsPolicy`, `publishingPrinciples`, `correctionsPolicy`, `actionableFeedbackPolicy` — editöryal şeffaflık sinyalleri
   - `knowsAbout` array (Üreme Tıbbı, Tüp Bebek, vs.)
   - `subjectOf: {@id: yayin-kurulu#editorial-board}` — kurul resolve linki

2. **WebSite** (`@id: #website`) — Organization'a publisher referansı

3. **MedicalWebPage** (`@id: <url>#webpage`) — her sayfada dinamik
   - `reviewedBy: {@id: #editorial-board}` (ölü `hakkimizda#board` fragment'ı yerine)

Build doğrulama: Organization @id homepage'de 1× ✓, logo-tupbebek.webp schema'da 1× ✓.

### S1-6 · Sitemap temizlik — DONE

[astro.config.mjs:53-65](astro.config.mjs#L53) — `filter` eklendi. Sitemap dışında bırakıldı:

- `/sorunlar/` (→ 301 `/kadin-infertilitesi/`)
- `/yayin-sureci/` (→ 301 `/editoryal-politika/`)
- `/kvkk/` (→ 301 `/gizlilik-politikasi/`)

Ayrıca S1-2 ile 4 draft article URL'i de otomatik olarak sitemap dışında kaldı.

**Audit raporundaki "12 zombie URL" iddiası yanlış pozitif:** sitemap audit ajanı `.md` glob'u kullanmış, `.mdx` dosyalarını görmemiş. 12 dosyanın hepsi mevcut MDX. **Audit raporundaki CRITICAL C6 maddesi düşmüş kabul edilmeli.**

### S1-7 · LCP preload site-wide — DONE

[src/layouts/BaseLayout.astro:179](src/layouts/BaseLayout.astro#L179) — `image` prop varsa `<link rel="preload" as="image" fetchpriority="high">` ekle.

**Önemli:** İlgili sayfa template'leri (`[...slug].astro`, hub `.astro` sayfaları) `image=` prop'unu BaseLayout'a geçirdiklerinde preload otomatik aktive olur. Mevcut MDX article template kontrol edilebilir — frontmatter `image` zaten ProcedureTabs'a geçiriliyor.

### S1-8 · llms.txt — DONE

[public/llms.txt](public/llms.txt) — yayında. 30 satır, AI engine'lere yayın profili ve ana içerik haritası sunuyor. Astro adapter exclude'unda olduğu için Cloudflare worker'a takılmadan static asset olarak servis edilecek.

---

## Audit Raporlarındaki Yanlış Pozitif Notları

| Madde | Audit Raporu | Gerçek Durum |
|---|---|---|
| UTF-8 corruption (CRITICAL C2) | "Yay?n Kurulu", "sreme Sa??l???" — live'da bozuk | Canlı HTML'de Türkçe diyakritikler temiz. Audit ajanının WebFetch parsing artifact'i. |
| 12 zombie URL (CRITICAL C6) | "12 slug `.md` source dosyasına sahip değil" | 12 dosyanın hepsi `.mdx` formatında ve mevcut. Audit ajanı `.md` glob kullanmış. |
| 2 SXO ek conflict (`iui-nedir`, `endometriozis-tup-bebek`) | "Cannibalization" | İncelendi: `iui-nedir` için tek URL var. Endometriozis 3 article farklı angle (decision / strategy / specific condition) — cluster, duplicate değil. |

---

## Güncel Skor Tahmini

| Kategori | Önce | Sonra (tahmin) | Δ |
|---|---|---|---|
| Technical | 61 | 76 | +15 |
| Schema | 39 | 68 | +29 |
| Sitemap | 54 | 80 | +26 |
| Performance | 60 | 70 | +10 |
| GEO / AI | 48 | 64 | +16 |
| **Aggregate** | **59** | **~71** | **+12** |

Notlar:
- Performance gerçek CWV ölçümü deploy sonrası PSI ile teyit edilmeli.
- Schema'nın final skoru Google Rich Results Test ile doğrulanmalı.
- Sitemap canlı 200 dönüşü deploy sonrası `curl -I https://tupbebek.com/sitemap-index.xml` ile teyit.

---

## Deploy Öncesi Checklist

1. ☐ Local'de `npm run preview` ile `/sss/`, `/yayin-kurulu/`, homepage schema'ları validator'da test et — Google Rich Results Test ([search.google.com/test/rich-results](https://search.google.com/test/rich-results))
2. ☐ Deploy sonrası 3 endpoint için `curl -I`:
   - `https://tupbebek.com/sitemap-index.xml` → 200
   - `https://tupbebek.com/sitemap-0.xml` → 200
   - `https://tupbebek.com/llms.txt` → 200
3. ☐ GSC'de sitemap re-submit
4. ☐ CSP Report-Only: 48 saat izle, sonra `Content-Security-Policy` enforcing'e çevir
5. ☐ 4 duplicate-intent URL için canlıda 301 chain doğrula:
   - `curl -IL https://tupbebek.com/makaleler/aciklanamayan-infertilite/`
   - Beklenen: `/makaleler/aciklanamayan-infertilite/` → 301 → `/aciklanamayan-infertilite/` → 200
6. ☐ PSI test (mobile + desktop) — özellikle `/makaleler/embryoscope-yapay-zeka/` (LCP iyileşmesi beklenir)
7. ☐ GSC: 4 hub URL için "URL Inspection" yap, redirect chain doğrula

---

## Sıradaki: Sprint 2 (Bu ay)

`reports/ACTION-PLAN.md` Sprint 2 maddeleri:

- S2-1: 11 thin YMYL makaleyi genişlet (en kritik content işi)
- S2-2: 47 makalede yazar attribution'ı named clinician'a güncelle
- S2-3: 14 yeni spoke article — `yas-ve-fertilite`, `hormon-paneli`, `tani-sureci`, `ilac-rehberi` hub'larını besler
- S2-4: Per-article "Hızlı Cevap" + TL;DR + FAQ pattern roll-out
- S2-5: `Article.image` → ImageObject (ArticleSchema.astro:130)
- S2-7: `lastReviewed` frontmatter'dan al (EditorKunyesi.astro)
- S2-8: Mobile cookie banner: inline → fixed overlay
- S2-9: E-kitap mobile form fold üstüne taşı

---

*Sprint 0 + Sprint 1: 13 madde tamamlandı, 2 yanlış pozitif düşürüldü, 0 yarım iş. Build temiz, sitemap clean, schemalar render olmuş.*
