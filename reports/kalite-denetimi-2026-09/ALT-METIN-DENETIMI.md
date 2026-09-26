# Alt metin ve görsel denetimi — 2026-09-26

- **Kapsam:** 99 sayfa, 187 benzersiz içerik görseli, 202 görsel+alt metin çifti. Build, P1 yayınından sonraki `main` üzerinden alındı.
- **Yöntem:** Her görsel kendi alt metniyle birlikte numaralı temas sayfalarına basıldı (16 sayfa) ve tek tek gözle incelendi. Envanter ve sayfalar `.tmp/alt-audit/` altında (yerel). Betik: `tmp/_altaudit.mjs`.

## Özet

| Sınıf | Adet | Ne yapılacak |
|---|---|---|
| ✅ Uyumlu | 128 | Değişiklik yok |
| ✏️ / ⚙️ Alt metin yanlış, jenerik ya da sayfalar arasında tutarsız; görsel iyi | 26 | **Bu PR'da düzeltildi** (29 dosyada 31 düzeltme) |
| 🔁 Görsel değişmeli | 31 (+1 hero, +1 yeni dosya) | Sahne onayı bekliyor (aşağıda) |
| Emekliye ayrılacak | 1 | `library/tedavi/ivf_tedavi_sureci.webp` (onaylandı) |

## ✏️ Bu PR'da düzeltilen alt metinlerden örnekler
- **PGT-A ve PGT-M kapakları:** Alt metinler birbiriyle yer değiştirmişti. Park sahnesi PGT-M'de, masa sahnesi PGT-A'da anlatılıyordu. İkisi de doğru görsele göre yazıldı.
- **`/ilac-rehberi/`:**
  - DuoStim şeması "Gonadotropin enjeksiyonu" olarak etiketlenmişti.
  - Embriyo gelişim paneli "Tetikleme enjeksiyonu" olarak etiketlenmişti.
- **`/tedavi-yontemleri/`:** Aynı laboratuvar cihazı fotoğrafı 4 farklı tedavinin adıyla etiketlenmişti ("Endometrial Scratching", "Over PRP" vb.).
- **Tıbbi illüstrasyon denen fotoğraflar:** 5 makalede fotoğraf için "tıbbi illüstrasyon" ya da "şema" deniyordu.
- **Boş alt metin:** `duygusal-dayaniklik-gunluk-rutin.webp` görselinin alt metni boştu.
- **Yanlış kişi sayısı:** "İki kişi" veya "iki kadın" denen görsellerde tek kişi var.

## 🔁 Görseli değişmesi gerekenler

Kurallar her sahnede geçerli:
- **Standart:** hero görsel standardı ve 2026-09-26 çeşitlilik eki.
- **Yasaklar:** bebek, çocuk, hamilelik karnı, hamilelik testi, fetal ultrason, acı, hologram; görselde okunabilir yazı yok. Diyagramlar bu yasağın dışında; onlarda Türkçe etiket zorunlu.
- **Dosya adları:** Değişmez.

### Öncelik 1: Kural ihlali (11)

