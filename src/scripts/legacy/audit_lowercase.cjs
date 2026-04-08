const fs = require('fs');
const path = 'd:/A-klasör/tupbebek/public/e-kitap/tup-bebek-beslenme-plani.html';
const content = fs.readFileSync(path, 'utf8');

// Identify <td> or <li> that start with lowercase
const cellMatches = content.match(/<(td|li)[^>]*>\s*[a-zğüşıöç]/g) || [];
const sentenceMatches = content.match(/[.!?]\s+[a-zğüşıöç]/g) || [];

console.log(`Found ${cellMatches.length} lowercase table/list starts.`);
console.log(`Found ${sentenceMatches.length} lowercase sentence starts.`);

if (cellMatches.length > 0) {
  console.log('Examples of lowercase cells:');
  console.log(cellMatches.slice(0, 5).join('\n'));
}

if (sentenceMatches.length > 0) {
  console.log('Examples of lowercase sentences:');
  console.log(sentenceMatches.slice(0, 5).join('\n'));
}
