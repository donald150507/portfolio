// Navigation entre catalogue et fiches détaillées.
// Les contenus viennent uniquement du fichier local projects-data.js.
(() => {
  const projects = Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];
  const page = document.body.dataset.page;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, chr => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[chr]));

  const linkFor = (p) => 'projet.html?id=' + encodeURIComponent(p.id);
  const tagHTML = (tags) => tags.map(t => '<span>' + escapeHTML(t) + '</span>').join('');
  const visualHTML = (p) => {
    const label = escapeHTML(p.categoryLabel);
    const id = escapeHTML(p.id);
    if (p.id === 'sharescreen') return `
      <div class="catalog-art catalog-art--share">
        <div class="catalog-art__top"><span>SHARESCREEN</span><span>● SESSION ACTIVE</span></div>
        <div class="catalog-art__screen">
          <span class="catalog-art__toolbar"></span><span class="catalog-art__wave"></span>
          <span class="catalog-art__panels"><i></i><i></i><i></i></span>
        </div>
        <span class="catalog-art__caption">Illustration conceptuelle · ${label}</span>
      </div>`;
    if (p.id === 'decrochage-scolaire') return `
      <div class="catalog-art catalog-art--school">
        <span class="catalog-art__kind">${label}</span>
        <div class="catalog-art__big">11,5<span>%</span></div>
        <div class="catalog-art__bars"><i></i><i></i><i></i><i></i><i></i><i></i></div>
        <span class="catalog-art__caption">Indicateur observé · Visuel stylisé</span>
      </div>`;
    if (p.id === 'reporting-automatise') return `
      <div class="catalog-art catalog-art--report">
        <span class="catalog-art__kind">${label}</span>
        <div class="catalog-art__process"><span>EXTRAIRE</span><b>→</b><span>TRAITER</span><b>→</b><span>RESTITUER</span></div>
        <span class="catalog-art__caption">Schéma de démarche · Sans données internes</span>
      </div>`;
    if (p.id === 'revixo') return `
      <div class="catalog-art catalog-art--revixo">
        <span class="catalog-art__kind">${label}</span>
        <div class="catalog-art__letter">R<span>.</span></div>
        <div class="catalog-art__quiz"><i></i><i></i><i></i></div>
        <span class="catalog-art__caption">Illustration du concept, non capture</span>
      </div>`;
    return `<div class="catalog-art catalog-art--agri" data-id="${id}">
      <span class="catalog-art__kind">${label}</span>
      <div class="catalog-art__growth"><i></i><i></i><i></i><i></i><i></i></div>
      <span class="catalog-art__caption">Illustration conceptuelle, non capture</span>
    </div>`;
  };

  const projectCard = (p) => `
    <article class="catalog-card" data-category="${escapeHTML(p.category)}">
      <a class="catalog-card__link" href="${linkFor(p)}" aria-label="Découvrir le projet ${escapeHTML(p.title)}">
        ${visualHTML(p)}
        <div class="catalog-card__content">
          <div class="catalog-card__meta"><span>${escapeHTML(p.number)} / ${escapeHTML(p.categoryLabel)}</span><span>${escapeHTML(p.status)}</span></div>
          <h2>${escapeHTML(p.title)}<span>.</span></h2>
          <p>${escapeHTML(p.teaser)}</p>
          <div class="catalog-card__foot"><span>Voir la fiche complète</span><strong aria-hidden="true">↗</strong></div>
        </div>
      </a>
    </article>`;

  if (page === 'listing') {
    const grid = document.getElementById('projects-all-grid');
    const counter = document.getElementById('projects-count');
    const total = document.getElementById('projects-total');
    const controls = Array.from(document.querySelectorAll('.project-filter'));
    if (grid) {
      if (total) total.textContent = String(projects.length).padStart(2, '0');
      function render(filter) {
        const visible = projects.filter(p => filter === 'all' || p.category === filter);
        grid.innerHTML = visible.map(projectCard).join('');
        if (counter) counter.textContent = visible.length + ' projet' + (visible.length > 1 ? 's' : '');
        controls.forEach(button => {
          const active = button.dataset.filter === filter;
          button.classList.toggle('is-active', active);
          button.setAttribute('aria-pressed', String(active));
        });
        if (!reducedMotion && window.gsap) {
          window.gsap.fromTo(grid.children, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .55, stagger: .07, ease: 'power2.out' });
        }
      }
      controls.forEach(button => button.addEventListener('click', () => render(button.dataset.filter || 'all')));
      render('all');
    }
  }

  if (page === 'detail') {
    const root = document.getElementById('project-detail-root');
    if (!root) return;
    const id = new URLSearchParams(window.location.search).get('id') || '';
    const project = projects.find(p => p.id === id);
    if (!project) {
      document.title = 'Projet introuvable | ZINSOU Donald Dègnon';
      root.innerHTML = '<div class="detail-notfound"><p class="section-kicker">PROJET NON TROUVÉ</p><h1>Cette fiche n’existe pas.</h1><p>Le lien est peut-être incorrect.</p><a href="projets.html">← Retour à tous les projets</a></div>';
      return;
    }
    document.title = project.title + ' | ZINSOU Donald Dègnon';
    const index = projects.findIndex(p => p.id === id);
    const next = projects[(index + 1) % projects.length];
    const linkList = project.links.length
      ? '<div class="detail-resource-links">' + project.links.map(link => {
          // Seuls les liens explicites et publics du fichier de données sont proposés.
          if (!/^https:\/\//.test(link.url)) return '';
          return '<a href="' + escapeHTML(link.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHTML(link.label) + ' ↗</a>';
        }).join('') + '</div>'
      : '';
    const methodHTML = project.methodology.map((item, i) =>
      '<li><span>' + String(i + 1).padStart(2, '0') + '</span><div><h3>' + escapeHTML(item[0]) + '</h3><p>' + escapeHTML(item[1]) + '</p></div></li>').join('');
    const resultHTML = project.results.map((r, i) =>
      '<li><span>' + String(i + 1).padStart(2, '0') + '</span><p>' + escapeHTML(r) + '</p></li>').join('');
    const galleryHTML = project.images.length
      ? project.images.map(image => '<figure><img loading="lazy" src="' + escapeHTML(image.src) + '" alt="' + escapeHTML(image.alt) + '"><figcaption>' + escapeHTML(image.alt) + '</figcaption></figure>').join('')
      : '<div class="detail-gallery__placeholder">' + visualHTML(project) +
          '<div class="detail-gallery__message"><span>VISUELS DU PROJET</span><h3>Photos et captures à venir.</h3><p>' + escapeHTML(project.imageNote) + '</p></div></div>';

    root.innerHTML = `
      <div class="pages-eyebrow"><span>PROJET / ${escapeHTML(project.number)}</span><a href="projets.html">TOUS LES PROJETS ↗</a></div>
      <section class="detail-hero" aria-labelledby="detail-title">
        <div class="detail-hero__copy">
          <p class="section-kicker">${escapeHTML(project.categoryLabel)} · ${escapeHTML(project.year)}</p>
          <h1 id="detail-title">${escapeHTML(project.title)}<span>.</span></h1>
          <p class="detail-hero__intro">${escapeHTML(project.short)}</p>
          <div class="detail-hero__tags">${tagHTML(project.tags)}</div>
        </div>
        <div class="detail-hero__visual">${visualHTML(project)}</div>
      </section>

      <nav class="detail-toc" aria-label="Sommaire du projet">
        <a href="#cadre">01 — Cadre du projet</a>
        <a href="#methodologie">02 — Méthodologie</a>
        <a href="#resultats">03 — Résultats</a>
        <a href="#photos">04 — Photos & visuels</a>
      </nav>

      <section id="cadre" class="detail-section">
        <div class="detail-section__label"><span>01</span><h2>Cadre du projet</h2></div>
        <div class="detail-section__body">
          <h3>Contexte & objectif</h3>
          ${project.context.map(p => '<p>' + escapeHTML(p) + '</p>').join('')}
          <div class="detail-access"><span>ACCÈS AUX RESSOURCES</span><p>${escapeHTML(project.access)}</p>${linkList}</div>
        </div>
      </section>

      <section id="methodologie" class="detail-section">
        <div class="detail-section__label"><span>02</span><h2>Résumé méthodologique</h2></div>
        <div class="detail-section__body">
          <p class="detail-section__lead">Les principales étapes de la démarche, présentées de manière synthétique.</p>
          <ol class="detail-method">${methodHTML}</ol>
        </div>
      </section>

      <section id="resultats" class="detail-section">
        <div class="detail-section__label"><span>03</span><h2>Résultats</h2></div>
        <div class="detail-section__body">
          <p class="detail-section__lead">Réalisations ou constats documentés ; les données indisponibles ne sont pas inventées.</p>
          <ol class="detail-results">${resultHTML}</ol>
        </div>
      </section>

      <section id="photos" class="detail-section detail-section--photos">
        <div class="detail-section__label"><span>04</span><h2>Photos & visuels</h2></div>
        <div class="detail-section__body"><div class="detail-gallery">${galleryHTML}</div></div>
      </section>

      <div class="detail-next"><span>PROJET SUIVANT</span><a href="${linkFor(next)}">${escapeHTML(next.title)}<span aria-hidden="true">↗</span></a></div>
    `;
    if (!reducedMotion && window.gsap) {
      window.gsap.fromTo('.detail-hero__copy > *', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .68, stagger: .1, ease: 'power2.out' });
      window.gsap.fromTo('.detail-hero__visual', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: .8, delay: .2 });
    }
  }
})();
