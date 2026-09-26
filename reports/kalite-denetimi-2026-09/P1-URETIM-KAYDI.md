# P1 görsel üretim kaydı — 2026-09-26

- **Onay:** Dr. Aksoy, 2026-09-26. Hem sahne listesi (`P1-SAHNE-LISTESI.md`) hem hero standardına çeşitlilik eki onaylandı.
- **Üretici:** Higgsfield, model `gpt_image_2_5`, kalite `high`, çözünürlük `2k`, oran 16:9. Ham çıktı 2688×1520 PNG.
- **Maliyet:** 11 × 2,75 = 30,25 kredi. Yeniden üretim gerekmedi.
- **İşleme:** sharp ile ortadan `cover` kırpma, WebP q83 / effort 6. Kapaklar 1600×900, gövde görselleri 1200×675. Dosya adları ve URL'ler değişmedi.

## Görseller

| # | Dosya (`public/images/`) | Higgsfield job | Boyut | Yeni alt metin |
|---|---|---|---|---|
| 1 | `makaleler/hiperprolaktinemi-ve-kisirlik.webp` | 765c5faa-8975-46d3-8057-fa825f950976 | 1600×900, 105 KB | Lacivert raflı eczanede eczacıdan küçük bir ilaç kutusu teslim alan kısa kırçıl saçlı kadın |
| 2 | `makaleler/miyomlar-ve-tup-bebek.webp` | fadac156-5ff4-480b-b2f4-c20a8b4f8a62 | 1600×900, 88 KB | Ameliyat öncesi mint rengi steril örtü üzerine histeroskopi aletlerini dizen eldivenli eller |
| 3 | `makaleler/endometriyal-scratching.webp` | 3cf9c1a2-8e96-4725-8c98-b0332e2501b0 | 1600×900, 99 KB | Danışma masasında steril paketli ince bir endometrium kateteri; karşısında hekime soru soran gözlüklü erkek ve yanındaki kadın |
| 4 | `makaleler/kimyasal-gebelik.webp` | 2e78b70a-3567-42b2-a91c-306a3437cbaf | 1600×900, 123 KB | Kolunda kan tahlili sonrası pamuk bant bulunan bir kadının sabah ışığında mutfak masasında tuttuğu ince belli çay bardağı |
| 5 | `makaleler/tup-bebek-sureci-rehber.webp` | eece181d-c451-4563-83df-86d13821d355 | 1600×900, 80 KB | Mint duvarlı klinik koridorunda yan yana yürüyen orta yaşlı çift; erkeğin elinde ilaç soğutma çantası |
| 6 | `makaleler/vajinal-mikrobiyom-fiv.webp` | 7b6e8cb0-182b-4774-b1d0-5ea56e701293 | 1600×900, 88 KB | Mikrobiyoloji laboratuvarında agar plağındaki bakteri kolonilerini ışığa tutarak inceleyen gri saçlı mikrobiyolog |
| 7 | `library/hastalik/dusuk-amh.webp` (`/hormon-paneli/` hero) | f901cdc9-665f-432d-abbc-c83a17eecda9 | 1600×900, 54 KB | Lacivert laboratuvar tezgâhında farklı renk kapaklı kan tüplerini rafa dizen eldivenli eller |
| 8 | `rehberler/hormone-tracking.webp` | 66ea3ddc-e589-4138-899d-98c95d008702 | 1200×675, 44 KB | Otomatik hormon analiz cihazına kan tüplerini yerleştiren laborant |
| 9 | `library/hastalik/prolakktin.webp` | f7bea882-711e-416c-a5c8-de9bc1bec93b | 1200×675, 58 KB | Kan alma öncesi bekleme alanında sakin biçimde dinlenen başörtülü kadın |
| 10 | `library/tedavi/post_transfert.webp` | 73ab52c1-ac6d-4531-8e1b-162964003a83 | 1200×675, 63 KB | Terracotta tonlu mutfak tezgâhında haftalık ilaç düzenleyici ve bir bardak su |
| 11 | `library/tedavi/intralipides.webp` | 424e661f-5113-4520-b0b8-2bf1579e144b | 1200×675, 49 KB | Mint tezgâhta kapaklı enjeksiyon kalemini hazırlayan erkek elleri; yanında alkollü pamuk paketi ve atık kutusu |

Promptlar, `P1-SAHNE-LISTESI.md` sahnelerinin İngilizce karşılığı. Her birinde "okunabilir yazı, rakam, logo yok; bebek, hamilelik, ultrason, acı yok" kısıtı açıkça yazıldı.

## Kontroller

- **Görsel kontrol:** 11 görselin tamamı tam çözünürlükte incelendi. Okunabilir yazı, rakam veya logo yok; bebek, hamilelik ya da stres öğesi yok. Yüzü görünen 6 kişinin hepsi farklı, 5 sahne yüzsüz.
- **Alt metinler:** Görsele bakılarak yazıldı. Hub sayfalarındaki figcaption'lar alt metinle aynı cümleyle güncellendi ve "Yapay zekâ ile üretilmiş temsili görsel" notu korundu.
- **Build ve ön kontrol:** `npm run build` exit 0; `prebuild` başka dosya değiştirmedi. `npm run verify:preflight` 24/24 PASS.
- **Önizleme:** Yerel `dist` önizlemesi 1366 px genişlikte kontrol edildi.
  - `/hormon-paneli/`: hero 4:5 kırpmada tüp rafı ortada ve eksiksiz. FSH ve prolaktin görselleri yerinde.
  - `/ilac-rehberi/`: enjeksiyon kalemi görseli yerinde.
  - Makale sayfası: `-w1280` türevinin yeni görselden yeniden üretildiği görüldü.

## Bu turda bulunan, kapsam dışı sorunlar
1. **`/ilac-rehberi/` hero'su bozuk:** `library/tedavi/ivf_tedavi_sureci.webp` 1080×281 boyutunda yatay, renkli bir infografik. 4:5 hero kutusunda ortasından kırpıldığı için yalnızca "…EK TEDAVİ S…" parçası ve dağınık rakamlar görünüyor. İnfografiğin kendisinde de "Gün: 3-7" ve "Gün: 8-11" ikişer kez yazılmış.
2. **`/ilac-rehberi/` alt metin uyumsuzlukları:** `duo-stim.webp` "Gonadotropin enjeksiyonu", `prp.webp` "GnRH analogları", laboratuvar oosit görseli "Tetikleme enjeksiyonu" olarak etiketlenmiş. Sistematik alt metin denetimi önerisini güçlendiriyor.

## Yayın
Deploy yapılmadı. PR birleştirildikten ve Dr. Aksoy onay verdikten sonra `npm run deploy` çalıştırılmalı. Ardından değişen 11 master dosya ile `generated/` altındaki türevleri için Cloudflare Custom Purge yapılmalı.
