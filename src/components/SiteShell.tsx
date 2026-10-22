import {useEffect,useRef,type ReactNode} from 'react';
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
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target)}}),{threshold:.08,rootMargin:'0px 0px 38px 0px'});
  const scan=()=>document.querySelectorAll('.page-main section:not(.home-hero):not(.interior-heading),.advantage,.tool-detail,.working-grid>div,.discipline,.media-work').forEach(el=>{
   if(observed.has(el)||el.closest('.video-modal-backdrop'))return;observed.add(el);
   if(el.getBoundingClientRect().top>innerHeight*.97){el.classList.add('reveal-ready');observer.observe(el)}
  });
  const mutations=new MutationObserver(scan);mutations.observe(document.body,{childList:true,subtree:true});scan();
  return()=>{observer.disconnect();mutations.disconnect();document.querySelectorAll('.reveal-ready').forEach(el=>el.classList.remove('reveal-ready'))};
 },[pathname,paused]);return null;
}
export function SiteShell({children}:{children:ReactNode}){
 const {lang,setLang,t}=useLanguage(),{paused,toggle,systemReduced}=useMotionPreference(),location=useLocation();const shell=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const names:Record<string,[string,string]>={'/':['Личное портфолио','Personal portfolio'],'/about/':['Обо мне','About'],'/projects/':['Проекты','Projects'],'/skills/':['Опыт и навыки','Experience & skills'],'/media/':['Медиа','Media'],'/contact/':['Контакты','Contact']};
  const name=names[location.pathname]||['Проект','Project'];document.title=`R1SK — ${name[lang==='ru'?0:1]}`;
 },[location.pathname,lang]);
 return <div className="site" ref={shell}><FluidBackdrop/><RevealController/><a className="skip-nav" href="#main">{t(L('К содержимому','Skip to content'))}</a>
  <header className="site-topbar shell"><Link to="/" className="site-identity" aria-label={t(L('R1SK — главная','R1SK — home'))} onPointerEnter={()=>prefetchPage('/')}><span className="identity-mark">R</span><span className="identity-word">R1SK</span><span className="identity-descriptor">/ {t(L('Личное портфолио','Personal portfolio'))}</span></Link><div className="top-controls"><span className="header-status"><span className="live-orb"/>{t(L('Доступен для общения','Open to conversations'))}</span><div className="lang-switch glass-control" aria-label={t(L('Язык','Language'))}>{(['ru','en'] as const).map(value=><button key={value} onClick={()=>setLang(value)} aria-pressed={lang===value}><span>{value.toUpperCase()}</span>{lang===value&&<m.i className="lang-active" layoutId="lang-capsule" transition={paused?{duration:0}:{type:'spring',stiffness:350,damping:30}}/>}</button>)}</div><button aria-label={systemReduced?t(L('Уменьшение движения включено в системе','Reduced motion is enabled by your system')):t(L(paused?'Включить движение':'Приостановить движение',paused?'Resume motion':'Pause motion'))} aria-pressed={paused} onClick={toggle} className="motion-switch glass-control" disabled={systemReduced} title={t(L('Управление анимацией','Motion controls'))}>{paused?<Play size={15}/>:<Pause size={15}/>}</button></div></header>
  {children}<footer className="site-footer shell"><div className="footer-identity" aria-hidden="true">R1SK</div><div className="footer-detail"><p>© {new Date().getFullYear()} R1SK. {t(L('Личное портфолио','Independent personal portfolio'))}</p><Link to="/contact/" onPointerEnter={()=>prefetchPage('/contact/')}>{t(L('Связаться','Get in touch'))}<ArrowUpRight size={16}/></Link></div></footer><LiquidGlassDock/></div>;
}
