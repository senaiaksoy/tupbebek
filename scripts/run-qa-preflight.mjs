import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const rootDir = process.cwd();
const scriptsDir = path.join(rootDir, 'scripts');

// UTF-8 console output helper
if (process.stdout.setEncoding) {
  process.stdout.setEncoding('utf-8');
}
if (process.stderr.setEncoding) {
  process.stderr.setEncoding('utf-8');
}

if (!fs.existsSync(scriptsDir)) {
  console.error(`❌ scripts directory not found: ${scriptsDir}`);
  process.exit(1);
}

// Find all verify-*.mjs or verify-*.js or audit-*.mjs or qa-*.mjs files
const files = fs.readdirSync(scriptsDir)
  .filter(file => {
    return (file.startsWith('verify-') || file.startsWith('audit-') || file.startsWith('qa-')) &&
           (file.endsWith('.mjs') || file.endsWith('.js')) &&
           file !== 'run-qa-preflight.mjs';
  })
  .map(file => path.join(scriptsDir, file));

console.log(`🔍 Found ${files.length} verification scripts to run.`);

const results = [];

// Helper to run a script as a child process
function runScript(filePath) {
  return new Promise((resolve) => {
    const filename = path.basename(filePath);
    const p = spawn('node', [filePath], {
      cwd: rootDir,
      env: { ...process.env, FORCE_COLOR: '1' }
    });

    let stdout = '';
    let stderr = '';

    p.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    p.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    p.on('close', (code) => {
      resolve({
        filename,
        code,
        stdout: stdout.trim(),
        stderr: stderr.trim()
      });
    });
  });
}

// Run all scripts in parallel
async function main() {
  const start = Date.now();
  
  const runPromises = files.map(runScript);
  const outcomes = await Promise.all(runPromises);
  
  const duration = ((Date.now() - start) / 1000).toFixed(2);
  
  const passed = outcomes.filter(o => o.code === 0);
  const failed = outcomes.filter(o => o.code !== 0);
  
  // Sort outcomes so failures come first
  outcomes.sort((a, b) => (a.code === 0 ? 1 : 0) - (b.code === 0 ? 1 : 0));
  
  // Build Markdown report
  let report = '\n# QA & SEO Preflight Report\n\n';
  report += `⏱ **Duration**: ${duration}s | ✅ **Passed**: ${passed.length} | ❌ **Failed**: ${failed.length} | 📋 **Total**: ${outcomes.length}\n\n`;
  
  report += '## Summary Table\n\n';
  report += '| Status | Script Name | Exit Code | Message Summary |\n';
  report += '| :---: | :--- | :---: | :--- |\n';
  
  for (const o of outcomes) {
    const status = o.code === 0 ? '✅ PASS' : '❌ FAIL';
    let summary = '';
    if (o.code === 0) {
      summary = o.stdout.split('\n')[0] || 'Success';
    } else {
      summary = o.stderr.split('\n')[0] || o.stdout.split('\n')[0] || 'Failed with error';
    }
    // Clean markdown characters from summary
    summary = summary.replace(/\|/g, '\\|').replace(/\r/g, '').replace(/\n/g, ' ');
    report += `| ${status} | \`${o.filename}\` | \`${o.code}\` | ${summary} |\n`;
  }
  
  if (failed.length > 0) {
    report += '\n## Detailed Failures\n';
    for (const o of failed) {
      report += `\n### ❌ \`${o.filename}\` failed (Exit Code: ${o.code})\n`;
      if (o.stdout) {
        report += '#### Stdout:\n```text\n' + o.stdout + '\n```\n';
      }
      if (o.stderr) {
        report += '#### Stderr:\n```text\n' + o.stderr + '\n```\n';
      }
    }
  } else {
    report += '\n🎉 **All preflight verification checks passed successfully!**\n';
  }
  
  console.log(report);
  
  // Exit with 1 if any script failed
  process.exit(failed.length > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Fatal preflight runner error:', err);
  process.exit(2);
});
