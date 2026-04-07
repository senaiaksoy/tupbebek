const fs = require('fs');
const path = 'd:/A-klasör/tupbebek/public/e-kitap/tup-bebek-beslenme-plani.html';
let content = fs.readFileSync(path, 'utf8');

// Capitalize first letter of text inside <td>
// This targets cells like <td>yulaf ezmesi...</td> and turns them into <td>Yulaf ezmesi...</td>
content = content.replace(/(<td>)(\s*)([a-zğüşıöç])/gi, (match, p1, p2, p3) => {
    return p1 + p2 + p3.toUpperCase();
});

// Also fix specific common lowercase words inside the cell text if they start a sentence/fragment
content = content.replace(/pişmiş sıcak elma/g, 'Pişmiş sıcak elma');
content = content.replace(/havuc sote/g, 'havuç sote');
content = content.replace(/yumuşak ve sulu/g, 'Yumuşak ve sulu');

fs.writeFileSync(path, content, 'utf8');
console.log('Meal tables finalized: All items capitalized.');
