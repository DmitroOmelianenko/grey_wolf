import '../scss/main.scss';

document.addEventListener('DOMContentLoaded', () => {
  // -----------------------------
  // Кнопка "До верху"
  // -----------------------------
  const toTopBtn = document.querySelector('.to-top');
  const SHOW_AFTER = 300; // px

  if (toTopBtn) {
    const updateVisibility = () => {
      if (window.scrollY > SHOW_AFTER) {
        toTopBtn.classList.add('show');
      } else {
        toTopBtn.classList.remove('show');
      }
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });

    toTopBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // -----------------------------
  // Mobile menu open/close
  // -----------------------------
  const burger = document.querySelector('.header__burger');
  const nav = document.querySelector('.header__nav');
  const closeBtn = document.querySelector('.header__panel-close');
  const links = document.querySelectorAll('.header__link');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    }

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href') || '';
        if (href.startsWith('#') && href.length > 1) {
          e.preventDefault();
          nav.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
          const target = document.getElementById(href.slice(1));
          if (target) {
            setTimeout(() => {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
          }
        } else {
          nav.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // -----------------------------
  // Показ сьогоднішнього дня, часу та статусу залу
  // -----------------------------
  function updateTodayStatus() {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");

    const daysUA = [
      "Неділя", "Понеділок", "Вівторок",
      "Середа", "Четвер", "П’ятниця", "Субота"
    ];

    const isWeekend = day === 0 || day === 6;
    const schedule = isWeekend ? { open: 10.5, close: 20 } : { open: 8.5, close: 21 };
    const currentTime = hours + Number(minutes) / 60;
    const isOpen = currentTime >= schedule.open && currentTime < schedule.close;

    const dayEl = document.getElementById("today-day");
    const timeEl = document.getElementById("today-time");
    const statusEl = document.getElementById("today-status");

    if (dayEl) dayEl.textContent = `Сьогодні: ${daysUA[day]}`;
    if (timeEl) timeEl.textContent = `${hours}:${minutes}`;
    if (statusEl) {
      statusEl.textContent = isOpen ? "Відчинено" : "Зачинено";
      statusEl.style.color = isOpen ? "#22c55e" : "#ef4444";
    }
  }

  updateTodayStatus();
  setInterval(updateTodayStatus, 60000);

  // -----------------------------
  // Галерея (слайдер)
  // -----------------------------
  const images = Array.from(document.querySelectorAll(".galery__image"));
  const prevBtn = document.querySelector(".button__left");
  const nextBtn = document.querySelector(".button__right");

  if (images.length) {
    let currentIndex = 0;

    function showImage(index) {
      images.forEach((img, i) => {
        img.style.opacity = i === index ? "1" : "0";
        img.style.zIndex = i === index ? "1" : "0";
        img.classList.toggle('active', i === index);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
      });
    }

    showImage(currentIndex);
  }
});


window.addEventListener("hashchange", () => {
  if (location.hash === "#ruless") {
    window.location.replace("/ruless.html");
  }
});
