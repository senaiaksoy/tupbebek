import type { APIRoute } from 'astro';
import { gone410ExactPaths, normalizeInternalPath } from '../utils/routeAliases.mjs';

export const prerender = false;

// Wildcard fallback prefixes: any unknown path starting with one of these
// gets redirected to the destination. Used as a safety net for legacy URLs
// that aren't covered by specific routeAliases entries.
const WILDCARD_FALLBACKS: Array<[string, string]> = [
  ['/blog/', '/makaleler/'],
  ['/treatment/', '/tedavi-yontemleri/'],
  ['/videolar/', '/makaleler/'],
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

// 410 Gone: template-render artifacts, legacy PHP probes, and retired topic
// pages without a relevant replacement. Cloudflare Pages _redirects does not
// support 410, so the Worker returns it directly and avoids irrelevant 301s.
const GONE_410_EXACT = new Set<string>(gone410ExactPaths);
const GONE_410_PREFIXES: string[] = [
  '/undefined/',
  '/public/',
  '/blog/sayfa/',
  '/treatment/embryo-freezing/treatment/',
];

const handle: APIRoute = ({ url, redirect }) => {
  if (GONE_410_EXACT.has(url.pathname) || GONE_410_PREFIXES.some((p) => url.pathname.startsWith(p)) || url.pathname.includes('/undefined')) {
    return new Response('Gone', {
      status: 410,
      headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=86400' },
    });
  }

  const normalized = normalizeInternalPath(url.pathname);

  if (normalized !== url.pathname) {
    return redirect(`${normalized}${url.search}`, 301);
  }

  // Wildcard fallback: if no specific alias matched but the path starts with
  // a known legacy prefix, redirect to the prefix's destination.
  for (const [prefix, destination] of WILDCARD_FALLBACKS) {
    if (url.pathname.startsWith(prefix)) {
      return redirect(`${destination}${url.search}`, 301);
    }
  }

  return new Response('Not found', { status: 404 });
};

// Export every common HTTP method so HEAD/POST/etc are also redirected,
// not just GET (e.g. curl -I sends HEAD and would otherwise get a 404).
export const GET = handle;
export const HEAD = handle;
export const POST = handle;
export const PUT = handle;
export const DELETE = handle;
export const PATCH = handle;
export const OPTIONS = handle;
export const ALL = handle;
