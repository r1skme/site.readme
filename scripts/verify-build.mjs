// Static checks of dist/: every route has its own HTML with unique meta tags,
// and robots.txt, sitemap.xml, 404.html, CNAME and the OG image are in place.
import { readFileSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const dist = path.resolve('dist');
const read = (file) => readFileSync(path.join(dist, file), 'utf8');
const meta = (html, re) => html.match(re)?.[1];

const sitemap = read('sitemap.xml');
const routes = [...sitemap.matchAll(/<loc>https:\/\/predict\.rip\/(.*?)<\/loc>/g)].map((m) => m[1]);
assert.ok(routes.length >= 13, `sitemap lists ${routes.length} routes`);
assert.match(read('robots.txt'), /Sitemap: https:\/\/predict\.rip\/sitemap\.xml/);
assert.equal(read('CNAME').trim(), 'predict.rip');
assert.ok(existsSync(path.join(dist, '404.html')), '404.html is missing');
assert.ok(statSync(path.join(dist, 'og/default.png')).size > 10_000, 'OG image is missing');

const seen = { title: new Set(), description: new Set(), canonical: new Set() };
for (const route of routes) {
  const html = read(`${route}index.html`);
  const title = meta(html, /<title>(.*?)<\/title>/);
  const description = meta(html, /<meta name="description" content="(.*?)">/);
  const canonical = meta(html, /<link rel="canonical" href="(.*?)">/);
  assert.ok(title && description && canonical, `meta missing in /${route}`);
  assert.equal(canonical, `https://predict.rip/${route}`);
  assert.equal(meta(html, /<meta property="og:title" content="(.*?)">/), title);
  assert.match(
    html,
    /<meta property="og:image" content="https:\/\/predict\.rip\/og\/default\.png">/,
  );
  assert.match(html, /hreflang="en"/);
  for (const [key, value] of Object.entries({ title, description, canonical })) {
    assert.ok(!seen[key].has(value), `duplicate ${key} on /${route}: ${value}`);
    seen[key].add(value);
  }
  for (const [, ref] of html.matchAll(/(?:src|href)="(\/[^"]+)"/g)) {
    const local = path.join(dist, ref.split(/[?#]/)[0]);
    assert.ok(existsSync(local), `/${route} references missing ${ref}`);
  }
}
console.log(`Build OK: ${routes.length} routes with unique meta, sitemap, robots, 404, OG image.`);
