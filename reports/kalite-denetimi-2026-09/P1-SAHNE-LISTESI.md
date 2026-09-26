# P1 Görsel Sahne Listesi — onay taslağı

- **Tarih:** 2026-09-26
- **Dal:** `claude/kalite-p1-sahne-listesi` (origin/main 6502182 üzerinden)
- **Durum:** Yalnızca öneri. Görsel üretilmedi, site dosyası değişmedi.

## 1. Kapsam: güncel koda göre yeniden ölçüldü

Kaynakta (`src/`) gerçekten bağlanan görseller bulanık bant tespitinden geçirildi. Adaylar gözle doğrulandı.

**A. Bulanık bantlı makale kapakları (6).** Denetimdeki 15 kapağın 5'i P0'da yenilendi, 3'ü artık hiçbir yerde kullanılmıyor. Kalan 6 dosya:

| Dosya (`public/images/makaleler/`) | Ek sorun |
|---|---|
| `hiperprolaktinemi-ve-kisirlik.webp` | **Kural ihlali:** karın üzerinde ultrason probu, hamilelik karnı ve fetal ultrason çağrışımı. P0'da gözden kaçmış. |
| `miyomlar-ve-tup-bebek.webp` | Gravür tarzı rahim çizimi; hero standardına göre illüstrasyon olmamalı |
| `endometriyal-scratching.webp` | Alt metin "tıbbi illüstrasyon" diyor, görselde kadın ve cerrah var |
| `kimyasal-gebelik.webp` | Alt metin "pencere kenarında kadın" diyor, görsel ultrason cihazı |
| `tup-bebek-sureci-rehber.webp` | Stok fotoğraf hissi (el kol hareketiyle anlatan hekim) |
| `vajinal-mikrobiyom-fiv.webp` | Alt metin "şema" diyor, görsel laboratuvar petri kabı |

**B. P0'daki tek tip görseller (5).** Aynı esmer kadın modeli, aynı sayfada art arda kullanılmış:
- `/hormon-paneli/`: `library/hastalik/dusuk-amh.webp` (hero), `rehberler/hormone-tracking.webp`, `library/hastalik/prolakktin.webp`
- `/ilac-rehberi/`: `library/tedavi/post_transfert.webp` (ayrıca `/transfer-sureci/`), `library/tedavi/intralipides.webp`

P0'un diğer 9 görseli bu turda korunuyor.

**Yanlış alarm olarak elenenler:** amenore algoritması, PCOS/PMOS, embryoglue, ERA terazisi, IVF karar ağacı, `pgt.webp`, grup destek, yaşam kalitesi, yumurta dondurma. Bunlar şema, infografik ya da tam kare görsel.

## 2. Standarda önerilen ek: çeşitlilik kuralı (onay gerekiyor)

Onaylı hero standardı (2026-05-19) şablonunda "30'larında kadın, ipek gömlek, düşünceli poz, mimari iç mekân" tarif ediliyor. Yeni görsellerin birbirine benzemesinin kaynağı bu. Önerilen ekler:

1. **Oyuncu çeşitliliği:** Aynı sayfada ya da art arda iki makalede aynı görünümde kişi olmaz. Yaş aralığı 28–60. Kadın, erkek ve çiftler yer alır. Saç ve ten çeşitliliği gözetilir; başörtülü kadınlar da dahil.
2. **Yüzsüz sahneler:** Her üretim turunun yaklaşık üçte biri yalnızca eller, nesne ya da mekân gösterir.
3. **Mekân çeşitliliği:** Lüks salon varsayılan olmaz. Eczane, kan alma odası, laboratuvar, klinik koridoru, ameliyathane hazırlığı ve gündelik ev mutfağı gibi gerçek ama editoryal çekilmiş mekânlar kullanılır.
4. **Konu çıpası:** Her görselde, konuyu 3 saniyede anlatan somut bir öğe bulunur (ör. kapaklı kan tüpü, steril kateter paketi, agar plağı).
5. **Alt metin kuralı:** Alt metin, üretilen görsele bakılarak ve görselde görünen şey anlatılarak yazılır.

Vogue düzeyi ışık, kompozisyon ve marka rengi kuralları aynen korunur.

## 3. Sahneler

Yasaklar her sahnede geçerli: bebek, hamilelik karnı, fetal ultrason, gözyaşı ya da acı, hekim portresi, görselde okunabilir yazı veya rakam, logo, bulanık bant. Kapaklar 1600×900, gövde görselleri 1200×675. Dosya adları ve URL'ler değişmez.

