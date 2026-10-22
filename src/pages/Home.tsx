import {Link} from 'react-router-dom';
import {ArrowUpRight,ArrowRight} from 'lucide-react';
import {m} from 'motion/react';
import {useLanguage,L} from '@/lib/i18n';
import {useMotionPreference} from '@/lib/motion';
import {AnimatedLink} from '@/components/Primitives';
import TextLoop from '@/components/ui/text-loop';
const subjects={ru:['инструменты','проекты','видео'],en:['tools','projects','videos']};
const focus=[
 {name:L('Программирование','Software & automation'),description:L('Python, Telegram-боты, API и автоматизация. Продумываю логику, проверяю функции и разбираюсь в причинах ошибок.','Python, Telegram bots, APIs and automation. I plan workflows, test features and investigate what breaks.'),url:'/skills/'},
 {name:L('Продукты','Products & interfaces'),description:L('Собственные инструменты: от задачи и сценариев использования до интерфейса и следующих версий.','My own tools, from the problem and user flows to the interface and subsequent iterations.'),url:'/projects/'},
 {name:L('Видеомонтаж','Video editing'),description:L('Около трёх лет в DaVinci Resolve. Эдиты, ритм, цвет, эффекты и работа со звуком.','Around three years with DaVinci Resolve. Edits, rhythm, colour, effects and sound.'),url:'/media/'}
];
const selection=[
 {slug:'prime-market',name:'Prime Market',desc:L('Автоматизация задач на рынке игровых предметов. Python, SQLite и Telegram API.','Automation for game-item market workflows. Python, SQLite and the Telegram API.')},
 {slug:'predict',name:'Predict',desc:L('Программный продукт в разработке. Логика, интерфейс и проверка функциональности.','A software product in development. Logic, interface and functionality testing.')},
 {slug:'researchify',name:'ReSearchify',desc:L('Локальный поиск по исходному коду. C++20, индексация, CLI и тесты производительности.','Local source-code search. C++20, indexing, CLI and performance tests.')}
];
export default function Home(){
 const {lang,t}=useLanguage(),{paused}=useMotionPreference();
 return <>
  <section className="home-hero shell v6-hero quiet-hero">
   <div className="home-hero-content"><div className="home-hero-main">
    <div className="v6-hero-identity"><m.h1 initial={paused?false:{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:paused?0:.8,ease:[.22,1,.36,1]}}>R1SK<span className="hero-point">.</span></m.h1><div className="hero-rotator"><TextLoop staticText={t(L('Создаю','I build'))} rotatingTexts={subjects[lang]} interval={3600}/></div></div>
    <div className="hero-right"><p className="hero-thought">{t(L('Разработка, интерфейсы и монтаж. Мне нравится превращать идеи в работающие вещи.','Development, interfaces and editing. I enjoy turning ideas into things that work.'))}</p><div className="home-actions"><AnimatedLink to="/projects/">{t(L('Мои проекты','My projects'))}</AnimatedLink><Link className="link-subtle" to="/about/">{t(L('Обо мне','About me'))}<ArrowUpRight size={17} aria-hidden="true"/></Link></div></div>
   </div></div>
  </section>
  <section className="shell v6-focus-section"><header className="v6-section-intro"><h2>{t(L('Чем занимаюсь','What I do'))}</h2></header><div className="v6-focus-list">{focus.map((item,index)=><Link key={index} to={item.url} className="v6-focus-row"><h3>{t(item.name)}</h3><p>{t(item.description)}</p><ArrowUpRight size={22} strokeWidth={1.4} aria-hidden="true"/></Link>)}</div></section>
  <section className="shell v6-selection-section"><header className="v6-section-intro"><h2>{t(L('Свои проекты','My projects'))}</h2><Link to="/projects/" className="v6-inline-link">{t(L('Все проекты','All projects'))}<ArrowRight size={19} aria-hidden="true"/></Link></header><div className="v6-feature-list">{selection.map(item=><Link className="v6-feature-row" to={'/projects/'+item.slug+'/'} key={item.slug}><div><h3>{item.slug==='prime-market'?<img className="v7-prime-compact" src={import.meta.env.BASE_URL+'assets/prime-wordmark.svg'} alt="Prime Market" loading="lazy"/>:item.name}</h3><p>{t(item.desc)}</p></div><span className="v6-arrow"><ArrowUpRight size={24} strokeWidth={1.5} aria-hidden="true"/></span></Link>)}</div></section>
  <section className="shell quiet-roadmap-link"><div><h2>{t(L('Путь и планы','Experience & direction'))}</h2><p>{t(L('Монтаж, первые запуски и собственные инструменты.','Editing, early launches and my own tools.'))}</p></div><Link to="/roadmap/" className="quiet-round-link" aria-label={t(L('Открыть Roadmap','Open roadmap'))}><ArrowUpRight size={26} aria-hidden="true"/></Link></section>
  <section className="shell v6-proof"><div className="v6-proof-primary"><strong>150K+</strong><p>{t(L('просмотров четырёх TikTok-роликов на двух аккаунтах','views across four TikTok posts from two accounts'))}</p></div><div className="v6-proof-secondary"><strong>3 {t(L('года','years'))}</strong><p>DaVinci Resolve</p><Link to="/media/">{t(L('Посмотреть работы','Watch my work'))}<ArrowUpRight size={17} aria-hidden="true"/></Link></div></section>
  <section className="shell v6-home-cta"><div><h2>{t(L('Обсудим твою задачу?','Let’s talk about your project.'))}</h2></div><AnimatedLink to="/contact/">{t(L('Связаться','Get in touch'))}</AnimatedLink></section>
 </>;
}
