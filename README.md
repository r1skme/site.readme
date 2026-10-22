# R1SK — Personal portfolio v4

A **real multi-page** personal portfolio on GitHub Pages, built with React, TypeScript, Tailwind CSS v4, Motion and shadcn-compatible structure. This is an independent portfolio inspired by the visual systems of Neverlose Software and Prime Market. It is **not** a Neverlose product or an official company website.

## Live routes

- `/` — first impression, focus and featured work
- `/projects/` — editorial, interactive project index
- `/projects/prime-market/` — product case
- `/projects/predict/` — CS2 modification in development
- `/projects/researchify/` — source search project
- `/projects/researchify-web/` — research tooling
- `/projects/glow-rust/` — a paused 2025 Rust server (early lesson, not a commercial success)
- `/projects/exchange/` — paused prototype
- `/media/` — authentic media publications / views / video links
- `/skills/` — skills, tools and experience
- `/about/` — about R1SK
- `/contact/` — Telegram, Discord and socials

These are **separate HTML entrypoints** produced by Vite, not just in-page anchor sections. Each direct URL works even when the page is opened directly on GitHub Pages. The client router animates transitions between entrypoints.

## Development

```bash
npm install
npm run dev
npm run build
npm run preview
```

The base path is `/site.readme/` to match `r1skme.github.io/site.readme`.

## shadcn / Tailwind / TypeScript

The Vite app is configured with `tailwindcss` and `@tailwindcss/vite`, TypeScript strict mode, `@/*` alias and `components.json`.

**Default components path is `src/components/ui`**, the standard location for Vite with `@/components/ui/...` aliases. This avoids import problems when running `npx shadcn@latest add button`. The phrase `/components/ui` in standalone snippets refers to this aliased component directory; moving it to the filesystem root would break Vite imports.

Provided/adapted components:
- `src/components/ui/stats-bold.tsx`: bold editorial stats with grounded numbers; *no fake 10B API calls or stock imagery*.
- `src/components/ui/text-loop.tsx`: Motion text rotation.
- `src/components/ui/spotlight-card.tsx`: per-card pointer-tracked glow (local pointer listener, CSS properties; touch-safe).
- `src/components/ui/tilted-grid-hero.tsx`: curved streaming media strip with genuine R1SK video stills.

The `src/pages` files own route content; `src/data/content.ts` owns project information and RU/EN copy. `src/components/FluidBackdrop.tsx` animates a continuous Canvas2D ribbon with a CSS fallback. `src/components/SiteShell.tsx` has navigation, language and motion controls.

## Motion and performance

- Procedural, independent background wave; no stock/generated character images or GPU-heavy particle grid.
- 30fps target on mobile, 45fps on desktop; reduced canvas resolution and page visibility stop.
- Dedicated motion pause; respects `prefers-reduced-motion`.
- CSS and Motion transitions between routes, and subtle hover states.
- Real route-loading UI appears only when lazy code chunks actually load; no fake percentages or delays.
- External YouTube iframe loads only when the user chooses playback.

## Publication integrity

The site only uses facts the owner supplied. `150K+` views refer to four known TikTok publications across the personal and GLOW RUST accounts (95.1K + 16.1K + 26.8K + 20.8K = 158.8K), **not unique viewers**. Product status is shown accurately; private revenue, unfinished technical material and secret repo links are deliberately excluded. Featured artwork is **abstract identity art**, not an invented screenshot of working software.

The video stills in `public/media` are cropped from screenshots provided by the owner. The HLAE/DaVinci/CapCut marks were likewise supplied earlier. No stock-image carousel was added.

## Testing notes

`npm run build` type-checks TypeScript and verifies 12 real output entrypoints. Browser visual QA should cover 320, 390, 768, 1024 and 1440px, RU/EN, navigation, the motion pause, project selection, copy Discord and YouTube/TikTok links. Physical iPhone Safari and actual YouTube/TikTok playback require real-device/network testing.
