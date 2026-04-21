# Mevzuat/Etik QA Turu - 2026-04-14

## Kapsam
- Taranan alanlar: `src/pages`, `src/content/articles`, `src/pages/api`
- Odak: TTB + 12 Kasim 2025 yonetmelik acisindan riskli dil kaliplari
- Yontem: `rg` ile otomatik tarama + manuel triage

## Ozet
- Taramada cok sayida "en iyi/garanti/fiyat/maliyet" gecisi bulundu.
- Tum gecisler ihlal degil; bir kismi "garanti verilmez" veya bilimsel baglamda kullanilmis.
- Asagidaki maddeler duzeltme/backlog adayi olarak ayrildi.

## Oncelikli Bulgular

1. `P1` - Promosyon dili (`ucretsiz`, `indirim`) e-kitap akisinda
- Dosya: `src/pages/e-kitap-indir.astro`
- Satirlar: 7, 20, 176, 254, 258
- Not: "ucretsiz e-kitap" ve "e-kitap indirimi" ifadesi tanitim dili riski tasiyor.

2. `P1` - API donus mesajinda "indirimi" ifadesi
- Dosya: `src/pages/api/ebook-subscribe.ts`
- Satir: 116
- Not: "E-kitap indirimi baslatildi." yerine tarafsiz dil onerilir.

3. `P1` - "En iyi doktor/merkez" framing ve fiyat bolumu
- Dosya: `src/content/articles/istanbul-tup-bebek-doktoru.mdx`
- Satirlar: 3, 55, 60, 93, 205, 207
- Not: Ustunluk iddiasi algisi ve fiyat anlatimi birlikte risk olusturuyor.

4. `P1` - "En iyi merkez" framing
- Dosya: `src/content/articles/iyi-tup-bebek-merkezi.mdx`
- Satirlar: 3, 70, 121, 126
- Not: Baslik/icerik tonu "karsilastirmali ustunluk" algisi verebilir.

5. `P1` - Acik fiyat bandi ve kur cevirimi
- Dosya: `src/content/articles/era-testi-iluzyon.mdx`
- Satirlar: 3, 309, 311, 318, 334, 336
- Not: Bilimsel elestiri baglami bulunsa da net fiyat bandi ve TL cevirisi riskli.

## Orta Oncelik Bulgular

1. `P2` - "en iyi cevabi verir" ifadesi
- Dosya: `src/pages/basari-oranlari.astro`
- Satir: 198

2. `P2` - "Hasta Deneyimleri" basligi
- Dosya: `src/content/articles/endoskopik-cerrahi-histeroskopi.md`
- Satir: 123
- Not: Hasta yorumu/hikaye alanina kayma riski.

## Uyum Kontrolu - Pozitif Gozlem
- `src/pages/makaleler/[...slug].astro` icinde `MedicalDisclaimer` kullanimi mevcut.
- `src/pages/fertilite-koruma.astro` icinde `MedicalDisclaimer` kullanimi mevcut.

## Onerilen Sonraki Adimlar
1. E-kitap akisinda promosyon dili temizligi (P1)
2. Iki "en iyi" odakli makalenin dilinin tarafsizlastirilmasi (P1)
3. Fiyat odakli bolumlerin "genel maliyet faktorleri" seviyesine cekilmesi (P1)
4. "Hasta deneyimi" baslik/pattern temizligi (P2)
