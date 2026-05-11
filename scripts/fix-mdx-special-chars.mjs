#!/usr/bin/env node
// Fix MDX-incompatible "<" and ">" usages in body text.
// MDX treats "<" followed by a non-letter as a parse error.
// Common Turkish patterns: <%80, <50, > 1500 — these need HTML entity escaping or spacing.
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

	// Replace "<" followed by digit, %, or whitespace+digit/% with HTML entity.
	// Examples that should be escaped:
	//   <%80 → &lt;%80
	//   <50 → &lt;50
	//   < 50 → &lt; 50
	//   < %20 → &lt; %20
	// Don't touch: <ComponentName, <a href, <b>, etc.
	body = body.replace(/<(\s*(?:%|\d))/g, '&lt;$1');

	// Same for ">" but only in math/comparison context — usually less ambiguous.
	// MDX is mostly OK with ">" as long as it's not part of a tag, but let's be safe.
	// We only escape ">" when followed by whitespace+digit or % (clear math context).
	body = body.replace(/(\s)>(\s*(?:%|\d))/g, '$1&gt;$2');
	body = body.replace(/(^|\W)>(\s*(?:%|\d))/g, (m, pre, post) => {
		// Avoid escaping ">" that follows ">>>" or similar; only single ">" after non-word char
		if (pre.endsWith('>')) return m;
		return `${pre}&gt;${post}`;
	});

	if (body === original) continue;

	const out = fm + body;
	fs.writeFileSync(filePath, hasBom ? '﻿' + out : out, 'utf-8');
	touched++;
	console.log(`  Fixed: ${file}`);
}

console.log(`Touched ${touched} files.`);
