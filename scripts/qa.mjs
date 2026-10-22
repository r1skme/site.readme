import {chromium} from '@playwright/test';
import {mkdirSync,writeFileSync,copyFileSync,existsSync} from 'node:fs';
import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
const output='qa-output';mkdirSync(output,{recursive:true});
const server=spawn('node',['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','4173'],{stdio:['ignore','pipe','pipe']});
const base='http://127.0.0.1:4173/site.readme/';let browser,page;
const report={version:5,checks:[],layouts:[],limits:['Chromium desktop and touch emulation, not a physical iPhone.','Third-party video playback is not asserted; player mounting and teardown are tested.','No Lighthouse or FPS score claimed.'],errors:[]};
const check=name=>{report.checks.push(name);console.log('PASS:',name)};
const waitServer=async()=>{for(let i=0;i<80;i++){try{if((await fetch(base)).ok)return}catch{}await new Promise(r=>setTimeout(r,200))}throw Error('Preview server failed to start')};
try{
 await waitServer();browser=await chromium.launch({headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1});page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
 await page.goto(base,{waitUntil:'domcontentloaded'});await page.locator('.home-hero h1').waitFor();await page.waitForTimeout(1200);
 const first=await page.locator('#ribbon-shape').getAttribute('d');await page.waitForTimeout(700);assert.notEqual(await page.locator('#ribbon-shape').getAttribute('d'),first);check('Autonomous ribbon changes while idle');
 await page.locator('.motion-switch').click();await page.waitForTimeout(180);
 const frozen=await page.locator('#ribbon-shape').getAttribute('d');await page.waitForTimeout(650);assert.equal(await page.locator('#ribbon-shape').getAttribute('d'),frozen);check('Motion pause freezes ribbon geometry');
 assert.equal(await page.locator('.glass-caustic').evaluate(el=>getComputedStyle(el,'::after').animationPlayState),'paused');check('Motion pause also stops glass surface highlights');
 await page.locator('.motion-switch').click();await page.waitForTimeout(120);
 await page.locator('.glass-dock-link[href$="/about/"]').click();await page.waitForURL('**/about/');await page.locator('.about-opening').waitFor();await page.waitForTimeout(650);
 assert.equal(await page.locator('.glass-dock-link[aria-current="page"]').getAttribute('href'),'/site.readme/about/');check('Separate About URL and active glass lens');
 assert.equal(await page.locator('.home-hero').count(),0);check('Outgoing page unmounted rather than stacking sections');
 await page.goBack();await page.waitForURL('**/site.readme/');await page.locator('.home-hero').waitFor();check('Browser Back restores prior page');
 await page.locator('.lang-switch button').nth(1).click();assert.equal(await page.locator('html').getAttribute('lang'),'en');assert.ok(page.url().includes('lang=en'));check('Language switches without document reload');
 await page.locator('.lang-switch button').first().click();
 const routes=['','projects/','projects/prime-market/','projects/predict/','projects/researchify/','projects/researchify-web/','projects/glow-rust/','projects/exchange/','media/','skills/','about/','contact/'];
 for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:width<600?844:1000});for(const lang of ['ru','en']){for(const route of routes){
  const response=await page.goto(base+route+'?lang='+lang,{waitUntil:'domcontentloaded'});assert.equal(response?.status(),200);
  await page.locator('.page-main h1').waitFor({timeout:20000});await page.waitForTimeout(550);
  const dims=await page.evaluate(()=>({w:innerWidth,scroll:document.documentElement.scrollWidth,text:document.querySelector('.page-main h1')?.textContent}));
  assert.ok(dims.scroll<=dims.w+1,`Overflow ${width}/${lang}/${route}: ${dims.scroll}`);assert.equal(await page.locator('html').getAttribute('lang'),lang);report.layouts.push({width,lang,route,overflow:false});
 }}}
 check('96 route/language/viewport combinations without horizontal overflow');
 await page.setViewportSize({width:1440,height:1000});await page.goto(base+'media/?lang=ru',{waitUntil:'domcontentloaded'});await page.locator('.media-cards').waitFor();
 assert.equal(await page.locator('iframe').count(),0);await page.locator('.media-work').nth(4).click();await page.locator('dialog[open]').waitFor();assert.equal(await page.locator('iframe').count(),1);
 await page.keyboard.press('Escape');await page.waitForTimeout(100);assert.equal(await page.locator('iframe').count(),0);assert.notEqual(await page.evaluate(()=>document.body.style.overflow),'hidden');check('Video opens deliberately; Escape removes iframe and unlocks scrolling');
 await page.goto(base+'contact/?lang=ru',{waitUntil:'domcontentloaded'});await page.locator('.contact-main').waitFor();
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async(value)=>{window.__copied=value}}}));await page.locator('button.contact-secondary-card').click();assert.equal(await page.evaluate(()=>window.__copied),'r1sk.gg');check('Discord copy uses exact username');
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw Error('denied')}}}));await page.locator('button.contact-secondary-card').click();await page.waitForTimeout(100);assert.ok((await page.locator('button.contact-secondary-card').innerText()).includes('Не удалось'));check('Clipboard denial shows failure, never fake success');
 async function screenshot(route,name,width,height=1000,full=true){
  await page.setViewportSize({width,height});await page.goto(base+route+'?lang=ru',{waitUntil:'domcontentloaded'});await page.locator('.page-main h1').waitFor();
  await page.evaluate(()=>Promise.race([document.fonts.ready,new Promise(resolve=>setTimeout(resolve,4000))]));await page.waitForTimeout(800);
  if(full){const h=await page.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<h;y+=height*.75){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(120)}await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(800)}
  if(await page.locator('.motion-switch').getAttribute('aria-pressed')!=='true')await page.locator('.motion-switch').click();await page.waitForTimeout(100);
  await page.screenshot({path:`${output}/${name}.png`,fullPage:full});
 }
 await screenshot('','home-desktop',1440,1000,false);await screenshot('','home-full',1440,1000);await screenshot('','home-mobile',390,844,false);
 await page.locator('.liquid-dock').screenshot({path:`${output}/glass-dock-mobile.png`});
 for(const route of ['projects','about','skills','media','contact'])await screenshot(route+'/',route,1440,1000,true);
 await screenshot('projects/predict/','predict',1440,1000,true);await page.locator('.liquid-dock').screenshot({path:`${output}/glass-dock.png`});
 check('Real page screenshots captured after rendering');
 const reduced=await browser.newContext({reducedMotion:'reduce',viewport:{width:390,height:844},hasTouch:true,isMobile:true});const rp=await reduced.newPage();await rp.goto(base,{waitUntil:'domcontentloaded'});await rp.locator('.home-hero').waitFor();await rp.waitForTimeout(100);const d=await rp.locator('#ribbon-shape').getAttribute('d');await rp.waitForTimeout(700);assert.equal(await rp.locator('#ribbon-shape').getAttribute('d'),d);check('System reduced motion starts with static geometry');await reduced.close();
 assert.deepEqual(report.errors,[]);check('No uncaught JavaScript errors in exercised scenarios');
 writeFileSync(`${output}/report.json`,JSON.stringify(report,null,2));console.log('QA_SUCCESS',JSON.stringify({checks:report.checks.length,layouts:report.layouts.length}));
 mkdirSync('dist/_review',{recursive:true});for(const name of ['home-desktop','home-full','home-mobile','glass-dock-mobile','glass-dock','projects','about','skills','media','contact','predict'])if(existsSync(`${output}/${name}.png`))copyFileSync(`${output}/${name}.png`,`dist/_review/${name}.png`);
 copyFileSync(`${output}/report.json`,'dist/_review/report.json');
}catch(error){report.failure=String(error);writeFileSync(`${output}/report.json`,JSON.stringify(report,null,2));console.error(error);if(page)try{await page.screenshot({path:`${output}/failure.png`,fullPage:true})}catch{}process.exitCode=1}finally{await browser?.close();server.kill('SIGTERM')}
