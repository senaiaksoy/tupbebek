# İçerik Yapısı Audit Raporu

Tarih: 2026-05-15

## Özet

- Yayındaki makale sayısı: 56
- Kaynak dosya sayısı: 65 (9 legacy/render edilmeyen dosya)
- Yayındaki FAQPage schema kapsamı: 56/56
- Görünür FAQ başlığı eksikliği: 0
- Editoryal kaynak grafiğinde sıfır hub/makale girişi olan makale: 0
- Makaleden hub'a geri bağlantısı olmayan makale: 0

## FAQ Schema Kontrolü

Yayındaki 56 makalenin tamamında render edilmiş `FAQPage` schema mevcut.

Yayındaki tüm makalelerde görünür FAQ başlığı mevcut.

Not: Google, 7 Mayıs 2026 itibarıyla FAQ rich result görünümünü kaldırma sürecini duyurdu. Bu nedenle yeni FAQ schema ekleme kararı yalnızca sayfada gerçekten görünür, hasta odaklı kısa soru-cevap bölümü olan içeriklerle sınırlı tutulmalıdır.

## Hub Link Durumu

| Hub | Makale linki | Hub linki |
| --- | ---: | ---: |
| /ivf-rehberi/ | 11 | 4 |
| /kadin-infertilitesi/ | 18 | 1 |
| /erkek-infertilitesi/ | 8 | 2 |
| /transfer-sureci/ | 9 | 0 |
| /tedavi-yontemleri/ | 15 | 2 |
| /beslenme-yasam/ | 5 | 4 |
| /psikolojik-destek/ | 3 | 2 |

## En Zayıf Makale Girişleri

| Makale | Giriş | Hub geri linki | Çıkış |
| --- | ---: | --- | ---: |
| akinti-kasinti-koku | 1 | kadin-infertilitesi | 4 |
| endoskopik-cerrahi-histeroskopi | 1 | tedavi-yontemleri | 7 |
| hormonal-tedavi-adenomyozis | 1 | kadin-infertilitesi | 4 |
| kadin-kisirligi-tup-bebek | 1 | kadin-infertilitesi | 8 |
| kanser-ve-fertilite | 1 | tedavi-yontemleri, erkek-infertilitesi | 4 |
| tup-bebek-nedir | 1 | ivf-rehberi | 8 |
| tup-bebek-yanlis-bilinenler | 1 | ivf-rehberi | 6 |
| alkol-ve-fertilite | 2 | beslenme-yasam | 1 |
| bagisiklik-tedavileri | 2 | tedavi-yontemleri | 4 |
| duygusal-dayaniklik-rehberi | 2 | psikolojik-destek | 1 |
| embryoglue-faydalari | 2 | transfer-sureci | 4 |
| endometriozis-akilli-stratejiler | 2 | kadin-infertilitesi | 11 |
| miyom-ameliyati | 2 | kadin-infertilitesi | 4 |
| opk-ve-ivf | 2 | kadin-infertilitesi | 4 |
| vajinal-mikrobiyom-fiv | 2 | kadin-infertilitesi | 4 |
| varikosel-nedir-ne-zaman-ameliyat-gerekir | 2 | erkek-infertilitesi, tedavi-yontemleri | 3 |
| yumurtlama-takibi | 2 | kadin-infertilitesi | 2 |
| akraba-evliligi | 3 | tedavi-yontemleri | 3 |
| azospermi-mikro-tese | 3 | erkek-infertilitesi | 2 |
| embriyo-transferi-sonrasi-bakim | 3 | transfer-sureci | 4 |

## Render Edilmeyen Legacy Dosyalar

- aciklanamayan-infertilite.md
- basari-oranlari.md
- basarisiz-denemeler.md
- dondurulmus-embriyo-transferi.md
- erkek-kisirligi-besin-takviyeleri.md
- genetik-testler.md
- hiperprolaktinemi-prolaktinom.md
- myomlar-ve-kisirlik.md
- pkos-ve-tup-bebek.md

## Uygulanan Aksiyonlar

- Makale şablonuna otomatik konu merkezi bağlantısı eklendi; böylece yayındaki her makale ilgili hub sayfasına geri bağlanır.
- Kadın infertilitesi hubına amenore ve adenomyozis hormonal tedavi bağlantıları eklendi.
- IVF rehberine tüp bebekte yanlış bilinenler bağlantısı eklendi.
- Tedavi yöntemleri hubına PGT-M, PGT cinsiyet seçimi yasal/etik sınırları ve akraba evliliği/genetik danışmanlık bağlantıları eklendi.
- Cerrahi sperm arama makalesindeki FAQ schema ile görünür FAQ bölümü eşitlendi.
- Beslenme-yaşam ve psikolojik destek hub sayfalarına görünür konu haritasıyla uyumlu ItemList schema eklendi.
