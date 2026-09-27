import type { APIRoute } from 'astro';
import { gone410ExactPaths, normalizeInternalPath, wildcardFallbacks } from '../utils/routeAliases.mjs';

export const prerender = false;

// Wildcard fallback prefixes: any unknown path starting with one of these
// gets redirected to the destination. Used as a safety net for legacy URLs
// that aren't covered by specific routeAliases entries.
const WILDCARD_FALLBACKS = wildcardFallbacks as Array<[string, string]>;

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

const handle: APIRoute = async ({ url, redirect, locals, request }) => {
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

  return notFound(url, request, locals);
};

// Bilinmeyen sayfa adreslerinde düz metin yerine sitenin 404 sayfası,
// 404 durum koduyla gösterilir (menü ve arama okura açık kalır).
async function notFound(url: URL, request: Request, locals: App.Locals): Promise<Response> {
  const assets = (locals as { runtime?: { env?: { ASSETS?: { fetch: typeof fetch } } } }).runtime?.env?.ASSETS;
  // Pages, .html uzantısını 308 ile kaldırabildiği için önce /404 denenir.
  for (const candidate of assets ? ['/404', '/404.html'] : []) {
    try {
      const page = await assets!.fetch(new Request(new URL(candidate, url), { method: 'GET', redirect: 'manual' }));
      if (page.status === 200) {
        return new Response(request.method === 'HEAD' ? null : page.body, {
          status: 404,
          headers: {
            'content-type': 'text/html; charset=utf-8',
            'cache-control': 'public, max-age=300',
          },
        });
      }
    } catch {
      // 404 sayfası okunamazsa düz metne düşülür.
    }
  }
  return new Response('Not found', { status: 404, headers: { 'content-type': 'text/plain; charset=utf-8' } });
}

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
