import {useEffect,useRef,useState,type CSSProperties} from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight} from 'lucide-react';
import {useLanguage,L,type Localized} from '@/lib/i18n';
import {useMotionPreference} from '@/lib/motion';

export type JourneyStep={id:string;date:Localized;title:Localized;description:Localized;stack:string[];link?:string;note?:Localized};

/** All milestones remain in document flow, including when motion is paused. */
export default function Timeline({items}:{items:JourneyStep[]}){
 const root=useRef<HTMLElement>(null),bar=useRef<HTMLSpanElement>(null);
 const points=useRef<(HTMLSpanElement|null)[]>([]),articles=useRef<(HTMLElement|null)[]>([]);
 const [active,setActive]=useState(0);
 const {t,lang}=useLanguage();const {paused}=useMotionPreference();
 useEffect(()=>{
  let frame=0,disposed=false;
  const measure=()=>{
   frame=0;if(disposed)return;
   const marks=points.current.filter((x):x is HTMLSpanElement=>Boolean(x));
   if(!marks.length)return;
   const center=window.innerHeight*.43;
   const coords=marks.map(el=>el.getBoundingClientRect().top+el.offsetHeight/2);
   let nearest=0;coords.forEach((y,i)=>{if(Math.abs(y-center)<Math.abs(coords[nearest]-center))nearest=i});
   setActive(previous=>previous===nearest?previous:nearest);
   const span=Math.max(1,coords[coords.length-1]-coords[0]);
   const progress=Math.max(0,Math.min(1,(center-coords[0])/span));
   if(bar.current)bar.current.style.transform=`scaleY(${progress})`;
  };
  const schedule=()=>{if(!frame&&!disposed)frame=requestAnimationFrame(measure)};
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});
  const observer=new ResizeObserver(schedule);if(root.current)observer.observe(root.current);
  document.fonts?.ready.then(()=>{if(!disposed)schedule()}).catch(()=>{});
  schedule();
  return()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule)};
 },[items,lang]);
 const navigate=(index:number)=>{const article=articles.current[index];if(!article)return;article.scrollIntoView({block:'center',behavior:paused?'instant':'smooth'});article.focus({preventScroll:true})};
 return <section ref={root} className="shell journey-layout" aria-label={t(L('Этапы работы','Milestones'))}>
  <aside className="journey-sidebar"><nav aria-label={t(L('Перейти к этапу','Go to milestone'))}>
   {items.map((step,index)=><button key={step.id} type="button" onClick={()=>navigate(index)} className="journey-chapter" aria-current={active===index?'step':undefined}>
    <span className="chapter-dot" aria-hidden="true"/><span><strong>{t(step.title)}</strong><small>{t(step.date)}</small></span>
   </button>)}
  </nav><Link className="journey-next-anchor" to="#next" onClick={e=>{e.preventDefault();document.getElementById('next')?.scrollIntoView({behavior:paused?'instant':'smooth',block:'start'})}}>{t(L('Ближайшие шаги','What comes next'))}<span aria-hidden="true">↓</span></Link></aside>
  <div className="journey-story"><div className="journey-spine" aria-hidden="true"><span ref={bar}/></div>
   {items.map((step,index)=><article key={step.id} id={'milestone-'+step.id} ref={el=>{articles.current[index]=el}} tabIndex={-1} className="journey-step v7-journey-card" data-active={active===index} style={{'--step-index':index} as CSSProperties}>
    <span className="journey-point" ref={el=>{points.current[index]=el}} aria-hidden="true"/>
    <div className="journey-step-date">{t(step.date)}</div>
    <h2>{step.link?<Link to={step.link}>{t(step.title)}<ArrowUpRight size={22} strokeWidth={1.5} aria-hidden="true"/></Link>:t(step.title)}</h2>
    <p>{t(step.description)}</p>
    <ul className="journey-stack" aria-label={t(L('Технологии','Technologies'))}>{step.stack.map(value=><li key={value}>{value}</li>)}</ul>
    {step.note&&<p className="journey-note">{t(step.note)}</p>}
   </article>)}
  </div>
 </section>;
}
