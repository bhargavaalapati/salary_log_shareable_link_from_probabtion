(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);

  const hero = $("#hero");
  const reveal = $("#reveal");
  const openBtn = $("#openBtn");
  const replayBtn = $("#replayBtn");
  const dateText = $("#dateText");

  const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ─────────────────────────────
  // DATE
  // ─────────────────────────────
  const formatDate = () => {
    const now = new Date();

    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(now).toUpperCase();
  };

  dateText.textContent = formatDate();

  // ─────────────────────────────
  // FLOATING PETALS
  // ─────────────────────────────
  function createPetals() {
    if (prefersReducedMotion) return;

    const container = $(".petals");

    const count = window.innerWidth < 600 ? 12 : 18;

    for (let i = 0; i < count; i++) {
      const petal = document.createElement("i");

      petal.className = "petal";

      petal.style.left = `${Math.random() * 100}%`;

      petal.style.setProperty(
        "--drift",
        `${(Math.random() - 0.5) * 180}px`
      );

      petal.style.animationDuration =
        `${9 + Math.random() * 10}s`;

      petal.style.animationDelay =
        `${Math.random() * -12}s`;

      petal.style.opacity =
        `${0.15 + Math.random() * 0.35}`;

      container.appendChild(petal);
    }
  }

  // ─────────────────────────────
  // OPEN REVEAL
  // ─────────────────────────────
  function openPage() {
    openBtn.setAttribute("aria-expanded", "true");

    reveal.setAttribute("aria-hidden", "false");

    hero.style.display = "none";

    reveal.classList.add("show");

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  // ─────────────────────────────
  // REPLAY
  // ─────────────────────────────
  function replay() {
    reveal.classList.remove("show");

    reveal.setAttribute("aria-hidden", "true");

    hero.style.display = "flex";

    openBtn.setAttribute("aria-expanded", "false");

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  // ─────────────────────────────
  // EVENTS
  // ─────────────────────────────
  openBtn.addEventListener("click", openPage);

  replayBtn.addEventListener("click", replay);

  // ─────────────────────────────
  // INITIALIZE
  // ─────────────────────────────
  createPetals();
})();
