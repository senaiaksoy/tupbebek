import fs from 'node:fs';
import path from 'node:path';

// FAQPage JSON-LD must describe the FAQ that is visible on the page.
// Each Question name and Answer text has to appear in the rendered page text.
const distDir = path.resolve('dist');
const failures = [];
let pagesWithFaq = 0;
let questions = 0;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}

function decodeHtml(value) {
  const entities = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ' };
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/giu, (match, entity) => {
    if (!entity.startsWith('#')) return entities[entity.toLowerCase()];
    const code = entity[1].toLowerCase() === 'x'
      ? Number.parseInt(entity.slice(2), 16) : Number(entity.slice(1));
    return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
  });
}

function normalize(value) {
  return decodeHtml(value.replace(/<[^>]+>/gu, ' '))
    .normalize('NFC')
    .replace(/[“”„]/gu, '"')
    .replace(/[‘’]/gu, "'")
    .replace(/\s+/gu, ' ')
    .trim()
    .toLocaleLowerCase('tr');
}

function collectFaqPages(node, found = []) {
  if (Array.isArray(node)) {
    node.forEach((item) => collectFaqPages(item, found));
  } else if (node && typeof node === 'object') {
    const types = [].concat(node['@type'] ?? []);
    if (types.includes('FAQPage')) found.push(node);
    Object.values(node).forEach((value) => {
      if (value && typeof value === 'object') collectFaqPages(value, found);
    });
  }
  return found;
}

if (!fs.existsSync(distDir)) {
  console.error('Missing dist directory. Run the build before checking FAQPage markup.');
  process.exit(1);
}

for (const file of walk(distDir).filter((item) => item.endsWith('.html'))) {
  const html = fs.readFileSync(file, 'utf8');
  const blocks = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/giu)];
  const faqPages = blocks.flatMap((block) => {
    try {
      return collectFaqPages(JSON.parse(block[1]));
    } catch {
      return [];
    }
  });
  if (faqPages.length === 0) continue;

  pagesWithFaq += 1;
  const route = '/' + path.relative(distDir, file).split(path.sep).join('/').replace(/index\.html$/u, '');
  const visible = normalize(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/giu, ' '));

  for (const faq of faqPages) {
    for (const entity of [].concat(faq.mainEntity ?? [])) {
      questions += 1;
      const answer = [].concat(entity.acceptedAnswer ?? [])[0]?.text ?? '';
      if (!visible.includes(normalize(entity.name ?? ''))) {
        failures.push(`${route}: question not visible: ${entity.name}`);
      } else if (!visible.includes(normalize(answer))) {
        failures.push(`${route}: answer differs from visible text: ${entity.name}`);
      }
    }
  }
}

if (failures.length > 0) {
  console.error(`FAQPage visible-content verification failed with ${failures.length} issue(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`FAQPage visible-content verification passed. ${questions} questions across ${pagesWithFaq} pages.`);
