const fs = require('fs');
const path = 'd:/A-klasör/tupbebek/public/e-kitap/tup-bebek-beslenme-plani.html';
let content = fs.readFileSync(path, 'utf8');

// 1. Sentence-start capitalization (after . ! ?)
// Matches patterns like ". word" or "! word" where 'word' starts with lowercase
content = content.replace(/([.!?]\s+)([a-zğüşıöç])/g, (match, p1, p2) => {
    return p1 + p2.toUpperCase();
});

// 2. Table cell start capitalization
// Matches <td> and <li> content that starts with lowercase
content = content.replace(/(<td>|<\/th>|<\/th>\s+<td>|<li>)([^<]*?)([a-zğüşıöç])([^<]*?)(<\/td>|<\/li>)/gi, (match, openTag, textBefore, firstChar, textAfter, closeTag) => {
    // Only capitalize if it's the very first letter of the content
    if (textBefore.trim() === '') {
        return openTag + textBefore + firstChar.toUpperCase() + textAfter + closeTag;
    }
    return match;
});

// 3. Specific leftover lowercase issues
const manualFixes = [
  [/ilik/gi, 'Ilık'],
  [/sicakliginda/gi, 'sıcaklığında'],
  [/pilavi/gi, 'pilavı'],
  [/bulguru/gi, 'bulguru'],
  [/yogurt/gi, 'Yoğurt'],
  [/ceviz/gi, 'Ceviz'],
  [/elma/gi, 'Elma'],
  [/meyve/gi, 'Meyve'],
  [/sebze/gi, 'Sebze'],
  [/ev yapımı ayran/gi, 'Ev yapımı ayran']
];

// Ensure "Yoğurtlu meyve kasesi" start with capital Y in table cells
content = content.replace(/>yoğurt/gi, '>Yoğurt');
content = content.replace(/>ılık/gi, '>Ilık');
content = content.replace(/>zeytinyağlı/gi, '>Zeytinyağlı');
content = content.replace(/>ızgara/gi, '>Izgara');
content = content.replace(/>fırın/gi, '>Fırın');

fs.writeFileSync(path, content, 'utf8');
console.log('Automated sentence-start and list capitalization applied.');
