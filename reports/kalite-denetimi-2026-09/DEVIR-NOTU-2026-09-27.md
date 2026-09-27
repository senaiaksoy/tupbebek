# Devir Notu — Kalite Denetimi 2026-09

Hazırlanma: 27 Eylül 2026 (Claude Code oturumu `ec16a008`)
Kapsam: Hakan Köyağası eleştirisiyle başlayan okur-gözü kalite denetimi, 25–27 Eylül 2026 çalışmaları.

> **Güncel durum — 27 Eylül 2026:** Tasarım tur 1 #207 ve tur 2 #208–#210 tamamlandı, canlıda doğrulandı. İlk devirdeki §1/§3 durumları aşağıda tarihsel kayıt olarak korunur; #206 da canlıda. Güncel yayın kanıtı `TASARIM-TUR-2-YAYIN-KANITI.json`, sonuç raporu `TASARIM-TUR-2.md`.
>
> **Sıradaki işler:** Erişilebilirlik denetimi yapıldı; `ERISILEBILIRLIK-KALAN-BULGULAR-2026-09-27.md` içindeki dar teknik düzeltmeler ayrı kapsam/onayla ele alınabilir. Hakan Bey’in tam listesi geldiğinde triage; ~10 Kasım GSC karşılaştırması. URL/title/meta description/H1 dondurması devam eder.

## 1. Durum özeti

- 25–27 Eylül arasında PR #179–#206 birleşti. Her birleştirme Dr. Aksoy'un sohbetteki açık onayıyla yapıldı.
- Tıbbi içerik PR'larında birleştirme, Dr. Aksoy'un tıbbi onayı sayılır ve PR metninde bu yazılıdır.
- #205'e kadar her şey canlıda doğrulandı.
- **#206 deploy'u bu not yazılırken sürüyordu.** Cloudflare Pages check'i 04:12 UTC'de başladı; 04:21 UTC'de hâlâ `in_progress`, canlı başlık hâlâ eski. İlk iş olarak doğrulayın (bkz. §4).
- Açık PR yok. `main` temiz; yalnızca yerel `tmp/` betikleri, `.claude/*` ve `public/search-index.json` değişikliği var (commit edilmeyecek).

## 2. Bu oturumda yapılanlar

| PR | Konu | Durum |
|---|---|---|
| #192 | İlaç rehberi ve tanı süreci yeniden yazıldı, klinik CTA'lar kaldırıldı | Canlıda |
| #193 | Hub sayfalarında çelişki ve tıbbi hatalar | Canlıda |
| #194 | Makalelerden "hastalarımız"; build kuralı eklendi | Canlıda |
| #195 | 9 hub'a kaynak (`ReferenceList` + `<sup>[n]</sup>`) | Canlıda |
| #196 | İkon fontu alt kümesi (315 KB → 20 KB) | Canlıda |
| #197 | İzleme parametresi temizliği yalnız sayfalarda; font sürüm parametresi `?rev=` | Canlıda |
| #198 | 404 yönlendirmeleri: büyük→küçük harf 301 + 28 yazım hatası takma adı | Canlıda, 28/28 |
| #199 | beta-hCG: "transferin N. günü" bölümü | Canlıda |
| #200 | Transfer sonrası bakım: kanama ve eğilip kalkma bölümleri | Canlıda |
| #201 | Kimyasal gebelik: sadeleştirme, belirtiler, sıklık | Canlıda |
| #202 | PMOS: "neden olur" bölümü | Canlıda |
| #203 | Akraba evliliği | Canlıda |
| #204 | Fertilite koruma: **yasal hata düzeltmesi** (ÜYTE Yön. Md. 20) | Canlıda |
| #205 | Miyom: "Gebelikte miyom" bölümü | Canlıda |
| #206 | Transfer sonrası: başlık "…Dikkat Edilmesi Gerekenler" + kısa liste | Canlıda (04:27 UTC) |

