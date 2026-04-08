/**
 * Quick Guide Categories for Homepage
 * Used in: Home page, Quick guides section
 */

export interface GuideCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  color: 'blue' | 'pink' | 'purple' | 'green' | 'red' | 'orange' | 'teal' | 'amber';
}

export const guideCategories: GuideCategory[] = [
  {
    id: 'erkek-infertilitesi',
    title: 'Erkek İnfertilitesi',
    description: 'Sperm kalitesi, azospermi, DNA fragmentasyonu ve çözüm yolları',
    icon: 'male',
    href: '/erkek-infertilitesi',
    color: 'blue'
  },
  {
    id: 'kadin-infertilitesi',
    title: 'Kadın İnfertilitesi',
    description: 'PCOS, endometriozis, tüp kaynaklı nedenler ve tedavi seçenekleri',
    icon: 'female',
    href: '/kadin-infertilitesi',
    color: 'pink'
  },
  {
    id: 'tani-sureci',
    title: 'Tanı Süreci',
    description: 'Hormon paneli, genetik testler, ultrason ve eksiksiz değerlendirme',
    icon: 'psychology',
    href: '/tani-sureci',
    color: 'purple'
  },
  {
    id: 'tedavi-yontemleri',
    title: 'Tedavi Yöntemleri',
    description: 'IVF, IUI, cerrahi ve diğer bütün tedavi seçeneklerinin detayları',
    icon: 'lab_profile',
    href: '/tedavi-yontemleri',
    color: 'green'
  },
  {
    id: 'fertilite-koruma',
    title: 'Fertilite Koruma',
    description: 'Yumurta dondurma, sperm saklama ve gelecek için hazırlık',
    icon: 'favorite',
    href: '/fertilite-koruma',
    color: 'red'
  },
  {
    id: 'psikolojik-destek',
    title: 'Duygusal Destek',
    description: 'İnfertilite yolculuğunda psikolojik rehber ve yaşam ipuçları',
    icon: 'volunteer_activism',
    href: '/duygusal-destek',
    color: 'orange'
  }
];

/**
 * Color scheme mapping for guide cards
 */
export const colorScheme: Record<string, { bg: string; text: string; icon: string; border: string }> = {
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-900',
    icon: 'text-blue-600',
    border: 'border-blue-200'
  },
  pink: {
    bg: 'bg-pink-50',
    text: 'text-pink-900',
    icon: 'text-pink-600',
    border: 'border-pink-200'
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-900',
    icon: 'text-purple-600',
    border: 'border-purple-200'
  },
  green: {
    bg: 'bg-green-50',
    text: 'text-green-900',
    icon: 'text-green-600',
    border: 'border-green-200'
  },
  red: {
    bg: 'bg-red-50',
    text: 'text-red-900',
    icon: 'text-red-600',
    border: 'border-red-200'
  },
  orange: {
    bg: 'bg-orange-50',
    text: 'text-orange-900',
    icon: 'text-orange-600',
    border: 'border-orange-200'
  },
  teal: {
    bg: 'bg-teal-50',
    text: 'text-teal-900',
    icon: 'text-teal-600',
    border: 'border-teal-200'
  },
  amber: {
    bg: 'bg-amber-50',
    text: 'text-amber-900',
    icon: 'text-amber-600',
    border: 'border-amber-200'
  }
};

/**
 * Get color scheme for a guide category
 */
export function getColorScheme(color: string) {
  return colorScheme[color as keyof typeof colorScheme] || colorScheme.blue;
}
