(() => {
  const root = document.querySelector("[data-track-page]");
  if (!root) return;

  const page = root.getAttribute("data-track-page") || location.pathname;
  const started = Date.now();
  let maxPercent = 0;
  let reachedEnd = false;
  let lastSent = 0;

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

  function measure() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable <= 0) {
      maxPercent = 100;
      return;
    }
    const percent = Math.round((window.scrollY / scrollable) * 100);
    const clamped = Math.max(0, Math.min(100, percent));
    if (clamped > maxPercent) maxPercent = clamped;
    if (maxPercent >= 98) reachedEnd = true;
  }

  const endMarker = document.getElementById("letterEnd");
  if (endMarker && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reachedEnd = true;
            maxPercent = 100;
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(endMarker);
  }

  function send() {
    lastSent = Date.now();
    measure();
    const payload = JSON.stringify({
      page,
      visitorId,
      sessionId,
      maxPercent,
      reachedEnd,
      secondsRead: Math.round((Date.now() - started) / 1000),
      device: window.innerWidth < 700 ? "mobile" : window.innerWidth < 1100 ? "tablet" : "desktop",
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
  });
  window.addEventListener("pagehide", report);

  measure();
})();
