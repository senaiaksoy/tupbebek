# GSC Coverage Redirect Analysis

- Source export: `draksoyivf.com-Coverage-Drilldown-2026-04-23`
- Issue type: `Yönlendirmeli sayfa`
- Listed URL count: **427** (`Tablo.csv`)
- Trend (`Grafik.csv`):
  - Early period baseline: ~241
  - Peak: **470** (2026-04-11 to 2026-04-13 range)
  - Latest visible: **427** (2026-04-18 onward)

## What the list shows

- Large volume of canonicalization variants:
  - `http://` vs `https://`
  - `draksoyivf.com` vs `www.draksoyivf.com`
  - trailing slash vs no trailing slash
- Legacy language sections still crawled:
  - `/fr/*`
  - `/ar/*`
- Legacy content paths still discovered:
  - `/blog/*`
  - `/treatment/*`
- Query/noise URLs exist:
  - `?gclid=...`
  - `?s={search_term_string}`
  - malformed/concatenated query URL examples

## High-impact examples

- `http://www.draksoyivf.com/` -> should be single-hop canonical to `https://www.draksoyivf.com/`
- `https://draksoyivf.com/treatment-timeline` -> should resolve to a canonical Turkish path
- `https://www.draksoyivf.com/fr/blog/...` -> should have deterministic destination (root or mapped article)
- `https://www.draksoyivf.com/blog/embryo-grading-4aa-3bb-5bc-decoding-ivf-lab-report/` -> should map to a canonical article URL if content exists

## Recommended implementation order

1. Enforce single-hop canonical redirect at edge:
   - `http` -> `https`
   - non-`www` -> `www`
2. Apply deterministic trailing slash policy (same across edge + app).
3. Strip non-essential marketing params from canonical URLs:
   - `gclid`, `fbclid`, `utm_*`
4. Expand legacy path aliases for high-frequency URLs from this export.
5. Re-submit sitemap, request validation in Search Console, and reassess after 7-14 days.

## Validation checklist after deploy

- Spot test 20 sampled URLs from `Tablo.csv` and confirm:
  - exactly one `301` hop
  - final destination is canonical and indexable
- Verify no redirect chain (`301 -> 301 -> 200`) for top legacy routes.
- Monitor `Yönlendirmeli sayfa` trend weekly until stable decline.

