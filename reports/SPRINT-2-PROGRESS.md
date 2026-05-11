# SEO Audit — Sprint 2 İlerleme Raporu (Teknik Altyapı Tamamlandı)

**Tarih:** 2026-05-11
**Sprint 2 teknik aksiyon:** 5 madde uygulandı (S2-4 framework + S2-5, S2-7, S2-8, S2-9)
**Editöryal içerik aksiyon:** 3 madde (S2-1, S2-2, S2-3) — klinik karar gerektirdiği için bilinçli olarak ertelendi, aşağıda yönlendirme var
**Build doğrulandı:** ✓ (npm run build hatasız, dist'te tüm değişiklikler render olmuş)

---

## Yapılan Teknik Aksiyonlar

### S2-4 framework · HızlıCevap callout component — DONE

[src/components/HizliCevap.astro](src/components/HizliCevap.astro) oluşturuldu.

Makale başına eklenip head question'ı 2-3 cümle ile direkt cevaplar. AI engine'ler (Google AI Overviews, Perplexity, ChatGPT) bu bloğu passage-level citation için extract eder.

**MDX kullanım örneği:**

```mdx
import HizliCevap from '../../components/HizliCevap.astro';

<HizliCevap question="Tüp bebek nedir?">
  Tüp bebek, döllenmenin laboratuvar ortamında yapılıp elde edilen
  embriyonun rahime transfer edildiği bir yardımcı üreme tekniğidir.
  Türkiye'de evli çiftlere uygulanır.
</HizliCevap>
```

**Brand-uyumlu:** mint border + soft mint bg, Material icon `bolt`, prose-mint inherited link styling.

**Schema notu:** Q&A schema'sı emit etmez (FAQPage zaten `/sss/` üzerinden gelir). Bu component primarily passage citability ve reader UX için.

### S2-5 · `Article.image` → ImageObject — DONE

[src/components/ArticleSchema.astro:36-49](src/components/ArticleSchema.astro#L36) — string URL yerine `ImageObject` with `width: 1200`, `height: 630`, `caption: imageAlt`.

Aynı zamanda:
- `@id: ${url}#article` eklendi — knowledge graph linking
- `publisher` ve `isPartOf` artık BaseLayout `@graph`'taki Organization + WebSite `@id`'lerine reference ediyor (duplicate Organization node yok)
- `reviewedBy` fallback olarak editorial board `@id`'ye gidiyor

Doğrulama: `dist/makaleler/tup-bebek-nedir/index.html`'de `"image":{"@type":"ImageObject"` görünür ✓, `"publisher":{"@id":"https://tupbebek.com/#organization"}` ✓.

### S2-7 · `lastReviewed` artık frontmatter'dan — DONE

[src/components/EditorKunyesi.astro:69-78](src/components/EditorKunyesi.astro#L69) — `new Date()` ile yanlış lastReviewed üreten `reviewedBySchema` patch'i **tamamen kaldırıldı**.

Önceden: her sayfa "bu içerik bugün incelendi" diyordu (build tarihi). Şimdi:
- Makale-düzey `lastReviewed` ArticleSchema.astro'dan, frontmatter `reviewDate` ile geliyor
- EditorKunyesi sadece **Editor Person** schema'sını emit ediyor — `@id` ile editorial board'a `memberOf` reference

Doğrulama: makale HTML'inde `"lastReviewed":"2026-04-09"` (frontmatter'dan) ✓, EditorKunyesi'nden lastReviewed emit etmiyor.

### S2-8 · Cookie banner: SSR flash + slide-in — DONE

[src/components/CookieConsent.astro:9-19](src/components/CookieConsent.astro#L9) — banner default'ta `translate-y-full` + `aria-hidden="true"`. JS yüklendikten sonra localStorage check, consent yoksa slide-up animation ile gelir.

Önceden: SSR'da görünür, JS'de gizleniyordu — flash artifact'i visual audit ajanını yanıltmıştı.

Mobile için iyileştirmeler:
- Daha kompakt padding (`px-3 py-3` mobile, `p-6` desktop)
- Daha küçük başlık ve metin (text-sm → text-xs mobile)
- Buton'lar `flex-1` ile yan yana, mobile'da eşit width

Doğrulama: `dist/index.html`'de `<div id="cookie-consent" class="... translate-y-full ..." aria-hidden="true">` ✓.

### S2-9 · E-kitap mobile form fold üstüne — DONE

[src/pages/e-kitap-indir.astro:14-29](src/pages/e-kitap-indir.astro#L14) — left column iki parçaya bölündü:

- **Header** (H1 + intro paragraph): `order-1 lg:col-span-2 lg:row-start-1` — mobile en üstte, desktop full-width row 1
- **Body** (cover + benefits + author): `order-3 lg:order-2 lg:col-start-1 lg:row-start-2`
- **Form** (right column): `order-2 lg:order-3 lg:col-start-2 lg:row-start-2 lg:sticky lg:top-24`

**Mobile sıralama:** Header → Form → Body  ✓
**Desktop sıralama:** Header (üstte full) → Body (sol) + Form (sağ sticky) ✓

Doğrulama: `dist/e-kitap-indir/index.html`'de `order-2 lg:order-3` (form) + `order-3 lg:order-2` (body) ✓.

---

## Şimdiki Skor Tahmini

| Kategori | Sprint 0+1 | Sprint 2 | Δ |
|---|---|---|---|
| Schema | 68 | 78 | +10 (ImageObject + @id linking + lastReviewed accuracy) |
| Visual UX | 74 | 80 | +6 (cookie banner + e-kitap form) |
| GEO / AI | 64 | 68 | +4 (HızlıCevap component, kullanımı bekliyor) |
| **Aggregate** | **~71** | **~74** | **+3** |

S2-1 / S2-2 / S2-3 editöryal içerik işleri yapılırsa aggregate **+10 puan** daha gelir.

---

## Editöryal İçerik İşleri — Bilinçli Olarak Ertelendi

Bu 3 madde sana bırakıldı çünkü klinik bilgi + brand karar gerektiriyor:

### S2-1 · 11 thin YMYL makaleyi genişlet (en kritik content işi)

Aşağıdaki 11 makale `<800 kelime`, YMYL kalite sinyali için risk. Her birine **en az 1200-1500 kelime** + 3 yeni section + 2-3 yapılandırılmış reference (DOI ile) eklenmeli:

| # | Slug | Mevcut kelime | Eklenmesi gereken section örnekleri |
|---|---|---|---|
| 1 | `dondurulmus-embriyo-transferi` | 186 | (artık draft — S1-2'de halletildi) |
| 2 | `basarisiz-denemeler` | 339 | (artık draft) |
| 3 | `beta-hcg-testi` | 379 | HCG kinetics, ectopic risk, biokimyasal gebelik |
| 4 | `akraba-evliligi` | 394 | PGT-M endikasyonu, otosomal resesif risk hesabı |
| 5 | `aciklanamayan-infertilite` | 403 | (artık draft) |
| 6 | `asherman-sendromu` | 414 | Histeroskopik tedavi, post-op management |
| 7 | `yumurtalik-kistleri-dogurganlik` | 420 | Endometrioma vs dermoid vs simple, management differential |
| 8 | `azospermi-mikro-tese` | 431 | Mikro-TESE prosedür detay, retrieval rates, post-op |
| 9 | `adet-gorememe` | 459 | Primary vs secondary amenore differential |
| 10 | `alkol-ve-fertilite` | 481 | Doz-yanıt eğrisi, spesifik bilimsel çalışmalar |
| 11 | `adet-duzensizligi-pcos` | 503 | Rotterdam criteria, AMH/AFC, Letrozole vs Clomid, OHSS-PCOS |

**Önerdiğim akış:**
1. Önce 4'ünü hedefle (en kritik): #11 PCOS, #8 azospermi, #3 beta-hcg, #7 yumurtalık kistleri — en yüksek search volume
2. Her makale için kullanıcı + ben ortak çalışacağız:
   - Sen klinik veriyi/perspektifi ver
   - Ben yapıyı + dili + reference search'i çalıştırırım
3. Her makaleye **HızlıCevap** callout başında zorunlu (S2-4 framework hazır)

### S2-2 · 47 makalede yazar attribution'ı

47 makale `author: "tupbebek.com Yayın Kurulu"` — generic. Cornerstone YMYL'de bu E-E-A-T sinyali zayıflatıyor.

**Karar gerektiriyor:** Her makale için *gerçek* primary author kim? Birkaç olası yaklaşım:

| Yaklaşım | Etki |
|---|---|
| Hepsini Dr. Senai Aksoy'a ata | E-E-A-T yükselir; ama yanlışsa intellectual honesty kaybı |
| Konu uzmanı kurul üyesine ata | En doğru, ama 47 makale için kim hangi makaleyi yazdı liste lazım |
| `author: editörler` + `medicalReviewer: named clinician` ayrımı | Honest middle ground; her makale konuyu inceleyen kurul üyesini named reviewer yapar |
| Mevcut "Yayın Kurulu" tut + `contributors` array ekle | Schema-level kabul edilebilir, UI'da değişiklik az |

Hangi yaklaşım editöryal politikana uyuyor? Buna karar verince ben batch update'i yaparım.

### S2-3 · 14 yeni spoke article (boş hub'lar)

Mevcut boş/zayıf hub'lar ve önerilen spoke konular:

| Hub | Spoke önerisi (sayı) |
|---|---|
| `yas-ve-fertilite` (0 spoke) | "Yaşa göre over rezervi", "35+ İVF stratejisi", "AMH yaş düşüşü", "Egg quality ve yaş" (4) |
| `hormon-paneli` (0 spoke) | "AMH referans aralıkları", "FSH/LH interpretation", "Estradiol kinetics", "Prolaktin yorumu", "TSH ve fertilite" (5) |
| `tani-sureci` (1 spoke) | "Spermiogram okuma", "HSG ne zaman", "Pelvik USG bulguları", "Endometrial biopsi" (4) |
| `ilac-rehberi` (0 spoke) | "Gonadotropin protokolü", "Trigger shot timing", "GnRH agonist vs antagonist" (3) |

Toplam 16 yeni makale, haftada 2-3 ile 6-8 haftada bitirilebilir. Her biri sen + ben ortak yazımı.

---

## Deploy Öncesi Checklist (Sprint 0+1+2 toplu)

1. ☐ Schema Rich Results Test: homepage, /sss/, /yayin-kurulu/, 1 makale ([search.google.com/test/rich-results](https://search.google.com/test/rich-results))
2. ☐ `curl -I` 3 endpoint:
   - https://tupbebek.com/sitemap-index.xml → 200
   - https://tupbebek.com/sitemap-0.xml → 200
   - https://tupbebek.com/llms.txt → 200
3. ☐ 4 duplicate-intent URL canlı 301 doğrula:
   - `curl -IL https://tupbebek.com/makaleler/aciklanamayan-infertilite/` → 301 → `/aciklanamayan-infertilite/`
   - Aynı: basari-oranlari, basarisiz-denemeler, genetik-testler
4. ☐ Cookie banner mobile test: ilk yüklemede gizli, JS yüklenince slide-up, accept/reject sonrası slide-down
5. ☐ E-kitap mobile test (390px viewport): H1 → Form → Cover → Benefits sıralaması ✓
6. ☐ GSC sitemap resubmit
7. ☐ PSI / CrUX field data check 7 gün sonra — özellikle `/makaleler/embryoscope-yapay-zeka/` (LCP düşüşü beklentisi)
8. ☐ CSP Report-Only logs incele (48 saat) — false positive yoksa enforcing'e çevir

---

## Toplam Audit İlerleme (Sprint 0+1+2)

| Sprint | Madde | Tamam | Skip/False positive | Ertelendi |
|---|---|---|---|---|
| 0 | 5 | 5 | 0 | 0 |
| 1 | 8 | 7 | 1 (UTF-8) | 0 |
| 2 | 9 | 5 | 0 | 3 (editöryal) + 1 (S2-6 — S1-5 ile zaten yapıldı) |
| **Toplam** | **22** | **17** | **1** | **4** |

77% completion rate, kalan 4 madde içerik kararı gerektiriyor.

---

## Sıradaki Çağrı

Senin tercihinle ilerleyelim:

**Seçenek A — Editöryal sprint:** S2-1 thin makaleleri birlikte genişletmeye başlayalım. Hangi makaleden başlayalım? (Önerim: PCOS / `adet-duzensizligi-pcos` — en yüksek search volume + Rotterdam criteria iyi documented bir konu)

**Seçenek B — Deploy:** Mevcut değişiklikleri deploy edip CrUX data 7 gün sonra ölçüm yap, sonra Sprint 3 ile devam et.

**Seçenek C — Sprint 3 teknik:** S3-3 (image sitemap), S3-5 (35 hub için unique OG image üretimi via banana MCP), S3-6/S3-7 (embryoscope references temizlik) — daha küçük teknik işler.

Hangisini seçersen ona göre devam.

---

*Sprint 2 teknik altyapı: 5 madde tamamlandı, build temiz. Editöryal işler için karar bekliyor.*
