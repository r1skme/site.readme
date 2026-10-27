import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useLanguage } from '@/lib/i18n';
import { useMotionPreference } from '@/lib/motion';
import type { Project } from '@/data/projects';
import { Figure } from '@/components/CountUp';

type Group = NonNullable<Project['benchmarks']>[number];

/** Horizontal bars on a linear scale: the gap between 94.6× and 2.2× is the point. */
function BarGroup({ group }: { group: Group }) {
  const { t } = useLanguage();
  const { paused } = useMotionPreference();
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(paused);
  useEffect(() => {
    if (paused || !ref.current) return setShown(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [paused]);
  const max = Math.max(...group.rows.map((r) => r.value));
  return (
    <div ref={ref} className={'bench' + (shown ? ' is-shown' : '')}>
      <header className="bench-head">
        <h3>{t(group.title)}</h3>
        {group.note && <p>{t(group.note)}</p>}
      </header>
      {group.unit === 'x' ? (
        <ol className="bench-bars">
          {group.rows.map((r, i) => (
            <li key={r.display + i} style={{ '--w': r.value / max, '--i': i } as CSSProperties}>
              <span className="bench-label">{t(r.label)}</span>
              <span className="bench-track">
                <span className="bench-fill" />
              </span>
              <strong>
                <Figure value={r.display} />
              </strong>
            </li>
          ))}
        </ol>
      ) : (
        <dl className="bench-list">
          {group.rows.map((r) => (
            <div key={r.display}>
              <dt>{t(r.label)}</dt>
              <dd>
                <Figure value={r.display} />
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

export function Benchmarks({ groups }: { groups: Group[] }) {
  const [main, ...rest] = groups;
  return (
    <div className="benchmarks">
      <BarGroup group={main} />
      <div className="benchmarks-side">
        {rest.map((g, i) => (
          <BarGroup key={i} group={g} />
        ))}
      </div>
    </div>
  );
}
