import {existsSync,statSync,readFileSync} from 'node:fs';
const routes=['','about','projects','media','skills','contact','projects/prime-market','projects/predict','projects/researchify','projects/researchify-web','projects/glow-rust','projects/exchange'];
for(const route of routes){ const p=`dist/${route?route+'/':''}index.html`;
 if(!existsSync(p)||statSync(p).size<200)throw new Error(`Missing route ${p}`);
 const html=readFileSync(p,'utf8');
 if(!html.includes('id="root"'))throw new Error(`Missing React mount: ${route}`);
}
console.log('Verified',routes.length,'real HTML entrypoints for direct navigation.');
