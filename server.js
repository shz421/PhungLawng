const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");

const ROOT = path.resolve(__dirname);
const PORT = Number(process.env.PORT || 4173);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".ttf": "font/ttf",
  ".ico": "image/x-icon"
};

function safeResolve(requestPath) {
  const decoded = decodeURIComponent(requestPath);
  const normalized = path.normalize(decoded).replace(/^([/\\])+/, "");
  const resolved = path.resolve(ROOT, normalized);
  if (resolved !== ROOT && !resolved.startsWith(ROOT + path.sep)) {
    return null;
  }
  return resolved;
}

function send(res, statusCode, body, headers = {}) {
  res.writeHead(statusCode, {
    "Content-Security-Policy": "default-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'; img-src 'self' data:; font-src 'self'; style-src 'self'; script-src 'self'; connect-src 'self'",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-origin",
    "Cache-Control": statusCode === 200 ? "no-store" : "no-store",
    ...headers
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  if (!req.url || (req.method !== "GET" && req.method !== "HEAD")) {
    send(res, 405, "Method Not Allowed", { Allow: "GET, HEAD", "Content-Type": "text/plain; charset=utf-8" });
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  let pathname = url.pathname;
  if (pathname === "/") pathname = "/html/index.html";

  const barePage = pathname.match(/^\/([a-z-]+\.html)$/);
  if (barePage && fs.existsSync(path.join(ROOT, "html", barePage[1]))) {
    pathname = `/html/${barePage[1]}`;
  }

  const noExt = pathname.match(/^\/([a-z-]+)$/);
  if (noExt && fs.existsSync(path.join(ROOT, "html", `${noExt[1]}.html`))) {
    pathname = `/html/${noExt[1]}.html`;
  }

  const filePath = safeResolve(`.${pathname}`);
  if (!filePath) {
    send(res, 400, "Bad Request", { "Content-Type": "text/plain; charset=utf-8" });
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      send(res, 404, "Not Found", { "Content-Type": "text/plain; charset=utf-8" });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME[ext] || "application/octet-stream";
    fs.readFile(filePath, (readErr, body) => {
      if (readErr) {
        send(res, 500, "Internal Server Error", { "Content-Type": "text/plain; charset=utf-8" });
        return;
      }
      send(res, 200, req.method === "HEAD" ? "" : body, { "Content-Type": contentType });
    });
  });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`LaymyoChin Web running at http://127.0.0.1:${PORT}`);
});
