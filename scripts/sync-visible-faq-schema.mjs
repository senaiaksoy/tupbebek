import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const articlesDir = path.join(rootDir, 'src', 'content', 'articles');
const distArticlesDir = path.join(rootDir, 'dist', 'makaleler');
const apply = process.argv.includes('--apply');
const changes = [];

function cleanText(value) {
  return String(value || '')
    .replace(/<script\b[\s\S]*?<\/script>/giu, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/giu, ' ')
    .replace(/<[^>]+>/gu, ' ')
    .replace(/&nbsp;/giu, ' ')
    .replace(/&amp;/giu, '&')
    .replace(/&quot;/giu, '"')
    .replace(/&#39;/giu, "'")
    .replace(/&lt;/giu, '<')
    .replace(/&gt;/giu, '>')
    .replace(/&#(\d+);/gu, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/giu, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/\s+/gu, ' ')
    .trim()
    .toLocaleLowerCase('tr-TR');
}

function findMatchingBrace(text, openIndex) {
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let index = openIndex; index < text.length; index += 1) {
    const char = text[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
    if (char === '{') depth += 1;
    if (char === '}') depth -= 1;
    if (depth === 0) return index;
  }

  return -1;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}

function removeScriptReference(source, variableName) {
  const escapedName = escapeRegex(variableName);
  const selfClosingScript = new RegExp(
    `\\n?<script\\b(?=[^>]*application\\/ld\\+json)(?=[^>]*JSON\\.stringify\\(\\s*${escapedName}\\s*\\))[^>]*\\/?>\\s*`,
    'iu',
  );
  return source.replace(selfClosingScript, '\n');
}

function readVisibleDistText(slug) {
  const distFile = path.join(distArticlesDir, slug, 'index.html');
  if (!fs.existsSync(distFile)) return null;
  return cleanText(fs.readFileSync(distFile, 'utf8'));
}

function syncArticle(filePath) {
  const slug = path.basename(filePath, path.extname(filePath));
  const visibleText = readVisibleDistText(slug);
  if (!visibleText) return;

  let source = fs.readFileSync(filePath, 'utf8');
  const eol = source.includes('\r\n') ? '\r\n' : '\n';
  let nextSource = source;
  const faqExportPattern = /export const\s+([A-Za-z0-9_]+FaqSchema)\s*=\s*\{/gu;
  const replacements = [];

  for (const match of source.matchAll(faqExportPattern)) {
    const variableName = match[1];
    const openBraceIndex = source.indexOf('{', match.index);
    const closeBraceIndex = findMatchingBrace(source, openBraceIndex);
    if (closeBraceIndex === -1) continue;

    const literal = source.slice(openBraceIndex, closeBraceIndex + 1);
    let schema;
    try {
      schema = Function(`"use strict"; return (${literal});`)();
    } catch (error) {
      throw new Error(`${filePath}: could not parse ${variableName}: ${error.message}`);
    }

    if (!schema || !Array.isArray(schema.mainEntity)) continue;

    const originalCount = schema.mainEntity.length;
    const filteredQuestions = schema.mainEntity.filter((question) => {
      const questionText = cleanText(question?.name);
      return questionText && visibleText.includes(questionText);
    });

    if (filteredQuestions.length === originalCount) continue;

    const semicolonEnd = source[closeBraceIndex + 1] === ';' ? closeBraceIndex + 2 : closeBraceIndex + 1;
    if (filteredQuestions.length === 0) {
      replacements.push({
        start: match.index,
        end: semicolonEnd,
        value: '',
        variableName,
        originalCount,
        keptCount: 0,
      });
    } else {
      const nextSchema = { ...schema, mainEntity: filteredQuestions };
      replacements.push({
        start: match.index,
        end: semicolonEnd,
        value: `export const ${variableName} = ${JSON.stringify(nextSchema, null, 2)};`,
        variableName,
        originalCount,
        keptCount: filteredQuestions.length,
      });
    }
  }

  if (replacements.length === 0) return;

  for (const replacement of replacements.toReversed()) {
    nextSource =
      nextSource.slice(0, replacement.start)
      + replacement.value
      + nextSource.slice(replacement.end);

    if (replacement.keptCount === 0) {
      nextSource = removeScriptReference(nextSource, replacement.variableName);
    }
  }

  nextSource = nextSource.replace(/\n{4,}/gu, '\n\n\n');
  if (eol === '\r\n') {
    nextSource = nextSource.replace(/\r?\n/gu, '\r\n');
  }

  if (nextSource !== source) {
    changes.push({
      file: path.relative(rootDir, filePath),
      replacements,
    });
    if (apply) {
      fs.writeFileSync(filePath, nextSource);
    }
  }
}

if (!fs.existsSync(articlesDir)) {
  throw new Error(`Missing articles directory: ${articlesDir}`);
}
if (!fs.existsSync(distArticlesDir)) {
  throw new Error('Missing dist article output. Run npm run build first.');
}

for (const entry of fs.readdirSync(articlesDir, { withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith('.mdx')) continue;
  syncArticle(path.join(articlesDir, entry.name));
}

if (changes.length === 0) {
  console.log('FAQ schema already matches visible page questions.');
} else {
  for (const change of changes) {
    const summary = change.replacements
      .map((item) => `${item.variableName}: kept ${item.keptCount}/${item.originalCount}`)
      .join(', ');
    console.log(`${apply ? 'Updated' : 'Would update'} ${change.file} (${summary})`);
  }
  if (!apply) {
    console.log('Dry run only. Re-run with --apply to write changes.');
  }
}
