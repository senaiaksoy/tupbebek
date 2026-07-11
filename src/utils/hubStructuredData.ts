import { normalizeSitePath, resolveSiteUrl } from './seo';

interface HubListItem {
  href: string;
  title: string;
  description: string;
}

interface HubItemListOptions {
  site?: URL | string | null;
  pagePath: string;
  id?: string;
  name: string;
  description: string;
  items: HubListItem[];
}

function resolvePageUrl(href: string, siteUrl: string): string {
  const url = new URL(href, siteUrl);
  url.pathname = normalizeSitePath(url.pathname);
  url.hash = '';
  return url.toString();
}

export function buildHubItemListSchema({
  site,
  pagePath,
  id = 'konu-haritasi',
  name,
  description,
  items
}: HubItemListOptions) {
  const siteUrl = resolveSiteUrl(site);
  const pageUrl = resolvePageUrl(pagePath, siteUrl);

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${pageUrl}#${id}`,
    name,
    description,
    url: `${pageUrl}#${id}`,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => {
      const itemUrl = resolvePageUrl(item.href, siteUrl);

      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.title,
        // `item` and `url` are mutually exclusive on ListItem per Google's
        // Carousel spec — `item` carries the richer WebPage entity, so `url`
        // is omitted here rather than duplicated.
        item: {
          '@type': 'WebPage',
          '@id': `${itemUrl}#webpage`,
          url: itemUrl,
          name: item.title,
          description: item.description,
          inLanguage: 'tr-TR'
        }
      };
    })
  };
}
