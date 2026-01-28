// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile menu
const btn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

if (btn && mobileNav) {
  btn.addEventListener("click", () => mobileNav.classList.toggle("open"));
  mobileNav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => mobileNav.classList.remove("open"));
  });
}

// Reveal on scroll
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReduced) {
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("show");
      });
    },
    { threshold: 0.12 }
  );

  els.forEach((el) => io.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("show"));
}

// Premium thumbnail parallax (mouse move)
if (!prefersReduced) {
  const wraps = document.querySelectorAll("[data-parallax]");

  wraps.forEach((wrap) => {
    const img = wrap.querySelector("img");
    if (!img) return;

    let rect = null;

    const strengthX = 10; // subtle
    const strengthY = 8;

    const onEnter = () => {
      rect = wrap.getBoundingClientRect();
      img.style.willChange = "transform";
    };

    const onMove = (e) => {
      if (!rect) rect = wrap.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dx = (x / rect.width - 0.5) * 2; // -1 to 1
      const dy = (y / rect.height - 0.5) * 2;

      const moveX = dx * strengthX;
      const moveY = dy * strengthY;

      img.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.06)`;
    };

    const onLeave = () => {
      img.style.transform = "translate3d(0,0,0) scale(1.02)";
      img.style.willChange = "auto";
      rect = null;
    };

    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
  });
}

/* =========================
   DESIGN MONSTER CURSOR FX
   ========================= */
if (!prefersReduced) {
  const fx = document.querySelector(".cursorfx");

  if (fx) {
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    const smooth = 0.075; // cinematic lag

    // Aggressive trail dots
    const maxDots = 22;
    const dots = [];

    for (let i = 0; i < maxDots; i++) {
      const d = document.createElement("div");
      d.className = "cursorfx-dot";
      fx.appendChild(d);
      dots.push({ el: d, x: cx, y: cy, vx: 0, vy: 0 });
    }

    window.addEventListener(
      "mousemove",
      (e) => {
        tx = e.clientX;
        ty = e.clientY;
      },
      { passive: true }
    );

    function tick() {
      // Smooth follow for glow/core
      cx += (tx - cx) * smooth;
      cy += (ty - cy) * smooth;

      fx.style.setProperty("--x", `${cx}px`);
      fx.style.setProperty("--y", `${cy}px`);

      // Spring trail physics
      let px = cx;
      let py = cy;

      for (let i = 0; i < dots.length; i++) {
        const p = dots[i];

        const dx = px - p.x;
        const dy = py - p.y;

        p.vx += dx * 0.18;
        p.vy += dy * 0.18;

        p.vx *= 0.62;
        p.vy *= 0.62;

        p.x += p.vx;
        p.y += p.vy;

        const s = 1 - i / dots.length; // bigger near cursor
        p.el.style.left = `${p.x}px`;
        p.el.style.top = `${p.y}px`;
        p.el.style.transform = `translate(-50%,-50%) scale(${0.35 + s * 0.9})`;
        p.el.style.opacity = `${0.15 + s * 0.85}`;

        px = p.x;
        py = p.y;
      }

      requestAnimationFrame(tick);
    }

    tick();

    // CLICK pulse burst
    window.addEventListener("click", () => {
      const pulse = document.createElement("div");
      pulse.className = "cursorfx-pulse";
      fx.appendChild(pulse);
      setTimeout(() => pulse.remove(), 650);
    });

    // HOVER boost (projects + buttons + links)
    const boostTargets = document.querySelectorAll(".card.project, .thumb-wrap, a, button");

    boostTargets.forEach((el) => {
      el.addEventListener("mouseenter", () => fx.classList.add("is-boost"));
      el.addEventListener("mouseleave", () => fx.classList.remove("is-boost"));
    });
  }
}
