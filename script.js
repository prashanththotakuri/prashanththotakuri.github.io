// Mark that JS is running (used by CSS fallback)
document.documentElement.classList.add("js");

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile menu (safe even if elements don't exist)
const btn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
if (btn && mobileNav) {
  btn.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });

  mobileNav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
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
    const strengthX = 10;
    const strengthY = 8;

    const onEnter = () => {
      rect = wrap.getBoundingClientRect();
      img.style.willChange = "transform";
    };

    const onMove = (e) => {
      if (!rect) rect = wrap.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dx = (x / rect.width - 0.5) * 2;
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
   Cursor FX (next level)
   ========================= */
if (!prefersReduced) {
  const fx = document.querySelector(".cursorfx");
  if (fx) {
    // Smooth follow
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const setVars = (x, y) => {
      fx.style.setProperty("--x", `${x}px`);
      fx.style.setProperty("--y", `${y}px`);
    };

    window.addEventListener(
      "mousemove",
      (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
      },
      { passive: true }
    );

    const tick = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setVars(currentX, currentY);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    // Click pulse burst
    window.addEventListener(
      "pointerdown",
      () => {
        const p = document.createElement("div");
        p.className = "cursorfx-pulse";
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 650);
      },
      { passive: true }
    );

    // Boost glow on interactive hover
    const boostSelectors = [
      "a",
      "button",
      ".btn",
      ".card",
      ".thumb-wrap",
      ".project-thumb",
      ".mini-card",
      ".link",
      ".avatar-wrap",
      ".avatar-img",
    ].join(",");

    document.addEventListener(
      "mouseover",
      (e) => {
        const el = e.target.closest?.(boostSelectors);
        if (el) fx.classList.add("is-boost");
      },
      { passive: true }
    );

    document.addEventListener(
      "mouseout",
      (e) => {
        const related = e.relatedTarget;
        if (!related || !related.closest?.(boostSelectors)) {
          fx.classList.remove("is-boost");
        }
      },
      { passive: true }
    );
  }
}

/* =========================
   Avatar 3D tilt (subtle)
   - Works with .avatar-wrap + .avatar-img CSS vars (--rx/--ry)
   ========================= */
if (!prefersReduced) {
  const avatar = document.querySelector("[data-avatar]");
  if (avatar) {
    let rect = null;

    const maxTilt = 10; // degrees (subtle)
    const setTilt = (rx, ry) => {
      avatar.style.setProperty("--rx", `${rx}deg`);
      avatar.style.setProperty("--ry", `${ry}deg`);
    };

    const onEnter = () => {
      rect = avatar.getBoundingClientRect();
    };

    const onMove = (e) => {
      if (!rect) rect = avatar.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dx = (x / rect.width - 0.5) * 2; // -1..1
      const dy = (y / rect.height - 0.5) * 2;

      // Invert Y for “natural” tilt
      const ry = dx * maxTilt;
      const rx = -dy * maxTilt;

      setTilt(rx.toFixed(2), ry.toFixed(2));
    };

    const onLeave = () => {
      rect = null;
      setTilt(0, 0);
    };

    avatar.addEventListener("mouseenter", onEnter);
    avatar.addEventListener("mousemove", onMove);
    avatar.addEventListener("mouseleave", onLeave);
  }
}
