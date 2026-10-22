import {chromium} from '@playwright/test';
import {spawn} from 'node:child_process';
import {mkdirSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const live=process.argv.includes('--live');
const base=live?'https://predict.rip/':'http://127.0.0.1:4178/';
const origin=new URL(base).origin;
const output=live?'qa-domain-live':'qa-domain-local';
const routes=['','about/','roadmap/','projects/','media/','skills/','contact/','projects/prime-market/','projects/predict/','projects/researchify/','projects/researchify-web/','projects/glow-rust/','projects/exchange/'];
const legacy='/'+'site.readme'+'/';
const report={base,checkedAt:new Date().toISOString(),checks:[],routes:[],assets:[],errors:[],resourceFailures:[],externalFailures:[],limits:['Chromium desktop and touch-size emulation; not a physical device.','External video playback is not asserted.']};
mkdirSync(output,{recursive:true});
const server=live?null:spawn('node',['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','4178'],{stdio:'ignore'});
let browser,page;
const pass=message=>{report.checks.push(message);console.log('DOMAIN_PASS:',message)};
const localAsset=url=>{try{const u=new URL(url);return u.origin===origin&&/^\/(assets|media)\//.test(u.pathname)}catch{return false}};
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function waitForDeployment(){
 let last='';
 for(let i=0;i<(live?18:60);i++){
  try{
   const response=await fetch(base+'?domain-check='+Date.now(),{signal:AbortSignal.timeout(15000),headers:{'Cache-Control':'no-cache'}});
   const html=await response.text();
   if(response.ok&&html.includes('predict-root-v1')&&!html.includes(legacy))return;
   last=`HTTP ${response.status}; expected root-domain build has not propagated`;
  }catch(error){last=String(error)}
  await wait(live?5000:150);
 }
 throw Error(`Cannot verify current deployment at ${base}: ${last}`);
}
try{
 await waitForDeployment();
 browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});
 page=await context.newPage();page.setDefaultTimeout(15000);
 page.on('pageerror',error=>report.errors.push(error.message));
 page.on('response',response=>{if(localAsset(response.url())&&response.status()>=400)report.resourceFailures.push({url:response.url(),status:response.status()})});
 page.on('requestfailed',request=>{const entry={url:request.url(),error:request.failure()?.errorText};if(localAsset(request.url())&&!entry.error?.includes('ERR_ABORTED'))report.resourceFailures.push(entry);else if(!request.url().startsWith(origin))report.externalFailures.push(entry)});
 async function visit(route='',lang='ru',reload=false){
  const response=await page.goto(base+route+'?lang='+lang,{waitUntil:'domcontentloaded',timeout:30000});
  assert.equal(response.status(),200,`Direct route ${route}`);
  await page.locator('.page-main h1').waitFor();
  if(reload){const again=await page.reload({waitUntil:'domcontentloaded'});assert.equal(again.status(),200);await page.locator('.page-main h1').waitFor()}
  await page.waitForTimeout(200);
  assert.equal(await page.locator('html').getAttribute('lang'),lang);
  const wrong=await page.evaluate(prefix=>[...document.querySelectorAll('[src],[href]')].map(el=>el.getAttribute('src')||el.getAttribute('href')).filter(value=>value?.startsWith(prefix)),legacy);
  assert.deepEqual(wrong,[],`Old links or resource paths on ${route}`);
  const styles=await page.evaluate(()=>[...document.querySelectorAll('link[rel="stylesheet"]')].filter(el=>new URL(el.href).origin===location.origin).map(el=>({href:el.href,loaded:Boolean(el.sheet)})));
  assert.ok(styles.length>0&&styles.every(item=>item.loaded),'Production stylesheet must be loaded');
  const images=page.locator('img');
  for(let i=0;i<await images.count();i++){
   const image=images.nth(i),src=await image.getAttribute('src');
   if(src&&new URL(src,base).origin===origin){await image.scrollIntoViewIfNeeded();await image.evaluate(img=>img.decode());assert.ok(await image.evaluate(img=>img.complete&&img.naturalWidth>0))}
  }
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
  report.routes.push({route:'/'+route,lang,reload,width:page.viewportSize().width});
 }
 await visit();
 const entries=await page.evaluate(()=>[...document.querySelectorAll('script[src],link[rel="stylesheet"],link[rel="icon"]')].map(el=>el.src||el.href).filter(url=>new URL(url).origin===location.origin));
 for(const url of entries){
  const response=await context.request.get(url);assert.equal(response.status(),200,url);
  const type=response.headers()['content-type']||'';
  assert.ok(!type.includes('text/html'),`HTML was returned in place of ${url}`);
  if(url.endsWith('.js'))assert.match(type,/javascript/);
  if(url.endsWith('.css'))assert.match(type,/css/);
  if(url.endsWith('.svg'))assert.match(type,/svg/);
  report.assets.push({url,status:response.status(),contentType:type});
 }
 pass('Entrypoint JavaScript, CSS and favicon return 200 with correct content types');
 assert.equal(await page.locator('.motion-switch').count(),0);
 const d=await page.locator('#ribbon-shape').getAttribute('d');await page.waitForTimeout(650);assert.notEqual(await page.locator('#ribbon-shape').getAttribute('d'),d);
 const text=await page.locator('.textloop-word').last().innerText();await page.waitForTimeout(3700);assert.notEqual(await page.locator('.textloop-word').last().innerText(),text);
 pass('React renders the full design; background wave and rotating words animate by default');
 await page.locator('.lang-switch button').nth(1).click();assert.equal(await page.locator('html').getAttribute('lang'),'en');
 await page.locator('.glass-dock-link[href="/projects/"]').click();await page.waitForURL(url=>url.pathname==='/projects/');await page.locator('.v7-project-catalog').waitFor();
 await page.goBack();await page.locator('.home-hero').waitFor();
 pass('Root-based navigation, browser Back and RU/EN controls work');
 for(const route of routes)for(const lang of ['ru','en'])await visit(route,lang,true);
 pass('All 13 existing routes open directly and survive reload in both languages');
 await visit('media/');
 await page.locator('.media-work').nth(4).click();await page.locator('dialog[open]').waitFor();assert.equal(await page.locator('iframe').count(),1);
 await page.keyboard.press('Escape');await page.waitForTimeout(150);assert.equal(await page.locator('iframe').count(),0);assert.notEqual(await page.evaluate(()=>document.body.style.overflow),'hidden');
 pass('Video modal opens and closes without leaving playback or scroll lock');
 await visit('contact/');
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async value=>{window.__domainCopied=value}}}));
 await page.locator('button.contact-secondary-card').click();assert.equal(await page.evaluate(()=>window.__domainCopied),'r1sk.gg');
 pass('Contact copy interaction remains functional');
 await visit();
 await page.screenshot({path:`${output}/home-desktop.png`,fullPage:false});
 await visit('projects/researchify/');await page.screenshot({path:`${output}/project-desktop.png`,fullPage:false});
 for(const width of [360,390,430]){
  await page.setViewportSize({width,height:844});
  for(const route of ['','about/','roadmap/']){
   await visit(route);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`Mobile overflow ${width}/${route}`);
  }
 }
 await page.setViewportSize({width:390,height:844});await visit();await page.screenshot({path:`${output}/home-mobile.png`,fullPage:false});
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(250);const stopped=await page.locator('#ribbon-shape').getAttribute('d');await page.waitForTimeout(450);assert.equal(await page.locator('#ribbon-shape').getAttribute('d'),stopped);
 pass('Mobile layouts and system reduced-motion preference are preserved');
 assert.deepEqual(report.errors,[]);assert.deepEqual(report.resourceFailures,[]);
 pass('No JavaScript exceptions or failed first-party asset requests');
 report.success=true;
}catch(error){report.success=false;report.failure=String(error);console.error(error);process.exitCode=1;if(page)try{await page.screenshot({path:`${output}/failure.png`,fullPage:true})}catch{}}
finally{writeFileSync(`${output}/report.json`,JSON.stringify(report,null,2));console.log('DOMAIN_RESULT',JSON.stringify({success:report.success,checks:report.checks.length,routes:report.routes.length,failure:report.failure}));await browser?.close();server?.kill('SIGTERM')}
