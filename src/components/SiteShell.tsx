import { useEffect, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { m } from 'motion/react';
import { ArrowUp, ArrowUpRight, Github } from 'lucide-react';
import { useLanguage, L } from '@/lib/i18n';
import { useMotionPreference } from '@/lib/motion';
import { prefetchPage } from '@/lib/routes';
import { getPageMeta } from '@/lib/seo';
import FluidBackdrop from '@/components/FluidBackdrop';
import { LiquidGlassDock } from '@/components/ui/liquid-glass-dock';

/** Fades in every [data-reveal] element that starts below the fold. */
function RevealController() {
  const { pathname } = useLocation();
  const { paused } = useMotionPreference();
  useEffect(() => {
    if (paused || !('IntersectionObserver' in window)) return;
    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    );
    const scan = () =>
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        if (el.getBoundingClientRect().top > innerHeight * 0.92) {
          el.classList.add('reveal-ready');
          observer.observe(el);
        }
      });
    const changes = new MutationObserver(scan);
    changes.observe(document.getElementById('root') || document.body, {
      childList: true,
      subtree: true,
    });
    scan();
    return () => {
      observer.disconnect();
      changes.disconnect();
      document
        .querySelectorAll('.reveal-ready')
        .forEach((el) => el.classList.remove('reveal-ready'));
    };
  }, [pathname, paused]);
  return null;
}

function usePageMeta() {
  const { pathname } = useLocation();
  const { lang } = useLanguage();
  useEffect(() => {
    const { title, description } = getPageMeta(pathname, lang);
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [pathname, lang]);
}

export function SiteShell({ children }: { children: ReactNode }) {
  const { lang, setLang, t } = useLanguage(),
    { paused } = useMotionPreference(),
    { pathname } = useLocation();
  usePageMeta();
  return (
    <div className="site">
      <FluidBackdrop />
      <RevealController />
      <a className="skip-nav" href="#main">
        {t(L('К содержимому', 'Skip to content'))}
      </a>
      <header className="topbar shell">
        <Link
          to="/"
          className="wordmark"
          aria-label={t(L('R1SK — главная', 'R1SK — home'))}
          onPointerEnter={() => prefetchPage('/')}
        >
          R1SK<span aria-hidden="true">.</span>
        </Link>
        <nav className="topbar-nav" aria-label={t(L('Дополнительно', 'Secondary'))}>
          <Link
            to="/roadmap/"
            className="topbar-link"
            aria-current={pathname === '/roadmap/' ? 'page' : undefined}
            onPointerEnter={() => prefetchPage('/roadmap/')}
          >
            {t(L('Путь и планы', 'Roadmap'))}
          </Link>
          <a
            className="icon-button"
            href="https://github.com/r1skme"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub r1skme"
            title="GitHub"
          >
            <Github size={18} aria-hidden="true" />
          </a>
          <div className="lang-switch" role="group" aria-label={t(L('Язык', 'Language'))}>
            {(['ru', 'en'] as const).map((value) => (
              <button
                type="button"
                key={value}
                onClick={() => setLang(value)}
                aria-pressed={lang === value}
              >
                <span>{value.toUpperCase()}</span>
                {lang === value && (
                  <m.i
                    aria-hidden="true"
                    className="lang-active"
                    layoutId="lang-capsule"
                    transition={
                      paused ? { duration: 0 } : { type: 'spring', stiffness: 350, damping: 30 }
                    }
                  />
                )}
              </button>
            ))}
          </div>
        </nav>
      </header>
      {children}
      <footer className="footer shell">
        <p>© {new Date().getFullYear()} R1SK</p>
        <div className="footer-links">
          <a href="https://github.com/r1skme" target="_blank" rel="noopener noreferrer">
            GitHub
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a href="https://t.me/R1SKME" target="_blank" rel="noopener noreferrer">
            Telegram
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          {pathname === '/contact/' ? (
            <a
              href="#main"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: paused ? 'instant' : 'smooth' });
              }}
            >
              {t(L('Наверх', 'Back to top'))}
              <ArrowUp size={15} aria-hidden="true" />
            </a>
          ) : (
            <Link to="/contact/" onPointerEnter={() => prefetchPage('/contact/')}>
              {t(L('Связаться', 'Contact'))}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          )}
        </div>
      </footer>
      <LiquidGlassDock />
    </div>
  );
}
