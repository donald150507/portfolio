import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Github, Mail, Menu, X } from 'lucide-react';

const projects = [
  { id:'01', title:'ShareScreen', kind:'Application web · Temps réel', category:'dev', description:'Une plateforme de partage d’écran collaboratif conçue pour les ateliers, les formations et les travaux pratiques.', tags:['JavaScript','WebRTC','Cloudflare'], href:'https://github.com/donald150507/sharescreen', live:'https://sharescreen.donaldzinsoud.workers.dev', theme:'blue' },
  { id:'02', title:'Revixo', kind:'EdTech · Concept produit', category:'dev', description:'Une expérience de révision interactive avec quiz, ressources pédagogiques et suivi des progrès.', tags:['EdTech','UX','Learning'], theme:'violet' },
  { id:'03', title:'Abandon scolaire', kind:'Recherche · Statistiques', category:'data', description:'Analyse des déterminants de l’abandon scolaire au Bénin à partir de données MICS.', tags:['R','Logit','ACM'], theme:'green' },
  { id:'04', title:'Reporting & automatisation', kind:'Data · Outils métier', category:'data', description:'Conception de tableaux de bord et automatisation des traitements de données opérationnelles.', tags:['Excel/VBA','Python','Power BI'], theme:'orange' }
];

const skillGroups = [
  ['Analyse & statistiques','R, Python, Stata, SPSS, économétrie'],
  ['Données & visualisation','SQL, Power BI, Excel, QGIS'],
  ['Développement web','JavaScript, React, HTML, CSS'],
  ['Automatisation & outils','VBA, Apps Script, AppSheet, GitHub']
];

