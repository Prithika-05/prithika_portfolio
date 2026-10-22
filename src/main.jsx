import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, AudioLines, Terminal, X, Menu, ShieldCheck, Cpu, Code2, ExternalLink, Command, ChevronRight } from 'lucide-react'
import './styles.css'

const PROFILE = {
  name: 'Prithika Nattamai Malli Jaya Prakash',
  shortName: 'Prithika',
  role: 'Developer in progress. Problem solver by default.',
  location: 'Dublin, Ireland',
  email: 'your.email@example.com', // Replace with your preferred contact email
  linkedin: 'https://www.linkedin.com/in/prithika-nattamai-malli-jaya-prakash-989747316/',
  github: 'https://github.com/Prithika-05/',
  status: 'OPEN TO OPPORTUNITIES'
}

// Real projects first; the original visual concepts remain below as clearly labelled experiments.
const PROJECTS = [
  { id:'01', title:'LINKCHAT', category:'SECURITY / REAL-TIME MESSAGING', status:'PROJECT REPOSITORY', desc:'A privacy-first, zero-knowledge messaging platform designed so cryptographic operations run in the browser and message plaintext never reaches the server database. Includes application-layer DoS protection, reverse-proxy-aware client IP validation, multi-device sessions and regression tests for data-exposure risks.', stack:['React 19','Vite','Redux Toolkit','Fastify 5','Socket.IO','Redis','PostgreSQL','Drizzle ORM','Docker','Nginx','AWS EC2','Web Crypto API'], metrics:[['Privacy','Client-side cryptography'],['Resilience','Application-layer DoS controls'],['Sessions','Multi-device management'],['Quality','Data-exposure regression tests']], log:['design: keep message plaintext client-side','security: add request-abuse protections','test: guard against unauthorized data exposure'], url:'https://github.com/Prithika-05/link', repo:'https://github.com/Prithika-05/link', demo:'' },
  { id:'02', title:'SECURITY LOG ENGINE', category:'CYBERSECURITY / CLI TOOLING', status:'PROJECT REPOSITORY', desc:'A high-efficiency command-line utility for ingesting, parsing and analyzing system architecture logs. Uses SIEM-inspired processing to structure event telemetry, isolate access signals and track system state from a terminal workflow.', stack:['Python 3','CLI Argument Parsing','Object-Oriented Design','SIEM Processing','pyproject.toml'], metrics:[['Interface','Command-line utility'],['Analysis','Structured log parsing'],['Focus','Access-event signals'],['Packaging','pyproject.toml']], log:['feat: structure log ingestion and parsing','analysis: isolate access-related signals','build: configure modern Python packaging'], url:'https://github.com/Prithika-05/security-log-engine', repo:'https://github.com/Prithika-05/security-log-engine', demo:'' },
 { 
    id: '03', 
    title: 'PATREON PLUS', 
    category: 'CREATOR ECONOMY / SPA', 
    status: 'COMPLETED', 
    desc: 'A creator dashboard SPA optimizing membership retention through milestone-linked rewards and custom resilient tier transitions.', 
    stack: ['React', 'JavaScript', 'Tailwind CSS'], 
    metrics: [['UX', 'Retention UI'], ['State', 'Resilient Tiers'], ['Type', 'SPA Dashboard']], 
    log: ['feat: build dynamic membership dashboard', 'refactor: orchestrate milestone reward links', 'style: optimize mobile engagement loops'], 
    url: 'https://github.com/Prithika-05/patreonplus' 
  },
  { 
    id: '04', 
    title: 'SMART RECIPE AI', 
    category: 'INTELLIGENT AGENTS / UI', 
    status: 'STABLE', 
    desc: 'An AI-assisted recipe utility translating contextual user inputs into structural dining/ingredient templates.', 
    stack: ['React', 'JavaScript', 'CSS Modules'], 
    metrics: [['Engine', 'AI Context'], ['Layout', 'Fluid Formats'], ['Performance', 'Instant Filter']], 
    log: ['feat: engineer semantic meal parsed pipelines', 'fix: secure input sanitization fallback', 'chore: audit asset payloads'], 
    url: 'https://github.com/Prithika-05/smart-recipe-ai' 
  },
  { 
    id: '05', 
    title: 'AWS INFRASTRUCTURE TERRAFORM', 
    category: 'CLOUD / DEVSECOPS', 
    status: 'PRODUCTION', 
    desc: 'Declarative infrastructure architecture executing safe, immutable EC2 cluster provisioning and environment isolation patterns.', 
    stack: ['Terraform', 'HCL', 'AWS Cloud'], 
    metrics: [['Provider', 'AWS EC2'], ['Topology', 'Isolated VPC'], ['State', 'Declarative HCL']], 
    log: ['feat: compose root EC2 deployment blueprint', 'security: isolate public subnets via IAM roles', 'perf: verify cloud-init script timing'], 
    url: 'https://github.com/Prithika-05/AWS-Terraform' 
  }]
