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
  }

  // -----------------------------
  // Mobile menu open/close
  // -----------------------------
  (function() {
    const burgers = Array.from(document.querySelectorAll('.header__burger'));
    const closeButtons = Array.from(document.querySelectorAll('.header__panel-close, .mobile-modal__close'));

    burgers.forEach(b => {
      b.addEventListener('click', (ev) => {
        ev.preventDefault();
        const header = b.closest('header') || document.querySelector('header');
        const nav = header ? header.querySelector('.header__nav') : document.querySelector('.header__nav');
        if (!nav) return;
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
        nav.style.display = 'none';
        nav.classList.remove('open');
        const burger = header ? header.querySelector('.header__burger') : document.querySelector('.header__burger');
        if (burger) { try { burger.setAttribute('aria-expanded', 'false'); } catch (e) {}; burger.focus(); }
      });
    });
  })();
});


// -----------------------------
// Intersection Observer для історії
// -----------------------------
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll(
    '.history__description, .history__vovk-before, .history__description-vovk, .history__vovk-after'
  );

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elements.forEach(el => observer.observe(el));
});


// -----------------------------
// Підсвічування сьогоднішнього дня у розкладі
// -----------------------------
const today = new Date().getDay(); // неділя = 0
document.querySelectorAll('.schedule-list li').forEach(li => {
  if (Number(li.dataset.day) === today || (today >= 1 && today <= 5 && li.dataset.day == 1)) {
    li.classList.add('today');
  }
});


// -----------------------------
// Галерея (слайдер)
// -----------------------------
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".galery__image");
  const prevBtn = document.querySelector(".button__left");
  const nextBtn = document.querySelector(".button__right");
  let currentIndex = 0;

  function showImage(index) {
    images.forEach((img, i) => {
      img.style.opacity = i === index ? "1" : "0";
      img.style.zIndex = i === index ? "1" : "0";
    });
  }

  nextBtn.addEventListener("click", () => {
    images[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add("active");
    showImage(currentIndex);
  });

  prevBtn.addEventListener("click", () => {
    images[currentIndex].classList.remove("active");
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    images[currentIndex].classList.add("active");
    showImage(currentIndex);
  });

  showImage(currentIndex);
});

