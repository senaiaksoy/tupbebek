# Tasarım düzeltmeleri — 1. tur

Tarih: 27 Eylül 2026. Dal: `claude/tasarim-tur-1`. Durum: Dr. Aksoy'un birleştirme onayı bekleniyor.

## Dört düzeltme

1. HeroSearch ve `/instagram/` aramasında yerel `!pl-11` kullanıldı. Genel form CSS'i değişmedi. 390 ve 1366 px'de sol padding 12 → 44 px; ikon/metin çakışması kalktı. Header ve mobil arama ortak SearchAutocomplete modalında ikon ayrı flex öğesi: son durumda 16 px boşluk, çakışma yok.
2. Yüzen çerez düğmesi kaldırıldı. Ortak Footer'a ve Instagram'ın kendi footer'ına aynı `cookie-preferences-toggle` düğmesi taşındı. Mevcut kabul/red, banner ve Consent Mode akışı kullanılıyor. Çerez politikası konum metni güncellendi. Nosnippet doğrulaması yeni konumları denetliyor.
3. Ana sayfada “Öne Çıkan Başlıklar” ve “kapsamlı tıbbi rehberler” kullanıldı. Fertilite koruma ve PGT rozetleri “Tıbbi Rehber” oldu. Ek taramada erkek/kadın kısırlığı, hormon paneli ve rehberler sayfasındaki “Klinik Rehber” rozetleri de düzeltildi. Kaynak türü olarak “klinik rehber” ifadeleri bu kapsamın dışında.
4. Summary başındaki “Kısa cevap:” yalnızca görünür özet üretilirken, büyük/küçük harf ve boşluk toleransıyla kırpıldı. **Etkilenen 2 makale:** `beta-hcg-testi`, `kimyasal-gebelik`. Frontmatter, tıbbi gövde ve JSON-LD abstract metni aynı kaldı.

## Etkilenen uygulama dosyaları

- `src/components/HeroSearch.astro`
- `src/components/CookieConsent.astro`
- `src/components/Footer.astro`
- `src/components/home/HeroSection.astro`
- `src/components/home/QuickGuideCards.astro`
- `src/pages/cerez-politikasi.astro`
- `src/pages/fertilite-koruma.astro`
- `src/pages/pgt-merkezi.astro`
- `src/pages/erkek-infertilitesi.astro`
- `src/pages/kadin-infertilitesi.astro`
- `src/pages/hormon-paneli.astro`
- `src/pages/rehberler.astro`
- `src/pages/instagram.astro`
- `src/pages/makaleler/[...slug].astro`
- `scripts/verify-nosnippet-boilerplate.mjs`

## Doğrulama

- Son `npm run build`: **çıkış kodu 0**. Ardından `npm run verify:preflight`: **26 başarılı / 0 başarısız**, çıkış kodu 0. İçerik kalitesi kontrolünde kapsam dışı mevcut 8 uyarı var; hata yok.
- 101 HTML sayfasında önceki yerel render ile yeni build karşılaştırıldı: **URL/title/meta description/H1 değişmedi**. 100 normal sayfada canonical aynı. 404 için dev yanıtındaki istenen URL ile build canonical'ı farklı olduğundan canonical karşılaştırmasına alınmadı; 404 title/description/H1 aynı ve ilgili kaynak dosyalarında değişiklik yok.
- Çerez bileşeni bulunan **100/100 HTML sayfasında** footer içinde düğme var. Diğer HTML, bağımsız indirilebilir e-kitap belgesi; çerez bileşeni/ölçüm betiği içermiyor.
- 390/1366 px: footer düğmesi fixed değil, yüksekliği en az 44 px. Banner klavyeyle yeniden açıldı; kabul → yeniden aç → reddet kontrolünde kayıt `rejected` oldu ve odak footer düğmesine döndü. Instagram'ın kendi footer'ı da iki genişlikte tıklanarak doğrulandı.
- Prefix kontrolünde karışık/büyük harf, baştaki boşluk, tab ve iki nokta çevresindeki boşluk örnekleri geçti; cümlenin içindeki “kısa cevap:” korunuyor. İki makalenin JSON-LD abstract'ında özgün “Kısa cevap:” metni bulundu.
- `src/content/articles/` altında git farkı yok. Genel CSS ve form bileşenlerinde değişiklik yok.
- Kullanıcının `tmp/_design.mjs` betiğiyle dört sayfanın 390/1366 px önce/sonra görüntüleri alındı ve gözle karşılaştırıldı. Ek kontroller ayrı yerel Puppeteer betikleriyle yapıldı. Dev ortamında Pagefind üretim dizini servis edilmediğinden modalın arama sonuçları kapsamlı işlev testine alınmadı; bu turdaki ikon/metin geometrisi kontrol edildi.

## Önce / sonra ekran görüntüleri

Karşılaştırma sayfalarında her genişliğin önce ve sonra satırları etiketlidir. İlk dört dosya kullanıcının betiğiyle alınan 24 önce + 24 sonra ekran görüntüsünü içerir.

| Görsel | Gözlenen değişiklik |
|---|---|
| [Ana sayfa](tasarim-tur-1/ana-sayfa-once-sonra.webp) | Arama placeholder'ı ikonla örtüşmüyor; sol alt yüzen düğme kalktı; başlık ve rehber etiketi nötrleştirildi. |
| [Beta-hCG](tasarim-tur-1/beta-hcg-once-sonra.webp) | “KISA CEVAP” altında ikinci önek yok; yüzen düğme metni kapatmıyor. |
| [Fertilite koruma](tasarim-tur-1/fertilite-koruma-once-sonra.webp) | “Akademik Makale” → “Tıbbi Rehber”; yüzen düğme kalktı. |
| [İlaç rehberi](tasarim-tur-1/ilac-rehberi-once-sonra.webp) | Yüzen düğme kalktı; mevcut içerik ve düzen korunuyor. |
| [PCOS arama detayı](tasarim-tur-1/hero-search-once-sonra.webp) | Girilen “PCOS” metni ikonun sağında okunuyor. |
| [Kısa cevap detayı](tasarim-tur-1/summary-once-sonra.webp) | Önek yalnızca görüntülemede kırpıldı. |
| [Mobil footer](tasarim-tur-1/footer-mobil.webp), [masaüstü footer](tasarim-tur-1/footer-masaustu.webp) | Çerez tercihleri kalıcı alt bilgi düğmesinden erişilebilir. |
| [Yeniden açılan banner](tasarim-tur-1/cerez-banner-mobil.webp) | Footer'dan mevcut kabul/red penceresi açılıyor. |
| [Mobil arama](tasarim-tur-1/header-arama-mobil.webp), [masaüstü arama](tasarim-tur-1/header-arama-masaustu.webp) | Header/mobil modalında ikonla metin çakışması yok. |
| [Instagram footer](tasarim-tur-1/instagram-footer-mobil.webp) | Özel footer'da aynı çerez tercihleri düğmesi var. |

## Yayın durumu

Main'e commit/merge veya production deploy yapılmadı. Bu PR'a özel “onay” sonrasında birleştirme, Cloudflare check-run ve cache bypass ile canlı HTML kontrolü yapılacak. Önceki #206'nın Cloudflare check'i başarılı; ilgili canlı başlık ve kısa liste bu tur başında curl ile doğrulandı.
