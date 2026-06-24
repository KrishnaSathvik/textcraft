/**
 * Runs Playwright full-body prerender locally when supported.
 * Skips on Vercel — SEO HTML shells from generate-static-routes.ts are still emitted.
 */

import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

function shouldSkipPrerender(): boolean {
  if (process.env.SKIP_FULL_PRERENDER === '1') return true;
  if (process.env.VERCEL === '1') return true;
  return false;
}

function run(command: string, args: string[]) {
  const result = spawnSync(command, args, { stdio: 'inherit', cwd: rootDir });
  if (result.error) {
    console.error(result.error);
    process.exit(1);
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function main() {
  if (shouldSkipPrerender()) {
    console.log(
      'Skipping full-body Playwright prerender on Vercel/CI — using SEO HTML shells from generate-static-routes.'
    );
    return;
  }

  run('npx', ['playwright', 'install', 'chromium']);
  run('npx', ['tsx', 'scripts/prerender-full-html.ts']);
}

main();
