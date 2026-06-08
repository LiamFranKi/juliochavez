/* Julio Chávez — Campaign Website JS */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavigation();
  initScrollReveal();
  initCounterAnimation();
  initActiveNavLink();
  initContactForm();
});

/* Preloader */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hidden'), 800);
  });
}

/* Navigation */
function initNavigation() {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navOverlay = document.getElementById('nav-overlay');
  const navLinks = document.querySelectorAll('.nav__link, .nav__cta');

  const closeMenu = () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
    if (navOverlay) {
      navOverlay.classList.remove('open');
      navOverlay.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    navMenu.classList.add('open');
    navToggle.classList.add('active');
    if (navOverlay) {
      navOverlay.classList.add('open');
      navOverlay.setAttribute('aria-hidden', 'false');
    }
    document.body.style.overflow = 'hidden';
  };

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });

  navToggle.addEventListener('click', () => {
    if (navMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* Scroll Reveal */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
}

/* Counter Animation */
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

/* Active Nav Link on Scroll */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* Contact Form */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('contact-success');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.reset();
    success.hidden = false;
    setTimeout(() => { success.hidden = true; }, 5000);
  });
}
