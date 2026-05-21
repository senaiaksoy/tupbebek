import fs from 'node:fs/promises';
import path from 'node:path';
import { normalizeInternalPath } from '../src/utils/routeAliases.mjs';

const rootDir = process.cwd();
const defaultInputDir = 'C:\\Users\\KC3\\Downloads\\tupbebek.com-Coverage-Drilldown-2026-05-14';
const siteOrigin = 'https://tupbebek.com';

const args = process.argv.slice(2);
const inputDir = args[0] || defaultInputDir;
const tablePath = path.join(inputDir, 'Tablo.csv');
const chartPath = path.join(inputDir, 'Grafik.csv');
const metaPath = path.join(inputDir, 'Meta Veri.csv');

const reportsDir = path.join(rootDir, 'reports');
const reportMdPath = path.join(reportsDir, 'gsc-coverage-redirect-analysis.md');
const aliasDraftPath = path.join(reportsDir, 'gsc-route-aliases-draft.json');
const redirectDraftPath = path.join(reportsDir, 'gsc-redirect-rules-draft.txt');

function parseCsv(text) {
  const rows = [];
  let cell = '';
  let row = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];

    if (ch === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && ch === ',') {
      row.push(cell);
      cell = '';
      continue;
    }

    if (!inQuotes && (ch === '\n' || ch === '\r')) {
      if (ch === '\r' && next === '\n') i += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
      continue;
    }

    cell += ch;
  }

  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }

  if (!rows.length) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).filter((r) => r.some((c) => c !== '')).map((r) => {
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = (r[i] ?? '').trim();
    });
    return obj;
  });
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function normalizePath(pathname) {
  if (!pathname) return '/';
  const withoutMultiSlash = pathname.replace(/\/{2,}/g, '/');
  if (withoutMultiSlash === '/') return '/';
  return withoutMultiSlash.endsWith('/') ? withoutMultiSlash : `${withoutMultiSlash}/`;
}

function canonicalize(urlString) {
  try {
    const parsed = new URL(urlString);
    const normalized = normalizeInternalPath(`${parsed.pathname}${parsed.search}${parsed.hash}`);
    const canonical = new URL(normalized, siteOrigin);
    canonical.pathname = normalizePath(canonical.pathname.toLowerCase());
    return canonical.toString();
  } catch {
    return '';
  }
}

function normalizeComparablePath(value) {
  try {
    const parsed = new URL(value, siteOrigin);
    return normalizePath(parsed.pathname.toLowerCase());
  } catch {
    return normalizePath(value.toLowerCase());
  }
}

async function listArticleSlugs() {
  const articlesDir = path.join(rootDir, 'src', 'content', 'articles');
  const files = await fs.readdir(articlesDir);
  const slugs = new Set(
    files
      .filter((name) => name.endsWith('.md') || name.endsWith('.mdx'))
      .map((name) => name.replace(/\.mdx?$/, '')),
  );
  return slugs;
}

function deriveAliasCandidate(pathname, articleSlugs) {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/') return null;
  const lowered = clean.toLowerCase();

  if (articleSlugs.has(lowered.slice(1))) {
    return { from: lowered, to: `/makaleler/${lowered.slice(1)}` };
  }

  const parts = lowered.split('/').filter(Boolean);
  if (!parts.length) return null;

  const trySlug = (slug) => {
    if (articleSlugs.has(slug)) {
      return { from: lowered, to: `/makaleler/${slug}` };
    }
    return null;
  };

  if (parts[0] === 'blog' && parts[1]) return trySlug(slugify(parts[1]));
  if ((parts[0] === 'fr' || parts[0] === 'ar') && parts[1] === 'blog' && parts[2]) return trySlug(slugify(parts[2]));
  if ((parts[0] === 'fr' || parts[0] === 'ar') && parts[1]) return trySlug(slugify(parts[1]));
  if (parts[0] === 'treatment' && parts[1]) return trySlug(slugify(parts[1]));

  return null;
}

function toTopLines(counter, total, limit = 12) {
  return [...counter.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => `- ${name}: ${count} (${((count / total) * 100).toFixed(1)}%)`)
    .join('\n');
}

