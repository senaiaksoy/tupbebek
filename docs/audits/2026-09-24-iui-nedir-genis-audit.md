# Aşılama (IUI) Nedir? Kimlere Uygundur, Nasıl Yapılır? — Geniş Audit Raporu

- **Tarih:** 24 Eylül 2026
- **İncelenen dosya:** `src/content/articles/iui-nedir.mdx`
- **Render edilmiş çıktı:** `dist/makaleler/iui-nedir/index.html` (24 Eylül 16:05 build)
- **Canlı sayfa:** `https://tupbebek.com/makaleler/iui-nedir/` — 200, `dateModified: 2026-07-24` (önbellek atlanarak kontrol edildi)
- **Kategori:** Tedavi Yöntemleri
- **Şablon:** `templateVersion: "2026-07"`, `expertContribution` yok, `hideEvidenceGrade: true`
- **Yazar / tıbbi inceleyen:** Doç. Dr. Senai Aksoy / Doç. Dr. Senai Aksoy (`reviewDate: 2026-07-24`)

**Durum notu:** 1–5. bölümler düzeltme öncesi sürümün tarihsel audit kaydıdır. 6. ve 7. bölümler aynı gün uygulanan düzeltmeleri gösterir. AGENTS.md "Dr. Aksoy görüşü — HARD GATE" gereği, okurun gördüğü tıbbi metni değiştiren her düzeltme öncesinde Dr. Aksoy'a konuya özel soru sorulup gerçek yanıt, tarih ve yayın onayı `expertContribution` alanına kaydedilmelidir (bkz. §5). Şema/Wikidata düzeltmesi (P1-1) teknik metadata olduğundan bu kapıya takılmaz.

---

## 1. Karar ve Üç Zorunlu Değerlendirme

| Zorunlu Değerlendirme | Sonuç | Gerekçe |
|---|---|---|
| **1. Hasta eğitimi açısından değerli mi?** | **EVET** | Sade, BLUF'lu, pazarlama dilinden arınmış. En güçlü yanı aday seçimine odaklanması: "IUI her zaman ilk adım değildir", PCOS'ta gereksiz IUI uyarısı, tüp açıklığının işlevi kanıtlamadığı notu, çoğul gebelik iptal eşikleri ve "doz/iptal kararını siz vermezsiniz" güvenlik sınırı. Yasak içerik (fiyat, garanti, before-after, bebek görseli, klinik CTA) yok. |
| **2. AI/web yanıtlarında ikincil kaynak olarak güvenle alıntılanabilir mi?** | **ŞARTLI EVET** *(P1 ve P2-1 giderilirse)* | Ana klinik öneriler (ASRM 2020 hCG 0–36 saat, 3–4 oral OS-IUI → IVF; ASRM 2022 iptal eşikleri) birincil kaynakla birebir doğrulandı. Ancak: (1) şema `about.sameAs` alanı IUI'yi Wikidata'da **PT-109 torpido botuna** bağlıyor — canlıda da böyle; (2) iki satır içi B etiketi kaynağın kanıt düzeyini aşıyor (biri uzman görüşü, biri retrospektif kohort); (3) iki sayısal iddianın (Huang 2018, Evans 2020) kaynağı kaynakçada yok ve adı geçmiyor. |
| **3. Akademik kanıt sayılmasını engelleyen eksikler neler?** | **BİRİNCİL KANIT DEĞİLDİR** | Hasta eğitimi amaçlı ikincil sentez; özgün veri, sistematik tarama yöntemi (arama stratejisi, dahil etme ölçütleri) veya bağımsız hakem incelemesi yok. Yazar ile tıbbi inceleyen aynı kişi (öz-inceleme). ESHRE 2023 ve Cochrane gibi temel kanıt gövdeleri kaynakçada yok; kaynaklarda `type`, cilt/sayfa ve ASRM belgeleri için PMID/DOI eksik. |

---

## 2. Öncelikli Bulgular

### P1 — Doğruluk ve alıntılanabilirliği doğrudan bozan hatalar

