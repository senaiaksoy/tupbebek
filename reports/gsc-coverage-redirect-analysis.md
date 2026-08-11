# GSC Coverage Redirect Analysis

- Source: `C:\Users\KC3\Downloads\tupbebek.com-Coverage-Drilldown-2026-08-11`
- Issue: `Bulunamadı (404)`
- Listed URLs: **142**
- Latest affected count (chart): **142**
- Peak affected count (chart): **163** on `2026-05-16`

## Pattern counts
- no_trailing_slash: 66 (46.5%)
- blog_prefix: 29 (20.4%)
- ar_prefix: 28 (19.7%)
- fr_prefix: 16 (11.3%)
- non_www: 12 (8.5%)
- http: 10 (7.0%)
- query: 4 (2.8%)
- gclid: 0 (0.0%)
- search_placeholder: 0 (0.0%)
- malformed_url: 0 (0.0%)

- Unimplemented high-confidence alias candidates: **0**

## Top hosts
- tupbebek.com: 130 (91.5%)
- www.tupbebek.com: 12 (8.5%)

## Top paths
- /fr: 2 (1.4%)
- /ar/blog/endometriosis-infertility-ivf-surgery-2025: 2 (1.4%)
- /blog/hysteroscopic-cytoreductive-surgery-for-adenomyosis: 2 (1.4%)
- /ar/blog/isotretinoin-for-azoospermia: 2 (1.4%)
- /treatment/faq: 2 (1.4%)
- /ar: 2 (1.4%)
- /treatment/stimulation-of-the-ovaries: 2 (1.4%)
- /treatment/embryo-freezing: 2 (1.4%)
- /treatment/egg-retrieval: 2 (1.4%)
- /fr/contact-us: 2 (1.4%)
- /services: 2 (1.4%)
- /ar/dr-senai-aksoy: 2 (1.4%)
- /treatment/fertilization-ivf-and-icsi: 2 (1.4%)
- /treatment: 2 (1.4%)
- /ar/services: 2 (1.4%)
- /ar/contact-us: 2 (1.4%)
- /ar/about-us: 2 (1.4%)
- /treatment/pre-ivf-testing: 2 (1.4%)
- /makaleler/bilimsel-makaleler/tup-bebek-tedavisinde-bos-folikul-sendromu: 1 (0.7%)
- /makaleler/dusuk-amh-: 1 (0.7%)

## Canonicalization examples (input -> canonical)
- http://www.tupbebek.com/makaleler/bilimsel-makaleler/tup-bebek-tedavisinde-bos-folikul-sendromu -> https://tupbebek.com/makaleler/bilimsel-makaleler/tup-bebek-tedavisinde-bos-folikul-sendromu/
- https://tupbebek.com/fr/ -> https://tupbebek.com/
- https://tupbebek.com/makaleler/dusuk-amh- -> https://tupbebek.com/makaleler/dusuk-amh-/
- https://www.tupbebek.com/makaleler/embryoscope- -> https://tupbebek.com/makaleler/embryoscope-/
- https://tupbebek.com/ar/treatment/causes-and-diagnosis-of-infertility/ -> https://tupbebek.com/ar/treatment/causes-and-diagnosis-of-infertility/
- http://www.tupbebek.com/modules.php?name=Videolar&file=read&id=127 -> https://tupbebek.com/modules.php/?name=Videolar&file=read&id=127
- https://tupbebek.com/tup-bebekte-ozel-uygulamalar/ -> https://tupbebek.com/tedavi-yontemleri/
- https://tupbebek.com/policy/undefined/policy/ -> https://tupbebek.com/policy/undefined/policy/
- https://tupbebek.com/tedaviniz/ -> https://tupbebek.com/ivf-rehberi/
- https://tupbebek.com/undefined/ -> https://tupbebek.com/undefined/
- https://tupbebek.com/${result.url}/ -> https://tupbebek.com/
- https://tupbebek.com/makaleler/hiperprolaktinemi-prolaktinom/ -> https://tupbebek.com/makaleler/hiperprolaktinemi-ve-kisirlik/

## Suggested implementation order
- Enforce single-hop host/protocol canonical redirect (http->https, non-www->www).
- Normalize trailing slash behavior consistently at edge and app layer.
- Strip low-value tracking/query parameters from canonical URLs (gclid, utm_*, fbclid).
- No unimplemented high-confidence route aliases were detected in this export.
- Re-submit sitemap and validate in GSC after 7-14 days.
