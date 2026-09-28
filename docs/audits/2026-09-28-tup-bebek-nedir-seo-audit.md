# Tüp Bebek Nedir? — beşinci audit: metin + SEO (seo-audit skill)

Tarih: 28 Eylül 2026. Hedef: `https://tupbebek.com/makaleler/tup-bebek-nedir/` (canlı, PR #227 sonrası).
Kapsam: tek sayfa derin audit. `seo-audit` skill'inin kategorileri ve ağırlıkları bu sayfaya uygulandı; site geneli bulgular yalnızca bu sayfayı etkilediği ölçüde raporlandı. 500 sayfalık tarama ve alt ajan dağıtımı yapılmadı. Salt okunur: makale ve kod değiştirilmedi.

## SEO Sağlık Skoru: 84 / 100

| Kategori | Ağırlık | Puan | Gerekçe |
| --- | --- | --- | --- |
| Teknik SEO | %22 | 92 | İndekste, canonical eşleşiyor, HSTS/CSP/nosniff var, robots açık; bir iç bağlantı 301 atlıyor |
| İçerik kalitesi | %23 | 85 | E-E-A-T güçlü, 33 atıf, hekim katkısı; iki cümlede anlam/mantık pürüzü |
| Sayfa içi SEO | %20 | 70 | Başlık/açıklama iyi; hub sayfası gövdeden bağlanmıyor, hub ile niyet çakışması |
| Şema | %10 | 88 | Article + MedicalWebPage + Breadcrumb, yazar @id, reviewedBy, 33 citation; `lastReviewed` boş |
| Performans | %10 | 85 | Lab mobil 96, LCP 2,4 sn (sınıra yakın); saha (CrUX) verisi alınamadı |
| AI arama hazırlığı | %10 | 90 | AI botlarına açık, llms.txt 200, BLUF ve iddiaya bitişik kaynaklar |
| Görseller | %5 | 80 | Alt metinler ve ölçüler tam; gövde görsellerinde responsive srcset yok |

Tür: Bağımsız tıbbi yayın portalı (YMYL, bilgilendirici makale). Yerel işletme/e-ticaret değil; local/maps/ecommerce ajanları uygulanmadı.

## Kullanılan veri

- Canlı HTML (`fetch_page.py` + `parse_html.py`): başlık 56 karakter, açıklama 145, 1 H1, `lang="tr-TR"`, 10 görsel (eksik alt yok), 187 iç / 104 dış bağlantı, 5 JSON-LD düğümü.
- Google Search Console URL Inspection: `Submitted and indexed`, robots ALLOWED, son tarama 26 Eylül 2026 (mobil), Google canonical = kullanıcı canonical, rich results PASS (Breadcrumbs, Image metadata).
- GSC Search Analytics, son 90 gün (sorgu × sayfa). Veri çoğunlukla bugünkü güncellemeden önceki sürümü yansıtır.
- Lighthouse 12, yerel, mobil (MCP ve PSI kotası çalışmadığı için). CrUX için API anahtarı yok; saha verisi yok.
- robots.txt, llms.txt, güvenlik başlıkları, 301 kontrolü, hub HTML'i.
- Alınamayan: CrUX saha verisi, Moz DA/PA, SERP rakip analizi (DataForSEO yok), drift baseline (kayıt yok).

## Arama performansı (GSC, 90 gün)

Toplam: 43 sorgu, **557 gösterim, 0 tıklama**.

| Sorgu | Gösterim | Ort. sıra | Yorum |
| --- | --- | --- | --- |
| fertility ne demek | 304 | 10,5 | En büyük fırsat; sayfada “fertilite” tanımı yok |
| ivf nedir | 42 | 60,7 | `/ivf-rehberi/` de aynı sorguda (47 gösterim, sıra 55) |
| tüp bebek takvim | 31 | 9,3 | Asıl hedefi süreç rehberi olmalı |
| tüp bebek nedir | 22 | 71,4 | Ana sorgu; çok geride |
| tüp bebek çeşitleri | 13 | 4,4 | İlk sayfa; tıklama yok |
| tüp bebek | 13 | 89,3 | Hub (227 gösterim, sıra 49) ve ana sayfa (163, sıra 40) ile paylaşılıyor |

Anlamı: Sayfa, adındaki ana sorguda (“tüp bebek nedir”) görünür değil. Aynı niyet `/ivf-rehberi/` hub'ı ve ana sayfa arasında bölünüyor; hub bu makaleye gövdeden bağlanmıyor.

## Bulgular — öncelik sırasıyla

### Yüksek

**H1. Hub → makale bağlamsal iç bağlantısı yok.** Breadcrumb makaleyi “IVF Rehberi” altına koyuyor; `/ivf-rehberi/` sayfası makaleye yalnızca menüden bağlanıyor. GSC'de bu URL'ye yönlendiren tek sayfa `era-testi-bas-editor-kosesi`. Hub gövdesine “Tüp bebek nedir?” sorusunu tanımlayan bir cümle içi bağlantı eklenmeli.

**H2. Hub ile niyet çakışması.** Makale H1'i “…Nasıl Yapılır?”, hub başlığı “Tüp Bebek (IVF) Nasıl Olur? Adım Adım Rehber”. İkisi “ivf nedir” ve “tüp bebek” sorgularında yarışıyor. Rol ayrımı önerisi: makale = tanım + kimlere uygulanır + karar; hub = adım adım süreç. Makalenin süreç bölümünün hub'a (ve süreç rehberine) açıkça yönlendirmesi; hub'ın “nedir” sorusunu makaleye bırakması. Başlık değişikliği yapılacaksa önce GSC'de 4–6 haftalık yeni veri beklenmeli.

### Orta

**M1. “fertility ne demek” fırsatı (304 gösterim, sıra 10,5).** “Kimlere uygulanır?” bölümündeki WHO infertilite tanımının yanına “fertilite (doğurganlık)” için tek cümlelik tanım doğal biçimde eklenebilir. Alternatif: tıbbi sözlükte fertilite maddesi ve oraya bağlantı. Anahtar kelime doldurma yapılmamalı.

**M2. `/tedavi-yontemleri` iç bağlantısı 301 atlıyor.** [tedavi-yontemleri.astro:17](../../src/pages/tedavi-yontemleri.astro) ve `:167` `/makaleler/tup-bebek-nedir` (sonda `/` yok) kullanıyor; canlıda 301 → `/makaleler/tup-bebek-nedir/`. Site kuralı trailing slash istiyor.

**M3. İçerik — PGT-M cümlesinde koşul kayboldu (önceki turdaki bölmeden).** Satır 308: “Çiftte … genetik varyant ve embriyoya aktarım riski bulunabilir. Test teknik olarak da mümkünse … gündeme gelebilir.” İlk cümle koşul değil olasılık bildirimi gibi okunuyor. Öneri: “PGT-M, çiftte hastalıkla ilişkisi doğrulanmış bir genetik varyant ve embriyoya aktarım riski olduğunda gündeme gelir; testin teknik olarak mümkün olması da gerekir.”

**M4. İçerik — AMH cümlesinde bağlaç mantığı zayıf.** Satır 307: “AMH … yanıtı öngörmeye yardımcı olur. Bu nedenle yaş, … birlikte yorumlanır.” Neden-sonuç ilişkisi kurulmuyor. Öneri: “Bu yüzden tek başına değil; yaş, … ile birlikte yorumlanır.”

**M5. Kontrast (WCAG AA) — site geneli, bu sayfada da.** Mobil alt menü etiketleri `#9ca3af` / beyaz, 10 px, oran 2,53 ([Header.astro:94-110](../../src/components/Header.astro)). Kaynakça numaraları `#6b7280` / `#f3f4f6`, oran 4,39 ([ReferenceList.astro:57](../../src/components/ReferenceList.astro)). Lighthouse erişilebilirlik 97'yi bu düşürüyor.

**M6. LCP 2,4 sn (lab), sınıra yakın.** LCP öğesi kısa cevap paragrafı; font yüklemesine bağlı olabilir. Hafızadaki Haziran teşhisinde site geneli LCP saha verisi kırmızıydı. CrUX API anahtarı eklenirse saha doğrulaması yapılmalı. Lighthouse ayrıca ~69 KB kullanılmayan JS ve ~14 KB CSS bildiriyor.

### Düşük

- **L1. Gövde görsellerinde srcset yok.** Süreç görseli mobilde 1200 px iniyor; Lighthouse ~60 KB tasarruf öngörüyor. Hero'da srcset var; gövde `<figure>` şablonu için 600/960 varyantları eklenebilir (site geneli).
- **L2. `MedicalWebPage.lastReviewed` boş.** `reviewDate` (28 Eylül) Article `reviewedBy` içinde; MedicalWebPage düğümüne de `lastReviewed` basılabilir. Rich result etkisi yok; tutarlılık için.
- **L3. Çerez penceresi başlığı H3.** “Çerez ve Ölçüm Onayı” sayfa başlık hiyerarşisine giriyor; `<p role="heading">` veya `aria-labelledby` ile görsel başlık korunup H3 kaldırılabilir (site geneli).
- **L4. Satır 298 tekrar.** “Yani 35 yaşından sonra … 12 ayın dolmasını beklemek gerekmez.” bir önceki cümledeki 6 ay bilgisinin tekrarı; WHO tanımıyla köprüyü kuran tek cümleye indirilebilir.
- **L5. “tüp bebek takvim” (sıra 9,3) bu sayfaya düşüyor.** Süreç rehberinin başlık/açıklamasında “takvim” niyeti güçlendirilirse sorgu doğru sayfaya kayabilir.

## Değişmeyen güçlü yanlar

- İndekslenebilirlik, canonical ve robots temiz; AI tarayıcılarına açık; llms.txt var.
- Yazar kimliği `senaiaksoy.net/#person`, hekim katkısı ayrı ve tarihli, 33 atıf şemada.
- Kısa cevap + iddiaya bitişik kaynak + paydaları açıklanmış oranlar: AI alıntısı için uygun yapı.
- Başlık 56, açıklama 145 karakter; OG ve Twitter kartları tam; görsellerin hepsinde alt metin.

## Eylem planı

| Öncelik | İş | Etki | Efor |
| --- | --- | --- | --- |
| Yüksek | `/ivf-rehberi/` gövdesine makaleye bağlamsal bağlantı | İç otorite, “nedir” niyetinin doğru sayfaya gitmesi | 15 dk |
| Yüksek | Makale–hub rol ayrımı (süreç bölümünde hub'a yönlendirme; hub'da “nedir”i makaleye bırakma) | Çakışmanın azalması | 1 saat |
| Orta | “Fertilite” tanım cümlesi (veya sözlük maddesi + bağlantı) | 304 gösterimlik sorguda tıklama şansı | 15 dk |
| Orta | `tedavi-yontemleri` bağlantılarına trailing slash | 301 atlamasının kalkması | 5 dk |
| Orta | PGT-M ve AMH cümlelerinin düzeltilmesi | Anlam doğruluğu | 10 dk |
| Orta | Header/ReferenceList kontrast düzeltmesi | WCAG AA, Lighthouse 100'e yakın | 20 dk |
| Düşük | Gövde görselleri srcset, `lastReviewed`, çerez H3, satır 298 | Küçük performans/tutarlılık | 1–2 saat |
| İzleme | ~2026-11-10'da GSC yeniden ölçüm (hafızadaki baseline tarihi) | Güncellemenin etkisi | — |

Commit, push, deploy yapılmadı.

## Düzeltme kaydı (aynı gün, “hepsini düzelt”)

| Bulgu | Yapılan |
| --- | --- |
| H1 hub bağlantısı | `/ivf-rehberi/` girişine “Tüp bebek nedir?” ve “Kimlere uygulanır?” bölümünün sonuna `#kimlere` bağlamsal bağlantıları eklendi (hub → makale: menü + 2 gövde bağlantısı) |
| H2 rol ayrımı | Makalenin süreç bölümü ayrıntı için hub'a yönlendiriyor; hub tanım ve uygunluk sorusunu makaleye bırakıyor. Başlıklar değiştirilmedi (GSC etkisi izlenecek) |
| M1 fertilite | “Kimlere uygulanır?” başına tek cümlelik tanım: “Fertilite (İngilizcesi *fertility*) doğurganlık, yani gebe kalabilme yeteneği demektir.” |
| M2 301 | `tedavi-yontemleri` iki bağlantısı `/makaleler/tup-bebek-nedir/` |
| M3 PGT-M | Koşul yapısı geri kuruldu |
| M4 AMH | “Bu yüzden tek başına değil; … ile birlikte yorumlanır” |
| M5 kontrast | Mobil alt menü `gray-400`→`gray-600`, kaynakça numaraları `gray-500`→`gray-600`; denetimde ortaya çıkan footer notu `gray-500`→`gray-400` (koyu zemin). Yerel Lighthouse erişilebilirlik 97 → **100** |
| M6 LCP | İnceleme: fontlar preload + `swap`, render-blocking yok; lab LCP 2,4 sn “iyi” eşikte. Güvenli bir kod değişikliği saptanmadı; saha verisi için CrUX API anahtarı gerekli |
| L1 srcset | İki gövde görseli için 640/960 px WebP varyantları ve `srcset/sizes` (bu makale; site geneli ayrı iş) |
| L2 lastReviewed | `BaseLayout` MedicalWebPage düğümüne `lastReviewed` (tıbbi inceleme varsa); Article düğümündeki alan proje doğrulaması için korundu |
| L3 çerez başlığı | `h3` → `p#cookie-title` (dialog `aria-labelledby` korunuyor) |
| L4 tekrar | 35 yaş/12 ay tekrar cümlesi kaldırıldı; WHO ölçütü ile değerlendirme zamanlaması iki cümlede |
| L5 takvim niyeti | Süreç rehberi `seoTitle` “Tüp Bebek Süreci: Gün Gün Takvim ve Aşamalar”, açıklama “gün gün takvim” vurgulu; `lastModified` değiştirilmedi (gövde aynı) |

Doğrulama: fidelity farkları yalnızca kaldırılan tekrar cümlesi ve yeni hub bağlantısı; editoryal yardımcı 0 aday; `npm run build` başarılı; `verify:preflight` 26/26; yerel Lighthouse mobil erişilebilirlik 100, SEO 100, en iyi uygulamalar 100. Commit, push, deploy yapılmadı.
