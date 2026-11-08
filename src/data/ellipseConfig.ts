// Mathematical configuration of the Grand Elliptical Boulevard & City Districts
// x(t) = centerX + radiusX * cos(t)
// z(t) = centerZ + radiusZ * sin(t)
// where t in [0, 2*PI)

export const ELLIPSE_CONFIG = {
  centerX: 0,
  centerZ: 0,
  radiusX: 56.0, // Semi-major axis (meters)
  radiusZ: 44.0, // Semi-minor axis (meters)
  roadWidth: 12.0, // Total track width (meters)
  curbWidth: 0.5,
  defaultCruisingSpeedKmh: 24.0, // Default autonomous speed (~6.67 m/s)
  segments: 256 // Geometry resolution for ultra-smooth curve
} as const;

export interface CityDistrictConfig {
  id: string;
  name: string;
  side: 'left' | 'right' | 'center';
  category: 'career' | 'education' | 'achievements' | 'technology' | 'project' | 'contact' | 'character';
  position: [number, number, number];
  approachParamT: number; // approximate parameter t where car passes by
  color: string;
  accentColor: string;
  shortDesc: string;
}

export const CITY_DISTRICTS: CityDistrictConfig[] = [
  // ==========================================
  // LEFT SIDE — CAREER & EDUCATION DISTRICTS
  // ==========================================
  {
    id: 'education',
    name: 'Education Boulevard',
    side: 'left',
    category: 'education',
    position: [-74, 0, -6],
    approachParamT: Math.PI, // West apex (~3.14 rad)
    color: '#0284c7',
    accentColor: '#38bdf8',
    shortDesc: 'Galgotias College of Eng. & Tech. — B.Tech ECE (CGPA 7.3/10)'
  },
  {
    id: 'experience',
    name: 'Experience District',
    side: 'left',
    category: 'career',
    position: [-48, 0, 56],
    approachParamT: 2.35, // South-West curve (~135 deg)
    color: '#10b981',
    accentColor: '#34d399',
    shortDesc: 'Auspify Technologies • HashBit Innovations • DataX Web Solutions'
  },
  {
    id: 'achievements',
    name: 'Achievements Plaza',
    side: 'left',
    category: 'achievements',
    position: [0, 0, 58],
    approachParamT: Math.PI / 2, // South apex (~1.57 rad)
    color: '#f59e0b',
    accentColor: '#fbbf24',
    shortDesc: 'Verified Certifications, Technical Badges & Hackathons'
  },

  // ==========================================
  // RIGHT SIDE — TECHNOLOGY & PROJECT DISTRICTS
  // ==========================================
  {
    id: 'skills',
    name: 'Technology Tower',
    side: 'right',
    category: 'technology',
    position: [0, 0, -58],
    approachParamT: (3 * Math.PI) / 2, // North apex (~4.71 rad)
    color: '#38bdf8',
    accentColor: '#0284c7',
    shortDesc: 'Python, SQL, Excel, Power BI, React, TypeScript, Node.js'
  },
  {
    id: 'bayora',
    name: 'Bayora AI Citadel',
    side: 'right',
    category: 'project',
    position: [-46, 0, -54],
    approachParamT: 3.92, // North-West curve (~225 deg)
    color: '#ef4444',
    accentColor: '#f87171',
    shortDesc: 'AI Security & Cryptographic Access Platform'
  },
  {
    id: 'ustaad',
    name: 'Eurogrip Ustaad Hub',
    side: 'right',
    category: 'project',
    position: [46, 0, -54],
    approachParamT: 5.49, // North-East curve (~315 deg)
    color: '#d97706',
    accentColor: '#f59e0b',
    shortDesc: 'Commercial Fleet Analytics & IoT Mechanics Hub'
  },
  {
    id: 'paypal',
    name: 'PayPal Resolve Spire',
    side: 'right',
    category: 'project',
    position: [28, 0, -18],
    approachParamT: 5.9, // Inner East
    color: '#3b82f6',
    accentColor: '#60a5fa',
    shortDesc: 'Financial Reconciliation & Automated Dispute Resolution'
  },
  {
    id: 'webguard',
    name: 'WebGuard AI Observatory',
    side: 'right',
    category: 'project',
    position: [74, 0, 6],
    approachParamT: 0.1, // East apex (~0 rad)
    color: '#06b6d4',
    accentColor: '#22d3ee',
    shortDesc: 'Autonomous Network Threat Detection & Security AI'
  },
  {
    id: 'contact',
    name: 'Contact Garage',
    side: 'right',
    category: 'contact',
    position: [52, 0, 50],
    approachParamT: 0.78, // South-East curve (~45 deg)
    color: '#f43f5e',
    accentColor: '#fb7185',
    shortDesc: 'Executive Connect, Resume Download, LinkedIn & Email'
  },

  // Central Hub
  {
    id: 'profile',
    name: 'Central Grand Plaza',
    side: 'center',
    category: 'character',
    position: [0, 0, 0],
    approachParamT: 0,
    color: '#fbbf24',
    accentColor: '#ffffff',
    shortDesc: 'Utkarsh Arora — Data Analyst & Software Engineer'
  }
];

// Helper: Calculate exact world position on the ellipse for parameter t
// Ground contact height is 0.02 to match the asphalt road mesh surface flush with tires
export function getEllipsePoint(t: number, offsetDistance = 0): [number, number, number] {
  const { centerX, centerZ, radiusX, radiusZ } = ELLIPSE_CONFIG;
  const x = centerX + radiusX * Math.cos(t);
  const z = centerZ + radiusZ * Math.sin(t);
  const roadContactY = 0.02;

  if (offsetDistance === 0) {
    return [x, roadContactY, z];
  }

  // Calculate outward normal in XZ plane
  let nx = radiusZ * Math.cos(t);
  let nz = radiusX * Math.sin(t);
  const len = Math.hypot(nx, nz) || 1;
  nx /= len;
  nz /= len;

  return [x + nx * offsetDistance, roadContactY, z + nz * offsetDistance];
}

// Helper: Calculate forward heading angle (rotationY) for parameter t
// Ellipse tangent: (-radiusX * sin(t), 0, radiusZ * cos(t))
export function getEllipseHeading(t: number): number {
  const { radiusX, radiusZ } = ELLIPSE_CONFIG;
  const tx = -radiusX * Math.sin(t);
  const tz = radiusZ * Math.cos(t);
  return Math.atan2(tx, tz);
}

// Helper: Differential arc-length speed multiplier dt/d(time) = v / sqrt(Rx^2 * sin^2(t) + Rz^2 * cos^2(t))
export function getEllipseSpeedMultiplier(t: number): number {
  const { radiusX, radiusZ } = ELLIPSE_CONFIG;
  const sinT = Math.sin(t);
  const cosT = Math.cos(t);
  const dsDt = Math.sqrt(radiusX * radiusX * sinT * sinT + radiusZ * radiusZ * cosT * cosT);
  return 1.0 / Math.max(dsDt, 0.001);
}

// Helper: Project any arbitrary point (x, z) onto closest ellipse parameter t
export function projectPointToEllipseT(x: number, z: number): number {
  const { centerX, centerZ, radiusX, radiusZ } = ELLIPSE_CONFIG;
  const dx = (x - centerX) / radiusX;
  const dz = (z - centerZ) / radiusZ;
  let t = Math.atan2(dz, dx);
  if (t < 0) t += Math.PI * 2;
  return t;
}

