import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const siteOrigin = 'https://tupbebek.com';
const pages = new Map();
const failures = [];
let checked = 0;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}

function decodeHtml(value) {
  const entities = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>' };
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt);/giu, (match, entity) => {
    if (!entity.startsWith('#')) return entities[entity.toLowerCase()];
    const code = entity[1].toLowerCase() === 'x'
      ? Number.parseInt(entity.slice(2), 16) : Number(entity.slice(1));
    return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
  });
}

function attribute(tag, name) {
  const match = tag.match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'iu'));
  return match ? decodeHtml(match[1] ?? match[2] ?? match[3]) : null;
}

if (!fs.existsSync(distDir)) {
  console.error('Missing dist directory. Run the build before checking fragment links.');
  process.exit(1);
}

for (const file of walk(distDir).filter((file) => file.endsWith('.html'))) {
  const relative = path.relative(distDir, file).split(path.sep).join('/');
  const route = '/' + relative.replace(/(?:^|\/)index\.html$/u, (match) => match.startsWith('/') ? '/' : '');
  // Ignore markup examples inside scripts, styles and comments.
  const html = fs.readFileSync(file, 'utf8')
    .replace(/<!--[\s\S]*?-->/gu, '')
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/giu, '');
  const ids = new Set();
  const links = [];
  for (const [tag] of html.matchAll(/<[a-z][^>]*>/giu)) {
    const id = attribute(tag, 'id');
    if (id !== null) ids.add(id);
    if (/^<a\b/iu.test(tag)) {
      const name = attribute(tag, 'name');
      if (name !== null) ids.add(name);
      const href = attribute(tag, 'href');
      if (href) links.push(href);
    }
  }
  pages.set(route, { ids, links });
}

for (const [route, page] of pages) {
  for (const href of page.links) {
    let url;
    try { url = new URL(href, siteOrigin + route); } catch { continue; }
    if (url.origin !== siteOrigin || !url.hash) continue;
    let targetPath, fragment;
    try {
      targetPath = decodeURIComponent(url.pathname);
      fragment = decodeURIComponent(url.hash.slice(1).split(':~:')[0]);
    } catch {
      failures.push(`${route} has invalid fragment URL encoding: ${href}`);
      continue;
    }
    // Text fragments need no element ID. Only check prerendered HTML targets.
    if (!fragment) continue;
    const target = pages.get(targetPath) ?? pages.get(targetPath.replace(/\/index\.html$/u, '/'));
    if (!target) continue;
    checked += 1;
    if (!target.ids.has(fragment)) failures.push(`${route} links to missing fragment: ${href}`);
  }
}

if (failures.length) {
  console.error(`Fragment link verification failed with ${failures.length} issue(s):`);
  for (const failure of failures.slice(0, 30)) console.error(`- ${failure}`);
  if (failures.length > 30) console.error(`...and ${failures.length - 30} more.`);
  process.exit(1);
}

console.log(`Fragment link verification passed. ${checked} links across ${pages.size} HTML files.`);