| # | Dosya | Nerede | Sorun | Önerilen sahne | Renk |
|---|---|---|---|---|---|
| 151 | `makaleler/over-prp-2026-kapak.jpeg` | **23 sayfa** (PRP kapağı ve ilgili kartlar) | Yatakta yatan kadının karnında ultrason probu, ekranda gri tarama | Eldivenli el, masaüstü santrifüjün önünde ayrışmış plazma (sarı katman) içeren tüpü tutuyor; yüz yok | Altın + kayısı |
| 175 | `makaleler/varikosel-nedir-ne-zaman-ameliyat-gerekir.webp` | 6 sayfa | Çıplak gövdeli, kasığını tutan erkek (ağrı) | Üroloji görüşme masasında, masadaki testis ve toplardamar modelini dinleyen, gözlüklü ve kırçıl şakaklı 40'larında erkek; hekimin yalnızca eli görünüyor | Lacivert + adaçayı |
| 111 | `makaleler/endoskopik-cerrahi-histeroskopi.webp` | 3 sayfa | Hamilelik testine gülümseyen kadın, bulanık bantlı | Ameliyathanede histeroskopi kulesi; monitörde pembe rahim iç yüzeyi, cerrahın eldivenli eli histeroskop sapında; hasta görünmüyor | Lacivert + mint |
| 30 | `library/hastalik/prolaktin.webp` | `/kadin-infertilitesi/` (hipotalamik baskılanma) | Karın ultrasonu | Sabah koşusundan sonra merdiven basamağında oturmuş, dengeli kahvaltı kâsesi yiyen 30'larında kadın | Terracotta |
| 28 | `library/hastalik/pkos-ve-ivf.webp` | `/kadin-infertilitesi/` hero | Çıplak karın ve eller, bulanık bantlı | Ultrason odasında monitörde çok sayıda folikül içeren yumurtalık görüntüsü (fetus yok); hekimin eli klavyede, hasta görünmüyor | Mint |
| 27 | `library/hastalik/opkveivf.webp` | `/beslenme-yasam/` (kilo, egzersiz, stres) | Pozitif hamilelik testi | Sabah orman patikasında tempolu yürüyen, 40'larında atletik kadın | Lacivert spor kıyafet + yeşil doğa |
| 24 | `library/hastalik/hidrosalpinks.webp` | `/aciklanamayan-infertilite/` hero | Yatakta karnını tutan kadın (ağrı) | Klinik masasında dosyasıyla sakin oturan, 30'larının sonunda çilli ve kızıl saçlı kadın; arkada ışıklı panoda HSG filmi | Kayısı |
| 23 | `library/hastalik/erkekinfertilite.webp` | `/erkek-infertilitesi/` hero | Çıplak gövdeli vücut geliştirici | Androloji laboratuvarında mikroskop ekranında sperm sayımı yapan, örgülü saçlı 40'larında kadın laborant | Lacivert + adaçayı |
| 16 | `library/embriyo/kimyasal-gebelik.webp` | `/pgt-merkezi/` (aneuploidi) | Ultrason cihazı, bulanık bantlı, konu dışı | Mikromanipülatörde trofektoderm biyopsisi yapan eldivenli eller; ekranda blastosist | Lacivert |
| 10 | `home/duygusal-destek.webp` | Ana sayfa kartı | Sarılan, üzgün çift | Akşamüstü sahil yürüyüş yolunda yan yana yürüyen iki kişi, yandan çekim | Lacivert + kayısı |
| 6 | `fertilite-koruma/oncofertility.webp` | `/fertilite-koruma/` (GnRH agonisti) | Kız çocuğuna sarılan anne (çocuk) | Günübirlik tedavi koltuğunda, saçı çok kısa kesilmiş 30'larında kadın; yanındaki tepside kapalı, önceden doldurulmuş şırınga | Buğday + kayısı |

### Öncelik 2: Bulanık bant, konu dışı ya da bağlamla uyumsuz (12 dosya ve 1 yeni dosya)

| # | Dosya | Nerede | Sorun | Önerilen sahne | Renk |
|---|---|---|---|---|---|
| 34 | `library/istatistik/yas_gebelikorani_ivf.webp` | 7 sayfa, **ana sayfa öne çıkan görseli** dahil | Görsele gömülü slogan ("Her hikâye farklı…"), hekim silueti, karnına dokunan kadın | Modern bir dairede büyük pencere önünde fincanla duran, kırçıl kıvırcık saçlı, 40'larının başında kadın | Lacivert + buğday |
| 32 | `library/istatistik/basari_oranlari_hero.webp` | `/basari-oranlari/` hero | Aynı sloganlı görsel | Lacivert masada antika kum saati ve kapalı dosya; kişi yok | Lacivert |
| 17 | `library/embriyo/pgt_sex.webp` | `/pgt-merkezi/` hero | Bal kaşığı, bulanık bantlı | Soğutma bloğunda PCR şerit tüplerine pipetle örnek aktaran eller | Lacivert + mint |
| 39 | `library/laboratuvar/microbiota.webp` | `/beslenme-yasam/`, `/genetik-testler/` | Bulanık bantlı petri kabı; iki sayfada iki farklı anlamda kullanılıyor | Beslenme için: masada yoğurt, kefir, turşu ve lifli kahvaltı; yüzsüz eller | Kayısı |
| 39b | **Yeni:** `library/laboratuvar/genetik-dizileme.webp` | `/genetik-testler/` (monogenik) | Yukarıdaki görselin ikinci kullanımı yerine | DNA dizileme cihazına kartuş yerleştiren eller | Lacivert |
| 54 | `library/tedavi/sperm_supp.webp` | `/beslenme-yasam/` hero, `/erkek-infertilitesi/` | Sperm illüstrasyonu, bulanık bantlı | Semt pazarında ceviz ve nar seçen, uzun saçını topuz yapmış 30'larında erkek | Adaçayı |
| 36 | `library/laboratuvar/dr-senai-aksoy-istanbul-ivf-laboratuvar.webp` | `/erkek-infertilitesi/`, `/pgt-merkezi/` | Bulanık bantlı petri kabı. **Dosya adında hekim adı ve "İstanbul IVF" geçiyor** (bağımsızlık kuralıyla çelişiyor). | Mikro-TESE laboratuvarında testis dokusu içeren petri kabını ters mikroskopta tarayan eller | Lacivert |
| 37 | `library/laboratuvar/embryoscop.webp` | `/basari-oranlari/`, `/pgt-merkezi/` | Bulanık bantlı | Embriyoloji laboratuvarında sıra hâlindeki inkübatörlerden birinin kapağını kapatan, gözlüklü 40'larında kadın embriyolog; geniş açı | Lacivert |
| 38 | `library/laboratuvar/icsicizim.webp` | `/erkek-infertilitesi/` (nedenler) | Konu dışı ICSI eskizi, bulanık bantlı | **Türkçe etiketli diyagram:** "Hormonal (testis öncesi)", "Testiküler", "Tıkanıklık (testis sonrası)" | Lacivert + adaçayı |
| 53 | `library/tedavi/prp.webp` | `/ilac-rehberi/` (GnRH analogları) | Bulanık bantlı, konu dışı | Küçük masada hastaya ilaç takvimini anlatan, sakallı 30'larında erkek hemşire; hastanın yalnızca elleri görünüyor | Kayısı |
| 55 | `library/tedavi/taze-donmus-transfert.webp` | `/basari-oranlari/` (IVF/ICSI/FET) | "YOU" yazısı, bulanık bantlı | Buharı tüten sıvı azot tankından kriyo kanisteri çıkaran eldivenli eller | Lacivert + mint |
| 56 | `library/tedavi/tup_bebek_muayene.webp` | `/pgt-merkezi/`, `/rehberler/` hero | El kol hareketiyle anlatan hekim, bulanık bantlı | Klinik resepsiyon bankosuna dosya uzatan, 40'larında bir çift; arkadan çekim | Mint |
| 26 | `library/hastalik/kisirlik_endometriozis.webp` | `/endometriozis-adenomyozis/` hero | Bulanık bantlı, derin dekolteli | MR odasında cihazın masasının kenarında sakin oturan, küt saçlı 30'larında kadın; teknisyenin yalnızca kolu görünüyor | Adaçayı + mint |

