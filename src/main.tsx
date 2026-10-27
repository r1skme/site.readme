import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { LoaderMark } from '@/components/LoaderMark';
import { pageReady } from '@/lib/boot';
import './styles/index.css';

/** Takes over the static boot screen from index.html and removes it once the first page
 * has rendered and the fonts are in. There is no minimum duration. */
function BootOverlay({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    let alive = true;
    // Dev only: /?loader keeps the boot screen up until you click, to look at it.
    if (import.meta.env.DEV && new URLSearchParams(location.search).has('loader')) {
      const close = () => setLeaving(true);
      addEventListener('click', close, { once: true });
      return () => removeEventListener('click', close);
    }
    Promise.all([pageReady, document.fonts?.ready]).then(() => {
      if (!alive) return;
      setLeaving(true);
    });
    return () => {
      alive = false;
    };
  }, [onDone]);
  useEffect(() => {
    if (!leaving) return;
    const id = setTimeout(onDone, 300);
    return () => clearTimeout(id);
  }, [leaving, onDone]);
  return (
    <div className={'boot-inner' + (leaving ? ' is-leaving' : '')}>
      <LoaderMark />
    </div>
  );
}

const bootEl = document.getElementById('boot');
if (bootEl) {
  const bootRoot = createRoot(bootEl);
  bootRoot.render(
    <BootOverlay
      onDone={() => {
        bootRoot.unmount();
        bootEl.remove();
      }}
    />,
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
