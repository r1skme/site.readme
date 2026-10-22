import {createContext,useContext,useEffect,useMemo,useState,type ReactNode} from 'react';

type MotionState={paused:boolean;active:boolean;systemReduced:boolean};
const MotionContext=createContext<MotionState>({paused:false,active:true,systemReduced:false});

/** Motion is enabled on every normal visit. Only an OS reduced-motion preference
 * or an inactive document suppresses work. Old manual pause values are discarded. */
export function MotionProvider({children}:{children:ReactNode}){
 const [systemReduced,setSystemReduced]=useState(()=>typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches);
 const [visible,setVisible]=useState(()=>typeof document==='undefined'||!document.hidden);
 useEffect(()=>{
   try{localStorage.removeItem('r1sk-pause')}catch{}
   const query=matchMedia('(prefers-reduced-motion: reduce)');
   const change=()=>setSystemReduced(query.matches);
   const visibility=()=>setVisible(!document.hidden);
   query.addEventListener('change',change);
   document.addEventListener('visibilitychange',visibility);
   return()=>{query.removeEventListener('change',change);document.removeEventListener('visibilitychange',visibility)};
 },[]);
 const paused=systemReduced;
 useEffect(()=>{
   document.documentElement.classList.toggle('motion-paused',paused||!visible);
   return()=>document.documentElement.classList.remove('motion-paused');
 },[paused,visible]);
 const value=useMemo(()=>({paused,active:!paused&&visible,systemReduced}),[paused,visible,systemReduced]);
 return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}
export const useMotionPreference=()=>useContext(MotionContext);
