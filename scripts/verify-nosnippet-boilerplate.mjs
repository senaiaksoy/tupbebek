import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const checks = [
  {
    file: 'src/components/Header.astro',
    selectors: [
      '<header id="main-header"',
      '<div id="mobile-menu"',
      '<nav class="lg:hidden',
    ],
  },
  {
    file: 'src/components/Footer.astro',
    selectors: ['<footer '],
  },
  {
    file: 'src/components/SearchAutocomplete.astro',
    selectors: ['<div id="search-modal"'],
  },
  {
    file: 'src/components/CookieConsent.astro',
    selectors: [
      '<div\n  id="cookie-consent-overlay"',
      '<button\n  id="cookie-preferences-toggle"',
    ],
  },
];

const failures = [];

for (const check of checks) {
  const filePath = path.join(rootDir, check.file);
  const source = fs.readFileSync(filePath, 'utf8');

  for (const selector of check.selectors) {
    const index = source.indexOf(selector);
    if (index === -1) {
      failures.push(`${check.file} is missing expected selector ${selector}`);
      continue;
    }

    const elementStart = source.slice(index, source.indexOf('>', index) + 1);
    if (!/\bdata-nosnippet\b/u.test(elementStart)) {
      failures.push(`${check.file} ${selector} should include data-nosnippet.`);
    }
  }
}

if (failures.length > 0) {
  console.error(`Nosnippet boilerplate verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Nosnippet boilerplate verification passed.');
