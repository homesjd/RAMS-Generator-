// ---------------------------------------------------------------
// rams-save.js — Netlify serverless function
// Saves a RAMS document to Netlify Blobs and returns a short share
// ID. If an existing id is passed and that record has NO signatures
// yet, it's updated in place. If it HAS been signed (by the
// preparer or any operative), the content is instead saved as a
// brand-new record — protecting the signed copy from ever being
// silently changed under its own signatures.
// ---------------------------------------------------------------
const { getStore } = require("@netlify/blobs");

function ramsStore() {
  return getStore({
    name: "rams-documents",
    siteID: "a6fed072-1d48-45a3-9581-d4bed70cd68b",
    token: process.env.BLOBS_TOKEN
  });
}

function makeId() {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789"; // no 0/o/1/l/i ambiguity
  let id = "";
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

function hasAnySignature(record) {
  const sig = record && record.signatures;
  return !!(sig && (sig.preparer || (sig.operatives && sig.operatives.length)));
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
        if (!hasAnySignature(existing)) {
          // Safe to update in place — nobody has signed this yet.
          existing.data = data;
          existing.updatedAt = now;
          await store.setJSON(existingId, existing);
          return { statusCode: 200, headers: { "content-type": "application/json" }, body: JSON.stringify({ id: existingId, forked: false }) };
        }

        // Already signed — fork into a new record rather than
        // overwrite. The signed original is left untouched.
        let newId = makeId();
        for (let attempts = 0; attempts < 5; attempts++) {
          const clash = await store.get(newId, { type: "json" });
          if (!clash) break;
          newId = makeId();
        }
        const forkedRecord = {
          data,
          signatures: { preparer: null, operatives: [] },
          createdAt: now,
          updatedAt: now,
          supersedes: existingId
        };
        await store.setJSON(newId, forkedRecord);
        return {
          statusCode: 200,
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id: newId, forked: true, previousId: existingId })
        };
      }
      // fall through to create a new one if the id wasn't found
    }

    let id = makeId();
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

    return { statusCode: 200, headers: { "content-type": "application/json" }, body: JSON.stringify({ id, forked: false }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: `Save failed: ${e.message}` }) };
  }
};
