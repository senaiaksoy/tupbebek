import fs from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const articlesDir = path.join(rootDir, 'src', 'content', 'articles');
const reportsDir = path.join(rootDir, 'reports');
const reportPath = path.join(reportsDir, 'pmid-enrichment-report.csv');
const applyChanges = process.argv.includes('--apply');
const eutilsBase = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';
const toolName = 'tupbebek_pmid_enrichment';

let lastRequestAt = 0;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function ncbiFetch(endpoint, params) {
  const url = new URL(`${eutilsBase}/${endpoint}`);
  for (const [key, value] of Object.entries({ ...params, tool: toolName })) {
    url.searchParams.set(key, value);
  }

  for (let attempt = 1; attempt <= 4; attempt += 1) {
    const elapsed = Date.now() - lastRequestAt;
    if (elapsed < 550) await wait(550 - elapsed);

    lastRequestAt = Date.now();
    const response = await fetch(url, {
      headers: { 'user-agent': 'tupbebek-pmid-enrichment/1.0' },
    });

    if (response.ok) return response;
    if (response.status !== 429 || attempt === 4) {
      throw new Error(`NCBI ${endpoint} failed with HTTP ${response.status}`);
    }

    await wait(attempt * 2000);
  }

  throw new Error(`NCBI ${endpoint} failed`);
}

async function searchPubMed(term, retmax = 5) {
  const response = await ncbiFetch('esearch.fcgi', {
    db: 'pubmed',
    term,
    retmode: 'json',
    retmax: String(retmax),
  });
  const data = await response.json();
  return data?.esearchresult?.idlist || [];
}

async function fetchPubMedRecords(ids) {
  if (!ids.length) return [];
  const response = await ncbiFetch('efetch.fcgi', {
    db: 'pubmed',
    id: ids.join(','),
    retmode: 'xml',
  });
  const xml = await response.text();
  return parsePubMedXml(xml);
}

function parsePubMedXml(xml) {
  return xml
    .split(/<PubmedArticle>/)
    .slice(1)
    .map((chunk) => chunk.split('</PubmedArticle>')[0])
    .map((chunk) => {
      const articleChunk = matchText(chunk, /<Article\b[\s\S]*?<\/Article>/);
      return {
        pmid: matchText(chunk, /<PMID[^>]*>([\s\S]*?)<\/PMID>/),
        title: cleanXml(matchText(articleChunk, /<ArticleTitle>([\s\S]*?)<\/ArticleTitle>/)),
        journal: cleanXml(matchText(articleChunk, /<Journal>[\s\S]*?<Title>([\s\S]*?)<\/Title>[\s\S]*?<\/Journal>/)),
        year: Number(matchText(articleChunk, /<PubDate>[\s\S]*?<Year>(\d{4})<\/Year>[\s\S]*?<\/PubDate>/)) || undefined,
        doi: cleanXml(matchText(chunk, /<ArticleId[^>]+IdType="doi"[^>]*>([\s\S]*?)<\/ArticleId>/)),
      };
    })
    .filter((record) => record.pmid);
}

function matchText(value, regex) {
  return value?.match(regex)?.[1]?.trim() || '';
}

