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
