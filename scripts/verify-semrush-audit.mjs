import { spawnSync } from 'node:child_process';

const checks = [
  ['node', ['scripts/verify-no-placeholder-links.mjs']],
  ['node', ['scripts/verify-link-hygiene.mjs']],
  ['node', ['scripts/verify-html-weight.mjs']],
  ['node', ['scripts/verify-title-lengths.mjs']],
  ['node', ['scripts/verify-structured-data.mjs']],
  ['node', ['scripts/verify-seo-canonicalization.mjs']],
];

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
  });

  if (result.error) {
    console.error(`Failed to run ${command} ${args.join(' ')}: ${result.error.message}`);
    process.exit(1);
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

for (const [command, args] of checks) {
  run(command, args);
}

console.log('SEMrush audit verification passed.');
