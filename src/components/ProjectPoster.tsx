import {m} from 'motion/react';
import type {Project} from '@/data/content';
import {useLanguage,L} from '@/lib/i18n';
export default function ProjectPoster({project,large=false}:{project:Project;large?:boolean}){
 const{t}=useLanguage();
 return <div className={`project-poster poster-${project.slug} ${large?'is-large':''}`} aria-label={t(project.eyebrow)}>
  <div className="poster-grain" aria-hidden="true"/>
  <div className="poster-border"/>
  <div className="poster-topline"><span>R1SK / {project.number}</span><span>{project.year}</span></div>
  {project.slug==='prime-market'&&<div className="poster-prime">
   <div className="prime-symbol"><span>P</span><span className="prime-cross">/</span></div>
   <m.svg viewBox="0 0 600 350" preserveAspectRatio="none" aria-hidden="true" className="prime-trails"><m.path d="M-50 250C170 130 240 280 370 120S520 105 650 45" fill="none" stroke="rgba(138,240,191,.5)" strokeWidth="1.2" initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:2.5,ease:'easeInOut'}}/><path d="M-50 280C170 160 260 310 390 150S550 130 670 65" stroke="rgba(138,240,191,.2)" fill="none" strokeWidth="1"/></m.svg>
   <span className="poster-prime-text">PRIME MARKET</span></div>}
  {project.slug==='predict'&&<div className="poster-predict"><div className="predict-aura"/><m.div className="predict-hex" animate={{rotate:[-5,5,-5]}} transition={{duration:12,ease:'easeInOut',repeat:Infinity}}><span>P.</span></m.div><span className="poster-predict-tag">COUNTER-STRIKE / MODIFICATION</span></div>}
  {project.slug==='researchify'&&<div className="poster-search"><div className="search-grid"/><div className="search-query"><span className="search-caret">&gt;</span> rs <span className="search-cursor">_</span></div><div className="search-lines"><b/><b/><b/><b/></div></div>}
  {project.slug==='researchify-web'&&<div className="poster-web"><div className="web-orbit orbit-a"/><div className="web-orbit orbit-b"/><div className="web-orbit orbit-c"/><span>www<span className="web-pulse">.</span></span></div>}
  {project.slug==='glow-rust'&&<div className="poster-glow"><img src={`${import.meta.env.BASE_URL}media/glow-16k.webp`} alt="GLOW RUST — фрагмент собственного TikTok"/><div className="glow-wordmark">GLOW<span>RUST</span></div></div>}
  {project.slug==='exchange'&&<div className="poster-exchange"><span>EX</span><span className="exchange-line"/><span>CHANGE</span></div>}
  <div className="poster-bottomline"><span>{t(project.eyebrow)}</span><span>↗</span></div>
 </div>;
}
