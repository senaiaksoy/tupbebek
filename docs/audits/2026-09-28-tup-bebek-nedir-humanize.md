# Tüp Bebek Nedir? — audit ve yerel humanize

Tarih: 28 Eylül 2026. Hedef: `src/content/articles/tup-bebek-nedir.mdx`.
Başlangıçta hedef dosya zaten değiştirilmişti. Bu tur HEAD'i geri yüklemeden mevcut yerel metin üzerine uygulandı. Commit, push veya deploy yapılmadı.

**Güncel durum:** Aşağıdaki ilk audit, yanıtlar gelmeden önceki durumu belgeler. Aynı gün gelen iki yeni hekim yanıtının özgün metni, kullanım kaydı ve sonraki doğrulaması belgenin sonundadır. İki yanıt artık beklenmiyor; yeni sürümde 10 soru bulunuyor.

## Bulgular ve düzeltmeler

| Önem | Konum | Bulgu | Sonuç |
| --- | --- | --- | --- |
| P1 | Kaynakça, ASRM yumurtalık rezervi | PMID 33228919 grip/COVID-19 makalesine aitti; başlık ve DOI ile uyuşmuyordu. | Doğru PMID 33280722, PubMed başlık/yıl/DOI kaydıyla doğrulanarak düzeltildi. |
| P2 | Süreç / folikül takibi | Östradiol ve progesteron her kontrolde zorunluymuş gibi anlatılıyordu. | Gerektiğinde hormon ölçümü ve kişiye göre kontrol sıklığı anlatıldı; ESHRE 2025 güncellemesi, 2026 dergi yayını eklendi. |
| P2 | Süreç / döllenme | “Olgun yumurtalar ... döllenir” bütün yumurtalarda sonuç alınacağını düşündürebiliyordu. | Uygulanan işlem ile beklenen sonuç ayrıldı; her yumurtanın döllenmeyebileceği korundu. |
| P2 | Süre | 2–3 hafta tüm tedavi süresi, sonraki adet ise kesin transfer tarihi gibi okunabiliyordu. | Uyarımdan taze transfere kadar olan dönem açıklandı; ön hazırlık, test bekleyişi ve ertelenmiş transfer ayrıldı. |
| P2 | IVF / ICSI | “Belirgin erkek faktörü yoksa” araştırmaların “ağır erkek faktörü olmayan” popülasyonunu tam karşılamıyordu. | Popülasyon sınırı ve “yararı gösterilmemiştir” belirsizliği düzeltildi. |
| P2 | Tüpler | İki taraflı tıkanıklık ile herhangi bir tüp hasarı aynı kesin sonuca bağlanıyordu. | İki tüpün kapanması açıklaştırıldı; hasarda cerrahi–IVF değerlendirmesi korundu. |
| P2 | Taze / dondurulmuş transfer SSS | Genel canlı doğum üstünlüğü ifadesi yalnızca OHSS kılavuzuna bağlıydı. | Toplam canlı doğum için Cochrane 2021; güvenlik için mevcut ASRM 2024 atfı ayrıldı. |
| P2 | Dış gebelik | Rahimde kese görülmesinin riski “azaltması” tanısal bulgu ile riskin değişmesini karıştırıyordu. | Rahim içi gebelik saptansa da heterotopik gebelik olabileceği ve ağrı/kanama değerlendirmesi doğrudan yazıldı. |
| P2 | SSS | İki ayrı H2 soru-cevap bölümü ve hekim/editoryal yanıt ayrımının belirsizliği. | Tek “Sorular ve Yanıtlar” H2'si; hekim yanıtları ve iki editoryal cevap ayrı alt başlıklarda. `#faq` ve `#dr-aksoy` korundu. |
| P3 | Dil / ritim | “Tek bir iğne günü”, “birlikte okunur”, genel motivasyon kapanışları ve tekrarlar. | Giriş, özet, karar listeleri, başarı açıklaması ve kapanış sadeleştirildi. |

Gramer/sentaks: uzun isim zincirleri ve eksiltili anlatım düzeltildi. Yerel ifade: “birlikte okunur” yerine hangi bulgunun değerlendirildiği yazıldı. Humanizasyon: tanım–karar–süreç–beklenti akışı korundu; yeni hekim deneyimi üretilmedi. Başlık ve SEO açıklaması işlevsel bulundu ve korundu.

Örnek: “Olgun yumurtalar ... döllenir” yerine “Amaç olgun yumurtaların döllenmesidir; her yumurtada döllenme gerçekleşmeyebilir.” İşlemin yapılması ile sonuç alınması artık ayrı anlatılıyor.

