# Erişilebilirlik — Dokunma alanları, 27 Eylül 2026

Kullanıcı “devam” dedi; [denetim raporundaki](ERISILEBILIRLIK-KALAN-BULGULAR-2026-09-27.md) ilk teknik paket uygulandı. Temel commit `a7a0e25a`; dal `codex/erisilebilirlik-hedef-alanlari`. Birleştirme için bu PR’a özel onay beklenir.

## Değişiklikler

1. `src/components/ReferenceList.astro`: PubMed/DOI/Kaynak bağlantılarına minimum 44×44 px alan ve görünür 2 px odak çizgisi eklendi. Link metinleri, kaynak türleri, bibliyografya, URL ve sıra aynı.
2. `src/pages/ilac-rehberi.astro`: beş hızlı gezinme bağlantısının minimum yüksekliği 44 px; yatay kaydırma ve mevcut bölüm çapaları korunur. Metin, bölüm ID’si veya JavaScript değiştirilmedi.
3. `src/pages/e-kitap-indir.astro`: SSS kartının padding’i summary’ye taşındı. Açılan cevabın padding’i ve başlık altındaki aralık düzenlenerek mevcut açık/kapalı kart ölçüleri korundu. Kartın başlık çevresindeki iç boşluğuna tıklama artık açar. Space aç/kapa ve 2 px odak çizgisi çalışır. Dört soru ve cevap aynı.

Başlık semantiği ve 10–11 px yazılar sonraki paketlerde değerlendirilecek; bu PR’ın uygulama kapsamı yalnız yukarıdaki üç bölgedir. Genel CSS kuralı değiştirilmedi.

## Doğrulama

- `npm run build` **çıkış 0**, ardından `npm run verify:preflight` **26/26, çıkış 0**. Loglar `tmp/_hedef-alanlari-{build,preflight}.log`.
- 101/101 HTML’de **URL/title/meta description/canonical/H1 aynı**. Tüm mevcut paragraf/başlık/summary metinleri, bağlantı metinleri ve hedefleri, img src/alt/boyutları, JSON-LD, bölüm ID’leri ve `.prose-medical` HTML gövdesi aynı. 63 makale kaynak dosyası/frontmatter/summary değişmedi.
- 78 sayfadaki **998 kaynak bağlantısı** 390 px’te en az 44×44 px ölçüldü. Birbirini izleyen beş örnek sayfa 1366 px’te de kontrol edildi.
- Ana sayfa, beta-hCG, fertilite-koruma, ilaç rehberi, varikosel, tanı süreci, e-kitap indirme: 390×844 ve 1366×900 px, toplam 14 önce + 14 sonra görünüm. Yatay sayfa taşması yok.
- Kaynak/hızlı gezinme/summary klavye odağı en az 2 px solid. İlaç rehberinde son gezinme bağlantısı Enter ile `#enjeksiyon` hedefini açıyor; hedef başlığı sabit gezinme çubuğunun altında görünür.
- E-kitap summary’nin iç boşluğuna tıklama ile açma ve Space ile aç/kapa iki genişlikte geçti. İletişim veya e-kitap formu gönderilmedi.

### Alan boyutları

| Bölge | Önce | Sonra |
|---|---:|---:|
| Kaynak bağlantıları | 24 px yükseklik | En az 44×44 px |
| İlaç rehberi beş bölüm bağlantısı | 36 px yükseklik | 44 px yükseklik |
| E-kitap ilk üç soru, mobil | 26,4 px | 74,4 px |
| E-kitap dördüncü soru, mobil | 52,8 px | 100,8 px |
| E-kitap dört soru, masaüstü | 26,4 px | 74,4 px |

E-kitapta kartın toplam boyutu büyümedi; önceden tıklanamayan iç boşluk summary’nin parçası oldu. Kapalı sayfa yüksekliği mobil 5712 px, masaüstü 2962 px; ilk soru açıkken 5803/3028 px. Önce/sonra aynı.

### Sayfa yüksekliği etkisi

Kaynak bölümündeki alanlar büyüdüğü için kaynak listesinin uzunluğu artar. İlk içerik paragrafının konumu bütün örneklerde aynı; makale üstüne ek blok konmadı. “İlk paragraf” makalelerde `.prose-medical p`, diğerlerinde ilk görünür `main p` ile ölçülür; önceki raporların farklı hub paragraf seçicileriyle karıştırılmamalı.

| Sayfa | Mobil px önce → sonra | Masaüstü px önce → sonra |
|---|---:|---:|
| Ana sayfa | 11906 → 11906 | 10182 → 10182 |
| Beta-hCG | 30389 → 31089 | 19873 → 20333 |
| Fertilite-koruma | 24285 → 24465 | 16630 → 16810 |
| İlaç rehberi | 16050 → 16338 | 10159 → 10307 |
| Varikosel | 23498 → 23618 | 17510 → 17590 |
| Tanı süreci | 8704 → 8804 | 4785 → 4845 |
| E-kitap indirme | 5712 → 5712 | 2962 → 2962 |

Beta-hCG ilk gövde paragrafı 1133 px mobil / 1242 px masaüstü; önce/sonra aynı. Ana sayfanın 11906 px mobil hedefi korunur.

## Kanıtlar ve durum

Karşılaştırmalarda **sol önce, sağ sonra**. Kaynak ve SSS son görünümünde klavye odağı gösterilir. Altı karşılaştırma gözle incelendi; kaynak satırlarının dikey boşluğu artıyor, e-kitap kartlarının boyutu aynı kalıyor.

- Kaynaklar: [mobil](hedef-alanlari/mobile-references-once-sonra.webp), [masaüstü](hedef-alanlari/desktop-references-once-sonra.webp).
- İlaç gezinme: [mobil](hedef-alanlari/mobile-quick-once-sonra.webp), [masaüstü](hedef-alanlari/desktop-quick-once-sonra.webp).
- E-kitap SSS: [mobil](hedef-alanlari/mobile-faq-once-sonra.webp), [masaüstü](hedef-alanlari/desktop-faq-once-sonra.webp).
- [Ölçümler, koruma ve build/preflight özeti](hedef-alanlari/dogrulama.json).
- Ham kanıt: `output/playwright/hedef-alanlari-2026-09/{before,after}/qa.json`, `integrity.json`, `all-reference-targets.json`, `freeze.json`; tam eski build `baseline-static/`.

**Durum:** Yerel uygulama ve kontroller tamamlandı; PR’a özel Dr. Aksoy “onay”ı gelmeden merge/production deploy yapılmaz. Onay sonrası Cloudflare güncel commit check-run ve cache-bypass canlı curl ile doğrulanacak. URL/title/meta/H1 dondurması ve tıbbi metin/summary koruması devam eder.
