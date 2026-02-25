/** Editable content schema - matches static data structure */
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

export type RoleOverride = {
  label: string;
  badge?: string;
  headline: string;
  summary: string;
  aboutSummary?: string;
  experienceOrder?: string[];
  experience?: ExperienceItem[];
  skillsOrder?: string[];
  skills?: string[];
  projectOrder?: string[];
  projects?: ProjectItem[];
};

export type PortfolioContent = {
  hero?: {
    name: string;
    badge: string;
    headline: string;
  };
  about?: {
    summary: string;
  };
  experience?: ExperienceItem[];
  projects?: ProjectItem[];
  education?: EducationItem | EducationItem[];
  skills?: string[];
  roles?: Record<string, RoleOverride>;
  /** Maps old slug → new slug for URLs already shared (301 redirects) */
  roleRedirects?: Record<string, string>;
};
