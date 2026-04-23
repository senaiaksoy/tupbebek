# CLAUDE.md — tupbebek.com Proje Rehberi

## Proje Tanimi

tupbebek.com, Turkiye'nin ilk bagimsiz, reklamsiz, bilimsel ureme sagligi ve infertilite referans portalidir. Bas Editor **Doc. Dr. Senai Aksoy** liderliginde, **Egitici Pazarlama** stratejisiyle etik ve organik hasta (lead) uretimi hedeflenmektedir.

## Bagimsizlik Deklarasyonu (HARD CONSTRAINT)

**tupbebek.com BAGIMSIZ bir sitedir.** Dr. Aksoy bas editor olsa da **site ayri bir tuzel kimlige aittir** ve asagidaki Dr. Aksoy klinik sitelerinden **teknik olarak ayridir**:

- `senaiaksoy.net` — Dr. Aksoy'un TR klinik kimlik sitesi (ayri sahiplik/repo)
- `draksoyivf.com` — Dr. Aksoy'un EN/FR/AR klinik sitesi (ayri sahiplik/repo)

**Regulasyon gerekcesi:** Jenerik domain'ler (tupbebek gibi) doktor klinik sitesi olamaz (SB 12 Kasim 2025 Tanitim Yonetmeligi). Bu yuzden tupbebek.com 2025'te klinik sitesinden bagimsiz yayin portaline donusturuldu.

**Uyulmasi zorunlu kurallar:**

- tupbebek.com'dan senaiaksoy.net veya draksoyivf.com'a **301 redirect yapilmaz** (SEO juice aktarimi yasak — ayri tuzel kimlikler).
- Bu iki siteden de tupbebek.com'a cross-site 301 beklenmez.
- "Benim klinigim" / "Bize randevu" gibi **klinik CTA yasak** — portal editor sifatiyle yazilir.
- Dr. Aksoy'un bas editorlugu **kariyer bilgisi** olarak sunulur; klinik hizmet reklami degil.
- Dis linkler bilimsel kaynaklara (PubMed, ESHRE, ASRM vb.) — Dr. Aksoy'un klinik sitelerine link verilirse **nofollow** + **pasif kariyer notu** tonunda.

Ekosistem detayi: `D:\A-klasör\obsidian-vaults\draksoyivf-knowledge\wiki\brand\ecosystem.md`

## Yasal Cerceve

**T.C. Saglik Bakanligi 12 Kasim 2025 Tanitim ve Bilgilendirme Yonetmeligi** ile **TTB (Turk Tabipleri Birligi) Etik Kurallari** tam uyumlu gelistirme yapilir.

### Kesin Yasaklar

Asagidaki icerik ve ozelliklerin sistemde bulunmasi **kesinlikle yasaktir**:

- Indirim, kampanya, promosyon ifadeleri
- "Ucretsiz muayene", "ucretsiz konsultasyon" gibi teklifler
- Tedavi oncesi/sonrasi (before-after) gorselleri
- Hasta tesekkur yorumlari, hasta deneyim hikayeleri
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

- **Framework**: Astro 4.x (Hybrid — SSG + SSR)
- **Adapter**: @astrojs/cloudflare (Cloudflare Workers)
- **Styling**: Tailwind CSS 3.4.x
- **Content**: Astro Content Collections (Markdown/MDX) + Zod validation
- **Markdown pipeline**: remark tabanli inline kanit etiketi donusumu (`{{kanit:A}}` vb.)
- **Search**: Pagefind (client-side full-text arama)
- **Email**: Resend API (iletisim formu + e-kitap)
- **Fonts**: Inter + Manrope (self-hosted woff2), Material Symbols Outlined (icons)
- **PDF**: Puppeteer (e-kitap PDF olusturma)
- **Image**: Sharp (WebP donusum), noop image service
- **Deploy**: Cloudflare Pages (wrangler.toml)

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
├── components/           # 49 Astro component
│   ├── global/           # ProcedureTabs, MedicalInfoBox, Accordion, Card, Button, Input, ...
│   ├── home/             # HeroSection, QuickGuideCards, SituationSelector
│   ├── header/           # MegaMenuItem
│   ├── ArticleSchema     # JSON-LD structured data
│   ├── EEATBadge         # E-E-A-T transparency badge
│   ├── MedicalDisclaimer # Auto-injected legal notice
│   ├── ReferenceList     # Scientific citations
│   ├── CookieConsent     # KVKK uyumlu cerez onayi
│   ├── SearchAutocomplete # Pagefind entegrasyonu
│   └── ...
├── content/
│   ├── articles/         # 62 Markdown/MDX makale
│   └── config.ts         # Zod schema (E-E-A-T + workflow fields)
├── data/
│   ├── navigation.ts     # Ana menu, footer, situation selector, quick guides
│   ├── glossary.ts       # Tibbi terim tooltip veritabani
│   └── guideCategories.ts # Homepage quick guide cards
├── layouts/
│   └── BaseLayout.astro  # Ana layout wrapper
├── pages/                # 40 sayfa
│   ├── makaleler/        # Dinamik makale routing ([...slug].astro)
│   ├── api/              # contact.ts, ebook-subscribe.ts (SSR)
│   └── [38 statik sayfa] # Rehberler, kategoriler, politika, ozel sayfalar
├── styles/
│   ├── globals.css       # Prose-medical, base styles (662 satir)
│   ├── tokens.css        # Design tokens (288 satir)
│   ├── components.css    # Component-specific styles
│   └── animations.css    # Animasyon tanimlari (471 satir)
└── utils/
    └── articles.ts       # getPublishedArticles(), getAllArticles()

