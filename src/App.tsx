import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useRef,
  type ErrorInfo,
  type ReactNode,
} from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { LazyMotion, domMax, MotionConfig, AnimatePresence } from 'motion/react';
import { LanguageProvider, useLanguage, L } from '@/lib/i18n';
import { MotionProvider, useMotionPreference } from '@/lib/motion';
import { pageLoaders } from '@/lib/routes';
import { SiteShell } from '@/components/SiteShell';
import PageTransition from '@/components/PageTransition';
import NotFound from '@/components/NotFound';
const Home = lazy(pageLoaders.home),
  Projects = lazy(pageLoaders.projects),
  Detail = lazy(pageLoaders.detail),
  Media = lazy(pageLoaders.media),
  About = lazy(pageLoaders.about),
  Skills = lazy(pageLoaders.skills),
  Contact = lazy(pageLoaders.contact),
  Roadmap = lazy(pageLoaders.roadmap);
function ResourceLoading() {
  const { t } = useLanguage();
  return (
    <div className="route-loading" role="status">
      <div className="loading-progress" aria-hidden="true">
        <span />
      </div>
      <p>{t(L('Загрузка страницы', 'Loading page'))}</p>
    </div>
  );
}
class PageError extends Component<{ children: ReactNode }, { error: boolean }> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Page loading failed', error, info.componentStack);
  }
  render() {
    return this.state.error ? (
      <section className="shell page-error">
        <h1>R1SK</h1>
        <p>Не удалось загрузить страницу. / The page could not load.</p>
        <button onClick={() => location.reload()}>Обновить / Reload</button>
      </section>
    ) : (
      this.props.children
    );
  }
}
function AnimatedPages() {
  const location = useLocation(),
    navigationType = useNavigationType(),
    { paused } = useMotionPreference();
  const positions = useRef<Record<string, number>>({});
  useEffect(() => {
    const previous = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    return () => {
      history.scrollRestoration = previous;
    };
  }, []);
  // Record the old route while it is being read, not after the next route resets scroll.
  useEffect(() => {
    const key = location.key;
    const save = () => {
      positions.current[key] = window.scrollY;
    };
    window.addEventListener('scroll', save, { passive: true });
    return () => {
      window.removeEventListener('scroll', save);
    };
  }, [location.key]);
  const enter = () => {
    window.scrollTo({
      top: navigationType === 'POP' ? positions.current[location.key] || 0 : 0,
      behavior: 'instant',
    });
    document.querySelector<HTMLElement>('#main')?.focus({ preventScroll: true });
  };
  return (
    <AnimatePresence mode="wait" initial={false}>
      <PageTransition key={location.pathname} instant={paused} onEntered={enter}>
        <PageError>
          <Suspense fallback={<ResourceLoading />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/projects/" element={<Projects />} />
              <Route path="/projects/:slug/" element={<Detail />} />
              <Route path="/media/" element={<Media />} />
              <Route path="/skills/" element={<Skills />} />
              <Route path="/about/" element={<About />} />
              <Route path="/roadmap/" element={<Roadmap />} />
              <Route path="/contact/" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </PageError>
      </PageTransition>
    </AnimatePresence>
  );
}
function MotionApp() {
  const { paused } = useMotionPreference();
  return (
    <LazyMotion features={domMax}>
      <MotionConfig
        reducedMotion={paused ? 'always' : 'user'}
        transition={paused ? { duration: 0 } : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <SiteShell>
            <AnimatedPages />
          </SiteShell>
        </BrowserRouter>
      </MotionConfig>
    </LazyMotion>
  );
}
export default function App() {
  return (
    <LanguageProvider>
      <MotionProvider>
        <MotionApp />
      </MotionProvider>
    </LanguageProvider>
  );
}
