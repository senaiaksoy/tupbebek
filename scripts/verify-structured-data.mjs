import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const failures = [];
const stats = {
  htmlFiles: 0,
  jsonLdScripts: 0,
  faqPages: 0,
  articlePages: 0,
  breadcrumbLists: 0,
};

const jsonLdScriptPattern =
  /<script\b(?=[^>]*\btype=(["'])application\/ld\+json\1)[^>]*>([\s\S]*?)<\/script>/giu;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function relative(filePath) {
  return path.relative(rootDir, filePath);
}

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

function collectImageObjects(value, images = []) {
  if (!value || typeof value !== 'object') return images;
  if (Array.isArray(value)) {
    for (const item of value) collectImageObjects(item, images);
    return images;
  }
  if (typeIncludes(value, 'ImageObject')) images.push(value);
  for (const child of Object.values(value)) collectImageObjects(child, images);
  return images;
}

function parseJsonLd(html, filePath) {
  const blocks = [];

  for (const match of html.matchAll(jsonLdScriptPattern)) {
    stats.jsonLdScripts += 1;
    const rawJson = match[2].trim();
    if (!rawJson) {
      failures.push(`${relative(filePath)} has an empty JSON-LD script.`);
      continue;
    }

    try {
      blocks.push(JSON.parse(rawJson));
    } catch (error) {
      failures.push(`${relative(filePath)} has invalid JSON-LD: ${error.message}`);
    }
  }

  return blocks;
}

function validateFaqPage(filePath, faqPage, visibleText) {
  const page = relative(filePath);
  const entities = faqPage.mainEntity;

  if (!Array.isArray(entities) || entities.length === 0) {
    failures.push(`${page} FAQPage has no non-empty mainEntity array.`);
    return;
  }

  for (const [index, question] of entities.entries()) {
    const label = `${page} FAQPage question #${index + 1}`;
    if (!typeIncludes(question, 'Question')) {
      failures.push(`${label} is missing @type Question.`);
    }
    if (typeof question.name !== 'string' || question.name.trim().length === 0) {
      failures.push(`${label} is missing name.`);
    } else if (!visibleText.includes(cleanText(question.name))) {
      failures.push(`${label} name is not visible in page content: ${question.name}`);
    }

    const answers = Array.isArray(question.acceptedAnswer)
      ? question.acceptedAnswer
      : [question.acceptedAnswer];

    if (!question.acceptedAnswer || answers.length === 0) {
      failures.push(`${label} is missing acceptedAnswer.`);
      continue;
    }

    for (const [answerIndex, answer] of answers.entries()) {
      const answerLabel = answers.length === 1 ? label : `${label} answer #${answerIndex + 1}`;
      if (!answer || typeof answer !== 'object') {
        failures.push(`${answerLabel} acceptedAnswer is not an object.`);
        continue;
      }
      if (!typeIncludes(answer, 'Answer')) {
        failures.push(`${answerLabel} acceptedAnswer is missing @type Answer.`);
      }
      if (typeof answer.text !== 'string' || answer.text.trim().length === 0) {
        failures.push(`${answerLabel} acceptedAnswer is missing text.`);
      }
    }
  }
}

function validateArticlePage(filePath, nodes) {
  const page = relative(filePath);
  const articleNodes = nodes.filter((node) => typeIncludes(node, 'Article'));

  stats.articlePages += 1;

  if (articleNodes.length === 0) {
    failures.push(`${page} is an article route but has no Article JSON-LD node.`);
    return;
  }

  for (const article of articleNodes) {
    if (typeIncludes(article, 'MedicalWebPage')) {
      failures.push(`${page} Article node must not mix Article and MedicalWebPage types.`);
    }
    if (!article.mainEntityOfPage) {
      failures.push(`${page} Article node is missing mainEntityOfPage.`);
    }
    if (typeof article.headline !== 'string' || article.headline.trim().length === 0) {
      failures.push(`${page} Article node is missing headline.`);
    }
    if (!article.author) {
      failures.push(`${page} Article node is missing author.`);
    }
    if (!article.reviewedBy) {
      failures.push(`${page} Article node is missing reviewedBy.`);
    }
    if (!article.citation) {
      failures.push(`${page} Article node is missing citation.`);
    }
    const citations = article.citation
      ? (Array.isArray(article.citation) ? article.citation : [article.citation])
      : [];
    for (const [index, citation] of citations.entries()) {
      const label = `${page} citation #${index + 1}`;
      const urls = [citation?.url, ...(Array.isArray(citation?.sameAs) ? citation.sameAs : [citation?.sameAs])]
        .filter((value) => typeof value === 'string');
      if (urls.some((value) => /pubmed\.ncbi\.nlm\.nih\.gov\/\?term=/iu.test(value))) {
        failures.push(`${label} uses a PubMed search-result URL instead of a direct source.`);
      }
    }
    if (article.image && !article.primaryImageOfPage) {
      failures.push(`${page} Article node has image but is missing primaryImageOfPage.`);
    }

    const images = collectImageObjects(nodes);
    for (const [index, img] of images.entries()) {
      const label = `${page} ImageObject #${index + 1}`;
      if (!img.license) {
        failures.push(`${label} is missing license URL.`);
      }
      if (!img.acquireLicensePage) {
        failures.push(`${label} is missing acquireLicensePage URL.`);
      }
    }

    const videos = article.video ? (Array.isArray(article.video) ? article.video : [article.video]) : [];
    for (const [index, video] of videos.entries()) {
      const label = `${page} VideoObject #${index + 1}`;
      if (!typeIncludes(video, 'VideoObject')) {
        failures.push(`${label} is missing @type VideoObject.`);
      }
      for (const property of ['name', 'description', 'thumbnailUrl', 'uploadDate', 'embedUrl']) {
        if (!video?.[property] || (Array.isArray(video[property]) && video[property].length === 0)) {
          failures.push(`${label} is missing ${property}.`);
        }
      }
      if (typeof video.contentUrl === 'string' && /youtube\.com\/watch/iu.test(video.contentUrl)) {
        failures.push(`${label} contentUrl points to a watch page; omit it when media bytes are unavailable.`);
      }
    }
  }
}

function validateBreadcrumbList(filePath, breadcrumb) {
  const page = relative(filePath);
  const elements = breadcrumb.itemListElement;

  stats.breadcrumbLists += 1;

  if (!Array.isArray(elements) || elements.length === 0) {
    failures.push(`${page} BreadcrumbList has no non-empty itemListElement array.`);
    return;
  }

  for (const [index, element] of elements.entries()) {
    const label = `${page} breadcrumb #${index + 1}`;
    if (!typeIncludes(element, 'ListItem')) {
      failures.push(`${label} is missing @type ListItem.`);
    }
    if (typeof element.position !== 'number') {
      failures.push(`${label} is missing numeric position.`);
    }
    if (!element.name && !element.item?.name) {
      failures.push(`${label} is missing name.`);
    }
  }
}

function isArticleDetail(filePath) {
  const parts = path.relative(distDir, filePath).split(path.sep);
  return parts.length === 3 && parts[0] === 'makaleler' && parts[2] === 'index.html';
}

if (!fs.existsSync(distDir)) {
  failures.push('Missing dist directory. Run npm run build first.');
} else {
  const htmlFiles = walk(distDir).filter((filePath) => filePath.endsWith('.html'));
  stats.htmlFiles = htmlFiles.length;

  for (const filePath of htmlFiles) {
    if (!fs.existsSync(filePath)) continue;
    const html = fs.readFileSync(filePath, 'utf8');
    const visibleText = cleanText(html);
    const nodes = parseJsonLd(html, filePath).flatMap(extractTopLevelNodes);
    const faqPages = nodes.filter((node) => typeIncludes(node, 'FAQPage'));
    const standaloneQuestions = nodes.filter((node) => typeIncludes(node, 'Question'));
    const breadcrumbs = nodes.filter((node) => typeIncludes(node, 'BreadcrumbList'));

    stats.faqPages += faqPages.length;

    if (isArticleDetail(filePath) && faqPages.length > 0) {
      failures.push(`${relative(filePath)} emits deprecated template-level FAQPage JSON-LD.`);
    }

    for (const faqPage of faqPages) {
      validateFaqPage(filePath, faqPage, visibleText);
    }

    if (standaloneQuestions.length > 0) {
      failures.push(`${relative(filePath)} has standalone top-level Question JSON-LD nodes.`);
    }

    for (const breadcrumb of breadcrumbs) {
      validateBreadcrumbList(filePath, breadcrumb);
    }

    if (isArticleDetail(filePath)) {
      validateArticlePage(filePath, nodes);
    }
  }
}

if (failures.length > 0) {
  console.error(`Structured data verification failed with ${failures.length} issue(s):`);
  for (const failure of failures.slice(0, 50)) {
    console.error(`- ${failure}`);
  }
  if (failures.length > 50) {
    console.error(`...and ${failures.length - 50} more.`);
  }
  process.exit(1);
}

console.log(
  [
    'Structured data verification passed.',
    `${stats.htmlFiles} HTML files,`,
    `${stats.jsonLdScripts} JSON-LD scripts,`,
    `${stats.faqPages} FAQPage nodes,`,
    `${stats.articlePages} article routes,`,
    `${stats.breadcrumbLists} BreadcrumbList nodes.`,
  ].join(' '),
);
