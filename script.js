// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('siteNav');
navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal for section heads and cards
const revealTargets = document.querySelectorAll(
  '.section-head, .project, .timeline-item, .tool-card, .thought-card, .contact-inner'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => io.observe(el));

// Signature thread: redraw a loose stitched path down the page on load/resize
const threadPath = document.getElementById('threadPath');
function drawThread() {
  const h = document.body.scrollHeight / (window.innerHeight || 1) * 100;
  let d = 'M2,0 ';
  let x = 2;
  for (let y = 0; y <= h; y += 6) {
    x = x === 2 ? 98 : 2;
    d += `Q${x},${y + 3} ${x === 2 ? 98 : 2},${y + 6} `;
  }
  threadPath.setAttribute('d', d);
}
drawThread();
window.addEventListener('resize', drawThread);

// Contact form demo (no backend wired up)
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  note.textContent = 'Thanks — this demo form isn\u2019t connected yet. Wire it to Formspree or Netlify Forms to receive real messages.';
  note.style.color = '#D9A441';
});
