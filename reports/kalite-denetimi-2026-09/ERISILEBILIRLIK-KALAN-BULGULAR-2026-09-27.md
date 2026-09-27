# Kalan erişilebilirlik bulguları — 27 Eylül 2026

## Kapsam ve yöntem

Tasarım tur 2 sonrasındaki `29a316a1ac730e6b319191865bf83e93c7d04edc` sürümü incelendi. Bu çalışma denetimdir; uygulama kodu veya tıbbi metin değiştirilmedi, form gönderilmedi.

- Üretilmiş 101 HTML dosyasında H1 sayısı ve ana içerikteki başlık sırası envanteri.
- Yerel production build üzerinde Puppeteer ile 390×844 telefon ve 1366×900 masaüstü: ana sayfa, beta-hCG, fertilite-koruma, ilaç rehberi, varikosel, tanı süreci, makale arşivi, iletişim ve e-kitap indirme; toplam 18 görünüm.
- Normal başlangıç ve ana içerikteki details bölümleri açıkken ölçüm. Çerez banner’ı mevcut “Reddet” düğmesiyle kapatıldı. Görseller ve fontlar yüklendi.
- Dokunma alanları CSS pikseliyle ölçüldü. Ham adaylar ayrıca bağlam açısından değerlendirildi; paragraf içi, aynı sayfadaki eşdeğer bağlantı ve label ile etkinleştirilen checkbox aynı tür hata sayılmadı.
- Yedi ekran görüntüsü gözle incelendi. E-kitap SSS kutularının iç boşluğuna tıklama ve Space ile aç/kapa ayrıca denendi.

Bu, tam WCAG uygunluk denetimi veya ekran okuyucu testi değildir. 101 sayfada yalnız statik başlık envanteri alındı; tüm sayfaların bütün etkileşimleri denenmedi. Mobil menü açıldıktan sonraki ve arama önerileri yüklendikten sonraki durumlar bu dar denetimin dışında.

## Önce ele alınabilecek teknik düzeltmeler

### 1. Ayrı kaynak bağlantıları: 24 px yükseklik

`src/components/ReferenceList.astro:71` ve devamındaki PubMed/DOI/Kaynak bağlantıları ayrı bir flex satırında **24 px** yüksekliğinde. Beta-hCG, fertilite-koruma, ilaç rehberi, varikosel ve tanı süreci örneklerinde mevcut. Bunlar paragraf içi dipnotlardan farklıdır.

Öneri: yalnız bu bileşenin bağlantılarına minimum 44 px yükseklik ve uygun odak stili; kaynak yazısı, URL, sıra, bibliyografya ve şema aynı kalmalı. Ortak bileşen olduğu için uzun makalelerin yüksekliği yeniden ölçülmeli.

Kanıt: [Kaynak bağlantıları](a11y-kapanis/kaynak-hedefleri.webp), [ölçümler](a11y-kapanis/olcumler.json).

### 2. İlaç rehberi hızlı gezinme: 36 px

`src/pages/ilac-rehberi.astro` içindeki `#quick-nav` bölüm bağlantıları telefonda ve masaüstünde **36 px** yüksekliğinde. Bölüm hedefleri çalışıyor; alan projenin 44 px minimumunun altında.

Öneri: yalnız hızlı gezinme bağlantılarında minimum yüksekliği 44 px yapıp yatay kaydırmayı korumak. Genel `a` kuralı değiştirilmemeli; gövde içi bağlantılar aynı kalmalı.

Kanıt: [Hızlı gezinme](a11y-kapanis/ilac-hizli-gezinme.webp).

### 3. E-kitap SSS: büyük görünen kartın tıklanabilir kısmı küçük

`src/pages/e-kitap-indir.astro:265` ve devamındaki summary alanları **26,4 px** yüksekliğinde. Telefonda ilk üç soru 26,4 px; iki satıra saran son soru 52,8 px. Masaüstünde dört soru da 26,4 px. Kartın padding’i tıklanınca bölüm açılmıyor; yalnız summary etkin. Space ile açma ve kapatma iki genişlikte de çalışıyor.

Öneri: padding’i summary üzerinde düzenlemek veya summary’ye minimum 44 px vermek; soru/cevap metinleri korunmalı.

Kanıt: [SSS görünümü](a11y-kapanis/e-kitap-sss.webp), [tıklama ve klavye sonuçları](a11y-kapanis/sss-etkilesim.json).

## Başlık hiyerarşisi

- **Ana sayfa:** “Editöryal Metodoloji ve Şeffaflık” H2 sonrasında ayrı uyarı bölümündeki “Tıbbi Uyarı” H4. Kaynak: `src/components/home/Methodology.astro:44`. Ayrı bölümün başlık seviyesi, mevcut yazı ve görünüm korunarak düzenlenebilir.
- **İlaç rehberi:** H1’den sonra “4 ilaç grubu” H3 geliyor (`src/pages/ilac-rehberi.astro:117`). İstatistik kartlarının başlık mı, normal etiket mi olduğu değerlendirilip semantik etiket seçilmeli.
- **E-kitap indirme:** H1’den sonra özellik kartlarının H4’leri geliyor (`src/pages/e-kitap-indir.astro:59`). Aynı değerlendirme gerekli.
- **Makale masaüstü yan paneli:** “İlgili Makaleler” etiketi paragraf; kart başlıkları H4 (`src/pages/makaleler/[...slug].astro:307`, `src/components/RelatedArticles.astro:198`). Statik envanterde ortak yan panel nedeniyle **63 makalede** H2→H4 sıçrama adayı var. Beta-hCG/varikosel masaüstünde doğrulandı; panel mobilde gizli. Mevcut etiketin bölüm başlığı ve kartların uygun alt başlık olarak işaretlenmesi önerilir. Makale gövdesine dokunmak gerekmez.

