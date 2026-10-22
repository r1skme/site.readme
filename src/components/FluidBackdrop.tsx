import {useEffect,useRef} from 'react';
import {useLocation} from 'react-router-dom';
import {useMotionPreference} from '@/lib/motion';
/** Large composited colour ribbon, not a particle field. All graphics are procedural. */
export default function FluidBackdrop(){
 const canvasRef=useRef<HTMLCanvasElement>(null);
 const {paused}=useMotionPreference();
 const path=useLocation().pathname;
 useEffect(()=>{
  const canvas=canvasRef.current, ctx=canvas?.getContext('2d',{alpha:true,desynchronized:true});
  if(!canvas||!ctx)return;
  let width=0,height=0,scale=1,raf=0,last=0,t=0,scrollWeight=0,desiredScroll=0,alive=true;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const mobile=()=>window.innerWidth<=768;
  const resize=()=>{
   const target=mobile()?Math.min(1,window.devicePixelRatio/2):Math.min(1.25,window.devicePixelRatio);
   scale=target* (mobile()?.85:.85);
   width=window.innerWidth;height=window.innerHeight;
   canvas.width=Math.max(1,Math.round(width*scale));canvas.height=Math.max(1,Math.round(height*scale));
   canvas.style.width=`${width}px`;canvas.style.height=`${height}px`;
  };
  const scroll=()=>{desiredScroll=Math.max(0,Math.min(1,scrollY/(height*.9)));};
  const point=(u:number,v:number,amp:number,offset:number):[number,number]=>[u*width,(v+Math.sin(t*.23+offset)*amp)*height];
  function draw(){
   if(!ctx)return;
   ctx.setTransform(scale,0,0,scale,0,0);ctx.clearRect(0,0,width,height);
   ctx.fillStyle='rgba(6,10,20,1)';ctx.fillRect(0,0,width,height);
   scrollWeight+=(desiredScroll-scrollWeight)*.036;
   // Soft and deliberate lighting, anchored to the moving ribbon.
   const radial=(x:number,y:number,r:number,rgb:string,opacity:number)=>{
    const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(${rgb},${opacity})`);g.addColorStop(1,`rgba(${rgb},0)`);ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);
   };
   radial(width*.27+Math.sin(t*.19)*width*.07,height*.75,width*.7,'14,106,205',.13);
   radial(width*.81+Math.sin(t*.17)*width*.05,height*.1,width*.55,'115,36,214',.14);
   const fade=1-scrollWeight*.7;
   ctx.save();ctx.globalAlpha=fade;
   const left=point(-.3,.7,.065,.3), mid1=point(.21,.58,.06,1.8),saddle=point(.41,.61,.032,.6),peak=point(.66,-.04,.09,1.2);
   const bottom1=point(.53,.51,.06,1.8),bottom2=point(.30,.93,.05,.4),bottom3=point(-.3,.93,.04,2.3);
   const ribbon=new Path2D();
   ribbon.moveTo(...left);
   ribbon.bezierCurveTo(width*.02,height*(.52+.05*Math.sin(t*.18)),width*.12,height*(.52+.06*Math.sin(t*.2+.4)),...mid1);
   ribbon.bezierCurveTo(width*.29,height*.68,width*.36,height*.75,...saddle);
   ribbon.bezierCurveTo(width*.56,height*.46,width*.51,height*.04,...peak);
   ribbon.bezierCurveTo(width*.8,height*(-.2+.03*Math.sin(t*.16)),width*.98,height*(-.16+.06*Math.sin(t*.16+1)),width*1.3,-height*.15);
   ribbon.lineTo(width*1.3,height*.35);
   ribbon.bezierCurveTo(width*.86,height*.20,width*.71,height*.23,...bottom1);
   ribbon.bezierCurveTo(width*.42,height*.77,width*.40,height*.98,...bottom2);
   ribbon.bezierCurveTo(width*.05,height*(.93+.04*Math.sin(t*.22)),width*.06,height*.92,...bottom3);
   ribbon.closePath();
   const grad=ctx.createLinearGradient(0,height*.83,width*.89,-height*.1);
   grad.addColorStop(0,'#168dbf');grad.addColorStop(.25,'#209adc');grad.addColorStop(.49,'#3269e9');grad.addColorStop(.71,'#564ce9');grad.addColorStop(.94,'#851ada');
   ctx.shadowColor='#3160fe';ctx.shadowBlur=mobile()?30:68;ctx.globalAlpha=.34*fade;ctx.fillStyle=grad;ctx.fill(ribbon);
   ctx.shadowBlur=0;ctx.globalAlpha=.72*fade;ctx.fill(ribbon);
   // Quiet internal highlight follows the upper contour without particles.
   const lineGrad=ctx.createLinearGradient(0,height,width,-height*.1);
   lineGrad.addColorStop(0,'rgba(104,224,255,0)');lineGrad.addColorStop(.45,'rgba(157,203,255,.27)');lineGrad.addColorStop(1,'rgba(187,152,255,0)');
   ctx.strokeStyle=lineGrad;ctx.lineWidth=1.25;ctx.globalAlpha=.48*fade;
   ctx.beginPath();ctx.moveTo(...left);ctx.bezierCurveTo(width*.02,height*.52,width*.12,height*.52,...mid1);ctx.bezierCurveTo(width*.29,height*.68,width*.36,height*.75,...saddle);ctx.bezierCurveTo(width*.56,height*.46,width*.51,height*.04,...peak);ctx.stroke();
   ctx.restore();
   const glaze=ctx.createLinearGradient(0,0,0,height);glaze.addColorStop(0,'rgba(4,8,17,.04)');glaze.addColorStop(.7,'rgba(4,8,17,.09)');glaze.addColorStop(1,'rgba(4,8,17,.22)');ctx.fillStyle=glaze;ctx.fillRect(0,0,width,height);
  }
  const loop=(now:number)=>{raf=0;if(!alive||document.hidden||reduced.matches||paused)return;
   const interval=mobile()?1000/30:1000/45;
   if(now-last>=interval){const dt=Math.min(60,now-last||interval);t+=dt/1000;last=now;draw();}
   raf=requestAnimationFrame(loop);
  };
  const start=()=>{cancelAnimationFrame(raf);raf=0;last=0;draw();if(!paused&&!reduced.matches&&!document.hidden)raf=requestAnimationFrame(loop);};
  const onSize=()=>{resize();start()};
  window.addEventListener('resize',onSize,{passive:true});window.addEventListener('scroll',scroll,{passive:true});
  document.addEventListener('visibilitychange',start);reduced.addEventListener('change',start);
  resize();scroll();start();
  return()=>{alive=false;cancelAnimationFrame(raf);window.removeEventListener('resize',onSize);window.removeEventListener('scroll',scroll);document.removeEventListener('visibilitychange',start);reduced.removeEventListener('change',start)};
 },[paused,path]);
 return <canvas ref={canvasRef} className="fluid-background" aria-hidden="true"/>;
}
