import {Link} from 'react-router-dom';
import {ArrowUpRight} from 'lucide-react';
import {useLanguage,L} from '@/lib/i18n';
import {PageHeading} from '@/components/Primitives';
import {skills} from '@/data/content';
const capabilities=[
 {name:L('Python','Python'),detail:L('Telegram-боты, SQLite, интеграции с API, фильтрация и уведомления.','Telegram bots, SQLite, API integrations, filters and notifications.')},
 {name:L('C++20','C++20'),detail:L('ReSearchify: архитектура поискового индекса, CLI, поиск и проверка производительности.','ReSearchify: search-index architecture, CLI, queries and performance testing.')},
 {name:L('Проектирование и QA','Product design & QA'),detail:L('Требования, сценарии, интерфейсы, поиск ошибок, баг-репорты и тестирование.','Requirements, workflows, interfaces, bug reports and testing.')},
 {name:L('Видеомонтаж','Video editing'),detail:L('DaVinci Resolve, keyframes, speed ramp, цветокоррекция и VFX.','DaVinci Resolve, keyframes, speed ramps, colour correction and VFX.')}
];
export default function Skills(){const{t}=useLanguage();return <>
 <PageHeading title={t(L('Навыки','Skills'))} desc={t(L('Инструменты и задачи, с которыми работаю в своих проектах.','The tools and tasks I work with in my projects.'))}/>
 <section className="shell v6-skills-core"><div className="v6-capability-list">{capabilities.map((item,index)=><article key={index}><h3>{t(item.name)}</h3><p>{t(item.detail)}</p></article>)}</div></section>
 <section className="shell v6-editing-section"><div className="v6-editing-lead"><div><span className="v6-small-label">DaVinci Resolve</span><strong>3<span>{t(L('года','years'))}</span></strong></div><p>{t(L('В основном монтирую игровые эдиты для YouTube и TikTok. Работаю с темпом, переходами, цветом и эффектами.','I mainly make gaming edits for YouTube and TikTok, focusing on pacing, transitions, colour and effects.'))}</p></div><div className="v6-skills-pairs"><div><h3>{t(L('Уверенно','Confident with'))}</h3>{skills.confident.map((item,index)=><p key={index}>{t(item)}</p>)}</div><div><h3>{t(L('Базовый уровень','Basic level'))}</h3>{skills.basic.map((item,index)=><p key={index}>{t(item)}</p>)}</div></div></section>
 <section className="shell v6-tools-section"><header className="v6-section-intro"><h2>{t(L('Программы','Software'))}</h2></header><div className="v6-tool-list">{[
  {icon:'resolve.svg',name:'DaVinci Resolve',detail:L('Основной видеоредактор','Main video editor')},
  {icon:'capcut.svg',name:'CapCut',detail:L('Вспомогательный инструмент','Supporting editing tool')},
  {icon:'hlae.svg',name:'HLAE',detail:L('Изучаю камеры и запись игровых пролётов','Learning in-game cameras and cinematic recordings')}
 ].map(item=><div className={'v6-tool-line v6-tool-'+item.name.toLowerCase().replaceAll(' ','-')} key={item.name}><div className="v6-tool-logo"><img src={import.meta.env.BASE_URL+'assets/'+item.icon} width="48" height="48" alt=""/></div><h3>{item.name}</h3><p>{t(item.detail)}</p></div>)}</div><p className="v6-learning-note">{t(L('Дополнительно изучаю моушн-дизайн, 3D-графику и саунд-дизайн.','I am also learning motion design, 3D graphics and sound design.'))}</p><Link className="v6-inline-link" to="/media/">{t(L('Смотреть видео','View media'))}<ArrowUpRight size={18} aria-hidden="true"/></Link></section>
 </>};
