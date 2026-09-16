export async function listWords(db) {
  const { results } = await db
    .prepare("SELECT SAWLAI AS Sawlai, BURMESE AS Burmese, US AS Us FROM Dictionary WHERE APPROVE = 1 ORDER BY ID")
    .all();
  return results;
}

export async function getPage(db, slug) {
  return db.prepare("SELECT Title, Html FROM Page WHERE Slug = ?").bind(slug).first();
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
  const paragraphTotal = Math.max(0, Math.min(100000, Math.round(Number(body.paragraphs) || 0)));
  const paragraph = Math.max(0, Math.min(100000, Math.round(Number(body.paragraph) || 0)));
  const maxParagraph = Math.max(0, Math.min(100000, Math.round(Number(body.maxParagraph) || 0)));
  await db
    .prepare(
      "INSERT INTO ReadSession (Page, VisitorId, SessionId, MaxPercent, ReachedEnd, SecondsRead, Country, City, Device, Paragraphs, MaxParagraph, LastParagraph, LastSeen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now')) ON CONFLICT(SessionId) DO UPDATE SET MaxPercent = MAX(ReadSession.MaxPercent, excluded.MaxPercent), ReachedEnd = MAX(ReadSession.ReachedEnd, excluded.ReachedEnd), SecondsRead = MAX(ReadSession.SecondsRead, excluded.SecondsRead), Paragraphs = excluded.Paragraphs, MaxParagraph = MAX(COALESCE(ReadSession.MaxParagraph, 0), excluded.MaxParagraph), LastParagraph = excluded.LastParagraph, LastSeen = excluded.LastSeen"
    )
    .bind(page, visitorId, sessionId, maxPercent, reachedEnd, secondsRead, cf.country || null, cf.city || null, device, paragraphTotal, maxParagraph, paragraph)
    .run();
}

export async function listReads(db, page, limit) {
  const { results } = await db
    .prepare(
      "SELECT ID, VisitorId, MaxPercent, ReachedEnd, SecondsRead, Country, City, Device, CreatedAt, Paragraphs, MaxParagraph, LastParagraph, LastSeen FROM ReadSession WHERE Page = ? ORDER BY ID DESC LIMIT ?"
    )
    .bind(page, Math.max(1, Math.min(500, Number(limit) || 200)))
    .all();
  return results;
}

export async function recordReply(db, cf, body) {
  const page = String(body.page || "").slice(0, 120);
  const visitorId = String(body.visitorId || "").slice(0, 64);
  const choice = String(body.choice || "").slice(0, 40);
  if (!page || !visitorId || !choice) {
    throw new Error("page, visitorId and choice are required");
  }
  if (choice !== "come_back" && choice !== "wait") {
    throw new Error("unknown choice");
  }
  const device = String(body.device || "").slice(0, 40);
  await db
    .prepare(
      "INSERT INTO Reply (Page, VisitorId, Choice, Country, City, Device, CreatedAt) VALUES (?, ?, ?, ?, ?, ?, datetime('now')) ON CONFLICT(VisitorId) DO UPDATE SET Choice = excluded.Choice, Country = excluded.Country, City = excluded.City, Device = excluded.Device, CreatedAt = excluded.CreatedAt"
    )
    .bind(page, visitorId, choice, cf.country || null, cf.city || null, device)
    .run();
}

export async function listReplies(db, page) {
  const { results } = await db
    .prepare("SELECT ID, VisitorId, Choice, Country, City, Device, CreatedAt FROM Reply WHERE Page = ? ORDER BY ID DESC")
    .bind(page)
    .all();
  return results;
}
