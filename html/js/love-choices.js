(() => {
  const wrap = document.getElementById("letterChoices");
  if (!wrap) return;

  const buttons = Array.from(wrap.querySelectorAll(".letter-choice"));
  const storeKey = "lmc-reply";

  function read(key) {
    try {
      return localStorage.getItem(key) || "";
    } catch (error) {
      return "";
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      return;
    }
  }

  function visitor() {
    const existing = read("lmc-visitor");
    if (existing) return existing;
    const fresh =
      window.crypto && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
    write("lmc-visitor", fresh);
    return fresh;
  }

  function mark(choice, lock) {
    buttons.forEach((button) => {
      button.classList.toggle("is-chosen", button.getAttribute("data-choice") === choice);
      button.disabled = !!lock;
    });
    if (lock) wrap.classList.add("is-answered");
  }

  function send(choice) {
    const payload = JSON.stringify({
      page: "love",
      visitorId: visitor(),
      choice,
      device: window.innerWidth < 700 ? "mobile" : window.innerWidth < 1100 ? "tablet" : "desktop",
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/reply", new Blob([payload], { type: "application/json" }));
      return;
    }
    fetch("/api/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (wrap.classList.contains("is-answered")) return;
      const choice = button.getAttribute("data-choice");
      if (!choice) return;
      mark(choice, true);
      write(storeKey, choice);
      send(choice);
    });
  });

  const saved = read(storeKey);
  if (saved) mark(saved, false);
})();
