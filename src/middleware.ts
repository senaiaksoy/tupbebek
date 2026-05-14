import { defineMiddleware } from 'astro:middleware';
import { normalizeInternalPath } from './utils/routeAliases.mjs';

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
  ['/undefined/', '/'],
];

function withQuery(destination: string, search: string): string {
  if (!search) return destination;

  const hashIndex = destination.indexOf('#');
  if (hashIndex < 0) return `${destination}${search}`;

  return `${destination.slice(0, hashIndex)}${search}${destination.slice(hashIndex)}`;
}

export const onRequest = defineMiddleware((context, next) => {
  const source = `${context.url.pathname}${context.url.search}`;
  const normalized = normalizeInternalPath(source);

  if (normalized !== source) {
    return context.redirect(normalized, 301);
  }

  for (const [prefix, destination] of WILDCARD_FALLBACKS) {
    if (context.url.pathname.startsWith(prefix)) {
      return context.redirect(withQuery(destination, context.url.search), 301);
    }
  }

  return next();
});