const NAV = [{id:'home',label:'Overview'},{id:'about',label:'About'},{id:'projects',label:'Projects'},{id:'contact',label:'Contact'}]

function GridCanvas() {
  const canvasRef = useRef(null)
  const stateRef = useRef({ripples:[], particles:[]})
  useEffect(() => {
    const canvas = canvasRef.current, ctx = canvas.getContext('2d')
    let w=0,h=0,raf=0
    const resize=()=>{ const dpr=Math.min(window.devicePixelRatio||1,2); w=window.innerWidth; h=window.innerHeight; canvas.width=w*dpr; canvas.height=h*dpr; canvas.style.width=w+'px'; canvas.style.height=h+'px'; ctx.setTransform(dpr,0,0,dpr,0,0) }
    const click=(e)=>{
      stateRef.current.ripples.push({x:e.clientX,y:e.clientY,r:0,life:1})
      for(let i=0;i<22;i++){const a=Math.random()*Math.PI*2,s=1+Math.random()*3;stateRef.current.particles.push({x:e.clientX,y:e.clientY,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1,size:1+Math.random()*2})}
      if(stateRef.current.particles.length>180) stateRef.current.particles.splice(0,stateRef.current.particles.length-180)
    }
    const draw=()=>{
      ctx.clearRect(0,0,w,h); ctx.lineWidth=1
      for(let x=0;x<w;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.strokeStyle='rgba(89,255,190,.055)';ctx.stroke()}
      for(let y=0;y<h;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.strokeStyle='rgba(89,255,190,.055)';ctx.stroke()}
      const s=stateRef.current
      s.ripples=s.ripples.filter(r=>r.life>0)
      s.ripples.forEach(r=>{r.r+=3.2;r.life-=.018;ctx.beginPath();ctx.arc(r.x,r.y,r.r,0,Math.PI*2);ctx.strokeStyle=`rgba(89,255,190,${r.life*.55})`;ctx.lineWidth=1.5;ctx.stroke();ctx.beginPath();ctx.arc(r.x,r.y,r.r*.55,0,Math.PI*2);ctx.strokeStyle=`rgba(110,231,255,${r.life*.24})`;ctx.stroke()})
      s.particles=s.particles.filter(p=>p.life>0)
      s.particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vx*=.985;p.vy*=.985;p.life-=.018;ctx.fillStyle=`rgba(89,255,190,${p.life})`;ctx.fillRect(p.x,p.y,p.size,p.size)})
      raf=requestAnimationFrame(draw)
    }
    resize(); window.addEventListener('resize',resize); window.addEventListener('pointerdown',click); draw()
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize);window.removeEventListener('pointerdown',click)}
  },[])
  return <canvas ref={canvasRef} className="grid-canvas" aria-hidden="true"/>
}

function useClickSound() {
  const [sound,setSound]=useState(false)
  const play=()=>{if(!sound)return;try{const C=window.AudioContext||window.webkitAudioContext;const c=new C();const o=c.createOscillator(),g=c.createGain();o.type='square';o.frequency.setValueAtTime(780,c.currentTime);o.frequency.exponentialRampToValueAtTime(360,c.currentTime+.035);g.gain.setValueAtTime(.035,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.055);o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+.06);o.onended=()=>c.close()}catch{}}
  return {sound,setSound,play}
}

