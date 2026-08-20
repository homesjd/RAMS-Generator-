// ---------------------------------------------------------------
// rams-get.js — Netlify serverless function
// Retrieves a stored RAMS document (and its signatures) by ID.
// ---------------------------------------------------------------
const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const id = (event.queryStringParameters || {}).id;
  if (!id) {
    return { statusCode: 400, body: JSON.stringify({ error: "id query parameter is required." }) };
  }

  try {
    const store = getStore("rams-documents");
    const record = await store.get(id, { type: "json" });
    if (!record) {
      return { statusCode: 404, body: JSON.stringify({ error: "No RAMS found for this link." }) };
    }
    return { statusCode: 200, headers: { "content-type": "application/json" }, body: JSON.stringify(record) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: `Lookup failed: ${e.message}` }) };
  }
};