#### P1-1: Wikidata eşlemesi yanlış varlığa gidiyor (canlıda)
- **Konum:** `src/components/ArticleSchema.astro:271`
- **Mevcut:** `'iui-nedir': ['https://www.wikidata.org/wiki/Q846279', 'https://en.wikipedia.org/wiki/Artificial_insemination']`
- **Doğrulama:** Wikidata API'ye göre `Q846279` = **"PT-109 — motor torpedo boat captained by John F. Kennedy"**. Canlı HTML'de bu Q-ID mevcut.
- **Ek sorun:** `ABOUT_ENTITY_MAP` içinde `iui-nedir` yok; render edilen `about` şu: `{"@type":"Thing","name":"Tedavi Yöntemleri","sameAs":[PT-109, Artificial_insemination]}`. Yani konu bir kategori adı ve sameAs birbiriyle çelişen iki varlığa işaret ediyor. `verify:article-entities` bunu yakalamamış.
- **Gereken:**
  - `sameAs` → `https://www.wikidata.org/wiki/Q13405500` ("intrauterine insemination — method of assisted fertilization"). Genel "artificial insemination" (`Q207122`) üst kavramdır; eşanlamlı gibi aynı dizide verilmemeli.
  - `ABOUT_ENTITY_MAP['iui-nedir'] = { type: 'MedicalProcedure', name: 'Rahim içi aşılama (IUI)', alternateName: ['Aşılama', 'Intrauterine insemination', 'IUI'] }`.
  - 60 Wikidata girdisinin geri kalanı da etiket bazında kontrol edilmeli (ayrı iş olarak önerildi).

#### P1-2: Satır içi kanıt etiketleri kaynağın kanıt düzeyini aşıyor
Birincil kaynaklarla karşılaştırma:

| Satır | İddia | Kaynağın gerçek düzeyi | Mevcut | Olması gereken |
|---|---|---|---|---|
| :98 | Tek IUI, hCG'den 0–36 saat içinde | ASRM 2020: *Strength of Evidence B; Recommendation Moderate* | B | **B — doğru** |
| :113 | Tekrarlayan örneklerde düşük TMSC → IUI başarısı azalabilir, IVF/ICSI düşünülebilir | AUA/ASRM 2024 Part II, Statement 37: **Expert Opinion** | B | **D/E** |
| :137 | Klomifen-IUI %8,9 / letrozol-IUI %9,4 canlı doğum | Huang 2018, tek merkezli **retrospektif kohort** | B | **C** |
| :147 | Açıklanamayan infertilitede 3–4 oral OS-IUI, sonra IVF | ASRM 2020: *Evidence B; Moderate* | B | **B — doğru** |
| :155 | >2 folikül ≥16 mm veya >3 folikül ≥14 mm'de iptal düşünülmesi (<40 yaş) | ASRM 2022 **committee opinion**; dayanağı gözlemsel veriler | B | **C** (veya etiketsiz, "komite görüşü" olarak yazılır) |

CLAUDE.md sınıflamasına göre gözlemsel veri = C, yalnız uzman görüşü = D/E. Etiket "karar değiştirici iddia" için doğru yerde, ama düzeyi yanlış olunca okuru ve AI özetlerini yanıltıyor.

### P2 — İddia-kaynak izi, kanıt kapsamı ve şablon

