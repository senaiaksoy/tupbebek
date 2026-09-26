// Sitede kullanılan Material Symbols ikon adlarını toplar (derlenmiş HTML + kaynak kod).
// Çıktı: scripts/fonts/icons.txt — alt küme fontu bu listeden üretilir.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const names = new Set();

function walk(dir, exts, fn) {
  if (!fs.existsSync(dir)) return;
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, exts, fn);
    else if (exts.test(f)) fn(fs.readFileSync(p, 'utf8'));
  }
}

const ICON_TEXT = /material-symbols[^>]*>\s*([a-z0-9_]+)\s*</g;
walk(path.join(root, 'dist'), /\.(html|js|mjs)$/, (s) => { for (const m of s.matchAll(ICON_TEXT)) names.add(m[1]); });
walk(path.join(root, 'src'), /\.(astro|ts|js|mjs|mdx|md|json)$/, (s) => {
  for (const m of s.matchAll(ICON_TEXT)) names.add(m[1]);
  // Veri dosyalarındaki icon: 'ad' ve Notifications'daki 'text-renk ad' biçimleri
  for (const m of s.matchAll(/\b(?:icon|successIcon|iconName)\s*[:=]\s*['"`](?:text-[a-z0-9-]+\s+)?([a-z0-9_]+)['"`]/g)) names.add(m[1]);
  // Fonksiyonların döndürdüğü ikon adları (ör. tibbi-sozluk getIcon)
  for (const m of s.matchAll(/return\s+'([a-z][a-z0-9_]+)';/g)) names.add(m[1]);
});

// "text-emerald-600" gibi sınıf adları ikon değildir
const list = [...names].filter((n) => !n.startsWith('text')).sort();
fs.mkdirSync(path.join(root, 'scripts/fonts'), { recursive: true });
fs.writeFileSync(path.join(root, 'scripts/fonts/icons.txt'), list.join('\n') + '\n');
console.log(`${list.length} ikon adı toplandı → scripts/fonts/icons.txt`);