function Sidebar({active,setActive,mobileOpen,setMobileOpen,play}) {
  return <>
    <button className="mobile-menu" onClick={()=>{setMobileOpen(!mobileOpen);play()}} aria-label="Toggle menu"><Menu size={19}/></button>
    <aside className={`sidebar glass ${mobileOpen?'sidebar-open':''}`}>
      <div className="brand"><span className="brand-mark">P<span>.</span></span><div><strong>PRITHIKA<span>.EXE</span></strong><small>PERSONAL SYSTEM / 01</small></div></div>
      <div className="side-label">NAVIGATION <span>⌘ K</span></div>
      <nav>{NAV.map((n,i)=><button key={n.id} className={`nav-link ${active===n.id?'nav-active':''}`} onClick={()=>{setActive(n.id);setMobileOpen(false);document.getElementById(n.id)?.scrollIntoView({behavior:'smooth'});play()}}><span className="nav-index">0{i+1}</span>{n.label}<ChevronRight size={14}/></button>)}</nav>
      <div className="sidebar-bottom"><div className="availability"><span className="pulse-dot"/><div><b>System online</b><small>Currently exploring</small></div></div><div className="side-social"><a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Code2 size={17}/></a><a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><ExternalLink size={17}/></a><button onClick={()=>{setActive('contact');document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});play()}} aria-label="Contact"><ArrowUpRight size={17}/></button></div><small className="copyright">© 2026 · BUILT WITH INTENT</small></div>
    </aside>
  </>
}

function TerminalBox({onCommand}) {
  const [input,setInput]=useState('')
  const [history,setHistory]=useState([{cmd:'init --portfolio',out:'Session established. Welcome to prithika.exe.'}])
  const ref=useRef(null)
  const submit=(e)=>{e.preventDefault();const cmd=input.trim().toLowerCase();if(!cmd)return;let out='Command not found. Try: help, about, projects, contact, clear';if(cmd==='help')out='Available commands: about · projects · contact · clear';if(cmd==='about') {out='Opening profile dossier…';onCommand('about')}if(cmd==='projects'){out='Loading project modules…';onCommand('projects')}if(cmd==='contact'){out='Opening communication channel…';onCommand('contact')}if(cmd==='clear'){setHistory([]);setInput('');return}setHistory(h=>[...h,{cmd,out}].slice(-5));setInput('');setTimeout(()=>ref.current?.scrollIntoView({behavior:'smooth',block:'nearest'}),30)}
  return <div className="terminal glass">
    <div className="terminal-head"><div className="window-dots"><i/><i/><i/></div><span><Terminal size={13}/> prithika@portfolio:~</span><span className="terminal-lock"><ShieldCheck size={13}/> LOCAL SESSION</span></div>
    <div className="terminal-body">{history.map((h,i)=><div className="term-line" key={i}><div><span className="prompt">➜</span> <span className="term-path">~</span> <span>{h.cmd}</span></div><p>{h.out}</p></div>)}<div ref={ref}/></div>
    <form className="terminal-input" onSubmit={submit}><span className="prompt">➜</span><input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type a command…" aria-label="Terminal command"/><button type="submit" aria-label="Run command"><ArrowUpRight size={16}/></button></form>
  </div>
}

function ProjectCard({project,index,onOpen,play}) {
 return <motion.button className="project-card glass" onClick={()=>{onOpen(project);play()}} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{delay:index*.08,duration:.45}}>
   <div className="project-top"><span className="project-id">PRJ_{project.id}</span><span className="project-status"><i/>{project.status}</span></div>
   <div className="project-glyph"><Code2 size={29}/><span className="glyph-lines">///<br/>001</span></div>
   <div className="project-info"><small>{project.category}</small><h3>{project.title}</h3><p>{project.desc}</p></div>
   <div className="project-foot"><span>OPEN DOSSIER <ArrowUpRight size={14}/></span><span className="stack-preview">{project.stack.slice(0,2).join(' / ')}</span></div>
 </motion.button>
}

