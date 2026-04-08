/**
 * Tibbi Sozluk — Tooltip bileseni icin merkezi terim veritabani
 *
 * MedicalTooltip bileseni ile kullanilir:
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
    definition: 'Anti-Mullerian Hormon. Over rezervinin (yumurta sayisi) degerlendirilmesinde kullanilan kan testi. Dusuk AMH azalmis rezervi isaret edebilir.',
    href: '/hormon-paneli',
    videoId: 'PLACEHOLDER_AMH',
  },
  FSH: {
    term: 'FSH',
    definition: 'Folikul Stimulan Hormon. Yumurtaliklarda folikul buyumesini uyaran hipofiz hormonu. Yuksek FSH azalmis over rezervini gosterebilir.',
    href: '/hormon-paneli',
  },
  LH: {
    term: 'LH',
    definition: 'Luteinizan Hormon. Ovulasyonu tetikleyen hormon. LH dalgasi yumurta serbest birakilmasini baslatir.',
    href: '/hormon-paneli',
  },
  E2: {
    term: 'E2 (Estradiol)',
    definition: 'Ostradiol. Yumurtaliklar tarafindan uretilen ana ostrojen hormonu. Folikul gelisimini izlemede kullanilir.',
    href: '/hormon-paneli',
  },
  Progesteron: {
    term: 'Progesteron',
    definition: 'Rahim ic tabakasini (endometrium) embriyo implantasyonuna hazirlayan hormon. Luteal faz desteginde kritik oneme sahiptir.',
  },

  // ── Tedavi Yontemleri ──
  IVF: {
    term: 'IVF',
    definition: 'In Vitro Fertilizasyon (Tup Bebek). Yumurta ve spermin laboratuvar ortaminda birlestirilerek embriyo olusturulmasi ve rahme transfer edilmesi islemi.',
    href: '/tedavi-yontemleri',
    videoId: 'PLACEHOLDER_IVF',
  },
  ICSI: {
    term: 'ICSI',
    definition: 'Intrasitoplazmik Sperm Enjeksiyonu. Tek bir spermin mikro-igne ile dogrudan yumurtanin icine enjekte edildigi ileri duzey dollenme teknigi.',
    href: '/tedavi-yontemleri',
    videoId: 'PLACEHOLDER_ICSI',
  },
  IUI: {
    term: 'IUI',
    definition: 'Intrauterin Inseminasyon (Asilama). Hazirlanan sperm orneginin ince bir kateter ile dogrudan rahim icine yerlestirildigi tedavi yontemi.',
    href: '/tedavi-yontemleri#iui',
  },

  // ── Genetik Testler ──
  PGT: {
    term: 'PGT',
    definition: 'Preimplantasyon Genetik Test. Embriyo transferi oncesinde kromozom veya gen anomalilerini taramak icin yapilan genetik analiz.',
    href: '/pgt-merkezi',
  },
  'PGT-A': {
    term: 'PGT-A',
    definition: 'Preimplantasyon Genetik Test - Anoploidiler. Embriyolardaki kromozom sayisi anormalliklerini (ornegin Down sendromu) tespit eden tarama.',
    href: '/pgt-merkezi',
  },
  'PGT-M': {
    term: 'PGT-M',
    definition: 'Preimplantasyon Genetik Test - Monogenik. Tek gen hastaliklari (kistik fibrozis, orak hucre anemisi vb.) tasiyiciligini embriyoda saptayan test.',
    href: '/pgt-merkezi',
  },
  'PGT-SR': {
    term: 'PGT-SR',
    definition: 'Preimplantasyon Genetik Test - Yapısal Yeniden Düzenleme. Kromozomlardaki yapısal bozuklukları (translokasyon, inversiyon) taşıyan çiftlerde sağlıklı embriyo seçimi için uygulanan genetik test.',
    href: '/makaleler/genetik-testler',
  },
  Karyotip: {
    term: 'Karyotip',
    definition: 'Bir bireyin tum kromozom yapisini gosteren genetik analiz. Kromozom sayisi ve yapisal anomalilerin tespitinde kullanilir.',
    href: '/genetik-testler',
  },
  Anöploidi: {
    term: 'Anöploidi',
    definition: 'Hücrede kromozom sayısının normalden fazla veya eksik olması durumu. Örneğin trizomi 21 (Down sendromu) bir anöploidi türüdür. PGT-A testi embriyolardaki anöploidiyi tespit eder.',
    href: '/makaleler/genetik-testler',
  },
  Öploidi: {
    term: 'Öploidi (Euploid)',
    definition: 'Hücrede tüm kromozomların doğru sayıda (46 kromozom, 23 çift) bulunması durumu. Öploid embriyolar genetik olarak normal kabul edilir ve transfer için uygundur.',
    href: '/makaleler/genetik-testler',
  },
  Mozaik: {
    term: 'Mozaik Embriyo',
    definition: 'Bir embriyoda bazı hücrelerin normal (öploid), bazılarının ise anormal (anöploid) kromozom yapısına sahip olması durumu. Mozaik embriyoların transferi doktorun değerlendirmesine bağlıdır.',
    href: '/makaleler/genetik-testler',
  },
  Translokasyon: {
    term: 'Translokasyon',
    definition: 'Bir kromozomun bir parçasının koparak başka bir kromozoma yapışması. Dengeli translokasyon taşıyıcıları sağlıklıdır ancak embriyolarında kromozom anomalisi riski yüksektir. PGT-SR ile taranır.',
    href: '/makaleler/genetik-testler',
  },

  // ── Tani ve Cerrahi Yontemler ──
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
    definition: 'Histerosalpingografi. Rahmin ve tuplarin acikligini degerlendirmek icin kontrast madde kullanilarak yapilan rontgen goruntulemesi.',
    href: '/tani-sureci',
  },
  Spermiogram: {
    term: 'Spermiogram',
    definition: 'Sperm analizi. Sperm sayisi, hareketliligi (motilite), sekli (morfoloji) ve hacmini degerlendiren laboratuvar testi.',
    href: '/tani-sureci',
  },

  // ── Tibbi Durumlar ──
  Endometriozis: {
    term: 'Endometriozis',
    definition: 'Rahim ic tabakasina benzer dokunun rahim disinda (yumurtaliklar, tupler, periton) buyumesi. Agri ve infertiliteye yol acabilir.',
    href: '/endometriozis-adenomyozis',
    videoId: 'PLACEHOLDER_ENDO',
  },
  Adenomyozis: {
    term: 'Adenomyozis',
    definition: 'Rahim ic tabakasinin (endometrium) rahim kas tabakasi (myometrium) icine girmesi. Agri, kanamaya ve implantasyon guclugune neden olabilir.',
    href: '/endometriozis-adenomyozis',
  },
  PCOS: {
    term: 'PCOS',
    definition: 'Polikistik Over Sendromu. Hormonal dengesizlik, duzensiz adet ve yumurtaliklarda cok sayida kucuk kist ile karakterize yaygin bir durum.',
    href: '/makaleler/adet-duzensizligi-pcos',
  },
  Varikosel: {
    term: 'Varikosel',
    definition: 'Testislerdeki toplardamarlarin genislemesi. Sperm uretimini ve kalitesini olumsuz etkileyebilen erkek infertilitesi nedeni.',
    href: '/erkek-infertilitesi',
  },
  Azospermi: {
    term: 'Azospermi',
    definition: 'Meni sivisi icerisinde sperm bulunmamasi durumu. Obstruktif (tikayici) veya non-obstruktif (uretim bozuklugu) olarak iki tipe ayrilir.',
    href: '/erkek-infertilitesi',
  },

  // ── Tedavi Ek Uygulamaları ──
  EmbryoGlue: {
    term: 'EmbryoGlue',
    definition: 'Hyaluronan (hyaluronik asit) ile zenginlestirilmis embriyo transfer medyumu. Embriyonun rahme tutunma sansini artirmak icin kullanilir. ESHRE 2023 kilavuzunda taze transferlerde tavsiye edilmistir.',
    href: '/makaleler/embryoglue-faydalari',
  },
  Hyaluronan: {
    term: 'Hyaluronan',
    definition: 'Hyaluronik asit olarak da bilinen, vucutta dogal olarak bulunan bir polisakkarit. Rahim, implantasyon penceresinde bu maddeyi yogun sekilde salgilar. EmbryoGlue gibi transfer medyumlarinin temel bilesenidir.',
    href: '/makaleler/embryoglue-faydalari',
  },
  RIF: {
    term: 'RIF',
    definition: 'Tekrarlayan Implantasyon Basarisizligi (Recurrent Implantation Failure). Iyi kalitede embriyo transferine ragmen iki veya daha fazla denemede implantasyon gerceklesmemesi durumu.',
    href: '/makaleler/embryoglue-faydalari',
  },

  // ── Transfer ve Protokoller ──
  FET: {
    term: 'FET',
    definition: 'Dondurulmus Embriyo Transferi (Frozen Embryo Transfer). Daha once dondurulmus embriyolarin cozulerek rahme transfer edilmesi islemi. Dogal siklus veya ilacli siklus protokolleriyle uygulanabilir.',
    href: '/makaleler/taze-dondurulmus-transfer',
  },
  OHSS: {
    term: 'OHSS',
    definition: 'Yumurtaliklarin Asiri Uyarilmasi Sendromu (Ovarian Hyperstimulation Syndrome). Tup bebek tedavisinde kullanilan hormon ilaclarinin yumurtaliklari asiri uyarmasiyla ortaya cikan, nadir fakat ciddi bir komplikasyon.',
    href: '/tedavi-yontemleri',
  },

  // ── Bilimsel Terminoloji ──
  ESHRE: {
    term: 'ESHRE',
    definition: 'Avrupa Insan Ureme ve Embriyoloji Dernegi (European Society of Human Reproduction and Embryology). Ureme tibbi alaninda klinik kilavuzlar yayimlayan en yetkili Avrupa kurulusu.',
  },
  Implantasyon: {
    term: 'Implantasyon',
    definition: 'Embriyonun rahim ic duvaruna (endometrium) tutunmasi ve gomulmesi sureci. Genellikle dollenme sonrasi 6-10. gunler arasinda gerceklesir. IVF basarisinin en kritik asamalarindan biridir.',
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
    definition: 'Dollenme sonrasi 5-6. gunde ulasilan ileri evre embriyo. Ic hucre kutlesi (bebek olacak kisim) ve trofoblast (plasenta) katmanindan olusur.',
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
    definition: 'Ultra hizli dondurma teknigi. Yumurta veya embriyolarin buz kristali olusumu olmadan cam benzeri bir yapiyla dondurulmasi.',
    href: '/makaleler/yumurta-dondurma-rehberi',
  },
  Hatching: {
    term: 'Assisted Hatching',
    definition: 'Embriyonun dis zarinin (zona pellucida) lazer veya kimyasal yontemle inceltilmesi. Implantasyonu kolaylastirmak amacli uygulanir.',
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
    definition: 'Rahim ic tabakasi. Her adet dongusu ile kalinlasir ve dokulur. Embriyo implantasyonu icin yeterli kalinlik (7-14 mm) kritik onem tasir.',
  },
  Folikul: {
    term: 'Folikul',
    definition: 'Yumurtaliklarda yumurta hucresini icerisinde barindiran sivi dolu kese. Her adet dongusu basinda birden fazla folikul gelismeye baslar.',
  },
  'Over Rezervi': {
    term: 'Over Rezervi',
    definition: 'Yumurtaliklarda kalan yumurta sayisi ve kalitesinin genel degerlendirmesi. AMH, FSH ve antral folikul sayisi ile olculur.',
    href: '/yas-ve-fertilite',
  },
};

/** Terim adina gore glossary entry dondurur */
export function getTerm(key: string): GlossaryEntry | undefined {
  return glossary[key];
}

/** Tum terimleri alfabetik sirali dizi olarak dondurur */
export function getAllTerms(): GlossaryEntry[] {
  return Object.values(glossary).sort((a, b) => a.term.localeCompare(b.term, 'tr'));
}

/** Sadece videosu olan terimleri dondurur */
export function getVideoTerms(): GlossaryEntry[] {
  return Object.values(glossary)
    .filter(e => e.videoId)
    .sort((a, b) => a.term.localeCompare(b.term, 'tr'));
}
