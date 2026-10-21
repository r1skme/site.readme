# Verification — personal portfolio v3

Tested in local Chromium using the actual HTML/CSS/JavaScript, with application assets inlined for the test environment. Optional external resources were blocked. The external font files, third-party streaming and a physical iPhone were not available; screenshots therefore show system fallback fonts and video-cover fallback states.

## Layout

RU and EN at 320, 360, 390, 430, 768, 1024, 1280, 1440 and 1920 pixels: 18 combinations. Document width equalled viewport width in every case. No missing internal anchor targets. English visible text had no leftover Russian copy.

## Interactions

- SVG geometry changed with no scroll or pointer interaction.
- The pause button froze the geometry.
- Reduced-motion mode started with static geometry.
- Predict case dialog opened and Escape closed it.
- No YouTube iframe existed before a video click.
- A click created the expected youtube-nocookie player; closing it removed the iframe.
- Clipboard success passed the exact `r1sk.gg` value to a mocked clipboard. The denied-permission path showed a failure message, not a false success.
- Skills disclosure opened; all three supplied local product icons loaded.
- With JavaScript disabled, the main introduction and the case descriptions remained readable.
- No JavaScript exceptions in the exercised scenarios.

## Explicit limits

No claim of an FPS score, a Lighthouse score, unique audience, performance on an actual phone, verified YouTube playback, or current external view counts is made. GitHub Pages deployment status is checked separately after publication.
