const INLINE_EVIDENCE_REGEX = /\{\{\s*(?:kanit|kanıt|evidence)\s*:\s*(A|B|C|D\/E)\s*\}\}/g;

const INLINE_EVIDENCE_MAP = {
  A: {
    cssClass: 'inline-evidence--a',
    label: 'çok güçlü kanıt',
  },
  B: {
    cssClass: 'inline-evidence--b',
    label: 'güçlü kanıt',
  },
  C: {
    cssClass: 'inline-evidence--c',
    label: 'orta/zayıf kanıt',
  },
  'D/E': {
    cssClass: 'inline-evidence--de',
    label: 'çok zayıf kanıt',
  },
};

function createEvidenceHtml(grade) {
  const config = INLINE_EVIDENCE_MAP[grade];
  const text = `${grade} - ${config.label}`;
  const tooltip = `Kanıt düzeyi: ${text}`;

  return `<span class="inline-evidence ${config.cssClass}" title="${tooltip}" aria-label="${tooltip}">(${text})</span>`;
}

function replaceTextNode(node, parent, index) {
  const value = node.value;
  let match;
  let lastIndex = 0;
  const nextNodes = [];

  INLINE_EVIDENCE_REGEX.lastIndex = 0;

  while ((match = INLINE_EVIDENCE_REGEX.exec(value)) !== null) {
    const [fullMatch, grade] = match;
    const start = match.index;

    if (start > lastIndex) {
      nextNodes.push({
        type: 'text',
        value: value.slice(lastIndex, start),
      });
    }

    nextNodes.push({
      type: 'html',
      value: createEvidenceHtml(grade),
    });

    lastIndex = start + fullMatch.length;
  }

  if (!nextNodes.length) {
    return;
  }

  if (lastIndex < value.length) {
    nextNodes.push({
      type: 'text',
      value: value.slice(lastIndex),
    });
  }

  parent.children.splice(index, 1, ...nextNodes);
}

function visitTree(node) {
  if (!node || typeof node !== 'object' || !Array.isArray(node.children)) {
    return;
  }

  for (let index = 0; index < node.children.length; index += 1) {
    const child = node.children[index];

    if (child?.type === 'text') {
      const previousLength = node.children.length;
      replaceTextNode(child, node, index);
      const delta = node.children.length - previousLength;
      if (delta > 0) {
        index += delta;
      }
      continue;
    }

    visitTree(child);
  }
}

export default function remarkInlineEvidence() {
  return function transformer(tree) {
    visitTree(tree);
  };
}
