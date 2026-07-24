import fs from 'node:fs';
const src = fs.readFileSync('src/content/articles/erkek-dogurganlik-besin-takviyeleri.mdx', 'utf8');
const body = src.split(/^---$/m).slice(2).join('---')
  .replace(/import .+/g, '')
  .replace(/export const[\s\S]*$/m, '')
  .replace(/<script[\s\S]*?<\/script>/g, '')
  .replace(/<[^>]+>/g, ' ');
const words = body.split(/\s+/).filter((w) => /[A-Za-zÀ-ÿĞğÜüŞşİıÖöÇç0-9]/.test(w));
console.log('words', words.length);
console.log('has_dup_card', src.includes('EvidenceGradeCard'));
console.log('cochrane2022', src.includes('35506389') && src.includes('year: 2022'));
