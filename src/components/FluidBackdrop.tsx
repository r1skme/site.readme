import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useMotionPreference } from '@/lib/motion';
import { findProject } from '@/data/projects';

type Palette = [string, string, string, string];
const HOME: Palette = ['#1eb2cb', '#2088ee', '#4157f0', '#8210df'];
const MEDIA: Palette = ['#ff9ad2', '#e05ad0', '#8a4ff0', '#4a3fd8'];

/** Gradient stops for a page: a project's own colours, media's pink, otherwise the brand blue. */
function paletteFor(pathname: string): Palette {
  const slug = /^\/projects\/([^/]+)\/$/.exec(pathname)?.[1];
  return findProject(slug)?.ribbon ?? (pathname === '/media/' ? MEDIA : HOME);
}

const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

/** Resolution-independent vector ribbon. Navigation never resets its clock. Scrolling feeds it
 * energy (bigger, faster waves that settle when you stop); its colours follow the page. */
export default function FluidBackdrop() {
  const path = useRef<SVGPathElement>(null),
    reflection = useRef<SVGPathElement>(null),
    group = useRef<SVGGElement>(null),
    shine = useRef<SVGLinearGradientElement>(null);
  const clock = useRef(0),
    running = useRef(false),
    route = useRef('/'),
    depth = useRef(0),
    progress = useRef(0),
    kick = useRef(0),
    stops = useRef<(SVGStopElement | null)[]>([]),
    colors = useRef(HOME.map(rgb)),
    targetColors = useRef(HOME.map(rgb)),
    wakeRef = useRef<() => void>(() => {});
  const { active } = useMotionPreference();
  const { pathname } = useLocation();
  useEffect(() => {
    route.current = pathname;
    targetColors.current = paletteFor(pathname).map(rgb);
    wakeRef.current();
  }, [pathname]);
  useEffect(() => {
    running.current = active;
    wakeRef.current();
  }, [active]);
  useEffect(() => {
    let raf = 0,
      last = 0,
      alive = true,
      mobile = innerWidth < 700,
      pointer = { x: 0, y: 0 },
      target = { x: 0, y: 0 },
      current = 0,
      energy = 0,
      lastScroll = scrollY;
    const curve = (points: number[][]) => {
      let d = `M${points[0][0].toFixed(2)},${points[0][1].toFixed(2)}`;
      for (let i = 0; i < points.length - 1; i++) {
        const a = points[Math.max(0, i - 1)],
          b = points[i],
          c = points[i + 1],
          e = points[Math.min(points.length - 1, i + 2)];
        d += ` C${(b[0] + (c[0] - a[0]) / 6).toFixed(2)},${(b[1] + (c[1] - a[1]) / 6).toFixed(2)} ${(c[0] - (e[0] - b[0]) / 6).toFixed(2)},${(c[1] - (e[1] - b[1]) / 6).toFixed(2)} ${c[0].toFixed(2)},${c[1].toFixed(2)}`;
      }
      return d;
    };
    const draw = (dt = 1 / 60, instant = false) => {
      const t = clock.current;
      // Scroll energy: a kick from each scroll event, eased in and decaying when scrolling stops.
      energy += (kick.current - energy) * (1 - Math.exp(-6 * dt));
      kick.current *= Math.exp(-2.4 * dt);
      const swell = 1 + energy * 0.9;
      const a = Math.sin(t * 0.71) * 48 * swell,
        b = Math.sin(t * 0.62 + 1) * 60 * swell,
        c = Math.sin(t * 0.79 + 2) * 43 * swell,
        e = Math.cos(t * 0.57) * 49 * swell;
      // Page progress tilts the ribbon: the left end sinks and the right end rises as you read.
      const tilt = (progress.current - 0.5) * 110;
      const upper = [
        [-260, 610 + a + tilt],
        [130, 460 + b + tilt * 0.7],
        [360, 525 + c + tilt * 0.4],
        [550, 405 + a],
        [730, 115 + e - tilt * 0.3],
        [1070, -80 + b - tilt * 0.6],
        [1690, -190 + c - tilt],
      ];
      const lower = [
        [-260, 795 + a + tilt],
        [125, 655 + b + tilt * 0.7],
        [400, 750 + c + tilt * 0.4],
        [730, 570 + a],
        [880, 285 + e - tilt * 0.3],
        [1200, 145 + b - tilt * 0.6],
        [1690, 38 + c - tilt],
      ];
      // Colours ease toward the current page's palette (about 0.8 s).
      const mix = instant ? 1 : 1 - Math.exp(-dt / 0.28);
      colors.current.forEach((col, i) => {
        const goal = targetColors.current[i];
        for (let k = 0; k < 3; k++) col[k] += (goal[k] - col[k]) * mix;
        stops.current[i]?.setAttribute(
          'stop-color',
          `rgb(${col.map((v) => Math.round(v)).join(',')})`,
        );
      });
      path.current?.setAttribute(
        'd',
        curve(upper) + curve([...lower].reverse()).replace(/^M/, ' L') + 'Z',
      );
      reflection.current?.setAttribute('d', curve(upper));
      const targetDepth = (route.current === '/' ? 0 : 0.42) + depth.current * 0.24;
      const depthBlend = 1 - Math.exp(-5 * dt),
        pointerBlend = 1 - Math.exp(-3.5 * dt);
      current += (targetDepth - current) * depthBlend;
      pointer.x += (target.x - pointer.x) * pointerBlend;
      pointer.y += (target.y - pointer.y) * pointerBlend;
      group.current?.setAttribute(
        'transform',
        `translate(${pointer.x * 12},${pointer.y * 8 + (mobile ? 100 : 0) + current * 120})`,
      );
      group.current?.setAttribute('opacity', String((mobile ? 0.65 : 0.82) - current * 0.45));
      shine.current?.setAttribute('gradientTransform', `translate(${Math.sin(t * 0.21) * 0.4},0)`);
    };
    function tick(now: number) {
      raf = 0;
      if (!alive) return;
      const dt = last ? Math.min(now - last, 75) : 16;
      last = now;
      if (running.current && !document.hidden) {
        clock.current += (dt / 1000) * (1 + energy * 2.2);
        draw(dt / 1000);
        raf = requestAnimationFrame(tick);
      }
    }
    const wake = () => {
      cancelAnimationFrame(raf);
      last = 0;
      // Without animation (reduced motion, hidden tab) the colours switch at once.
      draw(1 / 60, !running.current);
      if (running.current && !document.hidden) raf = requestAnimationFrame(tick);
    };
    wakeRef.current = wake;
    const resize = () => {
      mobile = innerWidth < 700;
      wake();
    };
    const scroll = () => {
      depth.current = Math.min(1, scrollY / Math.max(600, innerHeight));
      const room = document.documentElement.scrollHeight - innerHeight;
      progress.current = room > 0 ? Math.min(1, scrollY / room) : 0;
      kick.current = Math.min(1.6, kick.current + Math.abs(scrollY - lastScroll) / 260);
      lastScroll = scrollY;
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') {
        target.x = event.clientX / innerWidth - 0.5;
        target.y = event.clientY / innerHeight - 0.5;
      }
    };
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('visibilitychange', wake);
    scroll();
    wake();
    return () => {
      alive = false;
      wakeRef.current = () => {};
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('visibilitychange', wake);
    };
  }, []);
  return (
    <div className="fluid-scene" aria-hidden="true">
      <div className="ambient-wash" />
      <svg className="fluid-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="ribbon-color" x1="0" y1=".75" x2="1" y2=".12">
            {[0, 0.32, 0.57, 1].map((offset, i) => (
              <stop
                key={offset}
                offset={offset}
                stopColor={HOME[i]}
                ref={(el) => {
                  stops.current[i] = el;
                }}
              />
            ))}
          </linearGradient>
          <linearGradient id="ribbon-sheen" x1="0" y1="1" x2=".85" y2="0" ref={shine}>
            <stop stopColor="#83e9ff" stopOpacity="0" />
            <stop offset=".4" stopColor="#91c9ff" stopOpacity=".04" />
            <stop offset=".62" stopColor="#bddeff" stopOpacity=".2" />
            <stop offset=".84" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ribbon-rim">
            <stop stopColor="#c6f3ff" stopOpacity="0" />
            <stop offset=".44" stopColor="#b6d6ff" stopOpacity=".36" />
            <stop offset="1" stopColor="#d5c4ff" stopOpacity="0" />
          </linearGradient>
          <filter
            id="ribbon-diffusion"
            x="-10%"
            y="-20%"
            width="120%"
            height="140%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <path
            ref={path}
            id="ribbon-shape"
            d="M-260 610C150 430 360 660 550 405S730 115 1070-80L1690-190V38C1200 145 880 285 730 570S400 750 125 655L-260 795Z"
          />
        </defs>
        <g ref={group} className="fluid-ribbon">
          <use href="#ribbon-shape" fill="url(#ribbon-color)" />
          <use href="#ribbon-shape" fill="url(#ribbon-sheen)" />
          <path ref={reflection} stroke="url(#ribbon-rim)" strokeWidth="1.1" fill="none" />
        </g>
      </svg>
      <div className="fluid-bottom-light" />
    </div>
  );
}
