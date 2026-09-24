# Alkol ve Fertilite: Sperm, IVF ve Gebelik Planı — Geniş Audit Raporu

- **Tarih:** 24 Eylül 2026
- **İncelenen dosya:** `src/content/articles/alkol-ve-fertilite.mdx`
- **Render edilmiş çıktı:** `dist/makaleler/alkol-ve-fertilite/index.html`
- **Kanonik URL:** `https://tupbebek.com/makaleler/alkol-ve-fertilite/`
- **Kategori:** Yaşam Tarzı
- **Öneri derecesi:** B; yalnızca gebelikte alkol almama yönündeki güvenlik önerisi için
- **Yazar:** Doç. Dr. Senai Aksoy
- **İlk canlı sürümdeki tıbbi inceleyen:** tupbebek.com Editöryal Ekip (`2026-07-24`)

**Durum notu:** Aşağıdaki 1–5. bölümler, düzeltme öncesi sürümün tarihsel audit kaydıdır; güncel dosya için karar olarak kullanılmamalıdır. 6. bölüm ilk yerel düzeltmeleri, 7. bölüm son tekrar audit ve düzeltmelerini gösterir. 24 Eylül'de önbellek atlanarak alınan canlı sayfa hâlâ Temmuz sürümünü göstermekteydi; yerel değişiklikler yayına alınmamıştır.

---

## 1. Karar ve Üç Zorunlu Değerlendirme

| Zorunlu Değerlendirme | Sonuç | Açıklama ve Gerekçe |
|---|---|---|
| **1. Hasta eğitimi açısından değerli mi?** | **EVET** | Makale; alkolün kadın ve erkek fertilitesi, IVF tedavi döngüsü ve gebelik üzerindeki etkilerini suçlayıcı, korkutucu veya yargılayıcı olmayan, son derece dengeli bir dille ele almaktadır. Özellikle gebelikte güvenli bir alt eşik olmadığı (CDC), erkeklerde spermatogenez döngüsünün yaklaşık 3 ay sürdüğü, IVF/transfer sürecinde temkinli yaklaşımın gerekliliği ve sosyal baskılara karşı mocktail ritüeli gibi pratik öneriler sunmaktadır. Ayrıca alkol bağımlılığı/yoksunluk riskine karşı hayati tıbbi güvenlik uyarısı barındırmaktadır. |
| **2. AI/web yanıtlarında ikincil kaynak olarak güvenle alıntılanabilir mi?** | **ŞARTLI EVET** *(P1 ve P2 bulguları giderilmek kaydıyla)* | Metin, alandaki saygın meta-analizlere (Fan 2017, Nguyen-Thanh 2023, Sundermann 2019, Rao 2022) ve resmi kılavuzlara (ASRM 2022, CDC) dayanmaktadır. Ancak mevcut haliyle ikincil kaynak güvenilirliğini zedeleyen üç teknik ve editoryal engel vardır: (1) `<QuoteBlock>` içinde hekim birinci tekil şahısla konuşturulmuş ancak frontmatter'da doğrulanmış `expertContribution` kaydı bulunmamaktadır; (2) `ArticleSchema.astro` içinde varlık eşleşmesi eksik olduğu için konu "Yaşam Tarzı" genel başlığına düşmektedir; (3) Sayfa içi bileşen çift render edilmektedir. Bu düzeltmeler yapıldığında güvenle alıntılanabilir. |
| **3. Akademik kanıt sayılmasını engelleyen eksikler neler? (Neden birincil kanıt değil?)** | **BİRİNCİL KANIT DEĞİLDİR** | Bu metin hakemli bir tıp dergisinde yayımlanmış özgün bir araştırma (RKÇ, prospektif kohort) veya bağımsız sistematik derleme (PRISMA uyumlu) değildir. Hasta bilgilendirme ve klinik perspektif amacıyla hazırlanmış ikincil/üçüncül sentez portali içeriğidir. Birincil klinik veri veya protokol sunmaz; bağımsız kör hakem değerlendirmesinden (peer-review) geçmemiştir. İnceleyen taraf kurumsal editöryal ekiptir. |

