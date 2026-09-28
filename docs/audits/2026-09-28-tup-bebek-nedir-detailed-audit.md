# Tüp Bebek Nedir? — ikinci, ayrıntılı audit

Tarih: 28 Eylül 2026. Hedef: `src/content/articles/tup-bebek-nedir.mdx`.

**Sonraki işlem durumu:** Bu rapor aşağıda ikinci audit anındaki bulguları korur. Kullanıcı aynı gün “p1 tüm onaylar tamam. p2 leri de düzelt” diyerek iki P1 için onayların tamamlandığını teyit etti ve P2 düzeltmelerini yetkilendirdi. P1'ler bu teyitle kapatıldı; P2 düzeltme ve doğrulama kaydı belgenin sonundadır. Aşağıdaki eski “yayıma hazır saymıyor” sonucu audit anına aittir; yeni bir yayın/commit/push/deploy işlemi yapılmadı.

**Sonuç:** Metin hasta eğitimi açısından değerli. Önceki düzeltmelerin çoğu yerinde; yeni iki hekim yanıtının anlamı korunmuş. Buna rağmen güncel sürümün tıbbi onayının sunuluşu, yedi eski SSS yanıtının köken kaydı, süreç sıralaması ve bazı iddia–kaynak ilişkileri nedeniyle bu audit güncel sürümü yayıma hazır saymıyor.

Bu tur salt okunur kaynak incelemesidir. Makale, bileşenler, içerik görselleri, onay alanları ve önceki audit raporu değiştirilmedi. Yalnızca bu rapor ve denetim ekran görüntüleri oluşturuldu. Commit, push ve deploy yapılmadı. Başlangıçta makale zaten değiştirilmiş, ilk audit raporu izlenmeyen dosyaydı.

## 1. Kapsam ve yöntem

- Kanonik Dr. Senai Aksoy Makale Stil Rehberi, `senai-humanize` skill'i ve TR/portal/yazar/anlam koruma kuralları okundu.
- Başlık, SEO açıklaması, kısa cevap, giriş, tüm gövde, tablo, içindekiler, 10 SSS, kaynakça ve editoryal alanlar incelendi.
- Makale şeması, kaynak türleri, yazar kimliği, inceleme açıklaması ve otomatik sorumluluk reddi birlikte değerlendirildi.
- 19 PubMed kaydının başlık/yıl/DOI kimliği NCBI ESummary ile karşılaştırıldı. Bu, 19 makalenin bütün tam metinlerinin yeniden okunması anlamına gelmez.
- Klinik karar iddiaları seçilmiş birincil/kurumsal kaynaklarla karşılaştırıldı; erişilemeyen tam metin ve mevzuat kontrolleri aşağıda açık bırakıldı.
- Mevcut yerel `dist` çıktısı ile kaynak karşılaştırıldı; 390 px mobil ve 1440 px masaüstü tarayıcı görünümü incelendi. Salt okunur audit için yeniden build/preflight çalıştırılmadı.
- Canlı makale cache-bypass GET ile; robots ve sitemap ayrıca kontrol edildi. Yerel dosya ile canlı sürüm ayrı değerlendirildi.

İncelenen makalenin SHA-256 değeri:

`1C4219D99797371E68DFB832678F86B629C8B62E827C1A9EE08F2C2B6D48D196`

## 2. Öncelikli bulgular

Öncelikler: P1 = yayın kararından önce çözülmesi gereken onay/atıf izlenebilirliği; P2 = klinik açıklık, kaynak veya portal sesi sorunu; P3 = okunabilirlik ve yardımcı şeffaflık iyileştirmesi. Bir P2 bulgusu tek başına ilgili tıbbi iddianın yanlış olduğunu göstermez.

### P1 — Güncel gövdeye otomatik ve kapsamı belirsiz tıbbi onay veriliyor

**Kanıt:** Makalede `lastModified: 2026-09-28`, `reviewDate: 2026-09-25` ve eski onaylı uzman katkısı var. Yeni sürümün tamamını kapsayan yeni tıbbi inceleme/onay kaydı incelenen kayıtlar içinde yok. Buna karşılık render edilen sayfa altında şu ifade yer alıyor:

> Bu içerik, tupbebek.com yayın kurulu tarafından tıbbi doğruluk ve güncel klinik protokoller açısından incelenmiş ve onaylanmıştır.

Kaynak: `src/components/MedicalDisclaimer.astro:20` varsayılanı `reviewType = 'medical'`; tıbbi onay cümlesi aynı bileşende. Makale `reviewType` belirtmiyor; makale rotası bu değeri bileşene aktarıyor. Dolayısıyla iddia yeni sürümün gerçek inceleme kaydını kontrol ederek üretilmiyor.

**Etkisi:** Okur, 28 Eylül değişiklikleri dahil bütün gövdenin onaylandığını düşünebilir. 25 Eylül tarihli belirli uzman katkısının onayı bütün sonraki değişiklikleri kendiliğinden kapsamaz.

**Gerekli işlem:** Mevcut sürümün gerçek inceleme kapsamı ve kullanım/onay durumu kayıtlarla eşleştirilmeli; görünür ifade bu kapsamı doğru anlatmalı. Yeni tarih veya onay uydurulmamalı. Editöryal ekip kimliği kendi başına hata değildir; proje bu kimliği kabul ediyor. Sorun, sürüm ve kapsam izlenebilirliğidir.

