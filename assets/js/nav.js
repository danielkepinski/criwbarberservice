(function () {
  const header = document.querySelector(".site-header");
  const btn = document.querySelector(".menu-toggle");
  const nav = document.getElementById("primary-nav");

  if (!header || !btn || !nav) return;

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
    const expanded = btn.getAttribute("aria-expanded") === "true";
    expanded ? closeNav() : openNav();
  }

  btn.addEventListener("click", toggleNav);

  // Close when a nav link is clicked
  nav.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link) closeNav();
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });

  // Close if clicking outside the nav on mobile
  document.addEventListener("click", (e) => {
    if (!header.classList.contains("nav-open")) return;
    const inside = header.contains(e.target);
    if (!inside) closeNav();
  });

  // If resizing to desktop, ensure menu is closed/reset
  let lastW = window.innerWidth;
  window.addEventListener("resize", () => {
    const w = window.innerWidth;
    if (lastW <= 760 && w > 760) closeNav();
    lastW = w;
  });
})();
