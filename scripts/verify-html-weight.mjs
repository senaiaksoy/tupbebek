import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const failures = [];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

if (!fs.existsSync(distDir)) {
  failures.push('Missing dist directory. Run npm run build first.');
} else {
  const htmlFiles = walk(distDir).filter((filePath) => {
    const relativePath = path.relative(rootDir, filePath);
    return filePath.endsWith('.html') && !relativePath.startsWith(`dist${path.sep}e-kitap${path.sep}`);
  });

  for (const filePath of htmlFiles) {
    const html = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(rootDir, filePath);
    const inlineStyleBytes = [...html.matchAll(/<style\b[^>]*>[\s\S]*?<\/style>/giu)]
      .reduce((total, match) => total + match[0].length, 0);
    const megaMenuInitializers = [...html.matchAll(/function initMegaMenus/gu)].length;

    if (inlineStyleBytes > 10_000) {
      failures.push(`${relativePath} has ${inlineStyleBytes} bytes of inline CSS`);
    }
    if (megaMenuInitializers > 1) {
      failures.push(`${relativePath} has duplicate mega menu initializers (${megaMenuInitializers})`);
    }
  }
}

if (failures.length > 0) {
  console.error(`HTML weight verification failed with ${failures.length} issue(s):`);
  for (const failure of failures.slice(0, 50)) {
    console.error(`- ${failure}`);
  }
  if (failures.length > 50) {
    console.error(`...and ${failures.length - 50} more.`);
  }
  process.exit(1);
}

console.log('HTML weight verification passed.');
