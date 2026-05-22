import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const baseLayout = fs.readFileSync(path.join(root, 'src/layouts/BaseLayout.astro'), 'utf8');
const cookieConsent = fs.readFileSync(path.join(root, 'src/components/CookieConsent.astro'), 'utf8');

const checks = [
  {
    name: 'GA4 script loads with default analytics_storage denied',
    pass:
      baseLayout.includes("window.gtag('consent', 'default'") &&
      baseLayout.includes("analytics_storage: 'denied'") &&
      baseLayout.includes("ad_storage: 'denied'") &&
      baseLayout.includes("ad_user_data: 'denied'") &&
      baseLayout.includes("ad_personalization: 'denied'"),
  },
  {
    name: 'GA4 config enables advanced consent mode cookieless signaling before consent',
    pass:
      baseLayout.includes("script.src = 'https://www.googletagmanager.com/gtag/js?id=G-K3VE72CSDJ'") &&
      baseLayout.includes("window.gtag('config', 'G-K3VE72CSDJ'") &&
      !baseLayout.includes('if (!hasAnalyticsConsent()) return;'),
  },
  {
    name: 'cookie consent updates analytics_storage for accept and reject states',
    pass:
      baseLayout.includes("window.gtag('consent', 'update'") &&
      baseLayout.includes("analytics_storage: status === 'accepted' ? 'granted' : 'denied'") &&
      cookieConsent.includes("saveConsent('accepted')") &&
      cookieConsent.includes("saveConsent('rejected')"),
  },
];

const failures = checks.filter((check) => !check.pass);

if (failures.length > 0) {
  console.error('Consent Mode v2 verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure.name}`);
  }
  process.exit(1);
}

console.log('Consent Mode v2 verification passed.');
