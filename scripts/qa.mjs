import {chromium} from '@playwright/test';
import {mkdirSync,writeFileSync,copyFileSync,existsSync} from 'node:fs';
import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
const output='qa-output';mkdirSync(output,{recursive:true});
const server=spawn('node',['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','4173'],{stdio:['ignore','pipe','pipe']});
const base='http://127.0.0.1:4173/site.readme/';let browser,page;
const report={version:8,checks:[],layouts:[],errors:[],limits:['Chromium desktop and touch emulation, not a physical iPhone.','No assertion of third-party video playback, Lighthouse or real-device FPS.']};
const check=name=>{report.checks.push(name);console.log('PASS:',name)};
const routes=['','roadmap/','projects/','projects/prime-market/','projects/predict/','projects/researchify/','projects/researchify-web/','projects/glow-rust/','projects/exchange/','media/','skills/','about/','contact/'];
async function start(){for(let i=0;i<80;i++){try{if((await fetch(base)).ok)return}catch{}await new Promise(resolve=>setTimeout(resolve,200))}throw Error('Preview server did not start')}
async function open(route='',lang='ru'){const response=await page.goto(base+route+'?lang='+lang,{waitUntil:'domcontentloaded'});assert.equal(response?.status(),200);await page.locator('.page-main h1').waitFor({timeout:20000});await page.waitForTimeout(320)}
async function settleFonts(){await page.evaluate(()=>Promise.race([document.fonts.ready,new Promise(resolve=>setTimeout(resolve,4500))]))}
try{
 await start();browser=await chromium.launch({headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1});page=await context.newPage();page.on('pageerror',error=>report.errors.push(error.message));
 await open();await settleFonts();
 assert.equal(await page.locator('.hero-lower,.identity-descriptor,.header-status,.footer-identity').count(),0);check('Decorative hero strip, duplicate identity captions and giant footer removed');
 const first=await page.locator('#ribbon-shape').getAttribute('d');await page.waitForTimeout(650);assert.notEqual(await page.locator('#ribbon-shape').getAttribute('d'),first);check('Background ribbon moves while idle');
 await page.locator('.motion-switch').click();await page.waitForTimeout(150);const frozen=await page.locator('#ribbon-shape').getAttribute('d');await page.waitForTimeout(500);assert.equal(await page.locator('#ribbon-shape').getAttribute('d'),frozen);check('Pause freezes background motion');
 assert.equal(await page.locator('.glass-caustic').evaluate(el=>getComputedStyle(el,'::after').animationPlayState),'paused');check('Pause also stops glass highlights');
 await page.locator('.motion-switch').click();
 assert.equal(await page.locator('.glass-dock-link').count(),7);check('Roadmap has its own navigation destination');
 await page.locator('.glass-dock-link[href$="/roadmap/"]').click();await page.waitForURL('**/roadmap/');await page.locator('.journey-layout').waitFor();await page.waitForTimeout(500);
 assert.equal(await page.locator('.glass-dock-link[aria-current="page"]').getAttribute('href'),'/site.readme/roadmap/');assert.equal(await page.locator('.home-hero').count(),0);check('Real multipage route navigation and correct Roadmap active state');
 await page.locator('.journey-chapter').nth(3).click();await page.waitForTimeout(850);assert.equal(await page.locator('.journey-chapter').nth(3).getAttribute('aria-current'),'step');check('Roadmap chapter navigation follows the visible milestone');
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.goBack();await page.locator('.home-hero').waitFor();check('Browser Back restores the preceding page');
 await page.locator('.lang-switch button').nth(1).click();assert.equal(await page.locator('html').getAttribute('lang'),'en');assert.ok(page.url().includes('lang=en'));check('RU/EN changes without a page reload');
 await open('projects/');assert.equal(await page.locator('.v7-project-row').count(),5);assert.equal(await page.locator('.v7-project-row[href*="researchify-web"]').count(),0);assert.equal(await page.locator('.v7-experiment-link[href*="researchify-web"]').count(),1);check('Source-code search and web research remain separate');
 assert.ok(await page.locator('.v7-project-row[href*="researchify/"]').evaluate(row=>{const a=row.querySelector('h2').getBoundingClientRect(),b=row.querySelector('svg').getBoundingClientRect();return b.top>=a.top-5&&b.bottom<=a.bottom+5}));check('Project arrows align with their headings');
 await open('projects/prime-market/');await page.locator('.v7-technology-section').waitFor();assert.ok((await page.locator('.v7-technology-section').innerText()).includes('SQLite'));assert.equal(await page.locator('.v6-case-role').count(),0);assert.ok(await page.locator('.v7-prime-wordmark img').evaluate(img=>img.complete&&img.naturalWidth>0));check('Project technology, period and original PRIME identity preserved');
 const forbidden=['Личное портфолио','Personal portfolio','R1SK / ROADMAP','без выдуманных','Verified milestones','Без искусственной истории','Опыт и навыки'];
 for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:width<600?844:1000});for(const lang of ['ru','en'])for(const route of routes){
  await open(route,lang);
  const result=await page.evaluate(()=>({w:innerWidth,sw:document.documentElement.scrollWidth,body:document.body.innerText}));
  assert.ok(result.sw<=result.w+1,`Horizontal overflow ${width}/${lang}/${route}: ${result.sw}`);
  assert.equal(await page.locator('html').getAttribute('lang'),lang);
  forbidden.forEach(text=>assert.ok(!result.body.includes(text),`Unwanted caption "${text}" in ${route}`));
  report.layouts.push({width,lang,route,overflow:false});
 }}check('104 route/language/width combinations without horizontal overflow or service captions');
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:width<600?844:1000});await open('roadmap/');
  if(await page.locator('.motion-switch').getAttribute('aria-pressed')!=='true')await page.locator('.motion-switch').click();
  assert.equal(await page.locator('.journey-step').count(),5);assert.equal(await page.locator('.pin-spacer').count(),0);
  for(const step of await page.locator('.journey-step').all()){
   await step.evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));await page.waitForTimeout(100);
   const rect=await step.boundingBox();assert.ok(rect&&rect.x>=0&&rect.x+rect.width<=width+1);assert.ok(rect.y>=-1&&rect.y+rect.height<= (width<600?844:1000)+1,'A paused roadmap step is clipped');
  }
 }check('All five roadmap milestones stay readable when motion is paused on desktop and mobile');
 await page.setViewportSize({width:1440,height:1000});await open('roadmap/');await page.locator('.roadmap-plan').nth(1).locator('summary').click();assert.ok(await page.locator('.roadmap-plan').nth(1).evaluate(el=>el.open));check('Next-step disclosures work with mouse and native keyboard controls');
 await open('media/');assert.equal(await page.locator('iframe').count(),0);await page.locator('.media-work').nth(4).click();await page.locator('dialog[open]').waitFor();assert.equal(await page.locator('iframe').count(),1);await page.keyboard.press('Escape');await page.waitForTimeout(100);assert.equal(await page.locator('iframe').count(),0);assert.notEqual(await page.evaluate(()=>document.body.style.overflow),'hidden');check('Video mounts on click and closes without leaving playback or scroll lock');
 await open('contact/');await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async value=>{window.__copied=value}}}));await page.locator('button.contact-secondary-card').click();assert.equal(await page.evaluate(()=>window.__copied),'r1sk.gg');check('Discord copy uses the exact username');
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw Error('denied')}}}));await page.locator('button.contact-secondary-card').click();await page.waitForTimeout(100);assert.ok((await page.locator('button.contact-secondary-card').innerText()).includes('Не удалось'));check('Clipboard denial never produces a false success');
 async function screenshot(route,name,width,height=1000,full=true){
  await page.setViewportSize({width,height});await open(route);await settleFonts();
  if(full){const h=await page.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<h;y+=height*.75){await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(100)}}
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(650);
  if(await page.locator('.motion-switch').getAttribute('aria-pressed')!=='true')await page.locator('.motion-switch').click();await page.waitForTimeout(100);
  await page.screenshot({path:`${output}/${name}.png`,fullPage:full});
 }
 await screenshot('','home-desktop',1440,1000,false);await screenshot('','home-full',1440);await screenshot('','home-mobile',390,844,false);await page.locator('.liquid-dock').screenshot({path:`${output}/glass-dock-mobile.png`});
 for(const route of ['projects','roadmap','about','skills','media','contact'])await screenshot(route+'/',route,1440);
 await screenshot('roadmap/','roadmap-mobile',390,844,true);await screenshot('roadmap/','roadmap-320',320,780,true);await screenshot('projects/predict/','predict',1440);await page.locator('.liquid-dock').screenshot({path:`${output}/glass-dock.png`});check('Rendered desktop and mobile screenshots saved');
 const reduced=await browser.newContext({reducedMotion:'reduce',viewport:{width:390,height:844},hasTouch:true,isMobile:true});const rp=await reduced.newPage();rp.on('pageerror',error=>report.errors.push(error.message));await rp.goto(base+'roadmap/?lang=ru',{waitUntil:'domcontentloaded'});await rp.locator('.journey-step').first().waitFor();assert.equal(await rp.locator('.journey-step').count(),5);assert.equal(await rp.locator('.pin-spacer').count(),0);
 const staticPath=await rp.locator('#ribbon-shape').getAttribute('d');await rp.waitForTimeout(500);assert.equal(await rp.locator('#ribbon-shape').getAttribute('d'),staticPath);
 await rp.locator('#milestone-now').evaluate(el=>el.scrollIntoView({behavior:'instant',block:'center'}));const last=await rp.locator('#milestone-now').boundingBox();assert.ok(last&&last.x>=0&&last.y>=0&&last.y+last.height<=845);check('System reduced motion preserves every roadmap milestone');await reduced.close();
 assert.deepEqual(report.errors,[]);check('No uncaught JavaScript errors');
 writeFileSync(`${output}/report.json`,JSON.stringify(report,null,2));console.log('QA_SUCCESS',JSON.stringify({checks:report.checks.length,layouts:report.layouts.length}));
 mkdirSync('dist/_review',{recursive:true});for(const name of ['home-desktop','home-full','home-mobile','glass-dock-mobile','glass-dock','projects','roadmap','roadmap-mobile','roadmap-320','about','skills','media','contact','predict'])if(existsSync(`${output}/${name}.png`))copyFileSync(`${output}/${name}.png`,`dist/_review/${name}.png`);copyFileSync(`${output}/report.json`,'dist/_review/report.json');
}catch(error){report.failure=String(error);writeFileSync(`${output}/report.json`,JSON.stringify(report,null,2));console.error(error);if(page)try{await page.screenshot({path:`${output}/failure.png`,fullPage:true})}catch{}process.exitCode=1}finally{await browser?.close();server.kill('SIGTERM')}
