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
    href: '/basari-oranlari/',
  },
  CanliDogumOrani: {
    term: 'Canlı Doğum Oranı (Live Birth Rate)',
    definition: 'Tüp bebek tedavisinde gerçek başarı ölçütü. Tedavi sonucunda sağlıklı bir bebeğin dünyaya gelmesi oranıdır. Klinik gebelik oranından farklı olarak erken kayıpları da hesaba katar.',
    href: '/basari-oranlari/',
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
  AFC: {
    term: 'AFC (Antral Folikül Sayısı)',
    definition: 'Antral Follicle Count. Adetin 2-5. günlerinde transvajinal ultrason ile her iki yumurtalıkta sayılan 2-10 mm çapındaki küçük foliküllerin toplam sayısı. AMH ile birlikte over rezervinin en güvenilir göstergelerinden biridir; IVF stimülasyon yanıtını tahmin etmede kullanılır.',
    href: '/yas-ve-fertilite',
  },

  // ── Hormonlar (Ek) ──
  hCG: {
    term: 'hCG (Beta hCG)',
    definition: 'İnsan Koryonik Gonadotropini. Gebelik oluştuğunda gelişen plasenta tarafından salgılanan hormon. Kanda ölçümü (Beta hCG) gebeliğin en erken ve hassas göstergesidir. IVF tedavisinde ayrıca yumurtaların son olgunlaşmasını tetiklemek için ilaç olarak da kullanılır (trigger).',
    href: '/makaleler/beta-hcg-testi',
  },
  Prolaktin: {
    term: 'Prolaktin',
    definition: 'Hipofiz bezinden salgılanan, esas olarak süt üretiminden sorumlu hormon. Gebelik dışında yüksek olması (hiperprolaktinemi) ovulasyonu baskılayarak adet düzensizliği ve infertiliteye yol açabilir.',
    href: '/makaleler/hiperprolaktinemi-ve-kisirlik',
  },
  Hiperprolaktinemi: {
    term: 'Hiperprolaktinemi',
    definition: 'Kanda prolaktin hormon düzeyinin normalin üzerinde olması. Adet düzensizliği, ovulasyon bozukluğu ve infertilitenin sık nedenlerinden biridir. Genellikle dopamin agonisti ilaçlarla (kabergolin, bromokriptin) tedavi edilir.',
    href: '/makaleler/hiperprolaktinemi-ve-kisirlik',
  },
  GnRH: {
    term: 'GnRH (Gonadotropin Salgılatıcı Hormon)',
    definition: 'Hipotalamustan salgılanan ve hipofizden FSH ile LH salınımını uyaran ana üreme hormonu. IVF protokollerinde GnRH analogları (agonist veya antagonist) kullanılarak vücudun kendi LH dalgası baskılanır ve erken yumurtlama önlenir.',
    href: '/makaleler/ivf-protokolleri',
  },
  Gonadotropin: {
    term: 'Gonadotropin',
    definition: 'Hipofiz bezinden salgılanan FSH ve LH hormonlarının ortak adı. IVF stimülasyonunda kullanılan rekombinant veya idrar kaynaklı enjeksiyon ilaçları (Gonal-F, Puregon, Menopur vb.) bu hormonların sentetik şeklidir; yumurtalıkları çok sayıda folikül geliştirmesi için uyarır.',
    href: '/makaleler/ivf-protokolleri',
  },
  TSH: {
    term: 'TSH (Tiroid Stimülan Hormon)',
    definition: 'Hipofizden salgılanan ve tiroid bezini uyaran hormon. Tiroid fonksiyonunun en hassas göstergesidir. IVF öncesi TSH değerinin 2,5 mIU/L altında olması, implantasyon ve gebelik başarısı için önerilir.',
    href: '/hormon-paneli',
  },
  Hipofiz: {
    term: 'Hipofiz Bezi',
    definition: 'Beynin tabanında yer alan, üreme hormonları FSH, LH, prolaktin ve TSH dahil pek çok hormonun salgılanmasını yöneten ana endokrin bez. IVF protokolleri büyük ölçüde hipofizin GnRH analoglarıyla baskılanması üzerine kuruludur.',
  },

  // ── Tedavi Protokolleri ──
  Antagonist: {
    term: 'Antagonist Protokol',
    definition: 'IVF stimülasyonunda erken yumurtlamayı önlemek için GnRH antagonisti (Cetrotide, Orgalutran) kullanılan kısa protokol. Tedavi adetin 2-3. günü başlar, 8-12 gün sürer. OHSS riski daha düşük olduğundan günümüzde en sık tercih edilen protokoldür.',
    href: '/makaleler/ivf-protokolleri',
  },
  AgonistProtokol: {
    term: 'Agonist (Uzun) Protokol',
    definition: 'IVF stimülasyonunda hipofizi baskılamak için GnRH agonisti (Lucrin, Suprefact) kullanılan protokol. Önceki siklusun luteal fazında başlatılır ve toplam 4-5 hafta sürer. Belirli endometriozis ve yüksek yanıt veren hastalarda hâlâ tercih edilir.',
    href: '/makaleler/ivf-protokolleri',
  },
  Trigger: {
    term: 'Trigger (Çatlatma İğnesi)',
    definition: 'Yumurtaların son olgunlaşmasını tetikleyen enjeksiyon. Klasik olarak hCG (Ovitrelle, Pregnyl) kullanılır; OHSS riski yüksek hastalarda GnRH agonist trigger (dual trigger) tercih edilir. Tetikleme sonrası yumurta toplama işlemi 34-36 saat içinde yapılır.',
    href: '/makaleler/ivf-protokolleri',
  },
  Stimulasyon: {
    term: 'Kontrollü Ovaryan Stimülasyon (KOH)',
    definition: 'IVF tedavisinde yumurtalıkların gonadotropin enjeksiyonları (FSH/LH) ile uyarılarak tek bir siklusta birden fazla folikül geliştirilmesi süreci. Doğal siklustaki tek yumurta yerine 8-15 yumurta elde edilmesi hedeflenir.',
    href: '/makaleler/ivf-protokolleri',
  },
  OPU: {
    term: 'OPU (Yumurta Toplama)',
    definition: 'Oocyte Pick-Up. Trigger enjeksiyonundan 34-36 saat sonra, transvajinal ultrason eşliğinde ince bir iğne ile foliküllerden yumurtaların aspire edilerek toplanması işlemi. Hafif sedasyon altında 15-20 dakikada tamamlanır.',
    href: '/makaleler/tup-bebek-sureci-rehber',
  },
  LutealDestek: {
    term: 'Luteal Faz Desteği',
    definition: 'Embriyo transferi sonrası 8-12 hafta süresince progesteron (vajinal jel, oral veya kas içi) ve gerektiğinde östrojen verilerek endometriumun gebeliği taşıyabilir hale getirilmesi. IVF sikluslarında doğal luteal faz yetersiz olduğundan zorunludur.',
  },

  // ── Cerrahi Sperm Eldesi ──
  TESE: {
    term: 'TESE',
    definition: 'Testiküler Sperm Ekstraksiyonu. Azospermi durumunda testis dokusundan küçük biyopsi parçaları alınarak sperm aranması işlemi. Genel veya lokal anestezi altında yapılır.',
    href: '/makaleler/cerrahi-sperm-arama-tese',
  },
  MikroTESE: {
    term: 'Mikro-TESE',
    definition: 'Mikroskobik TESE. Operasyon mikroskobu eşliğinde testisin sperm üretme olasılığı en yüksek tübüllerinin seçilerek alınması. Non-obstrüktif azospermide (NOA) klasik TESE\'ye göre sperm bulma oranı belirgin yüksektir (~%50-60 vs ~%30).',
    href: '/makaleler/azospermi-mikro-tese',
  },
  TESA: {
    term: 'TESA / PESA / MESA',
    definition: 'Cerrahi sperm eldesi yöntemleri. TESA: testisten iğne aspirasyonu. PESA: epididimden perkütan aspirasyon. MESA: epididimden mikrocerrahi aspirasyon. Obstrüktif azospermide (vazektomi sonrası, doğumsal vas deferens yokluğu) tercih edilir.',
    href: '/makaleler/cerrahi-sperm-arama-tese',
  },

  // ── Tanı Testleri (Ek) ──
  ERA: {
    term: 'ERA Testi',
    definition: 'Endometrial Reseptivite Analizi. Endometrium biyopsisinde 248 genin ekspresyonu ölçülerek implantasyon penceresinin hastaya özel zamanlamasının belirlendiği test. Son çalışmalar rutin RIF olgularında canlı doğum oranını artırmadığını göstermiştir; sınırlı endikasyonla uygulanmalıdır.',
    href: '/makaleler/era-testi-iluzyon',
  },
  SpermDNA: {
    term: 'Sperm DNA Fragmantasyonu',
    definition: 'Sperm hücrelerinin çekirdek DNA\'sındaki kırık (fragmentasyon) oranını ölçen test. Yüksek fragmantasyon (>%30) düşük döllenme, embriyo kalitesi ve gebelik kaybı ile ilişkilendirilmiştir. Tekrarlayan IVF başarısızlığı ve açıklanamayan infertilitede istenir.',
  },

  // ── Tıbbi Durumlar (Ek) ──
  Endometrioma: {
    term: 'Endometrioma (Çikolata Kisti)',
    definition: 'Yumurtalık içinde gelişen endometriozis kistleri. Eski kanın koyu kahverengi görünümü nedeniyle "çikolata kisti" olarak bilinir. Over rezervini ve IVF başarısını olumsuz etkileyebilir; cerrahi karar dikkatli verilmelidir.',
    href: '/makaleler/endometrioma',
  },
  PMOS: {
    term: 'PMOS (Polikistik Morfolojik Over Sendromu)',
    definition: 'Eski adıyla PCOS. Uluslararası uzman konsensüsü (2024) ile yeni adı PMOS olarak değiştirilmiştir. "Kistik" yerine "morfolojik" terimi kullanılarak yumurtalıklardaki yapıların gerçek kist değil çok sayıda küçük antral folikül olduğu vurgulanmıştır. Hormonal dengesizlik, adet düzensizliği ve insülin direnci ile karakterizedir.',
    href: '/makaleler/pcos-yeni-adi-pmos',
  },
  Asherman: {
    term: 'Asherman Sendromu',
    definition: 'Rahim iç boşluğunda yapışıklıkların (intrauterin sineşi) oluşması. Genellikle küretaj, doğum sonrası enfeksiyon veya rahim cerrahisi sonrası gelişir. Adet azlığı/yokluğu, infertilite ve tekrarlayan gebelik kaybına yol açar; tedavisi histeroskopik adezyolizdir.',
    href: '/makaleler/asherman-sendromu',
  },
  POI: {
    term: 'POI / POF (Prematür Over Yetmezliği)',
    definition: 'Premature Ovarian Insufficiency / Failure. 40 yaş öncesi yumurtalık fonksiyonunun erken kaybı. FSH yüksek (>25 IU/L), AMH çok düşük ve adet düzensizliği veya yokluğu vardır. Yumurtaların kalitesi ve sayısı belirgin azalmıştır.',
  },
  Polip: {
    term: 'Endometrial Polip',
    definition: 'Rahim iç tabakasından (endometrium) boşluğa doğru büyüyen iyi huylu doku çıkıntısı. Düzensiz kanamaya ve implantasyon güçlüğüne neden olabilir. IVF öncesi histeroskopik polipektomi ile çıkarılması önerilir.',
    href: '/makaleler/ivf-oncesi-histeroskopi',
  },
  SubmukozMiyom: {
    term: 'Submüköz Miyom',
    definition: 'Rahim iç boşluğuna doğru büyüyen miyom tipi. Boyut küçük bile olsa implantasyonu ve gebeliği belirgin etkilediğinden histeroskopik olarak çıkarılması mutlaka önerilir. Intramural ve subseröz miyomlardan ayırt edilmesi tedavi kararı için kritiktir.',
    href: '/makaleler/miyomlar-ve-tup-bebek',
  },
  UterinSeptum: {
    term: 'Uterin Septum',
    definition: 'Rahim boşluğunun gelişimsel olarak ortadan bir doku perdesiyle (septum) bölünmüş olması. En sık görülen müllerian anomalidir; tekrarlayan düşük ve implantasyon başarısızlığı ile ilişkilidir. Histeroskopik septum rezeksiyonu ile düzeltilir.',
    href: '/makaleler/ivf-oncesi-histeroskopi',
  },
  Sinesi: {
    term: 'İntrauterin Sineşi (Adezyon)',
    definition: 'Rahim iç duvarları arasında oluşan fibröz yapışıklıklar. Asherman sendromunun temel bulgusudur. Histeroskopik adezyoliz ile ayrılarak normal rahim boşluğu sağlanmaya çalışılır.',
    href: '/makaleler/asherman-sendromu',
  },
  InsulinDirenci: {
    term: 'İnsülin Direnci (HOMA-IR)',
    definition: 'Hücrelerin insüline normal yanıt vermemesi sonucu pankreasın daha fazla insülin salgılama zorunda kalması. HOMA-IR ile ölçülür (>2,5 direnç). PMOS\'ta sık görülür, ovulasyonu bozar ve gebelik diabeti riskini artırır. Metformin ve myo-inositol tedavide kullanılır.',
    href: '/makaleler/adet-duzensizligi-pcos',
  },
  KimyasalGebelik: {
    term: 'Kimyasal Gebelik',
    definition: 'Beta hCG ile saptanan ancak ultrasonda gebelik kesesi görülmeden kaybedilen çok erken gebelik. Embriyo implantasyonun ilk haftalarında durması anlamına gelir. Tüm gebeliklerin %15-25\'inde görülür; tek başına olması ileri inceleme gerektirmez.',
    href: '/makaleler/kimyasal-gebelik',
  },
  KlinikGebelik: {
    term: 'Klinik Gebelik',
    definition: 'Transvajinal ultrasonografide gebelik kesesinin görüldüğü gebelik. Genellikle beta hCG > 1500-2000 mIU/mL ve son adetin 5-6. haftası civarında saptanır. IVF başarı istatistiklerinde sık kullanılan ara hedef ölçüttür; ancak gerçek başarı canlı doğum oranıdır.',
  },

  // ── Embriyoloji & Laboratuvar (Ek) ──
  EmbryoScope: {
    term: 'EmbryoScope (Time-lapse)',
    definition: 'Embriyoları inkübatörden çıkarmadan dakika dakika fotoğraflayan time-lapse görüntüleme sistemi. Sıcaklık ve gaz dengesi bozulmadan embriyo gelişimi izlenir, yapay zeka algoritmaları ile en yaşayabilir embriyo seçilir.',
    href: '/makaleler/embryoscope-yapay-zeka',
  },
  Scratching: {
    term: 'Endometriyal Scratching',
    definition: 'Embriyo transferinden önceki siklusta endometriuma kontrollü mikro-hasar verilmesi. Eskiden RIF olgularında implantasyonu artırdığı düşünülürdü; ancak güncel meta-analizler (Cochrane 2021) rutin uygulamada faydasını desteklememektedir.',
    href: '/makaleler/endometriyal-scratching',
  },
  OverPRP: {
    term: 'Over PRP',
    definition: 'Trombosit Zengin Plazma\'nın (hastanın kendi kanından elde edilen) yumurtalık dokusuna enjekte edilmesi. Düşük over rezervi ve POI olgularında folikül uyandırma amacıyla denenen deneysel bir uygulamadır; kanıt düzeyi sınırlıdır.',
    href: '/makaleler/over-prp',
  },
  ZonaPellucida: {
    term: 'Zona Pellucida',
    definition: 'Yumurta ve erken embriyoyu çevreleyen glikoprotein yapıdaki dış zar. Döllenmede sperm seçiciliği ve poliispermiyi önlemede rol oynar. Blastosist evresinde embriyonun bu zardan çıkması (hatching) implantasyon için zorunludur.',
  },
  eSET: {
    term: 'eSET (Elektif Tek Embriyo Transferi)',
    definition: 'Elective Single Embryo Transfer. Birden fazla iyi kalitede embriyo bulunmasına rağmen çoğul gebelik risklerinden kaçınmak için yalnızca tek embriyo transferi tercih edilmesi. Genç ve iyi prognozlu hastalarda kümülatif canlı doğum oranını düşürmeden ikiz riskini ortadan kaldırır.',
  },
  CogulGebelik: {
    term: 'Çoğul Gebelik',
    definition: 'İkiz, üçüz veya daha fazla bebek taşınan gebelik. IVF\'te çift embriyo transferi sonucu görülme sıklığı artar. Erken doğum, preeklampsi ve düşük doğum ağırlığı riskini ciddi olarak yükselttiğinden modern IVF\'te eSET ile önlenmeye çalışılır.',
  },

  // ── Vajinal Sağlık (Ek) ──
  VajinalMikrobiyom: {
    term: 'Vajinal Mikrobiyom',
    definition: 'Vajinada yaşayan tüm mikroorganizmaların (bakteri, mantar, virüs) genetik içeriği ve etkileşimleri. Sağlıklı mikrobiyom Lactobacillus baskınlığı ile karakterizedir; disbiyoz IVF başarısını ve implantasyonu olumsuz etkileyebilir.',
    href: '/makaleler/vajinal-mikrobiyom-fiv',
  },
  Laktobasil: {
    term: 'Laktobasil (Lactobacillus)',
    definition: 'Sağlıklı vajinal florada baskın olması gereken gram-pozitif bakteri grubu. Laktik asit üreterek vajinanın asidik pH\'ını (3,8-4,5) korur ve patojen mikroorganizmaların çoğalmasını önler. Probiyotik takviyelerinde de tercih edilen tür.',
  },

  // ── Yardımcı / Donör Notları ──
  Donor: {
    term: 'Yumurta / Sperm Donasyonu',
    definition: 'Üçüncü bir kişiden alınan yumurta veya spermin tedavide kullanılması. Türkiye\'de 3219 sayılı Sağlık Hizmetleri Temel Kanunu ve ÜYTE Yönetmeliği gereği yasaktır; eşler dışından gamet kullanımı tüm yardımla üreme tekniklerinde yasaklanmıştır. Terim, yurtdışı literatür ve mevzuat farkındalığı amacıyla tanımlanmıştır.',
  },

  // ── İlaçlar & Takviyeler ──
  Letrozol: {
    term: 'Letrozol',
    definition: 'Aromataz inhibitörü grubu ilaç. Östrojen üretimini geçici olarak azaltarak hipofizden FSH salınımını uyarır ve ovulasyon indüksiyonunda kullanılır. PMOS hastalarında klomifen sitrata göre canlı doğum oranı daha yüksektir (PPCOS II çalışması, NEJM 2014); günümüzde ilk tercih ilaçtır.',
    href: '/makaleler/adet-duzensizligi-pcos',
  },
  Klomifen: {
    term: 'Klomifen Sitrat',
    definition: 'Selektif östrojen reseptör modülatörü (SERM). Hipotalamustaki östrojen reseptörlerini bloke ederek FSH/LH salınımını artırır ve ovulasyonu uyarır. Onlarca yıldır kullanılan klasik ovulasyon ilacıdır; günümüzde PMOS\'ta letrozolden sonra ikinci tercihtir.',
    href: '/makaleler/adet-duzensizligi-pcos',
  },
  Metformin: {
    term: 'Metformin',
    definition: 'Biguanid grubu insülin duyarlaştırıcı ilaç. İnsülin direncini azaltarak PMOS\'ta ovulasyonu düzenler, gebelik diabeti riskini düşürür. Genellikle 1500-2000 mg/gün dozunda kullanılır; ovulasyon indüksiyon ilaçlarıyla kombine edildiğinde başarı oranını artırabilir.',
    href: '/makaleler/adet-duzensizligi-pcos',
  },
  Inositol: {
    term: 'İnositol (Myo + D-chiro)',
    definition: 'Hücresel ikincil haberci görevi gören doğal şeker alkolü. Myo-inositol ile D-chiro-inositol 40:1 oranında kombinasyonu PMOS hastalarında insülin duyarlılığını artırır, yumurta kalitesini iyileştirir ve ovulasyonu destekler. Genellikle 2-4 g/gün kullanılır; kanıt düzeyi orta (B).',
    href: '/makaleler/adet-duzensizligi-pcos',
  },
  CoQ10: {
    term: 'CoQ10 (Koenzim Q10)',
    definition: 'Mitokondri zincirinde elektron taşıyan ve enerji üretimine katılan yağda çözünen molekül. Yumurta ve sperm hücrelerinde mitokondri yoğunluğu yüksek olduğundan, ileri yaş kadın infertilitesi ve düşük over rezervinde 200-600 mg/gün takviyesi önerilebilir. Erkek infertilitesinde sperm motilitesini iyileştirdiğine dair kanıtlar mevcuttur.',
    href: '/makaleler/erkek-dogurganlik-besin-takviyeleri',
  },
  DHEA: {
    term: 'DHEA (Dehidroepiandrosteron)',
    definition: 'Adrenal bezlerden salgılanan, östrojen ve testosteron öncülü zayıf androjen hormonu. Düşük over rezervi olan kadınlarda 25-75 mg/gün takviyesinin yumurta sayı ve kalitesini artırabileceği öne sürülmüştür; ancak güncel kanıtlar tartışmalıdır (Cochrane belirsiz, ESHRE rutin önermez).',
  },

  // ── Adet & Menopoz ──
  Amenore: {
    term: 'Amenore',
    definition: 'Adet kanamasının olmaması. Primer amenore (15 yaşına kadar hiç adet görmeme) ve sekonder amenore (daha önce adet gören kadında 3 ay veya üzeri adet yokluğu) olarak ikiye ayrılır. Hipotalamik, hipofizer, ovaryan veya uterin nedenlerden kaynaklanabilir.',
    href: '/makaleler/adet-gorememe',
  },
  Oligomenore: {
    term: 'Oligomenore',
    definition: 'Adet aralıklarının uzun olması (35 günden fazla, yılda 9 siklustan az). PMOS, tiroid bozuklukları ve hiperprolaktinemi en sık nedenlerdir; ovulasyon düzensizliğinin işaretidir.',
    href: '/makaleler/adet-duzensizligi-pcos',
  },
  Menopoz: {
    term: 'Menopoz',
    definition: 'Yumurtalık fonksiyonunun doğal olarak sona ermesi ve 12 ay üst üste adet yokluğu. Türkiye\'de ortalama 47-51 yaş arasında görülür. 40 yaş öncesi menopoz prematür over yetmezliği (POI), 40-45 arası erken menopoz olarak adlandırılır.',
  },
  Perimenopoz: {
    term: 'Perimenopoz',
    definition: 'Menopoz öncesi geçiş dönemi. Adet düzensizliği başlar, AMH ve antral folikül sayısı azalır, FSH yükselir. Genellikle 40\'lı yaşların ortasında başlar ve son adetten itibaren 1 yıl daha sürer. Bu dönemde doğal gebelik şansı belirgin azalır.',
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
