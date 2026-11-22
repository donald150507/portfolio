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
      .fromTo('.home__decor', { autoAlpha: 0, scale: .96 },
        { autoAlpha: 1, scale: 1, duration: 1.2, stagger: .08 }, '-=1.1');

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
});
