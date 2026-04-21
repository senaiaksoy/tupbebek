# Icerik Zenginlestirme Backlog - 2026-04-14

## Hedef
- Mevzuat uyumunu guclendirirken bilimsel degeri korumak
- E-E-A-T alanlarini standartlastirmak
- Oncelikli 5 makaleyi revizyon kuyruguna almak

## Onceliklendirilmis 5 Makale

1. `src/content/articles/istanbul-tup-bebek-doktoru.mdx`
- Neden oncelik: "en iyi" framing + fiyat bolumu birlikte yuksek risk.
- Is paketi:
  - Baslik/description tarafsizlastirma
  - "en iyi" odakli cumleleri "hasta profiline uygun secim" diline cevirme
  - Fiyat rakamlarini kaldirip maliyeti etkileyen faktorler olarak genelleme
  - Son blokta tibbi bilgilendirme siniri netlestirme

2. `src/content/articles/iyi-tup-bebek-merkezi.mdx`
- Neden oncelik: ustunluk iddiasi algisi.
- Is paketi:
  - "en iyi merkez" ifadesini "uygun merkez secimi" diline cekme
  - Karsilastirma dilini olcut/kalite kriterleri eksenine tasima
  - CTA ve vurgu metinlerinde iddia seviyesini dusurme

3. `src/content/articles/era-testi-iluzyon.mdx`
- Neden oncelik: acik fiyat bandi ve kur cevirimi gecisleri.
- Is paketi:
  - Fiyat/TL cevirim bolumunu sadeleştirme veya kaldirma
  - Klinik karar mesajini "kanit duzeyi + doktor degerlendirmesi" eksenine sabitleme
  - Mevzuat notlarini son kontrol checklist'ine tasima

4. `src/content/articles/yumurta-dondurma-rehberi.mdx`
- Neden oncelik: frontmatter `references` alani eksik (otomatik kontrol sonucu).
- Is paketi:
  - Frontmatter `references` dizisini ekleme
  - Metin ici linkleri standart referans formatina map etme
  - "garanti" gecislerinde dil sadeleştirme

5. `src/content/articles/embryoscope-yapay-zeka.md`
- Neden oncelik: frontmatter `references` alani eksik + agir kapak gorseli.
- Is paketi:
  - Frontmatter `references` alanini ekleme
  - Kaynak listesini DOI/URL ile normalize etme
  - Kapak gorselini performans dostu formata tasima (webp/avif)

## Is Kurallari (Bu Backlog Icin)
- Makale govdesi kullanici onayi olmadan anlamsal olarak degistirilmez.
- Once zorunlu teknik/uyum duzeltmeleri (frontmatter, referans, ton).
- Sonra istege bagli editoryal zenginlestirme (ek tablo, FAQ, ozet kutusu).

## Final Oncesi Mecburi Teyit
Her makale icin yayina almadan once:
1. Yazar adi teyidi
2. YouTube adresi teyidi (varsa)