---

## 2. Öncelikli Bulgular (P1 / P2 / P3)

### P1 — Güvenlik, Editoryal Özgünlük ve Proje Sert Kapıları (Hard Gates)

#### P1-1: `<QuoteBlock>` Alanında Doğrulanmamış Hekim İmzası (Hard Gate İhlali)
- **Konum:** `src/content/articles/alkol-ve-fertilite.mdx:165-167`
- **Mevcut Metin:**
  ```astro
  <QuoteBlock>
  Fertilite planında alkole “ne kadar zararlı?” diye bakmaktan çok “bu dönemde gerekli mi?” diye bakmayı tercih ederim. Gebelikte güvenli doz yoktur. IVF ve transfer döneminde de en sakin yol kaçınmaktır. Erkek partner için 3 aylık pencereyi hatırlatırım; ama alkolü bırakmak tek başına IVF garantisi değildir.
  </QuoteBlock>
  ```
- **Bulgu Detayı:**
  - `AGENTS.md` kuralı açıktır: *"Eski `<QuoteBlock>` alanları tarafsız klinik çerçevedir; hekim alıntısı veya imzası taşımaz. Dr. Aksoy imzalı bir yaklaşım yalnızca kendisine sorulan konuya özel soru, gerçek yanıt, yanıt tarihi ve açık yayın onayı kaydedildiğinde `expertContribution` üzerinden gösterilir."*
  - Metinde birinci tekil şahıs kullanımı mevcuttur (*"tercih ederim"*, *"hatırlatırım"*).
  - Frontmatter'da `expertContribution` alanı, Doç. Dr. Senai Aksoy'a sorulmuş soru, tarih ve onay kaydı YOKTUR.
  - Render edilen HTML'de bu blok `<aside class="..."><p class="... text-primary-700">Klinik çerçeve</p>...` başlığı altında çıkmakta, ancak hekimin ağzından konuşmaktadır.
- **Gereken Eylem:**
  - Doç. Dr. Senai Aksoy'a konuya özel klinik soru sorularak gerçek yanıtı, tarihi ve onayı alınmalı ve frontmatter `expertContribution` alanına taşınmalıdır; ya da bu blok üçüncü şahıs nötr klinik çerçeveye dönüştürülmelidir (*"klinik pratikte tercih edilir / hatırlatılır"*).

#### P1-2: Tıbbi İnceleyen Kimliği ve E-E-A-T Yetkinliği
- **Konum:** `alkol-ve-fertilite.mdx:12-14`
- **Mevcut Durum:**
  ```yaml
  medicalReviewer: "tupbebek.com Editöryal Ekip"
  reviewerTitle: "Tıbbi Yayın Ekibi"
  reviewDate: 2026-07-24
  ```
- **Bulgu Detayı:**
  - Tıbbi inceleyen olarak kurumsal bir anonim heyet girilmiştir.
  - Bu durum `ArticleSchema.astro` çıktısında `reviewedBy: {"@type": "Organization", "name": "tupbebek.com Editöryal Ekip"}` üretilmesine yol açmaktadır.
  - T.C. Sağlık Bakanlığı Bilgilendirme Yönetmeliği ve Google E-E-A-T yönergeleri doğrultusunda tıbbi içeriklerin incelemesi, tescilli hekim kimliği veya yetkili medikal danışman (Person) adına bağlanmalıdır.

---

### P2 — Render, UI Çiftleme, Yapılandırılmış Veri ve Şablon Sözleşmesi

