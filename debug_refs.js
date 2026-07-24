const fs = require('fs');
const path = require('path');

function readReferenceBlocks(frontmatter) {
  console.log('Input frontmatter (first 200 chars):', JSON.stringify(frontmatter.substring(0, 200)));
  const lines = frontmatter.split(/\r?\n/u);
  console.log('Number of lines:', lines.length);
  const start = lines.findIndex((line) => /^references:\s*$/u.test(line));
  console.log('Start index:', start);
  if (start === -1) {
    console.log('No references line found');
    return [];
  }
  console.log('Line at start:', JSON.stringify(lines[start]));
  // Get the indentation of the 'references:' line
  const match = lines[start].match(/^(\s*)/);
  const baseIndent = match[1].length;
  console.log('Base indent:', baseIndent);

  const blockLines = [];
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    const leadingSpaces = line.search(/\S/);
    console.log(`Line ${i}: leadingSpaces=${leadingSpaces}, line=${JSON.stringify(line)}`);
    if (leadingSpaces === -1) {
      // empty line (only whitespace)
      blockLines.push(line);
      console.log('  -> empty line, pushed');
      continue;
    }
    if (leadingSpaces <= baseIndent) {
      // We've reached a line that is not indented more than the base: end of block
      console.log(`  -> leadingSpaces (${leadingSpaces}) <= baseIndent (${baseIndent}), break`);
      break;
    }
    blockLines.push(line);
    console.log('  -> pushed line');
  }

  console.log('blockLines length:', blockLines.length);
  const joined = blockLines.join('\n');
  console.log('Joined block (first 200 chars):', JSON.stringify(joined.substring(0, 200)));
  const parts = joined.split(/^-\s*title:\s*/mu);
  console.log('Number of parts after split:', parts.length);
  const result = parts.slice(1).map((block) => block.trim()).filter(Boolean);
  console.log('Number of result blocks:', result.length);
  result.forEach((block, idx) => {
    console.log(`Result block ${idx}:`, JSON.stringify(block.substring(0, 100)));
  });
  return result;
}

const filePath = path.join(process.cwd(), 'src/content/articles/alkol-ve-fertilite.mdx');
const content = fs.readFileSync(filePath, 'utf8');
const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/u);
if (!match) {
  console.log('No frontmatter');
  process.exit(1);
}
const frontmatter = match[1];
console.log('Frontmatter length:', frontmatter.length);
const blocks = readReferenceBlocks(frontmatter);
console.log('Final blocks:', blocks.length);
