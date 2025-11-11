document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const btn = document.querySelector(".menu-toggle");
  const nav = document.getElementById("primary-nav");
  const OPEN_CLASS = "is-open";

  if (!header || !btn || !nav) return;

  function openNav() {
    header.classList.add("nav-open");
    nav.classList.add("is-open");
    document.body.classList.add("nav-open"); // NEW
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-label", "Close menu");
  }
  function closeNav() {
    header.classList.remove("nav-open");
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open"); // NEW
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Open menu");
  }
  function toggleNav() {
    nav.classList.contains(OPEN_CLASS) ? closeNav() : openNav();
  }

  btn.addEventListener("click", toggleNav);

  // Close when a nav link is clicked
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) closeNav();
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });

  // Click outside to close
  document.addEventListener("click", (e) => {
    if (!nav.classList.contains(OPEN_CLASS)) return;
    if (!header.contains(e.target)) closeNav();
  });

  // Reset on resize up to desktop
  let lastW = window.innerWidth;
  window.addEventListener("resize", () => {
    const w = window.innerWidth;
    if (lastW <= 760 && w > 760) closeNav();
    lastW = w;
  });
});
