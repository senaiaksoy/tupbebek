/**
 * Centralized Navigation Structure — Flat (Yatay) Mimari
 * SEO dostu, max 2 seviye derinlik, kullanıcı hedefe hızla ulaşır.
 *
 * Kullanılan: Header.astro, Footer.astro, Mobile Menu
 */

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  description?: string;
  submenu?: Array<{
    label: string;
    href: string;
    description?: string;
  }>;
}

export interface MegaMenuConfig extends NavigationItem {
  centerContent?: {
    title: string;
    description: string;
    stat?: { value: string; label: string };
  };
  featuredArticle?: {
    title: string;
    description: string;
    href: string;
  };
}

// ─────────────────────────────────────────────────────────────
// ANA MENÜ — Flat Mimari (5 sütun, yatay, max 1 alt seviye)
// ─────────────────────────────────────────────────────────────

export const navigationMenus: MegaMenuConfig[] = [
  {
    id: 'infertilite-101',
    label: 'İnfertilite 101',
    href: '/sorunlar',
    icon: 'school',
    centerContent: {
      title: 'Temel Bilgi',
      description: '"İnfertilite, dünya genelinde her 6 çiftten birini etkiler. Doğru bilgiyle başlamak, tedavi sürecinin en güçlü ilk adımıdır."',
      stat: { value: '~1/6', label: 'çift infertilite ile karşılaşır' }
    },
    featuredArticle: {
      title: 'Tüp Bebek Nedir?',
      description: 'IVF sürecinin adım adım bilimsel açıklaması.',
      href: '/makaleler/tup-bebek-nedir'
    },
    submenu: [
      { label: 'Kadın İnfertilitesi', href: '/kadin-infertilitesi', description: 'PCOS, tüp kaynaklı nedenler, endometriozis' },
      { label: 'Erkek İnfertilitesi', href: '/erkek-infertilitesi', description: 'Azospermi, varikosel, DNA hasarı' },
      { label: 'Açıklanamayan İnfertilite', href: '/aciklanamayan-infertilite', description: 'Tanısı konulamayan durumlar' },
      { label: 'Yaş ve Fertilite', href: '/yas-ve-fertilite', description: 'Over rezervi ve zamanlama' },
      { label: 'Tanı Süreci', href: '/tani-sureci', description: 'Değerlendirme adımları' },
      { label: 'Hormon Paneli', href: '/hormon-paneli', description: 'AMH, FSH, E2 değerleri' },
      { label: 'Genetik Testler', href: '/genetik-testler', description: 'Kromozomal tarama' },
      { label: 'Tıbbi Sözlük', href: '/tibbi-sozluk', description: 'Terimlerin açıklamaları' },
      { label: 'PKOS ve Tüp Bebek', href: '/makaleler/opk-ve-ivf', description: 'Polikistik over ve IVF' },
      { label: 'Hiperprolaktinemi', href: '/makaleler/hiperprolaktinemi-ve-kisirlik', description: 'Prolaktin yüksekliği ve kısırlık' },
      { label: 'Asherman Sendromu', href: '/makaleler/asherman-sendromu', description: 'Rahim içi yapışıklıklar' },
      { label: 'Akraba Evliliği ve Genetik', href: '/makaleler/akraba-evliligi', description: 'Genetik risk değerlendirmesi' },
    ]
  },

  {
    id: 'tedavi-yontemleri',
    label: 'Tedavi Yöntemleri',
    href: '/tedavi-yontemleri',
    icon: 'medical_services',
    centerContent: {
      title: 'Tedavi Seçenekleri',
      description: '"Tedavi planı; yaş, tanı, over rezervi ve önceki deneme sonuçlarına göre kişiye özel belirlenir."',
      stat: { value: '40-50%', label: 'IVF başarı oranı (yaşa göre)' }
    },
    featuredArticle: {
      title: 'Başarı Oranları',
      description: 'Yaşa ve tedavi yöntemine göre güncel başarı verileri.',
      href: '/basari-oranlari'
    },
    submenu: [
      { label: 'Tüp Bebek (IVF/ICSI)', href: '/tedavi-yontemleri', description: 'Yumurta toplama → embriyo transferi' },
      { label: 'Mikroenjeksiyon (ICSI)', href: '/makaleler/mikroenjeksiyon-icsi-nedir', description: 'ICSI tekniği detayları' },
      { label: 'IVF Protokolleri', href: '/makaleler/ivf-protokolleri', description: 'Uzun, kısa ve yeni yaklaşımlar' },
      { label: 'Aşılama (IUI)', href: '/tedavi-yontemleri#iui', description: 'İntrauterin inseminasyon' },
      { label: 'PGT Genetik Tarama', href: '/pgt-merkezi', description: 'Embriyo genetik seçimi' },
      { label: 'PGT-M Tek Gen', href: '/makaleler/pgt-m', description: 'Tek gen hastalıkları tarama' },
      { label: 'Transfer Süreci', href: '/transfer-sureci', description: 'Embriyo transfer aşaması' },
      { label: 'Transfer Sonrası Bakım', href: '/makaleler/embriyo-transferi-sonrasi-bakim', description: 'Transfer sonrası dikkat edilecekler' },
      { label: 'Taze vs Dondurulmuş Transfer', href: '/makaleler/taze-dondurulmus-transfer', description: 'Hangi yöntem daha başarılı?' },
      { label: 'Kaç Yumurta Gerekir?', href: '/makaleler/kac-yumurta-gerekir', description: 'Optimum yumurta sayısı' },
      { label: 'İlaç Rehberi', href: '/ilac-rehberi', description: 'Gonadotropinler, GnRH' },
      { label: 'Başarı Oranları', href: '/basari-oranlari', description: 'Veri şeffaflığı' },
      { label: 'Yaşa Göre Başarı Oranları', href: '/makaleler/yasa-gore-tup-bebek-basari-oranlari', description: 'Yaş gruplarına göre IVF başarısı' },
      { label: 'Başarısız Denemeler', href: '/basarisiz-denemeler', description: 'Tekrar stratejileri' },
      { label: 'Kimyasal Gebelik', href: '/makaleler/kimyasal-gebelik', description: 'Erken gebelik kaybı' },
      { label: 'EmbryoScope ve Yapay Zeka', href: '/makaleler/embryoscope-yapay-zeka', description: 'Time-lapse embriyo izleme' },
      { label: 'Over PRP', href: '/makaleler/over-prp', description: 'Yumurtalık gençleştirme' },
    ]
  },

  {
    id: 'ureme-cerrahisi',
    label: 'Üreme Cerrahisi',
    href: '/endometriozis-adenomyozis',
    icon: 'surgical',
    centerContent: {
      title: 'Cerrahi Yaklaşımlar',
      description: '"Bazı infertilite nedenleri önce cerrahi müdahale ile düzeltilir, ardından yardımcı üreme teknikleri uygulanır."',
      stat: { value: '%30-40', label: 'cerrahi sonrası doğal gebelik şansı' }
    },
    featuredArticle: {
      title: 'Endometriyal Scratching',
      description: 'İmplantasyon başarısını artırır mı? Bilimsel kanıtlar.',
      href: '/makaleler/endometriyal-scratching'
    },
    submenu: [
      { label: 'Endometriozis & Adenomyozis', href: '/endometriozis-adenomyozis', description: 'Laparoskopi, tıbbi tedavi' },
      { label: 'Endometriozis ve Tüp Bebek', href: '/makaleler/endometriozis-tup-bebek', description: 'IVF\'de endometriozis yönetimi' },
      { label: 'Endometrioma', href: '/makaleler/endometrioma', description: 'Çikolata kisti ve fertilite' },
      { label: 'Miyomlar ve Kısırlık', href: '/makaleler/miyomlar-ve-tup-bebek', description: 'Miyom tipine göre tedavi' },
      { label: 'Miyom Ameliyatı', href: '/makaleler/miyom-ameliyati', description: 'Miyomektomi süreci' },
      { label: 'Hidrosalpinks', href: '/makaleler/hidrosalpinx-ve-kisirlik', description: 'Tüp tıkanıklığı ve tedavisi' },
      { label: 'Histeroskopi', href: '/makaleler/ivf-oncesi-histeroskopi', description: 'IVF öncesi rahim değerlendirmesi' },
      { label: 'Endoskopik Cerrahi', href: '/makaleler/endoskopik-cerrahi-histeroskopi', description: 'Minimal invaziv cerrahi' },
      { label: 'Endometriyal Scratching', href: '/makaleler/endometriyal-scratching', description: 'Rahim çizme ve implantasyon' },
      { label: 'Hormonal Tedavi (Adenomyozis)', href: '/makaleler/hormonal-tedavi-adenomyozis', description: 'Adenomyozis yönetimi' },
      { label: 'Fertilite Koruma', href: '/fertilite-koruma', description: 'Yumurta/sperm dondurma' },
      { label: 'Erkek Cerrahisi', href: '/erkek-infertilitesi#cerrahi', description: 'Varikosel, TESE, mikro-TESE' },
      { label: 'Lab Raporu Yorumlama', href: '/makaleler/laboratuvar-raporu-yorumlama', description: 'Cerrahi sonrası takip' },
    ]
  },

  {
    id: 'beden-zihin',
    label: 'Beden ve Zihin Hazırlığı',
    href: '/beslenme-yasam',
    icon: 'spa',
    centerContent: {
      title: 'Bütünsel Hazırlık',
      description: '"Tedavi başarısı sadece tıbbi müdahaleye değil, bedensel ve zihinsel hazırlığa da bağlıdır."',
      stat: { value: '%25↑', label: 'yaşam tarzı değişikliği ile başarı artışı' }
    },
    featuredArticle: {
      title: 'Duygusal Destek Rehberi',
      description: 'İnfertilite yolculuğunun psikolojik yönetimi.',
      href: '/duygusal-destek'
    },
    submenu: [
      { label: 'Beslenme ve Yaşam', href: '/beslenme-yasam', description: 'Diyet, takviye, egzersiz' },
      { label: 'Erkek Besin Takviyeleri', href: '/makaleler/erkek-dogurganlik-besin-takviyeleri', description: 'Sperm kalitesi için takviyeler' },
      { label: 'Erkek Doğurganlık Besinleri', href: '/makaleler/erkek-dogurganlik-besin-takviyeleri', description: 'Erkek fertilitesi ve beslenme' },
      { label: 'Vajinal Mikrobiyom', href: '/makaleler/vajinal-mikrobiyom-fiv', description: 'Mikrobiyom ve IVF başarısı' },
      { label: 'Cep Telefonu ve Sperm', href: '/makaleler/cep-telefonu-sperm-kalitesi', description: 'Radyasyon ve sperm kalitesi' },
      { label: 'Duygusal Destek', href: '/duygusal-destek', description: 'Psikolojik yardım kaynakları' },
      { label: 'Psikolojik Destek', href: '/psikolojik-destek', description: 'Uzman psikolojik danışmanlık' },
      { label: 'Fertilite Koruma', href: '/fertilite-koruma', description: 'Geleceğe yatırım' },
      { label: 'Tüp Bebek Yanlış Bilinenler', href: '/makaleler/tup-bebek-yanlis-bilinenler', description: 'Mitler vs gerçekler' },
      { label: 'E-Kitap İndir', href: '/e-kitap-indir', description: '30 günlük beslenme planı' },
    ]
  },

  {
    id: 'kanun-maliyet',
    label: 'Kanun, Maliyet ve Haklar',
    href: '/sss',
    icon: 'gavel',
    centerContent: {
      title: 'Haklarınızı Bilin',
      description: '"SGK kapsamında 3 deneme hakkı, devlet desteği ve yasal düzenlemeler hakkında güncel bilgiler."',
      stat: { value: '3 deneme', label: 'SGK kapsamında hak' }
    },
    featuredArticle: {
      title: 'SSS — Maliyet & SGK',
      description: 'Maliyet, SGK, yasal haklar ve süreç hakkında ilgili yanıtlar.',
      href: '/sss#maliyet-sgk'
    },
    submenu: [
      { label: 'SSS — Maliyet & SGK', href: '/sss#maliyet-sgk', description: 'Ücretler, devlet desteği ve hasta hakları' },
      { label: 'Başarı Oranları', href: '/basari-oranlari', description: 'Şeffaf veri ve istatistikler' },
      { label: 'Tıbbi Sorumluluk Reddi', href: '/tibbi-sorumluluk-reddi', description: 'Yasal bilgilendirme' },
      { label: 'Editöryal Politika', href: '/editoryal-politika', description: 'İçerik standartları' },
      { label: 'Hakkımızda', href: '/hakkimizda', description: 'Misyon ve yayın kurulu' },
    ]
  },
];

