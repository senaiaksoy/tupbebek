# E-kitap içerik denetimi: 30 Günlük Tüp Bebek Beslenme Planı (2026-10-04)

**Dosya:** `public/e-kitap/tup-bebek-beslenme-plani.html` (PDF bu dosyadan üretilir: `scripts/generate-pdf.js`)
**Neden:** Sayfa aramaya açılacak ve beslenme içeriklerinden link alacak. Dr. Aksoy 2026-10-04'te "önce içerik, sonra açılış" kararını verdi: içerik onaylı biçimde düzeltilene kadar sitemap ve makale linkleri bekliyor.
**Künye:** PR #265 ile ayrıca düzeltildi (Tıbbi Danışma Kurulu ifadesi, yazar şeması, tarihler).
**Durum:** Öneri aşaması. Aşağıdaki "önerilen yön" sütunu editör önerisidir; Dr. Aksoy'un görüşü veya onayı değildir. Hiçbir metin değiştirilmedi.

Kaynak doğrulaması: PubMed, 2026-10-04 (PMID ve DOI'ler aşağıda). Ananas ve bromelain için PubMed'de (`(pineapple OR bromelain) AND (IVF OR "embryo transfer" OR implantation OR infertility)`, başlık ve özet) insan klinik çalışması bulunamadı; çıkan 8 kaydın tamamı hayvan çalışması, laboratuvar çalışması veya derleme.

## Öncelik 1: tıbbi doğruluk, sitedeki makalelerle çelişki, mevzuat

| # | Bölüm | Mevcut ifade (özet) | Sorun | Kaynak | Önerilen yön |
|---|---|---|---|---|---|
| 1 | Faz 4 başlığı + "TCM Prensipleri: Rahim Isıtma" | Transfer sonrası ılık, pişmiş gıdalar; "çiğ sebze ve soğuk içeceklerden kesinlikle kaçınılır"; sindirim enerjisi rahme yönlendirilmeli | Kanıt yok. Sitenin [transfer sonrası bakım makalesi](../../src/content/articles/embriyo-transferi-sonrasi-bakim.mdx) "özel bir tutunma rejimi yoktur… gereksiz kısıtlamalardan kaçının" diyor. Link verilirse okur birbiriyle çelişen iki tavsiye görür. | Kanıt yokluğu; sitedeki makale | TCM bölümünü çıkar. Transfer sonrası için dengeli beslenme ve gebelikte sakıncalı gıdalardan (çiğ et ve balık, pastörize edilmemiş süt) kaçınma. Menüdeki "ılık" ve "oda sıcaklığında" vurgusu kaldırılır. |
| 2 | Faz 4 "Ananas ve Bromelain" + 22–26. günler menüsü | Transfer gününden itibaren 5 gün, günde 1 dilim çekirdekli ananas "potansiyel olarak faydalı bir destek" | İnsanda klinik kanıt yok (yukarıdaki tarama). Kaynakçadaki CCRM ve Pacific Reproductive Center sayfaları bile bunu yaygın bir inanış olarak ele alıyor. | PubMed taraması, 2026-10-04 | Ananas önerisini ve menüdeki 5 günlük ananas satırını çıkar. İstenirse "Ananasın tutunmayı artırdığına dair insan çalışması yok" diye kısa bir efsane notu eklenebilir. |
| 3 | Bölüm 03 "Sağlıklı yağlar" | "Omega-3 takviyesi alan kadınların gebe kalma ihtimali %50 daha yüksek"; omega-3 "moleküler yapıştırıcıların işlevini optimize eder" | Oran gözlemsel bir kohort çalışmasından geliyor (Stanhiser 2022: doğal gebelik denemesi, infertilite öyküsü olmayan 30–44 yaş kadınlar, FR 1,51; RKÇ değil). Tüp bebek hastası için genellenemez. Yapıştırıcı mekanizması kaynaksız. | Stanhiser 2022, PMID 35147198, [DOI](https://doi.org/10.1093/humrep/deac027) | Oranı bağlamıyla ver ya da çıkar: "Doğal yoldan gebelik deneyen kadınlarda yapılan gözlemsel bir çalışmada… ilişki bulundu; tüp bebekte etkisi kanıtlanmadı." Mekanizma cümlesini çıkar. |
| 4 | Bölüm 02 başlığı ve giriş | Akdeniz diyeti "Tüp bebek başarı oranlarını istatistiksel olarak artırdığı kanıtlanmış en güçlü diyet modeli" | Üstünlük ifadesi (portal kuralı) ve aşırı kesinlik. Sistematik derlemeler ilişkiyi "tutarsız", "ön kanıt" ve "çok düşük kesinlik" olarak değerlendiriyor. Tek RKÇ yalnız embriyo gelişim hızını ölçmüş, gebelik veya canlı doğumu değil. | Kellow 2022, PMID 35293975, [DOI](https://doi.org/10.1093/advances/nmac023); Winter 2023, PMID 37299551, [DOI](https://doi.org/10.3390/nu15112589); Mérida-Yáñez 2026, PMID 42643610, [DOI](https://doi.org/10.3389/fnut.2026.1904722); Kermack 2020, PMID 31870562, [DOI](https://doi.org/10.1016/j.fertnstert.2019.09.041) | "En çok çalışılmış diyet modeli; ilişki gözlemsel çalışmalardan geliyor, neden-sonuç kanıtlanmadı" çizgisi. `{{kanit:C}}` düzeyi. |
| 5 | Bölüm 02 "Klinik Araştırma Sonuçları" tablosu | 5 satırlık bulgu tablosu | Satırların üçünde aktarım hatası var. **Karayiannis 2018:** makalede "2,64 kat" yok; <35 yaşta MedDietScore'daki 5 puanlık artış klinik gebelik ve canlı doğum olasılığında ~2,7 kat artışla ilişkili, ≥35 yaşta ilişki yok, gözlemsel. **Noli:** yayın yılı 2020 değil 2023. aOR 0,29 "riski artırdı" değil; Akdeniz diyetine orta uyumlu kadınlarda beklenmedik zayıf yanıt riski daha düşük. **Sun 2019:** PubMed'de doğrulanamadı. Vujkovic 2010 (OR 1,4; GA 1,0–1,9) ve Twigt 2012 (OR 1,65) doğru aktarılmış, ama ikisi de gözlemsel ve "önemli ölçüde" ifadesi aşırı. | Vujkovic 2010, PMID 20189169, [DOI](https://doi.org/10.1016/j.fertnstert.2009.12.079); Twigt 2012, PMID 22593431, [DOI](https://doi.org/10.1093/humrep/des157); Karayiannis 2018, PMID 29390148, [DOI](https://doi.org/10.1093/humrep/dey003); Noli 2023, PMID 37150703, [DOI](https://doi.org/10.1016/j.rbmo.2023.03.011) | Tabloyu doğru değerlerle, "çalışma türü" sütunu ekleyerek yeniden kur. Sun 2019'u kaynak bulunmadıkça çıkar. Kapaktaki "%65" ve "2.64x" istatistik kartlarını çıkar ya da bağlamlı ver. |
| 6 | Bölüm 11 "Uyku" ve "Stres" | Yüksek kortizol "rahim içi kan akışını azaltan damar daraltıcı bir ortam yaratır"; kaynakçada "Stres Tüp Bebek Başarısını Etkiler" | 14 prospektif çalışmanın meta-analizi, tedavi öncesi duygusal sıkıntının tüp bebek sonucuyla ilişkili olmadığını gösterdi. Sitenin [transfer sonrası bakım makalesi](../../src/content/articles/embriyo-transferi-sonrasi-bakim.mdx) de "stres yaptım, tutunma bozulacak" düşüncesini haksız bir yük olarak ele alıyor. Mevcut metin okura suçluluk yükleyebilir. | Boivin 2011, PMID 21345903, [DOI](https://doi.org/10.1136/bmj.d223) | Stres bölümünü "iyi hissetmek için" çerçevesine al; sonuç üzerinde etki iddiasını çıkar. Kaynakçadaki hastane sayfasını çıkar. |
| 7 | Bölüm 04 "Folat" | Folat nöral tüp defektlerini "önler"; yalnız besin listesi var | Güvenlik açısından önemli bir eksik: gebelik planlayan kadınlara günde 400 mcg folik asit takviyesi önerilir. Sitenin diğer makaleleri bunu zaten söylüyor. Yalnız diyetle yeterli olduğu izlenimi verilmemeli. "Önler" yerine "riskini azaltır". | CDC "About Folic Acid" (sitede kullanılan kaynak) | "Besinlere ek olarak günde 400 mcg folik asit; önceki gebelikte nöral tüp defekti varsa doz hekimle belirlenir" cümlesi. |
| 8 | Kaynakça | 31 kayıt | Yalnızca ~5'i bilimsel yayın, onlarda da yazar, yıl ve DOI yok. Geri kalanı yerli ve yabancı klinik ile hastane tanıtım sayfaları (Acıbadem, Medova, Indira IVF, CCRM, Cloudnine, IVI, bir Dubai kliniği, bir hekimin kişisel sayfası, YouTube, DoktorTakvimi). Bağımsız portal ilkesi ve haksız rekabet riski taşıyor, bilimsel kaynak da değil. Ayrıca toplu bul-değiştir hatası var: İngilizce başlıklarda "IVF" "Tüp Bebek (IVF)" olmuş (örn. "Indira Tüp Bebek (IVF)"). | Portal kuralları (CLAUDE.md) | Kaynakçayı bu belgede doğrulanan PubMed kayıtlarıyla (yazar, yıl, dergi, DOI) yeniden kur; klinik ve hastane sayfalarının tamamını çıkar. |

## Öncelik 2: abartılı veya kaynaksız iddia, terim hatası

| # | Bölüm | Mevcut ifade | Sorun | Önerilen yön |
|---|---|---|---|---|
| 9 | Bölüm 01 istatistik kartı + metin | "~%30 Yumurtalık Tedavisi (ART) döngü başına canlı doğum oranı" | ART "yardımcı üreme teknikleri" demek; "yumurtalık tedavisi" yanlış çeviri. Oran kaynaksız ve paydası belirsiz (sitenin başarı oranı kuralı). | Kartı çıkar; metinde ART'yi doğru terimle yaz. |
| 10 | Bölüm 01 | İnfertilite "yüzde 10–15"; "gelişmekte olan ülkelerde her dört çiftten biri" | Kaynak yok. Güncel DSÖ tahmini (2023) yaşam boyu yaklaşık 6 kişide 1. | DSÖ 2023 tahminiyle güncelle ve kaynak göster. |
| 11 | Bölüm 03 "Protein" | "günlük minimum 60 gram kaliteli protein tüketimi elzem" | Kaynaksız eşik. | Eşiği çıkar ya da kaynak bul. |
| 12 | Bölüm 03 besin kartı | Bulgur: "Tam aminoasit profili" | Yanlış: bulgur tam protein değil (lizin sınırlı). | "Lif + B vitaminleri" gibi doğru bir etiket. |
| 13 | Bölüm 03 "Karbonhidrat" ve uyarı kutusu | Rafine karbonhidrat "en sinsi engellerden biri", "tutunma şansını ciddi şekilde zedeler"; "Pirinç pilavı yerine kesinlikle… bulgur" | Abartı ve kesinlik dili. Uyarı kutusunda cümle tekrarı ("pirinç yerine" iki kez geçiyor). | Ölçülü dil; kutuyu "tercih edilebilir" düzeyine indir. |
| 14 | Bölüm 04 | "E vitamini yumurta hücrelerinin yaşlanmasını engeller"; "Kırmızı pancardaki betalain… rahim damarlarındaki kan akışını artırır"; "Nar suyu serbest radikalleri temizler"; Faz 3 "nitrik oksit… endometrium üçlü çizgi yapısını oluşturması şarttır" | İnsanda kanıtı olmayan mekanizma ve sonuç iddiaları; diyetin endometrium kalınlığını belirlediği izlenimi. | Bu iddiaları çıkar; besinleri "dengeli beslenmenin parçası" olarak sun. |
| 15 | Faz 1 başlığı | "Vücudun Arındırılması (Detoks)" | Detoks bilimsel karşılığı olmayan bir pazarlama kavramı. | "Hazırlık dönemi" gibi nötr bir başlık. |
| 16 | Bölüm 09 "Kaçınılması gerekenler" | Alkol "IVF başarı oranlarını büyük oranda azaltır"; kafein "damar daraltıcı etkisi rahim içi kan akışını azaltır"; çiğ et, sushi ve midye "uterus kasılmalarını tetikler"; pastörize edilmemiş süt "tutunmayı engelleyebilir"; işlenmiş et "embriyo kalitesini düşürür" | Alkolde etki doza bağlı ve ölçülü (haftada 84 g üzeri). Kafeinin tüp bebek sonucuyla ilişkisi bulunmadı; gebelikte önerilen sınır 200 mg/gün. Kasılma ve tutunma iddiaları kaynaksız; doğru gerekçe gebelikte listeria ve salmonella riski. | Rao 2022 meta-analizine (PMID 36259227, [DOI](https://doi.org/10.1111/aogs.14464)) ve sitedeki [alkol makalesine](../../src/content/articles/alkol-ve-fertilite.mdx) uyumlu, ölçülü ifade. Kafeinde "günde 200 mg'ı aşmayın". |
| 17 | Bölüm 10 "Erkek" | Likopen "sperm morfolojisi", orman meyveleri "DNA onarımı", keçiboynuzu "sperm hareketliliği"; "Erkeklerde kesinlikle bırakılması gerekenler" | Tekil besin–sonuç eşleşmeleri kaynaksız. Erkekte Akdeniz diyeti semen parametreleriyle ilişkili, ama tüp bebek sonucuyla ilişkisi gösterilmedi. | Agarwal 2025 (PMID 40419219, [DOI](https://doi.org/10.1016/j.advnut.2025.100454)) çizgisinde sadeleştir; sigara ve alkol uyarısı korunur. |
| 18 | Bölüm 11 | "Melatonin: En güçlü içsel antioksidan"; "7–9 saat… mutlak bir zorunluluk"; hidrasyon "hayati" | Üstünlük ve kesinlik dili. Uyarım döneminde (OHSS riski) sıvı tavsiyesini hastanın kendi ekibi vermeli. | Ölçülü dil + "uyarım döneminde sıvı tüketimi için tedavi ekibinizin önerisine uyun" notu. |
| 19 | Bölüm 09 ve 11 | "Plastik… mutlaka cam şişe"; "Plastik pet şişe yerine mutlaka cam şişe kullanınız!" | Kesinlik dili; kanıt gözlemsel. | Ölçülü öneri. |
| 20 | Faz takvimi (1–30. gün) | Faz 2 "8–14. gün uyarım", Faz 4 "22–30. gün transfer sonrası" | Takvim herkes için sabit bir protokol varmış gibi okunabilir; uyarım ve transfer zamanı kişiden kişiye ve tedavi türüne (taze/dondurulmuş) göre değişir. | Başa "Günler örnek amaçlıdır; kendi tedavi takviminize göre kaydırın" notu. |

## Öncelik 3: biçim ve görsel

- Emoji–içerik uyumsuzlukları: ceviz için 🦔, işlenmiş et için 🍾, plastik uyarısında 🍷 ve 💣, mevsim balığı için 🥩, yoga için 🧗.
- Bölüm 04 besin listesinde tekrar: "Fındık, Ceviz, ceviz".
- "Pratik Tarif: Yoğurtlu meyve kasesi" başlığının altındaki tarif keten tohumu ve ayranla hazırlanıyor; başlıkla uyuşmuyor. Karabuğday pilavı tarifi iki kez geçiyor.
- `holistik.jpg`: "Holistik Sağlık Yaklaşımı" etiketinin yanında 🚫 yasak işareti var; görsel önerilen yaklaşımı yasaklanmış gibi gösteriyor. `erkek-besinleri.jpg` görselinde İngilizce "Salmon" etiketi var. Görsellerde bebek yok.
- PDF, içerik düzeltmesinden sonra `node scripts/generate-pdf.js` ile yeniden üretilmeli. Şu anki PDF kapağında hâlâ "Tıbbi Danışma Kurulu onaylı" yazıyor.

## Önerilen kaynak listesi (doğrulandı, 2026-10-04)

1. Vujkovic M ve ark. Fertil Steril 2010;94(6):2096–101. PMID 20189169. doi:10.1016/j.fertnstert.2009.12.079
2. Twigt JM ve ark. Hum Reprod 2012;27(8):2526–31. PMID 22593431. doi:10.1093/humrep/des157
3. Karayiannis D ve ark. Hum Reprod 2018;33(3):494–502. PMID 29390148. doi:10.1093/humrep/dey003
4. Noli SA ve ark. Reprod Biomed Online 2023;47(1):77–83. PMID 37150703. doi:10.1016/j.rbmo.2023.03.011
5. Kermack AJ ve ark. Fertil Steril 2020;113(2):260–269. PMID 31870562. doi:10.1016/j.fertnstert.2019.09.041
6. Kellow NJ ve ark. Adv Nutr 2022;13(3):857–874. PMID 35293975. doi:10.1093/advances/nmac023
7. Winter HG ve ark. Nutrients 2023;15(11):2589. PMID 37299551. doi:10.3390/nu15112589
8. Mérida-Yáñez B ve ark. Front Nutr 2026;13:1904722. PMID 42643610. doi:10.3389/fnut.2026.1904722
9. Stanhiser J ve ark. Hum Reprod 2022;37(5):1037–1046. PMID 35147198. doi:10.1093/humrep/deac027
10. Rao W ve ark. Acta Obstet Gynecol Scand 2022;101(12):1351–1363. PMID 36259227. doi:10.1111/aogs.14464
11. Boivin J ve ark. BMJ 2011;342:d223. PMID 21345903. doi:10.1136/bmj.d223
12. Agarwal R ve ark. Adv Nutr 2025;16(8):100454. PMID 40419219. doi:10.1016/j.advnut.2025.100454
13. CDC. About Folic Acid. https://www.cdc.gov/folic-acid/about/index.html

## Sonraki adımlar

1. Dr. Aksoy'un editoryal kararları (aşağıdaki sorular).
2. Kararlara göre metin revizyonu: worktree'de, yeni tıbbi iddia eklenmeden, yalnızca bu kaynaklarla.
3. Düzenlenmiş metnin Dr. Aksoy'a gösterilmesi ve tıbbi inceleme onayı; künyede son güncelleme tarihi revizyon tarihine çekilir.
4. PDF'in yeniden üretilmesi.
5. Ardından ayrı PR: sitemap (`customPages`) + `/beslenme-yasam/` hub'ı ve komşu makalelerden en az 3 doğal iç link + IndexNow bildirimi.

## Dr. Aksoy'un editoryal kararları (2026-10-04)

Seçenekli sorularla alındı; editoryal yön kararlarıdır, tıbbi metin onayı değildir.

1. **TCM "Rahim Isıtma" ve transfer sonrası ılık/çiğ kısıtlaması (#1):** "Tamamen çıkar." Transfer sonrası için dengeli beslenme ve gebelikte sakıncalı gıdalardan kaçınma yazılacak.
2. **Ananas (#2):** "Efsane notuna çevir." Menüden ve faz metninden çıkarılacak; yerine "ananasın tutunmayı artırdığına dair insan çalışması yok" anlamında kısa bir not gelecek.
3. **1–30. gün takvimi (#20):** "Koru, örnek takvim notu ekle."

Diğer maddeler (#3–#19): Dr. Aksoy 2026-10-04'te "Önerileri onaylıyorum, metni düzenle" yanıtıyla önerilen yönü onayladı. Bu, düzenlemeye başlama onayıdır; düzenlenmiş metnin tıbbi inceleme onayı ayrıca alınacaktır.

## Uygulanan revizyon (2026-10-04, dal `claude/ekitap-icerik`, commit edilmedi)

- **#1, #2, #20:** TCM bölümü ve ılık/çiğ kısıtlaması çıkarıldı. Faz 4 "Transfer Sonrası Bekleyiş" oldu: özel tutunma diyeti yok, gıda güvenliği notu var [16]. Ananas, "Sık duyulan bir inanış" notuna dönüştü. 22–26. günlerdeki ananas satırları mevsim meyvesiyle değişti. 30. günün eksik hücresi tamamlandı. Bölüm 01'e "Takvim Hakkında" notu eklendi.
- **#3:** Omega-3 oranı bağlamıyla verildi (doğal gebelik, 30–44 yaş, gözlemsel, ~1,5 kat) [9]. Tüp bebekte randomize kanıt olmadığı eklendi [5]; mekanizma cümlesi çıkarıldı.
- **#4, #5:** "En güçlü / kanıtlanmış" ifadeleri çıkarıldı. Tablo doğru değerlerle ve çalışma türü sütunuyla yeniden kuruldu: Karayiannis ~2,7 kat, yalnız <35 yaş; Noli 2023, aOR 0,29 yönü düzeltildi; Sun 2019 çıkarıldı; Kermack RKÇ eklendi. Kapaktaki %30, %65 ve 2,64x kartları kaldırıldı. Bölüm sonunda "Bu bulgular nasıl okunmalı?" kutusu var.
- **#6:** Kortizol, kan akışı ve melatonin üstünlük iddiaları çıkarıldı. Stres bölümüne Boivin 2011 meta-analizi eklendi [11]: kaygı tüp bebek sonucuyla ilişkili bulunmadı.
- **#7:** Bölüm 04'e folik asit takviye kutusu eklendi (günde 400 µg; nöral tüp defekti riskini azaltır; önceki NTD öyküsünde doz hekimle belirlenir) [13]. Bölüm 01'de de anılıyor.
- **#8:** Kaynakça 16 doğrulanmış kaynakla yeniden kuruldu: 13 PubMed kaydı (DOI bağlantılı) + DSÖ 2023, ACOG CO 462, DSÖ listeriosis. Klinik ve hastane sayfalarının hepsi çıkarıldı. Metin içinde numaralı atıf var.
- **#9–#19:** ART yanlış çevirisi ve kaynaksız oran kaldırıldı. İnfertilite tanımı DSÖ 2023 ile güncellendi [14]. 60 g protein eşiği, bulgur "tam aminoasit" etiketi, E vitamini, pancar, nar ve endometrium iddiaları çıkarıldı. "Detoks" yerine "Hazırlık Dönemi". Alkol [10] ve kafein [10][15] ölçülü ve kaynaklı yazıldı. Çiğ et ve pastörize edilmemiş süt gerekçesi listeriaya bağlandı [16]. İşlenmiş et ve kızartmada kaynaksız mekanizmalar çıkarıldı. Erkek bölümü Agarwal 2025 çizgisinde sadeleşti [12]. Sıvı tavsiyesine "uyarım döneminde tedavi ekibinizin önerisine uyun" eklendi. BPA dili ölçülü hâle geldi. "Kesinlikle", "mutlaka" ve "şart" ifadeleri çıkarıldı (yalnız zorunlu sorumluluk reddinde "mutlaka hekiminize danışınız" kaldı).
- **Biçim:** Emoji uyumsuzlukları düzeltildi, tekrar eden "ceviz" etiketi ve yinelenen karabuğday tarifi kaldırıldı. Tarif başlığı "Keten Tohumlu Kahvaltı Kasesi" oldu. Görsel alt metinleri açıklayıcı hâle geldi. `holistik.jpg` etiketin üstünden kırpılarak `images/holistik-yasam.jpg` olarak kaydedildi; eski dosya silinmedi.
- **Künye:** Son güncelleme 4 Ekim 2026; kanıt taraması ve güncelleme kapsamı satırı eklendi; JSON-LD `dateModified` 2026-10-04.
- **Bilerek eklenmeyenler:** Model kaynaklı yeni klinik iddia yok. Taslakta yazılan üç kaynaksız cümle ("A vitamini yüksek dozu gebelikte zararlı", "Türkiye'de D vitamini eksikliği sık", "besinlerle 400 µg'a ulaşmak zor") yayın öncesi çıkarıldı.
- **Doğrulama:** htmlparser2 ile etiket iç içeliği temiz. 40 tablo satırının hepsi doğru sütun sayısında. Kırık görsel yok. JSON-LD geçerli. `git diff --check` temiz.
- **Tıbbi inceleme onayı:** Dr. Aksoy düzenlenmiş metni 2026-10-04'te "Onaylıyorum, PDF'i üret ve PR aç" mesajıyla onayladı.
- **PDF:** `node scripts/generate-pdf.js` ile 2026-10-04'te yeniden üretildi (26 sayfa, 10,9 MB; önceki 27 sayfa, 9,2 MB). Sayfalar görüntüye çevrilip kontrol edildi; yeni bir düzen bozulması yok. İçindekilerin son satırının sonraki sayfaya taşması ve bölüm geçişlerindeki boşluklar önceki sürümde de vardı. İndirme sayfası ve e-posta bağlantısında önbellek parametresi `?v=20261004` oldu.
- **İndirme sayfası ve e-posta (2026-10-04):** Dr. Aksoy'un kararları: e-kitapta diyetisyen katkısı yok, "uzman diyetisyenler" ifadesi çıkarılsın; sayfa ve e-posta metni aynı PR'da revize içerikle uyumlu hâle getirilsin.
  - Çıkarılanlar: "uzman diyetisyen ve üreme endokrinologları tarafından hazırlanan" (meta açıklama ve giriş), "60+ tarif" (e-kitapta 3 tarif var), "4 klinik fazlı", "fertilitede faydalı olduğu bilimsel olarak kanıtlanmış", "yumurta kalitesini artıran", "endometrial kalınlaşmayı destekleyen", "kan akışını geliştiren", "implantasyon başarısını artıran vitaminler", "gebe kalma şansını artıran besinler, ısıtıcı tarifler, progesteronu destekleyen besinler".
  - Yerine e-kitabın yeni bölüm adları ve içeriğiyle birebir uyumlu, üstünlük iddiası taşımayan tanımlar geldi. SSS'deki "faydalıdır" ifadesi "kullanılabilir; özel bir durumunuz varsa hekiminize danışın" oldu. E-postadaki içerik listesi ve "Tıpkı başarıyla indirdiğiniz gibi" cümlesi düzeltildi. Etiketteki Türkçe büyük harfler (BİLGİLENDİRİCİ E-KİTAP) düzeltildi.
- **Bekleyen:** indirme sayfası metni için Dr. Aksoy'un son görmesi → merge ve deploy → ardından sitemap ve iç link PR'ı.
