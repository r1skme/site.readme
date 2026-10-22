# R1SK — projects, media and roadmap

Independent, multi-page React + TypeScript portfolio inspired by Neverlose Software. This is not an official Neverlose website.

## Version 8

- Removes the redundant hero strip, duplicate heading labels and decorative footer. No new generated artwork or invented project previews.
- Refines typography, spacing and contrast; preserves the autonomous SVG background and dark translucent dock.
- Rebuilds `/roadmap/` as a natural vertical reading sequence. Every milestone remains in the document and accessible when animation is paused or reduced. A desktop chapter index follows reading progress.
- Gives Roadmap its own navigation destination. Planned next steps use native accessible disclosures.
- Preserves project technologies, time periods, genuine PRIME branding, media links, RU/EN and all individual project pages.

## Routes

`/`, `/projects/`, six `/projects/:slug/` case pages, `/media/`, `/skills/`, `/about/`, `/roadmap/`, `/contact/`.

Vite generates 13 actual HTML entrypoints. React Router handles in-app transitions; direct URLs and reloads work on GitHub Pages.

## Development

```sh
npm install
npm run dev
npm run build
npx playwright install chromium
npm run test:qa
```

UI components live in `src/components/ui`; `components.json` supplies shadcn-compatible aliases. The site uses Tailwind 4, Motion and Lucide. Fonts load externally with fallbacks; font binaries are not redistributed. Media is user-supplied or loaded from the provided video channels. YouTube players load only after a click and are removed on close. No analytics.

## Verification

CI runs TypeScript, a production build, 104 page/language/viewport combinations, interactive regressions and rendered desktop/mobile screenshots. Separate polish checks cover open roadmap text when motion is paused and glass navigation blur over page content. Test reports describe their actual limits; there is no claim of testing a physical iPhone or of an FPS/Lighthouse score.

## Content boundaries

The roadmap uses the existing project facts and approximate editing experience; no exact start dates, releases or performance outcomes are invented. Finances, private implementation details and unreleased internals remain private. Project case pages show stack and timeline rather than personal-role statements. ReSearchify (source-code search) and Researchify Web (local-model web research) remain separate.

The 150K+ figure is based on four displayed TikTok post counts across two accounts: 95.1K + 16.1K + 26.8K + 20.8K = 158.8K. It is not a unique-viewer metric.

Live: https://r1skme.github.io/site.readme/
