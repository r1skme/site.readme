import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, copyFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const output = 'qa-output';
mkdirSync(output, { recursive: true });
const base = 'http://127.0.0.1:4176/';
const server = spawn(
  'node',
  ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', '4176'],
  { stdio: 'ignore' },
);
const report = {
  version: 9,
  checks: [],
  identityChecks: [],
  wordCounts: {},
  errors: [],
  limits: ['Chromium automated checks, not a physical iPhone or a user-device FPS measurement.'],
};
const pass = (s) => {
  report.checks.push(s);
  console.log('V9_PASS', s);
};
let browser, page;
try {
  let ready = false;
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(base)).ok) {
        ready = true;
        break;
      }
    } catch {}
    await new Promise((r) => setTimeout(r, 150));
  }
  assert.ok(ready);
  browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
  });
  page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on('pageerror', (e) => report.errors.push(e.message));
  if (process.env.OFFLINE_REVIEW)
    await page.route('**/*', (route) =>
      route.request().url().startsWith('http://127.0.0.1:') ? route.continue() : route.abort(),
    );
  async function visit(route = '', lang = 'ru') {
    await page.goto(base + route + '?lang=' + lang, { waitUntil: 'domcontentloaded' });
    await page.locator('.page-main h1').waitFor();
    await page.waitForTimeout(450);
    await page.evaluate(() =>
      Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 3500))]),
    );
  }
  await visit();
  const widths = [];
  for (let i = 0; i < 45; i++) {
    widths.push(await page.locator('.textloop').evaluate((el) => el.getBoundingClientRect().width));
    await page.waitForTimeout(110);
  }
  assert.ok(Math.max(...widths) - Math.min(...widths) < 1, 'TextLoop moves surrounding layout');
  pass('Rotating text keeps its full width across a change of word');
  const before = await page.locator('#ribbon-shape').getAttribute('d');
  await page.waitForTimeout(500);
  assert.notEqual(await page.locator('#ribbon-shape').getAttribute('d'), before);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(220);
  const stopped = await page.locator('#ribbon-shape').getAttribute('d');
  await page.waitForTimeout(400);
  assert.equal(await page.locator('#ribbon-shape').getAttribute('d'), stopped);
  pass('Continuous ribbon respects system reduced motion');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.waitForTimeout(160);
  for (const width of [320, 390, 768, 1440])
    for (const route of ['', 'projects/', 'projects/researchify/']) {
      await page.setViewportSize({ width, height: width < 600 ? 844 : 1000 });
      await visit(route);
      const identity =
        route === 'projects/researchify/'
          ? page.locator('h1 .project-identity')
          : page.locator(`a[href$='/projects/researchify/'] .project-identity`).first();
      await identity.waitFor();
      const result = await identity.evaluate((el) => {
        const mark = el.querySelector('img'),
          name = el.querySelector('.project-identity-name'),
          arrow = el.querySelector('.project-identity-arrow');
        const m = mark.getBoundingClientRect(),
          n = name.getBoundingClientRect(),
          a = arrow?.getBoundingClientRect();
        return {
          loaded: mark.complete && mark.naturalWidth > 0,
          centers: Math.abs(m.y + m.height / 2 - (n.y + n.height / 2)),
          gap: n.x - m.right,
          arrowGap: a ? a.x - n.right : null,
          width: innerWidth,
          scroll: document.documentElement.scrollWidth,
        };
      });
      assert.ok(result.loaded);
      assert.ok(result.centers < 3, JSON.stringify(result));
      assert.ok(result.gap >= 7 && result.gap < 35);
      if (result.arrowGap !== null) assert.ok(result.arrowGap >= 7 && result.arrowGap < 45);
      assert.ok(result.scroll <= result.width + 1);
      report.identityChecks.push({ width, route, ...result });
    }
  pass('RS mark, name and arrow share an aligned lockup at four viewport sizes');
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const lang of ['ru', 'en']) {
    await visit('about/', lang);
    const text = await page.locator('.page-main').innerText();
    report.wordCounts[lang] = text.split(/\s+/).filter(Boolean).length;
    assert.ok(report.wordCounts[lang] >= 600);
    for (const term of ['Market.CSGO', 'SQLite', 'C++20', 'Spurdo', 'Fatality', 'GLOW RUST'])
      assert.ok(text.includes(term), term);
    assert.ok(!text.includes('Набор громких'));
  }
  pass(
    'About includes detailed technical practice, user support and project lessons in both languages',
  );
  await page.setViewportSize({ width: 320, height: 844 });
  await visit('about/');
  const overflow = await page
    .locator('.v9-experience-list article,.v9-human-columns article,.v9-process-list article')
    .evaluateAll((items) =>
      items
        .filter((el) => el.scrollWidth > el.clientWidth + 1)
        .map((el) => el.textContent.slice(0, 70)),
    );
  assert.deepEqual(overflow, []);
  pass('Expanded reading sections do not overflow at 320px');
  await page.setViewportSize({ width: 1440, height: 1000 });
  await visit();
  await page.locator('a[href="/about/"]').first().click();
  await page.waitForURL('**/about/');
  await page.locator('.v9-profile-intro').waitFor();
  await page.waitForTimeout(650);
  assert.ok(await page.evaluate(() => scrollY < 2));
  pass('Page transition restores scroll once without a second jump');
  await page.evaluate(() => scrollTo({ top: 700, behavior: 'instant' }));
  await page.waitForTimeout(200);
  const savedY = await page.evaluate(() => scrollY);
  await page.locator('.glass-dock-link[href$="/projects/"]').click();
  await page.waitForURL('**/projects/');
  await page.waitForTimeout(600);
  assert.ok(await page.evaluate(() => scrollY < 2));
  await page.goBack();
  await page.locator('.v9-profile-intro').waitFor();
  await page.waitForTimeout(650);
  assert.ok(
    Math.abs((await page.evaluate(() => scrollY)) - savedY) < 4,
    'Back must restore the reading position',
  );
  pass('Browser Back restores the reading position of the long About page');
  async function shot(route, name, width = 1440, height = 1000, full = false) {
    await page.setViewportSize({ width, height });
    await visit(route);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    if (full) {
      await page.evaluate(() =>
        document.querySelectorAll('.reveal-ready').forEach((el) => el.classList.add('revealed')),
      );
    }
    await page.waitForTimeout(100);
    await page.screenshot({ path: `${output}/${name}.png`, fullPage: full });
  }
  await shot('about/', 'v9-about', 1440, 1000, true);
  await shot('skills/', 'v9-skills', 1440, 1000, true);
  await shot('', 'v9-home', 1440, 1000, true);
  await shot('about/', 'v9-about-mobile', 390, 844, true);
  await shot('', 'v9-home-mobile', 390, 844, false);
  await page.locator('a[href$="/projects/researchify/"]').first().scrollIntoViewIfNeeded();
  await page
    .locator('a[href$="/projects/researchify/"]')
    .first()
    .screenshot({ path: `${output}/v9-rs-mobile.png` });
  await shot('projects/', 'v9-projects', 1440, 1000, true);
  const reduce = await browser.newContext({
    reducedMotion: 'reduce',
    viewport: { width: 390, height: 844 },
  });
  const rp = await reduce.newPage();
  if (process.env.OFFLINE_REVIEW)
    await rp.route('**/*', (r) =>
      r.request().url().startsWith('http://127.0.0.1:') ? r.continue() : r.abort(),
    );
  await rp.goto(base);
  await rp.locator('.textloop-word').waitFor();
  const word = await rp.locator('.textloop-word').innerText();
  await rp.waitForTimeout(3700);
  assert.equal(await rp.locator('.textloop-word').innerText(), word);
  await reduce.close();
  pass('Reduced motion keeps the text loop static');
  assert.deepEqual(report.errors, []);
  pass('No uncaught JavaScript errors in content and motion checks');
  writeFileSync(`${output}/report-v9.json`, JSON.stringify(report, null, 2));
  mkdirSync('dist/_review', { recursive: true });
  for (const name of [
    'v9-about',
    'v9-skills',
    'v9-home',
    'v9-about-mobile',
    'v9-home-mobile',
    'v9-rs-mobile',
    'v9-projects',
  ])
    copyFileSync(`${output}/${name}.png`, `dist/_review/${name}.png`);
  copyFileSync(`${output}/report-v9.json`, 'dist/_review/report-v9.json');
  console.log(
    'V9_QA_SUCCESS',
    JSON.stringify({
      checks: report.checks.length,
      identities: report.identityChecks.length,
      words: report.wordCounts,
    }),
  );
} catch (e) {
  report.failure = String(e);
  writeFileSync(`${output}/report-v9.json`, JSON.stringify(report, null, 2));
  console.error(e);
  if (page)
    try {
      await page.screenshot({ path: `${output}/failure-v9.png`, fullPage: true });
    } catch {}
  process.exitCode = 1;
} finally {
  await browser?.close();
  server.kill('SIGTERM');
}
