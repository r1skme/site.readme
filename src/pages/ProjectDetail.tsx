import {Link,useParams} from 'react-router-dom';
import {ArrowUpRight,ArrowLeft} from 'lucide-react';
import type {CSSProperties} from 'react';
import {useLanguage,L} from '@/lib/i18n';
import {projects} from '@/data/projects';
import {ProjectIdentity} from '@/components/ProjectIdentity';
export default function ProjectDetail(){
 const{slug}=useParams(),{t}=useLanguage();const project=projects.find(p=>p.slug===slug);
 if(!project)return <section className="shell no-project"><h1>404</h1><Link to="/projects/">{t(L('Проекты','Projects'))}</Link></section>;
 const next=projects[(projects.indexOf(project)+1)%projects.length];
 return <>
 <section className="shell v6-case-header v7-case-header" style={{'--project-color':project.accent} as CSSProperties}>
 <Link className="v6-case-back" to="/projects/"><ArrowLeft size={17}/>{t(L('Проекты','Projects'))}</Link>
 {project.slug==='prime-market'&&<div className="v7-prime-wordmark"><img src={import.meta.env.BASE_URL+'assets/prime-wordmark.svg'} width="475" height="133" alt="PRIME"/></div>}
 <h1 className={project.slug==='prime-market'?'sr-only':undefined}><ProjectIdentity name={project.name} slug={project.slug}/></h1>
 <p className="v6-case-tagline">{t(project.tagline)}</p>
 <div className="v7-tech-intro"><p>{t(project.summary)}</p><dl className="v7-project-metadata"><div><dt>{t(L('Начало','Started'))}</dt><dd>{t(project.since)}</dd></div><div><dt>{t(L('Статус','Status'))}</dt><dd>{t(project.status==='building'?L('В разработке','In development'):L('На паузе','Paused'))}</dd></div></dl></div>
 </section>
 <section className="shell v7-technology-section"><h2>{t(L('Стек','Stack'))}</h2><ul>{project.stack.map(x=><li key={x}>{x}</li>)}</ul></section>
 <section className="shell case-feature-section"><div className="case-feature-intro"><h2>{t(project.featureTitle)}</h2></div><ul className="case-feature-list">{project.features.map((x,i)=><li key={i}>{t(x)}</li>)}</ul></section>
 <section className="shell v6-case-content v7-case-content"><div className="v6-case-story">
 <article><h2>{t(L('Идея','The idea'))}</h2><p>{t(project.challenge)}</p></article>
 <article><h2>{t(L('Реализация','Implementation'))}</h2><p>{t(project.approach)}</p></article>
 <article><h2>{t(L('Сейчас','Now'))}</h2><p>{t(project.outcome)}</p></article></div>
 {project.nextSteps.length>0&&<div className="case-next-steps"><h2>{t(L('Дальше','Next'))}</h2><ul>{project.nextSteps.map((x,i)=><li key={i}>{t(x)}</li>)}</ul></div>}
 {project.link&&<a className="v6-case-visit" href={project.link} target="_blank" rel="noopener noreferrer"><span>{t(project.linkText||L('Сайт','Website'))}</span><ArrowUpRight size={23}/></a>}
 </section>
 <section className="shell v6-case-next"><Link to={'/projects/'+next.slug+'/'}><span>{t(L('Следующий проект','Next project'))}</span><strong>{next.name}</strong><ArrowUpRight size={27}/></Link></section>
 </>;
}
