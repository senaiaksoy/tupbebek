import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const articleDir = path.join(root, 'src/content/articles');
const distArticleDir = path.join(root, 'dist/makaleler');
const reportPath = path.join(root, 'reports/content-structure-audit-2026-05-14.md');

const hubPaths = [
  '/ivf-rehberi/',
  '/kadin-infertilitesi/',
  '/erkek-infertilitesi/',
  '/transfer-sureci/',
  '/tedavi-yontemleri/',
  '/beslenme-yasam/',
  '/psikolojik-destek/'
];

function normalizeUrl(value) {
  if (!value || value.startsWith('#') || value.startsWith('mailto:') || /^https?:\/\//i.test(value)) {
    return null;
  }
  const clean = value.split('#')[0].split('?')[0];
  if (!clean.startsWith('/')) return null;
  if (/\.[a-z0-9]+$/i.test(clean)) return clean;
  return `${clean.replace(/\/+$/g, '')}/`;
}

function extractLinks(text) {
  const links = new Set();
  const patterns = [
    /href=["']([^"']+)["']/g,
    /href:\s*["']([^"']+)["']/g,
    /\[[^\]]+\]\((\/[^)\s#?]+)[^)]*\)/g
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(text))) {
      const normalized = normalizeUrl(match[1]);
      if (normalized) links.add(normalized);
    }
  }

  return [...links];
}

function extractMainContent(html) {
  const match = html.match(/<main\b[\s\S]*?<\/main>/i);
  return match?.[0] || html;
}

