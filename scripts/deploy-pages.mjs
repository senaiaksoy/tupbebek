import { spawnSync } from 'node:child_process';

const projectName = 'tupbebek';
const forbiddenProjectName = 'tupbebek-portal';

if (process.argv.some((arg) => arg.includes(forbiddenProjectName))) {
  console.error(`Refusing to deploy to forbidden Cloudflare Pages project: ${forbiddenProjectName}`);
  process.exit(1);
}

function run(command, args) {
  const quoteWindowsArg = (value) => {
    const arg = String(value);
    if (!/[\s"]/u.test(arg)) return arg;
    return `"${arg.replace(/"/gu, '\\"')}"`;
  };

  const result = process.platform === 'win32'
    ? spawnSync([command, ...args].map(quoteWindowsArg).join(' '), {
        stdio: 'inherit',
        shell: true,
      })
    : spawnSync(command, args, { stdio: 'inherit' });
  if (result.error) {
    console.error(`Failed to run ${command}: ${result.error.message}`);
    process.exit(1);
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run('npm', ['run', 'build']);
run('npm', ['run', 'verify:semrush-audit']);
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
