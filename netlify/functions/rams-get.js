// ---------------------------------------------------------------
// rams-get.js — Netlify serverless function
// Retrieves a stored RAMS document (and its signatures) by ID.
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
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const id = (event.queryStringParameters || {}).id;
  if (!id) {
    return { statusCode: 400, body: JSON.stringify({ error: "id query parameter is required." }) };
  }

  try {
    const store = ramsStore();
    const record = await store.get(id, { type: "json" });
    if (!record) {
      return { statusCode: 404, body: JSON.stringify({ error: "No RAMS found for this link." }) };
    }
    return { statusCode: 200, headers: { "content-type": "application/json" }, body: JSON.stringify(record) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: `Lookup failed: ${e.message}` }) };
  }
};
