# predict.rip deployment

The public app is served from `https://predict.rip/`, not the repository subpath.

- `vite.config.ts` uses `base: '/'`.
- The HTML favicon uses `%BASE_URL%assets/favicon.svg`.
- React Router and local image URLs continue to derive their base from Vite.
- `public/CNAME` is copied into `dist/CNAME` and records `predict.rip`.
- Existing page entrypoints are retained for direct deep links and reloads.
- `scripts/finalize-pages.mjs` emits a root-safe `404.html` for GitHub Pages.
- Existing browser suites run at the root instead of the old repository prefix.
- `verify-domain-build.mjs` rejects stale runtime paths and missing assets in generated HTML.
- `qa-domain.mjs` checks direct routes, CSS, scripts, logos, favicon, default animation, language switching, navigation, media modal, small screens and the 404 page.

Normal test runs use a strict static server rather than an SPA fallback, so a missing route cannot pass accidentally. After publication the same checks run against the actual public domain, without using a cache-busted homepage as a substitute. Reports and screenshots are stored as workflow artifacts.

The domain migration does not redesign the portfolio or change biographical content. External-video availability and physical-device performance are outside the automated verification claims.