#### P2-1: `EvidenceGradeCard` Bileşeninin Çift Render Edilmesi (UI Duplication)
- **Konum:** `src/pages/makaleler/[...slug].astro:183-185` ve `alkol-ve-fertilite.mdx:173`
- **Bulgu Detayı:**
  - `[...slug].astro` şablonu, frontmatter'da `recommendationGrade` tanımlı olduğunda sayfa başlığının ve EEATBadge'in hemen altına otomatik olarak `<EvidenceGradeCard grade={entry.data.recommendationGrade} />` bileşenini basmaktadır.
  - Ancak `alkol-ve-fertilite.mdx` dosyasının 173. satırında makale gövdesi içinde `<EvidenceGradeCard grade={frontmatter.recommendationGrade} />` bileşeni tekrar manuel olarak çağrılmıştır.
  - Doğrulama: `dist/makaleler/alkol-ve-fertilite/index.html` içinde `"Kanıt durumu: B · Güçlü"` metni tam 2 kez render edilmektedir.
- **Gereken Eylem:** MDX dosyasının 173. satırındaki gereksiz `<EvidenceGradeCard />` çağrısı kaldırılmalıdır.

#### P2-2: `ArticleSchema.astro` Semantik Varlık Eşleşmesi Eksikliği
- **Konum:** `src/components/ArticleSchema.astro:302-386` (`ABOUT_ENTITY_MAP`)
- **Bulgu Detayı:**
  - `alkol-ve-fertilite` slug'ı `WIKIDATA_MAP` içinde Ethanol (Q153) ve Fertility (Q186557) bağlantılarıyla yer almaktadır.
  - Ancak `ABOUT_ENTITY_MAP` içinde bu slug tanımlanmamıştır.
  - Sonuç: `dist` JSON-LD çıktısında `about` alanı şu şekilde basılmaktadır:
    ```json
    "about": {
      "@type": "Thing",
      "name": "Yaşam Tarzı",
      "sameAs": [
        "https://www.wikidata.org/wiki/Q153",
        "https://en.wikipedia.org/wiki/Alcohol_and_health",
        "https://www.wikidata.org/wiki/Q186557"
      ]
    }
    ```
    Konu başlığı "Yaşam Tarzı" olan bir `Thing`, etil alkol ve üreme sağlığına bağlanarak anlamsal karmaşaya yol açmaktadır.
- **Gereken Eylem:** `ABOUT_ENTITY_MAP` içine `alkol-ve-fertilite` için `MedicalCondition` veya `MedicalRiskFactor` varlığı eklenmeli; `name: "Alkol kullanımı ve fertilite"` olarak tanımlanmalıdır.

#### P2-3: `templateVersion: "2026-09"` ve BLUF (`summary`) Eksikliği
- **Konum:** `alkol-ve-fertilite.mdx:1-70`
- **Bulgu Detayı:**
  - Makale `templateVersion: "2026-09"` standartlarına yükseltilmemiştir.
  - Frontmatter'da `summary` ve `summaryReferences` tanımlanmadığı için üst ekranda BLUF kutusu şablon üzerinden üretilememekte, gövde içi `<HizliCevap>` kullanılmaktadır.
  - Mobil 390px ekranlarda bu durum doğrudan cevaba erişimi aşağı itmektedir.

#### P2-4: Mocktail Görselinde Boş `alt` Özniteliği (`alt=""`)
- **Konum:** `alkol-ve-fertilite.mdx:161`
- **Mevcut Kod:** `<img src="/images/makaleler/alkol-ve-fertilite-mocktail-ritueli.webp" alt="" width="1200" height="675" loading="lazy" ... />`
- **Bulgu Detayı:**
  - Görsel salt dekoratif arka plan değil, makalenin anahtar önerilerinden birini görselleştiren `<figure>` elemanıdır.
  - `alt=""` boş bırakılmıştır; WCAG ve ekran okuyucular için tanımlayıcı metin gereklidir.
- **Gereken Eylem:** `alt="Gebelik planlama ve tüp bebek sürecinde alkolsüz kokteyl ve sağlıklı alternatifler hazırlayan çift"` şeklinde açıklayıcı metin verilmelidir.

---

### P3 — Sayısal Eşikler, Bibliyografik Taşınabilirlik ve Hasta Dili

