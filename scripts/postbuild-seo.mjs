#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const siteOrigin = 'https://tupbebek.com';
const redirectOnlyFunctionExcludes = new Set([
  '/ar',
  '/fr',
  '/treatment',
  '/ivf-in-turkey',
  '/ivf-explained',
  '/cost-of-ivf',
  '/before-you-come',
  '/about-us',
  '/contact-us',
  '/aciklanamayan-kisirlik',
  '/kisirlik-nedenleri/aciklanamayan-kisirlik',
]);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function hasFileExtension(pathname) {
  return /\.[a-z0-9]+$/iu.test(pathname);
}

function shouldNormalizePath(pathname) {
  if (pathname === '/' || pathname.endsWith('/')) return false;
  if (hasFileExtension(pathname)) return false;
  if (pathname.startsWith('/api/')) return false;
  return true;
}

function normalizeUrl(value) {
  if (
    !value ||
    value.startsWith('#') ||
    value.startsWith('mailto:') ||
    value.startsWith('tel:') ||
    value.startsWith('javascript:')
  ) {
    return value;
  }

  let parsed;
  try {
    parsed = new URL(value, siteOrigin);
  } catch {
    return value;
  }

  if (parsed.origin !== siteOrigin || !shouldNormalizePath(parsed.pathname)) {
    return value;
  }

  parsed.pathname = `${parsed.pathname}/`;
  if (/^https?:\/\//iu.test(value)) {
    return parsed.toString();
  }
  return `${parsed.pathname}${parsed.search}${parsed.hash}`;
}

