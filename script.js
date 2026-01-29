// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Motion preference
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Reveal on scroll
if (!prefersReduced) {
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("show")),
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("show"));
}

// -------------------------
// Cursor FX (premium, controlled)
// -------------------------
const cursor = document.querySelector(".cursorfx");
const glow = document.querySelector(".cursorfx-glow");
const core = document.querySelector(".cursorfx-core");

if (cursor && glow && core && !prefersReduced) {
  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let tx = x, ty = y;

  // smooth follow
  const tick = () => {
    tx += (x - tx) * 0.14;
    ty += (y - ty) * 0.14;
    cursor.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  window.addEventListener("mousemove", (e) => {
    x = e.clientX;
    y = e.clientY;
  }, { passive: true });

  // boost only on interactive elements
  const boostOn = () => cursor.classList.add("is-boost");
  const boostOff = () => cursor.classList.remove("is-boost");

  document.querySelectorAll("a, button, .card").forEach((el) => {
    el.addEventListener("mouseenter", boostOn);
    el.addEventListener("mouseleave", boostOff);
  });

  // click pulse (small but “wow”)
  window.addEventListener("click", (e) => {
    const p = document.createElement("div");
    p.className = "cursorfx-pulse";
    p.style.setProperty("--x", `${e.clientX}px`);
    p.style.setProperty("--y", `${e.clientY}px`);
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 650);
  }, { passive: true });
}

// -------------------------
// Premium thumbnail parallax (mouse move) - CALM version
// -------------------------
if (!prefersReduced) {
  const wraps = document.querySelectorAll("[data-parallax]");

  wraps.forEach((wrap) => {
    const img = wrap.querySelector("img");
    if (!img) return;

    let rect = null;
    let raf = null;

    const strengthX = 6; // lowered (calm)
    const strengthY = 5;

    const onEnter = () => {
      rect = wrap.getBoundingClientRect();
      img.style.willChange = "transform";
    };

    const onMove = (e) => {
      if (!rect) rect = wrap.getBoundingClientRect();

      const dx = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1..1
      const dy = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      const moveX = dx * strengthX;
      const moveY = dy * strengthY;

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        img.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.06)`;
      });
    };

    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      img.style.transform = "translate3d(0,0,0) scale(1.03)";
      img.style.willChange = "auto";
      rect = null;
    };

    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
  });
}