#### P3-1: Sayısal Eşiklerin ve Çalışma Tasarımlarının Bağlamsız Bırakılması
- **Konum:** `:116`, `:122`, `:137`
- **Bulgu Detayı:**
  - Jensen 2014 çalışmasında Danimarkalı 1.221 genç erkekte alışılmış tüketim haftada 5 ünitenin üzerine çıktığında bazı semen parametreleriyle olumsuz ilişki görülmüş, ilişki >25 ünitede belirginleşmiştir. Sperm konsantrasyonunda %33 azalma ise **>40 ünite/hafta** grubunun 1–5 ünite/hafta grubuyla karşılaştırmasına aittir; bu sonuç >25 ünite için yazılmamalıdır. Çalışma kesitseldir ve nedensel veya evrensel güvenli eşik göstermez.
  - Rao 2022 çalışmasında IVF başarısındaki olumsuz risk artışının haftalık 84 gram (~7 kadeh) üzerinde belirginleştiği bilgisi mevcuttur.
  - Lyngsø 2019 kohortu (1.708 Danimarkalı çift) hafif-orta alkolün canlı doğum oranını düşürmediğini göstermiştir; bu çalışma metinde doğru şekilde "belirsizlik/çelişkili bulgu" kanıtı olarak yer almaktadır.
- **Öneri:** Okura somut bir çerçeve sunmak adına "aşırı/yoğun tüketim" kavramı literatürdeki bu haftalık eşiklerle zenginleştirilmelidir.

#### P3-2: Bibliyografik Format ve Kaynakça Eksiklikleri
- **Konum:** Frontmatter `references` dizisi
- **Bulgu Detayı:**
  - Referanslarda `type` alanı (ör. `systematicReview`, `journalArticle`, `guideline`, `officialWebPage`) girilmemiştir.
  - Görünür referans listesinde cilt, sayı ve sayfa aralıkları bulunmamaktadır.
  - CDC kaynağı için `year: 2026` girilmiş olup web sayfası erişim tarihi belirtilmemiştir.

#### P3-3: 3 Aylık Spermatogenez Penceresinin Tekrarları
- **Konum:** Tablo satırı 100, paragraf 114, madde imi 134, madde imi 155, QuoteBlock 166, SSS 186.
- **Bulgu Detayı:** "Sperm üretimi yaklaşık 3 ay sürer" cümlesi 6 farklı yerde neredeyse birebir aynı söz dizimiyle yinelenmektedir. Ritim çeşitlendirilmelidir.

---

## 3. Bilimsel Kaynak Doğrulama Tablosu

İlk audit sırasında kaynak kimlikleri Europe PMC ve PubMed E-Utilities üzerinden karşılaştırılmıştır. Aşağıdaki iddia–kaynak değerlendirmeleri 7. bölümdeki tekrar audit bulgularıyla birlikte okunmalıdır.

