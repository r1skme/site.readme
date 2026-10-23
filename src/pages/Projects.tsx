import {Link} from 'react-router-dom';
import type {CSSProperties} from 'react';
import {projects} from '@/data/projects';
import {useLanguage,L} from '@/lib/i18n';
import {PageHeading} from '@/components/Primitives';
import {ProjectIdentity} from '@/components/ProjectIdentity';
export default function Projects(){const{t}=useLanguage();return <>
 <PageHeading title={t(L('Проекты','Projects'))} desc={t(L('Программные продукты, поиск по коду и игровой сервер.','Software products, source-code search and a game server.'))}/>
 <section className="shell v6-projects-editorial v7-project-catalog" aria-label={t(L('Мои проекты','My projects'))}><div className="v6-project-list">{projects.map(project=><Link key={project.slug} className={'v6-project-row v7-project-row v6-project-'+project.slug} to={'/projects/'+project.slug+'/'} style={{'--project-color':project.accent} as CSSProperties}><div className="v6-project-titles"><h2><ProjectIdentity name={project.name} slug={project.slug} arrow/></h2><p>{t(project.summary)}</p><div className="v7-row-facts"><span>{t(project.since)}</span><span aria-hidden="true">·</span><span>{project.stack.slice(0,3).join(' · ')}</span></div></div></Link>)}</div></section>
 </>}
