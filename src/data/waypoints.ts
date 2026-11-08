export interface CircuitWaypoint {
  id: string;
  name: string;
  position: [number, number, number];
  isModuleStop?: boolean;
  moduleId?: 'profile' | 'education' | 'bayora' | 'skills' | 'ustaad' | 'webguard' | 'contact' | 'experience' | 'paypal';
  moduleTitle?: string;
  description?: string;
}

export const circuitWaypoints: CircuitWaypoint[] = [
  {
    "id": "plaza-start",
    "name": "Central Grand Plaza",
    "position": [
      0,
      0.45,
      8
    ],
    "isModuleStop": true,
    "moduleId": "profile",
    "moduleTitle": "Utkarsh Arora // Central Profile",
    "description": "Starting line beside the iconic Utkarsh Arora hologram pedestal."
  },
  {
    "id": "plaza-west-corridor",
    "name": "Central West Corridor",
    "position": [
      -16,
      0.45,
      5
    ],
    "description": "Accelerating west along the grand Dubai palm boulevard."
  },
  {
    "id": "ellipse-west-merge",
    "name": "Grand Ellipse Western Gateway",
    "position": [
      -34,
      0.45,
      2
    ],
    "description": "Entering the high-speed aerodynamic Grand Ellipse."
  },
  {
    "id": "ellipse-pt-0",
    "name": "Grand Ellipse Boulevard",
    "position": [
      -47.7,
      0.45,
      -4.26
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-1",
    "name": "Grand Ellipse Boulevard",
    "position": [
      -46.87,
      0.45,
      -8.19
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "stop-education",
    "name": "Education Boulevard",
    "position": [
      -45.54,
      0.45,
      -12.02
    ],
    "isModuleStop": true,
    "moduleId": "education",
    "moduleTitle": "Education Boulevard // Galgotias ECE",
    "description": "B.Tech in Electronics & Communication Engineering (CGPA 7.3/10)."
  },
  {
    "id": "ellipse-pt-3",
    "name": "Grand Ellipse Boulevard",
    "position": [
      -43.7,
      0.45,
      -15.72
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-4",
    "name": "Grand Ellipse Boulevard",
    "position": [
      -41.38,
      0.45,
      -19.25
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-5",
    "name": "Grand Ellipse Boulevard",
    "position": [
      -38.62,
      0.45,
      -22.57
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-6",
    "name": "Grand Ellipse Boulevard",
    "position": [
      -35.42,
      0.45,
      -25.64
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-7",
    "name": "Grand Ellipse Boulevard",
    "position": [
      -31.84,
      0.45,
      -28.43
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "stop-bayora",
    "name": "Bayora AI Security Citadel",
    "position": [
      -27.92,
      0.45,
      -30.91
    ],
    "isModuleStop": true,
    "moduleId": "bayora",
    "moduleTitle": "Project 01: Bayora // AI Safety Testing",
    "description": "Adversarial AI safety infrastructure with tamper-evident audit trails."
  },
  {
    "id": "ellipse-pt-9",
    "name": "Grand Ellipse Boulevard",
    "position": [
      -23.68,
      0.45,
      -33.05
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-10",
    "name": "Grand Ellipse Boulevard",
    "position": [
      -19.19,
      0.45,
      -34.83
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-11",
    "name": "Grand Ellipse Boulevard",
    "position": [
      -14.48,
      0.45,
      -36.23
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-12",
    "name": "Grand Ellipse Boulevard",
    "position": [
      -9.62,
      0.45,
      -37.23
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-13",
    "name": "Grand Ellipse Boulevard",
    "position": [
      -4.65,
      0.45,
      -37.82
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "stop-skills",
    "name": "Technology Tower",
    "position": [
      0.37,
      0.45,
      -38
    ],
    "isModuleStop": true,
    "moduleId": "skills",
    "moduleTitle": "Technology Tower // 7 Skill Districts",
    "description": "65-meter crystalline glass skyscraper showcasing Data Analytics, Python, SQL & Full-Stack."
  },
  {
    "id": "ellipse-pt-15",
    "name": "Grand Ellipse Boulevard",
    "position": [
      5.38,
      0.45,
      -37.76
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-16",
    "name": "Grand Ellipse Boulevard",
    "position": [
      10.34,
      0.45,
      -37.11
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-17",
    "name": "Grand Ellipse Boulevard",
    "position": [
      15.18,
      0.45,
      -36.05
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-18",
    "name": "Grand Ellipse Boulevard",
    "position": [
      19.86,
      0.45,
      -34.6
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-19",
    "name": "Grand Ellipse Boulevard",
    "position": [
      24.32,
      0.45,
      -32.76
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-20",
    "name": "Grand Ellipse Boulevard",
    "position": [
      28.51,
      0.45,
      -30.57
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "stop-ustaad",
    "name": "Eurogrip Ustaad Hub",
    "position": [
      32.39,
      0.45,
      -28.04
    ],
    "isModuleStop": true,
    "moduleId": "ustaad",
    "moduleTitle": "Project 02: Eurogrip Ustaad Network",
    "description": "Intelligent mechanic empowerment, Fitment Passport QR & advocacy ecosystem."
  },
  {
    "id": "ellipse-pt-22",
    "name": "Grand Ellipse Boulevard",
    "position": [
      35.92,
      0.45,
      -25.21
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-23",
    "name": "Grand Ellipse Boulevard",
    "position": [
      39.05,
      0.45,
      -22.1
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-24",
    "name": "Grand Ellipse Boulevard",
    "position": [
      41.75,
      0.45,
      -18.75
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-25",
    "name": "Grand Ellipse Boulevard",
    "position": [
      44,
      0.45,
      -15.19
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-26",
    "name": "Grand Ellipse Boulevard",
    "position": [
      45.76,
      0.45,
      -11.47
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-27",
    "name": "Grand Ellipse Boulevard",
    "position": [
      47.03,
      0.45,
      -7.62
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-28",
    "name": "Grand Ellipse Boulevard",
    "position": [
      47.77,
      0.45,
      -3.68
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-29",
    "name": "Grand Ellipse Boulevard",
    "position": [
      48,
      0.45,
      0.29
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-30",
    "name": "Grand Ellipse Boulevard",
    "position": [
      47.7,
      0.45,
      4.26
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-31",
    "name": "Grand Ellipse Boulevard",
    "position": [
      46.87,
      0.45,
      8.19
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-32",
    "name": "Grand Ellipse Boulevard",
    "position": [
      45.54,
      0.45,
      12.02
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "stop-webguard",
    "name": "WebGuard AI Observatory",
    "position": [
      43.7,
      0.45,
      15.72
    ],
    "isModuleStop": true,
    "moduleId": "webguard",
    "moduleTitle": "Project 04: WebGuard AI",
    "description": "Autonomous website reliability, TinyFish automation & competitive intelligence."
  },
  {
    "id": "ellipse-pt-34",
    "name": "Grand Ellipse Boulevard",
    "position": [
      41.38,
      0.45,
      19.25
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-35",
    "name": "Grand Ellipse Boulevard",
    "position": [
      38.62,
      0.45,
      22.57
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-36",
    "name": "Grand Ellipse Boulevard",
    "position": [
      35.42,
      0.45,
      25.64
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-37",
    "name": "Grand Ellipse Boulevard",
    "position": [
      31.84,
      0.45,
      28.43
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-38",
    "name": "Grand Ellipse Boulevard",
    "position": [
      27.92,
      0.45,
      30.91
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "stop-garage",
    "name": "The Executive Garage",
    "position": [
      23.68,
      0.45,
      33.05
    ],
    "isModuleStop": true,
    "moduleId": "contact",
    "moduleTitle": "Contact Garage // Executive Terminal",
    "description": "High-tech terminal showroom: connect via Email, LinkedIn, GitHub & Resume."
  },
  {
    "id": "ellipse-pt-40",
    "name": "Grand Ellipse Boulevard",
    "position": [
      19.19,
      0.45,
      34.83
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-41",
    "name": "Grand Ellipse Boulevard",
    "position": [
      14.48,
      0.45,
      36.23
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-42",
    "name": "Grand Ellipse Boulevard",
    "position": [
      9.62,
      0.45,
      37.23
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-43",
    "name": "Grand Ellipse Boulevard",
    "position": [
      4.65,
      0.45,
      37.82
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-44",
    "name": "Grand Ellipse Boulevard",
    "position": [
      -0.37,
      0.45,
      38
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-45",
    "name": "Grand Ellipse Boulevard",
    "position": [
      -5.38,
      0.45,
      37.76
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-46",
    "name": "Grand Ellipse Boulevard",
    "position": [
      -10.34,
      0.45,
      37.11
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-47",
    "name": "Grand Ellipse Boulevard",
    "position": [
      -15.18,
      0.45,
      36.05
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "stop-experience",
    "name": "Experience District",
    "position": [
      -19.86,
      0.45,
      34.6
    ],
    "isModuleStop": true,
    "moduleId": "experience",
    "moduleTitle": "Experience District // Internships",
    "description": "Professional internships: Auspify Technologies, HashBit, DataX Web Solutions."
  },
  {
    "id": "ellipse-pt-49",
    "name": "Grand Ellipse Boulevard",
    "position": [
      -24.32,
      0.45,
      32.76
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-50",
    "name": "Grand Ellipse Boulevard",
    "position": [
      -28.51,
      0.45,
      30.57
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-51",
    "name": "Grand Ellipse Boulevard",
    "position": [
      -32.39,
      0.45,
      28.04
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-52",
    "name": "Grand Ellipse Boulevard",
    "position": [
      -35.92,
      0.45,
      25.21
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-53",
    "name": "Grand Ellipse Boulevard",
    "position": [
      -39.05,
      0.45,
      22.1
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "stop-paypal",
    "name": "PayPal Resolve Spire",
    "position": [
      -41.75,
      0.45,
      18.75
    ],
    "isModuleStop": true,
    "moduleId": "paypal",
    "moduleTitle": "Project 03: PayPal Resolve",
    "description": "AI payment intelligence, reconciliation & merchant resolution engine."
  },
  {
    "id": "ellipse-pt-55",
    "name": "Grand Ellipse Boulevard",
    "position": [
      -44,
      0.45,
      15.19
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-56",
    "name": "Grand Ellipse Boulevard",
    "position": [
      -45.76,
      0.45,
      11.47
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-57",
    "name": "Grand Ellipse Boulevard",
    "position": [
      -47.03,
      0.45,
      7.62
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-58",
    "name": "Grand Ellipse Boulevard",
    "position": [
      -47.77,
      0.45,
      3.68
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  },
  {
    "id": "ellipse-pt-59",
    "name": "Grand Ellipse Boulevard",
    "position": [
      -48,
      0.45,
      -0.29
    ],
    "description": "Cruising smoothly along the illuminated aerodynamic ellipse."
  }
];