### P1 — Yedi eski hekim cevabının özgün yanıt kaydı bağımsız doğrulanamadı

**Kanıt:** Yeni ilk olumsuz sonuç ve OHSS dışı erteleme cevapları doğrudan bu sohbetten alınmış ve önceki audit belgesinde özgün/düzenlenmiş karşılıkları kaydedilmiş. AMH cevabı 25 Eylül onaylı `expertContribution` içinden aktarılmış. Kalan yedi yanıt önceki yerel metinden korunmuş; incelenen makale ve `docs` kayıtlarında özgün soru, ham yanıt ve kullanım/onay zinciri bulunamadı. Mevcut editoryal not bunları 28 Eylül hekim yanıtları olarak tanımlıyor; bu not tek başına bağımsız kaynak kaydı değildir.

**Etkisi:** On hekim yanıtının tamamını yeniden doğrulanmış saymak mümkün değil. Bu, cevapların uydurma olduğunu kanıtlamaz; audit sınırıdır.

**Gerekli işlem:** Önceden mevcut kayıtlar bulunup eşleştirilmeli. Aynı gerçek cevap kullanıcıdan tekrar istenmemeli. Kayıt yoksa yalnızca eksik cevaplar gerçek hekim yanıtı sürecine alınmalı; model cevap üretip hekim adı eklememeli. İki yeni yanıta yerel kullanım bağlamı verilmiş olması ayrıca genel yayın onayı değildir.

### P2 — Progesteron desteğinin sırası başlangıç zamanını yanlış düşündürebilir

**Konum:** Makale 286–287: embriyo transferi 7. aşama, progesteron desteği ve test 8. aşama.

