# IVF öncesi histeroskopi — geniş audit ve yerel düzeltme, 4 Ekim 2026

## Yetki ve sürüm

Kullanıcı istekleri: "ivf-oncesi-histeroskopi.mdx geniş audit", ardından "fix et, SSS sorularını sor". Commit, push, merge veya deploy yetkisi verilmedi.

Son onaylı sürüm `966e69f9` (11 Ağustos 2026; `expertContribution.answeredAt` ve `reviewDate` aynı gün); canlı sayfa bu sürümle eşleşti. Düzenleme ayrı worktree'de (`claude/ivf-histeroskopi-audit`, taban `origin/main` `a55740d5`) yapıldı. Eski tıbbi onay aşağıdaki yeni kaynaklı açıklamaları kapsamaz; `reviewDate`, `lastModified`, `evidenceAsOf`, `reviewScope` ve `editorialMethodNote` Dr. Aksoy'un onayına kadar değiştirilmedi.

## Audit bulguları (düzeltme öncesi)

| # | Bulgu | Tür |
| --- | --- | --- |
| 1 | Karar algoritması görseli (`src/images/library/diyagram/histeroskopi_karar_algoritmasi.webp`): kaynaksız "%87 oranında ağrıya neden olur"; "Açıklanamayan infertilite" iki kez histeroskopi gerekçesi olarak listelenmiş (metinde yok; Cochrane 2019'da bu grubun kanıtı çok düşük kaliteli); "Rutin Histeroskopi Gerekmez" kutusundan "İlk denemede düşünülebilecek durumlar"a ok; yazım hataları ("bulgulan", "Gecirilmiş", "kürtai", "tup"); "Maliyet-etkinlik" başlığı altında euro ikonu ve fayda yok cümlesi; figcaption ve mobil sürüm yok; PNG yedeği 1,1 MB. | Yanlış tıbbi bilgi, görsel kuralı |
| 2 | Hero (`/images/library/hastalik/histeroskopi_resim.webp`): "Polip" etiketi alet ucunu, "Rahim" etiketi rahim ağzı kanalını gösteriyor; "Hysteroscop", "Servix", "Uterus" ve "Rahim" karışık; 1408×736 (standart 1600×900); hero standardı editöryel fotoğraftır, illüstrasyon değil. | Yanlış etiket, hero standardı |
| 3 | Kutu (2026-08-11) "en güçlü gerekçe tekrarlayan implantasyon başarısızlığı" derken kardeş `endoskopik-cerrahi-histeroskopi` kutusu (2026-09-25) "başarısız transfer sayısı tek başına ameliyat gerekçesi değildir", gövdesi "tek başına histeroskopi gerekçesi değildir" diyor. TROPHY: normal ultrason + 2–4 başarısız IVF'de canlı doğum %29'a %29. | Hekim görüşü tutarlılığı |
| 4 | Septum nüanssız operatif hedef olarak sunuluyordu. TRUST RKÇ (Rikken 2021, 80 kadın): canlı doğum %31'e %35; ASRM 2024: tekrarlayan düşükte iyileştirir, kısırlıkta ortak karar. | Kanıt |
| 5 | ESHRE 2023 RIF metnindeki meta-analiz (RR 1,29; 4 çalışma, 2.247 hasta) verilmemişti; ince endometrium satırında ESHRE'nin "östrojen hazırlığı düzenlendiği hâlde" koşulu yoktu; ESHRE'nin "kavite tedavilerinin RIF'te gebeliğe etkisi değerlendirilmedi" sınırı yoktu. | Kanıt dengesi |
| 6 | Gövdede iddiaya bitişik kaynak bağlantısı yoktu; `#surec` riskleri ve zamanlaması kaynaksızdı. | Kanıt izi |
| 7 | SSS "Sıkça Sorulan Sorular", 7 model yanıtı; laparoskopi sorusu konu dışı. | Zorunlu bölüm |
| 8 | İçindekiler numarasız (8 H2); `#kimlerde` ve `#surec` görselle açılıyordu; giriş paragrafı yoktu; tabloda 1. ve 6. satır tekrar. | Yapı |
| 9 | Özet ve gövdede açıklamasız RIF, SIS, HSG, endometrial scratch, submüköz, septum, kavite, invaziv, transvajinal, perforasyon; "kürtaj/küretaj" karışık. | Dil |
| 10 | `histeroskopi-hazirlik-yansima.webp` süs görseli; `histeroskopi-intrauterin-bulgular.webp` içinde "Myom" yazım hatası; figcaption'lar kaynaksız. | Görsel |
| 11 | `seoTitle` "IVF Öncesi Histeroskopi" — otomatik tamamlamada kullanıcı dili "histeroskopi tüp bebek …". | SEO |

Kapsam dışı notlar (düzeltilmedi): video gömmesinde `id="GP809hiOu_Y"` iki kez (ortak şablon); `src/data/glossary.ts` içinde Submüköz Miyom "mutlaka önerilir", Uterin Septum "düzeltilir", Polip "önerilir" ifadeleri kanıtın ötesinde; "Laparoskopi" ve "Hidrosalpinks" maddeleri bu makaleye bağlanıyor.

## Yerel düzeltmeler ve dayanakları

| Değişiklik | Dayanak |
| --- | --- |
| Karar algoritması görseli ve `Picture` importu kaldırıldı. | Bulgu 1; bilgi `#kimlerde` tablosunda zaten var. |
| `histeroskopi-hazirlik-yansima.webp` gövdeden kaldırıldı. | Stil rehberi: süs görseli eklenmez. |
| Yeni hero `public/images/makaleler/ivf-oncesi-histeroskopi.webp` (1600×900, 95 KB): kiremit duvarlı görüşme odası, şeftali başörtülü kadın, hekimin elindeki rahim modeli. Higgsfield `gpt_image_2_5` (iş 5bf0b114-57f4-4589-80dc-cce0173dd5b4; iki adaydan seçildi). Alt metin görsele bakılarak yazıldı. | Hero standardı (Vogue editöryel, terracotta + apricot histeroskopi imzası, çeşitlilik kuralı). |
| `histeroskopi-intrauterin-bulgular.webp` yeniden işlendi: etiketler Manrope ile HTML'den basıldı ("Endometriyal polip", "Submüköz miyom", "Rahim septumu", "Rahim içi yapışıklık"); tedavi iddialı alt cümle yerine "… dört rahim içi bulgu · şematik çizim". Telefon için 2×2 dikey sürüm `-mobil.webp` (800×1284) `<picture>` ile. Figcaption ESHRE sınırıyla yeniden yazıldı. | Görsel kuralı 4–5; çizimin kendisi değişmedi. |
| H1 "Tüp Bebek (IVF) Öncesi Histeroskopi Gerekir mi? Rahim İçi Değerlendirme"; `seoTitle` "Tüp Bebek (IVF) Öncesi Histeroskopi Gerekir mi?" (sayfa başlığı 62 karakter); description; `llms.txt` başlığı eşitlendi. | Otomatik tamamlama ifadeleri; endometrioma/endometriozis 2026-10-04 kararlarıyla aynı desen. |
| Summary: RIF yerine "tekrarlayan tutunma başarısızlığı", SIS/HSG/submüköz/scratch açıklamaları. Anlam değişmedi. | Dil. |
| Giriş paragrafı, numaralı İçindekiler, `#kimlerde`, `#rif`, `#surec` için "Kısa cevap:" lede'i. Bölüm bağlantıları korundu. | Stil rehberi. |
| inSIGHT: 750 kadın, canlı doğum %57'ye %54 (RR 1,06); Cochrane 2019: düşük yanlılıklı 2 çalışma, 1.452 kadın, artış yok. Bağlantılar iddiaya bitişik. | PubMed özetleri (PMID 27132052, 30991443). |
| Tablo: tekrar satırı birleştirildi; ince endometrium satırına ESHRE koşulu; RIF satırı "özellikle ultrasonda şüphe varsa; ultrason normalse rutin faydası gösterilmedi". | ESHRE 2023 tam metni (PMC10270320): "If the endometrium remains thin despite adjustment of the endometrial preparation regimen, hysteroscopy can be considered to rule out adhesions or Asherman's syndrome"; "Hysteroscopy can be considered, especially when there is a suspicion of a uterine anomaly visualized on transvaginal ultrasound". |
| Septum paragrafı (TRUST + ASRM 2024); SSS 2. yanıtta septum notu. | Rikken 2021 (PMID 33793794) ve ASRM 2024 (PMID 38556964) PubMed özetleri. |
| `#rif`: ESHRE RIF tanımı; meta-analiz ve TROPHY birlikte; kavite tedavilerinin RIF'te değerlendirilmediği. | ESHRE 2023 tam metni; TROPHY (PMID 27132053). |
| `#surec`: zamanlama (adet sonrası) ve gebeliğin dışlanması; riskler (perforasyon, kanama, sıvı birikmesi); inSIGHT'ta 373 kadından birinde endometrit. | ACOG CO 800 özeti (PMID 32080054); ACOG hasta SSS sayfası (canlı okundu): "The uterus or cervix can be punctured by the hysteroscope, you may have bleeding, or extra fluid may build up in your system"; inSIGHT özeti. |
| Scratch: Türkçe karşılık, Lensen 2021 bağlantısı, `endometriyal-scratching` iç bağlantısı. | Lensen 2021 sonucu: "current evidence does not support the routine use". |
| `#sonrasi`: kardeş makalenin `#iyilesme` bölümüne bağlantı. Zamanlama içeriği değişmedi (hekim yanıtı bekleniyor). | — |
| Kaynakçaya eklenen: Rikken 2021, ASRM 2024 septum, ACOG CO 800, ACOG hasta SSS. | PubMed künyeleri doğrulandı. |

Korunanlar: `expertContribution` metni ve tarihi, tüm onay/tarih alanları, `recommendationGrade`, video alanları, QuoteBlock ("Klinik çerçeve" etiketi, hekime atıf yok), mevcut 7 SSS sorusu (yalnızca 2. ve 4. yanıtta kanıt düzeltmesi), ilgili rehber kutusu.

## SSS ve hekim soruları

Search Console bu oturumda okunamadı. Türkiye/Türkçe Google Autocomplete 2026-10-04 ham çıktıları:

- `histeroskopi tüp bebek` → "histeroskopi tüp bebek şansını artırır mı", "histeroskopi sonrası tüp bebek tutanlar kadınlar kulübü", "histeroskopi sonrası tüp bebek ne zaman yapılır", "tüp bebekte histeroskopi nedir", "tüp bebek histeroskopi ne zaman yapılır"
- `histeroskopi sonrası transfer` / `histeroskopi transfer` → "histeroskopi sonrası transfer ne zaman yapılır"; `histeroskopi sonrası embriyo transferi` → "histeroskopi sonrası dondurulmuş embriyo transferi"
- `histeroskopi mi` → "histeroskopi riskli mi", "histeroskopi hsg mi"; `histeroskopi ile` → "histeroskopi ile hsg aynı mı", "histeroskopi ile tüplere bakılır mı", "histeroskopi ile septum rezeksiyonu", "histeroskopi ile polip ameliyatı"
- `histeroskopi sonrası` → "… ilk adet ne zaman olur", "… kanama", "… hamile kalanlar" (kardeş makalede yanıtlı veya elendi)
- `histeroskopi ağrılı mı` → "histeroskopi ağrılı mıdır"; `histeroskopi neden yapılır` → "… ameliyatı neden yapılır", "ofis histeroskopi neden yapılır"
- Sonuç vermeyen kökler: `histeroskopi şart mı`, `histeroskopi başarı`, `histeroskopi gerekli mi`, `histeroskopi yapılmalı mı`, `implantasyon başarısızlığı histeroskopi`.

Seçilen üç soru ve `expertContribution` sorusu 2026-10-04'te Dr. Aksoy'a soruldu; `pending-physician-faq.md` listesine yazıldı.

## Doğrulama (yerel)

- `npm run build`: başarılı (Pagefind 64 sayfa).
- `npm run verify:preflight`: 26/26 (PMID 1062 atıf / 365 benzersiz; yapılandırılmış veri, fragment, başlık uzunluğu dahil).
- `verify-content-quality.mjs`: yeni görsel için ilk "letterbox" uyarısı alt başlık satırıyla giderildi; kalan 3 uyarı başka sayfalara ait.
- Derlenmiş HTML: tek H1, 8 bölüm, algoritma/eski hero/süs görseli yok, `<picture>` mobil kaynağı mevcut.
- `git diff --check`: temiz. Tarayıcıda mobil görsel kontrol yapılmadı; `<picture>` düzeni endometrioma makalesindekiyle aynı.

## Yanıtlar ve onay (4 Ekim 2026, aynı oturum)

- Dr. Aksoy üç SSS sorusunu ve `expertContribution` sorusunu yanıtladı. SSS "Dr. Aksoy'a en sık sorulan sorular" başlığıyla üç gerçek yanıta dönüştü; eski 7 model yanıtı kaldırıldı (ağrı bilgisi `#surec`'e taşındı, laparoskopi sorusu konu dışı olduğu için alınmadı). Kutu yeni soru ve yanıtla güncellendi, hekim sözü olmayan `evidenceNote` eklendi. Özgün yanıtlar, dil düzenlemeleri ve kaynak kontrolü `pending-physician-faq.md` → "Yanıtlanan sorular" bölümündedir. Pereira 2016, Wang 2022 ve AAGL/ESGE 2017 kaynakçaya eklendi.
- Dr. Aksoy seçenekli sorularda "İfadeler bana ait, onaylıyorum" ve "Onaylıyorum, commit, push, PR aç" seçeneklerini seçti. `reviewType: medical`, `reviewDate`, `lastModified`, `evidenceAsOf` 2026-10-04, `approvedBy`; `reviewScope` ve `editorialMethodNote` gerçek kapsamla güncellendi.
- Kardeş `endoskopik-cerrahi-histeroskopi` gövdesindeki tekrarlayan tutunma başarısızlığı cümlesi Dr. Aksoy'un "Gövde cümlesini hizala (aynı PR)" kararıyla yeni yanıtla hizalandı; o makalenin kutusuna dokunulmadı, `lastModified` 2026-10-04 oldu.

## Açık işler

1. Search Console erişimi olduğunda soru seçiminin karşılaştırılması.
2. Kapsam dışı: `glossary.ts` aşırı ifadeleri ve yanlış hedefler; video gömmesinde yinelenen `id`.
