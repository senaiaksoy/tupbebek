/**
 * Tıbbi Sözlük — Tooltip bileşeni için merkezi terim veritabanı
 *
 * MedicalTooltip bileşeni ile kullanılır:
 *   import { glossary } from '../../data/glossary';
 *   <MedicalTooltip term="PGT" definition={glossary.PGT.definition} href={glossary.PGT.href} />
 */

export interface GlossaryEntry {
  term: string;
  definition: string;
  href?: string;
  /** YouTube video ID (Shorts veya standart) — varsa sözlükte video ikonu gösterilir */
  videoId?: string;
}

export const glossary: Record<string, GlossaryEntry> = {
  // ── Hormonlar ──
  AMH: {
    term: 'AMH',
    definition: 'Anti-Müllerian Hormon. Over rezervinin (yumurta sayısı) değerlendirilmesinde kullanılan kan testi. Düşük AMH azalmış rezervi işaret edebilir.',
    href: '/hormon-paneli',
  },
  FSH: {
    term: 'FSH',
    definition: 'Folikül Stimülan Hormon. Yumurtalıklarda folikül büyümesini uyaran hipofiz hormonu. Yüksek FSH azalmış over rezervini gösterebilir.',
    href: '/hormon-paneli',
  },
  LH: {
    term: 'LH',
    definition: 'Luteinizan Hormon. Ovulasyonu tetikleyen hormon. LH dalgası yumurta serbest bırakılmasını başlatır.',
    href: '/hormon-paneli',
  },
  E2: {
    term: 'E2 (Estradiol)',
    definition: 'Östradiol. Yumurtalıklar tarafından üretilen ana östrojen hormonu. Folikül gelişimini izlemede kullanılır.',
    href: '/hormon-paneli',
  },
  Progesteron: {
    term: 'Progesteron',
    definition: 'Rahim iç tabakasını (endometrium) embriyo implantasyonuna hazırlayan hormon. Luteal faz desteğinde kritik öneme sahiptir.',
  },

  // ── Tedavi Yöntemleri ──
  IVF: {
    term: 'IVF',
    definition: 'In Vitro Fertilizasyon (Tüp Bebek). Yumurta ve spermin laboratuvar ortamında birleştirilerek embriyo oluşturulması ve rahme transfer edilmesi işlemi.',
    href: '/tedavi-yontemleri',
  },
  ICSI: {
    term: 'ICSI',
    definition: 'İntrasitoplazmik Sperm Enjeksiyonu. Tek bir spermin mikro-iğne ile doğrudan yumurtanın içine enjekte edildiği ileri düzey döllenme tekniği.',
    href: '/tedavi-yontemleri',
  },
  IUI: {
    term: 'IUI',
    definition: 'İntrauterin İnseminasyon (Aşılama). Hazırlanan sperm örneğinin ince bir kateter ile doğrudan rahim içine yerleştirildiği tedavi yöntemi.',
    href: '/tedavi-yontemleri#iui',
  },

  // ── Genetik Testler ──
  PGT: {
    term: 'PGT',
    definition: 'Preimplantasyon Genetik Test. Embriyo transferi öncesinde kromozom veya gen anomalilerini taramak için yapılan genetik analiz.',
    href: '/pgt-merkezi',
  },
  'PGT-A': {
    term: 'PGT-A',
    definition: 'Preimplantasyon Genetik Test - Anöploidiler. Embriyolardaki kromozom sayısı anormalliklerini (örneğin Down sendromu) tespit eden tarama.',
    href: '/pgt-merkezi',
  },
  'PGT-M': {
    term: 'PGT-M',
    definition: 'Preimplantasyon Genetik Test - Monogenik. Tek gen hastalıkları (kistik fibrozis, orak hücre anemisi vb.) taşıyıcılığını embriyoda saptayan test.',
    href: '/pgt-merkezi',
  },
  'PGT-SR': {
    term: 'PGT-SR',
    definition: 'Preimplantasyon Genetik Test - Yapısal Yeniden Düzenleme. Kromozomlardaki yapısal bozuklukları (translokasyon, inversiyon) taşıyan çiftlerde sağlıklı embriyo seçimi için uygulanan genetik test.',
    href: '/pgt-merkezi',
  },
  Karyotip: {
    term: 'Karyotip',
    definition: 'Bir bireyin tüm kromozom yapısını gösteren genetik analiz. Kromozom sayısı ve yapısal anomalilerin tespitinde kullanılır.',
    href: '/genetik-testler',
  },
  Anöploidi: {
    term: 'Anöploidi',
    definition: 'Hücrede kromozom sayısının normalden fazla veya eksik olması durumu. Örneğin trizomi 21 (Down sendromu) bir anöploidi türüdür. PGT-A testi embriyolardaki anöploidiyi tespit eder.',
    href: '/pgt-merkezi',
  },
  Öploidi: {
    term: 'Öploidi (Euploid)',
    definition: 'Hücrede tüm kromozomların doğru sayıda (46 kromozom, 23 çift) bulunması durumu. Öploid embriyolar genetik olarak normal kabul edilir ve transfer için uygundur.',
    href: '/pgt-merkezi',
  },
  Mozaik: {
    term: 'Mozaik Embriyo',
    definition: 'Bir embriyoda bazı hücrelerin normal (öploid), bazılarının ise anormal (anöploid) kromozom yapısına sahip olması durumu. Mozaik embriyoların transferi doktorun değerlendirmesine bağlıdır.',
    href: '/pgt-merkezi',
  },
  Translokasyon: {
    term: 'Translokasyon',
    definition: 'Bir kromozomun bir parçasının koparak başka bir kromozoma yapışması. Dengeli translokasyon taşıyıcıları sağlıklıdır ancak embriyolarında kromozom anomalisi riski yüksektir. PGT-SR ile taranır.',
    href: '/pgt-merkezi',
  },

  // ── Tanı ve Cerrahi Yöntemler ──
  Histeroskopi: {
    term: 'Histeroskopi',
    definition: 'İnce bir kamera (histeroskop) ile rahim iç boşluğunun doğrudan görüntülenmesi işlemi. Vajinadan girilerek yapılır, kesi gerektirmez. Polip, miyom, septum ve yapışıklık gibi sorunların hem tanısında hem tedavisinde kullanılır.',
    href: '/makaleler/ivf-oncesi-histeroskopi',
  },
  Laparoskopi: {
    term: 'Laparoskopi',
    definition: 'Karın boşluğunun küçük kesilerden girilen kamera ile incelenmesi ve tedavi edilmesi işlemi. Genel anestezi altında yapılır. Endometriozis, hidrosalpinks ve büyük miyomların değerlendirilmesinde kullanılır.',
    href: '/makaleler/ivf-oncesi-histeroskopi',
  },
  Hidrosalpinks: {
    term: 'Hidrosalpinks',
    definition: 'Fallop tüplerinin içinde sıvı birikmesi durumu. Bu sıvı embriyoya toksik etki yapabilir ve IVF başarısını düşürür. Tedavide etkilenen tüpün laparoskopik olarak alınması veya bağlanması önerilir.',
    href: '/makaleler/ivf-oncesi-histeroskopi',
  },
  HSG: {
    term: 'HSG',
    definition: 'Histerosalpingografi. Rahmin ve tüplerin açıklığını değerlendirmek için kontrast madde kullanılarak yapılan röntgen görüntülemesi.',
    href: '/tani-sureci',
  },
  Spermiogram: {
    term: 'Spermiogram',
    definition: 'Sperm analizi. Sperm sayısı, hareketliliği (motilite), şekli (morfoloji) ve hacmini değerlendiren laboratuvar testi.',
    href: '/tani-sureci',
  },

  // ── Tıbbi Durumlar ──
  Endometriozis: {
    term: 'Endometriozis',
    definition: 'Rahim iç tabakasına benzer dokunun rahim dışında (yumurtalıklar, tüpler, periton) büyümesi. Ağrı ve infertiliteye yol açabilir.',
    href: '/endometriozis-adenomyozis',
  },
  Adenomyozis: {
    term: 'Adenomyozis',
    definition: 'Rahim iç tabakasının (endometrium) rahim kas tabakası (myometrium) içine girmesi. Ağrı, kanamaya ve implantasyon güçlüğüne neden olabilir.',
    href: '/endometriozis-adenomyozis',
  },
  PCOS: {
    term: 'PCOS',
    definition: 'Polikistik Over Sendromu. Hormonal dengesizlik, düzensiz adet ve yumurtalıklarda çok sayıda küçük kist ile karakterize yaygın bir durum.',
    href: '/makaleler/adet-duzensizligi-pcos',
  },
  Varikosel: {
    term: 'Varikosel',
    definition: 'Testislerdeki toplardamarların genişlemesi. Sperm üretimini ve kalitesini olumsuz etkileyebilen erkek infertilitesi nedeni.',
    href: '/erkek-infertilitesi',
  },
  Azospermi: {
    term: 'Azospermi',
    definition: 'Meni sıvısı içerisinde sperm bulunmaması durumu. Obstrüktif (tıkayıcı) veya non-obstrüktif (üretim bozukluğu) olarak iki tipe ayrılır.',
    href: '/erkek-infertilitesi',
  },

  // ── Tedavi Ek Uygulamaları ──
  EmbryoGlue: {
    term: 'EmbryoGlue',
    definition: 'Hyaluronan (hyaluronik asit) ile zenginleştirilmiş embriyo transfer medyumu. Embriyonun rahme tutunma şansını artırmak için kullanılır. ESHRE 2023 kılavuzunda taze transferlerde tavsiye edilmiştir.',
    href: '/makaleler/embryoglue-faydalari',
  },
  Hyaluronan: {
    term: 'Hyaluronan',
    definition: 'Hyaluronik asit olarak da bilinen, vücutta doğal olarak bulunan bir polisakkarit. Rahim, implantasyon penceresinde bu maddeyi yoğun şekilde salgılar. EmbryoGlue gibi transfer medyumlarının temel bileşenidir.',
    href: '/makaleler/embryoglue-faydalari',
  },
  RIF: {
    term: 'RIF',
    definition: 'Tekrarlayan İmplantasyon Başarısızlığı (Recurrent Implantation Failure). İyi kalitede embriyo transferine rağmen iki veya daha fazla denemede implantasyon gerçekleşmemesi durumu.',
    href: '/makaleler/embryoglue-faydalari',
  },

  // ── Transfer ve Protokoller ──
  FET: {
    term: 'FET',
    definition: 'Dondurulmuş Embriyo Transferi (Frozen Embryo Transfer). Daha önce dondurulmuş embriyoların çözülerek rahme transfer edilmesi işlemi. Doğal siklus veya ilaçlı siklus protokolleriyle uygulanabilir.',
    href: '/makaleler/taze-dondurulmus-transfer',
  },
  OHSS: {
    term: 'OHSS',
    definition: 'Yumurtalıkların Aşırı Uyarılması Sendromu (Ovarian Hyperstimulation Syndrome). Tüp bebek tedavisinde kullanılan hormon ilaçlarının yumurtalıkları aşırı uyarmasıyla ortaya çıkan, nadir fakat ciddi bir komplikasyon.',
    href: '/tedavi-yontemleri',
  },

  // ── Bilimsel Terminoloji ──
  ESHRE: {
    term: 'ESHRE',
    definition: 'Avrupa İnsan Üreme ve Embriyoloji Derneği (European Society of Human Reproduction and Embryology). Üreme tıbbı alanında klinik kılavuzlar yayımlayan en yetkili Avrupa kuruluşu.',
  },
  Implantasyon: {
    term: 'İmplantasyon',
    definition: 'Embriyonun rahim iç duvarına (endometrium) tutunması ve gömülmesi süreci. Genellikle döllenme sonrası 6-10. günler arasında gerçekleşir. IVF başarısının en kritik aşamalarından biridir.',
  },

  // ── Embriyoloji ──
  Morfokinetik: {
    term: 'Morfokinetik Değerlendirme',
    definition: 'Embriyonun hem şeklini (morfoloji) hem de hücre bölünme hızını (kinetik) birlikte değerlendiren modern yaklaşım. Time-lapse teknolojisi ile kesintisiz izleme yapılarak embriyonun gelişim davranışı analiz edilir. ESHRE 2025 İstanbul Konsensüsünde önerilen bir yöntemdir.',
    href: '/makaleler/laboratuvar-raporu-yorumlama',
  },
  Gardner: {
    term: 'Gardner Sistemi',
    definition: 'Blastosist aşamasındaki embriyoları değerlendiren uluslararası standart derecelendirme sistemi. Genişleme derecesi (1-6 sayı) + İç Hücre Kitlesi (A/B/C) + Trofektoderm (A/B/C) olmak üzere üç bileşenden oluşur.',
    href: '/makaleler/laboratuvar-raporu-yorumlama',
  },
  ICM: {
    term: 'ICM (İç Hücre Kitlesi)',
    definition: 'Inner Cell Mass. Blastosist embriyonun içindeki, ileride bebeğe dönüşecek hücre grubu. Gardner sisteminde ilk harf (A/B/C) ile derecelendirilir.',
    href: '/makaleler/laboratuvar-raporu-yorumlama',
  },
  Trofektoderm: {
    term: 'Trofektoderm',
    definition: 'Blastosist embriyonun dış tabakasını oluşturan ve ileride plasentaya dönüşecek hücreler. Gardner sisteminde ikinci harf (A/B/C) ile derecelendirilir. Araştırmalar, implantasyon başarısında trofektoderm kalitesinin çok belirleyici olduğunu göstermiştir.',
    href: '/makaleler/laboratuvar-raporu-yorumlama',
  },
  Blastosist: {
    term: 'Blastosist',
    definition: 'Döllenme sonrası 5-6. günde ulaşılan ileri evre embriyo. İç hücre kütlesi (bebek olacak kısım) ve trofoblast (plasenta) katmanından oluşur.',
  },
  KumulatifBasari: {
    term: 'Kümülatif Başarı Oranı',
    definition: 'Tek bir yumurta toplama işleminden elde edilen tüm embriyolarla (taze + dondurulmuş transferler dahil) ulaşılan toplam canlı doğum oranı. Tek transfer başarısından daha yüksek olup tedavinin gerçek potansiyelini gösterir.',
    href: '/makaleler/basari-oranlari',
  },
  CanliDogumOrani: {
    term: 'Canlı Doğum Oranı (Live Birth Rate)',
    definition: 'Tüp bebek tedavisinde gerçek başarı ölçütü. Tedavi sonucunda sağlıklı bir bebeğin dünyaya gelmesi oranıdır. Klinik gebelik oranından farklı olarak erken kayıpları da hesaba katar.',
    href: '/makaleler/basari-oranlari',
  },
  Vitrifikasyon: {
    term: 'Vitrifikasyon',
    definition: 'Ultra hızlı dondurma tekniği. Yumurta veya embriyoların buz kristali oluşumu olmadan cam benzeri bir yapıyla dondurulması.',
    href: '/makaleler/yumurta-dondurma-rehberi',
  },
  Hatching: {
    term: 'Assisted Hatching',
    definition: 'Embriyonun dış zarının (zona pellucida) lazer veya kimyasal yöntemle inceltilmesi. İmplantasyonu kolaylaştırmak amaçlı uygulanır.',
  },

  // ── Genetik Hastalıklar ──
  SMA: {
    term: 'SMA (Spinal Müsküler Atrofi)',
    definition: 'Motor sinirlerin ilerleyici kaybına yol açan genetik hastalık. Otozomal resesif kalıtılır; Türkiye\'de her 40-50 kişiden biri taşıyıcıdır. PGT-M ile embriyoda taranabilir.',
    href: '/makaleler/pgt-m',
  },
  Talasemi: {
    term: 'Talasemi (Akdeniz Anemisi)',
    definition: 'Hemoglobin yapısını etkileyen kalıtsal kan hastalığı. Türkiye\'de özellikle Akdeniz ve Güneydoğu bölgelerinde taşıyıcılık oranı yüksektir. PGT-M ile embriyoda taranabilir.',
    href: '/makaleler/pgt-m',
  },

  // ── Enfeksiyonlar / Vajinal Sağlık ──
  BakteryelVajinoz: {
    term: 'Bakteriyel Vajinoz (BV)',
    definition: 'Vajinal floradaki denge bozukluğu sonucu Laktobasil bakterilerinin azalıp anaerobik bakterilerin (özellikle Gardnerella) çoğalması. Gri-beyaz akıntı ve balık kokusu ile karakterizedir. Tedavi edilmezse fertiliteyi olumsuz etkileyebilir.',
    href: '/makaleler/akinti-kasinti-koku',
  },
  Kandidiyazis: {
    term: 'Kandidiyazis (Mantar Enfeksiyonu)',
    definition: 'Candida albicans mantarının vajinada aşırı çoğalması ile oluşan enfeksiyon. Beyaz, parça parça akıntı ve şiddetli kaşıntı ile kendini gösterir. Kadınların %75\'i yaşamlarında en az bir kez mantar enfeksiyonu geçirir.',
    href: '/makaleler/akinti-kasinti-koku',
  },
  VajinalFlora: {
    term: 'Vajinal Flora',
    definition: 'Vajinada doğal olarak bulunan mikroorganizma topluluğu. Sağlıklı florada Laktobasil bakterileri baskındır ve asidik ortam sağlayarak enfeksiyonlara karşı koruma oluşturur.',
  },

  // ── Erkek İnfertilitesi ──
  NOA: {
    term: 'NOA (Non-Obstrüktif Azospermi)',
    definition: 'Meni örneğinde hiç sperm bulunmaması durumu. Tıkanıklıktan değil, testislerdeki sperm üretim bozukluğundan kaynaklanır. Erkek infertilitesinin en ağır formlarından biridir.',
    href: '/makaleler/izotretinoin-sperm',
  },
  Spermatogenez: {
    term: 'Spermatogenez',
    definition: 'Testislerde sperm hücrelerinin üretilme süreci. Yaklaşık 74 gün sürer. Hormonal denge, sıcaklık ve beslenme gibi etkenlerden etkilenir.',
  },

  // ── Anatomi ──
  Endometrium: {
    term: 'Endometrium',
    definition: 'Rahim iç tabakası. Her adet döngüsü ile kalınlaşır ve dökülür. Embriyo implantasyonu için yeterli kalınlık (7-14 mm) kritik önem taşır.',
  },
  Folikul: {
    term: 'Folikül',
    definition: 'Yumurtalıklarda yumurta hücresini içerisinde barındıran sıvı dolu kese. Her adet döngüsü başında birden fazla folikül gelişmeye başlar.',
  },
  'Over Rezervi': {
    term: 'Over Rezervi',
    definition: 'Yumurtalıklarda kalan yumurta sayısı ve kalitesinin genel değerlendirmesi. AMH, FSH ve antral folikül sayısı ile ölçülür.',
    href: '/yas-ve-fertilite',
  },
};

/** Terim adına göre glossary entry döndürür */
export function getTerm(key: string): GlossaryEntry | undefined {
  return glossary[key];
}

/** Tüm terimleri alfabetik sıralı dizi olarak döndürür */
export function getAllTerms(): GlossaryEntry[] {
  return Object.values(glossary).sort((a, b) => a.term.localeCompare(b.term, 'tr'));
}

/** Sadece videosu olan terimleri döndürür */
export function getVideoTerms(): GlossaryEntry[] {
  return Object.values(glossary)
    .filter(e => e.videoId)
    .sort((a, b) => a.term.localeCompare(b.term, 'tr'));
}
