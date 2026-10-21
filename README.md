# R1SK — personal portfolio

A bilingual personal website for projects, automation, interfaces and media. The visual direction is inspired by Neverlose Software, but this is R1SK's independent portfolio, not an official Neverlose website.

Live: https://r1skme.github.io/site.readme/

## Implementation

- Static HTML, CSS and JavaScript. No build step or runtime library.
- RU/EN switching without reloading, with a language query parameter and a saved preference when storage is available.
- A continuously animated SVG ribbon. Its time is independent of scrolling and pointer input; scroll only changes the visual emphasis. One path is reused for the colour, light and edge passes.
- A real pause control, reduced-motion support and visibility-aware animation scheduling.
- Accessible native dialogs for project details and click-to-load YouTube players. Videos do not autoplay. Closing the player removes its iframe.
- Telegram link, Discord copy with explicit failure handling, GitHub profile link and the supplied YouTube/TikTok links.
- Resource notice tied to real load/error events, without fake percentages or an enforced waiting time. Main content is never hidden by a loader.
- No generated photos, agent artwork, particle grid, invented product screenshots or fake performance counters.

## Content boundaries

The site is based on the owner's answers. Predict is presented as a CS2 modification in development, not just a menu or a released product. GLOW RUST is a small, optional early-launch story rather than a headline success. Private repository links, implementation details, finances, user/player numbers and unverified 99.5%/96x claims are not published.

The media figure is a conservative **150K+**, based on four displayed TikTok view counts: 95.1K + 16.1K + 26.8K + 20.8K = 158.8K. It combines the personal and GLOW RUST accounts and is not a unique-audience figure. Individual posts are not counted twice.

## Third-party resources

The three tool icons originate from assets supplied by the owner. Font stylesheets are requested from Google Fonts with system fallbacks; no font files are distributed here. YouTube thumbnails are external and have a visual fallback. YouTube embeds load only when requested. There is no site analytics script.

## Editing

`index.html` contains the Russian copy. Elements with `data-en` contain the corresponding English version; `data-en-label` holds translated accessible labels. The script retains the original Russian content, so no second translation file is required. Keep translations free of untrusted HTML.

`style.css` controls the layout and animation surfaces. `app.js` controls language, SVG motion, navigation, dialogs and clipboard handling. Project descriptions are static dialog contents in the same document. Hashes such as `#case-prime` can be shared directly.

## Deployment

The existing GitHub Actions workflow copies the three application files and `assets/` into `_site` and publishes to GitHub Pages. Only the completed, checked version is moved to `main`. No paid service or server is required.

See `QA.md` for the checks performed and their limits.
