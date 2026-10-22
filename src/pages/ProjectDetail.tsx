import {Link,useParams} from 'react-router-dom';
import type {CSSProperties} from 'react';
import {ArrowUpRight,ArrowLeft} from 'lucide-react';
import {useLanguage,L} from '@/lib/i18n';
import {projects} from '@/data/content';
export default function ProjectDetail(){
 const{slug}=useParams(),{t}=useLanguage();
 const project=projects.find(p=>p.slug===slug);
 if(!project)return <section className="shell no-project"><h1>404</h1><Link to="/projects/">{t(L('Вернуться к проектам','Back to projects'))}</Link></section>;
 const next=projects[(projects.indexOf(project)+1)%projects.length];
 return <>
  <section className="shell v6-case-header" style={{'--project-color':project.accent} as CSSProperties}>
   <Link className="v6-case-back" to="/projects/"><ArrowLeft size={17}/>{t(L('К проектам','Projects'))}</Link>
   <h1>{project.name}</h1>
   <p className="v6-case-tagline">{t(project.tagline)}</p>
   <div className="v6-case-intro"><p>{t(project.summary)}</p><div className="v6-case-status"><span>{t(L('Состояние','Current state'))}</span><strong>{t(L(project.status==='building'?'В разработке':'Приостановлен',project.status==='building'?'In development':'Paused'))}</strong></div></div>
  </section>
  <section className="shell v6-case-content">
   <div className="v6-case-role"><h2>{t(L('Моя роль','My role'))}</h2><p>{t(project.role)}</p></div>
   <div className="v6-case-story">
    <article><h2>{t(L('Задача','The challenge'))}</h2><p>{t(project.challenge)}</p></article>
    <article><h2>{t(L('Подход','My approach'))}</h2><p>{t(project.approach)}</p></article>
    <article><h2>{t(L('Что сейчас','Current progress'))}</h2><p>{t(project.outcome)}</p></article>
   </div>
   {project.link&&<a className="v6-case-visit" href={project.link} target="_blank" rel="noopener noreferrer"><span>{t(project.linkText||L('Сайт проекта','Project website'))}</span><ArrowUpRight size={24}/></a>}
  </section>
  <section className="shell v6-case-next"><Link to={'/projects/'+next.slug+'/'}><span>{t(L('Следующий проект','Next project'))}</span><strong>{next.name}</strong><ArrowUpRight size={27}/></Link></section>
 </>;
}
