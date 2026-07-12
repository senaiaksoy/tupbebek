/**
 * HeroSearch / SearchAutocomplete fallback verisi.
 * HTML gövdesine gömülmesin diye build öncesi public/search-index.json üretir.
 */
import fs from 'node:fs';
import path from 'node:path';

const articlesDir = path.resolve('src/content/articles');
const outputPath = path.resolve('public/search-index.json');

function parseFrontmatterField(content, field) {
  const quoted = content.match(new RegExp(`^${field}:\\s*["']([^"']+)["']`, 'm'));
  if (quoted) return quoted[1];
  const plain = content.match(new RegExp(`^${field}:\\s*(\\S+)`, 'm'));
  return plain?.[1] ?? '';
}

function sanitizeImage(imageStr) {
  if (!imageStr) return '';
  return imageStr.split(',')[0].trim();
}

function buildIndex() {
  const items = [];

  for (const file of fs.readdirSync(articlesDir)) {
    if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;

    const content = fs.readFileSync(path.join(articlesDir, file), 'utf8');
    const status = parseFrontmatterField(content, 'status');
    if (status && status !== 'published') continue;

    const slug = file.replace(/\.mdx?$/, '');
    const title = parseFrontmatterField(content, 'title');
    if (!title) continue;

    items.push({
      id: slug,
      title,
      description: parseFrontmatterField(content, 'description') || undefined,
      url: `/makaleler/${slug}`,
      category: parseFrontmatterField(content, 'category') || undefined,
      image: sanitizeImage(parseFrontmatterField(content, 'image')) || undefined,
      type: 'article',
    });
  }

  items.sort((a, b) => a.title.localeCompare(b.title, 'tr'));
  fs.writeFileSync(outputPath, JSON.stringify(items));
  console.log(`[search-index] wrote ${items.length} entries → ${path.relative(process.cwd(), outputPath)}`);
}

buildIndex();
