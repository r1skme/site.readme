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
 const {pathname}=useLocation();const{paused}=useMotionPreference();
 useEffect(()=>{
  if(paused||!('IntersectionObserver'in window))return;
  const observed=new WeakSet<Element>();
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target)}}),{threshold:.06,rootMargin:'0px 0px 40px 0px'});
  const scan=()=>document.querySelectorAll('.page-main section:not(.home-hero):not(.interior-heading):not(.journey-layout),.media-work').forEach(el=>{
   if(observed.has(el)||el.closest('dialog')||el.classList.contains('journey-layout'))return;observed.add(el);
   if(el.getBoundingClientRect().top>innerHeight*.97){el.classList.add('reveal-ready');observer.observe(el)}
  });
  const mutations=new MutationObserver(scan);mutations.observe(document.getElementById('main')||document.body,{childList:true,subtree:true});scan();
  return()=>{observer.disconnect();mutations.disconnect();document.querySelectorAll('.reveal-ready').forEach(el=>el.classList.remove('reveal-ready'))};
 },[pathname,paused]);return null;
}
export function SiteShell({children}:{children:ReactNode}){
 const {lang,setLang,t}=useLanguage(),{paused,toggle,systemReduced}=useMotionPreference(),location=useLocation();
 useEffect(()=>{
  const names:Record<string,[string,string]>={'/':['Проекты и медиа','Projects & media'],'/about/':['Обо мне','About'],'/roadmap/':['Путь и планы','Roadmap'],'/projects/':['Проекты','Projects'],'/skills/':['Навыки','Skills'],'/media/':['Медиа','Media'],'/contact/':['Контакты','Contact']};
  const name=names[location.pathname]||['Проект','Project'];document.title=`R1SK — ${name[lang==='ru'?0:1]}`;
 },[location.pathname,lang]);
 return <div className="site"><FluidBackdrop/><RevealController/><a className="skip-nav" href="#main">{t(L('К содержимому','Skip to content'))}</a>
  <header className="site-topbar shell"><Link to="/" className="site-identity" aria-label={t(L('R1SK — главная','R1SK — home'))} onPointerEnter={()=>prefetchPage('/')}><span className="identity-word">R1SK<span aria-hidden="true" className="brand-fullstop">.</span></span></Link><div className="top-controls"><div className="lang-switch glass-control" aria-label={t(L('Язык','Language'))}>{(['ru','en'] as const).map(value=><button key={value} onClick={()=>setLang(value)} aria-pressed={lang===value}><span>{value.toUpperCase()}</span>{lang===value&&<m.i className="lang-active" layoutId="lang-capsule" transition={paused?{duration:0}:{type:'spring',stiffness:350,damping:30}}/>}</button>)}</div><button aria-label={systemReduced?t(L('Уменьшение движения включено в системе','Reduced motion is enabled by your system')):t(L(paused?'Включить движение':'Приостановить движение',paused?'Resume motion':'Pause motion'))} aria-pressed={paused} onClick={toggle} className="motion-switch glass-control" disabled={systemReduced}>{paused?<Play size={15}/>:<Pause size={15}/>}</button></div></header>
  {children}<footer className="site-footer shell quiet-footer"><Link to="/" className="footer-brand">R1SK</Link><div className="footer-links"><a href="https://t.me/R1SKME" target="_blank" rel="noopener noreferrer">Telegram<ArrowUpRight size={15} aria-hidden="true"/></a><a href="https://github.com/r1skme" target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight size={15} aria-hidden="true"/></a><Link to="/contact/">{t(L('Контакты','Contact'))}<ArrowUpRight size={15} aria-hidden="true"/></Link></div></footer><LiquidGlassDock/></div>;
}
