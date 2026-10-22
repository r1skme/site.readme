import {Link} from 'react-router-dom';
import type {CSSProperties} from 'react';
import {ArrowUpRight,ArrowRight} from 'lucide-react';
import {projects} from '@/data/content';
import {useLanguage,L} from '@/lib/i18n';
import {PageHeading} from '@/components/Primitives';

export default function Projects(){
  const {t}=useLanguage();
  const primary=projects.filter(p=>p.slug!=='researchify-web');
  const web=projects.find(p=>p.slug==='researchify-web');
  return <>
    <PageHeading label={t(L('Проекты','Projects'))}
       title={t(L('Мои проекты','My projects'))}
       desc={t(L('Инструменты, сайты, поисковые системы и игровые проекты. Показываю конкретные технологии, время работы и текущий статус — без выдуманных результатов.','Tools, websites, search systems and game projects. Real technologies, timeframes and current status, with no invented achievements.'))}/>
    <section className="shell v6-projects-editorial v7-project-catalog" aria-label={t(L('Каталог проектов','Project directory'))}>
      <div className="v6-project-list">
        {primary.map(project=><Link key={project.slug} className={'v6-project-row v7-project-row v6-project-'+project.slug} to={'/projects/'+project.slug+'/'} style={{'--project-color':project.accent} as CSSProperties}>
          <div className="v6-project-titles">
            <h2>{project.slug==='prime-market'?<img className="v7-prime-wordmark-inline" src={import.meta.env.BASE_URL+'assets/prime-wordmark.svg'} alt="PRIME"/>:project.name}<ArrowUpRight className="v7-inline-arrow" aria-hidden="true" size={29} strokeWidth={1.4}/></h2>
            <p>{t(project.summary)}</p>
            <div className="v7-row-facts"><span>{t(project.since)}</span><span aria-hidden="true" className="v7-fact-sep">·</span><span>{project.stack.slice(0,3).join(' · ')}</span></div>
          </div>
        </Link>)}
      </div>
    </section>
    {web&&<section className="shell v7-experiment">
      <div className="v7-experiment-heading"><h2>{t(L('Отдельный эксперимент','Separate experiment'))}</h2><p>{t(L('Не путать с ReSearchify для поиска по коду.','Distinct from ReSearchify, the source-code search engine.'))}</p></div>
      <Link to="/projects/researchify-web/" className="v7-experiment-link"><div><strong>Researchify Web</strong><p>{t(L('Интернет-поиск и чтение источников для локальных LLM.','Internet search and source retrieval for local LLMs.'))}</p></div><ArrowUpRight aria-hidden="true" size={24}/></Link>
    </section>}
    <section className="shell v6-projects-note"><h2>{t(L('Что уже готово и что в работе','What is ready and what comes next'))}</h2>
       <div><p>{t(L('Часть проектов находится в разработке, часть приостановлена. Текущий статус и технологии указаны на отдельных страницах.','Some projects are in development and others are paused. Each case page has its current state and technology stack.'))}</p>
       <Link className="v7-secondary-link" to="/roadmap/">{t(L('Открыть дорожную карту','Explore my roadmap'))}<ArrowRight size={17}/></Link></div>
    </section>
  </>;
}