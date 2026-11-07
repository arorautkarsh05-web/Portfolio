export interface CityWaypoint {
  id: string;
  name: string;
  position: [number, number, number];
  moduleName?: string;
  description?: string;
}

export const cityCircuitWaypoints: CityWaypoint[] = [
  {
    id: 'plaza-start',
    name: 'Central Grand Plaza',
    position: [0, 0.45, 8],
    moduleName: 'Utkarsh Arora // Central Plaza',
    description: 'Starting line beside the iconic Utkarsh Arora hologram pedestal.'
  },
  {
    id: 'west-boulevard-turn',
    name: 'West Boulevard Junction',
    position: [-16, 0.45, 4],
    moduleName: 'West Avenue',
    description: 'Cruising west along the palm-lined Dubai boulevard.'
  },
  {
    id: 'education-approach',
    name: 'Education Boulevard Approach',
    position: [-28, 0.45, -4],
    moduleName: 'Galgotias College ECE',
    description: 'Approaching the academic rotunda and engineering labs.'
  },
  {
    id: 'education-boulevard',
    name: 'Education Boulevard Plaza',
    position: [-35, 0.45, -15],
    moduleName: 'Galgotias College of Engineering',
    description: 'B.Tech in Electronics and Communication Engineering (CGPA 7.3/10).'
  },
  {
    id: 'bayora-approach',
    name: 'Security Citadel Corridor',
    position: [-42, 0.45, -26],
    moduleName: 'Bayora AI Security',
    description: 'Approaching the red cryptographic security citadel.'
  },
  {
    id: 'bayora-citadel',
    name: 'Bayora Security Citadel',
    position: [-45, 0.45, -35],
    moduleName: 'Bayora // AI Safety Testing',
    description: 'Adversarial AI safety infrastructure with Ed25519 proofs.'
  },
  {
    id: 'north-boulevard-west',
    name: 'North Boulevard West',
    position: [-24, 0.45, -45],
    moduleName: 'Technology Avenue',
    description: 'Turning east onto the main Technology Boulevard.'
  },
  {
    id: 'tech-tower',
    name: 'Technology Tower',
    position: [0, 0.45, -45],
    moduleName: 'Technology Tower // 7 Skill Domains',
    description: '65-meter crystalline glass skyscraper showcasing Python, SQL, BI, and Full-Stack.'
  },
  {
    id: 'north-boulevard-east',
    name: 'North Boulevard East',
    position: [24, 0.45, -45],
    moduleName: 'Mobility Corridor',
    description: 'Cruising east towards Eurogrip Ustaad automotive landmark.'
  },
  {
    id: 'ustaad-hub',
    name: 'Eurogrip Ustaad Network',
    position: [45, 0.45, -35],
    moduleName: 'Eurogrip Ustaad Network',
    description: 'Intelligent mechanic empowerment & brand advocacy ecosystem.'
  },
  {
    id: 'east-boulevard-mid',
    name: 'East Boulevard Marina View',
    position: [45, 0.45, 0],
    moduleName: 'Marina Promenade Avenue',
    description: 'Cruising south along the scenic coastal skyline.'
  },
  {
    id: 'webguard-ai',
    name: 'WebGuard AI Observatory',
    position: [45, 0.45, 30],
    moduleName: 'WebGuard AI // Site Reliability',
    description: 'Autonomous website reliability & competitive intelligence platform.'
  },
  {
    id: 'garage-approach',
    name: 'Executive Showroom Runway',
    position: [30, 0.45, 35],
    moduleName: 'The Executive Garage // Contact',
    description: 'High-tech terminal showroom: connect via Email, LinkedIn, GitHub & Resume.'
  },
  {
    id: 'experience-approach',
    name: 'South Avenue Career Spine',
    position: [0, 0.45, 35],
    moduleName: 'Career Skybridge Boulevard',
    description: 'Heading west across the metropolitan south boulevard.'
  },
  {
    id: 'experience-district',
    name: 'Experience District',
    position: [-30, 0.45, 35],
    moduleName: 'Experience District // Internships',
    description: 'Professional timeline: Auspify Technologies, HashBit, DataX Web Solutions.'
  },
  {
    id: 'paypal-resolve',
    name: 'PayPal Resolve Spire',
    position: [-45, 0.45, 35],
    moduleName: 'PayPal Resolve // FinTech & AI',
    description: 'AI payment reconciliation, dispute investigation & resolution engine.'
  },
  {
    id: 'return-corridor-south',
    name: 'West Avenue Return Corridor',
    position: [-42, 0.45, 18],
    moduleName: 'West Metropolitan Boulevard',
    description: 'Cruising north back towards the central metropolitan core.'
  },
  {
    id: 'return-corridor-north',
    name: 'Central Plaza Western Gate',
    position: [-20, 0.45, 6],
    moduleName: 'Central Grand Plaza Gate',
    description: 'Re-entering the marble & gold central roundabout.'
  }
];

