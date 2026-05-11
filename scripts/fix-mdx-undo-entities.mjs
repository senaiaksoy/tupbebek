#!/usr/bin/env node
// Undo all &gt; and &lt; introduced by previous script (they over-escaped HTML/JSX tags).
// We'll handle the few real "<%80" cases with manual edits instead.
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
	if (!/&(lt|gt);/.test(body)) continue;
	body = body.replace(/&gt;/g, '>').replace(/&lt;/g, '<');
	const out = fm + body;
	fs.writeFileSync(filePath, hasBom ? '﻿' + out : out, 'utf-8');
	touched++;
	console.log(`  Reverted: ${file}`);
}
console.log(`Touched ${touched} files.`);
