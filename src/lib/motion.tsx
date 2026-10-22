import {createContext,useContext,useEffect,useMemo,useState,type ReactNode} from 'react';
const Ctx=createContext<{paused:boolean;toggle:()=>void}>({paused:false,toggle:()=>{}});
export function MotionProvider({children}:{children:ReactNode}){
 const[manual,setManual]=useState(()=>{try{return localStorage.getItem('r1sk-pause')==='true'}catch{return false}});
 const[system,setSystem]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
 useEffect(()=>{const m=matchMedia('(prefers-reduced-motion: reduce)');const fn=()=>setSystem(m.matches);m.addEventListener('change',fn);return()=>m.removeEventListener('change',fn)},[]);
 const paused=manual||system;
 const value=useMemo(()=>({paused,toggle:()=>setManual(p=>{try{localStorage.setItem('r1sk-pause',String(!p))}catch{/* skip */}return !p})}),[paused]);
 return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export const useMotionPreference=()=>useContext(Ctx);
