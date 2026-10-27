import type { ReactNode } from 'react';
import {
  siApple,
  siCmake,
  siCplusplus,
  siLinux,
  siLlvm,
  siPython,
  siReact,
  siSqlite,
  siTelegram,
  siTypescript,
} from 'simple-icons';
import { useLanguage, L, type Localized } from '@/lib/i18n';

// The "How I can help" bento: every tile shows three tool icons and one caption line,
// all in the same calm style. Brand marks from Simple Icons (CC0).

type Tile = { label: string; icon: ReactNode };

const brand = (path: string) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={path} fill="currentColor" />
  </svg>
);

const asset = (file: string) => <img src={`/assets/${file}`} alt="" width="28" height="28" />;

// Windows has no mark in Simple Icons: a plain four-pane drawing.
const windows = brand(
  'M2 4.5 10.5 3.3v8.2H2V4.5Zm9.5-1.3L22 1.8v9.7H11.5V3.2ZM2 12.5h8.5v8.2L2 19.5v-7Zm9.5 0H22v9.7l-10.5-1.4v-8.3Z',
);

function Tiles({ tiles, caption }: { tiles: Tile[]; caption: Localized }) {
  const { t } = useLanguage();
  return (
    <div className="bv-tiles" aria-hidden="true">
      <div className="bv-tiles-row">
        {tiles.map((tile) => (
          <span key={tile.label}>
            {tile.icon}
            {tile.label}
          </span>
        ))}
      </div>
      <span className="bv-caption">{t(caption)}</span>
    </div>
  );
}

export const ChatVisual = () => (
  <Tiles
    tiles={[
      { label: 'Python', icon: brand(siPython.path) },
      { label: 'Telegram', icon: brand(siTelegram.path) },
      { label: 'SQLite', icon: brand(siSqlite.path) },
    ]}
    caption={L('asyncio · aiohttp · Market.CSGO API', 'asyncio · aiohttp · Market.CSGO API')}
  />
);

export const BenchVisual = () => (
  <Tiles
    tiles={[
      { label: 'C++20', icon: brand(siCplusplus.path) },
      { label: 'CMake', icon: brand(siCmake.path) },
      { label: 'Clang', icon: brand(siLlvm.path) },
    ]}
    caption={L('до 94,6× быстрее ripgrep', 'up to 94.6× faster than ripgrep')}
  />
);

export const OsVisual = () => (
  <Tiles
    tiles={[
      { label: 'Windows', icon: windows },
      { label: 'macOS', icon: brand(siApple.path) },
      { label: 'Linux', icon: brand(siLinux.path) },
    ]}
    caption={L('x64 и arm64 · установщики · CI', 'x64 and arm64 · installers · CI')}
  />
);

export const ImGuiVisual = () => (
  <Tiles
    tiles={[
      { label: 'React', icon: brand(siReact.path) },
      { label: 'TypeScript', icon: brand(siTypescript.path) },
      { label: 'C++20', icon: brand(siCplusplus.path) },
    ]}
    caption={L('Dear ImGui · DirectX 11 · QA', 'Dear ImGui · DirectX 11 · QA')}
  />
);

export const ReelVisual = () => (
  <Tiles
    tiles={[
      { label: 'Resolve', icon: asset('resolve.svg') },
      { label: 'CapCut', icon: asset('capcut.svg') },
      { label: 'HLAE', icon: asset('hlae.svg') },
    ]}
    caption={L('150K+ просмотров в TikTok', '150K+ views on TikTok')}
  />
);
