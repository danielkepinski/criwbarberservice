document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const btn = document.querySelector(".menu-toggle");
  const nav = document.getElementById("primary-nav");

  if (!header || !btn || !nav) {
    console.warn("[nav] Missing .site-header, .menu-toggle, or #primary-nav");
    return;
  }

  function openNav() {
    header.classList.add("nav-open");
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-label", "Close menu");
  }

  function closeNav() {
    header.classList.remove("nav-open");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Open menu");
  }

  function toggleNav() {
    btn.getAttribute("aria-expanded") === "true" ? closeNav() : openNav();
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

  // Close if clicking outside the header when open
  document.addEventListener("click", (e) => {
    if (header.classList.contains("nav-open") && !header.contains(e.target))
      closeNav();
  });

  // Reset when resizing up to desktop
  let lastW = window.innerWidth;
  window.addEventListener("resize", () => {
    const w = window.innerWidth;
    if (lastW <= 760 && w > 760) closeNav();
    lastW = w;
  });
});
