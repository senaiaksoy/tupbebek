#!/usr/bin/env node
/**
 * Batch roll-out: add HizliCevap callout to all published articles that lack it.
 *
 * Strategy:
 *   1. Read all articles in src/content/articles/
 *   2. Skip if already has HizliCevap component import
 *   3. Skip if status: draft
 *   4. For .md files: convert to .mdx (rename, then add imports + callout)
 *   5. For .mdx files: just inject imports + callout if missing
 *   6. Baseline question = title (with "?" appended if missing)
 *   7. Baseline answer = description
 *
 * Writes MANUAL-REVIEW.md with the list of articles needing editorial review.
 *
 * Run: node scripts/rollout-hizli-cevap.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ARTICLES_DIR = path.resolve('./src/content/articles');
const REVIEW_FILE = path.resolve('./reports/HIZLICEVAP-MANUAL-REVIEW.md');

function readFile(p) {
	const buf = fs.readFileSync(p);
	const hasBom = buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf;
	const content = buf.toString('utf-8').replace(/^﻿/, '');
	return { content, hasBom };
}

function writeFile(p, content, hasBom) {
	const out = hasBom ? '﻿' + content : content;
	fs.writeFileSync(p, out, 'utf-8');
}

function parseFrontmatter(content) {
	const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
	if (!m) return null;
	return { raw: m[1], body: m[2], fullMatch: m[0] };
}

function extractField(fmRaw, field) {
	// Handles both `field: "value"` and `field: value` single-line forms
	const re = new RegExp(`^${field}:\\s*("([^"]*)"|([^\\n]*))$`, 'm');
	const m = fmRaw.match(re);
	if (!m) return null;
	return (m[2] !== undefined ? m[2] : m[3]).trim();
}

function isDraft(fmRaw) {
	const status = extractField(fmRaw, 'status');
	return status === 'draft';
}

function hasHizliCevap(body) {
	return /import\s+HizliCevap\s+from/.test(body) || /<HizliCevap/.test(body);
}

function buildQuestion(title) {
	const t = title.trim();
	// If title already ends in ?, use as-is
	if (t.endsWith('?')) return t;
	// If title contains a colon (X: Y format), use part before colon and add "nedir?"
	if (t.includes(':')) {
		const main = t.split(':')[0].trim();
		return `${main} nedir, nasıl yönetilir?`;
	}
	return `${t} hakkında bilmeniz gerekenler nelerdir?`;
}

function buildAnswer(description) {
	return description.trim();
}

function buildCalloutBlock(question, answer) {
	return `<HizliCevap question="${question.replace(/"/g, '\\"')}">
${answer}
</HizliCevap>

`;
}

function buildImports(hasInlineEvidenceAlready) {
	const imports = [];
	imports.push("import HizliCevap from '../../components/HizliCevap.astro';");
	if (!hasInlineEvidenceAlready) {
		// We do not auto-add InlineEvidence import for the rollout — only add it if needed in future manual edits.
	}
	return imports.join('\n') + '\n\n';
}

function processArticle(filePath) {
	const ext = path.extname(filePath);
	const baseName = path.basename(filePath, ext);
	const isMd = ext === '.md';
	const isMdx = ext === '.mdx';

	const { content, hasBom } = readFile(filePath);
	const fm = parseFrontmatter(content);
	if (!fm) return { skipped: 'no-frontmatter', file: baseName };

	if (isDraft(fm.raw)) return { skipped: 'draft', file: baseName };
	if (hasHizliCevap(fm.body)) return { skipped: 'already-has-hizlicevap', file: baseName };

	const title = extractField(fm.raw, 'title');
	const description = extractField(fm.raw, 'description');
	if (!title || !description) return { skipped: 'no-title-or-description', file: baseName };

	const question = buildQuestion(title);
	const answer = buildAnswer(description);
	const callout = buildCalloutBlock(question, answer);
	const imports = buildImports(/<InlineEvidence/.test(fm.body) || /import\s+InlineEvidence/.test(fm.body));

	// Body: prepend imports + callout
	let newBody = imports + callout + fm.body.replace(/^\s+/, '');

	const newFullContent = `---\n${fm.raw}\n---\n\n${newBody}`;

	// If .md → write to new .mdx path and delete the .md
	if (isMd) {
		const newPath = filePath.replace(/\.md$/, '.mdx');
		writeFile(newPath, newFullContent, hasBom);
		fs.unlinkSync(filePath);
		return { converted: true, file: baseName, action: 'md->mdx' };
	} else {
		writeFile(filePath, newFullContent, hasBom);
		return { converted: true, file: baseName, action: 'mdx-injected' };
	}
}

// Main
const files = fs.readdirSync(ARTICLES_DIR).filter((f) => /\.(md|mdx)$/.test(f));
const stats = { processed: 0, skipped: {}, converted: [] };

for (const file of files) {
	const filePath = path.join(ARTICLES_DIR, file);
	const result = processArticle(filePath);
	stats.processed++;

	if (result.skipped) {
		stats.skipped[result.skipped] = (stats.skipped[result.skipped] || 0) + 1;
	} else {
		stats.converted.push({ file: result.file, action: result.action });
	}
}

console.log(`Processed ${stats.processed} articles.`);
console.log(`Converted: ${stats.converted.length}`);
console.log(`Skipped:`, stats.skipped);
console.log('');
console.log('Converted articles:');
for (const c of stats.converted) console.log(`  - [${c.action}] ${c.file}`);

// Write manual review queue
const reviewLines = [
	`# HızlıCevap Manuel İnceleme Kuyruğu`,
	``,
	`Bu makaleler **otomatik baseline HızlıCevap callout** ile rollout edildi (${new Date().toISOString().split('T')[0]}).`,
	``,
	`Her callout, makalenin **title**'ını soru ve **description**'ını cevap olarak kullanıyor. Klinik doğruluk ve AI citation kalitesi için manuel iyileştirme önerilir:`,
	``,
	`- Klinisyenden onaylı 2-3 cümlelik cevap`,
	`- Sayısal veri (yaş, oran, eşik) eklemek`,
	`- Aksiyon önerisi`,
	``,
	`## Otomatik Roll-out Yapılan Makaleler (${stats.converted.length})`,
	``,
];
for (const c of stats.converted) {
	reviewLines.push(`- [ ] [${c.file}](src/content/articles/${c.file}.mdx)`);
}
reviewLines.push('', `## Önceden Manuel Yazılmış HızlıCevap (Skip edildi)`, '');
reviewLines.push('Bu 8 cornerstone makalede zaten editöryal HızlıCevap mevcut:');
reviewLines.push('');
reviewLines.push('- adet-duzensizligi-pcos');
reviewLines.push('- azospermi-mikro-tese');
reviewLines.push('- beta-hcg-testi');
reviewLines.push('- yumurtalik-kistleri-dogurganlik');
reviewLines.push('- asherman-sendromu');
reviewLines.push('- akraba-evliligi');
reviewLines.push('- adet-gorememe');
reviewLines.push('- alkol-ve-fertilite');
reviewLines.push('');
reviewLines.push(`## Draft Olduğu İçin Skip Edilen (${stats.skipped.draft || 0})`);
reviewLines.push('');
reviewLines.push('Bu makaleler `status: draft` olduğu için işleme alınmadı; sitemap dışında.');

fs.writeFileSync(REVIEW_FILE, reviewLines.join('\n'), 'utf-8');
console.log('');
console.log(`Manual review queue: ${REVIEW_FILE}`);
