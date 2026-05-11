#!/usr/bin/env node
// For every line in _redirects whose source URL ends with "/", add a no-slash
// twin so Cloudflare Pages exact-match also catches the legacy URLs Google
// has been crawling (which usually omit the trailing slash on /blog/*).
//
// Skip comments, blank lines, lines that are wildcards (already terminate
// in /*), and lines whose no-slash twin already exists.
import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve('./public/_redirects');
const original = fs.readFileSync(file, 'utf-8');
const lines = original.split(/\r?\n/);

const existingSources = new Set();
for (const line of lines) {
	const trimmed = line.trim();
	if (!trimmed || trimmed.startsWith('#')) continue;
	const m = trimmed.match(/^(\S+)\s+\S+\s+\d{3}\s*$/);
	if (m) existingSources.add(m[1]);
}

const out = [];
let added = 0;
for (const line of lines) {
	out.push(line);
	const trimmed = line.trim();
	if (!trimmed || trimmed.startsWith('#')) continue;
	const m = trimmed.match(/^(\S+)(\s+)(\S+)(\s+)(\d{3})\s*$/);
	if (!m) continue;
	const [, source, sp1, target, sp2, code] = m;
	// Only act on sources that end with "/" and aren't wildcards
	if (!source.endsWith('/') || source.endsWith('/*')) continue;
	// Don't add twin if source is just "/"
	if (source === '/') continue;
	const noSlash = source.replace(/\/$/, '');
	if (existingSources.has(noSlash)) continue;
	// Build a properly-aligned twin line (use same target/code spacing as original)
	const twin = `${noSlash}${sp1}${target}${sp2}${code}`;
	out.push(twin);
	existingSources.add(noSlash);
	added++;
}

if (added > 0) {
	fs.writeFileSync(file, out.join('\n'), 'utf-8');
}
console.log(`Added ${added} no-slash twin redirects.`);
