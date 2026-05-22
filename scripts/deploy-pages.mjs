import { spawnSync } from 'node:child_process';

const projectName = 'tupbebek';
const forbiddenProjectName = 'tupbebek-portal';

if (process.argv.some((arg) => arg.includes(forbiddenProjectName))) {
  console.error(`Refusing to deploy to forbidden Cloudflare Pages project: ${forbiddenProjectName}`);
  process.exit(1);
}

function run(command, args) {
  const executable = process.platform === 'win32' ? `${command}.cmd` : command;
  const result = spawnSync(executable, args, { stdio: 'inherit' });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run('npm', ['run', 'build']);
run('node', ['scripts/verify-consent-mode-v2.mjs']);
run('node', ['scripts/verify-deploy-target.mjs']);
run('npx', [
  'wrangler',
  'pages',
  'deploy',
  './dist',
  '--project-name',
  projectName,
  '--branch',
  'main',
  '--commit-dirty=true',
  '--commit-message',
  'deploy via guarded tupbebek target',
]);
