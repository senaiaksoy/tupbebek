import { readFile } from 'fs/promises';

const files = process.argv.slice(2);
for (const f of files) {
  const d = JSON.parse(await readFile(f, 'utf-8'));
  const a = d.audits;
  const perf = Math.round(d.categories.performance.score * 100);
  console.log(`\n=== ${d.finalDisplayedUrl} ===`);
  console.log(`Perf score: ${perf}`);
  const pick = (k) => `${a[k].displayValue || '—'} (score ${a[k].score})`;
  console.log(`  LCP: ${pick('largest-contentful-paint')}`);
  console.log(`  CLS: ${pick('cumulative-layout-shift')}`);
  console.log(`  TBT: ${pick('total-blocking-time')}`);
  console.log(`  FCP: ${pick('first-contentful-paint')}`);
  console.log(`  SI:  ${pick('speed-index')}`);
  console.log(`  TTI: ${pick('interactive')}`);
  console.log(`  TTFB: ${a['server-response-time']?.displayValue || '—'}`);
  // LCP element
  const lcpEl = a['largest-contentful-paint-element'];
  if (lcpEl?.details?.items?.[0]?.node) {
    console.log(`  LCP element: ${lcpEl.details.items[0].node.snippet?.slice(0, 120)}`);
  }
  // Top opportunities & diagnostics
  const opps = Object.entries(a).filter(([_, x]) => x.details?.type === 'opportunity' && x.numericValue > 50).sort((x, y) => y[1].numericValue - x[1].numericValue).slice(0, 5);
  if (opps.length) {
    console.log('  Top opportunities:');
    for (const [k, o] of opps) console.log(`    • ${o.title} — ${Math.round(o.numericValue)}ms`);
  }
  // CLS shifters
  const cls = a['layout-shift-elements'];
  if (cls?.details?.items?.length) {
    console.log(`  CLS shifters: ${cls.details.items.length}`);
    for (const it of cls.details.items.slice(0, 3)) console.log(`    • ${(it.node?.snippet || '').slice(0, 100)} — score ${it.score?.toFixed(4)}`);
  }
  // Unused/oversized images
  const unsized = a['unsized-images'];
  if (unsized?.details?.items?.length) console.log(`  Unsized images: ${unsized.details.items.length}`);
  const offscreen = a['offscreen-images'];
  if (offscreen?.numericValue > 100) console.log(`  Offscreen image savings: ${Math.round(offscreen.numericValue)}ms`);
  const modernFmt = a['modern-image-formats'];
  if (modernFmt?.numericValue > 100) console.log(`  Modern format savings: ${Math.round(modernFmt.numericValue)}ms`);
}
