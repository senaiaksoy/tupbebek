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

const DEFAULT_SITE_URL = "https://tupbebek.com";
const DEFAULT_SOCIAL_IMAGE_PATH = "/images/home/luxury-embryo.webp";

function hasFileExtension(pathname: string): boolean {
  return /\.[a-z0-9]+$/iu.test(pathname);
}

export function normalizeSitePath(pathname: string): string {
  const normalized = `/${pathname}`.replace(/\/{2,}/g, "/");
  const trimmed = normalized.replace(/\/+$/g, "") || "/";

  if (trimmed === "/") {
    return "/";
  }

  if (hasFileExtension(trimmed)) {
    return trimmed;
  }

  return `${trimmed}/`;
}

function normalizePageUrl(value: string): string {
  const url = new URL(value);
  url.pathname = normalizeSitePath(url.pathname);
  url.hash = "";
  return url.toString();
}

function normalizeAssetUrl(value: string): string {
  const url = new URL(value);
  url.hash = "";
  return url.toString();
}

function ensureAbsoluteUrl(urlOrPath: string, siteUrl: string): string {
  if (/^https?:\/\//iu.test(urlOrPath)) {
    return normalizeAssetUrl(urlOrPath);
  }
  return normalizeAssetUrl(new URL(urlOrPath, siteUrl).toString());
}

export function resolveSiteUrl(site?: URL | string | null): string {
  const url = new URL(site?.toString() || DEFAULT_SITE_URL);
  url.pathname = "/";
  url.hash = "";
  return url.toString();
}

export function resolveCanonicalUrl({
  siteUrl,
  pathname,
  canonical,
}: CanonicalOptions): string {
  if (canonical) {
    return normalizePageUrl(new URL(canonical, siteUrl).toString());
  }
  return normalizePageUrl(new URL(pathname, siteUrl).toString());
}

export function resolveSocialImageUrl({ siteUrl, image }: SocialImageOptions): string {
  const imagePath = image?.trim() || DEFAULT_SOCIAL_IMAGE_PATH;
  return ensureAbsoluteUrl(imagePath, siteUrl);
}

export function safeJsonLdStringify(obj: unknown): string {
  return JSON.stringify(obj, null, 0).replace(/[\u007F-\uFFFF]/g, (c) => "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4));
}

