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

  // À propos : titre centré -> à droite au défilement, sticky jusqu'à la fin de la section.
  const aboutSection = document.getElementById('apropos');
  if (aboutSection) {
    const header = aboutSection.querySelector('.about__sticky-header');
    const title = aboutSection.querySelector('.about__section-title');
    let ticking = false;
    // GSAP lisse le déplacement du titre pendant que le conteneur reste sticky.
    const slideTitle = title && typeof window.gsap !== 'undefined' && !reduceMotion
      ? window.gsap.quickTo(title, 'x', { duration: .28, ease: 'power2.out' })
      : null;
    const updateAboutTitle = () => {
      ticking = false;
      if (!title || !header) return;
      const rect = aboutSection.getBoundingClientRect();
      const headerHeight = header.offsetHeight;
      const stickyTop = parseFloat(getComputedStyle(header).top) || 108;
      // Le titre reste centré ; il ne part à droite qu'au moment
      // où son emplacement normal va se glisser sous la navigation.
      const start = stickyTop + headerHeight * .55;
      const finish = stickyTop - 24;
      const progress = Math.max(0, Math.min(1, (start - rect.top) / Math.max(1, start - finish)));
      // Au départ au centre ; au scroll, à droite avec une marge de 12 px.
      const rightShift = Math.max(0, (header.clientWidth - title.offsetWidth) / 2 - 12);
      const x = rightShift * progress;
      if (slideTitle) slideTitle(x);
      else title.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0)';
      header.classList.toggle('is-stuck', rect.top <= stickyTop && rect.bottom > stickyTop + headerHeight);
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateAboutTitle);
      }
    }, { passive: true });
    window.addEventListener('resize', updateAboutTitle, { passive: true });
    updateAboutTitle();

    // GSAP fait apparaître seulement les contenus de cette section.
    if (typeof window.gsap !== 'undefined' && !reduceMotion) {
      const gsap = window.gsap;
      const watchOnce = (element, callback) => {
        if (!element) return;
        if (!('IntersectionObserver' in window)) { callback(); return; }
        const observer = new IntersectionObserver(entries => {
          if (entries.some(item => item.isIntersecting)) {
            observer.disconnect();
            callback();
          }
        }, { threshold: .13 });
        observer.observe(element);
      };
      watchOnce(aboutSection.querySelector('.about__main'), () => {
        gsap.fromTo('.about__quality',
          { opacity: 0, x: -25 },
          { opacity: 1, x: 0, duration: .75, stagger: .14, ease: 'power3.out' });
        gsap.fromTo('.about__journey-step',
          { opacity: 0, x: 25 },
          { opacity: 1, x: 0, duration: .75, stagger: .17, ease: 'power3.out', delay: .13 });
      });
      watchOnce(aboutSection.querySelector('.about__interests'), () => {
        gsap.fromTo('.about__interest-grid span',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: .58, stagger: .08, ease: 'power2.out' });
      });
    }
  }

});