### Öncelik 3: Jenerik "AI stok" ya da İngilizce stok görsel (8)

| # | Dosya | Nerede | Sorun | Önerilen sahne | Renk |
|---|---|---|---|---|---|
| 5 | `fertilite-koruma/hero.webp` | `/fertilite-koruma/` hero | Stok fotoğraf gülümsemesi | Vapur güvertesinde, kışlık montuyla ve uzun örgülü saçıyla sakin duran 30'larında kadın | Buğday + kayısı |
| 9 | `hakkimizda/clinical-review.webp` | `/hakkimizda/` | Karanlık, hologramlı figür; İngilizce alt metin | Editoryal masa: basılı makaleler (yazısız), okuma gözlüğü, fosforlu kalem; kişi yok | Lacivert |
| 13 | `home/kadin-infertilitesi.webp` | Ana sayfa kartı | Işık balonu içinde kadın | Botanik serada yürüyen, 30'larının sonunda kıvırcık saçlı kadın | Mint |
| 14 | `home/tani-sureci.webp` | Ana sayfa kartı | Hologram ekran | Aydınlık bekleme alanında form dolduran erkek ve yanında iki kahve tutan kadın | Mint + lacivert |
| 15 | `home/tedavi-yontemleri.webp` | Ana sayfa kartı | Hologramlı görüşme | ICSI mikroskobu başında, başörtüsü ve laboratuvar bonesiyle çalışan kadın embriyolog | Lacivert |
| 182 | `tani-sureci/abstract-cells.webp` | `/tani-sureci/` (erkek değerlendirmesi) | Soyut dalga çizgisi; İngilizce alt metin | Mikroskop tablasında sperm sayma kamarası; yakın çekim, eldivenli el | Adaçayı |
| 183 | `tani-sureci/consultation.webp` | `/tani-sureci/` (ilk görüşme) | Takım elbiseli iş insanı; İngilizce alt metin | Danışma masasında 30'larında bir çift; kadın telefonuna not alıyor, hekim görünmüyor | Kayısı |
| 184 | `tani-sureci/dna-cells.webp` | `/tani-sureci/` hero | Hologram el; İngilizce alt metin | Sabah ışığında boş ve düzenli bir tanı odası: ultrason cihazı ve muayene koltuğu | Adaçayı |

