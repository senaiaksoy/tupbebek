import { readFile, writeFile } from 'fs/promises';
import { createHash } from 'crypto';

const baselinePath = process.argv[2] || '.seo-baselines/baseline-2026-05-19.json';
const baseline = JSON.parse(await readFile(baselinePath, 'utf-8'));

const extract = (html, regex) => {
  const m = html.match(regex);
  return m ? m[1].trim() : null;
};
const extractAll = (html, regex) => {
  const out = [];
  let m;
  const re = new RegExp(regex, 'gi');
  while ((m = re.exec(html)) !== null) out.push(m[1].trim());
  return out;
};

const fetchSnap = async (url) => {
  const res = await fetch(url);
  const html = await res.text();
  const hash = createHash('sha256').update(html).digest('hex').slice(0, 16);
  return {
    url,
    status: res.status,
    title: extract(html, /<title>([^<]+)<\/title>/i),
    description: extract(html, /<meta\s+name=["']description["']\s+content=["']([^"']+)/i),
    canonical: extract(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)/i),
    robots: extract(html, /<meta\s+name=["']robots["']\s+content=["']([^"']+)/i),
    og: {
      title: extract(html, /<meta\s+property=["']og:title["']\s+content=["']([^"']+)/i),
      description: extract(html, /<meta\s+property=["']og:description["']\s+content=["']([^"']+)/i),
      image: extract(html, /<meta\s+property=["']og:image["']\s+content=["']([^"']+)/i),
      type: extract(html, /<meta\s+property=["']og:type["']\s+content=["']([^"']+)/i),
    },
    h1: extractAll(html, '<h1[^>]*>([^<]+)</h1>'),
    h2Count: (html.match(/<h2[^>]*>/gi) || []).length,
    h3Count: (html.match(/<h3[^>]*>/gi) || []).length,
    imgCount: (html.match(/<img\s/gi) || []).length,
    figureCount: (html.match(/<figure[^>]*>/gi) || []).length,
    jsonLdCount: (html.match(/<script[^>]*type=["']application\/ld\+json["']/gi) || []).length,
    htmlSizeBytes: html.length,
    htmlHash: hash,
    // Check for new editor approval signal
    hasNewReviewer: html.includes('Baş Editör') && html.includes('Doç. Dr. Senai Aksoy'),
    hasOldReviewer: html.includes('Tıbbi Danışma Kurulu') || html.includes('Yayin Kurulu'),
  };
};

const cmp = (a, b, field) => {
  const av = field.split('.').reduce((o,k)=>o?.[k], a);
  const bv = field.split('.').reduce((o,k)=>o?.[k], b);
  if (JSON.stringify(av) !== JSON.stringify(bv)) return { field, before: av, after: bv };
  return null;
};

console.log(`Comparing against baseline: ${baselinePath}\n`);

const results = [];
for (const baseSnap of baseline.urls) {
  if (baseSnap.error) continue;
  const cur = await fetchSnap(baseSnap.url);

  const diffs = [];
  for (const f of ['status','title','description','canonical','robots','og.title','og.description','og.image','og.type','h2Count','h3Count','imgCount','figureCount','jsonLdCount','htmlHash']) {
    const d = cmp(baseSnap, cur, f);
    if (d) diffs.push(d);
  }

  const sizeDelta = cur.htmlSizeBytes - baseSnap.htmlSizeBytes;
  results.push({ url: baseSnap.url, diffs, sizeDelta, hasNewReviewer: cur.hasNewReviewer, hasOldReviewer: cur.hasOldReviewer });

  console.log(`\n=== ${baseSnap.url} ===`);
  console.log(`  Status: ${cur.status} | Size: ${baseSnap.htmlSizeBytes} → ${cur.htmlSizeBytes} (Δ${sizeDelta > 0 ? '+' : ''}${sizeDelta}b)`);
  console.log(`  Hash:   ${baseSnap.htmlHash} → ${cur.htmlHash}`);
  console.log(`  Reviewer: new=${cur.hasNewReviewer} old=${cur.hasOldReviewer}`);
  if (diffs.length === 0) {
    console.log(`  No tracked field changes.`);
  } else {
    for (const d of diffs) {
      if (d.field === 'htmlHash') continue;
      const before = JSON.stringify(d.before)?.slice(0, 80);
      const after = JSON.stringify(d.after)?.slice(0, 80);
      console.log(`  Δ ${d.field}: ${before} → ${after}`);
    }
  }
}

const reportPath = `.seo-baselines/compare-${new Date().toISOString().slice(0,16).replace(':','-')}.json`;
await writeFile(reportPath, JSON.stringify({ baseline: baselinePath, comparedAt: new Date().toISOString(), results }, null, 2));
console.log(`\nReport: ${reportPath}`);
