const historyMenuListEl = document.getElementById("historyMenuList");
const historyMenu = document.getElementById("historyMenu");
const historyMenuBackdrop = document.getElementById("historyMenuBackdrop");
const openHistoryMenu = document.getElementById("openHistoryMenu");
const closeHistoryMenu = document.getElementById("closeHistoryMenu");
const historyActiveTitle = document.getElementById("historyActiveTitle");
const historyActiveBody = document.getElementById("historyActiveBody");
const historyCount = document.getElementById("historyCount");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function cleanText(value) {
  return String(value || "")
    .replace(/\r/g, "")
    .replace(/<m>/g, "")
    .replace(/\*\*/g, "")
    .replace(/^[-*]\s?/gm, "• ")
    .replace(/~~/g, "")
    .trim();
}

async function loadSource() {
  const response = await fetch("data/history-full.txt", { cache: "no-store" });
  const text = await response.text();
  return text.replace(/\r/g, "");
}

function parseBlocks(raw) {
  const lines = raw.split("\n");
  const blocks = [];
  let current = null;

  for (const line of lines) {
    const label = line.trim();
    if (/^H\d+$/.test(label)) {
      if (current) blocks.push(current);
      current = { marker: label, lines: [] };
      continue;
    }
    if (!current) continue;
    current.lines.push(line);
  }

  if (current) blocks.push(current);

  return blocks
    .map((block) => {
      const body = cleanText(block.lines.join("\n"));
      const firstLine = block.lines.map((line) => cleanText(line)).find(Boolean) || block.marker;
      const titleMatch = firstLine.match(/^(?:[•]\s*)?(?:\*\*)?(.+?)(?:\*\*)?$/);
      const title = cleanText(titleMatch ? titleMatch[1] : firstLine).split("\n")[0];
      return { title, body, marker: block.marker };
    })
    .filter((item) => item.title || item.body);
}

function setMenuOpen(open) {
  if (!historyMenu || !historyMenuBackdrop || !openHistoryMenu) return;
  historyMenu.hidden = !open;
  historyMenuBackdrop.hidden = !open;
  historyMenu.classList.toggle("is-open", open);
  historyMenuBackdrop.classList.toggle("is-open", open);
  openHistoryMenu.setAttribute("aria-expanded", String(open));
  historyMenu.setAttribute("aria-hidden", String(!open));
}

function renderSection(section) {
  if (!historyActiveTitle || !historyActiveBody || !section) return;
  historyActiveTitle.textContent = section.title;
  historyActiveBody.textContent = section.body;
}

function renderBlocks(blocks) {
  if (!historyMenuListEl) return;

  historyCount.textContent = `${blocks.length} titles`;
  historyMenuListEl.innerHTML = blocks.map((block, index) => `
    <button class="history-menu-item" type="button" data-target-section="${index}">
      <span class="history-menu-title">${escapeHtml(block.title)}</span>
    </button>
  `).join("");

  if (blocks[0]) {
    renderSection(blocks[0]);
  }

  if (!historyMenuListEl.dataset.boundMenu) {
    historyMenuListEl.dataset.boundMenu = "true";
    historyMenuListEl.addEventListener("click", (event) => {
      const button = event.target.closest("[data-target-section]");
      if (!button) return;
      const section = blocks[Number(button.dataset.targetSection)];
      if (!section) return;
      renderSection(section);
      setMenuOpen(false);
    });
  }

  if (openHistoryMenu && !openHistoryMenu.dataset.boundMenu) {
    openHistoryMenu.dataset.boundMenu = "true";
    openHistoryMenu.addEventListener("click", () => {
      setMenuOpen(true);
      historyMenuListEl?.querySelector(".history-menu-item")?.focus();
    });
  }

  if (closeHistoryMenu && !closeHistoryMenu.dataset.boundMenu) {
    closeHistoryMenu.dataset.boundMenu = "true";
    closeHistoryMenu.addEventListener("click", () => setMenuOpen(false));
  }

  if (historyMenuBackdrop && !historyMenuBackdrop.dataset.boundMenu) {
    historyMenuBackdrop.dataset.boundMenu = "true";
    historyMenuBackdrop.addEventListener("click", () => setMenuOpen(false));
  }

  setMenuOpen(false);
}

loadSource()
  .then((raw) => renderBlocks(parseBlocks(raw)))
  .catch((error) => {
    if (historyActiveTitle) historyActiveTitle.textContent = "Failed to load history";
    if (historyActiveBody) historyActiveBody.textContent = error.message;
    if (historyMenuListEl) {
      historyMenuListEl.innerHTML = `<button class="history-menu-item" type="button" disabled>Unable to load titles</button>`;
    }
  });
