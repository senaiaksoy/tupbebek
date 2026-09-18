# Beta-hCG: geniş yeniden audit

Tarih: 18 Eylül 2026. İncelenen başlangıç sürümü: yerel çalışma ağacındaki `src/content/articles/beta-hcg-testi.mdx` ve bu sürümden önceki düzeltme turunda üretilmiş `dist/makaleler/beta-hcg-testi/index.html`. Bu rapordaki P2 bulguları takip düzeltmesiyle aynı çalışma kapsamında giderildi; build sonrası doğrulama raporun sonundadır. Bulgular canlı sitenin güncel sürümüne mal edilmemelidir.

## Karar

Yeni bir P0/P1 güvenlik hatası saptanmadı. Önceki düzeltmeler temel yanlış güvence ve tedavi yönlendirme risklerini önemli ölçüde gidermiş. Üç P2 bulgu takip düzeltmesiyle giderildi; dört P3 bulgu gelecekteki editoryal iyileştirme olarak kaldı. “Hiç sorun yok” sonucu verilmez; kaynakların desteklediği yargının sınırı ve test/hormon kimlik ayrımı için yapılan düzeltmeler ayrıca doğrulandı.

| Zorunlu değerlendirme | Sonuç |
|---|---|
| Hasta eğitimi açısından değerli mi? | Evet. Test gününü, tek değerin sınırını, ilaç planını, acil belirtileri ve takip gereğini açıklıyor. Düşük değer için kesin kayıp veya kesin iyilik iddiası yok. |
| AI/web yanıtlarında ikincil kaynak olarak alıntılanabilir mi? | Klinik bağlamı korunarak evet; bütün paragraflar aynı ölçüde güçlü değil. Aşağıdaki P2 kaynaklandırma sorunları düzeltilmeli. Sayısal eşik aktarılacaksa ilgili birincil çalışma ve hasta grubu birlikte belirtilmeli. Yerel keşfedilebilirlik var; gerçek indekslenme veya bir modelin alıntı yapması kanıtlanmış değil. |
| Neden birincil akademik kanıt değil? | Özgün hasta verisi, araştırma protokolü, sistematik tarama/seçim yöntemi ve bağımsız dergi hakemliği sunmuyor. Hekim katkısı klinik yorum değeri sağlar; gözlemsel çalışmanın veya kılavuzun yerine geçmez. |

## Öncelikli bulgular

### P2-1 — Seri artış tablosunda kaynak kapsamını aşan dil

Konum: `src/content/articles/beta-hcg-testi.mdx:272` ve `:275`.

“Dış gebelik veya erken kayıp riskini artırır” ifadesi, yavaş artışın riskin nedeni olduğu biçiminde okunabilir; burada anlatılan bir uyarıcı bulgu/ilişkidir. “Çok hızlı katlanma” tanımlanmadan “sağlıklı tekil gebeliklerde de sık görülür” denmesi de kaynaklandırılmamış sıklık iddiasıdır. Yakındaki Barnhart 2016 kohortu sonunda rahim içi gebeliği doğrulanan 285 kadını inceler; bu tablo satırları için dış gebelik riskini veya tanımsız hızlı katlanmanın toplumdaki sıklığını ölçmez.

