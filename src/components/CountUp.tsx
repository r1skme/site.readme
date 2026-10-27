import { useEffect, useRef, useState } from 'react';
import { useMotionPreference } from '@/lib/motion';

/** Counts the leading number of `value` up from zero the first time it scrolls into view.
 * The final text is always rendered for screen readers and when motion is reduced. */
export function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const match = /^([^\d]*)(\d+(?:[.,]\d+)?)(.*)$/.exec(value);
  const { paused } = useMotionPreference();
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(
    paused || !match ? value : value.replace(/\d+(?:[.,]\d+)?/, '0'),
  );

  useEffect(() => {
    if (paused || !match || !ref.current) {
      setDisplay(value);
      return;
    }
    const [, prefix, number, suffix] = match;
    const target = parseFloat(number.replace(',', '.'));
    const decimals =
      number.includes('.') || number.includes(',') ? number.split(/[.,]/)[1].length : 0;
    const sep = number.includes(',') ? ',' : '.';
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 4);
          setDisplay(prefix + (target * eased).toFixed(decimals).replace('.', sep) + suffix);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, paused]);

  return (
    <span ref={ref}>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
