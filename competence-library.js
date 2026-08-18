// ---------------------------------------------------------------
// COMPETENCE / CERTIFICATION LIBRARY
// Extracted from: Morgan Lovell Supply Chain Health and Safety
// Standards 2025 — Part A, "Competence Requirements" table.
// Source data only — no AI involved.
// ---------------------------------------------------------------

const COMPETENCE_LIBRARY = {
  "Managers": "Appropriate CSCS card (Manager) + SMSTS certificate",
  "Supervisors": "Appropriate CSCS card (Supervisor) + SMSTS or SSSTS certificate",
  "Plant Operators": "Specific CPCS card / NPORS (with CSCS logo) + ALLMI for lorry loaders",
  "Lifting Operations": "Relevant CPCS card",
  "Electricians": "ECS or JIB Card",
  "Scaffolders": "CISRS relevant to their role",
  "MEWPs": "IPAF + CPCS",
  "PECO / ECO (Push Around Vertical lifts)": "Evidence of familiarisation training",
  "Mobile Towers": "PASMA (erecting and dismantling the tower)",
  "Safety Netting": "FASET",
  "All Operatives": "Appropriate CSCS card for their work",
  "Traffic / Plant Marshalls": "Relevant CPCS card",
  "Asbestos": "Asbestos awareness training",
  "Hoist Operators": "CPCS A20 (Module A goods-only / Module B passenger) / NPORS/CSCS N111 / IPAF Construction hoist (CH) / specific hoist familiarisation training",
  "Demolition Supervisors/Operatives": "Certificate of Competence of Demolition Operatives (CCDO) or equivalent",
  "Temporary Works Coordinator (TWC) / Supervisor (TWS)": "Formally appointed, competent — per BS5975:2024"
};

// Work at Height access equipment hierarchy (most preferred first) —
// Morgan Lovell 2025 standard. Lower-down options only acceptable
// when higher options are not reasonably practicable.
// UPDATE (per John, site-confirmed): stepladders are NO LONGER
// PERMITTED on Morgan Lovell sites at all — not even as last resort.
const WORK_AT_HEIGHT_HIERARCHY = [
  { level: "Full scaffold platform", note: "Most preferred — collective protection." },
  { level: "MEWPs / PAVs", note: "Mobile elevated work platforms / push-around verticals." },
  { level: "Mobile alloy towers", note: "PASMA-trained erection/dismantling required." },
  { level: "Podiums & platform enclosing steps", note: "Anti-surf design, min. 950mm handrail. This is now the lowest acceptable option on Morgan Lovell sites." },
  { level: "Stepladders / hop-ups", note: "BANNED on Morgan Lovell sites — no longer permitted, including as last resort. Use podium/platform enclosing steps instead. (Other clients may still permit with a daily permit — confirm per project.)" }
];

// Demolition / Strip-out health hazards to consider (Morgan Lovell 2025)
const STRIP_OUT_HEALTH_HAZARDS = [
  "Lead", "Asbestos", "Weil's Disease", "Legionella", "Noise", "Dust", "Vibration"
];

// Hot Works minimum requirements (Morgan Lovell 2025)
const HOT_WORKS_REQUIREMENTS = [
  "Controlled under the Hot Works permit system (PermitPLUS / ProjectPLUS).",
  "2-hour fire watch required for all hot works.",
  "Thermal imaging cameras required for medium to high risk hot works tasks.",
  "Minimum 2 fire extinguishers on site, appropriate for the task (e.g. Water, CO2) — at least one Water or Foam.",
  "Extinguishers: minimum fire rating 13A, not damaged, tag and pin in place, tested within the last 12 months.",
  "Extinguishers must be labelled, checked and registered with Morgan Lovell.",
  "Acetylene is NOT permitted on any Morgan Lovell site."
];

// Excavation / underground utilities checklist (Morgan Lovell 2025)
const EXCAVATION_CHECKLIST = [
  "Existing utility drawings obtained and reviewed before excavation.",
  "Existing services traced by a competent person using a CAT & Genny.",
  "Permit to break ground in place.",
  "Existing services clearly marked on the surface.",
  "Edge protection provided around all excavations, regardless of depth.",
  "Excavated material stockpiled at least 2m from excavation sides.",
  "Excavations inspected prior to each shift, after adverse weather, and before anyone enters."
];

// Morgan Lovell RAMS content requirements — used for the completeness checker.
// Each item maps to a builder field/section so we can flag what's covered.
const RAMS_REQUIRED_SECTIONS = [
  { label: "Project & Document information", check: (d) => !!(d.meta.projectName && d.meta.docTitle) },
  { label: "Scope of works", check: (d) => (d.scope||[]).some(x => x && x.trim()) },
  { label: "Access / Egress", check: (d) => !!(d.accessEgress && d.accessEgress.trim()) },
  { label: "Sequence / work methodology", check: (d) => (d.methodologySteps||[]).some(x => x && x.trim()) },
  { label: "Plant / Equipment", check: (d) => (d.plantEquipment||[]).some(x => x && x.trim()) },
  { label: "Materials handling and storage", check: (d) => !!(d.housekeeping && d.housekeeping.trim()) },
  { label: "Personnel / Supervision & Competency", check: (d) => (d.workforce||[]).some(w => w && w.name) },
  { label: "Permits", check: (d) => (d.permits||[]).some(p => p && p.item) },
  { label: "Waste", check: (d) => !!(d.wasteRemoval && d.wasteRemoval.trim()) },
  { label: "Quality", check: (d) => !!(d.hsMonitoring && d.hsMonitoring.trim()) },
  { label: "Interfaces Coordination", check: (d) => !!(d.meta.otherContractors && d.meta.otherContractors.trim()) },
  { label: "Emergency arrangements", check: (d) => !!(d.emergency && d.emergency.arrangements && d.emergency.arrangements.trim()) },
  { label: "Monitoring & Assurance", check: (d) => !!(d.hsMonitoring && d.hsMonitoring.trim()) },
  { label: "Risk assessments relative to scope", check: (d) => (d.riskRegister||[]).some(t => t && t.task) }
];
