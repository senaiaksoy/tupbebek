import fs from 'node:fs';
import path from 'node:path';
import { normalizeInternalPath, routeAliases } from '../src/utils/routeAliases.mjs';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const siteOrigin = 'https://tupbebek.com';
const allowedNoSlashPaths = new Set(['/']);
const requiredFunctionExcludes = [
  '/ar',
  '/ar/*',
  '/fr',
  '/fr/*',
  '/treatment',
  '/treatment/*',
  '/ivf-in-turkey',
  '/ivf-in-turkey/*',
  '/ivf-explained',
  '/ivf-explained/*',
  '/cost-of-ivf',
  '/cost-of-ivf/*',
  '/before-you-come',
  '/before-you-come/*',
  '/about-us',
  '/about-us/*',
  '/contact-us',
  '/contact-us/*',
  '/aciklanamayan-kisirlik',
  '/kisirlik-nedenleri/aciklanamayan-kisirlik',
];
const requiredFunctionIncludes = [
  '/',
  '/transfer-sureci',
  '/erkek-infertilitesi',
  '/kadin-infertilitesi',
  '/sss',
  '/makaleler/beta-hcg-testi',
];
const failures = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function isPagePath(pathname) {
  return !/\.[a-z0-9]+$/iu.test(pathname);
}

function isAllowedPath(pathname) {
  return allowedNoSlashPaths.has(pathname) || !isPagePath(pathname);
}

function collectHrefIssues(filePath, html) {
  const hrefPattern = /\bhref=(["'])(.*?)\1/giu;
  for (const match of html.matchAll(hrefPattern)) {
    const rawHref = match[2];
    if (
      !rawHref ||
      rawHref.startsWith('#') ||
      rawHref.startsWith('mailto:') ||
      rawHref.startsWith('tel:') ||
      rawHref.startsWith('javascript:')
    ) {
      continue;
    }

    let parsed;
    try {
      parsed = new URL(rawHref, siteOrigin);
    } catch {
      continue;
    }

    if (parsed.origin !== siteOrigin) continue;
    if (isAllowedPath(parsed.pathname)) continue;
    if (parsed.pathname.endsWith('/')) continue;

    failures.push(`${path.relative(rootDir, filePath)} links to non-canonical page URL: ${rawHref}`);
  }
}

function assertFileContains(filePath, expected, label) {
  if (!fs.existsSync(filePath)) {
    failures.push(`Missing ${label}: ${path.relative(rootDir, filePath)}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes(expected)) {
    failures.push(`${label} does not contain expected text: ${expected}`);
  }
}

function assertAnyFileContains(filePaths, expected, label) {
  const existingPath = filePaths.find((filePath) => fs.existsSync(filePath));
  if (!existingPath) {
    failures.push(`Missing ${label}: ${filePaths.map((filePath) => path.relative(rootDir, filePath)).join(' or ')}`);
    return;
  }

  assertFileContains(existingPath, expected, label);
}

function collectRedirectIssues(filePath) {
  if (!fs.existsSync(filePath)) return;

  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  for (const [index, line] of lines.entries()) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const match = trimmed.match(/^\S+\s+(\S+)\s+\d{3}$/u);
    if (!match) continue;

    const target = match[1];
    if (target === '/' || /^https?:\/\//iu.test(target)) continue;

    let parsed;
    try {
      parsed = new URL(target, siteOrigin);
    } catch {
      continue;
    }

    if (parsed.search || parsed.hash) continue;
    if (isAllowedPath(parsed.pathname)) continue;
    if (parsed.pathname.endsWith('/')) continue;

    failures.push(`${path.relative(rootDir, filePath)}:${index + 1} redirects to non-canonical page URL: ${target}`);
  }
}

function collectRouteAliasIssues() {
  for (const source of Object.keys(routeAliases)) {
    const normalized = normalizeInternalPath(source);
    const parsed = new URL(normalized, siteOrigin);
    if (isAllowedPath(parsed.pathname)) continue;
    if (parsed.pathname.endsWith('/')) continue;

    failures.push(`routeAliases maps ${source} to non-canonical page URL: ${normalized}`);
  }
}

function collectLegacyFallbackIssues(filePath) {
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, 'utf8');
  const tuplePattern = /\['[^']+',\s*'([^']+)'\]/gu;
  for (const match of content.matchAll(tuplePattern)) {
    const target = match[1];
    const parsed = new URL(target, siteOrigin);
    if (isAllowedPath(parsed.pathname)) continue;
    if (parsed.pathname.endsWith('/')) continue;

    failures.push(`${path.relative(rootDir, filePath)} fallback target is non-canonical: ${target}`);
  }
}

function collectRoutesJsonIssues(filePath) {
  if (!fs.existsSync(filePath)) {
    failures.push(`Missing Cloudflare routes file: ${path.relative(rootDir, filePath)}`);
    return;
  }

  let routes;
  try {
    routes = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    failures.push(`Could not parse ${path.relative(rootDir, filePath)}: ${error.message}`);
    return;
  }

  const excludes = new Set(routes.exclude || []);
  for (const pattern of requiredFunctionExcludes) {
    if (!excludes.has(pattern)) {
      failures.push(`${path.relative(rootDir, filePath)} must exclude single-language legacy route: ${pattern}`);
    }
  }

  for (const pattern of requiredFunctionIncludes) {
    if (excludes.has(pattern)) {
      failures.push(`${path.relative(rootDir, filePath)} must allow worker canonicalization for route: ${pattern}`);
    }
  }
}

function collectWorkerEntrypointIssues(filePath) {
  if (!fs.existsSync(filePath)) {
    failures.push(`Missing Cloudflare worker entrypoint: ${path.relative(rootDir, filePath)}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('function canonicalRedirectFor')) {
    failures.push(`${path.relative(rootDir, filePath)} is missing the edge canonical redirect guard`);
  }
}

if (!fs.existsSync(distDir)) {
  failures.push('Missing dist directory. Run npm run build first.');
} else {
  const htmlFiles = walk(distDir).filter((filePath) => filePath.endsWith('.html'));
  for (const filePath of htmlFiles) {
    collectHrefIssues(filePath, fs.readFileSync(filePath, 'utf8'));
  }

  assertAnyFileContains(
    [path.join(distDir, '404.html'), path.join(distDir, '404', 'index.html')],
    '<meta name="robots" content="noindex, follow, max-image-preview:large">',
    '404 page'
  );
  assertFileContains(
    path.join(distDir, 'sitemap.xml'),
    '<sitemapindex',
    'sitemap.xml alias'
  );
  collectRedirectIssues(path.join(distDir, '_redirects'));
  collectRouteAliasIssues();
  collectLegacyFallbackIssues(path.join(rootDir, 'src', 'pages', '[...legacy].ts'));
  collectRoutesJsonIssues(path.join(distDir, '_routes.json'));
  collectWorkerEntrypointIssues(path.join(distDir, '_worker.js', 'index.js'));
}

if (failures.length > 0) {
  console.error(`SEO canonicalization verification failed with ${failures.length} issue(s):`);
  for (const failure of failures.slice(0, 50)) {
    console.error(`- ${failure}`);
  }
  if (failures.length > 50) {
    console.error(`...and ${failures.length - 50} more.`);
  }
  process.exit(1);
}

console.log('SEO canonicalization verification passed.');
