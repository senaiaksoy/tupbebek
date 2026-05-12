export type RecommendationGrade = 'A' | 'B' | 'C' | 'D/E';

export interface EvidenceGradeConfig {
  grade: RecommendationGrade;
  label: string;
  strength: string;
  description: string;
  inlineLabel: string;
  inlineClass: string;
  badgeClass: string;
  accentClass: string;
  panelClass: string;
  ringClass: string;
}

export const EVIDENCE_GRADE_ORDER: RecommendationGrade[] = ['A', 'B', 'C', 'D/E'];

export const EVIDENCE_GRADE_MAP: Record<RecommendationGrade, EvidenceGradeConfig> = {
  A: {
    grade: 'A',
    label: 'Çok Güçlü',
    strength: 'Birden fazla yüksek kaliteli RKÇ veya meta-analiz',
    description: 'Bu yazıdaki ana öneriler, birden fazla yüksek kaliteli randomize kontrollü çalışma veya meta-analiz ile desteklenir.',
    inlineLabel: 'çok güçlü kanıt',
    inlineClass: 'inline-evidence--a',
    badgeClass: 'bg-emerald-600 text-white',
    accentClass: 'text-emerald-700',
    panelClass: 'bg-emerald-50 border-emerald-200',
    ringClass: 'ring-emerald-200'
  },
  B: {
    grade: 'B',
    label: 'Güçlü',
    strength: 'Sınırlı RKÇ veya iyi tasarlanmış kohort çalışmaları',
    description: 'Bu yazıdaki ana öneriler, sınırlı sayıda RKÇ veya güçlü gözlemsel kohort verileri ile desteklenir.',
    inlineLabel: 'güçlü kanıt',
    inlineClass: 'inline-evidence--b',
    badgeClass: 'bg-sky-700 text-white',
    accentClass: 'text-sky-700',
    panelClass: 'bg-sky-50 border-sky-200',
    ringClass: 'ring-sky-200'
  },
  C: {
    grade: 'C',
    label: 'Orta / Zayıf',
    strength: 'Vaka-kontrol veya gözlemsel veri ağırlıklı',
    description: 'Bu yazıdaki ana öneriler, daha çok vaka-kontrol, gözlemsel veri veya heterojen çalışmalar üzerine kuruludur.',
    inlineLabel: 'orta/zayıf kanıt',
    inlineClass: 'inline-evidence--c',
    badgeClass: 'bg-amber-500 text-white',
    accentClass: 'text-amber-700',
    panelClass: 'bg-amber-50 border-amber-200',
    ringClass: 'ring-amber-200'
  },
  'D/E': {
    grade: 'D/E',
    label: 'Çok Zayıf',
    strength: 'Uzman görüşü veya vaka sunumları',
    description: 'Bu yazıdaki ana öneriler ağırlıklı olarak uzman görüşü, deneyim aktarımı veya düşük düzey kanıtlarla desteklenir.',
    inlineLabel: 'çok zayıf kanıt',
    inlineClass: 'inline-evidence--de',
    badgeClass: 'bg-rose-600 text-white',
    accentClass: 'text-rose-700',
    panelClass: 'bg-rose-50 border-rose-200',
    ringClass: 'ring-rose-200'
  }
};
