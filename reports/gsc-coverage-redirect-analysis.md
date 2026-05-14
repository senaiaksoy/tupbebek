# GSC Coverage Redirect Analysis

- Source: `C:\Users\KC3\Downloads\tupbebek.com-Coverage-Drilldown-2026-05-14`
- Issue: `Yönlendirmeli sayfa`
- Listed URLs: **365**
- Latest affected count (chart): **365**
- Peak affected count (chart): **381** on `2026-05-02`

## Pattern counts
- blog_prefix: 196 (53.7%)
- no_trailing_slash: 152 (41.6%)
- non_www: 7 (1.9%)
- query: 5 (1.4%)
- http: 2 (0.5%)
- ar_prefix: 1 (0.3%)
- gclid: 0 (0.0%)
- search_placeholder: 0 (0.0%)
- fr_prefix: 0 (0.0%)
- malformed_url: 0 (0.0%)

## Top hosts
- tupbebek.com: 358 (98.1%)
- www.tupbebek.com: 7 (1.9%)

## Top paths
- /sik-sorulan-sorular: 4 (1.1%)
- /tup-bebek-tedavim-tuttu-mu: 4 (1.1%)
- /blog/ofis-histeroskopi-nedir: 3 (0.8%)
- /: 3 (0.8%)
- /blog/rahmin-ters-durmasi-kisirliga-neden-olmaz-retrovert-uterus: 2 (0.5%)
- /tesatese: 2 (0.5%)
- /blog/tup-bebek-tedavisinde-luteal-faz-kanamalari: 2 (0.5%)
- /yumurtlama-takibi: 2 (0.5%)
- /blog/bel-sogukluguna-kadinlar-da-yakalanabilir: 2 (0.5%)
- /tup-bebek-tedavisinde-catlatma-ignesi: 2 (0.5%)
- /blog/embriyo-tutunmasi-implantasyon-2-embriyoya-ait-problemler: 2 (0.5%)
- /tup-bebek-asamalari: 2 (0.5%)
- /blog/miyomlarin-gebelik-uzerinde-etkileri-nelerdir: 2 (0.5%)
- /blog/tup-bebekte-basarili-sonuc-icin-kac-yumurta-gerekir: 2 (0.5%)
- /blog/cikolata-kisti-endometriozis-ameliyati-yumurtalik-veya-rahmin-alinmasini-gerektirmez: 2 (0.5%)
- /tup-bebek-ve-mikroenjeksiyon: 2 (0.5%)
- /blog/hamile-kalamiyorsaniz-nedeni-hidrosalpinks-olabilir: 2 (0.5%)
- /tup-bebek-tedavisinde-nelere-dikkat-etmelisiniz: 2 (0.5%)
- /tup-bebek-tedavisinde-preimplantasyon-genetik-tani: 2 (0.5%)
- /embriyo-transferi-sonrasi-neler-yapmaliyim: 2 (0.5%)

## Canonicalization examples (input -> canonical)
- https://tupbebek.com/blog/asiri-sut-uretimi-hiperprolaktinemi/ -> https://tupbebek.com/blog/asiri-sut-uretimi-hiperprolaktinemi/
- https://tupbebek.com/blog/amniyon-sivisinin-azligi-da-coklugu-da-bebek-icin-tehlike-isareti/ -> https://tupbebek.com/blog/amniyon-sivisinin-azligi-da-coklugu-da-bebek-icin-tehlike-isareti/
- https://tupbebek.com/blog/dogum-sonrasi-vucudumuzda-neler-oluyor/ -> https://tupbebek.com/blog/dogum-sonrasi-vucudumuzda-neler-oluyor/
- https://tupbebek.com/blog/rahmin-ters-durmasi-kisirliga-neden-olmaz-retrovert-uterus/ -> https://tupbebek.com/blog/rahmin-ters-durmasi-kisirliga-neden-olmaz-retrovert-uterus/
- https://tupbebek.com/blog/kimyasal-gebelik/ -> https://tupbebek.com/blog/kimyasal-gebelik/
- https://tupbebek.com/makaleler/kimyasal-gebelik -> https://tupbebek.com/makaleler/kimyasal-gebelik/
- https://tupbebek.com/blog/prematur-ovarian-yetmezlik-kisirlik-nedeni/ -> https://tupbebek.com/blog/prematur-ovarian-yetmezlik-kisirlik-nedeni/
- https://tupbebek.com/makaleler/dusuk-amh-hamilelik -> https://tupbebek.com/makaleler/dusuk-amh-hamilelik/
- https://tupbebek.com/makaleler/azospermi-mikro-tese -> https://tupbebek.com/makaleler/azospermi-mikro-tese/
- https://tupbebek.com/tesatese/ -> https://tupbebek.com/tesatese/
- https://tupbebek.com/makaleler/kac-yumurta-gerekir -> https://tupbebek.com/makaleler/kac-yumurta-gerekir/
- https://tupbebek.com/blog/embriyo-tutunmasi-implantasyon-1-rahime-ait-problemler/ -> https://tupbebek.com/blog/embriyo-tutunmasi-implantasyon-1-rahime-ait-problemler/

## Suggested implementation order
- Enforce single-hop host/protocol canonical redirect (http->https, non-www->www).
- Normalize trailing slash behavior consistently at edge and app layer.
- Strip low-value tracking/query parameters from canonical URLs (gclid, utm_*, fbclid).
- Add high-confidence legacy path aliases generated in `gsc-route-aliases-draft.json`.
- Re-submit sitemap and validate in GSC after 7-14 days.
