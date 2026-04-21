# Performans Audit - 2026-04-14

## Kapsam
- Sayfalar: `/`, `/makaleler/`, `/sorunlar/`
- Yontem: Lokal `dist` uzerinde Puppeteer tabanli olcum
- Cikti: `.tmp/perf-audit.json`

## Olcum Sonuclari

| Sayfa | FCP (ms) | LCP (ms) | CLS | TTFB (ms) | Not |
|---|---:|---:|---:|---:|---|
| `/` | 1208 | 1208 | 0.000 | 10.6 | Genel olarak stabil |
| `/makaleler/` | 428 | 428 | 0.000 | 3.3 | Goruntu payload'i cok yuksek |
| `/sorunlar/` | 1256 | 1256 | 0.018 | 688.9 | Ilk yanit gecikmesi yuksek |

## Kaynak Boyutu Dagilimi (transfer)

| Sayfa | CSS | IMG | Font | JS |
|---|---:|---:|---:|---:|
| `/` | 100,788 B | 183,968 B | 389,392 B | 0 B |
| `/makaleler/` | 100,788 B | 21,773,220 B | 389,392 B | 0 B |
| `/sorunlar/` | 100,788 B | 134,702 B | 389,392 B | 911 B |

## Kritik Tespitler

1. `/makaleler/` sayfasinda asiri buyuk gorsel yukleniyor.
- `public/images/makaleler/embryoscope-kapak-2026.png` ~20,653 KB
- Sayfa toplam image transferi ~21.8 MB seviyesine cikiyor.

2. Font yukunun sayfa bazinda yuksek oldugu goruluyor.
- Her sayfada font transferi ~389 KB
- Preload edilen font seti tum sayfalar icin ayni.

3. `/sorunlar/` icin lokal olcumde TTFB dalgalanmasi goruldu.
- Lokal olcum oldugu icin mutlak karar degil, fakat izlenmeli.

## Onerilen Aksiyonlar

1. `embryoscope-kapak-2026.png` dosyasini webp/avif'e cevir ve boyut hedefi koy.
- Hedef: < 350 KB (hero kullaniminda).

2. Makale listingdeki one cikan gorsellerde responsive kaynak stratejisini sikilastir.
- Buyuk dosya fallback'lerini kaldir.

3. Font stratejisini optimize et.
- Sadece kritik fontu preload et, digerlerini normal yuklemeye al.
- Metrik tekrar olculsun.

4. Sonraki turda gercek Lighthouse (Perf + SEO) skoru alin.
- Bu turda `npx lighthouse` registry/izin kisitlari nedeniyle calismadi.
- Sonraki turda izinli ortamda score bazli hedefleme yapilacak.
