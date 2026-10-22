import {useState,useEffect}from'react';
import {Link}from'react-router-dom';
import {ArrowUpRight,MoveUpRight}from'lucide-react';
import {projects}from '@/data/content';
import {useLanguage,L}from '@/lib/i18n';
import {Eyebrow,PageHeading}from '@/components/Primitives';
import ProjectPoster from '@/components/ProjectPoster';
export default function Projects(){
 const{t}=useLanguage();const [selected,setSelected]=useState(0);
 useEffect(()=>{const fn=(e:KeyboardEvent)=>{if(e.key==='ArrowDown')setSelected(i=>Math.min(projects.length-1,i+1));if(e.key==='ArrowUp')setSelected(i=>Math.max(0,i-1))};window.addEventListener('keydown',fn);return()=>window.removeEventListener('keydown',fn)},[]);
 const current=projects[selected];
 return <>
 <PageHeading label={t(L('01 / ИЗБРАННЫЕ ПРОЕКТЫ','01 / SELECTED PROJECTS'))} title={<>{t(L('Проекты.','Projects.'))}<br/><span className="muted-headline">{t(L('Без шаблонов.','Not templates.'))}</span></>} desc={t(L('У каждого своя задача, ограничения и логика. Здесь то, чем я занимаюсь, что развиваю и что уже успел попробовать.','Different problems, constraints and decisions. What I am building, evolving and learning from.'))}/>
 <section className="project-gallery shell"><div className="project-directory" role="list" aria-label={t(L('Выбор проекта','Choose a project'))}>
  {projects.map((project,index)=><Link key={project.slug} role="listitem" to={`/projects/${project.slug}/`} onPointerEnter={()=>setSelected(index)} onFocus={()=>setSelected(index)} className={'project-index-row '+(selected===index?'is-current':'')}>
   <span className="project-index-number">{project.number}</span><span className="project-index-name">{project.name}</span>
   <span className="project-index-description">{t(project.eyebrow)}</span>
   <MoveUpRight size={23} strokeWidth={1.4}/></Link>)}
  <div className="project-index-footer">{t(L('Выбери проект, чтобы прочитать его историю и посмотреть детали.','Select any project to explore its story and details.'))}</div>
 </div><div className="project-gallery-display"><div key={current.slug} className="display-frame"><Link to={`/projects/${current.slug}/`} aria-label={t(L('Открыть проект','Open project'))+' '+current.name}><ProjectPoster project={current} large/></Link><div className="display-footer"><div><span>{t(current.eyebrow)}</span><h3>{current.name}</h3><p>{t(current.summary)}</p></div><ArrowUpRight size={23}/></div></div></div></section>
 <section className="projects-after shell"><Eyebrow>{t(L('В ПРОЦЕССЕ','IN PROGRESS'))}</Eyebrow><div className="projects-after-inner"><h2>{t(L('Не все идеи становятся релизами.','Not every idea becomes a release.'))}</h2><p>{t(L('В портфолио оставил и ранние, и приостановленные проекты. Для меня важны не только финальные результаты, но и принятые решения, ошибки и выводы.','The portfolio includes early and paused projects as well. The decisions, mistakes and lessons matter as much as the finished results.'))}</p></div></section>
 </>;
}
