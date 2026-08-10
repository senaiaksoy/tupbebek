import imageDimensions from '../data/imageDimensions.json';
import imageVariants from '../data/imageVariants.json';

/**
 * Hero görsel boyut çözümleyici.
 *
 * Boyutlar `scripts/build-image-manifest.mjs` tarafından build öncesi
 * üretilen `src/data/imageDimensions.json` manifest'inden okunur.
 * Bu yaklaşım Cloudflare Workers bundle'ında Node deps (sharp, fs) gerektirmez —
 * runtime'da sadece statik JSON lookup yapılır.
 *
 * Frontmatter'da `imageWidth`/`imageHeight` varsa onlar önceliklidir.
 */

interface ImageDimensions {
  width: number;
  height: number;
}

export interface ResponsiveImageVariant extends ImageDimensions {
  src: string;
}

const DEFAULT_FALLBACK: ImageDimensions = { width: 1600, height: 900 };

const manifest: Record<string, ImageDimensions> = imageDimensions as Record<string, ImageDimensions>;
const responsiveManifest: Record<string, ResponsiveImageVariant[]> =
  imageVariants as Record<string, ResponsiveImageVariant[]>;

export function getImageDimensions(imagePath: string | undefined): ImageDimensions | null {
  if (!imagePath) return null;
  if (/^https?:\/\//i.test(imagePath)) return null;
  const cleanPath = imagePath.split(',')[0].trim();
  return manifest[cleanPath] ?? null;
}

export function getResponsiveImageVariants(imagePath: string | undefined): ResponsiveImageVariant[] {
  if (!imagePath || /^https?:\/\//i.test(imagePath)) return [];
  return responsiveManifest[imagePath] ?? [];
}

export function getResponsiveImageSrcSet(imagePath: string | undefined): string | undefined {
  const variants = getResponsiveImageVariants(imagePath);
  if (variants.length === 0) return undefined;
  return variants.map((variant) => `${variant.src} ${variant.width}w`).join(', ');
}

/**
 * Öncelik sırası:
 *   1. Frontmatter explicit (imageWidth + imageHeight)
 *   2. Manifest lookup (build-time sharp metadata)
 *   3. 1600x900 fallback (yeni hero standardı)
 */
export function resolveImageDimensions(opts: {
  image?: string;
  frontmatterWidth?: number;
  frontmatterHeight?: number;
}): ImageDimensions {
  if (opts.frontmatterWidth && opts.frontmatterHeight) {
    return { width: opts.frontmatterWidth, height: opts.frontmatterHeight };
  }
  return getImageDimensions(opts.image) ?? DEFAULT_FALLBACK;
}