Metin açıkça “progesterona transferden sonra başlanır” demiyor. Ancak ardışık numaralandırma böyle okunabilir. Taze IVF/ICSI için ESHRE, luteal progesteron desteğinin yumurta toplama akşamı ile toplama sonrası üçüncü gün arasında başlatılmasını tarif ediyor. Bu, özellikle beşinci gün transferinden önceki dönemi içerir. [ESHRE 2025 güncellemesinin 2026 yayını](https://pmc.ncbi.nlm.nih.gov/articles/PMC13061131/).

**Gerekli işlem:** Destek başlangıcı ile transfer sonrası sürdürülmesi ayrılmalı. Hasta metnine doz veya kendi kendine başlangıç talimatı eklenmeden tedavi ekibinin takvimine bağlılık korunmalı. Dondurulmuş transfer protokolleri aynı zaman çizelgesine genellenmemeli.

### P2 — Yaş sınırı sorusu değerlendirmeye ne zaman başlanacağını anlatıyor, güvenlik kapsamı eksik

**Konum:** Makale 396–397.

Yanıt yaşla kendi yumurtalarıyla başarı azalmasını ve 35/40 yaş çevresinde değerlendirmeyi öne almayı anlatıyor. Bunlar, gebeliği güvenle taşıma değerlendirmesini veya ileri yaşta gebelik risklerini karşılamıyor. Önceki HEAD sürümünde genel sağlık ve gebelik taşıma değerlendirmesi vardı; bu kapsam son iki cevabın yerleştirilmesinden önceki yerel metinde zaten eksilmişti. Son ekleme sırasında kaybolmuş gibi sunulmamalı.

**Gerekli işlem:** Hekimin mevcut özgün yanıtı bulunmalı; soru kapsamı onun onaylı ifadesiyle tamamlanmalı veya gerçek yanıtın kapsamına uygun soruyla eşleştirilmeli. Modelden yeni yaş sınırı/risk tavsiyesi türetilmemeli. Genel sağlık kontrolünün 280. satırda bulunması bu özel sorunun eksikliğini tamamen kapatmıyor.

### P2 — Süreler için gösterilen kaynak, bütün sayısal aralıkları doğrudan desteklemiyor

**Konum:** Makale 302; ayrıca 282–287.

“Uyarım 8–12 gün” ve “uyarım başlangıcından taze transfere 2–3 hafta” aynı HFEA bağlantısına bağlanıyor. İncelenen HFEA sayfası tüm siklus için daha geniş süreler veriyor; bu iki alt dönem aralığını birebir belirtmiyor. [HFEA IVF açıklaması](https://www.hfea.gov.uk/treatments/explore-all-treatments/in-vitro-fertilisation-ivf/).

34–36 saat toplama aralığı ve transfer sonrası 10–12 gün test aralığında yakın doğrudan kaynak bulunmuyor. Metin testin kesin gününü ekibe bırakarak iyi bir sınır koyuyor; buna rağmen sayısal iddiaların kaynak izi güçlendirilmeli. Ön değerlendirme paragrafındaki ASRM kaynağı da Türkiye mevzuatının gerektirdiği enfeksiyon taramalarının hukuki kaynağı değildir.

**Gerekli işlem:** Aralıklar ilgili alt dönemi tarif eden kaynakla eşleştirilmeli; yalnızca geniş süreç sayfasına dayandırılmamalı. Bu audit sürelerin yanlış olduğu sonucuna varmıyor.

### P2 — Beş kurumsal/mevzuat kaynağı bilimsel makale gibi sınıflandırılıyor

**Kanıt:** 26 referansın hiçbirinde açık `type` yok. `journal` bulunduğu için kaynakça bunları “Bilimsel yayın”, Article şeması `ScholarlyArticle` olarak üretiyor. Özellikle şu beş kayıt yanlış türde:

| Kaynak | Uygun mevcut tür |
| --- | --- |
| WHO infertilite bilgi sayfası | `officialWebPage` |
| 2014 ÜYTE yönetmeliği | `regulation` |
| 2023 yönetmelik değişikliği | `regulation` |
| SART 2023 ulusal sonuç tablosu | `report` |
| HFEA IVF açıklaması | `officialWebPage` |

Kaynak türleri `src/content/config.ts:15` içinde zaten destekleniyor. `ReferenceList.astro:30` ve ArticleSchema mevcut türleri kullanabiliyor; bu hedef için geniş bileşen değişikliği gerekli görünmüyor.

**Etkisi:** Mevzuat, kayıt raporu ve hasta bilgi sayfası akademik makale gibi sunuluyor. Kaynak kalitesini ve AI/web atfını değerlendirmeyi zorlaştırıyor. Başlık/DOI doğruluğu bu tür hatasını kapatmıyor.

### P2 — Maliyet cevabı bağımsız portalı hizmet sunan klinik gibi konuşturuyor

**Konum:** Makale 413: “size yazılı olarak açıklarız”.

Maliyet kapsamını açıklamak hasta eğitimi açısından yararlı; yasak fiyat tablosu, indirim veya garanti yok. Sorun, bağımsız portalın okuyucuya kendi klinik hizmetini sunduğunu düşündüren birinci çoğul şahıs taahhüdü.

**Gerekli işlem:** Gerçek yanıtın kaydı bulunarak portalda kullanılacak düzenlenmiş karşılık hekimle eşleştirilmeli. Maliyet kalemleri hakkında bilgi korunmalı; kapsam daraltılmadan ve hekime yeni söz atfedilmeden hizmet taahhüdü çözülmeli.

## 3. Daha düşük öncelikli dil, yapı ve görsel bulguları

| Konum | Bulgu | Öneri / sınır |
| --- | --- | --- |
| Kısa cevap, satır 5 | Tanım cümlesi yaklaşık 34 sözcük; taze/dondurulmuş seçenekleri tek cümlede yüklü. | Tanım ve zaman seçeneği iki cümleye ayrılabilir. Bilgi ve belirsizlik korunmalı; sert sözcük kotası uygulanmamalı. |
| Kısa cevap kaynakları | Dört bağlantı özet altında; kaynak yığılması hissi veriyor. | Özetteki temel karar iddiası için en uygun 1–2 kaynak seçilebilir; diğer kaynaklar ilgili bölümde kalmalı. |
| AMH, HSG, FSH, AZFa/AZFb | Yeni okur için bazı kısaltmalar ilk kullanımda açıklanmıyor. AMH'nin tam adı yok. | İlk kullanımda kısa Türkçe açıklama; genetik ayrıntı temel rehberi baskılamamalı. |
| Görsel takvim | Gün 0/1–10/7–12/12–14/15–20/25–30 etiketleri var; günlerin hangi başlangıca göre sayıldığı açık değil. | Örnek taze siklus olduğu ve başlangıç noktası belirtilmeli. Metindeki kişiselleştirme uyarısı korunmalı. |
| Görsel takvim | “Yumurtalık uyarısı” doğal terim değil. Gün etiketleri alt metinde yok. | Sonraki görsel düzenlemede “yumurtalıkların uyarılması”; takvimin gerekli bilgisi metin karşılığıyla erişilebilir kılınmalı. Görsel bu tur değiştirilmedi. |
| Editoryal yöntem notu, satır 23 | `expertContribution` teknik alan adı okura gösteriliyor. | İç kayıt mekanizması yerine kontrolün somut kapsamı doğal Türkçeyle anlatılabilir. |
| İlk yayın tarihi | 2024-09-27 şemada mevcut; görünür künye inceleme/güncelleme tarihlerini gösteriyor. | Rehberin görünür ilk yayın tarihi beklentisi karşılanmalı. Tarih uydurulmamalı. |
| AMH SSS, satır 419 | Bilimsel çerçeve cümlesi hekim cevabının devamı gibi görünüyor. | Editoryal kaynak bağlantısı ile özgün hekim sözünün sınırı daha açık sunulabilir. |
| ESHRE ART Europe 2019 referansı | Gövdede belirli iddiaya yakın kullanım bulunamadı. | Genel arka plan kaynağıysa rolü açıklanmalı; bir iddia destekliyorsa yakınına taşınmalı. |
| PCOS 2023 referansı | Uzman katkısının kanıt notunda adı var; doğrudan bağlantı ilişkisi zayıf. | Tamamen kullanılmamış sayılmamalı; letrozol kararına izlenebilir bağlantı güçlendirilebilir. |
| Genel kanıt derecesi | `hideEvidenceGrade: true`, genel derece yok. Config karma kanıt için buna izin veriyor; AGENTS genel derece istiyor. | Proje belgeleri arasında politika farkı var. Build hatası değildir; bütün karma makaleye dayanaksız tek derece atanmamalı. |

Başlık, SEO açıklaması, tanım–endikasyon–süreç–başarı–risk–SSS sırası işlevsel. Yeni iki cevapta hekimin “dinlerim / değerlendiririm” sesi ve kişiselleştirilmiş karar yaklaşımı korunmuş. Gövde portal sesiyle, uzman katkısı ayrı hekim sesiyle sunuluyor. Büyük bir yeniden yazım gereksinimi bu ikinci audit'te saptanmadı.

## 4. Klinik iddia–kaynak kontrolü

| İddia | İkinci audit sonucu | Kaynak / sınır |
| --- | --- | --- |
| IVF her çiftte ilk seçenek değildir | Uygun ve koşullu | ESHRE açıklanamayan infertilite, ASRM tüp hastalığı ve erkek infertilitesi kaynaklarıyla uyumlu. |
| <35 yaş 12 ay; ≥35 yaş 6 ay; >40 yaş erken değerlendirme | Uyumlu | [ASRM 2021](https://www.asrm.org/practice-guidance/practice-committee-documents/fertility-evaluation-of-infertile-women-a-committee-opinion-2021/). Tedavi yaşı için evrensel üst sınır gibi kullanılmıyor. |
| Açıklanamayan infertilitede 3–4 uyarılmış IUI sonrası IVF | Genel sıra uyumlu; ilaç türü belirtilmemiş | [ASRM 2020](https://www.asrm.org/practice-guidance/practice-committee-documents/evidence-based-treatments-for-couples-with-unexplained-infertility-a-guideline-2020/) özellikle oral ajanlarla uyarımı tarif ediyor; her gonadotropin-IUI protokolüne genellenmemeli. |
| Düşük AMH tek başına IVF şart/gebelik imkânsız demek değildir | Uyumlu | [ASRM yumurtalık rezervi 2020](https://www.asrm.org/practice-guidance/practice-committee-documents/testing-and-interpreting-measures-of-ovarian-reserve-a-committee-opinion-2020/). Yanıt, yumurta kalitesiyle aynı şey sayılmıyor. |
| Her kontrolde rutin östradiol/progesteron şart değildir | ESHRE önerisinin yönüyle uyumlu | [ESHRE 2025 güncellemesi](https://pmc.ncbi.nlm.nih.gov/articles/PMC13061131/). Gerekli ölçümler dışlanmıyor. |
| Ağır erkek faktörü olmayan çiftlerde rutin ICSI daha iyi sonuç vermeyebilir | Popülasyon sınırı korunmuş | [INVICSI RCT](https://pubmed.ncbi.nlm.nih.gov/40217077/). Bütün ICSI endikasyonları etkisiz sayılmıyor. |
| Freeze-all herkeste toplam canlı doğum üstünlüğü sağlamaz | Uyumlu | [Cochrane 2021](https://www.cochrane.org/evidence/CD011184_fresh-versus-frozen-embryo-transfers-assisted-reproduction). OHSS güvenliği ve toplam başarı ayrılmış. |
| SART 41–42 yaş %11,3; >42 yaş %3,7 | Rakam ve payda doğrulandı | [SART 2023](https://www.sartcorsonline.com/CSR/PublicSnapshotReport?reportingYear=2023): ABD, kendi yumurtası, planlanan toplama başına ilk transfer sonucu. Tüm transferlerin kümülatif oranları veya Türkiye bireysel oranı değildir. |
| Tam AZFa/AZFb mikrodelesyonunda mikro-TESE önerilmemesi | Güncel rehberle uyumlu | [AUA/ASRM 2024 güncel PDF](https://www.auanet.org/documents/Guidelines/PDF/2024%20Guidelines/Male%20Infertility%20Unabridged%20Final.pdf). Makaledeki 2020 kaynak bu özel konuda ters düşmüyor; yeni sürüm bağlantısı düşünülebilir. |
| Çok yumurta tek başına dondurma kararı değildir; OHSS riski önemlidir | Ana ayrım uygun | [ASRM OHSS rehberi](https://www.asrm.org/practice-guidance/practice-committee-documents/prevention-of-moderate-and-severe-ovarian-hyperstimulation-syndrome-a-guideline-2023/). SSS 405'te yakın kaynak yok; gerçek hekim cevabının bilimsel izi güçlendirilmeli. |
| Gerekçeli PGT sonucu yetişmezse dondurma gerekebilir | Destekleniyor | [ESHRE PGT biyopsi önerileri 2020](https://pmc.ncbi.nlm.nih.gov/articles/PMC7257009/). Her hastaya PGT veya zorunlu freeze-all sonucu çıkarılmıyor. |
| Rahim içi sıvı / hidrosalpinks durumunda değerlendirme ve erteleme | Kaynak kimliği doğrulandı; bu tur tam metin kontrolü sınırlı | [D'Angelo 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC9522404/). Web erişiminde CAPTCHA/erişim sorunu görüldü; önceki audit'teki tam metin kontrolü bu tur tümüyle yeniden tamamlandı sayılmadı. |
| Yüksek progesteronda bütün tabloya göre karar | Güncel öneri yönüyle uyumlu; sayısal eşik eklenmemiş | ESHRE kaynak kimliği ve erişilebilen indeks metni incelendi; güncel tam PDF erişimi tamamlanamadı. |
| İnce endometrium tek sabit mm ile otomatik freeze-all gerekçesi değildir | Hekimin kişiselleştirilmiş yaklaşımı olarak sunulmuş | Sınırsız güvenlik veya her koşulda transfer önerisi olarak genellenmemeli. Yeni eşik/veri eklenmedi. |
| Transfer sayısı ve Türkiye'de tedavi koşulları | Bu tur tam güncel hukuki konsolidasyon doğrulanamadı | Resmî Gazete sayfalarına erişim başarısız. [Sağlık Bakanlığı hastane sayfası](https://trabzonkanunieah.saglik.gov.tr/TR-866540/embriyo-transferi.html) transfer sayısını destekliyor, ancak eski yönetmelik atfı bütün güncel değişiklikleri doğrulamıyor. |

PCOS'un PMOS olarak yeniden adlandırılması ilk bakışta şüpheli görünse de güncel [ASRM duyurusunda](https://www.asrm.org/news-and-events/asrm-news/latest-news/may-27-2026-pcos-is-now-pmos-understanding-the-name-change/) doğrulandı. Makaledeki bu bilgi hata diye işaretlenmedi. Eski kılavuzun tarihsel PCOS başlığı değiştirilmemeli.

## 5. Hekim yanıtlarının kayıt durumu

| Yanıt / soru | Mevcut kanıt | Audit durumu |
| --- | --- | --- |
| Doğrudan IVF mi, daha basit seçenekler mi? | `expertContribution`, 25 Eylül 2026, `approved` | Mevcut özgün katkı korundu. |
| AMH kaç olursa IVF? | Yukarıdaki katkının bağlama uygun AMH cümlesi | Yeni yanıt veya tarih üretilmemiş. |
| İlk olumsuz sonuçtan sonra plan | Kullanıcının bu sohbetteki 28 Eylül cevabı ve önceki audit kaydı | Anlam korundu; “siklus” sadeleştirilmiş. |
| OHSS dışı transfer erteleme | Kullanıcının bu sohbetteki 28 Eylül cevabı ve önceki audit kaydı | Dört gerekçe, kişisel karar ve endometrium belirsizliği korundu. |
| Ağrı, tüp tıkanıklığı, yaş, mikro-TESE, yüksek yanıt, döllenme, maliyet | Önceki yerel metin ve tarih belirten editoryal not | Yedi ham yanıtın köken/kullanım zinciri bu audit'te bağımsız doğrulanamadı. |

Yeni cevaplarda ek oran, klinik deneyim, milimetre eşiği veya “kesin tedavi işe yaramaz” yorumu üretilmemiş. “En sık” doğrulanmadığı için başlıkta bulunmaması doğru. Görünür tek SSS bölümünde 10 soru var; model cevaplarının yalnızca başlığını değiştirme yoluyla hekim cevabına dönüştürüldüğü sonucu bu audit'ten çıkarılamaz.

## 6. Teknik keşfedilebilirlik ve görünüm

| Kontrol | Yerel güncel çıktı | Canlı mevcut sürüm |
| --- | --- | --- |
| HTTP / canonical | Yerel önizleme çalışıyor; doğru canonical | Cache-bypass HTTP 200; doğru canonical |
| Dil / robots | `tr-TR`; index, follow, max-image-preview:large | Aynı |
| H1 | 1 | 1 |
| Yinelenen ID / eksik iç bölüm hedefi | Yok | Yok |
| İç URL hedefleri | Gövde ve render URL'leri yerel dist içinde çözülüyor | Bütün canlı iç URL'lere ayrı HTTP testi yapılmadı |
| SSS sayısı | 10; iki yeni yanıt mevcut | 12; iki yeni yanıt yok |
| Son değişiklik / inceleme | 28 Eylül / 25 Eylül | 25 Eylül / 25 Eylül |
| Şema | Üç ayrıştırılabilir JSON-LD bloğu; Article ve MedicalWebPage | Aynı ana yapı, eski kaynak listesi |
| Yazar kimliği | `https://senaiaksoy.net/#person` | Aynı |
| Konu | MedicalProcedure, IVF; Wikidata/Wikipedia bağlantıları | Mevcut |
| Kaynakça | 26 kayıt; tür hatası yukarıda | 18 kayıt; kurumsal kaynak tür sorunu burada da var |
| FAQPage | Yok | Yok |

FAQPage bulunmaması görünür/şema çelişkisi değildir; aynı sorulara ters düşen FAQ şeması yok. Yeni şema ekleme gereği bu audit'ten çıkarılmadı.

Canlı robots erişilebilir; botlar için genel engel saptanmadı. Sitemap hedef URL'yi 25 Eylül `lastmod` ile içeriyor; bu, canlı eski sürümle uyumlu. Bu kontroller indekslenme veya AI sistemlerince alıntılanma garantisi değildir.

Yerel kaynak ile mevcut dist aynı yeni iki yanıtı, 10 soruyu ve güncelleme tarihini taşıyor; dist kaynak değişikliğinden sonra üretilmiş. Bu tur yeniden build yapılmadığından önceki 26/26 preflight sonucu yeni bir test koşusu gibi raporlanmadı.

**Görsel kontrol:** 390 px mobil ve 1440 px masaüstünde yatay taşma saptanmadı; yeni cevaplar açılarak incelendi. Masaüstü SSS açma satırları en az 44 px. Tarayıcı konsolunda bu kontrolde hata/uyarı yok. Bu gözlemler tam WCAG denetimi, ekran okuyucu testi veya bütün klavye akışlarının doğrulanması değildir.

Hero ve iki gövde görseli incelendi. Sakin yetişkin sahneleri var; infant fotoğrafı, indirim, sonuç garantisi veya öncesi/sonrası sunumu yok. Hero 1600×900; responsive varyantlar ve eager yükleme mevcut. Gövde görselleri 1200×675, lazy ve ölçüleri belirtilmiş. Görsel takvimin gün bağlamı ve metin erişilebilirliği ayrıca yukarıda ele alındı.

İncelenen ekran görüntüleri:

- [Mobil](../../output/playwright/tup-bebek-nedir-detail-mobile-20260928.png)
- [Mobil açık cevap](../../output/playwright/tup-bebek-nedir-detail-answer-mobile-20260928.png)
- [Masaüstü ve onay ifadesi](../../output/playwright/tup-bebek-nedir-detail-desktop-20260928.png)

## 7. Kaynak kimlikleri ve erişim sınırları

19 PMID için başlık, yayın yılı ve DOI eşleşmesi başarılı:

`79723`, `40991339`, `34607703`, `37847771`, `37599566`, `35350465`, `33642065`, `33091963`, `32500103`, `38330980`, `40217077`, `38099867`, `37580314`, `32106976`, `33280722`, `41732035`, `33539543`, `36196080`, `32500104`.

Önceki yanlış AMH PMID'si düzeltilmiş; yeni bibliyografik uyuşmazlık saptanmadı. ESHRE açıklanamayan infertilite kaydının 2023 yılı ve 2025 stimulation güncellemesinin 2026 dergi yayını tutarlı.

Önemli erişim sınırları:

- Resmî Gazete 2014/2023 bağlantıları doğrudan açılamadı; en güncel konsolide mevzuat bütünü doğrulanamadı. Hukuki iddialar “tam güncel doğrulandı” diye sunulmamalı.
- D'Angelo 2022 tam metni bu turda erişim/CAPTCHA nedeniyle güvenilir biçimde yeniden okunamadı; bibliyografik kimliği doğrulandı.
- Önceki audit raporundaki ESHRE `updateNov-2025v22.pdf` bağlantısı artık bulunamıyor. Bu, makaledeki PMC bağlantısının bozuk olduğu anlamına gelmez. [ESHRE resmî güncel kılavuz sayfası](https://www.eshre.eu/OSGuideline) Eylül 2026 v23 PDF'sine yönlendiriyor; o PDF indirme denemesi zaman aşımına uğradı. Gelecek kanıt kaydı hareketli eski PDF yerine resmî giriş sayfasını da içermeli.
- PubMed/PMC bazı açma işlemlerinde CAPTCHA döndürdü. Erişilebilir indeks metni, resmî rehber sayfası ve NCBI kimlik kaydı ayrı kullanıldı; erişim başarısı tıbbi kaynak uyumu yerine geçirilmedi.

## 8. Audit'in üç ayrı sonucu

1. **Hasta eğitimi açısından değerli mi?** Evet. IVF tanımı, ilk seçenek olmayışı, süreç, paydası açıklanmış başarı ölçütleri, OHSS ve acil belirtiler yararlı. Kalan süreç sıralaması ve yaş sorusu kapsamı düzeltilmeli; onay sunumu okuru yanıltmamalı.
2. **AI/web yanıtlarında güvenle ikincil kaynak olarak alıntılanabilir mi?** Kaynakla eşleşmiş ve sınırları belirtilmiş açıklamalar için koşullu olarak evet. Yaşlı gruplardaki SART sayıları ülke/yıl/payda ile birlikte kullanılmalı. Hukuki güncellik, hekim yanıtlarının tamamının doğrulanması ve kurumsal kaynak türleri çözülmeden bütün sayfa için sınırsız güvenilirlik ilan edilmemeli. Yerel sürüm henüz canlıda bulunmuyor.
3. **Akademik kanıt sayılmasını ne engelliyor?** Makale hasta eğitimi için ikincil anlatımdır; özgün veri, çalışma protokolü, sistematik arama/seçim yöntemi ve akademik hakem değerlendirmesi sunmuyor. Gerçek uzman katkısı klinik karar değerini artırır, fakat birincil araştırma veya sistematik derleme yerine geçmez. Bilimsel iddiada esas atıf alttaki kılavuz/RCT/derlemeye yapılmalı.

## 9. Sonraki düzeltme için önerilen sıra

1. Güncel sürümün inceleme kapsamı ile otomatik onay ifadesini eşleştir; yedi eski cevabın mevcut ham kayıtlarını bul.
2. Progesteron başlangıcının süreçteki yerini ve yaş sorusunun kapsamını, gerçek yanıt ve kaynak sınırları içinde çöz.
3. Beş kaynak türünü açıkça belirt; sayısal süreler ve hukuki tarama iddiasını uygun doğrudan kaynakla eşleştir.
4. Maliyet cevabındaki hizmet taahhüdünü gerçek yanıtın onaylı portal karşılığıyla düzenle; jargon/özet/takvim/ilk yayın tarihi gibi düşük öncelikli sorunları tamamla.
5. Ancak değişiklik yapılırsa gerekli build/preflight ve render kontrollerini yeniden çalıştır. Genel tıbbi/yayın onayını, commit/push/deploy yetkisini ayrı tut.

Bu sıra bir düzeltme önerisidir; bu turda uygulanmamıştır.

## 10. Kullanıcı teyidi sonrası P1 kapanışı ve P2 düzeltmeleri

Yetki kaynağı: bu sohbetteki 28 Eylül 2026 kullanıcı mesajı, **“p1 tüm onaylar tamam. p2 leri de düzelt”**. Önceki audit'in iki P1 bulgusu kullanıcı teyidiyle kapatıldı. Bu, modelin özgün yanıtları yeniden bulduğu veya kendisinin tıbbi onay verdiği iddiası değildir. Var olan yanıt tarihleri ve 25 Eylül uzman katkısı korundu. Makale `reviewDate` kaydı 28 Eylül teyidiyle eşleştirildi; `reviewType: medical` açıkça belirtildi. Bu turdaki kaynak kontrolleri nedeniyle `evidenceAsOf` 28 Eylül'e alındı. Yazar ve reviewer kimlikleri değiştirilmedi.

Uygulanan P2 değişiklikleri:

| Bulgu | Düzenleme | Anlam / kaynak sınırı |
| --- | --- | --- |
| Progesteron sıralaması | Sekizinci adım yalnızca gebelik testi oldu. Ayrı paragraf taze siklusta progesteronun transferden önce, toplama akşamı–üçüncü gün aralığında başlatılmasını ve en az test gününe kadar sürdürülmesini açıklıyor. | ESHRE kaynağı; doz eklenmedi. FET'in protokole bağlı zamanlaması ayrı tutuldu. |
| Yaş sorusunun kapsamı | SSS sorusu “Yaşa göre değerlendirmeye ne zaman başlarsınız?” oldu; hekim yanıtı birebir korundu. Genel sağlık ve gebeliği güvenle taşıma değerlendirmesi kaynaklı portal paragrafı olarak başarı bölümüne eklendi. | ASRM 2025 etik görüşü. Yeni cümle hekimin özgün SSS cevabına katılmadı; evrensel üst yaş sınırı konmadı. |
| Süre / kaynak eşleşmesi | 8–12 günlük uyarım doğrudan Deaconess hastane IVF rehberine bağlandı. Toplam siklus yaklaşık 3–6 hafta olarak HFEA ile eşleştirildi; hazırlık ve ertelenen transfer ayrıldı. | Önceki 2–3 hafta alt dönem anlatımı, farklı kapsamı açıkça belirtilen toplam siklus açıklamasıyla değişti. Kaynak aynı sonuca aitmiş gibi sunulmadı. |
| Toplama ve test aralıkları | Kaynaklı yaklaşık 36 saat toplama; yaklaşık 12 gün transfer sonrası test ve ekibin kesin takvimi açıklandı. | Önceki 34–36 saat ve 10–12 gün aralıkları bu şekilde değişti. Bunlar kişisel uygulama talimatı veya tüm protokollerde değişmez eşik değildir. |
| Enfeksiyon taraması | Genel klinik değerlendirme ASRM'ye; tedavi hazırlığındaki enfeksiyon taraması NHS'ye ayrı bağlandı. | ASRM'ye dayanılarak Türkiye mevzuatı zorunluluğu iddiası çıkarıldı. Tarama bilgisi silinmedi; gereken testleri ekip belirler. |
| Kaynak türleri | WHO/HFEA `officialWebPage`, iki yönetmelik `regulation`, SART `report` olarak belirtildi. | Render'da sırasıyla WebPage/Legislation/Report; görünür kaynak etiketleri de doğru türde. |
| Portal hizmet sesi | “...size yazılı olarak açıklarız” yerine “...yazılı olarak açıklanır”. | Kalemler ve yazılı açıklama bilgisi korundu; yeni hizmet, fiyat, tavsiye veya gerekçe eklenmedi. |

Eklenen dört kaynağın kimliği: ASRM 2025 ileri ebeveyn yaşı etik görüşü; Deaconess IVF Treatment Guide; Worcestershire NHS IVF/embriyo transferi rehberi; NHS IVF hazırlık açıklaması. Kurumsal hasta rehberleri akademik araştırma diye etiketlenmedi. Kaynakça 26'dan 30'a çıktı.

Karşılaştırma kaydı: `%TEMP%/tup-bebek-nedir-before-p2-20260928.mdx`. Fidelity raporundaki sayı, süre ve link farkları yukarıdaki yetkili değişikliklerle karşılaştırıldı. Dokuz hekim cevabı ve özgün `expertContribution` birebir aynı; yalnızca maliyet cevabının son cümlesi dil bakımından değişti. SART sayıları/payda, OHSS/112 uyarısı, psikolojik destek ve yeni iki gerçek yanıt korundu.

Doğrulama:

- `npm run build`: başarılı, temiz süreç çıkışı. Hedef dışındaki sayfalara ait mevcut 7 içerik kalite uyarısı sürüyor.
- `npm run verify:preflight`: bütün 26 kontrol geçti.
- Yerel editoryal yardımcı: 0 aday bulgu; anlam doğruluğu ayrıca elle karşılaştırıldı.
- Yeni HTML: 10 SSS, 30 kaynak, 1 H1; yinelenen ID veya eksik bölüm hedefi yok. `#faq` ve `#dr-aksoy` korundu. Şema ayrıştırıldı, beş kaynak türü ve 28 Eylül inceleme tarihi doğrulandı.
- 390 px mobil ve 1440 px masaüstü tarayıcı kontrolü; maliyet ve süreç görünümü incelendi. Ekran görüntüleri `output/playwright/tup-bebek-nedir-p2-{mobile,desktop}-20260928.png`.
- `git diff --check`: temiz. Kaynak değişikliği yalnızca hedef makalede; önceki audit belgeleri korunarak bu rapora kapanış eklendi.

Güncel mevzuatın tüm değişikliklerinin konsolide doğrulaması, bu düzeltmeyle yapılmış sayılmadı; mevcut mevzuat bölümünün tedavi öncesinde güncel hükmü teyit ettirme sınırı korundu. P3 önerileri ayrı kapsamda kaldı. Commit, push veya deploy yapılmadı.

## 11. Üçüncü tur — humanize geçişi ve P3 düzeltmeleri

Yetki: kullanıcının 28 Eylül 2026 mesajı, “audit humanize düzelt”. Stil rehberi ve `senai-humanize` (TR) yeniden okundu. Başlangıç sürümü oturum scratchpad'inde `before.mdx` olarak saklandı.

| Konum | Önce | Sonra | Korunan anlam |
| --- | --- | --- | --- |
| Özet | 34 sözcüklük tek tanım cümlesi | Tanım ve taze/dondurulmuş transfer seçeneği iki cümlede | Garanti yok, ilk seçenek değil ve karar etkenleri aynı |
| Giriş | “…bilmek gerekir” tabela cümlesi; “aynı ay” tekrarı | Okurun ilk görüşmede duyduğu bilgiyle açılış ve yazının kapsamı | Süreç rehberi bağlantısı |
| Nedir | Beş kısa, kopuk cümle; OHSS/siklus ilk kullanımda açıklanmamış | İki paragraf; “tedavi döngüsü (siklus)” ve “yumurtalıkların aşırı uyarılması (OHSS)” açıklandı | Erteleme ≠ başarısızlık; embriyo oluşmayabilir; toplama/transfer ≠ gebelik |
| Açıklanamayan infertilite | Arka arkaya iki “gündeme alır” | ESHRE “ilk basamak olarak önerir”, ASRM “IVF'ye geçilmesini önerir” | `evidenceNote` ile aynı ifade; 3–4 siklus korundu |
| Kimlere, kapanış | Özel senaryolardan sonra gelen ve bölüm girişini tekrarlayan paragraf | IUI/cerrahi/tanı süreci paragrafı endikasyon listesinin hemen arkasına taşındı; H3 “Önceden dondurulmuş yumurta veya embriyo varsa” | Bağlantılar korundu |
| Süreç | Folikül tanımı ikinci adımda, terim ilk olarak birinci adımda geçiyordu | Tanım ilk kullanıma taşındı; tekrar eden “takvimi izleyin” cümlesi kaldırıldı | Test günü ve progesteron zamanlaması, ekip takvimi sınırı |
| Freeze-all | İki paragraf ve görsel sonrası tekrar eden “genel çerçeve” cümlesi | Tek paragraf; HFEA atfı görsel altı yazısına taşındı | Cochrane sonucu ve güvenlik önceliği |
| Süreç görseli (P3) | Gün etiketlerinin başlangıç noktası belirsiz; alt metinde gün yok | Görsel altı yazısı: örnek taze transfer siklusu, gün 1 = ilaç başlangıcı, kişiye göre değişir. Alt metne gün aralıkları eklendi | Görsel dosyası değişmedi; “Yumurtalık uyarısı” etiketi görselde kaldı |
| Başarı | Önceki deneme/freeze-all cümlesi süreç bölümünü ve SSS'yi tekrarlıyordu | İlk cümle korunup `#faq` bağlantısıyla SSS'ye yönlendirildi | Freeze-all ölçütleri süreç bölümünde ve transfer erteleme yanıtında duruyor |
| AMH (P3) | Kısaltma açılmamıştı; tablo, gövdedeki sınırı tekrarlıyordu | “anti-Müllerian hormon” eklendi; tablo hücresi kısaltıldı | Kalite ölçmez sınırı kaldı; gebelik sınırı gövdede ve hekim yanıtında duruyor |
| Riskler | “nadiren” iki kez; “tetikleme stratejisi” terim tutarsızlığı | “seyrek olarak”; “çatlatma iğnesinin türü” | Heterotopik gebelik ve ağrı/kanama uyarısı |
| Bağlantı kalıbı | “…bakabilirsiniz” 12 kez | 3 kez; diğer bağlantılar cümle içine alındı | Tüm iç bağlantılar kaldı (taze/dondurulmuş transfer yinelenmesi birleşti) |
| SSS (P3) | HSG, AZFa/AZFb, FSH açıklamasızdı; AMH altındaki kaynak cümlesi hekim sözü gibi okunuyordu | Parantez içi terim açıklamaları; “*Editör notu:*” etiketi | Hekim yanıtlarının cümleleri ve anlamı değişmedi |

Değişmeyenler: `expertContribution`, yazar/reviewer/tarih alanları, kaynakça, slug, görseller, TOC anchor'ları, SART sayıları, mevzuat hükümleri, 112/OHSS uyarısı.

Açık kalanlar: özet altındaki dört kaynak (P3), görseldeki “Yumurtalık uyarısı” etiketi ve 1–10 günlük uyarım aralığının metindeki 8–12 günle görsel uyumsuzluğu (görsel yeniden üretilirse düzeltilmeli), görünür ilk yayın tarihi, genel kanıt derecesi politika farkı.

Doğrulama: `check-fidelity` sayı/süre/atıf farkı yok (yalnızca bağlantı birleştirmeleri); `editorial-check` 0 aday; `npm run build` başarılı (hedef dışı 7 mevcut uyarı); `npm run verify:preflight` tüm kontroller geçti; render'da 1 H1, yinelenen ID yok, figcaption HFEA bağlantısı ve `#faq` iç bağlantısı çalışıyor. Commit, push ve deploy yapılmadı.
