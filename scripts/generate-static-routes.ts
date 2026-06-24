import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { allSeoRoutes } from '../src/config/seoRoutes.ts';
import { SITE_URL } from '../src/config/site.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');
const publicDir = join(rootDir, 'public');

const OG_IMAGE = `${SITE_URL}/og-image.png`;

function setTitle(html: string, title: string): string {
  return html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
}

function setMeta(html: string, attr: 'name' | 'property', key: string, content: string): string {
  const pattern = new RegExp(`<meta ${attr}="${key}" content="[^"]*"\\s*/?>`);
  const tag = `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`;
  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }
  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function setCanonical(html: string, url: string): string {
  const tag = `<link rel="canonical" href="${url}" />`;
  if (/<link rel="canonical"[^>]*>/.test(html)) {
    return html.replace(/<link rel="canonical"[^>]*>/, tag);
  }
  return html.replace('</head>', `    ${tag}\n  </head>`);
}

function setStructuredData(html: string, data?: Record<string, unknown>): string {
  let result = html.replace(
    /\s*<script type="application\/ld\+json" id="prerender-structured-data">[\s\S]*?<\/script>/g,
    ''
  );
  if (data) {
    const script = `    <script type="application/ld+json" id="prerender-structured-data">${JSON.stringify(data)}</script>`;
    result = result.replace('</head>', `${script}\n  </head>`);
  }
  return result;
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function applySeo(html: string, route: (typeof allSeoRoutes)[number]): string {
  const canonical = `${SITE_URL}${route.path === '/' ? '' : route.path}`;
  const fullTitle = route.title.includes('TextCraft') ? route.title : `${route.title} | TextCraft`;

  let result = html;
  result = setTitle(result, fullTitle);
  result = setMeta(result, 'name', 'description', route.description);
  result = setCanonical(result, canonical);
  result = setMeta(result, 'name', 'robots', route.robots ?? 'index, follow');
  result = setMeta(result, 'property', 'og:title', fullTitle);
  result = setMeta(result, 'property', 'og:description', route.description);
  result = setMeta(result, 'property', 'og:url', canonical);
  result = setMeta(result, 'property', 'og:type', route.ogType ?? 'website');
  result = setMeta(result, 'property', 'og:image', OG_IMAGE);
  result = setMeta(result, 'name', 'twitter:card', 'summary_large_image');
  result = setMeta(result, 'name', 'twitter:title', fullTitle);
  result = setMeta(result, 'name', 'twitter:description', route.description);
  result = setMeta(result, 'name', 'twitter:image', OG_IMAGE);
  if (route.keywords) {
    result = setMeta(result, 'name', 'keywords', route.keywords);
  }
  result = setStructuredData(result, route.structuredData);
  return result;
}

function writeRouteHtml(baseHtml: string, routePath: string, route: (typeof allSeoRoutes)[number]) {
  const html = applySeo(baseHtml, route);
  const outFile =
    routePath === '/'
      ? join(distDir, 'index.html')
      : join(distDir, routePath.slice(1), 'index.html');

  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, html, 'utf8');
}

function generateSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = allSeoRoutes.map((route) => {
    const loc = `${SITE_URL}${route.path === '/' ? '/' : route.path}`;
    const priority =
      route.path === '/'
        ? '1.0'
        : route.path.startsWith('/blog/')
          ? '0.6'
          : route.path === '/blog'
            ? '0.5'
            : route.path.includes('-')
              ? '0.9'
              : '0.7';
  const changefreq = route.path.startsWith('/blog') ? 'monthly' : route.path === '/' ? 'weekly' : 'monthly';
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n\n')}
</urlset>
`;

  writeFileSync(join(publicDir, 'sitemap.xml'), xml, 'utf8');
  if (existsSync(distDir)) {
    writeFileSync(join(distDir, 'sitemap.xml'), xml, 'utf8');
  }
}

function main() {
  const baseHtmlPath = join(distDir, 'index.html');
  if (!existsSync(baseHtmlPath)) {
    console.error('dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  const baseHtml = readFileSync(baseHtmlPath, 'utf8');

  for (const route of allSeoRoutes) {
    writeRouteHtml(baseHtml, route.path, route);
  }

  generateSitemap();
  console.log(`Generated ${allSeoRoutes.length} prerendered HTML shells and sitemap.xml`);
}

main();