function Dossier({project,onClose}) {
 useEffect(()=>{if(!project)return;const f=e=>{if(e.key==='Escape')onClose()};window.addEventListener('keydown',f);return()=>window.removeEventListener('keydown',f)},[project,onClose])
 return <AnimatePresence>{project&&<motion.div className="overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><motion.section className="dossier glass" initial={{opacity:0,y:24,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:12}} transition={{duration:.22}} role="dialog" aria-modal="true" aria-label={`${project.title} dossier`}>
   <header className="dossier-head"><div><span className="eyebrow">RESTRICTED ACCESS / PROJECT DOSSIER</span><h2>{project.title}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close dossier"><X size={19}/></button></header>
   <div className="dossier-content"><div className="dossier-copy"><p>{project.desc}</p><div className="dossier-label">TECHNICAL STACK</div><div className="chips">{project.stack.map(s=><span key={s}>{s}</span>)}</div><div className="dossier-label">KEY ATTRIBUTES</div><div className="metrics">{project.metrics.map(([k,v])=><div key={k}><small>{k}</small><strong>{v}</strong></div>)}</div><div className="dossier-actions"><a className="primary-button" href={project.repo || project.url} target="_blank" rel="noreferrer">{(project.repo || project.url) === 'https://github.com/Prithika-05/' ? 'View GitHub Profile' : 'View GitHub Repository'} <ExternalLink size={15}/></a>{project.demo ? <a className="secondary-button" href={project.demo} target="_blank" rel="noreferrer">Open Live Demo <ArrowUpRight size={15}/></a> : <small className="note">No live demo link has been provided for this project.</small>}</div></div>
   <div className="git-panel"><div className="git-title"><span><span className="pulse-dot"/> SIMULATED GIT LOG</span><span>main ↗</span></div>{project.log.map((l,i)=><div className="git-entry" key={l}><span>{['a91d2f','0c7b4a','f21e09'][i%3]}</span><p>{l}</p><small>{['2d','1d','now'][i%3]}</small></div>)}<div className="git-stream"><span className="prompt">●</span> stream connected<span className="cursor">_</span></div></div></div>
   <footer className="dossier-footer"><span>CLASSIFICATION: PUBLIC DEMO</span><span>REF: PX-{project.id}-2026</span></footer>
 </motion.section></motion.div>}</AnimatePresence>
}

