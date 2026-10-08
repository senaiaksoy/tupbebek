# dis-gebelik — geniş audit kaydı (2026-10-08)

Makale: `src/content/articles/dis-gebelik.mdx` (yeni; dal `content/dis-gebelik`). Dört denetim turu yapıldı; her turda bulgular kaynakla doğrulanıp uygulandı.

## 1. Bağımsız iddia–kaynak denetimi (ilk taslak)
0 yüksek, 10 orta, 17 düşük. Ortaların tümü düzeltildi: RCOG hasta sayfasına yanlış atfedilen "1.000'de 11" → "yaklaşık 90 gebelikte 1"; risk etkeni olmayanların oranı NICE (üçte bir) ve ACOG (yarısı) olarak ayrıldı; Brim 2025 tablosunun girişi; Bouyer 2003 atfedilebilir risk karışıklığı; ESEP'te yeniden dış gebelik farkının anlamsız olduğu; NICE 1.17.3 "5'te 1" ifadesinin nedenlendirilmesi; kalp atımı "nadiren" → "bazen"; acil liste kaynağı; Creanga nedensellik; metotreksat sonrası bekleme kaynakları.

## 2. Dış değerlendirme (ChatGPT, güncel inceleme dosyasıyla eşleşti)
Altı öneri kaynakla doğrulanıp uygulandı: Lipscomb %91 "tek doz protokolüyle ameliyatsız çözülme" + RCOG %15/%7; 3.500 mIU/mL'nin tanı/tedavi eşiği olmadığı uyarısı (NICE 1.8.2); tüp bağlatma nüansı (Peterson 1997, PMID 9052654); sigara için eski atfedilebilir risk sayıları çıkarıldı; Solangon verisinin seçilmiş hasta grubuna ait olduğu; Rosh 2026'nın 3 ay önerisini değiştirmediği (1–3 ay grubu 38 kadın, bazı oranlar sayısal olarak yüksek).

## 3. Geniş audit — tıbbi (bağımsız ajan)
1 yüksek, 5 orta, 14 düşük. **Yüksek:** metotreksat tedavisi sırasında kaçınılacaklar eksikti (folik asit içeren vitamin/besin, NSAİİ, alkol, ağır egzersiz, cinsel ilişki, gaz yapan yiyecekler, güneş; emzirmede kullanılmaz; öncesinde kan/organ fonksiyon testleri — ACOG FAQ; ilk günlerde ağrı ve parasetamol — RCOG) → eklendi. **Orta:** Connolly 2013 "651 canlı" → 651 gebelik, 366 canlı üzerinden model; tedavi tablosunun yalnız tüp dış gebeliği için geçerli olduğu ve yırtılma/iç kanamada acil ameliyat notu; spiral ifadesi "olasılığı yüksek" → "risk artar" + mini hap (RCOG); duygusal destek bölümü (NICE 1.13.1) eklendi; ACOG FAQ kaynakçaya eklendi. **Düşük (uygulananlar):** Skubisz %89 isabet ve hCG ≤3.000 bağlamı; Santos-Ribeiro karşılaştırmasının 1.–2. gün embriyo olduğu; DEMETER kolunda metotreksat; Rosen düzeltilmiş analiz yönü; acil hap "riski artırmaz"; NICE bağlantısı; ESEP %20 ameliyat içi tüp alınması (kanama nedeniyle, özetten doğrulandı); interstisyel %2,4; terim tutarlılığı (hidrosalpinks, kalp atımı, birimler, spiral = rahim içi araç).

## 4. Geniş audit — editoryal/SEO/teknik (bağımsız ajan)
1 yüksek, 10 orta, 14 düşük. **Yüksek:** sayfada "yayın onayı kayıtlı" görünürken editoryal kayıtta onay bekliyordu → makale onay gelene kadar commit edilmez; onayla kayıt güncellenir. **Orta (uygulananlar):** kapak görseli `ai-images-iptc.txt` listesine eklendi; altı H2'deki "Kısa cevap:" etiketi kaldırıldı (stil rehberi: her H2'de aynı etiket kaçınılacak taktik); kaynaksız "kılavuzların çoğu 3 ay, üretici 6 ay" cümlesi Rosh 2026'ya bağlandı ve NICE'ın süre vermediği eklendi; belirtiler bölümüne erken "Önemli" acil uyarısı; "erken gebelik birimi" → "kadın doğum uzmanı tarafından değerlendirme"; anti-D, yolk kesesi, diyafram, yeri belirlenemeyen gebelik açıklandı; uzun ve sayı yoğun paragraflar bölündü; %79/%69'un hangi kola ait olduğu; giriş notuna kardeş makale bağlantıları (boş gebelik, missed abortus, mol gebelik). **Düşük (uygulananlar):** açıklama ≤160 karakter ve "iğne" ifadesi; tanı H2'si "Nasıl Anlaşılır?" ile başlıyor; ABD sıklık verisi tek cümleye indirildi; ölüm paragrafı kısaltıldı; "siz" dili tutarlılığı.

## Uygulanmayanlar / ayrı iş
- Breadcrumb "Transfer Süreci": kardeş erken gebelik makaleleriyle tutarlılık için korundu; ayrı "erken gebelik sorunları" üst sayfası önerildi (karar bekliyor).
- `dusuk-sonrasi-hamilelik-bekleme-suresi.mdx` (Rh/anti-D maddesi) "tek bir hafta eşiğine dayanan genel kural kullanılmaz" diyor; NICE NG126 Haziran 2026 güncellemesi (11+6 / 12+0–12+6) ve `missed-abortus`/`dis-gebelik` ile çelişiyor → ayrı düzeltme.
- `kimyasal-gebelik.mdx` ACOG PB 191 atfı; ACOG'un güncel belgesi PB 193 → ayrı düzeltme.
- Gövde içi illüstrasyon (dış gebelik yerleşim yerleri) isteğe bağlı.
- `beta-hcg-testi#ektopik` içindeki metotreksat alt bölümü ileride bu makaleye bağlantıyla kısaltılabilir.

## Doğrulama
`npm run build` hatasız; `verify:preflight` 26/26; `verify:reference-pmids`, `verify:fragment-links`, `verify:editorial-authenticity`, `verify:seo` geçti; senai-humanize editorial-check 0 aday. Hekim metinleri (uzman kutusu ve üç SSS) yalnız dil düzeltmesiyle kullanıldı; denetimlerde kılavuzla çelişki bulunmadı.
