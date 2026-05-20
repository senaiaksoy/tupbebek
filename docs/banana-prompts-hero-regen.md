# Banana Prompts — 32 Hero Görsel Yenileme

**Tarih:** 2026-05-20
**Kaynak standart:** `memory/hero-image-spec.md` (Vogue editorial, 1600×900, baby-free)
**Faz:** B (Faz A blur-extend ile geçici fix `de9dfdf6` commit'inde landed)
**Dosya çıktı:** `public/images/makaleler/<slug>.webp` (mevcut blur-extend versiyonları overwrite edilir)

## Kullanım

1. Banana MCP'yi (nanobanana-mcp) aktif et.
2. Aşağıdaki prompt'lardan birini banana'ya gönder, 1600×900 horizontal WebP üret.
3. Çıktıyı `public/images/makaleler/<slug>.webp` olarak kaydet (alttaki slug name'i kullan).
4. Banana cream-dominant'a kayarsa prompt 2-3x daha agresif yeniden gönder; kabul edilebilir bulursan geç.
5. Her makale frontmatter'ı zaten doğru path'i gösteriyor — yeni dosya yazılınca otomatik yüklenir.

## Master template referansı

Her prompt aşağıdaki yapıyı paylaşır — sadece **Scene**, **Subject styling**, **Color signature**, **Props** kısımları makaleye özgüdür:

```
Vogue editorial photography, cinematic 1600x900 horizontal frame.
Inspired by Vogue, Vogue Living, Kinfolk, AnOther Magazine, Cereal Magazine.

Scene: [SAHNE]
Subject: [KARAKTER + STYLING]
Color signature (MANDATORY): [RENK ENFORCEMENT]
Props: [MAKALEYE ÖZEL]

Composition: rule-of-thirds, generous negative space, layered foreground/background, architectural lines.
Light: soft sculptural natural daylight, painterly chiaroscuro, low contrast, golden hour or diffuse overcast.
Lens: 85mm f/2.0 shallow DOF (or 35mm wide for architectural), hyperrealistic 4K.

Negative: baby, infant, pregnancy belly, fetal ultrasound, celebrating patient, hugging, tears,
exaggerated smile, stock photo cliché, clinic logo, text watermark, before-after split, promotional poster,
lingerie, sexualized pose, harsh flash, oversaturated, busy clutter, low-budget look,
all-cream palette, oat-dominant scene, generic Vogue editorial without brand color signature,
indistinguishable from previous cream-toned lifestyle images.
```

## Renk imzası dağılımı (32 makale)

Hero-image-spec'teki konu → renk imzası matrisine göre dağıtım. Ardışık alfabetik makaleler farklı renkte.

| # | Slug | Konu özeti | Renk imzası |
|---|------|------------|-------------|
| 1 | bagisiklik-tedavileri | immunolojik tedavi, NK hücreleri | terracotta + apricot |
| 2 | cep-telefonu-sperm-kalitesi | erkek + teknoloji riski | navy + sage |
| 3 | cerrahi-sperm-arama-tese | erkek + cerrahi (TESE) | deep navy dominant |
| 4 | dusuk-amh-hamilelik | yumurtalık rezervi düşüklüğü | warm wheat + apricot |
| 5 | embriyo-transferi-gun-secimi | embriyo zamanlama | navy + warm wheat |
| 6 | embriyo-transferi-sonrasi-bakim | bekleyiş, dinlenme | warm gold + ivory |
| 7 | endometrioma | endometriozis kisti | sage |
| 8 | endometriozis-akilli-stratejiler | endometriozis yönetimi | mint |
| 9 | endometriozis-tup-bebek | endometriozis + IVF | sage olive |
| 10 | endometriyal-scratching | rahim içi hazırlık | terracotta |
| 11 | endoskopik-cerrahi-histeroskopi | cerrahi hazırlık | apricot |
| 12 | erkek-dogurganlik-besin-takviyeleri | erkek + beslenme | sage + warm wheat |
| 13 | hidrosalpinx-ve-kisirlik | tubal patoloji | soft apricot |
| 14 | hiperprolaktinemi-ve-kisirlik | hormonal, hipofiz | warm wheat |
| 15 | hormonal-tedavi-adenomyozis | adenomyoz hormonal | sage |
| 16 | iui-nedir | intrauterin inseminasyon | apricot |
| 17 | kac-yumurta-gerekir | istatistik, beklenti | navy + wheat |
| 18 | kadin-kisirligi-tup-bebek | genel kadın infertilite | mint |
| 19 | kanser-ve-fertilite | onkofertilite | warm wheat + apricot |
| 20 | kimyasal-gebelik | erken gebelik kaybı | warm gold + ivory |
| 21 | mikroenjeksiyon-icsi-nedir | embriyoloji laboratuvarı | deep navy |
| 22 | miyom-ameliyati | uterin cerrahi | terracotta |
| 23 | miyomlar-ve-tup-bebek | miyom + IVF | apricot |
| 24 | opk-ve-ivf | PCOS | sage olive |
| 25 | pgt-cinsiyet-secimi | genetik / kromozom | deep navy |
| 26 | pgt-m | tek gen hastalığı PGT | navy + sage |
| 27 | taze-dondurulmus-transfer | embriyo dondurma | mint + ivory |
| 28 | tup-bebek-sureci-rehber | süreç rehberi | navy + warm wheat |
| 29 | tup-bebek-yanlis-bilinenler | mit-fact | sage |
| 30 | vajinal-mikrobiyom-fiv | mikrobiyom denge | mint |
| 31 | yumurtalik-kistleri-dogurganlik | over kistleri | soft apricot |
| 32 | yumurtlama-takibi | ovulasyon takibi | warm wheat + sage |

---

## Prompt'lar

### 1 — bagisiklik-tedavileri  (terracotta + apricot)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Vogue, Kinfolk, AnOther Magazine.

Scene: Architectural sunlit immunology research lab corner with terracotta-painted accent wall and soft apricot afternoon light pouring through tall industrial windows. A modern minimalist desk with marble surface holds an open scientific journal, a microscope at the edge, and dried wildflowers in a clay vessel.

Subject: Woman in her 30s in a terracotta silk blouse and oversized cream cashmere cardigan, contemplative side profile reading a printed research paper. Natural styling, minimal gold jewelry, hair loosely tied back. Vogue magazine cover energy — NOT posed stock smile, NOT clinical patient pose.

Color signature (ABSOLUTE PRIORITY / MANDATORY): The dominant color MUST be TERRACOTTA with apricot accents — visible via wall paint AND silk blouse AND clay vessel. If the image is dominantly cream/oat/beige, the brief has failed. This image MUST be visually distinct from generic all-cream Vogue editorial scenes.

Props: open scientific journal styled elegantly, vintage brass microscope, dried craspedia and rust-colored eucalyptus in handthrown clay vase, hand-drawn immune cell sketches on an open notebook.

Composition: rule-of-thirds, subject placed left-third, generous negative space right with terracotta wall. Layered foreground (paper) and background (wall + window light). Light: soft sculptural daylight, painterly chiaroscuro, low contrast, golden hour glow. Lens: 85mm f/2.0 shallow DOF, hyperrealistic 4K.

Negative: baby, infant, pregnancy belly, ultrasound, celebrating patient, hugging, tears, exaggerated smile, stock photo cliché, clinic logo, text watermark, before-after, promotional poster, lingerie, sexualized pose, harsh flash, oversaturated, busy clutter, low-budget look, all-cream palette, oat-dominant scene, indistinguishable from previous cream-toned lifestyle images.
```

### 2 — cep-telefonu-sperm-kalitesi  (navy + sage)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Vogue Living, AnOther Magazine.

Scene: Modern architectural home office with deep navy painted accent wall, sage olive linen drapes filtering soft morning light. Sculptural mid-century walnut desk holds a closed smartphone screen-down beside a vintage scientific paper printout on male fertility research.

Subject: Man in his 30s in a deep navy crewneck cashmere knit, refined natural styling, contemplative posture, reading the printed paper rather than the phone. Side profile, slight inclination of head. NOT smiling, NOT posed — Kinfolk editorial restraint.

Color signature (ABSOLUTE PRIORITY / MANDATORY): The dominant color MUST be DEEP NAVY #2563a8 with SAGE OLIVE secondary — visible via wall paint AND knit sweater AND drapes. If the image is dominantly cream/oat/beige, the brief has failed.

Props: matte black smartphone screen-down on desk, printed scientific paper styled elegantly, brass desk lamp off, single olive branch in slim navy ceramic vessel, leather-bound notebook.

Composition: rule-of-thirds, subject right-third, generous negative space left with navy wall and window. Architectural symmetry lines. Light: soft diffuse overcast through sage drapes, painterly chiaroscuro, low contrast. Lens: 85mm f/2.0, hyperrealistic 4K.

Negative: baby, infant, pregnancy, ultrasound, smartphone-as-hero, glowing screen, tech-product-ad aesthetic, celebrating patient, hugging, tears, smile, stock photo, clinic logo, watermark, before-after, harsh flash, oversaturated, all-cream palette, oat-dominant.
```

### 3 — cerrahi-sperm-arama-tese  (deep navy dominant)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Vogue, Cereal Magazine.

Scene: Designer urology consultation room — deep navy painted feature wall with framed anatomical engravings, polished concrete floor, single mid-century leather chair. Tall window with sheer linen letting in low-contrast diffuse daylight. Architectural minimalism.

Subject: Male physician (50s) in tailored navy wool sweater over white cotton shirt, no white coat, hands resting on a vintage wooden anatomy book at his desk. Refined silver hair, contemplative reading posture. Documentary editorial tone, NOT clinical posed portrait.

Color signature (ABSOLUTE PRIORITY / MANDATORY): The dominant color MUST be DEEP NAVY #2563a8 — at least 50% of the visible scene area is navy via wall paint AND sweater. Accent: ivory/cream and brass. If cream dominates, brief has failed.

Props: vintage anatomy book open to male reproductive system illustration, brass loupe magnifier, single white peony in slim navy ceramic vessel, framed engraving of surgical instruments.

Composition: rule-of-thirds, subject left-third, navy wall negative space right. Architectural verticals. Light: cool diffuse window light, sculptural shadows, painterly low contrast. Lens: 50mm f/2.8 environmental portrait, hyperrealistic 4K.

Negative: baby, infant, pregnancy, ultrasound, surgical procedure, blood, scalpel close-up, operating theatre, exaggerated smile, stock photo, clinic logo, watermark, before-after, lingerie, all-cream, oat-dominant, generic Vogue cream scene.
```

### 4 — dusuk-amh-hamilelik  (warm wheat + apricot)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Vogue Living, Kinfolk.

Scene: Sunlit linen-draped bedroom of a refined apartment, warm wheat painted walls and soft apricot velvet armchair in foreground. Tall arched window with golden-hour low-angle light. Vintage Berber rug, sculptural ceramic floor vase.

Subject: Woman in her late 30s seated in the apricot velvet armchair, wrapped in an oversized warm wheat cashmere shawl, gazing toward the window light. Natural hair, minimal gold jewelry. Contemplative pause — Vogue cover energy, NOT melancholy, NOT distressed.

Color signature (ABSOLUTE PRIORITY / MANDATORY): WARM WHEAT walls AND APRICOT velvet armchair MUST dominate. Cream/oat only as supporting tone. If image reads "generic cream lifestyle" the brief has failed.

Props: warm wheat cashmere throw, hardcover book on AMH/ovarian reserve research styled elegantly, fresh wheat stems in earthenware vessel, brass tea cup.

Composition: rule-of-thirds, subject right-third in apricot chair, window light left. Layered textiles foreground. Light: low golden hour through arched window, painterly chiaroscuro, warm but desaturated. Lens: 50mm f/2.0 environmental, hyperrealistic 4K.

Negative: baby, infant, pregnancy belly, ultrasound, tears, sadness, exaggerated smile, stock photo, clinic logo, watermark, before-after, lingerie, all-cream, oat-only, generic Vogue scene without color signature.
```

### 5 — embriyo-transferi-gun-secimi  (navy + warm wheat)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Vogue, AnOther Magazine.

Scene: Architectural designer fertility clinic consultation room — deep navy accent wall behind a sculptural walnut desk, warm wheat linen drapes diffusing afternoon light. Marble desk surface, leather desk pad.

Subject: Female fertility specialist (40s) in a deep navy silk blouse, seated at desk reviewing an embryo development timeline chart. Refined natural styling, contemplative hands-on-paper posture. Documentary editorial, NOT posed clinical portrait.

Color signature (ABSOLUTE PRIORITY / MANDATORY): NAVY blouse AND wall dominant, WARM WHEAT drapes secondary. If cream/oat dominates the scene, brief has failed.

Props: hand-drawn embryo development timeline (day 3 vs day 5 blastocyst sketches), vintage brass calendar, leather-bound notebook, single sprig of wheat in slim ceramic vessel.

Composition: rule-of-thirds, subject left-third, navy wall negative space right, wheat drapes far right. Light: diffuse warm afternoon through linen drapes, painterly soft chiaroscuro. Lens: 50mm f/2.8, hyperrealistic 4K.

Negative: baby, infant, pregnancy, ultrasound image hero, exaggerated smile, stock photo, clinic logo, watermark, before-after, harsh flash, all-cream, oat-dominant.
```

### 6 — embriyo-transferi-sonrasi-bakim  (warm gold + ivory)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Kinfolk, Cereal Magazine.

Scene: Sunlit linen-draped bedroom interior, warm gold late-afternoon light streaming through tall windows. Ivory linen bedding, sculptural side table with brass lamp. Mid-century chair with cashmere throw. Minimal, restorative atmosphere.

Subject: Woman in her early 30s reclining gently against a stack of ivory linen pillows, wearing an ivory silk pajama top, reading a hardcover book. Natural posture, eyes downward on page, calm contemplative — Kinfolk magazine restraint, NOT sleeping, NOT melancholy.

Color signature (ABSOLUTE PRIORITY / MANDATORY): WARM GOLD light AND IVORY linens MUST define the scene. Accent: brass and warm wheat. NOT the same as oat-dominant cream — this is luminous gold-hour ivory.

Props: hardcover book (no visible title), brass cup of herbal tea on linen tray, single fresh white peony in slim brass vessel, folded warm wheat throw at foot of bed.

Composition: rule-of-thirds, subject right-third reclined, window light left with golden glow. Layered foreground (tea tray) and background (window). Light: low golden-hour light, painterly warm chiaroscuro, soft and intimate but not sentimental. Lens: 85mm f/1.8 shallow DOF, hyperrealistic 4K.

Negative: baby, infant, pregnancy belly, ultrasound, tears, exaggerated smile, clinical procedure, stock photo, clinic logo, watermark, before-after, lingerie, sexualized pose, all-cream-without-gold, generic cream Vogue scene.
```

### 7 — endometrioma  (sage)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Vogue Living, AnOther.

Scene: Refined apartment kitchen with deep sage green painted cabinets and marble countertop, tall window with morning light. Open shelving with antique brass cookware and ceramic vessels. Architectural lines.

Subject: Woman in her 30s in a sage silk blouse and oversized cream cashmere knit, leaning against the marble counter holding a warm ceramic cup. Side profile, contemplative gaze toward window. Vogue editorial restraint, NOT posed lifestyle.

Color signature (ABSOLUTE PRIORITY / MANDATORY): SAGE GREEN cabinets AND silk blouse MUST dominate. Cream supporting only. If image reads "all-cream kitchen," brief has failed.

Props: open hardcover book on women's pelvic health, sage ceramic cup, dried olive branch in vase, marble cutting board with fresh figs.

Composition: rule-of-thirds, subject right-third, sage cabinets fill left-third negative space. Light: soft morning daylight through window, painterly diffuse chiaroscuro. Lens: 50mm f/2.0 environmental, hyperrealistic 4K.

Negative: baby, infant, pregnancy, ultrasound, anatomical diagram overlay, exaggerated smile, stock photo, clinic logo, watermark, all-cream, oat-dominant.
```

### 8 — endometriozis-akilli-stratejiler  (mint)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Cereal Magazine, Kinfolk.

Scene: Botanical atelier study — soft mint-painted accent wall, sculptural mid-century desk, tall window onto a leafy garden. Brass desk lamp, vintage botanical prints framed minimally. Linen drapes.

Subject: Woman in her late 20s in a mint silk button-up shirt, seated at the desk writing in a hardcover journal. Natural hair tucked behind one ear, minimal gold jewelry. Contemplative writing posture — AnOther magazine quiet energy.

Color signature (ABSOLUTE PRIORITY / MANDATORY): MINT GREEN #3a8a66 wall AND silk shirt MUST dominate. Accent: brass and ivory. If cream/oat dominates, brief has failed.

Props: hardcover journal with handwritten endometriosis self-management notes, brass fountain pen, single fern frond in slim mint ceramic vessel, vintage botanical print of female anatomy plants.

Composition: rule-of-thirds, subject left-third at desk, mint wall fills right-third negative space, window light upper-left. Light: cool morning daylight through linen, painterly low contrast. Lens: 85mm f/2.0 shallow DOF on hands and journal, hyperrealistic 4K.

Negative: baby, infant, pregnancy, anatomical organ illustration as hero, ultrasound, tears, exaggerated smile, stock photo, clinic logo, watermark, all-cream, oat-dominant, generic Vogue editorial. Avoid not defteri + fountain pen combo if previously used — pen alone OR journal alone.
```

### 9 — endometriozis-tup-bebek  (sage olive)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Vogue Living.

Scene: Sun-soaked sculptural living room with sage olive boucle armchair and tall arched window. Architectural plaster walls, vintage Berber rug. Mid-century brass floor lamp. Layered textiles.

Subject: Woman in her 30s seated in the sage olive boucle armchair, wearing an oversized sage cashmere cardigan over an ivory silk slip. Reading a hardcover book on integrated reproductive medicine. Natural styling, calm gaze downward.

Color signature (ABSOLUTE PRIORITY / MANDATORY): SAGE OLIVE armchair AND cardigan MUST dominate the scene. Cream/ivory supporting only. If image reads "all-cream Vogue scene" the brief has failed.

Props: hardcover medical book styled elegantly, brass tea cup on stack of olive-toned books, dried eucalyptus branch in sage ceramic vase, woven Berber rug detail.

Composition: rule-of-thirds, subject right-third in armchair, arched window left with diffuse light. Layered foreground textile, background plaster wall. Light: soft diffuse morning, painterly chiaroscuro. Lens: 50mm f/2.0 environmental portrait, hyperrealistic 4K.

Negative: baby, infant, pregnancy, ultrasound, exaggerated smile, stock photo, clinic logo, watermark, before-after, all-cream, oat-dominant, identical to mint endometriosis scene.
```

### 10 — endometriyal-scratching  (terracotta)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Vogue, AnOther Magazine.

Scene: Architectural pre-procedure consultation alcove — terracotta painted feature wall with soft warm afternoon light, sculptural walnut desk and bench. Linen-curtained window. Refined preparatory atmosphere.

Subject: Female physician (40s) in a terracotta wrap blouse and tailored cream wool trousers, seated at desk reviewing a hysteroscopy preparation checklist on hand-printed paper. Refined natural styling, contemplative reading posture.

Color signature (ABSOLUTE PRIORITY / MANDATORY): TERRACOTTA wall AND wrap blouse dominate. Apricot accents secondary. Cream only supporting. If all-cream the brief has failed.

Props: hand-printed pre-procedure checklist styled elegantly, brass desk lamp lit warm, single dried red carnation in terracotta clay vessel, leather-bound appointment notebook.

Composition: rule-of-thirds, subject left-third, terracotta wall fills right-third. Layered desk objects foreground. Light: warm sculptural afternoon, painterly chiaroscuro, low contrast. Lens: 50mm f/2.8 environmental, hyperrealistic 4K.

Negative: baby, infant, pregnancy, ultrasound, surgical instruments close-up, speculum, blood, clinical procedure shot, exaggerated smile, stock photo, clinic logo, watermark, before-after, all-cream, oat-dominant.
```

### 11 — endoskopik-cerrahi-histeroskopi  (apricot)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Vogue Living, Cereal Magazine.

Scene: Designer pre-operative consultation room with soft apricot painted accent wall, marble side table, mid-century apricot velvet bench. Tall window with diffuse golden afternoon light. Architectural minimalism.

Subject: Woman in her 30s seated on the apricot velvet bench in an ivory linen wrap dress, holding a hardcover patient information booklet on hysteroscopy. Calm reading posture, natural hair, minimal gold jewelry.

Color signature (ABSOLUTE PRIORITY / MANDATORY): APRICOT bench AND wall must define the scene. Ivory supporting. If image reads "all-cream" or "generic Vogue lifestyle" brief has failed.

Props: hardcover patient education booklet, brass tea cup, dried apricot-colored craspedia in slim ceramic vessel, single sculptural marble paperweight.

Composition: rule-of-thirds, subject right-third on bench, apricot wall left negative space, window light upper-left. Light: warm diffuse golden hour, painterly soft chiaroscuro. Lens: 50mm f/2.0 environmental, hyperrealistic 4K.

Negative: baby, infant, pregnancy, ultrasound, surgical procedure, speculum, OR theatre, exaggerated smile, stock photo, clinic logo, watermark, before-after, all-cream, oat-dominant.
```

### 12 — erkek-dogurganlik-besin-takviyeleri  (sage + warm wheat)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Kinfolk, Cereal Magazine.

Scene: Architectural kitchen with sage green painted cabinets and warm wheat linen drapes, marble countertop with morning light pouring in. Sculptural ceramic vessels, brass cookware on open shelving.

Subject: Man in his 30s in a warm wheat cashmere knit, leaning against marble counter holding a small wooden bowl of brazil nuts and pomegranate seeds. Natural styling, contemplative downward gaze at bowl. Documentary editorial restraint.

Color signature (ABSOLUTE PRIORITY / MANDATORY): SAGE cabinets AND WARM WHEAT knit AND drapes co-dominate. Cream only supporting. If all-cream brief has failed.

Props: wooden bowl with brazil nuts, walnuts, pomegranate seeds, fresh leafy greens; printed nutrition research paper styled flat on counter; brass mortar with crushed seeds; single olive branch in sage ceramic vessel.

Composition: rule-of-thirds, subject right-third, sage cabinets fill left-third background, warm wheat drapes far left. Light: bright diffuse morning, painterly soft shadows. Lens: 50mm f/2.8 environmental, hyperrealistic 4K.

Negative: baby, infant, pregnancy, ultrasound, supplement bottles, pill close-up, stock fitness ad aesthetic, exaggerated smile, stock photo, clinic logo, watermark, all-cream, oat-dominant.
```

### 13 — hidrosalpinx-ve-kisirlik  (soft apricot)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Vogue, AnOther Magazine.

Scene: Sun-drenched architectural gallery interior with soft apricot painted feature wall and tall arched window. Sculptural plaster textures, mid-century apricot velvet chaise. Vintage Berber rug on polished concrete.

Subject: Woman in her 30s reclining elegantly on the apricot velvet chaise in an ivory silk shirt and warm wheat linen wide-leg trousers, holding an open hardcover book on tubal health and assisted reproduction. Contemplative gaze on page, calm composure.

Color signature (ABSOLUTE PRIORITY / MANDATORY): SOFT APRICOT chaise AND wall dominate. Ivory and wheat supporting. If all-cream brief has failed.

Props: open hardcover book on female reproductive anatomy (no diagrams visible), brass tea cup on side table, dried apricot-colored hydrangea in slim ceramic vessel, single fresh pear on marble surface.

Composition: rule-of-thirds, subject lower-third reclined, apricot wall and chaise dominate, window upper-right with light. Light: warm diffuse golden hour, painterly chiaroscuro. Lens: 50mm f/2.0 environmental, hyperrealistic 4K.

Negative: baby, infant, pregnancy, fallopian-tube illustration overlay, ultrasound, surgical scene, exaggerated smile, stock photo, clinic logo, watermark, all-cream, oat-dominant.
```

### 14 — hiperprolaktinemi-ve-kisirlik  (warm wheat)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Cereal Magazine, Vogue Living.

Scene: Refined atelier study with warm wheat painted walls and soft natural light through linen-draped window. Sculptural walnut desk, mid-century chair with cashmere throw, open shelving with antique books and ceramic vessels.

Subject: Woman in her early 30s in a warm wheat oversized cashmere knit and ivory silk slip skirt, seated at desk reading a hardcover endocrinology book. Refined natural styling, contemplative reading posture, hand resting on page.

Color signature (ABSOLUTE PRIORITY / MANDATORY): WARM WHEAT walls AND knit MUST dominate the scene as a unified warm earth tone, distinct from cream/oat. If the image reads "generic cream Vogue" brief has failed.

Props: hardcover endocrinology book, brass desk lamp lit warm, vintage anatomical diagram of pituitary gland styled elegantly aside, dried wheat stems in earthenware jug, brass tea cup.

Composition: rule-of-thirds, subject left-third at desk, warm wheat wall fills right-third negative space, window upper-right. Light: warm diffuse afternoon through linen, painterly chiaroscuro. Lens: 85mm f/2.0 on hands and book, hyperrealistic 4K.

Negative: baby, infant, pregnancy, brain MRI, pill close-up, stock photo, clinic logo, watermark, exaggerated smile, all-cream, oat-dominant scene.
```

### 15 — hormonal-tedavi-adenomyozis  (sage)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Kinfolk, AnOther Magazine.

Scene: Sunlit botanical garden alcove with sage olive painted greenhouse-style wall and tall multi-paned glass window. Mid-century woven chair with sage cashmere throw. Sculptural plants in clay pots — fern, olive, lavender.

Subject: Woman in her late 30s seated in the woven chair in a sage silk wrap blouse and oversized cream linen trousers, holding a small hardcover book on hormonal therapies. Natural hair loose, minimal gold jewelry, contemplative gaze toward window.

Color signature (ABSOLUTE PRIORITY / MANDATORY): SAGE wall AND silk blouse AND throw dominate. Cream supporting. If image reads "generic cream lifestyle" brief has failed.

Props: hardcover book on women's hormonal health, dried lavender in sage ceramic vessel, brass tea cup, single olive branch in slim ceramic vase, vintage botanical illustration.

Composition: rule-of-thirds, subject right-third in chair, sage wall and plants fill left-third, window upper-left with diffuse light. Light: cool morning daylight through multi-paned window, painterly low contrast. Lens: 50mm f/2.8 environmental, hyperrealistic 4K.

Negative: baby, infant, pregnancy, anatomical uterine illustration, pill close-up, exaggerated smile, stock photo, clinic logo, watermark, all-cream, oat-dominant.
```

### 16 — iui-nedir  (apricot)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Vogue Living, Cereal Magazine.

Scene: Designer clinic consultation alcove with soft apricot painted accent wall and warm afternoon light through arched window. Sculptural walnut bench with linen cushion, marble side table.

Subject: Woman in her early 30s seated on the linen bench, wearing an apricot silk blouse and warm wheat linen trousers, reading a hardcover patient information booklet on intrauterine insemination. Calm, contemplative posture, natural hair.

Color signature (ABSOLUTE PRIORITY / MANDATORY): APRICOT wall AND silk blouse MUST dominate. Warm wheat and ivory only supporting. If all-cream brief has failed.

Props: hardcover IUI procedure information booklet, brass tea cup on marble side table, dried craspedia in slim apricot ceramic vessel, leather-bound notebook.

Composition: rule-of-thirds, subject right-third on bench, apricot wall fills left-third negative space, arched window upper-left. Light: warm diffuse golden hour, painterly soft chiaroscuro. Lens: 50mm f/2.0 environmental, hyperrealistic 4K.

Negative: baby, infant, pregnancy, sperm illustration, syringe close-up, ultrasound, exaggerated smile, stock photo, clinic logo, watermark, all-cream, oat-dominant.
```

### 17 — kac-yumurta-gerekir  (navy + wheat)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Vogue, AnOther Magazine.

Scene: Architectural designer study with deep navy painted feature wall and warm wheat linen drapes filtering soft afternoon light. Sculptural walnut desk with marble surface, mid-century chair with cashmere throw.

Subject: Woman in her 30s in a deep navy silk shirt and warm wheat linen trousers, seated at desk reviewing a printed statistical chart on egg yield outcomes. Refined natural styling, contemplative reading posture, hand on chart.

Color signature (ABSOLUTE PRIORITY / MANDATORY): NAVY wall AND silk shirt MUST dominate. Warm wheat drapes secondary. If cream/oat dominates brief has failed.

Props: printed statistical chart with elegant typography (no specific numbers visible — abstract bar/line graph), brass desk lamp, vintage hourglass, single sprig of wheat in slim navy ceramic vessel.

Composition: rule-of-thirds, subject left-third at desk, navy wall fills right-third negative space, wheat drapes far right. Light: warm diffuse afternoon through linen, painterly soft chiaroscuro. Lens: 85mm f/2.0 on hands and chart, hyperrealistic 4K.

Negative: baby, infant, pregnancy, ovarian follicle illustration, ultrasound, egg cell close-up, exaggerated smile, stock photo, clinic logo, watermark, all-cream, oat-dominant.
```

### 18 — kadin-kisirligi-tup-bebek  (mint)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Cereal Magazine, Kinfolk.

Scene: Refined apartment living room with soft mint painted accent wall, sculptural mid-century chaise upholstered in cream boucle, tall arched window with diffuse morning light. Vintage Berber rug, brass floor lamp.

Subject: Woman in her early 30s reclining on the cream boucle chaise in a mint silk button-up shirt and warm wheat linen trousers, holding an open hardcover book on women's reproductive health. Contemplative gaze on page, natural hair.

Color signature (ABSOLUTE PRIORITY / MANDATORY): MINT wall AND silk shirt MUST dominate. Cream chaise supporting only. If image reads "generic cream Vogue scene" brief has failed.

Props: hardcover medical reference book, brass tea cup on side table, fresh fern frond in slim mint ceramic vase, woven Berber rug detail.

Composition: rule-of-thirds, subject lower-third on chaise, mint wall fills upper-left negative space, arched window upper-right. Light: soft cool morning through arched window, painterly low contrast. Lens: 50mm f/2.0 environmental, hyperrealistic 4K.

Negative: baby, infant, pregnancy, anatomical uterus diagram, ultrasound, exaggerated smile, stock photo, clinic logo, watermark, all-cream, oat-dominant, identical to other mint scenes.
```

### 19 — kanser-ve-fertilite  (warm wheat + apricot)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Vogue Living, Cereal Magazine.

Scene: Sunlit refined apartment study with warm wheat painted walls and soft apricot velvet armchair in foreground. Tall arched window with low-angle golden hour light. Sculptural walnut desk, vintage Berber rug.

Subject: Woman in her late 20s seated in the apricot velvet armchair in an ivory silk wrap blouse and warm wheat linen trousers, holding a hardcover book on fertility preservation. Refined natural styling, calm contemplative posture, slight forward lean reading.

Color signature (ABSOLUTE PRIORITY / MANDATORY): WARM WHEAT walls AND APRICOT armchair MUST co-dominate. Ivory only supporting. If image reads "all-cream Vogue scene" brief has failed.

Props: hardcover book on oncofertility and egg/embryo preservation, brass tea cup, fresh wheat stems and dried apricot-colored craspedia in earthenware jug, leather-bound journal.

Composition: rule-of-thirds, subject right-third in apricot chair, warm wheat wall fills upper-left, window light upper-left. Layered foreground textile. Light: low golden hour, painterly warm chiaroscuro, sentimental restraint NOT melodrama. Lens: 50mm f/2.0 environmental, hyperrealistic 4K.

Negative: baby, infant, pregnancy, chemotherapy IV, hospital bed, hair loss imagery, tears, exaggerated smile, stock photo, clinic logo, watermark, before-after, all-cream, oat-dominant.
```

### 20 — kimyasal-gebelik  (warm gold + ivory)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Kinfolk, AnOther Magazine.

Scene: Quiet sunlit bedroom interior with warm gold late-afternoon light through tall windows. Ivory linen bedding, sculptural side table with brass lamp lit warm. Soft cashmere throw, vintage Berber rug on warm wood floor.

Subject: Woman in her early 30s seated at the edge of the bed in ivory silk pajamas and a warm wheat cashmere cardigan, hands resting on her lap holding a closed hardcover journal. Calm contemplative downward gaze, NOT crying, NOT melodramatic — Kinfolk quiet restraint.

Color signature (ABSOLUTE PRIORITY / MANDATORY): WARM GOLD light AND IVORY linens define the scene with brass accents. Distinct from oat-dominant cream — this is luminous gold-hour ivory. If image reads as "all cream" brief has failed.

Props: closed hardcover journal, brass tea cup on side table, single white peony in slim brass vessel, folded warm wheat throw across bed.

Composition: rule-of-thirds, subject right-third at bed edge, window light left with golden glow, brass lamp upper-right. Layered foreground textile. Light: low golden-hour, painterly warm chiaroscuro, intimate but composed. Lens: 85mm f/1.8 shallow DOF on hands and journal, hyperrealistic 4K.

Negative: baby, infant, pregnancy belly, ultrasound, positive pregnancy test, tears, sobbing, melodrama, stock photo, clinic logo, watermark, exaggerated smile, all-cream-without-gold, generic cream Vogue scene.
```

### 21 — mikroenjeksiyon-icsi-nedir  (deep navy)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Vogue, AnOther Magazine.

Scene: Architectural embryology laboratory with deep navy painted feature wall and polished concrete floor. Stainless steel sculptural microscope station on a marble bench. Cool diffuse daylight through frosted skylight. Vintage scientific posters framed minimally.

Subject: Female embryologist (30s) in a deep navy linen lab coat over an ivory silk blouse, leaning slightly toward an inverted microscope, hands gloved in white. Focused contemplative posture, refined natural styling, hair tied back simply. NOT a posed clinical portrait — editorial documentary tone.

Color signature (ABSOLUTE PRIORITY / MANDATORY): DEEP NAVY #2563a8 wall AND lab coat MUST dominate at least 50% of the scene. Stainless steel and ivory supporting. If all-cream brief has failed.

Props: inverted microscope (modern stainless steel), petri dish on stage, slim navy ceramic vessel with single white tulip, vintage embryology textbook closed on shelf.

Composition: rule-of-thirds, subject right-third at microscope, navy wall fills left-third negative space. Architectural verticals from skylight. Light: cool sculptural overcast daylight, painterly soft chiaroscuro. Lens: 50mm f/2.8 environmental, hyperrealistic 4K.

Negative: baby, infant, pregnancy, embryo image close-up, sperm illustration, injection needle macro, exaggerated smile, stock photo, clinic logo, watermark, all-cream, oat-dominant.
```

### 22 — miyom-ameliyati  (terracotta)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Vogue Living, Cereal Magazine.

Scene: Refined pre-surgical consultation alcove with terracotta painted feature wall and warm afternoon light through linen-draped window. Sculptural walnut bench, marble side table, mid-century brass floor lamp.

Subject: Woman in her late 30s seated on the bench in a terracotta wrap blouse and warm wheat wide-leg trousers, reading a hardcover patient education booklet on myomectomy and uterine fibroid surgery. Refined natural styling, calm contemplative posture.

Color signature (ABSOLUTE PRIORITY / MANDATORY): TERRACOTTA wall AND wrap blouse MUST dominate. Warm wheat secondary, ivory supporting. If all-cream brief has failed.

Props: hardcover patient education booklet, brass tea cup, dried red carnation in terracotta clay vessel, leather-bound questions notebook.

Composition: rule-of-thirds, subject right-third on bench, terracotta wall fills left-third, window upper-left with warm light. Light: warm sculptural afternoon, painterly chiaroscuro. Lens: 50mm f/2.0 environmental, hyperrealistic 4K.

Negative: baby, infant, pregnancy, uterine fibroid illustration, surgical instruments, OR theatre, exaggerated smile, stock photo, clinic logo, watermark, before-after, all-cream, oat-dominant.
```

### 23 — miyomlar-ve-tup-bebek  (apricot)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Kinfolk, AnOther Magazine.

Scene: Architectural designer fertility consultation room with soft apricot painted accent wall, marble desk, mid-century apricot velvet chair. Tall window with diffuse afternoon golden light. Vintage Berber rug on polished concrete.

Subject: Female fertility specialist (40s) seated at marble desk in an apricot silk blouse and warm wheat linen trousers, reviewing a printed treatment plan document. Refined natural styling, contemplative posture, hand resting on paper.

Color signature (ABSOLUTE PRIORITY / MANDATORY): APRICOT wall AND silk blouse AND velvet chair MUST dominate. Warm wheat secondary. If all-cream brief has failed, image must read distinct from previous terracotta scenes.

Props: printed treatment timeline document with elegant typography, brass desk lamp, single apricot-colored ranunculus in slim ceramic vessel, vintage anatomical illustration framed on wall.

Composition: rule-of-thirds, subject left-third at desk, apricot wall fills right-third, window upper-right with warm light. Light: diffuse warm afternoon, painterly soft chiaroscuro. Lens: 50mm f/2.8 environmental, hyperrealistic 4K.

Negative: baby, infant, pregnancy, fibroid illustration, ultrasound, surgical scene, exaggerated smile, stock photo, clinic logo, watermark, all-cream, oat-dominant.
```

### 24 — opk-ve-ivf  (sage olive)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Vogue Living, Cereal Magazine.

Scene: Refined architectural kitchen with sage olive painted cabinets and tall window letting in soft morning daylight. Marble countertop, brass cookware on open shelving, sculptural ceramic vessels. Vintage Berber rug.

Subject: Woman in her late 20s leaning against the marble counter in a sage olive silk button-up shirt and warm wheat linen wide-leg trousers, holding a small ceramic bowl of fresh berries and seeds. Natural hair, minimal gold jewelry, contemplative downward gaze at bowl.

Color signature (ABSOLUTE PRIORITY / MANDATORY): SAGE OLIVE cabinets AND silk shirt MUST dominate. Warm wheat and ivory supporting. If all-cream brief has failed; distinct from other sage scenes by olive-green warmth.

Props: small ceramic bowl with fresh blueberries, walnuts, chia seeds; printed nutrition research paper on PCOS styled flat on counter; brass tea cup; single olive branch in slim sage vessel.

Composition: rule-of-thirds, subject right-third at counter, sage cabinets fill left-third background, window upper-left with diffuse light. Light: cool diffuse morning, painterly soft shadows. Lens: 50mm f/2.8 environmental, hyperrealistic 4K.

Negative: baby, infant, pregnancy, ovary illustration, ultrasound, supplement bottles, scale, weight-loss aesthetic, exaggerated smile, stock photo, clinic logo, watermark, all-cream, oat-dominant.
```

### 25 — pgt-cinsiyet-secimi  (deep navy)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Vogue, AnOther Magazine.

Scene: Architectural designer genetic counseling office with deep navy painted feature wall and tall industrial window onto a city skyline. Sculptural walnut desk with marble surface, mid-century leather chair. Vintage anatomical engravings framed minimally.

Subject: Female genetic counselor (40s) in a deep navy silk shirt and tailored ivory wool trousers, seated at desk reviewing a printed karyotype chart and pedigree diagram. Refined natural styling, contemplative hands-on-paper reading posture.

Color signature (ABSOLUTE PRIORITY / MANDATORY): DEEP NAVY #2563a8 wall AND silk shirt MUST dominate at least 50% of the visible scene. Ivory supporting. If all-cream brief has failed.

Props: printed karyotype chart (abstract chromosomal layout), pedigree family tree diagram with elegant typography, brass desk lamp lit cool, single white iris in slim navy ceramic vessel, vintage genetics textbook closed on shelf.

Composition: rule-of-thirds, subject left-third at desk, navy wall fills right-third negative space, window upper-right. Architectural verticals. Light: cool diffuse window light, painterly soft chiaroscuro. Lens: 50mm f/2.8 environmental, hyperrealistic 4K.

Negative: baby, infant, pregnancy, blue/pink gender symbols, gender reveal aesthetic, ultrasound, embryo image, DNA helix illustration as hero, exaggerated smile, stock photo, clinic logo, watermark, all-cream, oat-dominant.
```

### 26 — pgt-m  (navy + sage)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Cereal Magazine, AnOther.

Scene: Architectural designer genetic clinic consultation room with deep navy painted feature wall and sage olive linen drapes filtering cool morning light. Sculptural walnut bench, marble side table, brass floor lamp. Polished concrete floor.

Subject: Couple in their late 30s seated side by side on the walnut bench in coordinated tones — woman in sage silk wrap blouse, man in deep navy crewneck cashmere. Both leaning forward slightly reading a printed information sheet on single-gene disorder PGT-M testing. Refined natural styling, contemplative posture, distinct from posed couple-portrait.

Color signature (ABSOLUTE PRIORITY / MANDATORY): NAVY wall AND man's sweater AND sage blouse AND drapes co-dominate. Ivory supporting. If all-cream brief has failed; must read distinct from pgt-cinsiyet-secimi by sage presence.

Props: printed PGT-M information sheet with elegant typography (abstract gene diagram), brass tea cups on marble table, single olive branch in slim navy ceramic vessel, leather-bound notebook.

Composition: rule-of-thirds, couple lower-third on bench, navy wall fills upper-left, sage drapes upper-right with window light. Light: cool diffuse morning through drapes, painterly soft chiaroscuro. Lens: 50mm f/2.8 environmental, hyperrealistic 4K.

Negative: baby, infant, pregnancy, DNA helix illustration, embryo image, family-photo aesthetic, exaggerated smile, posed couple hug, stock photo, clinic logo, watermark, all-cream, oat-dominant.
```

### 27 — taze-dondurulmus-transfer  (mint + ivory)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Vogue Living, AnOther Magazine.

Scene: Refined embryology cryopreservation alcove with soft mint painted accent wall and cool diffuse daylight through frosted skylight. Stainless steel sculptural Dewar cryo-tank in background partial view, marble bench, ivory linen drapes.

Subject: Female embryologist (30s) in a mint silk shirt under an ivory linen lab coat, hands gloved white, holding a small clipboard with embryo cryopreservation records. Focused contemplative posture beside the marble bench. NOT a posed clinical portrait.

Color signature (ABSOLUTE PRIORITY / MANDATORY): MINT wall AND silk shirt dominate. Ivory and stainless steel supporting. If image reads "generic cream lab" brief has failed.

Props: small clipboard with embryo development log, stainless steel cryo-storage tank (partial sculptural view, not center stage), single white tulip in slim mint ceramic vessel, vintage scientific paper on vitrification.

Composition: rule-of-thirds, embryologist right-third, mint wall fills left-third, skylight upper-center. Layered foreground (clipboard) and background (cryo-tank). Light: cool sculptural overcast daylight, painterly low contrast. Lens: 50mm f/2.8 environmental, hyperrealistic 4K.

Negative: baby, infant, pregnancy, embryo image as hero, frozen embryo extreme close-up, smoke/cryo-fog aesthetic, exaggerated smile, stock photo, clinic logo, watermark, all-cream, oat-dominant.
```

### 28 — tup-bebek-sureci-rehber  (navy + warm wheat)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Vogue, Cereal Magazine.

Scene: Architectural designer fertility center entrance/reception corner with deep navy painted feature wall and warm wheat linen drapes filtering afternoon light. Marble reception desk, mid-century walnut bench, vintage Berber rug on polished concrete.

Subject: Female fertility specialist (50s, Dr. Aksoy-inspired silvering hair) in a deep navy silk shirt and tailored ivory wool trousers, standing in three-quarter pose beside the marble desk, holding a folded leather-bound treatment journey guide. Refined natural styling, calm authoritative editor presence — NOT posed clinical portrait.

Color signature (ABSOLUTE PRIORITY / MANDATORY): NAVY wall AND silk shirt dominate. Warm wheat drapes secondary. Ivory supporting only. If all-cream brief has failed.

Props: folded leather-bound treatment journey guide, brass desk lamp lit warm, single white iris in slim navy ceramic vessel, vintage anatomical engraving framed on wall.

Composition: rule-of-thirds, subject left-third standing, navy wall fills right-third negative space, wheat drapes far right. Architectural verticals. Light: warm diffuse afternoon through linen, painterly soft chiaroscuro. Lens: 35mm f/2.8 environmental wide editorial, hyperrealistic 4K.

Negative: baby, infant, pregnancy, embryo, ultrasound, exaggerated smile, stock photo, clinic logo, watermark, before-after, posed clinical portrait, all-cream, oat-dominant.
```

### 29 — tup-bebek-yanlis-bilinenler  (sage)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Kinfolk, AnOther Magazine.

Scene: Refined apartment library nook with sage olive painted bookshelf wall filled with vintage hardbound books, tall arched window with cool morning light. Sculptural mid-century leather chair, marble side table.

Subject: Woman in her 30s seated in the leather chair in a sage silk wrap blouse and warm wheat linen trousers, holding two hardcover books — one open, one closed marked with a brass bookmark. Refined natural styling, contemplative comparative reading posture.

Color signature (ABSOLUTE PRIORITY / MANDATORY): SAGE OLIVE bookshelf AND silk blouse MUST dominate. Warm wheat secondary, ivory supporting. If all-cream brief has failed; must read distinct from other sage scenes by bookshelf density.

Props: two hardcover medical reference books, brass bookmark, brass tea cup on marble side table, fresh olive branch in slim sage ceramic vessel.

Composition: rule-of-thirds, subject right-third in chair, sage bookshelf fills left-third and upper-third negative space, arched window upper-right. Light: cool morning daylight, painterly low contrast. Lens: 50mm f/2.0 environmental, hyperrealistic 4K.

Negative: baby, infant, pregnancy, question-mark graphic overlay, myth-vs-fact split, exaggerated smile, stock photo, clinic logo, watermark, all-cream, oat-dominant.
```

### 30 — vajinal-mikrobiyom-fiv  (mint)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Cereal Magazine, AnOther.

Scene: Architectural designer kitchen with soft mint painted accent wall and marble countertop, tall window with cool diffuse morning daylight. Sculptural ceramic fermentation vessels on open shelving, brass tea kettle.

Subject: Woman in her early 30s standing at the marble counter in a mint silk button-up shirt and ivory linen wide-leg trousers, gently arranging fresh fermented foods (kefir, kombucha, yogurt jars) on the counter. Natural hair, minimal gold jewelry, focused contemplative posture.

Color signature (ABSOLUTE PRIORITY / MANDATORY): MINT wall AND silk shirt MUST dominate. Ivory supporting. If image reads "all-cream kitchen lifestyle" brief has failed; must read distinct from other mint scenes by fermented-food still life.

Props: small glass jar of kefir, ceramic bowl of plain yogurt, kombucha SCOBY in glass jar, sprig of fresh dill on marble, brass measuring spoons, single fern frond in slim mint ceramic vessel.

Composition: rule-of-thirds, subject right-third at counter, mint wall fills upper-left, window upper-center with diffuse light. Layered foreground (fermented foods) and background (mint wall). Light: cool morning daylight, painterly soft shadows. Lens: 50mm f/2.8 environmental, hyperrealistic 4K.

Negative: baby, infant, pregnancy, bacteria illustration, petri dish close-up, probiotic supplement bottles, microscope view, exaggerated smile, stock photo, clinic logo, watermark, all-cream, oat-dominant.
```

### 31 — yumurtalik-kistleri-dogurganlik  (soft apricot)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Vogue Living, Kinfolk.

Scene: Sun-drenched architectural living room with soft apricot painted feature wall and tall arched window letting in warm afternoon light. Sculptural mid-century apricot velvet armchair, marble side table, vintage Berber rug on warm wood floor.

Subject: Woman in her late 20s seated in the apricot velvet armchair in an ivory silk wrap blouse and warm wheat linen wide-leg trousers, holding an open hardcover book on benign ovarian conditions. Refined natural styling, calm contemplative reading posture.

Color signature (ABSOLUTE PRIORITY / MANDATORY): SOFT APRICOT armchair AND wall MUST dominate. Ivory and warm wheat supporting. If all-cream brief has failed; must read distinct from other apricot scenes by armchair-as-center.

Props: open hardcover book on women's reproductive health, brass tea cup on marble table, dried apricot-colored hydrangea in slim ceramic vessel, single fresh pear on side table.

Composition: rule-of-thirds, subject right-third in armchair, apricot wall fills left-third, arched window upper-left with warm light. Light: warm diffuse afternoon, painterly soft chiaroscuro. Lens: 50mm f/2.0 environmental, hyperrealistic 4K.

Negative: baby, infant, pregnancy, ovarian cyst illustration, ultrasound, surgical scene, exaggerated smile, stock photo, clinic logo, watermark, all-cream, oat-dominant.
```

### 32 — yumurtlama-takibi  (warm wheat + sage)

```
Vogue editorial photography, cinematic 1600x900 horizontal frame. Inspired by Cereal Magazine, AnOther Magazine.

Scene: Refined atelier study with warm wheat painted walls and sage olive linen drapes filtering cool morning light. Sculptural walnut desk with marble surface, mid-century chair with sage cashmere throw, brass desk lamp.

Subject: Woman in her early 30s seated at the desk in a sage silk shirt and warm wheat linen trousers, marking a refined calendar journal with a brass fountain pen — tracking ovulation cycle. Refined natural styling, contemplative downward gaze on calendar, hand poised over page. (Per memory: avoid the notebook+fountain-pen prop combination if recently used elsewhere — emphasize calendar journal layout, large month grid visible instead.)

Color signature (ABSOLUTE PRIORITY / MANDATORY): WARM WHEAT walls AND SAGE drapes AND silk shirt MUST co-dominate. Ivory supporting. If all-cream brief has failed.

Props: hardcover calendar journal with large month-grid layout (no specific dates visible — abstract cycle tracking), brass fountain pen, brass tea cup, single sprig of wheat in slim sage ceramic vessel, vintage astronomical lunar phase print framed on wall.

Composition: rule-of-thirds, subject right-third at desk, warm wheat wall fills upper-left, sage drapes far left with window light. Light: cool diffuse morning through linen, painterly soft chiaroscuro. Lens: 85mm f/2.0 shallow DOF on calendar journal, hyperrealistic 4K.

Negative: baby, infant, pregnancy, ovulation kit, basal thermometer close-up, fertility app screen, calendar with hearts/smileys, exaggerated smile, stock photo, clinic logo, watermark, all-cream, oat-dominant.
```

---

## Batch önerisi

32 prompt'u tek seansta üretmek yorucu — 4 batch halinde önerilirim:

- **Batch 1 (8): Endometriozis ailesi + tubal**: 7, 8, 9, 10, 11, 13, 15, 22
- **Batch 2 (8): Erkek + genetik**: 2, 3, 12, 17, 21, 25, 26, 28
- **Batch 3 (8): Lifestyle + nutrition + lifestyle**: 1, 4, 14, 18, 24, 29, 30, 32
- **Batch 4 (8): Bekleyiş + apricot ailesi**: 5, 6, 16, 19, 20, 23, 27, 31

Her batch sonrası bir QA gözden geçirme — banana cream'e kaymış mı, aynı sahne tekrar etmiş mi, marka rengi gerçekten dominant mı?
