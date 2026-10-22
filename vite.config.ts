import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const root=path.dirname(fileURLToPath(import.meta.url));
const routes=['','about','roadmap','projects','media','skills','contact','projects/prime-market','projects/predict','projects/researchify','projects/researchify-web','projects/glow-rust','projects/exchange'];
// Every existing route has a real entrypoint for direct visits and refresh on Pages.
const template=readFileSync(path.join(root,'index.html'),'utf8');
for(const route of routes.filter(Boolean)){
 mkdirSync(path.join(root,route),{recursive:true});
 writeFileSync(path.join(root,route,'index.html'),template);
}
export default defineConfig({
 // predict.rip serves this site at the domain root, not a repository subdirectory.
 base:'/',
 plugins:[react(),tailwindcss(),{
  name:'pages-not-found',
  closeBundle(){
   const out=path.join(root,'dist');
   writeFileSync(path.join(out,'404.html'),readFileSync(path.join(out,'index.html'),'utf8'));
  }
 }],
 resolve:{alias:{'@':path.join(root,'src')}},
 build:{target:'es2022',rollupOptions:{input:Object.fromEntries(routes.map(route=>[route||'home',path.join(root,route,'index.html')]))}}
});
