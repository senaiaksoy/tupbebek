#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

// esbuild Astro/Vite ile birlikte kurulu gelir; yoksa kontrol atlanır.
const esbuildTransform = await import('esbuild').then((m) => m.transformSync).catch(() => null);
import {
  gone410ExactPaths,
  normalizeAliasTarget,
  normalizeInternalPath,
  routeAliases,
  splitPathQueryHash,
  wildcardFallbacks,
} from '../src/utils/routeAliases.mjs';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const siteOrigin = 'https://tupbebek.com';
// These legacy namespaces have redirect logic in the Astro Worker. Keeping
// them out of the Worker route table makes Cloudflare rely on _redirects
// (which is capped on Pages plans) and can turn valid aliases into 404s.
const workerHandledLegacyPrefixes = new Set([
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
  if (
    workerHandledLegacyPrefixes.has(pattern) ||
    (pattern.endsWith('/*') && workerHandledLegacyPrefixes.has(pattern.slice(0, -2)))
  ) {
    return false;
  }
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

// 404 sayfasının kendi adresleri 404 durum koduyla döner. Aksi halde Pages
// /404/ isteğini 308 ile /404'e, eğik çizgi kuralı da /404'ü /404/'e
// gönderip sonsuz döngü kurar; /404.html de 200 döner.
const __tbNotFoundPagePaths = new Set(['/404', '/404/', '/404.html']);

async function fetchNotFoundPage(request, env) {
  for (const candidate of ['/404', '/404.html']) {
    const page = await env.ASSETS.fetch(new Request(new URL(candidate, request.url), { method: 'GET', redirect: 'manual' }));
    if (page.status === 200) {
      return new Response(request.method === 'HEAD' ? null : page.body, {
        status: 404,
        headers: {
          'content-type': 'text/html; charset=utf-8',
          'cache-control': 'public, max-age=300',
        },
      });
    }
  }
  return null;
}

// Takma ad araçları kendi kapsamında tutulur; paketlenmiş worker'daki
// aynı adlı değişkenlerle çakışmaz.
const __tbPagePaths = new Set(${JSON.stringify(workerPagePaths)});
const __tbAliasTools = (() => {
  const routeAliases = ${JSON.stringify(routeAliases)};
  const wildcardFallbacks = ${JSON.stringify(wildcardFallbacks)};
  ${splitPathQueryHash.toString()}
  ${normalizeAliasTarget.toString()}
  ${normalizeInternalPath.toString()}
  return { normalizeInternalPath, wildcardFallbacks };
})();

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

  // Kopya adresler tek kanonik adrese toplanır: // → /, /x/index.html → /x/,
  // ve yalnızca gerçek bir sayfa klasörü varsa /x.html → /x/ (dosya .html'ler etkilenmez).
  const collapsedPath = url.pathname.replace(/\\/{2,}/g, '/');
  if (collapsedPath !== url.pathname) {
    url.pathname = collapsedPath;
    changed = true;
  }
  if (url.pathname.endsWith('/index.html')) {
    url.pathname = url.pathname.slice(0, -'index.html'.length);
    changed = true;
  } else if (url.pathname.endsWith('.html')) {
    const pageCandidate = \`\${url.pathname.slice(0, -'.html'.length)}/\`;
    if (__tbPagePaths.has(pageCandidate)) {
      url.pathname = pageCandidate;
      changed = true;
    }
  }

  // 410 Gone: template artifacts, legacy probes, and retired topic pages
  // without a relevant replacement. Avoid intent-mismatched 301 redirects.
  const gone410Exact = new Set(${JSON.stringify(gone410ExactPaths)});
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

  // API adresleri trailingSlash: 'always' ile yalnızca eğik çizgili biçimde
  // eşleşir. Eğik çizgisiz istekler 308 ile yönlendirilir (308, POST yöntemini
  // ve gövdesini korur; 301 POST'u GET'e çevirirdi).
  if (url.pathname.startsWith('/api/') && !url.pathname.endsWith('/') && !/\\.[a-z0-9]+$/iu.test(url.pathname)) {
    return new Response(null, {
      status: 308,
      headers: redirectHeaders(\`\${url.pathname}/\${url.search}\`),
    });
  }

  // Tracking params are stripped from pages only; static assets keep their
  // version query (e.g. /fonts/deferred.css?rev=...) so cache-busting works.
  for (const key of isPagePath(url.pathname) ? [...url.searchParams.keys()] : []) {
    if (TRACKING_QUERY_PARAMS.has(key.toLowerCase())) {
      url.searchParams.delete(key);
      changed = true;
    }
  }

  // Takma adlar ve eski ad alanları, büyük harf ve eğik çizgi düzeltmesinden
  // ÖNCE çözülür; böylece /makaleler/yumurta-takibi tek 301 ile hedefe gider
  // (önce /yumurta-takibi/, sonra hedef şeklinde iki adımlı zincir oluşmaz).
  if (isPagePath(url.pathname)) {
    const pathAndSearch = \`\${url.pathname}\${url.search}\`;
    const aliased = __tbAliasTools.normalizeInternalPath(pathAndSearch);
    if (aliased !== pathAndSearch) {
      return new Response(null, { status: 301, headers: redirectHeaders(aliased) });
    }

    const loweredPath = url.pathname.replace(/%[0-9A-Fa-f]{2}|[A-Z]+/g, (m) => (m.startsWith('%') ? m : m.toLowerCase()));
    for (const [prefix, destination] of __tbAliasTools.wildcardFallbacks) {
      if (loweredPath.startsWith(prefix)) {
        return new Response(null, { status: 301, headers: redirectHeaders(\`\${destination}\${url.search}\`) });
      }
    }
  }

  // Page slugs are lowercase ASCII; /makaleler/beta-hCG-testi/ etc. must not 404.
  // Percent-encoded bytes (%C3) are ignored when checking for uppercase letters.
  if (isPagePath(url.pathname) && /[A-Z]/.test(url.pathname.replace(/%[0-9A-Fa-f]{2}/g, ''))) {
    url.pathname = url.pathname.replace(/%[0-9A-Fa-f]{2}|[A-Z]+/g, (m) => (m.startsWith('%') ? m : m.toLowerCase()));
    changed = true;
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
        if (env.ASSETS && __tbNotFoundPagePaths.has(new URL(request.url).pathname)) {
            const notFoundPage = await fetchNotFoundPage(request, env);
            if (notFoundPage) return notFoundPage;
        }

        const canonicalRedirect = canonicalRedirectFor(request.url);
        if (canonicalRedirect) return canonicalRedirect;

        if (shouldTryStaticAsset(request) && env.ASSETS) {
            const staticAsset = await fetchStaticAsset(request, env);
            if (staticAsset) return staticAsset;
        }

        return __astrojsSsrVirtualEntryBase.fetch(request, env, context);
    },
};`;

  const patched = original.replace(marker, replacement);
  // Şablon içindeki kaçış hataları build'i geçip yayında worker'ı bozabilir;
  // yamalanan worker esbuild ile ayrıştırılır, hata varsa build durur.
  if (esbuildTransform) {
    try {
      esbuildTransform(patched, { loader: 'js', format: 'esm' });
    } catch (error) {
      throw new Error(`Patched worker is not valid JavaScript: ${error.message}`);
    }
  } else {
    console.warn('SEO postbuild: esbuild bulunamadı, worker sözdizimi kontrolü atlandı.');
  }
  fs.writeFileSync(workerPath, patched, 'utf8');
  return true;
}

if (!fs.existsSync(distDir)) {
  throw new Error('dist directory not found. Run astro build before postbuild-seo.');
}

const htmlFiles = walk(distDir).filter((filePath) => filePath.endsWith('.html'));

// Worker takma adları ve eski ad alanlarını statik sayfalardan önce çözer.
// Gerçek bir sayfa bu kurallara takılırsa yönlendirilir ve kaybolur; build durdurulur.
function assertRedirectsDoNotShadowPages(files) {
  const pagePaths = files
    .map((filePath) => '/' + path.relative(distDir, filePath).split(path.sep).join('/'))
    .filter((rel) => rel !== '/404.html')
    .map((rel) => rel.replace(/index\.html$/, '').replace(/\.html$/, '/'));
  const shadowed = [];
  for (const pagePath of pagePaths) {
    const withoutSlash = pagePath.replace(/\/+$/, '') || '/';
    if (routeAliases[withoutSlash] || routeAliases[withoutSlash.toLowerCase()]) shadowed.push(`${pagePath} (takma ad)`);
    for (const [prefix] of wildcardFallbacks) {
      if (pagePath.startsWith(prefix)) shadowed.push(`${pagePath} (önek ${prefix})`);
    }
  }
  if (shadowed.length) {
    throw new Error(`Yönlendirme kuralları gerçek sayfaları gölgeliyor: ${shadowed.join(', ')}`);
  }
}
assertRedirectsDoNotShadowPages(htmlFiles);

// Worker'ın kopya-adres kontrolü için gerçek sayfa klasörleri (/x/index.html → /x/).
const workerPagePaths = htmlFiles
  .map((filePath) => '/' + path.relative(distDir, filePath).split(path.sep).join('/'))
  .filter((rel) => rel.endsWith('/index.html') || rel === '/index.html')
  .map((rel) => rel.slice(0, -'index.html'.length));
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
