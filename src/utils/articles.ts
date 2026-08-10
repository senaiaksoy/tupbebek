import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

/** Build sırasında aynı koleksiyonun tekrar filtrelenmesini önler. */
let publishedArticlesPromise: Promise<CollectionEntry<'articles'>[]> | null = null;

/**
 * Yayinlanmis makaleleri dondurur.
 * Yalnizca status === 'published' makaleleri getirir.
 * Draft ve in_review makaleleri filtrelenir.
 * Sonuç modül düzeyinde önbelleklenir (RelatedArticles vb. çoklu çağrılar için).
 */
export async function getPublishedArticles() {
  if (!publishedArticlesPromise) {
    publishedArticlesPromise = getCollection('articles').then(articles =>
      articles.filter(entry => entry.data.status === 'published')
    );
  }
  return publishedArticlesPromise;
}

/**
 * Tum makaleleri (draft dahil) dondurur — sadece editoryal panel icin.
 */
export async function getAllArticles() {
  return getCollection('articles');
}
/**
 * Makale frontmatter'ındaki image alanından (varsa kategori bilgisini ayıklayıp) 
 * temiz URL'yi döndürür.
 */
export function sanitizeImage(imageStr: string | undefined): string {
  if (!imageStr) return '';
  return imageStr.split(',')[0].trim();
}
