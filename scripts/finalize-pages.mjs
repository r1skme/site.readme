import {copyFileSync,readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
// GitHub Pages returns this document (with HTTP 404) for unknown paths.
// Root-relative assets let React render the actual NotFound route there too.
copyFileSync('dist/index.html','dist/404.html');
assert.equal(readFileSync('dist/CNAME','utf8').trim(),'predict.rip');
console.log('Pages output: predict.rip at /, deep HTML routes and 404.html.');
