import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const failures = [];

const expectations = [
  {
    route: 'makaleler/tup-bebek-nedir/index.html',
    hubUrl: 'https://tupbebek.com/ivf-rehberi/',
    links: ['/makaleler/tup-bebek-sureci-rehber', '/makaleler/embriyo-transferi-sonrasi-bakim'],
  },
  {
    route: 'makaleler/embriyo-transferi-sonrasi-bakim/index.html',
    hubUrl: 'https://tupbebek.com/transfer-sureci/',
    links: ['/makaleler/embriyo-transferi-gun-secimi', '/makaleler/beta-hcg-testi'],
  },
  {
    route: 'makaleler/dusuk-amh-hamilelik/index.html',
    hubUrl: 'https://tupbebek.com/kadin-infertilitesi/',
    links: ['/makaleler/kac-yumurta-gerekir', '/makaleler/yasa-gore-tup-bebek-basari-oranlari'],
  },
  {
    route: 'makaleler/azospermi-mikro-tese/index.html',
    hubUrl: 'https://tupbebek.com/erkek-infertilitesi/',
    links: ['/makaleler/cerrahi-sperm-arama-tese', '/makaleler/mikroenjeksiyon-icsi-nedir'],
  },
  {
    route: 'makaleler/pgt-a-bas-editor-kosesi/index.html',
    hubUrl: 'https://tupbebek.com/pgt-merkezi/',
    links: ['/makaleler/pgt-m', '/makaleler/pgt-cinsiyet-secimi'],
  },
  {
    route: 'makaleler/endometriozis-tup-bebek/index.html',
    hubUrl: 'https://tupbebek.com/kadin-infertilitesi/',
    links: ['/makaleler/endometrioma', '/makaleler/endometriozis-akilli-stratejiler'],
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
    const parsed = new URL(url, 'https://tupbebek.com');
    parsed.hash = '';
    if (!parsed.pathname.endsWith('/')) parsed.pathname = `${parsed.pathname}/`;
    return parsed.toString();
  } catch {
    return String(url);
  }
}

function breadcrumbUrls(nodes) {
  const breadcrumb = nodes.find((node) => typeIncludes(node, 'BreadcrumbList'));
  const elements = Array.isArray(breadcrumb?.itemListElement) ? breadcrumb.itemListElement : [];
  return elements.map((element) => normalizeUrl(element.item || element.url));
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
    const nodes = parseJsonLd(html, expectation.route);
    const crumbs = breadcrumbUrls(nodes);
    const expectedHubUrl = normalizeUrl(expectation.hubUrl);

    if (!crumbs.includes(expectedHubUrl)) {
      failures.push(`${expectation.route} BreadcrumbList does not include hub ${expectedHubUrl}.`);
    }

    for (const link of expectation.links) {
      if (!html.includes(link)) {
        failures.push(`${expectation.route} does not include related cluster link ${link}.`);
      }
    }
  }
}

if (failures.length > 0) {
  console.error(`Article cluster verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Article cluster verification passed. Checked ${expectations.length} target article clusters.`);
