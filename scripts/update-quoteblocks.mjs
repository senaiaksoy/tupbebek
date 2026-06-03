import fs from 'node:fs';
import path from 'node:path';

const ARTICLES_DIR = path.resolve('./src/content/articles');
const pattern = /<QuoteBlock\s+author=["'](?:tupbebek\.com\s+(?:Yayın\s+Kurulu|Editöryal\s+Ekip|Yayin\s+Kurulu|Editoryal\s+Ekip))["']>/gi;
const replacement = '<QuoteBlock author="Doç. Dr. Senai Aksoy">';

const files = fs.readdirSync(ARTICLES_DIR).filter((f) => /\.(md|mdx)$/.test(f));
let updated = 0;
let skipped = 0;
const updatedList = [];

for (const file of files) {
  const filePath = path.join(ARTICLES_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  if (pattern.test(content)) {
    const updatedContent = content.replace(pattern, replacement);
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    updated++;
    updatedList.push(file);
  } else {
    skipped++;
  }
}

console.log(`Updated ${updated} articles; skipped ${skipped}.`);
console.log('Updated files:');
for (const f of updatedList) {
  console.log(`  - ${f}`);
}
