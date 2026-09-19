const LABELS = {
  come_back: "ပြန်လာမှာလား",
  wait: "စောင့်ရဦးမှာလား",
};

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

function jump(paragraph) {
  return `https://laymyo.com/love?peek=1#p${paragraph}`;
}

function place(row) {
  const total = Number(row.Paragraphs) || 0;
  const last = Number(row.LastParagraph) || 0;
  const max = Number(row.MaxParagraph) || 0;
  if (!total) return `<span class="muted">no position</span>`;
  const reached = row.ReachedEnd
    ? `<span class="good">read to the end</span>`
    : `furthest <a href="${jump(max)}">&sect;${max}</a> of ${total}`;
  const stopped = last && last !== max ? ` &middot; last seen at <a href="${jump(last)}">&sect;${last}</a>` : "";
  return `${reached}${stopped}`;
}

function answer(replies) {
  if (!replies.length) {
    return `<section class="answer empty-answer"><span class="k">Her answer</span><span class="answer-none">No answer yet.</span></section>`;
  }
  const [newest, ...rest] = replies;
  const label = LABELS[newest.Choice] || newest.Choice;
  const where = [newest.City, newest.Country].filter(Boolean).join(", ");
  const meta = [where, newest.Device].filter(Boolean).join(" &middot; ");
  const older = rest
    .map((r) => {
      const w = [r.City, r.Country].filter(Boolean).join(", ");
      return `<li><strong>${esc(LABELS[r.Choice] || r.Choice)}</strong> &middot; ${clock(r.CreatedAt)}${w ? ` &middot; ${esc(w)}` : ""}</li>`;
    })
    .join("");
  return `<section class="answer">
    <span class="k">Her answer</span>
    <span class="answer-text">${esc(label)}</span>
    <span class="answer-meta">${clock(newest.CreatedAt)}${meta ? ` &middot; ${meta}` : ""}</span>
    ${older ? `<ul class="answer-older">${older}</ul>` : ""}
  </section>`;
}

export function renderStats(rows, replies) {
  const list = Array.isArray(replies) ? replies : [];
  const answered = new Set(list.map((r) => r.VisitorId).filter(Boolean));

  const body = rows.length
    ? rows
        .map(
          (r) => `<tr${answered.has(r.VisitorId) ? ` class="replied"` : ""}>
        <td class="when">${clock(r.CreatedAt)}</td>
        <td>${esc([r.City, r.Country].filter(Boolean).join(", ") || "-")}</td>
        <td>${esc(r.Device || "-")}</td>
        <td class="pct"><strong>${Number(r.MaxPercent) || 0}%</strong>${bar(r.MaxPercent)}${
            answered.has(r.VisitorId) ? `<span class="tag">answered</span>` : ""
          }</td>
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
@font-face { font-family: "Laymyo Myanmar"; src: url("https://laymyo.com/assets/fonts/pyidaungsubold.ttf") format("truetype"); font-display: swap }
:root { color-scheme: dark }
* { box-sizing: border-box }
body { margin: 0; background: #07111f; color: #e6edf7; font: 15px/1.55 system-ui, -apple-system, "Segoe UI", sans-serif }
main { max-width: 1080px; margin: 0 auto; padding: 32px 18px 80px }
h1 { font-size: 22px; margin: 0 0 4px }
.sub { color: #8ba0bd; margin: 0 0 26px; font-size: 13px }
.answer { background: #0f2036; border: 1px solid #2c4a75; border-left: 4px solid #ffb84d; border-radius: 12px; padding: 18px 20px; margin-bottom: 22px; display: flex; flex-direction: column; gap: 7px }
.answer .k { color: #8ba0bd; font-size: 12px; text-transform: uppercase; letter-spacing: .06em }
.answer-text { font-family: "Laymyo Myanmar", "Myanmar Text", "Padauk", system-ui, sans-serif; font-size: 30px; line-height: 1.7; color: #ffd79a }
.answer-meta { color: #b9c9de; font-size: 13px }
.answer-none { color: #8ba0bd; font-size: 15px }
.empty-answer { border-left-color: #1c2f4a }
.answer-older { margin: 8px 0 0; padding-left: 20px; color: #b9c9de; font-size: 13px }
.answer-older li { margin-top: 4px }
.answer-older strong { font-family: "Laymyo Myanmar", "Myanmar Text", "Padauk", system-ui, sans-serif; font-weight: 400; color: #e6edf7 }
table { width: 100%; border-collapse: collapse; background: #0d1b2e; border: 1px solid #1c2f4a; border-radius: 12px; overflow: hidden }
th, td { text-align: left; padding: 11px 13px; border-bottom: 1px solid #16263d; vertical-align: middle }
th { font-size: 11px; text-transform: uppercase; letter-spacing: .06em; color: #8ba0bd; font-weight: 600; background: #0a1526 }
tr:last-child td { border-bottom: 0 }
tr.replied td:first-child { box-shadow: inset 3px 0 0 #ffb84d }
a { color: #4f9cf9; text-decoration: none }
a:hover { text-decoration: underline }
.muted { color: #8ba0bd }
.good { color: #35c98a }
.bar { display: block; width: 84px; height: 5px; background: #16263d; border-radius: 3px; margin-top: 5px; overflow: hidden }
.bar span { display: block; height: 100%; background: #4f9cf9 }
.pct strong { font-weight: 600 }
.tag { display: inline-block; margin-top: 6px; padding: 1px 8px; border-radius: 999px; background: #2b2213; border: 1px solid #6b5320; color: #ffb84d; font-size: 11px; letter-spacing: .04em }
.where, .when, .time { font-size: 13px; color: #b9c9de }
.empty { text-align: center; color: #8ba0bd; padding: 34px }
@media (max-width: 720px) {
  th:nth-child(3), td:nth-child(3), th:nth-child(6), td:nth-child(6) { display: none }
  table { font-size: 13px }
  .answer-text { font-size: 24px }
}
</style>
</head>
<body>
<main>
  <h1>Reading activity</h1>
  <p class="sub">laymyo.com/love &middot; &sect; links jump straight to that paragraph &mdash; viewing them records nothing</p>
  ${answer(list)}
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