export default function App() {
  const [menuOpen,setMenuOpen] = useState(false);
  const [filter,setFilter] = useState('all');
  useEffect(()=>{
    const nodes=document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { nodes.forEach(n=>n.classList.add('visible')); return; }
    const obs=new IntersectionObserver(entries=>entries.forEach(entry=>{ if(entry.isIntersecting){entry.target.classList.add('visible');obs.unobserve(entry.target);} }),{threshold:0.1});
    nodes.forEach(n=>obs.observe(n));return ()=>obs.disconnect();
  },[]);
  const links=[['À propos','#apropos'],['Projets','#projets'],['Compétences','#competences'],['Parcours','#parcours']];
  return <>
    <a className="skip" href="#accueil">Aller au contenu</a>
    <header className="header">
      <nav className="nav container" aria-label="Navigation principale">
        <a href="#accueil" className="logo" onClick={()=>setMenuOpen(false)}>DONALD<span>✳</span></a>
        <div className={'nav-links '+(menuOpen?'open':'')}>
          {links.map(([label,anchor])=><a key={anchor} href={anchor} onClick={()=>setMenuOpen(false)}>{label}</a>)}
          <a className="nav-contact" href="#contact" onClick={()=>setMenuOpen(false)}>Contact <ArrowUpRight size={16}/></a>
        </div>
        <button className="menu-toggle" onClick={()=>setMenuOpen(!menuOpen)} aria-label={menuOpen?'Fermer le menu':'Ouvrir le menu'} aria-expanded={menuOpen}>{menuOpen?<X/>:<Menu/>}</button>
      </nav>
    </header>
    <main id="accueil">
      <section className="hero">
        <div className="hero-grid" aria-hidden="true"/>
        <div className="container hero-layout">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot"/> PORTFOLIO / 2026 — DATA × DEV</div>
            <h1>La donnée<br/>rencontre <em>le code<span>✳</span></em></h1>
            <p className="hero-description">Je suis <strong>Donald Zinsou</strong>. J’explore les données, conçois des solutions numériques et transforme des problèmes complexes en expériences utiles.</p>
            <div className="hero-actions"><a href="#projets" className="button button-primary">Explorer mes projets <ArrowUpRight size={19}/></a><a href="#contact" className="button button-outline">Me contacter <ArrowRight size={19}/></a></div>
          </div>
          <div className="hero-visual" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="center-mark">D<span>✳</span></div><span className="float-tag tag-one">DATA ↗</span><span className="float-tag tag-two">CREATIVE SYSTEMS_</span></div>
        </div>
        <div className="container scroll-hint"><ArrowDown size={17}/> SCROLL TO EXPLORE <span>01 / 05</span></div>
      </section>
      <section className="section about" id="apropos"><div className="container split reveal"><div><p className="kicker">01 / À PROPOS</p><h2>Curieux par nature.<br/><span>Analytique par formation.</span></h2></div><div className="section-prose"><p>À la croisée des statistiques, de l’économie et du développement, je m’intéresse autant à la compréhension des phénomènes qu’à la création des outils qui permettent d’agir.</p><p>Mon objectif : construire des solutions fonctionnelles, accessibles et guidées par les données.</p><a className="text-link" href="#parcours">Découvrir mon parcours <ArrowUpRight size={18}/></a></div></div></section>
      <section className="section projects-section" id="projets"><div className="container"><div className="section-heading reveal"><div><p className="kicker">02 / PROJETS SÉLECTIONNÉS</p><h2>Des idées qui<br/><span>prennent forme.</span></h2></div><p>Produits numériques, analyse statistique et automatisation.</p></div>
        <div className="filters" aria-label="Filtrer les projets">{[['all','Tous les projets'],['dev','Développement'],['data','Data & statistiques']].map(([key,label])=><button key={key} onClick={()=>setFilter(key)} className={filter===key?'active':''} aria-pressed={filter===key}>{label}</button>)}</div>
        <div className="project-grid">{projects.filter(project=>filter==='all'||project.category===filter).map(project=><article className={'project-card '+project.theme} key={project.id}><div className="project-art"><span className="project-index">{project.id} / 04</span><span className="project-glyph" aria-hidden="true">{project.id==='01'?'↗':project.id==='02'?'✳':project.id==='03'?'◈':'⌘'}</span><span className="project-art-caption">DONALD / WORK</span></div><div className="project-body"><p className="project-kind">{project.kind}</p><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div><div className="project-actions">{project.href?<a href={project.href} target="_blank" rel="noopener noreferrer">Code source <ArrowUpRight size={16}/></a>:<span>Présentation du projet</span>}{project.live&&<a href={project.live} target="_blank" rel="noopener noreferrer">Voir le site <ArrowUpRight size={16}/></a>}</div></div></article>)}</div>
      </div></section>
      <section className="section expertise" id="competences"><div className="container reveal"><p className="kicker">03 / EXPERTISES</p><div className="section-heading"><h2>Deux univers.<br/><span>Une même logique.</span></h2><p>Relier méthode analytique, conception et réalisation.</p></div><div className="skills-grid">{skillGroups.map(([title,detail],index)=><div className="skill" key={title}><span>0{index+1}</span><h3>{title}</h3><p>{detail}</p><ArrowUpRight size={21}/></div>)}</div></div></section>
      <section className="section journey" id="parcours"><div className="container split reveal"><div><p className="kicker">04 / PARCOURS</p><h2>Apprendre.<br/><span>Explorer. Construire.</span></h2></div><div className="timeline"><div><span>2026 — Aujourd’hui</span><h3>Magistère Économie, Data Science et Finance</h3><p>Aix-Marseille School of Economics · Aix-en-Provence</p></div><div><span>2023 — 2025</span><h3>Licence Statistique Économique et Sectorielle</h3><p>ENEAM · Bénin</p></div></div></div></section>
      <section className="contact-section" id="contact"><div className="container contact-inner reveal"><p className="kicker">05 / CONTACT</p><h2>Une idée en tête ?<br/><em>Construisons-la.</em></h2><p>Une collaboration, un projet ou simplement une conversation autour des données et de la tech ?</p><a href="mailto:donaldzinsoud@gmail.com" className="button button-primary">Écrivez-moi <Mail size={19}/></a><div className="contact-bottom"><a href="mailto:donaldzinsoud@gmail.com">donaldzinsoud@gmail.com</a><a href="https://github.com/donald150507" target="_blank" rel="noopener noreferrer"><Github size={18}/> GitHub <ArrowUpRight size={15}/></a></div></div></section>
    </main>
    <footer><div className="container footer-inner"><a className="logo" href="#accueil">DONALD<span>✳</span></a><span>© {new Date().getFullYear()} Donald Zinsou · Conçu avec intention.</span><a href="#accueil">Retour en haut ↑</a></div></footer>
  </>;
}
