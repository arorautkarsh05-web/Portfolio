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
  // 0. START: Central Grand Plaza Roundabout (facing West towards West Boulevard)
  {
    id: 'plaza-start',
    name: 'Central Grand Plaza',
    position: [0, 0.45, 8],
    isModuleStop: true,
    moduleId: 'profile',
    moduleTitle: 'Utkarsh Arora // Central Profile',
    description: 'Starting line beside the iconic Utkarsh Arora hologram pedestal.'
  },

  // 1. West Boulevard Junction
  {
    id: 'west-junction-1',
    name: 'West Boulevard Junction',
    position: [-18, 0.45, 0],
    description: 'Heading west along the palm-lined Dubai boulevard.'
  },

  // 2. Turn onto West Avenue heading North
  {
    id: 'west-ave-turn',
    name: 'West Avenue Corner',
    position: [-35, 0.45, 0],
    description: 'Turning north onto West Academic Avenue.'
  },

  // 3. STOP 1: Education Boulevard (Car is ON the road, Education Campus is right on the side!)
  {
    id: 'stop-education',
    name: 'Education Boulevard',
    position: [-35, 0.45, -15],
    isModuleStop: true,
    moduleId: 'education',
    moduleTitle: 'Education Boulevard // Galgotias ECE',
    description: 'B.Tech in Electronics & Communication Engineering (CGPA 7.3/10).'
  },

  // 4. STOP 2: Bayora Security Citadel (Car is ON West Avenue, Citadel is on the left at [-45, -35])
  {
    id: 'stop-bayora',
    name: 'Bayora AI Security Citadel',
    position: [-35, 0.45, -35],
    isModuleStop: true,
    moduleId: 'bayora',
    moduleTitle: 'Project 01: Bayora // AI Safety Testing',
    description: 'Adversarial AI safety infrastructure with tamper-evident audit trails.'
  },

  // 5. STOP 3: Technology Tower (Car is ON North Avenue, Tower is in front at [0, -45])
  {
    id: 'stop-skills',
    name: 'Technology Tower',
    position: [0, 0.45, -35],
    isModuleStop: true,
    moduleId: 'skills',
    moduleTitle: 'Technology Tower // 7 Skill Districts',
    description: '65-meter crystalline glass skyscraper showcasing Data Analytics, Python, SQL & Full-Stack.'
  },

  // 6. STOP 4: Eurogrip Ustaad Network (Car is ON North-East Avenue, Ustaad Hub is on the right at [45, -35])
  {
    id: 'stop-ustaad',
    name: 'Eurogrip Ustaad Hub',
    position: [35, 0.45, -35],
    isModuleStop: true,
    moduleId: 'ustaad',
    moduleTitle: 'Project 02: Eurogrip Ustaad Network',
    description: 'Intelligent mechanic empowerment, Fitment Passport QR & advocacy ecosystem.'
  },

  // 7. East Avenue Midpoint (Crossing East Boulevard)
  {
    id: 'east-ave-mid',
    name: 'East Avenue Marina Corridor',
    position: [35, 0.45, 0],
    description: 'Cruising south along East Avenue.'
  },

  // 8. STOP 5: WebGuard AI Observatory (Car is ON East Avenue, WebGuard is on the right at [45, 35])
  {
    id: 'stop-webguard',
    name: 'WebGuard AI Observatory',
    position: [35, 0.45, 35],
    isModuleStop: true,
    moduleId: 'webguard',
    moduleTitle: 'Project 04: WebGuard AI',
    description: 'Autonomous website reliability, TinyFish automation & competitive intelligence.'
  },

  // 9. STOP 6: The Executive Garage (Car is ON South Avenue, Showroom is on the left at [30, 35])
  {
    id: 'stop-garage',
    name: 'The Executive Garage',
    position: [20, 0.45, 35],
    isModuleStop: true,
    moduleId: 'contact',
    moduleTitle: 'Contact Garage // Executive Terminal',
    description: 'High-tech terminal showroom: connect via Email, LinkedIn, GitHub & Resume.'
  },

  // 10. STOP 7: Experience District (Car is ON South Avenue, Skybridge is on the right at [-30, 35])
  {
    id: 'stop-experience',
    name: 'Experience District',
    position: [-20, 0.45, 35],
    isModuleStop: true,
    moduleId: 'experience',
    moduleTitle: 'Experience District // Internships',
    description: 'Professional internships: Auspify Technologies, HashBit, DataX Web Solutions.'
  },

  // 11. STOP 8: PayPal Resolve Spire (Car is ON South-West Avenue, Spire is on the left at [-45, 35])
  {
    id: 'stop-paypal',
    name: 'PayPal Resolve Spire',
    position: [-35, 0.45, 35],
    isModuleStop: true,
    moduleId: 'paypal',
    moduleTitle: 'Project 03: PayPal Resolve',
    description: 'AI payment intelligence, reconciliation & merchant resolution engine.'
  },

  // 12. Turn North onto West Avenue
  {
    id: 'west-return-mid',
    name: 'West Avenue Return Road',
    position: [-35, 0.45, 14],
    description: 'Heading north towards Central Boulevard.'
  },

  // 13. Re-enter Central Plaza Roundabout
  {
    id: 'central-return-gate',
    name: 'Central Plaza Western Gateway',
    position: [-16, 0.45, 6],
    description: 'Returning to Central Grand Plaza Roundabout.'
  }
];