function rewriteHtml(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  const updated = original.replace(
    /\b(href|action)=(["'])(.*?)\2/giu,
    (fullMatch, attr, quote, value) => {
      const normalized = normalizeUrl(value);
      return normalized === value ? fullMatch : `${attr}=${quote}${normalized}${quote}`;
    }
  );

  if (updated !== original) {
    fs.writeFileSync(filePath, updated, 'utf8');
    return 1;
  }
  return 0;
}

function writeSitemapAlias() {
  const sitemapIndexPath = path.join(distDir, 'sitemap-index.xml');
  const sitemapAliasPath = path.join(distDir, 'sitemap.xml');
  if (!fs.existsSync(sitemapIndexPath)) return false;

  fs.copyFileSync(sitemapIndexPath, sitemapAliasPath);
  return true;
}

function isExtensionlessRoutePattern(pattern) {
  if (!pattern.startsWith('/')) return false;
  if (pattern.includes('*')) return false;
  if (pattern.includes('#')) return false;
  return !/\.[a-z0-9]+$/iu.test(pattern);
}

function shouldKeepFunctionExclude(pattern) {
  if (redirectOnlyFunctionExcludes.has(pattern)) return true;
  return !isExtensionlessRoutePattern(pattern);
}

function patchCloudflareRoutes() {
  const routesPath = path.join(distDir, '_routes.json');
  if (!fs.existsSync(routesPath)) return { patched: false, removed: 0 };

  const routes = JSON.parse(fs.readFileSync(routesPath, 'utf8'));
  const originalExcludes = Array.isArray(routes.exclude) ? routes.exclude : [];
  const nextExcludes = originalExcludes.filter(shouldKeepFunctionExclude);

  routes.exclude = nextExcludes;
  fs.writeFileSync(routesPath, `${JSON.stringify(routes, null, 2)}\n`, 'utf8');

  return {
    patched: true,
    removed: originalExcludes.length - nextExcludes.length,
  };
}

function patchWorkerEntrypoint() {
  const workerPath = path.join(distDir, '_worker.js', 'index.js');
  if (!fs.existsSync(workerPath)) return false;

  const original = fs.readFileSync(workerPath, 'utf8');
  if (original.includes('function canonicalRedirectFor')) return true;

  const helper = `
const TRACKING_QUERY_PARAMS = new Set([
  'fbclid',
  'gclid',
  'msclkid',
  'ref',
  'sa',
  'utm_campaign',
  'utm_content',
  'utm_id',
  'utm_medium',
  'utm_source',
  'utm_term',
  'utc',
  'v',
  'ved',
]);

function isPagePath(pathname) {
  if (pathname === '/') return true;
  if (pathname.startsWith('/api/')) return false;
  return !/\\.[a-z0-9]+$/iu.test(pathname);
}

function shouldTryStaticAsset(request) {
  if (request.method !== 'GET' && request.method !== 'HEAD') return false;

  const url = new URL(request.url);
  if (!isPagePath(url.pathname)) return false;
  if (url.pathname.startsWith('/_image')) return false;

  return true;
}

async function fetchStaticAsset(request, env) {
  const url = new URL(request.url);
  const candidates = [url.pathname];

  if (url.pathname.endsWith('/')) {
    candidates.push(url.pathname + 'index.html');
  } else {
    candidates.push(url.pathname + '/index.html');
  }

  for (const pathname of candidates) {
    const assetUrl = new URL(request.url);
    assetUrl.pathname = pathname;

    const assetRequest = new Request(assetUrl, request);
    const response = await env.ASSETS.fetch(assetRequest);
    if (response.status !== 404) return response;
  }

  return null;
}

function canonicalRedirectFor(requestUrl) {
  const url = new URL(requestUrl);
  let changed = false;

  const redirectHeaders = (location) => ({
    Location: location,
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  });

  if (url.hostname === 'www.tupbebek.com') {
    url.hostname = 'tupbebek.com';
    url.protocol = 'https:';
    return new Response(null, {
      status: 301,
      headers: redirectHeaders(url.toString()),
    });
  }

  // 410 Gone: template-rendering artifacts and legacy PHP probes that
  // never had real content. 410 removes from Google's index faster than
  // 301-to-home and avoids soft-404 risk for less-relevant 301 targets.
  const gone410Exact = new Set(['/modules.php', '/h2n.php', '/undefined', '/public/article.aspx', '/public/haber.aspx']);
  if (gone410Exact.has(url.pathname) || url.pathname.startsWith('/undefined/') || url.pathname.startsWith('/public/') || url.pathname.startsWith('/blog/sayfa/')) {
    return new Response('Gone', {
      status: 410,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'cache-control': 'public, max-age=86400',
      },
    });
  }

  const legacyRedirects = new Map([
    ['/$%7BsafeUrl%7D/', '/'],
    ['/$%7Bresult.url%7D/', '/'],
    ['/$%7Burl%7D/', '/'],
    ['/blog', '/makaleler/'],
    ['/blog/', '/makaleler/'],
  ]);

  const legacyDestination = legacyRedirects.get(url.pathname);
  if (legacyDestination) {
    return new Response(null, {
      status: 301,
      headers: redirectHeaders(legacyDestination),
    });
  }

  if (
    url.pathname === '/makaleler/hamilelik-ve-dogum' ||
    url.pathname.startsWith('/makaleler/hamilelik-ve-dogum/')
  ) {
    return new Response(null, {
      status: 301,
      headers: redirectHeaders('/makaleler/'),
    });
  }

  for (const key of [...url.searchParams.keys()]) {
    if (TRACKING_QUERY_PARAMS.has(key.toLowerCase())) {
      url.searchParams.delete(key);
      changed = true;
    }
  }

  if (isPagePath(url.pathname) && url.pathname !== '/' && !url.pathname.endsWith('/')) {
    url.pathname = \`\${url.pathname}/\`;
    changed = true;
  }

  if (!changed) return null;

  return new Response(null, {
    status: 301,
    headers: redirectHeaders(\`\${url.pathname}\${url.search}\`),
  });
}
`;

  const marker = 'const __astrojsSsrVirtualEntry = _exports.default;';
  if (!original.includes(marker)) {
    throw new Error(`Could not patch ${path.relative(rootDir, workerPath)}: worker export marker not found.`);
  }

  const replacement = `${helper}
const __astrojsSsrVirtualEntryBase = _exports.default;
const __astrojsSsrVirtualEntry = {
    ...__astrojsSsrVirtualEntryBase,
    async fetch(request, env, context) {
        const canonicalRedirect = canonicalRedirectFor(request.url);
        if (canonicalRedirect) return canonicalRedirect;

        if (shouldTryStaticAsset(request) && env.ASSETS) {
            const staticAsset = await fetchStaticAsset(request, env);
            if (staticAsset) return staticAsset;
        }

        return __astrojsSsrVirtualEntryBase.fetch(request, env, context);
    },
};`;

  fs.writeFileSync(workerPath, original.replace(marker, replacement), 'utf8');
  return true;
}

if (!fs.existsSync(distDir)) {
  throw new Error('dist directory not found. Run astro build before postbuild-seo.');
}

const htmlFiles = walk(distDir).filter((filePath) => filePath.endsWith('.html'));
const rewrittenHtmlFiles = htmlFiles.reduce((count, filePath) => count + rewriteHtml(filePath), 0);
const sitemapAliasWritten = writeSitemapAlias();
const routesPatch = patchCloudflareRoutes();
const workerPatched = patchWorkerEntrypoint();

console.log(
  `SEO postbuild: normalized links in ${rewrittenHtmlFiles} HTML file(s); ` +
  `sitemap.xml alias ${sitemapAliasWritten ? 'written' : 'skipped'}; ` +
  `routes ${routesPatch.patched ? `patched (${routesPatch.removed} page exclude(s) removed)` : 'skipped'}; ` +
  `worker canonicalizer ${workerPatched ? 'patched' : 'skipped'}.`
);
