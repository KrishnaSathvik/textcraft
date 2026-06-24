/**
 * Full-body HTML prerender for TextCraft.
 *
 * Serves the built dist/ app locally, visits each public SEO route with Playwright,
 * waits for React to render visible content, and writes the full HTML document
 * to the matching dist route index.html file.
 */

import { createServer, type Server } from 'http';
import { mkdirSync, writeFileSync, existsSync, readFileSync, statSync } from 'fs';
import { dirname, join, extname } from 'path';
import { fileURLToPath } from 'url';
import { chromium, type Browser } from 'playwright';
import {
  allSeoRoutes,
  getPrerenderExpectText,
  getPrerenderOutputPath,
} from '../src/config/seoRoutes.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');
const PREVIEW_PORT = 4173;
const PREVIEW_HOST = '127.0.0.1';
const PREVIEW_URL = `http://${PREVIEW_HOST}:${PREVIEW_PORT}`;

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
};

function resolveDistFile(urlPath: string): string | null {
  const normalized = urlPath.split('?')[0] || '/';
  const candidates = [
    join(distDir, normalized),
    join(distDir, normalized, 'index.html'),
    join(distDir, normalized.replace(/\/$/, ''), 'index.html'),
  ];

  if (!extname(normalized) && !normalized.endsWith('/')) {
    candidates.unshift(join(distDir, `${normalized.slice(1)}.html`));
  }

  for (const candidate of candidates) {
    if (existsSync(candidate) && statSync(candidate).isFile()) {
      return candidate;
    }
  }

  const spaFallback = join(distDir, 'index.html');
  return existsSync(spaFallback) ? spaFallback : null;
}

function startStaticServer(): Promise<Server> {
  const server = createServer((req, res) => {
    const urlPath = req.url || '/';
    const filePath = resolveDistFile(urlPath);

    if (!filePath) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    const ext = extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(readFileSync(filePath));
  });

  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(PREVIEW_PORT, PREVIEW_HOST, () => resolve(server));
  });
}

function stopStaticServer(server: Server): Promise<void> {
  return new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
}

function cleanupRenderedHtml(html: string): string {
  let result = html;

  // Client useSEO injects id="structured-data"; drop static shell duplicate.
  if (result.includes('id="structured-data"') && result.includes('id="prerender-structured-data"')) {
    result = result.replace(
      /<script type="application\/ld\+json" id="prerender-structured-data">[\s\S]*?<\/script>\s*/g,
      ''
    );
  }

  return result;
}

function isRootEmpty(html: string): boolean {
  return /<div id="root">\s*<\/div>/.test(html);
}

async function waitForRouteContent(
  page: import('playwright').Page,
  expectText: string
): Promise<void> {
  await page.waitForFunction(
    (text) => {
      const root = document.getElementById('root');
      if (!root) return false;
      const content = root.innerText.trim();
      return content.length > 40 && content.includes(text);
    },
    expectText,
    { timeout: 60_000 }
  );
}

async function prerenderRoute(
  browser: Browser,
  routePath: string,
  expectText: string
): Promise<string> {
  const page = await browser.newPage();
  try {
    const url = routePath === '/' ? `${PREVIEW_URL}/` : `${PREVIEW_URL}${routePath}`;
    await page.goto(url, { waitUntil: 'load', timeout: 60_000 });
    await waitForRouteContent(page, expectText);

    const html = cleanupRenderedHtml(await page.content());

    if (isRootEmpty(html)) {
      throw new Error(`#root is still empty after render for ${routePath}`);
    }
    if (!html.includes(expectText)) {
      throw new Error(`Expected text "${expectText}" missing in body for ${routePath}`);
    }
    if (!/<title>[^<]+<\/title>/.test(html)) {
      throw new Error(`Missing <title> for ${routePath}`);
    }

    return html;
  } finally {
    await page.close();
  }
}

async function main() {
  if (!existsSync(join(distDir, 'index.html'))) {
    console.error('dist/index.html not found. Run vite build and generate-static-routes first.');
    process.exit(1);
  }

  if (process.env.SKIP_FULL_PRERENDER === '1' || process.env.VERCEL === '1') {
    console.log('Skipping full-body prerender (Vercel or SKIP_FULL_PRERENDER=1)');
    return;
  }

  console.log(`Starting static server at ${PREVIEW_URL}...`);
  const server = await startStaticServer();

  let browser: Browser | null = null;
  const failures: string[] = [];

  try {
    browser = await chromium.launch({ headless: true });

    console.log(`Prerendering ${allSeoRoutes.length} routes with full body HTML...`);

    for (const route of allSeoRoutes) {
      const expectText = getPrerenderExpectText(route);
      const outFile = getPrerenderOutputPath(distDir, route.path);

      try {
        const html = await prerenderRoute(browser, route.path, expectText);
        mkdirSync(dirname(outFile), { recursive: true });
        writeFileSync(outFile, html, 'utf8');
        console.log(`  ✓ ${route.path} → ${outFile.replace(rootDir + '/', '')}`);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        failures.push(`${route.path}: ${message}`);
        console.error(`  ✗ ${route.path}: ${message}`);
      }
    }
  } finally {
    if (browser) await browser.close();
    await stopStaticServer(server);
  }

  if (failures.length > 0) {
    console.error('\nFull-body prerender failed for:');
    failures.forEach((f) => console.error(`  - ${f}`));
    process.exit(1);
  }

  console.log(`\nFull-body prerender complete for ${allSeoRoutes.length} routes.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