### Önceden onaylanan hero
- `/ilac-rehberi/` hero (seçenek A): Hastane eczanesinde ilaç soğutma dolabını açan, kıvırcık siyah saçları topuzlu 20'lerinin sonunda kadın eczacı. Renk lacivert.
  - Yeni dosya: `library/tedavi/ilac-rehberi-hero.webp`.
  - Hero'dan `grayscale opacity-80` kaldırılır.
  - `ivf_tedavi_sureci.webp` silinir.

**Toplam:** 33 görsel, yaklaşık 91 kredi (33 × 2,75). Yeniden deneme olursa en fazla ~110 kredi.

## Karar gerektiren ek konular
1. **Gri hero filtresi:** 9 hub hero'sunda hâlâ `grayscale opacity-80` var. Bunların 8'i yukarıdaki listede zaten değişiyor. Tutarlılık için filtreyi 10 hero'nun hepsinden kaldırmayı öneriyorum; `/yas-ve-fertilite/` mevcut görseliyle renkli kalır.
2. **`dr-senai-aksoy-istanbul-ivf-laboratuvar.webp`:** Dosya adı bağımsızlık ilkesiyle çelişiyor ve görsel URL'sinde görünüyor. Yeni görsel `library/laboratuvar/mikro-tese-laboratuvar.webp` adıyla kaydedilsin, iki sayfadaki referans güncellensin, eski dosya silinsin. Görsel URL'leri sıralanan sayfa olmadığı için SEO riski düşük.
3. **Telif riski:** `library/laboratuvar/oocytes-prior-to-a-f-and-k-and-after-insemination.webp` bir bilimsel yayından alınmış gibi görünüyor (A–O harfli panel, İngilizce gün etiketleri). Kaynağı ve lisansı doğrulanamazsa değiştirilmeli.
4. **Üretim sırası:** Tek tur mu (33 görsel), yoksa önce Öncelik 1 ile hero (12 görsel), sonra geri kalan mı?

## Onay ve uygulama kaydı

- **2026-09-26, Dr. Aksoy onayı:** Sahne listesinin tamamı. Üretim iki turda yapılacak. Gri filtre 10 hub hero'sunun hepsinden kalkacak. Hekim adlı laboratuvar dosyası yeni adla kaydedilip eskisi silinecek. Embriyo gelişim paneli değiştirilecek. PR #181 birleştirilecek.
- **PR #181:** Birleştirildi (`6fca2ec5`).
- **Tur 1:** Öncelik 1'deki 11 görsel ve ilaç rehberi hero'su üretildi.
  - Model: Higgsfield `gpt_image_2_5`, high, 2k; 12 × 2,75 = 33 kredi.
  - Görseller tam çözünürlükte gözle kontrol edildi.
  - Alt metinler görsele bakılarak yazıldı; `width` ve `height` gerçek boyutlara çekildi.
  - `grayscale` filtresi 10 hero'nun hepsinden kaldırıldı.
  - `ivf_tedavi_sureci.webp` silindi.
  - Build exit 0, ön kontrol 24/24. Hero'lar yerel önizlemede 1366 px genişlikte kontrol edildi.

| Dosya | Higgsfield job |
|---|---|
| `makaleler/over-prp-2026-kapak.jpeg` | 95158a32-b392-451f-b720-394b19b7b2f1 |
| `makaleler/varikosel-nedir-ne-zaman-ameliyat-gerekir.webp` | d5ff1704-b20c-4a67-94cb-f2a38a562312 |
| `makaleler/endoskopik-cerrahi-histeroskopi.webp` | 46ffddfa-b719-4b73-b589-95b5e23901ca |
| `library/hastalik/prolaktin.webp` | 03167261-1553-45a1-9f1f-3523939f3222 |
| `library/hastalik/pkos-ve-ivf.webp` | 8006bc8f-c04d-4090-862d-01005d9ac67b |
| `library/hastalik/opkveivf.webp` | eb76d99f-77ac-41f1-8a8e-e36dd0112672 |
| `library/hastalik/hidrosalpinks.webp` | e9d919ab-a7f6-4680-9567-c98229917927 |
| `library/hastalik/erkekinfertilite.webp` | abdc2035-2e8c-439d-bfa3-132b72e66273 |
| `library/embriyo/kimyasal-gebelik.webp` | 880edde7-7cdc-44d3-8c0b-0ae146bcc638 |
| `home/duygusal-destek.webp` | 797730db-948e-4e44-a390-21006cadc631 |
| `fertilite-koruma/oncofertility.webp` | f7330e6e-9902-4e29-89a5-23aafbb3e1bc |
| `library/tedavi/ilac-rehberi-hero.webp` (yeni) | 3c08e0ad-8189-413e-8969-fe6cbbe4bac1 |