async function main() {
  const [tableRaw, chartRaw, metaRaw, articleSlugs] = await Promise.all([
    fs.readFile(tablePath, 'utf8'),
    fs.readFile(chartPath, 'utf8'),
    fs.readFile(metaPath, 'utf8'),
    listArticleSlugs(),
  ]);

  const tableRows = parseCsv(tableRaw);
  const chartRows = parseCsv(chartRaw);
  const metaRows = parseCsv(metaRaw);

  const counters = new Map([
    ['http', 0],
    ['non_www', 0],
    ['query', 0],
    ['gclid', 0],
    ['search_placeholder', 0],
    ['no_trailing_slash', 0],
    ['fr_prefix', 0],
    ['ar_prefix', 0],
    ['blog_prefix', 0],
    ['malformed_url', 0],
  ]);

  const pathCounters = new Map();
  const hostCounters = new Map();
  const aliasCandidates = new Map();
  const sampleUrls = [];

  for (const row of tableRows) {
    const urlString = row.URL || '';
    if (!urlString) continue;
    if (sampleUrls.length < 20) sampleUrls.push(urlString);

    try {
      const parsed = new URL(urlString);
      const host = parsed.hostname.toLowerCase();
      const pathname = parsed.pathname || '/';
      const cleanPath = pathname.replace(/\/+$/, '') || '/';
      const keyPath = cleanPath.toLowerCase();

      hostCounters.set(host, (hostCounters.get(host) || 0) + 1);
      pathCounters.set(keyPath, (pathCounters.get(keyPath) || 0) + 1);

      if (parsed.protocol === 'http:') counters.set('http', counters.get('http') + 1);
      if (host === 'www.tupbebek.com') counters.set('non_www', counters.get('non_www') + 1);
      if (parsed.search) counters.set('query', counters.get('query') + 1);
      if ((parsed.search || '').toLowerCase().includes('gclid=')) counters.set('gclid', counters.get('gclid') + 1);
      if ((parsed.search || '').includes('{search_term_string}') || (parsed.search || '').includes('%7Bsearch_term_string%7D')) {
        counters.set('search_placeholder', counters.get('search_placeholder') + 1);
      }
      if (pathname !== '/' && !pathname.endsWith('/')) counters.set('no_trailing_slash', counters.get('no_trailing_slash') + 1);
      if (keyPath.startsWith('/fr/')) counters.set('fr_prefix', counters.get('fr_prefix') + 1);
      if (keyPath.startsWith('/ar/')) counters.set('ar_prefix', counters.get('ar_prefix') + 1);
      if (keyPath.startsWith('/blog/')) counters.set('blog_prefix', counters.get('blog_prefix') + 1);

      const alias = deriveAliasCandidate(pathname, articleSlugs);
      if (
        alias &&
        normalizeComparablePath(normalizeInternalPath(alias.from)) !== normalizeComparablePath(alias.to)
      ) {
        aliasCandidates.set(alias.from, alias.to);
      }
    } catch {
      counters.set('malformed_url', counters.get('malformed_url') + 1);
    }
  }

  const latestChart = chartRows.at(-1);
  const peakChart = [...chartRows].sort((a, b) => Number(b['Etkilenen sayfa sayısı'] || 0) - Number(a['Etkilenen sayfa sayısı'] || 0))[0];
  const total = tableRows.length;

  const aliasObject = Object.fromEntries([...aliasCandidates.entries()].sort((a, b) => a[0].localeCompare(b[0])));
  const missingAliasCount = Object.keys(aliasObject).length;

  const reportMd = [
    '# GSC Coverage Redirect Analysis',
    '',
    `- Source: \`${inputDir}\``,
    `- Issue: \`${metaRows.find((r) => r['Mülk'] === 'Sorun')?.Değer || 'Yönlendirmeli sayfa'}\``,
    `- Listed URLs: **${total}**`,
    `- Latest affected count (chart): **${latestChart?.['Etkilenen sayfa sayısı'] || 'n/a'}**`,
    `- Peak affected count (chart): **${peakChart?.['Etkilenen sayfa sayısı'] || 'n/a'}** on \`${peakChart?.Tarih || 'n/a'}\``,
    '',
    '## Pattern counts',
    toTopLines(counters, total, 20),
    '',
    `- Unimplemented high-confidence alias candidates: **${missingAliasCount}**`,
    '',
    '## Top hosts',
    toTopLines(hostCounters, total, 10),
    '',
    '## Top paths',
    toTopLines(pathCounters, total, 20),
    '',
    '## Canonicalization examples (input -> canonical)',
    ...sampleUrls.slice(0, 12).map((url) => `- ${url} -> ${canonicalize(url) || '(invalid URL)'}`),
    '',
    '## Suggested implementation order',
    '- Enforce single-hop host/protocol canonical redirect (http->https, non-www->www).',
    '- Normalize trailing slash behavior consistently at edge and app layer.',
    '- Strip low-value tracking/query parameters from canonical URLs (gclid, utm_*, fbclid).',
    missingAliasCount > 0
      ? '- Add high-confidence legacy path aliases generated in `gsc-route-aliases-draft.json`.'
      : '- No unimplemented high-confidence route aliases were detected in this export.',
    '- Re-submit sitemap and validate in GSC after 7-14 days.',
    '',
  ].join('\n');

  const redirectDraft = [
    '# Draft redirect rules for tupbebek.com canonicalization',
    '# Review before applying in production.',
    '',
    '# 1) Host/protocol canonicalization',
    'http://tupbebek.com/* https://tupbebek.com/:splat 301',
    'http://www.tupbebek.com/* https://tupbebek.com/:splat 301',
    'https://www.tupbebek.com/* https://tupbebek.com/:splat 301',
    '',
    '# 2) Legacy language sections no longer served',
    '/fr/* / 301',
    '/ar/* / 301',
    '',
    '# 3) Legacy treatment/blog umbrellas',
    '/treatment/* /tedavi-yontemleri/ 301',
    '/blog/* /makaleler/ 301',
    '',
    '# 4) Query parameter policy (edge transform rule)',
    '# Remove: gclid, fbclid, utm_source, utm_medium, utm_campaign, utm_term, utm_content',
    '# Keep only business-critical params.',
    '',
  ].join('\n');

  await fs.mkdir(reportsDir, { recursive: true });
  await Promise.all([
    fs.writeFile(reportMdPath, reportMd, 'utf8'),
    fs.writeFile(aliasDraftPath, `${JSON.stringify(aliasObject, null, 2)}\n`, 'utf8'),
    fs.writeFile(redirectDraftPath, `${redirectDraft}\n`, 'utf8'),
  ]);

  console.log(JSON.stringify({
    tableRows: total,
    aliasCandidates: Object.keys(aliasObject).length,
    reportMdPath,
    aliasDraftPath,
    redirectDraftPath,
  }, null, 2));
}

await main();
