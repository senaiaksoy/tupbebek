// İçerik kalitesi koruması (kalite denetimi 2026-09, Aşama 4).
//
// 2026-09 okur-gözü denetiminde bulunan hata sınıflarının geri dönmesini engeller:
// alt metni eksik/İngilizce/anlamsız görseller, hekim/klinik adı taşıyan görsel
// dosyaları, gri filtreli hero'lar, yapay zekâ kalıntısı yorumlar, menüde tekrar
// eden bağlantılar, kaynaksız menü istatistikleri, standart dışı künyeler,
// abartılı sayım iddiaları ve yönetmeliğe aykırı vaat ifadeleri.
//
// HATA → çıkış kodu 1 (build ve deploy durur). UYARI → yalnız rapor.
// Kullanım: node scripts/verify-content-quality.mjs [--fast]
//   --fast: görsel dosyalarını açan (sharp) yavaş uyarı kontrolünü atlar; build içinde kullanılır.
//
// İstisna gerekiyorsa kuralı gevşetmek yerine aşağıdaki ALLOW listelerine gerekçeyle ekleyin.

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const DIST = path.join(root, 'dist');
const FAST = process.argv.includes('--fast');
const errors = [];
const warnings = [];
const rel = (p) => path.relative(root, p).split(path.sep).join('/');

// ── İstisna listeleri ────────────────────────────────────────────
// Dosya adı kuralından muaf görseller (gerekçesiyle).
const ALLOW_FILENAME = new Set([]);
// Künye kuralından muaf makaleler: slug → gerekçe (Dr. Aksoy'un açık onayıyla).
const ALLOW_KUNYE = {};
// Letterbox uyarısından muaf görseller: düz arka planlı diyagram/infografikler (2026-09-26 gözle doğrulandı).
const ALLOW_LETTERBOX = new Set([
  '/images/makaleler/amenore-tani-algoritmasi.webp',
  '/images/makaleler/embryoglue-faydalari.webp',
  '/images/makaleler/pcos-yeni-adi-pmos.webp',
  '/images/library/istatistik/basari_oranlari_hero.webp', // koyu, düz lacivert masa yüzeyi; bant yok
]);

const KUNYE = {
  author: 'Doç. Dr. Senai Aksoy',
  medicalReviewer: 'tupbebek.com Editöryal Ekip',
  reviewerTitle: 'Tıbbi Yayın Ekibi',
};

