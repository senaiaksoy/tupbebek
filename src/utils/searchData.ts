// Define SearchItem type for search data
import { getPublishedArticles, sanitizeImage } from './articles';

export interface SearchItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  category?: string;
  image?: string;
  type?: 'article' | 'guide' | 'question';
}

/**
 * Transform published articles into search data format for HeroSearch component.
 * Maps article metadata to SearchItem properties.
 */
export const getSearchData = async (): Promise<SearchItem[]> => {
  const articles = await getPublishedArticles();

  return articles.map(article => ({
    id: article.slug,
    title: article.data.title,
    description: article.data.description,
    url: `/makaleler/${article.slug}`,
    category: article.data.category,
    image: sanitizeImage(article.data.image),
    type: 'article',
  }));
};