function cleanXml(value) {
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
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function titleSimilarity(a, b) {
  const left = normalizeTitle(a);
  const right = normalizeTitle(b);
  if (!left || !right) return 0;
  if (left === right) return 1;

  const distance = levenshtein(left, right);
  return 1 - distance / Math.max(left.length, right.length);
}

function levenshtein(a, b) {
  const previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  const current = Array.from({ length: b.length + 1 }, () => 0);

  for (let i = 1; i <= a.length; i += 1) {
    current[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      current[j] = Math.min(
        current[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + cost,
      );
    }
    previous.splice(0, previous.length, ...current);
  }

  return previous[b.length];
}

function parseFrontmatter(text) {
  const newline = text.includes('\r\n') ? '\r\n' : '\n';
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;

  const frontmatter = match[1];
  const lines = frontmatter.split(/\r?\n/);
  const offset = match[0].indexOf(frontmatter);

  return { frontmatter, lines, newline, start: offset, end: offset + frontmatter.length };
}

function parseYamlValue(value) {
  const trimmed = value.trim();
  const quoted = trimmed.match(/^['"]([\s\S]*)['"]$/);
  return quoted ? quoted[1] : trimmed;
}

function parseReferences(lines) {
  const referencesLine = lines.findIndex((line) => /^references:\s*$/.test(line));
  if (referencesLine === -1) return [];

  const references = [];
  let current = null;
  for (let index = referencesLine + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^\S[^:]*:\s*/.test(line)) break;

    const startMatch = line.match(/^\s{2}-\s+title:\s*(.*)$/);
    if (startMatch) {
      current = {
        fields: { title: parseYamlValue(startMatch[1]) },
        startLine: index,
        endLine: index,
        insertAfterLine: index,
      };
      references.push(current);
      continue;
    }

    if (!current) continue;
    current.endLine = index;

    const fieldMatch = line.match(/^\s{4}([A-Za-z0-9_]+):\s*(.*)$/);
    if (!fieldMatch) continue;

    const [, key, rawValue] = fieldMatch;
    current.fields[key] = parseYamlValue(rawValue);
    if (['doi', 'url', 'year', 'journal', 'authors', 'title'].includes(key)) {
      current.insertAfterLine = index;
    }
  }

  return references;
}

async function findCandidate(reference) {
  const { title, doi, year } = reference.fields;
  const normalizedDoi = normalizeDoi(doi);

  if (normalizedDoi) {
    const ids = await searchPubMed(`"${normalizedDoi}"[AID]`, 5);
    const records = await fetchPubMedRecords(ids);
    const exact = records.find((record) => normalizeDoi(record.doi) === normalizedDoi);

    if (exact) {
      return {
        record: exact,
        confidence: 0.99,
        status: 'auto_accept',
        reason: 'doi_exact',
      };
    }

    if (records.length) {
      const best = bestTitleMatch(reference, records);
      return {
        record: best.record,
        confidence: best.confidence,
        status: 'needs_review',
        reason: 'doi_search_without_exact_metadata_match',
      };
    }
  }

  const titleQuery = year
    ? `"${title}"[Title] AND ${year}[PDAT]`
    : `"${title}"[Title]`;
  const ids = await searchPubMed(titleQuery, 5);
  const records = await fetchPubMedRecords(ids);
  if (!records.length) {
    return {
      record: undefined,
      confidence: 0,
      status: 'not_found',
      reason: normalizedDoi ? 'doi_and_title_not_found' : 'title_not_found',
    };
  }

  const best = bestTitleMatch(reference, records);
  const yearMatches = !year || Number(year) === best.record.year;
  const couldAutoAccept = !normalizedDoi && best.confidence >= 0.985 && yearMatches && records.length === 1;

  return {
    record: best.record,
    confidence: best.confidence,
    status: couldAutoAccept ? 'auto_accept' : 'needs_review',
    reason: couldAutoAccept ? 'title_exact_single_result' : 'title_candidate_requires_editorial_review',
  };
}

function bestTitleMatch(reference, records) {
  return records
    .map((record) => ({
      record,
      confidence: titleSimilarity(reference.fields.title, record.title),
    }))
    .sort((a, b) => b.confidence - a.confidence)[0];
}

function csvCell(value) {
  const text = String(value ?? '');
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

async function main() {
  const files = (await fs.readdir(articlesDir))
    .filter((name) => /\.(md|mdx)$/.test(name))
    .sort();

  const reportRows = [[
    'file',
    'ref_index',
    'title',
    'doi',
    'existing_pmid',
    'candidate_pmid',
    'confidence',
    'status',
    'reason',
    'matched_title',
    'matched_journal',
    'matched_year',
  ]];

  let checked = 0;
  let autoAccepted = 0;
  let alreadyHadPmid = 0;
  let needsReview = 0;
  let notFound = 0;
  const patchesByFile = new Map();

  for (const file of files) {
    const filePath = path.join(articlesDir, file);
    const text = await fs.readFile(filePath, 'utf8');
    const parsed = parseFrontmatter(text);
    if (!parsed) continue;

    const references = parseReferences(parsed.lines);
    const insertions = [];

    for (const [referenceIndex, reference] of references.entries()) {
      checked += 1;
      const existingPmid = reference.fields.pmid;

      if (existingPmid) {
        alreadyHadPmid += 1;
        reportRows.push([
          file,
          referenceIndex + 1,
          reference.fields.title,
          reference.fields.doi,
          existingPmid,
          existingPmid,
          '1.00',
          'existing',
          'pmid_already_present',
          '',
          '',
          '',
        ]);
        continue;
      }

      try {
        const candidate = await findCandidate(reference);
        const record = candidate.record || {};
        if (candidate.status === 'auto_accept' && record.pmid) {
          autoAccepted += 1;
          insertions.push({
            afterLine: reference.insertAfterLine,
            line: `    pmid: "${record.pmid}"`,
          });
        } else if (candidate.status === 'needs_review') {
          needsReview += 1;
        } else {
          notFound += 1;
        }

        reportRows.push([
          file,
          referenceIndex + 1,
          reference.fields.title,
          reference.fields.doi,
          '',
          record.pmid || '',
          candidate.confidence.toFixed(2),
          candidate.status,
          candidate.reason,
          record.title || '',
          record.journal || '',
          record.year || '',
        ]);
      } catch (error) {
        needsReview += 1;
        reportRows.push([
          file,
          referenceIndex + 1,
          reference.fields.title,
          reference.fields.doi,
          '',
          '',
          '0.00',
          'needs_review',
          `lookup_error: ${error.message}`,
          '',
          '',
          '',
        ]);
      }
    }

    if (insertions.length) {
      patchesByFile.set(filePath, { parsed, text, insertions });
    }
  }

  if (applyChanges) {
    for (const [filePath, patch] of patchesByFile) {
      const lines = [...patch.parsed.lines];
      for (const insertion of patch.insertions.sort((a, b) => b.afterLine - a.afterLine)) {
        lines.splice(insertion.afterLine + 1, 0, insertion.line);
      }
      const updatedFrontmatter = lines.join(patch.parsed.newline);
      const updated = `${patch.text.slice(0, patch.parsed.start)}${updatedFrontmatter}${patch.text.slice(patch.parsed.end)}`;
      await fs.writeFile(filePath, updated, 'utf8');
    }
  }

  await fs.mkdir(reportsDir, { recursive: true });
  await fs.writeFile(
    reportPath,
    `${reportRows.map((row) => row.map(csvCell).join(',')).join('\n')}\n`,
    'utf8',
  );

  console.log(JSON.stringify({
    mode: applyChanges ? 'apply' : 'dry-run',
    checked,
    autoAccepted,
    alreadyHadPmid,
    needsReview,
    notFound,
    reportPath,
  }, null, 2));
}

await main();
