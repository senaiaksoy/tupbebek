import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const failures = [];

const attrPattern = /\b(?:href|src)=(["'])(.*?)\1/giu;
const placeholderPattern = /(?:undefined|%\s*7b|\$\{|safeUrl|result\.url|result\.image)/iu;
const malformedTranslatedExternalPattern =
  /^https?:\/\/(?:pmc\.ncbi\.nlm\.nih\.gov|www\.ncbi\.nlm\.nih\.gov|www\.frontiersin\.org)\b.*\/makaleler\//iu;
const cloudflareEmailProtectionPattern = /\/cdn-cgi\/(?:l\/)?email-protection/iu;
const publicEmailPattern = /dr@senaiaksoy\.net/iu;
const publicMailtoPattern = /^mailto:/iu;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function hasUnencodedDoiParentheses(value) {
  return /^https:\/\/doi\.org\/.*[()]/iu.test(value);
}

if (!fs.existsSync(distDir)) {
  failures.push('Missing dist directory. Run npm run build first.');
} else {
  const files = walk(distDir).filter((filePath) => {
    const relativePath = path.relative(rootDir, filePath);
    return /\.(?:html|js)$/iu.test(filePath) && !relativePath.startsWith(`dist${path.sep}pagefind${path.sep}`);
  });

  for (const filePath of files) {
    const text = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(rootDir, filePath);
    for (const match of text.matchAll(attrPattern)) {
      const value = match[2];

      if (placeholderPattern.test(value)) {
        failures.push(`${relativePath} has placeholder link: ${value}`);
      }
      if (hasUnencodedDoiParentheses(value)) {
        failures.push(`${relativePath} has unencoded DOI URL: ${value}`);
      }
      if (malformedTranslatedExternalPattern.test(value)) {
        failures.push(`${relativePath} has translated external URL path: ${value}`);
      }
      if (cloudflareEmailProtectionPattern.test(value)) {
        failures.push(`${relativePath} links to Cloudflare email protection: ${value}`);
      }
      if (filePath.endsWith('.html') && publicMailtoPattern.test(value)) {
        failures.push(`${relativePath} has public mailto link that can trigger Cloudflare email protection: ${value}`);
      }
    }

    // Only visible HTML text is at risk: Cloudflare Email Obfuscation rewrites
    // emails in the rendered body / mailto links, but does NOT touch content
    // inside <script type="application/ld+json"> blocks. The Organization
    // ContactPoint email lives there intentionally (E-E-A-T schema, commit
    // cbe8bc22) and is served raw + intact on production even with obfuscation
    // active. So strip JSON-LD blocks before checking for exposed email text.
    const visibleText = text.replace(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/giu,
      '',
    );
    if (filePath.endsWith('.html') && publicEmailPattern.test(visibleText)) {
      failures.push(`${relativePath} exposes public email text that can trigger Cloudflare email protection.`);
    }
  }
}

if (failures.length > 0) {
  console.error(`Link hygiene verification failed with ${failures.length} issue(s):`);
  for (const failure of failures.slice(0, 50)) {
    console.error(`- ${failure}`);
  }
  if (failures.length > 50) {
    console.error(`...and ${failures.length - 50} more.`);
  }
  process.exit(1);
}

console.log('Link hygiene verification passed.');
