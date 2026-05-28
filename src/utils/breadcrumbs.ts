/**
 * Dynamic Breadcrumb Generation
 * URL'den otomatik breadcrumb oluşturur
 */

interface BreadcrumbItem {
  label: string;
  href: string;
}

function normalizeBreadcrumbPath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/g, "") || "/";
  return trimmed === "/" ? "/" : `${trimmed}/`;
}

// Türkçe label mappings
const labelMap: Record<string, string> = {
  'index': 'Ana Sayfa',
  'makaleler': 'Makaleler',
  'sss': 'Sık Sorulan Sorular',
  'tani-sureci': 'Tanı Süreci',
  'tedavi-yontemleri': 'Tedavi Yöntemleri',
  'erkek-infertilitesi': 'Erkek İnfertilitesi',
  'kadin-infertilitesi': 'Kadın İnfertilitesi',
  'aciklanamayan-infertilite': 'Açıklanamayan İnfertilite',
  'yas-ve-fertilite': 'Yaş ve Fertilite',
  'endometriozis-adenomyozis': 'Endometriozis & Adenomyozis',
  'hormon-paneli': 'Hormon Paneli',
  'genetik-testler': 'Genetik Testler',
  'pgt-merkezi': 'PGT Merkezi',
  'fertilite-koruma': 'Fertilite Koruma',
  'ilac-rehberi': 'İlaç Rehberi',
  'beslenme-yasam': 'Beslenme & Yaşam',
  'duygusal-destek': 'Duygusal Destek',
  'psikolojik-destek': 'Psikolojik Destek',
  'basari-oranlari': 'Başarı Oranları',
  'rehberler': 'Rehberler',
  'ivf-rehberi': 'IVF Rehberi',
  'tibbi-sozluk': 'Tıbbi Sözlük',
  'hakkimizda': 'Hakkımızda',
  'editoryal-politika': 'Editöryal Politika',
  'gizlilik-politikasi': 'Gizlilik Politikası',
  'kullanim-kosullari': 'Kullanım Koşulları',
  'tibbi-sorumluluk-reddi': 'Tıbbi Sorumluluk Reddi',
  'cerez-politikasi': 'Çerez Politikası',
  'transfer-sureci': 'Transfer Süreci',
  'basarisiz-denemeler': 'Başarısız Denemeler',
  'yayin-sureci': 'Yayın Süreci'
};

const customBreadcrumbs: Record<string, BreadcrumbItem[]> = {
  '/ivf-rehberi/': [
    { label: 'Tedavi Yöntemleri', href: '/tedavi-yontemleri/' },
    { label: 'IVF Rehberi', href: '/ivf-rehberi/' }
  ],
  '/transfer-sureci/': [
    { label: 'IVF Rehberi', href: '/ivf-rehberi/' },
    { label: 'Transfer Süreci', href: '/transfer-sureci/' }
  ]
};

/**
 * Smart label generation from URL segment
 * "erkek-infertilitesi" → "Erkek İnfertilitesi"
 * "my-article" → "My Article"
 */
export function generateLabel(segment: string): string {
  // Check if we have a mapping for this segment
  if (labelMap[segment]) {
    return labelMap[segment];
  }

  // Fallback: capitalize words
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Generate breadcrumbs from pathname
 * "/erkek-infertilitesi" → [{ label: 'Ana Sayfa', href: '/' }, { label: 'Erkek İnfertilitesi', href: '/erkek-infertilitesi' }]
 */
export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  if (pathname === '/') {
    return [];
  }

  const normalizedPath = normalizeBreadcrumbPath(pathname);
  if (normalizedPath === '/yazar/senai-aksoy/') {
    return [
      { label: 'Yayın Kurulu', href: '/yayin-kurulu/' },
      { label: 'Doç. Dr. Senai Aksoy', href: '/yazar/senai-aksoy/' }
    ];
  }

  if (customBreadcrumbs[normalizedPath]) {
    return customBreadcrumbs[normalizedPath];
  }

  const segments = pathname
    .split('/')
    .filter(Boolean)
    .slice(0, 3); // Limit to 3 levels deep

  const breadcrumbs: BreadcrumbItem[] = [];

  let href = '';
  segments.forEach((segment, index) => {
    href += `/${segment}`;

    // Don't add last segment as link (current page)
    const label = generateLabel(segment);

    breadcrumbs.push({ label, href: normalizeBreadcrumbPath(href) });
  });

  return breadcrumbs;
}

/**
 * Get human-readable page title from pathname
 */
export function getPageTitle(pathname: string): string {
  if (pathname === '/') return 'Ana Sayfa';

  const segments = pathname.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1];

  return generateLabel(lastSegment);
}

/**
 * Check if a path is the current active page
 */
export function isActivePage(pathname: string, currentPath: string): boolean {
  return pathname === currentPath ||
         currentPath.startsWith(pathname + '/') ||
         currentPath === pathname + '/index.html';
}
