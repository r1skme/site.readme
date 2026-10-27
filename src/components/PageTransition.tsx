import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { m } from 'motion/react';
export default function PageTransition({
  children,
  instant = false,
  onEntered,
}: {
  children: ReactNode;
  instant?: boolean;
  onEntered?: () => void;
}) {
  const enter = useRef(onEntered);
  // Restore scrolling before the first painted frame, not during both exit and enter.
  useLayoutEffect(() => {
    enter.current?.();
  }, []);
  return (
    <m.main
      id="main"
      tabIndex={-1}
      // The old page lifts away; the new one opens at the top and settles in from below.
      initial={instant ? false : { opacity: 0, y: 28, filter: 'blur(6px)' }}
      animate={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: instant ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] },
        // Drop the filter afterwards: a lingering filter would turn main into a containing block.
        transitionEnd: { filter: 'none' },
      }}
      exit={{
        opacity: 0,
        y: -14,
        filter: 'blur(4px)',
        transition: { duration: instant ? 0 : 0.26, ease: [0.4, 0, 1, 1] },
      }}
      className="page-main"
    >
      {children}
    </m.main>
  );
}
