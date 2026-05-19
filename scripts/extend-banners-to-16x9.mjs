import sharp from 'sharp';
import { mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'public/images/library');
const OUT = join(ROOT, 'public/images/makaleler');

const TARGET_W = 1600;
const TARGET_H = 900;

// Banner görsel -> slug eşleştirmesi (frontmatter grep'inden)
const JOBS = [
  { src: 'klinik/70.webp',                                                  slug: 'bagisiklik-tedavileri' },
  { src: 'klinik/ceptel.webp',                                              slug: 'cep-telefonu-sperm-kalitesi' },
  { src: 'klinik/203.webp',                                                 slug: 'cerrahi-sperm-arama-tese' },
  { src: 'hastalik/dusuk-amh.webp',                                         slug: 'dusuk-amh-hamilelik' },
  { src: 'klinik/42.webp',                                                  slug: 'embriyo-transferi-gun-secimi' },
  { src: 'tedavi/post_transfert.webp',                                      slug: 'embriyo-transferi-sonrasi-bakim' },
  { src: 'klinik/65.webp',                                                  slug: 'endometrioma' },
  { src: 'hastalik/kisirlik_endometriozis.webp',                            slug: 'endometriozis-akilli-stratejiler' },
  { src: 'hastalik/endometriosis_tedavi.webp',                              slug: 'endometriozis-tup-bebek' },
  { src: 'hastalik/endometriyal_scratching_histeroskopi.webp',              slug: 'endometriyal-scratching' },
  { src: 'klinik/83.webp',                                                  slug: 'endoskopik-cerrahi-histeroskopi' },
  { src: 'hastalik/erkekinfertilite.webp',                                  slug: 'erkek-dogurganlik-besin-takviyeleri' },
  { src: 'hastalik/hidrosalpinks.webp',                                     slug: 'hidrosalpinx-ve-kisirlik' },
  { src: 'hastalik/prolaktin.webp',                                         slug: 'hiperprolaktinemi-ve-kisirlik' },
  { src: 'hastalik/prolakktin.webp',                                        slug: 'hormonal-tedavi-adenomyozis' },
  { src: 'tedavi/iac.webp',                                                 slug: 'iui-nedir' },
  { src: 'embriyo/yumurta-sayisi.webp',                                     slug: 'kac-yumurta-gerekir' },
  { src: 'laboratuvar/icsicizim.webp',                                      slug: 'kadin-kisirligi-tup-bebek' },
  { src: 'laboratuvar/dr-senai-aksoy-istanbul-ivf-laboratuvar.webp',        slug: 'kanser-ve-fertilite' },
  { src: 'embriyo/kimyasal-gebelik.webp',                                   slug: 'kimyasal-gebelik' },
  { src: 'klinik/181.webp',                                                 slug: 'mikroenjeksiyon-icsi-nedir' },
  { src: 'hastalik/miyom-ameliyati-ne-zaman-gerekir.webp',                  slug: 'miyom-ameliyati' },
  { src: 'hastalik/miyom_ivf.webp',                                         slug: 'miyomlar-ve-tup-bebek' },
  { src: 'hastalik/opkveivf.webp',                                          slug: 'opk-ve-ivf' },
  { src: 'embriyo/pgt_sex.webp',                                            slug: 'pgt-cinsiyet-secimi' },
  { src: 'embriyo/pgt.webp',                                                slug: 'pgt-m' },
  { src: 'tedavi/taze-donmus-transfert.webp',                               slug: 'taze-dondurulmus-transfer' },
  { src: 'tedavi/tup_bebek_muayene.webp',                                   slug: 'tup-bebek-sureci-rehber' },
  { src: 'klinik/41.webp',                                                  slug: 'tup-bebek-yanlis-bilinenler' },
  { src: 'laboratuvar/microbiota.webp',                                     slug: 'vajinal-mikrobiyom-fiv' },
  { src: 'klinik/237.webp',                                                 slug: 'yumurtalik-kistleri-dogurganlik' },
  { src: 'klinik/54.webp',                                                  slug: 'yumurtlama-takibi' },
];

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

async function extend(srcRel, slug) {
  const srcPath = join(SRC, srcRel);
  const outPath = join(OUT, `${slug}.webp`);

  // 1) Görseli 1600 genişliğe scale et (oran korumalı)
  const scaled = await sharp(srcPath)
    .resize({ width: TARGET_W, withoutEnlargement: false })
    .toBuffer();
  const scaledMeta = await sharp(scaled).metadata();
  const scaledH = scaledMeta.height;

  if (scaledH >= TARGET_H) {
    // Zaten 16:9 veya daha dar — sadece 1600x900 cover crop yap
    await sharp(srcPath)
      .resize(TARGET_W, TARGET_H, { fit: 'cover', position: 'center' })
      .webp({ quality: 85 })
      .toFile(outPath);
    return { slug, mode: 'crop', from: `${scaledMeta.width}x${scaledH}` };
  }

  // 2) Blur background: kaynak görseli 1600x900 cover yap, ağır blur uygula
  const bg = await sharp(srcPath)
    .resize(TARGET_W, TARGET_H, { fit: 'cover', position: 'center' })
    .blur(40)
    .modulate({ brightness: 0.92, saturation: 0.6 }) // hafif loş + desatüre
    .toBuffer();

  // 3) Original (scale'lenmiş) versiyonu blur bg üstüne ortala
  const top = Math.floor((TARGET_H - scaledH) / 2);
  await sharp(bg)
    .composite([{ input: scaled, top, left: 0 }])
    .webp({ quality: 88 })
    .toFile(outPath);

  return { slug, mode: 'blur-extend', from: `${scaledMeta.width}x${scaledH}`, top };
}

console.log(`Extending ${JOBS.length} banner images to ${TARGET_W}x${TARGET_H}\n`);

const results = [];
for (const job of JOBS) {
  try {
    const res = await extend(job.src, job.slug);
    console.log(`  ✓ ${res.slug.padEnd(40)} ${res.mode.padEnd(12)} (${res.from})`);
    results.push({ ok: true, ...res });
  } catch (err) {
    console.error(`  ✗ ${job.slug}: ${err.message}`);
    results.push({ ok: false, slug: job.slug, error: err.message });
  }
}

const ok = results.filter(r => r.ok).length;
const fail = results.length - ok;
console.log(`\n${ok} ok, ${fail} fail. Output: ${OUT}`);
