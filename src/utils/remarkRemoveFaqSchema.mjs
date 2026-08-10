/**
 * Visible FAQ content remains in the article, but legacy FAQPage JSON-LD is
 * removed from MD/MDX output. Google restricts FAQ rich results to well-known
 * government and health authority sites; article templates should not emit it
 * as a generic GEO signal.
 */
function walk(node, visitor) {
  if (!node || typeof node !== 'object') return;
  visitor(node);
  if (Array.isArray(node.children)) node.children.forEach((child) => walk(child, visitor));
}

function attributeExpression(node) {
  if (!Array.isArray(node.attributes)) return '';
  return node.attributes
    .map((attribute) => {
      if (typeof attribute?.value === 'string') return attribute.value;
      if (typeof attribute?.value?.value === 'string') return attribute.value.value;
      return '';
    })
    .join(' ');
}

export default function remarkRemoveFaqSchema() {
  return function transformer(tree) {
    const faqSchemaNames = new Set();

    walk(tree, (node) => {
      if (node.type !== 'mdxjsEsm' || typeof node.value !== 'string') return;
      if (!/["']FAQPage["']/u.test(node.value)) return;
      for (const match of node.value.matchAll(/export\s+const\s+([A-Za-z_$][\w$]*)/gu)) {
        faqSchemaNames.add(match[1]);
      }
    });

    function prune(node) {
      if (!Array.isArray(node?.children)) return;
      node.children = node.children.filter((child) => {
        if (child.type === 'mdxjsEsm' && typeof child.value === 'string' && /["']FAQPage["']/u.test(child.value)) {
          return false;
        }

        if (
          (child.type === 'mdxJsxFlowElement' || child.type === 'mdxJsxTextElement') &&
          child.name === 'script'
        ) {
          const expression = attributeExpression(child);
          if ([...faqSchemaNames].some((name) => expression.includes(name))) return false;
        }

        if (child.type === 'html' && typeof child.value === 'string' && /FAQPage/u.test(child.value)) {
          return false;
        }

        prune(child);
        return true;
      });
    }

    prune(tree);
  };
}
