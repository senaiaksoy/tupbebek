# AGENTS.md — tupbebek.com Proje Rehberi

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
- **Wikidata & Wikipedia Bağlantıları (Semantik Şema)**:
  - Makalenin konusu olan tıbbi entity (ör. PCOS, Endometriozis, AMH), `ArticleSchema.astro` içinde otomatik olarak eşlenen Wikidata (Wikidata Q-ID ve Wikipedia URL'leri) ile `about` alanı altındaki `sameAs` dizisi üzerinden arama motorlarına bildirilmelidir.
- **VideoObject Şeması**:
  - Makalelerin frontmatter alanında `videoId` ve `videoTitle` tanımlanırsa, otomatik olarak `VideoObject` JSON-LD şeması oluşturularak AI ve video arama sonuçları zenginleştirilir.
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
