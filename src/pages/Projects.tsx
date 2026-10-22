import {Link} from 'react-router-dom';
import type {CSSProperties} from 'react';
import {ArrowUpRight} from 'lucide-react';
import {projects} from '@/data/content';
import {useLanguage,L} from '@/lib/i18n';
import {PageHeading} from '@/components/Primitives';
export default function Projects(){
 const{t}=useLanguage();const primary=projects.filter(project=>project.slug!=='researchify-web');
 return <>
  <PageHeading title={t(L('Проекты','Projects'))} desc={t(L('Автоматизация, поиск, интерфейсы и игровые инструменты. То, что создаю и продолжаю развивать.','Automation, search, interfaces and gaming tools. The things I am building and continuing to develop.'))}/>
  <section className="shell v6-projects-editorial v7-project-catalog" aria-label={t(L('Каталог проектов','Project directory'))}><div className="v6-project-list">{primary.map(project=><Link key={project.slug} className={'v6-project-row v7-project-row v6-project-'+project.slug} to={'/projects/'+project.slug+'/'} style={{'--project-color':project.accent} as CSSProperties}><div className="v6-project-titles"><h2>{project.slug==='prime-market'?<img className="v7-prime-wordmark-inline" src={import.meta.env.BASE_URL+'assets/prime-wordmark.svg'} alt="Prime Market"/>:project.name}<ArrowUpRight className="v7-inline-arrow" aria-hidden="true" size={25} strokeWidth={1.4}/></h2><p>{t(project.summary)}</p><div className="v7-row-facts"><span>{t(project.since)}</span><span aria-hidden="true">·</span><span>{project.stack.slice(0,3).join(' · ')}</span></div></div></Link>)}</div></section>
  <section className="shell v7-experiment"><div className="v7-experiment-heading"><h2>{t(L('Веб-поиск для ИИ','Web search for AI'))}</h2></div><Link to="/projects/researchify-web/" className="v7-experiment-link"><div><strong>Researchify Web</strong><p>{t(L('Отдельный инструмент поиска и чтения интернет-источников для локальных LLM.','A separate tool for finding and reading web sources with local LLMs.'))}</p></div><ArrowUpRight aria-hidden="true" size={24}/></Link></section>
  <section className="shell quiet-roadmap-link"><div><h2>{t(L('Путь и планы','Experience & direction'))}</h2></div><Link to="/roadmap/" className="quiet-round-link" aria-label={t(L('Открыть Roadmap','Open roadmap'))}><ArrowUpRight size={24} aria-hidden="true"/></Link></section>
 </>;
}
