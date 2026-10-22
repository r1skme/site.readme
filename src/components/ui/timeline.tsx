import {useLayoutEffect,useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {SplitText} from 'gsap/SplitText';
import {useLanguage,L,type Localized} from '@/lib/i18n';
import {useMotionPreference} from '@/lib/motion';
gsap.registerPlugin(ScrollTrigger,SplitText);
export type JourneyStep={date:Localized;title:Localized;description:Localized;stack:string[]};
export default function Timeline({items}:{items:JourneyStep[]}){
 const section=useRef<HTMLElement>(null),pin=useRef<HTMLDivElement>(null),windowRef=useRef<HTMLDivElement>(null),track=useRef<HTMLDivElement>(null);
 const heading=useRef<HTMLHeadingElement>(null),progress=useRef<HTMLDivElement>(null);
 const{t,lang}=useLanguage();const{paused}=useMotionPreference();
 useLayoutEffect(()=>{
  const root=section.current,viewport=windowRef.current,rail=track.current,holder=pin.current;
  if(!root||!viewport||!rail||!holder)return;
  const mm=gsap.matchMedia();let splits:SplitText[]=[];
  const ctx=gsap.context(()=>{
   mm.add('(min-width: 900px)',()=>{
    if(paused)return;
    const distance=()=>Math.max(0,rail.scrollWidth-viewport.clientWidth);
    const timeline=gsap.timeline({scrollTrigger:{
     trigger:root,start:'top 12%',end:()=>'+='+Math.max(800,distance()+620),
     scrub:.8,pin:holder,anticipatePin:1,invalidateOnRefresh:true
    }});
    timeline.to(rail,{x:()=>-distance(),ease:'none'},0);
    if(progress.current)timeline.fromTo(progress.current,{scaleX:0},{scaleX:1,ease:'none'},0);
    if(heading.current){
     const split=new SplitText(heading.current,{type:'lines',mask:'lines'});splits.push(split);
     gsap.from(split.lines,{yPercent:95,opacity:.4,duration:.85,stagger:.09,ease:'power3.out',
      scrollTrigger:{trigger:root,start:'top 80%',once:true}});
    }
    return()=>{timeline.scrollTrigger?.kill();timeline.kill();};
   });
   mm.add('(max-width: 899px)',()=>{
    gsap.set(rail,{clearProps:'transform'});
    if(paused)return;
    const cards=gsap.utils.toArray<HTMLElement>('.v7-journey-card',root);
    cards.forEach((card)=>{
     gsap.fromTo(card,{opacity:.7,y:18},{opacity:1,y:0,duration:.65,ease:'power2.out',
      scrollTrigger:{trigger:card,start:'top 85%',once:true}});
    });
   });
  },root);
  const refresh=()=>ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh).catch(()=>{});
  return()=>{mm.revert();splits.forEach(x=>x.revert());ctx.revert();};
 },[paused,lang]);
 return <section className="v7-journey-timeline" id="journey" ref={section}>
  <div className="v7-journey-pin" ref={pin}>
   <div className="shell v7-journey-heading">
    <div><span className="v7-overline">R1SK / ROADMAP</span>
     <h2 ref={heading}>{t(L('Как всё развивалось','How it developed'))}</h2>
    </div>
    <p>{t(L('Реальные этапы: без выдуманных запусков и дат.','Verified milestones, without invented launches or dates.'))}</p>
   </div>
   <div className="v7-journey-window" ref={windowRef}>
    <div className="v7-journey-track" ref={track}>
      {items.map((step,i)=><article key={i} className="v7-journey-card">
       <span className="v7-journey-counter">{String(i+1).padStart(2,'0')}</span>
       <div className="v7-journey-marker"/><span className="v7-journey-date">{t(step.date)}</span>
       <h3>{t(step.title)}</h3><p>{t(step.description)}</p>
       <div className="v7-journey-tags">{step.stack.map(x=><span key={x}>{x}</span>)}</div>
      </article>)}
    </div>
    <div className="v7-journey-progress"><span ref={progress}/></div>
   </div>
  </div>
 </section>;
}