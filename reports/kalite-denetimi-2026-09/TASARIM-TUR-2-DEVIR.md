# Tasarım Turu 2 — Devir Notu

Hazırlanma: 27 Eylül 2026
Önceki tur: [PR #207](https://github.com/senaiaksoy/tupbebek/pull/207). Canlıda; rapor `TASARIM-TUR-1.md`.
Genel devir: `DEVIR-NOTU-2026-09-27.md` (önce onu oku).

> **Durum (27 Eylül 2026, 09:32 UTC): TAMAMLANDI.** Bu devir, Dr. Aksoy'un erken başlama kararıyla aynı gün uygulandı. Üç PR da canlıda:
> - PR-A: [#208](https://github.com/senaiaksoy/tupbebek/pull/208). Başlık fontu olarak Playfair yerine **Inter** seçildi.
> - PR-B: [#209](https://github.com/senaiaksoy/tupbebek/pull/209)
> - PR-C: [#210](https://github.com/senaiaksoy/tupbebek/pull/210). Kart fotoğrafları korundu (seçenek 3). Mobil ana sayfa 19.795 px'ten 11.906 px'e indi.
>
> Sonuçlar ve kanıtlar `TASARIM-TUR-2.md` dosyasında. Aşağıdaki metin, uygulama öncesindeki brief olarak arşivde tutuluyor.

## 0. Başlama kapısı — ÖNCE BUNU KONTROL ET

Bu turdaki değişiklikler sayfaların **ilk ekranını** değiştirir. Bu yüzden kalite düzeltmelerinin GSC etkisini ölçmeden başlatılmaması önerildi. Ölçüm, 2026-11-10 civarında aynı filtreyle alınacak dışa aktarımla yapılacak.

- **Bugün 2026-11-10'dan önceyse:** Kod yazma. Dr. Aksoy'a iki seçenek sun:
  - (a) ölçümü bekle,
  - (b) şimdi başla ve ölçümün karışacağını kabul et.

  Açık karar gelmeden ilerleme.
- **GSC yeniden ölçümü yapıldıysa:** Sonucu `GSC-BASELINE-2026-09-26.md` ile karşılaştırılmış olarak gör, sonra başla.

## 1. Kesin sınırlar

- **Metinlerin yazısı değişmez.** URL, `<title>`, meta description ve H1 metni aynı kalır. Stil değişikliği serbesttir; metin değişikliği değildir.
- **Tıbbi içerik korunur.** Makale gövdesindeki tıbbi metin ve frontmatter `summary` verisi değişmez.
- **Görsel bilgi eksiltilmez.** Künye, kanıt derecesi, tıbbi sorumluluk reddi ve son güncelleme tarihi görünür kalmalı. Konumları ve biçimleri değişebilir ama kaybolamazlar (yönetmelik ve E-E-A-T gereği).
- **Bağımsızlık kuralları geçerli.** Klinik CTA, fiyat, "en iyi/garanti" ifadeleri ve bebek görseli yasak.
- **Terim kararı geçerli.** Gezinme ve başlıklarda "kısırlık" kullanılır.
- **Çalışma biçimi:**
  - Her PR ayrı dalda açılır.
  - Her birleştirme için Dr. Aksoy'un o PR'a özel "onay"ı gerekir. Main'e merge, Cloudflare üzerinden otomatik production deploy demektir.
  - Commit sonu: `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`
  - PR metni sonu: `🤖 Generated with [Claude Code](https://claude.com/claude-code)`

## 2. İş paketleri

Üç ayrı PR önerilir. Sıra önemlidir: A, B'nin temelini oluşturur.

### PR-A — Tipografi ve özet kutusu birliği

**Sorun 1: Başlık fontu sayfadan sayfaya değişiyor.** Kök neden bulundu:

- `tailwind.config.*:111` → `fontFamily.headline = Inter`
- `src/styles/tokens.css:116` → `--font-headline: "Playfair Display"`

Aynı isim iki ayrı font anlamına geliyor. Sonuç:

- Makaleler H1'de `font-serif` kullanıyor ve Playfair görünüyor (`src/pages/makaleler/[...slug].astro:136`).
- Hub'lar `font-headline` kullanıyor ve Inter görünüyor. Örnek: `fertilite-koruma.astro:174`. 33 hub/sayfa bu sınıfı kullanıyor.
- `tani-sureci.astro` ikisini de kullanmıyor.

Gövde fontu da karışık:

- Hesaplanan değer `Manrope`.
- Tailwind `body` ayarı `Inter`.
- CLAUDE.md "Inter + Manrope" diyor.

**Yapılacak:**
- Tek bir başlık ailesi seç. Öneri: Playfair Display. Ana sayfa ve makaleler zaten bunu kullanıyor.
- Tailwind ile tokens.css'i aynı kaynağa bağla.
- Hub H1'lerindeki italik mavi vurgu kelimesini (ör. "*Seçenekler*") ya kaldır ya tek bir stile bağla.
- Karar Dr. Aksoy'a iki ekran görüntüsüyle sunulur.

**Sorun 2: Aynı işi gören kutu farklı adlar taşıyor.** Makalelerde "Kısa cevap", fertilite-koruma'da "Hızlı Özet" ve "Bu yazıda öğrenecekleriniz", varikosel makalesinde "Bu yazıda öğrenecekleriniz" kullanılıyor.

**Yapılacak:**
- Ortak bir bileşen kur (ör. `src/components/KisaCevap.astro`, makaledeki `[...slug].astro:157-162` görünümüyle aynı).
- Adlar: özet için "Kısa cevap", içerik listesi için "İçindekiler".
- Kutu içindeki metin değişmez; yalnızca başlık etiketi ve görünüm değişir.

### PR-B — Makale üstünü sadeleştirme

**Ölçüm (390 px telefonda):**
- beta-hCG sayfası 31.100 px uzunluğunda.
- İlk gövde paragrafından önce sırasıyla şunlar geliyor: künye (4–5 satır küçük yazı), Kısa cevap, kanıt kartı, büyük hero görseli ve 11+ maddelik içindekiler.

**Hedef:** Telefonda "Kısa cevap" ve ilk gövde paragrafı ilk 1,5 ekran içinde görünmeli.

**Yapılacaklar:**
- **Künye:** 2 satıra indir. Yazar · unvan tek satır; inceleme · tarih tek satır.
- **Kanıt derecesi:** Künyenin yanına küçük bir rozet olarak taşı. Ayrı kart kalmasın, ama görünür kalsın.
- **Hero görseli:** Telefonda ya küçült ya ilk paragraftan sonraya al. `figure`/`figcaption` ve alt metin korunur.
- **İçindekiler:** Telefonda `<details>` içinde kapalı başlasın; masaüstünde açık kalsın.

**Ölç ve PR'a yaz:** Önce/sonra için "sayfa üstünden ilk gövde paragrafına" px mesafesi, LCP ve CLS (`tmp/_perf.mjs`). LCP kötüleşmemeli.

### PR-C — Ana sayfa, kart görselleri ve masaüstü menü

**Ana sayfa:**
- Telefonda sayfa 19.700 px. Sıra: `Hero` → `QuickGuideCards` → `ArticleGrid` → `SymptomGuide` → `ExpertBoard` → `Methodology` → `PreferredSourceCTA` (`src/pages/index.astro`).
- Hero'daki 4 güven etiketi telefonda alt alta 4 satır tutuyor (`src/components/home/Hero.astro:9-21`). Tek satırlık kompakt şerit yap veya ikiye indir.
- `ExpertBoard` ile `Methodology` aynı mesajı veriyor; birleştirmeyi öner.
- **Hedef:** Telefonda ≤ 12.000 px.

**Kart görselleri (`QuickGuideCards`):**
- Görseller lüks iç mekân / manken tipi yapay zekâ fotoğrafları. Örnek: "Erkeklerde Kısırlık" kartında otel lobisinde bir erkek.
- Seçenekler:
  - (1) görselsiz kart, ikon + metin;
  - (2) sade tıbbi çizim;
  - (3) mevcut hali koru.
- **Bu bir içerik kararı.** Dr. Aksoy'a örnek ekran görüntüleriyle sun, karar gelmeden uygulama.
- Görsel kalırsa "Yapay zekâ ile üretilmiş temsili görsel" notu tutarlı kalmalı. Hero görsel kuralları için hafızadaki `hero-image-spec` / `body-image-spec` kayıtlarına bak.

**Masaüstü menü:**
- 1366 px'te 6 menü başlığının çoğu iki satıra bölünüyor ("Kısırlık / Rehberi").
- Etiketleri değiştirmeden aralık, `whitespace-nowrap` veya ikonsuz ok ile tek satıra sığdır.
- 1280 ve 1440 px'te de kontrol et.

## 3. Doğrulama (her PR için)

- **Build ve preflight:** `npm run build` çıkış kodu 0 olmalı, ardından `npm run verify:preflight`. Preflight eski `dist` ile yanlışlıkla geçebilir.
- **Ekran görüntüleri:** `tmp/_design.mjs`, dev sunucusu localhost:4399'da çalışırken `node tmp/_design.mjs <klasör> </dev/null` komutuyla ana sayfa, beta-hCG, fertilite-koruma ve ilaç rehberini 390 ve 1366 px'te çeker.
  - Tur 1'de kullanılan Playwright doğrulama düzeni: `output/playwright/tasarim-tur-1/`.
  - Tarayıcı panelinin mobil emülasyonu bu makinede bozuk görüntü veriyor; betik kullan.
- **Değişmezlik kontrolü:** 101 sayfada URL, title, meta description ve H1 metni önce/sonra karşılaştırılır (tur 1'deki yöntem, `TASARIM-TUR-1.md`).
- **Erişilebilirlik:** Dokunma alanları ≥ 44 px, odak halkası görünür, kontrast WCAG AA.
- **Canlı kontrol:** Birleştirmeden sonra Cloudflare check-run tamamlanınca `curl` + `?c=$RANDOM` ile yapılır. tupbebek.com tarayıcı araçlarında engelli.

## 4. Teslim

- Her PR'ın metninde şunlar yer alır: önce/sonra ekran görüntüleri, ölçümler (sayfa yüksekliği, ilk paragraf mesafesi, LCP/CLS) ve "URL/title/meta/H1 değişmedi" teyidi.
- Rapor: `reports/kalite-denetimi-2026-09/TASARIM-TUR-2.md`.
- Sonuç, `DEVIR-NOTU-2026-09-27.md` sonuna ve hafızadaki `quality-audit-2026-09` kaydına birer satır olarak eklenir.
