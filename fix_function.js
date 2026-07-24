const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'scripts', 'verify-ai-search-readiness.mjs');
let content = fs.readFileSync(filePath, 'utf8');

// The new function we want to insert
const newFunction = `function readReferenceBlocks(frontmatter) {
  const lines = frontmatter.split(/\\r?\\n/u);
  const start = lines.findIndex((line) => /^references:\\s*$/u.test(line));
  if (start === -1) return [];

  const blockLines = [];
  // Get the indentation of the 'references:' line
  const match = lines[start].match(/^(\\s*)/);
  const baseIndent = match[1].length;

  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    const leadingSpaces = line.search(/\\S/);
    if (leadingSpaces === -1) {
      // empty line (only whitespace)
      blockLines.push(line);
      continue;
    }
    if (leadingSpaces <= baseIndent) {
      // We've reached a line that is not indented more than the base: end of block
      break;
    }
    blockLines.push(line);
  }

  return blockLines
    .join('\\n')
    .split(/^\\s*-\\s+title:\\s*/mu)
    .slice(1)
    .map((block) => block.trim())
    .filter(Boolean);
}`;

// We need to replace the existing function. We'll find the start and end of the function.
// We assume the function is defined exactly as "function readReferenceBlocks(frontmatter) {"
// and ends with a matching closing brace at the same indentation level (which is 0 because it's a top-level function).
// However, there might be nested braces. We'll use a simple approach: find the opening brace and then count until we match the closing brace.

const functionStart = 'function readReferenceBlocks(frontmatter) {';
const startIndex = content.indexOf(functionStart);
if (startIndex === -1) {
  console.error('Function not found');
  process.exit(1);
}

// Now, we need to find the matching closing brace.
let braceCount = 0;
let i = startIndex;
while (i < content.length) {
  const ch = content[i];
  if (ch === '{') {
    braceCount++;
  } else if (ch === '}') {
    braceCount--;
    if (braceCount === 0) {
      // We found the matching closing brace
      const endIndex = i + 1; // include the closing brace
      // Replace the function
      const newContent = content.slice(0, startIndex) + newFunction + content.slice(endIndex);
      fs.writeFileSync(filePath, newContent);
      console.log('Function replaced successfully');
      return;
    }
  }
  i++;
}
console.error('Could not find matching closing brace');
process.exit(1);
