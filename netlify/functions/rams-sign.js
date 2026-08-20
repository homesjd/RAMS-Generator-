// ---------------------------------------------------------------
// rams-sign.js — Netlify serverless function
// Adds a signature (preparer or operative) to a stored RAMS
// document. Preparer signature is a single slot (latest wins,
// e.g. if they re-sign after an edit). Operative signatures append
// to a list so multiple operatives can sign the same link.
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

  const { id, role, name, date, signatureImage } = payload;
  if (!id || !role || !name || !date || !signatureImage) {
    return { statusCode: 400, body: JSON.stringify({ error: "id, role, name, date and signatureImage are all required." }) };
  }
  if (!["preparer", "operative"].includes(role)) {
    return { statusCode: 400, body: JSON.stringify({ error: "role must be 'preparer' or 'operative'." }) };
  }

  try {
    const store = ramsStore();
    const record = await store.get(id, { type: "json" });
    if (!record) {
      return { statusCode: 404, body: JSON.stringify({ error: "No RAMS found for this link." }) };
    }

    const entry = { name: name.trim(), date, signatureImage, signedAt: new Date().toISOString() };

    if (role === "preparer") {
      record.signatures.preparer = entry;
    } else {
      if (!record.signatures.operatives) record.signatures.operatives = [];
      record.signatures.operatives.push(entry);
    }
    record.updatedAt = new Date().toISOString();

    await store.setJSON(id, record);

    return { statusCode: 200, headers: { "content-type": "application/json" }, body: JSON.stringify(record) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: `Sign failed: ${e.message}` }) };
  }
};
