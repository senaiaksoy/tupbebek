import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const failures = [];

const expectations = [
  {
    route: 'makaleler/tup-bebek-nedir/index.html',
    type: 'MedicalProcedure',
    name: 'T\u00fcp bebek (IVF)',
    sameAsIncludes: 'Q190290',
    alternateNameIncludes: 'IVF',
  },
  {
    route: 'makaleler/embriyo-transferi-sonrasi-bakim/index.html',
    type: 'MedicalProcedure',
    name: 'Embriyo transferi',
    sameAsIncludes: 'Q1782299',
  },
  {
    route: 'makaleler/dusuk-amh-hamilelik/index.html',
    type: 'MedicalTest',
    name: 'Anti-M\u00fcllerian hormon (AMH)',
    sameAsIncludes: 'Q417088',
    alternateNameIncludes: 'AMH',
  },
  {
    route: 'makaleler/azospermi-mikro-tese/index.html',
    type: 'MedicalCondition',
    name: 'Azospermi',
    sameAsIncludes: 'Q793935',
  },
  {
    route: 'makaleler/pgt-a-bas-editor-kosesi/index.html',
    type: 'MedicalTest',
    name: 'PGT-A',
    sameAsIncludes: 'Q386927',
    alternateNameIncludes: 'Preimplantasyon genetik test',
  },
  {
    route: 'makaleler/endometriozis-tup-bebek/index.html',
    type: 'MedicalCondition',
    name: 'Endometriozis',
    sameAsIncludes: 'Q205318',
  },
  {
    route: 'makaleler/yasa-gore-tup-bebek-basari-oranlari/index.html',
    type: 'MedicalWebPage',
    name: 'T\u00fcp bebek ba\u015far\u0131 oranlar\u0131',
    sameAsIncludes: 'Q3229606',
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

function toArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
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
    const article = parseJsonLd(html, expectation.route).find((node) => typeIncludes(node, 'Article'));
    if (!article) {
      failures.push(`${expectation.route} has no Article JSON-LD node.`);
      continue;
    }

    const about = article.about;
    if (!about || typeof about !== 'object') {
      failures.push(`${expectation.route} Article node has no about object.`);
      continue;
    }

    if (!typeIncludes(about, expectation.type)) {
      failures.push(`${expectation.route} about expected @type ${expectation.type}, got ${JSON.stringify(about['@type'])}.`);
    }

    if (about.name !== expectation.name) {
      failures.push(`${expectation.route} about expected name "${expectation.name}", got "${about.name}".`);
    }

    const sameAs = toArray(about.sameAs).join(' ');
    if (expectation.sameAsIncludes && !sameAs.includes(expectation.sameAsIncludes)) {
      failures.push(`${expectation.route} about.sameAs does not include ${expectation.sameAsIncludes}.`);
    }

    const alternateNames = toArray(about.alternateName);
    if (expectation.alternateNameIncludes && !alternateNames.includes(expectation.alternateNameIncludes)) {
      failures.push(`${expectation.route} about.alternateName does not include "${expectation.alternateNameIncludes}".`);
    }
  }
}

if (failures.length > 0) {
  console.error(`Article entity verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Article entity verification passed. Checked ${expectations.length} target article entities.`);
