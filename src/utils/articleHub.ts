interface ArticleHub {
  href: string;
  label: string;
  description: string;
}

const HUBS = {
  ivf: {
    href: '/ivf-rehberi/',
    label: 'IVF Rehberi',
    description: 'Tüp bebek sürecinin tanıdan transfer ve takip kararlarına uzanan ana okuma yolu.'
  },
  female: {
    href: '/kadin-infertilitesi/',
    label: 'Kadın İnfertilitesi',
    description: 'PCOS, düşük AMH, endometriozis, tüp faktörü ve rahim kaynaklı başlıkları bir araya getiren konu merkezi.'
  },
  male: {
    href: '/erkek-infertilitesi/',
    label: 'Erkek İnfertilitesi',
    description: 'Semen analizi, varikosel, azospermi, ICSI ve yaşam tarzı başlıklarını bağlayan ana rehber.'
  },
  transfer: {
    href: '/transfer-sureci/',
    label: 'Transfer Süreci',
    description: 'Transfer günü, embriyo kalitesi, FET/taze transfer, beta-hCG ve bekleme dönemi kararlarını toparlayan rehber.'
  },
  treatment: {
    href: '/tedavi-yontemleri/',
    label: 'Tedavi Yöntemleri',
    description: 'IVF, ICSI, IUI, PGT, fertilite koruma ve add-on uygulamaları kanıt düzeyiyle ayıran merkez sayfa.'
  },
  lifestyle: {
    href: '/beslenme-yasam/',
    label: 'Beslenme ve Yaşam',
    description: 'Alkol, takviyeler, mikrobiyom, kilo, uyku ve yaşam tarzı kararlarını destekleyici çerçevede toplar.'
  },
  psychology: {
    href: '/psikolojik-destek/',
    label: 'Psikolojik Destek',
    description: 'Bekleme dönemi, beta-hCG sonucu, kimyasal gebelik ve başarısız deneme sonrası duygusal destek yolları.'
  }
} satisfies Record<string, ArticleHub>;

const femaleSlugs = new Set([
  'adet-duzensizligi-pcos',
  'adet-gorememe',
  'akinti-kasinti-koku',
  'asherman-sendromu',
  'dusuk-amh-hamilelik',
  'endometrioma',
  'endometriozis-akilli-stratejiler',
  'endometriozis-tup-bebek',
  'hidrosalpinx-ve-kisirlik',
  'hiperprolaktinemi-ve-kisirlik',
  'hormonal-tedavi-adenomyozis',
  'kadin-kisirligi-tup-bebek',
  'miyom-ameliyati',
  'miyomlar-ve-tup-bebek',
  'opk-ve-ivf',
  'over-prp',
  'pcos-yeni-adi-pmos',
  'vajinal-mikrobiyom-fiv',
  'yumurtalik-kistleri-dogurganlik',
  'yumurtlama-takibi'
]);

const maleSlugs = new Set([
  'alkol-ve-fertilite',
  'azospermi-mikro-tese',
  'cep-telefonu-sperm-kalitesi',
  'cerrahi-sperm-arama-tese',
  'erkek-dogurganlik-besin-takviyeleri',
  'izotretinoin-sperm',
  'mikroenjeksiyon-icsi-nedir',
  'varikosel-nedir-ne-zaman-ameliyat-gerekir'
]);

const transferSlugs = new Set([
  'beta-hcg-testi',
  'embriyo-transferi-gun-secimi',
  'embriyo-transferi-sonrasi-bakim',
  'embryoglue-faydalari',
  'era-testi-iluzyon',
  'kimyasal-gebelik',
  'laboratuvar-raporu-yorumlama',
  'taze-dondurulmus-transfer'
]);

const treatmentSlugs = new Set([
  'akraba-evliligi',
  'bagisiklik-tedavileri',
  'embryoscope-yapay-zeka',
  'endometriyal-scratching',
  'endoskopik-cerrahi-histeroskopi',
  'iui-nedir',
  'ivf-oncesi-histeroskopi',
  'ivf-protokolleri',
  'kanser-ve-fertilite',
  'pgt-cinsiyet-secimi',
  'pgt-m',
  'yumurta-dondurma-rehberi'
]);

const psychologySlugs = new Set([
  'duygusal-dayaniklik-rehberi'
]);

const lifestyleSlugs = new Set([
  'alkol-ve-fertilite',
  'erkek-dogurganlik-besin-takviyeleri',
  'izotretinoin-sperm'
]);

export function getArticleHub(slug: string): ArticleHub {
  if (psychologySlugs.has(slug)) return HUBS.psychology;
  if (transferSlugs.has(slug)) return HUBS.transfer;
  if (femaleSlugs.has(slug)) return HUBS.female;
  if (lifestyleSlugs.has(slug)) return HUBS.lifestyle;
  if (maleSlugs.has(slug)) return HUBS.male;
  if (treatmentSlugs.has(slug)) return HUBS.treatment;

  return HUBS.ivf;
}
