import { useEffect, useRef, useState } from 'react';
import { useMotionPreference } from '@/lib/motion';

/** Counts the number in `value` up from zero the first time it scrolls into view.
 * The unit after it ("K+", "×") is wrapped in `.unit` so it can carry the accent colour.
 * The final text is always rendered for screen readers and when motion is reduced. */
export function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const match = /^([^\d]*)(\d+(?:[.,]\d+)?)(.*)$/.exec(value);
  const { paused } = useMotionPreference();
  const ref = useRef<HTMLSpanElement>(null);
  const [prefix, number, suffix] = match ? match.slice(1) : ['', value, ''];
  const [display, setDisplay] = useState(paused || !match ? number : '0');

  useEffect(() => {
    if (paused || !match || !ref.current) {
      setDisplay(number);
      return;
    }
    const target = parseFloat(number.replace(',', '.'));
    const decimals = /[.,]/.test(number) ? number.split(/[.,]/)[1].length : 0;
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
          setDisplay((target * eased).toFixed(decimals).replace('.', sep));
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
      <span aria-hidden="true">
        {prefix}
        {display}
        {suffix && <span className="unit">{suffix}</span>}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}

/** Static figure with its unit ("×", "K+", " мс") wrapped in `.unit`, like CountUp. */
export function Figure({ value }: { value: string }) {
  const [, number, unit] = /^(.*?\d)([^\d]*)$/.exec(value) ?? [value, value, ''];
  return (
    <>
      {number}
      {unit && <span className="unit">{unit}</span>}
    </>
  );
}
