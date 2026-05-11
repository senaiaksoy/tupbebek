#!/usr/bin/env node
/**
 * Batch update author/reviewer attribution on all articles whose author is
 * currently "tupbebek.com Yayın Kurulu". Promotes to Doç. Dr. Senai Aksoy
 * as the named clinician and sets reviewer to the Tıbbi Danışma Kurulu.
 *
 * Run: node scripts/update-author-attribution.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ARTICLES_DIR = path.resolve('./src/content/articles');
const TODAY = '2026-05-11';

const NEW_AUTHOR = 'Doç. Dr. Senai Aksoy';
const NEW_AUTHOR_TITLE = 'Kadın Hastalıkları ve Doğum Uzmanı';
const NEW_AUTHOR_CREDENTIALS = 'Üreme Tıbbı ve Yardımcı Üreme Teknikleri';
const NEW_AUTHOR_YOUTUBE = 'https://www.youtube.com/@DocentDrSenaiAksoy';
const NEW_REVIEWER = 'tupbebek.com Tıbbi Danışma Kurulu';
const NEW_REVIEWER_TITLE = 'Tıbbi Danışma Kurulu';

function updateFrontmatter(content, fileName) {
	// Strip UTF-8 BOM if present (handled separately, preserved in output)
	const hasBom = content.charCodeAt(0) === 0xfeff;
	const body = hasBom ? content.slice(1) : content;

	// Frontmatter pattern: starts with ---, ends with --- (CRLF or LF tolerant)
	const fmMatch = body.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
	if (!fmMatch) {
		return { content, changed: false, reason: 'no-frontmatter' };
	}

	const original = fmMatch[1];
	let fm = original;

	// Only update if currently board-author
	if (!/author:\s*"tupbebek\.com Yayın Kurulu"/.test(fm)) {
		return { content, changed: false, reason: 'not-board-author' };
	}

	// Replace author
	fm = fm.replace(/author:\s*"tupbebek\.com Yayın Kurulu"/, `author: "${NEW_AUTHOR}"`);

	// Replace authorTitle
	if (/authorTitle:\s*"[^"]*"/.test(fm)) {
		fm = fm.replace(/authorTitle:\s*"[^"]*"/, `authorTitle: "${NEW_AUTHOR_TITLE}"`);
	} else {
		// Insert after author
		fm = fm.replace(/(author:\s*"[^"]*")/, `$1\nauthorTitle: "${NEW_AUTHOR_TITLE}"`);
	}

	// Replace authorCredentials
	if (/authorCredentials:\s*"[^"]*"/.test(fm)) {
		fm = fm.replace(/authorCredentials:\s*"[^"]*"/, `authorCredentials: "${NEW_AUTHOR_CREDENTIALS}"`);
	} else {
		fm = fm.replace(/(authorTitle:\s*"[^"]*")/, `$1\nauthorCredentials: "${NEW_AUTHOR_CREDENTIALS}"`);
	}

	// Add authorYoutube if missing
	if (!/authorYoutube:/.test(fm)) {
		fm = fm.replace(/(authorCredentials:\s*"[^"]*")/, `$1\nauthorYoutube: "${NEW_AUTHOR_YOUTUBE}"`);
	}

	// Standardize medicalReviewer (set to board)
	if (/medicalReviewer:\s*"[^"]*"/.test(fm)) {
		fm = fm.replace(/medicalReviewer:\s*"[^"]*"/, `medicalReviewer: "${NEW_REVIEWER}"`);
	}

	// Standardize reviewerTitle
	if (/reviewerTitle:\s*"[^"]*"/.test(fm)) {
		fm = fm.replace(/reviewerTitle:\s*"[^"]*"/, `reviewerTitle: "${NEW_REVIEWER_TITLE}"`);
	}

	// Update lastModified to today
	if (/lastModified:\s*[\d-]+/.test(fm)) {
		fm = fm.replace(/lastModified:\s*[\d-]+/, `lastModified: ${TODAY}`);
	}

	if (fm === original) {
		return { content, changed: false, reason: 'no-change-after-update' };
	}

	const newBody = body.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, `---\n${fm}\n---\n`);
	const newContent = hasBom ? '﻿' + newBody : newBody;
	return { content: newContent, changed: true };
}

const files = fs.readdirSync(ARTICLES_DIR).filter((f) => /\.(md|mdx)$/.test(f));
let updated = 0;
let skipped = 0;
const updatedList = [];

for (const file of files) {
	const filePath = path.join(ARTICLES_DIR, file);
	const content = fs.readFileSync(filePath, 'utf-8');
	const result = updateFrontmatter(content, file);
	if (result.changed) {
		fs.writeFileSync(filePath, result.content, 'utf-8');
		updated++;
		updatedList.push(file);
	} else {
		skipped++;
	}
}

console.log(`Updated ${updated} articles; skipped ${skipped}.`);
console.log('Updated files:');
for (const f of updatedList) console.log('  -', f);
