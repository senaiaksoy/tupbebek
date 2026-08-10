import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const scriptPath = path.join(root, 'scripts/submit-indexnow.mjs');
const failures = [];

if (!fs.existsSync(scriptPath)) failures.push('Missing scripts/submit-indexnow.mjs.');
if (packageJson.scripts?.['indexnow:submit'] !== 'node scripts/submit-indexnow.mjs') {
  failures.push('package.json is missing the canonical indexnow:submit command.');
}

if (fs.existsSync(scriptPath)) {
  const source = fs.readFileSync(scriptPath, 'utf8');
  const keyMatch = source.match(/process\.env\.INDEXNOW_KEY \|\| '([a-f0-9]{32})'/u);
  const key = keyMatch?.[1];
  if (!key) {
    failures.push('IndexNow script has no valid 32-character fallback key.');
  } else {
    const keyPath = path.join(root, 'public', `${key}.txt`);
    if (!fs.existsSync(keyPath) || fs.readFileSync(keyPath, 'utf8').trim() !== key) {
      failures.push(`IndexNow key verification file is missing or invalid: public/${key}.txt.`);
    }
  }

  if (!source.includes("const endpoint = 'https://api.indexnow.org/indexnow';")) {
    failures.push('IndexNow script does not use the canonical endpoint.');
  }
}

if (failures.length > 0) {
  console.error(`IndexNow verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('IndexNow configuration verification passed.');
