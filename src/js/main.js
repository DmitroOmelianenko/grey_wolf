document.addEventListener('DOMContentLoaded', () => {
  // -----------------------------
  // To-top button: show/hide + smooth scroll
  // -----------------------------
  const toTopBtn = document.querySelector('.to-top');
  const SHOW_AFTER = 300; // px

  if (toTopBtn) {
    const updateVisibility = () => {
      if (window.scrollY > SHOW_AFTER) toTopBtn.classList.add('show');
      else toTopBtn.classList.remove('show');
    };

    // initial state and listeners
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });

    // smooth scroll when clicking the to-top button
    toTopBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      const header = document.querySelector('#header') || document.querySelector('header');
      if (header) header.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // (menu wiring moved below so it runs on pages without .to-top)

    // (Removed leftover/duplicate menu code that referenced undefined variables.)
  }

  // Mobile menu: prefer toggling an existing .header__panel when present,
  // otherwise fall back to the modal implementation.
  (function() {
    const burgers = Array.from(document.querySelectorAll('.header__burger'));
    if (!burgers.length) return;

    // helper to find panel in a header
    function findPanelForBurger(b) {
      const header = b.closest('header') || document.querySelector('header');
      return header ? header.querySelector('.header__panel') : null;
    }

    // CSS class to hide panel (we toggle this instead of inline styles)
    const HIDDEN_CLASS = 'panel--hidden';

    // Wire panel-close buttons to hide their .header__panel
    const panelCloseButtons = Array.from(document.querySelectorAll('.header__panel-close'));
    panelCloseButtons.forEach(btn => {
      btn.addEventListener('click', (ev) => {
        ev.preventDefault();
        const panel = btn.closest('.header__panel');
        if (!panel) return;
        panel.classList.add(HIDDEN_CLASS);
        // try to restore focus to the header burger if present
        const header = btn.closest('header');
        const burger = header ? header.querySelector('.header__burger') : null;
        if (burger) burger.focus();
      });
    });

    // Modal fallback (keeps previous behavior)
    let modal = null;
    let lastFocused = null;

    function createModal() {
      if (modal) return modal;
      modal = document.createElement('div');
      modal.className = 'mobile-modal';
      modal.innerHTML = `
        <div class="mobile-modal__backdrop"></div>
        <div class="mobile-modal__content" role="dialog" aria-modal="true" aria-label="Меню">
          <button class="mobile-modal__close" aria-label="Закрити меню">&times;</button>
          <nav class="mobile-modal__nav"></nav>
        </div>
      `;
      document.body.appendChild(modal);

      // handlers
      const backdrop = modal.querySelector('.mobile-modal__backdrop');
      const closeBtn = modal.querySelector('.mobile-modal__close');
      backdrop.addEventListener('click', closeModal);
      closeBtn.addEventListener('click', closeModal);
      document.addEventListener('keydown', (ev) => {
        if (ev.key === 'Escape' && modal.classList.contains('open')) closeModal();
      });

      return modal;
    }

    function openModal(headerList) {
      createModal();
      lastFocused = document.activeElement;
      const nav = modal.querySelector('.mobile-modal__nav');
      nav.innerHTML = '';
      if (headerList) nav.appendChild(headerList.cloneNode(true));
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      const firstLink = modal.querySelector('.mobile-modal__nav .header__list a');
      if (firstLink) firstLink.focus();
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.remove('open');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    }

    // Attach to each burger: toggle panel if present, otherwise open modal
    burgers.forEach(b => {
      b.addEventListener('click', (ev) => {
        ev.preventDefault();
        const panel = findPanelForBurger(b);
        if (panel) {
          // toggle hidden class
          panel.classList.toggle(HIDDEN_CLASS);
          // ensure panel is visible if it was hidden
          if (!panel.classList.contains(HIDDEN_CLASS)) {
            // focus first link inside
            const firstLink = panel.querySelector('.header__list a');
            if (firstLink) firstLink.focus();
          } else {
            b.focus();
          }
          return;
        }

        // fallback to modal
        const header = b.closest('header') || document.querySelector('header');
        const headerList = header ? header.querySelector('.header__list') : null;
        openModal(headerList);
      });
    });
  })();

  // -----------------------------
  // Trainers carousel (preserved)
  // -----------------------------
  const track = document.querySelector('.trainers-section__track');
  if (!track) return;

  const slides = Array.from(track.children);
  const prevBtn = document.querySelector('.arrow--prev');
  const nextBtn = document.querySelector('.arrow--next');
  const dotsContainer = document.querySelector('.trainers-section__dots');
  if (!prevBtn || !nextBtn || !dotsContainer) return;

  let currentIndex = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.type = 'button';
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  function updateCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
  }

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  function setSlideWidths() {
    slides.forEach(slide => slide.style.minWidth = `${track.getBoundingClientRect().width}px`);
    updateCarousel();
  }

  window.addEventListener('resize', setSlideWidths);
  setSlideWidths();
});


