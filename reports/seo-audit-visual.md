# tupbebek.com — Visual SEO Audit
**Captured:** 2026-05-10  
**Tool:** Playwright (Chromium headless)  
**Viewports:** Desktop 1440×900 · Mobile 390×844  
**Screenshots dir:** `D:\A-klasör\tupbebek\reports\screenshots\`

---

## Summary

**Visual UX Score: 74 / 100**

### Top 3 Above-Fold Issues

1. **Large dead zone on interior pages (ivf-rehberi, yayin-kurulu).** The nav + breadcrumb + white-space before the H1 consumes 280–385 px on desktop, leaving roughly 30–40% of the viewport empty before any content appears. On a 900 px tall viewport the H1 sits at y=384 px — almost halfway down — and no CTA is within view on mobile for these pages.
2. **Cookie banner interrupts mobile first impression on every page.** On mobile (390×844) the cookie notice renders directly below the hero/H1 content, visually cutting the reading flow before the user reaches a CTA or trust signal. It is not a dismissible overlay — it pushes content down and obscures the fold.
3. **Homepage mobile CTA is below the fold.** Metrics confirm `ctaAboveFold: false` for the home page on 390 px. The H1 ("Bilgi Güçtür") is visible at y=305 px, but the first article or "Devam et / Oku" link is scrolled off. Visitors landing on mobile see heading + trust badges + search bar + cookie notice but no content entry point without scrolling.

### Top 3 Mobile Issues

1. **Search input not surfaced in mobile viewport.** `searchVisible: false` on every mobile capture. The bottom navigation bar includes an "ARA" (search) icon, but the input field is not rendered in the above-the-fold area. Users cannot see where to type without tapping first — a friction point for a content-heavy publisher.
2. **~11–19 touch targets below the 44×44 px minimum** on every page (11 on home, 19 on the article page — 77% compliance on makaleler). The article page is the worst offender, likely due to in-article reference links or tag chips rendered at small sizes.
3. **Breadcrumb last segment clips on mobile (makaleler).** The breadcrumb trail "Ana Sayfa > Makaleler > Tup Bebek Ned…" is truncated mid-word on the 390 px viewport. This is both a readability issue and a visual regression for long article slugs.

---

## Per-Page Findings

---

### 1. Homepage — https://tupbebek.com/

**Screenshots:**  
- `screenshots/home-desktop.png`  
- `screenshots/home-mobile.png`

#### Desktop (1440×900)

| Check | Result |
|---|---|
| H1 visible above fold | Yes — "Bilgi Güçtür: Tüp Bebek ve Üreme Sağlığı Rehberiniz" at y=183 px |
| Primary CTA above fold | Yes — multiple "Oku / Devam" links in the featured article card |
| Trust signals above fold | Yes — 4 signals detected: bilimsel, editör, yayın kurulu, kaynak |
| Nav visible | Yes — full mega-nav with 5 dropdown categories + search icon |
| Horizontal scroll | None (scrollWidth=1440) |
| Body font | 16 px |
| Layout issues | Minor: hero section has a subtle left-aligned image + right article card layout. Clean composition. The homepage H1 at y=183 is excellent — fastest H1 placement across all tested pages. |

**Visual observation:** Desktop homepage is well-structured. Trust badge row sits immediately under the nav ("Doç. Dr. Aksoy editörlüğünde yayın", "Yayın kurulu denetiminden geçen içerikler", "Düzenli güncellenen kaynaklar", "Reklamsız editöryal yapı"). The hero CTA card (featured article) is fully visible. The palette (navy/mint/soft tones on white) is consistent with the brand brief.

#### Mobile (390×844)

| Check | Result |
|---|---|
| H1 visible above fold | Yes — at y=305 px |
| Primary CTA above fold | **No** — first content link below fold |
| Trust signals above fold | Yes — 4 badge pills visible (bilimsel, editör, yayın kurulu, kaynak) |
| Hamburger menu | Yes — visible top-right |
| Search accessible | No — ARA tab in bottom nav only; no visible input |
| Horizontal scroll | None |
| Touch targets (44×44 px) | 89% compliant — 11 of 97 targets too small |
| Body font | 16 px |

**Visual observation:** The mobile home view is strong for trust signals — 4 badge pills render immediately below the logo before the H1, which is an excellent pattern. However, the cookie banner renders below the hero image, blocking the scroll path to the first article card. Bottom nav bar (Ana Sayfa / Ara / Menü / SSS) is a solid mobile navigation pattern.

---

### 2. Article Page — https://tupbebek.com/makaleler/tup-bebek-nedir/

**Screenshots:**  
- `screenshots/makaleler-desktop.png`  
- `screenshots/makaleler-mobile.png`

#### Desktop (1440×900)

| Check | Result |
|---|---|
| H1 visible above fold | Yes — "Tüp bebek nedir, kimlere uygulanır?" at y=288 px |
| Primary CTA above fold | Yes — breadcrumb links and section navigation |
| Trust signals above fold | Yes — 5 signals: bilimsel, editör, yayın kurulu, uzman, kaynak. **Best trust coverage of all pages.** |
| Author block above fold | Yes — "Yazar: Doç. Dr. Senai Aksoy / ONAY: tupbebek.com Tıbbi Danışma Kurulu / Güncelleme: 3 Nisan 2026 / 3 Kaynak" — all visible |
| Evidence level badge ("Öneri Derecesi") | Partially visible — top of the card visible at bottom of fold |
| Horizontal scroll | None |
| Body font | 16 px |

**Visual observation:** This is the strongest page in the audit from a trust-signal perspective. The author/approval/date/source-count block is fully rendered before the fold — a pattern that directly supports E-E-A-T signals. The "Öneri Derecesi: Güçlü (B)" evidence classification card begins to appear at the fold's bottom edge, which is good for credibility discovery on scroll.

#### Mobile (390×844)

| Check | Result |
|---|---|
| H1 visible above fold | Yes — at y=288 px |
| Primary CTA above fold | Yes — (breadcrumb/nav links visible) |
| Author block above fold | Partial — "Yazar: Doç. Dr. Senai Aksoy" visible; approval block cut off by cookie banner |
| Breadcrumb truncation | Yes — "Tup Bebek Ned…" cut at viewport edge |
| Horizontal scroll | None |
| Touch targets | 77% compliant — **19 of 81 targets too small (worst page)** |
| Body font | 16 px |

**Visual observation:** The cookie banner interrupts the view between the author card and the approval/review section. On desktop both are visible; on mobile a user sees the author but must scroll past the cookie notice to see the approval metadata. The breadcrumb "Tup Bebek Ned…" clipping is a visual quality issue — the last crumb should be truncated with CSS ellipsis or hidden entirely on narrow viewports.

---

### 3. IVF Rehberi — https://tupbebek.com/ivf-rehberi/

**Screenshots:**  
- `screenshots/ivf-rehberi-desktop.png`  
- `screenshots/ivf-rehberi-mobile.png`

#### Desktop (1440×900)

| Check | Result |
|---|---|
| H1 visible above fold | Yes — "Tüp Bebek (IVF) Adım Adım Rehber" at y=384 px |
| Primary CTA above fold | Yes — section nav links visible below H1 |
| Trust signals above fold | 3 signals detected (editör, yayın kurulu, kaynak) — **no bilimsel or uzman above fold** |
| Dead zone before H1 | **Large** — nav (60 px) + top breadcrumb (50 px) + duplicate breadcrumb (50 px) + whitespace ≈ 220 px before H1. H1 at y=384 means 43% of viewport is unused space |
| Horizontal scroll | None |
| Body font | 16 px |

**Visual observation:** The double breadcrumb is immediately apparent — there is a top-level breadcrumb strip (nav bar area) AND a second inline breadcrumb "Anasayfa > Tedavi Yöntemleri > IVF Rehberi" rendered as part of the page content. These two breadcrumbs are both visible on desktop and create a cluttered header zone. The large whitespace between them and the H1 wastes prime viewport real estate. Trust signal coverage drops to 3 vs. the article page's 5.

#### Mobile (390×844)

| Check | Result |
|---|---|
| H1 visible above fold | Yes — at y=384 px |
| Primary CTA above fold | **No** |
| Trust signals above fold | Limited — cookie banner blocks lower content |
| Hamburger menu | Yes |
| Touch targets | 87% compliant — 7 of 54 too small |
| Horizontal scroll | None |

**Visual observation:** On mobile the double-breadcrumb problem is more obvious — both breadcrumbs stack vertically, and together they push the H1 to y=384 on a 844 px screen. The cookie notice then renders directly below the lead paragraph, making the above-fold composition feel busy. No CTA is visible.

---

### 4. E-Kitap İndir — https://tupbebek.com/e-kitap-indir/

**Screenshots:**  
- `screenshots/e-kitap-desktop.png`  
- `screenshots/e-kitap-mobile.png`

#### Desktop (1440×900)

| Check | Result |
|---|---|
| H1 visible above fold | Yes — "30 Günlük Tüp Bebek Beslenme Planı" at y=244 px |
| Download CTA above fold | Yes — form ("E-Kitabı İndir PDF") visible in right column |
| Trust signals above fold | 5 signals — full coverage (bilimsel, editör, yayın kurulu, uzman, kaynak) |
| Form fields visible | Yes — Ad Soyad, E-posta, Telefon, Tarih Durumu visible |
| Layout | Two-column: left=article description + food image, right=download form. Clean. |
| Horizontal scroll | None |
| Body font | 16 px |

**Visual observation:** The e-kitap page has the earliest H1 placement (y=244) and the form CTA fully visible in the right column without scrolling — this is the best above-fold CTA performance of all pages. The two-column layout works well at 1440 px. The "Bilgilendirici E-Kitap" badge above the H1 sets content-type context clearly.

#### Mobile (390×844)

| Check | Result |
|---|---|
| H1 visible above fold | Yes — at y=228 px (earliest on mobile across all pages) |
| Download CTA above fold | **No** — form is stacked below the food image; only description visible above fold |
| Trust signals above fold | 5 signals in page, but form CTA requires scroll |
| Cookie banner | Interrupts after the food image |
| Touch targets | 88% compliant — 7 of 57 too small |
| Horizontal scroll | None |

**Visual observation:** The single-column mobile stacking order places description → image → cookie notice → (scroll) → form. The download CTA, which is the primary conversion action on this page, is entirely below the fold on mobile. This is a significant issue for what is the site's main lead-generation page. The H1 and intro copy are visible and well-sized, but the action is hidden.

---

### 5. Yayın Kurulu — https://tupbebek.com/yayin-kurulu/

**Screenshots:**  
- `screenshots/yayin-kurulu-desktop.png`  
- `screenshots/yayin-kurulu-mobile.png`

#### Desktop (1440×900)

| Check | Result |
|---|---|
| H1 visible above fold | Yes — "Tıbbi Yayın Kurulu" at y=348 px |
| Editorial transparency label | Yes — "Editöryal Şeffaflık" badge above H1 |
| Trust signals above fold | Full 5-signal coverage |
| Author card visible | Yes — "Doç. Dr. Senai Aksoy / Kurul Editörü" card with full credentials visible |
| CTA above fold | Yes (contextual nav links) |
| Horizontal scroll | None |
| Body font | 16 px |

**Visual observation:** The Yayın Kurulu page executes the trust-building mission effectively on desktop. The "Editöryal Şeffaflık" kite-badge renders before the H1, then the H1, then the editorial mission statement, then immediately the editor-in-chief card with institutional credentials (Cerrahpaşa, Paris René Descartes, PubMed, ORCID, TSRM). All of this is visible without scrolling. This is the strongest trust-page layout in the audit.

#### Mobile (390×844)

| Check | Result |
|---|---|
| H1 visible above fold | Yes — at y=348 px |
| Editorial Şeffaflık badge | Yes — visible |
| CTA above fold | **No** |
| Editor card | Partially — "Kurul Editörü" section heading visible but card content cut by cookie banner |
| Touch targets | 90% compliant — 5 of 51 too small (best mobile performance) |
| Horizontal scroll | None |
| Hamburger menu | Yes |

**Visual observation:** The mobile view repeats the same cookie-banner interruption pattern — the "Kurul Editörü" card begins rendering but is immediately followed by the cookie notice. The credentialed author content that makes this page valuable is below the fold on mobile. Worth noting: text alignment on the editorial mission statement appears centered on both desktop and mobile, which is appropriate for a formal trust page.

---

## Cross-Cutting Findings

### Cookie Banner — Systemic Mobile Issue
Every mobile capture shows the cookie notice rendering in the content flow rather than as a fixed overlay. On desktop this is not visible (likely dismissed or positioned differently). On mobile it appears between the hero content and the first actionable element on all 5 pages. If it cannot be converted to a proper bottom-sheet overlay, it should at minimum be z-index pinned to the bottom of the viewport.

### Double Breadcrumb (ivf-rehberi)
The IVF Rehberi page renders two breadcrumb trails. This appears to be a template configuration issue where both a global header breadcrumb and an in-content breadcrumb are rendered. It creates visual noise and wastes above-fold space.

### Search Accessibility on Mobile
Across all 5 mobile captures, `searchVisible: false`. The "ARA" tab in the bottom nav is present but requires a tap to open a search interface. For a content publisher where search is the primary discovery mechanism, making the search input visible — even as a collapsed bar — above the fold would improve discoverability.

### Touch Target Compliance Summary

| Page | Total Targets | Non-compliant | % OK |
|---|---|---|---|
| home | 97 | 11 | 89% |
| makaleler | 81 | 19 | **77%** |
| ivf-rehberi | 54 | 7 | 87% |
| e-kitap | 57 | 7 | 88% |
| yayin-kurulu | 51 | 5 | **90%** |

The article page (makaleler) has the highest non-compliance count. Likely culprits: in-article reference number links, tag/category chips, or social share icon buttons rendered at small sizes.

### What Is Working Well (do not flag)
- Base font is 16 px on all pages — readable without pinch-zoom
- No horizontal scroll on any page at any viewport
- H1 is present and meaningful on all pages
- Trust signals (bilimsel, yayın kurulu, editör, kaynak) appear in page text on every page
- The stress-reducing palette (navy/mint/soft tones) is visually consistent — no jarring color use observed
- Hamburger menu is present on mobile on all pages
- Bottom nav bar (Ana Sayfa / Ara / Menü / SSS) is a good mobile UX pattern
- No baby/infant photos, no before/after imagery — intentional brand decision, consistent across all pages

---

## Prioritized Action Items

| Priority | Issue | Pages Affected | Effort |
|---|---|---|---|
| P1 | Move download form above the food image in mobile stacking order (e-kitap) | e-kitap | Low |
| P1 | Convert cookie banner to fixed bottom-sheet overlay on mobile | All | Medium |
| P2 | Remove duplicate breadcrumb on ivf-rehberi (template config) | ivf-rehberi | Low |
| P2 | Increase touch target size for article in-content links / tag chips | makaleler | Medium |
| P2 | Show search input visible/expanded by default in mobile hero area | All | Medium |
| P3 | Reduce whitespace between nav and H1 on ivf-rehberi and yayin-kurulu desktop | ivf-rehberi, yayin-kurulu | Low |
| P3 | Fix breadcrumb truncation on mobile for long slugs | makaleler | Low |
