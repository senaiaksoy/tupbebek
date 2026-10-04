# Endometrioma — geniş audit sonrası yerel düzeltme, 4 Ekim 2026

## Yetki ve sürüm

Kullanıcı geniş audit istedi; bulguların ardından “düzelt” talimatını verdi. Kapsam makale ve ona ait düzeltme kaydıdır. Commit, push, merge veya deploy yetkisi verilmedi.

Başlangıç çalışma ağacı temizdi. Son kayıtlı makale onayı PR #262 / `5ef3d6dc` sürümüne aittir; bu commit ile düzenleme öncesi makale arasında fark yoktu. Çalışma başlangıcındaki HEAD `70a2359a` idi. Önceki onay, aşağıdaki yeni klinik açıklamaları kapsayan yeni bir tıbbi onay olarak kullanılmaz.

## İddia ve anlam kaydı

| Önce | Yerel düzeltme | Dayanak / sınır |
| --- | --- | --- |
| Genel bağırsak, mesane veya üreter tutulumu ameliyat lehineydi. | Satır üreter/bağırsak tıkanıklığı gibi organ komplikasyonlarına daraltıldı; genel tutulum ile komplikasyon ayrıldı. | Kayıtlı gerçek expertContribution yanıtı; ESHRE 2022. Yeni hekim görüşü üretilmedi. |
| Torsiyon, rüptür ve enfeksiyon birlikte acil ameliyata yönlendiriliyordu. | Acil değerlendirme ile bulguya göre ameliyat kararı ayrıldı. | Gerçek rüptür SSS yanıtı; Gu 2023 seçilmiş elektif cerrahi kohortudur, evrensel acil cerrahi kuralı değildir. |
| AMH her ölçümde düşük diye anlatılıyordu. | Üç takip dönemindeki birleştirilmiş ortalama sonuç ve çalışmalar arası farklılık açıklandı. | Younis 2022: 1–6 hafta, 2–6 ay, 9–18 ay; 14 prospektif çalışma, 650 kadın; yüksek heterojenlik. |
| İki taraflı ameliyat etkisindeki kaynak farkı yalnızca eski editoryal kayıttaydı. | Younis–Taylor 2024 ile Murdock 2025 arasındaki uzun dönem bulgu farkı gövdede açıklandı. | Gerçek hekim SSS yanıtı aynen korundu; yeni açıklama hekimin ağzından yazılmadı. |
| AMH ve gebelik olasılığı ayrımı açık değildi. | AMH'nin yumurta sayısı göstergesi olduğu, kaliteyi/kişisel gebelik olasılığını tek başına ölçmediği açıklandı. | ASRM 2020, PMID 33280722, DOI 10.1016/j.fertnstert.2020.09.134; resmî tam metin ve künye doğrulandı. |
| Ultrason tanımının menopoz öncesi sınırı yalnızca görseldeydi. | Gövde ve açıklamaya yaş bağlamı eklendi; açıklamada gerçek ultrason olmadığı açıklandı. | Van Holsbeke 2010. Yeni risk oranı eklenmedi; seçilmiş cerrahi popülasyonu korunuyor. |
| Ameliyat sonrası hormon tedavisi sadece SSS'de nüks etkeni olarak anılıyordu. | Hemen gebelik istemeyen kadınlarda ESHRE'nin uzun süreli hormonal tedavi önerisi gövdeye eklendi. | ESHRE 2022: gebelik zamanlaması koşulu korundu; doz veya kişisel ilaç önerisi yok. |

## Kimlik ve teknik düzeltmeler

- Projenin sabit `medicalReviewer: tupbebek.com Editöryal Ekip` ve `reviewerTitle: Tıbbi Yayın Ekibi` künyesi korundu. `reviewScope`, ekip kapsamında önceki incelemeyi yapan gerçek hekimin Dr. Aksoy olduğunu ve bu audit düzeltmelerinin önceki onaya dahil olmadığını açıklar. Önceki `reviewDate`, `approvedBy`, `expertContribution.answeredAt` ve onay tarihleri değiştirilmedi. İlk audit'teki kişi/ekip uyumsuzluğu değerlendirmesi, CLAUDE.md'nin sabit künye kuralı incelendiğinde bu şekilde düzeltildi; doğrulayıcı gevşetilmedi.
- WHO kaynağı `officialWebPage` olarak işaretlendi ve yanıltıcı dergi alanı kaldırıldı; ESHRE `guideline` olarak işaretlendi. ASRM kaynağı eklendi.
- İçindekiler numaralandırıldı; altı bölüm bağlantısı korundu.
- Mobil tablo stili yalnızca `.endometrioma-article` kapsamına alındı; hücreler dar ekranda sarılır. Diğer makalelerin ortak stili değiştirilmedi.
- Uzun giriş paragrafı bölündü. Başlık, summary, ana sonuçlar, gerçek beş SSS yanıtı ve imzalı klinik katkı korundu.

