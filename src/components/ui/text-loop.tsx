import { useEffect, useState } from 'react';
import { m, AnimatePresence, type Transition } from 'motion/react';
import { cn } from '@/lib/utils';
import { useMotionPreference } from '@/lib/motion';
interface TextLoopProps {
  staticText?: string;
  rotatingTexts?: string[];
  className?: string;
  interval?: number;
  transition?: Transition;
  staticTextClassName?: string;
  rotatingTextClassName?: string;
  backgroundClassName?: string;
  cursorClassName?: string;
}
/** Reserve the longest label's width. Only the visible word moves, never the layout. */
export default function TextLoop({
  staticText = 'Design',
  rotatingTexts = ['Limitless', 'Timeless', 'Flawless'],
  className,
  interval = 3600,
  transition = { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
  staticTextClassName,
  rotatingTextClassName,
  backgroundClassName,
  cursorClassName,
}: TextLoopProps) {
  const [index, setIndex] = useState(0);
  const { active, paused } = useMotionPreference();
  useEffect(() => {
    if (rotatingTexts.length < 2 || !active) return;
    const timer = window.setInterval(
      () => setIndex((value) => (value + 1) % rotatingTexts.length),
      Math.max(2200, interval),
    );
    return () => clearInterval(timer);
  }, [rotatingTexts.length, interval, active]);
  const text = rotatingTexts[index % Math.max(rotatingTexts.length, 1)] || '';
  return (
    <div className={cn('textloop', className)}>
      <span className="sr-only">
        {staticText} {rotatingTexts.join(', ')}
      </span>
      <span aria-hidden="true" className={cn('textloop-static', staticTextClassName)}>
        {staticText}
      </span>
      <span aria-hidden="true" className="textloop-window">
        {rotatingTexts.map((value, i) => (
          <span className={cn('textloop-measure', rotatingTextClassName)} key={i}>
            {value}
          </span>
        ))}
        <span className={cn('textloop-tint', backgroundClassName)} />
        <AnimatePresence initial={false} mode="sync">
          <m.span
            key={text}
            className={cn('textloop-word', rotatingTextClassName)}
            initial={paused ? false : { opacity: 0, y: '45%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={paused ? { opacity: 0 } : { opacity: 0, y: '-40%' }}
            transition={paused ? { duration: 0 } : transition}
          >
            {text}
          </m.span>
        </AnimatePresence>
      </span>
      <span aria-hidden="true" className={cn('text-loop-cursor', cursorClassName)} />
    </div>
  );
}
