import {createContext,useCallback,useContext,useEffect,useMemo,useState,type ReactNode} from 'react';
export type Lang = 'ru' | 'en';
export type Localized = {ru:string;en:string};
const Ctx=createContext<{lang:Lang;setLang:(v:Lang)=>void;t:(s:Localized)=>string}>({lang:'ru',setLang:()=>{},t:s=>s.ru});
export function LanguageProvider({children}:{children:ReactNode}){
  const [lang,setLangState]=useState<Lang>(()=>{try{const saved=localStorage.getItem('r1sk-lang');return saved==='en'?'en':'ru';}catch{return 'ru';}});
  const setLang=useCallback((value:Lang)=>{setLangState(value);try{localStorage.setItem('r1sk-lang',value)}catch{/* private browsing */}},[]);
  useEffect(()=>{document.documentElement.lang=lang;document.title=lang==='en'?'R1SK — Development, projects & media':'R1SK — проекты, разработка и медиа';},[lang]);
  const t=useCallback((s:Localized)=>s[lang],[lang]);
  const value=useMemo(()=>({lang,setLang,t}),[lang,setLang,t]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export const useLanguage=()=>useContext(Ctx);
export const L=(ru:string,en:string):Localized=>({ru,en});
