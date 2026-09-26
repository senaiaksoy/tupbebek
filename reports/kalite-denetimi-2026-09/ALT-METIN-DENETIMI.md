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

### Tur 1 yayını
- **PR #182:** Birleştirildi (`cef1932a`); Cloudflare Git build'i başarılı.
- **Önbellek:** İlk kontrolde 21 adresin 4'ü önbellekten eski haliyle geliyordu. Bu 4 adres ve silinen infografiğin adresi Cloudflare Custom Purge ile temizlendi.
- **Canlı doğrulama:** 21/21 adres yerel build ile aynı; `ivf_tedavi_sureci.webp` 404 veriyor.

### Tur 2
- **Kapsam:** Öncelik 2 ve Öncelik 3'teki 20 görsel ve 3 yeni dosya: `genetik-dizileme.webp`, `mikro-tese-laboratuvar.webp`, `tetikleme-zamanlamasi.webp`.
  - Model: Higgsfield `gpt_image_2_5`, high, 2k.
  - Maliyet: 22 × 2,75 = 60,5 kredi.
- **Silinen dosyalar:**
  - `dr-senai-aksoy-istanbul-ivf-laboratuvar.webp`: Dosya adı bağımsızlık ilkesiyle çelişiyordu. Yerine erkek infertilitesi sayfasında `mikro-tese-laboratuvar.webp`, PGT merkezindeki NIPT bölümünde `genetik-dizileme.webp` kullanılıyor.
  - `oocytes-prior-to-a-f-and-k-and-after-insemination.webp`: Telif şüphesi vardı. Yerine tetikleme bölümünde `tetikleme-zamanlamasi.webp` kullanılıyor.
- **Genetik testler sayfası:** Petri kabı yerine `genetik-dizileme.webp` kullanılıyor.
- **Görünüm düzeltmeleri:**
  - `/tani-sureci/` hero'sundan `mix-blend-multiply opacity-90` kaldırıldı.
  - `/hakkimizda/` görselini tamamen gizleyen opak katman kaldırıldı; görsel önceden hiç görünmüyordu.
  - `/tani-sureci/` sayfasındaki %10 opaklıklı dekoratif doku (`abstract-cells.webp`) için alt metin `alt=""` ve `aria-hidden="true"` yapıldı.
- **Boyut:** Ana sayfanın öne çıkan görseli (`yas_gebelikorani_ivf.webp`) 512×512'den 1600×900'e çıktı.
- **Doğrulama:**
  - Build exit 0, ön kontrol 24/24.
  - Yerel önizlemede kontrol edildi: ana sayfa öne çıkan görseli, `/tani-sureci/`, `/basari-oranlari/` ve `/hakkimizda/`.
  - Yazı riski taşıyan görseller tam çözünürlükte kontrol edildi: dizileme ekranı, makale yığını, saat kadranı. Diyagram etiketleri doğru yazılmış.

| # | Dosya | Higgsfield job |
|---|---|---|
| 1 | `library/istatistik/yas_gebelikorani_ivf.webp` | d2927ebf-3aee-4886-b3e4-9c83dd19d32c |
| 2 | `library/istatistik/basari_oranlari_hero.webp` | 06789e03-c470-4ce1-abd6-5364fda2d075 |
| 3 | `library/embriyo/pgt_sex.webp` | f7579864-7712-490b-8bda-930e862a6caa |
| 4 | `library/laboratuvar/microbiota.webp` | b7c9c7d4-6b62-49fb-ba4c-4332e4a48926 |
| 5 | `library/laboratuvar/genetik-dizileme.webp` (yeni) | ad10fc03-9b06-426d-9e1b-cdb02d537c29 |
| 6 | `library/tedavi/sperm_supp.webp` | 69902afd-bc45-4d44-a383-e328f646ba26 |
| 7 | `library/laboratuvar/mikro-tese-laboratuvar.webp` (yeni) | 50b6e9d6-af6f-495b-b972-7c659f18ed58 |
| 8 | `library/laboratuvar/embryoscop.webp` | 5d6c9e33-247c-4799-a8ca-91df80bbc652 |
| 9 | `library/laboratuvar/icsicizim.webp` (diyagram) | 7901a809-21bb-4917-a0c1-14c0f36a0642 |
| 10 | `library/tedavi/prp.webp` | a086cf4c-e736-4ca1-8e27-2bb32cd32155 |
| 11 | `library/tedavi/taze-donmus-transfert.webp` | 5f549fe5-8453-4248-8d7d-3961b19aee5d |
| 12 | `library/tedavi/tup_bebek_muayene.webp` | 905b9c02-dc64-44b2-acab-0e0f4d42269e |
| 13 | `library/hastalik/kisirlik_endometriozis.webp` | a81dbc28-7ae0-4c4c-930c-6a792d34cd4b |
| 14 | `fertilite-koruma/hero.webp` | cc5c9953-6355-4bc5-9f04-8a2ec2f94055 |
| 15 | `hakkimizda/clinical-review.webp` | 276261cd-2b9a-4a0f-b166-465cfe382f96 |
| 16 | `home/kadin-infertilitesi.webp` | f9a41b44-d01c-4f08-b42e-4b7366fee8ed |
| 17 | `home/tani-sureci.webp` | 013de835-7aac-4398-9fdf-64a042dd210c |
| 18 | `home/tedavi-yontemleri.webp` | 05ea8634-7ae0-4ceb-b82f-a03d0915d57a |
| 19 | `tani-sureci/abstract-cells.webp` | 31faaf55-8bf6-4825-a8a2-4a5ad9ba5616 |
| 20 | `tani-sureci/consultation.webp` | 56a02396-608b-4f9f-aada-87f477babea8 |
| 21 | `tani-sureci/dna-cells.webp` | f0d51d77-5dd6-458e-bae2-0dd913c485d6 |
| 22 | `library/tedavi/tetikleme-zamanlamasi.webp` (yeni) | f70f4859-07c5-4178-acb3-7a87beafa5de |
