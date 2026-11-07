import { InternshipExperience } from '../types';

export const internshipExperiences: InternshipExperience[] = [
  {
    id: "auspify",
    role: "Data Scientist Intern",
    company: "Auspify Technologies",
    dates: "3 October – 3 November",
    flagNotice: "Calendar Verification Flag: Month and day span (3 Oct – 3 Nov) documented without an explicit calendar year in primary resume. Displayed faithfully as recorded.",
    highlights: [
      "Cleaned and explored an extensive dataset of 8,790 Netflix titles (identifying 6,126 movies and 2,664 TV shows) using Python and Pandas.",
      "Engineered an interactive Netflix Data Science and Analytics Dashboard using Streamlit and Plotly to enable intuitive trend discovery.",
      "Conducted predictive modeling using Linear Regression and evaluated model performance metrics for content analytics."
    ],
    technologies: ["Python", "Pandas", "Streamlit", "Plotly", "Linear Regression", "EDA"]
  },
  {
    id: "hashbit",
    role: "Software Development Intern",
    company: "HashBit Innovations",
    dates: "10 June – 14 August",
    flagNotice: "Calendar Verification Flag: Spans 10 June – 14 August without explicit year. Note that this duration overlaps with DataX Web Solutions (16 June – 15 July 2026).",
    highlights: [
      "Contributed to full-stack Hospital Management System, engineering frontend components and backend REST APIs with React.js, TypeScript, Node.js, and Express.js.",
      "Engineered reliable CRUD functionality and optimized MySQL relational database procedures, connecting frontend client interactions to backend persistent records."
    ],
    technologies: ["React.js", "TypeScript", "Node.js", "Express.js", "MySQL", "REST APIs"]
  },
  {
    id: "datax",
    role: "Data Analyst Intern",
    company: "DataX Web Solutions",
    dates: "16 June – 15 July 2026",
    flagNotice: "Calendar Verification Flag: 16 June – 15 July 2026 explicitly dated, overlapping with the June–August tenure at HashBit Innovations.",
    highlights: [
      "Completed intensive one-month practical data analytics curriculum applying structured analytical workflows, data scrubbing, and business exploratory analysis.",
      "Formulated metric aggregations and comparative baseline reports across operational datasets."
    ],
    technologies: ["Python", "Data Analysis", "Data Cleaning", "KPI Analysis", "Excel"]
  }
];
