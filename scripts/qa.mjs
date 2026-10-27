// Browser checks against the built site (or a live origin via QA_ORIGIN=https://predict.rip).
// Serves dist/ like GitHub Pages: real files only, unknown paths get 404.html with HTTP 404.
import { chromium } from '@playwright/test';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const out = process.env.QA_OUTPUT || 'qa-output';
mkdirSync(out, { recursive: true });

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

let server;
let origin = process.env.QA_ORIGIN?.replace(/\/$/, '');
if (!origin) {
  const dist = path.resolve('dist');
  server = createServer(async (req, res) => {
    let file = path.join(dist, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    try {
      if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
      const body = await readFile(file);
      res.writeHead(200, {
        'content-type': types[path.extname(file)] || 'application/octet-stream',
      });
      res.end(body);
    } catch {
      res.writeHead(404, { 'content-type': types['.html'] });
      res.end(await readFile(path.join(dist, '404.html')));
    }
  });
  await new Promise((r) => server.listen(4173, '127.0.0.1', r));
  origin = 'http://127.0.0.1:4173';
}

const routes = process.env.QA_ORIGIN
  ? [
      '',
      'projects/',
      'projects/researchify/',
      'media/',
      'skills/',
      'about/',
      'roadmap/',
      'contact/',
    ]
  : [...readFileSync('dist/sitemap.xml', 'utf8').matchAll(/predict\.rip\/(.*?)<\/loc>/g)].map(
      (m) => m[1],
    );

const errors = [];
let passed = 0;
const check = async (name, fn) => {
  await fn();
  passed++;
  console.log('PASS', name);
};

const browser = await chromium.launch();
const open = async (width, extra = {}) => {
  const context = await browser.newContext({
    viewport: { width, height: width < 600 ? 812 : 900 },
    deviceScaleFactor: width < 600 ? 2 : 1,
    isMobile: width < 600,
    hasTouch: width < 600,
    ...extra,
  });
  const page = await context.newPage();
  page.on('pageerror', (e) => errors.push(`${page.url()}: ${e.message}`));
  page.on('console', (m) => {
    // YouTube/Google font hiccups are third-party; our own errors are not.
    // The deliberate 404 checks log the document's own 404 status.
    const expected404 = page.url().includes('/no-such-') && /status of 404/.test(m.text());
    if (m.type() === 'error' && !expected404 && !/youtube|ytimg|googleapis|gstatic/.test(m.text()))
      errors.push(`${page.url()}: ${m.text()}`);
  });
  return page;
};

try {
  for (const width of [1280, 375]) {
    const page = await open(width);
    for (const lang of ['ru', 'en']) {
      for (const route of routes) {
        await check(`/${route} ${lang} @${width}`, async () => {
          const res = await page.goto(`${origin}/${route}?lang=${lang}`, {
            waitUntil: 'networkidle',
          });
          assert.equal(res.status(), 200);
          await page.locator('#main h1').first().waitFor();
          const title = await page.title();
          assert.ok(title.includes('R1SK') && title !== 'R1SK', `title "${title}"`);
          assert.equal(await page.locator('html').getAttribute('lang'), lang);
          const overflow = await page.evaluate(
            () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
          );
          assert.ok(overflow <= 0, `horizontal overflow ${overflow}px`);
          if (lang === 'ru') {
            // Scroll through so scroll-revealed blocks are visible in the full-page shot.
            await page.evaluate(async () => {
              for (let y = 0; y < document.body.scrollHeight; y += innerHeight / 3) {
                scrollTo(0, y);
                await new Promise((r) => setTimeout(r, 160));
              }
              scrollTo(0, 0);
              await new Promise((r) => setTimeout(r, 900));
            });
            await page.screenshot({
              path: `${out}/${width}-${route.replace(/\//g, '_') || 'home'}.png`,
              fullPage: true,
            });
          }
        });
      }
    }
    await page.context().close();
  }

  const page = await open(1280);

  await check('Background ribbon animates while idle', async () => {
    await page.goto(origin + '/', { waitUntil: 'networkidle' });
    const a = await page.locator('#ribbon-shape').getAttribute('d');
    await page.waitForTimeout(500);
    assert.notEqual(await page.locator('#ribbon-shape').getAttribute('d'), a);
  });

  await check('?lang=ru wins over a saved EN and survives navigation', async () => {
    await page.evaluate(() => localStorage.setItem('r1sk-lang', 'en'));
    await page.goto(origin + '/?lang=ru', { waitUntil: 'networkidle' });
    await page.locator('.glass-dock-link[href="/projects/"]').click();
    await page.waitForURL('**/projects/');
    assert.equal(await page.locator('html').getAttribute('lang'), 'ru');
    assert.equal(await page.title(), 'Проекты — R1SK');
  });

  await check('Language switch updates the tab title', async () => {
    await page.locator('.lang-switch button', { hasText: 'EN' }).click();
    assert.equal(await page.title(), 'Projects — R1SK');
    await page.locator('.lang-switch button', { hasText: 'RU' }).click();
  });

  await check('Project page has a project title and GitHub links', async () => {
    await page.goto(origin + '/projects/researchify/', { waitUntil: 'networkidle' });
    assert.equal(await page.title(), 'ReSearchify — R1SK');
    assert.equal(await page.locator('a[href="https://github.com/r1skme/ReSearchify"]').count(), 1);
    assert.equal(
      await page.locator('a[href="https://github.com/r1skme/ReSearchify/releases"]').count(),
      1,
    );
  });

  await check('Dock highlights nothing on the roadmap', async () => {
    await page.goto(origin + '/roadmap/', { waitUntil: 'networkidle' });
    assert.equal(await page.locator('.glass-dock-link[aria-current]').count(), 0);
    assert.equal(await page.locator('.topbar-link[aria-current="page"]').count(), 1);
  });

  await check('Unknown paths return 404 with the shared NotFound view', async () => {
    for (const p of ['/no-such-page/', '/projects/no-such-project/']) {
      const res = await page.goto(origin + p, { waitUntil: 'networkidle' });
      assert.equal(res.status(), 404);
      await page.locator('.not-found h1').waitFor();
      assert.match(await page.title(), /Страница не найдена/);
      assert.equal(await page.locator('.glass-dock-link[aria-current]').count(), 0);
    }
  });

  await check('Media: TikTok cards link out, YouTube opens a player', async () => {
    await page.goto(origin + '/media/', { waitUntil: 'networkidle' });
    assert.equal(await page.locator('a.work-tiktok').count(), 4);
    assert.equal(await page.locator('a.work-tiktok .work-play').count(), 0);
    await page.locator('button.work-youtube').first().click();
    await page.locator('dialog[open] iframe').waitFor();
    await page.keyboard.press('Escape');
    await page.locator('dialog').waitFor({ state: 'detached' });
  });

  await check('Media: reel images are never upscaled', async () => {
    const worst = await page.$$eval('.reel img', (imgs) =>
      Math.max(
        ...imgs
          .filter((i) => i.complete && i.naturalWidth)
          .map((i) => i.getBoundingClientRect().width / (i.naturalWidth * devicePixelRatio)),
      ),
    );
    assert.ok(worst <= 1.01, `an image is drawn at ${worst.toFixed(2)}× its natural size`);
  });

  await check('Reduced motion freezes the ribbon', async () => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(origin + '/', { waitUntil: 'networkidle' });
    const a = await page.locator('#ribbon-shape').getAttribute('d');
    await page.waitForTimeout(400);
    assert.equal(await page.locator('#ribbon-shape').getAttribute('d'), a);
  });

  assert.deepEqual(errors, [], 'console errors:\n' + errors.join('\n'));
  console.log(`\nQA OK: ${passed} checks against ${origin}. Screenshots in ${out}/`);
} finally {
  await browser.close();
  server?.close();
}
