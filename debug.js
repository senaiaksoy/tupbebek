const fs = require('fs');
const path = require('path');
const filePath = path.join(process.cwd(), 'src/content/articles/alkol-ve-fertilite.mdx');
const content = fs.readFileSync(filePath, 'utf8');
const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/u);
if (!match) { console.log('No frontmatter'); process.exit(1); }
const frontmatter = match[1];
console.log('Frontmatter length:', frontmatter.length);
console.log('First 200 chars:', JSON.stringify(frontmatter.substring(0, 200)));
// Now replicate the function from the script
function readReferenceBlocks(frontmatter) {
  console.log('Inside readReferenceBlocks');
  const lines = frontmatter.split(/\r?\n/u);
  console.log('Lines count:', lines.length);
  const start = lines.findIndex((line) => /^references:\s*$/u.test(line));
  console.log('start index:', start);
  if (start === -1) return [];

  const blockLines = [];
  // Get the indentation of the 'references:' line
  const match = lines[start].match(/^(\s*)/);
  const baseIndent = match[1].length;
  console.log('baseIndent:', baseIndent);

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
  console.log('joined length:', joined.length);
  console.log('joined first 200 chars:', JSON.stringify(joined.substring(0, 200)));
  const parts = joined.split(/^-\s*title:\s*/mu);
  console.log('parts length:', parts.length);
  const result = parts.slice(1).map((block) => block.trim()).filter(Boolean);
  console.log('result length:', result.length);
  return result;
}
const blocks = readReferenceBlocks(frontmatter);
console.log('Blocks returned:', blocks);
console.log('Number of blocks:', blocks.length);
