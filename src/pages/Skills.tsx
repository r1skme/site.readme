import{Link}from'react-router-dom';
import{ArrowUpRight}from'lucide-react';
import{useLanguage,L}from'@/lib/i18n';
import{PageHeading,Eyebrow}from'@/components/Primitives';
import{skills}from'@/data/content';
export default function Skills(){const{t}=useLanguage();return <>
 <PageHeading label={t(L('04 / ОПЫТ И ИНСТРУМЕНТЫ','04 / EXPERIENCE & TOOLS'))} title={<>{t(L('Делаю.','Things I do.'))}<br/><span className="muted-headline">{t(L('Изучаю.','Things I learn.'))}</span></>} desc={t(L('Здесь только то, с чем действительно работаю. Уверенные навыки отделены от тех, которые ещё развиваю.','Only tools and tasks I actually work with. Confident skills are separated from areas I am still learning.'))}/>
 <section className="skills-main shell"><div className="skills-leading"><span className="skills-overline">DA VINCI RESOLVE / {t(L('МОЙ ОСНОВНОЙ ВИДЕОРЕДАКТОР','PRIMARY VIDEO EDITOR'))}</span><strong>3<span>{t(L('года','years'))}</span></strong><p>{t(L('Монтирую игровые видео, работаю с динамикой, анимацией, эффектами и цветом. Предпочитаю эдиты — важны ритм и финальное впечатление.','I edit gaming videos, focusing on pacing, animation, effects and colour. Edits are my favourite format: rhythm and the final feeling matter.'))}</p></div>
 <div className="skills-columns"><div><Eyebrow>{t(L('УВЕРЕННОЕ ВЛАДЕНИЕ','CONFIDENT WITH'))}</Eyebrow>{skills.confident.map((s,i)=><div className="skill-line" key={i}><span>0{i+1}</span>{t(s)}</div>)}</div><div><Eyebrow>{t(L('БАЗОВЫЙ УРОВЕНЬ','BASIC LEVEL'))}</Eyebrow>{skills.basic.map((s,i)=><div className="skill-line" key={i}><span>0{i+1}</span>{t(s)}</div>)}</div></div></section>
 <section className="tools-section shell"><Eyebrow>{t(L('ИНСТРУМЕНТЫ','TOOLS'))}</Eyebrow><div className="tools-list">
   {[{src:'resolve.svg',name:'DaVinci Resolve',description:L('Основной видеоредактор','Primary video editor'),tag:'VIDEO'},
   {src:'capcut.svg',name:'CapCut',description:L('Вспомогательные этапы монтажа','Supporting editing tasks'),tag:'VIDEO'},
   {src:'hlae.svg',name:'HLAE',description:L('Изучаю камеры и пролёты','Learning cameras and fly-throughs'),tag:'GAME'},
   ].map(v=><div className="tool-detail" key={v.name}><img src={`${import.meta.env.BASE_URL}assets/${v.src}`} alt="" loading="lazy"/><div><h3>{v.name}</h3><p>{t(v.description)}</p></div><span>{v.tag}</span></div>)}
 </div><p className="learning-note">{t(L('Сейчас дополнительно изучаю моушн-дизайн, 3D-графику и более сложную работу со звуком.','I am currently exploring motion design, 3D graphics and more advanced sound design.'))}</p></section>
 <section className="working-section shell"><Eyebrow>{t(L('ЗА ПРЕДЕЛАМИ МОНТАЖА','BEYOND EDITING'))}</Eyebrow><div className="working-grid">
  <div><span>01 / PRODUCT</span><h3>{t(L('Проекты и автоматизация','Projects & automation'))}</h3><p>{t(L('Формулирую задачи, продумываю сценарии и проверяю, как работает готовое решение. Prime Market — основной пример такой работы.','I define tasks, design workflows and validate the result. Prime Market is my main example of this kind of work.'))}</p></div>
  <div><span>02 / TECH</span><h3>{t(L('Python, C++20, CLI','Python, C++20, CLI'))}</h3><p>{t(L('Работаю над Python-автоматизацией и проектом поискового движка на C++20. Изучаю архитектуру и тесты производительности.','I work on Python automation and a C++20 search-engine project, focusing on architecture and performance testing.'))}</p></div>
  <div><span>03 / UX</span><h3>{t(L('Интерфейсы и тестирование','Interfaces & testing'))}</h3><p>{t(L('Участвую в дизайне интерфейсов, проверяю новые версии, ищу недочёты. Также тестирую Spurdo и помогаю покупателям собственных конфигураций с настройками.','I work on UI design, test new versions and report issues. I also beta-test Spurdo and help customers configure my products.'))}</p></div>
 </div><Link to="/projects/" className="skills-bottom-link">{t(L('Посмотреть это в проектах','See this in my projects'))}<ArrowUpRight size={22}/></Link></section>
 </>}