function App(){
 const [active,setActive]=useState('home'),[selected,setSelected]=useState(null),[mobileOpen,setMobileOpen]=useState(false)
 const {sound,setSound,play}=useClickSound()
 const navigate=(id)=>{setActive(id);document.getElementById(id)?.scrollIntoView({behavior:'smooth'});play()}
 useEffect(()=>{const onScroll=()=>{let current='home';for(const n of NAV){const el=document.getElementById(n.id);if(el&&el.getBoundingClientRect().top<window.innerHeight*.45)current=n.id}setActive(current)};window.addEventListener('scroll',onScroll,{passive:true});return()=>window.removeEventListener('scroll',onScroll)},[])
 return <div className="app-shell"><GridCanvas/><div className="ambient ambient-one"/><div className="ambient ambient-two"/>
 <Sidebar active={active} setActive={setActive} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} play={play}/>
 <main className="main-content">
  <div className="topbar"><span><span className="pulse-dot"/> PORTFOLIO SYSTEM <span className="topbar-sep">/</span> BUILD 2026.10</span><button className={`sound-toggle ${sound?'sound-on':''}`} onClick={()=>{setSound(!sound);play()}}><AudioLines size={15}/>{sound?'SOUND ON':'SOUND OFF'}<span className="toggle-knob"/></button></div>
  <section id="home" className="hero section-anchor"><motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.6}} className="hero-content">
   <div className="eyebrow"> DIGITAL IDENTITY // 001</div><h1>Building at the<br/><span className="outline-text">edge of</span> <span className="accent-text">possibility.</span></h1>
   <p className="hero-desc">I'm <strong>{PROFILE.name}</strong> - a developer focused on thoughtful interfaces, practical problem-solving and turning ideas into working experiences.</p>
   <div className="hero-actions"><button className="primary-button" onClick={()=>navigate('projects')}>Explore projects <ArrowDownRight size={16}/></button><button className="secondary-button" onClick={()=>navigate('contact')}>Establish contact <ArrowUpRight size={15}/></button></div>
   <div className="hero-meta"><div><small>BASED IN</small><strong>{PROFILE.location}</strong></div><div><small>FOCUS</small><strong>Frontend · Creative tech</strong></div><div><small>STATUS</small><strong className="status-green"><i/> {PROFILE.status}</strong></div></div>
  </motion.div><div className="hero-visual"><div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="core-mark"><span>P</span><i/><b/></div><div className="visual-tag tag-top"><Cpu size={14}/> CREATIVE ENGINEERING</div><div className="visual-tag tag-bottom">LAT 53.3498° N <span>//</span> LONG 6.2603° W</div><div className="visual-cross cross-a">+</div><div className="visual-cross cross-b">+</div></div>
  </section>
  <section className="terminal-section"><div className="section-heading"><div><span className="eyebrow">INTERACTIVE SHELL</span><h2>Talk to the system<span className="accent-text">.</span></h2></div><span className="section-count">01 / CLI</span></div><TerminalBox onCommand={navigate}/><p className="terminal-hint"><Command size={12}/> Try <code>help</code>, <code>about</code>, <code>projects</code> or <code>contact</code></p></section>
  <section id="about" className="about-section section-anchor"><div className="section-heading"><div><span className="eyebrow">01 / PROFILE</span><h2>Curiosity is the <span className="accent-text">interface.</span></h2></div><span className="section-count">ABOUT_ME.DAT</span></div><div className="about-grid"><div className="about-intro glass"><div className="about-icon"><Cpu size={22}/></div><h3>Human perspective.<br/>Systems thinking.</h3><p>I enjoy learning how digital products work from the inside out: the structure behind the interface, the details that make interactions feel natural, and the engineering choices that keep experiences dependable.</p><p>This portfolio is a working snapshot. Add your real experience, education, certifications and strongest achievements here before publishing.</p><div className="about-signature">- {PROFILE.shortName}<span className="cursor">_</span></div></div><div className="skill-panel glass"><div className="panel-head"><span>CAPABILITY MATRIX</span><span>SYNCED</span></div>{[['Frontend engineering',['React','JavaScript','HTML / CSS']],['Interface design',['Responsive UI','Accessibility','Motion']],['Developer workflow',['Git / GitHub','Debugging','Iteration']]].map(([title,items],i)=><div className="skill-row" key={title}><div className="skill-row-head"><span>0{i+1} / {title}</span><span className="skill-state">IN PROGRESS</span></div><div className="chips">{items.map(item=><span key={item}>{item}</span>)}</div></div>)}<div className="matrix-footer"><span><i/> PROFILE DATA</span><span>EDITABLE PLACEHOLDERS</span></div></div></div></section>
  <section id="projects" className="projects-section section-anchor"><div className="section-heading"><div><span className="eyebrow">02 / SELECTED WORK</span><h2>Proof of <span className="accent-text">process.</span></h2></div><span className="section-count">{PROJECTS.length.toString().padStart(2, '0')} MODULES</span></div><div className="projects-intro"><p>Every project is a small system: a question, a set of constraints, and a better way to do something.</p><span>SELECT A MODULE TO DECLASSIFY <ArrowDownRight size={14}/></span></div><div className="project-grid">{PROJECTS.map((p,i)=><ProjectCard key={p.id} project={p} index={i} onOpen={setSelected} play={play}/>)}</div><div className="projects-disclaimer"><ShieldCheck size={15}/> LinkChat and Security Log Engine are listed from their project descriptions. The remaining entries are clearly labelled concepts or experiments.</div></section>
  <section id="contact" className="contact-section section-anchor"><div className="contact-panel glass"><div className="contact-grid-mark"/><div className="eyebrow"> 03 / OPEN CHANNEL</div><h2>Have a good problem?<br/><span className="accent-text">Let's solve it.</span></h2><p>Interested in entry-level opportunities, collaborative projects or conversations about technology and design.</p><div className="contact-actions"><a className="primary-button" href={`mailto:${PROFILE.email}`}>Send a message <ArrowUpRight size={16}/></a><a className="secondary-button" href={PROFILE.linkedin} target="_blank" rel="noreferrer"><ExternalLink size={15}/> LinkedIn</a><a className="secondary-button" href={PROFILE.github} target="_blank" rel="noreferrer"><Code2 size={15}/> GitHub</a></div><div className="contact-bottom"><span><span className="pulse-dot"/> CONNECTION OPEN</span><span>{PROFILE.location}</span></div></div></section>
  <footer className="footer"><span>PRITHIKA.EXE <span className="accent-text">© 2026</span></span><span>DESIGNED IN THE GRID <span className="footer-star">✳</span></span><button onClick={()=>{window.scrollTo({top:0,behavior:'smooth'});play()}}>BACK TO TOP ↑</button></footer>
 </main><Dossier project={selected} onClose={()=>setSelected(null)}/></div>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>)
