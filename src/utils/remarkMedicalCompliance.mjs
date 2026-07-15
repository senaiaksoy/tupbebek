import { normalizeInternalPath } from './routeAliases.mjs';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function visit(node, visitor) {
  if (!node || typeof node !== 'object') return;
  visitor(node);
  if (Array.isArray(node.children)) {
    node.children.forEach((child) => visit(child, visitor));
  }
}

function normalizeCanonicalPath(url) {
  if (typeof url !== 'string' || !url.startsWith('/')) {
    return url;
  }

  const hashIndex = url.indexOf('#');
  const queryIndex = url.indexOf('?');
  const suffixIndex = [hashIndex, queryIndex].filter((index) => index >= 0).sort((a, b) => a - b)[0];
  const path = suffixIndex >= 0 ? url.slice(0, suffixIndex) : url;
  const suffix = suffixIndex >= 0 ? url.slice(suffixIndex) : '';
  const trimmed = path.replace(/\/+$/g, '') || '/';

  if (trimmed === '/' || /\.[a-z0-9]+$/iu.test(trimmed)) {
    return `${trimmed}${suffix}`;
  }

  return `${trimmed}/${suffix}`;
}

function normalizeInternalLink(url) {
  // Sayfa ici bolum baglantilari rota degildir. URL tabanina gore cozulurse
  // `#bolum` yanlislikla `/#bolum` olur ve makale yerine ana sayfaya gider.
  if (typeof url !== 'string' || url.startsWith('#')) {
    return url;
  }

  try {
    const parsed = new URL(url, 'https://tupbebek.com');
    if (/(\.|^)tupbebek\.com$/iu.test(parsed.hostname)) {
      return normalizeCanonicalPath(
        normalizeInternalPath(`${parsed.pathname}${parsed.search}${parsed.hash}`)
      );
    }
  } catch {
    // Fall through to direct normalization for relative links.
  }

  return normalizeCanonicalPath(normalizeInternalPath(url));
}

export default function remarkMedicalCompliance() {
  return function transformer(tree) {
    visit(tree, (node) => {
      if (node.type === 'heading' && node.depth === 1) {
        node.depth = 2;
      }

      if (node.type === 'link' && typeof node.url === 'string') {
        node.url = normalizeInternalLink(node.url);
      }

      if (node.type === 'image' && typeof node.url === 'string') {
        node.type = 'html';
        node.value = `<img src="${escapeHtml(node.url)}" alt="${escapeHtml(node.alt || '')}" loading="lazy" decoding="async">`;
        delete node.url;
        delete node.alt;
        delete node.title;
      }

      if ((node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') && node.name === 'h1') {
        node.name = 'h2';
      }

      if (node.type === 'html' && typeof node.value === 'string') {
        node.value = node.value.replace(/<h1(\s|>)/gi, '<h2$1').replace(/<\/h1>/gi, '</h2>');
      }
    });
  };
}