Ayrıca:
- GSC başlangıç ölçümü: `GSC-BASELINE-2026-09-26.md`.
- Masaüstü sıralaması incelendi. Teknik bir ceza yok: aynı sorguda masaüstü ile genel pozisyon farkının medyanı 0,0 (n=309). Fark sorgu karışımından geliyor. Masaüstü gösterimleri ticari/klinik niyetli sorgulardan oluşuyor ("tüp bebek fiyatları", "istanbul tüp bebek"); portal bunları hedeflememeli.
- Okur testi planı hazırlandı, ancak Dr. Aksoy testi yapmamaya karar verdi; plan sayfası 27 Eylül 2026'da silindi.

## 3. Sıradaki işler (öncelik sırasıyla)

1. **#206 canlı doğrulaması** (§4'teki komut).
2. **Okur testi yapılmayacak** (Dr. Aksoy kararı, 27 Eylül 2026). Plan sayfası silindi; yeniden önerilmemeli.
3. **Hakan Bey'in tam hata listesi** henüz gelmedi. Gelince `BULGULAR-asama-1.md` ile eşleştirilip triage edilecek.
4. **GSC yeniden ölçümü ~2026-11-10.** Aynı filtreyle (Web, son 3 ay) dışa aktarım istenecek; 28 günlük önce/sonra karşılaştırması yapılacak. Beklenen yakın fırsatlar:
   - "fertilite koruma" (p11,9)
   - "gebelikte miyom" (p15)
   - "embriyo transferi sonrası" (p20)
   - beta-hCG gün sorguları
5. **Dondurma dönemi (Aşama 5):** 6–8 hafta boyunca URL/H1/title'a dokunulmaz. Yalnızca Hakan listesindeki kritik bulgular düzeltilir.
6. **Küçük açıklar:**
   - Küçük a11y bulguları: başlık seviyesi atlama, 11px etiketler, satır içi küçük dokunma alanları.
   - Boş artık klasör `D:\A-klas%C3%B6r\tupbebek\scripts\fonts` elle silinmeli. Güvenlik denetimi silmeyi engelledi.

## 4. Doğrulama komutları

#206 deploy durumunu kontrol etmek için:

```bash
gh api repos/senaiaksoy/tupbebek/commits/9c30261c/check-runs --jq '.check_runs[0] | "\(.status) \(.conclusion)"'
```

Canlı sayfayı doğrulamak için:

```bash
curl -s "https://tupbebek.com/makaleler/embriyo-transferi-sonrasi-bakim/?c=$RANDOM" | grep -o -e "<title>[^<]*" -e "Dikkat Edilmesi Gerekenler: Kısa Liste"
```

Beklenen: başlıkta "Embriyo Transferi Sonrası Dikkat Edilmesi Gerekenler" geçmeli ve kısa liste başlığı bulunmalı.

