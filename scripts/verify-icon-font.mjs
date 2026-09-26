// Derlenmiş sayfalarda kullanılan her ikon adının alt küme fontunda bulunduğunu doğrular.
// Eksik ikon, sayfada ikon yerine düz yazı ("microscope" gibi) olarak görünür.
// Yeni ikon eklediyseniz: npm run build && npm run icons:subset
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const manifestPath = path.join(root, 'scripts/fonts/icon-manifest.json');

if (!fs.existsSync(dist)) { console.log('dist yok; ikon font doğrulaması atlandı.'); process.exit(0); }
const available = new Set(JSON.parse(fs.readFileSync(manifestPath, 'utf8')));

const missing = new Map();
(function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.(html|js|mjs)$/.test(f)) {
      const s = fs.readFileSync(p, 'utf8');
      for (const m of s.matchAll(/material-symbols[^>]*>\s*([a-z0-9_]+)\s*</g)) {
        if (!available.has(m[1])) missing.set(m[1], path.relative(dist, p));
      }
    }
  }
})(dist);

if (missing.size) {
  console.error('Alt küme ikon fontunda olmayan ikonlar (sayfada düz yazı olarak görünür):');
  for (const [name, file] of missing) console.error(`  ${name}  (${file})`);
  console.error('Çözüm: ikon adını düzeltin ya da `npm run icons:subset` ile fontu yeniden üretin.');
  process.exit(1);
}
console.log(`Icon font verification passed. ${available.size} icons in subset.`);
