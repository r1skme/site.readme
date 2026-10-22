import {useEffect,type ReactNode} from 'react';
import {Link,useLocation} from 'react-router-dom';
import {m} from 'motion/react';
import {ArrowUpRight,Pause,Play} from 'lucide-react';
import {useLanguage,L} from '@/lib/i18n';
import {useMotionPreference} from '@/lib/motion';
import {prefetchPage} from '@/lib/routes';
import FluidBackdrop from '@/components/FluidBackdrop';
import {LiquidGlassDock} from '@/components/ui/liquid-glass-dock';
function RevealController(){
 const{pathname}=useLocation();const{paused}=useMotionPreference();
 useEffect(()=>{
  if(paused||!('IntersectionObserver'in window))return;
  const observed=new WeakSet<Element>();
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target);}}),{threshold:.06,rootMargin:'0px 0px 32px 0px'});
  const scan=()=>document.querySelectorAll('.page-main section:not(.home-hero):not(.interior-heading),.advantage,.tool-detail,.working-grid>div,.discipline,.media-work').forEach(el=>{
   if(observed.has(el)||el.closest('dialog,[data-managed-motion]'))return;
   observed.add(el);
   if(el.getBoundingClientRect().top>innerHeight){el.classList.add('reveal-ready');observer.observe(el);}
  });
  const mutations=new MutationObserver(scan);mutations.observe(document.body,{childList:true,subtree:true});scan();
  return()=>{observer.disconnect();mutations.disconnect();document.querySelectorAll('.reveal-ready').forEach(el=>el.classList.remove('reveal-ready'));};
 },[pathname,paused]);return null;
}
export function SiteShell({children}:{children:ReactNode}){
 const{lang,setLang,t}=useLanguage(),{paused,toggle,systemReduced}=useMotionPreference(),location=useLocation();
 useEffect(()=>{
  const names:Record<string,[string,string]>={'/about/':['Обо мне','About'],'/roadmap/':['Путь и планы','Roadmap'],'/projects/':['Проекты','Projects'],'/skills/':['Опыт','Experience'],'/media/':['Медиа','Media'],'/contact/':['Контакты','Contact']};
  const name=names[location.pathname];document.title=name?`R1SK — ${name[lang==='ru'?0:1]}`:location.pathname==='/'?'R1SK':'R1SK — '+(lang==='ru'?'Проект':'Project');
 },[location.pathname,lang]);
 return <div className="site v8-site"><FluidBackdrop/><RevealController/><a className="skip-nav" href="#main">{t(L('К содержимому','Skip to content'))}</a>
  <header className="site-topbar shell"><Link to="/" className="site-identity" aria-label={t(L('R1SK — главная','R1SK — home'))} onPointerEnter={()=>prefetchPage('/')}><span className="identity-word">R1SK<span className="identity-stop" aria-hidden="true">.</span></span></Link>
   <Link to="/roadmap/" className="v7-journey-nav" aria-current={location.pathname==='/roadmap/'?'page':undefined} onPointerEnter={()=>prefetchPage('/roadmap/')}>{t(L('Путь и планы','Roadmap'))}</Link>
   <div className="top-controls"><div className="lang-switch glass-control" role="group" aria-label={t(L('Язык','Language'))}>{(['ru','en'] as const).map(value=><button type="button" key={value} onClick={()=>setLang(value)} aria-pressed={lang===value}><span>{value.toUpperCase()}</span>{lang===value&&<m.i aria-hidden="true" className="lang-active" layoutId="lang-capsule" transition={paused?{duration:0}:{type:'spring',stiffness:350,damping:30}}/>}</button>)}</div>
    <button type="button" aria-label={systemReduced?t(L('Уменьшение движения включено в системе','Reduced motion is enabled by your system')):t(L(paused?'Включить движение':'Приостановить движение',paused?'Resume motion':'Pause motion'))} aria-pressed={paused} onClick={toggle} className="motion-switch glass-control" disabled={systemReduced}>{paused?<Play size={15}/>:<Pause size={15}/>}</button>
   </div>
  </header>
  {children}
  <footer className="site-footer shell"><div className="footer-detail"><p>© {new Date().getFullYear()} R1SK</p><div className="footer-links"><a href="https://github.com/r1skme" target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight size={15} aria-hidden="true"/></a><Link to="/contact/" onPointerEnter={()=>prefetchPage('/contact/')}>{t(L('Связаться','Get in touch'))}<ArrowUpRight size={15} aria-hidden="true"/></Link></div></div></footer>
  <LiquidGlassDock/>
 </div>;
}
