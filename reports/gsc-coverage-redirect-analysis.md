# GSC Coverage Redirect Analysis

- Source: `C:\Users\KC3\Downloads\tupbebek.com-Coverage-Drilldown-2026-05-19`
- Issue: `Yönlendirmeli sayfa`
- Listed URLs: **359**
- Latest affected count (chart): **359**
- Peak affected count (chart): **381** on `2026-05-02`

## Pattern counts
- blog_prefix: 179 (49.9%)
- no_trailing_slash: 140 (39.0%)
- non_www: 7 (1.9%)
- query: 6 (1.7%)
- http: 2 (0.6%)
- ar_prefix: 1 (0.3%)
- gclid: 0 (0.0%)
- search_placeholder: 0 (0.0%)
- fr_prefix: 0 (0.0%)
- malformed_url: 0 (0.0%)

## Top hosts
- tupbebek.com: 352 (98.1%)
- www.tupbebek.com: 7 (1.9%)

## Top paths
- /tup-bebek-tedavim-tuttu-mu: 4 (1.1%)
- /sik-sorulan-sorular: 4 (1.1%)
- /blog/ofis-histeroskopi-nedir: 3 (0.8%)
- /: 3 (0.8%)
- /yumurtlama-takibi: 2 (0.6%)
- /tup-bebek-ve-mikroenjeksiyon: 2 (0.6%)
- /asilama: 2 (0.6%)
- /sperm-analizi: 2 (0.6%)
- /tedaviniz: 2 (0.6%)
- /tup-bebek-asamalari: 2 (0.6%)
- /blog/embriyo-tutunmasi-implantasyon-2-embriyoya-ait-problemler: 2 (0.6%)
- /tup-bebek-tedavisinde-catlatma-ignesi: 2 (0.6%)
- /tup-bebekte-ozel-uygulamalar: 2 (0.6%)
- /blog/embryoglue-embriyo-yapistiricisi-faydalari: 2 (0.6%)
- /makaleler: 2 (0.6%)
- /tup-bebek-tedavisinde-nelere-dikkat-etmelisiniz: 2 (0.6%)
- /tesatese: 2 (0.6%)
- /makaleler/pkos-ve-tup-bebek: 2 (0.6%)
- /tup-bebek-tedavisinde-preimplantasyon-genetik-tani: 2 (0.6%)
- /tup-bebek-evraklari-ve-testleri: 2 (0.6%)

## Canonicalization examples (input -> canonical)
- https://tupbebek.com/blog/embriyo-tup-bebek-laboratuvar-raporu-yorumlama/ -> https://tupbebek.com/blog/embriyo-tup-bebek-laboratuvar-raporu-yorumlama/
- https://tupbebek.com/blog/luteal-faz-defekti-kisirlik-nedeni/ -> https://tupbebek.com/blog/luteal-faz-defekti-kisirlik-nedeni/
- https://tupbebek.com/makaleler/adet-duzensizligi-pcos -> https://tupbebek.com/makaleler/adet-duzensizligi-pcos/
- https://tupbebek.com/makaleler/endometrioma -> https://tupbebek.com/makaleler/endometrioma/
- https://tupbebek.com/makaleler/varikosel-nedir-ne-zaman-ameliyat-gerekir -> https://tupbebek.com/makaleler/varikosel-nedir-ne-zaman-ameliyat-gerekir/
- https://tupbebek.com/makaleler/bagisiklik-tedavileri -> https://tupbebek.com/makaleler/bagisiklik-tedavileri/
- https://tupbebek.com/makaleler/yumurtlama-takibi -> https://tupbebek.com/makaleler/yumurtlama-takibi/
- https://tupbebek.com/yumurtlama-takibi/ -> https://tupbebek.com/yumurtlama-takibi/
- https://tupbebek.com/makaleler/adet-gorememe -> https://tupbebek.com/makaleler/adet-gorememe/
- https://tupbebek.com/makaleler/taze-dondurulmus-transfer -> https://tupbebek.com/makaleler/taze-dondurulmus-transfer/
- https://tupbebek.com/makaleler/mikroenjeksiyon-icsi-nedir -> https://tupbebek.com/makaleler/mikroenjeksiyon-icsi-nedir/
- https://tupbebek.com/tup-bebek-ve-mikroenjeksiyon/ -> https://tupbebek.com/tup-bebek-ve-mikroenjeksiyon/

## Suggested implementation order
- Enforce single-hop host/protocol canonical redirect (http->https, non-www->www).
- Normalize trailing slash behavior consistently at edge and app layer.
- Strip low-value tracking/query parameters from canonical URLs (gclid, utm_*, fbclid).
- Add high-confidence legacy path aliases generated in `gsc-route-aliases-draft.json`.
- Re-submit sitemap and validate in GSC after 7-14 days.
