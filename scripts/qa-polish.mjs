import {chromium} from '@playwright/test';
import {spawn} from 'node:child_process';
import {mkdirSync,writeFileSync,copyFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const base='http://127.0.0.1:4174/site.readme/';
const server=spawn('node',['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','4174'],{stdio:'ignore'});
const result={checks:[],errors:[]};let browser,page;
try{
 let ready=false;for(let i=0;i<60;i++){try{if((await fetch(base)).ok){ready=true;break}}catch{}await new Promise(resolve=>setTimeout(resolve,200))}assert.ok(ready);
 browser=await chromium.launch({headless:true});page=await browser.newPage({viewport:{width:390,height:844}});page.on('pageerror',error=>result.errors.push(error.message));
 await page.goto(base+'roadmap/?lang=ru',{waitUntil:'domcontentloaded'});await page.locator('.journey-step').first().waitFor();await page.waitForTimeout(400);
 if(await page.locator('.motion-switch').getAttribute('aria-pressed')!=='true')await page.locator('.motion-switch').click();
 await page.locator('.roadmap-plan').nth(1).locator('summary').click();await page.waitForTimeout(250);
 const body=page.locator('.roadmap-plan').nth(1).locator('.roadmap-plan-body');assert.ok(await body.isVisible());assert.ok(await body.evaluate(el=>Number(getComputedStyle(el).opacity)>.99));assert.ok((await body.innerText()).includes('буквальный поиск'));
 result.checks.push('Opening a next-step disclosure with paused animation does not hide its text');
 await page.locator('.roadmap-plan').nth(1).screenshot({path:'qa-output/roadmap-plan-open.png'});
 await page.goto(base+'?lang=ru',{waitUntil:'domcontentloaded'});await page.locator('.home-hero').waitFor();await page.waitForTimeout(650);
 await page.evaluate(()=>Promise.race([document.fonts.ready,new Promise(resolve=>setTimeout(resolve,3000))]));
 await page.locator('.v6-focus-section h2').evaluate(el=>{const y=el.getBoundingClientRect().top+window.scrollY-(window.innerHeight-58);window.scrollTo({top:Math.max(0,y),behavior:'instant'})});await page.waitForTimeout(200);
 const blur=await page.locator('.liquid-dock').evaluate(el=>getComputedStyle(el).backdropFilter);assert.ok(blur.includes('blur('));
 result.checks.push('Backdrop blur is applied to the navigation element, not an isolated descendant');
 await page.screenshot({path:'qa-output/dock-over-text-mobile.png'});
 await page.locator('.liquid-dock').screenshot({path:'qa-output/glass-dock-mobile-tested.png'});
 assert.deepEqual(result.errors,[]);writeFileSync('qa-output/report-polish.json',JSON.stringify(result,null,2));mkdirSync('dist/_review',{recursive:true});
 for(const name of ['roadmap-plan-open.png','dock-over-text-mobile.png','glass-dock-mobile-tested.png','report-polish.json'])copyFileSync('qa-output/'+name,'dist/_review/'+name);
 console.log('POLISH_SUCCESS',JSON.stringify(result));
}catch(error){result.failure=String(error);writeFileSync('qa-output/report-polish.json',JSON.stringify(result,null,2));console.error(error);process.exitCode=1;if(page)try{await page.screenshot({path:'qa-output/failure-polish.png',fullPage:true})}catch{}}
finally{await browser?.close();server.kill('SIGTERM')}
