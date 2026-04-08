import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const config = [
  { name: 'kadin-infertilitesi.webp', width: 1200 },
  { name: 'erkek-infertilitesi.webp', width: 1200 },
  { name: 'tani-sureci.webp', width: 200 },
  { name: 'duygusal-destek.webp', width: 200 },
  { name: 'fertilite-koruma.webp', width: 200 },
  { name: 'tedavi-yontemleri.webp', width: 200 },
  { name: 'logo-tupbebek-sm.webp', width: 140 }
];

const imgDir = 'public/images/home';
const logoDir = 'public/images';

async function fix() {
  console.log('--- Starting Image Resize Optimization (Buffer Mode) ---');
  
  for (const item of config) {
    const isLogo = item.name.includes('logo');
    const fullPath = path.join(isLogo ? logoDir : imgDir, item.name);
    
    if (fs.existsSync(fullPath)) {
      try {
        const inputBuffer = fs.readFileSync(fullPath);
        const stats = fs.statSync(fullPath);
        
        console.log(`Optimizing ${item.name} (${Math.round(stats.size/1024)} KB)...`);
        
        const outputBuffer = await sharp(inputBuffer)
          .resize(item.width, null, { withoutEnlargement: true })
          .webp({ quality: 80, effort: 6 })
          .toBuffer();
        
        if (outputBuffer.length < stats.size || item.width < 1000) {
           fs.writeFileSync(fullPath, outputBuffer);
           console.log(`  -> New size: ${Math.round(outputBuffer.length/1024)} KB (${Math.round((stats.size - outputBuffer.length)/stats.size * 100)}% saved)`);
        } else {
          console.log(`  -> Optimization skipped (no significant savings)`);
        }
      } catch (err) {
        console.error(`  !! Error processing ${item.name}:`, err.message);
      }
    } else {
      console.warn(`  !! File not found: ${fullPath}`);
    }
  }
  
  console.log('--- Finished ---');
}

fix();
