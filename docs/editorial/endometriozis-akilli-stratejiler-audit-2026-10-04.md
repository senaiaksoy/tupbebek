# Endometriozis ve kısırlık — geniş audit, humanize ve yerel düzeltme, 4 Ekim 2026

## Yetki ve sürüm

Kullanıcı isteği: "endometriozis-akilli-stratejiler.mdx geniş audit humanize fix". Kapsam yalnızca bu makale, bekleyen SSS listesi ve bu kayıttır. Commit, push, merge veya deploy yetkisi verilmedi.

Son onaylı sürüm `966e69f9` (11 Ağustos 2026; `expertContribution.answeredAt` ve `reviewDate` aynı gün). Bu commit ile `origin/main` (`95a3f79a`) arasında makalede fark yoktu; commit edilmemiş başka oturum değişikliği yoktu. Düzenleme ayrı worktree'de (`claude/endometriozis-akilli-audit`) yapıldı. Eski onay aşağıdaki yeni kaynaklı açıklamaları kapsamaz.

## Audit bulguları (düzeltme öncesi)

| # | Bulgu | Tür |
| --- | --- | --- |
| 1 | Gövdede hiç iddiaya bitişik atıf yoktu; kaynaklar yalnızca listede duruyordu (iddia-kaynak izi standardı karşılanmıyordu). | Kanıt izi |
| 2 | Nisenblat 2016 Cochrane CD012281 (non-invaziv test kombinasyonları) görüntüleme iddiasını desteklemiyor; özeti "laparoskopi altın standart, non-invaziv testler yalnızca araştırmada" der. ESHRE'nin bu iddia için atıf yaptığı inceleme CD009591'dir (Nisenblat 2016b, PMID 26919512). | Kaynak uyuşmazlığı |
| 3 | H2 "Tanı neden gecikebilir?" sorusunu sormasına rağmen gecikmeyi açıklamıyordu. | Bölüm işlevi |
| 4 | ESHRE 2022'nin hasta kararını değiştiren güçlü önerileri eksikti: doğurganlığı artırmak için yumurtalık baskılayıcı ilaç verilmemesi; ameliyat sonrası yalnızca gebelik için hormon tedavisi verilmemesi; IVF öncesi uzun süreli GnRH agonistinin rutin önerilmemesi; yalnızca hastalığı tedavi etmek için gebelik önerilmemesi; gebelik risk bulgularının takibi rutin sıklaştırmayı gerektirmemesi. | Klinik boşluk |
| 5 | Strateji tablosu, onaylı `expertContribution` yanıtındaki en güçlü cerrahi gerekçeyi (malignite şüphesi) ve tüp/erkek faktörünü içermiyordu; "derin endometriozis bulgusu → cerrahi" satırı yanıttaki "organ komplikasyonu" sınırını aşıyordu. | Hekim yanıtıyla tutarlılık |
| 6 | Hamdan 2015 kaynakçadaydı ama "IVF öncesi ameliyat canlı doğumu artırmaz" sonucu gövdede yoktu. | Kanıt izi |
| 7 | İçindekiler numarasızdı (stil rehberi: 4+ H2'de numaralı). | Yapı |
| 8 | SSS "Dr. Aksoy'a en sık sorulan sorular" yapısında değil; beş yanıt model yazımı. | Zorunlu bölüm |
| 9 | WHO kaynağı dergi alanıyla ("WHO Fact Sheet") işaretliydi; ESHRE `guideline` tipinde değildi. | Künye |
| 10 | Dil: "Bu tablo … açıklar" ve "… anlamına gelmez" kalıpları; "hidrosalpinx/hidrosalpinksin" yazım tutarsızlığı; "şikayet"; AFC/AMH ilk geçişte açıklanmamış; "oldu mu?" ile siz dili kırılması; ultrason/MRI–MR karışık. | Gramer, yerel ifade, humanizasyon |
| 11 | Üç sütunlu iki tablo için mobil sarma stili yoktu (endometrioma makalesinde aynı sorun 4 Ekim'de çözülmüştü). | Teknik |

Kapsam dışı not: Video gömmesi `id="-FxkIwmlO9g"` HTML'de iki kez geçiyor; aynı durum endometrioma sayfasında da var, ortak şablon kaynaklı. Düzeltilmedi.

## İddia ve anlam kaydı (yerel düzeltme)

| Önce | Sonra | Dayanak / sınır |
| --- | --- | --- |
| Yaygınlık verisi yok. | Üreme çağında ~%10; kısırlık nedeniyle değerlendirilen kadınlarda %25–50. | WHO bilgi notu, 15 Ekim 2025 (canlı sayfadan okundu): "10% (190 million)", "Amongst women with infertility, as many as 25-50%". |
| Tanı gecikmesi açıklanmıyordu. | Belirtilerin değişkenliği, belirtisiz olgular, farkındalık eksikliği; tanıya ulaşma süresi ortalama 4–12 yıl. | WHO 2025: "Symptoms … variable and broad", "average time to diagnosis is between 4 and 12 years". "Normal sayılması" gibi kaynakta olmayan neden eklenmedi. |
| Belirti listesi | "Çok yoğun adet kanaması" eklendi; kasık ağrısı "adet bittiğinde de geçmeyen" diye tanımlandı; liste başlığı bulguları da kapsar. | WHO 2025 belirti listesi ve kronik pelvik ağrı tanımı. |
| Görüntüleme cümlesi kaynaksızdı. | ESHRE görüntüleme önerisi + Nisenblat 2016b (endometriomada vajinal ultrasonun yüksek doğruluğu, derin endometriozis için ultrason/MR). "Deneyimli ellerde" sınırı korundu. | ESHRE 2022 tam metni (PMC8951218) güçlü öneri; PMID 26919512 özeti. Duyarlılık/özgüllük sayıları eklenmedi. |
| Negatif görüntüleme → laparoskopi | Aynı anlam; "ilaç tedavisi sonuç vermediyse veya uygun değilse" koşulu eklendi. | ESHRE 2022 GPP. |
| Endometrioma ve yumurtalık yanıtı | Daha az yumurta olabilir, canlı doğum benzer; IVF öncesi ameliyat canlı doğumu artırmadı; ESHRE rutin ameliyat önermez. | Hamdan 2015 (33 çalışma; canlı doğum OR 0,98 ve ameliyat OR 0,90); ESHRE 2022 güçlü öneri. Oranlar metne eklenmedi. |
| Fertilite koruma | "Gerçek klinik yararı henüz net değildir" → ESHRE'nin yaygın yumurtalık tutulumunda artı/eksi konuşma önerisi + "gerçek yararı henüz bilinmiyor". | ESHRE 2022: "true benefit … remains unknown". |
| Strateji tablosu | Malignite şüphesi ve tüp/erkek faktörü satırları eklendi; ağrı satırı "ilaca dirençli ağrı; üreter/bağırsak tıkanıklığı gibi organ sorunu" diye daraltıldı; düşük rezerv satırına iki taraflı kist ve önceki yumurtalık ameliyatı eklendi; aşılama "yumurtalık uyarımıyla" diye netleşti. | Satırlar onaylı `expertContribution` yanıtından ve ESHRE 2022'den (IUI + uyarım evre I–II zayıf öneri; ART: tüp işlevi bozuk, erkek faktörü, düşük EFI, başarısız tedavi) kuruldu. Tüp/erkek faktörü satırı endometrioma makalesinde Dr. Aksoy'un onayladığı yumuşatılmış gövde ifadesiyle aynıdır. Yeni klinik görüş üretilmedi. |
| — | ESHRE karar ölçütleri (ağrı, yaş, tercih, önceki ameliyat, diğer nedenler, rezerv, EFI). | ESHRE 2022 GPP. |
| — | Hormonal ilaç ağrıyı azaltabilir, doğurganlığı artırmaz; ameliyat sonrası yalnızca gebelik için hormon önerilmez. | ESHRE 2022 iki güçlü öneri; ilaç adı/doz verilmedi. |
| — | Evre I–II'de operatif laparoskopi süren gebeliği artırabilir (zayıf öneri); IVF öncesi rutin ameliyat önerilmez. | ESHRE 2022 (zayıf ve güçlü öneri ayrımı metinde açık). |
| — | IVF öncesi uzun süreli GnRH agonisti rutin önerilmez. | ESHRE 2022 güçlü öneri ("benefit is uncertain"). |
| Gebelik "hastalığın kalıcı olarak ortadan kalktığı anlamına gelmez" | Gebelik endometriozisi tedavi etmez; yalnızca tedavi amacıyla gebelik önerilmez. | ESHRE 2022 güçlü öneri (Leeners 2018). |
| Gebelik riskleri | Mevcut C düzeyi sınırı korundu; ESHRE'nin "takibi rutin sıklaştırmayı veya gebelikten caydırmayı gerektirmez" sonucu eklendi. | ESHRE 2022. |
| — | Gebelikte endometrioma görünümü değişebilir; atipik görünümde deneyimli merkez. | ESHRE 2022. |

Kaynak değişikliği: Nisenblat 2016 CD012281 (PMID 27405583) → Nisenblat 2016 CD009591 (PMID 26919512, DOI 10.1002/14651858.CD009591.pub2); künye PubMed esummary ile doğrulandı. WHO `officialWebPage`, ESHRE `guideline` olarak işaretlendi. Diğer kaynaklar (Zondervan 2020, ESHRE 2022, Hamdan 2015) PubMed'de doğrulandı.

Korunanlar: başlık, `seoTitle`, description, summary anlamı (yalnızca "MRI" → "MR"), bölüm bağlantıları (`#tani`, `#mekanizma`, `#rezerv`, `#strateji`, `#gebelik`, `#faq`), görsel, video, `expertContribution` metni (dokunulmadı), tüm tarih ve onay alanları, beş mevcut SSS sorusu (yalnızca hafif dil düzeltmesi), ilgili rehber kutusu.

## SSS dönüşümü

Search Console bu oturumda okunamadı (yerleşik tarayıcıda Google oturumu yok; yerel GSC API betiği yok). Türkiye/Türkçe Google Autocomplete (`hl=tr&gl=tr`, `client=firefox`) 2026-10-04'te 17 kök ifadeyle sorgulandı. Kullanılan ham ifadeler:

- `endometriozis hamile` → "endometriozis hamile kalmaya engel mi", "endometriozis hamile kalabilir mi", "endometriozis sonrası hamilelik", "endometriozis ameliyatı sonrası hamile kalanlar"
- `endometriozis gebe` → "endometriozis gebeliğe engel mi", "endometriozis ameliyatı sonrası gebelik", "endometriozis dış gebelik"
- `endometriozis varken` → "endometriozis varken hamile kalınır mı"
- `endometriozis ilaç` → "endometriozis ilaçla tedavi edilir mi", "endometriozis ilaç tedavisi"
- `endometriozis amh` → "endometriozis amh düşürür mü"
- `endometriozis evre` → "endometriozis evre 4", "4 evre endometriozis nedir"; `endometriozis ile hamile` → "derin endometriozis ile hamile kalanlar"
- Sonuç vermeyen kökler: `endometriozis kısırlık`, `endometriozis tüp bebek`, `endometriozis doğal`, `endometriozis yumurta dondurma`, `endometriozis aşılama`, `endometriozis kısırlık yapar`.

İlk üç soru Dr. Aksoy'a soruldu ve `pending-physician-faq.md` listesine yazıldı. Yanıtlar gelene kadar mevcut SSS yayında kalır; başlık "Sıkça Sorulan Sorular" olarak bırakıldı, model yanıtları hekim bölümüne taşınmadı.

## Doğrulama (yerel)

- `npm run build`: başarılı (Pagefind 64 makale). İçerik kalitesi uyarıları başka üç sayfaya ait.
- `npm run verify:preflight`: 26/26 başarılı (PMID: 1030 atıf / 362 benzersiz PMID; yapılandırılmış veri, fragment, bağlantı, editoryal özgünlük dahil).
- `editorial-check.mjs --locale tr`: 0 aday (önce de 0). Frontmatter ve JSX metni ayrıca elle okundu.
- `check-fidelity.mjs` (baz: düzenleme öncesi dosya): `review_changes`. Tüm farklar yukarıdaki kayıtta eşleşen eklemelerdir (WHO %10, %25–50, 4–12 yıl; Hamdan 33 çalışma; yeni atıf bağlantıları). Sayı silinmedi.
- Derlenmiş HTML: tek H1, iki tablo, yeni metin mevcut. Tarayıcıda mobil tablo görsel kontrolü yapılmadı; stil, endometrioma makalesinde 390/320 px'te doğrulanan kapsamlı kuralın aynısıdır.
- `git diff --check`: temiz.

## Onay ve SSS (4 Ekim 2026, aynı oturum)

Dr. Aksoy üç SSS sorusunu yanıtladı ve aynı mesajda "Tıbbi inceleme yapıldı onay verildi, kutuya da uygula" dedi. Buna göre:

- Yerel düzeltme paketinin tıbbi incelemesi ve onayı kaydedildi: `reviewType: medical`, `reviewDate`, `lastModified` ve `evidenceAsOf` 2026-10-04, `approvedBy: Doç. Dr. Senai Aksoy`; `reviewScope` ve `editorialMethodNote` gerçek kapsamla güncellendi.
- `expertContribution` metnine endometrioma kutusunda 4 Ekim'de onaylanan terim sadeleştirmesi aynen uygulandı (malignite → kanser (malignite) / kanser şüphesi; foliküllere erişim → iğnenin foliküllere güvenli biçimde ulaşması; bilateral → iki yumurtalıkta birden / iki tüpte de belirgin hasar veya tıkanıklık; over → yumurtalık; folikül erişim sorunu → yumurta toplamaya engel). Bu kutuya özgü "Özetle…" cümlesinde yalnızca "over rezervi" → "yumurtalık rezervi" değişti. Endometrioma kutusuna eklenen imza cümlesi buraya taşınmadı. `answeredAt` (2026-08-11) korundu.
- SSS "Dr. Aksoy'a en sık sorulan sorular" başlığıyla üç gerçek yanıta dönüştürüldü; eski beş model yanıtı kaldırıldı. Özgün yanıtlar, dil düzenlemeleri, kaynak kontrolü ve eski SSS'nin gövdedeki karşılıkları `pending-physician-faq.md` → "Yanıtlanan sorular" bölümündedir. ASRM 2012 (PMID 22704630) ve Bafort 2020 Cochrane (PMID 33095458) kaynakçaya eklendi.

Dr. Aksoy aynı gün seçenekli soruda düzenlenmiş SSS karşılıklarını "İfadeler bana ait, onaylıyorum" ile onayladı ve "Commit, push, PR aç" seçeneğini seçti. Merge ve deploy kararı Dr. Aksoy'tadır.

İkinci SSS grubu: Dr. Aksoy "Endometriozis AMH'yi düşürür mü?" ve "Evre 4 endometriozisle hamile kalınır mı?" sorularını da aynı gün yanıtladı; iki yanıt SSS'ye eklendi (bölümde toplam beş soru), ASRM 2020 (PMID 33280722) kaynakçaya girdi, `reviewScope` ve `editorialMethodNote` beş soruya göre güncellendi. Ayrıntı `pending-physician-faq.md` kaydında.

## Açık işler

1. Search Console sayfa sorgusu erişimi olduğunda soru seçiminin GSC ile karşılaştırılması.

## Dış değerlendirme sonrası SEO/hasta dili turu (4 Ekim 2026, PR #266 yayımlandıktan sonra)

**Kaynak:** Kullanıcının yapıştırdığı dış (ChatGPT) değerlendirme. **Sürüm eşleştirmesi:** yedi alıntı PR #266 öncesi metne aitti ve güncel dosyada yoktu: "rahim dışında yerleşmesiyle tanımlanan", "Tanıda artık tek yol 'hemen laparoskopi'", "Endometrioma, bazı hastalarda yumurtalık yanıtını azaltabilir", eski aşılama satırı, kutudaki "bilateral", "over cerrahisi", "Malignite" ve "ultrason/MRI". Bunlara dayalı öneriler (kutunun yeniden yazımı dahil) uygulanmadı; kutu zaten onaylı sadeleştirilmiş dildedir ve değerlendirmenin önerdiği yeniden ifade hekim sözü olmadığı için kullanılmadı.

**Uygulananlar (Dr. Aksoy seçenekli soruda "Onaylıyorum, PR aç ve deploy et"):**

- H1 "Endometriozis ve Kısırlık: Gebelik, Ameliyat ve Tüp Bebek (IVF)"; `seoTitle` "Endometriozis ve Kısırlık: Gebelik, Ameliyat ve Tüp Bebek" (sayfa başlığı 72 karakter); description ve summary'de "çikolata kisti", "yumurtalık rezervi", "tüp bebek (IVF)"; `public/llms.txt` başlığı eşitlendi.
- `#tani` içinde endometriozis–çikolata kisti ilişkisi (genel hastalık / yumurtalıktaki biçim; her hastada gelişmez). Yeni klinik iddia değildir; endometrioma makalesinde onaylı ayrımın aynısıdır.
- Yeni H2 `#laparoskopi` "Endometriozis Tanısı İçin Laparoskopi Şart mı?"; mevcut görüntüleme paragrafları buraya taşındı, "Hayır, her zaman değil." doğrudan cevabıyla açılır. İçindekiler 7 maddeye çıktı; eski bağlantılar (`#tani`, `#mekanizma`, `#rezerv`, `#strateji`, `#gebelik`, `#faq`) korundu.
- H2 adları: "Endometriozis Hamile Kalmayı Nasıl Etkiler?", "Çikolata Kisti (Endometrioma) ve Yumurtalık Rezervi", "Endometrioziste Doğal Gebelik, Ameliyat ve Tüp Bebek Sırası Nasıl Seçilir?" ("Tek bir doğru sıra yoktur" lede'i), "Endometriozisle Gebelik: Riskler ve Takip".
- Terimler: AMH ve AFC ilk geçişte (mekanizma tablosu), OHSS, adenomyozis (iç bağlantıyla), MR (manyetik rezonans), ilk gövde "tüp bebek (IVF)" kullanımı; hasta metninde "rezerv" → "yumurtalık rezervi".
- Rezerv cümlesi: kistin kendi etkisi tutarsız, ameliyatın etkisi daha iyi gösterilmiş, iki taraflı/tekrarlayan ameliyatta daha belirgin olabilir — Younis ve Taylor 2024 (PMID 38800489; endometrioma makalesinde doğrulanmış) kaynakçaya eklendi.
- IUI satırına "tüpler açıksa ve belirgin erkek faktörü yoksa" koşulu (aşılamanın genel ön koşulu; ESHRE metni evre I–II için bu koşulu ayrıca yazmaz, Dr. Aksoy onayladı).

**Uygulanmayanlar:** Gövdeye "Endometriozis hamile kalmayı engeller mi?" H2'si (aynı soru Dr. Aksoy'un SSS yanıtında; tekrar edilmedi). "Önce ameliyat mı, tüp bebek mi?" H2 adı (kardeş makale `endometriozis-tup-bebek` "cerrahi mi IVF mi?" niyetini hedefliyor; yamyamlaşmayı önlemek için "sıra nasıl seçilir" ifadesi seçildi). "Tüp bebek başarısını düşürür mü?" ayrı bölümü (`#rezerv`'de Hamdan 2015 ile karşılanıyor; ayrıntı kardeş makalede). Değerlendirmedeki `utm_source=chatgpt.com` bağlantıları ve AI yüzdesi kullanılmadı.

**Doğrulama:** `npm run build` başarılı; `npm run verify:preflight` 26/26; `editorial-check.mjs` 0 aday; derlenmiş sayfada tek H1, 7 bölüm bağlantısı.

## Üçüncü dış değerlendirme — mikro düzeltmeler (4 Ekim 2026, PR #267 yayımlandıktan sonra)

**Sürüm eşleştirmesi:** Alıntıların tümü canlı ve güncel metinle eşleşti. İki öneri zaten karşılanıyordu: EFI ilk geçişte açıklanıyordu; "Hafif (evre I–II)" ifadesi mevcuttu.

**Uygulananlar (Dr. Aksoy seçenekli sorularda onayladı):**

- `expertContribution`: "üreter ya da bağırsak obstrüksiyonu" → "üreterde ya da bağırsakta tıkanıklık"; "doğrudan IVF lehine" → "doğrudan tüp bebek (IVF) lehine". Önerilen "tüp bebeği daha erken seçme" ifadesi, "doğrudan" (ameliyatsız) anlamını zayıflattığı için kullanılmadı. Dr. Aksoy "İkisini de, anlamı koruyarak" seçeneğini seçti. `answeredAt` (2026-08-11) korundu.
- Giriş bağlantı metni "kadın kısırlığı (infertilite)"; hedef URL değişmedi.
- EFI'nin kan testi değil, ameliyat bulguları ve öyküden hesaplanan bir puan olduğu tek cümleyle belirtildi (ESHRE 2022 tanımıyla uyumlu; yeni klinik iddia yok).
- Çikolata kisti boyutu sorusu için endometrioma rehberinin `#kac-cm` bölümüne iç bağlantı.

**Uygulanmayan:** SSS'ye "Endometriozis varsa önce ameliyat mı, tüp bebek mi?" sorusu. Türkiye/Türkçe otomatik tamamlama 2026-10-04'te "endometriozis önce ameliyat", "endometriozis ameliyat mı tüp bebek mi", "endometriozis ameliyat mı" ve "endometriozis tüp bebek mi" için öneri döndürmedi; soru ayrıca kardeş `endometriozis-tup-bebek` makalesinin ana konusu. Dr. Aksoy "Ekleme" seçeneğini seçti. AI yüzdesi tahmini kalite ölçütü olarak kullanılmadı.
