import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const failures = [];
const online = process.argv.includes('--online');
const wikidataPath = path.join(rootDir, 'src', 'data', 'articleWikidata.json');
const articlesDir = path.join(rootDir, 'src', 'content', 'articles');
const USER_AGENT = 'tupbebek-verify-article-entities/1.0 (https://tupbebek.com/)';

// Offline allowlist: each slug records the Q-ID *and* the English Wikidata label
// it is expected to carry. A Q-ID typo therefore has to be paired with a matching
// wrong label to slip through, and --online compares the label with live Wikidata.
const wikidata = JSON.parse(fs.readFileSync(wikidataPath, 'utf8'));
const articleSlugs = new Set(
  fs.readdirSync(articlesDir).map((file) => file.replace(/\.(md|mdx)$/u, '')),
);

for (const [slug, entry] of Object.entries(wikidata)) {
  if (!articleSlugs.has(slug)) failures.push(`articleWikidata.json: "${slug}" has no matching article file.`);
  if (!/^Q[1-9]\d*$/u.test(entry.qid ?? '')) failures.push(`articleWikidata.json: "${slug}" has invalid qid "${entry.qid}".`);
  if (!entry.label?.trim()) failures.push(`articleWikidata.json: "${slug}" is missing the expected English label.`);
  if (entry.wikipedia && !/^https:\/\/en\.wikipedia\.org\/wiki\/[^\s()]+$/u.test(entry.wikipedia)) {
    failures.push(`articleWikidata.json: "${slug}" has malformed wikipedia URL "${entry.wikipedia}".`);
  }
}

async function fetchJson(url) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    const text = await response.text();
    if (response.ok && text.startsWith('{')) return JSON.parse(text);
    await new Promise((resolve) => setTimeout(resolve, 15000));
  }
  throw new Error(`Request kept failing (rate limit?): ${url}`);
}

function normalizeLabel(value) {
  return (value ?? '').normalize('NFKD').replace(/[\u0300-\u036f]/gu, '').toLowerCase().trim();
}

async function verifyOnline() {
  const entries = Object.entries(wikidata);
  const qids = [...new Set(entries.map(([, entry]) => entry.qid))];
  const entities = {};
  for (let i = 0; i < qids.length; i += 50) {
    const url = `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${qids.slice(i, i + 50).join('|')}&props=labels|descriptions&languages=en&format=json`;
    Object.assign(entities, (await fetchJson(url)).entities);
  }

  const titles = [...new Set(entries.filter(([, e]) => e.wikipedia).map(([, e]) => decodeURIComponent(e.wikipedia.split('/wiki/')[1]).replace(/_/gu, ' ')))];
  const wikipediaQids = {};
  for (let i = 0; i < titles.length; i += 50) {
    const batch = titles.slice(i, i + 50);
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(batch.join('|'))}&prop=pageprops&ppprop=wikibase_item&redirects=1&format=json`;
    const { query } = await fetchJson(url);
    const normalized = Object.fromEntries((query.normalized ?? []).map((n) => [n.from, n.to]));
    const redirects = Object.fromEntries((query.redirects ?? []).map((n) => [n.from, n.to]));
    const pages = Object.values(query.pages ?? {});
    for (const title of batch) {
      const canonical = normalized[title] ?? title;
      const target = redirects[canonical] ?? canonical;
      const page = pages.find((candidate) => candidate.title === target);
      wikipediaQids[title] = { target, redirected: target !== canonical, qid: page?.pageprops?.wikibase_item };
    }
  }

  for (const [slug, entry] of entries) {
    const entity = entities[entry.qid];
    const label = entity?.labels?.en?.value;
    if (!entity || 'missing' in entity) {
      failures.push(`[online] ${slug}: ${entry.qid} does not exist on Wikidata.`);
    } else if (normalizeLabel(label) !== normalizeLabel(entry.label)) {
      failures.push(`[online] ${slug}: ${entry.qid} is "${label}" (${entity.descriptions?.en?.value ?? 'no description'}), expected "${entry.label}".`);
    }
    if (entry.wikipedia) {
      const title = decodeURIComponent(entry.wikipedia.split('/wiki/')[1]).replace(/_/gu, ' ');
      const info = wikipediaQids[title];
      if (!info?.qid) {
        failures.push(`[online] ${slug}: Wikipedia page "${title}" is missing or has no Wikidata item.`);
      } else if (info.qid !== entry.qid) {
        failures.push(`[online] ${slug}: Wikipedia "${title}"${info.redirected ? ` (redirects to "${info.target}")` : ''} is ${info.qid}, not ${entry.qid}.`);
      }
    }
  }
}

const expectations = [
  {
    route: 'makaleler/kanser-ve-fertilite/index.html',
    type: 'MedicalProcedure',
    name: 'Fertilite koruma',
    sameAsIncludes: 'Q5445580',
    alternateNameIncludes: 'Onkofertilite',
  },
  {
    route: 'makaleler/tup-bebek-nedir/index.html',
    type: 'MedicalProcedure',
    name: 'T\u00fcp bebek (IVF)',
    sameAsIncludes: 'Q200117',
    alternateNameIncludes: 'IVF',
  },
  {
    route: 'makaleler/embriyo-transferi-sonrasi-bakim/index.html',
    type: 'MedicalProcedure',
    name: 'Embriyo transferi',
    sameAsIncludes: 'Q237118',
  },
  {
    route: 'makaleler/dusuk-amh-hamilelik/index.html',
    type: 'MedicalTest',
    name: 'Anti-M\u00fcllerian hormon (AMH)',
    sameAsIncludes: 'Q21108939',
    alternateNameIncludes: 'AMH',
  },
  {
    route: 'makaleler/azospermi-mikro-tese/index.html',
    type: 'MedicalCondition',
    name: 'Azospermi',
    sameAsIncludes: 'Q794026',
  },
  {
    route: 'makaleler/pgt-a-bas-editor-kosesi/index.html',
    type: 'MedicalTest',
    name: 'PGT-A',
    sameAsIncludes: 'Q1501356',
    alternateNameIncludes: 'Preimplantasyon genetik test',
  },
  {
    route: 'makaleler/endometriozis-tup-bebek/index.html',
    type: 'MedicalCondition',
    name: 'Endometriozis',
    sameAsIncludes: 'Q205764',
  },
  {
    route: 'makaleler/yasa-gore-tup-bebek-basari-oranlari/index.html',
    type: 'Thing',
    name: 'T\u00fcp bebek ba\u015far\u0131 oranlar\u0131',
    sameAsIncludes: 'Q648065',
  },
  {
    route: 'makaleler/kimyasal-gebelik/index.html',
    type: 'MedicalCondition',
    name: 'Kimyasal gebelik',
    sameAsIncludes: 'Q137195884',
    alternateNameIncludes: 'Biyokimyasal gebelik',
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

if (online) {
  await verifyOnline();
} else if (!fs.existsSync(distDir)) {
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

console.log(online
  ? `Article entity verification passed (online). ${Object.keys(wikidata).length} Wikidata mappings match their expected labels.`
  : `Article entity verification passed. Checked ${expectations.length} target article entities and ${Object.keys(wikidata).length} Wikidata mappings.`);
