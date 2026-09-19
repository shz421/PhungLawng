import { getPage, listReads, listReplies, listWords, recordRead, recordReply } from "./handlers.js";
import { renderStats } from "./stats.js";

function untracked(html) {
  return html.replace(/[ \t]*<script[^>]*\bsrc="js\/read-track\.js"[^>]*><\/script>\r?\n?/g, "");
}

function cookieValue(request, name) {
  const header = request.headers.get("Cookie") || "";
  for (const part of header.split(";")) {
    const trimmed = part.trim();
    const split = trimmed.indexOf("=");
    if (split === -1) continue;
    if (trimmed.slice(0, split) === name) return trimmed.slice(split + 1);
  }
  return "";
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/words") {
      try {
        return Response.json({ laymyochin: await listWords(env.LMC) });
      } catch (error) {
        return Response.json({ laymyochin: [], error: String(error) }, { status: 500 });
      }
    }

    if (url.pathname === "/api/read") {
      if (request.method !== "POST") {
        return Response.json({ error: "Method not allowed" }, { status: 405 });
      }
      try {
        await recordRead(env.LMC, request.cf || {}, await request.json());
        return Response.json({ ok: true });
      } catch (error) {
        return Response.json({ error: String(error) }, { status: 400 });
      }
    }

    if (url.pathname === "/api/reply") {
      if (request.method !== "POST") {
        return Response.json({ error: "Method not allowed" }, { status: 405 });
      }
      try {
        await recordReply(env.LMC, request.cf || {}, await request.json());
        return Response.json({ ok: true });
      } catch (error) {
        return Response.json({ error: String(error) }, { status: 400 });
      }
    }

    if (url.pathname === "/love/stats" || url.pathname === "/love/stats/") {
      const provided = url.searchParams.get("key") || cookieValue(request, "lmc_stats");
      if (!env.STATS_KEY || provided !== env.STATS_KEY) {
        return new Response("Not found", { status: 404 });
      }
      try {
        const [rows, replies] = await Promise.all([
          listReads(env.LMC, "love", url.searchParams.get("limit")),
          listReplies(env.LMC, "love"),
        ]);
        const headers = {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store",
          "X-Robots-Tag": "noindex, nofollow",
        };
        if (url.searchParams.get("key")) {
          headers["Set-Cookie"] =
            "lmc_stats=" + env.STATS_KEY + "; HttpOnly; Secure; SameSite=Strict; Path=/love/stats; Max-Age=2592000";
        }
        return new Response(renderStats(rows, replies), { headers });
      } catch (error) {
        return new Response(String(error), { status: 500 });
      }
    }

    if (url.pathname === "/love" || url.pathname === "/love/") {
      try {
        const page = await getPage(env.LMC, "love");
        if (!page) return new Response("Not found", { status: 404 });
        const peek = url.searchParams.get("peek") === "1";
        return new Response(peek ? untracked(page.Html) : page.Html, {
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "no-store",
            "X-Robots-Tag": "noindex, nofollow",
          },
        });
      } catch (error) {
        return new Response(String(error), { status: 500 });
      }
    }

    url.host = "laymyo-api.pages.dev";
    return fetch(url, request);
  },
};