#### P2-1: İki sayısal iddianın kaynağı yok ve bağlamı eksik
- **:137 (Huang 2018):** Rakamlar doğru ([PMID 29778386](https://pubmed.ncbi.nlm.nih.gov/29778386/), DOI [10.1016/j.fertnstert.2018.01.008](https://doi.org/10.1016/j.fertnstert.2018.01.008); ASRM 2020 bu çalışmayı atıflıyor). Ama:
  - Popülasyon yanlış daraltılmış: çalışma "açıklanamayan **veya hafif erkek faktörü**" çiftleri içeriyor (8.583 çift, 14.519 siklus, Çin, tek merkez).
  - Karşılaştırma kolu verilmemiş: doğal siklus IUI %6,2.
  - Hasta için daha anlamlı olan kümülatif sonuç yok: 3 siklus sonrası kümülatif canlı doğum klomifen %25,7, letrozol %26,2, doğal siklus %18,4.
  - Çoğul gebelik farkı atlanmış: klomifen %4,6, letrozol %1,3, doğal %0,7.
  - Çalışma kaynakçada yok; stil rehberinin "popülasyon, ölçülen sonuç, payda, tarih, sınırlama" kuralı karşılanmıyor.
- **:157 ("geniş bir gözlemsel çalışma"):** Kaynak Evans 2020, *Obstet Gynecol* ([PMID 32282611](https://pubmed.ncbi.nlm.nih.gov/32282611/), DOI [10.1097/AOG.0000000000003795](https://doi.org/10.1097/AOG.0000000000003795)). 24.649 kadın, 50.473 siklus; <38 yaşta 1→5 matür folikülde klinik gebelik %14,6→%21,9, artışın neredeyse tamamı çoğul gebelikten (siklus başına %0,6→%6,5), tekil gebelik %14,1→%16,4. Metindeki özet doğru ama çalışma adı da kaynakça kaydı da yok. Not: çalışmaya yalnızca TMSC >8 milyon olan sikluslar alınmış.

#### P2-2: Temel kanıt gövdeleri eksik; belirsizlik yeterince görünmüyor
- **ESHRE 2023 açıklanamayan infertilite rehberi** ([PMID 37599566](https://pubmed.ncbi.nlm.nih.gov/37599566/), DOI [10.1093/humrep/dead150](https://doi.org/10.1093/humrep/dead150)) yok. OS-IUI'yi birinci basamak kabul ediyor, ama 40 kanıta dayalı önerisinin hiçbiri yüksek kaliteli kanıta dayanmıyor; 31'i çok düşük kaliteli kanıta dayanıyor. Proje araştırma önceliği ESHRE olduğu halde yazı yalnız ASRM'ye dayanıyor.
- **Cochrane (Ayeleke 2020)** ([PMID 32124980](https://pubmed.ncbi.nlm.nih.gov/32124980/), DOI [10.1002/14651858.CD001838.pub6](https://doi.org/10.1002/14651858.CD001838.pub6)): IUI'nin zamanlı ilişki/bekleme tedavisine üstünlüğü çoğu karşılaştırmada **belirsiz**. Doğal gebelik tahmini düşük çiftlerde OS-IUI muhtemelen canlı doğumu artırıyor (orta kalite). "Seçilmiş çift" mesajını güçlendiren bu nüans metinde yok.
- **Cochrane (Sunkara 2023)** ([PMID 37753821](https://pubmed.ncbi.nlm.nih.gov/37753821/), DOI [10.1002/14651858.CD003357.pub5](https://doi.org/10.1002/14651858.CD003357.pub5)): Klomifen-IUI'den sonuç alamamış kadınlarda IVF, gonadotropin-IUI'ye göre canlı doğumu artırabilir (düşük kalite). :147'deki "gonadotropin-IUI yerine IVF" önerisini ikinci kaynakla destekler.
- **Tartışmalı alan:** Kılavuzlar arasındaki farkı (ör. NICE'ın açıklanamayan infertilitede rutin IUI önermeyen yaklaşımı) belirten bir cümle stil rehberinin "tartışmalı alanda en az iki yaklaşım" kuralını karşılar. *NICE'ın güncel metni yayın öncesi ayrıca doğrulanmalı; bu audit oturumunda doğrulanmadı.*

#### P2-3: Şablon 2026-07; Dr. Aksoy katkısı yok
- P1-2, P2-1 ve P2-2'nin tamamı okurun gördüğü tıbbi metni değiştirir. Bu nedenle `templateVersion: "2026-09"` ve `expertContribution` kapısı devreye girer.
- Önerilen tek soru (§5'te): aday seçimi / IVF'ye geçiş kararı.

#### P2-4: Genel kanıt derecesi gizli
- `hideEvidenceGrade: true`, `recommendationGrade` yok. CLAUDE.md yeni makalede dereceyi zorunlu tutuyor; şema gizlemeye izin veriyor.
- Ana klinik öneri (açıklanamayan infertilitede 3–4 oral OS-IUI → IVF) ASRM'de B, ESHRE'de düşük/çok düşük kaliteli kanıta dayanıyor. Alkol makalesindeki gibi `recommendationGrade: "B"` + `recommendationGradeScope` ("yalnızca açıklanamayan infertilitede oral OS-IUI basamağı için; erkek faktörü ve iptal eşikleri daha zayıf kanıta dayanır") önerilir.

#### P2-5: Risk bölümü eksik
- Yalnız çoğul gebelik var. Eksikler: gonadotropinli sikluslarda OHSS (seyrek), işleme bağlı enfeksiyonun nadir olması, çoğul gebeliğin anne-bebek riskleri (tek cümle), letrozol/klomifen arasındaki çoğul gebelik farkı (Huang 2018 verisi zaten eldeki kaynakta).
- Kırmızı bayrak cümlesi yok: işlem sonrası ateş, şiddetli karın ağrısı, belirgin şişkinlik/nefes darlığında hekime başvurma.

#### P2-6: Tıbbi inceleme bağımsız değil
- `author` ve `medicalReviewer` aynı kişi. CLAUDE.md varsayılanı `medicalReviewer: "tupbebek.com Editöryal Ekip"`; alkol audit'inde ise kişi olarak Dr. Aksoy'a çevrildi. Kural ile son uygulama çelişiyor. Bu bir hata değil; editoryal karar gerekiyor.

### P3 — Metin, bağlantı ve bibliyografi

- **P3-1 Anchor uyumsuzluğu (:80):** "[tüp bebek](/makaleler/ivf-protokolleri/)" genel kavramı protokol makalesine bağlıyor. `/makaleler/tup-bebek-nedir/` daha doğru hedef; `ivf-protokolleri` "İlgili rehberler"de zaten var.
- **P3-2 Eksik komşu bağlantılar:** Ovulasyon ve zamanlama bölümünden [yumurtlama takibi](/makaleler/yumurtlama-takibi/) (bu makale IUI'ye link veriyor, geri link yok). Orphan kapısı sorun değil: 5 makale + `tedavi-yontemleri.astro` IUI'ye bağlanıyor.
- **P3-3 Tekrar:** "zaman kaybettirebilir" fikri giriş (:78), görsel altyazısı (:31) ve SSS'de (:180) üç kez geçiyor. "Yıkama sonrası toplam hareketli sperm / tek evrensel eşik yok" iki bölümde (:113, :127) neredeyse aynı cümlelerle yineleniyor.
- **P3-4 38 yaş:** ASRM 2020, ≥38 yaşta hemen IVF'nin daha yüksek gebelik oranı ve daha kısa gebelik süresiyle ilişkili olduğuna dair *iyi kanıt* bildiriyor (FORT-T). Metin (:129, :149) bunu "konuşulabilir" diye yumuşatıyor ve kaynak göstermiyor.
- **P3-5 TMSC bağlamı:** AUA/ASRM metni, yıkama sonrası <5 milyon hareketli spermde IUI şansının sınırlı olduğunu belirtiyor. "Tek evrensel eşik yok" doğru, ama bu yaygın referans aralık kaynaklı bir cümleyle verilebilir. Ayrıca kılavuz ifadesi "tekrarlayan **semen analizinde** düşük TMSC" diyor; metin bunu yalnız yıkama sonrası değere bağlıyor.
- **P3-6 Türkiye bağlamı (isteğe bağlı):** Türkiye'de IUI yalnız eş spermiyle yapılabilir; donör sperm yasaktır. Tek cümle yerel okur için kafa karışıklığını önler (mevzuat metni yayın öncesi doğrulanmalı).
- **P3-7 Yatak istirahati (:172):** İfade kanıtla uyumlu. Cordary 2017 meta-analizi (4 RKÇ, 1.361 çift) istirahatin fayda sağladığını gösteremedi ([PMID 28964965](https://pubmed.ncbi.nlm.nih.gov/28964965/), DOI [10.1016/j.jogoh.2017.09.005](https://doi.org/10.1016/j.jogoh.2017.09.005)). İsteğe bağlı olarak kaynakçaya eklenebilir.
- **P3-8 Bibliyografi:** ASRM 2020 (PMID 32106976, DOI [10.1016/j.fertnstert.2019.10.014](https://doi.org/10.1016/j.fertnstert.2019.10.014), 113(2):305–322) ve ASRM 2022 (PMID 35115166, DOI [10.1016/j.fertnstert.2021.12.016](https://doi.org/10.1016/j.fertnstert.2021.12.016), 117(3):498–511) için PMID/DOI/cilt eksik. Hiçbir kaynakta `type` yok. Cohlen 2018 kaynakçada var ama metinde hiçbir iddiaya bağlanmıyor.
- **P3-9 Video:** 2024 tarihli video, Temmuz 2026 klinik revizyonundan önceki bir sürüm. Transcript/altyazı yok. Videodaki sayısal iddiaların (başlıkta "sperm sayısı, başarı oranları") güncel metinle çelişip çelişmediği bu audit'te kontrol edilemedi.

---

## 3. Bilimsel Kaynak Doğrulama Tablosu

Kaynaklar PubMed ve ASRM sayfalarından birebir karşılaştırıldı.

| Kaynak | PMID / DOI | Tasarım | İddia uyumu |
|---|---|---|---|
| ASRM 2020, açıklanamayan infertilite | 32106976 / 10.1016/j.fertnstert.2019.10.014 | Kılavuz | **Uyumlu.** 0–36 saat (B/Moderate) ve 3–4 oral OS-IUI → IVF (B/Moderate) birebir doğru. |
| ASRM 2022, çoğul gebelik | 35115166 / 10.1016/j.fertnstert.2021.12.016 | Komite görüşü | **Uyumlu.** ">2 folikül ≥16 mm veya >3 folikül ≥14 mm, <40 yaş, non-ART" metni birebir doğru. Etiket düzeyi fazla (P1-2). |
| AUA/ASRM 2024 Part II | — | Kılavuz | **İçerik uyumlu, düzey yanlış.** Statement 37 = Expert Opinion. |
| ASRM 2021, kadın infertilite değerlendirmesi | — | Komite görüşü | Uyumlu (HSG/SHG ile tübal açıklık). |
| Cohlen 2018, *Hum Reprod Update* | 29452361 / 10.1093/humupd/dmx041 | WHO destekli sistematik değerlendirme | Kimlik doğru; metinde bağlandığı iddia yok. |
| **Huang 2018** *(kaynakçada yok)* | 29778386 / 10.1016/j.fertnstert.2018.01.008 | Retrospektif kohort | Rakamlar doğru; popülasyon ve bağlam eksik (P2-1). |
| **Evans 2020** *(kaynakçada yok)* | 32282611 / 10.1097/AOG.0000000000003795 | Retrospektif kohort | Özet doğru; adı ve kaydı eksik. |
| ESHRE 2023 *(önerilen)* | 37599566 / 10.1093/humrep/dead150 | Kılavuz | Eklenmeli. |
| Cochrane Ayeleke 2020 *(önerilen)* | 32124980 / 10.1002/14651858.CD001838.pub6 | Sistematik derleme | Belirsizlik için eklenmeli. |
| Cochrane Sunkara 2023 *(önerilen)* | 37753821 / 10.1002/14651858.CD003357.pub5 | Sistematik derleme | IVF'ye geçiş için ikinci destek. |

---

## 4. Teknik Render, SEO ve Erişilebilirlik

| Alan | Durum | Not |
|---|---|---|
| H1 / başlık hiyerarşisi | GEÇTİ | Tek H1; 7 H2 + TOC, anchor'lar eşleşiyor. |
| Title / description | GEÇTİ | Title "Aşılama (IUI) Nedir? Kimlere Uygundur? \| tupbebek.com"; description 140 karakter. |
| Robots / canonical / sitemap | GEÇTİ | `index, follow, max-image-preview:large`; `sitemap-0.xml` içinde. |
| JSON-LD | **KALDI** | Article, MedicalWebPage, BreadcrumbList parse ediliyor; `reviewedBy` kanonik `@id`; 5 citation. **`about` hatalı** (P1-1). |
| Tıbbi sorumluluk reddi | GEÇTİ | Render edilen HTML'de mevcut. |
| QuoteBlock | GEÇTİ | Üçüncü şahıs nötr "Klinik çerçeve"; hekim imzası yok (alkol makalesindeki ihlal burada yok). |
| İç linkler | GEÇTİ / P3 | Tüm hedefler var; inbound 5 makale. Anchor uyumsuzluğu P3-1. |
| Görsel / baby-free | GEÇTİ | 1600×900 webp, 81 KB, alt metni açıklayıcı, `imageSourceType: ai-assisted` beyanı var. |
| Canlı–yerel fark | Yok | Canlı sayfa Temmuz sürümü ile aynı; P1-1 canlıda da mevcut. |

---

## 5. Düzeltme Yol Haritası

1. **Hemen (uzman yanıtı gerektirmez):** P1-1 Wikidata/`ABOUT_ENTITY_MAP` düzeltmesi. Ardından `verify:article-entities` ve `verify:structured-data`.
2. **Dr. Aksoy'a sorulacak tek soru (öneri):**
   > *"Açıklanamayan infertilite veya hafif erkek faktörü olan bir çiftte aşılamaya hiç başlamadan doğrudan tüp bebeği önerdiğiniz durum hangisidir; kararınızı en çok hangi bulgu değiştirir (yaş, TMSC, süre, rezerv)?"*
   Gerçek yanıt + tarih + onay → `expertContribution`, `templateVersion: "2026-09"`.
3. **Yanıt geldikten sonra metin düzeltmeleri:** P1-2 etiket düzeyleri → P2-1 Huang/Evans bağlamı ve kaynak kaydı → P2-2 ESHRE 2023 + Cochrane ekleri ve tartışmalı alan cümlesi → P2-4 kapsamlı `recommendationGrade` → P2-5 risk/kırmızı bayrak → P3 maddeleri.
4. **Karar bekleyen:** P2-6 (reviewer = kişi mi, Editöryal Ekip mi) ve P3-6 (Türkiye mevzuat cümlesi).
5. **Doğrulama:** `npm run build`, `verify:preflight`, `verify:editorial-authenticity`, `verify:article-template`. Derlenmiş HTML'de `about` = MedicalProcedure + `Q13405500` görülmeli.

---

## 6. Uygulanan Düzeltme (24 Eylül 2026)

**P1-1 çözüldü (yerel):** `ArticleSchema.astro` içinde `iui-nedir` için:
- `WIKIDATA_MAP` → yalnız `Q13405500`. Bu kayıt Wikidata API ile doğrulandı: "intrauterine insemination — method of assisted fertilization". Kaydın enwiki sitelink'i olmadığından Wikipedia URL'si eklenmedi. PT-109 (`Q846279`) ve üst kavram "Artificial_insemination" kaldırıldı.
- `ABOUT_ENTITY_MAP` → `MedicalProcedure`, `name: "Rahim içi aşılama (IUI)"`, `alternateName: ["Aşılama", "Intrauterine insemination", "IUI"]`.

**Doğrulama:** `npm run build` başarılı. `verify:article-entities` geçti. `verify:structured-data` geçti (101 HTML, 288 JSON-LD). Derlenmiş HTML'de `about` = MedicalProcedure + `Q13405500`; `Q846279` artık yok. Okurun gördüğü metin değişmedi.

**Yayın durumu:** Commit, push ve deploy yapılmadı; canlı sayfa hâlâ `Q846279` gösterir.

---

## 7. Uzman Yanıtı ve Metin Düzeltmeleri (24 Eylül 2026)

**Uzman katkısı:** Doç. Dr. Senai Aksoy §5'teki soruya yanıt verdi. Yanıt değiştirilmeden `expertContribution` alanına kaydedildi (`answeredAt: 2026-09-24`, `approvalStatus: "approved"`). `templateVersion` "2026-09" yapıldı; `reviewType`, `approvedBy`, `reviewScope` ve `editorialMethodNote` eklendi.

**Çözülen bulgular:**
- **P1-2:** Satır içi etiketler düzeltildi. Sperm sayısı önerisi (AUA/ASRM uzman görüşü) D/E, Huang 2018 C, ASRM 2022 iptal eşiği C, Evans 2020 C oldu. ASRM 2020'ye dayanan 0–36 saat ve 3–4 siklus önerileri B olarak kaldı. Cochrane'e dayanan "seçilmiş çift" cümlesine B verildi (orta kaliteli tek RKÇ).
- **P2-1:** Huang 2018'e popülasyon, doğal siklus kolu (%6,2), 3 siklus kümülatif sonuç ve çoğul gebelik farkı eklendi. Evans 2020 verisi sayılarla yazıldı. İki çalışma da kaynakçaya eklendi.
- **P2-2:** ESHRE 2023, Cochrane 2020 ve Cochrane 2023 eklendi; kanıtın zayıflığı metinde açıkça yazıldı. NICE cümlesi eklenmedi, çünkü güncel metin doğrulanmadı.
- **P2-4:** Genel kanıt kartı gizli kalmaya devam ediyor (`hideEvidenceGrade: true`), çünkü makalede farklı düzeyde kanıtlar bir arada. Alkol makalesindeki karar da bu yöndeydi. `recommendationGradeScope` alanı şemada tanımlı değil.
- **P2-5:** Risk bölümüne çoğul gebeliğin riskleri, OHSS, nadir enfeksiyon ve acil başvuru belirtileri eklendi.
- **P3-1/2:** "tüp bebek" bağlantısı `tup-bebek-nedir`'e yönlendirildi; `yumurtlama-takibi` bağlantısı eklendi.
- **P3-3:** Görsel altyazısı ve SSS'deki "zaman kaybettirir" tekrarı değiştirildi. Erkek faktörü paragrafları birleştirildi.
- **P3-4/5:** ASRM'nin ≥38 yaşta doğrudan IVF'ye dair "iyi kanıt" ifadesi ve AUA/ASRM'nin <5 milyon hareketli sperm notu kaynakla birlikte eklendi.
- **P3-7/8:** Yatak istirahati SSS'i Cordary 2017 meta-analiziyle desteklendi. Tüm kaynaklara `type` eklendi; ASRM belgelerine PMID, DOI ve cilt/sayfa bilgisi girildi. Kaynak sayısı 5'ten 11'e çıktı.

**Açık kalanlar:** P2-6 (inceleyen kişi mi, Editöryal Ekip mi), P3-6 (Türkiye mevzuat cümlesi, doğrulanmadı), P3-9 (video transcript'i ve videonun metinle uyumu).

**Doğrulama:** `npm run build` başarılı. `verify:editorial-authenticity`, `verify:article-entities` ve `verify:structured-data` geçti. `verify:article-template` ve preflight'taki 2 hata yalnız `adet-gorememe.mdx` dosyasına ait; o dosyadaki değişiklik bu oturumda yapılmadı. Derlenmiş HTML'de Dr. Aksoy notu, 3 B / 3 C / 1 D/E etiket, 11 citation, `dateModified 2026-09-24` ve `about` = MedicalProcedure `Q13405500` görüldü. `git diff --check` temiz.

**Yayın durumu:** Commit, push ve deploy yapılmadı.

**P2-6 kararı (24 Eylül 2026):** Kullanıcı kararıyla tıbbi inceleyen CLAUDE.md varsayılanına döndürüldü: `medicalReviewer: "tupbebek.com Editöryal Ekip"`, `reviewerTitle: "Tıbbi Yayın Ekibi"`. `approvedBy` ve `expertContribution` Doç. Dr. Senai Aksoy olarak kaldı.
