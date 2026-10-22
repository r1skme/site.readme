import assert from 'node:assert/strict';
import {existsSync,statSync,readFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
const routes=['','about','roadmap','projects','media','skills','contact','projects/prime-market','projects/predict','projects/researchify','projects/researchify-web','projects/glow-rust','projects/exchange'];
const legacyPrefix='/'+'site.readme'+'/';
for(const route of routes){
 const file=`dist/${route?route+'/':''}index.html`;
 assert.ok(existsSync(file)&&statSync(file).size>200,`Missing HTML entrypoint ${file}`);
 const html=readFileSync(file,'utf8');
 assert.ok(html.includes('id="root"'),`Missing React mount: ${route}`);
 assert.ok(!html.includes(legacyPrefix),`Old repository prefix in ${file}`);
 assert.ok(html.includes('href="/assets/favicon.svg"'),`Wrong favicon path: ${file}`);
 for(const match of html.matchAll(/(?:src|href)="(\/[^"?#]+)(?:[?#][^"]*)?"/g)){
  assert.ok(existsSync(join('dist',match[1].slice(1))),`Missing emitted resource ${match[1]} in ${file}`);
 }
}
for(const asset of ['assets/resolve.svg','assets/capcut.svg','assets/hlae.svg','assets/favicon.svg','assets/prime-wordmark.svg','assets/researchify-mark.svg','media/tiktok-26k.webp','media/tiktok-20k.webp','media/glow-95k.webp','media/glow-16k.webp']){
 assert.ok(existsSync(`dist/${asset}`)&&statSync(`dist/${asset}`).size>100,`Missing asset ${asset}`);
}
function inspect(directory){
 for(const item of readdirSync(directory,{withFileTypes:true})){
  if(item.name==='_review')continue;
  const file=join(directory,item.name);
  if(item.isDirectory())inspect(file);
  else if(/\.(?:html|js|css|svg)$/.test(item.name)){
   assert.ok(!readFileSync(file,'utf8').includes(legacyPrefix),`Old deployed subdirectory remains in ${file}`);
  }
 }
}
inspect('dist');
assert.equal(readFileSync('dist/CNAME','utf8').trim(),'predict.rip');
assert.ok(existsSync('dist/404.html'),'Missing Pages 404 entrypoint');
console.log(`Verified ${routes.length} root-based HTML routes, all local entry assets, custom domain and no obsolete resource prefix.`);