| Yazar ve Yıl | PMID | DOI / URL | Tasarım ve Örneklem | İddia ile Makale Uyumu |
|---|---|---|---|---|
| **Fan et al. 2017** | 29062133 | `10.1038/s41598-017-14261-8` | 19 çalışmanın sistematik derleme ve doz-yanıt meta-analizi | Tam uyumlu. Kadınlarda artan alkol tüketimiyle fekundabilitenin düşüş eğilimi gösterdiği doğrulanmıştır. |
| **Nguyen-Thanh et al. 2023** | 37159717 | `10.1016/j.heliyon.2023.e15723` | Meta-analiz (Heliyon) | Semen hacmi ve bazı hormonlarda olumsuz ilişki bildirir. Genel analizde sperm konsantrasyonu, hareketi veya normal morfoloji için anlamlı ilişki bulunmamıştır; bu kaynak morfoloji bozulması iddiasına dayanak yapılmamalıdır. |
| **Sundermann et al. 2019** | 31194258 | `10.1111/acer.14124` | 24 çalışmanın meta-analizi (>230.000 gebelik) | Tam uyumlu. Gebelikte alkol tüketiminin düşük riskini artırdığı (özellikle ilk 5-10 haftalık erken dönemde) doğrulanmıştır. |
| **Rao et al. 2022** | 36259227 | `10.1111/aogs.14464` | Sistematik derleme ve doz-yanıt meta-analizi | Tam uyumlu. IVF/ICSI döngüsünde yüksek alkol tüketiminin klinik gebelik ve canlı doğum oranlarını olumsuz etkilediği doğrulanmıştır. |
| **Lyngsø et al. 2019** | 31241750 | `10.1093/humrep/dez050` | 1.708 çiftlik Danimarka prospektif kohortu | Tam uyumlu. Düşük-orta tüketimde IVF başarısında belirgin azalma saptanmadığı, kanıtın çelişkili doğası için dengeli biçimde kullanılmıştır. |
| **Jensen et al. 2014** | 25277121 | `10.1136/bmjopen-2014-005462` | 1.221 genç erkekte kesitsel çalışma | Tam uyumlu. Yüksek alışkanlık tüketiminin semen parametrelerini olumsuz etkilediği doğrulanmıştır. |
| **Van Heertum & Rossi 2017** | 28702207 | `10.1186/s40738-017-0037-x` | Derleme (Fertility Research and Practice) | Tam uyumlu. Düşük-orta düzeydeki belirsizlik ve yüksek düzeyin zararları çerçevesine uygundur. |
| **CDC 2026** | — | `cdc.gov/alcohol-pregnancy` | Resmi halk sağlığı kılavuzu | Tam uyumlu. Gebelikte veya aktif planlama döneminde güvenli bir alkol eşiği olmadığı hükmü resmi kaynakla örtüşmektedir. |
| **ASRM 2022** | — | `asrm.org/practice-guidance/...` | Komite görüşü (Committee Opinion) | Tam uyumlu. Yaşam tarzı optimizasyonunda doğal fertiliteye ilişkin temkinli yaklaşım doğrulanmıştır. |

---

## 4. Teknik Render, SEO ve Erişilebilirlik Denetimi

| Denetim Alanı | Durum | Tespit ve Notlar |
|---|---|---|
| **Başlık ve H1 Hiyerarşisi** | **GEÇTİ** | Tek H1 mevcut (`Alkol ve Fertilite: Sperm, IVF ve Gebelik Planı`). Başlık hiyerarşisi H2 düzeyinde düzenli. |
| **Meta ve Canonical** | **GEÇTİ** | Canonical adresi `https://tupbebek.com/makaleler/alkol-ve-fertilite/` olarak doğru render edilmiş. `robots: index, follow, max-image-preview:large` mevcut. |
| **JSON-LD Şeması** | **KISMİ GEÇTİ** | `Article` ve `MedicalWebPage` şemaları başarıyla parse edilmektedir. Yazar `@id: "https://senaiaksoy.net/#person"` olarak kanoniktir. Ancak `about` varlık eşleşmesi ve `reviewedBy` kurumsal kimliği düzeltilmelidir. |
| **Dahili Bağlantılar** | **GEÇTİ** | Makale içerisindeki tüm kök bağlantılar (`/makaleler/yumurtlama-takibi/`, `/beslenme-yasam/`, `/makaleler/erkek-dogurganlik-besin-takviyeleri/`, `/makaleler/cep-telefonu-sperm-kalitesi/`, `/makaleler/embriyo-transferi-sonrasi-bakim/`) canlı hedeflere sahiptir; kırık link bulunmamaktadır. |
| **Görsel Standartları & Baby-Free** | **GEÇTİ** | Bebek veya infant fotoğrafı kesinlikle bulunmamaktadır. Klinik ve yaşam tarzı odaklı görsellerdir. Dosya boyutları (78KB - 122KB) optimize edilmiştir. Tek eksik: mocktail görselindeki boş `alt` alanıdır. |
| **Sitemap ve İndeks** | **GEÇTİ** | Makale yerel sitemap ve Pagefind arama indeksinde yer almaktadır. |
| **Tıbbi Sorumluluk ve Yoksunluk Uyarısı** | **MÜKEMMEL** | Makale sonundaki acil yoksunluk uyarısı (delirium tremens, ani kesmeme uyarısı) hasta güvenliği açısından üst düzey klinik sorumluluk örneğidir. |

