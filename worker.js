export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/words") {
      try {
        const { results } = await env.LMC.prepare(
          "SELECT SAWLAI AS Sawlai, BURMESE AS Burmese, US AS Us FROM Dictionary WHERE APPROVE = 1 ORDER BY ID"
        ).all();
        return Response.json({ laymyochin: results });
      } catch (error) {
        return Response.json({ laymyochin: [], error: String(error) }, { status: 500 });
      }
    }
    url.host = "laymyo-api.pages.dev";
    return fetch(url, request);
  },
};
