import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const llmsPath = path.join(publicDir, 'llms.txt');
const llmsFullPath = path.join(publicDir, 'llms-full.txt');
const permissionsPath = path.join(publicDir, 'agent-permissions.json');

const priorityTargets = [
  {
    query: 'tup bebek nedir',
    url: 'https://tupbebek.com/makaleler/tup-bebek-nedir/',
    permissionPath: '/makaleler/*',
  },
  {
    query: 'embriyo transferi sonrasi',
    url: 'https://tupbebek.com/makaleler/embriyo-transferi-sonrasi-bakim/',
    permissionPath: '/makaleler/*',
  },
  {
    query: 'dusuk amh',
    url: 'https://tupbebek.com/makaleler/dusuk-amh-hamilelik/',
    permissionPath: '/makaleler/*',
  },
  {
    query: 'azospermi',
    url: 'https://tupbebek.com/makaleler/azospermi-mikro-tese/',
    permissionPath: '/makaleler/*',
  },
  {
    query: 'pgt nedir',
    url: 'https://tupbebek.com/pgt-merkezi/',
    permissionPath: '/pgt-merkezi/',
  },
  {
    query: 'tup bebek basari orani',
    url: 'https://tupbebek.com/basari-oranlari/',
    permissionPath: '/basari-oranlari/',
  },
  {
    query: 'endometriozis tup bebek',
    url: 'https://tupbebek.com/makaleler/endometriozis-tup-bebek/',
    permissionPath: '/makaleler/*',
  },
];

const requiredPermissionPaths = [
  '/llms.txt',
  '/llms-full.txt',
  '/makaleler/*',
  '/pgt-merkezi/',
  '/basari-oranlari/',
  '/endometriozis-adenomyozis/',
];
const priorityHeading = 'AI Overview Oncelikli Kaynaklar';

const failures = [];

function readRequired(filePath) {
  if (!fs.existsSync(filePath)) {
    failures.push(`Missing ${path.relative(rootDir, filePath)}.`);
    return '';
  }

  return fs.readFileSync(filePath, 'utf8');
}

const llms = readRequired(llmsPath);
const llmsFull = readRequired(llmsFullPath);
const permissionsSource = readRequired(permissionsPath);

for (const target of priorityTargets) {
  if (!llms.includes(target.url)) {
    failures.push(`public/llms.txt does not include priority target for "${target.query}": ${target.url}`);
  }

  if (!llmsFull.includes(target.url)) {
    failures.push(`public/llms-full.txt does not include priority target for "${target.query}": ${target.url}`);
  }
}

for (const [fileLabel, source] of [
  ['public/llms.txt', llms],
  ['public/llms-full.txt', llmsFull],
]) {
  if (!source.includes(priorityHeading)) {
    failures.push(`${fileLabel} does not include "${priorityHeading}" section.`);
  }
}

let permissionPaths = [];
try {
  const permissions = JSON.parse(permissionsSource);
  permissionPaths = permissions?.interactions?.read?.paths ?? [];
} catch (error) {
  failures.push(`public/agent-permissions.json is not valid JSON: ${error.message}`);
}

for (const permissionPath of requiredPermissionPaths) {
  if (!permissionPaths.includes(permissionPath)) {
    failures.push(`public/agent-permissions.json read.paths does not include ${permissionPath}`);
  }
}

for (const target of priorityTargets) {
  if (!permissionPaths.includes(target.permissionPath)) {
    failures.push(
      `public/agent-permissions.json does not permit priority target "${target.query}" via ${target.permissionPath}`
    );
  }
}

if (failures.length > 0) {
  console.error(`LLMS priority target verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`LLMS priority target verification passed. Priority targets: ${priorityTargets.length}.`);
