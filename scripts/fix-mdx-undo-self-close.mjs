#!/usr/bin/env node
// Undo the over-aggressive ">%" escape that broke JSX self-closing tags.
// Replace "/&gt;" back to "/>" everywhere in .mdx body.
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
	if (!/\/&gt;/.test(content)) continue;
	const fixed = content.replace(/\/&gt;/g, '/>');
	fs.writeFileSync(filePath, hasBom ? '﻿' + fixed : fixed, 'utf-8');
	touched++;
	console.log(`  Fixed: ${file}`);
}
console.log(`Touched ${touched} files.`);
