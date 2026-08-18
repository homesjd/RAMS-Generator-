// ---------------------------------------------------------------
// draft-rams.js — Netlify serverless function
// Calls Claude to draft a first-pass Method Statement or Risk
// Assessment task entry, in the exact JSON shape the RAMS Builder
// already uses (see task-library.js). Output is a DRAFT ONLY —
// Donovan/Scott review and edit in the app before any sign-off.
//
// Requires env var ANTHROPIC_API_KEY set in Netlify site settings
// (Site configuration > Environment variables). Never expose this
// key client-side.
// ---------------------------------------------------------------

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-haiku-4-5";

const METHOD_STATEMENT_TOOL = {
  name: "submit_method_statement",
  description: "Submit the drafted method statement entry.",
  input_schema: {
    type: "object",
    properties: {
      title: { type: "string", description: "Short task title, e.g. 'Installation of Acoustic Baffles'." },
      scope: { type: "string", description: "One to two sentence scope of work statement." },
      steps: {
        type: "array",
        items: { type: "string" },
        description: "Ordered, practical on-site method steps, imperative style, matching UK commercial fit-out RAMS convention."
      },
      safety: {
        type: "array",
        items: { type: "string" },
        description: "Task-specific safety and compliance control points (PPE, access equipment, isolation, etc)."
      }
    },
    required: ["title", "scope", "steps", "safety"]
  }
};

const RISK_ASSESSMENT_TOOL = {
  name: "submit_risk_assessment",
  description: "Submit the drafted risk assessment task entry.",
  input_schema: {
    type: "object",
    properties: {
      task: { type: "string", description: "Short task/activity name." },
      personAtRisk: { type: "string", description: "e.g. 'Operatives, Site Visitors'" },
      hazards: {
        type: "array",
        minItems: 1,
        items: {
          type: "object",
          properties: {
            hazard: { type: "string" },
            whoAtRisk: { type: "string" },
            controls: { type: "string", description: "Existing controls, specific and practical, matching UK site RAMS convention." },
            likelihood: { type: "integer", minimum: 1, maximum: 5 },
            severity: { type: "integer", minimum: 1, maximum: 5 }
          },
          required: ["hazard", "whoAtRisk", "controls", "likelihood", "severity"]
        }
      }
    },
    required: ["task", "personAtRisk", "hazards"]
  }
};

const SYSTEM_PROMPT = `You are drafting a first-pass entry for Interior Impressions Ltd, a UK commercial fit-out subcontractor (partitioning, ceilings, glass, doors, kitchen joinery). Match the house style of their existing RAMS library: concise, practical, UK English, HSE-aligned. This is a DRAFT for a SHEQ manager to review and edit before it goes into a signed-off RAMS document, so be specific and realistic rather than generic boilerplate. Likelihood and severity are each rated 1-5 (1=lowest). If the project is confirmed as a Morgan Lovell site, stepladders are banned outright, do not suggest stepladders as a control or access method for Morgan Lovell work; use podium steps, mobile tower, or MEWP instead.`;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "ANTHROPIC_API_KEY not set. Add it in Netlify Site configuration > Environment variables, then redeploy." })
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON body." }) };
  }

  const { type, taskDescription, projectName, isMorganLovell } = payload;
  if (!type || !["method-statement", "risk-assessment"].includes(type)) {
    return { statusCode: 400, body: JSON.stringify({ error: "type must be 'method-statement' or 'risk-assessment'." }) };
  }
  if (!taskDescription || !taskDescription.trim()) {
    return { statusCode: 400, body: JSON.stringify({ error: "taskDescription is required." }) };
  }

  const tool = type === "method-statement" ? METHOD_STATEMENT_TOOL : RISK_ASSESSMENT_TOOL;

  const userMessage = [
    `Draft a ${type === "method-statement" ? "method statement" : "risk assessment task entry"} for the following task:`,
    `"${taskDescription.trim()}"`,
    projectName ? `Project: ${projectName}.` : null,
    isMorganLovell ? `This is a Morgan Lovell site — stepladders are banned, do not include them as a control or access method.` : null
  ].filter(Boolean).join("\n");

  try {
    const res = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 900,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userMessage }],
        tools: [tool],
        tool_choice: { type: "tool", name: tool.name }
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      return { statusCode: res.status, body: JSON.stringify({ error: `Anthropic API error: ${errText}` }) };
    }

    const data = await res.json();
    const toolUse = (data.content || []).find((b) => b.type === "tool_use" && b.name === tool.name);
    if (!toolUse) {
      return { statusCode: 502, body: JSON.stringify({ error: "No structured draft returned. Try rephrasing the task description." }) };
    }

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ draft: toolUse.input })
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: `Request to Anthropic failed: ${e.message}` }) };
  }
};
