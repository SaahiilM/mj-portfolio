export type ExperienceItem = {
  id: string;
  company: string;
  location: string;
  role: string;
  period: string;
  bullets: string[];
};

export type ProjectItem = {
  id: string;
  title: string;
  bullets: string[];
};

export type EducationItem = {
  school: string;
  location: string;
  degree: string;
  period?: string;
  detail: string;
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "bejou",
    company: "Bejou",
    location: "New York, NY",
    role: "Brand Marketing Manager",
    period: "Jun 2025 – Sep 2025",
    bullets: [
      "Analyzed performance data across campaigns and community initiatives, ensuring accuracy and consistency in reporting",
      "Maintained documentation, managed timelines, and coordinated vendors while enforcing quality and compliance standards",
      "Created client-ready reports and dashboards using analytics and AI tools to improve reporting efficiency",
    ],
  },
  {
    id: "hiroshop",
    company: "Hiroshop.in",
    location: "Mumbai, India",
    role: "Marketing Manager",
    period: "Dec 2022 – Nov 2023",
    bullets: [
      "Conducted structured market and consumer analysis to support data-backed business decisions",
      "Introduced automation and quality-control processes to improve operational efficiency and consistency",
      "Managed multiple stakeholders while adhering to internal standards and reporting requirements",
    ],
  },
];

export const SKILLS_LIST = [
  "Compliance Support",
  "Reporting & Documentation",
  "Data Analysis",
  "Process Improvement",
  "Risk Awareness",
  "Excel",
  "PowerPoint",
  "Google Analytics",
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "plant-pal",
    title: "Plant Pal – Marketing Management Project",
    bullets: [
      "Conducted market and demand analysis within a $2.06B category",
      "Developed structured insights and executive-style presentations for stakeholder review",
    ],
  },
];

export const EDUCATION: EducationItem = {
  school: "Fordham University, Gabelli School of Business",
  location: "New York, NY",
  degree: "MBA, Marketing & Information Systems",
  period: "Jul 2024 – Present",
  detail: "Dean's Scholarship Recipient",
};

export function getExperienceByIds(ids: string[]): ExperienceItem[] {
  const byId = new Map(EXPERIENCE.map((e) => [e.id, e]));
  return ids.map((id) => byId.get(id)).filter(Boolean) as ExperienceItem[];
}

export function getSkillsByOrder(order: string[]): string[] {
  if (order.length === 0) return SKILLS_LIST;
  const set = new Set(SKILLS_LIST);
  return order.filter((s) => set.has(s));
}

export function getProjectsByIds(ids: string[]): ProjectItem[] {
  const byId = new Map(PROJECTS.map((p) => [p.id, p]));
  return ids.map((id) => byId.get(id)).filter(Boolean) as ProjectItem[];
}

export type SectionContent = {
  experience: ExperienceItem[];
  skills: string[];
  projects: ProjectItem[];
  education: EducationItem;
};

export function getContentForRole(profile: {
  experienceOrder?: string[];
  skillsOrder?: string[];
  projectOrder?: string[];
} | null): SectionContent {
  const defaultExpIds = EXPERIENCE.map((e) => e.id);
  const defaultProjIds = PROJECTS.map((p) => p.id);

  return {
    experience: getExperienceByIds(
      profile?.experienceOrder?.length ? profile.experienceOrder : defaultExpIds
    ),
    skills: getSkillsByOrder(profile?.skillsOrder ?? []),
    projects: getProjectsByIds(
      profile?.projectOrder?.length ? profile.projectOrder : defaultProjIds
    ),
    education: EDUCATION,
  };
}
