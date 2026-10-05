# Rahim tersliği ve over torsiyonu — geniş audit ve düzeltme, 5 Ekim 2026

## Yetki ve sürüm

Kullanıcı istekleri: "bu 2 makaleyi tekrar geniş audit" (salt okunur), ardından üç hekim sorusuna yanıt ve "düzelt". Commit, push, merge veya deploy yetkisi bu kayıtta verilmedi.

Taban: `origin/main` `af3b824b` (her iki makale 4 Ekim 2026'da yayımlandı: #277, #278). Düzeltme ayrı worktree dalında (`fix/retrovert-torsiyon-audit`) yapıldı. 4 Ekim tıbbi onayı bu değişiklikleri kapsamaz; `reviewDate` yeni onaya kadar 2026-10-04 kalır (`verify:ai-search` bu yüzden bilinçli olarak kırmızı).

## Yöntem

- İddia–kaynak: her iki makalede her cümle atıf yaptığı PubMed özetiyle karşılaştırıldı; makaleleri yazmamış iki bağımsız alt ajan da aynı kontrolü yaptı, bulguları özetlere karşı yeniden doğrulandı. 27 künye PubMed ile eşleşti; ultrason tablosundaki tüm sayılar Garde 2023 ile aynı.
- Dil: senai-humanize `editorial-check.mjs` (0 aday; anlam tekrarını görmez) + elle üç okuma (gramer, yerel ifade, akış).
- Teknik: canlı HTML (JSON-LD, başlıklar, iç bağlantılar, cümle uzunluğu), Search Console URL Inspection, `llms.txt`.

## Bulgular (düzeltme öncesi)

### Rahim tersliği (`retrovert-uterus`)

| # | Bulgu | Tür |
|---|---|---|
| R1 | Özet: "sebep rahmin konumunda değil" — Fauconnier ilişki buldu; fazla kesin. | Kanıt |
| R2 | Doğal gebelik sonucu IVF transfer çalışmalarına (Egbase, Agarwal) dayanıyordu; Weekes kohortu zaten gebe kalmış 220 kadın. | Kanıt |
| R3 | Eksik veri: Schneider'de RV gebelerin %11'i IVF ile (AV %3); IVF popülasyonlarında RV %26–38 (genel %16–18). | Kanıt |
| R4 | #tedavi: "IVF'de değişmediği için rahmi öne almanın gerekçesi yok" mantık atlaması. | Kanıt |
| R5 | #nedenler: kazanılmış nedenler kaynaksız; Szylit kesitsel (OR 2,36) nedensellik ima ediyordu. | Kanıt |
| R6 | "İleri yaşta… sarkma": kaynakta yaş yok (ürojinekoloji popülasyonu). | Popülasyon |
| R7 | ASRM 2020 tanımı 2023 sürümüyle (PMID 40991339) değiştirilmiş. | Güncellik |
| R8 | IUI kaynaksız; "ani ağrı yapmaz"; Fauconnier n=27, Weekes n=220 eksik; Schneider küçük örneklem; idrar yapamama özgül değil; "sperm", "hayat boyu", "septumla ilgisi yok" kaynaksız. | Küçük |
| R9 | SSS (hekim) "hiçbir zararı yoktur / azaltmaz / belirgin olumsuz etkisi yoktur" — gövdedeki ilk üç ay kanama (%16,9'a %4,2) ve sıkışma ile gerilim. | Hekim kararı |
| Dil | "Nadiren büyüyen rahim…" yanlış okuma; "sıkışma; mesanenin" noktalı virgül; "tek zaman noktasında"; "arka bölgede"; güvence kalıbı ("anlamına gelmez / tek başına") 5 yerde; ağrı→endometriozis mesajı 4 yerde. | Dil |

### Over torsiyonu (`over-torsiyonu`)

| # | Bulgu | Tür |
|---|---|---|
| T1 | Özet ergen ACOG önerisini tüm kadınlara genelliyordu; menopoz sonrası / kötü huylu şüphe istisnası yoktu. | Popülasyon |
| T2 | Belirti profili (aralıklı, yayılmayan) ergen verisi. | Popülasyon |
| T3 | "%30 tekrar" tekrarlayan torsiyon grubundaki 46 kadına ait; genel oran gibi okunuyordu. | Payda |
| T4 | Soh: "yalnızca %57" yönlendirici; tek merkez; yaş tek belirleyici. | Kanıt |
| T5 | Bozdag n=18; hacim farkı (p=0,063) eksik; "çoğu zaman çalışır" fazla. | Kanıt |
| T6 | Avila: tanı→ameliyat süresi ilişkisiz; ilişkili olan belirti süresi. | Kanıt |
| T7 | Lemardeley düzeltilmemiş, kısmen gebelikle açıklanıyor; Dikkat kutusundaki "sonraki günlerde" kaynaksız. | Kanıt |
| T8 | Kapak altyazısında kaynaksız iyileşme iddiası. | Kanıt |
| T9 | "Eskiden alınırdı" kaynaksız; "ağrıyı açıklayan" kaynakta yok; Wattar geniş GA; Garde yanlılık riski. | Küçük |
| Dil | "en önemli kolaylaştırıcısı"; tablo öncesi iki tabela cümlesi; "anlamına gelmez" 3 kez; acil uyarısı 7 yerde. | Dil |

### Ortak teknik

- `about` şeması "Thing: Kadın Sağlığı" (ABOUT_ENTITY_MAP ve `articleWikidata.json` girdisi yok).
- Meta açıklamalar 180 ve 206 karakter (site ortancası 151).
- Breadcrumb "IVF Rehberi" (femaleSlugs dışında).
- `llms.txt` listesinde yoktu.
- Bağlamsal iç bağlantı eksik: retrovert → over-torsiyonu; endometrioma ve yumurtalık kistleri → over-torsiyonu (endometrioma "kadın yumurtalık neden ters döner" sorgusunda ~11. sırada).
- Search Console (2026-10-05): iki yeni URL "Submitted and indexed", canonical doğru; eski `/blog/` adresleri henüz yeniden taranmadı.

## Hekim yanıtları (5 Ekim 2026)

1. Rahim tersliği SSS'sinin gövdeyle uyumlu yumuşatılması: **"evet yap"**. SSS 2: "hiçbir zararı yoktur ve gebelik şansını azaltmaz" → "belirgin bir zararı yoktur ve gebelik şansını azalttığı gösterilmemiştir". SSS 4: "…belirgin bir olumsuz etkisi yoktur" sonuna "; yalnızca ilk aylarda kanama biraz daha sık görülebilir" eklendi, Schneider 2025 bağlantısı cümle sonuna taşındı.
2. Menopoz sonrası veya kötü huylu kitle şüphesinde torsiyon: **"alınmasından yanayım"**. Gövdeye kaynaklı paragraf (Ozcan 2016, PMID 27004419; Cohen 2017, PMID 27702703) ve özete istisna cümlesi eklendi; hekim adı atfedilmeden, kaynaklı genel karar cümlesi olarak.
3. SSS'deki "5 cm'den büyük kist" eşiği: **"klinik görüş"** — SSS'de hekim görüşü olarak kaldı, gövdeye kaynak iddiası olarak taşınmadı.

## Düzeltmeler

- Retrovert: R1–R8 ve dil bulguları; özet + `summaryReferences` (Weekes eklendi); ASRM 2023'e geçiş (iki yer); kazanılmış nedenler Haylen ve Vu "sınırlı" ifadesiyle, Szylit kesitsel/OR 2,36; IVF sinyali paragrafı (Egbase, Henne, Schneider); IUI çıkarıldı; sıkışma belirtisinin özgül olmadığı (Han); Seracchioli amacı ve %28,6 retrofleks; "İleri yaşta" kaldırıldı; over-torsiyonu iç bağlantısı.
- Over torsiyonu: T1–T9 ve dil bulguları; özet menopoz ayrımı + `summaryReferences` (Ozcan eklendi); yetişkin belirtileri (Zhu ve Li) ve menopoz sonrası künt ağrı (Cohen); menopoz sonrası paragrafı; Avila null bulgusu; Lemardeley sınırları; %30'un popülasyonu; kapak altyazısı Avila ilişkisine indirildi.
- Teknik: `ArticleSchema.astro` ABOUT_ENTITY_MAP (MedicalCondition), `articleWikidata.json` (Q1069694, Q552233; `verify:article-entities --online` geçti), `articleHub.ts` femaleSlugs, `llms.txt` iki satır, meta açıklamalar 153 ve 154 karakter, endometrioma ve yumurtalık kistleri makalelerine yalnızca bağlantı (metin değişmedi).

## Doğrulama (yerel)

`npm run build` başarılı. Geçenler: `verify:title-lengths`, `fragment-links`, `structured-data`, `hub-itemlists`, `article-clusters`, `link-hygiene`, `nosnippet-boilerplate`, `article-entities`, `reference-pmids`, `editorial-authenticity`, `llms-hygiene`, `llms-priority-targets`. Bilinçli kırmızı: `verify:ai-search` (ve onu çağıran `semrush-audit`) — `reviewDate` (2026-10-04) < `evidenceAsOf` (2026-10-05); yeni tıbbi onayla kapanacak. Derlenmiş HTML: breadcrumb "Kadınlarda Kısırlık", `about` MedicalCondition + Wikidata/Wikipedia, karşılıklı iç bağlantılar.

## Dış değerlendirme (kullanıcının yapıştırdığı, 2026-10-05)

Değerlendirme yayındaki 4 Ekim sürümüne aitti; önerileri güncel yerel metinle eşleştirildi, kaynakları ayrıca doğrulandı (yapıştırılan bağlantılardaki `utm_source` parametreleri taşınmadı).

| Öneri | Durum |
|---|---|
| ASRM 2020 → 2023 | Bu audit'te zaten yapılmıştı. |
| "Asıl bakılanlar … yumurtalık rezervi" cümlesi | Bu audit'te çıkarılıp kadın infertilitesi rehberine bağlantı verilmişti. ASRM 2021 tam metni (rezerv testleri danışmanlığı tamamlar, yerine geçmez) bununla uyumlu. |
| >40 yaşta daha erken değerlendirme | Eklendi; ASRM 2021 tam metni (asrm.org, canlı okundu): "In women >40 years of age, more immediate evaluation and treatment may be warranted." PMID 34607703. |
| Kazanılmış nedenlerde "yol açabilir" → "ilişkili olabilir" | Uygulandı. |
| Hareketli ve sabit retrovert ayrımı | `#nedenler` sonuna eklendi; SRU 2024 uzlaşı raporu (PMID 38591980) özeti: "observation of the relative positioning of the uterus and ovaries, and the uterine sliding sign maneuver". Hekim kutusundaki karar mantığıyla uyumlu. |
| "Torsiyon değildir" cümlesini görünür yapmak | Cümle kalın yapıldı. |
| 1/3000 için "eski serilerde" | Uygulandı (Hill 1993 tek olgu bildirimi içindeki arka plan tahmini). |
| SSS'ye "Ters rahim endometriozis belirtisi midir?" | Uygulanmadı: GSC (1 Ocak–3 Ekim 2026, regex) 0 sorgu, Türkiye/Türkçe otomatik tamamlama 3 kökte boş; önerilen yanıt model metniydi. Kural: veride olmayan soru "en sık" diye sunulmaz, yanıt hekimden gelir. İçerik gövdeye (hareketli/sabit paragrafı) ve hekim kutusuna zaten giriyor. |
| Transfer bölümünde %55/%18 ve histeropeksi bölümünü kısaltmak | Dr. Aksoy 2026-10-05: oranlar çıkarıldı (iki kaynak aynı cümlede korunarak "provada ters görülen rahim, transfer günü öne dönmüş olabilir"); histeropeksi paragrafı önerilen üç cümlelik sürüme kısaltıldı (%16,7/%28,6 ve ağrı ayrıştırma cümlesi çıktı, kanıt sınırı ve "rutin değildir" korundu). |

## Açık işler

1. ~~Dr. Aksoy'un değişen metinlerin tamamı için yeni tıbbi onayı~~ → 2026-10-05 alındı ("İkisini de onaylıyorum"); `reviewDate`, `reviewScope`, `editorialMethodNote` güncellendi.
2. Search Console'da eski `/blog/` adresleri için yeniden tarama (isteğe bağlı "Dizine eklenmesini iste").