Deploy `failure` olursa Cloudflare Pages panelinden log okunmalı. En olası iki neden:
- `verify-content-quality` kuralı
- `public/search-index.json` dosya kilidi (Windows yerel build'de görüldü; yeniden deneme çözüyor)

## 5. Kurallar ve tuzaklar (yeni oturum için)

- **Onay:** Her merge/deploy için Dr. Aksoy'un o PR'a özel açık onayı gerekir. Önceki onay sonraki PR'a geçmez.
- **Makale işi:** Önce stil rehberi okunur (`…\wiki\brand\senai-aksoy-makale-stil-rehberi.md`) ve yanıt "Stil rehberi okundu: Dr. Senai Aksoy Makale Stil Rehberi" ile başlar.
- **Tarih ve inceleme alanları:** Yalnız gerçekten yapılan inceleme ve Dr. Aksoy’un gerçek onayı kaydedilir. Teknik veya görsel bakım işlemi tıbbi inceleme/onay olarak gösterilmez; reviewDate, reviewScope ve uzman katkısı uydurulmaz.
- **Kaynaklar:**
  - PMID tahmin edilmez; PubMed üzerinden doğrulanır.
  - NCBI araması çökerse Europe PMC REST ile aranır, sonra PubMed `get_article_metadata` ile doğrulanır.
  - Hub sayfalarındaki PMID'leri `verify-reference-pmids` taramaz; elle doğrulanmalı.
- **YAML:** Frontmatter'da çift tırnaklı alan içinde düz `"` kullanılmaz (YAML kırılır); tipografik “ ” kullanılır.
- **Build:**
  - Çıkış kodu kontrol edilir; preflight eski `dist` ile yanlışlıkla geçebilir.
  - Main'e merge = Cloudflare Git auto-build = production deploy. Build zinciri `verify-content-quality` ve `verify-icon-font` içerir.
- **Yönlendirmeler iki yerde:** `scripts/postbuild-seo.mjs` (worker sarmalayıcı) ve `src/middleware.ts`. Yazım hatası takma adları `src/utils/routeAliases.mjs` içinde. Yerel test: `npx wrangler pages dev dist` (takılı port varsa yeni port).
- **İkon fontu:** Yeni ikon eklenirse `npm run build && npm run icons:subset` (fonttools gerekir). `/fonts/*` 1 yıl immutable.
- **Görseller:** Aynı adla değiştirilen görsel için Cloudflare Custom Purge gerekir.
- **Canlı kontrol:** tupbebek.com tarayıcı araçlarında engelli; `curl` + `?c=$RANDOM` kullanılır.
- **Erişim yasakları:**
  - GSC/Google kimlik bilgisi dosyaları (`~/.config/claude-seo/*`) okunmaz.
  - Semrush MCP'de API birimi yok.
- **Git Bash:** "/" argümanları için `MSYS_NO_PATHCONV=1` gerekir.
- **Bağımsızlık:** Klinik CTA, fiyat, "en iyi/garanti", hasta hikâyesi ve bebek görseli yasak. Dr. Aksoy'un klinik sitelerine link verilirse nofollow ve kariyer notu tonunda olmalı.
- **Terim:** Gezinme ve başlıklarda "kısırlık"; `<title>`/meta, URL ve gövde metninde "infertilite" kalabilir.

## 6. İlgili dosyalar

- Bulgular: `BULGULAR-asama-1.md` (11 P0, 11 P1, 3 P2)
- GSC tabanı: `GSC-BASELINE-2026-09-26.md`
- Alt metin denetimi: `ALT-METIN-DENETIMI.md`
- Okur-gözü kontrol listesi: `docs/OKUR-GOZU-KONTROL-LISTESI.md`
- Tam tarama betiği: `tmp/_fa_report.mjs`; performans: `tmp/_perf.mjs`
- Hafıza: `quality-audit-2026-09`, `gsc-baseline-2026-09`

- **2026-09-27 tasarım tur 1:** [PR #207](https://github.com/senaiaksoy/tupbebek/pull/207), `claude/tasarim-tur-1` / `e19d3cb2`: arama (HeroSearch + Instagram), footer çerez tercihleri, 6 hub'ın nötr rozeti ve 2 makalenin yalnız görüntülenen kısa cevap öneki düzeltildi; build 0, preflight 26/26, 390/1366 px önce/sonra ve 101 sayfada URL/title/meta description/H1 korunması doğrulandı. Rapor: `TASARIM-TUR-1.md`. **Dr. Aksoy'un bu sohbetteki “onay”ıyla 04:54 UTC'de birleşti (`f3d55cc8`); Cloudflare production `5db3e0af-a649-4675-8471-97e61b5b3d37` ve güncel check-run `108555061143` 05:03:14 UTC'de başarılı. 05:05 UTC'de curl + benzersiz `?c=` + no-cache ile 11/11 canlı sayfa doğrulandı: ana sayfada “Öne Çıkan Başlıklar”, 6 hub'da “Tıbbi Rehber”, beta-hCG/kimyasal gebelikte yalnız görünür kısa cevap tekrarının kalkması, footer çerez tercihleri ve URL/title/meta description/H1 korunması. Kanıt: `output/playwright/tasarim-tur-1/live/verification.json` ve `check-runs.json`.**

- **Tasarım tur 2 devri (hazırlandı, başlamadı):** `TASARIM-TUR-2-DEVIR.md` — tipografi/özet kutusu birliği, makale üstü sadeleştirme, ana sayfa + kart görselleri + masaüstü menü. Başlama kapısı: ~2026-11-10 GSC ölçümü veya Dr. Aksoy'un açık erken başlama kararı.

- **2026-09-27 tasarım tur 2 başladı:** §0 seçenekleri sunulduktan sonra Dr. Aksoy “şimdi başla” dedi; GSC ölçümünü beklemeden ilerleme kararı kaydedildi. PR-A için 390/1366 px Playfair Display ve Inter karşılaştırmaları hazırlandı; başlık ailesi seçimi bekleniyor. Uygulama kodu/commit/PR/deploy henüz yok; her PR birleşmesi için ayrı onay gerekecek. Rapor: `TASARIM-TUR-2.md`.

- **2026-09-27 tasarım tur 2 / A:** Dr. Aksoy “b” ile Inter seçti. [PR #208](https://github.com/senaiaksoy/tupbebek/pull/208), `codex/tasarim-tur-2-a` / `99c90501`: Inter/Manrope token birliği, H1 vurgu stili, ortak Kısa cevap kutusu ve fertilite-koruma/varikosel İçindekiler etiketi; eski varikosel çapası korundu. Build 0, preflight 26/26, 101 sayfada URL/title/meta/canonical/H1 aynı; 390/1366 px statik önce/sonra ve 3 ölçüm medyanı LCP/CLS raporda. 4 hedefte LCP iyileşti; beta-hCG ilk gövde paragrafı 1235 → 1268 px (44 px kaynak bağlantıları). PR **açık, birleşmedi; bu PR'a özel “onay” bekleniyor**. Ardından Cloudflare/güncel check-run/curl doğrulaması ve PR-B; PR-C görsel kararı örneklerle ayrıca alınacak. Rapor: `TASARIM-TUR-2.md`.

- **2026-09-27 tasarım tur 2 / A canlı, B PR hazır:** Dr. Aksoy’un #208’e özel “onay”ıyla 06:42:34 UTC merge `b391d20d`; Cloudflare production `tupbebek` / `16db12ce-b12c-4b41-bb02-a2e51da7b832`, güncel check-run `108568699806` 06:46:18 UTC success. 6/6 hedef cache-bypass curl ile doğrulandı. [PR-B #209](https://github.com/senaiaksoy/tupbebek/pull/209), `codex/tasarim-tur-2-b` / `637801f4`: iki bilgi satırında künye, küçük kanıt rozeti, mobil 128 px hero, 32 makalede responsive manuel İçindekiler; build 0/preflight 26/26, 101 SEO kimliği/63 tıbbi gövde+şema korundu. Beta-hCG ilk paragraf 1268→1133 px, LCP 2020→1996 ms, CLS .0036→.0012. Varikosel ilk normal paragraf 1511 px: 1,5 ekran hedefi bu sayfada sağlanmıyor. #209 açık; bu PR’a özel onay bekleniyor, production deploy yapılmadı. PR-C görsel kararı örneklerle ayrı alınacak. Rapor: `TASARIM-TUR-2.md`; kanıt `output/playwright/tasarim-tur-2-b/`.

- **2026-09-27 tasarım tur 2 / B canlı, C kart kararı:** #209’a özel kullanıcı “onay”ıyla 07:28:11 UTC merge `56a996aa`; Cloudflare `tupbebek` production `639a608c-f952-47ec-968c-edf97f993fdb`, güncel check-run `108575122326` 07:31:29 UTC success. 6/6 canlı hedef curl + benzersiz c/no-cache ile SEO, yeni künye/rozet/hero/İçindekiler ve JSON-LD doğrulandı. PR-C dalı `codex/tasarim-tur-2-c`; 390/1366 px kart seçenekleri hazır ve kullanıcıya soruldu (1 ikon+metin, 2 sade çizim, 3 fotoğrafları koru). Kod uygulaması henüz yok; kart kararı bekleniyor. Mobil ana sayfa 19795 px; alfabetik arşiv5625 px. Rapor `TASARIM-TUR-2.md`, canlı kanıt `output/playwright/tasarim-tur-2-b/live`, seçenekler `output/playwright/tasarim-tur-2-c/options`.

- **2026-09-27 tasarım tur 2 / C PR hazır:** Dr. Aksoy “3 tercih ediyorum” ile fotoğrafları korumayı seçti. [PR #210](https://github.com/senaiaksoy/tupbebek/pull/210), `codex/tasarim-tur-2-c` / `a330139d`: mobil ana sayfa19795→11906 px; dört güven etiketi tek şerit, arşiv/SSS açılır, güncel kartlar kompakt, yayın kurulu+metodoloji tek bölüm; fotoğraflar ve tüm metin/link/şema korundu, kadın kartına temsili görsel notu eklendi. 1280/1366/1440 menü tek satır; build0/preflight26/26; 101 SEO kimliği/63 tıbbi kaynak aynı. LCP2332→2364ms, CLS.0036→.0036. PR açık, production deploy yok; #210’a özel “onay” bekleniyor. Rapor `TASARIM-TUR-2.md`, kanıt `output/playwright/tasarim-tur-2-c/`.

- **2026-09-27 tasarım tur 2 / C canlı, tur tamamlandı:** Dr. Aksoy’un #210’a özel “onay”ıyla PR #210 09:28:29 UTC’de birleşti (`29a316a1`); Cloudflare production `tupbebek` / `69be4da2-20de-416f-a8cf-59d0f79f90d8`, güncel check-run `108592950663` 09:31:15 UTC success. 09:32:48 UTC’de 6/6 canlı hedef benzersiz c/no-cache curl ile SEO kimliği, mevcut metin/link/görsel/JSON-LD ve yeni ana sayfa düzeni bakımından doğrulandı; fotoğraflar korundu, yalnız kadın kartına temsili görsel notu eklendi. Mobil ilk durum 19795→11906 px; build 0/preflight 26/26 ve 101 sayfa SEO/63 makale kaynak koruması önceki yerel kontrollerde geçti. PR-A #208, PR-B #209, PR-C #210 canlıda. Rapor `TASARIM-TUR-2.md`; canlı kanıt `output/playwright/tasarim-tur-2-c/live/`. Yayın sonucu yerel rapor/devir ve hafıza notuna eklendi.

- **2026-09-27 erişilebilirlik / dokunma alanları:** #212 belgeleme kapanışı canlıda; kullanıcı “devam” dedi. `codex/erisilebilirlik-hedef-alanlari` dalında ReferenceList kaynak bağlantıları 24→44 px, ilaç hızlı gezinme 36→44 px; e-kitap SSS başlığının iç boşluğu tıklanabilir (74–101 px), kart ölçüleri aynı. Build 0/preflight 26/26; 101 SEO/metin/link/görsel/JSON-LD ve 63 makale kaynakları korundu. 78 sayfada 998 kaynak bağlantısı mobilde ≥44×44 px; 390/1366 px 7 hedef, klavye/Space/Enter ve SSS tıklama geçti. Ana sayfa mobil 11906 px aynı; kaynak bölümleri büyüdü, ilk paragraf konumları aynı. Rapor `ERISILEBILIRLIK-HEDEF-ALANLARI-2026-09-27.md`; ayrı PR onayı bekleniyor. Başlık semantiği/küçük fontlar sonraki paketler.
