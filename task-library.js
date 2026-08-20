// ---------------------------------------------------------------
// TASK LIBRARY: METHOD STATEMENTS + RISK REGISTER
// Extracted from Donovan Brooks RAMS/COSHH docs across three live
// projects: Trident Place (MA6737), Breakthrough Properties /
// Trinity House Oxford (MA6312), Alchemy Asset Management / Reading
// Campus International (AR39983). Boilerplate tasks common to all
// three plus genuinely new tasks discovered per project. Selecting
// an entry in the RAMS Builder pre-fills a Method Statement or
// Risk Register task in the same shape the app already uses.
//
// Method statement shape: {title, scope, steps:[...], safety:[...]}
// Risk register shape: {task, personAtRisk, hazards:[
//   {hazard, whoAtRisk, controls, likelihood, severity}, ...]}
// ---------------------------------------------------------------

const METHOD_STATEMENT_LIBRARY = {
  "Material Offloading": {
    title: "Material Offloading",
    scope: "Offloading of delivery vehicles and distribution of materials to work areas.",
    steps: [
      "Deliveries by vehicle up to max 13 tonne, offloaded using Moffett forklift where required.",
      "6 person team working in pairs to move materials from unloading point.",
      "Designated unloading area agreed with site management before delivery arrival.",
      "A-frame trolleys used for glass, doors and boarded materials.",
      "Fire exits and access/egress routes kept clear at all times during offload."
    ],
    safety: [
      "Trained forklift/Moffett operators only.",
      "Exclusion zone maintained around vehicle during offload, banksman in attendance.",
      "No riding on materials or trailers."
    ]
  },
  "Installation of Partitions": {
    title: "Installation of Partitions",
    scope: "Erection of metal stud and plasterboard partition walls per approved drawings.",
    steps: [
      "Setting out using laser level and chalk lines from survey control points.",
      "Fix head track to aluminium channel using wafer head screws at 600mm centres.",
      "Fix floor track to finished floor.",
      "Install studs at specified centres, plumb and level checked.",
      "Install acoustic insulation (fibreglass roll) where specified.",
      "Fix plasterboard base layer, then face layer, at 300mm centre fixings."
    ],
    safety: [
      "Isolate power before drilling near live cables.",
      "Cut-resistant gloves and FFP3 dust protection when cutting board/studs.",
      "Podium or mobile tower used for any work above safe reach height."
    ]
  },
  "Installation of Temporary Wall": {
    title: "Installation of Temporary Wall",
    scope: "Double-skinned temporary partition with inward-opening door for site segregation.",
    steps: [
      "Setting out and floor protection; no mechanical fixings into finished floor, silicone-bonded floor track used.",
      "Ceiling track fixed into suspended ceiling support or approved structural members.",
      "Framework erected including door opening reinforcement.",
      "Door installed and checked: square, inward opening, hinges, latch, clearance, must not obstruct escape routes.",
      "Boarding fixed with rockwool insulation between boards, joints staggered."
    ],
    safety: [
      "Confirm escape route widths maintained at all times.",
      "No fixings into finished floor surfaces."
    ]
  },
  "Setting Out Works": {
    title: "Setting Out Works",
    scope: "Survey and marking of partition lines, door openings and service routes ahead of construction.",
    steps: [
      "Establish survey control: benchmark, control points, reference grid.",
      "Take measurements from grid lines, structural walls and columns.",
      "Mark out using approved spray paint, different colours for partition lines, door openings and service routes.",
      "Temporary marks removed/covered on completion where required."
    ],
    safety: [
      "No spray marking near ignition sources or ongoing hot works."
    ]
  },
  "Installation of Ceilings (MF Ceilings)": {
    title: "Installation of Ceilings (MF Ceilings)",
    scope: "Installation of MF suspended ceiling system including grid layout, hangers and plasterboard.",
    steps: [
      "Mark and set levels, confirming grid layout against lighting, diffusers and services.",
      "Fix wall angle/perimeter channel at specified centres with mitred corners.",
      "Drill to slab no deeper than 35mm for hanger fixings.",
      "Install hanger wires/rods per manufacturer and seismic code spacing.",
      "Suspend and level primary channels at 1200mm centres off chalk lines.",
      "Fix cross tees at 600x600mm module spacing (lay-in or clip-in).",
      "Install MF furring channels via MF clips.",
      "Fix plasterboard with drywall screws."
    ],
    safety: [
      "Appropriate access equipment risk-assessed for height of works.",
      "Gloves, hard hat, hi-vis and safety glasses for exposed metal grid edges.",
      "No materials carried up ladders; toe boards/exclusion zone below for dropped-object risk."
    ]
  },
  "Installation of Grid Ceilings with Metal Mesh Tiles": {
    title: "Installation of Grid Ceilings with Metal Mesh Tiles",
    scope: "Installation of exposed grid suspended ceiling system with metal mesh tiles.",
    steps: [
      "Setting out and datum established.",
      "Fix perimeter angle (L-trim) at 300-450mm anchor spacing.",
      "Install suspension system: hangers at 1200mm along main runners, within 300mm of ends, using GI wires or threaded rods.",
      "Fix main runner at 1200mm centres.",
      "Fix cross tee at 1200mm and 600mm spacing to form 600x600mm modules.",
      "Align and level grid to plus/minus 2-3mm tolerance.",
      "Place metal mesh tiles into grid openings, checking correct orientation and pattern alignment.",
      "Fit hold-down clips for stability and security.",
      "Coordinate cut-outs and independent support around services (lighting, HVAC diffusers, sprinklers, heavy fixtures)."
    ],
    safety: [
      "Neat, reinforced cut-outs only; no unsupported service penetrations through grid.",
      "Appropriate access equipment for height; gloves and eye protection when handling mesh tiles.",
      "Exclusion zone below open grid sections during installation."
    ]
  },
  "Installation of Underfloor Barriers": {
    title: "Installation of Underfloor Barriers",
    scope: "Fire-stopping of underfloor voids using ablative batts and firestop mastic at raised access floor level.",
    steps: [
      "Pre-checks: verify fire-stopping details against approved drawings, confirm service penetrations complete and tested, confirm underfloor area clean, dry and accessible.",
      "Preparation: carefully remove raised access floor panels, identify all service penetrations, clean surfaces for adhesion, place temporary barriers to segregate work zones.",
      "Install Rockwool ablative batts: measure openings, cut to tight friction fit, install vertically or horizontally per design, ensure full substrate contact and mechanical support via brackets/framing where required, maintain continuity of fire barrier across entire opening.",
      "Seal with fire-rated firestop mastic to all joints and around penetrations, correct depth/coverage per manufacturer, airtight/smoke-tight finish, additional backing materials where required.",
      "Treat service penetrations with adequate spacing per fire test evidence; additional wraps, collars or coatings fitted where specified; seal all gaps fully.",
      "Reinstate raised floor: inspect completed barriers before closing, replace panels securely, avoid damage during reinstatement."
    ],
    safety: [
      "Gloves, eye protection, steel toe boots.",
      "FFP2/FFP3 dust masks when cutting batts; adequate ventilation maintained in underfloor voids.",
      "Proper lifting tools used for floor panels; panels not stacked unsafely."
    ]
  },
  "Installation of Glazing": {
    title: "Installation of Glazing",
    scope: "Installation of glass partitions including framing, glazing and sealing.",
    steps: [
      "Setting out to approved drawings.",
      "Minimum 25mm glazing channel fitted to head, base and abutments.",
      "Glass surveyed and specialist labourer arranged for loadout.",
      "Dry joint tape edge protection applied.",
      "Plastic packers used for level.",
      "Glass suckers used to lift and seal joints; push-in gaskets fitted for clean finish."
    ],
    safety: [
      "Mechanical handling/vacuum suckers preferred over manual carry.",
      "5-6 degree transport rack angle; 3 degree static rack lean; glass not in contact with harder substances.",
      "Banksman for large panes; wind conditions checked before handling externally/at height."
    ]
  },
  "Installation of Kitchen, Worktops and Wall Tiles (Splashback)": {
    title: "Installation of Kitchen, Worktops and Wall Tiles (Splashback)",
    scope: "Installation of kitchen units, worktops and wall tile splashback. Electrical, plumbing, drainage and mechanical connections excluded — carried out by specialist contractors.",
    steps: [
      "Pre-checks: verify dimensions against drawings, confirm walls/floors level, dry and structurally sound, confirm services correctly positioned, check materials undamaged.",
      "Kitchen units: set datum line, position/level/secure base units, mark and bracket wall units, mount and align, fix units together for uniformity.",
      "Worktops: measure and cut to size, cut out for sinks/taps/appliances, position and secure to base units, join sections via bolts/adhesives, seal joints and wall interfaces for waterproofing.",
      "Wall prep for tiling: clean and prime surfaces, ensure flat and suitable, mark out layout to avoid small cuts and ensure symmetry.",
      "Wall tile installation: notched-trowel adhesive application, tiles fixed with spacers, alignment checks, adhesive cure time per manufacturer, grout application and clean-up, silicone sealant at worktop junctions/corners.",
      "Finishing: fit trims/edging, clean surfaces, remove protective coverings, snag and rectify."
    ],
    safety: [
      "Mechanical aids (trolleys, lifts) and team lifting for heavy units; loads broken into manageable sizes.",
      "Appropriate cutting equipment with guards; dust suppression via wet cutting or extraction; FFP3 RPE where silica dust present.",
      "Certified step ladders or podium steps only, inspected before use; 110V/battery tools, PAT tested."
    ]
  },
  "Tape and Jointing": {
    title: "Tape and Jointing",
    scope: "Taping and filling of plasterboard joints ahead of decoration.",
    steps: [
      "Joint taping to all plasterboard joints.",
      "Angle/edge beads fitted where specified.",
      "First coat filler applied.",
      "Second coat and joint cement applied.",
      "Sanding carried out with dust extraction unit.",
      "Priming applied if specified."
    ],
    safety: [
      "Dust masks for filler mixing; eye protection.",
      "Dust collection fitted to power sanders.",
      "No naked flames near solvent-based products."
    ]
  },
  "Installation of Doors": {
    title: "Installation of Doors",
    scope: "Installation of doors, frames and ironmongery.",
    steps: [
      "Position and mark hinges.",
      "Cut hinge apertures with router.",
      "Fix hinges.",
      "Fit door to frame.",
      "Install ironmongery: locks, latches, handles.",
      "Final adjustment and testing for smooth opening/closing."
    ],
    safety: [
      "Sharp/maintained hand tools only; retractable blades where cutting.",
      "Power tools 110V/battery, PAT tested, visually inspected before use."
    ]
  },
  "Installation of Timber Ramps": {
    title: "Installation of Timber Ramps",
    scope: "Construction and installation of timber access ramps with handrails and edge protection.",
    steps: [
      "Site prep and setting out: clear and level area, string lines/pegs for position and slope.",
      "Construct landings and foundation: structural timber top/bottom landing frames anchored to structure or independent footings, treated timber kicker plate on compacted base for ground connection.",
      "Cut and fix ramp stringers: angle calculated for planned slope (10.5 degrees common for a 1:6 slope), fixed to landing ledger board via joist hangers or notched connections, spirit level check across stringers.",
      "Install decking and surface: boards perpendicular to stringers, 5-10mm drainage gap, pre-drilled holes, two screws per joist intersection.",
      "Install handrails and edge protection: posts at intervals not exceeding 1.8m, handrail height 860-920mm, toe board/curb minimum 50mm to prevent wheel slip-off."
    ],
    safety: [
      "Ramp gradient to comply with regulations; timber securely fixed.",
      "110V or battery tools only, cables routed safely.",
      "Barriers and warning signage while ramp under construction."
    ]
  }
};

