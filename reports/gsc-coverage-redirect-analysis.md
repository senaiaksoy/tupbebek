# GSC Coverage Redirect Analysis

- Source: `C:\Users\KC3\Downloads\tupbebek.com-Coverage-Drilldown-2026-05-21`
- Issue: `Yönlendirmeli sayfa`
- Listed URLs: **353**
- Latest affected count (chart): **353**
- Peak affected count (chart): **381** on `2026-05-02`

## Pattern counts
- blog_prefix: 180 (51.0%)
- no_trailing_slash: 132 (37.4%)
- non_www: 7 (2.0%)
- query: 6 (1.7%)
- http: 2 (0.6%)
- ar_prefix: 1 (0.3%)
- gclid: 0 (0.0%)
- search_placeholder: 0 (0.0%)
- fr_prefix: 0 (0.0%)
- malformed_url: 0 (0.0%)

- Unimplemented high-confidence alias candidates: **0**

## Top hosts
- tupbebek.com: 346 (98.0%)
- www.tupbebek.com: 7 (2.0%)

## Top paths
- /tup-bebek-tedavim-tuttu-mu: 4 (1.1%)
- /sik-sorulan-sorular: 4 (1.1%)
- /: 3 (0.8%)
- /blog/ofis-histeroskopi-nedir: 3 (0.8%)
- /tup-bebek-tedavisinde-catlatma-ignesi: 2 (0.6%)
- /histeroskopi: 2 (0.6%)
- /embriyo-transferi-sonrasi-kanama: 2 (0.6%)
- /blog/embryoglue-embriyo-yapistiricisi-faydalari: 2 (0.6%)
- /makaleler: 2 (0.6%)
- /yumurtlama-takibi: 2 (0.6%)
- /tup-bebek-evraklari-ve-testleri: 2 (0.6%)
- /tedaviniz: 2 (0.6%)
- /tup-bebek-asamalari: 2 (0.6%)
- /blog/istanbul-tup-bebek-doktoru-merkezi-secimi-rehberi: 2 (0.6%)
- /asilama: 2 (0.6%)
- /tup-bebek-tedavisinde-preimplantasyon-genetik-tani: 2 (0.6%)
- /blog/embriyo-tutunmasi-implantasyon-2-embriyoya-ait-problemler: 2 (0.6%)
- /tup-bebekte-ozel-uygulamalar: 2 (0.6%)
- /tup-bebek-tedavisinde-nelere-dikkat-etmelisiniz: 2 (0.6%)
- /tesatese: 2 (0.6%)

## Canonicalization examples (input -> canonical)
- https://tupbebek.com/tup-bebek-ve-mikroenjeksiyon/ -> https://tupbebek.com/makaleler/mikroenjeksiyon-icsi-nedir/
- https://tupbebek.com/tup-bebek-basari-oranlari/ -> https://tupbebek.com/basari-oranlari/
- https://tupbebek.com/tup-bebek-tedavisinde-catlatma-ignesi/ -> https://tupbebek.com/makaleler/ivf-protokolleri/
- https://tupbebek.com/histeroskopi/ -> https://tupbebek.com/makaleler/ivf-oncesi-histeroskopi/
- https://tupbebek.com/makaleler/ivf-oncesi-histeroskopi -> https://tupbebek.com/makaleler/ivf-oncesi-histeroskopi/
- https://tupbebek.com/embriyo-transferi-sonrasi-kanama/ -> https://tupbebek.com/embriyo-transferi-sonrasi-kanama/
- https://tupbebek.com/makaleler/embriyo-transferi-sonrasi-bakim -> https://tupbebek.com/makaleler/embriyo-transferi-sonrasi-bakim/
- https://tupbebek.com/tup-bebek-tedavim-tuttu-mu/ -> https://tupbebek.com/tup-bebek-tedavim-tuttu-mu/
- https://tupbebek.com/blog/bebegin-suyu-fazla-ise/ -> https://tupbebek.com/blog/bebegin-suyu-fazla-ise/
- https://tupbebek.com/blog/beta-hcg-test-sonuclari/ -> https://tupbebek.com/makaleler/beta-hcg-testi/
- https://tupbebek.com/blog/embryoglue-embriyo-yapistiricisi-faydalari/ -> https://tupbebek.com/makaleler/embryoglue-faydalari/
- https://tupbebek.com/blog/hamilelikte-tehlikeli-bir-enfeksiyon-sitomegalovirus/ -> https://tupbebek.com/blog/hamilelikte-tehlikeli-bir-enfeksiyon-sitomegalovirus/

## Suggested implementation order
- Enforce single-hop host/protocol canonical redirect (http->https, non-www->www).
- Normalize trailing slash behavior consistently at edge and app layer.
- Strip low-value tracking/query parameters from canonical URLs (gclid, utm_*, fbclid).
- No unimplemented high-confidence route aliases were detected in this export.
- Re-submit sitemap and validate in GSC after 7-14 days.
