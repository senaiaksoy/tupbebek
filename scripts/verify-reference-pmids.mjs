// Audit article citations against PubMed (read-only; never edits articles).
//
// Checks every frontmatter `references:` / `summaryReferences:` entry that has a
// `pmid` or a pubmed.ncbi.nlm.nih.gov/<id> url, plus PubMed links in article
// bodies. Fetches NCBI esummary metadata (batched, <=3 req/s) and compares the
// PubMed title / DOI / year / first author against the frontmatter.
// For each mismatch it searches PubMed (by DOI, then by title) for the intended
// paper and lists candidates for manual editorial review.
//
// Usage: node scripts/verify-reference-pmids.mjs [--no-suggest] [--json]
// Output: reports/reference-pmid-audit.md (+ .json)

import fs from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const articlesDir = path.join(rootDir, 'src', 'content', 'articles');
const reportsDir = path.join(rootDir, 'reports');
const suggest = !process.argv.includes('--no-suggest');
const eutilsBase = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';
const apiKey = process.env.NCBI_API_KEY || '';
const minInterval = apiKey ? 110 : 350; // 10 req/s with key, 3 req/s without
const TITLE_OK = 0.8;

let lastRequestAt = 0;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function ncbi(endpoint, params) {
  const body = new URLSearchParams({ ...params, tool: 'tupbebek_reference_audit', retmode: 'json' });
  if (apiKey) body.set('api_key', apiKey);

  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const elapsed = Date.now() - lastRequestAt;
    if (elapsed < minInterval) await wait(minInterval - elapsed);
    lastRequestAt = Date.now();

    try {
      const response = await fetch(`${eutilsBase}/${endpoint}`, { method: 'POST', body });
      if (response.ok) {
        const text = await response.text();
        // NCBI occasionally returns an HTML/JSON error body with HTTP 200
        try {
          return JSON.parse(text);
        } catch {
          if (attempt === 5) throw new Error(`NCBI ${endpoint}: non-JSON response`);
        }
      } else if (response.status !== 429 && response.status < 500) {
        throw new Error(`NCBI ${endpoint} failed with HTTP ${response.status}`);
      }
    } catch (error) {
      if (attempt === 5) throw error;
    }
    await wait(attempt * 1500);
  }
  throw new Error(`NCBI ${endpoint} failed`);
}

async function esummary(ids) {
  const records = new Map();
  for (let i = 0; i < ids.length; i += 200) {
    const batch = ids.slice(i, i + 200);
    const data = await ncbi('esummary.fcgi', { db: 'pubmed', id: batch.join(',') });
    for (const id of batch) {
      const r = data?.result?.[id];
      if (!r || r.error) {
        records.set(id, null);
        continue;
      }
      records.set(id, {
        pmid: id,
        title: cleanText(r.title),
        journal: r.fulljournalname || r.source || '',
        year: Number(String(r.pubdate || r.epubdate || '').slice(0, 4)) || null,
        firstAuthor: r.authors?.[0]?.name || '',
        authorNames: (r.authors || []).map((a) => a.name).join('; '),
        doi: normalizeDoi(r.articleids?.find((a) => a.idtype === 'doi')?.value || r.elocationid?.replace(/^doi:\s*/i, '') || ''),
      });
    }
  }
  return records;
}

async function esearch(term, retmax = 5) {
  const data = await ncbi('esearch.fcgi', { db: 'pubmed', term, retmax: String(retmax) });
  return data?.esearchresult?.idlist || [];
}

