# GSC Traffic Drop Triage - 2026-06-02

Source export: `C:\Users\KC3\Downloads\tupbebek.com-Performance-on-Search-2026-06-02`

Window: Google Search Console Web search, last 28 days, visible export dates 2026-05-04 through 2026-05-31.

## Executive Diagnosis

The drop is not GA4-only. GSC also shows a real Google Search visibility decline after 2026-05-25.

At the same time, GA4 consent behavior changed repeatedly between 2026-05-16 and 2026-06-02, so GA4 likely overstates the perceived drop. Treat this as a combined issue:

- Real Search visibility decline: confirmed by GSC clicks, impressions, CTR, and average position.
- Measurement distortion: likely, due to Consent Mode and cookie consent version changes.

## Weekly GSC Pattern

| Period | Clicks | Impressions | CTR | Avg position |
|---|---:|---:|---:|---:|
| 2026-05-04 to 2026-05-10 | 226 | 16,746 | 1.35% | 9.5 |
| 2026-05-11 to 2026-05-17 | 418 | 25,590 | 1.63% | 10.5 |
| 2026-05-18 to 2026-05-24 | 489 | 22,729 | 2.15% | 11.0 |
| 2026-05-25 to 2026-05-31 | 219 | 15,531 | 1.41% | 13.6 |

2026-05-25 to 2026-05-31 vs 2026-05-18 to 2026-05-24:

- Clicks: -55.2%
- Impressions: -31.7%
- CTR: -34.4%
- Average position: +2.6 positions worse

This timing overlaps the May 2026 Google core update rollout, which began 2026-05-21.

## Highest-Impact Pages

| Page | Clicks | Impressions | CTR | Avg position | Assessment |
|---|---:|---:|---:|---:|---|
| `/makaleler/beta-hcg-testi/` | 468 | 16,057 | 2.91% | 5.95 | Strongest performer; monitor, do not over-edit. |
| `/makaleler/pcos-yeni-adi-pmos/` | 268 | 12,454 | 2.15% | 6.98 | High opportunity around "PMOS nedir" and PMOS/PCOS renaming intent. |
| `/makaleler/laboratuvar-raporu-yorumlama/` | 99 | 3,124 | 3.17% | 6.45 | Good CTR, title was long; improved SERP title targeting. |
| `/makaleler/embriyo-transferi-gun-secimi/` | 62 | 6,075 | 1.02% | 9.13 | High impressions, modest CTR. Needs query-level comparison before body edits. |
| `/makaleler/yumurtlama-takibi/` | 37 | 4,871 | 0.76% | 15.24 | Weak position/CTR; title was long; improved SERP title targeting. |
| `/makaleler/embriyo-transferi-sonrasi-bakim/` | 19 | 4,143 | 0.46% | 15.94 | High impressions, very weak CTR; improved SERP title targeting. |
| `/makaleler/istanbul-tup-bebek-doktoru/` | 13 | 1,679 | 0.77% | 13.68 | Legal/ethical caution area; do not use superiority claims. |
| `/makaleler/ivf-protokolleri/` | 11 | 1,070 | 1.03% | 23.70 | Weak position; likely needs content/internal-link review later. |

## Query Clusters

| Cluster | Matching query rows | Clicks | Impressions | CTR | Avg position |
|---|---:|---:|---:|---:|---:|
| PMOS / PCOS rename | 40 | 185 | 11,091 | 1.67% | 5.6 |
| Beta-hCG / transfer test | 127 | 101 | 3,775 | 2.68% | 9.8 |
| Embryo quality / transfer | 188 | 74 | 4,295 | 1.72% | 15.9 |
| Ovulation tracking | 45 | 6 | 537 | 1.12% | 41.1 |
| Consanguinity | 30 | 16 | 1,044 | 1.53% | 6.1 |

## Live Technical Checks

Checked priority URLs on production:

- Status: 200 for canonical slash URLs.
- Robots meta: `index, follow, max-image-preview:large`.
- Canonical: self-referential canonical slash URLs.
- Sitemap: live and includes canonical URLs.
- Slashless article URLs return 301 to slash canonical.
- `www` returns 301 to apex `https://tupbebek.com/`.

No sitewide indexing block was found.

## Changes Applied

Body copy was not changed. Only frontmatter `seoTitle` values were added/adjusted for SERP title/snippet targeting:

- `src/content/articles/pcos-yeni-adi-pmos.mdx`
  - Added: `seoTitle: "PMOS Nedir? PCOS'un Yeni Adı"`
  - Goal: capture high-impression low-CTR "pmos nedir" and PMOS intent.

- `src/content/articles/laboratuvar-raporu-yorumlama.mdx`
  - Added: `seoTitle: "Embriyo Kalite Kodları: 4AA, 3BB, 5BC"`
  - Goal: shorten overlong SERP title while preserving H1/body.

- `src/content/articles/yumurtlama-takibi.mdx`
  - Added: `seoTitle: "Yumurtlama Takibi ve En Verimli Günler"`
  - Goal: shorten overlong SERP title and align with common query intent.

- `src/content/articles/embriyo-transferi-sonrasi-bakim.mdx`
  - Updated: `seoTitle: "Embriyo Transferi Sonrası: Ne Yapmalı?"`
  - Goal: improve CTR for high-impression transfer-aftercare searches.

## Monitoring Plan

Do not judge recovery from GA4 alone for this period.

Track these in GSC:

1. Compare 2026-06-03 to 2026-06-10 against 2026-05-25 to 2026-06-01.
2. Export comparison reports for Pages and Queries, not only the default last-28-day export.
3. Watch PMOS queries separately:
   - `pmos`
   - `pmos nedir`
   - `pmos açılımı`
   - `pcos yeni adı`
4. Watch transfer/beta-hCG query clusters separately because they carry most organic clicks.
5. Inspect top 5 affected URLs in GSC URL Inspection after deployment:
   - indexed status
   - Google-selected canonical
   - last crawl date
   - rendered page availability

## Next Required Data

To isolate exact losing pages/queries, export from GSC with date comparison:

- Date compare: 2026-05-25 to 2026-05-31 vs 2026-05-18 to 2026-05-24
- Export tabs:
  - Queries
  - Pages
  - Countries
  - Devices

The current export contains totals for the last 28 days but not per-page/per-query week-over-week deltas.
