#!/usr/bin/env node
// Surgically escape "<" only when it's NOT followed by a JSX/HTML tag opener.
// Tag openers: letter, "/", "$", "_". Anything else → escape "<" to "&lt;".
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
	const fmMatch = content.match(/^(---\r?\n[\s\S]*?\r?\n---\r?\n)([\s\S]*)$/);
	if (!fmMatch) continue;
	const fm = fmMatch[1];
	let body = fmMatch[2];
	const original = body;
	// Only escape "<" if NOT followed by: a-zA-Z, "/", "$", "_", "!" (which we handled with comment fix)
	body = body.replace(/<(?![a-zA-Z/$_!])/g, '&lt;');
	if (body === original) continue;
	const out = fm + body;
	fs.writeFileSync(filePath, hasBom ? '﻿' + out : out, 'utf-8');
	touched++;
	console.log(`  Fixed: ${file}`);
}
console.log(`Touched ${touched} files.`);
