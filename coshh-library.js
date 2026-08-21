// ---------------------------------------------------------------
// COSHH SUBSTANCE LIBRARY
// Extracted from: Site Breakthrough Properties COSHH doc (Donovan
// Brooks, MA6312). Source data for common Interior Impressions
// materials. Selecting a substance in the RAMS Builder auto-fills
// this data — no AI involved, this is the actual SDS-derived data
// Donovan compiled.
//
// Each entry: reference, composition, firstAid{eyes,skin,inhalation,
// ingestion}, ppe{respiratory,hand,skin,eye}, storageSpill,
// exposureLimit, transport, disposal
// ---------------------------------------------------------------

const COSHH_LIBRARY = {
  "Medium Density Fibreboard (MDF)": {
    reference: "015",
    composition: "Mixed softwood, polymerised resin, paraffin wax, black dye, mineral wax",
    firstAid: {
      eyes: "Dust: flush eyes thoroughly with water for at least 15 minutes, seek medical assistance.",
      skin: "Dust: wash promptly.",
      inhalation: "Not applicable.",
      ingestion: "Not applicable."
    },
    ppe: {
      respiratory: "Filter mask to be worn, ensure adequate ventilation; do not cut or drill in confined spaces.",
      hand: "No special requirements.",
      skin: "Wear overalls.",
      eye: "Wear eye protection to protect against dust."
    },
    storageSpill: "Store in dry, ventilated area; avoid dust build-up.",
    exposureLimit: "Long term exposure 8hrs and short-term exposure 15min.",
    transport: "No special requirement.",
    disposal: "No special requirement."
  },
  "Gypsum Plasterboard": {
    reference: "029",
    composition: "Calcium sulphate dihydrate (gypsum), paper liner, small amounts of additives",
    firstAid: {
      eyes: "Wash with clean water and seek medical advice if irritation occurs.",
      skin: "Using clean water rinse and then wash using soap and water.",
      inhalation: "Remove victim to fresh air.",
      ingestion: "Wash out mouth and drink plenty of clean water."
    },
    ppe: {
      respiratory: "Adequate localised ventilation or extraction recommended when creating dust and fibres. Wear disposable facemask complying with EN 149 FFP.",
      hand: "Hands should be protected when handling this product (wear gloves).",
      skin: "Exposed skin should be kept to a minimum to avoid contact with fibres. Disposable coveralls would be suitable.",
      eye: "Eye protection recommended when dust/fibres are likely to be generated. Wear eye protection to BS EN 166."
    },
    storageSpill: "Store flat, dry, and stable.",
    exposureLimit: "Long term exposure 8hrs and short-term exposure 15min.",
    transport: "No special precautions required.",
    disposal: "No special requirements required."
  },
  "Evo-Stik Gripfill Solvent Free": {
    reference: "846",
    composition: "Diethylene glycol, monobutyl ether, 1,2-Benzisothiazolin-3-one, Zinc pyrithione",
    firstAid: {
      eyes: "Immediately flush eyes with plenty of water.",
      skin: "—",
      inhalation: "—",
      ingestion: "—"
    },
    ppe: {
      respiratory: "No protective equipment needed under normal use conditions. Wear a respirator conforming to EN 140 with Type A/P2 filter if needed.",
      hand: "—",
      skin: "—",
      eye: "—"
    },
    storageSpill: "Store in dry, cool and well-ventilated place. Keep container closed when in use.",
    exposureLimit: "Long term exposure 8hrs and short-term exposure 15min.",
    transport: "N/A",
    disposal: "Dispose in safe manner in accordance with local/national regulations. Handle empty containers with care."
  },
  "Knauf Plasterboard": {
    reference: "",
    composition: "Calcium sulphate dihydrate (gypsum), paper liner, small amounts of additives",
    firstAid: {
      eyes: "Wash immediately with fresh running water. If prolonged, seek medical attention immediately.",
      skin: "Immediately remove all contaminated clothing. Flush skin and hair with running water.",
      inhalation: "If fumes or combustion products are inhaled, remove from contaminated area and lay patient down.",
      ingestion: "If swallowed, do not induce vomiting; if vomiting occurs lean patient forward or on side to open airways."
    },
    ppe: {
      respiratory: "Adequate localised ventilation or extraction recommended when creating dust and fibres. Wear disposable facemask complying with EN 149 FFP.",
      hand: "Wear suitable gloves. Gloves must conform to standard EN 374.",
      skin: "Wear chemical protective gloves (PVC), wear safety footwear.",
      eye: "Wear safety glasses with side shields or goggles (EN 166)."
    },
    storageSpill: "Store flat, dry, stable and away from physical hazards.",
    exposureLimit: "Long term exposure 8hrs and short-term exposure 15min.",
    transport: "No special precautions required.",
    disposal: "No special requirements required."
  },
  "Gyproc Dri-Wall Adhesive": {
    reference: "930",
    composition: "N/A",
    firstAid: {
      eyes: "Caused painful irritation and may cause serious damage to eyes unless immediate treatment is given. Rinse eye thoroughly.",
      skin: "An irritant, may cause burns in the presence of moisture. Remove contaminated clothing and wash immediately with water.",
      inhalation: "Remove victim to fresh air and keep at rest in a position comfortable for breathing.",
      ingestion: "Unlikely to cause any reactions. Do not induce vomiting and wash mouth with plenty of water."
    },
    ppe: {
      respiratory: "Ensure adequate ventilation.",
      hand: "Wear suitable gloves.",
      skin: "N/A",
      eye: "Wear suitable eye protection."
    },
    storageSpill: "Store flat on pallets to remain dry. Dust collection system should be utilised to minimise the build of dust.",
    exposureLimit: "Long term exposure 8hrs and short-term exposure 15min.",
    transport: "Not classified as hazardous for transportation.",
    disposal: "Should be in accordance with local and national legislations."
  },
  "(Knauf Acoustic) Glass Mineral Wool": {
    reference: "1881",
    composition: "Inert vitreous silicate mineral wool bonded with a thermosetting resin.",
    firstAid: {
      eyes: "Wash immediately with fresh running water.",
      skin: "If irritation occurs, wash skin with soap and water.",
      inhalation: "Move person to fresh air.",
      ingestion: "Drink plenty of water if swallowed."
    },
    ppe: {
      respiratory: "Wear disposable facemask complying with EN 149 FFP.",
      hand: "Wear suitable gloves.",
      skin: "Wear loose fitting clothes.",
      eye: "If working with products above head height or in confined spaces, eye protection should be worn and comply with BS EN 166."
    },
    storageSpill: "Avoid unnecessary handling of unwrapped product. Store in original packaging in a dry place. Large pieces may be placed in plastic bags or waste bins.",
    exposureLimit: "Long term exposure 8hrs and short-term exposure 15min.",
    transport: "N/A",
    disposal: "No special precautions. Not classified as hazardous or special waste in the UK and may be disposed of in normal waste landfill."
  },
  "Gyproc Jointing Materials": {
    reference: "2314",
    composition: "Calcium Sulphate Hemihydrate, Quartz (silica)",
    firstAid: {
      eyes: "If eye irritation persists, rinse cautiously with water for several minutes.",
      skin: "Wash hands thoroughly after handling.",
      inhalation: "Move person to fresh air and call a doctor if condition gets worse.",
      ingestion: "If swallowed rinse mouth."
    },
    ppe: {
      respiratory: "Wear disposable facemask complying with EN 149 FFP.",
      hand: "Wear suitable gloves.",
      skin: "N/A",
      eye: "Avoid contact with eyes, wear eye protection."
    },
    storageSpill: "Store flat on pallets to remain dry.",
    exposureLimit: "Long term exposure 8hrs and short-term exposure 15min.",
    transport: "Not classified as hazardous for transportation.",
    disposal: "Wastes from gypsum products are normally classified as non-hazardous but should not be co-disposed with municipal waste."
  },
  "Gyproc QuickSand": {
    reference: "994",
    composition: "Limestone, Mica",
    firstAid: {
      eyes: "Rinse immediately with plenty of water. Remove any contact lenses and open eyelids wide apart.",
      skin: "Brush off loose particles from skin. Remove affected person from source of contamination.",
      inhalation: "Move person to fresh air.",
      ingestion: "Rinse mouth thoroughly with water."
    },
    ppe: {
      respiratory: "Respiratory protection complying with an approved standard should be worn if a risk assessment indicates inhalation of contaminants is possible.",
      hand: "Wear suitable gloves.",
      skin: "Wear appropriate clothing to prevent repeated or prolonged skin contact.",
      eye: "Avoid contact with eyes, wear eyewear complying with an approved standard EN 166."
    },
    storageSpill: "Store in dry place, away from incompatible materials. Store in accordance with local regulations. Wear protective clothing.",
    exposureLimit: "Long term exposure 8hrs and short-term exposure 15min.",
    transport: "Not classified as hazardous for transportation.",
    disposal: "Dispose of surplus products and those that cannot be recycled via a licensed waste disposal contractor. Waste packaging should be collected for reuse or recycling."
  },
  "Fill and Fix Expanding Foam": {
    reference: "387",
    composition: "Dimethyl ether, propane, isobutane, alkanes C14-17 chloro, diphenylmethane",
    // Contains diphenylmethane diisocyanate (MDI). HSE mandatory
    // diisocyanate training requirement (in force since 24 Aug 2023)
    // applies to any operative using this substance. Triggers the
    // diisocyanate banner in render.js when this item is selected.
    requiresDiisocyanateTraining: true,
    firstAid: {
      eyes: "Rinse eye with running water for 15 minutes, consult doctor if situation gets worse.",
      skin: "Remove all contaminated clothes and footwear immediately unless stuck to skin; drench affected skin with running water for 10 minutes.",
      inhalation: "Remove casualty from exposure ensuring one's own safety whilst doing so. Consult a doctor.",
      ingestion: "Rinse mouth thoroughly with water."
    },
    ppe: {
      respiratory: "Gas/vapour filter, type A: organic vapours EN 141. Must be worn if vapour concentration is above OES or ventilation is poor. Self-contained breathing apparatus must be available in case of emergency.",
      hand: "Impermeable gloves.",
      skin: "Impermeable protective clothing.",
      eye: "Avoid contact with eyes, wear eyewear complying with an approved standard."
    },
    storageSpill: "Store in cool well-ventilated area, keep container tightly closed, keep away from sources of ignition. Mark spill-contaminated areas with clear signs and instructions.",
    exposureLimit: "Long term exposure 8hrs and short-term exposure 15min.",
    transport: "N/A",
    disposal: "Should be disposed according to regional and national regulations."
  },
  "Wondertex Prem Fill and Finish": {
    reference: "1272",
    composition: "",
    firstAid: {
      eyes: "Rinse eye with plenty of water immediately.",
      skin: "Rinse immediately with plenty of water and remove contaminated clothing.",
      inhalation: "Move affected person to fresh air and keep warm and at rest in position comfortable for breathing.",
      ingestion: "Rinse mouth thoroughly with water."
    },
    ppe: {
      respiratory: "No specific recommendations.",
      hand: "Chemical-resistant, impervious gloves complying with an approved standard should be worn if a risk assessment indicates skin contact is possible.",
      skin: "Wear appropriate clothing to prevent any possibility of skin contact.",
      eye: "Wear chemical splash goggles."
    },
    storageSpill: "Store in dry ventilated area, keep away from sources of ignition. Mark spill-contaminated areas with clear signs and instructions.",
    exposureLimit: "Long term exposure 8hrs and short-term exposure 15min.",
    transport: "N/A",
    disposal: "Should be disposed according to regional and national regulations."
  },
  "FirePro Acoustic Intumescent Sealant": {
    reference: "1272",
    composition: "Calcium Carbonate, Aluminium Hydroxide, Titanium Dioxide, 1,2-benzisothiazol-3(2H)",
    firstAid: {
      eyes: "Rinse eye with water as a precaution.",
      skin: "Wash skin with plenty of water.",
      inhalation: "Remove person to fresh air and keep comfortable for breathing.",
      ingestion: "Rinse out mouth, call poison centre or a doctor if you feel unwell."
    },
    ppe: {
      respiratory: "In case of insufficient ventilation, wear suitable respiratory equipment or dust mask.",
      hand: "Disposable gloves: Standard EN ISO 374.",
      skin: "Wear suitable protective clothing.",
      eye: "Safety glasses: Standard EN 166."
    },
    storageSpill: "Store in well-ventilated place. Keep cool. If spillage occurs sweep up and put in a closed container for disposal.",
    exposureLimit: "Long term exposure 8hrs and short-term exposure 15min.",
    transport: "N/A",
    disposal: "Disposal must be done according to official regulations. Dispose of contents/container in accordance with licensed collector's sorting instructions."
  },
  "Ablative Coating": {
    reference: "1272",
    composition: "Calcium Carbonate, Aluminium Hydroxide, Titanium Dioxide",
    firstAid: {
      eyes: "Rinse eye with water as a precaution.",
      skin: "Wash skin with plenty of water.",
      inhalation: "Remove person to fresh air and keep comfortable for breathing.",
      ingestion: "Rinse out mouth, call poison centre or a doctor if you feel unwell."
    },
    ppe: {
      respiratory: "In case of insufficient ventilation, wear suitable respiratory equipment or dust mask.",
      hand: "Disposable gloves: Standard EN ISO 374.",
      skin: "Wear suitable protective clothing.",
      eye: "Safety glasses."
    },
    storageSpill: "Store in well-ventilated place. Keep cool. If spillage occurs sweep up and put in a closed container for disposal.",
    exposureLimit: "Long term exposure 8hrs and short-term exposure 15min.",
    transport: "N/A",
    disposal: "Disposal must be done according to official regulations. Dispose of contents/container in accordance with licensed collector's sorting instructions."
  },
  "British Gypsum — Gyproc Easifill": {
    reference: "",
    composition: "Calcium Carbonate, Aluminium Hydroxide, Titanium Dioxide",
    firstAid: {
      eyes: "Rinse immediately with plenty of water. Remove contact lenses.",
      skin: "Brush off loose particles from skin, remove affected person from source of contamination.",
      inhalation: "Remove person to fresh air and keep comfortable for breathing. Loosen tight clothing such as collar/tie/belt.",
      ingestion: "Rinse mouth thoroughly with water. Give a few small glasses of water."
    },
    ppe: {
      respiratory: "Respiratory protection complying with an approved standard should be worn if a risk assessment indicates inhalation of contaminant is possible.",
      hand: "Wear protective gloves adhering to legislations and regulations EN374.",
      skin: "Wear appropriate clothing to prevent repeated or prolonged skin contact.",
      eye: "Safety glasses to be worn with approved standard."
    },
    storageSpill: "Store away from incompatible materials. Store in a dry place in accordance with local regulations.",
    exposureLimit: "Long term exposure 8hrs and short-term exposure 15min.",
    transport: "N/A",
    disposal: "Dispose of surplus products and those that cannot be recycled via a licensed waste disposal contractor."
  },
  "Wood Glue": {
    reference: "",
    composition: "Aluminium chloride basic, Diethylene glycol monobutyl ether",
    firstAid: {
      eyes: "Rinse immediately with plenty of water.",
      skin: "Remove affected clothing and wash all exposed skin area with mild soap and water.",
      inhalation: "Allow victim to breathe fresh air and rest.",
      ingestion: "Rinse immediately with plenty of water, seek medical attention if condition becomes worse."
    },
    ppe: {
      respiratory: "Not required under normal conditions. If concentrations exceed exposure limits, use NIOSH approved respirator.",
      hand: "Wear protective gloves.",
      skin: "Wear appropriate clothing to prevent repeated or prolonged skin contact.",
      eye: "Safety glasses or chemical goggles."
    },
    storageSpill: "Store in dry, cool and well-ventilated place. Keep container closed when in use.",
    exposureLimit: "Long term exposure 8hrs and short-term exposure 15min.",
    transport: "N/A",
    disposal: "Dispose in safe manner in accordance with local/national regulations. Handle empty containers with care."
  },
  "Universal Silicone Sealant": {
    reference: "",
    composition: "Distillates, petroleum, hydrotreated middle, Silsesquioxanes, aminopropyl methyl",
    firstAid: {
      eyes: "Rinse immediately with plenty of water. Continue washing for 15 minutes.",
      skin: "Wash skin with soap and water. Call a doctor if situation becomes worse.",
      inhalation: "Allow victim to breathe fresh air and rest.",
      ingestion: "Do not induce vomiting. Never give anything by mouth to an unconscious person."
    },
    ppe: {
      respiratory: "In case of inadequate ventilation wear respiratory protection.",
      hand: "Wear suitable gloves.",
      skin: "None under normal use conditions.",
      eye: "Wear safety glasses with side shields (or goggles). Eye protection must conform to Standard EN 166."
    },
    storageSpill: "Store in dry, cool and well-ventilated place. Keep container closed when in use.",
    exposureLimit: "Long term exposure 8hrs and short-term exposure 15min.",
    transport: "N/A",
    disposal: "Dispose in safe manner in accordance with local/national regulations. Handle empty containers with care."
  },
  "Universal PVA Bonding": {
    reference: "",
    composition: "",
    firstAid: {
      eyes: "Rinse cautiously with water for 15 minutes.",
      skin: "Remove contaminated clothing and gently wash with plenty soap and water. Contact a poison centre or doctor if you start feeling unwell.",
      inhalation: "Allow victim to breathe fresh air and rest.",
      ingestion: "Rinse mouth immediately with plenty of water. Do not induce vomiting without medical advice."
    },
    ppe: {
      respiratory: "Not required for normal condition of use.",
      hand: "Chemically resistant gloves are recommended but not required.",
      skin: "Wear suitable working clothes.",
      eye: "Chemical goggles or safety glasses."
    },
    storageSpill: "Keep container tightly closed in a dry well-ventilated place. Store in accordance with local regulations.",
    exposureLimit: "Long term exposure 8hrs and short-term exposure 15min.",
    transport: "N/A",
    disposal: "Disposal should always comply with the requirements of environmental protection and waste disposal legislation and any regional/local authority requirements."
  },
  "Glass Cleaner": {
    reference: "",
    composition: "Sodium alkyl ether sulphate",
    firstAid: {
      eyes: "Rinse immediately with plenty of water. Continue to rinse for at least 15 minutes and get medical attention if there is still discomfort.",
      skin: "Take off contaminated clothing and shoes immediately. Flush area with clean water.",
      inhalation: "Remove affected person from source of contamination. Allow victim to breathe fresh air and rest.",
      ingestion: "Rinse mouth thoroughly with water. Do not induce vomiting without medical advice. Place unconscious person on the side in recovery position."
    },
    ppe: {
      respiratory: "Ensure adequate ventilation, do not breathe in spray or vapours.",
      hand: "Chemical-resistant, impervious gloves complying with an approved standard must always be worn when handling chemical products EN 374.",
      skin: "Protective clothing to be worn, Ref EN 13832.",
      eye: "Safety glasses complying to safety standard EN 166."
    },
    storageSpill: "Keep container tightly closed. Store in a demarcated bunded area to prevent release to drains and watercourses. Keep above the chemical's freezing point.",
    exposureLimit: "Long term exposure 8hrs and short-term exposure 15min.",
    transport: "N/A",
    disposal: "Disposal should always comply with the requirements of environmental protection and waste disposal legislation and any local authority requirements."
  },
  "Double Sided Glazing Tape": {
    reference: "",
    composition: "Sodium alkyl ether sulphate",
    firstAid: {
      eyes: "Rinse immediately with plenty of water. Continue to rinse for at least 15 minutes and get medical attention if there is still discomfort.",
      skin: "Take off contaminated clothing and shoes immediately. Flush area with clean water.",
      inhalation: "Remove affected person from source of contamination. Allow victim to breathe fresh air and rest.",
      ingestion: "Rinse mouth thoroughly with water. Do not induce vomiting without medical advice. Place unconscious person on the side in recovery position."
    },
    ppe: {
      respiratory: "Ensure adequate ventilation, do not breathe in spray or vapours.",
      hand: "Chemical-resistant, impervious gloves complying with an approved standard must always be worn when handling chemical products EN 374.",
      skin: "Protective clothing to be worn, Ref EN 13832.",
      eye: "Safety glasses complying to safety standard EN 166."
    },
    storageSpill: "Store in dry, cool and well-ventilated place. Store away from heat.",
    exposureLimit: "Long term exposure 8hrs and short-term exposure 15min.",
    transport: "N/A",
    disposal: "Dispose of waste materials in accordance with all local, regional, national, provincial, territorial and international regulations."
  },
  "Metal Section (Galvanised Steel)": {
    reference: "",
    composition: "",
    firstAid: {
      eyes: "Rinse immediately with plenty of water.",
      skin: "Rinse with running water then wash with soap. Treat cuts; if required seek immediate medical attention.",
      inhalation: "Effects on inhaling fumes: remove person to fresh air.",
      ingestion: "Not relevant."
    },
    ppe: {
      respiratory: "Ensure adequate ventilation, do not breathe in vapours.",
      hand: "Gloves should comply with approved standards.",
      skin: "Protective clothing to be worn, Ref EN 13832.",
      eye: "Safety glasses complying to safety standard."
    },
    storageSpill: "Pallets and packs should be stacked in a safe and stable manner; do not lift by straps as the tension may break and cause injury.",
    exposureLimit: "Long term exposure 8hrs and short-term exposure 15min.",
    transport: "N/A, should only take precautions on loading and unloading.",
    disposal: "Recycle or landfill."
  },
  "Thistle Multi Finish": {
    reference: "",
    composition: "Calcium sulphate hemihydrate, limestone, minor quartz.",
    firstAid: {
      eyes: "Flush eyes thoroughly with water for at least 15 minutes; seek medical assistance if irritation persists.",
      skin: "Wash promptly with soap and water.",
      inhalation: "Dust: remove person to fresh air; seek medical advice if breathing difficulty persists.",
      ingestion: "Rinse mouth with water; seek medical advice if discomfort occurs."
    },
    ppe: {
      respiratory: "Respiratory protection to EN149:2001 required when mixing/sanding.",
      hand: "Gloves recommended to avoid prolonged skin contact.",
      skin: "Wear overalls; avoid prolonged skin contact.",
      eye: "Wear eye protection to protect against dust."
    },
    storageSpill: "Store in dry conditions; keep pallets level or vertical (as delivered) to prevent settling in transport/storage.",
    exposureLimit: "Long term exposure 8hrs and short-term exposure 15min.",
    transport: "No special requirement.",
    disposal: "Dispose via authorised landfill in accordance with the Waste Management Licensing Regulations."
  }
};