---

## 5. Düzeltme ve İyileştirme Yol Haritası

1. **Doç. Dr. Senai Aksoy Klinik Yanıtı:**
   - Konuya özel soru belirlenmeli (Örn: *"Tüp bebek tedavisine veya gebelik planına başlayan bir çiftte, geçmişteki düzenli alkol kullanımı tedavi başarısını gölgeler mi; klinik kararınızı ne zaman değiştirirsiniz?"*).
   - Dr. Aksoy'dan gerçek yanıt, tarih ve tıbbi onay alınarak `expertContribution` alanına işlenmeli; mevcut `<QuoteBlock>` kaldırılmalıdır.
2. **`EvidenceGradeCard` Temizliği:**
   - MDX dosyasının 173. satırındaki mükerrer bileşen silinmelidir.
3. **Şablon ve `summary` Güncellemesi:**
   - `templateVersion: "2026-09"` eklenmeli, frontmatter'a `summary` ve `summaryReferences` tanımlanmalıdır.
4. **`ArticleSchema.astro` Güncellemesi:**
   - `ABOUT_ENTITY_MAP` içerisine `alkol-ve-fertilite` için semantik varlık eklenmelidir.
5. **Görsel Erişilebilirliği:**
   - Mocktail görseline açıklayıcı `alt` özniteliği yazılmalıdır.


---

## 6. Uygulanan Düzeltmeler ve Doğrulama (24 Eylül 2026)

Bu oturumda kullanıcının sağladığı gerçek hekim yanıtı ve tıbbi onay doğrultusunda şu adımlar tamamlanmıştır:

1. **Doç. Dr. Senai Aksoy Klinik Katkısı ve Onayı (P1-1 Çözüldü):**
   - Frontmatter `expertContribution` alanına konuya özel soru ve Dr. Aksoy'un sağladığı gerçek yanıt eklendi.
   - Tarih `2026-09-24`, onay durumu `approved` olarak kaydedildi.
   - Gövde içindeki yetkisiz `<QuoteBlock>` kaldırıldı; şablonun otomatik `<DoctorNote>` bileşeni devreye girdi.
2. **Tıbbi İnceleyen Kimliği (P1-2 Çözüldü):**
   - `medicalReviewer` anonim heyet yerine `Doç. Dr. Senai Aksoy` olarak bağlandı.
   - Şema `reviewedBy` alanı kanonik `https://senaiaksoy.net/#person` kimliğine bağlandı.
3. **Mükerrer Kanıt Kartı (P2-1 Çözüldü):**
   - MDX gövdesindeki mükerrer `<EvidenceGradeCard />` bileşeni kaldırıldı; sayfada tekil kart render edilmesi sağlandı.
4. **Semantik Varlık Eşleşmesi (P2-2 Çözüldü):**
   - `ArticleSchema.astro` dosyasındaki `ABOUT_ENTITY_MAP` içerisine `alkol-ve-fertilite` eklendi (`MedicalCondition`, `name: 'Alkol tüketimi ve fertilite'`).
5. **2026-09 Şablon Standardı ve BLUF (P2-3 Çözüldü):**
   - Frontmatter `templateVersion: "2026-09"`, `summary` ve `summaryReferences` ile zenginleştirildi; gövde içi `<HizliCevap>` temizlendi.
6. **Görsel Erişilebilirliği (P2-4 Çözüldü):**
   - Mocktail ritüeli görseline açıklayıcı `alt` metni eklendi.
7. **Bibliyografik Şema:**
   - 9 kaynağın tümüne doğrudan `type` ve PubMed/kılavuz bağlantıları tanımlandı.

