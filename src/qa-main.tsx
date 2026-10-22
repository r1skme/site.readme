import React,{Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import {MemoryRouter,Routes,Route} from 'react-router-dom';
import {LanguageProvider} from '@/lib/i18n';
import {MotionProvider} from '@/lib/motion';
import {SiteShell} from '@/components/SiteShell';
import Home from '@/pages/Home';import Projects from '@/pages/Projects';import ProjectDetail from '@/pages/ProjectDetail';import Media from '@/pages/Media';import Skills from '@/pages/Skills';import About from '@/pages/About';import Contact from '@/pages/Contact';
const qaRoute=(window as Window & {__QA_ROUTE__?:string}).__QA_ROUTE__||'/';
createRoot(document.getElementById('root')!).render(<React.StrictMode><LanguageProvider><MotionProvider><MemoryRouter initialEntries={[qaRoute]}><SiteShell><Suspense fallback={<p>Loading</p>}><Routes>
<Route path="/" element={<Home/>}/><Route path="/projects/" element={<Projects/>}/><Route path="/projects/:slug/" element={<ProjectDetail/>}/><Route path="/media/" element={<Media/>}/><Route path="/skills/" element={<Skills/>}/><Route path="/about/" element={<About/>}/><Route path="/contact/" element={<Contact/>}/>
</Routes></Suspense></SiteShell></MemoryRouter></MotionProvider></LanguageProvider></React.StrictMode>);
