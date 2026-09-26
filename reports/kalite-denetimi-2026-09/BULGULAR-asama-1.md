# Site Kalite Denetimi — Aşama 0–1 Bulguları

- **Tarih:** 2026-09-25
- **Kapsam:** `dist/` (2026-09-25 18:53 build'i, canlıyla eşdeğer) içindeki 99 sayfa. Her sayfa masaüstü ve mobilde tam sayfa çekildi. 177 içerik görseli tek tek gözle incelendi. Metin, şema ve menü taramaları betiklerle yapıldı.
- **Tetikleyen:** Hakan Köyağası'nın 2026-09-25 tarihli WhatsApp eleştirisi. Başlıca iddiaları: "ilgisiz AI görseller", "jargon", "çalışıyorsa kurcalama".
- **Durum:** Yalnızca tespit yapıldı. Hiçbir dosya değiştirilmedi.

## P0 — Güveni yıkan / kurala aykırı

| # | Bulgu | Nerede | Kanıt |
|---|---|---|---|
| 1 | **Anime karakter görseli** ("FSH takibi" alt metniyle) | `/hormon-paneli/`, `/rehberler/` | `public/images/rehberler/hormone-tracking.webp` |
| 2 | **Makale kapağı olarak YouTube küçük resmi** (hekim yüzü ve "DÜŞÜK AMH ile Hamile Kalınır mı?" yazısı, bulanık bantlı). Alt metin gerçeği yansıtmıyor ("oturma odasında kadın… bilgi notunu okuyor"). Figcaption'da "AI destekli görsel" yazıyor. | 8 sayfa: `/makaleler/` listesi, `/instagram/`, ilgili makale kartları | `public/images/makaleler/dusuk-amh-hamilelik.webp` (2026-05-20'den beri yayında) |
| 3 | Aynı YouTube küçük resmi, gri tonlamalı ve kare kırpılmış olarak **hub hero'su** | `/hormon-paneli/` | `public/images/library/hastalik/dusuk-amh.webp` |
| 4 | **Bebek görseli (baby-free ihlali).** Yenidoğan ayakları kapak olarak kullanılıyor; alt metin "sıcak ahşap zeminde sakin oturuş" diyor. | 5 sayfa | `public/images/makaleler/embriyo-transferi-sonrasi-bakim.webp` |
| 5 | Bebek görseli (yenidoğan ayakları, alt metni "Progesteron desteği") | `/ilac-rehberi/` | `library/tedavi/post_transfert.webp` |
| 6 | Bebek yüzü fotoğrafı (alt metni "PGT genetik analiz") | `/pgt-merkezi/` | `library/embriyo/pgt.webp` |
| 7 | **Stres tetikleyici görseller:** acı içinde karnını tutan kadın; kasığını tutan adam; başını elleri arasına almış adam (ana sayfada) | `/hormon-paneli/`, `/erkek-infertilitesi/`, `/` | `library/hastalik/prolakktin.webp`, `library/hastalik/varikosel.webp`, `home/erkek-infertilitesi.webp` |
| 8 | **Konu dışı kapaklar:** çıplak gövdeli vücut geliştirici (erkek besin takviyeleri); dikiş diken kadın (miyom ameliyatı); bal kaşığı (PGT cinsiyet seçimi); avuçta yumurta (IUI); "YOU" yazılı rahim (taze/dondurulmuş transfer); fantastik tablo (yas); "ÖNERİLMEZ" yazılı kupalı terazi (ilaç rehberi) | ilgili makaleler ve kartları | `makaleler/erkek-dogurganlik-besin-takviyeleri.webp`, `miyom-ameliyati.webp`, `pgt-cinsiyet-secimi.webp`, `iui-nedir.webp`, `taze-dondurulmus-transfer.webp`, `library/psikoloji/yas-iyilesmeler.webp`, `library/tedavi/intralipides.webp` |
| 9 | **Ana sayfada doğrulanamayan iddialar:** "100+ bilimsel makale" (gerçekte 63); "30+ Yıl klinik tecrübe" (bağımsız portalde klinik tanıtım); "Tıbbi Danışma Kurulu onayından geçer" (editoryal standart: Editöryal Ekip) | `/` | `src/components/home/Methodology.astro:8,14,18` |
| 10 | **Menüde kaynaksız istatistikler:** "40-50% IVF başarısı", "%30-40 cerrahi sonrası doğal gebelik", "%25↑ yaşam tarzı ile başarı" | tüm sayfalar (mega menü) | `src/data/navigation.ts:78,114,146` |
| 11 | **Künye tutarsızlığı:** 63 makalenin 22'sinde `medicalReviewer` standart dışı. Dağılım: 11 "Doç. Dr. Senai Aksoy", 9 "… & Tıbbi Danışma Kurulu", 1 "Tıbbi Danışma Kurulu", 1 "Üroloji ve Androloji Danışma Kurulu". `reviewerTitle` 8 farklı değer alıyor. Var olmayan bir kurul adı E-E-A-T riski yaratır. | 22 makale | `src/content/articles/*.mdx` frontmatter |

