# P0 görsel ve metaveri düzeltme planı — onay taslağı

Tarih: 26 Eylül 2026. Dal: `codex/kalite-p0-gorsel-plani`. Durum: sahneler öneridir; henüz üretilmedi veya siteye uygulanmadı.

## Güncel kapsam

Mevcut kaynaklar ve yerel `dist` HTML içindeki gerçek `img`/`srcset` kullanımları eşleştirildi. OG metaverisi ve yalnızca bağlantı verilen sayfalar, görünür görsel kullanımına eklenmedi. Eski `dist` canlı sürümün kanıtı olarak kullanılmadı.

- Devir notundaki 16 dosyanın 14'ü mevcut yerel sayfalarda kullanılıyor.
- Vücut geliştirici kapağı (#10) ve bal kaşığı kapağı (#12) hem güncel makale görsel bağlantısında hem yerel görünür HTML'de kullanılmıyor. İkisi için talep edilen prompt kaydı aşağıda var; önerilen aktif üretim kapsamına dahil değiller. Mevcut yeni kapaklarına geri bağlanmazlar.
- `kanser-ve-fertilite.webp` de kullanılmıyor; güncel makale `kanser-ve-fertilite-hero-editorial-2026.webp` dosyasını kullanıyor. Eski dosya için P1 üretimi gerekmiyor.
- Düşük AMH makale kapağı 9, transfer sonrası bakım kapağı 6 sayfada görünüyor. Devir notundaki 8 ve 5 sayısı güncel yerel eşleşmeyle düzeltildi.
- `post_transfert.webp` ayrıca `/transfer-sureci/`; `pgt.webp` ayrıca `/genetik-testler/` sayfasında kullanılıyor. Ortak görseller iki bağlama da uygun olmalı.
- `intralipides.webp` dosya adına rağmen enjeksiyon hazırlığı bölümünde. Yeni sahne bu bölüm için hazırlanacak; intralipid önerisi ima etmeyecek.

## Okunan görsel standartları ve uygulama kararı

Üç kaynak dosya doğrudan okundu:

- `C:/Users/KC3/.claude/projects/D--A-klas-r-tupbebek/memory/hero-image-spec.md`
- `C:/Users/KC3/.claude/projects/D--A-klas-r-tupbebek/memory/body-image-spec.md`
- `C:/Users/KC3/.claude/projects/D--A-klas-r-tupbebek/memory/feedback-vogue-prop-variety.md`

Hero standardının aslı Vogue/editoryal fotoğraf dili istiyor; devir özetindeki “belgesel” ifadesiyle tam aynı değil. 26 Eylül yeniden okuma sonrası plan Vogue düzeyinde sanatsal editoryal fotoğraf, gerçek yetişkinler ve sahneler, mimari kompozisyon, yumuşak heykelsi ışık ve baskın/yarı baskın marka rengi üzerine yeniden düzenlendi. Laboratuvar ekipmanlarının tek başına sıralanması yerine konuya bağlı insan sahneleri seçildi. Yetişkin yüzünü gizleme kuralı yok; hekim yüzü ve hasta tanıklığı yasağı korunur. Sürekli kâğıt okuyan kadın, bej oda ve not defteri+kalem tekrarı kullanılmadı.

Makale kapakları ve hub hero'ları 1600×900; gövde görselleri 1200×675 WebP. Ana sayfa kartına da 1600×900 master önerildi. Hub hero'ları mevcut 4:5 alanlara, rehber/ana sayfa kartları farklı kırpmalara girdiğinden ana obje merkezde tutulacak. Gerekli `width`/`height` gerçek dosya boyutuna göre düzeltilecek. Gövde görselleri figure/figcaption ile gösterilecek.

Gövde WebP sıkıştırması quality 82–85 / effort 6; hedef 80–150 KB. Gövde görseli kendi hero’sunun tekrarı olmayacak. Aynı sahne içi obje varsayılan olarak tekrarlanmayacak; not defteri, kalem ve çift görüşmesi ancak konu gerektirirse kullanılacak. Fotoğraf sahnelerinde yazı yok; gövde diyagramı seçilirse kısa Türkçe etiketler zorunlu. Bu P0 planında fotoğraf seçildi.

Mevcut dosya yolları korunacak. Görsel etiketleri klinik iddia eklemeyen sahne açıklamaları olacak. Önerilen alt metinler üretim sonrası çıkan gerçek görsele göre son kez doğrulanacak. AI üretimi yapılırsa kaynak türü buna göre kaydedilecek; gerçek fotoğraf, gerçek hasta ya da hekim onayı izlenimi verilmeyecek.

## Onaylanan sahneler

| # | Dosya (`public/images/` altında) | Kullanım | Boyut | Obje | Renk imzası | Sahne |
|---|---|---|---|---|---|---|
| 1 | `rehberler/hormone-tracking.webp` | Gövde + rehber kartı | 1200×675 | Fermuarlı belge çantası | Mint duvar + lacivert çanta | Hormon testi randevusunda mint gömlekli yetişkin kadın, mimari klinik girişinde fermuarlı belge çantasını kapatıyor. |
| 2 | `makaleler/dusuk-amh-hamilelik.webp` | Makale kapağı | 1600×900 | Yerinde duran ultrason probu | Lacivert bluz + kayısı koltuk | Yumurtalık rezervi değerlendirme odasında lacivert bluzlu kadın; ön planda yerinde duran ultrason probu. |
| 3 | `library/hastalik/dusuk-amh.webp` | Hub hero | 1600×900 | Büyük kapalı tetkik zarfı | Mint duvar ve ceket + kayısı bank | Hormon laboratuvarı girişinde mint ceketli yetişkin kadın, taşıdığı sade zarfı kucağına bırakmış. |
| 4 | `makaleler/embriyo-transferi-sonrasi-bakim.webp` | Makale kapağı | 1600×900 | Yürüyüş ayakkabıları | Kayısı duvar + mint triko | Kayısı tonlu ev girişinde mint triko giyen kadın yürüyüş ayakkabılarını bağlıyor. |
| 5 | `library/tedavi/post_transfert.webp` | İki hubda gövde | 1200×675 | Kapalı ilaç ambalajı ve düzenleme tepsisi | Lacivert gömlek + mint tepsi | Lacivert ipek gömlekli kadın evde kapalı ilaç ambalajını mint düzenleme tepsisine yerleştiriyor. |
| 6 | `library/embriyo/pgt.webp` | Genetik hub hero + PGT gövde | 1600×900 | PCR tüp rafı ve pipet standı | Lacivert mimari panel + mint yüzey | Genetik laboratuvarında yetişkin kadın bilim çalışanı PCR rafına bakıyor; elleri ve gerçek laboratuvar ekipmanı sahnenin odağı. |
| 7 | `library/hastalik/prolakktin.webp` | Hub gövde | 1200×675 | Katlanmış gömlek kolu ve duvar askısındaki ceket | Kayısı duvar + lacivert gömlek | Yetişkin kadın kan alma odasının dışındaki kayısı tonlu alanda gömleğinin kolunu düzeltiyor. |
| 8 | `library/hastalik/varikosel.webp` | Hub gövde | 1200×675 | Mikroskop ve opak numune kabı | Lacivert yüzey + mint duvar | Erkek laboratuvar çalışanı mikroskop yanında kapalı numune kabını düzenliyor. |
| 9 | `home/erkek-infertilitesi.webp` | Ana sayfa kartı | 1600×900 | Katlanmış ceket | Mint koltuk + lacivert triko | Erkek üreme sağlığı değerlendirme bekleme alanında yetişkin erkek ceketini koltuğun yanına bırakıyor. |
| 10 | `makaleler/erkek-dogurganlik-besin-takviyeleri.webp` | Kullanılmayan eski kapak | 1600×900 | Mercimek salatası ve sade zeytinyağı şişesi | Mint dolap + lacivert önlük | Mint mutfakta yetişkin erkek mercimek salatası hazırlıyor. |
| 11 | `makaleler/miyom-ameliyati.webp` | Makale kapağı | 1600×900 | Gerçekçi rahim eğitim modeli | Terracotta duvar + kayısı bluz | Cerrahi karar görüşmesi ortamında kayısı bluzlu yetişkin kadın, masadaki rahim eğitim modeline bakıyor. |
| 12 | `makaleler/pgt-cinsiyet-secimi.webp` | Kullanılmayan eski kapak | 1600×900 | Kapalı genetik değerlendirme dosyası | Lacivert koltuk + kayısı duvar | Genetik danışmanlık odasında yetişkin çift, yan yana sakin biçimde oturuyor; masada kapalı değerlendirme dosyası. |
| 13 | `makaleler/iui-nedir.webp` | Makale kapağı | 1600×900 | Kapalı steril IUI kateter paketi | Mint hazırlık yüzeyi + kayısı panel | Aşılama hazırlık odasında yetişkin laboratuvar çalışanı kapalı steril kateter paketini tepsiye bırakıyor. |
| 14 | `makaleler/taze-dondurulmus-transfer.webp` | Makale kapağı | 1600×900 | Kapalı kriyo tankı | Lacivert mimari panel + mint vurgu | Embriyoloji laboratuvarında yetişkin kadın çalışan kapalı kriyo tankının yanında duruyor. |
| 15 | `library/psikoloji/yas-iyilesmeler.webp` | Hub gövde | 1200×675 | Koltuk kolunda katlanmış şal | Mint triko + terracotta koltuk | Psikolojik destek odasında mint trikolu yetişkin kadın, terracotta koltukta sakin biçimde oturuyor. |
| 16 | `library/tedavi/intralipides.webp` | Hub gövde | 1200×675 | İlaç hazırlık çantası ve kapaklı enjeksiyon kalemi | Kayısı tezgâh + mint gömlek | Evde yetişkin kadın kapalı ilaç hazırlık çantasını tezgâha koyuyor; yanında kapaklı enjeksiyon kalemi. |

## Ortak üretim prompt'u

Her tekil prompt’un önüne eklenir:

> Vogue editorial photography, inspired by Vogue Living, Kinfolk, AnOther Magazine and Cereal. High-end art-directed fashion magazine production value with a restrained health/science narrative. Horizontal 16:9 full frame, no blurred letterbox extensions. Real adult subjects and coherent real settings, natural silk/linen/cashmere styling, architectural lines, layered foreground/background, generous negative space and a contemplative elegant posture. Soft sculptural daylight, painterly low-contrast atmosphere, cinematic shallow depth of field, 50–85mm f/1.8–2.8, subtle film grain; 35mm only for architectural wide views. Use the color signature of the individual brief: one brand color MUST be dominant or semi-dominant via wardrobe, wall, furniture or large prop. Neutrals support the scene. Faces of fictional adults may be visible; no physician portrait or identifiable patient testimony. No baby, infant, child, pregnancy belly, fetal scan, before/after, tears, pain, distress, forced smile, celebration, logo, brand, watermark, letters, numbers, readable paperwork, medical illustration, infographic, hologram, sexualized pose or promotion. Negative: all-cream palette, oat-dominant scene, generic beige room, stock-photo cliché, documentary/news-reporting aesthetic, indistinguishable repeated scenes. Produce one image, not a collage.

## Tekil prompt, alt metin ve kullanım yerleri

### 1. hormone-tracking.webp

- Dosya: `public/images/rehberler/hormone-tracking.webp`.
- Kullanım yerleri: `/hormon-paneli/`, `/rehberler/`
- Hedef: 1200×675 WebP.
- Obje: Fermuarlı belge çantası. Renk: Mint duvar + lacivert çanta.
- Alt metin önerisi: “Mint duvarlı girişte belge çantasını kapatan yetişkin kadın”. Çıktı görüldükten sonra son kez doğrulanır.
- Caption taslağı: “Mint duvarlı girişte belge çantasını kapatan yetişkin kadın. Temsili sahne.” AI kaynak bilgisi ayrıca kaydedilir.

> Target 1200x675. ABSOLUTE PRIORITY / MANDATORY: Mint duvar + lacivert çanta must dominate or semi-dominate through large visible surfaces and wardrobe. An all-cream, oat or beige-dominant image fails this brief. Adult woman in her thirties in a mint silk shirt, closing a navy zip document pouch in a refined architectural laboratory reception. Her face is visible, calm and thoughtful. No reading pose, no notebook or pen. Hormone testing visit context. Sculptural mint wall and stone bench, tactile materials, strong architectural lines.

### 2. dusuk-amh-hamilelik.webp

- Dosya: `public/images/makaleler/dusuk-amh-hamilelik.webp`.
- Kullanım yerleri: `/instagram/`, `/makaleler/dhea-buyume-hormonu-tup-bebek/`, `/makaleler/dusuk-amh-hamilelik/`, `/makaleler/endometrioma/`, `/makaleler/`, `/makaleler/kanser-ve-fertilite/`, `/makaleler/yumurta-dondurma-rehberi/`, `/makaleler/yumurtalik-kistleri-dogurganlik/`, `/makaleler/yumurtlama-takibi/`
- Hedef: 1600×900 WebP.
- Obje: Yerinde duran ultrason probu. Renk: Lacivert bluz + kayısı koltuk.
- Alt metin önerisi: “Kayısı koltukta oturan lacivert bluzlu kadın; yanında ekranı kapalı ultrason cihazı”. Çıktı görüldükten sonra son kez doğrulanır.
- Caption taslağı: “Kayısı koltukta oturan lacivert bluzlu kadın; yanında ekranı kapalı ultrason cihazı. Temsili sahne.” AI kaynak bilgisi ayrıca kaydedilir.

> Target 1600x900. ABSOLUTE PRIORITY / MANDATORY: Lacivert bluz + kayısı koltuk must dominate or semi-dominate through large visible surfaces and wardrobe. An all-cream, oat or beige-dominant image fails this brief. Adult woman with natural styling in a deep navy silk blouse seated thoughtfully in an apricot sculptural armchair in an ovarian assessment room. Beside her, an ultrasound probe rests in its holder and the monitor is switched off. No examination or touching abdomen. Face visible, composed expression, refined fashion-editorial composition and generous negative space.

### 3. dusuk-amh.webp

- Dosya: `public/images/library/hastalik/dusuk-amh.webp`.
- Kullanım yerleri: `/hormon-paneli/`
- Hedef: 1600×900 WebP.
- Obje: Büyük kapalı tetkik zarfı. Renk: Mint duvar ve ceket + kayısı bank.
- Alt metin önerisi: “Mint tonlu laboratuvar girişinde kucağında kapalı zarfla oturan kadın”. Çıktı görüldükten sonra son kez doğrulanır.
- Caption taslağı: “Mint tonlu laboratuvar girişinde kucağında kapalı zarfla oturan kadın. Temsili sahne.” AI kaynak bilgisi ayrıca kaydedilir.

> Target 1600x900. ABSOLUTE PRIORITY / MANDATORY: Mint duvar ve ceket + kayısı bank must dominate or semi-dominate through large visible surfaces and wardrobe. An all-cream, oat or beige-dominant image fails this brief. Adult woman in a mint jacket seated on a muted apricot architectural bench at a laboratory reception, closed plain test envelope resting on her lap, not reading. Calm visible face. The hormone assessment context comes from the laboratory setting, without test values. Keep face, hands and envelope within the central 40 percent for a 4:5 crop.

### 4. embriyo-transferi-sonrasi-bakim.webp

- Dosya: `public/images/makaleler/embriyo-transferi-sonrasi-bakim.webp`.
- Kullanım yerleri: `/makaleler/akinti-kasinti-koku/`, `/makaleler/alkol-ve-fertilite/`, `/makaleler/duygusal-dayaniklik-rehberi/`, `/makaleler/embriyo-transferi-sonrasi-bakim/`, `/makaleler/`, `/makaleler/tup-bebek-nedir/`
- Hedef: 1600×900 WebP.
- Obje: Yürüyüş ayakkabıları. Renk: Kayısı duvar + mint triko.
- Alt metin önerisi: “Kayısı tonlu ev girişinde yürüyüş ayakkabılarını bağlayan mint trikolu kadın”. Çıktı görüldükten sonra son kez doğrulanır.
- Caption taslağı: “Kayısı tonlu ev girişinde yürüyüş ayakkabılarını bağlayan mint trikolu kadın. Temsili sahne.” AI kaynak bilgisi ayrıca kaydedilir.

> Target 1600x900. ABSOLUTE PRIORITY / MANDATORY: Kayısı duvar + mint triko must dominate or semi-dominate through large visible surfaces and wardrobe. An all-cream, oat or beige-dominant image fails this brief. Adult woman in her thirties wearing a mint cashmere knit and modest everyday trousers, sitting upright on a sculptural entry bench, tying comfortable walking shoes. Apricot plaster wall, navy shoe rack. Graceful deliberate gesture and relaxed visible face, quiet daily routine context after embryo transfer. No bed, no celebration, no pregnancy cues.

### 5. post_transfert.webp

- Dosya: `public/images/library/tedavi/post_transfert.webp`.
- Kullanım yerleri: `/ilac-rehberi/`, `/transfer-sureci/`
- Hedef: 1200×675 WebP.
- Obje: Kapalı ilaç ambalajı ve düzenleme tepsisi. Renk: Lacivert gömlek + mint tepsi.
- Alt metin önerisi: “Evde kapalı ilaç ambalajını mint tepsiye yerleştiren lacivert gömlekli kadın”. Çıktı görüldükten sonra son kez doğrulanır.
- Caption taslağı: “Evde kapalı ilaç ambalajını mint tepsiye yerleştiren lacivert gömlekli kadın. Temsili sahne.” AI kaynak bilgisi ayrıca kaydedilir.

> Target 1200x675. ABSOLUTE PRIORITY / MANDATORY: Lacivert gömlek + mint tepsi must dominate or semi-dominate through large visible surfaces and wardrobe. An all-cream, oat or beige-dominant image fails this brief. Adult woman in a navy silk shirt at a refined apartment sideboard, placing a sealed plain medication package onto a mint ceramic organization tray. Face visible and calm, elegant natural gesture. Closed medication only, no tablets in hand, no dose instructions, no treatment demonstration. Sculptural side light and layered domestic architecture.

### 6. pgt.webp

- Dosya: `public/images/library/embriyo/pgt.webp`.
- Kullanım yerleri: `/genetik-testler/`, `/pgt-merkezi/`
- Hedef: 1600×900 WebP.
- Obje: PCR tüp rafı ve pipet standı. Renk: Lacivert mimari panel + mint yüzey.
- Alt metin önerisi: “Genetik laboratuvarında PCR tüp rafını inceleyen yetişkin kadın çalışan”. Çıktı görüldükten sonra son kez doğrulanır.
- Caption taslağı: “Genetik laboratuvarında PCR tüp rafını inceleyen yetişkin kadın çalışan. Temsili sahne.” AI kaynak bilgisi ayrıca kaydedilir.

> Target 1600x900. ABSOLUTE PRIORITY / MANDATORY: Lacivert mimari panel + mint yüzey must dominate or semi-dominate through large visible surfaces and wardrobe. An all-cream, oat or beige-dominant image fails this brief. Adult female laboratory scientist at a genetic testing bench, gloved hands resting beside a PCR tube rack and pipette stand. Generic fictional adult, not a physician portrait. Face may be visible in profile, thoughtful neutral expression, sensible laboratory clothing and PPE. Deep navy architectural wall panel, mint worktop. No active pipetting or sample claims. Keep face and key equipment in central crop-safe region.

### 7. prolakktin.webp

- Dosya: `public/images/library/hastalik/prolakktin.webp`.
- Kullanım yerleri: `/hormon-paneli/`
- Hedef: 1200×675 WebP.
- Obje: Katlanmış gömlek kolu ve duvar askısındaki ceket. Renk: Kayısı duvar + lacivert gömlek.
- Alt metin önerisi: “Kayısı duvarlı klinik geçiş alanında gömleğinin kolunu düzelten yetişkin kadın”. Çıktı görüldükten sonra son kez doğrulanır.
- Caption taslağı: “Kayısı duvarlı klinik geçiş alanında gömleğinin kolunu düzelten yetişkin kadın. Temsili sahne.” AI kaynak bilgisi ayrıca kaydedilir.

> Target 1200x675. ABSOLUTE PRIORITY / MANDATORY: Kayısı duvar + lacivert gömlek must dominate or semi-dominate through large visible surfaces and wardrobe. An all-cream, oat or beige-dominant image fails this brief. Adult woman calmly lowering the rolled sleeve of a navy silk shirt in a refined clinic transition area outside a laboratory sampling room. Her mint jacket hangs on a wall hook. Apricot wall is dominant. Visible calm face and relaxed arms. No wound, compress, blood, needle, pain gesture or diagnostic result. Context: an ordinary laboratory visit for hormone evaluation.

### 8. varikosel.webp

- Dosya: `public/images/library/hastalik/varikosel.webp`.
- Kullanım yerleri: `/erkek-infertilitesi/`
- Hedef: 1200×675 WebP.
- Obje: Mikroskop ve opak numune kabı. Renk: Lacivert yüzey + mint duvar.
- Alt metin önerisi: “Mikroskop yanında kapalı opak numune kabını düzenleyen erkek laboratuvar çalışanı”. Çıktı görüldükten sonra son kez doğrulanır.
- Caption taslağı: “Mikroskop yanında kapalı opak numune kabını düzenleyen erkek laboratuvar çalışanı. Temsili sahne.” AI kaynak bilgisi ayrıca kaydedilir.

> Target 1200x675. ABSOLUTE PRIORITY / MANDATORY: Lacivert yüzey + mint duvar must dominate or semi-dominate through large visible surfaces and wardrobe. An all-cream, oat or beige-dominant image fails this brief. Adult male laboratory scientist arranging a closed opaque specimen container next to an optical microscope at a semen analysis workstation. Sensible laboratory clothing and gloves, composed visible profile. Navy worktop with mint architectural wall. No biological contents or sperm graphic, no nudity, no procedure. Sculptural light and elegant editorial framing of gesture and real equipment.

### 9. erkek-infertilitesi.webp

- Dosya: `public/images/home/erkek-infertilitesi.webp`.
- Kullanım yerleri: `/`
- Hedef: 1600×900 WebP.
- Obje: Katlanmış ceket. Renk: Mint koltuk + lacivert triko.
- Alt metin önerisi: “Mint koltuğun yanında ceketini katlayan lacivert trikolu yetişkin erkek”. Çıktı görüldükten sonra son kez doğrulanır.
- Caption taslağı: “Mint koltuğun yanında ceketini katlayan lacivert trikolu yetişkin erkek. Temsili sahne.” AI kaynak bilgisi ayrıca kaydedilir.

> Target 1600x900. ABSOLUTE PRIORITY / MANDATORY: Mint koltuk + lacivert triko must dominate or semi-dominate through large visible surfaces and wardrobe. An all-cream, oat or beige-dominant image fails this brief. Adult man in his thirties wearing a deep navy fine knit, placing a folded jacket beside a mint sculptural armchair in a refined assessment reception. Calm attentive visible face, hands relaxed, no head-holding or distress. Wide architectural composition with strong navy and mint color signature; no doctor, no medical report reading. Subject and jacket crop-safe for homepage card.

### 10. erkek-dogurganlik-besin-takviyeleri.webp

- Dosya: `public/images/makaleler/erkek-dogurganlik-besin-takviyeleri.webp`.
- Kullanım yerleri: Güncel görünür kullanım yok; aktif üretim dışında.
- Hedef: 1600×900 WebP.
- Obje: Mercimek salatası ve sade zeytinyağı şişesi. Renk: Mint dolap + lacivert önlük.
- Alt metin önerisi: “Mint mutfakta mercimek salatası hazırlayan lacivert önlüklü yetişkin erkek”. Çıktı görüldükten sonra son kez doğrulanır.
- Caption taslağı: “Mint mutfakta mercimek salatası hazırlayan lacivert önlüklü yetişkin erkek. Temsili sahne.” AI kaynak bilgisi ayrıca kaydedilir.

> Target 1600x900. ABSOLUTE PRIORITY / MANDATORY: Mint dolap + lacivert önlük must dominate or semi-dominate through large visible surfaces and wardrobe. An all-cream, oat or beige-dominant image fails this brief. Adult man preparing a lentil and leafy vegetable salad at an architectural mint kitchen island, navy linen apron, modest natural styling. Plain olive oil bottle, calm visible face, no supplement branding or muscular posing. Refined food and lifestyle editorial scene, without a fertility improvement claim.

### 11. miyom-ameliyati.webp

- Dosya: `public/images/makaleler/miyom-ameliyati.webp`.
- Kullanım yerleri: `/makaleler/adet-duzensizligi-pcos/`, `/makaleler/adet-gorememe/`, `/makaleler/endometriozis-akilli-stratejiler/`, `/makaleler/hidrosalpinx-ve-kisirlik/`, `/makaleler/hiperprolaktinemi-ve-kisirlik/`, `/makaleler/`, `/makaleler/miyom-ameliyati/`, `/makaleler/opk-ve-ivf/`, `/makaleler/pcos-yeni-adi-pmos/`
- Hedef: 1600×900 WebP.
- Obje: Gerçekçi rahim eğitim modeli. Renk: Terracotta duvar + kayısı bluz.
- Alt metin önerisi: “Terracotta tonlu değerlendirme odasında masadaki rahim eğitim modeline bakan kadın”. Çıktı görüldükten sonra son kez doğrulanır.
- Caption taslağı: “Terracotta tonlu değerlendirme odasında masadaki rahim eğitim modeline bakan kadın. Temsili sahne.” AI kaynak bilgisi ayrıca kaydedilir.

> Target 1600x900. ABSOLUTE PRIORITY / MANDATORY: Terracotta duvar + kayısı bluz must dominate or semi-dominate through large visible surfaces and wardrobe. An all-cream, oat or beige-dominant image fails this brief. Adult woman in an apricot silk blouse seated at a refined consultation table, thoughtfully looking at a realistic manufactured uterus teaching model. Terracotta architectural wall, navy table detail. Visible calm face, no doctor in frame, no surgery, no exposed tissue or clinical result. Model is plainly a physical classroom object photographed in a real scene, not a diagram, illustration or surreal anatomy.

### 12. pgt-cinsiyet-secimi.webp

- Dosya: `public/images/makaleler/pgt-cinsiyet-secimi.webp`.
- Kullanım yerleri: Güncel görünür kullanım yok; aktif üretim dışında.
- Hedef: 1600×900 WebP.
- Obje: Kapalı genetik değerlendirme dosyası. Renk: Lacivert koltuk + kayısı duvar.
- Alt metin önerisi: “Lacivert koltukta yan yana oturan yetişkin çift ve masada kapalı dosya”. Çıktı görüldükten sonra son kez doğrulanır.
- Caption taslağı: “Lacivert koltukta yan yana oturan yetişkin çift ve masada kapalı dosya. Temsili sahne.” AI kaynak bilgisi ayrıca kaydedilir.

> Target 1600x900. ABSOLUTE PRIORITY / MANDATORY: Lacivert koltuk + kayısı duvar must dominate or semi-dominate through large visible surfaces and wardrobe. An all-cream, oat or beige-dominant image fails this brief. Two adults seated side by side in a deep navy sculptural sofa in a genetic counseling room, with a closed plain case folder on the table. Calm visible faces, natural refined styling, no hugging or success pose. Apricot architectural wall. No sex-selection symbols, pink-blue contrast, baby objects or claimed outcomes.

### 13. iui-nedir.webp

- Dosya: `public/images/makaleler/iui-nedir.webp`.
- Kullanım yerleri: `/`, `/makaleler/`, `/makaleler/iui-nedir/`, `/makaleler/tup-bebek-yanlis-bilinenler/`
- Hedef: 1600×900 WebP.
- Obje: Kapalı steril IUI kateter paketi. Renk: Mint hazırlık yüzeyi + kayısı panel.
- Alt metin önerisi: “Aşılama hazırlık alanında kapalı steril kateter paketini tepsiye bırakan yetişkin çalışan”. Çıktı görüldükten sonra son kez doğrulanır.
- Caption taslağı: “Aşılama hazırlık alanında kapalı steril kateter paketini tepsiye bırakan yetişkin çalışan. Temsili sahne.” AI kaynak bilgisi ayrıca kaydedilir.

> Target 1600x900. ABSOLUTE PRIORITY / MANDATORY: Mint hazırlık yüzeyi + kayısı panel must dominate or semi-dominate through large visible surfaces and wardrobe. An all-cream, oat or beige-dominant image fails this brief. Adult female laboratory worker placing an unopened sterile intrauterine insemination catheter package on a mint preparation tray in a refined clinical room. Realistic thin flexible catheter still sealed in plain packaging. Sensible clothing and gloves, calm visible profile, generic fictional adult not a physician portrait. Apricot architectural panel and cinematic sculptural daylight. No body examination, insertion, dose, exposed needle or procedure tutorial.

### 14. taze-dondurulmus-transfer.webp

- Dosya: `public/images/makaleler/taze-dondurulmus-transfer.webp`.
- Kullanım yerleri: `/makaleler/embriyo-transferi-sonrasi-bakim/`, `/makaleler/embryoglue-faydalari/`, `/makaleler/endometrium-kalinligi-tup-bebek/`, `/makaleler/`, `/makaleler/kanser-ve-fertilite/`, `/makaleler/taze-dondurulmus-transfer/`, `/makaleler/yumurta-dondurma-rehberi/`
- Hedef: 1600×900 WebP.
- Obje: Kapalı kriyo tankı. Renk: Lacivert mimari panel + mint vurgu.
- Alt metin önerisi: “Embriyoloji laboratuvarında kapalı kriyo tankının yanında duran yetişkin kadın çalışan”. Çıktı görüldükten sonra son kez doğrulanır.
- Caption taslağı: “Embriyoloji laboratuvarında kapalı kriyo tankının yanında duran yetişkin kadın çalışan. Temsili sahne.” AI kaynak bilgisi ayrıca kaydedilir.

> Target 1600x900. ABSOLUTE PRIORITY / MANDATORY: Lacivert mimari panel + mint vurgu must dominate or semi-dominate through large visible surfaces and wardrobe. An all-cream, oat or beige-dominant image fails this brief. Adult female embryology laboratory worker standing thoughtfully beside a closed stainless steel cryogenic storage tank, with a closed incubator in the background. Sensible lab clothing and PPE, calm visible face, generic adult not a doctor portrait. Deep navy architectural panel with mint accents. Strong Vogue science-editorial composition, no active tank handling, vapor plume, sample imagery or superiority claim.

### 15. yas-iyilesmeler.webp

- Dosya: `public/images/library/psikoloji/yas-iyilesmeler.webp`.
- Kullanım yerleri: `/psikolojik-destek/`
- Hedef: 1200×675 WebP.
- Obje: Koltuk kolunda katlanmış şal. Renk: Mint triko + terracotta koltuk.
- Alt metin önerisi: “Terracotta koltukta elleri kucağında oturan mint trikolu kadın; yanında katlanmış şal”. Çıktı görüldükten sonra son kez doğrulanır.
- Caption taslağı: “Terracotta koltukta elleri kucağında oturan mint trikolu kadın; yanında katlanmış şal. Temsili sahne.” AI kaynak bilgisi ayrıca kaydedilir.

> Target 1200x675. ABSOLUTE PRIORITY / MANDATORY: Mint triko + terracotta koltuk must dominate or semi-dominate through large visible surfaces and wardrobe. An all-cream, oat or beige-dominant image fails this brief. Adult woman in a mint cashmere knit seated in a terracotta sculptural armchair in a refined psychological support room. Folded navy shawl on the chair arm, hands resting naturally on lap, quiet visible face without forced optimism. Sensitive context of support after loss. No tears, grief spectacle, fantasy, baby keepsakes, celebration or symbolism promising recovery.

### 16. intralipides.webp

- Dosya: `public/images/library/tedavi/intralipides.webp`.
- Kullanım yerleri: `/ilac-rehberi/`
- Hedef: 1200×675 WebP.
- Obje: İlaç hazırlık çantası ve kapaklı enjeksiyon kalemi. Renk: Kayısı tezgâh + mint gömlek.
- Alt metin önerisi: “Kayısı tezgâha ilaç çantasını koyan mint gömlekli kadın; yanında kapaklı enjeksiyon kalemi”. Çıktı görüldükten sonra son kez doğrulanır.
- Caption taslağı: “Kayısı tezgâha ilaç çantasını koyan mint gömlekli kadın; yanında kapaklı enjeksiyon kalemi. Temsili sahne.” AI kaynak bilgisi ayrıca kaydedilir.

> Target 1200x675. ABSOLUTE PRIORITY / MANDATORY: Kayısı tezgâh + mint gömlek must dominate or semi-dominate through large visible surfaces and wardrobe. An all-cream, oat or beige-dominant image fails this brief. Adult woman in a mint silk shirt placing a closed medication preparation pouch on an apricot architectural kitchen counter, a capped injection pen resting beside it. Calm visible face, refined natural styling, graceful everyday gesture. No open needle, no dose dial or instruction, no injection, no loose medication, no infusion bag. Neutral organization scene, no intralipid treatment recommendation.

## Kapaklar için alternatif sahneler

Ana tabloda önerilen sahneye ek iki seçenek:

| # | Alternatif 1 | Alternatif 2 |
|---|---|---|
| 2 Düşük AMH | Mimari klinik koridorunda kapalı tetkik zarfını taşıyan kadın | Değerlendirme odasında ultrason cihazının yanında mint ceketini koltuğa bırakan kadın |
| 4 Transfer sonrası bakım | Kayısı tonlu mutfakta sade öğün hazırlayan kadın | Mimari avluda sakin yürüyen mint giyimli kadın |
| 10 Takviyeler (kullanılmıyor) | Sofrada bakliyat yemeğini hazırlayan erkek | Mutfağında sebzeleri yıkayan erkek |
| 11 Miyom ameliyatı | Rahim eğitim modelinin yanında cerrahi değerlendirme zarfını kapatan kadın | Danışmanlık masasından kalkarken kapalı dosyasını alan kadın |
| 12 PGT-cinsiyet (kullanılmıyor) | Genetik laboratuvarında PCR rafını inceleyen bilim çalışanı | Genetik danışmanlık odasında kapalı aile değerlendirme zarfıyla oturan yetişkin kadın |
| 13 IUI | Kapalı steril paketin yanındaki tepsiyi düzenleyen laboratuvar çalışanı | Aşılama değerlendirme odasında oturan kadın, arka planda kapalı hazırlık tepsisi |
| 14 Taze/dondurulmuş | Kriyo tanklarının yanında sakin biçimde yürüyen laboratuvar çalışanı | Kapalı inkübatörün önünde duran embriyoloji çalışanı, arka planda kapalı kriyo tankı |

## Görsel dışı P0 için somut değişiklik önerisi

### Methodology

- “100+ / Bilimsel Makale” → yayımlanan içerik koleksiyonundan dinamik sayı / “Yayındaki Makale”. Dosya sayısı bugün 63; yayımlanan sayısı koleksiyon filtresinden alınmalı.
- “30+ Yıl / Klinik Tecrübe” → “Kaynaklar / Bilimsel Dayanak”. Klinik deneyim reklamı kaldırılır.
- “tüm içerikler ... Baş Editör ... ve Tıbbi Danışma Kurulu onayından geçer” → “İçeriklerin bilimsel kaynakları, yazarları, inceleme bilgileri ve güncelleme tarihleri ilgili sayfalarda belirtilir.” Bütün yazılarda doğrulanmış kurul onayı iddia edilmez.
- Başlık, sayfa URL'si ve SEO title korunur.

### Mega menü

Üç kaynaksız `centerContent.stat` nesnesi kaldırılır: IVF %40–50, cerrahi sonrası %30–40, yaşam tarzı %25 artış. Bileşen zaten `stat` alanını koşullu gösteriyor; kaynak uydurmak veya yeni başarı oranı eklemek gerekmez.

### İnceleyen bilgileri

Güncel kaynakta 22 makalenin `medicalReviewer` değeri standart dışı. Ek olarak `era-testi-iluzyon.mdx` ve `pgt-cinsiyet-secimi.mdx` içinde inceleyen adı standart olmasına rağmen `reviewerTitle` standart dışı; ad/rol toplamı 24 makaleyi etkiliyor.

Önerilen kayıt: `medicalReviewer: "tupbebek.com Editöryal Ekip"`, `reviewerTitle: "Tıbbi Yayın Ekibi"`. Gerçek bireysel inceleme kaydı varsa bu bilgi kaybolmamalı; yeni inceleme yapılmış gibi tarih, durum veya onay üretilmez. `expertContribution` gerçek yanıtlarına dokunulmaz.

**Varikosel kararı alındı:** Kullanıcı 26 Eylül 2026 tarihinde “standart kayıt al” dedi. Makale `tupbebek.com Editöryal Ekip` / `Tıbbi Yayın Ekibi` kaydına alındı; bu talimat yeni bir tıbbi inceleme veya tarih onayı sayılmadı.

## Uygulama ve doğrulama sırası

1. Dr. Aksoy sahne listesini onaylar. Varsayılan kapsam 14 aktif görseldir; #10 ve #12 kullanılmayan eski dosyalar olarak kalır. İstenirse onlar için de ayrıca üretim yapılabilir; mevcut yeni kapaklar değiştirilmez.
2. Her görsel tek tek üretilir ve gözle incelenir: konu/obje uyumu, bebek ve stres yokluğu, yazı/logo/hekim yüzü yokluğu, ekipmanın gerçekçiliği, kırpma güvenliği, alt metin uyumu, bulanık bant yokluğu. Kusurlu üretim kabul edilmez.
3. Onaylı ve kontrol edilmiş görseller aynı dosya yollarına işlenir; gerçek boyutlar, alt metinler, yalnızca sahneyi anlatan caption ve AI kaynak bilgisi birlikte güncellenir.
4. Künye standardizasyonu 24 makalede uygulandı. Methodology ve menü düzeltmeleri de uygulandı.
5. `npm run build` ve `npm run verify:preflight`; prebuild'ın hedef dışı dosya değişiklikleri ayrıca incelenir. Responsive görsel türevleri yeniden üretilir.
6. Yerel sayfalar yavaş kaydırılarak lazy-load tamamlandıktan sonra masaüstü/mobil önce-sonra kontrolü yapılır. Yerel build canlı yayın kanıtı sayılmaz.
7. Küçük PR kapsamı hazırlanır. Yayın onayı ayrıca alınır; deploy yalnızca doğru `tupbebek` hedefinde `npm run deploy` ile yapılır.

P1 ayrı kapsamda kalır. P0 ile ortak dosyaların bulanık bantları bu değişimde giderilmiş olur; P1 listesinde bunlar tekrar üretilmez. Kullanılmayan #10/#12 ve eski kanser kapağı P1 aktif üretiminden çıkarılır.

## Onay ve uygulama kaydı

- Kullanıcının 26 Eylül 2026 tarihli “onay” mesajıyla 14 aktif görsel ve yerel P0 kapsamı onaylandı.
- Kullanıcının “standart kayıt al” talimatıyla 24 makalenin inceleyen adı/rolü standarda alındı; toplam 63 makale tutarlı. Yeni klinik inceleme veya tarih kaydı üretilmedi.
- 14 görsel üretildi, gözle incelendi ve aynı dosya yollarında uygulandı.
- Methodology ve üç menü istatistiği düzeltildi.
- Tam build ve 23/23 preflight geçti. 99 yerel sayfanın H1, SEO başlığı ve canonical bilgileri korundu.
- Ayrıntılı kayıt: [P0 uygulama ve doğrulama](P0-UYGULAMA-VE-DOGRULAMA.md).
- Canlı yayın onayı alınmadı; merge/deploy yapılmadı.
