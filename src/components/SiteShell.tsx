import {useEffect,type ReactNode} from 'react';
import {Link,useLocation} from 'react-router-dom';
import {m} from 'motion/react';
import {ArrowUpRight} from 'lucide-react';
import {useLanguage,L} from '@/lib/i18n';
import {useMotionPreference} from '@/lib/motion';
import {prefetchPage} from '@/lib/routes';
import FluidBackdrop from '@/components/FluidBackdrop';
import {LiquidGlassDock} from '@/components/ui/liquid-glass-dock';
function RevealController(){
 const{pathname}=useLocation();const{paused}=useMotionPreference();
 useEffect(()=>{
  if(paused||!('IntersectionObserver'in window))return;
  const seen=new WeakSet<Element>();
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target)}}),{threshold:.03,rootMargin:'0px 0px 30px 0px'});
  const scan=()=>document.querySelectorAll('[data-reveal],.media-work,.page-main section:not(.home-hero):not(.interior-heading):not(.v9-section)').forEach(el=>{
   if(seen.has(el)||el.closest('dialog,[data-managed-motion]'))return;seen.add(el);
   if(el.querySelector('[data-reveal]')||el.getBoundingClientRect().height>innerHeight*1.15)return;
   if(el.getBoundingClientRect().top>innerHeight*.98){el.classList.add('reveal-ready');observer.observe(el)}
  });
  const changes=new MutationObserver(scan);changes.observe(document.getElementById('root')||document.body,{childList:true,subtree:true});scan();
  return()=>{observer.disconnect();changes.disconnect();document.querySelectorAll('.reveal-ready').forEach(el=>el.classList.remove('reveal-ready'))};
 },[pathname,paused]);return null;
}
export function SiteShell({children}:{children:ReactNode}){
 const{lang,setLang,t}=useLanguage(),{paused}=useMotionPreference(),location=useLocation();
 useEffect(()=>{
  const names:Record<string,[string,string]>={'/about/':['Обо мне','About'],'/roadmap/':['Путь и планы','Roadmap'],'/projects/':['Проекты','Projects'],'/skills/':['Опыт','Experience'],'/media/':['Медиа','Media'],'/contact/':['Контакты','Contact']};
  const name=names[location.pathname];document.title=name?`R1SK — ${name[lang==='ru'?0:1]}`:location.pathname==='/'?'R1SK':'R1SK — '+(lang==='ru'?'Проект':'Project');
 },[location.pathname,lang]);
 return <div className="site v8-site"><FluidBackdrop/><RevealController/><a className="skip-nav" href="#main">{t(L('К содержимому','Skip to content'))}</a>
  <header className="site-topbar shell"><Link to="/" className="site-identity" aria-label={t(L('R1SK — главная','R1SK — home'))} onPointerEnter={()=>prefetchPage('/')}><span className="identity-word">R1SK<span className="identity-stop" aria-hidden="true">.</span></span></Link>
   <Link to="/roadmap/" className="v7-journey-nav" aria-current={location.pathname==='/roadmap/'?'page':undefined} onPointerEnter={()=>prefetchPage('/roadmap/')}>{t(L('Путь и планы','Roadmap'))}</Link>
   <div className="top-controls"><div className="lang-switch glass-control" role="group" aria-label={t(L('Язык','Language'))}>{(['ru','en'] as const).map(value=><button type="button" key={value} onClick={()=>setLang(value)} aria-pressed={lang===value}><span>{value.toUpperCase()}</span>{lang===value&&<m.i aria-hidden="true" className="lang-active" layoutId="lang-capsule" transition={paused?{duration:0}:{type:'spring',stiffness:350,damping:30}}/>}</button>)}</div>
    
   </div>
  </header>
  {children}
  <footer className="site-footer shell"><div className="footer-detail"><p>© {new Date().getFullYear()} R1SK</p><div className="footer-links"><a href="https://github.com/r1skme" target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight size={15} aria-hidden="true"/></a><Link to="/contact/" onPointerEnter={()=>prefetchPage('/contact/')}>{t(L('Связаться','Get in touch'))}<ArrowUpRight size={15} aria-hidden="true"/></Link></div></div></footer>
  <LiquidGlassDock/>
 </div>;
}
