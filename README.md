# predict.rip — personal portfolio of R1SK

Live: https://predict.rip · [GitHub](https://github.com/r1skme)

My personal site: projects (ReSearchify, Prime Market, Predict, ShareX for macOS & Linux, …), skills and video work. RU / EN.

## Stack

React 19, TypeScript, Vite 7, Tailwind CSS 4, Motion. Deployed to GitHub Pages via Actions on the custom domain `predict.rip`.

## Run locally

```sh
npm ci
npm run dev
```

```sh
npm run build                     # typecheck, build, verify meta / sitemap / 404
npx playwright install chromium
npm run test:qa                   # browser checks at 1280 and 375 px, RU and EN
npm run format:check
```

`npm run og` regenerates the link-preview image `public/og/default.png`.

## Structure

- `src/pages` — routes
- `src/data` — all texts, RU and EN (`projects.ts` is the single source for projects)
- `src/lib/seo.ts` — page titles and descriptions, used by the app and by the build
- `src/components` — shell, dock, terminal, UI
- `src/styles` — tokens, base, layout, components, pages, motion, responsive

The build writes a separate HTML file with its own `<title>`, description, Open Graph tags and canonical link for every route, plus `404.html`, `sitemap.xml` and `robots.txt` (see the `prerender-routes` plugin in `vite.config.ts`).

## Notes

Built with AI assistance; content and decisions are mine.
