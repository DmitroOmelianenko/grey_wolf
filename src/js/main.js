


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
});

document.addEventListener('DOMContentLoaded', () => {
  // Селектор — переконайся, що імена класів точні
  const elements = document.querySelectorAll(
    '.history__description, .history__vovk-before, .history__description-vovk, .history__vovk-after'
  );

  // Функція для зручної діагностики
  const debugLog = (msg, el) => {
    // розкоментуй для консольної діагностики
    // console.log(msg, el && el.className ? el.className : el);
  };

  // Якщо браузер не підтримує IntersectionObserver — fallback
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('visible'));
    debugLog('No IntersectionObserver — added visible to all');
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px', // можна коригувати коли спрацьовує
    threshold: 0.15 // 15% елемента в кадрі
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        debugLog('Intersecting -> visible added', entry.target);
        // Якщо хочеш, щоб анімація була лише раз:
        obs.unobserve(entry.target);
      } else {
        debugLog('Not intersecting', entry.target);
        // Якщо хочеш, щоб анімація повторювалась при виході/повторному вході,
        // прибери unobserve вище і НЕ додавай unobserve тут.
      }
    });
  }, observerOptions);

  elements.forEach(el => observer.observe(el));
});

const today = new Date().getDay(); // неділя = 0
document.querySelectorAll('.schedule-list li').forEach(li => {
  if (Number(li.dataset.day) === today || (today >= 1 && today <= 5 && li.dataset.day == 1)) {
    li.classList.add('today');
  }
});



function updateWorkStatus() {
  const dayNames = ["Неділя","Понеділок","Вівторок","Середа","Четвер","П’ятниця","Субота"];
  const now = new Date();
  const day = now.getDay(); // 0 = Нд, 6 = Сб
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2,"0");
  const timeString = `${hours}:${minutes}`;

  let isOpen = false;

  // Визначаємо робочі години
  if(day >= 1 && day <= 5){ // Пн-Пт
    const openTime = 8*60 + 30;  // 08:30
    const closeTime = 21*60;     // 21:00
    const currentTime = hours*60 + parseInt(minutes);
    isOpen = currentTime >= openTime && currentTime <= closeTime;
  } else { // Сб-Нд
    const openTime = 10*60; // 10:00
    const closeTime = 20*60; // 20:00
    const currentTime = hours*60 + parseInt(minutes);
    isOpen = currentTime >= openTime && currentTime <= closeTime;
  }

  document.getElementById("today-day").textContent = `Сьогодні: ${dayNames[day]}`;
  document.getElementById("today-time").textContent = timeString;

  const statusEl = document.getElementById("today-status");
  if(isOpen){
    statusEl.textContent = "Відчинено";
    statusEl.className = "open";
  } else {
    statusEl.textContent = "Зачинено";
    statusEl.className = "closed";
  }
}

updateWorkStatus();
setInterval(updateWorkStatus, 60000); // оновлення кожну хвилину

document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.galery__images');
  if (!gallery) return;

  const images = Array.from(document.querySelectorAll('.galery__image'));
  const btnLeft = document.querySelector('.button__left');
  const btnRight = document.querySelector('.button__right');

  console.log(images, btnLeft, btnRight);

  if (images.length === 0) return;

  let currentIndex = 0;

  // ✅ Функція показу зображення
  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });

    if (btnLeft) btnLeft.disabled = index === 0;
    if (btnRight) btnRight.disabled = index === images.length - 1;
  }

  // Показуємо перше зображення при завантаженні
  showImage(0);

  if (btnLeft) {
    btnLeft.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        showImage(currentIndex);
      }
    });
  }

  if (btnRight) {
    btnRight.addEventListener('click', () => {
      if (currentIndex < images.length - 1) {
        currentIndex++;
        showImage(currentIndex);
      }
    });
  }
});


