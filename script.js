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

});
