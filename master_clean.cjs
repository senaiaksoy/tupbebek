const fs = require('fs');
const path = 'd:/A-klasör/tupbebek/public/e-kitap/tup-bebek-beslenme-plani.html';
let content = fs.readFileSync(path, 'utf8');

// 1. PHASE TITLES & TOC
content = content.replace(/Faz 2: yumurtalıkların uyarılması/g, 'Faz 2: Yumurtalıkların Uyarılması');
content = content.replace(/Faz 1: vücudun temizlenmesi/g, 'Faz 1: Vücudun Temizlenmesi');

// 2. FOOD CARD CAPITALIZATION (Inside div and span)
// Matches <div class="food-name">word... and <span>[a-z] after <td> or <li>
content = content.replace(/(class="food-name">)([a-zğüşıöç])/gi, (match, p1, p2) => p1 + p2.toUpperCase());
content = content.replace(/(<div class="stat-label">)([a-zğüşıöç])/gi, (match, p1, p2) => p1 + p2.toUpperCase());
content = content.replace(/(<div class="image-caption">)([a-zğüşıöç])/gi, (match, p1, p2) => p1 + p2.toUpperCase());

// 3. REDUNDANT PARENTHESES & TYPOS
content = content.replace(/bulgur veya bulgur \(bulgur\) pilavı/g, 'pirinç yerine bulgur veya karabuğday pilavı');
content = content.replace(/Tarif: bulgur \(Grecka\) Pilavı/g, 'Tarif: Karabuğday (Greçka) Pilavı');
content = content.replace(/1 su bardağı bulguru/g, '1 su bardağı karabuğdayı (veya bulguru)');
content = content.replace(/genlerin çalışma şekli \(genlerin çalışma şekli\)/g, 'genlerin çalışma şekli (epigenetik)');
content = content.replace(/oksidatif stres\)in/g, 'oksidatif stresin');
content = content.replace(/oksidatif stres\)e/g, 'oksidatif stresine');
content = content.replace(/bozulmasıuna/g, 'bozulmasına');
content = content.replace(/tutunmasıu/g, 'tutunmasını');
content = content.replace(/bileiklerinden/g, 'bileşiklerinden');
content = content.replace(/muhafaza edilmeli/g, 'saklanmalı');
content = content.replace(/kimyasal Optimizasyonu/g, 'Hücresel Optimizasyon');

// 4. MALE FACTOR (REPEATED FROM PREVIOUS ATTEMPT)
content = content.replace(/Erkek Faktoru: babaya ait Beslenme/g, 'Erkek Faktörü: Babaya Ait Beslenme');
content = content.replace(/Erkek Faktörü: babaya ait Beslenme/g, 'Erkek Faktörü: Babaya Ait Beslenme');

// 5. BULLET LIST SENTENCE STARTS
content = content.replace(/(<li>)([^<]*?)([a-zğüşıöç])([^<]*?)(<\/li>)/gi, (match, open, before, first, after, close) => {
    if (before.trim() === '') return open + first.toUpperCase() + after + close;
    return match;
});

// 6. SPECIFIC CASE: "mevsim balığı" -> "Mevsim Balığı"
content = content.replace(/>mevsim balığı/gi, '>Mevsim balığı');
content = content.replace(/>bulgur/gi, '>Bulgur');
content = content.replace(/>nohut/gi, '>Nohut');
content = content.replace(/>mercimek/gi, '>Mercimek');
content = content.replace(/>zeytinyağı/gi, '>Zeytinyağı');

fs.writeFileSync(path, content, 'utf8');
console.log('Master cleaning complete: Grammar, casing, and redundancies fixed.');
