// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Reduced motion
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Reveal on scroll
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

      const dx = (x / rect.width - 0.5) * 2; // -1 to 1
      const dy = (y / rect.height - 0.5) * 2;

      img.style.transform = `translate3d(${dx * strengthX}px, ${dy * strengthY}px, 0) scale(1.06)`;
    };

    const onLeave = () => {
      img.style.transform = "translate3d(0,0,0) scale(1.03)";
      img.style.willChange = "auto";
      rect = null;
    };

    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
  });
}

// Cursor glow + click pulse (the “design monster” vibe)
if (!prefersReduced) {
  const fx = document.querySelector(".cursorfx");
  if (fx) {
    const setXY = (x, y) => {
      fx.style.setProperty("--x", `${x}px`);
      fx.style.setProperty("--y", `${y}px`);
    };

    window.addEventListener("mousemove", (e) => {
      setXY(e.clientX, e.clientY);
    }, { passive: true });

    // Boost on interactive hover
    const boostOn = () => fx.classList.add("is-boost");
    const boostOff = () => fx.classList.remove("is-boost");

    document.querySelectorAll("a, button, .card, .thumb-wrap").forEach((el) => {
      el.addEventListener("mouseenter", boostOn);
      el.addEventListener("mouseleave", boostOff);
    });

    // Click pulse
    window.addEventListener("pointerdown", (e) => {
      setXY(e.clientX, e.clientY);
      const pulse = document.createElement("div");
      pulse.className = "cursorfx-pulse";
      fx.appendChild(pulse);
      setTimeout(() => pulse.remove(), 600);
    });
  }
}
