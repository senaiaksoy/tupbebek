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
    label: 'Cok Guclu',
    strength: 'Birden fazla yuksek kaliteli RKC veya meta-analiz',
    description: 'Bu yazidaki ana oneriler, birden fazla yuksek kaliteli randomize kontrollu calisma veya meta-analiz ile desteklenir.',
    inlineLabel: 'cok guclu kanit',
    inlineClass: 'inline-evidence--a',
    badgeClass: 'bg-emerald-600 text-white',
    accentClass: 'text-emerald-700',
    panelClass: 'bg-emerald-50 border-emerald-200',
    ringClass: 'ring-emerald-200'
  },
  B: {
    grade: 'B',
    label: 'Guclu',
    strength: 'Sinirli RKC veya iyi tasarlanmis kohort calismalari',
    description: 'Bu yazidaki ana oneriler, sinirli sayida RKC veya guclu gozlemsel kohort verileri ile desteklenir.',
    inlineLabel: 'guclu kanit',
    inlineClass: 'inline-evidence--b',
    badgeClass: 'bg-sky-700 text-white',
    accentClass: 'text-sky-700',
    panelClass: 'bg-sky-50 border-sky-200',
    ringClass: 'ring-sky-200'
  },
  C: {
    grade: 'C',
    label: 'Orta / Zayif',
    strength: 'Vaka-kontrol veya gozlemsel veri agirlikli',
    description: 'Bu yazidaki ana oneriler, daha cok vaka-kontrol, gozlemsel veri veya heterojen calismalar uzerine kuruludur.',
    inlineLabel: 'orta/zayif kanit',
    inlineClass: 'inline-evidence--c',
    badgeClass: 'bg-amber-500 text-white',
    accentClass: 'text-amber-700',
    panelClass: 'bg-amber-50 border-amber-200',
    ringClass: 'ring-amber-200'
  },
  'D/E': {
    grade: 'D/E',
    label: 'Cok Zayif',
    strength: 'Uzman gorusu veya vaka sunumlari',
    description: 'Bu yazidaki ana oneriler agirlikli olarak uzman gorusu, deneyim aktarimi veya dusuk duzey kanitlarla desteklenir.',
    inlineLabel: 'cok zayif kanit',
    inlineClass: 'inline-evidence--de',
    badgeClass: 'bg-rose-600 text-white',
    accentClass: 'text-rose-700',
    panelClass: 'bg-rose-50 border-rose-200',
    ringClass: 'ring-rose-200'
  }
};
