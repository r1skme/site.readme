import {Link,useParams} from 'react-router-dom';
import {ArrowUpRight,ArrowLeft} from 'lucide-react';
import type {CSSProperties} from 'react';
import {useLanguage,L} from '@/lib/i18n';
import {projects} from '@/data/projects';
import {ProjectIdentity} from '@/components/ProjectIdentity';

export default function ProjectDetail(){
 const {slug}=useParams();const {t}=useLanguage();
 const project=projects.find(p=>p.slug===slug);
 if(!project)return <section className="shell no-project"><h1>404</h1><Link to="/projects/">{t(L('Вернуться к проектам','Back to projects'))}</Link></section>;
 const next=projects[(projects.indexOf(project)+1)%projects.length];
 return <>
  <section className="shell v6-case-header v7-case-header" style={{'--project-color':project.accent} as CSSProperties}>
   <Link className="v6-case-back" to="/projects/"><ArrowLeft size={17}/>{t(L('Все проекты','All projects'))}</Link>
   {project.slug==='prime-market'&&<div className="v7-prime-wordmark"><img src={import.meta.env.BASE_URL+'assets/prime-wordmark.svg'} width="475" height="133" alt="PRIME"/></div>}
   <h1 className={project.slug==='prime-market'?'sr-only':undefined}><ProjectIdentity name={project.name} slug={project.slug}/></h1>
   <p className="v6-case-tagline">{t(project.tagline)}</p>
   <div className="v7-tech-intro"><p>{t(project.summary)}</p>
    <dl className="v7-project-metadata">
      <div><dt>{t(L('Период работы','Timeline'))}</dt><dd>{t(project.since)}</dd></div>
      <div><dt>{t(L('Состояние','Status'))}</dt><dd>{t(L(project.status==='building'?'В разработке':'Приостановлен',project.status==='building'?'In development':'Paused'))}</dd></div>
    </dl>
   </div>
  </section>
  <section className="shell v7-technology-section">
   <h2>{t(L('Технологии и инструменты','Stack & tools'))}</h2>
   <ul>{project.stack.map(v=><li key={v}>{v}</li>)}</ul>
   {project.slug==='predict'&&<p className="v7-stack-caveat">{t(L('Указан стек интерфейсного прототипа; технические детали будущего релиза пока закрыты.','UI prototype stack is shown; unreleased product implementation details remain private.'))}</p>}
   {project.slug==='researchify-web'&&<p className="v7-stack-caveat">{t(L('Проект на раннем этапе: окончательный технический стек ещё не определён.','Early-stage project: final implementation stack is not yet confirmed.'))}</p>}
  </section>
  <section className="shell v6-case-content v7-case-content">
    <div className="v6-case-story">
      <article><h2>{t(L('Зачем создавался','The problem'))}</h2><p>{t(project.challenge)}</p></article>
      <article><h2>{t(L('Как развивается','Development'))}</h2><p>{t(project.approach)}</p></article>
      <article><h2>{t(L('Текущий результат','Current state'))}</h2><p>{t(project.outcome)}</p></article>
    </div>
    {project.link&&<a className="v6-case-visit" href={project.link} target="_blank" rel="noopener noreferrer"><span>{t(project.linkText||L('Открыть сайт','Project website'))}</span><ArrowUpRight size={24}/></a>}
  </section>
  <section className="shell v6-case-next"><Link to={'/projects/'+next.slug+'/'}><span>{t(L('Следующий проект','Next project'))}</span><strong>{next.name}</strong><ArrowUpRight size={27}/></Link></section>
 </>;
}