## Anlam ve kaynak kaydı

| Değişmez / sınır | Önce–sonra kontrolü |
| --- | --- |
| Değerlendirme: 35 yaş altı 12 ay, 35 ve üzeri 6 ay, 40 üzerinde erken değerlendirme | Korundu; ASRM 2023 tanımı resmî sayfadan kontrol edildi. |
| SART 2023: kendi yumurtası, planlanan toplama başına ilk transfer sonucu, 41–42 yaş %11,3; >42 yaş %3,7 | Rakam, yaş grubu ve payda değişmedi; SART tablosuyla karşılaştırıldı. Türkiye veya bireysel başarı oranına çevrilmedi. |
| Uyarım 8–12 gün; toplama 34–36 saat; test yaklaşık 10–12 gün | Sayılar korundu. Takvim sınırları açıklandı; bireysel talimat yerine ekibin takvimine yönlendirildi. |
| Embriyo izlemi “3 ila 5 gün” | Taze transferin genellikle 3. veya 5. güne planlanması olarak netleştirildi; her embriyonun blastokiste ulaşmadığı korundu. |
| AMH | Yeni eşik konmadı. Gövdede kalite/gebelik sınırı ve yaşla birlikte değerlendirme kaldı. SSS'deki hekim yanıtı kayıtlı katkıdan aynen alındı. |
| OHSS, acil belirtiler, 112, psikolojik destek | Korundu; güvenlik uyarıları azaltılmadı. |
| PGT-M, hidrosalpinks, azospermi | Koşullar, belirsizlikler, bağlantılar ve mevcut uzman yanıtları korundu. |
| Ön değerlendirme | HEAD'de bulunan fakat başlangıç yerel sürümünde eksilen genetik risk/genel sağlık ve zorunlu enfeksiyon taraması ayrımı geri getirildi. |
| Görseller, slug, yazar, YouTube, reviewer ve tarihler | Korundu. Tıbbi inceleme yapılmış veya yeni yayın onayı alınmış gibi metadata yazılmadı. |

Kaynak kontrolü odaklıdır; bütün kaynakların tüm metinleriyle yapılmış sistematik derleme veya bağımsız hekim incelemesi değildir. Resmî Gazete bağlantısının doğrudan erişimi başarısız oldu; embriyo sayısı sınırı Sağlık Bakanlığı hastanesinin resmî açıklamasında destekleniyor. Mevzuatın bütün değişikliklerinin güncel konsolidasyonu bu turda doğrulanamadı; mevcut sayısal sınırlar değiştirilmedi.

Başlıca doğrulama bağlantıları:

