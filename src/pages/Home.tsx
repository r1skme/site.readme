import {Link} from 'react-router-dom';
import {ArrowUpRight,ArrowRight} from 'lucide-react';
import {m} from 'motion/react';
import {useLanguage,L} from '@/lib/i18n';
import {useMotionPreference} from '@/lib/motion';
import {AnimatedLink} from '@/components/Primitives';
import TextLoop from '@/components/ui/text-loop';
const subjects={ru:['инструменты','проекты','видео'],en:['tools','projects','videos']};
const focus=[
 {name:L('Программирование','Software & automation'),description:L('Python, Telegram-боты, API и автоматизация. Работаю над логикой, проверкой функций и поиском причин ошибок.','Python, Telegram bots, APIs and automation. I work on workflows, feature testing and understanding what breaks.'),url:'/skills/'},
 {name:L('Продукты','Products & interfaces'),description:L('Собственные инструменты: от задачи и сценариев использования до интерфейса и следующих версий.','My own tools, from a problem and user flows to the interface and the next iteration.'),url:'/projects/'},
 {name:L('Видеомонтаж','Video editing'),description:L('Около трёх лет в DaVinci Resolve. Игровые эдиты, ритм, анимация, цвет и работа со звуком.','About three years in DaVinci Resolve. Gaming edits, rhythm, animation, colour and sound.'),url:'/media/'}
];
const selection=[
 {slug:'prime-market',name:'Prime Market',desc:L('Автоматизация задач на рынке игровых предметов.','Automation for game-item market workflows.')},
 {slug:'predict',name:'Predict',desc:L('Программный продукт с собственной логикой и интерфейсом.','A software product with its own logic and interface.')},
 {slug:'researchify',name:'ReSearchify',desc:L('Локальный поиск по исходному коду на C++20.','Local source-code search built with C++20.')}
];
export default function Home(){
 const{lang,t}=useLanguage(),{paused}=useMotionPreference();
 return <>
  <section className="home-hero shell v6-hero v8-hero">
   <div className="home-hero-content"><div className="home-hero-main">
    <div className="v6-hero-identity"><m.h1 initial={paused?false:{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:paused?0:.75,ease:[.22,1,.36,1]}}>R1SK<span className="hero-point">.</span></m.h1><div className="hero-rotator"><TextLoop staticText={t(L('Создаю','I build'))} rotatingTexts={subjects[lang]} interval={3400}/></div></div>
    <div className="hero-right"><p className="hero-thought">{t(L('Разработка, автоматизация, интерфейсы и монтаж. Мне нравится превращать идеи в работающие вещи.','Development, automation, interfaces and editing. I enjoy turning ideas into things that work.'))}</p><div className="home-actions"><AnimatedLink to="/projects/">{t(L('Мои проекты','My projects'))}</AnimatedLink><Link className="link-subtle" to="/about/">{t(L('Обо мне','About me'))}<ArrowUpRight size={17} aria-hidden="true"/></Link></div></div>
   </div></div>
  </section>
  <section className="shell v6-focus-section"><header className="v6-section-intro"><h2>{t(L('Чем занимаюсь','What I do'))}</h2></header><div className="v6-focus-list">{focus.map((v,i)=><Link key={i} to={v.url} className="v6-focus-row"><h3>{t(v.name)}</h3><p>{t(v.description)}</p><ArrowUpRight size={22} strokeWidth={1.4} aria-hidden="true"/></Link>)}</div></section>
  <section className="shell v6-selection-section"><header className="v6-section-intro"><h2>{t(L('Мои проекты','Selected projects'))}</h2><Link to="/projects/" className="v6-inline-link">{t(L('Все проекты','All projects'))}<ArrowRight size={18} aria-hidden="true"/></Link></header>
   <div className="v6-feature-list">{selection.map(v=><Link className="v6-feature-row" to={'/projects/'+v.slug+'/'} key={v.slug}><div><h3>{v.slug==='prime-market'?<img className="v7-prime-compact" src={import.meta.env.BASE_URL+'assets/prime-wordmark.svg'} alt="Prime Market" loading="lazy"/>:v.name}</h3><p>{t(v.desc)}</p></div><span className="v6-arrow"><ArrowUpRight size={23} strokeWidth={1.4} aria-hidden="true"/></span></Link>)}</div>
  </section>
  <section className="shell v7-roadmap-callout v8-roadmap-callout"><div><h2>{t(L('Путь и планы','How I got here'))}</h2><p>{t(L('Что дали первые запуски и куда развиваются мои проекты.','What the early launches taught me and where my projects go next.'))}</p></div><Link to="/roadmap/">{t(L('Roadmap','Explore roadmap'))}<ArrowUpRight size={22} aria-hidden="true"/></Link></section>
  <section className="shell v6-proof"><div className="v6-proof-primary"><strong>150K+</strong><p>{t(L('просмотров четырёх TikTok-роликов на двух аккаунтах','views across four TikTok posts from two accounts'))}</p></div><div className="v6-proof-secondary"><strong>3 {t(L('года','years'))}</strong><p>DaVinci Resolve</p><Link to="/media/">{t(L('Посмотреть работы','Watch my work'))}<ArrowUpRight size={17} aria-hidden="true"/></Link></div></section>
  <section className="shell v6-home-cta"><div><h2>{t(L('Есть задача или идея?','Have a project in mind?'))}</h2><p>{t(L('Напиши — обсудим.','Get in touch.'))}</p></div><AnimatedLink to="/contact/">{t(L('Связаться','Get in touch'))}</AnimatedLink></section>
 </>;
}
