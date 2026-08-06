(() => {
  const topbar = document.querySelector(".topbar");
  if (!topbar) return;

  let lastY = window.scrollY || 0;
  let ticking = false;
  let hidden = false;

  const menu = document.querySelector(".nav-menu");
  const menuToggle = document.querySelector(".nav-menu-toggle");
  const menuPanel = menu ? menu.querySelector(".nav-menu-panel") : null;
  let closeMenu = () => {};

  if (menu && menuToggle && menuPanel) {
    const setOpen = (open) => {
      menu.classList.toggle("is-open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
      if (open) positionMenu();
    };

    function positionMenu() {
      const rect = menuToggle.getBoundingClientRect();
      menuPanel.style.top = `${rect.bottom + 10}px`;
      menuPanel.style.right = `${Math.max(12, window.innerWidth - rect.right)}px`;
    }

    closeMenu = () => setOpen(false);

    menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      setOpen(!menu.classList.contains("is-open"));
    });

    document.addEventListener("click", (event) => {
      if (!menu.contains(event.target)) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    menuPanel.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    window.addEventListener("resize", () => {
      if (menu.classList.contains("is-open")) positionMenu();
    }, { passive: true });
    window.addEventListener("scroll", () => {
      if (menu.classList.contains("is-open")) positionMenu();
    }, { passive: true });
  }

  function update() {
    const y = window.scrollY || 0;
    const delta = y - lastY;
    const goingDown = delta > 6;
    const goingUp = delta < -6;
    const nearTop = y < 24;

    topbar.classList.toggle("is-scrolled", y > 24);

    if (nearTop || goingUp) {
      hidden = false;
    } else if (goingDown && y > 120) {
      hidden = true;
    }

    topbar.classList.toggle("is-hidden", hidden);
    if (hidden) closeMenu();
    lastY = y;
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }, { passive: true });

  window.addEventListener("resize", update, { passive: true });
  window.addEventListener("load", update);
  update();

  const revealElements = document.querySelectorAll(".reveal, .reveal-stagger");
  if (revealElements.length && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }
})();
