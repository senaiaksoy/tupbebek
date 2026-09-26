# Ana sayfa yönlendirme alanlarını birleştirme — 26 Eylül 2026

Başlangıç: PR #188 sonrası `main`, `43c9484d1efcf0531e198c3560facf519dfaf815`. Aşama 1 bulgusu #18, ana sayfadaki tekrar eden başlangıç alanları ele alındı.

## Sonuç

Rehberler, durum seçici, yol haritası ve temel okuma yolu olmak üzere dört başlangıç alanı tek Rehberler & Başvuru Kaynakları bölümünde toplandı. Mevcut altı rehber kartına, mevcut yedi temel okuma bağlantısı aynı bölümün altında eklendi. Temel okuma başlığı H3 oldu; tekrar eden giriş paragrafı kaldırıldı. Tüm rehberleri gör bağlantısının dokunma yüksekliği en az 44 px.

Durum seçici, altı aşamalı yol haritası ve uzun Tedavi Sürecine Genel Bakış özeti ana sayfada artık render edilmiyor. İlgili bileşen dosyaları silinmedi. Tanı/tedavi kaynakları ve makale arşivi erişilebilir kalıyor. Yeni tıbbi metin veya klinik öneri yazılmadı. `#durum-secin` adresi birleşik rehber bölümünde, `#essential-reading-title` yeni alt başlıkta korunuyor.

| Ölçüm | Önce | Sonra |
|---|---:|---:|
| 1280 × 720 masaüstü sayfa yüksekliği | 13.085 px | 9.997 px |
| 390 × 844 mobil sayfa yüksekliği | 25.451 px | 19.809 px |
| Ana içerikte doğrudan section sayısı | 14 | 10 |
| Ana sayfa HTML boyutu | 418.161 bayt | 361.290 bayt |
| Ana sayfanın farklı iç bağlantı hedefleri | 98 | 98 |
| Ana içerikteki farklı hedefler | 87 | 78 |

Masaüstü yükseklik %23,6, mobil yükseklik %22,2 azaldı. Ölçümler aynı yerel build sunucusu ve aynı ekran boyutlarında yapıldı. Bunlar kullanıcı testi, trafik artışı veya Lighthouse başarısı kanıtı değildir.

## Bağlantı erişimi ve değişen davranış

Dokuz hedef ana içerikteki tekrarlarından çıkarıldı; ortak menü ve/veya footer üzerinden erişiliyor: Başarısız Denemeler, Beslenme ve Yaşam, Endometriozis/Adenomyozis, Genetik Testler, Hakkımızda, Hormon Paneli, Psikolojik Destek, Transfer Süreci, Yaş ve Doğurganlık. Bu iş, ana içerikteki her bağlantının aynı konumda kaldığı iddiasını taşımaz. Altı durum sekmesi ve sekmelere göre öneri paneli kaldırılmıştır; okur konu kartları ve menü ile ilerler.

63 makalenin tamamına alfabetik arşivden erişim korunuyor. Ana sayfanın 98 farklı hedefi build çıktısında çözümlendi. Başlık, H1, canonical ve tüm JSON-LD verileri 99 sayfada aynı. Diğer 98 sayfanın ana içerik gövdesi SHA ile aynı; 63 makale kaynak dosyası başlangıç commit'iyle aynı. Görsel dosyaları, kaynakça, uzman katkısı, inceleme tarihleri, ortak menü/footer ve koruma betikleri değişmedi.

## Doğrulama

- `npm run build`: çıkış 0; içerik kalitesi 0 hata, önceki 7 uyarı sürüyor.
- `npm run verify:preflight`: 25/25, çıkış 0.
- Önce/sonra teknik karşılaştırma: [ANASAYFA-BAKIM-KANIT.json](ANASAYFA-BAKIM-KANIT.json).
- Tarayıcı: 1280 px masaüstü, 1024 px kırılımı ve 390 px mobilde yatay taşma yok. Birleşik bölümdeki 14 bağlantının dokunma yüksekliği en az 44 px. Alfabetik arşivde 63 bağlantı mevcut.
- Klavye: Tüm rehberleri gör bağlantısından Tab ile ilk okuma kartına odak taşındı; odak çizgisi mevcut. Enter ile Tüp Bebek Nedir makalesi açıldı ve H1 doğrulandı.
- Okur gözü kontrol listesi değişen bölümde uygulandı. Mevcut rehber görselleri ve alt metinler korunuyor. Mobil kartlar tek sütunda, metinler görünür. Yeni görsel üretimi yok.
- UI ölçümleri ve ekran görüntüleri yerel `.tmp/home-*` kayıtlarında; kanıtlar üretim yayını anlamına gelmez.

## Kapsam ve yayın kapısı

Kaynak değişikliği yalnızca `src/pages/index.astro`, `src/components/home/QuickGuideCards.astro` ve `src/components/home/EssentialReading.astro` içindedir. Bu dar bakım ana sayfanın tamamının veya tıbbi doğruluğunun yeniden denetlendiği anlamına gelmez. Ana sayfa hâlâ uzun; makale üstü kalabalık ve dış göz/GSC başlangıç kayıtları ayrı açık işlerdir.

Main birleştirmesi otomatik yayındır; bu PR için açık birleştirme/yayın onayı beklenir. Onaydan sonra Cloudflare `tupbebek` projesinin production kaynak commit'i ve cache bypass ile custom-domain ana sayfa HTML/CSS eşleşmesi doğrulanmalıdır. Görsel dosyaları değişmediği için görsel Custom Purge gerekmiyor.
