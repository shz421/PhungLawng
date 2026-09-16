import { listWords, recordRead } from "./handlers.js";

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

    url.host = "laymyo-api.pages.dev";
    return fetch(url, request);
  },
};
