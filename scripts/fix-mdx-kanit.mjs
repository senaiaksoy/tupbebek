#!/usr/bin/env node
// Convert all {{kanit:X}} shortcodes in .mdx files to <InlineEvidence grade="X" /> components.
// Adds InlineEvidence import if missing and if the file uses the shortcode.
// Frontmatter (between --- delimiters) is left untouched.
import fs from 'node:fs';
import path from 'node:path';

const ARTICLES_DIR = path.resolve('./src/content/articles');

const KANIT_RE = /\{\{kanit:([A-Z/]+)\}\}/g;
const IMPORT_LINE = "import InlineEvidence from '../../components/InlineEvidence.astro';";

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

	if (!KANIT_RE.test(body)) continue;
	KANIT_RE.lastIndex = 0;

	// Replace shortcodes
	body = body.replace(KANIT_RE, (_, grade) => `<InlineEvidence grade="${grade}" />`);

	// Add InlineEvidence import if missing
	if (!/import\s+InlineEvidence\s+from/.test(body)) {
		// Find the HizliCevap import line and insert after it; otherwise insert at top of body
		if (/import\s+HizliCevap\s+from[^\n]*\n/.test(body)) {
			body = body.replace(/(import\s+HizliCevap\s+from[^\n]*\n)/, `$1${IMPORT_LINE}\n`);
		} else {
			body = `${IMPORT_LINE}\n\n` + body.replace(/^\s+/, '');
		}
	}

	const out = fm + body;
	fs.writeFileSync(filePath, hasBom ? '﻿' + out : out, 'utf-8');
	touched++;
	console.log(`  Fixed: ${file}`);
}

console.log(`Touched ${touched} files.`);
