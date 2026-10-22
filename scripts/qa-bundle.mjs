import{build}from'esbuild';
await build({entryPoints:['src/qa-main.tsx'],outfile:'dist/qa-bundle.js',bundle:true,jsx:'automatic',format:'iife',platform:'browser',target:['es2022'],loader:{'.css':'empty'},define:{'import.meta.env.BASE_URL':'"/site.readme/"'},logLevel:'info'});
