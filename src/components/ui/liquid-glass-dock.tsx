import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent,
  type KeyboardEvent,
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { m, AnimatePresence } from 'motion/react';
import {
  AboutIcon,
  ContactIcon,
  HomeIcon,
  MediaIcon,
  ProjectsIcon,
  SkillsIcon,
} from '@/components/ui/dock-icons';
import { useLanguage, L } from '@/lib/i18n';
import { useMotionPreference } from '@/lib/motion';
import { prefetchPage } from '@/lib/routes';
import { isKnownPath } from '@/lib/seo';
const items = [
  { url: '/', icon: HomeIcon, name: L('Главная', 'Home') },
  { url: '/projects/', icon: ProjectsIcon, name: L('Проекты', 'Projects') },
  { url: '/media/', icon: MediaIcon, name: L('Медиа', 'Media') },
  { url: '/skills/', icon: SkillsIcon, name: L('Навыки', 'Skills') },
  { url: '/about/', icon: AboutIcon, name: L('Обо мне', 'About') },
  { url: '/contact/', icon: ContactIcon, name: L('Контакты', 'Contact') },
];
type Lens = { x: number; width: number };
export function LiquidGlassDock() {
  const { t, lang } = useLanguage(),
    { paused } = useMotionPreference(),
    { pathname } = useLocation();
  const nav = useRef<HTMLElement>(null),
    links = useRef<(HTMLAnchorElement | null)[]>([]);
  // Highlight only real sections. Roadmap and unknown paths (404) have no dock item.
  const current = items.findIndex((item) =>
    item.url === '/'
      ? pathname === '/'
      : item.url === '/projects/'
        ? pathname === '/projects/' || (pathname.startsWith('/projects/') && isKnownPath(pathname))
        : pathname === item.url,
  );
  const [lens, setLens] = useState<Lens>({ x: 4, width: 80 }),
    [hover, setHover] = useState<Lens | null>(null),
    [press, setPress] = useState(false),
    [ready, setReady] = useState(false);
  const measure = (index: number) => {
    const el = links.current[index],
      parent = nav.current;
    if (!el || !parent) return null;
    const a = el.getBoundingClientRect(),
      b = parent.getBoundingClientRect();
    return { x: a.left - b.left - parent.clientLeft, width: a.width };
  };
  useLayoutEffect(() => {
    let alive = true;
    const update = () => {
      if (!alive) return;
      if (current < 0) return setReady(false);
      const next = measure(current);
      if (next) {
        setLens(next);
        setReady(true);
      }
    };
    update();
    const observer = new ResizeObserver(update);
    if (nav.current) observer.observe(nav.current);
    document.fonts?.ready.then(update);
    window.addEventListener('resize', update, { passive: true });
    return () => {
      alive = false;
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [current, lang]);
  useEffect(() => {
    setHover(null);
    setPress(false);
  }, [pathname]);
  const pointer = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch' || paused) return;
    const b = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      '--glass-pointer',
      `${(event.clientX - b.left).toFixed(1)}px`,
    );
  };
  const keyboard = (event: KeyboardEvent<HTMLAnchorElement>, index: number) => {
    let next: number | undefined;
    if (event.key === 'ArrowRight') next = (index + 1) % items.length;
    if (event.key === 'ArrowLeft') next = (index + items.length - 1) % items.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = items.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      links.current[next]?.focus();
    }
  };
  return (
    <div className="glass-dock-position">
      <div className="glass-dock-wrap">
        <nav
          ref={nav}
          className="liquid-dock"
          aria-label={t(L('Основная навигация', 'Main navigation'))}
          onPointerMove={pointer}
          onPointerLeave={() => {
            setHover(null);
            setPress(false);
          }}
        >
          <div className="glass-surface" aria-hidden="true" />
          <div className="glass-caustic" aria-hidden="true" />
          <div className="glass-rim" aria-hidden="true" />
          <AnimatePresence>
            {hover && !paused && (
              <m.span
                className="glass-hover"
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ x: hover.x, width: hover.width, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 34 }}
              />
            )}
          </AnimatePresence>
          {ready && current >= 0 && (
            <m.span
              className="glass-lens"
              aria-hidden="true"
              initial={false}
              animate={{ x: lens.x, width: lens.width, scale: press && !paused ? 0.96 : 1 }}
              transition={
                paused
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 350, damping: 30, mass: 0.85 }
              }
            >
              <span className="lens-highlight" />
            </m.span>
          )}
          {items.map(({ url, icon: Icon, name }, index) => (
            <Link
              key={url}
              ref={(el) => {
                links.current[index] = el;
              }}
              to={url}
              aria-current={current === index ? 'page' : undefined}
              className={'glass-dock-link' + (current === index ? ' is-active' : '')}
              onPointerEnter={(event) => {
                prefetchPage(url);
                if (event.pointerType === 'mouse') setHover(measure(index));
              }}
              onFocus={() => {
                prefetchPage(url);
                setHover(measure(index));
              }}
              onBlur={() => setHover(null)}
              onPointerDown={() => setPress(true)}
              onPointerUp={() => setPress(false)}
              onPointerCancel={() => setPress(false)}
              onKeyDown={(event) => keyboard(event, index)}
            >
              <m.span
                className="glass-item-content"
                whileHover={paused ? undefined : { y: -1 }}
                whileTap={paused ? undefined : { scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 420, damping: 28 }}
              >
                <Icon size={18} />
                <span>{t(name)}</span>
              </m.span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
