# GSC Redirect Verification Sample (20 URLs)

Bu liste Search Console exportundan seçilmiş temsil URL’ler için hızlı doğrulama setidir.

## Test komutu (PowerShell)

`curl.exe -I "<URL>"`

Beklenen:
- Tek hop `301`
- Final URL canonical hostta: `https://www.draksoyivf.com/...`
- Döngü/chain yok (`301 -> 301 -> 200` olmamalı)

## Sample URL list

1. `http://www.draksoyivf.com/`
2. `http://draksoyivf.com/`
3. `https://draksoyivf.com/fr`
4. `https://www.draksoyivf.com/fr/`
5. `https://www.draksoyivf.com/ar/`
6. `https://www.draksoyivf.com/blog/azoospermia-and-micro-tese/`
7. `https://www.draksoyivf.com/blog/bleeding-after-embryo-transfer/`
8. `https://www.draksoyivf.com/blog/embryo-transfer-ivf-treatment/`
9. `https://www.draksoyivf.com/blog/hydrosalpinx-and-infertility/`
10. `https://www.draksoyivf.com/blog/pcos-and-ivf/`
11. `https://www.draksoyivf.com/fr/blog/azoospermie-microtese/`
12. `https://www.draksoyivf.com/fr/blog/soins-post-transfert-embryons/`
13. `https://www.draksoyivf.com/fr/blog/pcos-et-fiv/`
14. `https://www.draksoyivf.com/ar/blog/azoospermia-and-micro-tese/`
15. `https://www.draksoyivf.com/ar/blog/bleeding-after-embryo-transfer/`
16. `https://www.draksoyivf.com/treatment/faq/`
17. `https://www.draksoyivf.com/ivf-in-turkey/`
18. `https://www.draksoyivf.com/success-rates/`
19. `https://www.draksoyivf.com/about-us/`
20. `https://www.draksoyivf.com/contact-us/`

## Not

- Query parametreli URL’ler için (örn. `gclid`, `utm_*`) edge transform kuralı ayrıca gerekir.
- `?s={search_term_string}` için explicit kural uygulanması önerilir.
