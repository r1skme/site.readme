# R1SK — portfolio

A multi-page personal portfolio built with **React, TypeScript, Vite, Tailwind CSS and Motion**. The design is independent; it draws inspiration from modern dark interfaces, not from an official company website.

## Pages

- Home — introduction, selected work and media.
- Projects — **Predict**, **Prime Market**, **ReSearchify**, **GLOW RUST**, in that order.
- Individual projects — purpose, verified technology stack, codebase capabilities and next steps.
- Media — direct links to individual YouTube/TikTok videos; no intermediate player or profile substituted for a video.
- Skills, About, Roadmap, Contact — distinct pages in Russian and English.

Website: https://predict.rip/

## Content provenance

Public project descriptions were checked against the owner's connected private GitHub repositories. The source repositories are private and **are not linked or exposed** on the public portfolio. The site contains no private source files, API keys, internal implementation secrets or unsupported claims of a public release.

Predict's codebase uses C++20, Visual Studio/ClangCL, DirectX 11 and Dear ImGui, with combat, visual and other modules. Their presence in code does not prove that every feature is finished.

Prime Market is based on Python, python-telegram-bot, asyncio, aiohttp, aiosqlite/SQLite and the Market.CSGO API. The bot contains pricing, notifications, trade tracking and pending-decision flows; the browser dashboard is still being developed.

ReSearchify uses C++20, CMake, CTest, persistent indexing, CLI, JSON/JSONL and MCP. Earlier benchmarks are labeled as previous-engine comparisons, not blanket wins over ripgrep.

GLOW RUST is a paused personal server project with server configuration, plugins, community operations and TikTok content.

## Media and metrics

Four selected TikTok posts across two accounts have a combined **158.8K post views** (95.1K + 16.1K + 26.8K + 20.8K), not 158.8K unique viewers. Those figures are shown separately from media cards because individual public URLs have not been confirmed for every high-view post.

Two YouTube uploads and two user-supplied TikTok short links open their original posts directly. No modal player. When a direct link is unknown, the site does not pretend an account profile is the selected video.

## Deploy and QA

The custom domain **predict.rip** uses Vite base `/`, `public/CNAME`, root-resolved assets, 11 HTML entrypoints and a Pages 404 document. Direct deep links work on GitHub Pages.

```sh
npm install
npm run build
npx playwright install chromium
npm run test:qa
```

GitHub Actions verifies TypeScript, asset paths, responsive pages, RU/EN routes, keyboard interactions, reduced-motion handling and live-domain deployment. Chromium emulation is not a physical iPhone test. There are no user tracking scripts.

The site is not a software release or an endorsement by a game publisher.
