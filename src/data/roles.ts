export type RoleProfile = {
  slug: string;
  label: string;
  badge?: string;
  headline: string;
  summary: string;
  aboutSummary?: string;
  /** Experience IDs in display order; omit = all default order */
  experienceOrder?: string[];
  /** Skills in display order (subset of master list); omit = all default order */
  skillsOrder?: string[];
  /** Project IDs in display order; omit = all default order */
  projectOrder?: string[];
};

const DEFAULT: Omit<RoleProfile, "slug" | "label"> = {
  badge: "MBA Candidate · Graduating May 2026",
  headline:
    "Marketing & Operations professional focused on reporting, documentation, and process improvement. Data-driven, detail-oriented, and ready to contribute from day one.",
  summary:
    "Detail-oriented MBA candidate with experience supporting reporting, documentation, and process-driven initiatives across marketing and operations. I focus on analyzing data accurately, managing quality checks, and working across stakeholders while maintaining high standards of integrity, compliance, and accountability.",
};

const ROLE_OVERRIDES: Record<string, Partial<RoleProfile>> = {
  "marketing-manager": {
    label: "Marketing Manager",
    experienceOrder: ["bejou", "hiroshop"],
    skillsOrder: [
      "Reporting & Documentation",
      "Data Analysis",
      "Google Analytics",
      "Excel",
      "PowerPoint",
      "Process Improvement",
      "Compliance Support",
      "Risk Awareness",
    ],
    projectOrder: ["plant-pal"],
    badge: "Applying for Marketing Manager · Graduating May 2026",
    headline:
      "Marketing professional with hands-on experience in brand marketing, campaign analytics, and client reporting. Skilled in data-backed decisions and cross-functional coordination.",
    summary:
      "Marketing Manager with experience in brand campaigns, performance analytics, and vendor coordination. Built client-ready reports and dashboards; introduced automation and quality-control processes. MBA candidate (Marketing & Information Systems) at Fordham.",
    aboutSummary:
      "I bring structured market and consumer analysis, campaign performance reporting, and documentation rigor from roles at Bejou and Hiroshop. I focus on accuracy, compliance, and stakeholder alignment while improving reporting efficiency with analytics and AI tools.",
  },
  "product-manager": {
    label: "Product Manager",
    experienceOrder: ["bejou", "hiroshop"],
    skillsOrder: [
      "Data Analysis",
      "Process Improvement",
      "Reporting & Documentation",
      "Excel",
      "Risk Awareness",
      "Compliance Support",
      "PowerPoint",
      "Google Analytics",
    ],
    projectOrder: ["plant-pal"],
    badge: "Applying for Product Manager · Graduating May 2026",
    headline:
      "Data-driven professional with experience in market analysis, stakeholder coordination, and process improvement. MBA in Marketing & Information Systems.",
    summary:
      "Experience conducting market and demand analysis, managing timelines and vendors, and delivering executive-style insights. Strong in reporting, documentation, and cross-functional collaboration—positioned to bridge business and product.",
    aboutSummary:
      "I combine market and demand analysis with structured reporting and stakeholder management. My work on campaign analytics, dashboards, and process automation translates directly to product discovery and delivery. I focus on clarity, quality, and accountability.",
  },
  operations: {
    label: "Operations",
    experienceOrder: ["hiroshop", "bejou"],
    skillsOrder: [
      "Process Improvement",
      "Compliance Support",
      "Reporting & Documentation",
      "Risk Awareness",
      "Data Analysis",
      "Excel",
      "PowerPoint",
      "Google Analytics",
    ],
    projectOrder: ["plant-pal"],
    badge: "Applying for Operations · Graduating May 2026",
    headline:
      "Operations-minded professional with a focus on process improvement, documentation, and quality control. Experience in reporting, compliance, and vendor coordination.",
    summary:
      "Proven ability to introduce automation and quality-control processes, maintain documentation, and coordinate vendors while enforcing compliance. MBA candidate with experience across marketing and operations initiatives.",
    aboutSummary:
      "I support reporting, documentation, and process-driven initiatives with high standards for integrity and compliance. I’ve improved operational efficiency through automation, quality checks, and clear stakeholder communication.",
  },
};

export function getRoleProfile(slug: string): RoleProfile | null {
  const normalized = slug.toLowerCase().trim();
  const overrides = ROLE_OVERRIDES[normalized];
  if (!overrides) return null;
  return {
    slug: normalized,
    label: overrides.label ?? slug,
    badge: overrides.badge ?? DEFAULT.badge,
    headline: overrides.headline ?? DEFAULT.headline,
    summary: overrides.summary ?? DEFAULT.summary,
    aboutSummary: overrides.aboutSummary ?? overrides.summary ?? DEFAULT.summary,
    experienceOrder: overrides.experienceOrder,
    skillsOrder: overrides.skillsOrder,
    projectOrder: overrides.projectOrder,
  };
}

export function getAllRoleSlugs(): string[] {
  return Object.keys(ROLE_OVERRIDES);
}

export const defaultProfile: RoleProfile = {
  slug: "",
  label: "Portfolio",
  ...DEFAULT,
  aboutSummary: DEFAULT.summary,
};