function cleanText(value = '') {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeDoi(value = '') {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//, '')
    .replace(/^doi:\s*/, '')
    .replace(/[.\s]+$/, '');
}

function normalizeTitle(value = '') {
  return value
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function levenshtein(a, b) {
  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    for (let j = 1; j <= b.length; j += 1) {
      current[j] = Math.min(current[j - 1] + 1, previous[j] + 1, previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    previous = current;
  }
  return previous[b.length];
}

// Max of edit-distance ratio and token containment (frontmatter titles are
// sometimes shortened or carry a subtitle PubMed omits).
function titleSimilarity(a, b) {
  const left = normalizeTitle(a);
  const right = normalizeTitle(b);
  if (!left || !right) return 0;
  if (left === right) return 1;
  const edit = 1 - levenshtein(left, right) / Math.max(left.length, right.length);
  const lt = new Set(left.split(' ').filter((t) => t.length > 2));
  const rt = new Set(right.split(' ').filter((t) => t.length > 2));
  const shared = [...lt].filter((t) => rt.has(t)).length;
  const containment = Math.min(lt.size, rt.size) ? shared / Math.min(lt.size, rt.size) : 0;
  const jaccard = shared / new Set([...lt, ...rt]).size;
  // containment alone is too lenient for very short titles
  return Math.min(1, Math.max(edit, Math.min(lt.size, rt.size) >= 5 ? (containment + jaccard) / 2 + 0.15 * containment : jaccard));
}

function surname(value = '') {
  return normalizeTitle(String(value).split(/[,;]/)[0]).split(' ')[0] || '';
}

// ---------- frontmatter parsing (no YAML dependency) ----------

function unquote(raw) {
  const t = raw.trim();
  const m = t.match(/^(['"])([\s\S]*)\1$/);
  return m ? m[2].replace(/\\"/g, '"').replace(/''/g, "'") : t;
}

function parseRefBlock(lines, key) {
  const start = lines.findIndex((line) => new RegExp(`^${key}:\\s*$`).test(line));
  if (start === -1) return [];
  const refs = [];
  let current = null;
  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (/^\S/.test(line)) break;
    const item = line.match(/^\s{2}-\s+([A-Za-z0-9_]+):\s*(.*)$/);
    if (item) {
      current = { block: key, line: i + 2, fields: { [item[1]]: unquote(item[2]) } };
      refs.push(current);
      continue;
    }
    const field = current && line.match(/^\s{4}([A-Za-z0-9_]+):\s*(.*)$/);
    if (field) current.fields[field[1]] = unquote(field[2]);
  }
  return refs;
}

const pubmedIdFromUrl = (url = '') => url.match(/pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)/)?.[1] || '';

async function collect() {
  const files = (await fs.readdir(articlesDir)).filter((f) => /\.mdx?$/.test(f)).sort();
  const items = [];
  for (const file of files) {
    const text = await fs.readFile(path.join(articlesDir, file), 'utf8');
    const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const lines = fm ? fm[1].split(/\r?\n/) : [];
    for (const block of ['references', 'summaryReferences']) {
      for (const ref of parseRefBlock(lines, block)) {
        const f = ref.fields;
        const urlId = pubmedIdFromUrl(f.url);
        const pmid = (f.pmid || '').replace(/\D/g, '') || urlId;
        if (!pmid) continue;
        items.push({
          file, block, line: ref.line, kind: 'frontmatter',
          title: f.title || f.name || '', authors: f.authors || '', year: Number(f.year) || null,
          doi: normalizeDoi(f.doi || ''), pmid, urlId,
        });
      }
    }
    // body links
    const body = fm ? text.slice(fm[0].length) : text;
    const bodyStartLine = fm ? fm[0].split(/\r?\n/).length : 0;
    const re = /\[([^\]]*)\]\((https?:\/\/pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)[^)\s]*)\)|https?:\/\/pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)/g;
    for (const m of body.matchAll(re)) {
      const line = bodyStartLine + body.slice(0, m.index).split(/\r?\n/).length;
      items.push({ file, block: 'body', line, kind: 'body', title: m[1] || '', pmid: m[3] || m[4], doi: '', year: null, authors: '' });
    }
  }
  return items;
}

// Anchor/summary labels like "Wang 2012: ...", "De Rycke ve Berckmoes 2020" or
// "Cochrane 2021" → the label's surname(s) or organisation must appear in the
// PubMed record (authors, title, journal) and the year must be within ±1.
// Labels without a checkable name + year are skipped.
const ORG_ALIASES = {
  asrm: ['american society for reproductive medicine', 'fertility and sterility'],
  acog: ['obstetricians', 'obstetrics and gynecology'],
  eshre: ['eshre', 'human reproduction', 'guideline group'],
  cochrane: ['cochrane'],
  nice: ['national institute for health'],
  who: ['world health organization'],
  aua: ['urolog'],
  figo: ['figo', 'federation of gynecology'],
  acmg: ['genetics in medicine', 'medical genetics'],
};
const LABEL_STOPWORDS = new Set(['opinion', 'guideline', 'consensus', 'review', 'meta', 'aynı', 'bir', 'yeni', 'kılavuzu', 'rehberi', 'görüşü']);

function labelCheck(label, rec) {
  const m = label.match(/^(.*?)(?<!\d)((?:19|20)\d{2})(?!\d)/su);
  if (!m) return null;
  const year = Number(m[2]);
  const yearOk = !rec.year || Math.abs(rec.year - year) <= 1;
  const haystack = ` ${normalizeTitle(`${rec.authorNames} ${rec.title} ${rec.journal}`)} `;
  const checks = [];
  for (const token of m[1].split(/[\s,:;/()]+/).filter(Boolean)) {
    const key = normalizeTitle(token);
    if (ORG_ALIASES[key]) checks.push(ORG_ALIASES[key]);
    // Title-case word = probable surname; acronyms like INVICSI/TÜTD are skipped
    else if (/^\p{Lu}\p{Ll}[\p{L}'-]+$/u.test(token) && !LABEL_STOPWORDS.has(token.toLocaleLowerCase('tr-TR'))) checks.push([key]);
  }
  if (!checks.length) return { name: '', year, nameOk: true, yearOk };
  const nameOk = checks.some((alts) => alts.some((alt) => haystack.includes(` ${alt}`)));
  return { name: m[1].trim(), year, nameOk, yearOk };
}

function evaluate(item, rec) {
  const problems = [];
  if (!rec) return { status: 'PMID_NOT_FOUND', problems: ['PMID not found on PubMed'] };
  if (item.urlId && item.urlId !== item.pmid) problems.push(`url PMID ${item.urlId} ≠ pmid ${item.pmid}`);

  let sim = null;
  let doiMatch = null;
  const isFullTitle = item.kind === 'frontmatter' && item.block === 'references';
  if (isFullTitle && item.title) {
    sim = titleSimilarity(item.title, rec.title);
    if (sim < TITLE_OK) problems.push(`title similarity ${sim.toFixed(2)}`);
  } else if (item.title) {
    const lc = labelCheck(item.title, rec);
    if (lc && (!lc.nameOk || !lc.yearOk)) problems.push(`label "${lc.name} ${lc.year}" vs PubMed ${rec.firstAuthor} ${rec.year}`);
  }
  if (item.doi) {
    doiMatch = !!rec.doi && item.doi === rec.doi;
    if (!doiMatch) problems.push(`DOI ${item.doi} ≠ PubMed ${rec.doi || '(none)'}`);
  }
  if (isFullTitle && item.year && rec.year && Math.abs(item.year - rec.year) > 1) problems.push(`year ${item.year} vs ${rec.year}`);
  if (isFullTitle && item.authors && rec.firstAuthor && surname(item.authors) !== surname(rec.firstAuthor)) {
    problems.push(`first author ${surname(item.authors)} vs ${rec.firstAuthor}`);
  }

  // Severity: title/DOI/label conflict = MISMATCH; year/author only = WARN
  const hard = problems.some((p) => /^(title|DOI|label|url PMID)/.test(p));
  return { status: hard ? 'MISMATCH' : problems.length ? 'WARN' : 'OK', problems, sim, doiMatch };
}

async function findCandidates(item) {
  const ids = new Set();
  if (item.doi) (await esearch(`${item.doi}[doi]`, 3)).forEach((id) => ids.add(id));
  const words = normalizeTitle(item.title).split(' ').filter((w) => w.length > 3).slice(0, 12);
  if (item.block === 'references' && words.length >= 3) {
    (await esearch(`${words.join(' ')}[ti]`, 3)).forEach((id) => ids.add(id));
  }
  ids.delete(item.pmid);
  if (!ids.size) return [];
  const recs = await esummary([...ids]);
  return [...recs.values()].filter(Boolean).map((r) => ({
    ...r,
    sim: item.title ? Number(titleSimilarity(item.title, r.title).toFixed(2)) : null,
    doiMatch: !!item.doi && item.doi === r.doi,
  })).sort((a, b) => (b.doiMatch - a.doiMatch) || (b.sim - a.sim));
}

const esc = (s = '') => String(s).replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');

async function main() {
  const items = await collect();
  const ids = [...new Set(items.map((i) => i.pmid))];
  console.log(`${items.length} PubMed citations (${ids.length} unique PMIDs) in ${new Set(items.map((i) => i.file)).size} files`);
  const records = await esummary(ids);

  const results = items.map((item) => ({ ...item, pubmed: records.get(item.pmid), ...evaluate(item, records.get(item.pmid)) }));
  const flagged = results.filter((r) => r.status !== 'OK');

  if (suggest) {
    for (const r of flagged.filter((x) => x.status !== 'WARN' && x.kind === 'frontmatter' && x.block === 'references')) {
      r.candidates = await findCandidates(r);
    }
  }

  const counts = results.reduce((acc, r) => ({ ...acc, [r.status]: (acc[r.status] || 0) + 1 }), {});
  const out = [
    '# Reference PMID audit',
    '',
    `Generated ${new Date().toISOString()} by \`scripts/verify-reference-pmids.mjs\`. Read-only; no article was edited.`,
    '',
    `Citations checked: ${results.length} (${ids.length} unique PMIDs). ` + Object.entries(counts).map(([k, v]) => `${k}: ${v}`).join(', '),
    '',
    '| Status | File:line | Block | Frontmatter title / anchor | PMID | Actual PubMed title | DOI match | Notes |',
    '|---|---|---|---|---|---|---|---|',
    ...flagged.map((r) => `| ${r.status} | ${r.file}:${r.line} | ${r.block} | ${esc(r.title)} | ${r.pmid} | ${esc(r.pubmed?.title || '—')} (${esc(r.pubmed?.firstAuthor || '')} ${r.pubmed?.year || ''}) | ${r.doiMatch === null ? 'n/a' : r.doiMatch ? 'yes' : 'no'} | ${esc(r.problems.join('; '))} |`),
    '',
    '## PubMed candidates for MISMATCH references (needs editorial verification)',
    '',
  ];
  for (const r of flagged.filter((x) => x.candidates)) {
    out.push(`### ${r.file}:${r.line} — PMID ${r.pmid}`, '', `- Frontmatter: ${r.title} (doi ${r.doi || '—'})`);
    if (!r.candidates.length) out.push('- No candidate found by DOI or title search.');
    for (const c of r.candidates) {
      out.push(`- PMID ${c.pmid} (title sim ${c.sim}, DOI match ${c.doiMatch ? 'yes' : 'no'}): ${c.title} — ${c.firstAuthor}, ${c.journal} ${c.year}, doi ${c.doi || '—'}`);
    }
    out.push('');
  }

  await fs.mkdir(reportsDir, { recursive: true });
  await fs.writeFile(path.join(reportsDir, 'reference-pmid-audit.md'), out.join('\n'));
  await fs.writeFile(path.join(reportsDir, 'reference-pmid-audit.json'), JSON.stringify(results, null, 2));
  console.log(counts);
  console.log('Report: reports/reference-pmid-audit.md');
  process.exitCode = flagged.some((r) => r.status === 'MISMATCH' || r.status === 'PMID_NOT_FOUND') ? 1 : 0;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 2;
});
