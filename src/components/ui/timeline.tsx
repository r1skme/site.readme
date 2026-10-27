import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { useLanguage, L, type Localized } from '@/lib/i18n';
import { useMotionPreference } from '@/lib/motion';
export type JourneyStep = {
  id: string;
  date: Localized;
  title: Localized;
  description: Localized;
  stack: string[];
  href: string;
  linkLabel?: Localized;
};
/** A native vertical reading flow. No scroll interception, artificial pin spacer or hidden chapters. */
export default function Timeline({ items }: { items: JourneyStep[] }) {
  const root = useRef<HTMLElement>(null),
    cards = useRef<(HTMLElement | null)[]>([]),
    frame = useRef(0);
  const [active, setActive] = useState(0);
  const { t, lang } = useLanguage();
  const { paused } = useMotionPreference();
  useEffect(() => {
    let alive = true;
    const update = () => {
      frame.current = 0;
      if (!alive) return;
      const elements = cards.current.filter((item): item is HTMLElement => Boolean(item));
      if (!elements.length) return;
      const readingLine = Math.min(innerHeight * 0.36, 290);
      let next = 0;
      elements.forEach((el, index) => {
        if (el.getBoundingClientRect().top <= readingLine) next = index;
      });
      setActive((previous) => (previous === next ? previous : next));
      const first = elements[0].getBoundingClientRect(),
        last = elements[elements.length - 1].getBoundingClientRect();
      const extent = Math.max(1, last.top - first.top);
      const progress = Math.max(0, Math.min(1, (readingLine - first.top) / extent));
      root.current?.style.setProperty('--journey-progress', progress.toFixed(4));
    };
    const schedule = () => {
      if (!frame.current) frame.current = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null;
    if (root.current) observer?.observe(root.current);
    document.fonts?.ready
      .then(() => {
        if (alive) schedule();
      })
      .catch(() => {});
    schedule();
    return () => {
      alive = false;
      cancelAnimationFrame(frame.current);
      frame.current = 0;
      observer?.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [items.length, lang]);
  const navigate = (event: MouseEvent<HTMLAnchorElement>, index: number) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const el = cards.current[index];
    if (!el) return;
    window.scrollTo({
      top: window.scrollY + el.getBoundingClientRect().top - 100,
      behavior: paused ? 'instant' : 'smooth',
    });
    el.querySelector<HTMLElement>('h3')?.focus({ preventScroll: true });
  };
  return (
    <section ref={root} id="journey" className="shell journey" data-managed-motion>
      <aside className="journey-sidebar">
        <h2>{t(L('Опыт, который остаётся', 'Experience that stays with me'))}</h2>
        <nav className="journey-chapters" aria-label={t(L('Этапы пути', 'Journey chapters'))}>
          {items.map((item, index) => (
            <a
              key={item.id}
              href={'#journey-' + item.id}
              onClick={(event) => navigate(event, index)}
              aria-current={active === index ? 'step' : undefined}
              className={active === index ? 'is-reading' : ''}
            >
              <span className="journey-dot" aria-hidden="true" />
              <span>{t(item.title)}</span>
            </a>
          ))}
        </nav>
        <a className="text-link" href="#next">
          {t(L('Что дальше', 'What comes next'))}
          <ArrowDown size={16} aria-hidden="true" />
        </a>
      </aside>
      <div className="journey-story">
        <div className="journey-line" aria-hidden="true">
          <span />
        </div>
        {items.map((item, index) => (
          <article
            key={item.id}
            id={'journey-' + item.id}
            ref={(el) => {
              cards.current[index] = el;
            }}
            className={'journey-step' + (active === index ? ' is-reading' : '')}
          >
            <span className="journey-node" aria-hidden="true" />
            <p className="journey-date">{t(item.date)}</p>
            <h3 tabIndex={-1}>{t(item.title)}</h3>
            <p className="journey-text">{t(item.description).replace(/`/g, '')}</p>
            <ul className="chips" aria-label={t(L('Инструменты', 'Tools'))}>
              {item.stack.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
            <Link to={item.href} className="text-link">
              {t(item.linkLabel || L('О проекте', 'Explore project'))}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
