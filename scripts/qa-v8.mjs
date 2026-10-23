import {chromium} from '@playwright/test';
import {mkdirSync,writeFileSync,copyFileSync} from 'node:fs';
import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
const base='http://127.0.0.1:4174/';
const output='qa-output';mkdirSync(output,{recursive:true});
const report={version:8,checks:[],layouts:[],errors:[],limits:['Chromium desktop and touch emulation; not physical iPhone testing.']};
const server=spawn('node',['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','4174'],{stdio:'ignore'});
let browser,page;
const ok=name=>{report.checks.push(name);console.log('V8_PASS:',name);};
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function waitForServer(){for(let i=0;i<60;i++){try{if((await fetch(base)).ok)return;}catch{}await sleep(200);}throw new Error('V8 preview server did not start');}
async function screen(name,fullPage=false){await page.waitForTimeout(350);await page.screenshot({path:`${output}/${name}.png`,fullPage});}
try{
 await waitForServer();browser=await chromium.launch({headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1});page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
 await page.goto(base+'?lang=ru',{waitUntil:'domcontentloaded'});await page.locator('.home-hero h1').waitFor();await page.waitForTimeout(700);
 assert.equal(await page.locator('.hero-lower,.identity-descriptor,.header-status,.footer-identity').count(),0);
 assert.ok(!(await page.locator('body').innerText()).includes('Личное портфолио'));
 ok('Redundant hero, header and footer notes are removed from the DOM');
 await screen('v8-home-desktop');
 await page.goto(base+'roadmap/?lang=ru',{waitUntil:'domcontentloaded'});await page.locator('.v8-story-step').last().waitFor();await page.waitForTimeout(600);
 assert.equal(await page.locator('.v8-story-step').count(),6);assert.equal(await page.locator('.pin-spacer').count(),0);
 assert.equal(await page.locator('.v7-journey-track,.v7-journey-counter,.v7-overline').count(),0);
 ok('Roadmap has six real chapters and no pinned horizontal rail or decorative counters');
 const arrow=page.locator('.v8-chapters a').nth(5);await arrow.click();
 await page.waitForFunction(()=>document.querySelector('.v8-story-step.is-reading')?.id==='journey-search',{},{timeout:5000});
 const position=await page.locator('#journey-search').boundingBox();assert.ok(position.y>-10&&position.y<innerHeightPlaceholder());
 ok('Chapter navigation scrolls to ReSearchify and tracks the active chapter');
 await screen('v8-roadmap-reading');
 await page.locator('.v8-chapters a').first().click();await page.waitForTimeout(950);
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(400);await screen('v8-roadmap-desktop');
 // Capture all chapters without screenshotting a moving pin container.
 await page.evaluate(()=>document.querySelectorAll('.reveal-ready').forEach(el=>el.classList.add('revealed')));
 await page.emulateMedia({reducedMotion:'reduce'});
 await screen('v8-roadmap-full',true);
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:width<600?844:1000});
  for(const lang of ['ru','en']){
   for(const route of ['','roadmap/']){
    await page.goto(base+route+'?lang='+lang,{waitUntil:'domcontentloaded'});await page.locator('.page-main h1').waitFor();await page.waitForTimeout(350);
    const dims=await page.evaluate(()=>({width:innerWidth,document:document.documentElement.scrollWidth}));assert.ok(dims.document<=dims.width+1,`v8 overflow ${route} ${lang} ${width}`);
    if(route){assert.equal(await page.locator('.v8-story-step').count(),6);const cards=await page.locator('.v8-story-step').evaluateAll(nodes=>nodes.map(n=>({w:n.clientWidth,s:n.scrollWidth})));assert.ok(cards.every(c=>c.s<=c.w+1),'Chapter text overflow');}
    report.layouts.push({width,lang,route,overflow:false});
   }
  }
 }
 ok('16 home/roadmap screen-language combinations have no horizontal or chapter overflow');
 await page.setViewportSize({width:390,height:844});await page.goto(base+'roadmap/?lang=ru',{waitUntil:'domcontentloaded'});await page.locator('.v8-story-step').first().waitFor();
 await screen('v8-roadmap-mobile');
 await page.locator('.v8-chapters a').last().click();await page.waitForTimeout(500);
 assert.ok((await page.locator('#journey-search').boundingBox()).y<400);ok('Last chapter is reachable on a touch-sized screen');
 await page.evaluate(()=>{document.querySelectorAll('.reveal-ready').forEach(el=>el.classList.add('revealed'));scrollTo({top:0,behavior:'instant'});});await screen('v8-roadmap-mobile-full',true);
 await page.goto(base+'?lang=ru',{waitUntil:'domcontentloaded'});await page.locator('.home-hero').waitFor();await screen('v8-home-mobile');
 const reduced=await browser.newContext({reducedMotion:'reduce',viewport:{width:390,height:844}});const rp=await reduced.newPage();
 await rp.goto(base+'roadmap/?lang=en',{waitUntil:'domcontentloaded'});await rp.locator('.v8-story-step').last().waitFor();
 assert.equal(await rp.locator('.pin-spacer').count(),0);await rp.locator('.v8-chapters a').last().click();await rp.waitForTimeout(100);assert.ok((await rp.locator('#journey-search').boundingBox()).y<200);await reduced.close();
 ok('Reduced-motion roadmap keeps every chapter readable with instant navigation');
 assert.deepEqual(report.errors,[]);ok('No JavaScript errors in focused v8 checks');
 writeFileSync(`${output}/report-v8.json`,JSON.stringify(report,null,2));mkdirSync('dist/_review',{recursive:true});
 for(const name of ['v8-home-desktop','v8-home-mobile','v8-roadmap-desktop','v8-roadmap-reading','v8-roadmap-full','v8-roadmap-mobile','v8-roadmap-mobile-full'])copyFileSync(`${output}/${name}.png`,`dist/_review/${name}.png`);
 copyFileSync(`${output}/report-v8.json`,'dist/_review/report-v8.json');
 console.log('V8_QA_SUCCESS',JSON.stringify({checks:report.checks.length,layouts:report.layouts.length}));
}catch(error){report.failure=String(error);writeFileSync(`${output}/report-v8.json`,JSON.stringify(report,null,2));console.error(error);if(page)try{await page.screenshot({path:`${output}/failure-v8.png`,fullPage:true});}catch{}process.exitCode=1;}finally{await browser?.close();server.kill('SIGTERM');}
function innerHeightPlaceholder(){return 1000;}
