# Deploy Planı + 7 Günlük Metric Ölçümü

**Hazırlık tarihi:** 2026-05-11
**Cloudflare Pages git-based deployment**

Bu doküman, mevcut **Sprint 0+1+2+3** değişikliklerinin canlıya alınması ve sonrasında 7 günlük etki ölçümü için adım adım rehberdir.

---

## Sprint Toplu Değişiklik Özeti

| Kategori | Sayı | Detay |
|---|---|---|
| Sprint 0 fix | 5 | Sitemap routes, security headers, trailingSlash, Sharp pipeline, 21MB PNG→WebP |
| Sprint 1 fix | 7 | Duplicate-intent 301 (4 pair), FAQPage /sss/, Person /yayin-kurulu/, Organization sitewide, sitemap filter, LCP preload, llms.txt |
| Sprint 2 fix | 5 | Article.image→ImageObject, EditorKunyesi lastReviewed fix, Cookie banner slide-in, E-kitap mobile form, HızlıCevap component |
| Sprint 3 (editöryal) | 9 | 8 thin makale ~2400 kelime ortalama YMYL içerik + S2-2 site-wide author/reviewer attribution + S2-4 HızlıCevap roll-out 47 makale |
| **Toplam değişen dosya** | **~165** | 64 article + 1 layout + 4 component + 2 page + 1 config + 1 headers + 1 redirects + scripts + reports + assets |

**Aggregate Skor Tahmini:** 59 → **~82** (+23 puan, deploy sonrası gerçek metriklerle doğrulanacak)

---

## Pre-Deploy Final Doğrulama

### 1. Build Temiz Mi?

```bash
cd "D:\A-klasör\tupbebek"
npm run build
```

Beklenen sonuç:
- 55 article HTML rendered
- 12,102 kelime Pagefind indexed
- `dist/sitemap-index.xml` ve `dist/sitemap-0.xml` mevcut
- `dist/llms.txt` mevcut
- `dist/_routes.json` exclude listesi içinde sitemap/robots/llms

### 2. Schema'lar Render Edildi Mi?

```bash
cd "D:\A-klasör\tupbebek"
# Sitewide Organization @id
grep -c "tupbebek.com/#organization" dist/index.html
# Person schema (yayin-kurulu)
grep -oE "\"@type\":\"Person\"" dist/yayin-kurulu/index.html | wc -l
# FAQPage (/sss/)
grep -c "FAQPage" dist/sss/index.html
# HizliCevap callout count across all articles
grep -l "hizli-cevap" dist/makaleler/*/index.html | wc -l
```

Beklenen:
- Organization @id: ≥ 1
- Person nodes: 16
- FAQPage: 1
- HızlıCevap render edilen makale sayısı: **55**

### 3. Yeni Asset'ler

```bash
ls -lh dist/llms.txt
ls -lh dist/images/makaleler/embryoscope-kapak-2026.webp
# (should be ~38KB, was 21MB as PNG)
```

---

## Deploy Adımları (Cloudflare Pages git-based)

Cloudflare Pages projesi git push ile otomatik deploy yapar.

### 1. Git Status Kontrolü

```bash
cd "D:\A-klasör\tupbebek"
git status --short
```

Beklenen modifikasyonlar:
- `astro.config.mjs`
- `public/_headers`
- `public/_redirects`
- `src/components/ArticleSchema.astro`
- `src/components/CookieConsent.astro`
- `src/components/EditorKunyesi.astro`
- `src/components/HizliCevap.astro` (yeni)
- `src/layouts/BaseLayout.astro`
- `src/pages/sss.astro`
- `src/pages/yayin-kurulu.astro`
- `src/pages/e-kitap-indir.astro`
- 64 article (.md silindi, .mdx eklendi/güncellendi)