const RISK_ASSESSMENT_LIBRARY = {
  "Vehicle Offloading (Moffett/Delivery Vehicle)": {
    task: "Vehicle offloading (Moffett/delivery vehicle)",
    personAtRisk: "Operatives, Site Visitors",
    hazards: [
      { hazard: "Crush/impact injury during vehicle offloading", whoAtRisk: "Operatives, Site Visitors", controls: "Trained operators only, exclusion zone maintained, banksman in attendance.", likelihood: 2, severity: 3 }
    ]
  },
  "Manual Handling of Plasterboard/Doors/Glass": {
    task: "Manual handling of plasterboard, doors and glass",
    personAtRisk: "Operatives",
    hazards: [
      { hazard: "Musculoskeletal strain from manual handling", whoAtRisk: "Operatives", controls: "Two-person lifts, A-frame trolleys, rest points, manual handling training.", likelihood: 3, severity: 2 }
    ]
  },
  "Use of Goods Lift": {
    task: "Use of goods lift",
    personAtRisk: "Operatives",
    hazards: [
      { hazard: "Entrapment or mechanical failure of goods lift", whoAtRisk: "Operatives", controls: "Lift inspected and approved, load capacity checked, authorised operators only.", likelihood: 2, severity: 3 },
      { hazard: "Overloading/unstable load in lift", whoAtRisk: "Operatives", controls: "Even load distribution, A-frames used, no riding with unsecured materials.", likelihood: 2, severity: 2 }
    ]
  },
  "Handling Glass Panels and Door Sets": {
    task: "Handling glass panels and door sets",
    personAtRisk: "Operatives",
    hazards: [
      { hazard: "Cuts and crush injuries handling glass/door sets", whoAtRisk: "Operatives", controls: "Kevlar sleeves and gloves, vertical carry, two-person lifts.", likelihood: 2, severity: 3 }
    ]
  },
  "Slips/Trips/Obstructions During Movement": {
    task: "Movement of materials around site",
    personAtRisk: "Operatives, Other Trades",
    hazards: [
      { hazard: "Slips, trips or obstructions during material movement", whoAtRisk: "Operatives, Other Trades", controls: "Clear routes maintained, no trailing cables, dry conditions, appropriate footwear.", likelihood: 2, severity: 2 }
    ]
  },
  "Poor Stacking/Unstable Storage": {
    task: "Storage of materials",
    personAtRisk: "Operatives",
    hazards: [
      { hazard: "Collapse or falling objects from unstable stacking", whoAtRisk: "Operatives", controls: "Flat, stable stacking; vertical A-frame storage for glass/doors.", likelihood: 2, severity: 3 }
    ]
  },
  "Interaction with Other Trades/Site Traffic": {
    task: "Interaction with other trades and site traffic",
    personAtRisk: "Operatives, Other Trades",
    hazards: [
      { hazard: "Collision with other trades or site traffic", whoAtRisk: "Operatives, Other Trades", controls: "Planned movements, exclusion zones, avoid peak periods.", likelihood: 2, severity: 3 }
    ]
  },
  "Fatigue/Overexertion": {
    task: "Extended duration tasks",
    personAtRisk: "Operatives",
    hazards: [
      { hazard: "Fatigue or overexertion", whoAtRisk: "Operatives", controls: "Rotation of duties, rest breaks, supervisor monitoring.", likelihood: 2, severity: 2 }
    ]
  },
  "Emergency Situation (Injury, Fire, Lift Failure)": {
    task: "Emergency response readiness",
    personAtRisk: "Operatives, Site Visitors",
    hazards: [
      { hazard: "Emergency situation: injury, fire or lift failure", whoAtRisk: "Operatives, Site Visitors", controls: "Clear escape routes, briefed first aiders on site, daily lift check.", likelihood: 1, severity: 4 }
    ]
  },
  "Working in Dusty Environments": {
    task: "Working in dusty environments",
    personAtRisk: "Operatives",
    hazards: [
      { hazard: "Silicosis/COPD/asthma from construction dust and RCS", whoAtRisk: "Operatives", controls: "Health surveillance, dust extraction at source, water suppression, FFP3 face-fit-tested RPE, isolated cutting stations, no dry sweeping.", likelihood: 2, severity: 4 }
    ]
  },
  "Working in Noisy Environments": {
    task: "Working in noisy environments",
    personAtRisk: "Operatives",
    hazards: [
      { hazard: "Hearing damage from prolonged noise exposure", whoAtRisk: "Operatives", controls: "87dB daily / 140dB peak limits observed, ear defenders, noise assessments, health surveillance.", likelihood: 2, severity: 3 }
    ]
  },
  "Preventing Slips/Trips/Falls at Height and Ground": {
    task: "Preventing slips, trips and falls",
    personAtRisk: "Operatives",
    hazards: [
      { hazard: "Slips, trips or falls at height or ground level", whoAtRisk: "Operatives", controls: "Edge protection, tagged platforms, no trailing cables, slip-resistant footwear.", likelihood: 2, severity: 4 }
    ]
  },
  "Using Nail Gun (Paslode/Spit)": {
    task: "Using nail gun (Paslode/Spit)",
    personAtRisk: "Operatives",
    hazards: [
      { hazard: "Puncture wounds from nail gun use", whoAtRisk: "Operatives", controls: "Unload when not in use or on ladders, BS EN 166B goggles worn, planned maintenance, CO risk assessed in confined space use.", likelihood: 2, severity: 3 }
    ]
  },
  "Using Hand Tools": {
    task: "Using hand tools",
    personAtRisk: "Operatives",
    hazards: [
      { hazard: "Cuts from hand tool blades", whoAtRisk: "Operatives", controls: "Retractable blades used, tools sharp and maintained, guards never removed.", likelihood: 2, severity: 2 }
    ]
  },
  "Using Portable Power Tools": {
    task: "Using portable power tools",
    personAtRisk: "Operatives",
    hazards: [
      { hazard: "Electrocution from power tool use", whoAtRisk: "Operatives", controls: "110V/battery only, PAT tested, visual inspection before use, RCD protection.", likelihood: 1, severity: 4 }
    ]
  },
  "Preventing Falling Debris/Tools from Height": {
    task: "Preventing falling debris and tools from height",
    personAtRisk: "Operatives, Site Visitors",
    hazards: [
      { hazard: "Falling debris or tools from height", whoAtRisk: "Operatives, Site Visitors", controls: "Toe boards fitted, tools tethered, exclusion zones below, no materials carried up ladders.", likelihood: 2, severity: 4 }
    ]
  },
  "Working from Step Ladders": {
    task: "Working from step ladders",
    personAtRisk: "Operatives",
    hazards: [
      { hazard: "Fall from step ladder", whoAtRisk: "Operatives", controls: "Ladder footed, no overreach, inspected before use, kept away from power cables, never leant against unstable surfaces. Confirm site-specific stepladder policy — some main contractors ban them outright, others permit with conditions.", likelihood: 2, severity: 3 }
    ]
  },
  "Working on Mobile Scaffold (PASMA)": {
    task: "Working on mobile scaffold (PASMA)",
    personAtRisk: "Operatives",
    hazards: [
      { hazard: "Fall or collapse of mobile scaffold tower", whoAtRisk: "Operatives", controls: "Height-to-base ratios observed (4:1 internal/3.5:1 external static, 3.5:1 inside/3:1 outside mobile), max 9.6m mobile/12m static, brakes locked when static, no split-level working, ladder hatches closed.", likelihood: 1, severity: 4 }
    ]
  },
  "Movement of Box Materials/General Materials/Pipes and Rolls": {
    task: "Movement of general materials, pipes and rolls",
    personAtRisk: "Operatives",
    hazards: [
      { hazard: "Manual handling injury moving materials", whoAtRisk: "Operatives", controls: "Correct manual handling technique, mechanical aids, team lifts, per HSE guidance.", likelihood: 2, severity: 2 }
    ]
  },
  "General Carpentry Works": {
    task: "General carpentry works",
    personAtRisk: "Operatives",
    hazards: [
      { hazard: "Cuts from saw blades; wood dust exposure; back injury at workbench", whoAtRisk: "Operatives", controls: "Saw blade guarding, wood dust extraction, no dry sweeping, correct workbench height.", likelihood: 2, severity: 2 }
    ]
  },
  "MDF Cutting/Drilling": {
    task: "MDF cutting and drilling",
    personAtRisk: "Operatives",
    hazards: [
      { hazard: "Dust inhalation from MDF cutting (formaldehyde/wood dust)", whoAtRisk: "Operatives", controls: "Low-emission/no-added-formaldehyde board preferred, designated ventilated cutting station, HEPA vacuum, FFP3 RPE face-fit tested.", likelihood: 2, severity: 3 }
    ]
  },
  "Preparing Surfaces for Decoration": {
    task: "Preparing surfaces for decoration",
    personAtRisk: "Operatives",
    hazards: [
      { hazard: "Dust and chemical exposure preparing surfaces", whoAtRisk: "Operatives", controls: "Dust masks for filler mixing, COSHH assessment for chemical strippers, no naked flames, lead paint check before sanding old work.", likelihood: 2, severity: 3 }
    ]
  },
  "General Plastering/Tape and Jointing": {
    task: "General plastering and tape/jointing",
    personAtRisk: "Operatives",
    hazards: [
      { hazard: "Dust exposure from plaster and sanding", whoAtRisk: "Operatives", controls: "Dry plaster dust controlled, eye protection worn, dust collection fitted to power sanders.", likelihood: 2, severity: 2 }
    ]
  },
  "Suspended Ceiling Works": {
    task: "Suspended ceiling works",
    personAtRisk: "Operatives",
    hazards: [
      { hazard: "Falls from height and dropped materials during ceiling works", whoAtRisk: "Operatives", controls: "Appropriate access equipment risk-assessed, exposed metal grid edge hazards managed, gloves/hard hats/hi-vis/safety glasses worn.", likelihood: 2, severity: 4 }
    ]
  },
  "Installation of Partitions and Metal Studs": {
    task: "Installation of partitions and metal studs",
    personAtRisk: "Operatives",
    hazards: [
      { hazard: "Combined hazard set: manual handling, slips/trips, cut edges, dust, noise, impact, work at height, electrical near live cables", whoAtRisk: "Operatives", controls: "Isolate power before drilling, cut-resistant gloves, FFP3 dust protection, podium/mobile tower for height.", likelihood: 2, severity: 3 }
    ]
  },
  "Handling and Installing Glass": {
    task: "Handling and installing glass",
    personAtRisk: "Operatives",
    hazards: [
      { hazard: "Broken or exploding glass during handling/installation", whoAtRisk: "Operatives", controls: "Mechanical handling/vacuum suckers preferred, correct transport rack angles, banksman for large panes, wind checks, glass not in contact with harder substances.", likelihood: 1, severity: 4 }
    ]
  },
  "Removing Ceiling Tiles": {
    task: "Removing ceiling tiles",
    personAtRisk: "Operatives",
    hazards: [
      { hazard: "Falling tiles / manual handling injury removing ceiling tiles", whoAtRisk: "Operatives", controls: "Pairs working, max 3 tiles lifted at a time, no throwing or dropping, secure storage.", likelihood: 2, severity: 2 }
    ]
  },
  "Removing Glass Doors": {
    task: "Removing glass doors",
    personAtRisk: "Operatives",
    hazards: [
      { hazard: "Cuts or crush injury removing glass doors", whoAtRisk: "Operatives", controls: "Two-plus person removal, criss-cross tape over glass, padded storage/transport rack, no excessive force on stuck panels.", likelihood: 2, severity: 3 }
    ]
  },
  "Good Housekeeping": {
    task: "Good housekeeping",
    personAtRisk: "Operatives, Site Visitors",
    hazards: [
      { hazard: "Trips/hazardous substance exposure from poor housekeeping", whoAtRisk: "Operatives, Site Visitors", controls: "Designated storage, no debris on platforms, clean-as-you-go, hazardous substances locked and labelled.", likelihood: 2, severity: 2 }
    ]
  },
  "Fire (Cutting Metal Studs etc.)": {
    task: "Fire risk from cutting metal studs and similar hot-spark work",
    personAtRisk: "Operatives, Site Visitors",
    hazards: [
      { hazard: "Fire risk from sparks/thermal work cutting metal studs", whoAtRisk: "Operatives, Site Visitors", controls: "Fire extinguishers positioned, fire doors kept shut/unobstructed, designated cutting area away from combustibles, competent trained operatives only.", likelihood: 1, severity: 4 }
    ]
  },
  "Movement of Vehicles/Site Traffic in Car Park": {
    task: "Movement of vehicles and site traffic",
    personAtRisk: "Operatives, Site Visitors",
    hazards: [
      { hazard: "Collision with vehicles/site traffic", whoAtRisk: "Operatives, Site Visitors", controls: "5mph speed limit, single file, designated bays, CCTV monitored, no phone use while driving.", likelihood: 2, severity: 3 }
    ]
  },
  "Use of Various Work Equipment/Tools": {
    task: "Use of various work equipment and tools (drilling, screwing, cutting, hammering)",
    personAtRisk: "Operatives",
    hazards: [
      { hazard: "Injury from tools/equipment used incorrectly or while impaired", whoAtRisk: "Operatives", controls: "Maintenance programme in place, no use under influence of drugs/alcohol, prescribed medication flagged to site manager.", likelihood: 2, severity: 2 }
    ]
  },
  "Working in Confined Space": {
    task: "Working in confined space",
    personAtRisk: "Operatives",
    hazards: [
      { hazard: "Asphyxiation, entrapment or poor air quality in confined space", whoAtRisk: "Operatives", controls: "Permit to work, forced ventilation, continuous monitoring for long tasks, rescue plan, FFP2/FFP3 RPE, weight limits on materials moved in.", likelihood: 1, severity: 5 }
    ]
  },
  "Timber Ramp Installation": {
    task: "Constructing and installing timber ramps",
    personAtRisk: "Operatives, Site Visitors",
    hazards: [
      { hazard: "Drilling into body parts, cuts and puncture injuries", whoAtRisk: "Operatives", controls: "Trained/competent operatives only, 110V or battery tools only, cables routed safely.", likelihood: 2, severity: 2 },
      { hazard: "Falling from height during ramp construction (fracture/concussion/death)", whoAtRisk: "Operatives", controls: "Ramp gradient to comply with regulations, edges marked and protected, avoid working at height where possible, barriers and warning signage.", likelihood: 1, severity: 4 },
      { hazard: "Manual handling musculoskeletal injury handling timber", whoAtRisk: "Operatives", controls: "Team lifting and mechanical aids where practicable, timber cut to manageable sizes, rest breaks.", likelihood: 2, severity: 2 }
    ]
  },
  "Installation of Kitchen Worktop and Wall Tiles": {
    task: "Installing kitchen worktop and wall tiles to splashback",
    personAtRisk: "Site Operatives, Visitors",
    hazards: [
      { hazard: "Musculoskeletal injuries: strains, sprains, back injuries, cuts and bruises, crush and head injuries", whoAtRisk: "Site Operatives, Visitors", controls: "Manual handling assessment conducted, mechanical aids (trolleys, lifts), team lifting for heavy items, loads broken into manageable sizes, manual handling training.", likelihood: 2, severity: 3 },
      { hazard: "Cuts/dust exposure from cutting worktops and tiles", whoAtRisk: "Site Operatives, Visitors", controls: "Appropriate cutting equipment with guards, PPE (gloves, goggles, face shields), dust suppression via wet cutting or extraction, FFP3 RPE where silica dust present.", likelihood: 2, severity: 3 },
      { hazard: "Work-at-height risk positioning wall units/tiles", whoAtRisk: "Site Operatives, Visitors", controls: "Certified step ladders or podium steps, inspected before use.", likelihood: 2, severity: 2 }
    ]
  }
};