function walk(dir, filter, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, filter, out);
    else if (filter(p)) out.push(p);
  }
  return out;
}

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const stripTags = (h) => decode(h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');

// ── 1. Kaynak dosya kuralları (src/, public/) ────────────────────

// 1a. Görsel dosya adında hekim adı + klinik/şehir markası (bağımsızlık ilkesi).
const BRANDED_NAME = /(istanbul-?ivf|ivf-?(klinik|clinic|merkez)|draksoy|senaiaksoy|dr-?senai-aksoy-[a-z])/i;
for (const f of walk(path.join(root, 'public', 'images'), (p) => /\.(webp|jpe?g|png|avif|gif|svg)$/i.test(p))) {
  const name = '/' + rel(f).replace(/^public\//, '');
  if (BRANDED_NAME.test(path.basename(f)) && !ALLOW_FILENAME.has(name)) {
    errors.push(`Görsel dosya adı hekim/klinik markası taşıyor (bağımsızlık ilkesi): ${name}`);
  }
}

const srcFiles = walk(path.join(root, 'src'), (p) => /\.(astro|mdx?|ts|tsx|mjs)$/.test(p));
for (const f of srcFiles) {
  const t = fs.readFileSync(f, 'utf8');
  // 1b. Görsellere gri/soluk filtre (hub hero'larında kaldırıldı; geri gelmesin).
  for (const m of t.matchAll(/<img\b[^>]*class="[^"]*\b(grayscale(?:-\[[^\]]*\])?|mix-blend-multiply)\b[^"]*"/g)) {
    errors.push(`${rel(f)}: <img> üzerinde "${m[1]}" filtresi var; görseller renkli ve net gösterilmeli.`);
  }
  // 1c. Yapay zekâ düşünce kalıntısı / yer tutucu metin.
  const ai = t.match(/Wait, let'?s|As an AI\b|I cannot (?:help|assist)|lorem ipsum/i);
  if (ai) errors.push(`${rel(f)}: yapay zekâ kalıntısı ya da yer tutucu metin: "${ai[0]}"`);
}

// 1d. Menü: aynı alt menüde tekrar eden hedef (hata), menüler arası tekrar (uyarı),
//     yüzde içeren istatistik kutusu (kaynaksız sayı — hata).
const navPath = path.join(root, 'src', 'data', 'navigation.ts');
if (fs.existsSync(navPath)) {
  const nav = fs.readFileSync(navPath, 'utf8').split(/\/\/[^\n]*FOOTER/)[0];
  const menus = nav.split(/\n\s{2}\{\s*\n\s*id:\s*'/).slice(1);
  const seenGlobal = new Map();
  for (const block of menus) {
    const id = block.match(/^([^']+)'/)?.[1] ?? '?';
    const sub = block.match(/submenu:\s*\[([\s\S]*?)\n\s*\]/)?.[1] ?? '';
    const hrefs = [...sub.matchAll(/href:\s*'([^']+)'/g)].map((m) => m[1]);
    const seen = new Set();
    for (const h of hrefs) {
      if (seen.has(h)) errors.push(`Menü "${id}": aynı alt menüde tekrar eden bağlantı ${h}`);
      seen.add(h);
      if (seenGlobal.has(h) && seenGlobal.get(h) !== id) warnings.push(`Menü: ${h} hem "${seenGlobal.get(h)}" hem "${id}" altında`);
      else seenGlobal.set(h, id);
    }
    for (const m of block.matchAll(/stat:\s*\{\s*value:\s*'([^']*)'/g)) {
      if (/%|٪/.test(m[1])) errors.push(`Menü "${id}": istatistik kutusunda kaynaksız yüzde ("${m[1]}"). Sayı gerekiyorsa kaynağıyla sayfa içinde verin.`);
    }
  }
}

// 1e. Makale künyesi standardı (CLAUDE.md).
for (const f of walk(path.join(root, 'src', 'content', 'articles'), (p) => /\.mdx?$/.test(p))) {
  const slug = path.basename(f).replace(/\.mdx?$/, '');
  if (ALLOW_KUNYE[slug]) continue;
  const fm = fs.readFileSync(f, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
  const val = (k) => fm.match(new RegExp(`^${k}:\\s*["']?([^"'\\n]+)["']?\\s*$`, 'm'))?.[1]?.trim();
  const author = val('author') || fm.match(/^author:\s*\n\s+name:\s*["']?([^"'\n]+)/m)?.[1]?.trim();
  for (const [k, want] of Object.entries(KUNYE)) {
    const got = k === 'author' ? author : val(k);
    if (got !== want) errors.push(`${rel(f)}: ${k} "${got ?? '(yok)'}" — standart "${want}".`);
  }
}

// ── 2. Derlenmiş HTML kuralları (dist/) ──────────────────────────
if (!fs.existsSync(DIST)) {
  errors.push('dist/ bulunamadı; önce "npm run build" çalıştırın.');
} else {
  const pages = walk(DIST, (p) => p.endsWith('index.html') && !/[\\/](_astro|pagefind|generated|_worker\.js)[\\/]/.test(p));
  const articleCount = fs.readdirSync(path.join(DIST, 'makaleler'), { withFileTypes: true }).filter((d) => d.isDirectory()).length;
  const altsBySrc = new Map();
  const ENGLISH_ALT = /^(clinical|medical|consultation|image|photo|picture|hero|banner|doctor|lab|laboratory|texture|illustration|woman|man|couple)\b/i;
  const ASCII_TR = /\b(Bas Editor|Kosesi|Kisirlik|Kisirligi|Dogurganlik|Iletisim|Surec|Sureci|Tup Bebek|Genclestirme|Yumurtalik)\b/;

  for (const p of pages) {
    const url = '/' + rel(p).replace(/^dist\//, '').replace(/index\.html$/, '');
    const html = fs.readFileSync(p, 'utf8');
    const main = (html.match(/<main[\s\S]*<\/main>/)?.[0] ?? html).replace(/<script[\s\S]*?<\/script>/g, '');

    for (const m of main.matchAll(/<img\b[^>]*>/g)) {
      const tag = m[0];
      const src = tag.match(/\bsrc="([^"]+)"/)?.[1] ?? '';
      const altM = tag.match(/\balt="([^"]*)"/);
      const decorative = /aria-hidden="true"|role="presentation"/.test(tag);
      if (!altM) { errors.push(`${url}: alt özniteliği olmayan görsel ${src}`); continue; }
      const alt = decode(altM[1]).trim();
      if (alt === '') {
        if (!decorative) errors.push(`${url}: boş alt metin (dekoratifse aria-hidden="true" ekleyin) ${src}`);
        continue;
      }
      if (alt.length < 12) errors.push(`${url}: çok kısa alt metin "${alt}" (${src})`);
      else if (alt.length < 25) warnings.push(`${url}: kısa alt metin "${alt}" (${src})`);
      if (ENGLISH_ALT.test(alt) || (/^[\x20-\x7E]+$/.test(alt) && alt.split(' ').length >= 2 && !/[çğıöşüÇĞİÖŞÜ]/.test(alt) && /\b(the|and|of|with|for)\b/i.test(alt))) {
        errors.push(`${url}: İngilizce/jenerik alt metin "${alt}" (${src})`);
      }
      if (/^\/(images|e-kitap)\//.test(src)) {
        const file = path.join(DIST, decodeURI(src.split('?')[0]));
        if (!fs.existsSync(file)) errors.push(`${url}: var olmayan görsele referans ${src}`);
      }
      const key = src.replace(/^\/generated\/[^/]+\//, '').replace(/-w\d+\.webp$/, '');
      if (!altsBySrc.has(key)) altsBySrc.set(key, new Map());
      altsBySrc.get(key).set(alt, url);
    }

    const text = stripTags(main);
    // 2a. Yönetmeliğe aykırı vaat ifadeleri (olumsuz kullanım — "garantili değildir" — hariç).
    for (const m of text.matchAll(/ücretsiz (?:muayene|konsültasyon|ön görüşme)|garantili|%\s?100 (?:başarı|gebelik)/gi)) {
      const after = text.slice(m.index, m.index + m[0].length + 40);
      if (/değil|yoktur|olmaz|sağlamaz|vermez|etmez|edemez/i.test(after)) continue;
      errors.push(`${url}: yönetmeliğe aykırı vaat ifadesi "${m[0]}" … "${text.slice(Math.max(0, m.index - 40), m.index + 60)}"`);
    }
    // 2b. Sitedeki makale sayısını aşan sayım iddiası (ör. "100+ bilimsel makale").
    for (const m of text.matchAll(/(\d+)\s*\+?\s*(?:bilimsel )?(?:makale|rehber)\b/gi)) {
      const n = Number(m[1]);
      if (n > articleCount && n < 10000) errors.push(`${url}: "${m[0]}" iddiası gerçek makale sayısını (${articleCount}) aşıyor.`);
    }
    // 2c. Üstünlük iddiası (uyarı).
    for (const m of text.matchAll(/(?<!\p{L})en iyi(?!\p{L})/giu)) warnings.push(`${url}: üstünlük ifadesi "en iyi" … "${text.slice(Math.max(0, m.index - 30), m.index + 40)}"`);
    // 2d. Türkçe karakteri bozuk breadcrumb (hata; URL slug'ı etiket yerine kullanılmamalı).
    const crumb = html.match(/aria-current="page">([^<]+)</)?.[1];
    if (crumb && ASCII_TR.test(crumb)) errors.push(`${url}: breadcrumb etiketi Türkçe karakter içermiyor: "${crumb.trim()}"`);
  }

  for (const [src, alts] of altsBySrc) {
    if (alts.size > 1) warnings.push(`Aynı görsel farklı alt metinlerle: ${src} → ${[...alts.keys()].map((a) => `"${a}"`).join(' | ')}`);
  }
}

// ── 3. Bulanık bantlı (letterbox) görsel şüphesi — yalnız uyarı, --fast'te atlanır ──
if (!FAST && fs.existsSync(DIST)) {
  try {
    const { default: sharp } = await import('sharp');
    sharp.cache(false);
    const referenced = new Set();
    for (const f of srcFiles) for (const m of fs.readFileSync(f, 'utf8').matchAll(/\/images\/[A-Za-z0-9_./-]+\.(?:webp|jpe?g|png)/g)) referenced.add(m[0]);
    const lap = { width: 3, height: 3, kernel: [0, 1, 0, 1, -4, 1, 0, 1, 0] };
    const sharpness = async (file, top, h, w) => {
      const b = await sharp(file).extract({ left: 0, top, width: w, height: h }).greyscale().convolve(lap).raw().toBuffer();
      let s = 0, s2 = 0; for (const v of b) { s += v; s2 += v * v; }
      return Math.sqrt(s2 / b.length - (s / b.length) ** 2);
    };
    for (const src of referenced) {
      const file = path.join(root, 'public', src);
      if (!fs.existsSync(file) || ALLOW_LETTERBOX.has(src)) continue;
      const meta = await sharp(file).metadata();
      if (meta.width < 600) continue;
      const band = Math.round(meta.height * 0.12);
      const top = await sharpness(file, 0, band, meta.width);
      const mid = await sharpness(file, Math.round(meta.height * 0.4), band, meta.width);
      const bottom = await sharpness(file, meta.height - band, band, meta.width);
      if (mid > 3 && (top + bottom) / 2 / (mid + 0.01) < 0.12) {
        warnings.push(`Bulanık bantlı (letterbox) olabilir, gözle kontrol edin: ${src}`);
      }
    }
  } catch (e) {
    warnings.push(`Letterbox kontrolü çalışmadı: ${e.message}`);
  }
}

// ── Rapor ────────────────────────────────────────────────────────
if (warnings.length) {
  console.log(`İçerik kalitesi: ${warnings.length} uyarı`);
  for (const w of warnings.slice(0, 40)) console.log(`  ⚠ ${w}`);
  if (warnings.length > 40) console.log(`  … ve ${warnings.length - 40} uyarı daha`);
}
if (errors.length) {
  console.error(`İçerik kalitesi doğrulaması BAŞARISIZ: ${errors.length} hata`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log('Content quality verification passed.');
