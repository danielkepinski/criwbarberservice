// ==== Data: edit freely ====
const TEAM = [
  {
    name: "Nicky",
    role: "Owner / Barber",
    experienceYears: 8,
    photo: "assets/images/team/nicky.jpg",
    bio: "Founder of CRIW. Precision fades, sharp beard work, and a perfectionist eye for detail. enjoys going for a run and spending time with my family",
    specialties: ["Skin fades", "Beard sculpting", "Classic scissor cuts"],
    bookingUrl:
      "https://booksy.com/en-gb/72397_criw-barber-service_barber_1341496_worcester",
  },
  {
    name: "Josh",
    role: "Barber",
    experienceYears: 5,
    photo: "assets/images/team/josh.jpg",
    bio: "With around five years of experiance behind the chair, Josh has a real passion for creating sharp, detailed cuts. A classic taper being his signature style. having spent the last three years cutting in worcester, he's focused on perfecting his craft and delivering top quallity service to every client who sits in his chair. When hes not in the barbershop, you will find josh working on his golf swing, behind the decks DJ'ing or pottering about in his A3",
    specialties: ["Textured crops", "Taper fades", "curly hair textures"],
    bookingUrl:
      "https://booksy.com/en-gb/72397_criw-barber-service_barber_1341496_worcester",
  },
  {
    name: "Dan",
    role: "Barber",
    experienceYears: 11,
    photo: "assets/images/team/dan.jpg",
    bio: "Dan's been cutting hair for over 10 years and specializes in tapers, mullets, and cracking the occasional bad joke. He's also trained in mental health and suicide prevention with Here to Talk - always up for a proper chat and looking out for others. When he's not in the shop, you'll find him watching football (Up the Reds), gaming on PC, or spending time with his family - not necessarily in that order.",
    specialties: ["Low fades", "Short back & sides", "Long hair styles"],
    bookingUrl:
      "https://booksy.com/en-gb/72397_criw-barber-service_barber_1341496_worcester",
  },
  {
    name: "Bart",
    role: "Barber",
    experienceYears: 21,
    photo: "assets/images/team/bart.jpg",
    bio: "Bart's been barbering since 2004 and his passion for the craft really shows. He's known for his precision cuts, clean fades, and styles tailored perfectly to each client. With great attention to detail and a friendly, consistent approach, Bart always delivers top-quality service. Outside the shop, he's a family man who loves skiing, football, and relaxing with some PC gaming.",
    specialties: ["Classic cuts", "Side parts", "Beard line-ups"],
    bookingUrl:
      "https://booksy.com/en-gb/72397_criw-barber-service_barber_1341496_worcester",
  },
];

// ==== Build grid ====
const grid = document.getElementById("team-grid");
grid.innerHTML = TEAM.map(
  (p, i) => `
  <article class="card"
    tabindex="0"
    data-index="${i}"
    aria-label="${p.name}, ${p.role}">
    <img src="${p.photo}" alt="${p.name} — ${p.role}">
    <div class="info">
      <div>
        <div class="name">${p.name}</div>
        <div class="role">${p.role}</div>
      </div>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </article>
`
).join("");

// ==== Modal wiring ====
const backdrop = document.getElementById("modal-backdrop");
const closeBtn = document.getElementById("modal-close");
const photoEl = document.getElementById("modal-photo");
const titleEl = document.getElementById("modal-title");
const roleEl = document.getElementById("modal-role");
const expEl = document.getElementById("modal-exp");
const bioEl = document.getElementById("modal-bio");
const specsEl = document.getElementById("modal-specs");
const endTrap = document.getElementById("modal-end");

let lastFocus = null;

function openModal(idx) {
  const p = TEAM[idx];
  titleEl.textContent = p.name;
  roleEl.textContent = p.role;
  expEl.textContent = `Experience: ${p.experienceYears} yrs`;
  bioEl.textContent = p.bio;
  specsEl.textContent = p.specialties.join(" • ");
  photoEl.src = p.photo;
  photoEl.alt = `${p.name} — ${p.role}`;

  // Remove any previous "Book with me" button
  const existingBtn = document.querySelector(".booking-link");
  if (existingBtn) existingBtn.remove();

  // Add booking button if URL is present
  if (p.bookingUrl) {
    const btn = document.createElement("a");
    btn.href = p.bookingUrl;
    btn.target = "_blank";
    btn.rel = "noopener";
    btn.className = "booking-link";
    btn.textContent = `Book with ${p.name}`;
    document.querySelector(".modal-content").appendChild(btn);
  }

  lastFocus = document.activeElement;
  backdrop.classList.add("open");
  backdrop.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open"); // lock background scroll on mobile
  closeBtn.focus();
}

function closeModal() {
  backdrop.classList.remove("open");
  backdrop.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open"); // unlock background scroll
  if (lastFocus) lastFocus.focus();
}

// Open on click/Enter/Space
grid.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  openModal(card.dataset.index);
});
grid.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    const card = e.target.closest(".card");
    if (!card) return;
    e.preventDefault();
    openModal(card.dataset.index);
  }
});

// Close actions
closeBtn.addEventListener("click", closeModal);

// Mobile-safe backdrop close: click OR tap outside modal
backdrop.addEventListener("click", (e) => {
  const modalEl = document.querySelector(".modal");
  if (e.target === backdrop || !modalEl.contains(e.target)) closeModal();
});
backdrop.addEventListener(
  "touchstart",
  (e) => {
    const modalEl = document.querySelector(".modal");
    if (e.target === backdrop || !modalEl.contains(e.target)) {
      e.preventDefault(); // avoid ghost clicks
      closeModal();
    }
  },
  { passive: true }
);

// Escape key closes modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && backdrop.classList.contains("open")) closeModal();
});

// Simple focus trap inside modal
endTrap.addEventListener("focus", () => closeBtn.focus());
