import { SkillCategory } from '../types';

export const skillsData: SkillCategory[] = [
  {
    id: "data-analytics",
    name: "Data Analytics & Intelligence",
    description: "Core analytical methods, statistical validation, exploratory data interrogation, and KPI tracking.",
    iconName: "BarChart3",
    skills: [
      { name: "Python", level: "Advanced", featured: true },
      { name: "SQL", level: "Advanced", featured: true },
      { name: "Excel", level: "Advanced", featured: true },
      { name: "Power BI", level: "Advanced", featured: true },
      { name: "EDA (Exploratory Data Analysis)", level: "Advanced", featured: true },
      { name: "Data Cleaning & Validation", level: "Advanced", featured: true },
      { name: "Data Visualization", level: "Advanced", featured: true },
      { name: "KPI & Metrics Analysis", level: "Intermediate", featured: true }
    ]
  },
  {
    id: "programming",
    name: "Programming Languages",
    description: "System algorithms, structured development, and modern typed application scripting.",
    iconName: "Code2",
    skills: [
      { name: "Python", level: "Advanced", featured: true },
      { name: "C++", level: "Intermediate", featured: true },
      { name: "TypeScript", level: "Intermediate", featured: true },
      { name: "JavaScript", level: "Advanced", featured: true }
    ]
  },
  {
    id: "libraries",
    name: "Data Science & Analytics Libraries",
    description: "Vector manipulation, mathematical computation, visual dashboards, and statistical plots.",
    iconName: "Binary",
    skills: [
      { name: "Pandas", level: "Advanced", featured: true },
      { name: "NumPy", level: "Advanced", featured: true },
      { name: "Matplotlib", level: "Intermediate", featured: true },
      { name: "Seaborn", level: "Intermediate", featured: true },
      { name: "Plotly", level: "Intermediate", featured: true }
    ]
  },
  {
    id: "databases",
    name: "Databases & Storage",
    description: "Relational modeling, query optimization, ACID transactions, and persistent storage.",
    iconName: "Database",
    skills: [
      { name: "MySQL", level: "Advanced", featured: true },
      { name: "PostgreSQL", level: "Intermediate", featured: true },
      { name: "SQLite", level: "Advanced", featured: true }
    ]
  },
  {
    id: "bi",
    name: "Business Intelligence & ETL",
    description: "Business dashboard architecture, DAX formulas, M-query pipelines, and executive reporting.",
    iconName: "PieChart",
    skills: [
      { name: "Power BI", level: "Advanced", featured: true },
      { name: "DAX", level: "Intermediate", featured: true },
      { name: "Power Query", level: "Advanced", featured: true }
    ]
  },
  {
    id: "development",
    name: "Full-Stack Development",
    description: "Reactive user interfaces, asynchronous REST APIs, and microservice architectures.",
    iconName: "Layers",
    skills: [
      { name: "React", level: "Intermediate", featured: true },
      { name: "Node.js", level: "Intermediate", featured: true },
      { name: "Express", level: "Intermediate", featured: true },
      { name: "FastAPI", level: "Intermediate", featured: true },
      { name: "Next.js", level: "Intermediate", featured: true }
    ]
  },
  {
    id: "tools",
    name: "Developer Tools & DevOps",
    description: "Version control workflows, reproducible containerization, and data app deployment.",
    iconName: "Wrench",
    skills: [
      { name: "Git", level: "Advanced", featured: true },
      { name: "GitHub", level: "Advanced", featured: true },
      { name: "Docker", level: "Intermediate", featured: true },
      { name: "Streamlit", level: "Advanced", featured: true }
    ]
  }
];
