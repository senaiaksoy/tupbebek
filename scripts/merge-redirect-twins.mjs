#!/usr/bin/env node
// Merge slash+no-slash twin redirects into a single splat wildcard.
//   /X        /target  301
//   /X/       /target  301
// becomes:
//   /X*       /target  301
//
// This roughly halves the rule count and keeps the 404-rescue intent (any path
// starting with /X — with or without trailing slash, with or without subpath —
// goes to /target).
import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve('./public/_redirects');
const original = fs.readFileSync(file, 'utf-8');
const lines = original.split(/\r?\n/);

// Parse rules
const ruleLineIndex = new Map(); // key: `${source}` -> line index
const parsed = lines.map((line, idx) => {
	const m = line.trim().match(/^(\S+)(\s+)(\S+)(\s+)(\d{3})\s*$/);
	if (m && !line.startsWith('#') && m[1].startsWith('/')) {
		ruleLineIndex.set(m[1], idx);
		return { idx, source: m[1], sp1: m[2], target: m[3], sp2: m[4], code: m[5], original: line };
	}
	return null;
});

const toDelete = new Set();
const toReplace = new Map(); // idx -> new line

let merged = 0;
for (const rule of parsed) {
	if (!rule) continue;
	if (rule.source.endsWith('/')) continue; // we only process the no-slash form
	if (rule.source.endsWith('*')) continue;
	const slashTwin = rule.source + '/';
	const twin = parsed[ruleLineIndex.get(slashTwin)];
	if (!twin) continue;
	if (twin.target !== rule.target) continue;
	if (twin.code !== rule.code) continue;

	// Merge — keep the no-slash line as wildcard, delete the slash twin
	const newSource = rule.source + '*';
	toReplace.set(rule.idx, `${newSource}${rule.sp1}${rule.target}${rule.sp2}${rule.code}`);
	toDelete.add(twin.idx);
	merged++;
}

const out = lines
	.map((line, idx) => toReplace.has(idx) ? toReplace.get(idx) : line)
	.filter((_, idx) => !toDelete.has(idx));

fs.writeFileSync(file, out.join('\n'), 'utf-8');

const totalRules = out.filter(l => /^\//.test(l.trim())).length;
console.log(`Merged ${merged} twin pairs into splat wildcards.`);
console.log(`Remaining rule count: ${totalRules}`);
