// ---------------------------------------------------------------
// rams-save.js — Netlify serverless function
// Saves a RAMS document to Netlify Blobs and returns a short share
// ID. If an existing id is passed, updates that record's data
// in place (used when the preparer edits after generating a link)
// without touching any signatures already collected.
// ---------------------------------------------------------------
const { getStore } = require("@netlify/blobs");

// The automatic site-linking that @netlify/blobs normally relies on
// isn't available in this environment, so we pass credentials
// explicitly. Site ID is not sensitive; the token comes from an
// environment variable set in Netlify's dashboard.
function ramsStore() {
  return getStore({
    name: "rams-documents",
    siteID: "a6fed072-1d48-45a3-9581-d4bed70cd68b",
    token: process.env.BLOBS_TOKEN
  });
}

function makeId() {
  // Short, URL-friendly, human-typeable if needed.
  const chars = "abcdefghjkmnpqrstuvwxyz23456789"; // no 0/o/1/l/i ambiguity
  let id = "";
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON body." }) };
  }

  const { data, id: existingId } = payload;
  if (!data || typeof data !== "object") {
    return { statusCode: 400, body: JSON.stringify({ error: "data object is required." }) };
  }

  try {
    const store = ramsStore();
    const now = new Date().toISOString();

    if (existingId) {
      const existing = await store.get(existingId, { type: "json" });
      if (existing) {
        existing.data = data;
        existing.updatedAt = now;
        await store.setJSON(existingId, existing);
        return { statusCode: 200, headers: { "content-type": "application/json" }, body: JSON.stringify({ id: existingId }) };
      }
      // fall through to create a new one if the id wasn't found
    }

    let id = makeId();
    // Avoid extremely unlikely collision.
    for (let attempts = 0; attempts < 5; attempts++) {
      const clash = await store.get(id, { type: "json" });
      if (!clash) break;
      id = makeId();
    }

    const record = {
      data,
      signatures: { preparer: null, operatives: [] },
      createdAt: now,
      updatedAt: now
    };
    await store.setJSON(id, record);

    return { statusCode: 200, headers: { "content-type": "application/json" }, body: JSON.stringify({ id }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: `Save failed: ${e.message}` }) };
  }
};
