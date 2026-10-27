import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const dist = path.resolve('dist');
function* files(dir) {
  for (const item of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name !== '_review') yield* files(p);
    } else yield p;
  }
}
const checked = new Set();
let htmlCount = 0;
assert.equal(readFileSync(path.join(dist, 'CNAME'), 'utf8').trim(), 'predict.rip');
assert.ok(existsSync(path.join(dist, '404.html')), 'GitHub Pages 404 document is missing');
for (const file of files(dist)) {
  if (!/\.(html|css|js)$/.test(file)) continue;
  const body = readFileSync(file, 'utf8');
  assert.ok(
    !body.includes('/site.readme/'),
    `Legacy deployment path in ${path.relative(dist, file)}`,
  );
  if (!file.endsWith('.html')) continue;
  htmlCount++;
  const refs = [
    ...body.matchAll(/<(?:script|link)\b[^>]*(?:src|href)=["']([^"']+)["'][^>]*>/gi),
  ].map((m) => m[1]);
  const assets = refs.filter(
    (ref) =>
      !ref.startsWith('https:') &&
      !ref.startsWith('http:') &&
      !ref.startsWith('data:') &&
      !ref.startsWith('//'),
  );
  assert.ok(
    assets.some((ref) => /^\/assets\/.+\.js$/.test(ref)),
    `No root module in ${file}`,
  );
  assert.ok(
    assets.some((ref) => /^\/assets\/.+\.css$/.test(ref)),
    `No root stylesheet in ${file}`,
  );
  assert.ok(assets.includes('/assets/favicon.svg'), `Wrong favicon in ${file}`);
  for (const ref of assets) {
    assert.ok(ref.startsWith('/assets/'), `Unexpected relative asset ${ref} in ${file}`);
    const local = path.resolve(dist, '.' + ref.split(/[?#]/)[0]);
    assert.ok(
      local.startsWith(dist + path.sep) && existsSync(local) && statSync(local).isFile(),
      `Missing asset ${ref}`,
    );
    checked.add(ref);
  }
}
assert.ok(htmlCount >= 14, `Expected current routes and 404, found ${htmlCount} HTML files`);
console.log(
  `DOMAIN_BUILD_OK: ${htmlCount} HTML files; ${checked.size} root asset references; no legacy deployment prefix.`,
);
