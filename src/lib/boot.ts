// Real readiness for the first screen: resolved once the first page has rendered.
// The boot overlay waits for this and for web fonts; nothing waits on a timer.
let resolvePage: () => void = () => {};
export const pageReady = new Promise<void>((resolve) => {
  resolvePage = resolve;
});
export const markPageReady = () => resolvePage();

/** The static boot overlay from index.html is still on screen. */
export const booting = () => typeof document !== 'undefined' && !!document.getElementById('boot');
