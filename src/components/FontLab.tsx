import { useEffect, useState } from 'react';

// Development-only heading font switcher. SiteShell renders it under import.meta.env.DEV,
// so it is tree-shaken out of production builds. Delete it once a font is chosen.
const FONTS = [
  { name: 'Onest', family: "'Onest', system-ui, sans-serif", query: null, weight: 700 },
  {
    name: 'Manrope',
    family: "'Manrope', system-ui, sans-serif",
    query: 'Manrope:wght@600;700;800',
    weight: 700,
  },
  {
    name: 'Inter Tight',
    family: "'Inter Tight', system-ui, sans-serif",
    query: 'Inter+Tight:wght@600;700;800',
    weight: 700,
  },
  {
    name: 'Geologica',
    family: "'Geologica', system-ui, sans-serif",
    query: 'Geologica:wght@500;600;700',
    weight: 600,
  },
  {
    name: 'JetBrains Mono',
    family: "'JetBrains Mono', ui-monospace, monospace",
    query: 'JetBrains+Mono:wght@500;700',
    weight: 700,
  },
] as const;

const KEY = 'r1sk-font-lab';

function apply(index: number) {
  const font = FONTS[index];
  if (font.query && !document.querySelector(`link[data-font-lab="${font.name}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${font.query}&display=swap`;
    link.dataset.fontLab = font.name;
    document.head.appendChild(link);
  }
  const root = document.documentElement.style;
  root.setProperty('--font-heading', font.family);
  root.setProperty('--heading-weight', String(font.weight));
  root.setProperty('--heading-tracking', font.name === 'JetBrains Mono' ? '-0.01em' : '-0.03em');
}

export default function FontLab() {
  const [index, setIndex] = useState(() => {
    try {
      return Math.max(0, Number(localStorage.getItem(KEY)) || 0) % FONTS.length;
    } catch {
      return 0;
    }
  });
  useEffect(() => {
    apply(index);
    try {
      localStorage.setItem(KEY, String(index));
    } catch {}
  }, [index]);
  return (
    <details className="font-lab">
      <summary title="Шрифт заголовков (только localhost)">Aa · {FONTS[index].name}</summary>
      {FONTS.map((font, i) => (
        <button
          key={font.name}
          type="button"
          aria-pressed={i === index}
          onClick={() => setIndex(i)}
          style={{ fontFamily: font.family }}
        >
          {font.name}
        </button>
      ))}
    </details>
  );
}