- [ASRM yumurtalık rezervi — doğru PMID ve DOI](https://pubmed.ncbi.nlm.nih.gov/33280722/)
- [ESHRE ovarian stimulation — 2025 güncellemesi, 2026 yayını](https://pmc.ncbi.nlm.nih.gov/articles/PMC13061131/)
- [HFEA IVF süreci ve süreleri](https://www.hfea.gov.uk/treatments/explore-all-treatments/in-vitro-fertilisation-ivf/)
- [Cochrane, taze ve dondurulmuş transfer stratejileri](https://pmc.ncbi.nlm.nih.gov/articles/PMC8095009/)
- [SART 2023 raporu](https://www.sartcorsonline.com/CSR/PublicSnapshotReport?reportingYear=2023)
- [ASRM infertilite tanımı](https://www.asrm.org/practice-guidance/practice-committee-documents/definition-of-infertility/)
- [Sağlık Bakanlığı, embriyo transferi](https://trabzonkanunieah.saglik.gov.tr/TR-866540/embriyo-transferi.html)

## Gerçek yanıtlar ve açık işler

Mevcut `expertContribution` metni, 25 Eylül tarihi ve `approved` kaydı aynen korundu. Başlangıçta bulunan sekiz hekim cevabının metni de birebir korundu. Bunların 28 Eylül tarihli olduğunu belirten mevcut editoryal not değiştirilerek yeni bir onay üretilmedi; ham soru/yanıt ve kullanım onayı kayıtları bu turda bağımsız olarak bulunamadı. Bu nedenle sekiz cevabın kökeni yeniden doğrulanmış sayılmaz.

AMH SSS eşleştirmesi:

- SSS sorusu: “AMH kaç olursa tüp bebek yapılır?”
- Özgün yanıt kaynağı: dosyadaki 25 Eylül 2026 tarihli, onaylı `expertContribution`; daha basit tedavi–IVF karar sorusunun AMH cümlesi.
- Özgün ve kullanılan metin aynı: “AMH’yi de dikkate alırım, ama düşük AMH tek başına ‘aşılama olmaz, IVF şart’ demek değildir; daha çok zaman ve beklenen yumurta yanıtı hakkında bilgi verir.”
- Kullanım durumu: mevcut onaylı katkının bağlama uygun alıntılanması; yeni klinik yorum veya tarih yok. Kaynak metindeki tırnak tipleri makalede korundu.
- Başlangıç SSS'sindeki yaş/ultrason/tüp/sperm etkenleri “Kimlere uygulanır?” bölümünde; kalite ve gebelik sınırı başarı tablosunda; düşük AMH'nin gebeliği dışlamaması endikasyon listesinde korunuyor.

**Yanıt bekleyen iki soru:** İlk denemede gebelik beklentisi çifte nasıl anlatılır? OHSS dışında hangi bulgular taze transferi erteletir? Sorular kullanıcıya iletildi; yanıtlar gelmediği için mevcut editoryal cevaplar silinmedi ve hekime atfedilmedi. SSS dönüşümü tamamlanmış değildir. İlk soru grubundaki AMH sorusunun kayıtlı yanıtla karşılandığı kullanıcıya bildirildi.

İnceleme sınırları: `medicalReviewer` belirli bir hekim yerine “Editöryal Ekip” olarak kayıtlıdır. Yeni klinik inceleme/onay tarihi eklenmedi. `hideEvidenceGrade: true` ve genel derece bulunmaması, AGENTS.md'nin genel derece beklentisiyle tam uyumlu değildir; karma kapsamlı metne doğrulanmamış tek kanıt derecesi atanmadı. Fiyat sorusunda mevcut “yazılı olarak açıklarız” ifadesi hekim yanıtının parçasıdır; portal/klinik ses ayrımı açısından sonraki hekim incelemesinde ele alınabilir.

## Audit'in üç sonucu

1. **Hasta eğitimi:** Değerli. Temel tanım, seçenekler, aşamalar, sonuç ölçütleri ve acil belirtiler karar vermeye hazırlıyor. Süreç artık daha açık; kişiye tedavi reçetesi sunmuyor.
2. **AI/web için ikincil kaynak:** Kaynağa yakın, sınırları belirtilmiş tanım ve süreç açıklamaları alıntılanabilir. Oranlar popülasyon/yıl/paydayla birlikte kullanılmalı. Mevzuat ve yeni hekim SSS atıfları yukarıdaki doğrulama sınırlarını taşıyor. Yerel düzeltmeler henüz canlı sitede değil.
3. **Akademik kanıt:** Birincil araştırma değildir; özgün veri, çalışma protokolü, yöntem ve hakem değerlendirmesi yoktur. Sistematik derleme olarak da sunulamaz. Klinik karar iddiaları için doğrudan kılavuz/RCT/derleme kaynakları kullanılmalıdır; uzman yanıtı bunların yerine geçmez.

## Doğrulama

- `npx astro check`: 0 hata, 0 uyarı; 133 mevcut hint.
- `npm run build`: başarılı; hedef dışındaki sayfalarda 7 içerik kalite uyarısı var.
- `npm run verify:preflight`: ilk tur 25/26; yanlış PMID düzeltildikten sonra **26/26 geçti**.
- Yerel editoryal yardımcı: bulgu yok. Fidelity farkları kaynak ekleri, TOC birleşimi, süreç ifadesi ve kayıtlı AMH yanıtı aktarımı olarak elle incelendi; araç anlam eşitliği veya tıbbi onay kanıtı sayılmadı.
- Render: 1 H1, 1 Article düğümü, doğru canonical ve index/follow; yinelenen ID ve eksik iç fragment yok. `#faq` ile `#dr-aksoy` mevcut. FAQPage yok; yeni şema eklenmedi.
- 11 soru aynı soru-cevap bölümünde; 9'u mevcut hekim yanıtı/katkı kaydına dayalı sunuluyor, 2'si açıkça editoryal. Toplam 13 `details` öğesinin ikisi makalenin diğer arayüz öğeleridir.
- 390 px mobil ve 1440 px masaüstü yerel tarayıcı önizlemeleri görüldü; başlık/özet/SSS yerleşimi kontrol edildi.
- Cache-bypass canlı GET: HTTP 200, doğru canonical, index/follow, tek H1 ve Article; yeni hormon takibi metni ve `#dr-aksoy` canlıda yok. Bu, yerel düzenlemenin yayınlanmadığıyla tutarlı.
- Sekiz eski hekim yanıtı ve uzman katkısı başlangıç yedeğiyle birebir karşılaştırıldı: değişiklik yok.

Ekran görüntüleri: `output/playwright/tup-bebek-nedir-audit-{desktop,mobile,faq}-20260928.png`.
Başlangıç yedeği ve test günlükleri: `%TEMP%/tupbebek-audit-20260928-01a0e81a/`.

## 28 Eylül 2026 — kullanıcının ilettiği iki gerçek yanıt

Yanıtlayan: Doç. Dr. Senai Aksoy. Kaynak: bu sohbetin audit tesliminden sonraki kullanıcı mesajı. Gerçek yanıt tarihi: 2026-09-28. İstenen sorulara yanıtların gönderilmesi, sürmekte olan yerel makale düzenlemesinde kullanım bağlamındadır. Yeni bir genel tıbbi inceleme, `approved` metadata kaydı veya commit/push/deploy yetkisi oluşturulmadı. Düzenlenmiş haller makale dosyasında kullanıcıya sunuldu.

### İlk deneme / başarı: özgün yanıt

İletilen sorunun bağlamı ilk denemede gebelik beklentisiydi; gelen yanıt özellikle ilk olumsuz sonuçtan sonraki değerlendirmeyi anlatıyor. Bu nedenle mevcut “İlk deneme olumsuz bittiğinde sonraki planı ne değiştirir?” sorusuyla eşleştirildi. Aynı konuyu iki kez anlatan yeni soru eklenmedi.

> İlk olumsuz sonuçtan sonra önce çiftin yaşadığı hayal kırıklığını dinlerim; ardından siklusu aşama aşama incelerim: Kaç olgun yumurta elde edildi, kaçı döllendi, embriyolar nasıl gelişti, transfer ve rahim hazırlığı nasıl geçti, dondurulmuş embriyo var mı? Bu bilgiler değiştirilebilir bir sorun gösteriyorsa planı düzeltiriz. Her aşama beklendiği gibiyse tek bir negatif transferi “tedavi işe yaramıyor” diye yorumlamam. Çiftle, yeniden denemenin olası yararını, zaman ve maddi yükünü ve ne kadar ara vermek istediklerini açıkça konuşurum.

Makaleye giren karşılık: Yukarıdaki metinde yalnızca “siklusu” → “tedavi sürecini” değişti ve iki paragrafa bölündü. Hayal kırıklığını dinleme, olgun yumurta/döllenme/embriyo/rahim-transfer/dondurulmuş embriyo kontrolü, değiştirilebilir sorun, tek negatif sonucun sınırı ve yeniden denemenin yarar/yük/ara verme kararı korundu. Önceki yanıt bu yeni kullanıcı yanıtıyla güncellendi; önceki özgün metin tur öncesi yedekte bulunur.

“İlk denemede gebelik garanti midir?” şeklindeki eski editoryal SSS kaldırıldı. Gebelik garantisi olmadığı özet, tanım, başarı ölçütleri ve riskler bölümünde korunuyor; yeni hekim yanıtına söylemediği bir cümle eklenmedi.

### OHSS dışında transfer erteleme: özgün yanıt

Soru: “OHSS dışında hangi bulgular taze transferi ertelemenize neden olur?”

> OHSS dışında taze transferi ertelememe en çok şu durumlar yol açar:
>
> - **Rahim boşluğunda transfer gününe kadar süren sıvı**, özellikle kaynağı hidrosalpenks ise: Önce tüp sorununu değerlendirip tedavi ederim. [Oxford Academic](https://academic.oup.com/hropen/article/2022/4/hoac038/6692715?utm_source=chatgpt.com)
> - **Transferi etkileyen rahim içi bulgu** veya **aktif enfeksiyon**: Embriyoyu o koşullarda transfer etmek yerine sorunu açıklığa kavuştururum.
> - **Hormon zamanlamasının uygun olmaması:** Çatlatma günü progesteronu beklenenden yüksekse taze transfer şansı olumsuz etkilenebilir; sonucu tüm tabloyla değerlendiririm, tek bir sayıyla otomatik iptal kararı vermem. [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC13061131/?utm_source=chatgpt.com)
> - **Gerekçeli bir genetik testin sonucunun transfer gününe yetişmemesi:** Embriyoları sonuç çıkana kadar dondurmak gerekebilir. [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC7257009/?utm_source=chatgpt.com)
>
> **İnce endometrium tek başına kesin bir milimetre sınırı, “freeze-all şart” demek değildir.** Ölçümün seyrine, rahim boşluğuna ve embriyoların durumuna birlikte bakarım.

Makaleye giren karşılık:

- Soru başlığı: “OHSS dışında taze transferi hangi durumlarda ertelersiniz?”
- Dört gerekçe ve koşulları korundu. “Hidrosalpenks” sitedeki terminolojiyle “hidrosalpinks” oldu. Progesteron cümlesi bölündü; yeni eşik eklenmedi.
- Son cümle sadeleştirildi: “Rahim iç tabakasının (endometrium) ince olması, tek bir milimetre sınırına göre mutlaka tüm embriyoların dondurulmasını gerektirmez. Ölçümün seyrine, rahim boşluğuna ve embriyoların durumuna birlikte bakarım.” Bu kişisel klinik yaklaşım, düşük kalınlığın önemsiz olduğu veya tüm hastalarda transfer yapılabileceği iddiasına çevrilmedi.
- Bilimsel linklerden yalnızca takip parametreleri çıkarıldı; link etiketleri çalışma/kılavuz kimlikleriyle açıklandı.
- Eski editoryal SSS'deki genel freeze-all üstünlüğü bulunmaması bilgisi ve Cochrane bağlantısı süreç bölümüne taşındı. Hekimin söylemediği bir cümle onun yanıtına katılmadı.

### Kaynak / iddia uyumu ve kayıt sınırı

- D'Angelo ve arkadaşları 2022, rahim içi sıvıda hidrosalpinks/PID değerlendirmesini ve tüp hastalığı tedavisi tamamlanana kadar ertelemeyi destekliyor. DOI `10.1093/hropen/hoac038`, PMID `36196080`; NCBI ESummary ile kimlik doğrulandı. [Yayın](https://academic.oup.com/hropen/article/2022/4/hoac038/6692715).
- ESHRE 2025 ovarian stimulation güncellemesi, yüksek progesteronda erteleme kararına yumurta/embriyo sayısı ve embriyo kalitesinin de katılmasını öneriyor. Metinde sayısal eşik üretilmedi. İnce endometrium kısmı hekimin kişiselleştirilmiş yaklaşımı olarak kaldı. [Kılavuz](https://www.eshre.eu/-/media/sitecore-files/Guidelines/COS/2025/ESHRE-OS-guideline-updateNov-2025v22.pdf).
- ESHRE PGT biyopsi önerileri, genetik analiz için zaman sağlamak üzere biyopsi sonrası dondurmayı açıklıyor; her genetik test veya her IVF için zorunlu PGT sonucu çıkarılmadı. DOI `10.1093/hropen/hoaa020`, PMID `32500104`; NCBI ESummary ile kimlik doğrulandı. [Yayın](https://pmc.ncbi.nlm.nih.gov/articles/PMC7257009/).
- Yeni yanıtlar için henüz yanıtlanmamış soru kalmadı. Önceki sekiz cevabın tarihsel köken kaydıyla ilgili ilk audit sınırı bütünüyle kapanmış sayılmaz: bunlardan ilk deneme cevabı artık bu doğrudan kullanıcı mesajıyla doğrulandı; diğer yedi cevap önceki sürümden aynen korundu. 25 Eylül uzman katkısı ve AMH aktarımı değişmedi.
- Tek H2 “Dr. Aksoy'a Sorular”; eski `#faq` ve `#dr-aksoy` hedefleri korundu. “En sık” ifadesi doğrulanmadığı için başlığa eklenmedi. İki editoryal SSS alt başlığı kaldırıldı, toplam soru sayısı 11'den 10'a indi.

### Yanıtlar sonrası doğrulama

- `npm run build` başarıyla tamamlandı; `npm run verify:preflight` 26/26 geçti.
- Üretilen HTML'de 10 soru, iki yeni yanıt ve korunmuş `#faq` / `#dr-aksoy` hedefleri doğrulandı. Yinelenen ID veya eksik bölüm hedefi bulunmadı; üç JSON-LD bloğu ayrıştırıldı.
- Önceki yedi yanıt, AMH yanıtı ve onaylı `expertContribution` alanının değişmediği önceki dosyayla karşılaştırılarak doğrulandı. Gebelik garantisi olmadığı uyarısı ve Cochrane bilgisi korundu.
- Yerel tarayıcıda yeni transfer yanıtı açılarak kontrol edildi. Görüntü: `output/playwright/tup-bebek-nedir-answers-20260928.png`.
- `git diff --check` temiz. Yazar/reviewer kimlik ve tarihleri korunuyor. Bu kayıt yerel yerleştirme ve anlam kontrolüdür; yayın onayı değildir. Commit, push veya deploy yapılmadı.
