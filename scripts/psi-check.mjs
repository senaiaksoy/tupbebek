const urls = process.argv.slice(2);
if (!urls.length) {
  console.error('Usage: node psi-check.mjs <url> [<url>...]');
  process.exit(1);
}

for (const url of urls) {
  for (const strategy of ['mobile', 'desktop']) {
    const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=performance&category=seo&category=accessibility&category=best-practices`;
    try {
      const res = await fetch(api);
      const d = await res.json();
      if (!d.lighthouseResult) {
        console.log(`\n=== ${url} (${strategy}) === FAIL`);
        console.log(JSON.stringify(d.error || d, null, 2).slice(0, 400));
        continue;
      }
      const c = d.lighthouseResult.categories;
      const a = d.lighthouseResult.audits;
      console.log(`\n=== ${url} (${strategy}) ===`);
      console.log(`Perf: ${Math.round(c.performance.score * 100)} | SEO: ${Math.round(c.seo.score * 100)} | A11y: ${Math.round(c.accessibility.score * 100)} | BP: ${Math.round(c['best-practices'].score * 100)}`);
      console.log(`LCP: ${a['largest-contentful-paint'].displayValue} | CLS: ${a['cumulative-layout-shift'].displayValue} | TBT: ${a['total-blocking-time'].displayValue} | FCP: ${a['first-contentful-paint'].displayValue} | SI: ${a['speed-index'].displayValue}`);
      const le = d.loadingExperience;
      if (le && le.metrics) {
        const f = (k) => le.metrics[k] ? `${le.metrics[k].percentile} (${le.metrics[k].category})` : '—';
        console.log(`CrUX field — LCP: ${f('LARGEST_CONTENTFUL_PAINT_MS')} | CLS: ${f('CUMULATIVE_LAYOUT_SHIFT_SCORE')} | INP: ${f('INTERACTION_TO_NEXT_PAINT')} | FCP: ${f('FIRST_CONTENTFUL_PAINT_MS')} | TTFB: ${f('EXPERIMENTAL_TIME_TO_FIRST_BYTE')}`);
      } else {
        console.log('CrUX field: no data');
      }
      // Top opportunities
      const opps = Object.values(a).filter(x => x.details?.type === 'opportunity' && x.numericValue > 100).sort((x, y) => y.numericValue - x.numericValue).slice(0, 4);
      if (opps.length) {
        console.log('Top opportunities:');
        for (const o of opps) console.log(`  • ${o.title} — saves ${Math.round(o.numericValue)}ms`);
      }
    } catch (e) {
      console.log(`\n=== ${url} (${strategy}) === ERROR ${e.message}`);
    }
  }
}
