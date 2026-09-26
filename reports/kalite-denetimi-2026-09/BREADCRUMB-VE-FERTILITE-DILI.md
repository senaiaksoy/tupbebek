# Breadcrumb ve fertilite koruma dili — 26 Eylül 2026

Başlangıç: `main`, `ab7e97a31bddb54027dfdd9b332fdd701b3414b3` (PR #185 sonrası).
Kapsam: devir notundaki bozuk Türkçe breadcrumb etiketleri ve fertilite koruma sayfasındaki üç “en iyi sonuçlar” ifadesi.

## Değişiklik

- Makalelerde mevcut 14 kısa breadcrumb etiketi korunur. Diğer etiketler, URL slug'ı yerine yayımlanmış makalenin frontmatter başlığından alınır. 49 makale etiketi ve iki statik sayfa etiketi değişti; “İletişim” ve “Baş Editör Köşesi” açıkça eşlendi.
- Görünen etiket ile `BreadcrumbList` aynı diziden üretilir. Üst konu merkezi ve bütün bağlantı hedefleri korunur.
- `/fertilite-koruma/` içindeki üç üstünlük cümlesi, dondurma sırasındaki yaşın ve kişisel koşulların sonuca etkisini anlatan ifadelerle değiştirildi. SSS yanıtı ve `FAQPage` aynı veri kaynağını kullanır.
- Bilinen bozuk Türkçe breadcrumb etiketi, kalite betiğinde uyarı yerine build'i durduran hata oldu; okur gözü kontrol listesine eklendi.

Yaşla ilgili dar değişikliğin kaynağı: [ASRM, planlı oosit kriyoprezervasyonu sonuçları kılavuzu (2021)](https://www.asrm.org/practice-guidance/practice-committee-documents/evidence-based-outcomes-after-oocyte-cryopreservation-for-donor-oocyte-in-vitro-fertilization-and-planned-oocyte-cryopreservation-a-guideline-2021/). Kılavuz, genç yaşta dondurmanın daha iyi sonuçlarla ilişkili olabileceğini, ancak tek bir optimal yaş önerisini destekleyecek verinin yetersiz olduğunu belirtir.

## Doğrulama

- `npm run build`: çıkış kodu 0.
- `npm run verify:preflight`: 25/25, çıkış kodu 0. İçerik kalitesi: 0 hata, 16 uyarı (önce 35).
- 99 sayfanın URL, HTML title, H1 ve canonical bilgileri başlangıçla aynı. Breadcrumb bağlantı hiyerarşisi aynı; görünen son etiket ile JSON-LD eşleşiyor.
- Fertilite koruma sayfasında üç “en iyi” ifadesi kalmadı; yeni SSS metni render edilmiş HTML ve `FAQPage` içinde doğrulandı.
- İzole fixture: “Kisirlik” etiketi kalite kontrolünde çıkış kodu 1, “Kısırlık” etiketi çıkış kodu 0 verdi.
- Tarayıcı: hidrosalpinx sayfası 1280×900 ve 390×844 görünümünde kontrol edildi. Uzun breadcrumb mevcut kısaltma davranışını korudu; yatay sayfa taşması yok. Fertilite SSS yanıtı klavyeyle açıldı ve görünen yeni metin kontrol edildi.
- Ayrıntılı başlangıç/sonuç kaydı: [BREADCRUMB-FERTILITE-KANIT.json](BREADCRUMB-FERTILITE-KANIT.json). Yerel ekran görüntüleri ve loglar `.tmp/reader-*` altında.

## Sınırlar ve yayın

Bu kayıt tüm fertilite koruma sayfasının tıbbi/hukuki denetimi değildir. Değişmeyen oranlar, eşikler, mevzuat ifadeleri ve diğer klinik cümleler bu dar bakımın doğrulanmış sonucu sayılmaz. Makale gövdeleri, yazar/reviewer kayıtları ve görsel dosyaları değiştirilmedi.

Kalan 16 uyarı ayrı değerlendirme gerektirir: menüler arasında üç tekrar, bağlama göre incelenecek yedi “en iyi” eşleşmesi ve altı kısa alt metin. Otomatik uyarı sayısı tek başına bütün bu eşleşmelerin hata olduğunu göstermez.

`main` birleştirmesi otomatik yayındır; bu PR için açık birleştirme/yayın onayı beklenir. Sonrasında Cloudflare kaynak commit'i ve cache bypass ile canlı HTML doğrulanır.
