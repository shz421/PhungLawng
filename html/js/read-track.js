(() => {
  const root = document.querySelector("[data-track-page]");
  if (!root) return;

  const page = root.getAttribute("data-track-page") || location.pathname;
  const blocks = Array.from(document.querySelectorAll(".letter-body p"));
  let maxPercent = 0;
  let reachedEnd = false;
  let maxParagraph = 0;
  let lastParagraph = 0;
  let lastSent = 0;
  let visibleMs = 0;
  let lastTick = Date.now();

  const randomId = () =>
    window.crypto && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;

  function stored(key) {
    try {
      const existing = localStorage.getItem(key);
      if (existing) return existing;
      const value = randomId();
      localStorage.setItem(key, value);
      return value;
    } catch (error) {
      return randomId();
    }
  }

  const visitorId = stored("lmc-visitor");
  const sessionId = randomId();

  function accumulate() {
    const now = Date.now();
    visibleMs += now - lastTick;
    lastTick = now;
  }

  function measure() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable <= 0) {
      maxPercent = 100;
    } else {
      const percent = Math.round((window.scrollY / scrollable) * 100);
      const clamped = Math.max(0, Math.min(100, percent));
      if (clamped > maxPercent) maxPercent = clamped;
    }
    if (maxPercent >= 98) reachedEnd = true;

    if (blocks.length) {
      const line = window.innerHeight * 0.4;
      let index = 1;
      for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].getBoundingClientRect().top <= line) index = i + 1;
        else break;
      }
      lastParagraph = index;
      if (index > maxParagraph) maxParagraph = index;
    }
  }

  const endMarker = document.getElementById("letterEnd");
  if (endMarker && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reachedEnd = true;
            maxPercent = 100;
            if (blocks.length) {
              maxParagraph = blocks.length;
              lastParagraph = blocks.length;
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(endMarker);
  }

  function send() {
    accumulate();
    lastSent = Date.now();
    measure();
    const payload = JSON.stringify({
      page,
      visitorId,
      sessionId,
      maxPercent,
      reachedEnd,
      secondsRead: Math.round(visibleMs / 1000),
      device: window.innerWidth < 700 ? "mobile" : window.innerWidth < 1100 ? "tablet" : "desktop",
      paragraph: lastParagraph,
      maxParagraph,
      paragraphs: blocks.length,
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/read", new Blob([payload], { type: "application/json" }));
      return;
    }
    fetch("/api/read", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  }

  function report() {
    if (Date.now() - lastSent < 1000) return;
    send();
  }

  window.addEventListener("scroll", measure, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") report();
    else lastTick = Date.now();
  });
  window.addEventListener("pagehide", report);
  setInterval(() => {
    if (document.visibilityState === "visible") report();
  }, 15000);

  measure();
})();
