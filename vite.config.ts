import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { routes, getPageMeta, SITE_URL } from './src/lib/seo';

const root = path.dirname(fileURLToPath(import.meta.url));

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function headFor(route: string) {
  const pathname = route ? `/${route}/` : '/';
  const url = SITE_URL + pathname;
  const { title, description } = getPageMeta(pathname, 'ru');
  const image = `${SITE_URL}/og/default.png`;
  return [
    `<title>${escape(title)}</title>`,
    `<meta name="description" content="${escape(description)}">`,
    `<link rel="canonical" href="${url}">`,
    `<link rel="alternate" hreflang="ru" href="${url}?lang=ru">`,
    `<link rel="alternate" hreflang="en" href="${url}?lang=en">`,
    `<link rel="alternate" hreflang="x-default" href="${url}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="R1SK">`,
    `<meta property="og:title" content="${escape(title)}">`,
    `<meta property="og:description" content="${escape(description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${image}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:locale" content="ru_RU">`,
    `<meta property="og:locale:alternate" content="en_US">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escape(title)}">`,
    `<meta name="twitter:description" content="${escape(description)}">`,
    `<meta name="twitter:image" content="${image}">`,
  ].join('\n    ');
}

/** Writes one HTML file per route with its own meta tags, plus 404.html, sitemap.xml and robots.txt.
 * GitHub Pages then serves deep links directly and link previews get the right card. */
function prerenderRoutes(): Plugin {
  const marker = '<!--page-meta-->';
  return {
    name: 'prerender-routes',
    enforce: 'post',
    transformIndexHtml: {
      order: 'pre',
      handler: (html, ctx) => (ctx.server ? html.replace(marker, headFor('')) : html),
    },
    // Runs after Vite has emitted index.html with hashed asset links.
    generateBundle: {
      order: 'post',
      handler(_, bundle) {
        const index = bundle['index.html'];
        if (!index || index.type !== 'asset') throw new Error('index.html missing from bundle');
        const template = String(index.source);
        if (!template.includes(marker)) throw new Error(`${marker} missing from index.html`);
        index.source = template.replace(marker, headFor(''));
        for (const route of routes.filter(Boolean))
          this.emitFile({
            type: 'asset',
            fileName: `${route}/index.html`,
            source: template.replace(marker, headFor(route)),
          });
        this.emitFile({
          type: 'asset',
          fileName: '404.html',
          source: template.replace(
            marker,
            headFor('').replace(
              /<title>.*?<\/title>/,
              '<title>Страница не найдена — R1SK</title>',
            ) + '\n    <meta name="robots" content="noindex">',
          ),
        });
        const today = new Date().toISOString().slice(0, 10);
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source:
            '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
            routes
              .map(
                (r) =>
                  `  <url><loc>${SITE_URL}/${r ? r + '/' : ''}</loc><lastmod>${today}</lastmod></url>`,
              )
              .join('\n') +
            '\n</urlset>\n',
        });
        this.emitFile({
          type: 'asset',
          fileName: 'robots.txt',
          source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
        });
      },
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), prerenderRoutes()],
  resolve: { alias: { '@': path.join(root, 'src') } },
  build: { target: 'es2022' },
});
