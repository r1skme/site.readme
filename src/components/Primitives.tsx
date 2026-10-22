import type {ReactNode} from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight,ArrowRight}from'lucide-react';
import {GlowCard}from '@/components/ui/spotlight-card';
export const Eyebrow=({children,index}:{children:ReactNode;index?:string})=><div className="eyebrow"><span className="eyebrow-marker"/>{index&&<span className="text-[#8190AE]">{index}</span>}<span>{children}</span></div>;
export function PageHeading({label,title,desc,side}:{label:string;title:ReactNode;desc?:string;side?:ReactNode}){
 return <section className="interior-heading shell"><Eyebrow>{label}</Eyebrow><div className="interior-heading-grid"><h1>{title}</h1>{(desc||side)&&<div className="interior-heading-side">{desc&&<p>{desc}</p>}{side}</div>}</div></section>;
}
export const AnimatedLink=({to,children,external=false,className=''}:{to:string;children:ReactNode;external?:boolean;className?:string})=>external?<a className={'action-button '+className} href={to} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={18}/></a>:<Link className={'action-button '+className} to={to}>{children}<ArrowRight size={18}/></Link>;
export const TitleLine=({children}:{children:ReactNode})=><h2 className="title-line">{children}</h2>;
export function AccentPanel({children,color='blue',className=''}:{children:ReactNode;color?:'blue'|'purple'|'green';className?:string}){
 return <GlowCard glowColor={color} className={'accent-panel '+className}>{children}</GlowCard>;
}
