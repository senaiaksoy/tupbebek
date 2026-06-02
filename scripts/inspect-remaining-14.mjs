import fs from 'fs';
import path from 'path';

const dir = 'src/content/articles';
const files = [
  'akraba-evliligi.mdx',
  'alkol-ve-fertilite.mdx',
  'bagisiklik-tedavileri.mdx',
  'cep-telefonu-sperm-kalitesi.mdx',
  'duygusal-dayaniklik-rehberi.mdx',
  'embryoglue-faydalari.mdx',
  'endometriozis-akilli-stratejiler.mdx',
  'era-testi-bas-editor-kosesi.mdx',
  'era-testi-iluzyon.mdx',
  'istanbul-tup-bebek-doktoru.mdx',
  'iyi-tup-bebek-merkezi.mdx',
  'pgt-cinsiyet-secimi.mdx',
  'tup-bebek-sureci-rehber.mdx',
  'tup-bebek-yanlis-bilinenler.mdx'
];

for (const file of files) {
  const filePath = path.join(dir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  console.log(`=========================================`);
  console.log(`=== FILE: ${file} ===`);
  
  // Extract references block
  const refMatch = content.match(/^references:\s*\r?\n([\s\S]*?)^---/m);
  if (refMatch) {
    console.log(`--- REFERENCES ---`);
    console.log(refMatch[1].trim());
  }
  
  // Extract HizliCevap block
  const hzMatch = content.match(/<HizliCevap[\s\S]*?<\/HizliCevap>/);
  if (hzMatch) {
    console.log(`--- HIZLI CEVAP ---`);
    console.log(hzMatch[0]);
  }
}
