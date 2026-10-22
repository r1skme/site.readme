import {Link} from 'react-router-dom';
import {ArrowUpRight} from 'lucide-react';
import {useLanguage,L} from '@/lib/i18n';
import {PageHeading} from '@/components/Primitives';
import {skills} from '@/data/content';
const capabilities=[
 {name:L('Python','Python'),detail:L('Telegram-боты, SQLite, интеграции с API, фильтрация и уведомления.','Telegram bots, SQLite, API integrations, filters and notifications.')},
 {name:L('C++20','C++20'),detail:L('ReSearchify: архитектура поискового индекса, CLI, поиск и проверка производительности.','ReSearchify: search-index architecture, CLI, queries and performance testing.')},
 {name:L('Проектирование и QA','Product design and QA'),detail:L('Требования, сценарии, интерфейсы, поиск ошибок, баг-репорты и тестирование.','Requirements, workflows, interfaces, bug reports and testing.')},
 {name:L('Видеомонтаж','Video editing'),detail:L('DaVinci Resolve, анимация ключевых кадров, speed ramp, цвет и VFX.','DaVinci Resolve, keyframes, speed ramps, colour and VFX.')}
];
export default function Skills(){const{t}=useLanguage();return <>
 <PageHeading label={t(L('Опыт и инструменты','Experience & tools'))} title={t(L('Что я умею','What I work with'))} desc={t(L('Программирование, собственные продукты, тестирование и монтаж. Разделяю то, что уже использую, и навыки, которые развиваю.','Programming, personal products, testing and video editing. I separate practical experience from skills I am still learning.'))}/>
 <section className="shell v6-skills-core"><div className="v6-skills-header"><h2>{t(L('Практика','Hands-on experience'))}</h2><p>{t(L('Наиболее важные для меня инструменты и задачи.','The tools and responsibilities I actually use.'))}</p></div><div className="v6-capability-list">{capabilities.map((v,i)=><article key={i}><h3>{t(v.name)}</h3><p>{t(v.detail)}</p></article>)}</div></section>
 <section className="shell v6-editing-section"><div className="v6-editing-lead"><div><span className="v6-small-label">DaVinci Resolve</span><strong>3<span>{t(L('года','years'))}</span></strong></div><p>{t(L('В основном монтирую игровые эдиты для YouTube и TikTok. Работаю с темпом, переходами, цветом и эффектами.','I mainly make gaming edits for YouTube and TikTok, focusing on pacing, transitions, colour and effects.'))}</p></div>
 <div className="v6-skills-pairs"><div><h3>{t(L('Уверенно','Confident with'))}</h3>{skills.confident.map((v,i)=><p key={i}>{t(v)}</p>)}</div><div><h3>{t(L('Базовый уровень','Basic level'))}</h3>{skills.basic.map((v,i)=><p key={i}>{t(v)}</p>)}</div></div></section>
 <section className="shell v6-tools-section"><header className="v6-section-intro"><h2>{t(L('Программы','Software'))}</h2></header><div className="v6-tool-list">{[
 {icon:'resolve.svg',name:'DaVinci Resolve',detail:L('Основной видеоредактор','Main video editor')},
 {icon:'capcut.svg',name:'CapCut',detail:L('Использую как вспомогательный инструмент','Supporting editing tool')},
 {icon:'hlae.svg',name:'HLAE',detail:L('Изучаю работу с камерами и запись игровых пролётов','Learning in-game cameras and cinematic recordings')}
 ].map(v=><div className={'v6-tool-line v6-tool-'+v.name.toLowerCase().replaceAll(' ','-')} key={v.name}><div className="v6-tool-logo"><img src={import.meta.env.BASE_URL+'assets/'+v.icon} width="48" height="48" alt=""/></div><h3>{v.name}</h3><p>{t(v.detail)}</p></div>)}</div><p className="v6-learning-note">{t(L('Дополнительно изучаю моушн-дизайн, 3D-графику и саунд-дизайн.','I am also learning motion design, 3D graphics and sound design.'))}</p><Link className="v6-inline-link" to="/media/">{t(L('Смотреть видео','View media'))}<ArrowUpRight size={18}/></Link></section>
 </>};
