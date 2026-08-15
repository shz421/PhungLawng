export async function onRequestGet(context) {
  try {
    const { results } = await context.env.DB.prepare(
      "SELECT SAWLAI AS Sawlai, BURMESE AS Burmese, US AS Us FROM Dictionary WHERE APPROVE = 1 ORDER BY ID"
    ).all();
    return Response.json({ laymyochin: results });
  } catch (error) {
    return Response.json({ laymyochin: [], error: String(error) }, { status: 500 });
  }
}