// ─────────────────────────────────────────────────────────────
// FOOTER LİNKLERİ — Flat kategoriler
// ─────────────────────────────────────────────────────────────

export const footerLinks = [
  {
    category: 'İnfertilite 101',
    links: [
      { label: 'Kadın İnfertilitesi', href: '/kadin-infertilitesi' },
      { label: 'Erkek İnfertilitesi', href: '/erkek-infertilitesi' },
      { label: 'Yaş ve Fertilite', href: '/yas-ve-fertilite' },
      { label: 'Tanı Süreci', href: '/tani-sureci' },
      { label: 'PKOS ve Tüp Bebek', href: '/makaleler/opk-ve-ivf' },
      { label: 'Tıbbi Sözlük', href: '/tibbi-sozluk' },
    ]
  },
  {
    category: 'Tedavi & Cerrahi',
    links: [
      { label: 'Tedavi Yöntemleri', href: '/tedavi-yontemleri' },
      { label: 'IVF Protokolleri', href: '/makaleler/ivf-protokolleri' },
      { label: 'Transfer Süreci', href: '/transfer-sureci' },
      { label: 'İlaç Rehberi', href: '/ilac-rehberi' },
      { label: 'Başarı Oranları', href: '/basari-oranlari' },
      { label: 'Fertilite Koruma', href: '/fertilite-koruma' },
    ]
  },
  {
    category: 'Kaynaklar',
    links: [
      { label: 'Makaleler', href: '/makaleler' },
      { label: 'Tıbbi Sözlük', href: '/tibbi-sozluk' },
      { label: 'Sık Sorulan Sorular', href: '/sss' },
      { label: 'Beslenme & Yaşam', href: '/beslenme-yasam' },
      { label: 'Duygusal Destek', href: '/duygusal-destek' },
      { label: 'E-Kitap İndir', href: '/e-kitap-indir' },
    ]
  },
  {
    category: 'Kurumsal',
    links: [
      { label: 'Hakkımızda', href: '/hakkimizda' },
      { label: 'Editöryal Politika', href: '/editoryal-politika' },
      { label: 'İletişim', href: '/iletisim' },
    ]
  }
];

