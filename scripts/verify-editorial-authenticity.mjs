import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const targets = [
  path.join(rootDir, 'src'),
  path.join(rootDir, 'AGENTS.md'),
];
const failures = [];
const textExtensions = new Set(['.astro', '.md', '.mdx', '.mjs', '.ts', '.tsx']);

function relative(filePath) {
  return path.relative(rootDir, filePath);
}

function collectFiles(target) {
  if (!fs.existsSync(target)) return [];
  const stat = fs.statSync(target);
  if (stat.isFile()) return [target];

  return fs.readdirSync(target, { withFileTypes: true }).flatMap((entry) => {
    const child = path.join(target, entry.name);
    return entry.isDirectory() ? collectFiles(child) : [child];
  });
}

for (const filePath of targets.flatMap(collectFiles)) {
  if (!textExtensions.has(path.extname(filePath).toLowerCase()) && path.basename(filePath) !== 'AGENTS.md') continue;
  const source = fs.readFileSync(filePath, 'utf8');

  if (/dijital\s+editoryal\s+araç/iu.test(source)) {
    failures.push(`${relative(filePath)} contains the prohibited generic tool disclosure.`);
  }

  if (/Sık Aranan|Aranan (?:ifade|soru|terim)/iu.test(source)) {
    failures.push(`${relative(filePath)} contains reader-facing search-production language.`);
  }

  if (filePath.includes(`${path.sep}content${path.sep}articles${path.sep}`)) {
    if (/<QuoteBlock\s+author=["']Doç\. Dr\. Senai Aksoy["']/u.test(source)) {
      failures.push(`${relative(filePath)} presents an unverified legacy callout as a Dr. Aksoy quotation.`);
    }
    if (/arama-niyeti/iu.test(source)) {
      failures.push(`${relative(filePath)} contains a search-production anchor.`);
    }
  }
}

if (failures.length > 0) {
  console.error('Editorial authenticity verification failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Editorial authenticity verification passed.');
