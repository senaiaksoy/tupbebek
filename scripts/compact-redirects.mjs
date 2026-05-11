#!/usr/bin/env node
// Cloudflare Pages free plan limits _redirects to 100 active rules.
// Replace 121 specific /blog/* rules with one wildcard, 15 specific
// /videolar/* with one wildcard, drop absolute https://draksoyivf.com/*
// rules (Cloudflare rejects absolute URLs in _redirects).
import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve('./public/_redirects');
const original = fs.readFileSync(file, 'utf-8');
const lines = original.split(/\r?\n/);

const out = [];
let droppedBlog = 0;
let droppedVideo = 0;
let droppedAbsolute = 0;

for (const line of lines) {
	const trimmed = line.trim();
	if (!trimmed) { out.push(line); continue; }
	if (trimmed.startsWith('#')) { out.push(line); continue; }

	// Drop absolute https:// source URLs (Cloudflare won't parse them)
	if (/^https?:\/\//.test(trimmed)) { droppedAbsolute++; continue; }

	// Drop specific /blog/X or /blog/X/ rules but keep the /blog/* wildcard
	if (/^\/blog\/[a-zA-Z0-9_-][a-zA-Z0-9_/-]*\s/.test(trimmed) && !/^\/blog\/\*/.test(trimmed)) {
		droppedBlog++;
		continue;
	}

	// Drop specific /videolar/X rules but keep the /videolar/* wildcard
	if (/^\/videolar\/[a-zA-Z0-9_-][a-zA-Z0-9_/-]*\s/.test(trimmed) && !/^\/videolar\/\*/.test(trimmed)) {
		droppedVideo++;
		continue;
	}

	out.push(line);
}

fs.writeFileSync(file, out.join('\n'), 'utf-8');
const totalRules = out.filter(l => /^\//.test(l.trim())).length;
console.log(`Dropped: ${droppedAbsolute} absolute URL rules, ${droppedBlog} specific /blog/* rules, ${droppedVideo} specific /videolar/* rules`);
console.log(`Remaining rule count: ${totalRules}`);
