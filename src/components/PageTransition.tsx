import type {ReactNode} from 'react';
import {m} from 'motion/react';
export default function PageTransition({children}:{children:ReactNode}){
 return <m.main id="main" tabIndex={-1} initial={{opacity:0,y:18,filter:'blur(5px)'}} animate={{opacity:1,y:0,filter:'blur(0px)'}} exit={{opacity:0,y:-20,filter:'blur(4px)'}} transition={{duration:.52,ease:[.22,1,.36,1]}} className="page-main">{children}</m.main>;
}