## Onay ve yayın durumu

Yerel düzeltme tesliminde bu paketin yeni klinik açıklamaları son tıbbi inceleme ve görünür kullanım onayı bekliyordu; önceki onay yeni pakete taşınmadı. Ardından Dr. Aksoy bu oturumda 4 Ekim 2026 tarihinde “Tıbbi inceleme yapıldı onay verildi commit, push ve deploy.” talimatını verdi. Bu açık teyitle geniş audit sonrası düzeltme paketinin tıbbi incelemesi ve yayın onayı kaydedildi; `reviewScope` yeni kapsam ve ASRM kaynağı dahil güncellendi. Aynı gün içindeki gerçek inceleme nedeniyle tarih alanları 2026-10-04 olarak korundu. Yeni hekim yanıtı veya yeni SSS üretilmedi. Commit, push ve doğru `tupbebek` Pages projesine deploy yetkisi bu son talimattan gelir.

Yeni SSS sorusu eklenmedi veya mevcut soru dönüştürülmedi. Beş soru/yanıtın gerçek kaydı `pending-physician-faq.md` içinde bulunur. Bekleyen hekim sorusu yoktur.

## Doğrulama

- `npx astro build` ve `node scripts/postbuild-seo.mjs`: başarılı. Astro/Cloudflare Sharp uyumluluğu ve eski Browserslist verisi uyarıları mevcut altyapıya aittir.
- `npm run verify:preflight`: 26/26 başarılı; içerik, referans PMID, JSON-LD, bağlantı, fragment, editoryal özgünlük ve SEO kontrolleri dahil. Başka üç sayfadaki bağlamsal “en iyi” uyarıları bu kapsamın dışında kaldı.
- `editorial-check.mjs --locale tr --json`: 0 bulgu. Ham HTML, frontmatter ve JSX ayrıca elle incelendi.
- `check-fidelity.mjs`: beklenen `review_changes` sonucu (çıkış 1). Yeni 2–6 ve 9–18 ay takip aralıkları, ASRM 2020 bağlantıları ve mevcut kaynaklara ek atıflar kaynaklarla kontrol edildi; anlam kaydı yukarıdadır. Bu sonuç otomatik başarı veya tıbbi onay olarak sunulmaz. Yüzde verisi korunmuştur.
- Son yerel HTML tarayıcı kontrolü: tek H1, yinelenen ID yok, 6 içindekiler bağlantısı, 5 SSS, 10 kaynak. Rüptür sorusu açılıp gerçek yanıtın görünmesi doğrulandı. WHO `WebPage`, ESHRE ve ASRM `MedicalGuideline`; hedef sayfada `FAQPage` eklenmedi.
- Mobil: 390 ve 320 px genişliklerde üç tablonun `scrollWidth` ve `clientWidth` değerleri eşit (350 ve 280 px); yatay hücre taşması yok. Karar tablosu ve SSS görsel olarak kontrol edildi; geçici tarayıcı boyutu sıfırlandı.
- Son dosyanın grameri, yerel ifadesi ve bütün metin akışı elle yeniden okundu. Gerçek uzman katkısı ve beş SSS bloğu önceki onaylı sürümle birebir karşılaştırıldı.
- Yerel düzeltme teslimindeki `git diff --check`: temiz. O teslimde commit, push veya deploy yapılmamıştı. Sonraki tıbbi onay ve yayın yetkisi yukarıda ayrı kaydedildi. Bekleyen hekim SSS sorusu yoktur.

## Onay sonrası yayın hazırlığı

- Son onay kapsamı kayda alındıktan sonra `npx astro check`: 0 hata, 0 uyarı (159 bilgi notu); `npm run build`: başarılı, Pagefind 64 makaleyi indeksledi; `npm run verify:preflight`: 26/26 başarılı.
- Yayın commit'i yalnızca `endometrioma.mdx` ve bu editoryal kaydı içerir. Build'in yeniden ürettiği görsel boyut manifesti ve arama indeksi commit'e dahil edilmez; üretimde güncel kaynaktan yeniden üretilir. Arama indeksinde önceki kaynak sürümlerinden kalan endometrioma ve PGT-A kayıt farkları bulundu; PGT-A makalesi veya başka bir makale değiştirilmedi.
- Yayın `npm run deploy` korumalı komutuyla `tupbebek` / `main` hedefine yapılır; tamamlanması ve önbellek atlatılarak canlı kaynak/SSS/şema/inceleme kaydı kontrolü bu sohbetin yayın kanıtında raporlanır.
