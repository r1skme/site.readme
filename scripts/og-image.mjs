// Renders the link-preview card (1200×630) to public/og/default.png.
// Run after changing the role line: node scripts/og-image.mjs
import { chromium } from '@playwright/test';

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&family=Onest:wght@500&family=Unbounded:wght@600&display=swap" rel="stylesheet">
<style>
  body{margin:0;width:1200px;height:630px;overflow:hidden;background:#060b15;color:#f2f6ff;font-family:Onest,sans-serif;position:relative}
  .ribbon{position:absolute;inset:0}
  .wash{position:absolute;inset:0;background:radial-gradient(ellipse at 20% 80%,#14417e55,transparent 55%),radial-gradient(ellipse at 85% 10%,#5228a155,transparent 55%)}
  .content{position:absolute;left:84px;top:110px;right:84px}
  h1{margin:0;font:600 190px/0.9 Unbounded;letter-spacing:-0.07em;background:linear-gradient(180deg,#fff 30%,#b8c8ea);-webkit-background-clip:text;color:transparent;display:inline-block;padding-right:.12em}
  h1 span{background:linear-gradient(100deg,#5fdcf0,#6b8cff 45%,#a37dff);-webkit-background-clip:text}
  .role{margin-top:44px;font:500 34px/1.35 'IBM Plex Mono';color:#5fdcf0}
  .pitch{margin-top:18px;font-size:34px;color:#c9d6ee}
  .url{position:absolute;right:84px;bottom:56px;font:500 26px 'IBM Plex Mono';color:#74859f}
</style></head><body>
<svg class="ribbon" viewBox="0 0 1200 630" preserveAspectRatio="none">
  <defs><linearGradient id="g" x1="0" y1=".75" x2="1" y2=".12"><stop stop-color="#1eb2cb"/><stop offset=".32" stop-color="#2088ee"/><stop offset=".57" stop-color="#4157f0"/><stop offset="1" stop-color="#8210df"/></linearGradient></defs>
  <path d="M520 700C700 520 760 360 900 260S1100 80 1260-40V230C1120 300 1000 420 920 560S800 700 760 700Z" fill="url(#g)" opacity=".55"/>
</svg>
<div class="wash"></div>
<div class="content">
  <h1>R1SK<span>.</span></h1>
  <div class="role">Python / C++ developer</div>
  <div class="pitch">ReSearchify · Prime Market · video editing</div>
</div>
<div class="url">predict.rip</div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/og/default.png' });
await browser.close();
console.log('Wrote public/og/default.png');
