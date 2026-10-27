import { useEffect, type ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { m } from 'motion/react';
import { Github } from 'lucide-react';
import { useLanguage, L } from '@/lib/i18n';
import { useMotionPreference } from '@/lib/motion';
import { prefetchPage } from '@/lib/routes';
import { getPageMeta } from '@/lib/seo';
import FluidBackdrop from '@/components/FluidBackdrop';
import { LiquidGlassDock } from '@/components/ui/liquid-glass-dock';
import HalftoneWordmarkFooter from '@/components/ui/halftone-wordmark-footer';

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
      { threshold: 0, rootMargin: '0px 0px 15% 0px' },
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
    { pathname } = useLocation(),
    navigate = useNavigate();
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
      <HalftoneWordmarkFooter
        wordmark="r1sk"
        label="R1SK"
        meta={t(
          L('Python / C++ разработчик · predict.rip', 'Python / C++ developer · predict.rip'),
        )}
        columns={[
          {
            title: t(L('Проекты', 'Projects')),
            links: [
              { label: 'ReSearchify', href: '/projects/researchify/' },
              { label: 'Prime Market', href: '/projects/prime-market/' },
              { label: 'Predict', href: '/projects/predict/' },
            ],
          },
          {
            title: t(L('Сайт', 'Site')),
            links: [
              { label: t(L('Медиа', 'Media')), href: '/media/' },
              { label: t(L('Навыки', 'Skills')), href: '/skills/' },
              { label: t(L('Путь и планы', 'Roadmap')), href: '/roadmap/' },
            ],
          },
          {
            title: t(L('Связь', 'Contact')),
            links: [
              { label: 'Telegram', href: 'https://t.me/R1SKME' },
              { label: 'GitHub', href: 'https://github.com/r1skme' },
              { label: 'YouTube', href: 'https://youtube.com/@r1sk-gg' },
            ],
          },
        ]}
        backToTopLabel={t(L('Наверх ↑', 'Back to top ↑'))}
        onLinkClick={(href, e) => {
          if (!href.startsWith('/') || e.metaKey || e.ctrlKey || e.shiftKey) return;
          e.preventDefault();
          navigate(href);
        }}
        palette={{ background: '#050912', ink: '#cdd9f2', warm: '#5fdcf0' }}
        fontFamily="'Unbounded', 'Onest', system-ui, sans-serif"
        fontWeight={700}
        monoFamily="'Onest', system-ui, sans-serif"
        interactive={!paused}
        crop={0.18}
        height="clamp(380px, 46vw, 560px)"
        className="site-footer"
      />
      <LiquidGlassDock />
    </div>
  );
}
