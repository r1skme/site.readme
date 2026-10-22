import type {ReactNode} from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight,ArrowRight} from 'lucide-react';
import {m} from 'motion/react';
import {GlowCard} from '@/components/ui/spotlight-card';
import {prefetchPage} from '@/lib/routes';
import {useMotionPreference} from '@/lib/motion';
export const Eyebrow=({children}:{children:ReactNode;index?:string})=><div className="eyebrow">{children}</div>;
/** Section titles carry the hierarchy; no decorative duplicate label above the title. */
export function PageHeading({title,desc,side}:{label?:string;title:ReactNode;desc?:string;side?:ReactNode}){const{paused}=useMotionPreference();return <section className="interior-heading shell"><div className="interior-heading-grid"><m.h1 initial={paused?false:{y:14,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:paused?0:.6,ease:[.22,1,.36,1]}}>{title}</m.h1>{(desc||side)&&<div className="interior-heading-side">{desc&&<p>{desc}</p>}{side}</div>}</div></section>}
export function AnimatedLink({to,children,external=false,className=''}:{to:string;children:ReactNode;external?:boolean;className?:string}){const content=<><span className="button-label">{children}</span><span className="button-icon" aria-hidden="true">{external?<ArrowUpRight size={18}/>:<ArrowRight size={18}/>}</span></>;return external?<a className={'action-button '+className} href={to} target="_blank" rel="noopener noreferrer">{content}</a>:<Link className={'action-button '+className} to={to} onPointerEnter={()=>prefetchPage(to)} onFocus={()=>prefetchPage(to)}>{content}</Link>}
export const TitleLine=({children}:{children:ReactNode})=><h2 className="title-line">{children}</h2>;
export function AccentPanel({children,color='blue',className=''}:{children:ReactNode;color?:'blue'|'purple'|'green';className?:string}){return <GlowCard glowColor={color} className={'accent-panel '+className}>{children}</GlowCard>}
