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

function readReferenceBlocks(frontmatter) {
  const lines = frontmatter.split(/\r?\n/u);
  const start = lines.findIndex((line) => /^references:\s*$/u.test(line));
  if (start === -1) return [];

  const blockLines = [];
  for (const line of lines.slice(start + 1)) {
    if (/^\S[^:\n]*:\s*/u.test(line)) break;
    blockLines.push(line);
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

    const grade = readScalar(frontmatter, 'recommendationGrade');
    if (!validGrades.has(grade)) {
      failures.push(`${relative(filePath)} has invalid recommendationGrade: ${grade || '(missing)'}.`);
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

    const references = readReferenceBlocks(frontmatter);
    stats.lowestReferenceCount = Math.min(stats.lowestReferenceCount, references.length);
    if (references.length < minReferences) {
      failures.push(`${relative(filePath)} has ${references.length} reference(s); minimum is ${minReferences}.`);
    }

    const referencesWithLocator = references.filter((reference) => /^\s*(doi|url|pmid):\s*/imu.test(reference)).length;
    if (references.length > 0 && referencesWithLocator === 0) {
      failures.push(`${relative(filePath)} references should include at least one DOI, URL, or PMID.`);
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
