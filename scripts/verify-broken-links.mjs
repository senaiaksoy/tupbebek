/**
 * Kaynak katmanindaki bozuk markdown linklerini yakalar.
 *
 * verify-link-hygiene.mjs dist/ icindeki uretilmis <a> etiketlerine bakar.
 * Kapanis parantezi eksik bir markdown linki ise HTML'de hic <a> uretmez:
 * remark onu duz metne cevirir, sadece ciplak URL autolink olur. Yani
 * "[HFEA](https://...  da" kalibinin sayfada gorunur metin olarak sizmasi
 * dist denetiminden kacar. Bu script tam olarak o bosluğu kapatir ve
 * src/ altindaki .md/.mdx dosyalarini kaynakta denetler.
 *
 * Yakalanan hatalar:
 *   - Kapanmayan link hedefi:  [metin](https://ornek.com  devam
 *   - Bos anchor metni:        [](https://ornek.com)
 *   - Bos link hedefi:         [metin]()
 */

import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const contentRoot = path.join(rootDir, 'src');
const failures = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

/** Kod bloklarini ve inline kodu bosluga cevirir; offsetler korunur. */
function maskCode(text) {
  return text
    .replace(/```[\s\S]*?```/gu, (block) => ' '.repeat(block.length))
    .replace(/`[^`\n]*`/gu, (span) => ' '.repeat(span.length));
}

function lineNumberAt(text, index) {
  let line = 1;
  for (let i = 0; i < index; i += 1) {
    if (text[i] === '\n') line += 1;
  }
  return line;
}

function excerpt(text, index) {
  const start = Math.max(0, index - 45);
  const end = Math.min(text.length, index + 95);
  return text.slice(start, end).replace(/\s+/gu, ' ').trim();
}

const WHITESPACE = /\s/u;

/**
 * CommonMark inline link hedefini ayristirir.
 * Donen deger: { ok, dest } — ok=false ise kapanis parantezi bulunamadi.
 */
function parseDestination(text, startIndex) {
  let i = startIndex;
  while (i < text.length && WHITESPACE.test(text[i])) i += 1;

  let dest = '';

  if (text[i] === '<') {
    const close = text.indexOf('>', i);
    if (close === -1) return { ok: false, dest: '' };
    dest = text.slice(i + 1, close);
    i = close + 1;
  } else {
    let depth = 0;
    for (; i < text.length; i += 1) {
      const char = text[i];
      if (char === '\\') {
        dest += text.slice(i, i + 2);
        i += 1;
        continue;
      }
      if (WHITESPACE.test(char)) break;
      if (char === '(') depth += 1;
      else if (char === ')') {
        if (depth === 0) break;
        depth -= 1;
      }
      dest += char;
    }
  }

  // Istege bagli baslik: [metin](url "baslik")
  let j = i;
  while (j < text.length && WHITESPACE.test(text[j])) j += 1;
  const titleOpen = text[j];
  if (titleOpen === '"' || titleOpen === "'" || titleOpen === '(') {
    const titleClose = titleOpen === '(' ? ')' : titleOpen;
    const close = text.indexOf(titleClose, j + 1);
    if (close !== -1) {
      j = close + 1;
      while (j < text.length && WHITESPACE.test(text[j])) j += 1;
      i = j;
    }
  }

  return { ok: text[i] === ')', dest };
}

const files = walk(contentRoot).filter((filePath) => /\.mdx?$/iu.test(filePath));

for (const filePath of files) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const text = maskCode(raw);
  const relativePath = path.relative(rootDir, filePath);

  for (let index = 0; index < text.length; index += 1) {
    if (text[index] !== ']' || text[index + 1] !== '(') continue;

    // Anchor metnini geriye dogru oku (ayni satirda kalarak).
    const lineStart = text.lastIndexOf('\n', index) + 1;
    const openBracket = text.lastIndexOf('[', index);
    const anchorText =
      openBracket >= lineStart ? raw.slice(openBracket + 1, index).trim() : null;

    const { ok, dest } = parseDestination(text, index + 2);
    const line = lineNumberAt(text, index);

    if (!ok) {
      failures.push(
        `${relativePath}:${line} kapanis parantezi eksik link hedefi -> ${excerpt(raw, index)}`,
      );
      continue;
    }
    if (anchorText === '') {
      failures.push(
        `${relativePath}:${line} anchor metni bos -> ${excerpt(raw, index)}`,
      );
    }
    if (dest.trim() === '') {
      failures.push(
        `${relativePath}:${line} link hedefi bos -> ${excerpt(raw, index)}`,
      );
    }
  }
}

if (failures.length > 0) {
  console.error(`Broken link check failed with ${failures.length} issue(s):`);
  for (const failure of failures.slice(0, 50)) {
    console.error(`- ${failure}`);
  }
  if (failures.length > 50) {
    console.error(`...and ${failures.length - 50} more.`);
  }
  process.exit(1);
}

console.log(`Broken link check passed (${files.length} markdown files scanned).`);
