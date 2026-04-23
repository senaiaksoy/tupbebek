import type { APIRoute } from 'astro';
import { normalizeInternalPath } from '../utils/routeAliases.mjs';

export const prerender = false;

export const GET: APIRoute = ({ url, redirect }) => {
  const normalized = normalizeInternalPath(url.pathname);

  if (normalized !== url.pathname) {
    return redirect(`${normalized}${url.search}`, 301);
  }

  return new Response('Not found', { status: 404 });
};
