import Timeline,{type JourneyStep} from '@/components/ui/timeline';
import {useLanguage,L} from '@/lib/i18n';
import {PageHeading} from '@/components/Primitives';
import {ArrowUpRight,Plus} from 'lucide-react';
import {Link} from 'react-router-dom';

const steps:JourneyStep[]=[
 {id:'editing',date:L('Около трёх лет практики','Around three years of practice'),title:L('Монтаж и визуальный язык','Editing & visual expression'),description:L('Игровые ролики для YouTube и TikTok. Учусь выстраивать ритм, работать с анимацией, цветом и звуком. Монтаж остаётся частью моей работы и рядом с программированием.','Gaming videos for YouTube and TikTok. Working with rhythm, animation, colour and sound. Editing remains part of my practice alongside programming.'),stack:['DaVinci Resolve','Keyframes','VFX'],link:'/media/'},
 {id:'glow',date:L('2025','2025'),title:L('GLOW RUST','GLOW RUST'),description:L('Первый опыт запуска игрового сервера: настройка, плагины, поддержка и продвижение. Привлечь игроков оказалось сложнее, чем наладить техническую часть.','An early game-server launch: setup, plugins, support and promotion. Attracting players proved harder than getting the technical side working.'),stack:['Rust','RCON','TikTok'],note:L('Проект на паузе. Научился лучше оценивать объём работы и не пытаться делать всё одному.','Currently paused. It taught me to judge the scope better and not try to do everything alone.'),link:'/projects/glow-rust/'},
 {id:'prime',date:L('2026','2026'),title:L('Prime Market','Prime Market'),description:L('Собственный Telegram-бот для работы с рынком игровых предметов. Фильтры, уведомления, API и хранение данных. Вместе с ботом развиваю сайт и готовлю браузерную версию.','My Telegram bot for game-item market workflows: filters, notifications, APIs and data storage. Alongside the bot, I am developing the website and preparing a browser version.'),stack:['Python','SQLite','Telegram API'],link:'/projects/prime-market/'},
 {id:'search',date:L('Октябрь 2026','October 2026'),title:L('ReSearchify','ReSearchify'),description:L('От автоматизации отдельных задач перешёл к поисковому движку. Локальный поиск по исходному коду, постоянный индекс и CLI. Проверяю скорость вместе с корректностью результатов.','Moving from individual automation tasks to a search engine. Local source-code search, a persistent index and a CLI. I test speed alongside the correctness of the results.'),stack:['C++20','CLI','Regex'],link:'/projects/researchify/'},
 {id:'now',date:L('Сейчас','Now'),title:L('Следующие версии','Next iterations'),description:L('Продолжаю Predict и Researchify Web — отдельный инструмент интернет-поиска для локальных моделей. Параллельно дорабатываю интерфейсы и возвращаюсь к тестированию собственных продуктов.','Continuing Predict and Researchify Web, a separate web-research tool for local models. In parallel, I refine interfaces and test my products.'),stack:['Predict','Researchify Web','QA']}
];
const plans=[
 {name:'Prime Market',link:'/projects/prime-market/',text:L('Браузерная версия, проверка рабочих сценариев и подготовка к публичному запуску.','The browser version, workflow validation and preparation for a public launch.')},
 {name:'ReSearchify',link:'/projects/researchify/',text:L('Более быстрый буквальный поиск, большие проекты и воспроизводимые тесты производительности.','Faster literal search, larger codebases and reproducible performance tests.')},
 {name:'Researchify Web',link:'/projects/researchify-web/',text:L('Доработка поиска и чтения источников для локальных моделей, затем публикация релиза.','Refine source search and retrieval for local models, then prepare a release.')},
 {name:'Predict',link:'/projects/predict/',text:L('Продолжение разработки, проверка функциональности и доработка интерфейса.','Continue development, test functionality and refine the interface.')}
];
export default function Roadmap(){const{t}=useLanguage();return <>
 <PageHeading label="" title={<>{t(L('Путь','Experience'))}<br/><span className="journey-title-secondary">{t(L('и планы.','& direction.'))}</span></>} desc={t(L('От монтажа и первых запусков к собственным инструментам. Что уже попробовал, над чем работаю и куда двигаюсь дальше.','From editing and early launches to my own tools. What I have tried, what I am building and where I am heading.'))}/>
 <Timeline items={steps}/>
 <section className="shell roadmap-next" id="next"><header><h2>{t(L('Ближайшие шаги','What comes next'))}</h2></header>
  <div className="roadmap-plans">{plans.map((plan,index)=><details key={plan.name} className="roadmap-plan" open={index===0}><summary><h3>{plan.name}</h3><Plus size={21} aria-hidden="true"/></summary><div className="roadmap-plan-body"><p>{t(plan.text)}</p><Link to={plan.link}>{t(L('О проекте','View project'))}<ArrowUpRight size={17} aria-hidden="true"/></Link></div></details>)}</div>
 </section>
 </>}
