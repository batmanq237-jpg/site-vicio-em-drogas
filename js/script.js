// ===== Header scroll state + progress bar =====
const header = document.getElementById('siteHeader');
const progressFill = document.getElementById('progressFill');
const toTop = document.getElementById('toTop');

function onScroll(){
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  header.classList.toggle('scrolled', scrollTop > 10);
  progressFill.style.width = pct + '%';
  toTop.classList.toggle('visible', scrollTop > 600);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

toTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

mainNav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

sections.forEach(section => navObserver.observe(section));

// ===== Scroll reveal for cards =====
const revealTargets = document.querySelectorAll(
  '.effect-card, .consequence-card, .callout-card, .help-card, .onset-chart, .note-strip'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

// ===== Onset chart bar animation =====
const onsetChart = document.getElementById('onsetChart');
if (onsetChart) {
  const bars = onsetChart.querySelectorAll('.onset-bar');
  const onsetObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bars.forEach(bar => {
          const target = bar.getAttribute('data-width');
          bar.style.width = target + '%';
        });
        onsetObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  onsetObserver.observe(onsetChart);
}
