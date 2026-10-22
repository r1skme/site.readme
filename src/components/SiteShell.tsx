import {useEffect,type ReactNode} from 'react';
import {Link,NavLink,useLocation} from 'react-router-dom';
import {AnimatePresence,MotionConfig} from 'motion/react';
import {ArrowUpRight,House,Grid3X3,Clapperboard,UserRound,Layers3,Mail,Pause,Play} from 'lucide-react';
import {useLanguage,L} from '@/lib/i18n';
import {useMotionPreference} from '@/lib/motion';
import FluidBackdrop from '@/components/FluidBackdrop';
import PageTransition from '@/components/PageTransition';
const items=[
 {url:'/',icon:House,name:L('Главная','Home')},
 {url:'/projects/',icon:Grid3X3,name:L('Проекты','Projects')},
 {url:'/media/',icon:Clapperboard,name:L('Медиа','Media')},
 {url:'/skills/',icon:Layers3,name:L('Опыт','Experience')},
 {url:'/about/',icon:UserRound,name:L('Обо мне','About')},
 {url:'/contact/',icon:Mail,name:L('Контакты','Contact')},
];
export function SiteShell({children}:{children:ReactNode}){
 const {lang,setLang,t}=useLanguage();const {paused,toggle}=useMotionPreference();const location=useLocation();
 useEffect(()=>{window.scrollTo({top:0,behavior:'instant'});},[location.pathname]);
 return <div className="site">
   <FluidBackdrop/>
   <a className="skip-nav" href="#main">{t(L('К содержимому','Skip to content'))}</a>
   <header className="site-topbar shell"><Link to="/" className="site-identity" aria-label="R1SK — home"><span className="identity-mark">R</span><span className="identity-word">R1SK</span><span className="identity-descriptor">/ {t(L('Личное портфолио','Personal portfolio'))}</span></Link>
    <div className="top-controls"><span className="header-status"><span className="live-orb"/>{t(L('Доступен для общения','Open to conversations'))}</span>
    <div className="lang-switch" aria-label={t(L('Язык','Language'))}>{(['ru','en'] as const).map(value=><button key={value} onClick={()=>setLang(value)} aria-pressed={lang===value}>{value.toUpperCase()}</button>)}</div>
    <button aria-label={t(L(paused?'Включить движение':'Приостановить движение',paused?'Resume motion':'Pause motion'))} aria-pressed={paused} onClick={toggle} className="motion-switch" title={t(L('Анимация фона','Background animation'))}>{paused?<Play size={15}/>:<Pause size={15}/>}</button></div>
   </header>
   <MotionConfig reducedMotion="user"><AnimatePresence mode="wait" initial={false}><PageTransition key={location.pathname}>{children}</PageTransition></AnimatePresence></MotionConfig>
   <footer className="site-footer shell"><div className="footer-identity" aria-hidden="true">R1SK</div><div className="footer-detail"><p>© {new Date().getFullYear()} R1SK. {t(L('Личное портфолио','Independent personal portfolio'))}</p><Link to="/contact/">{t(L('Связаться','Get in touch'))} <ArrowUpRight size={16}/></Link></div></footer>
   <nav className="navigation-dock" aria-label={t(L('Основная навигация','Main navigation'))}>{items.map(({url,icon:Icon,name})=><NavLink key={url} to={url} end={url==='/'} className={({isActive})=>'dock-link'+(isActive?' active':'')}><Icon size={16} strokeWidth={1.65}/><span>{t(name)}</span></NavLink>)}</nav>
 </div>;
}