// ─────────────────────────────────────────────────────────────
// MOBİL ALT NAVİGASYON
// ─────────────────────────────────────────────────────────────

export const quickAccessNav = [
  { label: 'Ana Sayfa', href: '/', icon: 'home' },
  { label: 'Tedavi', href: '/tedavi-yontemleri', icon: 'medical_services' },
  { label: 'Makaleler', href: '/makaleler', icon: 'article' },
  { label: 'SSS', href: '/sss', icon: 'help' },
];

// ─────────────────────────────────────────────────────────────
// "DURUMUNUZU SEÇİN" — Dinamik Yönlendirme Modülü
// ─────────────────────────────────────────────────────────────

export interface SituationOption {
  id: string;
  label: string;
  description: string;
  icon: string;
  color: string; // Tailwind bg class suffix (e.g., 'primary', 'mint', 'apricot')
  modules: SituationModule[];
}

export interface SituationModule {
  title: string;
  description: string;
  href: string;
  icon: string;
  tag?: string; // Optional tag like "Öncelikli", "Yeni"
}

export const situationOptions: SituationOption[] = [
  {
    id: 'yeni-teshis',
    label: 'Yeni teşhis aldım',
    description: 'İnfertilite tanısı yeni konuldu, nereden başlamalıyım?',
    icon: 'explore',
    color: 'primary',
    modules: [
      { title: 'İnfertilite Nedir?', description: 'Temel kavramları öğrenin', href: '/kadin-infertilitesi', icon: 'school', tag: 'Başlangıç' },
      { title: 'Tanı Süreci', description: 'Hangi testler yapılır?', href: '/tani-sureci', icon: 'psychology' },
      { title: 'Hormon Paneli', description: 'AMH, FSH, E2 değerleri', href: '/hormon-paneli', icon: 'biotech' },
      { title: 'Tedavi Yöntemleri', description: 'IVF, IUI, cerrahi seçenekleri', href: '/tedavi-yontemleri', icon: 'medical_services' },
      { title: 'Duygusal Destek', description: 'Psikolojik yardım kaynakları', href: '/duygusal-destek', icon: 'favorite' },
      { title: 'SSS — Maliyet & Haklar', description: 'SGK, devlet desteği bilgisi', href: '/sss', icon: 'gavel' },
    ]
  },
  {
    id: 'ileri-yas',
    label: 'İleri yaş gebelik',
    description: '35 yaş üstü fertilite ve tedavi seçenekleri',
    icon: 'hourglass_top',
    color: 'apricot',
    modules: [
      { title: 'Yaş ve Fertilite', description: 'Over rezervi nasıl değişir?', href: '/yas-ve-fertilite', icon: 'timeline', tag: 'Kritik' },
      { title: 'Fertilite Koruma', description: 'Yumurta dondurma seçenekleri', href: '/fertilite-koruma', icon: 'ac_unit' },
      { title: 'PGT Genetik Tarama', description: 'Embriyo genetik sağlığı', href: '/pgt-merkezi', icon: 'genetics' },
      { title: 'Başarı Oranları', description: 'Yaşa göre IVF başarısı', href: '/basari-oranlari', icon: 'monitoring' },
      { title: 'Beslenme ve Yaşam', description: 'Over sağlığını destekle', href: '/beslenme-yasam', icon: 'restaurant' },
    ]
  },
  {
    id: 'tekrarlayan-dusukler',
    label: 'Tekrarlayan düşükler',
    description: 'Tekrarlayan gebelik kaybı ve çözüm yolları',
    icon: 'replay',
    color: 'mint',
    modules: [
      { title: 'Genetik Testler', description: 'Kromozomal tarama ve PGT', href: '/genetik-testler', icon: 'genetics', tag: 'Öncelikli' },
      { title: 'PGT Merkezi', description: 'Embriyo seçimi ve sağlığı', href: '/pgt-merkezi', icon: 'biotech' },
      { title: 'Endometriozis', description: 'Rahim içi sorunlar ve cerrahi', href: '/endometriozis-adenomyozis', icon: 'surgical' },
      { title: 'Hormon Paneli', description: 'Progesteron ve trombofili', href: '/hormon-paneli', icon: 'science' },
      { title: 'Psikolojik Destek', description: 'Kayıp sonrası toparlanma', href: '/psikolojik-destek', icon: 'psychology' },
    ]
  },
  {
    id: 'erkek-faktor',
    label: 'Erkek kaynaklı nedenleri araştırıyorum',
    description: 'Sperm kalitesi, azospermi ve erkek tedavileri',
    icon: 'male',
    color: 'primary',
    modules: [
      { title: 'Erkek İnfertilitesi', description: 'Nedenler ve tanı yöntemleri', href: '/erkek-infertilitesi', icon: 'male', tag: 'Başlangıç' },
      { title: 'Tanı Süreci', description: 'Spermiogram ve ileri testler', href: '/tani-sureci', icon: 'psychology' },
      { title: 'Tedavi Yöntemleri', description: 'ICSI, mikro-TESE seçenekleri', href: '/tedavi-yontemleri', icon: 'medical_services' },
      { title: 'Genetik Testler', description: 'Y-mikro delesyon, karyotip', href: '/genetik-testler', icon: 'genetics' },
      { title: 'Beslenme ve Yaşam', description: 'Sperm kalitesini artırma', href: '/beslenme-yasam', icon: 'restaurant' },
    ]
  },
  {
    id: 'basarisiz-tedavi',
    label: 'Tedavim başarısız oldu',
    description: 'Başarısız IVF denemesi sonrası strateji',
    icon: 'sync_problem',
    color: 'apricot',
    modules: [
      { title: 'Başarısız Denemeler', description: 'Neden başarısız oldu?', href: '/basarisiz-denemeler', icon: 'troubleshoot', tag: 'Öncelikli' },
      { title: 'PGT Genetik Tarama', description: 'Embriyo kalitesini artır', href: '/pgt-merkezi', icon: 'biotech' },
      { title: 'Transfer Süreci', description: 'Endometrium hazırlığı', href: '/transfer-sureci', icon: 'event_repeat' },
      { title: 'Psikolojik Destek', description: 'Hayal kırıklığı yönetimi', href: '/psikolojik-destek', icon: 'psychology' },
      { title: 'Başarı Oranları', description: 'Gerçekçi beklentiler', href: '/basari-oranlari', icon: 'monitoring' },
    ]
  },
  {
    id: 'bilgi-ariyorum',
    label: 'Genel bilgi arıyorum',
    description: 'Henüz teşhis yok, bilgilenme amaçlı geziniyorum',
    icon: 'menu_book',
    color: 'mint',
    modules: [
      { title: 'Tüm Makaleler', description: 'Bilimsel makale arşivi', href: '/makaleler', icon: 'article', tag: 'Popüler' },
      { title: 'Tıbbi Sözlük', description: 'Terimleri öğren', href: '/tibbi-sozluk', icon: 'dictionary' },
      { title: 'SSS', description: 'En çok sorulan sorular', href: '/sss', icon: 'help' },
      { title: 'Rehberler', description: 'Konuya göre rehberler', href: '/rehberler', icon: 'menu_book' },
      { title: 'Hakkımızda', description: 'Misyon ve yayın kurulu', href: '/hakkimizda', icon: 'info' },
    ]
  },
];