Statik ana içerik sırası taraması 101 HTML’nin **76’sında** sıçrama adayı verdi; bunun 63’ü yukarıdaki ortak yan paneldir. Kalan sayfaların listesi JSON envanterinde bulunur; hepsi render edilerek doğrulanmış hata sayılmaz. Footer’daki H4 grupları da envanterde kayıtlı; kendi landmark bağlamında ayrıca değerlendirilmelidir.

Kanıt: [Makale yan paneli](a11y-kapanis/makale-sidebar.webp), [başlık envanteri](a11y-kapanis/olcumler.json).

## 10–11 px yazılar

| Yer | Ölçülen boyut | Kaynak / öneri |
|---|---:|---|
| Ana sayfa öne çıkan etiketleri ve tarihler | 11 px | `home/HeroSection.astro:98,108`; en az 12 px değerlendirilmeli |
| Güncel rehber kartlarının tarihi | 11 px | `RecentArticlesCarousel.astro:62` |
| Arşiv makale sayısı / harf sayacı | 11 / 10 px | `home/AlphabetIndex.astro:86,66`; mobilde arşiv açıldıktan sonra da ölçüldü |
| Kaynak türü: “Bilimsel yayın”, “Klinik rehber” vb. | 11 px | `ReferenceList.astro:67`; kaynak verisi korunarak stil düzeltilebilir |
| Makale arşivi kategori/tarih/yazar bilgisi | 10 px | `src/pages/makaleler/index.astro:122,124,169,212,214,228` |
| Footer yasal bağlantıları ve telif satırı | 11 px | `Footer.astro:33,48` |
| Footer tıbbi danışmanlık uyarısı | 10 px | `Footer.astro:51`; uyarı metni aynı kalarak büyütülebilir |
| Mobil alt gezinme etiketleri | 10 px | `Header.astro:94` ve devamı; dokunma alanları zaten daha büyük |
| İlaç rehberi “Tetikten yumurta toplamaya” | 11 px | `ilac-rehberi.astro:289`; **yalnız masaüstünde görünür**, mobilde gizli |

Kanıt: [Ana sayfa etiketleri](a11y-kapanis/home-etiketler.webp), [footer](a11y-kapanis/footer-yazilar.webp), [ilaç rehberi masaüstü](a11y-kapanis/ilac-kucuk-yazi.webp).

## Yanlış alarm ve sınırlar

- **101/101 HTML’de tek H1 var.** İletişim/SSS H1’i `main` dışında hero header’ında; sadece `main h1` aramak yanlış “H1 yok” sonucu verir.
- Dokuz sayfanın 18 görünümünde yatay sayfa taşması yok.
- Paragraf, madde metni veya dipnot içindeki kısa bağlantıları doğrudan 44 px hatası diye saymak doğru değil. Ham JSON’da bunlar da bulunabilir; otomatik aday sayısı bulgu sayısı değildir.
- İletişim/e-kitap checkbox’ının küçük görünen kare kutusu tek başına etkin alanı göstermez; ilişkili label da tıklanabilir. Label bağlamı ölçümlerde kayıtlı, otomatik hata ilan edilmedi.
- Footer çerez düğmesinin yüksekliği 44 px; bu düğmede kalan konu yazı boyutudur.
- 10–11 px yazı tek başına WCAG ihlali kanıtı değildir. Büyütme, kırpılma ve metin yeniden akışı bu denetimde tam olarak test edilmedi.

## Standartların doğru yorumu

44×44 px bu projenin minimumudur. WCAG 2.1’in 44×44 ölçütü **AAA** düzeyindedir ve satır içi/eşdeğer hedef istisnaları vardır; burada bütün küçük bağlantılara “AA ihlali” etiketi konmadı. [W3C: Target Size](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)

Başlık bulguları, görsel yapı ile programatik yapının uyumuna göre değerlendirilmelidir; salt sayı sıçraması bütün bağlamlarda otomatik ihlal değildir. [W3C: Info and Relationships](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html)

Metin boyutu değerlendirmesinde 200% büyütmede içerik/işlev kaybı da incelenmelidir; bu rapor font ölçüm envanteridir. [W3C: Resize Text](https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html)

## Sonraki düzeltme sırası

1. Ortak kaynak bağlantıları, ilaç hızlı gezinme ve e-kitap summary alanları için dar bir teknik PR.
2. Ortak şablon ve ana sayfa başlık hiyerarşisi; görünen kelimeler ve H1 aynı kalmalı.
3. 10–11 px etiketlerin okunabilirliği; büyütme sonrası sarmalanma, menü genişliği ve sayfa yüksekliği tekrar kontrol edilmeli.

URL, title, meta description, H1 metni, tıbbi gövde, frontmatter/summary ve gerçek inceleme kayıtları korunmalı. Her düzeltme PR’ı için ayrıca Dr. Aksoy’un onayı gerekir. Bu denetim PR’ında düzeltme uygulanmadı. ~10 Kasım GSC karşılaştırması ve Hakan Bey’in tam listesinin triage işi bekleyen ayrı işlerdir.
