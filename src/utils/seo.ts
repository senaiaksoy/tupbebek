export type OgType = "website" | "article";

interface CanonicalOptions {
  siteUrl: string;
  pathname: string;
  canonical?: string;
}

interface SocialImageOptions {
  siteUrl: string;
  image?: string;
}

const DEFAULT_SITE_URL = "https://estranova.com";
const DEFAULT_SOCIAL_IMAGE_PATH = "/favicon.svg";

function normalizeUrl(value: string): string {
  const url = new URL(value);

  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.slice(0, -1);
  }

  url.hash = "";
  return url.toString();
}

function ensureAbsoluteUrl(urlOrPath: string, siteUrl: string): string {
  if (/^https?:\/\//iu.test(urlOrPath)) {
    return normalizeUrl(urlOrPath);
  }
  return normalizeUrl(new URL(urlOrPath, siteUrl).toString());
}

export function resolveSiteUrl(site?: URL | string | null): string {
  if (!site) return DEFAULT_SITE_URL;
  return normalizeUrl(site.toString());
}

export function resolveCanonicalUrl({
  siteUrl,
  pathname,
  canonical,
}: CanonicalOptions): string {
  if (canonical) {
    return ensureAbsoluteUrl(canonical, siteUrl);
  }
  return normalizeUrl(new URL(pathname, siteUrl).toString());
}

export function resolveSocialImageUrl({ siteUrl, image }: SocialImageOptions): string {
  const imagePath = image?.trim() || DEFAULT_SOCIAL_IMAGE_PATH;
  return ensureAbsoluteUrl(imagePath, siteUrl);
}
