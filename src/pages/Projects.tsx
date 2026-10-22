import {Link} from 'react-router-dom';
import type {CSSProperties} from 'react';
import {ArrowUpRight} from 'lucide-react';
import {projects} from '@/data/content';
import {useLanguage,L} from '@/lib/i18n';
import {PageHeading} from '@/components/Primitives';
export default function Projects(){
 const{t}=useLanguage();
 return <>
  <PageHeading label={t(L('Мои проекты','My work'))} title={t(L('Проекты','Projects'))} desc={t(L('От собственной автоматизации до поискового движка и игровых инструментов. Здесь важнее сами задачи и то, какую роль я в них выполняю.','From automation to a search engine and gaming tools. The problem and my role matter more than a shiny cover.'))}/>
  <section className="shell v6-projects-editorial"><div className="v6-project-list">
   {projects.map(project=><Link key={project.slug} className={'v6-project-row v6-project-'+project.slug} to={'/projects/'+project.slug+'/'} style={{'--project-color':project.accent} as CSSProperties}>
    <div className="v6-project-titles"><h2>{project.name}</h2><p>{t(project.summary)}</p></div>
    <span className="v6-project-action" aria-hidden="true"><ArrowUpRight size={29} strokeWidth={1.4}/></span>
   </Link>)}
  </div></section>
  <section className="shell v6-projects-note"><h2>{t(L('Не только готовые релизы','Not just finished releases'))}</h2><p>{t(L('Часть проектов ещё в работе, некоторые поставлены на паузу. Я показываю их реальный статус и не придумываю успехов, которых пока нет.','Some projects are being built, others are paused. I show where they actually stand rather than claiming achievements that have not happened.'))}</p></section>
 </>;
}
