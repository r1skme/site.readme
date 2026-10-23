import {Link} from 'react-router-dom';
import {ArrowUpRight,ArrowDown} from 'lucide-react';
import Timeline,{type JourneyStep} from '@/components/ui/timeline';
import {useLanguage,L} from '@/lib/i18n';
import {PageHeading} from '@/components/Primitives';
const steps:JourneyStep[]=[
 {id:'start',date:L('2020–2021','2020–2021'),title:L('Первые эксперименты','First experiments'),description:L('Начал изучать программирование через Arduino. Позже перешёл к Python и собственным программам.','I started exploring programming through Arduino, then moved on to Python and my own programs.'),stack:['Arduino','Python'],href:'/about/',linkLabel:L('Моя история','My story')},
 {id:'editing',date:L('Около трёх лет','Around three years'),title:L('Видеомонтаж','Video editing'),description:L('Игровые эдиты для YouTube и TikTok: монтаж, keyframes, цветокоррекция и звук в DaVinci Resolve.','Gaming edits for YouTube and TikTok, combining editing, keyframes, colour and sound in DaVinci Resolve.'),stack:['DaVinci Resolve','VFX','Sound'],href:'/media/',linkLabel:L('Работы','Work')},
 {id:'glow',date:L('2025','2025'),title:L('GLOW RUST','GLOW RUST'),description:L('Запустил Rust-сервер. Настраивал плагины и хостинг, поддерживал игроков и создавал видео для продвижения.','Launched my Rust server, configuring plugins and hosting, supporting players and creating promotional videos.'),stack:['Rust','RCON','TikTok'],href:'/projects/glow-rust/'},
 {id:'prime',date:L('2026','2026'),title:L('Prime Market','Prime Market'),description:L('Развиваю Telegram-бота и инструменты автоматизации торговли игровыми предметами.','Developing a Telegram bot and tools for automating game-item trading.'),stack:['Python','SQLite','aiohttp'],href:'/projects/prime-market/'},
 {id:'predict',date:L('Июль 2026','July 2026'),title:L('Predict','Predict'),description:L('Начал изучать C++ ради проекта для Counter-Strike 2. Развиваю интерфейс и функциональные модули.','Started learning C++ for a Counter-Strike 2 project, developing its interface and feature modules.'),stack:['C++20','DirectX 11','Dear ImGui'],href:'/projects/predict/'},
 {id:'search',date:L('Октябрь 2026','October 2026'),title:L('ReSearchify','ReSearchify'),description:L('Начал создавать поисковый движок по исходному коду: индекс, CLI, несколько типов запросов и тесты производительности.','Started building a source-code search engine with an index, CLI, multiple query modes and performance tests.'),stack:['C++20','CMake','CLI'],href:'/projects/researchify/'}
];
const next=[
 {title:'Predict',href:'/projects/predict/',copy:L('Тестирование функций и доработка интерфейса.','Testing features and refining the interface.')},
 {title:'Prime Market',href:'/projects/prime-market/',copy:L('Веб-панель, регистрация и подписки перед открытым запуском.','Web dashboard, registration and subscriptions before a public launch.')},
 {title:'ReSearchify',href:'/projects/researchify/',copy:L('Буквальный поиск, оптимизация индекса и повторяемые замеры.','Literal search, indexing improvements and reproducible benchmarks.')},
 {title:'Media',href:'/media/',copy:L('Моушн-дизайн, 3D-графика и работа со звуком.','Motion design, 3D graphics and sound.')}
];
export default function Roadmap(){const{t}=useLanguage();return <div className="v8-roadmap-page">
 <PageHeading title={t(L('Мой путь','My journey'))} desc={t(L('Разработка, собственные проекты и монтаж.','Software, personal projects and editing.'))} side={<div className="v8-roadmap-jumps"><a href="#journey">{t(L('История','History'))}<ArrowDown size={16}/></a><a href="#next">{t(L('Планы','Next'))}<ArrowDown size={16}/></a></div>}/>
 <Timeline items={steps}/>
 <section className="shell v8-next-section" id="next"><header><h2>{t(L('Что дальше','What comes next'))}</h2></header><div className="v8-next-list">{next.map(item=><Link key={item.title} to={item.href}><div><h3>{item.title}</h3><p>{t(item.copy)}</p></div><ArrowUpRight size={21} strokeWidth={1.5}/></Link>)}</div></section>
 </div>}
