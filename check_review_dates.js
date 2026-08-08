const fs = require('fs');
const path = require('path');

function getFrontmatterDates(dir) {
  const results = [];
  function scan(d) {
    if (!fs.existsSync(d)) return;
    const entries = fs.readdirSync(d, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) {
        scan(full);
      } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
        const content = fs.readFileSync(full, 'utf8');
        const match = content.match(/reviewDate:\s*['"]?(\d{4}-\d{2}-\d{2})['"]?/);
        const titleMatch = content.match(/title:\s*['"]?(.*?)['"]?\r?\n/);
        if (match) {
          results.push({
            file: path.relative('d:/A-klasör', full),
            reviewDate: match[1],
            title: titleMatch ? titleMatch[1].trim() : ''
          });
        }
      }
    }
  }
  scan(dir);
  return results;
}

console.log('=== TUPBEBEK ===');
const tb = getFrontmatterDates('d:/A-klasör/tupbebek/src/content/articles');
tb.sort((a, b) => a.reviewDate.localeCompare(b.reviewDate));
console.log('Oldest 10 in Tupbebek:');
tb.slice(0, 10).forEach(x => console.log(`${x.reviewDate} | ${x.title} | ${x.file}`));

console.log('\n=== DRAKSOYIVF ===');
const dr = getFrontmatterDates('d:/A-klasör/draksoyivf/src/content');
dr.sort((a, b) => a.reviewDate.localeCompare(b.reviewDate));
console.log('Oldest 10 in Draksoyivf:');
dr.slice(0, 10).forEach(x => console.log(`${x.reviewDate} | ${x.title} | ${x.file}`));
