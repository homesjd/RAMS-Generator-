// ---------------------------------------------------------------
// draft-rams.js — Netlify serverless function
// Calls Claude to draft a first-pass Method Statement, Risk
// Assessment, or extract project details from a pasted brief, in
// the exact JSON shape the RAMS Builder already uses. Output is a
// DRAFT ONLY — Donovan/Scott review and edit in the app before any
// sign-off.
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

const PROJECT_BRIEF_TOOL = {
  name: "submit_project_brief",
  description: "Submit project details extracted from the pasted brief/email text. Omit any field not clearly stated in the text — never guess or invent a value.",
  input_schema: {
    type: "object",
    properties: {
      docTitle: { type: "string", description: "Short document/task title, only if the text gives one." },
      projectName: { type: "string" },
      projectNumber: { type: "string", description: "Contract/project/job number if stated." },
      location: { type: "string", description: "Site address or location." },
      startDate: { type: "string", description: "As written in the text, do not reformat or guess a date not given." },
      duration: { type: "string" },
      otherContractors: { type: "string", description: "Main contractor / other trade contractor names and contacts mentioned." },
      personnelCount: { type: "string", description: "Number of operatives, only if stated, e.g. '6-8'." },
      onsiteSupervisor: { type: "string", description: "Name and/or phone if given." },
      scope: { type: "array", items: { type: "string" }, description: "Scope of work bullet points, only what's actually described." },
      materials: { type: "array", items: { type: "string" } },
      plantEquipment: { type: "array", items: { type: "string" } },
      permits: {
        type: "array",
        items: {
          type: "object",
          properties: { item: { type: "string" }, value: { type: "string" } },
          required: ["item", "value"]
        },
        description: "Only permits/site arrangements explicitly mentioned (e.g. hot works, confined space, delivery restrictions)."
      }
    },
    required: []
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

const SYSTEM_PROMPT = `You are drafting a first-pass entry for Interior Impressions Ltd, a UK commercial fit-out subcontractor (partitioning, ceilings, glass, doors, kitchen joinery). Match the house style of their existing RAMS library: concise, practical, UK English, HSE-aligned. This is a DRAFT for a SHEQ manager to review and edit before it goes into a signed-off RAMS document, so be specific and realistic rather than generic boilerplate. Likelihood and severity are each rated 1-5 (1=lowest). If the project's main contractor is known to prohibit stepladders on site, do not suggest stepladders as a control or access method; use podium steps, mobile tower, or MEWP instead.`;

const BRIEF_SYSTEM_PROMPT = `You are extracting project details from a pasted brief, RFQ, or client email for Interior Impressions Ltd, a UK commercial fit-out subcontractor. Only include a field if it is explicitly stated or unambiguously clear in the text. Never guess, infer, or invent a project name, number, date, person's name, or figure that is not actually present in the text — omit the field entirely instead. Do not reformat dates beyond tidying obvious typos. This extraction feeds directly into a health and safety document, accuracy matters more than completeness.`;

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

  const { type, taskDescription, projectName, stepladdersBanned } = payload;
  const VALID_TYPES = ["method-statement", "risk-assessment", "project-brief"];
  if (!type || !VALID_TYPES.includes(type)) {
    return { statusCode: 400, body: JSON.stringify({ error: `type must be one of ${VALID_TYPES.join(", ")}.` }) };
  }
  if (!taskDescription || !taskDescription.trim()) {
    return { statusCode: 400, body: JSON.stringify({ error: "taskDescription is required." }) };
  }

  const tool = type === "method-statement" ? METHOD_STATEMENT_TOOL
    : type === "risk-assessment" ? RISK_ASSESSMENT_TOOL
    : PROJECT_BRIEF_TOOL;

  const systemPrompt = type === "project-brief" ? BRIEF_SYSTEM_PROMPT : SYSTEM_PROMPT;

  const userMessage = type === "project-brief"
    ? `Extract the project details from this brief/email text:\n\n${taskDescription.trim()}`
    : [
        `Draft a ${type === "method-statement" ? "method statement" : "risk assessment task entry"} for the following task:`,
        `"${taskDescription.trim()}"`,
        projectName ? `Project: ${projectName}.` : null,
        stepladdersBanned ? `Stepladders are banned on this site — do not include them as a control or access method.` : null
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
        system: systemPrompt,
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
