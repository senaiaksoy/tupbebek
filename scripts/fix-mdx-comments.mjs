#!/usr/bin/env node
// Convert HTML comments to MDX-safe form in all .mdx files.
// MDX 2+ rejects HTML comments in the document body; we use JSX comments instead.
// Frontmatter (between --- delimiters) is left untouched.
import fs from 'node:fs';
import path from 'node:path';

const ARTICLES_DIR = path.resolve('./src/content/articles');

const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.mdx'));
let touched = 0;

for (const file of files) {
	const filePath = path.join(ARTICLES_DIR, file);
	const buf = fs.readFileSync(filePath);
	const hasBom = buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf;
	const content = buf.toString('utf-8').replace(/^﻿/, '');

	// Split frontmatter from body
	const fmMatch = content.match(/^(---\r?\n[\s\S]*?\r?\n---\r?\n)([\s\S]*)$/);
	if (!fmMatch) continue;
	const fm = fmMatch[1];
	const body = fmMatch[2];

	if (!/<!--/.test(body)) continue;

	// Replace HTML comments in body: <!-- ... --> → {/* ... */}
	const newBody = body.replace(/<!--([\s\S]*?)-->/g, (_, inner) => `{/*${inner}*/}`);

	const out = fm + newBody;
	fs.writeFileSync(filePath, hasBom ? '﻿' + out : out, 'utf-8');
	touched++;
	console.log(`  Fixed: ${file}`);
}

console.log(`Touched ${touched} files.`);
