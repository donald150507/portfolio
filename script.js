// Étape 01 : navigation flottante et menu mobile (JavaScript natif)
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const menuButton = document.querySelector('.navbar__toggle');
  const menu = document.getElementById('nav-links');

  // Au scroll : marges latérales, arrondis et fond glass.
  let scrolling = false;
  const refreshHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 36);
    scrolling = false;
  };
  window.addEventListener('scroll', () => {
    if (!scrolling) {
      window.requestAnimationFrame(refreshHeader);
      scrolling = true;
    }
  }, { passive: true });
  refreshHeader();

  function closeMenu() {
    menu.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Ouvrir le menu');
  }

  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menu.classList.toggle('is-open', !expanded);
    menuButton.setAttribute('aria-expanded', String(!expanded));
    menuButton.setAttribute('aria-label', expanded ? 'Ouvrir le menu' : 'Fermer le menu');
  });

  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
  document.addEventListener('click', event => {
    if (!header.contains(event.target)) closeMenu();
  });
  // Menu CV accessible à la souris, au clavier et sur mobile.
  const cvDropdown = document.querySelector('.cv-dropdown');
  const cvTrigger = cvDropdown?.querySelector('.cv-dropdown__trigger');
  const setCvOpen = (isOpen) => {
    cvDropdown?.classList.toggle('is-open', isOpen);
    cvTrigger?.setAttribute('aria-expanded', String(isOpen));
  };
  cvTrigger?.addEventListener('click', () => {
    setCvOpen(!cvDropdown.classList.contains('is-open'));
  });
  cvDropdown?.addEventListener('mouseenter', () => setCvOpen(true));
  cvDropdown?.addEventListener('mouseleave', () => setCvOpen(false));
  cvDropdown?.addEventListener('focusout', (event) => {
    if (!cvDropdown.contains(event.relatedTarget)) setCvOpen(false);
  });
  document.addEventListener('click', (event) => {
    if (cvDropdown && !cvDropdown.contains(event.target)) setCvOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setCvOpen(false);
  });


  // Accueil : animations GSAP, avec affichage statique si la bibliothèque ne charge pas.
  const home = document.querySelector('.home');
  const hasGsap = typeof window.gsap !== 'undefined';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (home && hasGsap && !reduceMotion) {
    const gsap = window.gsap;

    // Apparition progressive : nom, sous-titre, citation et actions.
    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
    intro
      .fromTo('#home-title',
        { autoAlpha: 0, y: 36, filter: 'blur(7px)' },
        { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1.1, clearProps: 'filter' })
      .fromTo('.home h2', { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: .75 }, '-=.6')
      .fromTo('.home__quote', { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, duration: .8 }, '-=.45')
      .fromTo(['.home__socials', '.home__actions'], { autoAlpha: 0, y: 15 },
        { autoAlpha: 1, y: 0, duration: .75, stagger: .13 }, '-=.4')
      .from('.home__decor', {
        opacity: 0, scale: .96, duration: 1.2, stagger: .08,
        clearProps: 'opacity,scale'
      }, '-=1.1');

    // Les boutons restent carrés ; GSAP anime uniquement leur déplacement et leur échelle.
    home.querySelectorAll('.home__button').forEach((button) => {
      button.addEventListener('pointerenter', (event) => {
        if (event.pointerType === 'touch') return;
        gsap.to(button, { y: -4, scale: 1.025, duration: .3, ease: 'power2.out', overwrite: 'auto' });
      });
      button.addEventListener('pointerleave', () => {
        gsap.to(button, { y: 0, scale: 1, duration: .35, ease: 'power3.out', overwrite: 'auto' });
      });
      button.addEventListener('blur', () => {
        gsap.to(button, { y: 0, scale: 1, duration: .3, overwrite: 'auto' });
      });
    });

    // Profondeur discrète : seuls les SVG et la grille suivent légèrement la souris.
    if (window.matchMedia('(pointer: fine)').matches) {
      const decor = Array.from(home.querySelectorAll('.home__decor'));
      const layers = decor.map((element, i) => ({
        x: gsap.quickTo(element, 'x', { duration: .9, ease: 'power3.out' }),
        y: gsap.quickTo(element, 'y', { duration: .9, ease: 'power3.out' }),
        strength: i % 2 === 0 ? 11 : -8,
      }));
      const grid = home.querySelector('.home__grid');
      const gridX = gsap.quickTo(grid, 'x', { duration: 1.3, ease: 'power2.out' });
      const gridY = gsap.quickTo(grid, 'y', { duration: 1.3, ease: 'power2.out' });

      home.addEventListener('pointermove', (event) => {
        if (event.pointerType === 'touch') return;
        const rect = home.getBoundingClientRect();
        const nx = ((event.clientX - rect.left) / rect.width - .5) * 2;
        const ny = ((event.clientY - rect.top) / rect.height - .5) * 2;
        layers.forEach(layer => {
          layer.x(nx * layer.strength);
          layer.y(ny * layer.strength);
        });
        gridX(nx * 4);
        gridY(ny * 4);
      }, { passive: true });
      home.addEventListener('pointerleave', () => {
        layers.forEach(layer => { layer.x(0); layer.y(0); });
        gridX(0);
        gridY(0);
      });
    }
  }

  // À propos : animations éditoriales GSAP, sans plugins supplémentaires.
  const aboutSection = document.querySelector('#apropos');
  if (aboutSection && typeof window.gsap !== 'undefined' && !reduceMotion) {
    const gsap = window.gsap;
    const lines = aboutSection.querySelectorAll('.about__line > span');
    const qualities = aboutSection.querySelectorAll('.about__quality');
    const interestTags = aboutSection.querySelectorAll('.about__interest-grid span');
    const journeySteps = aboutSection.querySelectorAll('.about__journey-step');
    const curve = aboutSection.querySelector('.about__figure-curve');

    function watchOnce(element, reveal, threshold = .15) {
      if (!element) return;
      if (!('IntersectionObserver' in window)) { reveal(); return; }
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          observer.disconnect();
          reveal();
        }
      }, { threshold });
      observer.observe(element);
    }

    watchOnce(aboutSection.querySelector('.about__hero'), () => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .fromTo(lines, { yPercent: 110, rotate: 2 }, { yPercent: 0, rotate: 0, duration: 1, stagger: .15 })
        .fromTo('.about__identity', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .75 }, '-=.55')
        .fromTo('.about__art', { opacity: 0, x: 35, rotate: 2 }, { opacity: 1, x: 0, rotate: 0, duration: .9 }, '-=.8');
      if (curve && typeof curve.getTotalLength === 'function') {
        const length = curve.getTotalLength();
        gsap.fromTo(curve,
          { strokeDasharray: length, strokeDashoffset: length },
          { strokeDashoffset: 0, duration: 1.65, ease: 'power2.inOut', delay: .45 });
      }
    }, .16);

    watchOnce(aboutSection.querySelector('.about__bottom'), () => {
      gsap.fromTo(qualities, { x: -25, opacity: 0 },
        { x: 0, opacity: 1, duration: .65, stagger: .12, ease: 'power2.out' });
      gsap.fromTo(interestTags, { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: .55, stagger: .065, ease: 'power2.out', delay: .18 });
    }, .1);

    watchOnce(aboutSection.querySelector('.about__journey'), () => {
      gsap.fromTo(journeySteps, { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: .8, stagger: .17, ease: 'power3.out' });
    }, .12);

    // Mouvement très léger de la figure au pointeur, sans faire tourner l'interface.
    const art = aboutSection.querySelector('.about__art');
    const artLayers = [
      { el: aboutSection.querySelector('.about__figure-data'), factor: 11 },
      { el: aboutSection.querySelector('.about__figure-paper'), factor: -8 },
      { el: aboutSection.querySelector('.about__figure-spark'), factor: 5 }
    ].filter(layer => layer.el);
    if (art && window.matchMedia('(pointer: fine)').matches) {
      const movers = artLayers.map(layer => ({
        x: gsap.quickTo(layer.el, 'x', { duration: .7, ease: 'power3.out' }),
        y: gsap.quickTo(layer.el, 'y', { duration: .7, ease: 'power3.out' }),
        factor: layer.factor
      }));
      art.addEventListener('pointermove', event => {
        const rect = art.getBoundingClientRect();
        const dx = (event.clientX - rect.left) / rect.width - .5;
        const dy = (event.clientY - rect.top) / rect.height - .5;
        movers.forEach(m => { m.x(dx * m.factor); m.y(dy * m.factor); });
      }, { passive: true });
      art.addEventListener('pointerleave', () => {
        movers.forEach(m => { m.x(0); m.y(0); });
      });
    }
  }

});
