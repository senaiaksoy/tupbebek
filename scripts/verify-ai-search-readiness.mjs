import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const articlesDir = path.join(rootDir, 'src/content/articles');
const maxAgeDays = Number.parseInt(process.env.AI_SEARCH_MAX_AGE_DAYS || '180', 10);
const minReferences = Number.parseInt(process.env.AI_SEARCH_MIN_REFS || '3', 10);
const validGrades = new Set(['A', 'B', 'C', 'D/E']);

const failures = [];
const stats = {
  published: 0,
  checked: 0,
  oldestAgeDays: 0,
  lowestReferenceCount: Number.POSITIVE_INFINITY,
};

function relative(filePath) {
  return path.relative(rootDir, filePath);
}

function extractFrontmatter(source, filePath) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/u);
  if (!match) {
    failures.push(`${relative(filePath)} is missing frontmatter.`);
    return '';
  }

  return match[1];
}

function readScalar(frontmatter, fieldName) {
  const match = frontmatter.match(new RegExp(`^${fieldName}:\\s*(.+)$`, 'mu'));
  if (!match) return '';

  return match[1].trim().replace(/^['"]|['"]$/gu, '');
}

function hasField(frontmatter, fieldName) {
  return new RegExp(`^${fieldName}:`, 'mu').test(frontmatter);
}

function readNestedScalar(frontmatter, parentField, childField) {
  const lines = frontmatter.split(/\r?\n/u);
  const start = lines.findIndex((line) => new RegExp(`^${parentField}:\\s*$`, 'u').test(line));
  if (start === -1) return '';

  for (const line of lines.slice(start + 1)) {
    if (/^\S/u.test(line)) break;
    const match = line.match(new RegExp(`^\\s+${childField}:\\s*(.+)$`, 'u'));
    if (match) return match[1].trim().replace(/^['"]|['"]$/gu, '');
  }
  return '';
}

function readListItemValues(frontmatter, fieldName, childField) {
  const lines = frontmatter.split(/\r?\n/u);
  const start = lines.findIndex((line) => new RegExp(`^${fieldName}:\\s*$`, 'u').test(line));
  if (start === -1) return [];

  const values = [];
  for (const line of lines.slice(start + 1)) {
    if (/^\S/u.test(line)) break;
    const match = line.match(new RegExp(`^\\s+(?:-\\s+)?${childField}:\\s*(.+)$`, 'u'));
    if (match) values.push(match[1].trim().replace(/^['"]|['"]$/gu, ''));
  }
  return values;
}

function readReferenceBlocks(frontmatter) {
  const lines = frontmatter.split(/\r?\n/u);
  const start = lines.findIndex((line) => /^references:\s*$/u.test(line));
  if (start === -1) return [];

  const blockLines = [];
  // We'll iterate from start+1 until we hit a line that is not part of the block.
  // A line is part of the block if:
  //   - It is empty (only whitespace) -> we keep it? Actually we don't need empty lines for parsing, but we can keep.
  //   - It starts with a '-' (dash) -> indicates a new list item.
  //   - It starts with a whitespace (space or tab) -> indicates a continuation line of the previous item.
  //   - Otherwise, it's a new key (like "summarySources:"), so we stop.
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    // If the line is empty (only whitespace), we can still include it? It doesn't affect the split.
    // We'll include it to be safe.
    if (/^\s*$/.test(line)) {
      blockLines.push(line);
      continue;
    }
    // If the line starts with a dash, it's a new list item.
    if (/^-/.test(line)) {
      blockLines.push(line);
      continue;
    }
    // If the line starts with whitespace, it's a continuation line.
    if (/^\s/.test(line)) {
      blockLines.push(line);
      continue;
    }
    // Otherwise, we've reached a new key (e.g., "summarySources:")
    break;
  }

  return blockLines
    .join('\n')
    .split(/^\s*-\s+title:\s*/mu)
    .slice(1)
    .map((block) => block.trim())
    .filter(Boolean);
}


function parseLocalDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/u.test(value)) return null;
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function daysBetween(fromDate, toDate) {
  return Math.floor((toDate.getTime() - fromDate.getTime()) / 86_400_000);
}

if (!fs.existsSync(articlesDir)) {
  failures.push(`Missing articles directory: ${relative(articlesDir)}`);
} else {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const articleFiles = fs
    .readdirSync(articlesDir)
    .filter((fileName) => /\.mdx?$/iu.test(fileName))
    .sort();

  for (const fileName of articleFiles) {
    const filePath = path.join(articlesDir, fileName);
    const source = fs.readFileSync(filePath, 'utf8');
    const frontmatter = extractFrontmatter(source, filePath);
    if (!frontmatter) continue;
    const references = readReferenceBlocks(frontmatter);

    const status = readScalar(frontmatter, 'status') || 'published';
    if (status !== 'published') continue;

    stats.published += 1;
    stats.checked += 1;

    for (const fieldName of ['title', 'description', 'category', 'lastModified', 'medicalReviewer', 'reviewerTitle', 'reviewDate']) {
      if (!readScalar(frontmatter, fieldName)) {
        failures.push(`${relative(filePath)} is missing ${fieldName}.`);
      }
    }

    // author may be a scalar or a structured YAML object.
    if (!hasField(frontmatter, 'author')) {
      failures.push(`${relative(filePath)} is missing author.`);
    }

    // contentType marks articles created with the 2026-07 template. These must
    // use a dedicated BLUF instead of recycling the meta description.
    const contentType = readScalar(frontmatter, 'contentType');
    const summary = readScalar(frontmatter, 'summary');
    if (contentType && !summary) {
      failures.push(`${relative(filePath)} is missing summary for contentType ${contentType}.`);
    }
    if (summary && summary === readScalar(frontmatter, 'description')) {
      failures.push(`${relative(filePath)} summary must not duplicate description.`);
    }

    const templateVersion = readScalar(frontmatter, 'templateVersion');
    if (templateVersion) {
      if (templateVersion !== '2026-07') {
        failures.push(`${relative(filePath)} has unsupported templateVersion: ${templateVersion}.`);
      }

      const requiredTemplateFields = [
        'contentType',
        'summary',
        'evidenceAsOf',
        'reviewScope',
        'image',
        'imageAlt',
        'imageCaption',
        'imageCredit',
        'imageSourceType',
        'imageWidth',
        'imageHeight',
      ];
      for (const fieldName of requiredTemplateFields) {
        if (!readScalar(frontmatter, fieldName)) {
          failures.push(`${relative(filePath)} is missing template field ${fieldName}.`);
        }
      }

      if (!readNestedScalar(frontmatter, 'author', 'name') || !readNestedScalar(frontmatter, 'author', 'url')) {
        failures.push(`${relative(filePath)} template author must include name and profile url.`);
      }

      const summaryReferenceUrls = readListItemValues(frontmatter, 'summaryReferences', 'url');
      const referenceUrls = readListItemValues(frontmatter, 'references', 'url');
      if (summaryReferenceUrls.length < 1 || summaryReferenceUrls.length > 4) {
        failures.push(`${relative(filePath)} must include 1-4 summaryReferences.`);
      }
      for (const url of summaryReferenceUrls) {
        if (!referenceUrls.includes(url)) {
          failures.push(`${relative(filePath)} summary reference URL is missing from references: ${url}.`);
        }
      }

      const evidenceAsOf = parseLocalDate(readScalar(frontmatter, 'evidenceAsOf'));
      const reviewDate = parseLocalDate(readScalar(frontmatter, 'reviewDate'));
      if (!evidenceAsOf) {
        failures.push(`${relative(filePath)} has invalid evidenceAsOf.`);
      } else if (evidenceAsOf > today) {
        failures.push(`${relative(filePath)} evidenceAsOf is in the future.`);
      }
      if (!reviewDate) {
        failures.push(`${relative(filePath)} has invalid reviewDate.`);
      } else if (reviewDate > today) {
        failures.push(`${relative(filePath)} reviewDate is in the future.`);
      }
      if (evidenceAsOf && reviewDate && reviewDate < evidenceAsOf) {
        failures.push(`${relative(filePath)} reviewDate cannot be earlier than evidenceAsOf.`);
      }

      const imageWidth = Number.parseInt(readScalar(frontmatter, 'imageWidth'), 10);
      const imageHeight = Number.parseInt(readScalar(frontmatter, 'imageHeight'), 10);
      if (!(imageWidth > 0 && imageHeight > 0)) {
        failures.push(`${relative(filePath)} imageWidth and imageHeight must be positive integers.`);
      }

      const videoId = readScalar(frontmatter, 'videoId');
      if (videoId) {
        for (const fieldName of ['videoTitle', 'videoUploadDate', 'videoDescription', 'videoDuration']) {
          if (!readScalar(frontmatter, fieldName)) {
            failures.push(`${relative(filePath)} videoId requires ${fieldName}.`);
          }
        }
        const videoUploadDate = parseLocalDate(readScalar(frontmatter, 'videoUploadDate'));
        if (!videoUploadDate || videoUploadDate > today) {
          failures.push(`${relative(filePath)} has invalid or future videoUploadDate.`);
        }
        if (!/^PT(?=.*\d)(?:\d+H)?(?:\d+M)?(?:\d+(?:\.\d+)?S)?$/u.test(readScalar(frontmatter, 'videoDuration'))) {
          failures.push(`${relative(filePath)} videoDuration must be an ISO 8601 duration such as PT6M35S.`);
        }
      }

      const body = source.replace(/^---\r?\n[\s\S]*?\r?\n---/u, '');
      const forbiddenLegacyPatterns = [
        ['manual HizliCevap', /<HizliCevap\b/u],
        ['manual EvidenceGradeCard', /EvidenceGradeCard/u],
        ['FAQPage JSON-LD', /["']@type["']\s*:\s*["']FAQPage["']/u],
        ['body H1', /^#\s+/mu],
      ];
      for (const [label, pattern] of forbiddenLegacyPatterns) {
        if (pattern.test(body)) {
          failures.push(`${relative(filePath)} templateVersion ${templateVersion} contains ${label}.`);
        }
      }
    }

    const grade = readScalar(frontmatter, 'recommendationGrade');
    const hideEvidenceGrade = readScalar(frontmatter, 'hideEvidenceGrade') === 'true';
    if (grade) {
      if (!validGrades.has(grade)) {
        failures.push(`${relative(filePath)} has invalid recommendationGrade: ${grade}.`);
      }
    } else if (!hideEvidenceGrade) {
      failures.push(`${relative(filePath)} has invalid recommendationGrade: (missing).`);
    }

    const lastModified = readScalar(frontmatter, 'lastModified');
    const lastModifiedDate = parseLocalDate(lastModified);
    if (!lastModifiedDate) {
      failures.push(`${relative(filePath)} has invalid lastModified: ${lastModified || '(missing)'}.`);
    } else {
      const ageDays = daysBetween(lastModifiedDate, today);
      stats.oldestAgeDays = Math.max(stats.oldestAgeDays, ageDays);
      if (ageDays > maxAgeDays) {
        failures.push(`${relative(filePath)} lastModified is ${ageDays} days old; max is ${maxAgeDays}.`);
      }
      if (ageDays < 0) {
        failures.push(`${relative(filePath)} lastModified is in the future: ${lastModified}.`);
      }
    }

    stats.lowestReferenceCount = Math.min(stats.lowestReferenceCount, references.length);
    if (references.length < minReferences) {
      failures.push(`${relative(filePath)} has ${references.length} reference(s); minimum is ${minReferences}.`);
    }

    const referencesWithLocator = references.filter((reference) => /^\s*(doi|url|pmid):\s*/imu.test(reference)).length;
    if (references.length > 0 && referencesWithLocator === 0) {
      failures.push(`${relative(filePath)} references should include at least one DOI, URL, or PMID.`);
    }
    if (templateVersion && referencesWithLocator !== references.length) {
      failures.push(`${relative(filePath)} every reference must include DOI, URL, or PMID for templateVersion ${templateVersion}.`);
    }
  }
}

if (failures.length > 0) {
  console.error(`AI Search readiness verification failed with ${failures.length} issue(s):`);
  for (const failure of failures.slice(0, 80)) {
    console.error(`- ${failure}`);
  }
  if (failures.length > 80) {
    console.error(`...and ${failures.length - 80} more.`);
  }
  process.exit(1);
}

const lowestReferenceCount = Number.isFinite(stats.lowestReferenceCount) ? stats.lowestReferenceCount : 0;
console.log(
  `AI Search readiness verification passed. Published articles: ${stats.published}; max age: ${stats.oldestAgeDays} day(s); minimum references: ${lowestReferenceCount}.`
);
