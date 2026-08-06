(() => {
  const STORAGE_KEYS = {
    favorites: "laymyochin:favorites",
    history: "laymyochin:history",
  };

  const $ = (id) => document.getElementById(id);

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function normalize(value) {
    return String(value || "").toLowerCase().trim();
  }

  function loadList(key) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function saveList(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value.slice(0, 40)));
    } catch (error) {
    }
  }

  function miniItem(entry) {
    return `
      <article class="mini-item">
        <strong>${escapeHtml(entry.Sawlai)}</strong>
        <p>${escapeHtml(entry.Burmese)}</p>
        <div class="meta">${escapeHtml(entry.Us)}</div>
        <a class="link-button" href="dictionary.html">Open in dictionary</a>
      </article>
    `;
  }

  async function loadData() {
    const res = await fetch("data/laymyochin.json", { cache: "no-store" });
    const payload = await res.json();
    return Array.isArray(payload.laymyochin) ? payload.laymyochin : [];
  }

  function findEntry(entries, id) {
    const [index] = id.split(":");
    return entries[Number(index)] || null;
  }

  async function init() {
    const savedCount = $("profileSavedCount");
    const historyCount = $("profileHistoryCount");
    const favoritesList = $("profileFavoritesList");
    const historyList = $("profileHistoryList");
    if (!favoritesList || !historyList) return;

    const favorites = loadList(STORAGE_KEYS.favorites);
    const history = loadList(STORAGE_KEYS.history);
    if (savedCount) savedCount.textContent = String(favorites.length);
    if (historyCount) historyCount.textContent = String(history.length);

    const entries = await loadData().catch(() => []);
    const resolve = (id) => findEntry(entries, id);

    const favoriteEntries = favorites.map(resolve).filter(Boolean);
    const historyEntries = history.map(resolve).filter(Boolean);

    favoritesList.innerHTML = favoriteEntries.length
      ? favoriteEntries.map(miniItem).join("")
      : `<div class="meta">No saved words yet — bookmark a word from the dictionary.</div>`;

    historyList.innerHTML = historyEntries.length
      ? historyEntries.map(miniItem).join("")
      : `<div class="meta">No recent lookups yet — explore the dictionary to start.</div>`;
  }

  document.addEventListener("DOMContentLoaded", init);
})();
