(() => {
  // GitHub Pages resolves directory links such as `about/` automatically.
  // When the downloaded site is opened directly from a computer, convert
  // those links to explicit index.html paths so every page remains usable.
  if (window.location.protocol === "file:") {
    document.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href");

      if (
        !href ||
        href.startsWith("#") ||
        /^(?:https?:|mailto:|tel:)/i.test(href)
      ) {
        return;
      }

      const hashIndex = href.indexOf("#");
      const path = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
      const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";

      if (path.endsWith("/")) {
        link.setAttribute("href", `${path}index.html${hash}`);
      }
    });
  }

  const button = document.querySelector("[data-menu-button]");
  const menu = document.querySelector("[data-mobile-nav]");

  if (!button || !menu) return;

  const closeMenu = () => {
    button.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  button.addEventListener("click", () => {
    const willOpen = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(willOpen));
    menu.classList.toggle("is-open", willOpen);
    document.body.classList.toggle("menu-open", willOpen);
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1060) closeMenu();
  });
})();
