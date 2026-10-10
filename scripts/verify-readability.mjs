#!/usr/bin/env node
// Okunabilirlik raporu (Türkçe): Bezirci–Yılmaz sınıf düzeyi, Ateşman puanı, cümle uzunluğu,
// açıklanması gereken araştırma terimleri ve "kanıt kutusu" ihtiyacı.
// Kullanım: npm run verify:readability -- <slug> [<slug> ...]   |   --all (site özeti)   |   --strict
// Rapor amaçlıdır; --strict verilmedikçe hedef aşımı build'i durdurmaz.
// Kural: AGENTS.md "Okunabilirlik ve kanıt kutusu" bölümü.
import { readFileSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';

const ARTICLES = 'src/content/articles';
const TARGET = {
  bodyNeutral: 12, // Bezirci–Yılmaz, hastalık/ilaç adları nötrlenmiş gövde
  summaryNeutral: 12, // ilk ekran özeti
  sectionNeutral: 14, // tek bölüm
  minAvgWords: 10, // stil rehberi: ortalama 10–16 kelime (2026-10-10 kararı)
  maxAvgWords: 16,
  longSentence: 25,
  citationsPerParagraphOutsideBox: 3, // aynı paragrafta/maddede arka arkaya sıralanan çalışma
};
// Konunun kaçınılmaz uzun adları: formül 6+ heceli kelimeyi ağır cezalandırdığı için ayrıca nötr puan verilir.
const NEUTRAL_STEMS = /^(adenomyoz|adenomiyoz|adenomyom|endometrioz|endometriom|hiperprolaktinemi|histeroskopi|laparoskopi|mikroenjeksiyon|hidrosalpin|levonorgestrel|gonadotropin|oligozoospermi|asthenozoospermi|teratozoospermi|azospermi|hipotiroidi|hipertiroidi|preimplantasyon|kriyoprezervasyon)/i;
// İlk geçişte sade açıklama isteyen araştırma terimleri.
const JARGON = ['meta-analiz', 'randomize', 'kohort', 'retrospektif', 'prospektif', 'geriye dönük', 'ağ meta-analiz',
  'anlamlı fark', 'istatistiksel', 'odds', 'güven aralığı', 'insidans', 'prevalans', 'heterojen', 'klinik gebelik',
  'canlı doğum', 'implantasyon', 'tutunma oranı', 'devam eden gebelik', 'protokol', 'plasebo', 'kontrol grubu'];

const VOWELS = /[aeıioöuüâîûAEIİOÖUÜÂÎÛ]/g;
const syl = (w) => Math.max(1, (w.match(VOWELS) || []).length);
const WORD = /[\p{L}0-9%][\p{L}0-9’'%,\-]*/gu;

function clean(s) {
  return s
    .replace(/^import .*$/gm, ' ')
    // Tablolar karşılaştırma için önerilen biçimdir; cümle gibi puanlanmaz.
    .replace(/^\s*\|.*\|\s*$/gm, '\n')
    // Noktasız liste maddesi kendi başına bir cümledir.
    .replace(/^(\s*(?:[-*]|\d+\.)\s+.*?)[,;]?\s*$/gm, (m, item) => (/[.!?:]$/.test(item) ? item : item + '.') + '\n\n')
    .replace(/<figure[\s\S]*?<\/figure>/g, ' ')
    .replace(/<InlineEvidence[^>]*\/>/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\(\s*(?:[A-ZÇĞİÖŞÜ][\p{L}\-]+(?: ve ark\.)? \d{4}[a-z]?(?:,\s*)?)+\s*\)/gu, ' ')
    .replace(/\(\s*(?:ESHRE|NICE|ACOG|ASRM|WHO|CDC)[^)]*\)/g, ' ')
    .replace(/[*#>|`]/g, ' ')
    .replace(/^[ \t]*(?:[-\d]+\.?)[ \t]+/gm, ' ');
}

function sentences(text) {
  const s = clean(text).replace(/\b(ör|vb|ark|bkz|Dr|Doç|Prof)\./g, '$1§');
  return s
    .split(/(?<=[.!?:])\s+(?=[A-ZÇĞİÖŞÜ“"(%0-9])|\n\s*\n/u)
    .map((p) => p.replace(/§/g, '.').replace(/\s+/g, ' ').trim())
    .map((p) => ({ text: p, words: (p.match(WORD) || []).filter((w) => /\p{L}/u.test(w)) }))
    .filter((x) => x.words.length >= 3);
}

function score(ss, neutral = false) {
  if (!ss.length) return null;
  const words = ss.flatMap((x) => x.words).map((w) => (neutral && NEUTRAL_STEMS.test(w) ? 'hastalık' : w));
  const W = words.length, S = ss.length, sy = words.map(syl), oks = W / S;
  const h = (k) => sy.filter((x) => (k < 6 ? x === k : x >= 6)).length / S;
  return {
    sentences: S, words: W, avgWords: oks,
    by: Math.sqrt(oks * (h(3) * 0.84 + h(4) * 1.5 + h(5) * 3.5 + h(6) * 26.25)),
    atesman: 198.825 - 40.175 * (sy.reduce((a, b) => a + b, 0) / W) - 2.61 * oks,
    long: ss.filter((x) => x.words.length > TARGET.longSentence),
  };
}

function parse(file) {
  const t = readFileSync(file, 'utf8');
  const end = t.indexOf('\n---', 4);
  const fm = t.slice(0, end), body = t.slice(end + 4);
  const summary = (fm.match(/^summary: "(.*)"$/m) || [])[1] || '';
  const expert = (fm.match(/^  text: \|-\n((?: {4}.*\n|\n)+?)  \w/m) || [])[1] || '';
  const faqStart = body.indexOf('<h2 id="faq">');
  let faq = '', editorial = body;
  if (faqStart >= 0) {
    const after = body.slice(faqStart);
    const next = after.slice(5).search(/<h2 id=|<div data-reveal class="mt-12/);
    faq = next >= 0 ? after.slice(0, next + 5) : after;
    editorial = body.slice(0, faqStart) + body.slice(faqStart + faq.length);
  }
  editorial = editorial.replace(/^## İçindekiler[\s\S]*?(?=<div)/m, ' ');
  // "Kanıt kutusu" isteğe bağlı ayrıntı katmanıdır: ayrı ölçülür, gövde hedefine katılmaz.
  const box = [...editorial.matchAll(/<Accordion title="Kanıt kutusu[^"]*">([\s\S]*?)<\/Accordion>/g)].map((m) => m[1]).join('\n\n');
  editorial = editorial.replace(/<Accordion title="Kanıt kutusu[^"]*">[\s\S]*?<\/Accordion>/g, ' ');
  return { body, summary, expert, faq, editorial, box };
}

const fmt = (r) => r ? `BY ${r.by.toFixed(1)} | Ateşman ${r.atesman.toFixed(1)} | ${r.avgWords.toFixed(1)} kel/cümle | 25+: ${r.long.length}` : '—';

function report(slug) {
  const file = join(ARTICLES, `${slug}.mdx`);
  const a = parse(file);
  const warn = [];
  const bodyR = score(sentences(a.editorial)), bodyN = score(sentences(a.editorial), true);
  const sumR = score(sentences(a.summary)), sumN = score(sentences(a.summary), true);
  console.log(`\n# ${slug}`);
  console.log(`  Özet               ${fmt(sumR)} | nötr BY ${sumN?.by.toFixed(1)}`);
  console.log(`  Editoryal gövde    ${fmt(bodyR)} | nötr BY ${bodyN?.by.toFixed(1)}`);
  if (a.faq) console.log(`  Hekim SSS (dokunulmaz)  ${fmt(score(sentences(a.faq)))}`);
  if (a.expert) console.log(`  Uzman kutusu (dokunulmaz) ${fmt(score(sentences(a.expert)))}`);
  if (a.box) console.log(`  Kanıt kutusu (gövde hedefine katılmaz) ${fmt(score(sentences(a.box)))}`);
  if (sumN && sumN.by > TARGET.summaryNeutral) warn.push(`Özet nötr BY ${sumN.by.toFixed(1)} > ${TARGET.summaryNeutral}`);
  if (bodyN && bodyN.by > TARGET.bodyNeutral) warn.push(`Gövde nötr BY ${bodyN.by.toFixed(1)} > ${TARGET.bodyNeutral}`);
  if (bodyR && (bodyR.avgWords < TARGET.minAvgWords || bodyR.avgWords > TARGET.maxAvgWords)) warn.push(`Ortalama cümle ${bodyR.avgWords.toFixed(1)} kelime (hedef ${TARGET.minAvgWords}–${TARGET.maxAvgWords})`);

  console.log('  Bölümler:');
  for (const m of a.body.matchAll(/<h2 id="([^"]+)">([^<]+)<\/h2>([\s\S]*?)(?=<h2 id=|$)/g)) {
    if (m[1] === 'faq') continue;
    const n = score(sentences(m[3]), true);
    if (!n) continue;
    const outside = m[3].replace(/<Accordion[\s\S]*?<\/Accordion>/g, '').replace(/^\s*\|.*\|\s*$/gm, '');
    const cites = Math.max(0, ...outside.split(/\n\s*\n|\n(?=\s*[-\d]+\.?\s)/).map((p) =>
      new Set(p.match(/\]\(https?:\/\/(?:pubmed|doi|www\.nice|academic|www\.cochrane)[^)]*\)/g) || []).size));
    const flag = [n.by > TARGET.sectionNeutral ? 'zor' : '', cites >= TARGET.citationsPerParagraphOutsideBox ? `bir paragrafta ${cites} çalışma → kanıt kutusu?` : ''].filter(Boolean).join(', ');
    console.log(`    ${m[1].padEnd(26)} nötr BY ${n.by.toFixed(1).padStart(5)} | ${n.avgWords.toFixed(1)} kel/cümle${flag ? '  ⚠ ' + flag : ''}`);
    if (cites >= TARGET.citationsPerParagraphOutsideBox) warn.push(`#${m[1]}: bir paragrafta ${cites} çalışma; ayrıntıyı "Kanıt kutusu"na taşı`);
  }
  const plain = clean(a.editorial).toLocaleLowerCase('tr');
  const used = JARGON.filter((j) => plain.includes(j));
  if (used.length) {
    console.log('  Açıklanmalı terimler (ilk geçiş elle kontrol edilir):');
    for (const j of used) {
      const i = plain.indexOf(j);
      const ctx = plain.slice(Math.max(0, i - 50), i + j.length + 70).replace(/\s+/g, ' ');
      const explained = /\(|yani|demektir|denir|adı verilen|anlamına|(?:sı|si|su|sü|ı|i|u|ü)(?:dır|dir|dur|dür)/.test(ctx);
      console.log(`    ${explained ? '✓' : '?'} ${j.padEnd(20)} …${ctx}…`);
    }
  }
  for (const l of bodyR?.long || []) console.log(`  [${l.words.length} kelime] ${l.text.slice(0, 200)}`);
  if (warn.length) { console.log('  Uyarılar:'); warn.forEach((w) => console.log(`    ⚠ ${w}`)); }
  return warn.length;
}

const args = process.argv.slice(2);
const strict = args.includes('--strict');
let slugs = args.filter((x) => !x.startsWith('--'));
if (args.includes('--all') || !slugs.length) {
  const rows = readdirSync(ARTICLES).filter((f) => f.endsWith('.mdx')).map((f) => {
    const a = parse(join(ARTICLES, f));
    return { slug: basename(f, '.mdx'), n: score(sentences(a.editorial), true), s: score(sentences(a.summary), true) };
  }).filter((r) => r.n && r.n.sentences > 20).sort((x, y) => x.n.by - y.n.by);
  const med = (v) => { const s = [...v].sort((a, b) => a - b); return s[Math.floor(s.length / 2)]; };
  console.log(`Site: ${rows.length} makale | gövde nötr BY medyan ${med(rows.map((r) => r.n.by)).toFixed(1)} | hedef ≤ ${TARGET.bodyNeutral}`);
  if (!slugs.length) {
    rows.forEach((r, i) => console.log(`${String(i + 1).padStart(3)}. ${r.slug.padEnd(48)} gövde ${r.n.by.toFixed(1)} | özet ${r.s ? r.s.by.toFixed(1) : '—'}`));
    process.exit(0);
  }
}
const total = slugs.reduce((n, s) => n + report(s), 0);
console.log(`\nOkunabilirlik raporu tamamlandı (${total} uyarı).`);
process.exit(strict && total ? 1 : 0);
