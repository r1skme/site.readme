import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, L } from '@/lib/i18n';
import { findProject } from '@/data/projects';

// Each technology and the projects it is used in. Word size grows with the number of projects.
const tech: { name: string; used: string[] }[] = [
  { name: 'C++20', used: ['researchify', 'predict'] },
  { name: 'Python', used: ['prime-market', 'exchange'] },
  { name: 'asyncio', used: ['prime-market'] },
  { name: 'Dear ImGui', used: ['predict'] },
  { name: 'SQLite', used: ['prime-market', 'exchange'] },
  { name: 'CMake', used: ['researchify'] },
  { name: 'DirectX 11', used: ['predict'] },
  { name: 'GitHub Actions', used: ['researchify', 'sharex-macos-linux'] },
  { name: 'aiohttp', used: ['prime-market'] },
  { name: 'Clang / MSVC', used: ['researchify', 'predict'] },
  { name: 'C# / .NET 10', used: ['sharex-macos-linux'] },
  { name: 'Telegram Bot API', used: ['prime-market', 'exchange'] },
  { name: 'MCP', used: ['researchify'] },
  { name: 'Win32 API', used: ['predict'] },
  { name: 'Avalonia UI', used: ['sharex-macos-linux'] },
  { name: 'Regex', used: ['researchify'] },
  { name: 'RCON', used: ['glow-rust'] },
  { name: 'SkiaSharp', used: ['sharex-macos-linux'] },
];

/** Hover or focus a technology to see which projects use it. */
export function StackCloud() {
  const { t } = useLanguage();
  const [active, setActive] = useState<string | null>(null);
  const current = tech.find((x) => x.name === active);
  return (
    <div className="stack-cloud">
      <ul className="stack-words" onPointerLeave={() => setActive(null)}>
        {tech.map((x) => (
          <li key={x.name}>
            <button
              type="button"
              className={
                `stack-word stack-w${x.used.length}` + (active === x.name ? ' is-active' : '')
              }
              aria-pressed={active === x.name}
              onPointerEnter={() => setActive(x.name)}
              onFocus={() => setActive(x.name)}
              onClick={() => setActive(active === x.name ? null : x.name)}
            >
              {x.name}
            </button>
          </li>
        ))}
      </ul>
      <p className="stack-used" aria-live="polite">
        {current ? (
          <>
            <span>{t(L('Используется в', 'Used in'))}</span>
            {current.used.map((slug) => (
              <Link key={slug} to={`/projects/${slug}/`}>
                {findProject(slug)?.name}
              </Link>
            ))}
          </>
        ) : (
          <span>
            {t(
              L(
                'Наведи на технологию — покажу, в каком проекте она работает.',
                'Hover a technology to see which project it powers.',
              ),
            )}
          </span>
        )}
      </p>
    </div>
  );
}
