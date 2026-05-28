const siteOrigin = 'https://tupbebek.com';
const allowPendingWwwHsts = process.argv.includes('--allow-pending-www-hsts');
const failures = [];

const samplePages = [
  '/',
  '/iletisim/',
  '/gizlilik-politikasi/',
  '/kullanim-kosullari/',
  '/erkek-infertilitesi/',
  '/sss/',
  '/makaleler/beta-hcg-testi/',
  '/makaleler/mikroenjeksiyon-icsi-nedir/',
  '/makaleler/pcos-yeni-adi-pmos/',
];

const attrPattern = /\b(?:href|src)=(["'])(.*?)\1/giu;
const jsonLdScriptPattern =
  /<script\b(?=[^>]*\btype=(["'])application\/ld\+json\1)[^>]*>([\s\S]*?)<\/script>/giu;
const badPublicLinkPattern =
  /(?:\/cdn-cgi\/(?:l\/)?email-protection|^mailto:|dr@senaiaksoy\.net|%7b|\/undefined\/)/iu;
const badPublicTextPattern = /(?:\/cdn-cgi\/(?:l\/)?email-protection|dr@senaiaksoy\.net)/iu;

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

async function fetchNoRedirect(url) {
  return fetch(url, { method: 'GET', redirect: 'manual' });
}

function getHeader(response, name) {
  return response.headers.get(name) || '';
}

async function checkHeaders() {
  const apex = await fetchNoRedirect(siteOrigin);
  const apexHsts = getHeader(apex, 'strict-transport-security');
  if (!apex.ok) {
    failures.push(`${siteOrigin}/ returned HTTP ${apex.status}.`);
  }
  if (!/max-age=63072000/iu.test(apexHsts) || !/includeSubDomains/iu.test(apexHsts) || !/preload/iu.test(apexHsts)) {
    failures.push(`${siteOrigin}/ is missing the expected HSTS header.`);
  }

  const www = await fetchNoRedirect('https://www.tupbebek.com/');
  const wwwLocation = getHeader(www, 'location');
  const wwwHsts = getHeader(www, 'strict-transport-security');
  if (www.status !== 301 || wwwLocation !== 'https://tupbebek.com/') {
    failures.push(`https://www.tupbebek.com/ should 301 to https://tupbebek.com/; got ${www.status} ${wwwLocation || '(no location)'}.`);
  }
  if (!/max-age=63072000/iu.test(wwwHsts) || !/includeSubDomains/iu.test(wwwHsts) || !/preload/iu.test(wwwHsts)) {
    const message = 'https://www.tupbebek.com/ 301 response is missing the expected HSTS header.';
    if (allowPendingWwwHsts) {
      console.warn(`WARN: ${message}`);
    } else {
      failures.push(message);
    }
  }
}

function parseJsonLd(html, pageUrl) {
  const nodes = [];

  for (const match of html.matchAll(jsonLdScriptPattern)) {
    try {
      const data = JSON.parse(match[2].trim());
      const roots = Array.isArray(data) ? data : [data];
      nodes.push(...roots.flatMap((root) => root?.['@graph'] || root).filter(Boolean));
    } catch (error) {
      failures.push(`${pageUrl} has invalid JSON-LD: ${error.message}`);
    }
  }

  return nodes;
}

async function checkPage(pathname) {
  const pageUrl = `${siteOrigin}${pathname}?audit=${Date.now()}`;
  const response = await fetch(pageUrl, { redirect: 'follow' });
  const html = await response.text();

  if (!response.ok) {
    failures.push(`${siteOrigin}${pathname} returned HTTP ${response.status}.`);
    return;
  }

  const title = html.match(/<title>([\s\S]*?)<\/title>/iu)?.[1]?.replace(/\s+/gu, ' ').trim() || '';
  if ([...title].length > 75) {
    failures.push(`${siteOrigin}${pathname} title is ${[...title].length} chars: ${title}`);
  }

  const badLinks = [...html.matchAll(attrPattern)]
    .map((match) => match[2])
    .filter((value) => badPublicLinkPattern.test(value));
  for (const badLink of badLinks) {
    failures.push(`${siteOrigin}${pathname} has bad public href/src: ${badLink}`);
  }
  if (badPublicTextPattern.test(html)) {
    failures.push(`${siteOrigin}${pathname} exposes public email-protection or protected email text.`);
  }

  const visibleText = cleanText(html);
  const nodes = parseJsonLd(html, `${siteOrigin}${pathname}`);
  for (const faqPage of nodes.filter((node) => typeIncludes(node, 'FAQPage'))) {
    for (const question of faqPage.mainEntity || []) {
      if (!visibleText.includes(cleanText(question.name))) {
        failures.push(`${siteOrigin}${pathname} has invisible FAQ schema question: ${question.name}`);
      }
    }
  }
}

await checkHeaders();
for (const pathname of samplePages) {
  await checkPage(pathname);
}

if (failures.length > 0) {
  console.error(`Live SEMrush verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Live SEMrush verification passed for ${samplePages.length} sample pages.`);
