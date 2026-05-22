import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const agents = fs.readFileSync(path.join(root, 'AGENTS.md'), 'utf8');
const wrangler = fs.readFileSync(path.join(root, 'wrangler.toml'), 'utf8');
const deployScriptPath = path.join(root, 'scripts/deploy-pages.mjs');
const deployScript = fs.existsSync(deployScriptPath) ? fs.readFileSync(deployScriptPath, 'utf8') : '';

const correctDashboard = 'https://dash.cloudflare.com/4797b38bf5bfb1b15a30ac27f0a9a78f/pages/view/tupbebek';

const checks = [
  {
    name: 'AGENTS.md records the canonical Cloudflare Pages project dashboard',
    pass: agents.includes(correctDashboard),
  },
  {
    name: 'AGENTS.md explicitly forbids tupbebek-portal deploys',
    pass: agents.includes('tupbebek-portal') && agents.includes('kesinlikle deploy edilmez'),
  },
  {
    name: 'package.json exposes the guarded deploy script',
    pass: packageJson.scripts?.deploy === 'node scripts/deploy-pages.mjs',
  },
  {
    name: 'wrangler.toml names the canonical Pages project',
    pass: /name\s*=\s*"tupbebek"/.test(wrangler),
  },
  {
    name: 'deploy script hardcodes --project-name tupbebek',
    pass:
      deployScript.includes("const projectName = 'tupbebek';") &&
      deployScript.includes("const forbiddenProjectName = 'tupbebek-portal';") &&
      /'--project-name',\s*projectName/s.test(deployScript),
  },
];

const failures = checks.filter((check) => !check.pass);

if (failures.length > 0) {
  console.error('Deploy target verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure.name}`);
  }
  process.exit(1);
}

console.log('Deploy target verification passed.');
