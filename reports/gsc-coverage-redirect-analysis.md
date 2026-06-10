# GSC Coverage Redirect Analysis

- Source: `C:\Users\KC3\Downloads\tupbebek.com-Coverage-Drilldown-2026-06-10 (1)`
- Issue: `Bulunamadı (404)`
- Listed URLs: **157**
- Latest affected count (chart): **157**
- Peak affected count (chart): **330** on `2026-04-25`

## Pattern counts
- no_trailing_slash: 76 (48.4%)
- blog_prefix: 33 (21.0%)
- ar_prefix: 27 (17.2%)
- non_www: 18 (11.5%)
- http: 17 (10.8%)
- fr_prefix: 16 (10.2%)
- query: 7 (4.5%)
- gclid: 0 (0.0%)
- search_placeholder: 0 (0.0%)
- malformed_url: 0 (0.0%)

- Unimplemented high-confidence alias candidates: **0**

## Top hosts
- tupbebek.com: 139 (88.5%)
- www.tupbebek.com: 18 (11.5%)

## Top paths
- /modules.php: 4 (2.5%)
- /ar/blog/endometriosis-infertility-ivf-surgery-2025: 2 (1.3%)
- /blog/hysteroscopic-cytoreductive-surgery-for-adenomyosis: 2 (1.3%)
- /ar/blog/isotretinoin-for-azoospermia: 2 (1.3%)
- /treatment/faq: 2 (1.3%)
- /ar: 2 (1.3%)
- /treatment/stimulation-of-the-ovaries: 2 (1.3%)
- /treatment/embryo-freezing: 2 (1.3%)
- /treatment/egg-retrieval: 2 (1.3%)
- /fr/contact-us: 2 (1.3%)
- /services: 2 (1.3%)
- /ar/dr-senai-aksoy: 2 (1.3%)
- /treatment/fertilization-ivf-and-icsi: 2 (1.3%)
- /treatment: 2 (1.3%)
- /ar/services: 2 (1.3%)
- /ar/contact-us: 2 (1.3%)
- /ar/about-us: 2 (1.3%)
- /treatment/pre-ivf-testing: 2 (1.3%)
- /tup-bebekte-ozel-uygulamalar: 1 (0.6%)
- /policy/undefined/policy: 1 (0.6%)

## Canonicalization examples (input -> canonical)
- http://www.tupbebek.com/modules.php?name=Videolar&file=read&id=127 -> https://tupbebek.com/modules.php/?name=Videolar&file=read&id=127
- https://tupbebek.com/tup-bebekte-ozel-uygulamalar/ -> https://tupbebek.com/tedavi-yontemleri/
- https://tupbebek.com/policy/undefined/policy/ -> https://tupbebek.com/policy/undefined/policy/
- https://tupbebek.com/tedaviniz/ -> https://tupbebek.com/ivf-rehberi/
- https://tupbebek.com/undefined/ -> https://tupbebek.com/undefined/
- https://tupbebek.com/${safeUrl}/ -> https://tupbebek.com/
- https://tupbebek.com/${result.url}/ -> https://tupbebek.com/
- https://tupbebek.com/${url}/ -> https://tupbebek.com/
- https://tupbebek.com/makaleler/hiperprolaktinemi-prolaktinom/ -> https://tupbebek.com/makaleler/hiperprolaktinemi-ve-kisirlik/
- https://tupbebek.com/tup-bebek-tedavim-tuttu-mu/?sa=X&ved=2ahUKEwi3oOveufbmAhUPmIsKHb38AGAQFjAGegQIBRAB -> https://tupbebek.com/tup-bebek-tedavim-tuttu-mu/?sa=X&ved=2ahUKEwi3oOveufbmAhUPmIsKHb38AGAQFjAGegQIBRAB
- https://tupbebek.com/makaleler/myomlar-ve-kisirlik/ -> https://tupbebek.com/makaleler/miyomlar-ve-tup-bebek/
- https://tupbebek.com/kadinda-kisirlik-nedenleri/ -> https://tupbebek.com/kadin-infertilitesi/

## Suggested implementation order
- Enforce single-hop host/protocol canonical redirect (http->https, non-www->www).
- Normalize trailing slash behavior consistently at edge and app layer.
- Strip low-value tracking/query parameters from canonical URLs (gclid, utm_*, fbclid).
- No unimplemented high-confidence route aliases were detected in this export.
- Re-submit sitemap and validate in GSC after 7-14 days.
