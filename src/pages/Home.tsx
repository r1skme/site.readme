import {Link} from 'react-router-dom';
import {ArrowUpRight,ChevronsDown,Code2,Clapperboard,LayoutTemplate} from 'lucide-react';
import {m} from 'motion/react';
import {useLanguage,L} from '@/lib/i18n';
import {Eyebrow,AnimatedLink} from '@/components/Primitives';
import TextLoop from '@/components/ui/text-loop';
import BoldStats from '@/components/ui/stats-bold';
import {GlowCard} from '@/components/ui/spotlight-card';
import {projects} from '@/data/content';
import ProjectPoster from '@/components/ProjectPoster';
const loops={ru:['проекты','инструменты','видео'],en:['projects','tools','videos']};
export default function Home(){
 const{lang,t}=useLanguage();
 return <>
  <section className="home-hero shell">
   <div className="home-hero-content">
    <div className="hero-overline"><span className="pulse-point"/> {t(L('Личное портфолио / 2026','Personal portfolio / 2026'))}</div>
    <div className="home-hero-main"><div><m.h1 initial={{opacity:0,y:34}} animate={{opacity:1,y:0}} transition={{duration:.9,ease:[.16,1,.3,1]}}>R1SK<span className="hero-point">.</span></m.h1>
     <div className="hero-rotator"><TextLoop staticText={t(L('Создаю','I build'))} rotatingTexts={loops[lang]} interval={3100} staticTextClassName="text-[#e7eefb]" /></div>
    </div><div className="hero-right"><span className="right-rule"/><p className="hero-thought">{t(L('Соединяю технические идеи, визуальный подход и желание делать продукты по-своему.','I bring technical ideas, visual thinking and a hands-on approach together to build things my way.'))}</p><p className="hero-small">{t(L('Разработка · автоматизация · медиа · интерфейсы','Development · automation · media · interfaces'))}</p><div className="home-actions"><AnimatedLink to="/projects/">{t(L('Смотреть проекты','Explore projects'))}</AnimatedLink><Link className="link-subtle" to="/about/">{t(L('Кто я','About me'))} <ArrowUpRight size={16}/></Link></div></div></div>
   </div>
   <div className="hero-lower"><span>SCROLL TO EXPLORE</span><ChevronsDown size={18}/><span>EST. 2017—2026</span></div>
  </section>
  <section className="home-intro shell"><div className="section-eyebrow">01 / {t(L('НАПРАВЛЕНИЯ','DISCIPLINES'))}</div><h2>{t(L('Не ограничиваюсь одной ролью.','I don’t fit into one label.'))}</h2><div className="disciplines-grid">
   {[{icon:Code2,n:'01',title:L('Разработка','Development'),text:L('От требований и архитектуры до проверки работающих инструментов.','From requirements and architecture to verifying working tools.')},
     {icon:LayoutTemplate,n:'02',title:L('Продукты и интерфейсы','Products & interfaces'),text:L('Думаю о том, как устроена логика и как человеку будет пользоваться результатом.','I think about how things work and how people will use them.')},
     {icon:Clapperboard,n:'03',title:L('Медиа','Media'),text:L('Монтаж, визуальная подача, ритм и истории из игровых моментов.','Editing, visual rhythm and stories built from gaming moments.')}].map(({icon:Icon,n,title,text})=><Link to={n==='03'?'/media/':n==='02'?'/projects/':'/skills/'} key={n} className="discipline"><div className="discipline-top"><span>{n}</span><Icon size={22} strokeWidth={1.4}/></div><h3>{t(title)}</h3><p>{t(text)}</p><ArrowUpRight className="discipline-arrow" size={18}/></Link>)}
  </div></section>
  <section className="featured shell"><div className="section-head-inline"><div><Eyebrow index="02">{t(L('ВЫБРАННЫЕ РАБОТЫ','SELECTED WORK'))}</Eyebrow><h2>{t(L('Реальные идеи.','Real ideas.'))}<br/><span>{t(L('Свои решения.','Built with intent.'))}</span></h2></div><Link to="/projects/" className="link-subtle">{t(L('Все проекты','All projects'))}<ArrowUpRight size={17}/></Link></div>
   <div className="featured-grid"><Link className="feature-link feature-primary" to="/projects/prime-market/"><GlowCard glowColor="green" className="feature-card"><ProjectPoster project={projects[0]}/><div className="feature-info"><span>01 / {t(L('АВТОМАТИЗАЦИЯ','AUTOMATION'))}</span><h3>Prime Market</h3><p>{t(L('Инструмент, который я продолжаю развивать для собственных задач.','A product I continue to improve for my own workflows.'))}</p><span className="feature-go">{t(L('Подробнее','View case'))}<ArrowUpRight size={19}/></span></div></GlowCard></Link>
    <div className="featured-side"><Link className="feature-link" to="/projects/predict/"><GlowCard glowColor="purple" className="feature-small-card"><ProjectPoster project={projects[1]}/><div><span>02 / CS2</span><strong>Predict</strong><p>{t(L('Модификация в разработке','Modification in development'))}</p></div><ArrowUpRight size={20}/></GlowCard></Link>
    <Link className="feature-link" to="/projects/researchify/"><GlowCard glowColor="blue" className="feature-small-card"><ProjectPoster project={projects[2]}/><div><span>03 / C++20</span><strong>ReSearchify</strong><p>{t(L('Поиск по исходному коду','Source code search'))}</p></div><ArrowUpRight size={20}/></GlowCard></Link></div>
   </div>
  </section>
  <section className="home-stats shell"><BoldStats stats={[{value:'150K+',label:t(L('просмотров игровых роликов','views across gaming posts')),note:t(L('Четыре подтверждённые публикации на двух TikTok-аккаунтах.','Four verified posts across two TikTok accounts.'))},{value:'3',label:t(L('года DaVinci Resolve','years with DaVinci Resolve'))},{value:'03',label:t(L('направления работы','areas of work'))}]} illustration={<div className="stats-art"><span>MEDIA<br/>× CODE</span><div className="stats-circle"/><div className="stats-line"/></div>}/></section>
  <section className="home-endcap shell"><div><Eyebrow>{t(L('СВЯЗЬ','CONTACT'))}</Eyebrow><h2>{t(L('Есть идея, которую стоит обсудить?','Have something worth discussing?'))}</h2></div><AnimatedLink to="/contact/">{t(L('Связаться','Get in touch'))}</AnimatedLink></section>
 </>;
}