Beklenen untracked (commit edilebilir):
- `public/images/makaleler/embryoscope-kapak-2026.webp`
- `public/llms.txt`
- `reports/*.md` (audit raporları — public deploy'a etkilemez)
- `reports/screenshots/` (audit screenshot'ları)
- `scripts/update-author-attribution.mjs` (batch script)
- `scripts/rollout-hizli-cevap.mjs` (batch script)
- `scripts/fix-mdx-*.mjs` (migration scripts)

### 2. Önerilen Commit Stratejisi

Tek bir büyük commit yerine **mantıksal gruplara** bölmek deploy review ve rollback için pratik:

**Commit 1: SEO Infrastructure (Sprint 0+1)**
```bash
git add astro.config.mjs public/_headers public/_redirects public/llms.txt
git add src/layouts/BaseLayout.astro src/components/ArticleSchema.astro src/components/EditorKunyesi.astro src/components/CookieConsent.astro src/components/HizliCevap.astro
git add src/pages/sss.astro src/pages/yayin-kurulu.astro src/pages/e-kitap-indir.astro
git add public/images/makaleler/embryoscope-kapak-2026.webp
git rm public/images/makaleler/embryoscope-kapak-2026.png
git commit -m "seo: Sprint 0+1+2 — sitemap routes, security headers, trailingSlash, Sharp, schema @graph, HizliCevap component"
```

**Commit 2: Editöryal Genişletme (Sprint 3 — 8 thin makale)**
```bash
git add src/content/articles/adet-duzensizligi-pcos.mdx
git rm src/content/articles/adet-duzensizligi-pcos.md
# Repeat for: azospermi-mikro-tese, beta-hcg-testi, yumurtalik-kistleri-dogurganlik, asherman-sendromu, akraba-evliligi, adet-gorememe, alkol-ve-fertilite
git commit -m "content: expand 8 thin YMYL articles with Sprint 3 evidence-based rewrite (Grade A, named clinician author, HızlıCevap callout, 8+ structured references each)"
```

**Commit 3: Site-wide Author Attribution + HızlıCevap Roll-out**
```bash
git add src/content/articles/
git commit -m "content: standardize author attribution to Doç. Dr. Senai Aksoy site-wide; HizliCevap callout rolled out to 47 remaining articles"
```

**Commit 4: Audit Reports + Scripts (opsiyonel — public deploy'a etkilemez)**
```bash
git add reports/ scripts/
git commit -m "docs: SEO audit reports and migration scripts (Sprint 0+1+2+3)"
```

### 3. Deploy Tetikleme

```bash
git push origin main
```

Cloudflare Pages otomatik olarak build'i başlatır. Dashboard'dan takip:
- https://dash.cloudflare.com/?to=/:account/pages/view/tupbebek

Build süresi tipik olarak **3-5 dakika** (Pagefind index build dahil).

### 4. Anında Smoke Test (Deploy Sonrası 5 Dakika İçinde)

```bash
# Sitemap erişilebilir mi?
curl -I https://tupbebek.com/sitemap-index.xml
curl -I https://tupbebek.com/sitemap-0.xml
# Beklenen: HTTP/2 200

# llms.txt
curl -I https://tupbebek.com/llms.txt
# Beklenen: HTTP/2 200

# Güvenlik headers
curl -I https://tupbebek.com/ | grep -iE "(strict-transport|x-frame|content-security|permissions-policy)"

# Duplicate-intent 301 zincir testi (S1-2)
curl -IL https://tupbebek.com/makaleler/aciklanamayan-infertilite/
# Beklenen: 301 → /aciklanamayan-infertilite/ → 200

# 4 pair için test:
curl -IL https://tupbebek.com/makaleler/basari-oranlari/
curl -IL https://tupbebek.com/makaleler/basarisiz-denemeler/
curl -IL https://tupbebek.com/makaleler/genetik-testler/

# 21 MB PNG → 39 KB WebP
curl -I https://tupbebek.com/images/makaleler/embryoscope-kapak-2026.webp
curl -I https://tupbebek.com/images/makaleler/embryoscope-kapak-2026.png
# webp: 200, png: 404 beklenen
```

---

## Deploy Sonrası 7 Günlük Metric Ölçüm Planı

### Gün 0 (Deploy Günü) — Baseline Kayıt

**Hemen yapılacaklar:**

1. **Google Search Console — Sitemap Submission**
   - GSC > Sitemap > "Add a new sitemap" → `sitemap-index.xml`
   - Submit ve Index Coverage'da 24 saat sonra status kontrol et

2. **Google PageSpeed Insights — Mobile + Desktop**
   - 5 critical URL için PSI run:
     - https://tupbebek.com/
     - https://tupbebek.com/makaleler/
     - https://tupbebek.com/makaleler/tup-bebek-nedir/
     - https://tupbebek.com/makaleler/embryoscope-yapay-zeka/ (ÖNEMLİ — 21MB PNG düzelmesi)
     - https://tupbebek.com/e-kitap-indir/
   - LCP, CLS, INP, TBT, FCP, performance skoru kaydet
   - **Beklenti:** `embryoscope-yapay-zeka` LCP'sinde dramatik iyileşme (~8s → ~2s)

3. **Google Rich Results Test**
   - https://search.google.com/test/rich-results
   - 4 URL test et:
     - homepage (Organization + WebSite)
     - `/sss/` (FAQPage — 14 Question)
     - `/yayin-kurulu/` (Person × 16 + ItemList)
     - 1 makale (MedicalWebPage + Article + ImageObject + 8 ScholarlyArticle citation)

4. **Schema.org Validator** (alternatif)
   - https://validator.schema.org/
   - Critical issues olmamalı

### Gün 1 — İlk 24 Saat

**Otomatik takipler:**

- GSC > URL Inspection > 5 yeni `.mdx` makale URL'i için indexing request
- GSC > Crawl Stats > "Pages crawled per day" grafiği — artış bekleniyor (yeni 47 makale signal kanalı açıldı)
- Cloudflare Analytics > Traffic graph — abnormal trafiğe karşı baseline

**Manuel kontroller:**

- Mobile cookie banner: kullanıcı bilgisayarında ve telefonunda test (slide-in animation çalışıyor mu?)
- E-kitap mobile form: 390px viewport'ta H1 → Form → Body sıralaması doğru mu?
- 4 redirect pair: tarayıcıdan manuel test edilebilir

### Gün 2-3 — Cloudflare Cache Stabilizasyonu

- CSP Report-Only modunda → Cloudflare logs incele
  - `cf-railgun` ve `cloudflare-error.log` üzerinden CSP violation raporları
  - False positive yoksa 7. günde enforcing mode'a çevrilebilir
- `_headers` doğrulaması: tüm critical URLs için HSTS preload eligibility
  - https://hstspreload.org/?domain=tupbebek.com

### Gün 4-7 — GSC + GA4 Veri Birikimi

**Anahtar metrikler:**

| Metric | Kaynak | Beklenen Trend (vs. önceki hafta) |
|---|---|---|
| Indexed pages | GSC Coverage | +47 (yeni .mdx makaleler) |
| Average position | GSC Performance | Anahtar yüksek-intent kelimelerde iyileşme bekleniyor |
| CTR (overall) | GSC Performance | Stable veya hafif artış (HızlıCevap callout AI snippet'lerde belirebilir) |
| Total impressions | GSC Performance | Stable veya artış |
| Core Web Vitals (mobile) | GSC CWV | "Poor" URL count düşmeli |
| LCP < 2.5s coverage | CrUX (PSI tab "Field Data") | İyileşme bekleniyor — Sharp pipeline geri |
| Sitemap submitted URLs | GSC Sitemaps | 84 → 86 (4 duplicate düştü, 6 hub stabilize) |
| GA4 Avg. session duration (article pages) | GA4 | Artış bekleniyor (genişletilmiş 8 makale + HızlıCevap engagement) |

### Gün 7 — Haftalık Review

**Aksiyon:**

1. **Re-run audit:** `/seo-audit` skill ile karşılaştırma
   - Aggregate skoru ölç
   - Hangi kategorilerde gerçek iyileşme oldu
   - Yeni ortaya çıkan sorunlar var mı

2. **PSI tekrar:** baseline ile karşılaştır
   - `embryoscope-yapay-zeka` LCP düşüşü doğrulandı mı?
   - `_headers` security ekleme nedeniyle performance dipi yok mu?

3. **GSC anahtar kelime performansı:**
   - Önceki audit raporundaki 8 SXO kelimesi:
     - `tüp bebek nedir`, `PCOS belirtileri`, `embriyo transferi sonrası`, `azospermi tedavi`, `IUI nedir`, `endometriozis tüp bebek`, `tüp bebek başarı oranları`, `yumurta dondurma`
   - Position değişimi?

4. **CSP Report-Only → Enforcing geçişi (eğer log temiz ise):**
```diff
- Content-Security-Policy-Report-Only: ...
+ Content-Security-Policy: ...
```

### Gün 7 — Karar Verilmesi Gereken Şeyler

- 47 manuel review HızlıCevap callout — bunların kaçını gerçek klinisyen-onaylı içerikle güçlendirelim?
- 14 yeni spoke article — `yas-ve-fertilite`, `hormon-paneli`, `tani-sureci`, `ilac-rehberi` hub'larına eklemek için zamanlama
- Cluster ajanı önerisi olan internal link önerilerini implement etme
- 4 SXO duplicate-intent çözümünün gerçek SERP etkisi

---

## Risk + Rollback Planı

**Eğer deploy sonrası bir şey kırılırsa:**

1. **Cloudflare Pages Rollback** — Dashboard > Deployments > önceki successful deploy "Promote to production"
2. **DNS/Cache** — Cloudflare cache purge gerekli olabilir
3. **Specific commit revert:**
   ```bash
   git revert <commit-sha>
   git push
   ```
4. **CSP fallback:** Eğer `Content-Security-Policy-Report-Only` bile sorun çıkarırsa `public/_headers`'tan satırı kaldır, push

**Kritik kontrol noktaları (deploy sonrası):**

- ☐ Anasayfa açılıyor mu?
- ☐ Makale sayfaları açılıyor mu? (örnek: `/makaleler/tup-bebek-nedir/`)
- ☐ Sitemap.xml 200 dönüyor mu?
- ☐ /sss/ ve /yayin-kurulu/ açılıyor mu?
- ☐ Cookie banner mobile'da görünüyor mu?
- ☐ 4 duplicate-intent URL 301 atıyor mu?
- ☐ /api/contact ve /api/ebook-subscribe (SSR) çalışıyor mu?
- ☐ Pagefind search çalışıyor mu? (`/makaleler/` sayfasında "tüp bebek" ara)

---

## Sonraki Sprint Hazırlığı

Bu deploy sonrası 7 günlük periyot bitince yapılabilecekler:

- **Sprint 4 — Manuel HızlıCevap iyileştirmesi** (47 makale × ~15 dk = ~12 saat)
- **Sprint 5 — 14 yeni spoke article** (boş hub'ların doldurulması)
- **Sprint 6 — Image regeneration** (35 hub için unique OG image via banana MCP)

---

*Deploy plan: hazırlık tarafından hazırlandı. Cloudflare Pages dashboard'undan deploy tetiklemek kullanıcının kontrolündedir.*