### Nihai Doğrulama:
- `npx astro build`: Başarılı.
- `npm run verify:editorial-authenticity`: GEÇTİ.
- `npm run verify:structured-data`: GEÇTİ (101 HTML, 288 JSON-LD).
- `npm run verify:article-entities`: GEÇTİ.
- `npm run verify:article-template`: GEÇTİ (63 makale, max age 62 gün).

---

## 7. Tekrar Audit Sonrası Düzeltmeler (24 Eylül 2026)

Kullanıcı hekim ve tıbbi onayın tamamlandığını teyit ederek audit bulgularının düzeltilmesini istedi. İmzalı `expertContribution` yanıtı değiştirilmedi.

- **Kısa cevap ve üç aylık pencere:** Gebelikte alkol almama güvenlik önerisi, düşük–orta tüketimin doğal fertilite/IVF sonuçlarına ilişkin belirsizlikten ayrıldı. Semen testinin yaklaşık üç ay sonra tekrarı, hekimle konuşulabilecek bireysel karar olarak yazıldı; herkese zorunlu tedavi ertelemesi ima edilmiyor. BLUF başlığının içerikte yinelenen “Kısa cevap:” sözü kaldırıldı. Özet kaynakları CDC, ASRM, Rao ve Nguyen-Thanh ile iddialara yaklaştırıldı.
- **Kanıt derecesinin kapsamı:** `recommendationGradeScope` alanı ve kart altı açıklama eklendi. B derecesi yalnızca gebelikte kaçınma yönündeki güvenlik önerisine bağlandı; sperm, doğal gebelik ve IVF etkilerinin çoğunlukla gözlemsel ve belirsiz olduğu açıklandı. Geniş mekanizma ve bağlantı paragraflarındaki iki uygunsuz satır içi B etiketi kaldırıldı.
- **Tıbbi metin taşıyan görsel:** `alkol-ve-fertilite-mekanizma.webp` sayfadan kaldırıldı. Dosya korunmuştur; içindeki yumurtlama, embriyo gelişimi ve sperm bozulması iddiaları ayrı tıbbi değerlendirme ve kaynak izi olmadan yeniden kullanılmamalıdır.
- **Şema:** `about` varlığı `MedicalRiskFactor` / “Alkol tüketimi” olarak düzeltildi. `sameAs` yalnızca alkol tüketiminin doğrulanmış Wikidata `Q2647488` kimliğine bağlandı; etanol ve fertilite kavramları tek varlığın eşanlamlısı olarak gösterilmiyor.
- **Güvenlik ve SSS:** Alkol yoksunluğu uyarısına NIAAA resmi kaynağı eklendi. Gebelik fark edilmeden alkol alındığında izlemin hekim tarafından bireysel belirlenmesi ve erkek partnerde üç aylık sürenin zorunlu olmadığı açıklandı. Kaynak sayısı 10 oldu.
- **Önceki rapordaki kaynak hatası:** Jensen 2014 için %33 sperm konsantrasyonu düşüşünün karşılaştırması >40 ünite/hafta olarak düzeltildi. Nguyen-Thanh 2023 meta-analizinin normal morfolojide genel anlamlı ilişki bulduğu yönündeki yanlış özet kaldırıldı. İlk 1–5 bölümün tarihsel sürüme ait olduğu üstte işaretlendi.

**Yayın durumu:** Değişiklikler yerel çalışma ağacındadır. Commit, push ve deploy yapılmadı; canlı sayfanın Temmuz sürümünü göstermesi beklenir. Yerel QA geçişi canlı yayın kanıtı değildir.

**Son yerel doğrulama:** `npx astro check` 0 hata/0 uyarı (50 mevcut ipucu); `npm run build` başarılı; `verify:preflight` 23/23 geçti; derlenmiş HTML'de bir kanıt kartı, hemen altında kapsam notu, 10 kaynak, onaylı uzman notu, `MedicalRiskFactor` ve tekil Wikidata `Q2647488` bağlantısı görüldü. Mekanizma görseli render edilmedi. `git diff --check` boşluk hatası vermedi; çalışma ağacındaki MDX satır sonu için Git LF→CRLF bilgilendirmesi verdi.
