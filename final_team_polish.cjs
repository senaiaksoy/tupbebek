const fs = require('fs');
const path = 'd:/A-klasör/tupbebek/public/e-kitap/tup-bebek-beslenme-plani.html';
let content = fs.readFileSync(path, 'utf8');

// 1. CHARACTER & CASING FIXES (Surgical)
const fixes = [
  // Casing & Basic Words
  [/Hucre/g, 'Hücre'],
  [/hucre/g, 'hücre'],
  [/reseptorlerini/g, 'reseptörlerini'],
  [/dusuk/g, 'düşük'],
  [/kanda aşırı insülin/g, 'Kanda aşırı insülin'],
  [/Hucresel/g, 'Hücresel'],
  [/hucresel/g, 'hücre'],
  [/damar daraltıcı etkisi/g, 'Damar daraltıcı etkisi'],
  [/gelisimi/g, 'gelişimi'],
  [/kasilmalarini/g, 'kasılmalarını'],
  [/Edilmemis Sut/g, 'Edilmemiş Süt'],
  [/tutunmasıu/g, 'tutunmasını'],
  [/urunleri/g, 'ürünleri'],
  [/Guclu/g, 'Güçlü'],
  [/icilen/g, 'içilen'],
  [/tuketilmelidir/g, 'tüketilmelidir'],
  [/Faktoru/g, 'Faktörü'],
  [/dongusu/g, 'döngüsü'],
  [/aylik/g, 'aylık'],
  [/Yardimci/g, 'Yardımcı'],
  [/baglidir/g, 'bağlıdır'],
  [/artirilmasinda/g, 'artırılmasında'],
  [/ozellikli/g, 'özellikli'],
  [/alinmalidir/g, 'alınmalıdır'],
  [/Pismis/g, 'Pişmiş'],
  [/pismis/g, 'pişmiş'],
  [/akiskanligi/g, 'akışkanlığı'],
  [/Cekirdegi/g, 'Çekirdeği'],
  [/cekirdegi/g, 'çekirdeği'],
  [/Cinko/g, 'Çinko'],
  [/onarimi/g, 'onarımı'],
  [/Keciboynuzu/g, 'Keçiboynuzu'],
  [/hareketliligi/g, 'hareketliliği'],
  [/Birakilmasi/g, 'Bırakılması'],
  [/Tutun urunleri/g, 'Tütün ürünleri'],
  [/actigindan/g, 'açtığından'],
  [/tarafindan/g, 'tarafından'],
  [/sonlandirilmalidir/g, 'sonlandırılmalıdır'],
  [/yagi/g, 'yağı'],
  [/yagli/g, 'yağlı'],
  [/kizartmalar/g, 'kızartmalar'],
  [/cikarilmalidir/g, 'çıkarılmalıdır'],
  [/protokolunun/g, 'protokolünün'],
  [/atıkların/g, 'atıkların'],
  [/uyaklaştırılması/g, 'uzaklaştırılması'],
  [/ayni/g, 'aynı'],
  [/yatip/g, 'yatıp'],
  
  // Specific Phrasing & Logic
  [/babaya ait Beslenme/g, 'Babaya Ait Beslenme'],
  [/anneye ait/g, 'anneye ait'],
  [/genlerin çalışma şekli \(genlerin çalışma şekli\)/g, 'genlerin çalışma şekli (epigenetik)'],
  [/En Güçlü vücut içindeki Antioksidan/g, 'En Güçlü İçsel Antioksidan'],
  [/gebelik öncesi hazırlık süreci/g, 'Gebelik öncesi hazırlık süreci'],
  [/vücudun temizlenmesi/g, 'Vücudun temizlenmesi'],
  [/mevsim balığı & Ceviz/g, 'Mevsim Balığı & Ceviz']
];

fixes.forEach(([rx, replacement]) => {
  content = content.replace(rx, replacement);
});

// Final Polish: Ensure every avoid-reason and info-box starts with a capital
content = content.replace(/class="avoid-reason">([a-zğüşıöç])/gi, (match, char) => {
    return 'class="avoid-reason">' + char.toUpperCase();
});

content = content.replace(/class="info-box-content">\s*<h4>(.*?)<\/h4>\s*<p>([a-zğüşıöç])/gi, (match, title, char) => {
    return 'class="info-box-content">\n        <h4>' + title + '</h4>\n        <p>' + char.toUpperCase();
});

fs.writeFileSync(path, content, 'utf8');
console.log('Final surgical polish applied: Characters fixed, Casing standardized.');