Uygulandı: “Dış gebelik veya erken kayıp olasılığını düşündürebilir” ve “Tekil gebeliklerde de görülebilir” biçimine daraltıldı; “tek başına tanı koydurmaz” uyarısı korundu. [Barnhart 2016](https://pubmed.ncbi.nlm.nih.gov/27500326/), [NICE NG126](https://www.nice.org.uk/guidance/NG126/chapter/diagnosis-of-viable-intrauterine-pregnancy-and-of-tubal-ectopic-pregnancy).

### P2-2 — Taze/FET karşılaştırması gereğinden kesin ve doğrudan kaynaksız

Konum: `src/content/articles/beta-hcg-testi.mdx:283-285`.

“Bu iki farklı protokolün aynı güne ait kan değerlerini birbiriyle kıyaslamak doğru değildir” cümlesi, koşullar eşleştirilse bile hiçbir karşılaştırma yapılamaz gibi okunuyor. Bölüm, hormon ortamı ile hCG seyri arasında açıklama kuruyor ama bu özel ilişki için doğrudan çalışma göstermiyor; dahili rehber bağlantısı tek başına iddia-kaynak eşleşmesini sağlamaz. Makaledeki Li 2015 çalışması dış gebelik oranlarını inceler; serum hCG eğrilerinin karşılaştırılamayacağını göstermez.

Uygulandı: Yargı, test günü, embriyo gelişim günü ve kullanılan ilaçlar bilinmeden doğrudan kıyas yapılamayacağıyla sınırlandı; FET seyri tek başına tedavi sonucu olarak yorumlanmıyor. [Li 2015](https://pubmed.ncbi.nlm.nih.gov/26202917/).

### P2-3 — Yapılandırılmış veride test ile hormon aynı varlık gibi gösteriliyor

Konum: `src/components/ArticleSchema.astro:248`, `:372-375`, `:394-395`; yerel HTML'de de doğrulandı.

`about` doğru biçimde `MedicalTest` / “Beta-hCG testi” olarak üretiliyor. Buna karşın `alternateName` içinde hormonun adı var; `sameAs` ise `Human_chorionic_gonadotropin` sayfasına bağlanıyor. Ölçüm işlemi ile ölçülen hormon aynı varlık değildir. Schema.org, `sameAs` alanını bir varlığın kimliğini açıkça tanımlayan sayfa için tarif eder.

Uygulandı: Doğrulanmış test kimliği bulunmadığı için hormonun Wikidata/Wikipedia URL'leri `sameAs` alanından kaldırıldı; `MedicalTest` adı ve test odaklı alternatif adlar korundu. Yeni bir Wikidata Q-ID tahmin edilmedi. Bu bulgu bir arama cezası veya sıralama kaybının kanıtı değildir. [Schema.org sameAs](https://schema.org/sameAs).

## Daha düşük öncelikli bulgular

### P3-1 — Ultrason sayılarında örneklem ve sonuç tanımı eksik

Konum: makale `:301` ve `:378-383`.

3.510 ve 3.994 mIU/mL değerleri kaynaklarla eşleşiyor; “katı tanı sınırı değildir” uyarısı mevcut. Buna rağmen ana metindeki “sağlıklı ... %99 olasılıkla izlendiği” ifadesi model tahmini ile genel sağlık güvencesini birbirine yaklaştırıyor. Connolly çalışması ağrı/kanamayla değerlendirilen 651 gebelikte, 366 yaşayabilir gebeliğin verilerini kullanır. Park geriye dönük serisinde 144 canlı doğum, 87 erken kayıp ve 59 dış gebelik vardır. Bu sonuçlar tüm IVF hastalarına özgü evrensel eşik değildir.

Öneri: “Araştırmadaki yaşayabilir gebeliklerde modelin tahmin ettiği görünürlük” ifadesi; hasta grubu ve geriye dönük tasarım için kısa bir açıklama. Ayrıntı teknik notta tutulabilir. [Connolly 2013](https://pubmed.ncbi.nlm.nih.gov/23262929/), [Park 2023](https://pubmed.ncbi.nlm.nih.gov/37563479/).

### P3-2 — Hasta dili ve tekrarlar

Konum: başlık `:2`, giriş, `:247-258`, `:283`, `:295`, `:356-362`, `:387`.

“Kanıt tabanlı yorumu”, “endometrial ortam”, “plasenta tutunma dinamikleri”, “hormon replasmanı”, “discriminatory zone”, “insidans”, “1. persentil” ve “ayırıcı tanı algoritması” aynı metinde birikiyor. Teknik notta açıklanmış terimler kullanılabilir; ana başlık ve hasta akışı daha sade olabilir. “İkiye katlanma şart değil” mesajı kısa cevap, seri artış girişi, izleyen paragraf, teknik not ve SSS'de tekrar ediyor. SSS tekrarı tek başına sorun değil; art arda iki giriş cümlesi gereksiz.

Öneri: Ana akışta “rahim iç tabakası”, “hormonlarla hazırlık”, “ultrasonda kesenin görülmesi” gibi karşılıklar; akademik ayrıntıyı teknik nota taşıma ve yakın tekrarları kısaltma. Otomatik bir Türkçe okunabilirlik ölçeği uygulanmadı; “kesin 8–10. sınıf düzeyi” puanı verilmez.

### P3-3 — Kısa cevaba erişimi geciktiren başlangıç yerleşimi

Masaüstü ve 390 piksel genişliğindeki yerel tarayıcı görünümünde breadcrumb ile ana başlık arasında belirgin boşluk var. Uzun H1, yazar bilgileri ve boşluk kısa cevabı aşağı itiyor; dar görünümde ilk ekrana cevabın ancak başlangıcı sığıyor. İncelenen tablo ve metin kesilmiyor.

Öneri: Üst boşluğu azaltmak ve H1'i sadeleştirmek. Başlangıçta acil belirtiler bölümüne kısa bir bağlantı eklenmesi değerlendirilebilir; mevcut gövdede acil uyarılar zaten var. Yeni bir klinik iddia eklemeye gerek yok.

### P3-4 — Bibliyografik ayrıntı ve sürüm kaydı

Sekiz bilimsel kaynağın PMID, DOI, başlık ve yıl bilgileri eşleşiyor. Görünür listede yazar/dergi/yıl ve PubMed bağlantısı var; cilt, sayı, sayfa veya makale numarası yok. DOI'ler yapılandırılmış veride mevcut olsa da PubMed'li kaynaklarda görünür listede ayrıca sunulmuyor. Resmî web kaynaklarında erişim tarihi görünmüyor. Bu durum kaynakları bulunamaz kılmıyor; akademik kaynakça taşınabilirliğini ve değişen web sayfalarının sürüm izini azaltıyor.

Öneri: Kaynakça şeması destekliyorsa bibliyografik ayrıntıları ve doğrulanmış erişim tarihini tamamlamak. Tarih bilinmiyorsa uydurmamak. ACOG FAQ için mevcut 2022 yılının güncel sayfa üzerindeki tarih karşılığı bu turda teyit edilemedi.

## Uzman yanıtı ve onay

Kullanıcının bu konuşmada verdiği gerçek yanıt, soru, 18 Eylül 2026 tarihi ve açık tıbbi onay frontmatter'da var; görünür hekim kutusunda soru, yanıt, imza, tarih ve onay durumu gösteriliyor. Yeni veya farklı bir hekim yanıtı üretilmedi. Yazarla inceleyenin aynı kişi olması üst künyede açık; bağımsız ikinci hekim incelemesi iddiası yapılmıyor.

Yanıttaki “48 saat arayla beta-hCG ve vajinal ultrasonla izlerim” ifadesi kişisel klinik yaklaşım bağlamında. Bunun her durumda 48 saatte bir ultrason zorunluluğu diye genellenmemesi için gövdede ultrason aralığını hekimin bulgulara göre belirlediği kısa biçimde açıklanabilir. NICE'taki %63'ten fazla artış için 7–14 günlük ultrason önerisi farklı bir izlem dalıdır; bunu düşük/yavaş artış hakkındaki hekim yanıtıyla doğrudan çelişki saymıyorum. Alıntı editör tarafından değiştirilmemeli. [NICE NG126](https://www.nice.org.uk/guidance/NG126/chapter/diagnosis-of-viable-intrauterine-pregnancy-and-of-tubal-ectopic-pregnancy).

## Kaynak denetimi

Europe PMC'nin güncel PubMed kayıtları ve özetleri üzerinden sekiz yayın kimliği kontrol edildi. Bu işlem sekiz makalenin tam metninin tamamının yeniden okunması anlamına gelmez. API kayıtlarında retraction/correction işareti görülmedi; Park için bir ön baskı bağlantısı var. Bu, kapsamlı geri çekilme taraması yerine geçmez.

| Yayın | PMID | DOI | Sonuç |
|---|---|---|---|
| Barnhart 2004 | 15229000 | 10.1097/01.AOG.0000128174.48843.12 | Kimlik eşleşti; %53 bağlamı kontrol edildi |
| Barnhart 2016 | 27500326 | 10.1097/AOG.0000000000001568 | Kimlik, 285 kişi ve %49/%40/%33 eşleşti |
| Connolly 2013 | 23262929 | 10.1097/AOG.0b013e318278f421 | Kimlik ve 3.510 model tahmini eşleşti |
| Park 2023 | 37563479 | 10.1007/s43032-023-01308-7 | Kimlik ve 3.994 model tahmini eşleşti |
| Maleki 2021 | 34653918 | 10.1016/j.ejogrb.2021.09.031 | Düzeltilmiş DOI eşleşti; derleme |
| Li 2015 | 26202917 | 10.1093/humrep/dev168 | Kimlik ve 44.102 gebelik eşleşti; ilişki nedensellik olarak sunulmuyor |
| Annan 2013 | 23864915 | 10.4021/jocmr1008w | Kimlik eşleşti; derleme |
| Jin 2024 | 38279942 | 10.1002/uog.27593 | Kimlik eşleşti; gözlemsel çalışma |

Resmî kaynaklarda yeniden kontrol edilen noktalar:

- [Mayo test kataloğu](https://www.mayocliniclabs.com/test-catalog/overview/80678): negatif <5 IU/L örneği doğru; evrensel 50 eşiği makalede yok.
- [Gateshead hasta rehberi](https://www.gatesheadhealth.nhs.uk/resources/ivf-booklet/): 5. gün transferinden 12 gün, 3. gün transferinden 14 gün sonra test, gerçekten bu merkezin protokolü. Makale bunu evrenselleştirmiyor.
- [Guy's and St Thomas'](https://www.guysandstthomas.nhs.uk/health-information/ivf-treatment/results-your-pregnancy-test): negatif planlı test sonrası progesteron bırakma talimatı mevcut; makale kişiyi kendi kararına değil tedavi ekibinin planına yönlendiriyor.
- [EMA Ovitrelle ürün bilgisi](https://www.ema.europa.eu/en/documents/product-information/ovitrelle-epar-product-information_en.pdf): 10 güne kadar kan/idrar hCG testine etki, resmî dizinlenmiş metinde teyit edildi. Tüm ilaçlar için aynı süre ileri sürülmüyor.
- [NICE NG126 tanı bölümü](https://www.nice.org.uk/guidance/NG126/chapter/diagnosis-of-viable-intrauterine-pregnancy-and-of-tubal-ectopic-pregnancy): 48 saatlik örnekleme ve klinik izlem bağlamı resmî dizinlenmiş metinden kontrol edildi. Doğrudan sayfa açılışı 403 verdi; tüm güncel bölümün kesintisiz tam metin erişimi sağlandı denemez.
- [NICE metotreksat bölümü](https://www.nice.org.uk/guidance/NG126/chapter/management-of-tubal-ectopic-pregnancy): ilk başvuruda kesin dış gebelik tanısı ve yaşayabilir rahim içi gebeliğin dışlanması koşulu resmî dizinlenmiş metinde eşleşti.
- [ACOG hasta bilgisi](https://www.acog.org/womens-health/faqs/ectopic-pregnancy): şiddetli ağrı, omuz ağrısı, güçsüzlük/baş dönmesi/bayılma uyarıları resmî dizinlenmiş metinde eşleşti. Practice Bulletin 193'ün güncel tam metni bu turda yeniden okunmadı; makalenin güvenlik hükümleri yalnızca bu kaynağa dayanmıyor.
- [NHS gebelik taramaları](https://www.nhs.uk/pregnancy/your-pregnancy-care/screening-tests/): kaynak erişilebilir; rutin tarama bağlamına uygun. Erken tek beta-hCG değeri ile anomali riskini nicelleştiren doğrudan bir çalışma olarak sunulmamalı.
- [NICE NG137](https://www.nice.org.uk/guidance/ng137/chapter/Recommendations): ultrasonla koryonisite/amniyonisite değerlendirmesi doğrulandı; “ikiz için mutlaka iki ayrı kese” iddiası geri dönmemiş.
- NG126'nın 17 Haziran 2026 güncelleme tarihi [NICE yayımlanmış rehberler listesinde](https://www.nice.org.uk/guidance/published?ngt=Clinical+guidelines&ngt=NICE+guidelines) teyit edildi.

## Render, SEO ve erişilebilirlik

| Kontrol | Sonuç ve sınır |
|---|---|
| Tek H1, canonical, robots | Yerel HTML'de tek H1, doğru üretim canonical'ı; noindex/nosnippet yok |
| JSON-LD | Ayrıştırılıyor; Article + MedicalWebPage, 17 citation; `MedicalTest` var ve yanlış hormon `sameAs` eşlemesi kaldırıldı |
| Yazar ve reviewer | Kanonik kişi `https://senaiaksoy.net/#person`; tarih 2026-09-18 |
| Kaynak ve uzman görünürlüğü | Kaynaklar, gerçek soru/yanıt ve onay tarayıcı erişilebilirlik ağacında mevcut |
| Dahili bağlantılar | Makaledeki 8 benzersiz kök bağlantının yerel hedefleri var; içerik doğrulukları bu audit kapsamında yeniden incelenmedi |
| Bölüm bağlantıları | Hedef ID'ler mevcut; seri artış bağlantısı tarayıcıda doğru bölüme taşıdı |
| ID çakışması | Yerel HTML'de yinelenen ID saptanmadı |
| Sitemap / arama dizini | Makale yerel sitemap ve arama dizininde mevcut |
| Yanlış grafik | “48 saatte en az iki katı” grafiği render edilmiş makalede yok |
| Dar görünüm | 390×844 iframe içindeki gerçek makale incelendi; başlık/metin ve Barnhart tablosu okunuyor. Gerçek telefon veya dokunmatik cihaz testi değildir |
| Akordiyon | Fareyle açıldı; Enter ile kapandı; expanded/collapsed durumu erişilebilirlik ağacında değişti |
| Erişilebilirlik sınırı | Tam WCAG, kontrast, tüm odak sırası ve ekran okuyucu cihaz testi yapılmadı. AX ağacında liste numarası tekrarı görüldü; kullanıcı etkisi bağımsız ekran okuyucuyla doğrulanmadığı için kesin hata olarak sınıflanmadı |
| Performans / canlı site | Bu turda Lighthouse, Core Web Vitals, Search Console veya cache-bypass üretim doğrulaması yapılmadı |

Önceki turdaki build ve kontroller bu raporun yeni çalıştırdığı kontroller gibi sunulmadı. Takip düzeltmesinden sonra tam build, Pagefind ve hedefli HTML/JSON-LD doğrulaması yeniden çalıştırıldı.

## Kapsam ve değişmezlik kanıtı

Takip düzeltmesi sonrası makale SHA-256 değeri:

`E026C669FA2078C8F2A485A78E37D304004F26C12CC41D30D9C5BA904F4315D6`

Diğer iki transfer makalesinin önceden var olan çalışma ağacı değişikliklerine dokunulmadı. Denetim yardımcıları `.cache/` altında; kalıcı çıktı bu rapordur. Commit kapsamı yalnızca bu rapor, beta-hCG makalesi ve ArticleSchema düzeltmesidir.
