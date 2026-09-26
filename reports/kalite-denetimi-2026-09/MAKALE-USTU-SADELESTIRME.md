# Makale başlangıcını sadeleştirme — 26 Eylül 2026

Başlangıç: PR #189 sonrası `main`, `c206b0b4bd00571341f6526cda2995b8ec957fc2`. Aşama 1 bulgusu #19 için ortak makale şablonunda dar sunum bakımı yapıldı.

## Okurun göreceği değişiklik

Breadcrumb zaten üst navigasyon için yer ayırdığı için makale başlığının önündeki ek boşluk azaltıldı: masaüstünde 80 px, mobilde 96 px. Videolu 28 makalede video başlangıçta kapalı bir bölümdedir. Okur mevcut video başlığını taşıyan satırı açarak videoya erişir; oynatmak için ayrıca mevcut oynatma bağlantısını seçer. Bölümü açmak tek başına YouTube iframe'i yüklemez.

Video kimliği, başlığı, açıklaması ve VideoObject verileri korunuyor. Kısa cevap, yazar/reviewer, kanıt durumu, hero görseli ve gövde içindeki klinik bilgiler yerinde kaldı. Düşük AMH makalesinin “Hızlı Bakış” kutusu yaş, AFC ve değerlendirme zamanlaması hakkında ek bilgiler taşıdığı için kaldırılmadı. Makale dosyalarına veya gerçek uzman/onay kayıtlarına müdahale edilmedi.

| Düşük AMH makalesi, belge üstünden ölçüm | Önce | Sonra | Azalma |
|---|---:|---:|---:|
| Masaüstü 1280 × 900, gövde başlangıcı | 1.944 px | 1.342 px | 602 px |
| Masaüstü 1280 × 900, ilk gövde H2 başlığı | 2.420 px | 1.818 px | 602 px (%24,9) |
| Mobil 390 × 844, gövde başlangıcı | 1.762 px | 1.389 px | 373 px |
| Mobil 390 × 844, ilk gövde H2 başlığı | 2.714 px | 2.342 px | 372 px (%13,7) |

Ölçüm “Kısa cevap” başlığını saymaz; klinik gövdedeki ilk H2'yi esas alır. Videosuz PCOS makalesindeki ilk gövde H2'si masaüstünde 1.875 px'den 1.795 px'e taşındı. Yuvarlanmış piksel değerleri aynı yerel sunucuda ve ekran boyutlarında alındı.

## Doğrulama

- `npm run build`: çıkış 0; içerik kalitesi 0 hata, önceki 7 uyarı sürüyor.
- `npm run verify:preflight`: 25/25, çıkış 0.
- 99 sayfanın title/H1/canonical/description/JSON-LD verileri aynı. Makale dışındaki 36 sayfanın ana içeriği SHA ile aynı.
- 63 makale kaynak dosyası başlangıç commit'iyle aynı; render edilmiş 63 klinik gövdenin HTML SHA'sı aynı. Yazar, reviewer, özet, kanıt bilgisi, resim nitelikleri, bağlantılar ve mevcut video içeriği karşılaştırıldı.
- 28 makalede video bölümü HTML'de başlangıçta kapalı; ilk yüklemede YouTube iframe'i yok.
- 63 makalenin tamamı 1280 × 900 ve 390 × 844 tarayıcıda açıldı: yatay taşma, eksik H1 veya kendiliğinden açılan video yok. Video satırlarının yüksekliği en az 44 px.
- Düşük AMH videosu Enter ile açıldı, Tab oynatma bağlantısına geçti ve görünür odak halkası doğrulandı. Enter doğru `youtube-nocookie.com` iframe'ini oluşturdu. Bu, iframe oluşturma kontrolüdür; dış sağlayıcıdaki oynatım kalitesinin denetimi değildir.
- Mobilde video satırına dokunularak açma ve Space ile kapatma çalıştı. Açma işlemi tek başına iframe oluşturmadı.
- Okur gözü kontrol listesi uygulandı. Düşük AMH, PCOS, kanser/fertilite, baş editör köşesi, özeti olmayan azospermi ve varikosel başlangıçları incelendi. Mevcut hero kırpması, alt metinler ve görsel künyeleri korunuyor.

Teknik kanıt: [MAKALE-BAKIM-KANIT.json](MAKALE-BAKIM-KANIT.json). Ekran görüntüleri, klavye/mobil işlem kanıtı ve build/ön kontrol logları yerel standart inceleme kaydındadır.

## Kapsam ve yayın kapısı

Kaynak değişikliği yalnızca `src/pages/makaleler/[...slug].astro` içindedir. Klinik metin değişmediği için yeni Dr. Aksoy yanıtı gerektiren içerik güncellemesi yapılmadı. Bu bakım tıbbi doğruluk denetimi, okur testi veya trafik/performance kazanımı kanıtı değildir. Özet ve ek klinik girişleri uzun olan makaleler mobilde hâlâ uzun bir başlangıç taşıyor; bunların metnini sadeleştirmek ayrı editoryal iştir. GSC başlangıç kaydı ve dış göz testleri açık kalıyor.

Main birleştirmesi otomatik yayındır; açık birleştirme/yayın onayı beklenir. Onay sonrası Cloudflare `tupbebek` production kaynak commit'i ve cache bypass ile custom-domain makale HTML/CSS eşleşmesi ayrıca doğrulanır. Görsel dosyaları değişmediği için görsel Custom Purge gerekmiyor.
