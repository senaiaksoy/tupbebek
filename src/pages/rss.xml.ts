import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedArticles } from '../utils/articles';

export async function GET(context: APIContext) {
  const articles = await getPublishedArticles();

  const sorted = articles.sort((a, b) => {
    const dateA = a.data.lastModified ?? a.data.publishDate;
    const dateB = b.data.lastModified ?? b.data.publishDate;
    return (dateB?.getTime() ?? 0) - (dateA?.getTime() ?? 0);
  });

  return rss({
    title: 'tupbebek.com — Bilimsel Üreme Sağlığı Rehberi',
    description:
      'Türkiye\'nin bağımsız, reklamsız üreme sağlığı ve tüp bebek bilgi portalı. Doç. Dr. Senai Aksoy editörlüğünde güncel makaleler.',
    site: context.site!,
    items: sorted.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.publishDate,
      link: `/makaleler/${article.slug}/`,
      categories: article.data.category ? [article.data.category] : undefined,
    })),
    customData: '<language>tr</language>',
  });
}
