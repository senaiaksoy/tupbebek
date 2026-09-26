# Okur gözü kontrol listesi

`npm run build`, içerik kalitesi korumasını (`scripts/verify-content-quality.mjs`) otomatik çalıştırır. Koruma şunları yakalar:
- eksik, İngilizce ya da çok kısa alt metin
- hekim ya da klinik adı taşıyan görsel dosyası
- gri veya soluk filtre
- yapay zekâ kalıntısı yorum
- menüde tekrar eden bağlantı ya da kaynaksız yüzde
- standart dışı künye
- URL slug'ından gelen, Türkçe karakterleri bozuk breadcrumb etiketi
- abartılı sayım iddiası
- "ücretsiz muayene" gibi vaat ifadeleri

Makinenin göremediği şeyler ise bu listede. 2026-09 denetiminde bulunan hataların çoğu bu türdendi: anime karakter, bebek ayağı fotoğrafı, alt metni başka bir şeyi anlatan kapak.

Görsel ya da sayfa değiştiren her PR'da, değişen sayfaları **tarayıcıda açarak** kontrol edin:

1. **Görsel konuyu anlatıyor mu?** Sayfa başlığını kapatıp yalnızca görsele bakın. 3 saniyede konuyu tahmin edebiliyor musunuz?
2. **Yasak öğe var mı?** Bebek ya da çocuk, hamilelik karnı, fetal ultrason, hamilelik testi, ağrı ya da gözyaşı, hekim portresi, görselin içine gömülü yazı veya slogan olmamalı.
3. **Alt metin görselde görüneni mi anlatıyor?** Plandaki sahneyi değil. Alt metni yüksek sesle okuyun, sonra görsele bakın.
4. **Bulanık bant var mı?** Görselin üstünde ya da altında bulanık, uzatılmış şeritler olmamalı.
5. **Aynı kişi ya da aynı sahne tekrar ediyor mu?** Aynı sayfada ya da art arda makalelerde aynı model veya aynı salon görünmemeli (hero görsel standardı, çeşitlilik eki).
6. **Hero kırpması doğru mu?** Dikey (4:5) kutuda ana obje ortada ve kesilmemiş olmalı.
7. **Mobil görünüm:** 390 px genişlikte sayfa taşıyor mu, görsel doğru kırpılıyor mu?
8. **Jargon var mı?** Başlık ve etiketleri tüp bebek tedavisi gören, teknik bilgisi olmayan biri anlar mı?
9. **Sayılar:** Sayfadaki her yüzde ve rakamın yakınında bir kaynak var mı?
10. **Yayından sonra:** Değişen görseller canlıda yeni haliyle geliyor mu? Durum koduna değil, dosya içeriğine (SHA) bakın. `/images/` altındaki dosyalar 1 yıl önbellekte tutulur; aynı adla değiştirilen görseller için Cloudflare Custom Purge gerekir.

## Aylık tur (15 dakika)
En çok trafik alan 10 sayfayı masaüstünde ve mobilde açın, yukarıdaki 1–8. maddelere bakın. Ardından `npm run verify:content-quality` çalıştırıp uyarı listesini gözden geçirin. Bu komut hızlı modu kullanmaz, bulanık bant kontrolü de dahildir.
