/* R1SK / PERSONAL. Native UI and one autonomous vector ribbon; no dependencies. */
(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const root = document.documentElement;
  root.classList.replace('no-js', 'js');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const storage = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch { /* private mode */ } }
  };
  const strings = $$('[data-en]').map(el => ({el, ru: el.innerHTML, en: el.dataset.en}));
  const labels = $$('[data-en-label]').map(el => ({el, ru: el.getAttribute('aria-label'), en: el.dataset.enLabel}));
  const urlLanguage = new URL(location.href).searchParams.get('lang');
  let language = ['ru', 'en'].includes(urlLanguage) ? urlLanguage : (storage.get('r1sk-language') || 'ru');
  if (!['ru', 'en'].includes(language)) language = 'ru';
  let paused = reduced.matches || storage.get('r1sk-motion') === 'paused';
  let toastTimer;
  const toast = text => {
    const el = $('#toast');
    clearTimeout(toastTimer);
    el.textContent = text;
    el.classList.add('show');
    toastTimer = setTimeout(() => el.classList.remove('show'), 3000);
  };
  const motionButton = $('#motion-toggle');
  function updateMotionLabel() {
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.setAttribute('aria-label', language === 'en' ? (paused ? 'Play background animation' : 'Pause background animation') : (paused ? 'Включить анимацию фона' : 'Приостановить анимацию фона'));
    motionButton.title = motionButton.getAttribute('aria-label');
  }
  function setLanguage(lang, persist = false) {
    language = lang;
    root.lang = lang;
    strings.forEach(x => { x.el.innerHTML = x[lang]; }); // Both versions are trusted static site copy.
    labels.forEach(x => x.el.setAttribute('aria-label', x[lang]));
    $$('[data-lang]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.lang === lang)));
    document.title = lang === 'en' ? 'R1SK — Projects, automation & media' : 'R1SK — проекты, автоматизация и медиа';
    $('meta[property="og:title"]').content = document.title;
    $('meta[name="description"]').content = lang === 'en' ? 'R1SK — personal IT projects, automation, interfaces and gaming videos. Prime Market, Predict, ReSearchify and DaVinci Resolve edits.' : 'R1SK — личные IT-проекты, автоматизация, интерфейсы и игровые видео. Prime Market, Predict, ReSearchify и работы в DaVinci Resolve.';
    updateMotionLabel();
    if (persist) {
      storage.set('r1sk-language', lang);
      const url = new URL(location.href);
      if (lang === 'en') url.searchParams.set('lang', 'en'); else url.searchParams.delete('lang');
      try { history.replaceState(history.state, '', url); } catch { /* sandboxed preview */ }
    }
  }
  $$('[data-lang]').forEach(el => el.addEventListener('click', () => setLanguage(el.dataset.lang, true)));
  setLanguage(language);

  // Only report real resource loading. Never block content, simulate percentages,
  // or enforce a minimum display duration. Slow fonts are optional, not a gate.
  const resourceNotice = $('#resource-status');
  let loading = document.readyState !== 'complete';
  let noticeTimer = loading ? setTimeout(() => { if (loading) resourceNotice.hidden = false; }, 240) : 0;
  const loaded = () => { loading = false; clearTimeout(noticeTimer); resourceNotice.hidden = true; };
  window.addEventListener('load', loaded, {once:true});
  if (!loading) loaded();
  // A broken optional external resource must not leave a permanent overlay.
  window.addEventListener('error', e => { if (e.target?.tagName === 'LINK') loaded(); }, true);

  // One animated vector path, reused for colour, a soft edge and restrained light.
  // It has its own clock: movement continues without scrolling or pointer input.
  const atmosphere = $('#atmosphere');
  let renderer = null;
  function createRibbon() {
    const path=$('#ribbon-path'),layer=$('#ribbon-layer'),svg=$('#background-svg');
    if(!path||!layer||!svg)return null;
    const curve = (points, move = true) => {
      let d=move ? `M${points[0][0].toFixed(2)} ${points[0][1].toFixed(2)}` : `L${points[0][0].toFixed(2)} ${points[0][1].toFixed(2)}`;
      for(let i=0;i<points.length-1;i++){
        const a=points[Math.max(0,i-1)],b=points[i],c=points[i+1],f=points[Math.min(points.length-1,i+2)];
        const k=.16;
        d+=`C${(b[0]+(c[0]-a[0])*k).toFixed(2)} ${(b[1]+(c[1]-a[1])*k).toFixed(2)} ${(c[0]-(f[0]-b[0])*k).toFixed(2)} ${(c[1]-(f[1]-b[1])*k).toFixed(2)} ${c[0].toFixed(2)} ${c[1].toFixed(2)}`;
      }return d;
    };
    let mobile=innerWidth<760;
    return {
      resize(){mobile=innerWidth<760;},
      performance(){},
      draw(time,depth,point){
        const a=Math.sin(time*.19)*32,b=Math.sin(time*.17+1.2)*38,c=Math.sin(time*.21+.7)*31,d=Math.sin(time*.16+2)*43,f=Math.sin(time*.13)*35;
        const top=[[-240,650+a],[180,488+b],[410,555+c],[540,400+d],[680,-40+f],[940,-90-f],[1220,-150+a],[1660,-290]];
        const bottom=[[-240,860+a],[190,675+b],[420,715+c],[670,585+d],[800,100+f],[1060,-50-f],[1350,-110+a],[1660,-60]];
        path.setAttribute('d',curve(top)+curve(bottom.reverse(),false)+'Z');
        const dy=depth*180+(mobile?70:0),dx=point.x*7;
        layer.setAttribute('transform',`translate(${dx.toFixed(2)} ${(dy+point.y*6).toFixed(2)})`);
        layer.setAttribute('opacity',(mobile?.57:.84)-depth*.52);
      }
    };
  }
  let frame=0,last=0,paintAt=0,elapsed=0,currentDepth=0,targetDepth=0;
  const pointer={x:0,y:0},pointerTarget={x:0,y:0};
  function stopAnimation(){if(frame)cancelAnimationFrame(frame);frame=0;last=0;}
  function tick(now){
    frame=0;
    if(paused||document.hidden||!renderer){last=0;return;}
    const delta=last?Math.min(now-last,90):16.7;last=now;elapsed+=delta/1000;
    currentDepth+=(targetDepth-currentDepth)*Math.min(1,delta*.003);
    pointer.x+=(pointerTarget.x-pointer.x)*.035;pointer.y+=(pointerTarget.y-pointer.y)*.035;
    const interval=innerWidth<760?1000/30:1000/45;
    if(now-paintAt>=interval){renderer.draw(elapsed,currentDepth,pointer);renderer.performance(now-paintAt);paintAt=now;}
    frame=requestAnimationFrame(tick);
  }
  function startAnimation(){if(renderer&&!frame&&!paused&&!document.hidden){last=0;frame=requestAnimationFrame(tick);}}
  function setMotion(value,persist=false){
    paused=value;document.body.classList.toggle('motion-paused',paused);updateMotionLabel();
    if(paused){stopAnimation();renderer?.draw(elapsed,targetDepth,pointer);}else startAnimation();
    if(persist)storage.set('r1sk-motion',paused?'paused':'playing');
  }
  motionButton.addEventListener('click',()=>setMotion(!paused,true));
  reduced.addEventListener('change',()=>setMotion(reduced.matches||storage.get('r1sk-motion')==='paused'));
  document.addEventListener('visibilitychange',()=>document.hidden?stopAnimation():startAnimation());
  if(matchMedia('(pointer:fine)').matches)window.addEventListener('pointermove',e=>{pointerTarget.x=(e.clientX/innerWidth-.5);pointerTarget.y=(e.clientY/innerHeight-.5);},{passive:true});
  try{renderer=createRibbon();}catch{renderer=null;}
  renderer?.draw(0,0,pointer);setMotion(paused);

  // Navigation & scene depth respond to scroll, but motion has its own clock.
  const sections=$$('[data-nav]');const navLinks=$$('.dock [data-section]');
  let scrollFrame=0;
  function updateScroll(){
    scrollFrame=0;
    let active='home';
    for(const el of sections){if(el.getBoundingClientRect().top<=innerHeight*.43)active=el.dataset.nav;}
    navLinks.forEach(a=>{const isActive=a.dataset.section===active;a.classList.toggle('active',isActive);if(isActive)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
    const heroHeight=$('#home').offsetHeight;
    const introDepth=Math.min(1,Math.max(0,(scrollY-heroHeight*.20)/(heroHeight*.6)));
    const contactTop=$('#contact').getBoundingClientRect().top;
    const contactLight=contactTop<innerHeight*.8?Math.min(1,Math.max(0,(innerHeight*.8-contactTop)/(innerHeight*.7))):0;
    targetDepth=introDepth*(1-contactLight*.65);
    if(paused){currentDepth=targetDepth;renderer?.draw(elapsed,currentDepth,pointer);}
  }
  window.addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(updateScroll);},{passive:true});
  window.addEventListener('resize',()=>{renderer?.resize();updateScroll();renderer?.draw(elapsed,currentDepth,pointer);},{passive:true});
  updateScroll();
  if('IntersectionObserver'in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('waiting');entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08,rootMargin:'0px 0px 24px 0px'});
    $$('.reveal').forEach(el=>{if(!paused&&el.getBoundingClientRect().top>innerHeight)el.classList.add('waiting');observer.observe(el);});
  }

  // Original video links. No autoplay or third-party iframe before a deliberate click.
  $$('.video-trigger img').forEach(img=>{const fail=()=>{img.hidden=true;};img.addEventListener('error',fail);if(img.complete&&!img.naturalWidth)fail();});
  const videoDialog=$('#video-dialog'),videoFrame=$('#video-frame');
  let currentDialog=null,returnFocus=null;
  function showDialog(dialog){
    if(currentDialog&&currentDialog!==dialog)hideDialog(currentDialog);
    returnFocus=document.activeElement;currentDialog=dialog;document.body.classList.add('locked');
    if(typeof dialog.showModal==='function')dialog.showModal();else dialog.setAttribute('open','');
  }
  function hideDialog(dialog){
    if(typeof dialog.close==='function') dialog.close(); else dialog.removeAttribute('open');
    cleanDialog(dialog); // Tear down embedded playback synchronously, before the queued close event.
  }
  function cleanDialog(dialog){
    if(dialog===videoDialog)videoFrame.replaceChildren();
    if(currentDialog===dialog){currentDialog=null;document.body.classList.remove('locked');returnFocus?.focus({preventScroll:true});}
    if(location.hash==='#'+dialog.id){const url=new URL(location.href);url.hash='projects';try { history.replaceState(null,'',url); } catch { /* embedded preview */ }}
  }
  $$('dialog').forEach(dialog=>{
    dialog.addEventListener('close',()=>cleanDialog(dialog));
    dialog.addEventListener('cancel',e=>{e.preventDefault();hideDialog(dialog);});
    $('[data-close]',dialog)?.addEventListener('click',()=>hideDialog(dialog));
    dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)hideDialog(dialog);}});
  });
  $$('a[href^="#case-"]').forEach(link=>link.addEventListener('click',e=>{
    const dialog=document.getElementById(link.hash.slice(1));if(!dialog)return;e.preventDefault();
    try { history.pushState({case:dialog.id},'',link.hash); } catch { /* embedded preview */ } showDialog(dialog);
  }));
  function restoreDialogFromURL(){
    const id=location.hash.slice(1);const found=id.startsWith('case-')?document.getElementById(id):null;
    if(found?.tagName==='DIALOG'){if(currentDialog!==found)showDialog(found);}else if(currentDialog?.classList.contains('case-dialog'))hideDialog(currentDialog);
  }
  window.addEventListener('popstate',restoreDialogFromURL);
  restoreDialogFromURL();
  $$('[data-video]').forEach(button=>button.addEventListener('click',()=>{
    const id=button.dataset.video;if(!/^[a-zA-Z0-9_-]{11}$/.test(id))return;
    const iframe=document.createElement('iframe');
    iframe.src='https://www.youtube-nocookie.com/embed/'+id+'?rel=0';
    iframe.title=language==='en'?'Video by R1SK':'Видео R1SK';iframe.allow='accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen';iframe.allowFullscreen=true;
    iframe.referrerPolicy='strict-origin-when-cross-origin';videoFrame.replaceChildren(iframe);
    $('#video-external').href='https://youtu.be/'+id;showDialog(videoDialog);
  }));
  $('#copy-discord').addEventListener('click',async()=>{
    try{if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText('r1sk.gg');toast(language==='en'?'Discord username copied: r1sk.gg':'Ник Discord скопирован: r1sk.gg');}
    catch{toast(language==='en'?'Could not copy. Discord: r1sk.gg':'Не удалось скопировать. Discord: r1sk.gg');}
  });
  window.addEventListener('pagehide',stopAnimation);
  window.addEventListener('pageshow',()=>{updateScroll();startAnimation();});
})();
