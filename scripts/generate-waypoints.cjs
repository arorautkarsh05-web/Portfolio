const fs = require('fs');
const A = 48.0;
const B = 38.0;

const stops = [
  { t: 4.35, id: 'stop-education', name: 'Education Boulevard', moduleId: 'education', moduleTitle: 'Education Boulevard // Galgotias ECE', description: 'B.Tech in Electronics & Communication Engineering (CGPA 7.3/10).' },
  { t: 3.75, id: 'stop-bayora', name: 'Bayora AI Security Citadel', moduleId: 'bayora', moduleTitle: 'Project 01: Bayora // AI Safety Testing', description: 'Adversarial AI safety infrastructure with tamper-evident audit trails.' },
  { t: 3.14159, id: 'stop-skills', name: 'Technology Tower', moduleId: 'skills', moduleTitle: 'Technology Tower // 7 Skill Districts', description: '65-meter crystalline glass skyscraper showcasing Data Analytics, Python, SQL & Full-Stack.' },
  { t: 2.45, id: 'stop-ustaad', name: 'Eurogrip Ustaad Hub', moduleId: 'ustaad', moduleTitle: 'Project 02: Eurogrip Ustaad Network', description: 'Intelligent mechanic empowerment, Fitment Passport QR & advocacy ecosystem.' },
  { t: 1.15, id: 'stop-webguard', name: 'WebGuard AI Observatory', moduleId: 'webguard', moduleTitle: 'Project 04: WebGuard AI', description: 'Autonomous website reliability, TinyFish automation & competitive intelligence.' },
  { t: 0.55, id: 'stop-garage', name: 'The Executive Garage', moduleId: 'contact', moduleTitle: 'Contact Garage // Executive Terminal', description: 'High-tech terminal showroom: connect via Email, LinkedIn, GitHub & Resume.' },
  { t: 5.85, id: 'stop-experience', name: 'Experience District', moduleId: 'experience', moduleTitle: 'Experience District // Internships', description: 'Professional internships: Auspify Technologies, HashBit, DataX Web Solutions.' },
  { t: 5.25, id: 'stop-paypal', name: 'PayPal Resolve Spire', moduleId: 'paypal', moduleTitle: 'Project 03: PayPal Resolve', description: 'AI payment intelligence, reconciliation & merchant resolution engine.' }
];

const waypoints = [];

// Waypoint 0: Central Plaza Start
waypoints.push({
  id: 'plaza-start',
  name: 'Central Grand Plaza',
  position: [0, 0.45, 8],
  isModuleStop: true,
  moduleId: 'profile',
  moduleTitle: 'Utkarsh Arora // Central Profile',
  description: 'Starting line beside the iconic Utkarsh Arora hologram pedestal.'
});

// Central Plaza Westbound exit
waypoints.push({
  id: 'plaza-west-corridor',
  name: 'Central West Corridor',
  position: [-16, 0.45, 5],
  description: 'Accelerating west along the grand Dubai palm boulevard.'
});
waypoints.push({
  id: 'ellipse-west-merge',
  name: 'Grand Ellipse Western Gateway',
  position: [-34, 0.45, 2],
  description: 'Entering the high-speed aerodynamic Grand Ellipse.'
});

// Sample ellipse from t = 4.60 down to 0, then 6.28 down to 4.60
const totalPoints = 60;
const dt = (Math.PI * 2) / totalPoints;
let currentT = 4.60;

for (let i = 0; i < totalPoints; i++) {
  const t = (currentT - i * dt + Math.PI * 2 * 2) % (Math.PI * 2);
  const x = +(A * Math.sin(t)).toFixed(2);
  const z = +(B * Math.cos(t)).toFixed(2);

  const matchedStop = stops.find(s => {
    let diff = Math.abs(s.t - t);
    if (diff > Math.PI) diff = Math.PI * 2 - diff;
    return diff < (dt / 2);
  });

  if (matchedStop) {
    waypoints.push({
      id: matchedStop.id,
      name: matchedStop.name,
      position: [x, 0.45, z],
      isModuleStop: true,
      moduleId: matchedStop.moduleId,
      moduleTitle: matchedStop.moduleTitle,
      description: matchedStop.description
    });
  } else {
    waypoints.push({
      id: `ellipse-pt-${i}`,
      name: 'Grand Ellipse Boulevard',
      position: [x, 0.45, z],
      description: 'Cruising smoothly along the illuminated aerodynamic ellipse.'
    });
  }
}

const header = `export interface CircuitWaypoint {
  id: string;
  name: string;
  position: [number, number, number];
  isModuleStop?: boolean;
  moduleId?: 'profile' | 'education' | 'bayora' | 'skills' | 'ustaad' | 'webguard' | 'contact' | 'experience' | 'paypal';
  moduleTitle?: string;
  description?: string;
}

export const circuitWaypoints: CircuitWaypoint[] = `;

fs.writeFileSync('src/data/waypoints.ts', header + JSON.stringify(waypoints, null, 2) + ';\n', 'utf8');
console.log('Generated', waypoints.length, 'waypoints with', waypoints.filter(w => w.isModuleStop).length, 'module stops.');
