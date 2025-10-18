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

  // Mobile menu (simplified): burger shows the nav (display:block), close hides it (display:none)
  (function() {
    const burgers = Array.from(document.querySelectorAll('.header__burger'));
    const closeButtons = Array.from(document.querySelectorAll('.header__panel-close, .mobile-modal__close'));

    burgers.forEach(b => {
      b.addEventListener('click', (ev) => {
        ev.preventDefault();
        const header = b.closest('header') || document.querySelector('header');
        const nav = header ? header.querySelector('.header__nav') : document.querySelector('.header__nav');
        if (!nav) return;
        // show the nav (simple behavior requested)
        nav.style.display = 'block';
        nav.classList.add('open');
        try { b.setAttribute('aria-expanded', 'true'); } catch (e) {}
      });
    });

    closeButtons.forEach(btn => {
      btn.addEventListener('click', (ev) => {
        ev.preventDefault();
        const header = btn.closest('header') || document.querySelector('header');
        const nav = header ? header.querySelector('.header__nav') : document.querySelector('.header__nav');
        if (!nav) return;
        // hide the nav
        nav.style.display = 'none';
        nav.classList.remove('open');
        const burger = header ? header.querySelector('.header__burger') : document.querySelector('.header__burger');
        if (burger) { try { burger.setAttribute('aria-expanded', 'false'); } catch (e) {} ; burger.focus(); }
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


