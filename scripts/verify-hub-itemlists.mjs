import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const failures = [];

const expectations = [
  {
    route: 'pgt-merkezi/index.html',
    id: 'https://tupbebek.com/pgt-merkezi/#konu-haritasi',
    name: 'PGT merkezi konu haritas\u0131',
    itemCount: 5,
    urls: [
      'https://tupbebek.com/makaleler/pgt-a-bas-editor-kosesi/',
      'https://tupbebek.com/makaleler/pgt-m/',
      'https://tupbebek.com/makaleler/pgt-cinsiyet-secimi/',
      'https://tupbebek.com/genetik-testler/',
      'https://tupbebek.com/basari-oranlari/',
    ],
  },
  {
    route: 'basari-oranlari/index.html',
    id: 'https://tupbebek.com/basari-oranlari/#konu-haritasi',
    name: 'T\u00fcp bebek ba\u015far\u0131 oranlar\u0131 konu haritas\u0131',
    itemCount: 5,
    urls: [
      'https://tupbebek.com/makaleler/yasa-gore-tup-bebek-basari-oranlari/',
      'https://tupbebek.com/makaleler/dusuk-amh-hamilelik/',
      'https://tupbebek.com/makaleler/kac-yumurta-gerekir/',
      'https://tupbebek.com/makaleler/embriyo-transferi-sonrasi-bakim/',
      'https://tupbebek.com/pgt-merkezi/',
    ],
  },
  {
    route: 'endometriozis-adenomyozis/index.html',
    id: 'https://tupbebek.com/endometriozis-adenomyozis/#konu-haritasi',
    name: 'Endometriozis ve adenomyozis konu haritas\u0131',
    itemCount: 5,
    urls: [
      'https://tupbebek.com/makaleler/endometriozis-tup-bebek/',
      'https://tupbebek.com/makaleler/endometrioma/',
      'https://tupbebek.com/makaleler/endometriozis-akilli-stratejiler/',
      'https://tupbebek.com/makaleler/hormonal-tedavi-adenomyozis/',
      'https://tupbebek.com/kadin-infertilitesi/',
    ],
  },
];

const jsonLdScriptPattern =
  /<script\b(?=[^>]*\btype=(["'])application\/ld\+json\1)[^>]*>([\s\S]*?)<\/script>/giu;

function typeIncludes(node, expectedType) {
  const type = node?.['@type'];
  return Array.isArray(type) ? type.includes(expectedType) : type === expectedType;
}

function extractTopLevelNodes(data) {
  const roots = Array.isArray(data) ? data : [data];
  return roots.flatMap((root) => {
    if (root && typeof root === 'object' && Array.isArray(root['@graph'])) {
      return root['@graph'];
    }
    return root;
  }).filter((node) => node && typeof node === 'object');
}

function parseJsonLd(html, filePath) {
  const nodes = [];

  for (const match of html.matchAll(jsonLdScriptPattern)) {
    const rawJson = match[2].trim();
    if (!rawJson) continue;

    try {
      nodes.push(...extractTopLevelNodes(JSON.parse(rawJson)));
    } catch (error) {
      failures.push(`${filePath} has invalid JSON-LD: ${error.message}`);
    }
  }

  return nodes;
}

function normalizeUrl(url) {
  try {
    const parsed = new URL(url);
    parsed.hash = '';
    if (!parsed.pathname.endsWith('/')) parsed.pathname = `${parsed.pathname}/`;
    return parsed.toString();
  } catch {
    return String(url);
  }
}

if (!fs.existsSync(distDir)) {
  failures.push('Missing dist directory. Run npm run build first.');
} else {
  for (const expectation of expectations) {
    const filePath = path.join(distDir, ...expectation.route.split('/'));
    if (!fs.existsSync(filePath)) {
      failures.push(`${expectation.route} is missing from dist.`);
      continue;
    }

    const html = fs.readFileSync(filePath, 'utf8');
    const itemLists = parseJsonLd(html, expectation.route).filter((node) => typeIncludes(node, 'ItemList'));
    const itemList = itemLists.find((node) => node['@id'] === expectation.id);

    if (!itemList) {
      failures.push(`${expectation.route} has no ItemList with @id ${expectation.id}.`);
      continue;
    }

    if (itemList.name !== expectation.name) {
      failures.push(`${expectation.route} ItemList expected name "${expectation.name}", got "${itemList.name}".`);
    }

    if (itemList.numberOfItems !== expectation.itemCount) {
      failures.push(`${expectation.route} ItemList expected ${expectation.itemCount} items, got ${itemList.numberOfItems}.`);
    }

    const elements = Array.isArray(itemList.itemListElement) ? itemList.itemListElement : [];
    if (elements.length !== expectation.itemCount) {
      failures.push(`${expectation.route} ItemList expected ${expectation.itemCount} itemListElement entries, got ${elements.length}.`);
    }

    const actualUrls = new Set(elements.map((element) => normalizeUrl(element.url || element.item?.url)));
    for (const expectedUrl of expectation.urls.map(normalizeUrl)) {
      if (!actualUrls.has(expectedUrl)) {
        failures.push(`${expectation.route} ItemList does not include ${expectedUrl}.`);
      }
    }

    elements.forEach((element, index) => {
      if (!typeIncludes(element, 'ListItem')) {
        failures.push(`${expectation.route} item #${index + 1} is missing @type ListItem.`);
      }
      if (element.position !== index + 1) {
        failures.push(`${expectation.route} item #${index + 1} has position ${element.position}.`);
      }
      if (!element.item || !typeIncludes(element.item, 'WebPage')) {
        failures.push(`${expectation.route} item #${index + 1} is missing WebPage item.`);
      }
    });
  }
}

if (failures.length > 0) {
  console.error(`Hub ItemList verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Hub ItemList verification passed. Checked ${expectations.length} hub ItemLists.`);
