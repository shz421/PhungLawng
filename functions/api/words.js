import { listWords } from "../../worker/src/handlers.js";

export async function onRequestGet(context) {
  try {
    return Response.json({ laymyochin: await listWords(context.env.DB) });
  } catch (error) {
    return Response.json({ laymyochin: [], error: String(error) }, { status: 500 });
  }
}