## P1 — Kafa karıştıran / demode görünüm

| # | Bulgu | Nerede |
|---|---|---|
| 12 | **Bulanık bantlı (letterbox) kapaklar:** yatay görsel 16:9'a bulanık üst ve alt bantla uzatılmış. `/makaleler/` listesindeki "demode" görünümün ana kaynağı. 15 kapak gözle doğrulandı (26 aday tespit edildi). | makale kapakları |
| 13 | **Monoton jenerik sahne:** 40'tan fazla "pencere kenarında bej giyimli, kâğıt okuyan kadın" görseli. Sitenin "AI stok" hissi buradan geliyor. | makale gövdeleri ve kapaklar |
| 14 | Ana sayfa hero görselinin içine gömülü slogan: "Her hikâye farklı. Ama umut, her zaman mümkün." Pazarlama dili ve görsel içinde metin. | `/` (6 sayfada kullanılıyor), `library/istatistik/yas_gebelikorani_ivf.webp` |
| 15 | **Breadcrumb URL'den üretilmiş:** Türkçe karakter yok, "Ve" büyük harfle yazılıyor ("Hidrosalpinx Ve Kisirlik", "Iletisim", "Bas Editor Kosesi", "Opk Ve Ivf"). Hem ekranda hem BreadcrumbList şemasında. | 16 sayfa |
| 16 | Çift breadcrumb | `/bas-editor-kosesi/`, `/makaleler/` |
| 17 | **Menü:** 66 bağlantı, 57 hedef, 9 çift hedef. Örneğin "Erkek Besin Takviyeleri" ile "Erkek Doğurganlık Besinleri" aynı URL'e gidiyor. Yanlış gruplama var ("Kanun, Maliyet" altında Hakkımızda ve Editöryal Politika). Jargon etiketler: "İnfertilite 101", "İmzalı Perspektif". | `src/data/navigation.ts` |
| 18 | **Ana sayfa aşırı uzun:** masaüstünde 13.100 px ve 11 bölüm. 4 ayrı "nereden başlamalı" modülü var (Rehberler, Durumunuza Göre, Yol Haritası, Temel Okuma Yolu). | `/` |
| 19 | **Makale üstü kalabalık:** başlıktan sonra özet kutusu, YouTube thumbnail kapağı, video, "Hızlı Bakış", bağlam kutusu geliyor. İlk H2'ye masaüstünde yaklaşık 1.600 px sonra ulaşılıyor. | makale şablonu |
| 20 | İngilizce alt metinler: "Clinical Review", "Consultation", "Medical Texture", "Medical Diagnosis Illustration" | `/hakkimizda/`, `/tani-sureci/` |
| 21 | Aynı implantasyon şeması iki ayrı dosya olarak iki sayfada | `_astro/schema_implantation…png`, `library/embriyo/schema_implantation.webp` |
| 22 | Kodda yapay zekâ düşünce kalıntısı: `// Wait, let's fix object properties` | `src/data/navigation.ts:379` |

## P2 — Cila / doğrulanacak

| # | Bulgu |
|---|---|
| 23 | `/fertilite-koruma/` sayfasında iki kez "en iyi sonuçları veriyor" geçiyor. Üstünlük iddiası tonunda, ifade yumuşatılmalı. |
| 24 | 20 tıbbi hub sayfasında içerik içi sorumluluk reddi yok; yalnızca footer'da var. CLAUDE.md "her tıbbi içerik sayfasında" diyor. |
| 25 | Görsel kalitesi: 512 px görseller geniş panellerde kullanılıyor (ör. ana sayfadaki `tedavi-yontemleri/clinical-lab.webp`). |

## Yanlış alarm olarak elenenler
- Ana sayfada "boş" görünen kart görselleri: ekran görüntüsü betiğinin lazy-load artefaktı. Canlı önizlemede 6 görselin 6'sı yükleniyor.
- "garanti" (41) ve "mucize" (28) eşleşmeleri: neredeyse tamamı olumsuz kullanım ("garanti değildir") ya da soru başlığı ("Mucize mi, Deneysel Umut mu?").
- JS hatası, kırık görsel, H1 sayısı: 99 sayfada sorun yok.

## Henüz yapılmayanlar
- **Search Console başlangıç kaydı:** Kimlik bilgisi dosyalarına erişim güvenlik filtresi tarafından engellendi. Dr. Aksoy'un karar vermesi gerekiyor (bkz. sohbet).
- **Tıbbi doğruluk denetimi:** Statik sayfalardaki yüzdelerin (55 sayfa) kaynakla karşılaştırılması ayrı bir iş.
- **Mobil görsel tur, dış göz testleri (Hakan'ın listesi, okur testi), Codex çapraz kontrolü:** Aşama 1C.

## Ham veri (yerel, repoda değil)
Ekran görüntüleri, `pages.json`, `image-index.tsv` ve temas sayfaları oturum scratchpad'inde duruyor. Tekrar üretmek için `tmp/_shoot.mjs`, `tmp/_sheets.mjs`, `tmp/_letterbox.mjs` ve `tmp/_textscan.mjs` kullanılabilir.
