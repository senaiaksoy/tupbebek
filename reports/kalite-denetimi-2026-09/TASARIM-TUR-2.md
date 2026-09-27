# Tasarım tur 2

## Başlama kararı — 27 Eylül 2026

Dr. Aksoy, §0 seçenekleri sunulduktan sonra “şimdi başla” dedi. 10 Kasım civarındaki GSC yeniden ölçümünü beklemeden tasarım turu başlatıldı; önce/sonra GSC değerlendirmesinde bu değişiklikler hesaba katılmalı. Bu karar, PR-A/B/C'nin birleştirme onayı değildir; her PR için ayrıca onay alınacak.

## PR-A — Inter seçimi ve uygulama

Mevcut kodda font ailesi üç yerde tanımlanıyor: Tailwind `headline/body = Inter`, `tokens.css` başlıkları Playfair Display, `BaseLayout.astro` başlıkları Inter ve gövdeyi Manrope olarak tanımlıyor. Telefon ölçümünde ana sayfa ve makale H1'leri Playfair Display; hub H1'leri Inter; gövde Manrope.

İki görsel seçenek, uygulama kaynakları değiştirilmeden Puppeteer üzerinden geçici CSS ile hazırlandı. Her ikisinde de gövde Manrope; H1 kelimeleri ve font boyutları aynı. H1 içindeki mavi italik vurgunun yalnız görünümü kaldırıldı; kelime korundu. Tarayıcının gerçek font kullanımı CDP `CSS.getPlatformFontsForNode` ile doğrulandı.

- A: Playfair Display — ana sayfa/makale başlıklarının mevcut ailesiyle tutarlılık; devir notunun önerisi.
- B: Inter — hub başlıklarının mevcut ailesiyle tutarlılık.
- Görseller: `output/playwright/tasarim-tur-2/font-options/playfair-comparison.png` ve `inter-comparison.png` (390/1366 px fertilite-koruma ve beta-hCG).
- Kanıt: `output/playwright/tasarim-tur-2/font-options/metrics.json`.
- Mevcut durum ekranları: `output/playwright/tasarim-tur-2/before-a/`.

Dr. Aksoy, A/B karşılaştırmasının ardından “b” diyerek Inter seçeneğini seçti. PR-A `codex/tasarim-tur-2-a` dalında uygulandı; bu seçim birleştirme onayı değildir. PR-A tamamlanınca ayrıca “onay” beklenecek. PR-B, PR-A temel alınarak hazırlanacak; PR-C kart görseli için ayrıca örnekli içerik kararı alınacak.

### Yapılanlar

- Başlıklar Inter, gövde Manrope; Tailwind ve BaseLayout aynı CSS tokenlarını kullanıyor. `font-serif` eski sınıfı Inter başlık ailesine bağlandı; yeni font dosyası eklenmedi. Kullanılmayan Playfair Google Fonts bağlantıları kaldırıldı.
- H1 içindeki italik mavi vurgular aynı düz stile bağlandı; kelimeler korundu.
- Yeni `KisaCevap.astro`, makale şablonu ve fertilite-koruma için ortak özet görünümü sağlıyor. Baş editör yazılarının “Baş editörün notu” etiketi korunuyor. Fertilite-koruma “Hızlı Özet” → “Kısa cevap”, iki eski içerik listesi etiketi → “İçindekiler”.
- Varikoselde yalnız içerik listesi başlığı değişti; eski `#bu-yazıda-öğrenecekleriniz` bağlantısı ek çapa ile korundu. Tıbbi cümleler ve frontmatter, tarih/summary dahil, aynı.
- Özet kaynakları ve fertilite-koruma içerik listesi bağlantıları en az 44 px dokunma yüksekliğine sahip. Klavye odağı görünür.

### Doğrulama

- Son `npm run build`: çıkış **0**; ardından `npm run verify:preflight`: **26/26**, çıkış **0**. Sekiz mevcut içerik uyarısı hard gate değil; bu PR tıbbi cümle eklemiyor.
- **101/101** HTML sayfasında URL/title/meta description/canonical/H1 birebir aynı (statik önce/sonra; 404 dahil).
- Kaynak koruma betiği: tüm makale frontmatter aynı; varikosel dışında makale dosyası değişikliği yok; varikoselde yalnız izin verilen liste etiketi ve eski çapa; fertilite-koruma tıbbi özet paragrafı birebir aynı.
- 390/1366 px: 4 ana hedef + varikosel/tanı süreci; yatay taşma yok, başlık Inter/gövde Manrope, özet etiketleri ve eski çapa doğru. Beta-hCG ve varikosel gövde metinleri DOM üzerinden önce/sonra aynı (yalnız içerik listesi etiketi istisnası).
- Özetin koyu lacivert etiketi ve gri metni açık zeminde AA kontrastı koruyor; kaynak/içindekiler bağlantılarında ≥44 px ve ≥2 px klavye odağı doğrulandı.
- `tmp/_design.mjs` ile 24 önce + 24 sonra görüntüsü çekildi ve 4 karşılaştırma sayfası gözle incelendi. Ana sayfada geliştirme sunucusunun yeniden yüklenmesi bazı yan kartların sırasını değiştirdi: mevcut `getPublishedArticles()` koleksiyonu sıralamadan önbelleğe alıyor. Bu PR seçim/sıralama kodunu değiştirmiyor. Teslim edilen karşılaştırmalar, bu farkı ortadan kaldırmak için eski/yeni statik build'lerden yeniden çekildi; aynı kaydırma ve yükleme koşullarında gözle incelendi. Performans aynı statik sunucuda ölçüldü.

