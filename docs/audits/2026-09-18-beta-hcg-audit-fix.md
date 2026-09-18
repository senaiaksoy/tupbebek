# Beta-hCG makalesi: audit ve düzeltme

Tarih: 18 Eylül 2026. Kapsam: `src/content/articles/beta-hcg-testi.mdx` ve kullanıcı tarafından paylaşılan önceki audit raporu. Düzeltme Cloudflare Pages production'a yayımlandı; cache-bypass özel alan adı doğrulaması tamamlandı.

## Üç temel sonuç

1. **Hasta eğitimi açısından değerli:** Evet. Düzeltilmiş metin test zamanlamasını, tek sayının sınırını, ilaç planını ve acil belirtileri açıklıyor. Düşük değer için gereksiz güvence vermeden izlem gereğini koruyor.
2. **AI/web yanıtlarında ikincil kaynak olarak kullanılabilir:** Düzeltilmiş ve tıbben onaylanmış sürüm, klinik bağlamı korunarak kullanılabilir. Sayısal sınırlar kişisel tanı eşiği değildir. Yerel HTML keşfedilebilirlik kontrolleri ve cache-bypass özel alan adı doğrulaması geçti. Arama motorlarının alıntı yapacağına ilişkin bir garanti yoktur.
3. **Birincil akademik kanıt değildir:** Özgün araştırma verisi, önceden tanımlı sistematik tarama yöntemi veya bağımsız dergi hakemliği sunmuyor. Hasta eğitimi ve klinik yorum, dayanak çalışmaların yerine geçmez. Önceki rapordaki puanlar ve testlerin geçmesi bilimsel geçerliliğin ölçüsü değildir.

## Bulgular ve uygulanan düzeltmeler

