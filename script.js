// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Splash screen — greets on every visit, dismiss by tap/scroll/click or after a few seconds
const splash = document.getElementById('splash');
const splashSkip = document.getElementById('splashSkip');
let splashDismissed = false;
function dismissSplash() {
  if (splashDismissed) return;
  splashDismissed = true;
  splash.classList.add('is-hidden');
  document.body.style.overflow = '';
}
document.body.style.overflow = 'hidden';
splashSkip.addEventListener('click', dismissSplash);
window.addEventListener('wheel', dismissSplash, { once: true, passive: true });
window.addEventListener('touchstart', dismissSplash, { once: true, passive: true });
splash.addEventListener('click', dismissSplash);
setTimeout(dismissSplash, 3200);

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

// Contact form — submits to Formspree so messages land in your inbox
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (form.action.includes('YOUR_FORM_ID')) {
    note.textContent = 'Form isn\u2019t connected yet — see the README to finish setup (2 minutes, free).';
    note.style.color = '#D9A441';
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (response.ok) {
      form.reset();
      note.textContent = 'Thanks — your message is on its way. I\u2019ll get back to you soon.';
      note.style.color = '#D9A441';
    } else {
      note.textContent = 'Something went wrong sending that — please try again or email directly.';
    }
  } catch (err) {
    note.textContent = 'Network error — please check your connection and try again.';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send message';
  }
});

// Smokey cursor trail — lightweight canvas particle effect (mouse + touch)
(function initSmoke() {
  const canvas = document.getElementById('smoke');
  const ctx = canvas.getContext('2d');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let particles = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const colors = ['217,164,65', '168,67,45', '51,85,63'];

  function addParticle(x, y) {
    particles.push({
      x, y,
      r: 10 + Math.random() * 26,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6 - 0.3,
      life: 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
    if (particles.length > 140) particles.shift();
  }

  let lastX = null, lastY = null;
  function handleMove(x, y) {
    if (lastX !== null) {
      const dist = Math.hypot(x - lastX, y - lastY);
      const steps = Math.min(Math.ceil(dist / 12), 6);
      for (let i = 0; i < steps; i++) {
        addParticle(
          lastX + (x - lastX) * (i / steps),
          lastY + (y - lastY) * (i / steps)
        );
      }
    } else {
      addParticle(x, y);
    }
    lastX = x; lastY = y;
  }

  window.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
  window.addEventListener('touchmove', (e) => {
    if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  function tick() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.018;
      p.r += 0.4;
      if (p.life > 0) {
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        grad.addColorStop(0, `rgba(${p.color},${p.life * 0.35})`);
        grad.addColorStop(1, `rgba(${p.color},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    particles = particles.filter(p => p.life > 0);
    requestAnimationFrame(tick);
  }

  if (!prefersReduced) tick();
})();