public/
├── _headers              # Cloudflare cache-control politikalari
├── _redirects            # 301 redirect mappings
├── e-kitap/              # Beslenme plani e-kitap (~9.2 MB)
│   ├── tup-bebek-beslenme-plani.html   # Kaynak HTML (inline CSS)
│   ├── tup-bebek-beslenme-plani.pdf    # Puppeteer ile olusturulmus PDF
│   └── images/           # 11 JPEG gorsel (cover, faz gorselleri, vs.)
├── fonts/                # Self-hosted woff2 (488 KB)
├── images/               # Site gorselleri (~9.8 MB, WebP optimize)
└── robots.txt, favicon.png, site.webmanifest

scripts/
├── generate-pdf.js       # Puppeteer: HTML → PDF (e-kitap)
├── convert-to-webp.mjs   # Sharp: batch PNG/JPG → WebP
├── convert-image.mjs     # Sharp: tekil gorsel donusum
└── migrate_links.cjs     # Legacy link migration
```

### Editoryal Is Akisi

Icerik statusleri (content/config.ts):

1. **draft** — Taslak, yayinlanmaz
2. **in_review** — Tibbi Danisma Kurulu incelemesinde
3. **published** — Onaylanmis ve yayinda (varsayilan)

`getPublishedArticles()` fonksiyonu sadece `published` statusundeki makaleleri dondurur.

### SEO / Yapilandirilmis Veri

- **BaseLayout**: Genel `MedicalWebPage` JSON-LD + robots max-image-preview + og:image:alt
- **ArticleSchema**: Makale bazli `["MedicalWebPage", "Article"]` + `reviewedBy` + `citation`
- **BreadcrumbList**: Otomatik breadcrumb schema
- **Sitemap**: lastmod tarihleri frontmatter'dan parse edilir
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
author: "Yazar Adi"          # string veya {name, title, credentials} objesi
authorTitle: "Unvan"
authorCredentials: "Yeterlilik"
authorYoutube: "https://www.youtube.com/@DocentDrSenaiAksoy"  # varsa
medicalReviewer: "Reviewer Adi"
reviewerTitle: "Reviewer Unvani"
reviewDate: 2026-04-01
image: "/images/..."
imageAlt: "Gorsel aciklamasi"
featured: false
videoId: "YouTube video ID"
videoTitle: "Video basligi"
canonical: "Canonical URL"
noindex: false
references:
  - title: "Makale adi"
    authors: "Yazar listesi"
    journal: "Dergi adi"
    year: 2024
    doi: "10.1234/example"
    url: "https://..."
```

### Deploy & Altyapi

- **Platform**: Cloudflare Pages (wrangler.toml)
- **Build**: `astro build && npx pagefind --site dist --glob "makaleler/**/*.html"`
- **SSR Routes**: /api/contact, /api/ebook-subscribe (Cloudflare Workers)
- **CDN Headers**: PDF 1 gun, fontlar 1 yil (immutable), images 7 gun, e-kitap HTML 1 saat
- **Redirects**: _redirects dosyasi + astro.config.mjs redirects (eski URL cleanup)

### E-Kitap (Beslenme Plani)

