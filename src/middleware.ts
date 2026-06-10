import { defineMiddleware } from 'astro:middleware';
import { normalizeInternalPath } from './utils/routeAliases.mjs';

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

const WILDCARD_FALLBACKS: Array<[string, string]> = [
  ['/blog/sayfa/', '/makaleler/'],
  ['/blog/', '/makaleler/'],
  ['/treatment/', '/tedavi-yontemleri/'],
  ['/videolar/', '/makaleler/'],
  ['/public/', '/makaleler/'],
  ['/ar/', '/'],
  ['/fr/', '/'],
  ['/ivf-in-turkey/', '/'],
  ['/ivf-explained/', '/ivf-rehberi/'],
  ['/cost-of-ivf/', '/sss/'],
  ['/about-us/', '/hakkimizda/'],
  ['/contact-us/', '/iletisim/'],
  ['/before-you-come/', '/tani-sureci/'],
  ['/makaleler/kisirlik/', '/makaleler/'],
  ['/makaleler/hamilelik-ve-dogum/', '/makaleler/'],
  ['/makaleler/tup-bebek/', '/makaleler/'],
  ['/makaleler/endoskopik-cerrahi/', '/makaleler/'],
];

// 410 Gone paths: template-render artifacts and legacy PHP probes that
// never had real content. Returning 410 (instead of 301-to-home) removes
// them from Google's index faster and avoids the soft-404 risk Glenn Gabe
// documented. Must be checked BEFORE WILDCARD_FALLBACKS so '/undefined/'
// doesn't fall into the '/undefined/' wildcard.
const GONE_410_EXACT = new Set<string>([
  '/modules.php',
  '/h2n.php',
  '/undefined',
]);
const GONE_410_PREFIXES: string[] = ['/undefined/'];

function isGone(pathname: string): boolean {
  return GONE_410_EXACT.has(pathname) || GONE_410_PREFIXES.some((p) => pathname.startsWith(p)) || pathname.includes('/undefined');
}

function withQuery(destination: string, search: string): string {
  if (!search) return destination;

  const hashIndex = destination.indexOf('#');
  if (hashIndex < 0) return `${destination}${search}`;

  return `${destination.slice(0, hashIndex)}${search}${destination.slice(hashIndex)}`;
}

function isPagePath(pathname: string): boolean {
  if (pathname === '/') return true;
  if (pathname.startsWith('/api/')) return false;
  return !/\.[a-z0-9]+$/iu.test(pathname);
}

function removeTrackingParams(searchParams: URLSearchParams): boolean {
  let changed = false;

  for (const key of [...searchParams.keys()]) {
    if (TRACKING_QUERY_PARAMS.has(key.toLowerCase())) {
      searchParams.delete(key);
      changed = true;
    }
  }

  return changed;
}

export const onRequest = defineMiddleware((context, next) => {
  const canonicalUrl = new URL(context.url);

  if (isGone(canonicalUrl.pathname)) {
    return new Response('Gone', {
      status: 410,
      headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=86400' },
    });
  }

  const originalPathSearch = `${canonicalUrl.pathname}${canonicalUrl.search}`;
  const normalized = normalizeInternalPath(originalPathSearch);

  if (normalized !== originalPathSearch) {
    return context.redirect(normalized, 301);
  }

  let changed = removeTrackingParams(canonicalUrl.searchParams);

  if (
    isPagePath(canonicalUrl.pathname) &&
    canonicalUrl.pathname !== '/' &&
    !canonicalUrl.pathname.endsWith('/')
  ) {
    canonicalUrl.pathname = `${canonicalUrl.pathname}/`;
    changed = true;
  }

  if (changed) {
    return context.redirect(`${canonicalUrl.pathname}${canonicalUrl.search}`, 301);
  }

  for (const [prefix, destination] of WILDCARD_FALLBACKS) {
    if (context.url.pathname.startsWith(prefix)) {
      return context.redirect(withQuery(destination, context.url.search), 301);
    }
  }

  return next();
});
