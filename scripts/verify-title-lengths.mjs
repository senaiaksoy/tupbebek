import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const maxTitleLength = 75;
const failures = [];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function visibleLength(value) {
  return [...value].length;
}

if (!fs.existsSync(distDir)) {
  failures.push('Missing dist directory. Run npm run build first.');
} else {
  const htmlFiles = walk(distDir).filter((filePath) => filePath.endsWith('.html'));

  for (const filePath of htmlFiles) {
    const html = fs.readFileSync(filePath, 'utf8');
    const match = html.match(/<title>([\s\S]*?)<\/title>/iu);
    if (!match) continue;

    const title = match[1].replace(/\s+/gu, ' ').trim();
    const length = visibleLength(title);
    if (length > maxTitleLength) {
      failures.push(`${path.relative(rootDir, filePath)} title is ${length} chars: ${title}`);
    }
  }
}

if (failures.length > 0) {
  console.error(`Title length verification failed with ${failures.length} issue(s):`);
  for (const failure of failures.slice(0, 50)) {
    console.error(`- ${failure}`);
  }
  if (failures.length > 50) {
    console.error(`...and ${failures.length - 50} more.`);
  }
  process.exit(1);
}

console.log(`Title length verification passed. Max title length: ${maxTitleLength}.`);
