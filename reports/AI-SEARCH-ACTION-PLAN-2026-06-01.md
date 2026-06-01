# AI Search ve Preferred Sources Aksiyon Planı

Tarih: 2026-06-01

## Tamamlananlar

- `tupbebek.com`, Google Kaynak Tercihleri ekranında seçilebilir kaynak olarak doğrulandı.
- Preferred Sources CTA bileşeni oluşturuldu ve şu yerleşimlere eklendi:
  - Makale sonu: `article_end`
  - Ana sayfa alt bölümü: `home_footer`
  - Hakkımızda: `about_page`
  - Editoryal Politika: `editorial_policy`
- CTA tıklamaları GA4 tarafında `add_preferred_source_click` olayıyla ölçülecek.
- 59 yayındaki makale tazelik açısından tarandı; 180 günü aşan makale bulunmadı.
- `embryoscope-yapay-zeka.mdx` referansları 2 kaynaktan 6 DOI/PMID destekli kaynağa çıkarıldı.
- Tekrar çalıştırılabilir AI Search hazırlık kontrolü eklendi: `npm run verify:ai-search-readiness`.
- `llms.txt` içinde redirect URL kalmaması için `npm run verify:llms-hygiene` kontrolü eklendi.
- Tüm AI Search kontrolleri tek komutta toplanır: `npm run verify:ai-search`.

## İzlenecek AI Search Sorguları

Aylık manuel kontrol önerilir. Google AI Overviews / AI Mode çıktılarında `tupbebek.com` alıntısı, kaynak kartı veya klasik organik görünürlük not edilir.

| Öncelik | Sorgu | Hedef sayfa |
| --- | --- | --- |
| 1 | tüp bebek nedir | `/makaleler/tup-bebek-nedir/` |
| 1 | embriyo transferi sonrası | `/makaleler/embriyo-transferi-sonrasi-bakim/` |
| 1 | düşük amh ile hamile kalınır mı | `/makaleler/dusuk-amh-hamilelik/` |
| 1 | azospermi mikro tese | `/makaleler/azospermi-mikro-tese/` |
| 1 | pgt nedir | `/pgt-merkezi/` |
| 1 | tüp bebek başarı oranı yaşa göre | `/makaleler/yasa-gore-tup-bebek-basari-oranlari/` |
| 1 | endometriozis tüp bebek | `/makaleler/endometriozis-tup-bebek/` |
| 2 | embryoScope yapay zeka embriyo seçimi | `/makaleler/embryoscope-yapay-zeka/` |
| 2 | embriyo transferi 3 gün mü 5 gün mü | `/makaleler/embriyo-transferi-gun-secimi/` |
| 2 | hidrosalpinx tüp bebek | `/makaleler/hidrosalpinx-ve-kisirlik/` |

## Aylık Kontrol Formu

Her sorgu için şu alanlar kaydedilir:

- Tarih
- Sorgu
- Cihaz / ülke / dil
- AI Overview var mı?
- AI Mode kaynakları içinde `tupbebek.com` var mı?
- Klasik organik sıralama yaklaşık konumu
- Görünen hedef URL
- Eksik kalan içerik açısı

## Bir Sonraki Editoryal Kuyruk

1. `embryoscope-yapay-zeka.mdx`: kaynaklar güncellendi; sonraki tıbbi kurul geçişinde gövde metnine 2024 TILT ve 2024 Nature Medicine RCT bulguları kısa bir "Yeni kanıtlar" paragrafı olarak eklenebilir.
2. `embriyo-transferi-sonrasi-bakim.mdx`: yüksek arama niyeti nedeniyle 90 günde bir kontrol.
3. `dusuk-amh-hamilelik.mdx`: yüksek hasta niyeti ve güncel danışmanlık ihtiyacı nedeniyle 90 günde bir kontrol.
4. `yasa-gore-tup-bebek-basari-oranlari.mdx`: başarı oranı içerikleri mevzuat açısından hassas olduğu için 90 günde bir kontrol.
5. `pgt-a-bas-editor-kosesi.mdx`: AI Search içinde PGT-A tartışmaları sık göründüğü için 120 günde bir kontrol.

## Otomatik Kontrol

Tüm kontrolleri birlikte çalıştırmak için:

```bash
npm run verify:ai-search
```

`npm run verify:ai-search-readiness` şu eşikleri kontrol eder:

- Yayındaki makalelerde zorunlu E-E-A-T alanları bulunmalı.
- `lastModified` tarihi 180 günden eski olmamalı.
- Her yayındaki makalede en az 3 bilimsel referans bulunmalı.
- Referanslarda en az bir DOI, URL veya PMID yer almalı.

`npm run verify:llms-hygiene` şu eşiği kontrol eder:

- `llms.txt` ve `llms-full.txt` içindeki `tupbebek.com` linkleri 301 redirect kaynaklarına gitmemeli.

## GA4 Ölçüm Planı

Preferred Sources CTA tıklamaları şu event ile ölçülür:

- Event adı: `add_preferred_source_click`
- Event category: `engagement`
- Parametreler:
  - `preferred_source_domain`: `tupbebek.com`
  - `placement`: CTA konumu (`article_end`, `home_footer`, `about_page`, `editorial_policy`)
  - `page_path`: tıklamanın geldiği sayfa yolu
  - `article_slug`: makale sayfalarında ilgili slug

GA4 arayüzünde önerilen custom dimension'lar:

- `placement`
- `preferred_source_domain`
- `article_slug`

Önerilen rapor kırılımı:

| Rapor | Boyut | Metrik |
| --- | --- | --- |
| CTA performansı | `placement` | Event count |
| Makale etkisi | `article_slug` | Event count |
| Sayfa etkisi | `page_path` | Event count |

İlk değerlendirme penceresi: deploy sonrası 14 gün.

## Kaynaklar

- Google Preferred Sources dokümanı: https://developers.google.com/search/docs/appearance/preferred-sources
- Google Search duyurusu: https://blog.google/products-and-platforms/products/search/original-high-quality-content-search/
- Cochrane time-lapse sistemleri incelemesi: https://www.cochrane.org/evidence/CD011320_time-lapse-systems-embryo-incubation-and-embryo-assessment-couples-undergoing-vitro-fertilisation
- ESHRE time-lapse good practice: https://academic.oup.com/hropen/article/2020/2/hoaa008/5809428
- TILT RCT: https://pubmed.ncbi.nlm.nih.gov/39033010/
- Nature Medicine AI embriyo seçimi RCT: https://www.nature.com/articles/s41591-024-03166-5
