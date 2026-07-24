const fs = require('fs');
const path = require('path');
const filePath = path.join(process.cwd(), 'src/content/articles/alkol-ve-fertilite.mdx');
const content = fs.readFileSync(filePath, 'utf8');
const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/u);
if (!match) { console.log('No frontmatter'); process.exit(1); }
const frontmatter = match[1];
console.log('Frontmatter extracted, length:', frontmatter.length);
function readReferenceBlocks(frontmatter) {
  const lines = frontmatter.split(/\r?\n/u);
  console.log('Lines:');
  lines.forEach((line, i) => {
    console.log(`${i}: ${JSON.stringify(line)}`);
  });
  const start = lines.findIndex((line) => /^references:\s*$/u.test(line));
  console.log('start index:', start);
  if (start === -1) return [];
  const blockLines = [];
  const matchIndent = lines[start].match(/^(\s*)/);
  const baseIndent = matchIndent[1].length;
  console.log('baseIndent:', baseIndent);
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    const leadingSpaces = line.search(/\S/);
    console.log(`Line ${i}: leadingSpaces=${leadingSpaces}, line=${JSON.stringify(line)}`);
    if (leadingSpaces === -1) {
      blockLines.push(line);
      continue;
    }
    if (leadingSpaces <= baseIndent) {
      console.log(`Break at line ${i} because leadingSpaces (${leadingSpaces}) <= baseIndent (${baseIndent})`);
      break;
    }
    blockLines.push(line);
  }
  console.log('blockLines length:', blockLines.length);
  const joined = blockLines.join('\n');
  console.log('Joined block (first 300 chars):', JSON.stringify(joined.substring(0, 300)));
  const parts = joined.split(/^-\s*title:\s*/mu);
  console.log('Number of parts after split:', parts.length);
  const result = parts.slice(1).map((block) => block.trim()).filter(Boolean);
  console.log('Number of result blocks:', result.length);
  result.forEach((block, idx) => {
    console.log(`Result ${idx}:`, JSON.stringify(block.substring(0, 200)));
  });
  return result;
}
const blocks = readReferenceBlocks(frontmatter);
console.log('Final blocks count:', blocks.length);
