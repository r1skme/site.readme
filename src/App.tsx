import{Suspense,lazy}from'react';
import{BrowserRouter,Routes,Route}from'react-router-dom';
import{LanguageProvider}from'@/lib/i18n';
import{MotionProvider}from'@/lib/motion';
import{SiteShell}from'@/components/SiteShell';
const Home=lazy(()=>import('@/pages/Home'));
const Projects=lazy(()=>import('@/pages/Projects'));
const ProjectDetail=lazy(()=>import('@/pages/ProjectDetail'));
const Media=lazy(()=>import('@/pages/Media'));
const About=lazy(()=>import('@/pages/About'));
const Skills=lazy(()=>import('@/pages/Skills'));
const Contact=lazy(()=>import('@/pages/Contact'));
function ResourceLoading(){return <div className="route-loading" role="status" aria-live="polite"><div className="loading-mark">R<span>1</span>SK</div><div className="loading-progress"><span/></div><p>LOADING</p></div>}
export default function App(){return <LanguageProvider><MotionProvider><BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/,'')}><SiteShell><Suspense fallback={<ResourceLoading/>}><Routes>
  <Route path="/" element={<Home/>}/><Route path="/projects/" element={<Projects/>}/><Route path="/projects/:slug/" element={<ProjectDetail/>}/><Route path="/about/" element={<About/>}/><Route path="/skills/" element={<Skills/>}/><Route path="/media/" element={<Media/>}/><Route path="/contact/" element={<Contact/>}/><Route path="*" element={<Home/>}/>
 </Routes></Suspense></SiteShell></BrowserRouter></MotionProvider></LanguageProvider>}
