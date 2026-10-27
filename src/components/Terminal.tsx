import { useEffect, useRef, useState } from 'react';
import { useLanguage, type Localized } from '@/lib/i18n';
import { useMotionPreference } from '@/lib/motion';

type Line = { cmd: string; note: Localized };

/** A static-markup terminal that types real `rs` commands from the ReSearchify README.
 * No output is shown because none is published; each command carries its meaning as a comment. */
export function Terminal({
  lines,
  title = 'rs — ReSearchify',
  typing = true,
}: {
  lines: Line[];
  title?: string;
  typing?: boolean;
}) {
  const { t } = useLanguage();
  const motion = useMotionPreference();
  const paused = motion.paused || !typing;
  const [step, setStep] = useState({ line: 0, chars: 0 });
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return setVisible(true);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const animate = motion.active && visible && !paused;
  useEffect(() => {
    if (!animate) return;
    const current = lines[step.line];
    let delay = 26;
    let next = { line: step.line, chars: step.chars + 1 };
    if (!current) {
      delay = 2600;
      next = { line: 0, chars: 0 };
    } else if (step.chars >= current.cmd.length) {
      delay = 900;
      next = { line: step.line + 1, chars: 0 };
    }
    const id = window.setTimeout(() => setStep(next), delay);
    return () => clearTimeout(id);
  }, [animate, step, lines]);

  const shown = paused ? lines.length : step.line;
  return (
    <div className="terminal" ref={ref}>
      <div className="terminal-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{title}</span>
      </div>
      <pre className="terminal-body" aria-label={title}>
        {lines.map((line, i) => {
          const done = i < shown;
          const typing = !paused && i === step.line;
          if (!done && !typing) return null;
          return (
            <span className="terminal-line" key={line.cmd}>
              <span className="terminal-prompt" aria-hidden="true">
                $
              </span>{' '}
              <span className="terminal-cmd">
                {done ? line.cmd : line.cmd.slice(0, step.chars)}
              </span>
              {typing && <span className="terminal-caret" aria-hidden="true" />}
              {(done || (typing && step.chars >= line.cmd.length)) && (
                <span className="terminal-note"># {t(line.note)}</span>
              )}
            </span>
          );
        })}
        {paused && (
          <span className="terminal-line">
            <span className="terminal-prompt">$</span>{' '}
            <span className="terminal-caret" aria-hidden="true" />
          </span>
        )}
      </pre>
    </div>
  );
}
