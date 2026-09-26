# Video eşlemeleri ve alt metin bakımı — 26 Eylül 2026

Başlangıç: `main`, `798713a909bc595e8ec1efd3b53c8367c7a32e48` (PR #186 sonrası). Kalan 16 kalite uyarısının bağlamı incelendi.

## Bulunan gerçek hatalar ve düzeltme

| Sayfa | Doğrulanan bulgu | Değişiklik |
|---|---|---|
| ICSI | `yT2dmjxZ3Qs` videosunun gerçek başlığı “4AA, 3BB, 5BC Embriyo Ne Demek? Kalite Rehberi”. Sayfadaki video açıklaması ise IVF–ICSI karşılaştırmasını tarif ediyordu. | Yanlış video bağlantısı ve yalnızca bu videoyu tanımlayan açıklama kaldırıldı. Doğrulanmamış yeni bir video eklenmedi. |
| PCOS | `NLvPH9mZIaE`, genel IVF protokolleri videosu. Otomatik Türkçe altyazı dökümünde sayfanın video başlığı/açıklamasında vaat edilen PCOS, OHSS ve freeze-all anlatımı bulunmuyor. Aynı video hem şablondan hem gövdeden çağrılıyordu. | İki çağrı, hatalı video açıklaması ve beş video metadata alanı kaldırıldı. Article içindeki yanlış `video`/`VideoObject` verisi de kaldırıldı. Video, genel protokol sayfasında korunuyor. |
| Miyomlar | `R0mi5CpAVrM` kapağında ve YouTube açılış ekranında bebek fotoğrafı var. Bu, portalın bebek görseli yasağına aykırı. | Video bloğu kaldırıldı. Önizlemeyi başka fotoğrafla maskelemek, oynatıcıdaki fotoğrafı kaldırmıyor. Makalenin ana görseli korunuyor. |
| Endometriyal scratching ve izotretinoin | Ortak Video bileşeninde “Video önizleme görseli”, “Videoyu oynat” ve “YouTube video player” gibi konu belirtmeyen etiketler vardı. | Doğrulanmış video başlıkları alt metne, düğme adına ve açılan iframe başlığına taşındı. Başlığı olmayan yeni Video çağrısı build hatası verir. |
| Instagram | Portre alt metni yalnızca isimdi. Fotoğraf gözle incelendi: kitaplık önünde mavi kıyafetle oturan Dr. Aksoy. | Alt metin gerçek fotoğrafı tarif edecek şekilde tamamlandı. |

Birincil video kayıtları: [ICSI sayfasındaki eski video](https://www.youtube.com/watch?v=yT2dmjxZ3Qs), [genel IVF protokolleri](https://www.youtube.com/watch?v=NLvPH9mZIaE), [miyom videosu](https://www.youtube.com/watch?v=R0mi5CpAVrM), [rahim çizme videosu](https://www.youtube.com/watch?v=oyBpALzZzEU), [izotretinoin videosu](https://www.youtube.com/watch?v=1pXII-iRU-U). Başlık ve kanal kimliği YouTube oEmbed yanıtlarından doğrulandı. Üç kapak, miyom açılış ekranı ve mevcut portre gözle incelendi. PCOS karşılaştırması için YouTube'un otomatik Türkçe dökümü kullanıldı; bu, videoların tamamının klinik doğruluk onayı değildir.

ICSI eşlemesi, videonun başlığı ve görünür YouTube açıklamasındaki Gardner embriyo sınıflaması anlatımıyla kontrol edildi; bu video için altyazı dökümü mevcut değildi.

Bu bakım yanlış video bağlantısı/etiketi/metadata ve bunlara ait açıklamalarla sınırlıdır. Makalelerin klinik paragrafları, kaynakları, gerçek uzman katkıları ve yazar/reviewer tarihleri korunur. Yeni klinik görüş veya Dr. Aksoy'a atfedilen yanıt üretilmedi.

## Doğrulama

- `npm run build`: çıkış kodu 0; içerik kalitesi 0 hata, 10 uyarı (önce 16).
- `npm run verify:preflight`: 25/25, çıkış kodu 0.
- 99 sayfanın URL, HTML title, H1 ve canonical bilgileri aynı. PCOS Article içindeki yanlış VideoObject dışında bütün JSON-LD verileri aynı.
- 63 makalenin kaynak karşılaştırması: yalnızca video çağrıları/ithalatları, kaldırılan video açıklamaları ve PCOS video metadata alanları ayrıldıktan sonra klinik metin ve inceleme/uzman kayıtları aynı.
- Değişen altı sayfa tarayıcıda açıldı. Kalan iki video 390 px genişlikte taşmıyor; Enter ile doğru video iframe'i açılıyor ve iframe konuya özgü başlık taşıyor. ICSI, PCOS ve miyom sayfalarında YouTube iframe'i/Video bloğu yok. Instagram portresi yeni alt metni taşıyor.
- Ayrıntılı makine kaydı: [VIDEO-BAKIM-KANIT.json](VIDEO-BAKIM-KANIT.json). Yerel loglar, YouTube oEmbed kaydı ve ekran görüntüleri `.tmp/video-*` altında.

## Kalan 10 uyarının yorumu

| Grup | Sayı | Değerlendirme |
|---|---:|---|
| Menü grupları arasında aynı hedef | 3 | Fertilite koruma, başarı oranları ve editöryal politika birden fazla menüde. Menü yerleşimi için ayrı küçük PR konusu. |
| “En iyi” metin eşleşmesi | 6 | Reklam/garanti dilini eleştiren, üstünlüğü reddeden veya yöntemler arası belirsizliği anlatan kullanımlar. Tespit betiği bağlamdan bağımsız eşleşme yapıyor; bu kayıt bunları portalın kendi üstünlük vaadi olarak değerlendirmiyor. |
| “En iyi prognostik faktörler” başlığı | 1 | Asherman yazısında klinik prognoz faktörleri listesi. Klinik metin ve jargon değerlendirmesi ayrı ele alınmalı; bu teknik bakımda değiştirilmedi. |

Uyarıları azaltmak amacıyla koruma gevşetilmedi veya metinler eşleşmeden kaçacak şekilde yeniden yazılmadı.

## Yayın kapısı

Bu PR için açık birleştirme/yayın onayı beklenir; `main` birleştirmesi otomatik yayındır. Görsel dosyası baytları değişmedi. Yayın sonrasında üretim commit'i, kaldırılan video eşlemeleri ve kalan videoların etiketleri cache bypass ile canlı HTML'de doğrulanmalı.