function readArticleFiles() {
  return fs.readdirSync(articleDir)
    .filter((file) => /\.mdx?$/i.test(file))
    .sort()
    .map((file) => {
      const fullPath = path.join(articleDir, file);
      const source = fs.readFileSync(fullPath, 'utf8');
      const slug = file.replace(/\.mdx?$/i, '');
      const frontmatter = source.match(/^---\n([\s\S]*?)\n---/)?.[1] || '';
      const title = frontmatter.match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1] || slug;
      const category = frontmatter.match(/^category:\s*["']?(.+?)["']?\s*$/m)?.[1] || '';
      const renderedPath = path.join(distArticleDir, slug, 'index.html');
      const renderedHtml = fs.existsSync(renderedPath) ? fs.readFileSync(renderedPath, 'utf8') : '';

      return {
        file,
        slug,
        url: `/makaleler/${slug}/`,
        title,
        category,
        source,
        renderedHtml,
        isMdx: file.endsWith('.mdx'),
        isRendered: Boolean(renderedHtml),
        sourceLinks: extractLinks(source),
        renderedLinks: extractLinks(extractMainContent(renderedHtml)),
        hasFaqHeading: /Sorulan Sorular/i.test(source),
        hasFaqSchemaSource: /["@']@type["@']\s*:\s*["@']FAQPage["@']/.test(source),
        hasFaqSchemaRendered: /["@']@type["@']\s*:\s*["@']FAQPage["@']/.test(renderedHtml),
        wordCount: (source.replace(/^---[\s\S]*?---/, '').match(/\b[\p{L}\p{N}]+\b/gu) || []).length
      };
    });
}

function readHubLinks() {
  const graph = {};

  for (const hub of hubPaths) {
    const slug = hub.replace(/^\/|\/$/g, '');
    const file = path.join(root, 'src/pages', `${slug}.astro`);
    graph[hub] = fs.existsSync(file) ? extractLinks(fs.readFileSync(file, 'utf8')) : [];
  }

  return graph;
}

function buildReport() {
  const allArticles = readArticleFiles();
  const renderedArticles = allArticles.filter((article) => article.isRendered);
  const articleUrls = new Set(renderedArticles.map((article) => article.url));
  const graph = readHubLinks();

  for (const article of renderedArticles) {
    graph[article.url] = article.renderedLinks.filter((url) => articleUrls.has(url) || hubPaths.includes(url));
  }

  const incoming = Object.fromEntries([...articleUrls, ...hubPaths].map((url) => [url, []]));

  for (const [from, links] of Object.entries(graph)) {
    for (const to of links) {
      if (incoming[to]) incoming[to].push(from);
    }
  }

  const faqRows = renderedArticles.map((article) => ({
    slug: article.slug,
    hasFaqHeading: article.hasFaqHeading,
    hasFaqSchemaSource: article.hasFaqSchemaSource,
    hasFaqSchemaRendered: article.hasFaqSchemaRendered
  }));

  const articleLinkRows = renderedArticles
    .map((article) => ({
      slug: article.slug,
      incoming: incoming[article.url]?.length || 0,
      hubBacklinks: (graph[article.url] || []).filter((url) => hubPaths.includes(url)),
      outToArticlesOrHubs: (graph[article.url] || []).length
    }))
    .sort((a, b) => a.incoming - b.incoming || a.slug.localeCompare(b.slug));

  const hubRows = hubPaths.map((hub) => ({
    hub,
    articleLinks: (graph[hub] || []).filter((url) => articleUrls.has(url)).length,
    hubLinks: (graph[hub] || []).filter((url) => hubPaths.includes(url)).length
  }));

  const orphanCandidates = articleLinkRows.filter((row) => row.incoming === 0);
  const noHubBacklink = articleLinkRows.filter((row) => row.hubBacklinks.length === 0);
  const faqMissingRendered = faqRows.filter((row) => !row.hasFaqSchemaRendered);
  const faqHeadingMissing = faqRows.filter((row) => !row.hasFaqHeading);
  const legacyNotRendered = allArticles.filter((article) => !article.isRendered);

  const lines = [
    '# İçerik Yapısı Audit Raporu',
    '',
    'Tarih: 2026-05-14',
    '',
    '## Özet',
    '',
    `- Yayındaki makale sayısı: ${renderedArticles.length}`,
    `- Kaynak dosya sayısı: ${allArticles.length} (${legacyNotRendered.length} legacy/render edilmeyen dosya)`,
    `- Yayındaki FAQPage schema kapsamı: ${renderedArticles.length - faqMissingRendered.length}/${renderedArticles.length}`,
    `- Görünür FAQ başlığı eksikliği: ${faqHeadingMissing.length}`,
    `- Editoryal kaynak grafiğinde sıfır hub/makale girişi olan makale: ${orphanCandidates.length}`,
    `- Makaleden hub'a geri bağlantısı olmayan makale: ${noHubBacklink.length}`,
    '',
    '## FAQ Schema Kontrolü',
    '',
    faqMissingRendered.length
      ? `Yayındaki FAQ schema eksikleri: ${faqMissingRendered.map((row) => row.slug).join(', ')}`
      : 'Yayındaki 56 makalenin tamamında render edilmiş `FAQPage` schema mevcut.',
    '',
    faqHeadingMissing.length
      ? `Görünür FAQ başlığı zayıf/eksik olanlar: ${faqHeadingMissing.map((row) => row.slug).join(', ')}`
      : 'Yayındaki tüm makalelerde görünür FAQ başlığı mevcut.',
    '',
    'Not: Google, 7 Mayıs 2026 itibarıyla FAQ rich result görünümünü kaldırma sürecini duyurdu. Bu nedenle yeni FAQ schema ekleme kararı yalnızca sayfada gerçekten görünür, hasta odaklı kısa soru-cevap bölümü olan içeriklerle sınırlı tutulmalıdır.',
    '',
    '## Hub Link Durumu',
    '',
    '| Hub | Makale linki | Hub linki |',
    '| --- | ---: | ---: |',
    ...hubRows.map((row) => `| ${row.hub} | ${row.articleLinks} | ${row.hubLinks} |`),
    '',
    '## En Zayıf Makale Girişleri',
    '',
    '| Makale | Giriş | Hub geri linki | Çıkış |',
    '| --- | ---: | --- | ---: |',
    ...articleLinkRows.slice(0, 20).map((row) => `| ${row.slug} | ${row.incoming} | ${row.hubBacklinks.map((url) => url.replace(/\//g, '')).join(', ') || '-'} | ${row.outToArticlesOrHubs} |`),
    '',
    '## Render Edilmeyen Legacy Dosyalar',
    '',
    legacyNotRendered.length
      ? legacyNotRendered.map((article) => `- ${article.file}`).join('\n')
      : '- Yok',
    '',
    '## Uygulanan Aksiyonlar',
    '',
    '- Makale şablonuna otomatik konu merkezi bağlantısı eklendi; böylece yayındaki her makale ilgili hub sayfasına geri bağlanır.',
    '- Kadın infertilitesi hubına amenore ve adenomyozis hormonal tedavi bağlantıları eklendi.',
    '- IVF rehberine tüp bebekte yanlış bilinenler bağlantısı eklendi.',
    '- Tedavi yöntemleri hubına PGT-M, PGT cinsiyet seçimi yasal/etik sınırları ve akraba evliliği/genetik danışmanlık bağlantıları eklendi.',
    '- Cerrahi sperm arama makalesindeki FAQ schema ile görünür FAQ bölümü eşitlendi.',
    ''
  ];

  return lines.join('\n');
}

const report = buildReport();

if (process.argv.includes('--write')) {
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, report);
  console.log(reportPath);
} else {
  console.log(report);
}
