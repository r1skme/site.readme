import {Link,useParams}from'react-router-dom';
import {ArrowUpRight,ArrowLeft,ChevronRight}from'lucide-react';
import {useLanguage,L}from'@/lib/i18n';
import {projects}from'@/data/content';
import ProjectPoster from'@/components/ProjectPoster';
import {Eyebrow}from'@/components/Primitives';
export default function ProjectDetail(){
 const{slug}=useParams();const{t}=useLanguage();const project=projects.find(p=>p.slug===slug);
 if(!project)return <section className="shell no-project"><h1>404</h1><Link to="/projects/">{t(L('Вернуться к проектам','Back to projects'))}</Link></section>;
 const next=projects[(projects.indexOf(project)+1)%projects.length];
 return <>
  <section className="case-hero shell"><div className="case-breadcrumb"><Link to="/projects/"><ArrowLeft size={16}/>{t(L('Все проекты','All projects'))}</Link><ChevronRight size={15}/><span>{project.name}</span></div><Eyebrow index={project.number}>{t(project.eyebrow)}</Eyebrow><div className="case-hero-grid"><div className="case-hero-title"><h1>{project.name}</h1><p>{t(project.tagline)}</p><div className="case-tags">{project.scopes.map((tag,i)=><span key={i}>{t(tag)}</span>)}</div></div><div className="case-side-info"><div><span>{t(L('СТАТУС','STATUS'))}</span><strong>{t(L(project.status==='building'?'В разработке':'Приостановлен',project.status==='building'?'In development':'Paused'))}</strong></div><div><span>{t(L('ГОД','YEAR'))}</span><strong>{project.year}</strong></div><div><span>{t(L('МОЯ РОЛЬ','MY ROLE'))}</span><strong>{t(project.role)}</strong></div></div></div></section>
  <section className="case-visual shell"><ProjectPoster project={project} large/></section>
  <section className="case-body shell"><div className="case-introduction"><span className="case-section-label">01 / {t(L('КОНТЕКСТ','CONTEXT'))}</span><p>{t(project.summary)}</p></div><div className="case-story">
   <article><span>02 / {t(L('ЗАДАЧА','THE PROBLEM'))}</span><h2>{t(L('С чего всё началось','Where it began'))}</h2><p>{t(project.challenge)}</p></article>
   <article><span>03 / {t(L('ПОДХОД','THE APPROACH'))}</span><h2>{t(L('Как я работал','My approach'))}</h2><p>{t(project.approach)}</p></article>
   <article><span>04 / {t(L('СЕЙЧАС','CURRENT STATE'))}</span><h2>{t(L('Где проект сейчас','Where it stands'))}</h2><p>{t(project.outcome)}</p></article>
  </div>{project.link&&<a className="case-public-link" href={project.link} target="_blank" rel="noopener noreferrer"><span>{t(project.linkText||L('Открыть сайт','Open website'))}</span><ArrowUpRight size={24}/></a>}</section>
  <section className="next-project shell"><span>{t(L('СЛЕДУЮЩИЙ ПРОЕКТ','NEXT PROJECT'))}</span><Link to={`/projects/${next.slug}/`}><strong>{next.name}</strong><ArrowUpRight size={37}/></Link></section>
 </>;
}
