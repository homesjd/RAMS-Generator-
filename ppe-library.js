// ---------------------------------------------------------------
// PPE STANDARDS LIBRARY
// Interior Impressions Ltd PPE standard — BS/EN citations.
// Source data only — no AI involved. Selecting an item in the RAMS
// Builder inserts the correct BS/EN citation automatically.
// ---------------------------------------------------------------

// Mandatory baseline PPE required on site
const PPE_MANDATORY_BASELINE = [
  { label: "Safety helmet", standard: "BS EN 397" },
  { label: "Protective gloves", standard: "BS EN 420" },
  { label: "Safety footwear", standard: "BS EN ISO 20345:2022 S3" },
  { label: "High visibility jacket or vest", standard: "BS EN 20471" }
];

// Task-specific PPE options with their governing standard
const PPE_TASK_SPECIFIC_OPTIONS = [
  { label: "Cut-resistant gloves (Level 5 / Level D — cutting, strip-out, loading skips)", standard: "BS EN ISO 13997:2023" },
  { label: "Rigger / woven sticky gloves (manual handling)", standard: "" },
  { label: "Forearm Kevlar / cut-resistant arm protectors (ceiling fixers, glaziers, metal studwork, strip-out, duct fitters, above ceiling level)", standard: "BS EN ISO 13997:2023" },
  { label: "Gauntlets (working with services in floor voids)", standard: "" },
  { label: "Eye protection (mandatory for ALL strip-out activities)", standard: "BS EN ISO 16321 / BS EN 166" },
  { label: "Prescription safety glasses", standard: "BS EN 166" },
  { label: "Hearing protection (noisy works — noise assessment required, action levels 80/85/87 dB(A))", standard: "" },
  { label: "Ankle-protection footwear (strip-out/demolition, external works, excavation, uneven ground)", standard: "BS EN ISO 20345 S3" }
];

// RPE options
const PPE_RPE_OPTIONS = [
  { label: "Disposable dust mask FFP3 (minimum standard when RPE required)", standard: "FFP3" },
  { label: "Air-fed hood (for those who cannot wear a tight-fitting face mask)", standard: "Hood must provide head protection to BS EN 397" }
];

// Hard hat colour coding
const PPE_HARD_HAT_COLOURS = {
  "White": "Project Managers, Site/Construction Managers, Operatives, Labourers",
  "Black": "Supervisors (main contractor and subcontractors)",
  "Orange": "Traffic / Loading Bay Marshalls / Slingers / Banksmen",
  "Blue": "Vulnerable persons — visitors, young persons"
};

// Hi-vis colour coding
const PPE_HIVIS_COLOURS = {
  "Yellow": "Project Managers, Site/Construction Managers, Trade Operatives, Labourers, vulnerable persons (visitors, young persons)",
  "Orange": "Traffic / Loading Bay Marshalls / Banksmen / Slingers",
  "Blue": "May be used for visitors as an alternative"
};

// Referenced BS/EN documents (for the standards footer on the RAMS)
const PPE_REFERENCED_DOCUMENTS = [
  { ref: "BS EN 397", title: "Industrial standard for helmets" },
  { ref: "BS EN 420", title: "Standard in glove safety" },
  { ref: "BS EN ISO 20345 S3", title: "Requirements for safety footwear (midsole puncture protection + toecap)" },
  { ref: "BS EN 471 / BS EN 20471", title: "Standard which specifies requirements for high visibility clothing" },
  { ref: "BS EN ISO 13997:2023", title: "Benchmark for protective clothing — mechanical properties and resistance to cutting by sharp objects" },
  { ref: "BS EN ISO 16321", title: "Eye and face protection for occupational use (current standard — supersedes older BS EN 166 guidance)" },
  { ref: "BS EN 166", title: "European standard for safety glasses and other personal eye protection (legacy / other clients)" }
];
