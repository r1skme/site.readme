import {useEffect,useRef} from 'react';
import {useLocation} from 'react-router-dom';
import {useMotionPreference} from '@/lib/motion';
/** Resolution-independent vector ribbon. Navigation never resets its clock. */
export default function FluidBackdrop(){
 const path=useRef<SVGPathElement>(null),reflection=useRef<SVGPathElement>(null),group=useRef<SVGGElement>(null),shine=useRef<SVGLinearGradientElement>(null);
 const clock=useRef(0),running=useRef(false),route=useRef('/'),depth=useRef(0),wakeRef=useRef<()=>void>(()=>{});
 const {active}=useMotionPreference();const {pathname}=useLocation();
 useEffect(()=>{route.current=pathname},[pathname]);
 useEffect(()=>{running.current=active;wakeRef.current()},[active]);
 useEffect(()=>{
  let raf=0,last=0,paint=0,alive=true,mobile=innerWidth<700,pointer={x:0,y:0},target={x:0,y:0},current=0;
  const curve=(points:number[][])=>{
   let d=`M${points[0][0].toFixed(2)},${points[0][1].toFixed(2)}`;
   for(let i=0;i<points.length-1;i++){
    const a=points[Math.max(0,i-1)],b=points[i],c=points[i+1],e=points[Math.min(points.length-1,i+2)];
    d+=` C${(b[0]+(c[0]-a[0])/6).toFixed(2)},${(b[1]+(c[1]-a[1])/6).toFixed(2)} ${(c[0]-(e[0]-b[0])/6).toFixed(2)},${(c[1]-(e[1]-b[1])/6).toFixed(2)} ${c[0].toFixed(2)},${c[1].toFixed(2)}`;
   }return d;
  };
  const draw=()=>{
   const t=clock.current;
   const a=Math.sin(t*.36)*38,b=Math.sin(t*.3+1)*52,c=Math.sin(t*.42+2)*39,e=Math.cos(t*.28)*48;
   const upper=[[-260,610+a],[130,460+b],[360,525+c],[550,405+a],[730,115+e],[1070,-80+b],[1690,-190+c]];
   const lower=[[-260,795+a],[125,655+b],[400,750+c],[730,570+a],[880,285+e],[1200,145+b],[1690,38+c]];
   path.current?.setAttribute('d',curve(upper)+curve([...lower].reverse()).replace(/^M/,' L')+'Z');
   reflection.current?.setAttribute('d',curve(upper));
   const targetDepth=(route.current==='/'?0:.42)+depth.current*.24;
   current+=(targetDepth-current)*.06;
   pointer.x+=(target.x-pointer.x)*.04;pointer.y+=(target.y-pointer.y)*.04;
   group.current?.setAttribute('transform',`translate(${pointer.x*12},${pointer.y*8+(mobile?100:0)+current*120})`);
   group.current?.setAttribute('opacity',String((mobile?.65:.82)-current*.45));
   shine.current?.setAttribute('gradientTransform',`translate(${Math.sin(t*.21)*.4},0)`);
  };
  function tick(now:number){
   raf=0;if(!alive)return;
   const dt=last?Math.min(now-last,75):16;last=now;
   if(running.current&&!document.hidden){clock.current+=dt/1000;if(now-paint>(mobile?1000/30:1000/60)){draw();paint=now;}raf=requestAnimationFrame(tick);}
  }
  const wake=()=>{cancelAnimationFrame(raf);last=0;draw();if(running.current&&!document.hidden)raf=requestAnimationFrame(tick)};
  wakeRef.current=wake;
  const resize=()=>{mobile=innerWidth<700;wake()};
  const scroll=()=>{depth.current=Math.min(1,scrollY/Math.max(600,innerHeight));if(!running.current)draw()};
  const move=(event:PointerEvent)=>{if(event.pointerType==='mouse'){target.x=event.clientX/innerWidth-.5;target.y=event.clientY/innerHeight-.5}};
  window.addEventListener('resize',resize,{passive:true});window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('pointermove',move,{passive:true});document.addEventListener('visibilitychange',wake);
  scroll();wake();
  return()=>{alive=false;wakeRef.current=()=>{};cancelAnimationFrame(raf);window.removeEventListener('resize',resize);window.removeEventListener('scroll',scroll);window.removeEventListener('pointermove',move);document.removeEventListener('visibilitychange',wake)};
 },[]);
 return <div className="fluid-scene" aria-hidden="true"><div className="ambient-wash"/><svg className="fluid-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="ribbon-color" x1="0" y1=".75" x2="1" y2=".12"><stop stopColor="#1eb2cb"/><stop offset=".32" stopColor="#2088ee"/><stop offset=".57" stopColor="#4157f0"/><stop offset="1" stopColor="#8210df"/></linearGradient><linearGradient id="ribbon-sheen" x1="0" y1="1" x2=".85" y2="0" ref={shine}><stop stopColor="#83e9ff" stopOpacity="0"/><stop offset=".4" stopColor="#91c9ff" stopOpacity=".04"/><stop offset=".62" stopColor="#bddeff" stopOpacity=".2"/><stop offset=".84" stopColor="#fff" stopOpacity="0"/></linearGradient><linearGradient id="ribbon-rim"><stop stopColor="#c6f3ff" stopOpacity="0"/><stop offset=".44" stopColor="#b6d6ff" stopOpacity=".36"/><stop offset="1" stopColor="#d5c4ff" stopOpacity="0"/></linearGradient><filter id="ribbon-diffusion" x="-10%" y="-20%" width="120%" height="140%" colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation="12"/></filter><path ref={path} id="ribbon-shape" d="M-260 610C150 430 360 660 550 405S730 115 1070-80L1690-190V38C1200 145 880 285 730 570S400 750 125 655L-260 795Z"/></defs><g ref={group} className="fluid-ribbon"><use href="#ribbon-shape" fill="url(#ribbon-color)" opacity=".28" filter="url(#ribbon-diffusion)" className="ribbon-diffusion"/><use href="#ribbon-shape" fill="url(#ribbon-color)"/><use href="#ribbon-shape" fill="url(#ribbon-sheen)"/><path ref={reflection} stroke="url(#ribbon-rim)" strokeWidth="1.1" fill="none"/></g></svg><div className="fluid-bottom-light"/></div>;
}
