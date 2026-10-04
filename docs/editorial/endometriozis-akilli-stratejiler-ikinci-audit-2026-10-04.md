# Endometriozis ve kısırlık — ikinci geniş audit ve humanize

Tarih: 4 Ekim 2026. İstek: `endometriozis-akilli-stratejiler.mdx geniş audit humanize fix`. Yerel düzenleme yetkisi vardır; bu oturumda yayın işlemi yapılmadı.

## Başlangıç ve onay tabanı

Kanonik Makale Stil Rehberi ve senai-humanize skill'i, Türkçe, anlam kontrolü ve hekim yanıtı kuralları okundu. İlk yerel sürüm PR #267 sonrasındaydı. Canlı tarayıcıdaki PR #268 görüldü; GitHub üzerinden birleştirildiği doğrulandı. `origin/main` alınıp çalışma dizini yalnızca fast-forward ile `0aa13d8c` sürümüne getirildi. Son onaylı makale değişikliği `8ec7e09a` (PR #268); hedef dosyada commit edilmemiş başka iş yoktu. Düzenleme öncesi bu güncel sürüm geçici `.mdx` kopyasında korundu. Başka iş olan `e-kitap-beslenme-icerik-denetimi-2026-10-04.md` değiştirilmedi.

Mevcut yayın, hekim katkısı ve beş SSS için özgün yanıt/onay kayıtları korunuyor. Bu turdaki yeni kanıt açıklamaları ve yapı değişiklikleri ayrıca tıbbi revizyon onayı bekler. `reviewDate`, `approvedBy` ve `expertContribution.answeredAt` değiştirilmedi; `reviewScope` eski onayın bu turu otomatik kapsamadığını açıklar. Mevcut yayındaki makalenin `published` durumu korunur; yerel revizyonun yayın yetkisi değildir.

## Bulgular ve uygulanan düzeltmeler

| Konum | Bulgu | Düzeltme |
| --- | --- | --- |
| Özet ve giriş | Özetin ikinci cümlesi çok yoğundu; giriş esas olarak dört bağlantının tanıtımıydı ve alıntı görünümü taşıyordu. | Üç cümlelik doğrudan cevap ve gebelik planını açıklayan doğal giriş. İlgili linkler gövdede ve sondaki rehberlerde korunuyor. Başlık, SEO başlığı ve description uygun bulundu, değiştirilmedi. |
| Tanı gecikmesi | Belirtilerin değişkenliğinin "başlıca neden" olması kaynakta bir sıralama olarak gösterilmiyor. | Nedensel üstünlük kaldırıldı; WHO'da yer alan farkındalık ve tanıya erişim sınırı eklendi. %10, %25–50 ve 4–12 yıl korundu. Türkiye'ye özgü oran olarak sunulmadı. |
| Görüntüleme | Nisenblat 2016'nın yöntem kalitesi sınırlılığı yazılmadan B etiketi yüksek doğruluk cümlesine bağlanıyordu. | ESHRE tanı önerisi ve Cochrane doğruluk değerlendirmesi ayrı paragraflara alındı. Yöntem kalitesi ve bölge farkı açıklandı; gözlemsel tanısal veriye yerel sınıflamada C etiketi verildi. Genel makale derecesi B korundu. Normal görüntülemenin yüzeyel hastalığı dışlamadığı sınır korunuyor. |
| Mekanizma | Gövde ve tabloya bitişik kaynak izi yoktu; AMH/AFC açıklaması dar tablo hücresine sıkışıyordu. | ASRM mekanizma kaynağı bitişiğe getirildi. AMH/AFC gövdede açıklanıp tablo hücresi sadeleştirildi. Yumurta sayısı ile kalite/gebelik ayrımı mevcut ASRM kaynağıyla açıklandı. |
| Rezerv ve IVF | "Canlı doğumu artırmadı" kesin etkisizlik izlenimi verebilirdi; 33 çalışmanın tasarım sınırı belirtilmemişti. | "Artırdığı gösterilmedi"; çalışmaların çoğunun geçmiş kayıtlara dayandığı ve grup sonucunun bireysel eşitlik göstermediği açıklandı. Meta-analizin tüm 33 çalışmasının her sonucu raporladığı ileri sürülmüyor. |
| Ameliyat ölçütleri | Altı maddelik liste sonraki tabloyu yineliyordu; foliküle güvenli erişim tablonun ayrı satırında yoktu. | Liste tablonun işleviyle birleştirildi. Güvenli yumurta toplama erişimi onaylı hekim katkısından ayrı satıra taşındı. Ağrı, şüpheli görünüm, rezerv, önceki ameliyatlar, deneme zamanı ve önceki tedavi yanıtı korunuyor. Tabloların kaynakları yakına eklendi. |
| Evre I–II laparoskopi | "Süren gebelik" hastanın okuyuşunda canlı doğumla karışabilirdi. | Cochrane'de ultrasonla doğrulanan canlı rahim içi gebelik sonucu ve canlı doğum verisinin bulunmaması ayrıldı. Rutin IVF öncesi cerrahi cümlesinin evre I–II kapsamı açıklandı. |
| GnRH | Uzun süreli ön tedavi IVF uyarım protokolüyle karışabilirdi; "iğne" sınıfı gereksiz daraltıyordu. | Faydanın belirsizliği, ilaç ifadesi ve ön tedavi–uyarım protokolü ayrımı. Tedavi/doz önerisi eklenmedi. |
| Dil ve akış | Uzun karar paragrafı, "obstetrik öykü", kaynaksız özet tekrarları. | EFI ayrı paragrafta ve ameliyat sonrası bağlamda; gebelik öyküsü sade Türkçeyle; gereksiz kapanışlar kaldırıldı. Başlıklar ve mevcut anchor'lar korundu. |
| Kaynakça | Hamdan kaydında açık `url` yoktu (PMID üzerinden üretim mümkündü). | Mevcut PubMed URL'si frontmatter kaydına da eklendi; yeni yayın veya PMID eklenmedi. |

