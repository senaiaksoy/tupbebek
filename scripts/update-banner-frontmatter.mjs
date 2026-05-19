import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const ARTICLES = join(ROOT, 'src/content/articles');

const MAP = [
  ['bagisiklik-tedavies', '/images/library/klinik/70.webp'], // typo guard
  ['bagisiklik-tedavileri', '/images/library/klinik/70.webp'],
  ['cep-telefonu-sperm-kalitesi', '/images/library/klinik/ceptel.webp'],
  ['cerrahi-sperm-arama-tese', '/images/library/klinik/203.webp'],
  ['dusuk-amh-hamilelik', '/images/library/hastalik/dusuk-amh.webp'],
  ['embriyo-transferi-gun-secimi', '/images/library/klinik/42.webp'],
  ['embriyo-transferi-sonrasi-bakim', '/images/library/tedavi/post_transfert.webp'],
  ['endometrioma', '/images/library/klinik/65.webp'],
  ['endometriozis-akilli-stratejiler', '/images/library/hastalik/kisirlik_endometriozis.webp'],
  ['endometriozis-tup-bebek', '/images/library/hastalik/endometriosis_tedavi.webp'],
  ['endometriyal-scratching', '/images/library/hastalik/endometriyal_scratching_histeroskopi.webp'],
  ['endoskopik-cerrahi-histeroskopi', '/images/library/klinik/83.webp'],
  ['erkek-dogurganlik-besin-takviyeleri', '/images/library/hastalik/erkekinfertilite.webp'],
  ['hidrosalpinx-ve-kisirlik', '/images/library/hastalik/hidrosalpinks.webp'],
  ['hiperprolaktinemi-ve-kisirlik', '/images/library/hastalik/prolaktin.webp'],
  ['hormonal-tedavi-adenomyozis', '/images/library/hastalik/prolakktin.webp'],
  ['iui-nedir', '/images/library/tedavi/iac.webp'],
  ['kac-yumurta-gerekir', '/images/library/embriyo/yumurta-sayisi.webp'],
  ['kadin-kisirligi-tup-bebek', '/images/library/laboratuvar/icsicizim.webp'],
  ['kanser-ve-fertilite', '/images/library/laboratuvar/dr-senai-aksoy-istanbul-ivf-laboratuvar.webp'],
  ['kimyasal-gebelik', '/images/library/embriyo/kimyasal-gebelik.webp'],
  ['mikroenjeksiyon-icsi-nedir', '/images/library/klinik/181.webp'],
  ['miyom-ameliyati', '/images/library/hastalik/miyom-ameliyati-ne-zaman-gerekir.webp'],
  ['miyomlar-ve-tup-bebek', '/images/library/hastalik/miyom_ivf.webp'],
  ['opk-ve-ivf', '/images/library/hastalik/opkveivf.webp'],
  ['pgt-cinsiyet-secimi', '/images/library/embriyo/pgt_sex.webp'],
  ['pgt-m', '/images/library/embriyo/pgt.webp'],
  ['taze-dondurulmus-transfer', '/images/library/tedavi/taze-donmus-transfert.webp'],
  ['tup-bebek-sureci-rehber', '/images/library/tedavi/tup_bebek_muayene.webp'],
  ['tup-bebek-yanlis-bilinenler', '/images/library/klinik/41.webp'],
  ['vajinal-mikrobiyom-fiv', '/images/library/laboratuvar/microbiota.webp'],
  ['yumurtalik-kistleri-dogurganlik', '/images/library/klinik/237.webp'],
  ['yumurtlama-takibi', '/images/library/klinik/54.webp'],
];

let okCount = 0, skipCount = 0, failCount = 0;
const seen = new Set();

for (const [slug, oldPath] of MAP) {
  if (seen.has(slug)) continue;
  seen.add(slug);

  const file = join(ARTICLES, `${slug}.mdx`);
  if (!existsSync(file)) {
    console.error(`  ✗ ${slug}: file not found`);
    failCount++;
    continue;
  }

  const content = readFileSync(file, 'utf8');
  const newPath = `/images/makaleler/${slug}.webp`;

  // image: alanını yakala — quote'lu ya da quote'suz, eski path'e bağlı kalmadan ilk image: satırını değiştir
  // Sadece frontmatter (ilk --- bloğu) içinde
  const fmMatch = content.match(/^(---\r?\n)([\s\S]*?)(\r?\n---\r?\n)/);
  if (!fmMatch) {
    console.error(`  ✗ ${slug}: no frontmatter`);
    failCount++;
    continue;
  }

  const fm = fmMatch[2];
  const imageRe = /^image:\s*["']?([^"'\r\n]+)["']?\s*$/m;
  const im = fm.match(imageRe);
  if (!im) {
    console.error(`  ✗ ${slug}: no image: field in frontmatter`);
    failCount++;
    continue;
  }

  if (im[1] === newPath) {
    console.log(`  - ${slug}: already on new path`);
    skipCount++;
    continue;
  }

  const newFm = fm.replace(imageRe, `image: "${newPath}"`);
  const newContent = fmMatch[1] + newFm + fmMatch[3] + content.slice(fmMatch[0].length);
  writeFileSync(file, newContent);
  console.log(`  ✓ ${slug}: ${im[1]} → ${newPath}`);
  okCount++;
}

console.log(`\n${okCount} updated, ${skipCount} skipped, ${failCount} failed.`);