- **Kaynak**: `public/e-kitap/tup-bebek-beslenme-plani.html` (inline CSS, 12 bolum)
- **PDF**: Puppeteer ile olusturulur (`node scripts/generate-pdf.js`)
- **Indirme**: `/e-kitap-indir` sayfasindan form ile lead yakalama, Resend API ile email
- **Gorseller**: 11 JPEG (cover, faz gorselleri, besin gorselleri)
- **Print CSS**: Sayfa kirilma kontrolu, faz bazli page-break, kompakt margin/padding

## Gelistirme Prensipleri

### Spec-Driven Development

1. Kod yazmadan once hedefleri ve mimariyi analiz et
2. Plan olustur ve onay al
3. Onayli plana gore kodu yaz

### Yeni Makale Teyitleri

Yeni bir makale eklenirken veya mevcut makale komple yenilenirken, final duzenleme oncesi su iki bilgi mutlaka teyit edilir:

- Yazar adi
- YouTube adresi (varsa)

### Makale Yazim Sureci — PubMed Research

Yeni bir makale konusu verildiginde, icerik olusturmadan once asagidaki arastirma sureci uygulanir:

1. **PubMed taramasi**: Claude research ile PubMed uzerinden konuyla ilgili en guncel sistematik derlemeler, meta-analizler ve klinik calismalar taranir
2. **Kaynak secimi**: Son 5 yilin (tercihen son 2-3 yil) yuksek kanitli calismalari oncelikli secilir (RCT, meta-analiz, Cochrane review)
3. **Bilgi sentezi**: Tarama sonuclari sentezlenerek makalenin bilimsel cercevesi olusturulur
4. **Makale yazimi**: Icerik, research sonuclarina dayali olarak yazilir; her iddia icin kaynak referansi saglanir
5. **Referans ekleme**: Kullanilan PubMed calismalari frontmatter `references` alanina eklenir (DOI, yazar, dergi, yil bilgileriyle)

**Arastirma oncelikleri**: ESHRE, ASRM, Cochrane, WHO rehberleri ve Fertility and Sterility, Human Reproduction, RBM Online gibi ust duzey dergilerdeki calismalar tercih edilir.

### Oneri Derecesi / Kanit Duzeyi

Estranova benzeri kanit sunumu icin her makalede frontmatter icinde `recommendationGrade` alani bulunur ve yazi ustunde gorunur.

Kullanilacak sade siniflandirma:

- `A` - **Cok Guclu**: Birden fazla yuksek kaliteli RKÇ veya meta-analiz ile desteklenmis
- `B` - **Guclu**: Sinirli sayida RKÇ veya cok iyi tasarlanmis kohort calismalari
- `C` - **Orta / Zayif**: Vaka-kontrol calismalari veya gozlemsel veriler
- `D/E` - **Cok Zayif**: Sadece uzman gorusu veya vaka sunumlari

Kurallar:

- Yeni makale eklenirken `recommendationGrade` zorunludur.
- Derece, yazidaki **ana klinik onerinin** dayandigi en guclu ve en tutarli kanit govdesine gore verilir.
- Derece verirken Oxford CEBM veya USPSTF benzeri hiyerarsiler referans alinir; ancak sitede kullanilan gorunen dil yukaridaki sade siniflandirmadir.
- Derece, pazarlama amacli degil; okuyucunun kanit gucunu hizla anlamasi icin kullanilir.
- Yazi ici inline gosterim gerekiyorsa su belirtecler kullanilir:
  - `{{kanit:A}}` -> `(A - cok guclu kanit)`
  - `{{kanit:B}}` -> `(B - guclu kanit)`
  - `{{kanit:C}}` -> `(C - orta/zayif kanit)`
  - `{{kanit:D/E}}` -> `(D/E - cok zayif kanit)`
- Inline etiketler her cumlede degil, yalnizca kritik klinik iddialarda kullanilir: rutin onerilir / onerilmez, fayda vardir / yoktur, risk olabilir, kanit sinirlidir gibi karar degistirici cumlelerde.
- Teknik uygulama katmanlari:
  - Makale ustu genel derece: `src/components/EvidenceGradeCard.astro`
  - Yazi ici otomatik markdown donusumu: `src/utils/remarkInlineEvidence.mjs`
  - Manuel Astro/MDX kullanimi: `src/components/InlineEvidence.astro`

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

### Onemli Komutlar

```bash
npm run dev          # Gelistirme sunucusu
npm run build        # Uretim build + Pagefind indexing
npm run preview      # Build onizleme
node scripts/generate-pdf.js    # E-kitap PDF olusturma
node scripts/convert-to-webp.mjs # Toplu WebP donusum
```
