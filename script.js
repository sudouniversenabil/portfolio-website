/* ===========================
   NABIL SIKDER — PORTFOLIO JS
   =========================== */

// ── Custom Cursor ──────────────────────────────────
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Smooth trail
function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top  = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

// Hover effect on interactive elements
const hoverTargets = document.querySelectorAll(
  'a, button, .skill-card, .tag, .nav-link, .contact-social-item'
);
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
  cursorTrail.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
  cursorTrail.style.opacity = '1';
});


// ── Navbar scroll state ────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });


// ── Active nav link on scroll ──────────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();


// ── Mobile Hamburger ───────────────────────────────
const hamburger = document.getElementById('hamburger');
const navList   = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navList.classList.toggle('open');
});

navList.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navList.classList.remove('open');
  });
});


// ── Typing Animation ──────────────────────────────
const roles = [
  'Full Stack Developer',
  'Backend Engineer',
  'Frontend Enthusiast',
  'Python Developer',
  'React Developer',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleEl = document.getElementById('roleText');

function typeRole() {
  if (!roleEl) return;
  const current = roles[roleIndex];

  if (!isDeleting) {
    roleEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeRole, 1800);
      return;
    }
    setTimeout(typeRole, 80);
  } else {
    roleEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 300);
      return;
    }
    setTimeout(typeRole, 40);
  }
}

setTimeout(typeRole, 1200);


// ── Scroll Reveal ─────────────────────────────────
const revealEls = document.querySelectorAll(
  '.skill-card, .contact-card, .contact-info-card, .section-header, .contact-social-item, .info-item'
);

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = (i * 0.06) + 's';
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));


// ── Skill Bar Animations ──────────────────────────
const bars = document.querySelectorAll('.bar-fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, { threshold: 0.5 });

bars.forEach(bar => barObserver.observe(bar));


// ── Parallax orbs on mouse move ───────────────────
const orbs = document.querySelectorAll('.orb');

document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth  - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  orbs.forEach((orb, i) => {
    const depth = (i + 1) * 0.3;
    orb.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
  });
}, { passive: true });


// ── Tilt effect on skill cards ────────────────────
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect   = card.getBoundingClientRect();
    const x      = (e.clientX - rect.left) / rect.width  - 0.5;
    const y      = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-5px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    card.style.transition = 'transform 0.1s';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1)';
  });
});


// ── Particle sparkles on click ───────────────────
document.addEventListener('click', e => {
  const colors = ['#c084fc', '#60a5fa', '#22d3ee', '#4ade80', '#f472b6'];
  for (let i = 0; i < 8; i++) {
    const spark = document.createElement('div');
    spark.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(spark);
    const angle = (i / 8) * Math.PI * 2;
    const dist  = 40 + Math.random() * 40;
    const tx    = Math.cos(angle) * dist;
    const ty    = Math.sin(angle) * dist;
    spark.animate([
      { opacity: 1, transform: `translate(-50%, -50%) translate(0, 0) scale(1)` },
      { opacity: 0, transform: `translate(-50%, -50%) translate(${tx}px, ${ty}px) scale(0)` }
    ], { duration: 600, easing: 'cubic-bezier(0,0,0.2,1)' })
      .onfinish = () => spark.remove();
  }
});


// ── Smooth scroll for nav links ───────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});