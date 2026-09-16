export async function listWords(db) {
  const { results } = await db
    .prepare("SELECT SAWLAI AS Sawlai, BURMESE AS Burmese, US AS Us FROM Dictionary WHERE APPROVE = 1 ORDER BY ID")
    .all();
  return results;
}

export async function recordRead(db, cf, body) {
  const page = String(body.page || "").slice(0, 120);
  const visitorId = String(body.visitorId || "").slice(0, 64);
  const sessionId = String(body.sessionId || "").slice(0, 64);
  if (!page || !visitorId || !sessionId) {
    throw new Error("page, visitorId and sessionId are required");
  }
  const maxPercent = Math.max(0, Math.min(100, Math.round(Number(body.maxPercent) || 0)));
  const reachedEnd = body.reachedEnd ? 1 : 0;
  const secondsRead = Math.max(0, Math.min(86400, Math.round(Number(body.secondsRead) || 0)));
  const device = String(body.device || "").slice(0, 40);
  await db
    .prepare(
      "INSERT INTO ReadSession (Page, VisitorId, SessionId, MaxPercent, ReachedEnd, SecondsRead, Country, City, Device) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(SessionId) DO UPDATE SET MaxPercent = MAX(ReadSession.MaxPercent, excluded.MaxPercent), ReachedEnd = MAX(ReadSession.ReachedEnd, excluded.ReachedEnd), SecondsRead = MAX(ReadSession.SecondsRead, excluded.SecondsRead)"
    )
    .bind(page, visitorId, sessionId, maxPercent, reachedEnd, secondsRead, cf.country || null, cf.city || null, device)
    .run();
}
