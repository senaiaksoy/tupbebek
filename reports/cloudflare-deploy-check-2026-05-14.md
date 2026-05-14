# Cloudflare Pages Deploy Kontrol Notu - 2026-05-14

## Kisa Sonuc

Kalici bir Cloudflare Pages ayar hatasi gorunmuyor. `tupbebek` projesi Git provider'a bagli ve custom domainler ayni projede:

- `tupbebek.com`
- `www.tupbebek.com`
- `tupbebek-3wk.pages.dev`

PMOS makalesi yayina alinirken ilk canli kontrol, deploy listesindeki yeni commit gorunmesine ragmen ana domainde 404 dondu. Bir sonraki kontrolde hem Git deployment preview URL'si hem direct upload preview URL'si hem de ana domain yeni icerigi servis etti. Bu davranis, build hatasindan cok Cloudflare Pages production/custom-domain yayilim gecikmesine veya kisa sureli cache gecikmesine isaret ediyor.

## Dogrulanan Kanitlar

- Git deployment preview URL'si yeni PMOS icerigini 200 ile servis etti.
- Manuel direct upload deployment preview URL'si yeni PMOS icerigini 200 ile servis etti.
- Ana domain `https://tupbebek.com/makaleler/pcos-yeni-adi-pmos/` 200 dondu ve sayfada `PCOS/PMOS Icin Okuma Yolu`, canonical URL ve FAQ schema bulundu.
- `https://tupbebek.com/kadin-infertilitesi/` icinde `/makaleler/pcos-yeni-adi-pmos/` linki bulundu.
- `https://tupbebek.com/sitemap.xml` sitemap index dosyasidir; yeni URL burada dogrudan beklenmemeli.
- `https://tupbebek.com/sitemap-0.xml` asil URL listesidir ve `pcos-yeni-adi-pmos` URL'sini icerir.

## Bundan Sonraki Deploy Proseduru

1. `git push` sonrasinda Cloudflare Pages deployment listesinden son commit'in gorunmesini bekle.
2. En az 60-120 saniye sonra ana domainde kritik URL'leri kontrol et.
3. Sitemap kontrolunu `sitemap.xml` yerine `sitemap-0.xml` uzerinden yap.
4. Ana domain 3 dakika sonra hala eski icerik veya 404 veriyorsa manuel direct upload kullan:

```powershell
npm run build
npx wrangler pages deploy dist --project-name tupbebek --branch main --commit-hash <commit> --commit-message "<message>"
```

5. Manuel deploy sonrasinda tekrar su uc kontrolu yap:

```powershell
Invoke-WebRequest https://tupbebek.com/makaleler/<slug>/ -UseBasicParsing
Invoke-WebRequest https://tupbebek.com/sitemap-0.xml -UseBasicParsing
Invoke-WebRequest https://tupbebek.com/<hub>/ -UseBasicParsing
```

## Not

Su an icin Cloudflare dashboard ayarini degistirmek yerine deploy sonrasi canli dogrulama yeterli gorunuyor. Eger ayni gecikme sonraki 2-3 commit'te tekrar eder ve 3 dakikadan uzun surerse Git entegrasyonu yerine GitHub Actions + Wrangler direct upload hattina gecmek daha kalici cozum olabilir.
