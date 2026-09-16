import { recordRead } from "../../worker/src/handlers.js";

export async function onRequestPost(context) {
  try {
    await recordRead(context.env.DB, context.request.cf || {}, await context.request.json());
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 400 });
  }
}
