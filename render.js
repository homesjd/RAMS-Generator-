// ---------------------------------------------------------------
// RAMS render engine v2 — pure template function, no AI involved.
// Matches the Donovan Brooks / Breakthrough Properties gold-standard
// template: 5x5 Likelihood x Severity risk matrix, three-tier PPE,
// full emergency/permit/training detail, COSHH library lookups.
// ---------------------------------------------------------------

function esc(s){
  if (s === undefined || s === null) return "";
  return String(s)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

function listOrEmpty(arr, emptyText){
  const items = (arr || []).filter(x => x && String(x).trim());
  if (!items.length) return `<p class="doc-empty-note">${esc(emptyText || "None specified.")}</p>`;
  return `<ul class="doc-list">${items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`;
}

function orderedListOrEmpty(arr, emptyText){
  const items = (arr || []).filter(x => x && String(x).trim());
  if (!items.length) return `<p class="doc-empty-note">${esc(emptyText || "None specified.")}</p>`;
  return `<ol class="doc-list">${items.map(i => `<li>${esc(i)}</li>`).join("")}</ol>`;
}

function textOrDash(v){
  const s = (v || "").toString().trim();
  return s ? esc(s) : "—";
}

// ---------------- Risk matrix helpers ----------------
const LIKELIHOOD_LABELS = {1:"Very Unlikely",2:"Unlikely",3:"Possible",4:"Likely",5:"Very Likely"};
const SEVERITY_LABELS = {1:"Negligible",2:"Minor",3:"Moderate",4:"Major",5:"Extreme"};

function rrBand(score){
  if (score >= 15) return {label:"High", cls:"rr-high"};
  if (score >= 6) return {label:"Medium", cls:"rr-medium"};
  return {label:"Low", cls:"rr-low"};
}

function renderRiskMatrixKey(){
  return `
  <table class="doc-risk-matrix">
    <caption>Risk Matrix (Likelihood &times; Severity = Risk Rating, 1&ndash;25)</caption>
    <tr><td class="rm-corner" rowspan="2" colspan="2"></td><td colspan="5" class="rm-head">Likelihood</td></tr>
    <tr>${[1,2,3,4,5].map(n=>`<td class="rm-head">${n}<br><span class="rm-sub">${LIKELIHOOD_LABELS[n]}</span></td>`).join("")}</tr>
    ${[5,4,3,2,1].map(sev => `
      <tr>
        ${sev===5?`<td class="rm-head rm-sev-label" rowspan="5">Severity</td>`:""}
        <td class="rm-head">${sev}<br><span class="rm-sub">${SEVERITY_LABELS[sev]}</span></td>
        ${[1,2,3,4,5].map(lik => {
          const score = sev*lik;
          const band = rrBand(score);
          return `<td class="rm-cell ${band.cls}">${score}</td>`;
        }).join("")}
      </tr>`).join("")}
  </table>`;
}

function renderWorkforceTable(workforce){
  const rows = (workforce || []).filter(w => w && w.name);
  if (!rows.length) return `<p class="doc-empty-note">No workforce details provided.</p>`;
  const tags = (w) => {
    const t = [];
    if (w.role) t.push(esc(w.role));
    if (w.sssts) t.push("SSSTS");
    if (w.smsts) t.push("SMSTS");
    if (w.firstAid) t.push("First Aider");
    if (w.cscs) t.push("CSCS Card Holder");
    return t.join(" · ");
  };
  return `
  <table class="doc-table">
    <tr><th class="label">Name</th><th class="label">Role / Qualifications</th><th class="label">Contact</th></tr>
    ${rows.map(w => `<tr><td>${esc(w.name)}</td><td>${tags(w) || "—"}</td><td>${esc(w.phone || "—")}</td></tr>`).join("")}
  </table>`;
}

function renderPermits(permits, permitType, issuedBy){
  const rows = (permits || []).filter(p => p && p.item);
  const body = rows.length
    ? `<table class="doc-table">${rows.map(p => `<tr><td class="label">${esc(p.item)}</td><td>${esc(p.value || "Not Applicable")}</td></tr>`).join("")}</table>`
    : `<p class="doc-empty-note">No permits identified for this task.</p>`;
  return `${body}
  <table class="doc-table" style="margin-top:8px;">
    <tr><td class="label" style="width:33%;">Permit Type:</td><td>${textOrDash(permitType)}</td></tr>
    <tr><td class="label">Issued By:</td><td>${textOrDash(issuedBy)}</td></tr>
  </table>`;
}

function renderMethodStatements(methodStatements){
  const blocks = (methodStatements || []).filter(m => m && m.title);
  if (!blocks.length) return `<p class="doc-empty-note">No method statements added.</p>`;
  return blocks.map(m => `
    <div class="doc-ms-block">
      <p class="doc-ms-title">Method Statement — ${esc(m.title)}</p>
      <p class="doc-subhead" style="margin-top:0;">1. Scope of Work</p>
      <p style="font-size:13px; margin:0 0 10px;">${esc(m.scope || "")}</p>
      <p class="doc-subhead">2. Method</p>
      ${orderedListOrEmpty(m.steps, "No steps specified.")}
      <p class="doc-subhead">3. Safety &amp; Compliance</p>
      ${listOrEmpty(m.safety, "No specific safety points specified.")}
    </div>
  `).join("");
}

function renderRiskRegisterSummary(riskRegister){
  const tasks = (riskRegister || []).filter(t => t && t.task);
  if (!tasks.length) return `<p class="doc-empty-note">No risk assessment tasks added.</p>`;
  const mid = Math.ceil(tasks.length / 2);
  const colA = tasks.slice(0, mid);
  const colB = tasks.slice(mid);
  const col = arr => `<ul class="doc-list">${arr.map(t => `<li>${esc(t.task)}</li>`).join("")}</ul>`;
  return `
  <table class="doc-table">
    <tr>
      <td class="label" style="width:15%;">2.0</td>
      <td class="label" style="width:20%;">RISK ASSESSMENTS ATTACHED:</td>
      <td style="width:32.5%;">${col(colA)}</td>
      <td style="width:32.5%;">${col(colB)}</td>
    </tr>
  </table>`;
}

function renderStructuredRow(num, label, value){
  return `<tr><td class="label" style="width:8%;">${esc(num)}</td><td class="label" style="width:22%;">${esc(label)}</td><td colspan="2">${textOrDash(value)}</td></tr>`;
}

// ---------------- COSHH (library-aware) ----------------
function renderCoshh(coshhSelections){
  const names = (coshhSelections || []).filter(x => x && String(x).trim());
  if (!names.length) return `<p class="doc-empty-note">None identified for this task.</p>`;
  return names.map(name => {
    const entry = (typeof COSHH_LIBRARY !== "undefined") ? COSHH_LIBRARY[name] : null;
    if (!entry) {
      return `<div class="doc-coshh-block"><p class="doc-coshh-name">${esc(name)}</p><p class="doc-empty-note">No library data — custom entry.</p></div>`;
    }
    return `
    <div class="doc-coshh-block">
      <p class="doc-coshh-name">${esc(name)} ${entry.reference ? `<span class="doc-coshh-ref">Ref: ${esc(entry.reference)}</span>` : ""}</p>
      ${entry.composition ? `<p class="doc-coshh-comp"><b>Composition:</b> ${esc(entry.composition)}</p>` : ""}
      <table class="doc-risk-table doc-coshh-table">
        <tr><th style="width:12%;">Route</th><th>First Aid</th><th>Handling / PPE</th></tr>
        <tr><td>Eyes</td><td>${textOrDash(entry.firstAid && entry.firstAid.eyes)}</td><td>${textOrDash(entry.ppe && entry.ppe.eye)}</td></tr>
        <tr><td>Skin</td><td>${textOrDash(entry.firstAid && entry.firstAid.skin)}</td><td>${textOrDash(entry.ppe && entry.ppe.skin)}</td></tr>
        <tr><td>Inhalation</td><td>${textOrDash(entry.firstAid && entry.firstAid.inhalation)}</td><td>${textOrDash(entry.ppe && entry.ppe.respiratory)}</td></tr>
        <tr><td>Hand contact</td><td>—</td><td>${textOrDash(entry.ppe && entry.ppe.hand)}</td></tr>
        <tr><td>Ingestion</td><td>${textOrDash(entry.firstAid && entry.firstAid.ingestion)}</td><td>—</td></tr>
      </table>
      <p class="doc-coshh-foot"><b>Storage/Spill:</b> ${textOrDash(entry.storageSpill)} &nbsp;|&nbsp; <b>Exposure limit:</b> ${textOrDash(entry.exposureLimit)}</p>
      <p class="doc-coshh-foot"><b>Transport:</b> ${textOrDash(entry.transport)} &nbsp;|&nbsp; <b>Disposal:</b> ${textOrDash(entry.disposal)}</p>
    </div>`;
  }).join("");
}

// ---------------- Three-tier PPE ----------------
function renderPpeThreeTier(ppe){
  ppe = ppe || {};
  const colourRow = (label, value, lib) => {
    if (!value) return "";
    const desc = (typeof lib !== "undefined" && lib[value]) ? ` — ${lib[value]}` : "";
    return `<tr><td class="label" style="width:25%;">${label}:</td><td>${esc(value)}${esc(desc)}</td></tr>`;
  };
  const refDocs = (typeof PPE_REFERENCED_DOCUMENTS !== "undefined") ? PPE_REFERENCED_DOCUMENTS : [];
  return `
  <table class="doc-table">
    <tr><td class="label" style="width:25%;">Mandatory Site PPE:</td><td>${listOrEmpty(ppe.mandatory, "No mandatory PPE specified.")}</td></tr>
    <tr><td class="label">Task-Specific PPE:</td><td>${listOrEmpty(ppe.taskSpecific, "No task-specific PPE specified.")}</td></tr>
    <tr><td class="label">Respiratory Protection (RPE):</td><td>${listOrEmpty(ppe.rpe, "No RPE specified.")}</td></tr>
    ${colourRow("Hard Hat Colour", ppe.hardHatColour, (typeof PPE_HARD_HAT_COLOURS !== "undefined") ? PPE_HARD_HAT_COLOURS : null)}
    ${colourRow("Hi-Vis Colour", ppe.hiVisColour, (typeof PPE_HIVIS_COLOURS !== "undefined") ? PPE_HIVIS_COLOURS : null)}
  </table>
  ${refDocs.length ? `
  <p class="doc-subhead">Referenced PPE Standards</p>
  <table class="doc-table" style="font-size:12px;">
    ${refDocs.map(d => `<tr><td class="label" style="width:25%;">${esc(d.ref)}</td><td>${esc(d.title)}</td></tr>`).join("")}
  </table>` : ""}`;
}

// ---------------- Risk task blocks (5x5 matrix) ----------------
function renderRiskTaskBlocks(riskRegister){
  const tasks = (riskRegister || []).filter(t => t && t.task);
  if (!tasks.length) return "";
  return tasks.map(t => {
    const hazards = (t.hazards || []).filter(h => h && h.hazard);
    const hazardRows = hazards.length
      ? hazards.map(h => {
          const lik = Number(h.likelihood) || 1;
          const sev = Number(h.severity) || 1;
          const score = lik*sev;
          const band = rrBand(score);
          const rLik = Number(h.residualLikelihood) || 1;
          const rSev = Number(h.residualSeverity) || 1;
          const rScore = rLik*rSev;
          const rBand = rrBand(rScore);
          return `<tr>
            <td>${esc(h.hazard)}</td>
            <td>${esc(h.whoAtRisk || "Operatives")}</td>
            <td class="${band.cls}" style="text-align:center; font-weight:bold;">${lik}&times;${sev}=${score}<br><span class="rm-sub">${band.label}</span></td>
            <td>${esc(h.controls || "")}</td>
            <td class="${rBand.cls}" style="text-align:center; font-weight:bold;">${rLik}&times;${rSev}=${rScore}<br><span class="rm-sub">${rBand.label}</span></td>
          </tr>`;
        }).join("")
      : `<tr><td colspan="5" class="doc-empty-note">No hazards listed for this task.</td></tr>`;
    return `
    <div class="doc-risk-block">
      <div class="doc-risk-task-header">Task: ${esc(t.task)}</div>
      <table class="doc-risk-table doc-hazard-table">
        <tr><th>Hazard</th><th>Who Might Be Harmed</th><th>Initial Risk<br><span class="rm-sub">(before controls)</span></th><th>Control Measures</th><th>RR<br><span class="rm-sub">(residual, after controls)</span></th></tr>
        ${hazardRows}
      </table>
      <div class="doc-risk-meta-row"><b>Person at Risk:</b> ${textOrDash(t.personAtRisk || "Operatives")}</div>
      <div class="doc-risk-meta-row"><b>Review Date:</b> ${textOrDash(t.reviewDate)} — <b>Next Review:</b> ${textOrDash(t.nextReview)}</div>
    </div>`;
  }).join("");
}

// ---------------- Sign-off record tables (paper backup) ----------------
function renderSignOffRecords(){
  const msRows = Array.from({length:8}).map(() => `<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>`).join("");
  const raRows = Array.from({length:8}).map(() => `<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>`).join("");
  return `
  <div class="doc-section-box">
    <p class="doc-section-title navy">SIGN OFF — METHOD STATEMENT RECORD</p>
    <p style="font-size:12.5px; margin:0 0 8px;">I have read &amp; understood the contents of this Method Statement &amp; agree to follow the defined control measures. Anything I did not understand has been explained to me to my satisfaction.</p>
    <table class="doc-risk-table">
      <tr><th>Name</th><th>Occupation</th><th>Date</th><th>Comment</th></tr>
      ${msRows}
    </table>
  </div>
  <div class="doc-section-box">
    <p class="doc-section-title navy">SIGN OFF — RISK ASSESSMENT RECORD</p>
    <p style="font-size:12.5px; margin:0 0 8px;">I have read &amp; understood the contents of the Risk Assessment &amp; agree to follow the defined control measures. Anything I did not understand has been explained to me to my satisfaction.</p>
    <table class="doc-risk-table">
      <tr><th>Name</th><th>Signed</th><th>Date</th></tr>
      ${raRows}
    </table>
  </div>`;
}

// ---------------- Tier 2 review banner & compliance notes ----------------
function renderTier2Banner(tier2){
  if (!tier2 || !tier2.required) return "";
  return `
  <div class="doc-tier2-banner">
    <b>⚠ TIER 2 REVIEW REQUIRED</b> — ${esc(tier2.reason || "This RAMS contains technical elements (e.g. temporary works, electrical, lifting operations) that should receive a second, independent technical review before works commence.")}
  </div>`;
}
function renderStepladderBanner(flag){
  if (!flag || !flag.flagged) return "";
  return `
  <div class="doc-tier2-banner">
    <b>⚠ STEPLADDER USE NOT YET CONFIRMED</b> — This RAMS references stepladders. Many main contractors now ban them outright, including as a last resort. Confirm current site policy before approval — use podium/platform steps, a mobile tower, or a MEWP where stepladders are prohibited.
  </div>`;
}
function renderComplianceNotes(notes){
  const items = (notes || []).filter(x => x && x.trim());
  if (!items.length) return "";
  return `
  <div class="doc-section-box">
    <p class="doc-section-title navy">COMPLIANCE NOTES</p>
    ${listOrEmpty(items)}
  </div>`;
}

// ---------------- Digital signatures (preparer + operatives) ----------------
function renderSignatureBlock(label, entry){
  if (!entry) {
    return `<div class="doc-sig-row"><span class="doc-sig-label">${esc(label)}:</span> <span class="doc-empty-note">Not yet signed.</span></div>`;
  }
  return `
  <div class="doc-sig-row">
    <span class="doc-sig-label">${esc(label)}:</span>
    <div class="doc-sig-details">
      <img class="doc-sig-img" src="${entry.signatureImage}" alt="Signature">
      <div class="doc-sig-meta"><b>${esc(entry.name)}</b> — ${esc(entry.date)}</div>
    </div>
  </div>`;
}
function renderDigitalSignatures(signatures){
  const sig = signatures || {};
  const operatives = sig.operatives || [];
  return `
  <div class="doc-section-box">
    <p class="doc-section-title navy">DIGITAL SIGN-OFF</p>
    ${renderSignatureBlock("Prepared & Signed By", sig.preparer)}
    <p class="doc-subhead">Operative Sign-Off</p>
    ${operatives.length
      ? operatives.map(o => renderSignatureBlock("Operative", o)).join("")
      : `<p class="doc-empty-note">No operatives have signed yet.</p>`}
  </div>`;
}

function renderRamsDocument(data){
  const m = data.meta || {};
  const s = data.schedule || {};
  const em = data.emergency || {};

  return `
  <div class="doc">
    <img src="${LOGO_DATA_URI}" class="doc-logo" alt="Interior Impressions Ltd">
    <h1 class="doc-title">${esc(m.docTitle || "RAMS")}</h1>
    ${renderTier2Banner(data.tier2)}
    ${renderStepladderBanner(data.stepladderBanned)}

    <table class="doc-table">
      <tr>
        <td class="label">Project Name: <b>${textOrDash(m.projectName)}</b></td>
        <td class="label">Project Number:<br>${textOrDash(m.projectNumber)}</td>
      </tr>
      <tr>
        <td class="label">Company: <b>Interior Impressions Ltd</b></td>
        <td class="label">Document Number:<br>${textOrDash(m.docNumber)}</td>
      </tr>
      <tr>
        <td class="label">Title / Task: <b>${textOrDash(m.docTitle)}</b></td>
        <td class="label">Revision Number:<br>${textOrDash(m.revision)}</td>
      </tr>
      <tr>
        <td class="label">Date of Issue: <b>${textOrDash(m.dateOfIssue)}</b></td>
        <td class="label">Project Contact:<br>${textOrDash(m.preparedBy)}<br>${textOrDash(m.preparedByPhone)}</td>
      </tr>
    </table>

    <table class="doc-table">
      <tr><td colspan="2"><b>Other Trade Contractors to be copied with Method Statements and Risk Assessments for information, co-ordination and interface purposes</b></td></tr>
      <tr><td colspan="2">${textOrDash(m.otherContractors)}</td></tr>
    </table>

    <table class="doc-table">
      <tr><th class="label">Revision Status</th><th class="label">Date</th><th class="label">Revision Details</th><th class="label">Approved</th></tr>
      ${(data.revisionHistory || []).map(r => `<tr><td>${esc(r.status)}</td><td>${esc(r.date)}</td><td>${esc(r.details)}</td><td></td></tr>`).join("") ||
        `<tr><td colspan="4" class="doc-empty-note">No revision history recorded.</td></tr>`}
    </table>

    <table class="doc-table">
      <tr><td class="label">START DATE ON PROJECT:</td><td>${textOrDash(s.startDate)}</td></tr>
      <tr><td class="label">EXPECTED DURATION:</td><td>${textOrDash(s.duration)}</td></tr>
      <tr><td class="label">EXACT LOCATION(S):</td><td>${textOrDash(s.location)}</td></tr>
      <tr><td class="label">DOCUMENT PREPARED AND SIGNED BY:</td><td>${textOrDash(m.preparedBy)}</td></tr>
    </table>

    <div class="doc-section-box shaded">
      <p class="doc-section-title">KEY CONTROLS SUMMARY</p>
      ${listOrEmpty(data.keyControls, "No key controls specified.")}
    </div>

    <div class="doc-section-box">
      <p class="doc-section-title navy">SCOPE OF WORK:</p>
      ${listOrEmpty(data.scope, "No scope specified.")}
      <p class="doc-section-title navy" style="margin-top:14px;">Full Description of Methodology:</p>
      ${orderedListOrEmpty(data.methodologySteps, "No methodology specified.")}
    </div>

    <div class="doc-section-box">
      <p class="doc-section-title navy">WORKFORCE &amp; SITE DETAILS:</p>
      <table class="doc-table">
        <tr><td class="label" style="width:33%;">No. of Personnel:</td><td>${textOrDash(data.personnelCount)}</td></tr>
        <tr><td class="label">Onsite Supervisor (Contact):</td><td>${textOrDash(data.onsiteSupervisor)}</td></tr>
        <tr><td class="label">Person Responsible for Monitoring/Review:</td><td>${textOrDash(data.personResponsibleMonitoring)}</td></tr>
      </table>
      ${renderWorkforceTable(data.workforce)}
    </div>

    <div class="doc-section-box">
      <p class="doc-section-title navy">MATERIALS, PLANT &amp; TECHNICAL INFORMATION:</p>
      <p class="doc-subhead" style="margin-top:0;">Materials</p>
      ${listOrEmpty(data.materials, "No materials specified.")}
      <p class="doc-subhead">Plant / Equipment / Tools</p>
      ${listOrEmpty(data.plantEquipment, "No plant or equipment specified.")}
      <p class="doc-subhead">Technical Information</p>
      <p style="font-size:13px;">${textOrDash(data.technicalInformation)}</p>
    </div>

    <div class="doc-section-box">
      <p class="doc-section-title navy">METHOD STATEMENTS</p>
      ${renderMethodStatements(data.methodStatements)}
    </div>

    ${renderRiskRegisterSummary(data.riskRegister)}

    <table class="doc-table">
      <tr><td class="label" style="width:8%;">2.1</td><td class="label" style="width:22%;">COSHH:</td><td colspan="2" style="padding:0;">${renderCoshh(data.coshh)}</td></tr>
      ${renderStructuredRow("2.2", "MANUAL HANDLING:", data.manualHandling)}
      ${renderStructuredRow("2.3", "HAND ARM VIBRATION:", data.handArmVibration)}
      ${renderStructuredRow("2.4", "NOISE:", data.noise)}
      ${renderStructuredRow("2.5", "RADIATION / LASERS:", data.radiation)}
      ${renderStructuredRow("2.6", "ACCESS / EGRESS:", data.accessEgress)}
      ${renderStructuredRow("3.0", "WORK AT HEIGHT: PERSONS", data.workAtHeightPersons)}
      ${renderStructuredRow("3.1", "WORK AT HEIGHT: FALLING OBJECT PREVENTION", data.workAtHeightFalling)}
      ${renderStructuredRow("4.0", "WASTE REMOVAL:", data.wasteRemoval)}
      ${renderStructuredRow("4.1", "HOUSEKEEPING / STORAGE:", data.housekeeping)}
      ${renderStructuredRow("4.2", "PREVENTION OF LEAKS &amp; SPILLS:", data.leaksSpills)}
    </table>

    <table class="doc-table">
      <tr><td class="label" colspan="2"><b>5.0 PERMITS REQUIRED:</b></td></tr>
    </table>
    ${renderPermits(data.permits, data.permitType, data.permitIssuedBy)}

    <div class="doc-section-box">
      <p class="doc-section-title navy">PPE / RPE</p>
      ${renderPpeThreeTier(data.ppe)}
    </div>

    <table class="doc-table" style="margin-top:16px;">
      <tr><td class="label" style="width:30%;">SECURITY ARRANGEMENTS:</td><td>${textOrDash(data.securityArrangements)}</td></tr>
      <tr><td class="label">TRAINING OF PERSONS INVOLVED:</td><td>${textOrDash(data.trainingOfPersons)}</td></tr>
      <tr><td class="label">PEDESTRIAN / TRAFFIC REROUTING:</td><td>${textOrDash(data.pedestrianTraffic)}</td></tr>
      <tr><td class="label">FIRE SAFETY ARRANGEMENTS:</td><td>${textOrDash(data.fireSafety)}</td></tr>
      <tr><td class="label">RESPONSIBILITY FOR TASK LIGHTING:</td><td>${textOrDash(data.taskLighting)}</td></tr>
      <tr><td class="label">WORKFORCE COMMUNICATION (incl. non-English):</td><td>${textOrDash(data.communication)}</td></tr>
      <tr><td class="label">HOUSEKEEPING / MATERIAL STORAGE:</td><td>${textOrDash(data.housekeeping)}</td></tr>
      <tr><td class="label">ENVIRONMENTAL CONSIDERATIONS:</td><td>${textOrDash(data.environmental)}</td></tr>
      <tr><td class="label">HEALTH &amp; SAFETY MONITORING:</td><td>${textOrDash(data.hsMonitoring)}</td></tr>
      <tr><td class="label">OCCUPATIONAL HEALTH:</td><td>${textOrDash(data.occupationalHealth)}</td></tr>
      <tr><td class="label">DUST / RESPIRATORY:</td><td>${textOrDash(data.dustRespiratory)}</td></tr>
      <tr><td class="label">QUALITY:</td><td>${textOrDash(data.quality)}</td></tr>
    </table>

    <div class="doc-section-box">
      <p class="doc-section-title navy">EMERGENCY ARRANGEMENTS &amp; RESCUE</p>
      <table class="doc-table">
        <tr><td class="label" style="width:33%;">Emergency Arrangements:</td><td>${textOrDash(em.arrangements)}</td></tr>
        <tr><td class="label">Rescue Plan:</td><td>${textOrDash(em.rescue)}</td></tr>
        <tr><td class="label">Nearest A&amp;E:</td><td>${textOrDash(em.nearestAE)}</td></tr>
        <tr><td class="label">First Aid on Site:</td><td>${textOrDash(em.firstAidOnSite)}</td></tr>
      </table>
    </div>

    <p class="doc-section-title navy" style="margin-top:20px;">RISK ASSESSMENT — TASK DETAIL</p>
    <div class="doc-section-box">
      ${renderRiskMatrixKey()}
    </div>
    ${renderRiskTaskBlocks(data.riskRegister)}

    ${renderComplianceNotes(data.complianceNotes)}

    ${renderDigitalSignatures(data.signatures)}

    ${renderSignOffRecords()}

  </div>`;
}
