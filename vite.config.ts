import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const rootDir = path.dirname(fileURLToPath(import.meta.url));
const paths = [
  '', 'about', 'projects', 'media', 'skills', 'contact',
  'projects/prime-market','projects/predict','projects/researchify',
  'projects/researchify-web','projects/glow-rust','projects/exchange'
];
export default defineConfig({
  base: '/site.readme/',
  plugins: [react(), tailwindcss()],
  resolve: {alias: {'@': path.join(rootDir,'src')}},
  build: {target:'es2022',cssCodeSplit:true,rollupOptions:{input:Object.fromEntries(paths.map((name)=>[name||'home',path.resolve(rootDir,name,'index.html')]))}}
});
