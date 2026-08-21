// ---------------------------------------------------------------
// COMPETENCE / CERTIFICATION LIBRARY
// Interior Impressions Ltd competence/certification standard.
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
  "Temporary Works Coordinator (TWC) / Supervisor (TWS)": "Formally appointed, competent — per BS5975:2024",
  "Diisocyanate / MDI Users": "HSE mandatory diisocyanate awareness training (in force since 24 Aug 2023) — required before use of any diisocyanate/MDI-based product (e.g. PU expanding foam sealants)"
};

// Work at Height access equipment hierarchy (most preferred first).
// Lower-down options only acceptable when higher options are not
// reasonably practicable. Some clients now prohibit stepladders
// entirely — always confirm current site policy per project.
const WORK_AT_HEIGHT_HIERARCHY = [
  { level: "Full scaffold platform", note: "Most preferred — collective protection." },
  { level: "MEWPs / PAVs", note: "Mobile elevated work platforms / push-around verticals." },
  { level: "Mobile alloy towers", note: "PASMA-trained erection/dismantling required." },
  { level: "Podiums & platform enclosing steps", note: "Anti-surf design, min. 950mm handrail. This is the lowest acceptable option on sites where stepladders are prohibited." },
  { level: "Stepladders / hop-ups", note: "Last resort only, and prohibited outright on some sites — always confirm current client policy before use. Use podium/platform enclosing steps instead where banned." }
];

// Demolition / Strip-out health hazards to consider
const STRIP_OUT_HEALTH_HAZARDS = [
  "Lead", "Asbestos", "Weil's Disease", "Legionella", "Noise", "Dust", "Vibration"
];

// Hot Works minimum requirements
const HOT_WORKS_REQUIREMENTS = [
  "Controlled under the Hot Works permit system (PermitPLUS / ProjectPLUS).",
  "2-hour fire watch required for all hot works.",
  "Thermal imaging cameras required for medium to high risk hot works tasks.",
  "Minimum 2 fire extinguishers on site, appropriate for the task (e.g. Water, CO2) — at least one Water or Foam.",
  "Extinguishers: minimum fire rating 13A, not damaged, tag and pin in place, tested within the last 12 months.",
  "Extinguishers must be labelled, checked and registered with the Principal Contractor.",
  "Acetylene is NOT permitted on some main contractor sites — confirm current policy."
];

// Diisocyanate / MDI training requirement — HSE mandatory since
// 24 Aug 2023. Triggered whenever a selected COSHH substance is
// flagged requiresDiisocyanateTraining (see coshh-library.js, e.g.
// Fill and Fix Expanding Foam). Same severity tier as the stepladder
// and hot works triggers — this is a legal training requirement, not
// a soft suggestion.
const DIISOCYANATE_TRAINING_REQUIREMENTS = [
  "HSE mandatory diisocyanate training requirement, in force since 24 August 2023.",
  "Applies to any operative using or working in proximity to diisocyanate/MDI-based products (e.g. PU expanding foam sealants).",
  "Operative must hold an in-date diisocyanate awareness training certificate before use.",
  "Certificate must be refreshed at the interval set by current HSE guidance.",
  "RAMS Training of Persons Involved section must name the certificate requirement against each operative on the job where a flagged substance is selected."
];

// Excavation / underground utilities checklist
const EXCAVATION_CHECKLIST = [
  "Existing utility drawings obtained and reviewed before excavation.",
  "Existing services traced by a competent person using a CAT & Genny.",
  "Permit to break ground in place.",
  "Existing services clearly marked on the surface.",
  "Edge protection provided around all excavations, regardless of depth.",
  "Excavated material stockpiled at least 2m from excavation sides.",
  "Excavations inspected prior to each shift, after adverse weather, and before anyone enters."
];

// Core UK H&S legislation — always shown on every RAMS as a
// standing reference, alongside the BS/EN product standards already
// cited in the PPE section.
const CORE_LEGISLATION = [
  { ref: "Health and Safety at Work etc. Act 1974", title: "Primary UK legislation placing general duties on employers, employees and the self-employed." },
  { ref: "Management of Health and Safety at Work Regulations 1999", title: "Requires suitable and sufficient risk assessment of work activities." },
  { ref: "Construction (Design and Management) Regulations 2015", title: "Sets out duties for construction projects, including RAMS/Safe Systems of Work." },
  { ref: "Work at Height Regulations 2005", title: "Duty to avoid, prevent falls, and follow the hierarchy of work-at-height measures." },
  { ref: "Manual Handling Operations Regulations 1992 (as amended)", title: "Avoid, assess and reduce risk from manual handling activities." },
  { ref: "Control of Substances Hazardous to Health Regulations (COSHH) 2002", title: "Assess and control exposure to hazardous substances." },
  { ref: "Provision and Use of Work Equipment Regulations (PUWER) 1998", title: "Equipment must be suitable, maintained and used only by trained persons." },
  { ref: "Personal Protective Equipment at Work Regulations 1992 (as amended 2022)", title: "PPE to be provided, suitable, maintained and used correctly." },
  { ref: "Control of Noise at Work Regulations 2005", title: "Assess and control exposure to noise; action levels 80/85 dB(A)." },
  { ref: "Control of Vibration at Work Regulations 2005", title: "Assess and control exposure to hand-arm and whole-body vibration." },
  { ref: "RIDDOR — Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013", title: "Statutory duty to report certain workplace incidents." }
];

