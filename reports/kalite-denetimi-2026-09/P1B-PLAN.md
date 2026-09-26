# P1-B planı: İlaç rehberi hero'su ve site geneli alt metin denetimi

- **Tarih:** 2026-09-26
- **Durum:** Onay taslağı. Henüz hiçbir değişiklik yapılmadı.

## 1. Mevcut durum (ölçüldü)

**`/ilac-rehberi/` hero'su**
- `library/tedavi/ivf_tedavi_sureci.webp` 1080×281 boyutunda, yatay, renkli bir clip-art infografik.
- 4:5 kutuya `object-cover` ile kırpıldığı için yalnızca "…EK TEDAVİ S…" parçası ve dağınık rakamlar görünüyor.
- İnfografiğin kendisinde de "Gün: 3-7" ve "Gün: 8-11" ikişer kez yazılmış. Alt metni "IVF ilaçları".
- Görsel başka hiçbir yerde kullanılmıyor.
- Hero'ya `grayscale opacity-80` sınıfları uygulanmış, bu yüzden hangi görsel konursa konsun gri ve soluk görünür.
  - Bu filtre P0'da `/hormon-paneli/` hero'sundan kaldırılmıştı.
  - 9 hub hero'sunda hâlâ duruyor: açıklanamayan infertilite, başarı oranları, beslenme ve yaşam, erkek infertilitesi, fertilite koruma, kadın infertilitesi, PGT merkezi, rehberler, yaş ve fertilite.

**Alt metin kapsamı** (99 sayfa, yeni deploy edilmiş build):
- 187 benzersiz içerik görseli, 202 benzersiz görsel+alt metin çifti.
- 12 görsel farklı sayfalarda farklı alt metinlerle kullanılıyor.
- 31 alt metin 25 karakterden kısa ya da jenerik ("IVF ilaçları", "GnRH analogları" gibi).
- Şimdiye kadar elle bulunan uyumsuzluk: 10'dan fazla. Örnekler: oosit mikroskop görseline "Tetikleme enjeksiyonu", laboratuvar görseline "Vajinal mikrobiyom şeması".

## 2. İş A: İlaç rehberi hero sahnesi

Sayfadaki diğer görseller şunlar: terracotta ilaç düzenleyici (nesne sahnesi) ve mint tezgâhta enjeksiyon kalemi hazırlayan erkek elleri. Hero bunlardan farklı olmalı. Görsel dikey 4:5 kutuda gösterilecek, bu yüzden ana obje ortada durmalı.

| Seçenek | Sahne | Konu çıpası | Renk | Yüz |
|---|---|---|---|---|
| **A (önerilen)** | Hastane eczanesinde 20'lerinin sonunda, kıvırcık siyah saçları topuz yapılmış kadın eczacı, soğuk zincir dolabını açmış; raflarda etiketsiz ilaç kutuları ve kapaklı kalemler dizili. | İlaç soğutma dolabı (soğuk zincir) | Lacivert | Var, sitede henüz kullanılmamış bir tip |
| B | Lacivert keten üzerinde yukarıdan çekilmiş IVF ilaç seti: kapaklı kalemler, küçük flakonlar, etiketsiz kutular, soğutma çantası | İlaç seti | Lacivert + buğday | Yok |
| C | Hemşirenin elleri, eğitim pedinde enjeksiyon tekniğini gösteriyor; karşısında çilli, 40'larında kadın izliyor | Enjeksiyon eğitimi | Kayısı | Var; sayfadaki enjeksiyon görseline fazla yakın |

**Ek karar:** Bu hero'dan `grayscale opacity-80` sınıflarını kaldırmayı öneriyorum; hormon paneliyle tutarlı olur. Kalan 9 hub hero'su İş B'deki görsel turda değerlendirilecek.

**Eski infografik:** Kalıcı olarak emekliye ayrılsın. Clip-art tarzında ve içinde yazım tekrarları var. Süreç takvimi gerekiyorsa ileride Türkçe etiketli, doğru bir diyagram olarak yeniden üretilebilir.

**Maliyet:** 1 görsel, yaklaşık 2,75 kredi (yeniden deneme olursa en fazla 5,5).

## 3. İş B: Site geneli alt metin denetimi

**Yöntem**
1. **Envanter:** Betik, 187 görselin her biri için şunları listeler: dosya, kullanıldığı sayfalar, her kullanımdaki alt metin, bağlı olduğu bölüm başlığı ve figcaption.
2. **Temas sayfaları:** Her görselin altına kendi alt metni yazılmış numaralı sayfalar üretilir (yaklaşık 8 sayfa, her birinde 25 görsel). Böylece görsel ve alt metin yan yana karşılaştırılabilir.
3. **Gözle sınıflandırma:** Her görsel tek tek incelenip şu sınıflardan birine konur:
   - ✅ **Uyumlu:** Değişiklik yok.
   - ✏️ **Alt metin yanlış ya da jenerik:** Yeni alt metin yazılır.
   - 🔁 **Görsel sorunlu:** Kural ihlali, konu dışı görsel, bozuk kırpma ya da bulanık bant var. Görsel değiştirme listesine alınır.
   - ⚙️ **Farklı alt metinle kullanım:** Aynı görsel sayfaya göre farklı etiketlenmiş. Bağlama göre tutarlı hale getirilir.
4. **Alt metin yazım kuralları:**
   - Türkçe, 60–140 karakter.
   - Görselde görünen şeyi anlatır.
   - Klinik iddia ya da anahtar kelime doldurma içermez.
   - İnfografiklerde gösterilen bilgiyi özetler.
   - Figcaption varsa onunla tutarlı olur.
   - Yapay zekâ ile üretilmiş görsellerdeki "temsili görsel" notu korunur.
5. **Çıktı:** `ALT-METIN-DENETIMI.md`, görsel başına bir satırlık tablo.

**Uygulama**
- ✏️ ve ⚙️ düzeltmeleri tek bir PR'da yapılır. Yalnızca metin değişir; URL, H1 ve title'a dokunulmaz, SEO riski yok.
- 🔁 listesi size sahne önerileriyle sunulur. Onaylananlar İş A'nın hero'suyla birlikte tek bir üretim turunda yapılır. Böylece tek onay, tek PR, tek deploy ve tek önbellek temizliği olur.

**Sonra, Aşama 4'e hazırlık:** Alt metin için basit bir build kontrolü eklenebilir. Kontrol şu durumlarda uyarı verir:
- 25 karakterden kısa alt metin
- İngilizce alt metin
- Aynı görsele sayfalar arasında birbiriyle çelişen alt metinler

## 4. Önerilen sıra
1. **İş B'nin denetim kısmı:** Kredi harcamaz; ek görsel sorunlarını ortaya çıkarır.
2. **Sonuç tablosu size sunulur.** Siz iki şeyi onaylarsınız:
   - İş A'nın hero seçeneği
   - 🔁 listesi
3. **Alt metin PR'ı** (yalnızca metin) açılır, birleştirilir ve yayına alınır.
4. **Tek üretim turu:** Hero ve 🔁 görselleri birlikte üretilir; ardından PR, deploy ve `/images/library/...` için Custom Purge yapılır.

## 5. Onayınız gereken kararlar
1. Hero için seçenek A mı, B mi, C mi?
2. Bu hero'dan gri filtre kaldırılsın mı?
3. Eski infografik emekliye ayrılsın mı?
4. Önerilen sıra (önce denetim, sonra tek üretim turu) uygun mu?
