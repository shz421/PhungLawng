function esc(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function clock(value) {
  if (!value) return "";
  return `<time data-utc="${esc(value)}">${esc(value)}</time>`;
}

function bar(percent) {
  const width = Math.max(0, Math.min(100, Number(percent) || 0));
  return `<span class="bar"><span style="width:${width}%"></span></span>`;
}

function place(row) {
  const total = Number(row.Paragraphs) || 0;
  const last = Number(row.LastParagraph) || 0;
  const max = Number(row.MaxParagraph) || 0;
  if (!total) return `<span class="muted">no position</span>`;
  const reached = row.ReachedEnd
    ? `<span class="good">read to the end</span>`
    : `furthest <a href="https://laymyo.com/love#p${max}">&sect;${max}</a> of ${total}`;
  const stopped = last && last !== max ? ` &middot; last seen at <a href="https://laymyo.com/love#p${last}">&sect;${last}</a>` : "";
  return `${reached}${stopped}`;
}

function summary(rows) {
  const sessions = rows.length;
  const readers = new Set(rows.map((r) => r.VisitorId).filter(Boolean)).size;
  const finished = rows.filter((r) => r.ReachedEnd).length;
  const percents = rows.map((r) => Number(r.MaxPercent) || 0);
  const avgPercent = sessions ? Math.round(percents.reduce((a, b) => a + b, 0) / sessions) : 0;
  const times = rows.map((r) => Number(r.SecondsRead) || 0);
  const avgTime = sessions ? Math.round(times.reduce((a, b) => a + b, 0) / sessions) : 0;
  const fmt = (s) => (s >= 60 ? `${Math.floor(s / 60)}m ${s % 60}s` : `${s}s`);
  return [
    ["Sessions", sessions],
    ["Readers", readers],
    ["Read to end", `${finished}`],
    ["Average read", `${avgPercent}%`],
    ["Average time", fmt(avgTime)],
  ];
}

export function renderStats(rows) {
  const cards = summary(rows)
    .map(([label, value]) => `<div class="card"><span class="k">${esc(label)}</span><span class="v">${esc(value)}</span></div>`)
    .join("");

  const body = rows.length
    ? rows
        .map(
          (r) => `<tr>
        <td class="when">${clock(r.CreatedAt)}</td>
        <td>${esc([r.City, r.Country].filter(Boolean).join(", ") || "-")}</td>
        <td>${esc(r.Device || "-")}</td>
        <td class="pct"><strong>${Number(r.MaxPercent) || 0}%</strong>${bar(r.MaxPercent)}</td>
        <td class="where">${place(r)}</td>
        <td class="time">${Number(r.SecondsRead) || 0}s</td>
      </tr>`
        )
        .join("")
    : `<tr><td colspan="6" class="empty">No sessions recorded yet.</td></tr>`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Reading activity</title>
<style>
:root { color-scheme: dark }
* { box-sizing: border-box }
body { margin: 0; background: #07111f; color: #e6edf7; font: 15px/1.55 system-ui, -apple-system, "Segoe UI", sans-serif }
main { max-width: 1080px; margin: 0 auto; padding: 32px 18px 80px }
h1 { font-size: 22px; margin: 0 0 4px }
.sub { color: #8ba0bd; margin: 0 0 26px; font-size: 13px }
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-bottom: 28px }
.card { background: #0d1b2e; border: 1px solid #1c2f4a; border-radius: 12px; padding: 14px 16px; display: flex; flex-direction: column; gap: 6px }
.card .k { color: #8ba0bd; font-size: 12px; text-transform: uppercase; letter-spacing: .06em }
.card .v { font-size: 24px; font-weight: 600 }
table { width: 100%; border-collapse: collapse; background: #0d1b2e; border: 1px solid #1c2f4a; border-radius: 12px; overflow: hidden }
th, td { text-align: left; padding: 11px 13px; border-bottom: 1px solid #16263d; vertical-align: middle }
th { font-size: 11px; text-transform: uppercase; letter-spacing: .06em; color: #8ba0bd; font-weight: 600; background: #0a1526 }
tr:last-child td { border-bottom: 0 }
a { color: #4f9cf9; text-decoration: none }
a:hover { text-decoration: underline }
.muted { color: #8ba0bd }
.good { color: #35c98a }
.bar { display: block; width: 84px; height: 5px; background: #16263d; border-radius: 3px; margin-top: 5px; overflow: hidden }
.bar span { display: block; height: 100%; background: #4f9cf9 }
.pct strong { font-weight: 600 }
.where, .when, .time { font-size: 13px; color: #b9c9de }
.empty { text-align: center; color: #8ba0bd; padding: 34px }
@media (max-width: 720px) {
  th:nth-child(3), td:nth-child(3), th:nth-child(6), td:nth-child(6) { display: none }
  table { font-size: 13px }
}
</style>
</head>
<body>
<main>
  <h1>Reading activity</h1>
  <p class="sub">laymyo.com/love &middot; &sect; links jump straight to that paragraph in the letter</p>
  <section class="cards">${cards}</section>
  <table>
    <thead>
      <tr><th>Started</th><th>Location</th><th>Device</th><th>Read</th><th>Where they got to</th><th>Time</th></tr>
    </thead>
    <tbody>${body}</tbody>
  </table>
</main>
<script>
document.querySelectorAll("time[data-utc]").forEach((el) => {
  const raw = el.getAttribute("data-utc");
  const d = new Date(raw.replace(" ", "T") + "Z");
  if (!isNaN(d)) el.textContent = d.toLocaleString();
});
</script>
</body>
</html>`;
}
