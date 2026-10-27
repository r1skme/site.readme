import { chromium } from '@playwright/test';
import { createServer } from 'node:http';
import { readFileSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const live = Boolean(process.env.DOMAIN_ORIGIN),
  base = live ? new URL(process.env.DOMAIN_ORIGIN).origin + '/' : 'http://127.0.0.1:4180/';
const report = {
  base,
  live,
  checks: [],
  routes: [],
  assets: [],
  pageErrors: [],
  failedResources: [],
  limits: [
    'Chromium desktop and touch emulation; not a physical iPhone.',
    'Third-party playback availability is not asserted.',
  ],
};
const output = live ? 'live-domain-output' : 'qa-output';
mkdirSync(output, { recursive: true });
const routes = [
  '',
  'about/',
  'roadmap/',
  'projects/',
  'media/',
  'skills/',
  'contact/',
  'projects/prime-market/',
  'projects/predict/',
  'projects/researchify/',
  'projects/researchify-web/',
  'projects/glow-rust/',
  'projects/exchange/',
];
let server, browser, page;
const resources = new Set();
const check = (name) => {
  report.checks.push(name);
  console.log('DOMAIN_PASS:', name);
};
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
if (!live) {
  const root = path.resolve('dist');
  const mime = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.png': 'image/png',
    '.json': 'application/json',
  };
  server = createServer((req, res) => {
    try {
      const name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      let file = path.resolve(root, '.' + name);
      if (!file.startsWith(root + path.sep) && file !== root) {
        res.writeHead(403).end();
        return;
      }
      try {
        if (statSync(file).isDirectory()) file = path.join(file, 'index.html');
        statSync(file);
      } catch {
        res.writeHead(404, { 'content-type': mime['.html'] });
        res.end(readFileSync(path.join(root, '404.html')));
        return;
      }
      res.writeHead(200, {
        'content-type': mime[path.extname(file)] || 'text/plain',
        'cache-control': 'no-cache',
      });
      res.end(readFileSync(file));
    } catch {
      res.writeHead(500).end();
    }
  });
  await new Promise((resolve) => server.listen(4180, '127.0.0.1', resolve));
}
try {
  browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'no-preference',
  });
  page = await context.newPage();
  page.setDefaultTimeout(15000);
  const observe = (p) => {
    p.on('pageerror', (e) => report.pageErrors.push(e.message));
    p.on('response', (r) => {
      if (
        r.url().startsWith(base) &&
        ['script', 'stylesheet', 'image', 'font'].includes(r.request().resourceType())
      ) {
        resources.add(r.url());
        if (r.status() >= 400) report.failedResources.push({ url: r.url(), status: r.status() });
      }
    });
  };
  observe(page);
  // Check the ordinary URL, not a cache-busted substitute for the real homepage.
  let ready = false;
  for (let i = 0; i < (live ? 6 : 1); i++) {
    const res = await context.request.get(base, {
      headers: { 'Cache-Control': 'no-cache' },
      timeout: 20000,
    });
    const text = await res.text();
    if (res.ok() && text.includes('predict-root-v11') && !text.includes('/site.readme/')) {
      ready = true;
      break;
    }
    if (live) await delay(10000);
  }
  assert.ok(ready, 'The public homepage is not serving the root-domain build yet');
  for (const route of routes) {
    const response = await page.goto(base + route + '?lang=ru', { waitUntil: 'domcontentloaded' });
    assert.equal(response?.status(), 200, route);
    await page.locator('.page-main h1').waitFor();
    await page.waitForTimeout(160);
    assert.ok(
      (await page.locator('.page-main').innerText()).length > 70,
      'Only a loading wordmark rendered',
    );
    assert.ok(await page.locator('.liquid-dock').isVisible());
    const hrefs = await page
      .locator('script[src],link[href],img[src]')
      .evaluateAll((nodes) =>
        nodes.map((n) => n.getAttribute('src') || n.getAttribute('href')).filter(Boolean),
      );
    for (const ref of hrefs) {
      const url = new URL(ref, page.url());
      if (url.origin === new URL(base).origin) {
        assert.ok(!url.pathname.startsWith('/site.readme/'));
        if (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/media/'))
          resources.add(url.href);
      }
    }
    report.routes.push({ path: route || '/', status: response.status(), rendered: true });
  }
  check('All 13 pages render directly from the domain root');
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.locator('.home-hero h1').waitFor();
  await page.waitForTimeout(500);
  assert.equal(await page.locator('.motion-switch').count(), 0);
  await page.evaluate(() => localStorage.setItem('r1sk-pause', 'true'));
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.locator('#ribbon-shape').waitFor({ state: 'attached' });
  await page.waitForTimeout(350);
  const before = await page.locator('#ribbon-shape').getAttribute('d');
  await delay(600);
  assert.notEqual(await page.locator('#ribbon-shape').getAttribute('d'), before);
  check('Live background animates by default, including with an old pause preference');
  const word = await page.locator('.textloop-word').innerText();
  await page.waitForFunction(
    (first) => document.querySelector('.textloop-word')?.textContent !== first,
    word,
    { timeout: 7000 },
  );
  check('Rotating headline is animated');
  assert.ok(
    await page
      .locator('.home-hero h1')
      .evaluate((el) => parseFloat(getComputedStyle(el).fontSize) > 50),
    'Styles did not load',
  );
  await page.locator('.lang-switch button').nth(1).click();
  assert.equal(await page.locator('html').getAttribute('lang'), 'en');
  await page.locator('.lang-switch button').first().click();
  check('RU/EN switching works on the new domain');
  await page.locator('.glass-dock-link[href="/projects/"]').click();
  await page.waitForURL((url) => url.pathname === '/projects/');
  await page.locator('.v7-project-catalog').waitFor();
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.locator('.v7-project-catalog').waitFor();
  check('Navigation and deep-link refresh preserve the full design');
  await page.goto(base + 'media/?lang=ru', { waitUntil: 'domcontentloaded' });
  await page.locator('.media-work').nth(4).click();
  await page.locator('dialog[open]').waitFor();
  assert.equal(await page.locator('iframe').count(), 1);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(100);
  assert.equal(await page.locator('iframe').count(), 0);
  check('Video modal opens and closes');
  const missing = await page.goto(base + '__domain_404_check__/', {
    waitUntil: 'domcontentloaded',
  });
  assert.equal(missing?.status(), 404);
  await page.locator('.page-main h1').waitFor();
  assert.ok((await page.locator('.page-main').innerText()).includes('404'));
  check('Unknown paths retain HTTP 404 and render the site NotFound page');
  for (const url of resources) {
    const response = await context.request.get(url, { timeout: 20000 });
    assert.equal(response.status(), 200, `Missing resource: ${url}`);
    const mime = response.headers()['content-type'] || '';
    if (/\.(js|css|svg)(\?|$)/.test(url))
      assert.ok(!mime.includes('text/html'), `HTML returned in place of ${url}`);
    report.assets.push({ url, status: response.status(), mime });
  }
  check('Every observed local JS, CSS, favicon, logo and media URL returns the proper resource');
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: width > 600 ? 1000 : 844 });
    await page.goto(base + '?lang=ru', { waitUntil: 'domcontentloaded' });
    await page.locator('.home-hero').waitFor();
    await page.waitForTimeout(500);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.screenshot({ path: `${output}/domain-home-${width}.png`, fullPage: false });
  }
  check('Desktop and mobile homepages render without horizontal overflow');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await delay(200);
  const still = await page.locator('#ribbon-shape').getAttribute('d');
  await delay(400);
  assert.equal(await page.locator('#ribbon-shape').getAttribute('d'), still);
  check('System reduced-motion preference is respected');
  assert.deepEqual(report.pageErrors, []);
  assert.deepEqual(report.failedResources, []);
  check('No uncaught page errors or failed first-party resource requests');
  console.log(
    'DOMAIN_QA_SUCCESS',
    JSON.stringify({
      base,
      pages: report.routes.length,
      assets: report.assets.length,
      checks: report.checks.length,
    }),
  );
} catch (error) {
  report.failure = String(error);
  console.error(error);
  if (page)
    try {
      await page.screenshot({ path: `${output}/domain-failure.png`, fullPage: true });
    } catch {}
  process.exitCode = 1;
} finally {
  writeFileSync(`${output}/report-domain.json`, JSON.stringify(report, null, 2));
  await browser?.close();
  if (server) await new Promise((resolve) => server.close(resolve));
}
