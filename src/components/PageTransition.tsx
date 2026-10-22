import {useLayoutEffect,useRef,type ReactNode} from 'react';
import {m} from 'motion/react';
export default function PageTransition({children,instant=false,onEntered}:{children:ReactNode;instant?:boolean;onEntered?:()=>void}){
 const enter=useRef(onEntered);
 // Restore scrolling before the first painted frame, not during both exit and enter.
 useLayoutEffect(()=>{enter.current?.()},[]);
 return <m.main id="main" tabIndex={-1} initial={instant?false:{opacity:0,y:7}} animate={{opacity:1,y:0,transition:{duration:instant?0:.38,ease:[.22,1,.36,1]}}} exit={{opacity:0,transition:{duration:instant?0:.13,ease:'easeOut'}}} className="page-main">{children}</m.main>;
}
