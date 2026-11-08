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
  side: 'inner' | 'outer' | 'center';
  category: 'career' | 'education' | 'achievements' | 'technology' | 'project' | 'contact' | 'character' | 'automotive' | 'gateway';
  position: [number, number, number];
  approachParamT: number; // approximate parameter t where car passes by
  color: string;
  accentColor: string;
  shortDesc: string;
  actionTitle: string;
}

export const CITY_DISTRICTS: CityDistrictConfig[] = [
  // ==========================================
  // LANDMARK 01: CITY REVEAL GRAND GATEWAY (Outer South-West)
  // ==========================================
  {
    id: 'city-reveal',
    name: 'Utkarsh City Gateway',
    side: 'outer',
    category: 'gateway',
    position: [-64, 0, 52],
    approachParamT: 2.50,
    color: '#38bdf8',
    accentColor: '#0284c7',
    shortDesc: 'Monumental Triumphal Archway & Luxury Metropolis Portal',
    actionTitle: 'EXPLORE UTKARSH CITY'
  },

  // ==========================================
  // LANDMARK 02: CHARACTER EXHIBITION PAVILION (Center Plaza)
  // ==========================================
  {
    id: 'character-reveal',
    name: 'Character Exhibition',
    side: 'center',
    category: 'character',
    position: [0, 0, 0],
    approachParamT: 1.35,
    color: '#fbbf24',
    accentColor: '#ffffff',
    shortDesc: 'Utkarsh Arora — Data Analyst & Software Engineer',
    actionTitle: 'EXPLORE PROFILE'
  },

  // ==========================================
  // LANDMARK 03: SUPERCAR AUTOMOTIVE SHOWROOM (Inner East - Inside Loop)
  // ==========================================
  {
    id: 'supercar-ignition',
    name: 'Supercar Showroom',
    side: 'inner',
    category: 'automotive',
    position: [26, 0, 18],
    approachParamT: 0.98,
    color: '#f59e0b',
    accentColor: '#d97706',
    shortDesc: 'Bespoke Sports Car Showcase, Turntable & Telemetry',
    actionTitle: 'EXPLORE SUPERCAR'
  },

  // ==========================================
  // LANDMARK 04: EDUCATION BOULEVARD (Outer West)
  // ==========================================
  {
    id: 'education',
    name: 'Education Boulevard',
    side: 'outer',
    category: 'education',
    position: [-82, 0, -6],
    approachParamT: 3.14, // West apex (~3.14 rad)
    color: '#0284c7',
    accentColor: '#38bdf8',
    shortDesc: 'Galgotias College of Eng. & Tech. — B.Tech ECE (CGPA 7.3/10)',
    actionTitle: 'EXPLORE EDUCATION'
  },

  // ==========================================
  // LANDMARK 05: TECHNOLOGY TOWER (Outer North)
  // ==========================================
  {
    id: 'skills',
    name: 'Technology Tower',
    side: 'outer',
    category: 'technology',
    position: [0, 0, -78],
    approachParamT: 4.71, // North apex (~4.71 rad)
    color: '#38bdf8',
    accentColor: '#0284c7',
    shortDesc: 'Python, SQL, Excel, Power BI, React, TypeScript, Node.js',
    actionTitle: 'EXPLORE TECHNOLOGY'
  },

  // ==========================================
  // LANDMARK 06: PROJECTS BOULEVARD (4 Distinct Project Buildings)
  // ==========================================
  {
    id: 'bayora',
    name: 'Bayora AI Citadel',
    side: 'outer',
    category: 'project',
    position: [-58, 0, -66],
    approachParamT: 3.95, // North-West curve (~225 deg)
    color: '#ef4444',
    accentColor: '#f87171',
    shortDesc: 'AI Security & Cryptographic Access Platform',
    actionTitle: 'EXPLORE BAYORA'
  },
  {
    id: 'ustaad',
    name: 'Eurogrip Ustaad Hub',
    side: 'outer',
    category: 'project',
    position: [58, 0, -66],
    approachParamT: 5.35, // North-East curve (~305 deg)
    color: '#d97706',
    accentColor: '#f59e0b',
    shortDesc: 'Commercial Fleet Analytics & IoT Mechanics Hub',
    actionTitle: 'EXPLORE USTAAD'
  },
  {
    id: 'paypal',
    name: 'PayPal Resolve Spire',
    side: 'inner', // Inside Loop!
    category: 'project',
    position: [22, 0, -12],
    approachParamT: 5.85,
    color: '#3b82f6',
    accentColor: '#60a5fa',
    shortDesc: 'Financial Reconciliation & Automated Dispute Resolution',
    actionTitle: 'EXPLORE PAYPAL RESOLVE'
  },
  {
    id: 'webguard',
    name: 'WebGuard AI Observatory',
    side: 'outer',
    category: 'project',
    position: [82, 0, 6],
    approachParamT: 0.08, // East apex (~0 rad)
    color: '#06b6d4',
    accentColor: '#22d3ee',
    shortDesc: 'Autonomous Network Threat Detection & Security AI',
    actionTitle: 'EXPLORE WEGUARD AI'
  },

  // ==========================================
  // LANDMARK 07: EXPERIENCE DISTRICT (Outer South)
  // ==========================================
  {
    id: 'experience',
    name: 'Experience District',
    side: 'outer',
    category: 'career',
    position: [-56, 0, 66],
    approachParamT: 2.10, // South-West curve (~120 deg)
    color: '#10b981',
    accentColor: '#34d399',
    shortDesc: 'Auspify Technologies • HashBit Innovations • DataX Web Solutions',
    actionTitle: 'EXPLORE EXPERIENCE'
  },

  // ==========================================
  // LANDMARK 08: CONTACT GARAGE (Outer South-East)
  // ==========================================
  {
    id: 'contact',
    name: 'Contact Garage',
    side: 'outer',
    category: 'contact',
    position: [60, 0, 60],
    approachParamT: 0.58, // South-East curve (~33 deg)
    color: '#f43f5e',
    accentColor: '#fb7185',
    shortDesc: 'Executive Connect, Resume Download, LinkedIn & Email',
    actionTitle: 'EXPLORE CONTACT'
  },

  // Credentials & Trophy District (Inner South)
  {
    id: 'achievements',
    name: 'Achievements Plaza',
    side: 'inner',
    category: 'achievements',
    position: [0, 0, 74],
    approachParamT: 1.62, // South apex (~90 deg)
    color: '#f59e0b',
    accentColor: '#fbbf24',
    shortDesc: 'Verified Certifications, Technical Badges & Hackathons',
    actionTitle: 'EXPLORE ACHIEVEMENTS'
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
