document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const btn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
if (btn && mobileNav) {
  btn.addEventListener("click", () => mobileNav.classList.toggle("open"));
  mobileNav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => mobileNav.classList.remove("open"));
  });
}

// Reveal on scroll
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReduced) {
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("show");
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("show"));
}
