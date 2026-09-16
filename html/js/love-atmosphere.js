(() => {
  const body = document.body;
  if (!body || body.getAttribute("data-track-page") !== "love") return;

  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const SVG = "http://www.w3.org/2000/svg";
  const PATH =
    "M23.6 0c-3.4 0-6.3 2.7-7.6 5.6C14.7 2.7 11.8 0 8.4 0 3.8 0 0 3.8 0 8.4c0 9.4 9.5 11.9 16 20.4 6.1-8.4 16-10.8 16-20.4C32 3.8 28.2 0 23.6 0z";
  const COLORS = ["#ff8aa8", "#ff9fc0", "#ffc46b", "#f7b8d0", "#e58ab8", "#ffd9a0", "#ffa9c4"];

  const rand = (min, max) => min + Math.random() * (max - min);
  const pick = (list) => list[Math.floor(Math.random() * list.length)];

  function heart() {
    const svg = document.createElementNS(SVG, "svg");
    svg.setAttribute("viewBox", "0 0 32 29");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    const path = document.createElementNS(SVG, "path");
    path.setAttribute("d", PATH);
    svg.appendChild(path);
    return svg;
  }

  function petals() {
    const layer = document.createElement("div");
    layer.className = "love-hearts";
    layer.setAttribute("aria-hidden", "true");

    const width = window.innerWidth;
    const count = width < 700 ? 9 : width < 1100 ? 14 : 20;

    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "love-heart";
      el.style.setProperty("--x", rand(1, 97).toFixed(2) + "%");
      el.style.setProperty("--s", rand(9, 23).toFixed(1) + "px");
      el.style.setProperty("--o", rand(0.16, 0.5).toFixed(2));
      el.style.setProperty("--drift", rand(-96, 96).toFixed(0) + "px");
      el.style.setProperty("--spin", rand(-170, 170).toFixed(0) + "deg");
      el.style.setProperty("--dur", rand(14, 32).toFixed(1) + "s");
      el.style.setProperty("--delay", (-rand(0, 32)).toFixed(1) + "s");
      el.style.setProperty("--c", pick(COLORS));
      if (Math.random() < 0.3) el.style.setProperty("--blur", rand(1, 2.6).toFixed(1) + "px");
      el.appendChild(heart());
      layer.appendChild(el);
    }

    body.appendChild(layer);

    document.addEventListener("visibilitychange", () => {
      layer.classList.toggle("is-paused", document.hidden);
    });
  }

  function aura() {
    const glow = document.createElement("div");
    glow.className = "love-aura";
    glow.setAttribute("aria-hidden", "true");
    body.appendChild(glow);
  }

  function burst(button) {
    const rect = button.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const total = 16;

    for (let i = 0; i < total; i++) {
      const el = document.createElement("span");
      el.className = "love-burst";
      const angle = (i / total) * Math.PI * 2 + rand(-0.24, 0.24);
      const distance = rand(80, 210);
      el.style.setProperty("--bx", cx.toFixed(0) + "px");
      el.style.setProperty("--by", cy.toFixed(0) + "px");
      el.style.setProperty("--dx", (Math.cos(angle) * distance).toFixed(0) + "px");
      el.style.setProperty("--dy", (Math.sin(angle) * distance - rand(24, 84)).toFixed(0) + "px");
      el.style.setProperty("--s", rand(10, 21).toFixed(0) + "px");
      el.style.setProperty("--sc", rand(0.45, 1.3).toFixed(2));
      el.style.setProperty("--rot", rand(-150, 150).toFixed(0) + "deg");
      el.style.setProperty("--dur", rand(0.95, 1.7).toFixed(2) + "s");
      el.style.setProperty("--c", pick(COLORS));
      el.appendChild(heart());
      body.appendChild(el);
      el.addEventListener("animationend", () => el.remove());
    }
  }

  function reveal() {
    const paragraphs = Array.from(document.querySelectorAll(".letter-body p"));
    if (!paragraphs.length) return;

    const line = () => window.innerHeight * 0.9;
    let waiting = paragraphs.filter((p) => p.getBoundingClientRect().top > line());
    if (!waiting.length) return;

    waiting.forEach((p) => p.classList.add("love-pending"));

    const check = () => {
      const limit = line();
      const ready = [];
      waiting = waiting.filter((p) => {
        if (p.getBoundingClientRect().top > limit) return true;
        ready.push(p);
        return false;
      });
      ready.forEach((p) => p.classList.add("love-in"));
    };

    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        check();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("hashchange", onScroll, { passive: true });
    check();
  }

  function start() {
    try {
      aura();
      petals();
      reveal();
      document.addEventListener(
        "click",
        (event) => {
          const button = event.target && event.target.closest ? event.target.closest(".letter-choice") : null;
          if (button) burst(button);
        },
        true
      );
    } catch (error) {
      document.querySelectorAll(".love-pending").forEach((p) => p.classList.remove("love-pending"));
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
