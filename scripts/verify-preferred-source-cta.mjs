import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const componentPath = path.join(root, 'src/components/PreferredSourceCTA.astro');
const articleTemplatePath = path.join(root, 'src/pages/makaleler/[...slug].astro');
const homePath = path.join(root, 'src/pages/index.astro');
const aboutPath = path.join(root, 'src/pages/hakkimizda.astro');
const editorialPolicyPath = path.join(root, 'src/pages/editoryal-politika.astro');

const component = fs.existsSync(componentPath)
  ? fs.readFileSync(componentPath, 'utf8')
  : '';
const articleTemplate = fs.readFileSync(articleTemplatePath, 'utf8');
const homePage = fs.readFileSync(homePath, 'utf8');
const aboutPage = fs.readFileSync(aboutPath, 'utf8');
const editorialPolicyPage = fs.readFileSync(editorialPolicyPath, 'utf8');
const componentLower = component.toLocaleLowerCase('tr-TR');

const forbiddenClaims = [
  'en iyi',
  'garanti',
  'kesin cozum',
  'kesin çözüm',
  'ucretsiz',
  'ücretsiz',
  'kampanya',
  'promosyon',
  'indirim',
];

const checks = [
  {
    name: 'PreferredSourceCTA component exists',
    pass: fs.existsSync(componentPath),
  },
  {
    name: 'CTA links to the Google Preferred Sources domain-level URL',
    pass: component.includes('https://google.com/preferences/source?q=tupbebek.com'),
  },
  {
    name: 'CTA opens externally with safe link attributes and an accessible label',
    pass:
      component.includes('target="_blank"') &&
      component.includes('rel="noopener noreferrer"') &&
      component.includes('aria-label='),
  },
  {
    name: 'CTA tracks preferred source clicks through the shared GA helper',
    pass:
      component.includes("window.__trackGaEvent?.('add_preferred_source_click'") &&
      component.includes('preferred_source_domain') &&
      component.includes('placement') &&
      component.includes('page_path'),
  },
  {
    name: 'CTA exposes stable analytics data attributes',
    pass:
      component.includes('data-preferred-source-cta') &&
      component.includes('data-placement={placement}') &&
      component.includes('data-domain="tupbebek.com"'),
  },
  {
    name: 'CTA omits empty article_slug from GA payload',
    pass:
      component.includes('const eventParams =') &&
      component.includes('if (articleSlug)') &&
      component.includes('eventParams.article_slug = articleSlug') &&
      !component.includes('article_slug: articleSlug || undefined'),
  },
  {
    name: 'CTA copy stays within medical advertising compliance boundaries',
    pass: !forbiddenClaims.some((claim) => componentLower.includes(claim)),
  },
  {
    name: 'Article template imports the CTA component',
    pass: articleTemplate.includes("import PreferredSourceCTA from '../../components/PreferredSourceCTA.astro';"),
  },
  {
    name: 'Article template renders the CTA after share buttons with article metadata',
    pass:
      articleTemplate.includes('<PreferredSourceCTA') &&
      articleTemplate.includes('placement="article_end"') &&
      articleTemplate.includes('pagePath={Astro.url.pathname}') &&
      articleTemplate.includes('articleSlug={entry.slug}'),
  },
  {
    name: 'Home page renders the CTA near the footer',
    pass:
      homePage.includes("import PreferredSourceCTA from '../components/PreferredSourceCTA.astro';") &&
      homePage.includes('<PreferredSourceCTA') &&
      homePage.includes('placement="home_footer"') &&
      homePage.includes('pagePath={Astro.url.pathname}'),
  },
  {
    name: 'About page renders the CTA in the institutional trust section',
    pass:
      aboutPage.includes("import PreferredSourceCTA from '../components/PreferredSourceCTA.astro';") &&
      aboutPage.includes('<PreferredSourceCTA') &&
      aboutPage.includes('placement="about_page"') &&
      aboutPage.includes('pagePath={Astro.url.pathname}'),
  },
  {
    name: 'Editorial policy page renders the CTA with editorial context',
    pass:
      editorialPolicyPage.includes("import PreferredSourceCTA from '../components/PreferredSourceCTA.astro';") &&
      editorialPolicyPage.includes('<PreferredSourceCTA') &&
      editorialPolicyPage.includes('placement="editorial_policy"') &&
      editorialPolicyPage.includes('pagePath={Astro.url.pathname}'),
  },
];

const failures = checks.filter((check) => !check.pass);

if (failures.length > 0) {
  console.error('Preferred Sources CTA verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure.name}`);
  }
  process.exit(1);
}

console.log('Preferred Sources CTA verification passed.');
