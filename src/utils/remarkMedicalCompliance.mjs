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

export default function remarkMedicalCompliance() {
  return function transformer(tree) {
    visit(tree, (node) => {
      if (node.type === 'heading' && node.depth === 1) {
        node.depth = 2;
      }

      if (node.type === 'link' && typeof node.url === 'string') {
        node.url = normalizeInternalPath(node.url);
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
