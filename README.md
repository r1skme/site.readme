# R1SK — Personal portfolio / Liquid Glass

A real multi-route React + TypeScript portfolio inspired by the midnight-blue visual language of Neverlose Software. This is an independent personal website, not an official Neverlose website.

## Structure

- `/` — introduction, strengths and selected work
- `/projects/` — editorial project directory with live previews
- `/projects/:slug/` — six individual project case pages
- `/media/` — original work, cylindrical gallery and video playback
- `/skills/` — experience, confident vs basic skills, tools
- `/about/` — personal story and approach
- `/contact/` — Telegram, Discord, GitHub and social links

Vite generates **12 HTML entrypoints**, so a deep URL refresh works directly on GitHub Pages. React Router and Motion provide animated client-side navigation without turning the content back into a single long page.

## Stack

React 19, TypeScript, Vite, Tailwind CSS 4, Motion, Lucide icons. `components.json` provides shadcn-compatible aliases. UI components live in `src/components/ui` (`@/components/ui`) to keep reusable effects separate from page content. Global styles are in `src/styles.css` and its four imported style modules.

The user-supplied BoldStats, TextLoop, GlowCard and TiltedGridHero examples were adapted to real portfolio content, accessible controls, mobile scrolling and a shared motion preference. Placeholder API metrics and unrelated stock photos are not used.

## Motion

The broad vector ribbon has its own continuously running clock. The persistent lower navigation has a translucent surface, highlights, a spring-driven active capsule and touch feedback. Page transitions do not reset the background. The global motion control, system reduced motion and hidden-tab state control the effects together. Body copy stays still. On coarse-pointer devices, hover-only lighting is omitted.

The glass effect is a web interpretation, not a claim to use Apple's native rendering material. Includes no-blur, reduced-transparency and stronger-contrast fallbacks.

## Run

```sh
npm install
npm run dev
npm run build
npx playwright install chromium
npm run test:qa
```

Direct dependencies are pinned. CI saves its generated lockfile as an artifact. Deployment is gated by TypeScript, route and browser checks. Detailed QA results and screenshots are generated from the real build; no physical-iPhone or FPS claims are made.

## Content and privacy

User-provided facts, public contact links and project descriptions only. No finances, private repository code, unreleased implementation details or unsupported performance claims. The 150K+ figure is based on four TikTok posts with displayed totals of 95.1K, 16.1K, 26.8K and 20.8K (158.8K), across two accounts. It is not a unique-audience metric.

Media preview crops come from the owner's supplied screenshots. TikTok card links explicitly lead to the relevant profile; exact supplied short links are also provided. YouTube embeds load only after a click and are removed on closing the native dialog. Google Fonts are loaded externally with system fallback; font files are not distributed. No tracking scripts.

Live: https://r1skme.github.io/site.readme/

## V7: separate research projects and factual roadmap

ReSearchify (C++20 local code search) remains in the primary catalog. Researchify Web (browser retrieval for local LLMs) is deliberately separated into the experiments area rather than appearing as a second nearly identical primary project. Project pages emphasize a verified time period and a technology stack, not personal-role blocks. Predict lists only the C++/ImGui interface prototype stack, not unconfirmed implementation details of a future release. Prime Market uses a clean vector tracing of the user's supplied wordmark; no other logos are invented.

The **/roadmap/** page uses an adapted GSAP Timeline with pinned horizontal scroll on desktop and vertical progress on mobile. Events use real 2025/2026 dates, an approximate three-year editing duration, and 'now' for ongoing development. No placeholder demo dates, stock photos or promised release dates. GSAP SplitText and ScrollTrigger are bundled through the `gsap` npm dependency. The page is linked from the header, homepage, projects and about sections.
