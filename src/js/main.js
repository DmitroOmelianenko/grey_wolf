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
// Показ сьогоднішнього дня, часу та статусу залу
// -----------------------------
function updateTodayStatus() {
  const now = new Date();
  const day = now.getDay(); // 0 = неділя, 1 = понеділок, ...
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");

  // Українські назви днів
  const daysUA = [
    "Неділя",
    "Понеділок",
    "Вівторок",
    "Середа",
    "Четвер",
    "П’ятниця",
    "Субота"
  ];

  const isWeekend = day === 0 || day === 6; // Сб, Нд

  // Графік роботи
  const schedule = isWeekend
    ? { open: 10.5, close: 20 } // 10:30–20:00
    : { open: 8.5, close: 21 }; // 08:30–21:00

  const currentTime = hours + minutes / 60;
  const isOpen = currentTime >= schedule.open && currentTime < schedule.close;

  // Запис у DOM
  document.getElementById("today-day").textContent = `Сьогодні: ${daysUA[day]}`;
  document.getElementById("today-time").textContent = `${hours}:${minutes}`;
  document.getElementById("today-status").textContent = isOpen
    ? "Відчинено"
    : "Зачинено";

  // Зміна кольору залежно від статусу
  const statusEl = document.getElementById("today-status");
  statusEl.style.color = isOpen ? "#22c55e" : "#ef4444";
}

// Запуск одразу і кожну хвилину
updateTodayStatus();
setInterval(updateTodayStatus, 60000);


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

 