// ─────────────────────────────────────────────────────────────
// HOMEPAGE QUICK GUIDE CARDS
// ─────────────────────────────────────────────────────────────

export const quickGuideCategories = [
  {
    id: 'erkek-infertilitesi',
    title: 'Erkek İnfertilitesi',
    description: 'Sperm kalitesi, azospermi, DNA fragmentasyonu',
    icon: 'male',
    href: '/erkek-infertilitesi',
    color: 'blue'
  },
  {
    id: 'kadin-infertilitesi',
    title: 'Kadın İnfertilitesi',
    description: 'PCOS, endometriozis, tubal sorunlar',
    icon: 'female',
    href: '/kadin-infertilitesi',
    color: 'pink'
  },
  {
    id: 'tani-sureci',
    title: 'Tanı Süreci',
    description: 'Hormon paneli, genetik testler, ultrason',
    icon: 'psychology',
    href: '/tani-sureci',
    color: 'purple'
  },
  {
    id: 'tedavi-yontemleri',
    title: 'Tedavi Yöntemleri',
    description: 'IVF, IUI, cerrahi, PGT seçenekleri',
    icon: 'medical_services',
    href: '/tedavi-yontemleri',
    color: 'green'
  },
  {
    id: 'fertilite-koruma',
    title: 'Fertilite Koruma',
    description: 'Yumurta dondurma, sperm saklama',
    icon: 'favorite',
    href: '/fertilite-koruma',
    color: 'red'
  },
  {
    id: 'psikolojik-destek',
    title: 'Duygusal Destek',
    description: 'Psikolojik yardım ve yaşam rehberi',
    icon: 'volunteer_activism',
    href: '/duygusal-destek',
    color: 'orange'
  }
];
