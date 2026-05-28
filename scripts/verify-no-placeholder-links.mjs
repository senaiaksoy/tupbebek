import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const failures = [];

const placeholderPattern = /(?:undefined|%\s*7b|\$\{|safeUrl|result\.url|result\.image)/iu;
const attrPattern = /\b(?:href|src)=(["'])(.*?)\1/giu;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

if (!fs.existsSync(distDir)) {
  failures.push('Missing dist directory. Run npm run build first.');
} else {
  const htmlFiles = walk(distDir).filter((filePath) => filePath.endsWith('.html'));

  for (const filePath of htmlFiles) {
    const html = fs.readFileSync(filePath, 'utf8');
    for (const match of html.matchAll(attrPattern)) {
      const value = match[2];
      if (placeholderPattern.test(value)) {
        failures.push(`${path.relative(rootDir, filePath)} has placeholder link: ${value}`);
      }
    }
  }
}

if (failures.length > 0) {
  console.error(`Placeholder link verification failed with ${failures.length} issue(s):`);
  for (const failure of failures.slice(0, 50)) {
    console.error(`- ${failure}`);
  }
  if (failures.length > 50) {
    console.error(`...and ${failures.length - 50} more.`);
  }
  process.exit(1);
}

console.log('Placeholder link verification passed.');