### Mobil ölçümler

390×844, DPR 2; önbellek kapalı, 150 ms gecikme, 1,6 Mbps, CPU ×4; çerez kararı yüklemeden önce reddedilmiş; üç ölçümün medyanı. `tmp/_perf.mjs` ile aynı kısıtlama ayarları. Yerel ölçüm; canlı saha verisi değil.

| Sayfa | Yükseklik px önce → sonra | İlk paragraf px önce → sonra | LCP ms önce → sonra | CLS önce → sonra |
|---|---:|---:|---:|---:|
| / | 19795 → 19795 | 930 → 930 | 2592 → 2348 | 0.0036 → 0.0182 |
| /makaleler/beta-hcg-testi/ | 31165 → 31227 | 1235 → 1268 | 2200 → 2020 | 0.0036 → 0.0036 |
| /fertilite-koruma/ | 24290 → 24285 | 727 → 696 | 2076 → 1860 | 0.0033 → 0.0036 |
| /ilac-rehberi/ | 16050 → 16050 | 606 → 606 | 2108 → 1892 | 0.0805 → 0.0036 |

“İlk paragraf”: beta-hCG için `.prose-medical p` ilk gövde paragrafı; diğer sayfalarda ilk içerik paragrafı (hub özetleri dahil). Sayfa yükseklikleri aynı kaydırma koşullarında, video alanları yüklenerek ölçüldü; geliştirme sunucusunun kısmen yüklenen sayfa yüksekliğiyle farklı olabilir. PR-B/C hedefleri kendi PR’larında ayrıca ölçülecek. Masaüstü beta-hCG ilk gövde paragrafı 1259 → 1291 px: kaynaklara 44 px dokunma alanı eklenmesi yer kaplıyor.

### Dosyalar ve görseller

- `tailwind.config.mjs`, `src/styles/tokens.css`, `src/styles/globals.css`, `src/layouts/BaseLayout.astro`.
- `src/components/KisaCevap.astro`, `src/pages/makaleler/[...slug].astro`, `src/pages/fertilite-koruma.astro`, `src/content/articles/varikosel-nedir-ne-zaman-ameliyat-gerekir.mdx`.
- Görseller: [ana sayfa](tasarim-tur-2-a/ana-sayfa-once-sonra.webp), [beta-hCG](tasarim-tur-2-a/beta-hcg-once-sonra.webp), [fertilite-koruma](tasarim-tur-2-a/fertilite-koruma-once-sonra.webp), [ilaç rehberi](tasarim-tur-2-a/ilac-rehberi-once-sonra.webp); ek son durum: [varikosel](tasarim-tur-2-a/varikosel-sonra.webp), [tanı süreci](tasarim-tur-2-a/tani-sonra.webp).
- Kanıtlar: `output/playwright/tasarim-tur-2/{before-a,after-a}/{qa.json,perf.json}` ve `freeze-before-a.json`; build/preflight logları `tmp/_design-round2-*.log`.