Üç ayrı manuel okuma yapıldı: gramer/sentaks, Türkçe ifade/terminoloji ve ritim/tekrar. Gövdeye yeni birinci tekil hekim sözü, deneyim, başarı oranı, doz ya da eşik eklenmedi. Mevcut iki karar tablosu açıklama işlevini karşılıyor; yeni dekoratif görsel üretilmedi.

## Kaynak doğrulaması ve anlam kaydı

- [WHO 2025 bilgi notu](https://www.who.int/news-room/fact-sheets/detail/endometriosis): tanım, yaygınlık, tanı gecikmesi ve belirtiler yeniden okundu.
- [ESHRE 2022 tam kılavuz](https://www.eshre.eu/-/media/sitecore-files/Guidelines/Endometriosis/ESHRE-GUIDELINE-ENDOMETRIOSIS-2022_1.pdf): web aracı PDF'yi açamadı; aynı resmi PDF terminalden alındı ve metni pypdf ile çıkarıldı. İlgili tanı, ilaç, EFI, IUI/ART, ameliyat, fertilite koruma ve gebelik önerileri karşılaştırıldı. Ön tedavi ve IVF protokolü ayrımı öneri 50/53'e dayanır. ESHRE'nin resmi kılavuz listesinde endometriozis sürümü halen 2022.
- [ASRM 2012 tam metni](https://integration.asrm.org/practice-guidance/practice-committee-documents/endometriosis-and-infertility-a-committee-opinion-2012/): anatomi ve önerilen inflamatuvar mekanizmalar doğrulandı. Eski cerrahi eşikleri güncel öneri gibi aktarılmadı.
- [ASRM 2020 tam metni](https://www.asrm.org/practice-guidance/practice-committee-documents/testing-and-interpreting-measures-of-ovarian-reserve-a-committee-opinion-2020/): rezervin yumurta miktarıyla ilişkisi, miktar–kalite ayrımı ve doğal gebelik tahminindeki sınırlılığı resmi metinden doğrulandı.
- [Nisenblat 2016, Cochrane](https://www.cochrane.org/evidence/CD009591_imaging-tests-non-invasive-diagnosis-endometriosis): görüntüleme yöntemleri ve düşük yöntem kalitesi sınırı yeniden okundu; 2016 inceleme ESHRE'nin güncel tanı yaklaşımını tek başına temsil etmiyor.
- [Hamdan 2015, yazar kurumu kaydı](https://cris.maastrichtuniversity.nl/en/publications/the-impact-of-endometrioma-on-ivficsi-outcomes-a-systematic-revie/): 33 çalışma, çoğunluk retrospektif; endometrioma–kontrol ve ameliyat–ameliyatsız karşılaştırmaları ayrı. Canlı doğum için kullanılan çalışmalar bütün meta-analizin alt gruplarıdır. Publisher/PubMed web erişimi sınırlı olduğundan kurumun makale özet kaydı kullanıldı, tam makale okundu iddiası yok.
- [Bafort 2020, Cochrane](https://www.cochrane.org/evidence/CD011031_laparoscopic-surgery-pain-and-infertility-associated-endometriosis): canlı rahim içi gebelik, orta kalite, canlı doğum verisi yok. Fayda ifadesi bu sonuçla sınırlandı.
- [Younis ve Taylor 2024 tam metni](https://www.frontiersin.org/journals/endocrinology/articles/10.3389/fendo.2024.1397279/full): kistin kendi etkisindeki belirsizlik ile ameliyatın rezerv etkisi ayrımı, iki taraflı/tekrarlayan cerrahi sınırı uyumlu.

Sayısal değişmezler: WHO yaygınlığı ve gecikmesi, Hamdan 33 çalışma, hastalık evreleri ve gerçek yanıt/onay tarihleri korunuyor. Fidelity farkları eklenen atıf yılları/PMID/URL tekrarları ve bağlantı konumu değişiklikleridir; klinik sayı veya eşik silinmedi. Önceki özetteki infertiliteyle özdeşlik reddi, yeni özette doğal gebeliğin mümkün olduğu ifadesiyle karşılanıyor. Mekanizma belirsizliği nedensel kesinliğe yükseltilmedi.

## Hekim yanıtı ve SSS

İşin başında ve teslim öncesi bekleyen-soru tablosu boş. Beş SSS'nin özgün yanıtı `pending-physician-faq.md` kayıtlarıyla cümle cümle karşılaştırıldı; mevcut terim sadeleştirmeleri dışında aktarım sapması saptanmadı. Bu turda SSS başlığı, sorular, yanıtlar ve kaynaklar aynen korunuyor. Yeni/dönüştürülen soru bulunmadığından yeni arama veri seçimi yapılmadı. Önceki Autocomplete kanıtı bu oturumda canlı GSC doğrulaması yapılmış gibi sunulmuyor. Önceki soru verisinin GSC ile karşılaştırılması açık iş olarak kalır. Gerçek hekim katkısı PR #268 sonrasındaki onaylı haliyle korunuyor.

## Üç audit sonucu

1. **Hasta eğitimi:** Değerli. Tanı ile kısırlığı, çikolata kisti ile genel endometriozisi ve ağrı tedavisi ile gebelik hedefini ayırıyor; somut karar etkenleri sunuyor.
2. **AI/web ikincil kaynağı:** Kaynaklı tanı ve tedavi çerçevesi için yararlı; bireysel gebelik tahmini, garanti veya akademik birincil kanıt olarak kullanılmamalı. Bu revizyondaki yeni kanıt açıklamalarının tıbbi onayı bekleniyor. Atıf yapılırken özgün çalışmaya/kılavuza dönülmeli.
3. **Akademik kanıt:** Özgün araştırma değildir. Yeni veri seti, protokol, sistematik arama/seçim yöntemi ve araştırma hakemliği yok. Eski kaynaklar belirli iddiaları karşılıyor; tüm 2025–2026 çalışmalarının tarandığı iddia edilmiyor. Makale derecesi tüm alt konulara eşit kanıt gücü vermez.

## Doğrulama ve açık işler

- `npm run build`: son dosya sürümüyle başarılı. Hedef dışındaki üç eski içerik kalite uyarısı build'i engellemedi.
- Build sonrasındaki preflight: **26/26 başarılı**. Build ile eşzamanlı ilk denemenin eksik `dist` hatası, build tamamlandıktan sonraki koşuda yok.
- Türkçe editoryal yardımcı: **103 blok, 0 bulgu**. Bu sonuç manuel dil/ritim incelemesinin yerine kullanılmadı.
- Fidelity: değişiklik incelemesi sonucu yalnızca eklenen atıf yılları ve mevcut link tekrarları; klinik sayı/eşik kaybı yok. Beş `<Accordion>` yanıt bloğu ve `expertContribution`, düzenleme öncesi güncel PR #268 kopyasıyla birebir aynı.
- Üretilen HTML: tek H1, tek canonical, tek uzman katkısı; JSON-LD parse ediliyor, `FAQPage` yok. Kaynakça dokuz kaydı gösteriyor. Bölüm bağlantılarının hedefleri mevcut.
- Yerel Chrome: 390 px genişlikte sayfa `scrollWidth` 382 px, iki tablo 350 px; yatay taşma yok. İlk SSS açılıp gerçek yanıtın görünümü ekran görüntüsünde doğrulandı. İçindekiler açılıyor; strateji bağlantısı doğru `#strateji` hedefini seçiyor. Masaüstü DOM kontrolünde 2560 px viewport içinde iki tablo 768 px. Masaüstü ekran görüntüsü yakalama zaman aşımı nedeniyle bu boyutta son görsel onay sınırlı; mobil ekran görüntüsü alındı. Geçici viewport ayarı sıfırlandı.
- Build'in oluşturduğu arama indeksinde bu turdan önceki makale başlıkları ve iki başka makalenin güncellemeleri, imageDimensions dosyasında hedef dışı endometrioma görselleri değişiyordu. Bu iki üretilen dosya başlangıçtaki Git haline geri alındı; revizyon yalnızca hedef makale ve bu audit kaydıyla sınırlı. Build çıktı dosyaları son revizyonu taşır.
- `git diff --check`: başarılı. İlk tarayıcı skill bağlantısındaki native bridge engeli desteklenen Chrome yüzeyiyle aşıldı. İlk canlı görünüm önceki yayımlanmış sürümü doğrular; bu yerel revizyonun yayına çıktığını göstermez.

Revizyonun tıbbi onayı bekleniyor. Yeni hekim yanıtı beklenmiyor. Commit/push/deploy yapılmadı.


## İkinci revizyonun açık onayı — 4 Ekim 2026

Dr. Aksoy, bu rapor ve yerel makale tesliminden sonra aynı oturumda `onay commit push deployy` dedi. Bu onay, yukarıda bekliyor olarak kaydedilmiş ikinci revizyonun tamamını ve yayın işlemini kapsar. Makalenin `reviewScope` ve `editorialMethodNote` kayıtları bu gerçek onayla güncellendi. Eski hekim yanıt tarihleri ve beş gerçek SSS yanıtı korunuyor. Bekleyen hekim sorusu yok. Yalnızca hedef makale ve bu rapor commit kapsamındadır; yayının başarı sonucu ayrıca canlı ortamda doğrulanacaktır.
