import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const redirectsPath = path.join(publicDir, '_redirects');
const llmsFiles = ['llms.txt', 'llms-full.txt']
  .map((fileName) => path.join(publicDir, fileName))
  .filter((filePath) => fs.existsSync(filePath));

const failures = [];

function relative(filePath) {
  return path.relative(rootDir, filePath);
}

function parseRedirectSources() {
  if (!fs.existsSync(redirectsPath)) return [];

  return fs
    .readFileSync(redirectsPath, 'utf8')
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => line.split(/\s+/u))
    .filter((parts) => parts.length >= 2)
    .map(([source, destination, status]) => ({ source, destination, status }))
    .filter((rule) => rule.status === '301' && rule.source.startsWith('/'));
}

function normalizePathname(value) {
  const cleaned = value.replace(/^https:\/\/tupbebek\.com/iu, '');
  if (!cleaned.startsWith('/')) return '';
  return cleaned.endsWith('/') ? cleaned : `${cleaned}/`;
}

function sourceMatches(sourcePattern, pathname) {
  const source = normalizePathname(sourcePattern.replace(/\*$/u, ''));
  if (!source) return false;

  if (sourcePattern.endsWith('*')) {
    return pathname.startsWith(source);
  }

  return pathname === source;
}

function extractTupbebekUrls(source) {
  return [...source.matchAll(/https:\/\/tupbebek\.com\/[^\s)\]"'<]+/giu)]
    .map((match) => match[0].replace(/[.,;:]+$/u, ''));
}

const redirectRules = parseRedirectSources();

for (const filePath of llmsFiles) {
  const source = fs.readFileSync(filePath, 'utf8');
  const urls = extractTupbebekUrls(source);

  for (const url of urls) {
    const pathname = normalizePathname(url);
    const redirectRule = redirectRules.find((rule) => sourceMatches(rule.source, pathname));
    if (redirectRule) {
      failures.push(
        `${relative(filePath)} links to redirected URL ${url}; use ${redirectRule.destination} instead.`
      );
    }
  }
}

if (failures.length > 0) {
  console.error(`LLMS hygiene verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`LLMS hygiene verification passed. Checked ${llmsFiles.length} file(s).`);
