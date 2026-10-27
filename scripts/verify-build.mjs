import { existsSync, statSync, readFileSync } from 'node:fs';
const routes = [
  '',
  'about',
  'roadmap',
  'projects',
  'media',
  'skills',
  'contact',
  'projects/prime-market',
  'projects/predict',
  'projects/researchify',
  'projects/researchify-web',
  'projects/glow-rust',
  'projects/exchange',
];
for (const route of routes) {
  const p = `dist/${route ? route + '/' : ''}index.html`;
  if (!existsSync(p) || statSync(p).size < 200) throw Error(`Missing route ${p}`);
  const html = readFileSync(p, 'utf8');
  if (!html.includes('id="root"')) throw Error(`Missing React mount: ${route}`);
}
for (const asset of [
  'assets/prime-wordmark.svg',
  'assets/resolve.svg',
  'assets/capcut.svg',
  'assets/hlae.svg',
  'assets/favicon.svg',
  'media/tiktok-26k.webp',
  'media/tiktok-20k.webp',
  'media/glow-95k.webp',
  'media/glow-16k.webp',
])
  if (!existsSync(`dist/${asset}`) || statSync(`dist/${asset}`).size < 100)
    throw Error(`Missing asset ${asset}`);
console.log('Verified', routes.length, 'real HTML entrypoints and required local media.');
