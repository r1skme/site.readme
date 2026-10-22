import Timeline,{type JourneyStep} from '@/components/ui/timeline';
import {useLanguage,L} from '@/lib/i18n';
import {PageHeading} from '@/components/Primitives';
import {ArrowUpRight} from 'lucide-react';
import {Link} from 'react-router-dom';
const steps:JourneyStep[]=[
 {date:L('Около трёх лет практики','About three years'),title:L('Видеомонтаж','Video editing'),description:L('DaVinci Resolve, игровые эдиты, переходы, цвет и визуальные эффекты. Этот опыт продолжает развиваться параллельно с IT-проектами.','DaVinci Resolve, gaming edits, transitions, colour and effects. I continue practicing video alongside software projects.'),stack:['DaVinci Resolve','VFX','Short-form']},
 {date:L('2025','2025'),title:L('GLOW RUST','GLOW RUST'),description:L('Самостоятельно запустил Rust-сервер: хостинг, плагины, администрирование и продвижение. Проект приостановлен, но дал опыт работы с продуктом и аудиторией.','Launched a Rust server on my own: hosting, plugins, administration and promotion. The project is paused, but taught me product and audience lessons.'),stack:['Rust','RCON','SMM']},
 {date:L('2026','2026'),title:L('Prime Market','Prime Market'),description:L('Развиваю собственного Telegram-бота для рынка игровых предметов и веб-сайт. Главный следующий этап — браузерная версия и тестирование перед релизом.','Building a Telegram bot for game-item market tasks and a project website. Next comes a browser version and testing before release.'),stack:['Python','SQLite','Telegram API']},
 {date:L('Октябрь 2026','October 2026'),title:L('ReSearchify','ReSearchify'),description:L('Начал работу над локальным поиском по исходному коду: C++20, индексация, CLI и проверка скорости.','Started building local source-code search using C++20, indexing, CLI and performance tests.'),stack:['C++20','CLI','Search index']},
 {date:L('Сейчас','Now'),title:L('Следующие версии','Next iterations'),description:L('Продолжаю Predict и отдельный инструмент Researchify Web для поиска информации локальными ИИ-моделями. Детали незавершённых функций не публикую.','Continuing Predict and a separate Researchify Web tool for local AI web research. Unreleased feature details remain private.'),stack:['Predict','Researchify Web','QA']}
];
const next=[
 {title:L('Prime Market','Prime Market'),copy:L('Доработать браузерную версию, проверить сценарии работы и подготовить публичный запуск.','Finish the browser version, validate the workflows and prepare the first public release.')},
 {title:L('ReSearchify','ReSearchify'),copy:L('Ускорять буквальный поиск, индексировать большие проекты, проверять корректность и публиковать честные бенчмарки.','Improve literal search, handle larger codebases and publish correct, reproducible benchmarks.')},
 {title:L('Researchify Web','Researchify Web'),copy:L('Довести веб-поиск и чтение источников локальными моделями до доступного релиза.','Bring local-model web research and source retrieval to a usable public release.')},
 {title:L('Predict','Predict'),copy:L('Продолжать разработку и показывать детали только по мере готовности продукта.','Continue development and share details only when the product is ready.')}
];
export default function Roadmap(){
 const{t}=useLanguage();
 return <>
  <PageHeading label={t(L('Мой путь','My journey'))} title={t(L('От первого запуска к своим инструментам.','From first launches to my own tools.'))}
  desc={t(L('Чем занимался, к каким задачам пришёл и над чем работаю дальше. Без искусственной истории про карьеру и придуманной хронологии.','What I have built, what I learned and where I am headed, without an invented career timeline.'))}/>
  <Timeline items={steps}/>
  <section className="shell v7-future-section"><div className="v7-future-head"><h2>{t(L('Что дальше','What’s next'))}</h2><p>{t(L('Планы, а не обещания дат релиза.','Directions rather than promised release dates.'))}</p></div>
   <div className="v7-future-list">{next.map((item,i)=><article key={i}><span>{String(i+1).padStart(2,'0')}</span><div><h3>{t(item.title)}</h3><p>{t(item.copy)}</p></div></article>)}</div>
   <Link to="/projects/" className="v7-secondary-link">{t(L('Открыть проекты','View projects'))}<ArrowUpRight size={18}/></Link>
  </section>
 </>;
}
