/* Native, dependency-free interactions. Motion never gates access to content. */
(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const motionButton = $('#motion-toggle');
  const path = $('#ribbon-path');
  const scene = $('.ribbon-scene');
  let paused = reduced.matches;
  let inView = true, frame = 0, last = 0, elapsed = 0, paintAt = 0;
  let toastTimer;
  const toast = message => {
    clearTimeout(toastTimer);
    const el = $('#toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('visible');
    toastTimer = setTimeout(() => el.classList.remove('visible'), 2600);
  };

  // Smooth reflected cubic curves maintain tangency as the ribbon breathes.
  // Only one path is updated: all three visual passes reuse it through <use>.
  const draw = t => {
    if (!path) return;
    const a = Math.sin(t * .23) * 20;
    const b = Math.sin(t * .17) * 26;
    const c = Math.sin(t * .19) * 24;
    const d = Math.sin(t * .13) * 14;
    const n = x => x.toFixed(2);
    path.setAttribute('d', `M-120 ${n(572+a)}C135 ${n(549+a)} 211 ${n(358+b)} 420 ${n(413+b)}S661 ${n(570+c)} 756 ${n(346+c)} 775 ${n(115+d)} 990 ${n(74+d)} 1280 58 1520-130L1580 66C1305 300 1193 ${n(236+d)} 1080 ${n(277+d)}S969 ${n(510+c)} 812 ${n(565+c)} 578 ${n(526+b)} 427 ${n(546+b)} 169 ${n(720+a)}-110 ${n(720+a)}Z`);
  };
  const stop = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    last = 0;
  };
  const tick = now => {
    frame = 0;
    if (paused || !inView || document.hidden) { last = 0; return; }
    if (!last) last = now;
    elapsed += Math.min(now - last, 60) / 1000;
    last = now;
    // Slow atmospheric movement needs no 120 Hz geometry updates.
    const interval = innerWidth <= 760 ? 1000 / 30 : 1000 / 45;
    if (now - paintAt >= interval) { draw(elapsed); paintAt = now; }
    frame = requestAnimationFrame(tick);
  };
  const start = () => {
    if (path && !frame && !paused && inView && !document.hidden) frame = requestAnimationFrame(tick);
  };
  const setMotion = (value, announce = false) => {
    paused = value;
    document.body.classList.toggle('motion-paused', paused);
    if (motionButton) {
      motionButton.setAttribute('aria-pressed', String(paused));
      const title = paused ? 'Включить анимацию' : 'Приостановить анимацию';
      motionButton.setAttribute('aria-label', title);
      motionButton.title = title;
      $('use', motionButton)?.setAttribute('href', paused ? '#i-play' : '#i-pause');
    }
    if (paused) stop(); else start();
    if (announce) toast(paused ? 'Анимация приостановлена' : 'Анимация включена');
  };
  $$('.js-only').forEach(el => { el.hidden = false; });
  setMotion(paused);
  motionButton?.addEventListener('click', () => setMotion(!paused, true));
  reduced.addEventListener('change', e => setMotion(e.matches));
  document.addEventListener('visibilitychange', () => { document.body.classList.toggle('page-hidden', document.hidden); document.hidden ? stop() : start(); });
  window.addEventListener('pagehide', stop);
  window.addEventListener('pageshow', () => { document.body.classList.toggle('page-hidden', document.hidden); start(); });
  if (scene && 'IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      inView ? start() : stop();
    }, { rootMargin: '60px' }).observe(scene);
  }

  const contactRibbon = $('.contact-ribbon');
  if (contactRibbon && 'IntersectionObserver' in window) {
    new IntersectionObserver(entries => contactRibbon.classList.toggle('scene-visible', entries[0].isIntersecting)).observe(contactRibbon);
  }

  // Observe only content initially below the fold, never hide the initial screen.
  if ('IntersectionObserver' in window && !reduced.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return;
        target.classList.remove('will-reveal');
        target.classList.add('is-visible');
        observer.unobserve(target);
      });
    }, { threshold: .06, rootMargin: '0px 0px -12px 0px' });
    $$('.reveal').forEach(el => {
      if (el.getBoundingClientRect().top > innerHeight + 12) {
        el.classList.add('will-reveal');
        observer.observe(el);
      }
    });
  }

  const dock = $('.dock');
  const links = $$('.dock-links>a');
  const sections = links.map(link => $(link.getAttribute('href')));
  const indicator = $('.dock-indicator');
  let scrollFrame = 0;
  const updateDock = () => {
    scrollFrame = 0;
    let index = 0;
    const line = Math.min(240, innerHeight * .32);
    sections.forEach((section, i) => { if (section && section.getBoundingClientRect().top <= line) index = i; });
    if (scrollY + innerHeight >= document.documentElement.scrollHeight - 24) index = links.length - 1;
    links.forEach((link, i) => {
      if (i === index) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    const active = links[index];
    if (indicator && active) {
      indicator.style.width = `${active.offsetWidth}px`;
      indicator.style.transform = `translateX(${active.offsetLeft}px)`;
      dock?.classList.add('has-indicator');
    }
  };
  const scheduleDock = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateDock); };
  window.addEventListener('scroll', scheduleDock, { passive: true });
  window.addEventListener('resize', scheduleDock, { passive: true });
  window.addEventListener('hashchange', scheduleDock);
  document.fonts?.ready.then(scheduleDock);
  updateDock();

  // Copy only the publicly provided handle; don't fake a successful action.
  $$('[data-copy]').forEach(button => {
    let resetTimer;
    button.addEventListener('click', async () => {
      const value = button.dataset.copy;
      let copied = false;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(value);
          copied = true;
        }
      } catch (_) { /* fall through to the local copy fallback */ }
      if (!copied) {
        const field = document.createElement('textarea');
        field.value = value;
        field.setAttribute('readonly', '');
        field.style.cssText = 'position:fixed;left:0;top:0;opacity:0;width:1px;height:1px;';
        document.body.append(field);
        field.select();
        try { copied = document.execCommand('copy'); } catch (_) { copied = false; }
        field.remove();
        button.focus({ preventScroll: true });
      }
      if (copied) {
        clearTimeout(resetTimer);
        button.classList.add('is-copied');
        $('use', button)?.setAttribute('href', '#i-check');
        toast('Discord r1sk.gg скопирован');
        resetTimer = setTimeout(() => {
          button.classList.remove('is-copied');
          $('use', button)?.setAttribute('href', '#i-copy');
        }, 2200);
      } else {
        const handle = $('#discord-handle');
        if (handle) {
          const selection = getSelection(), range = document.createRange();
          range.selectNodeContents(handle); selection?.removeAllRanges(); selection?.addRange(range);
        }
        toast('Выделено: r1sk.gg. Скопируйте имя вручную.');
      }
    });
  });
  $('#print-resume')?.addEventListener('click', () => window.print());
})();
