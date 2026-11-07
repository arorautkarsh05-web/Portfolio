export interface PersonalInfo {
  name: string;
  tagline: string;
  subTitle: string;
  title: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  education: {
    degree: string;
    field: string;
    college: string;
    expectedGraduation: number;
    cgpa: string;
    coursework: string[];
  };
  summary: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
  skills: {
    name: string;
    level: string;
    featured?: boolean;
  }[];
}

export interface ProjectLandmark {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  technologies: string[];
  repository: string;
  liveDemoUrl?: string; // only if verified
  architectureNote?: string;
  accentColor: string;
  districtCoordinates: [number, number, number];
}

export interface InternshipExperience {
  id: string;
  role: string;
  company: string;
  dates: string;
  flagNotice?: string;
  highlights: string[];
  technologies: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  badgeCategory: 'AI' | 'Data Analytics' | 'Cloud & Systems';
  skillsCovered: string[];
  verified: boolean;
  credentialNote?: string;
}

export interface SceneCheckpoint {
  id: number;
  slug: string;
  name: string;
  district: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  description: string;
}

