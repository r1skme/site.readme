import {Link} from 'react-router-dom';
import {ArrowUpRight,ArrowRight} from 'lucide-react';
import {m} from 'motion/react';
import {useLanguage,L} from '@/lib/i18n';
import {useMotionPreference} from '@/lib/motion';
import {AnimatedLink} from '@/components/Primitives';
import TextLoop from '@/components/ui/text-loop';
const subjects={ru:['инструменты','проекты','видео'],en:['tools','projects','videos']};
const focus=[
 {name:L('Программирование','Software & automation'),description:L('Python, Telegram-боты, API и задачи автоматизации. Проектирую логику, проверяю функции и разбираюсь в причинах ошибок.','Python, Telegram bots, APIs and automation. I plan workflows, test features and investigate what breaks.'),url:'/skills/'},
 {name:L('Продукты','Products & interfaces'),description:L('Собственные инструменты, их устройство, сценарии использования, дизайн и доработка по результатам тестов.','My tools, their architecture, user journeys, interfaces and improvements based on testing.'),url:'/projects/'},
 {name:L('Видеомонтаж','Video editing'),description:L('Около трёх лет в DaVinci Resolve: эдиты, динамика, цвет, эффекты и работа со звуком.','Around three years with DaVinci Resolve: edits, pacing, colour, effects and sound.'),url:'/media/'}
];
const selection=[
 {slug:'prime-market',name:'Prime Market',desc:L('Автоматизация задач на рынке игровых предметов и развитие собственного продукта.','Automation for game-item market workflows and development of my own product.')},
 {slug:'predict',name:'Predict',desc:L('Сложный программный проект с собственной логикой и интерфейсом. Пока в разработке.','An ambitious software project with its own interface and logic. Still in development.')},
 {slug:'researchify',name:'ReSearchify',desc:L('Локальный поисковый движок: архитектура, индексация, тесты и производительность.','Local source-code search: architecture, indexing, testing and performance.')}
];
export default function Home(){
 const {lang,t}=useLanguage(),{paused}=useMotionPreference();
 return <>
  <section className="home-hero shell v6-hero">
   <div className="home-hero-content">
    <div className="home-hero-main">
     <div className="v6-hero-identity"><m.h1 initial={paused?false:{opacity:0,y:32}} animate={{opacity:1,y:0}} transition={{duration:paused?0:.8,ease:[.22,1,.36,1]}}>R1SK<span className="hero-point">.</span></m.h1>
      <div className="hero-rotator"><TextLoop staticText={t(L('Создаю','I build'))} rotatingTexts={subjects[lang]} interval={3200}/></div>
     </div>
     <div className="hero-right"><span className="right-rule"/><p className="hero-thought">{t(L('Разработка, автоматизация, интерфейсы и монтаж. Мне нравится превращать идеи в работающие вещи.','Development, automation, interfaces and editing. I enjoy turning ideas into things that work.'))}</p>
     <div className="home-actions"><AnimatedLink to="/projects/">{t(L('Мои проекты','My projects'))}</AnimatedLink><Link className="link-subtle" to="/about/">{t(L('Обо мне','About me'))}<ArrowUpRight size={17}/></Link></div></div>
    </div>
   </div>
   <div className="hero-lower"><span>{t(L('Личное портфолио','Personal portfolio'))}</span><Link to="/skills/">{t(L('Опыт и навыки','Experience & skills'))}<ArrowUpRight size={15}/></Link></div>
  </section>
  <section className="shell v6-focus-section">
   <header className="v6-section-intro"><h2>{t(L('Чем занимаюсь','What I do'))}</h2><p>{t(L('Не одна должность, а несколько направлений, в которых мне действительно интересно развиваться.','Not a single job title, but several fields I genuinely enjoy working in.'))}</p></header>
   <div className="v6-focus-list">{focus.map((v,i)=><Link key={i} to={v.url} className="v6-focus-row"><h3>{t(v.name)}</h3><p>{t(v.description)}</p><ArrowUpRight size={22} strokeWidth={1.4}/></Link>)}</div>
  </section>
  <section className="shell v6-selection-section">
   <header className="v6-section-intro"><h2>{t(L('Над чем работаю','Selected projects'))}</h2><Link to="/projects/" className="v6-inline-link">{t(L('Все проекты','See all projects'))}<ArrowRight size={19}/></Link></header>
   <div className="v6-feature-list">{selection.map(v=><Link className="v6-feature-row" to={'/projects/'+v.slug+'/'} key={v.slug}><div><h3>{v.slug==='prime-market'?<img className="v7-prime-compact" src={import.meta.env.BASE_URL+'assets/prime-wordmark.svg'} alt="Prime Market" loading="lazy"/>:v.name}</h3><p>{t(v.desc)}</p></div><span className="v6-arrow"><ArrowUpRight size={25} strokeWidth={1.5}/></span></Link>)}</div>
  </section>
  <section className="shell v7-roadmap-callout"><div><h2>{t(L('Мой путь','Roadmap'))}</h2><p>{t(L('Настоящие этапы работы над программами, игровыми проектами и видео — и то, что собираюсь развивать дальше.','The real milestones behind my tools, game projects and videos, plus what I want to build next.'))}</p></div><Link to="/roadmap/">{t(L('Смотреть дорожную карту','Explore roadmap'))}<ArrowUpRight size={22}/></Link></section><section className="shell v6-proof">
   <div className="v6-proof-primary"><strong>150K+</strong><p>{t(L('просмотров четырёх опубликованных TikTok-роликов на двух аккаунтах','views across four published TikTok posts from two accounts'))}</p></div>
   <div className="v6-proof-secondary"><strong>3 {t(L('года','years'))}</strong><p>DaVinci Resolve</p><Link to="/media/">{t(L('Посмотреть работы','Watch my work'))}<ArrowUpRight size={17}/></Link></div>
  </section>
  <section className="shell v6-home-cta"><div><h2>{t(L('Есть задача или идея?','Have a project in mind?'))}</h2><p>{t(L('Напиши — обсудим, чем могу быть полезен.','Get in touch and we can talk it through.'))}</p></div><AnimatedLink to="/contact/">{t(L('Связаться','Get in touch'))}</AnimatedLink></section>
 </>;
}