// Standard RAMS content requirements — used for the completeness checker.
// Each item maps to a builder field/section so we can flag what's covered.
// Combined RAMS completeness checklist — union of:
//  (1) Donovan Brooks gold-standard template
//  (2) MS/RA Acceptance Form review categories
//  (3) Client H&S standard RAMS content requirements
// Each item checks its own dedicated field — nothing here is a
// stand-in for another field. If a box on any of those three source
// documents isn't covered, it shows as missing here.
const RAMS_REQUIRED_SECTIONS = [
  { label: "Project & Document information", check: (d) => !!(d.meta.projectName && d.meta.docTitle) },
  { label: "Scope of works", check: (d) => (d.scope||[]).some(x => x && x.trim()) },
  { label: "Sequence / work methodology", check: (d) => (d.methodologySteps||[]).some(x => x && x.trim()) },
  { label: "Access / Egress", check: (d) => !!(d.accessEgress && d.accessEgress.trim()) },
  { label: "Workforce / Supervision & Competency", check: (d) => (d.workforce||[]).some(w => w && w.name) },
  { label: "Training of Persons Involved", check: (d) => !!(d.trainingOfPersons && d.trainingOfPersons.trim()) },
  { label: "Communication (incl. non-English)", check: (d) => !!(d.communication && d.communication.trim()) },
  { label: "PPE / RPE", check: (d) => (d.ppe && ((d.ppe.mandatory||[]).some(x=>x&&x.trim()) || (d.ppe.taskSpecific||[]).some(x=>x&&x.trim()) || (d.ppe.rpe||[]).some(x=>x&&x.trim()))) },
  { label: "Plant / Equipment", check: (d) => (d.plantEquipment||[]).some(x => x && x.trim()) },
  { label: "Materials & Technical Information", check: (d) => (d.materials||[]).some(x => x && x.trim()) },
  { label: "Hazardous Materials / COSHH", check: (d) => (d.coshh||[]).some(x => x && x.trim()) },
  { label: "Housekeeping / Material Storage", check: (d) => !!(d.housekeeping && d.housekeeping.trim()) },
  { label: "Waste Removal", check: (d) => !!(d.wasteRemoval && d.wasteRemoval.trim()) },
  { label: "Prevention of Leaks & Spills", check: (d) => !!(d.leaksSpills && d.leaksSpills.trim()) },
  { label: "Permits to Work", check: (d) => (d.permits||[]).some(p => p && p.item) },
  { label: "Security Arrangements", check: (d) => !!(d.securityArrangements && d.securityArrangements.trim()) },
  { label: "Environmental Considerations", check: (d) => !!(d.environmental && d.environmental.trim()) },
  { label: "Emergency Arrangements & Rescue", check: (d) => !!(d.emergency && d.emergency.arrangements && d.emergency.arrangements.trim()) },
  { label: "Health & Safety Monitoring", check: (d) => !!(d.hsMonitoring && d.hsMonitoring.trim()) },
  { label: "Quality", check: (d) => !!(d.quality && d.quality.trim()) },
  { label: "Risk Assessment (relative to scope)", check: (d) => (d.riskRegister||[]).some(t => t && t.task) },
  { label: "Occupational Health (hierarchy of controls)", check: (d) => !!(d.occupationalHealth && d.occupationalHealth.trim()) },
  { label: "Noise", check: (d) => !!(d.noise && d.noise.trim()) },
  { label: "Manual Handling", check: (d) => !!(d.manualHandling && d.manualHandling.trim()) },
  { label: "Dust / Respiratory", check: (d) => !!(d.dustRespiratory && d.dustRespiratory.trim()) },
  { label: "Vibration (HAV)", check: (d) => !!(d.handArmVibration && d.handArmVibration.trim()) },
  { label: "Interfaces Coordination (other trade contractors)", check: (d) => !!(d.meta.otherContractors && d.meta.otherContractors.trim()) }
];