| Öncelik | Bulgu | Düzeltme ve dayanak |
|---|---|---|
| P1 | Grafik “Sağlıklı Gebelik (48 saatte ≥2 katı)” diyerek metinle çelişiyordu. | Görsel dosyası açılıp incelendi; makaledeki kullanımı kaldırıldı. Sayısal tablo korundu. [Barnhart 2016](https://pmc.ncbi.nlm.nih.gov/articles/PMC4993627/) ikiye katlanmayı zorunlu kılmaz. |
| P1 | `5–50` gri alan ve `>50` pozitif sınırı evrenselmiş gibi veriliyordu. | Laboratuvar raporuna bağlı yorum getirildi; 5 IU/L negatif sınırı yalnızca kaynak örneği olarak açıklandı. [Mayo Clinic Laboratories](https://www.mayocliniclabs.com/test-catalog/overview/80678). |
| P1 | Biyokimyasal gebelik rahim içine tutunmanın kanıtı sayılıyordu. | Yerleşimin hCG ile doğrulanamayacağı, düşen hCG'de de izlem gerektiği belirtildi. Kesin neden ve sonraki başarı güvencesi çıkarıldı. [Annan 2013](https://pubmed.ncbi.nlm.nih.gov/23864915/), [NICE NG126](https://www.nice.org.uk/guidance/ng126). |
| P1 | Düşük hCG için anomali riski sorusuna kategorik “Hayır” yanıtı veriliyordu. | Tek erken değerin yapısal/kromozomal değerlendirme yapamayacağı ve rutin taramaların gerektiği açıklandı. [NHS gebelik taramaları](https://www.nhs.uk/pregnancy/your-pregnancy-care/screening-tests/). |
| P1 | Yeni uzman katkısının gerçek yanıt/onay dayanağı ekli rapordan doğrulanamıyordu. | Bu oturumda konuya özel soru soruldu. Kullanıcı gerçek yanıtı ve “tıbbi onay verildi bugün” teyidini sağladı. Önceki katkı yerine bu yanıt değiştirilmeden, `answeredAt: 2026-09-18` ve `approvalStatus: approved` ile kaydedildi. |
| P2 | Genel `%35–50` artış güvencesi ve kesin tekrar-test talimatı vardı. | Bağlamsız yüzde güvencesi çıkarıldı. Barnhart'ın 285 kişilik semptomatik kohortu ve 1. persentil bağlamı açıklandı. NICE'ın PUL için klinik değerlendirme eşiğinin aynı şey olmadığı belirtildi. |
| P2 | hCG ilacı etkisi yalnızca taze transfere bağlanıyor ve bütün ilaçlar için 10–14 gün deniyordu. | Kullanılan ilaca bağlılık açıklandı; rekombinant hCG için enjeksiyondan sonra 10 gün örneği resmî ürün bilgisine bağlandı. [EMA](https://www.ema.europa.eu/en/documents/product-information/ovitrelle-epar-product-information_en.pdf). |
| P2 | İlaçları “asla” bırakmama dili, planlı negatif test sonrası hekim talimatını belirsizleştiriyordu. | Kendi kararınızla kesmeyin veya uzatmayın; tedavi ekibinin planını izleyin olarak düzeltildi. [Guy's and St Thomas' NHS](https://www.guysandstthomas.nhs.uk/health-information/ivf-treatment/results-your-pregnancy-test). |
| P2 | Metotreksat açıklaması kılavuzun ilk başvuru koşuluyla kalıcı PUL yönetimini ayırmıyordu. | NICE ilk başvuru koşulu açıkça adlandırıldı; uzayan belirsizlikte uzman değerlendirmesi korundu. [NICE](https://www.nice.org.uk/guidance/NG126/chapter/management-of-tubal-ectopic-pregnancy), [Jin 2024](https://doi.org/10.1002/uog.27593). |
| P2 | Maleki kaynağında DOI yanlıştı. | `10.1016/j.ejogrb.2021.10.012` yerine `10.1016/j.ejogrb.2021.09.031` yazıldı. [PubMed kaydı](https://pubmed.ncbi.nlm.nih.gov/34653918/). |
| P2 | Tek embriyo transferiyle risk azalması nedensel ve zamansız anlatılıyordu; eski heterotopik oranlar genelleniyordu. | Li çalışmasının 44.102 gebeliklik gözlemsel bağlamı eklendi; eski oranlar ve bugünkü pratiğe ilişkin kesin azalma iddiası çıkarıldı. [Li 2015](https://pubmed.ncbi.nlm.nih.gov/26202917/). |
| P2 | İkiz tanısı için iki ayrı kese zorunlu tutuluyor; lekelenme “tutunma” ile açıklanıyordu. | Ultrason değerlendirmesi esas alındı; lekelenmenin nedeninin yalnızca renkle belirlenemeyeceği açıklandı. Acil kanama uyarısı parlak kırmızı renkle sınırlandırılmadı. [NICE NG137](https://www.nice.org.uk/guidance/ng137/chapter/Recommendations). |

Özet üç cümleye indirildi. Girişteki doğrulanmamış “hastalarıma” gözlemi çıkarıldı. Test takvimi evrensel reçete yerine açıkça adlandırılmış merkez örneğine bağlandı. Kaynaklara dayanan genel metin ile hekimin gerçek yanıtı ayrıldı.

## Doğrulama

- `npm run build`: başarılı; Pagefind 63 makaleyi indeksledi. MDX içinde ham kanıt işaretinin yol açtığı `B is not defined` hatası, mevcut `InlineEvidence` bileşeni kullanılarak giderildi; son derleme başarılı.
- Preflight: 23/23 kontrol geçti; canlı SEMrush örnekleri ve deploy hedefi dahil.
- Üretilmiş HTML: tek H1, doğru canonical, `Article.about = MedicalTest`, kanonik yazar kimliği, 17 kaynak kaydı, uzman yanıtının görünürlüğü, içindekiler bağlantıları ve kanıt etiketi doğrulandı.
- Yanlış grafik ve yanlış DOI'nin HTML'de bulunmadığı; sayfanın noindex/nosnippet taşımadığı, sitemap ve arama indeksinde bulunduğu doğrulandı.
- Mobil tarayıcı yerleşimi bu oturumda ayrıca test edilmedi. Yukarıdaki render kanıtı yerel üretilmiş HTML'e aittir.
- Cloudflare Pages production kaydı `eaf2c690-2a55-4b94-85a3-1679de27239f`; cache-bypass özel alan adı isteklerinde üç hedef makale `200`, canonical doğru ve `noindex` yoktu.
- Başlangıçta değişmiş olan `ArticleSchema.astro`, `embriyo-transferi-gun-secimi.mdx` ve `embriyo-transferi-sonrasi-bakim.mdx` dosyaları bu oturumda değiştirilmedi; SHA-256 karşılaştırmasıyla doğrulandı.

## Onay ve yayın durumu

Uzman yanıtı ve tıbbi onay bu oturumda alındı; makalenin `published` durumu korunuyor. Kullanıcının verdiği hekim yanıtı yeniden yazılmadı. Guarded deploy tamamlandı; commit ve push bu kayıt güncellemesinden sonra yapılacak, IndexNow ayrıca çalıştırılmadı.