**Durum:** Dr. Aksoy’un bu PR’a özel “onay”ıyla [PR #208](https://github.com/senaiaksoy/tupbebek/pull/208) 27 Eylül 2026 06:42:34 UTC’de birleşti (`b391d20d2e8d924452e5c56118fa190ad1160514`). Cloudflare production `tupbebek` / `16db12ce-b12c-4b41-bb02-a2e51da7b832`, güncel check-run `108568699806` 06:46:18 UTC’de completed/success. Benzersiz `?c=` ve no-cache curl ile 6/6 hedefte Inter/Manrope, Kısa cevap/İçindekiler etiketleri, eski varikosel çapası ve URL/title/meta/canonical/H1 koruması canlıda doğrulandı. Kanıt: `output/playwright/tasarim-tur-2/live-a/{check-runs,verification}.json`.


## PR-B — Makale üstünü sadeleştirme

Dal: `codex/tasarim-tur-2-b`; temel: PR-A merge commit `b391d20d`.

- Künye iki bilgi satırında gruplanır: yazar/unvan ve inceleme/tarihler. Tam unvanlar, yeterlilikler ve kurum adları 390 px’te sarılır; iki fiziksel satıra zorlanarak kesilmez. Yazar ve YouTube bağlantıları ≥44 px.
- Kanıt derecesi künyede küçük AA kontrastlı rozet. Mevcut açıklama metni sayfa sonunda açık biçimde korunur; tıbbi sorumluluk reddi ve güncelleme tarihi görünür.
- Hero 390 px’te 128 px, küçük tabletlerde 176 px; masaüstünde mevcut 16:9 oranı. Figure/figcaption/alt/srcset korunur.
- 32 yayımlanmış makalenin mevcut manuel İçindekiler listesi build sırasında details içine alınır; mobil kapalı, ≥1024 px masaüstü açık. Mevcut başlık, metin, bağlantı ve ID’ler aynıdır. Üretilen mobil/masaüstü içerik listelerinin mevcut davranışı sürer.
- 101/101 sayfada URL/title/meta description/canonical/H1 değişmedi. 63/63 makalede tıbbi gövde metni, bölüm ID’leri, JSON-LD ve hero alt/açıklamaları aynı; frontmatter ve summary kaynaklarına dokunulmadı.

### Doğrulama ve ölçümler

Build çıkışı 0, ardından preflight 26/26 çıkış 0. 390/1366 px altı hedefte yatay taşma yok. Beta-hCG mobil ilk paragraf **1133 px**: 390×844 için 1266 px (1,5 ekran) sınırını sağlıyor. Kısa cevap üstte görünür. Uzun kaynak listesi ve gövde başındaki mevcut tıbbi bilgi kutusu nedeniyle varikosel’in ilk normal paragrafı 1676 → 1511 px; 1,5 ekran hedefi bu sayfada sağlanmıyor. Tıbbi bilgi kutusu ve metin korunuyor.

İçindekiler aç/kapa Space tuşu, ≥44 px bağlantılar, görünür odak ve bölüm hedeflerine kaydırma 390/1366 px’te doğrulandı. Dört yeni rozetin açık zemin/koyu metin paleti AA için seçildi. `tmp/_design.mjs` ile 24 son görünüm görüntüsü alındı; teslim karşılaştırmaları aynı statik eski/yeni build’lerde, yüklenmiş görsellerle çekilip gözle incelendi.

Performans: 390×844 DPR2, soğuk önbellek, 150 ms, 1,6 Mbps, CPU×4, çerez reddi önceden kayıtlı, üç ölçüm medyanı; yerel laboratuvar verisi. Küçük farklar ölçüm değişkenliği içerir.

| Sayfa | Yükseklik px önce → sonra | İlk paragraf px önce → sonra | LCP ms önce → sonra | CLS önce → sonra |
|---|---:|---:|---:|---:|
| / | 19795 → 19795 | 930 → 930 | 2344 → 2332 | 0.0183 → 0.0036 |
| /makaleler/beta-hcg-testi/ | 31227 → 30389 | 1268 → 1133 | 2020 → 1996 | 0.0036 → 0.0012 |
| /fertilite-koruma/ | 24285 → 24285 | 696 → 696 | 1888 → 1872 | 0.0046 → 0 |
| /ilac-rehberi/ | 16050 → 16050 | 606 → 606 | 1896 → 1884 | 0.0046 → 0.0046 |

### Etkilenen dosyalar ve görseller

- `astro.config.mjs`, `src/utils/rehypeArticleContents.mjs`.
- `src/components/EEATBadge.astro`, `EvidenceGradeBadge.astro`, `ArticleContentsBehavior.astro`.
- `src/pages/makaleler/[...slug].astro`; bu rapor ve karşılaştırma görselleri.
- [Ana sayfa](tasarim-tur-2-b/ana-sayfa-once-sonra.webp), [beta-hCG](tasarim-tur-2-b/beta-hcg-once-sonra.webp), [fertilite-koruma](tasarim-tur-2-b/fertilite-koruma-once-sonra.webp), [ilaç rehberi](tasarim-tur-2-b/ilac-rehberi-once-sonra.webp), [varikosel](tasarim-tur-2-b/varikosel-sonra.webp), [tanı süreci](tasarim-tur-2-b/tani-sonra.webp).
- Kanıt: `output/playwright/tasarim-tur-2-b/{before-b,after-b}/{qa,perf}.json`, `freeze-before-b.json`, `integrity.json`; `tmp/_design-round2-b-{build,preflight}.log`.

**Durum:** PR-B incelemeye hazır; PR-B’ye özel Dr. Aksoy “onay”ı gelmeden birleştirilmez. PR-C kart seçenekleri örnek ekran görüntüleriyle ayrıca sunulacak.
