import { useEffect, useRef, useState } from 'react';
import { useMotionPreference } from '@/lib/motion';
import type { Work } from '@/data/media';

const src = (img: string) => (img.startsWith('http') ? img : `/${img}`);

/** Two tilted rows of real previews drifting in opposite directions.
 * Tiles stay at or below the images' natural size, so nothing is upscaled. */
export function Reel({ works }: { works: Work[] }) {
  const { active } = useMotionPreference();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const rows = [works, [...works].reverse()];
  return (
    <div
      ref={ref}
      className="reel"
      aria-hidden="true"
      data-running={active && inView ? '' : undefined}
    >
      {rows.map((row, r) => (
        <div className={`reel-row reel-row-${r}`} key={r}>
          {/* Two copies make the loop seamless; only the first copy is eagerly loaded. */}
          {[0, 1].map((copy) =>
            row.map((w) => (
              <div className={`reel-tile reel-${w.platform.toLowerCase()}`} key={`${copy}-${w.id}`}>
                <img
                  src={src(w.img)}
                  alt=""
                  loading={copy ? 'lazy' : 'eager'}
                  decoding="async"
                  draggable={false}
                />
              </div>
            )),
          )}
        </div>
      ))}
    </div>
  );
}
