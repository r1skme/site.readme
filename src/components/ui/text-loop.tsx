import {useEffect,useState} from 'react';
import {LazyMotion,domAnimation,m,AnimatePresence,type Transition} from 'motion/react';
import {cn} from '@/lib/utils';
interface TextLoopProps {
 staticText?:string;rotatingTexts?:string[];className?:string;interval?:number;transition?:Transition;
 staticTextClassName?:string;rotatingTextClassName?:string;backgroundClassName?:string;cursorClassName?:string;
}
export default function TextLoop({staticText='Design',rotatingTexts=['Limitless','Timeless','Flawless'],className,interval=3000,transition={duration:.65,ease:'easeInOut'},staticTextClassName,rotatingTextClassName,backgroundClassName,cursorClassName}:TextLoopProps){
 const[index,setIndex]=useState(0);
 useEffect(()=>{if(rotatingTexts.length<2)return;const timer=window.setInterval(()=>setIndex(prev=>(prev+1)%rotatingTexts.length),interval);return()=>clearInterval(timer)},[rotatingTexts.length,interval]);
 return <LazyMotion features={domAnimation}><div className={cn('flex items-baseline justify-start w-fit max-w-full gap-3 tracking-tight',className)}>
 <span className={cn('whitespace-nowrap',staticTextClassName)}>{staticText}</span>
 <span className="relative flex items-center max-w-full min-w-0">
 <AnimatePresence mode="wait" initial={false}><m.span key={rotatingTexts[index%rotatingTexts.length]||''} initial={{width:0,opacity:0}} animate={{width:'auto',opacity:1}} exit={{width:0,opacity:0}} transition={transition} className="overflow-hidden whitespace-nowrap relative inline-flex max-w-full">
 <span className={cn('absolute inset-0 bg-gradient-to-r from-transparent via-violet-300/10 to-violet-500/15',backgroundClassName)}/>
 <span className={cn('relative pr-2 bg-clip-text text-transparent bg-gradient-to-r from-[#d4e9ff] via-[#88a9ff] to-[#b9a0ff]',rotatingTextClassName)}>{rotatingTexts[index%rotatingTexts.length]}</span></m.span></AnimatePresence>
 <m.span aria-hidden="true" className={cn('w-[2px] h-[.84em] bg-[#82a7ff] shrink-0 translate-y-[1px]',cursorClassName)} animate={{opacity:[1,.36]}} transition={{duration:.8,repeat:Infinity,repeatType:'reverse'}}/>
 </span></div></LazyMotion>;
}