| # | Dosya | Nerede | Kişi | Mekân ve eylem | Konu çıpası | Renk | Taslak alt metin |
|---|---|---|---|---|---|---|---|
| 1 | `makaleler/hiperprolaktinemi-ve-kisirlik.webp` (1600×900) | Makale kapağı ve kartları | 40'larında, kısa ve kırlaşmaya başlamış saçlı kadın | Eczane tezgâhında eczacıdan küçük, etiketsiz bir ilaç kutusu alıyor; arkada düzenli raflar | Küçük ilaç kutusu (prolaktin düşürücü tedavi) | Lacivert raf ve duvar + buğday tonu | Eczane tezgâhında küçük bir ilaç kutusunu teslim alan kısa saçlı kadın |
| 2 | `makaleler/miyomlar-ve-tup-bebek.webp` (1600×900) | Makale kapağı ve kartları | Yüz yok, yalnızca eldivenli eller | Ameliyat öncesi hazırlık: steril örtü üzerine histeroskopi aletleri diziliyor | Histeroskop ve rezektoskop | Terracotta + mint steril örtü | Steril örtü üzerine histeroskopi aletlerini dizen eldivenli eller |
| 3 | `makaleler/endometriyal-scratching.webp` (1600×900) | Makale kapağı ve kartları | 30'larında bir çift; erkek gözlüklü, soru soruyor; hekim görünmüyor | Danışma masasında, karşıdaki hekime soru soran çift | Masada steril paketli ince endometrium kateteri | Lacivert + kayısı | Masada steril paketli ince bir kateter; karşısında soru soran bir çift |
| 4 | `makaleler/kimyasal-gebelik.webp` (1600×900) | Makale kapağı ve kartları | Yüz yok; bir kadının kolu ve elleri | Sabah mutfak masası; kan tahlilinden sonra kolunda pamuk bant, elinde ince belli çay bardağı | Kan alma bandı (seri hCG takibi) | Sıcak altın + fildişi | Kolunda kan tahlili bandı olan bir kadının sabah ışığında tuttuğu çay bardağı |
| 5 | `makaleler/tup-bebek-sureci-rehber.webp` (1600×900) | Makale kapağı ve kartları | 40'larında çift; sakallı erkek, dalgalı kısa saçlı kadın | Geniş pencereli klinik koridorunda yan yana, kameraya doğru yürüyorlar | Erkeğin elinde ilaç soğutma çantası | Mint + lacivert | Klinik koridorunda yan yana yürüyen çift; erkeğin elinde ilaç soğutma çantası |
| 6 | `makaleler/vajinal-mikrobiyom-fiv.webp` (1600×900) | Makale kapağı ve kartları | 50'lerinde, gri saçlı kadın mikrobiyolog | Mikrobiyoloji laboratuvarında agar plaklarındaki kolonileri ışığa tutarak inceliyor | Agar plakları, inkübatör | Mint + lacivert | Mikrobiyoloji laboratuvarında agar plağındaki kolonileri inceleyen gri saçlı mikrobiyolog |
| 7 | `library/hastalik/dusuk-amh.webp` (1600×900; ana obje ortada, 4:5 kırpmaya dayanıklı) | `/hormon-paneli/` hero | Yüz yok, eldivenli eller | Farklı renk kapaklı kan tüpleri rafa diziliyor | Kan tüpü rafı (hormon paneli) | Lacivert | Farklı renk kapaklı kan tüplerini rafa dizen eldivenli eller |
| 8 | `rehberler/hormone-tracking.webp` (1200×675) | `/hormon-paneli/` FSH bölümü, `/rehberler/` kartı | 30'larında, saçları kazınmış erkek laborant | Otomatik hormon analiz cihazına tüp rafını yerleştiriyor | İmmünoassay analiz cihazı | Mint | Hormon analiz cihazına kan tüplerini yerleştiren laborant |
| 9 | `library/hastalik/prolakktin.webp` (1200×675) | `/hormon-paneli/` prolaktin ve TSH bölümü | 30'larında başörtülü kadın | Kan alma öncesi bekleme alanında sakin biçimde dinleniyor; paltosu yanında | Sabah dinlenmiş halde test (prolaktin) | Kayısı | Kan alma öncesi bekleme alanında sakin biçimde dinlenen başörtülü kadın |
| 10 | `library/tedavi/post_transfert.webp` (1200×675) | `/ilac-rehberi/` progesteron bölümü, `/transfer-sureci/` | Kişi yok, nesne sahnesi | Ev tezgâhında haftalık ilaç düzenleyici ve bir bardak su; sabah ışığı | Haftalık ilaç düzenleyici (luteal destek) | Terracotta | Ev tezgâhında haftalık ilaç düzenleyici ve bir bardak su |
| 11 | `library/tedavi/intralipides.webp` (1200×675) | `/ilac-rehberi/` enjeksiyon teknikleri bölümü | Yüz yok; bir erkeğin elleri, partnerine yardım ediyor | Tezgâhta kapaklı enjeksiyon kalemi ve alkollü pamuk hazırlanıyor | Enjeksiyon kalemi | Mint | Kapaklı enjeksiyon kalemini ve alkollü pamuğu hazırlayan eller |

**Çeşitlilik kontrolü**
- **Yüzü görünen kişiler (5 sahne, hepsi farklı):** kısa saçlı 40'larında kadın, gözlüklü erkek ve partneri, sakallı erkek ve kadın, gri saçlı 50'lerinde kadın, başörtülü kadın.
- **Yüz yok (5 sahne):** eller ya da nesne. Kazınmış saçlı erkek laborant ayrıca var.
- **Hormon paneli sayfası:** üç görsel üç farklı sahne (tüpler, analiz cihazı, bekleyen kadın) ve üç farklı renk.
- **İlaç rehberi sayfası:** nesne sahnesi ve eller; iki farklı renk.

## 4. Ek P1 işi: sistematik alt metin denetimi

6 kapağın 4'ünde alt metin görseli anlatmıyor, P0'da da iki örneği vardı. Önerim: sitedeki tüm içerik görsellerinin alt metnini görsele bakarak tek tek karşılaştırmak ve uyumsuzları düzeltmek. Görsel üretimi gerektirmez; ayrı bir PR olur.

## 5. Onay sonrası iş akışı

1. Onaylanan çeşitlilik ekini `hero-image-spec` hafıza dosyasına işle.
2. Her sahneyi üret, ardından gözle kontrol et: yasaklar, konu çıpası, kişi tekrarı yok.
3. Alt metni görsele bakarak son haline getir.
4. Aynı dosya adıyla değiştir, width ve height değerlerini güncelle, build al, önce/sonra ekran görüntülerini karşılaştır.
5. PR aç. Deploy yalnızca onayla ve `npm run deploy` ile yapılır. Ardından CDN'de değişen dosyaları temizle.
