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

## Teknik Mimari

### Teknoloji Yigini

- **Framework**: Astro 4.x (Static Site Generator)
- **Styling**: Tailwind CSS 3.4.x
- **Content**: Astro Content Collections (Markdown/MDX)
- **Markdown pipeline**: remark tabanli inline kanit etiketi donusumu (`{{kanit:A}}` vb.)
- **Fonts**: Inter (headlines + body), Material Symbols Outlined (icons)
- **Deploy**: Static build, SSG

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

### SEO / Yapilandirilmis Veri

- **BaseLayout**: Genel `MedicalWebPage` JSON-LD
- **ArticleSchema**: Makale bazli `["MedicalWebPage", "Article"]` + `reviewedBy` + `citation`
- **BreadcrumbList**: Otomatik breadcrumb schema
- Canonical URL, Open Graph meta tags

### Content Schema (Zod)

Makale frontmatter'da kullanilabilir alanlar:

```yaml
title: "Makale Basligi"
description: "Kisa aciklama"
category: "Kategori"
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
image: "/images/..."
imageAlt: "Gorsel aciklamasi"
featured: false
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
