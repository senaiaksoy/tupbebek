# AGENTS.md — tupbebek.com Proje Rehberi

## Obsidian vault / Senai-Wiki erişimi

Obsidian vault, site deposunun alt klasörü değil, **ayrı Git deposudur**. GitHub'da `senai-wiki` / `Senai-Wiki` adıyla ara; `draksoyivf-knowledge` yalnızca bu bilgisayardaki klasör adıdır.

- Depo: [senaiaksoy/Senai-Wiki](https://github.com/senaiaksoy/Senai-Wiki) — varsayılan dal: `main`.
- Clone adresi: `https://github.com/senaiaksoy/Senai-Wiki.git`.
- Yerel checkout: `D:\A-klasör\obsidian-vaults\draksoyivf-knowledge`.
- Kanonik stil rehberi: [`wiki/brand/senai-aksoy-makale-stil-rehberi.md`](https://github.com/senaiaksoy/Senai-Wiki/blob/main/wiki/brand/senai-aksoy-makale-stil-rehberi.md).
- Diğer vault yolları da aynı depo köküne göredir: [`wiki/brand/ecosystem.md`](https://github.com/senaiaksoy/Senai-Wiki/blob/main/wiki/brand/ecosystem.md), [`wiki/operations/stack/00-charter.md`](https://github.com/senaiaksoy/Senai-Wiki/blob/main/wiki/operations/stack/00-charter.md).

Bu dosyadaki ve bootstrap talimatlarındaki vault/preflight yollarında önce yerel checkout'u kullan. Windows yolu yoksa erişilebilir `Senai-Wiki` checkout'unda aynı göreli dosyayı veya yetkili GitHub bağlantısıyla `senaiaksoy/Senai-Wiki` deposundaki güncel `main` dosyasını **tam olarak oku**. Depo özeldir; anonim 404, dosyanın olmadığı anlamına gelmez. GitHub CLI erişimi varsa örnek: `gh api -H 'Accept: application/vnd.github.raw+json' 'repos/senaiaksoy/Senai-Wiki/contents/wiki/brand/senai-aksoy-makale-stil-rehberi.md?ref=main'`.

Bu erişim sırası, aşağıdaki “dosya okunamıyorsa dur” kuralından önce uygulanır. Her iki yolla da kanonik içerik okunamıyorsa engeli ve denenen depo/dosya adresini bildir; bellek, özet veya site içi aynayla preflight'ı geçmiş sayma. Başka ortamda mutlak Windows klasörünün bulunması şart değildir; aynı kanonik dosyanın okunması şarttır.

## Humanize komutu — kapsamlı düzenleme ve gerçek hekim yanıtları

- Kullanıcı `humanize` dediğinde, seçili modelden bağımsız olarak `C:\Users\KC3\.codex\skills\senai-humanize\SKILL.md` dosyasını oku ve uygula. Açık skill adı gerekmez. Skill okunamıyorsa erişim sorununu bildir; genel bir humanizer yaklaşımıyla sessizce devam etme.
- Varsayılan, hedef metnin **tamamında kapsamlı inceleme ve gerekli düzenlemedir**: başlık, görünür özet, giriş, tüm bölümler, sonuç, SSS ve kaynak ilişkileri. Bölüm sırası, tekrarlar, paragraf akışı, gramer, yerel ifade, ritim ve byline'a uygun ses birlikte ele alınır; gerekirse yeniden yapılandırılır. Ayrıca “kapsamlı” denmesini bekleme. Yalnızca kullanıcı açıkça “sadece gramer”, “şu paragraf” veya “dar düzenleme” derse müdahaleyi daralt.
- `audit humanize` / `incele` salt okunur kapsamlı bulgular üretir; ayrıca düzeltme yetkisi verilmedikçe dosyayı değiştirme. Geniş inceleme başka yazılara/dillere, yeni araştırmaya veya dış dedektör taramasına kendiliğinden kapsam genişletmez.
- Kanonik stil rehberi preflight'ını, bu sitenin dil/byline/uyum kurallarını ve gerekli testlerini uygula. Sayı, popülasyon, sonuç/payda, nedensellik, belirsizlik, güvenlik uyarısı, kaynak ve gerçek alıntıları koru; deneyim, klinik katkı veya onay uydurma. İçindekiler, bölüm bağlantıları ve görünür metin/şema tutarlılığını koru.

### SSS: Dr. Aksoy'a en sık sorulan sorular (zorunlu — 2026-09-28 kararı)

- Yeni, esaslı güncellenen veya humanize edilen her tıbbi makalede **"Dr. Aksoy'a en sık sorulan sorular"** bölümü **zorunludur**. Makalede SSS yoksa bölüm oluşturulur; varsa bu yapıya dönüştürülür. Kanonik stil rehberindeki aynı başlıklı bölümle birlikte uygulanır.
- **Sorular Google arama verisinden seçilir.** Öncelik: (1) makale URL'i veya konu kümesi için Google Search Console sorguları (doğru `siteUrl`, dönem belirtilerek); (2) hedef dil/ülkede konuyu aratınca Google'ın "Benzer sorular / People also ask" kutusu ve otomatik tamamlama önerileri; (3) gerekirse Semrush veya Keyword Planner soru sorguları yardımcı kaynak. Veride görünmeyen soruyu uydurma veya "sık" diye sunma. Her soru için kaynak, sorgu/ifade, tarih ve varsa gösterim sayısı editoryal kayda yazılır.
- **Soru seçimi için doğrulama HARD GATE.** Her yeni veya dönüştürülecek SSS sorusundan önce doğru Search Console mülkünü, rapor dönemini ve makale URL'i/konu kümesi filtresini canlı kontrol et; ilgili sorguları ve gösterimleri karşılaştır. İlgili soru çıkmazsa veya Search Console'a erişilemiyorsa model hedef dil/ülkede Google "Benzer sorular" ve otomatik tamamlamayı gerçekten sorgular; gerekirse yardımcı veri kaynağına geçer. Eski editoryal kayıtta "PAA" yazması, Google'a yazılan bir ifadenin arama sonucu üretmesi veya makale gövdesinde sorunun bulunması doğrulama sayılmaz. Görülen ham ifadeyi, arama terimini, tarihi, URL'yi ve varsa gösterim sayısını kaydet; editoryal soru ham ifadeden farklıysa eşleşmeyi belirt. PAA/otomatik tamamlama görünürlüğü sayısal arama hacmi sıralaması değildir; doğrulanmamış soruyu "en çok aranan" diye niteleme. Veri bulunamazsa aday soruyu doğrulanmış listeye/SSS'ye taşıma; erişim engelini bildir ve gerekli Search Console dışa aktarımını veya veri erişimini iste.
- Genellikle 3-5 soru seç (veri daha azını destekliyorsa daha az): hastanın gerçek karar sorusunu taşıyan, gövdedeki cevabı yalnızca tekrar etmeyen sorular. Fiyat/paket, garanti, başarı oranı pazarlaması, ülke karşılaştırması gibi uyumluluk riski taşıyan sorgular elenir veya nötr biçimde yeniden ifade edilir.
- Başlık her zaman "en sık" nitelemesini taşır; sıklık kanıtı arama verisidir, ayrıca hekim onayı istenmez.
- Başlık: `Dr. Aksoy'a en sık sorulan sorular`. `FAQPage` şeması yeni makaleye eklenmez (stil rehberi).
- **Her cevap Dr. Aksoy'un gerçek yanıtıdır.** Aynı soruya önceden verilmiş, bağlama uygun kayıtlı yanıtı kullan; tekrar isteme. Eksik yanıtları en fazla üçer soruluk gruplarla sor; hazır cevap önererek yalnızca onay isteme, modeli hekim yerine konuşturma.
- **Yanıt yoksa modeli durdurup sor.** Doğrulanmış sorular için mevcut editoryal kayıtta aynı bağlama uygun gerçek hekim yanıtını ara. Yoksa aynı oturumda soruyu Dr. Aksoy'a açıkça yönelt ve `docs/editorial/pending-physician-faq.md` listesine kaydet; model kendi cevabını yazmaz ve yalnızca varsayılan bir cevaba onay istemez. Zaten sorulmuş ve bekleyen soruyu tekrar yeni soru gibi sunma; oturum başında ve teslimde hatırlat. Veri doğrulanmadıysa önce arama verisini sorgula, hekimden yanıta hazır olmayan soruyu "en sık" diye cevaplamasını isteme.
- Yanıtı anlamını değiştirmeden kısalt, dilini düzelt veya yerelleştir; yeni gerekçe, deneyim, oran ya da tavsiye ekleme. Düzenlenmiş halini Dr. Aksoy'a göster; sitenin tıbbi/dil/yayın onay koşulları ayrıca geçerlidir. Uzman görüşü bilimsel kaynak yerine geçmez; kaynakla çelişkiyi bildirmeden yayına hazır sayma.
- Soru ve veri kaynağı, özgün yanıt, gerçek yanıt tarihi, makaleye giren düzenlenmiş karşılığı ve onay durumu mevcut editoryal kayıt düzeninde izlenir. Yeni frontmatter alanı veya sahte tarih üretme.
- **Cevap yoksa yayın bekler.** Yeni veya esaslı güncellenen makale, bölümün cevapları alınıp onaylanana kadar yayına alınmaz (`draft: true` kalır). Zaten yayındaki makale yayında kalır; mevcut SSS silinmez; model cevapları hekim bölümüne taşınmaz; boş cevap veya taslak soru listesi yayımlanmaz.
- **Her seferinde hatırlat.** Sorulmuş ama cevaplanmamış sorular `docs/editorial/pending-physician-faq.md` dosyasında (makale, dil, soru, veri kaynağı, soruluş tarihi) tutulur. Bu depoda içerik veya makaleyle ilgili her oturumda — işin başında ve teslimde — bekleyen soruları Dr. Aksoy'a hatırlat: hangi makale için olduğunu belirterek, en fazla üçer soruluk gruplarla. Cevap alınınca kayda işle ve listeden çıkar.
- Başka yazarlı makalede soru-cevap kısmını Dr. Aksoy'un ayrı uzman katkısı olarak belirt; byline'ı veya bütün gövdenin sesini değiştirme. Tek görünür SSS yüzeyi ve varsa FAQ şeması aynı soru-cevapları taşımalı.

Dedektör skoru kalite veya insan yazarlığı kanıtı değildir; “%100 insan” sonucu vaat etme. `humanize` komutu kendi başına commit, push, deploy veya yayın yetkisi vermez.

## Proje Tanimi

tupbebek.com, Turkiye'nin ilk bagimsiz, reklamsiz, bilimsel ureme sagligi ve infertilite referans portalidir. Bas Editor **Doc. Dr. Senai Aksoy** liderliginde, **Egitici Pazarlama** stratejisiyle etik ve organik hasta (lead) uretimi hedeflenmektedir.

## Yasal Cerceve

**T.C. Saglik Bakanligi 12 Kasim 2025 Tanitim ve Bilgilendirme Yonetmeligi** ile **TTB (Turk Tabipleri Birligi) Etik Kurallari** tam uyumlu gelistirme yapilir.

### Kesin Yasaklar

Asagidaki icerik ve ozelliklerin sistemde bulunmasi **kesinlikle yasaktir**:

- Indirim, kampanya, promosyon ifadeleri
- "Ucretsiz muayene", "ucretsiz konsultasyon" gibi teklifler
- Tedavi oncesi/sonrasi (before-after) gorselleri
- Hasta tesekkkur yorumlari, hasta deneyim hikayeleri
- "En iyi", "kesin cozum", "garantili" gibi ustunluk iddialari
- Fiyat tablolari veya maliyet karsilastirmalari
- Haksiz rekabet unsuru tasiyabilecek herhangi bir ifade
- Bebek/infant fotograflari (baby-free branding)
- Stres tetikleyici gorseller

### Zorunlu Unsurlar

Her tibbi icerik sayfasinda bulunmasi gereken unsurlar:

- **Tibbi Sorumluluk Reddi**: "Bu icerik tibbi tani ve tedavi yerine gecmez, mutlaka hekiminize danisiniz"
- **Yazar Kimligi**: Icerik yazarinin adi, unvani ve yeterlilikleri
- **Tibbi Inceleme**: Tibbi Danisma Kurulu onay durumu
- **Son Guncelleme Tarihi**: Icerigin en son ne zaman guncellendigi
- **Bilimsel Kaynaklar**: Atif yapilan bilimsel referanslar (varsa)

### Makale preflight — HARD GATE

Her yeni makale, makale guncellemesi, rewrite veya humanize isinde taslak
yazmadan once canonical rehber okunur:
`D:\A-klasör\obsidian-vaults\draksoyivf-knowledge\wiki\brand\senai-aksoy-makale-stil-rehberi.md`.

Okuduktan sonra aynen su cumleyle basla:
`Stil rehberi okundu: Dr. Senai Aksoy Makale Stil Rehberi`

Dosya okunamiyorsa hafizadan, ozetlerden veya onceki oturumlardan devam etme;
engel bilgisini yaz ve dur. Bu kapı kullanici stil/humanize demese bile
`src/content/articles/` altindaki her makale ve makale turevi is icin gecerlidir.

Bu rehber tupbebek icin sade Turkce, BLUF, "Kisa cevap:", kanitli ama
hasta-dostu Dr. Aksoy sesi ve pazarlama dili yasaklarini ust katman olarak
tanimlar.

### Dr. Aksoy gorusu — HARD GATE

Yeni makale yazilirken veya okurun gordugu makale metni guncellenirken, konuya
ozel ve klinik karar degeri tasiyan bir soru Doç. Dr. Senai Aksoy'a sorulur.
Soru, gercek yanit, yanit tarihi ve acik yayin onayi frontmatter
`expertContribution` alaninda kaydedilmeden yeni `templateVersion: "2026-09"`
makale `published` yapilamaz. Yaniti model, editor veya kaynaklardan tureterek
Dr. Aksoy'a atfetmek kesinlikle yasaktir; yanit gelmediyse status `draft` ya da
`in_review` kalir. Yalnizca link, gorsel yolu veya teknik metadata gibi okurun
gordugu tibbi metni degistirmeyen bakim islemleri yeni uzman yaniti gerektirmez.

Belirsiz ve kalip bir arac kullanimi beyani makale metninde veya editoryal yontem
notunda kullanilmaz. Yontem bilgisi gerekiyorsa yalnizca gercekte yapilan insan
kontrolu ve guncellemenin somut kapsami yazilir.

### Okunabilirlik ve kanıt kutusu (2026-10-10 kararı)

Okur genel toplumdur; hedef stil rehberindeki 8–10. sınıf sade Türkçedir. Her yeni makalede, okurun gördüğü metni değişen her güncellemede, humanize ve audit işinde bu kontrol yapılır:

1. **Ölçüm:** `npm run verify:readability -- <slug>`. Rapor; özet, editoryal gövde ve bölümler için Bezirci–Yılmaz sınıf düzeyini (ham ve hastalık/ilaç adları nötrlenmiş), Ateşman puanını, cümle uzunluğunu, 25 kelimeyi aşan cümleleri, açıklanması gereken araştırma terimlerini ve kanıt kutusu ihtiyacını verir. Hekim SSS yanıtları ve uzman kutusu ayrı ölçülür ve değiştirilmez. Hedefler: özet ve gövde nötr ≤ 12; bölüm ≤ 14. Formül hece ve cümle uzunluğu ölçer, kavram yükünü ölçmez; sonuç yön göstericidir. Hedef aşılırsa sade yazım yapılır; aşım gerekçesi (ör. kaçınılmaz terim) teslimde yazılır. Sonuçlar audit raporuna ve teslim mesajına girer; site medyanı `npm run verify:readability -- --all` ile karşılaştırılır.
2. **İki katmanlı anlatım:** Ana metin bilgiyi ve sonucu sade dille verir. Arka arkaya çalışma sıralamak yerine o konudaki çalışmaların ayrıntısı ve yorumu, aynı bölümün sonunda `<Accordion title="Kanıt kutusu: …">` içine konur. Ana metindeki her önemli iddia yine en az bir kaynağa bağlıdır (iddia–kaynak izi kutuya taşınmaz). Bir paragrafta veya maddede 3+ çalışma atfı varsa betik uyarır.
3. **Kutuya konmayanlar:** Ana sonuç, belirsizlik ("kanıt sınırlı / çelişkili"), `<InlineEvidence>` etiketi, güvenlik uyarıları, yan etkiler ve "ne zaman hekime başvurmalı" bilgisi kutu dışında kalır. Kutu yalnızca ayrıntıyı taşır; ana metindeki sonucu çelişmez veya genişletmez. Kutu içeriği sayfa HTML'inde bulunur (istemci tarafında sonradan yüklenmez) ve `data-nosnippet` taşımaz. Tek kaynağa dayanan kısa bölümlere kutu açılmaz.
4. **Terimler:** "Klinik gebelik" ve "canlı doğum" ilk kullanımda tanımlanır (makalenin sonucu bu ayrıma dayanıyorsa). Meta-analiz, randomize, geriye dönük, kohort, anlamlı fark gibi araştırma terimleri ya sade karşılıkla yazılır ya da ilk geçişte parantezle açıklanır. Kısaltma (GnRH vb.) yerine mümkünse okurun bildiği ad kullanılır.

## Teknik Mimari

### Teknoloji Yigini

- **Framework**: Astro 4.x (Static Site Generator)
- **Styling**: Tailwind CSS 3.4.x
- **Content**: Astro Content Collections (Markdown/MDX)
- **Markdown pipeline**: remark tabanli inline kanit etiketi donusumu (`{{kanit:A}}` vb.)
- **Fonts**: Inter (headlines + body), Material Symbols Outlined (icons)
- **Deploy**: Static build, SSG

### Cloudflare Deploy Hedefi

- **Tek dogru Cloudflare Pages projesi**: `tupbebek`
- **Dashboard**: https://dash.cloudflare.com/4797b38bf5bfb1b15a30ac27f0a9a78f/pages/view/tupbebek
- **Production branch**: `main`
- **Guvenli deploy komutu**: `npm run deploy`
- **Yasak hedef**: `tupbebek-portal` projesine kesinlikle deploy edilmez.
- Manuel deploy gerekirse komut mutlaka su hedefle calistirilir: `npx wrangler pages deploy ./dist --project-name tupbebek --branch main`

### Tasarim Sistemi

- **Primary**: Derin lacivert (#2563a8) — guven rengi
- **Mint**: Nane yesili (#3a8a66) — terapi/saglik rengi
- **Apricot**: Yumusak kayisi (#b8860b) — sicaklik aksani
- **Gray**: Tailwind gray scale — notr tonlar
- **Typography**: Fluid responsive (clamp), 8px spacing base
- **Erisebilirlik**: WCAG 2.1 AA, minimum 44x44px touch targets

### Klasor Yapisi

```
src/
├── components/
│   ├── global/         # Button, Card, Input, MedicalInfoBox, Accordion, etc.
│   ├── home/           # HeroSection, QuickGuideCards, SituationSelector
│   ├── header/         # MegaMenuItem
│   ├── ArticleSchema   # JSON-LD structured data
│   ├── EEATBadge       # E-E-A-T transparency badge
│   ├── MedicalDisclaimer # Auto-injected legal notice
│   ├── ReferenceList   # Scientific citations
│   └── ...
├── content/
│   ├── articles/       # 55+ Markdown makaleler
│   └── config.ts       # Zod schema (E-E-A-T + workflow fields)
├── data/
│   └── glossary.ts     # 25+ tibbi terim sozlugu
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── makaleler/      # Dinamik makale routing
│   └── [30+ statik sayfa]
├── styles/
│   ├── globals.css     # Prose-medical, base styles
│   ├── tokens.css      # Design tokens
│   ├── components.css
│   └── animations.css
└── utils/
    └── articles.ts     # getPublishedArticles() — draft filtreleme
```

### Editoryal Is Akisi

Icerik statusleri (content/config.ts):

1. **draft** — Taslak, yayinlanmaz
2. **in_review** — Tibbi Danisma Kurulu incelemesinde
3. **published** — Onaylanmis ve yayinda (varsayilan)

`getPublishedArticles()` fonksiyonu sadece `published` statusundeki makaleleri dondurur.

### SEO / Yapilandirilmis Veri & AEO / GEO Kuralları

- **BaseLayout**: Genel `MedicalWebPage` JSON-LD + robots max-image-preview + og:image:alt
- **ArticleSchema**: Makale bazlı `["MedicalWebPage", "Article"]` + `reviewedBy` + `citation`
  - Prosedür içeren `"Tedavi Yöntemleri"` ve `"Tüp Bebek"` kategorileri için `about` alanı otomatik olarak `MedicalProcedure` şemasına, diğer kategoriler ise `MedicalCondition` şemasına map edilir.
- **Yazar Kimliği E-E-A-T Uyumlaştırması (Kritik AEO/GEO)**:
  - Doç. Dr. Senai Aksoy'un tüm şemalardaki benzersiz `@id` bilgisi kanonik olarak `https://senaiaksoy.net/#person` olmalıdır. Bu kimlik `ArticleSchema.astro`, `EditorKunyesi.astro` ve `yazar/senai-aksoy.astro` üzerinde ortaktır.
  - Hekim otoritesini güçlendirmek için biyografi sayfasında `sameAs` array'ine hekimin Wikidata (`Q139893832`), PubMed yazar arama adresi ve Doctoralia bağlantıları eklenmiştir.
- **Uzman katkısı ve kısa cevap**:
  - Eski `<QuoteBlock>` alanları tarafsız klinik çerçevedir; hekim alıntısı veya imzası taşımaz.
  - Dr. Aksoy imzalı bir yaklaşım yalnızca kendisine sorulan konuya özel soru, gerçek yanıt, yanıt tarihi ve açık yayın onayı kaydedildiğinde `expertContribution` üzerinden gösterilir.
  - İlk kısa cevap okurun sorusunu doğal biçimde yanıtlar. Kritik klinik sonuç varsa 1-2 birincil veya güçlü ikincil kaynakla izlenebilir kılınır; sırf alıntılanma amacıyla kaynak ya da anahtar kelime yığılmaz.
  - Makale audit raporu üç ayrı sonucu açıkça vermelidir: (1) Hasta eğitimi açısından değerli mi? (2) AI/web yanıtlarında ikincil kaynak olarak güvenle alıntılanabilir mi? (3) Akademik kanıt sayılmasını engelleyen eksikler neler? Audit; özgün klinik karar değeri, doğrudan cevap açıklığı, iddia-kaynak yakınlığı ve kaynak/iddia uyumu, sayı ve eşiklerin bağlamı, belirsizlik, tam bibliyografik kimlik, yazar/reviewer/güncelleme izlenebilirliği ve render edilmiş teknik keşfedilebilirliği kapsar. Hasta eğitimi/ikincil kaynak değeri, birincil akademik kanıt yerine geçirilmez; botlar için yapay alıntı kutuları veya metin parçalama eklenmez.
- **Google 2026 güncellemeleri (kanonik kayıt)**: Doğrulanmış tarih tablosu ve AI destekli içerik kuralları Senai-Wiki stil rehberi, "Google Arama Güncellemeleri Kaydı (2026)" (`wiki/brand/senai-aksoy-makale-stil-rehberi.md`) içindedir; burada tekrarlanmaz. Özet: FAQ zengin sonucu 7 Mayıs 2026'dan beri yok; yayından önce gövde kadar `title`/`seoTitle`, `description`, görsel alt metinleri ve yapılandırılmış veri de insan tarafından kontrol edilir; AI görselleri aşağıdaki "Yapay zekâ görsel etiketi" kuralıyla işaretlenir. Yeni bir Google değişikliği yalnızca birincil kaynaktan (Search Central değişiklik kaydı, Search Status Dashboard) doğrulanınca kurala yazılır.
- **Wikidata & Wikipedia Bağlantıları (Semantik Şema)**:
  - Makalenin konusu olan tıbbi entity (ör. PCOS, Endometriozis, AMH), `ArticleSchema.astro` içinde otomatik olarak eşlenen Wikidata (Wikidata Q-ID ve Wikipedia URL'leri) ile `about` alanı altındaki `sameAs` dizisi üzerinden arama motorlarına bildirilmelidir.
- **VideoObject Şeması**:
  - Makalelerin frontmatter alanında `videoId` ve `videoUploadDate` tanımlıysa `VideoObject` JSON-LD üretilir (`videoTitle`, açıklama, süre ve bölümler varsa eklenir). Videolar Dr. Aksoy'un YouTube kanalından olduğu için `author`, `creator` ve `publisher` aynı Person `@id`'sini gösterir. Gerçek sayaç verisi olmadığından `interactionStatistic` eklenmez.
- **Sözlük Terimleri (`DefinedTermSet`)**:
  - Sözlükteki tüm tıbbi kavramlar şema uyumlu `DefinedTerm` olarak işaretlenir.
- **Link Parantez Hijyeni**:
  - Markdown formatındaki harici linklerin parantezleri (özellikle PubMed veya DOI linkleri içinde arama sorgusu barındıran `(`, `)` karakterleri) URL içinde düzgün şekilde escape edilmeli (örneğin `(` yerine `%28`, `)` yerine `%29`), böylece Markdown link ayrıştırıcısı parantezleri kırıp bağlantıları bozmamalıdır.
- **BreadcrumbList**: Otomatik breadcrumb schema
- **Sitemap**: lastmod tarihleri frontmatter'dan parse edilir
- Canonical URL, Open Graph meta tags

### Content Schema (Zod)

Makale frontmatter'da kullanilabilir alanlar:

```yaml
title: "Makale Basligi"
description: "Kisa aciklama"
category: "Kategori"
templateVersion: "2026-09"
recommendationGrade: "B"     # A | B | C | D/E
status: "published"          # draft | in_review | published
publishDate: 2024-01-01
lastModified: 2026-04-03
author: "Yazar Adi"
authorTitle: "Unvan"
authorCredentials: "Yeterlilik"
authorYoutube: "https://www.youtube.com/@DocentDrSenaiAksoy"  # varsa
medicalReviewer: "Reviewer Adi"
reviewerTitle: "Reviewer Unvani"
reviewDate: 2026-04-01
expertContribution:
  title: "Dr. Aksoy'un yaklaşımı"
  question: "Bu konuda klinik kararı en çok hangi bulgu değiştirir?"
  text: "Dr. Aksoy'un verdiği ve onayladığı yanıt"
  author: "Doç. Dr. Senai Aksoy"
  authorTitle: "Kadın Hastalıkları ve Doğum Uzmanı"
  authorUrl: "https://tupbebek.com/yazar/senai-aksoy/"
  answeredAt: 2026-04-01
  approvalStatus: "approved"
image: "/images/..."
imageAlt: "Gorsel aciklamasi"
featured: false
videoId: "YouTube video ID"   # varsa
videoTitle: "Video basligi"  # varsa
references:
  - title: "Makale adi"
    authors: "Yazar listesi"
    journal: "Dergi adi"
    year: 2024
    doi: "10.1234/example"
    url: "https://..."
```

### Oneri Derecesi / Kanit Duzeyi

Her makalede frontmatter icinde `recommendationGrade` alani bulunur ve makale ustunde gorunur.

Kullanilacak siniflandirma:

- `A` - **Cok Guclu**: Birden fazla yuksek kaliteli RKÇ veya meta-analiz ile desteklenmis
- `B` - **Guclu**: Sinirli sayida RKÇ veya cok iyi tasarlanmis kohort calismalari
- `C` - **Orta / Zayif**: Vaka-kontrol calismalari veya gozlemsel veriler
- `D/E` - **Cok Zayif**: Sadece uzman gorusu veya vaka sunumlari

Yazi ici inline gosterim kurali:

- `{{kanit:A}}` -> `(A - cok guclu kanit)`
- `{{kanit:B}}` -> `(B - guclu kanit)`
- `{{kanit:C}}` -> `(C - orta/zayif kanit)`
- `{{kanit:D/E}}` -> `(D/E - cok zayif kanit)`

Inline etiketler her cumlede kullanilmaz. Yalnizca kritik klinik iddialara eklenir:

- rutin onerilir / onerilmez
- belirgin fayda vardir / yoktur
- risk veya zarar olabilir
- kanit sinirlidir / belirsizdir
- klinik karari etkileyen temel yargilar

Teknik uygulama:

- Makale uzerindeki genel derece: `src/components/EvidenceGradeCard.astro`
- Yazi ici inline render: `src/utils/remarkInlineEvidence.mjs`
- Manuel Astro/MDX kullanimi: `src/components/InlineEvidence.astro`

## Gelistirme Prensipleri

### Spec-Driven Development

1. Kod yazmadan once hedefleri ve mimariyi analiz et
2. Plan olustur ve onay al
3. Onayli plana gore kodu yaz

### Yeni Makale Teyitleri

Yeni bir makale eklenirken veya mevcut makale komple yenilenirken, final duzenleme oncesi su iki bilgi mutlaka teyit edilir:

- Yazar adi
- YouTube adresi (varsa)
- Dr. Aksoy'a sorulacak konuya ozel soru; yayindan once gercek yanit, yanit tarihi ve onay kaydi

### Kod Kalitesi

- Semantic HTML (<nav>, <main>, <article>, <aside>)
- ARIA labels tum interaktif elemanlarda
- Keyboard navigation full-functional
- Focus indicators visible (ring-2)
- Skip link header'da
- Mobile-first responsive design
- Performans: Lighthouse 90+ hedefi

### Baby-Free Branding

- Medikal vektorel illustrasyonlar kullanilir
- Organik sekiller ve temiz tipografi
- Stres azaltici renk paleti (nane yesili, yumusak kayisi, koyu lacivert)
- Fotograflarda klinik/laboratuvar gorselleri tercih edilir

### Makale içi görsel, tablo, şema ve infografik (zorunlu, 2026-10-04)

Dr. Aksoy'un 2026-10-04 kararı tupbebek ve draksoyivf için geçerlidir. Kanonik kurallar stil rehberinin "Makale içi görsel, tablo, şema ve infografik" bölümündedir (`wiki/brand/senai-aksoy-makale-stil-rehberi.md`). Gövdeye görsel, tablo veya şema eklemeden önce bu bölüm okunur; aşağıdaki özet onun yerine geçmez.

- Karar ve karşılaştırma bilgisi tabloyla verilir. Satırlar yalnızca makalede zaten kaynaklı veya hekim onaylı içerikten kurulur.
- Görsel yalnızca yazıyla zor anlatılanı gösterir (anatomi, görüntüleme, süreç takvimi). Süs görseli eklenmez.
- Görseldeki her önemli bilgi metinde ve kaynaklı `<figcaption>` içinde de bulunur.
- Görsel, görüntü modeliyle **yazısız** üretilir; Türkçe etiketler, numaralar ve kaynak satırı sonradan HTML/SVG ile eklenir. Her tıbbi etiket yayından önce Dr. Aksoy'a gösterilir.
- Telefon için dikey sürüm hazırlanır (`<picture>`). Klinik görüntüye benzeyen illüstrasyonda "Şematik illüstrasyondur; gerçek … görüntüsü değildir" uyarısı bulunur.
- Dosya: `public/images/makaleler/<slug>-<anahtar>.webp`; WebP, `loading="lazy"`, `width`/`height` tanımlı. Örnek uygulama: `endometrioma.mdx` (PR #262).

### Yapay zekâ görsel etiketi (IPTC, 2026-10-05)

Google'ın "Using generative AI content" rehberine (2026-10-01) uygun olarak yapay zekâ ile üretilen her görsel dosyası IPTC `DigitalSourceType = trainedAlgorithmicMedia` XMP etiketi taşır.

- Hero, gövde veya hub görseli yapay zekâ ile üretildikten (ve WebP'ye çevrilip boyutlandırıldıktan) sonra çalıştır: `npm run images:tag-ai -- public/images/makaleler/<dosya>.webp`. Yapay zekâ çizimi üzerine HTML/SVG etiket bindirilen şemalar da etiketlenir. Kontrol: `npm run images:tag-ai -- --check <dosya>`.
- Betik pikselleri yeniden sıkıştırmaz; yalnızca XMP bloğu ekler ve tekrar çalıştırılabilir. `build-image-manifest.mjs` responsive türevleri (`public/generated/article-heroes/`) etiketli kaynaktan üretirken etiketi otomatik taşır.
- Gerçek fotoğraf, lisanslı görsel, yalnızca HTML/SVG/Puppeteer ile çizilmiş infografik, logo, ikon, yazar fotoğrafı ve OG şablonu etiketlenmez. Kaynağı belirsiz görseli etiketlemeden önce sor.
- Sayfadaki görünür not ayrıca gerekir: makale kapağında `imageSourceType: "ai-assisted"` ("AI destekli görsel"), hub sayfalarda "Yapay zekâ ile üretilmiş temsili görsel." Etiketlenen dosyaların listesi: `docs/editorial/ai-images-iptc.txt`.

### Icerik Kurallari

- Bilimsel dogruluk onceliklidir
- ESHRE, ASRM, WHO standartlarina uygunluk
- Turkce tibbi terminoloji dogru kullanilir
- Her iddia icin bilimsel kaynak gosterilebilir olmali
- "Kesin", "garanti", "en iyi" gibi mutlak ifadelerden kacinilir
- Kullanicinin verdigi makale metni, acikca istenmedikce degistirilmez; metin birebir korunur.
- Zorunlu teknik duzenlemeler (frontmatter, gorsel yolu, link, schema yerlesimi) metin govdesine mudahale etmeden uygulanir.

## Windows CLI & PowerShell Compatibility Rules

When running shell commands or scripting on this Windows system:
- **Avoid Special Tokens in PowerShell**: PowerShell parses `@` as a splatting token. Never run chained command lines containing symbols like `@{u}..HEAD` or other `@` configurations. Run commands individually or avoid `@` tokens when possible.
- **Avoid Complex Quote Escaping in Shells**: Writing inline Node/Python commands with escaped double quotes (`node -e "const fs=require('fs'); ... \"fr\" ... "`) fails on Windows CLI shells. Instead, write a clean temporary scratch script file and run it.
- **UTF-8 Output Configuration**: Windows console defaults to Turkish `cp1254` encoding, which crashes on emojis or non-ASCII characters. Always reconfigure script output streams to UTF-8 (e.g. `sys.stdout.reconfigure(encoding='utf-8')` in Python or `process.stdout.setEncoding('utf-8')` in Node) when outputting logs.
- **File Encoding Warnings**: Be aware that file checking logs might be output in `utf-16le` format, which can cause viewing tool failures. Transcode them to `utf-8` using commands like `Get-Content -Encoding UTF8` if they fail to open.
