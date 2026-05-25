import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const baseLayout = fs.readFileSync(path.join(root, 'src/layouts/BaseLayout.astro'), 'utf8');
const cookieConsent = fs.readFileSync(path.join(root, 'src/components/CookieConsent.astro'), 'utf8');
const leadMagnet = fs.readFileSync(path.join(root, 'src/components/forms/LeadMagnet.astro'), 'utf8');
const uzmanaSor = fs.readFileSync(path.join(root, 'src/components/forms/UzmanaSor.astro'), 'utf8');
const iletisim = fs.readFileSync(path.join(root, 'src/pages/iletisim.astro'), 'utf8');

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
      baseLayout.includes('PUBLIC_GA_MEASUREMENT_ID') &&
      baseLayout.includes("'G-K3VE72CSDJ'") &&
      baseLayout.includes('https://www.googletagmanager.com/gtag/js?id=') &&
      baseLayout.includes("window.gtag('config', gaMeasurementId") &&
      !baseLayout.includes('if (!hasAnalyticsConsent()) return;'),
  },
  {
    name: 'cookie consent updates analytics and ads measurement consent for accept and reject states',
    pass:
      baseLayout.includes("window.gtag('consent', 'update'") &&
      baseLayout.includes("analytics_storage: isAccepted ? 'granted' : 'denied'") &&
      baseLayout.includes("ad_storage: isAccepted ? 'granted' : 'denied'") &&
      baseLayout.includes("ad_user_data: isAccepted ? 'granted' : 'denied'") &&
      baseLayout.includes("ad_personalization: 'denied'") &&
      cookieConsent.includes("saveConsent('accepted')") &&
      cookieConsent.includes("saveConsent('rejected')"),
  },
  {
    name: 'cookie consent v1.4 forces a fresh accept or reject choice in a modal',
    pass:
      baseLayout.includes("const analyticsConsentKey = 'cookie-consent-v1.4'") &&
      cookieConsent.includes('const { version = "1.4" } = Astro.props') &&
      cookieConsent.includes('role="alertdialog"') &&
      cookieConsent.includes('aria-modal="true"') &&
      cookieConsent.includes("if (!readConsent()) {") &&
      cookieConsent.includes("document.body.style.overflow = 'hidden'") &&
      cookieConsent.includes("event.key === 'Escape'") &&
      !cookieConsent.includes("overlay.addEventListener('click'"),
  },
  {
    name: 'accept and reject choices are both sent to GA4 as privacy events',
    pass:
      baseLayout.includes("window.gtag('event', 'cookie_consent_choice'") &&
      baseLayout.includes("consent_status: status === 'accepted' ? 'accepted' : 'rejected'") &&
      baseLayout.includes("analytics_consent: status === 'accepted' ? 'granted' : 'denied'"),
  },
  {
    name: 'Google Ads conversion configuration is environment-driven and optional at build time',
    pass:
      baseLayout.includes('PUBLIC_GOOGLE_ADS_ID') &&
      baseLayout.includes('PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_EXPERT_CONSULTATION') &&
      baseLayout.includes('PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_CONTACT_SUBMISSION') &&
      baseLayout.includes('PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_EBOOK_DOWNLOAD') &&
      baseLayout.includes('window.__trackLeadConversion'),
  },
  {
    name: 'lead events use the shared conversion helper instead of bare GA4-only events',
    pass:
      uzmanaSor.includes("window.__trackLeadConversion?.('expert_consultation'") &&
      iletisim.includes("window.__trackLeadConversion?.('contact_submission'") &&
      leadMagnet.includes("window.__trackLeadConversion?.('ebook_download'") &&
      !uzmanaSor.includes("gtag('event', 'expert_consultation'") &&
      !iletisim.includes("gtag('event', 'contact_submission'") &&
      !leadMagnet.includes("gtag('event', 'ebook_download'"),
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
