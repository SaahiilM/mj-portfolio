import type { PortfolioContent, RoleOverride } from "./content-types";
import {
  EXPERIENCE,
  PROJECTS,
  EDUCATION,
  SKILLS_LIST,
} from "@/data/content";
import { defaultProfile, getRoleProfile, getAllRoleSlugs } from "@/data/roles";
import type { RoleProfile } from "@/data/roles";

export function getStaticContent(): PortfolioContent {
  const roles: Record<string, NonNullable<ReturnType<typeof getRoleProfile>>> = {};
  for (const slug of getAllRoleSlugs()) {
    const p = getRoleProfile(slug);
    if (p) roles[slug] = p;
  }
  return {
    hero: {
      name: "Maitreyee Jaiswal",
      badge: defaultProfile.badge ?? "",
      headline: defaultProfile.headline ?? "",
    },
    about: { summary: defaultProfile.aboutSummary ?? defaultProfile.summary ?? "" },
    experience: EXPERIENCE,
    projects: PROJECTS,
    education: [EDUCATION],
    skills: SKILLS_LIST,
    roles: Object.fromEntries(
      Object.entries(roles).map(([k, v]) => [
        k,
        {
          label: v.label,
          badge: v.badge,
          headline: v.headline,
          summary: v.summary,
          aboutSummary: v.aboutSummary,
          experienceOrder: v.experienceOrder,
          skillsOrder: v.skillsOrder,
          projectOrder: v.projectOrder,
        },
      ])
    ),
  };
}

export function mergeContent(
  staticContent: PortfolioContent,
  stored: Partial<PortfolioContent> | null
): PortfolioContent {
  if (!stored) return staticContent;
  return {
    hero: { ...staticContent.hero, ...stored.hero } as PortfolioContent["hero"],
    about: { ...staticContent.about, ...stored.about } as PortfolioContent["about"],
    experience: stored.experience ?? staticContent.experience,
    projects: stored.projects ?? staticContent.projects,
    education: stored.education !== undefined
      ? Array.isArray(stored.education)
        ? stored.education
        : [stored.education]
      : staticContent.education,
    skills: stored.skills ?? staticContent.skills,
    roles: stored?.roles ?? staticContent.roles,
    roleRedirects: { ...staticContent.roleRedirects, ...stored?.roleRedirects },
  };
}

export type SectionContent = {
  experience: PortfolioContent["experience"];
  skills: string[];
  projects: PortfolioContent["projects"];
  education: import("./content-types").EducationItem[];
  profile: {
    name: string;
    badge: string;
    headline: string;
    aboutSummary: string;
  };
};

export function getSectionContentForRole(
  content: PortfolioContent,
  roleSlug: string | null
): SectionContent {
  const role = roleSlug && content.roles?.[roleSlug] ? content.roles[roleSlug] : null;
  const defaultProfileData = {
    name: content.hero?.name ?? "Maitreyee Jaiswal",
    badge: content.hero?.badge ?? "",
    headline: content.hero?.headline ?? "",
    aboutSummary: content.about?.summary ?? "",
  };
  const profile = role
    ? {
        name: content.hero?.name ?? defaultProfileData.name,
        badge: role.badge ?? defaultProfileData.badge,
        headline: role.headline ?? defaultProfileData.headline,
        aboutSummary: role.aboutSummary ?? role.summary ?? defaultProfileData.aboutSummary,
      }
    : defaultProfileData;

  const experience: NonNullable<PortfolioContent["experience"]> =
    role?.experience?.length
      ? role.experience
      : (() => {
          const expOrder = role?.experienceOrder ?? content.experience?.map((e) => e.id) ?? [];
          const expById = new Map((content.experience ?? []).map((e) => [e.id, e]));
          return expOrder.map((id: string) => expById.get(id)).filter(Boolean) as NonNullable<PortfolioContent["experience"]>;
        })();

  const skills: string[] =
    role?.skills?.length
      ? role.skills
      : (() => {
          const skillsOrder = role?.skillsOrder ?? content.skills ?? [];
          const skillsSet = new Set(content.skills ?? []);
          return skillsOrder.length ? skillsOrder.filter((s: string) => skillsSet.has(s)) : (content.skills ?? []);
        })();

  const projects: NonNullable<PortfolioContent["projects"]> =
    role?.projects?.length
      ? role.projects
      : (() => {
          const projOrder = role?.projectOrder ?? content.projects?.map((p) => p.id) ?? [];
          const projById = new Map((content.projects ?? []).map((p) => [p.id, p]));
          return projOrder.map((id: string) => projById.get(id)).filter(Boolean) as NonNullable<PortfolioContent["projects"]>;
        })();

  const education = Array.isArray(content.education)
    ? content.education
    : content.education
      ? [content.education]
      : [];

  return {
    experience,
    skills,
    projects,
    education,
    profile,
  };
}

/** Build RoleProfile from content.roles[slug] for dynamic roles */
export function contentToRoleProfile(
  slug: string,
  roleOverride: RoleOverride,
  content: PortfolioContent
): RoleProfile {
  const defaultProfileData = {
    badge: content.hero?.badge ?? defaultProfile.badge ?? "",
    headline: content.hero?.headline ?? defaultProfile.headline ?? "",
    summary: content.about?.summary ?? defaultProfile.summary ?? "",
  };
  const label = roleOverride.label || slug.replace(/-/g, " ");
  return {
    slug: slug.toLowerCase().trim(),
    label,
    badge: roleOverride.badge ?? defaultProfileData.badge,
    headline: roleOverride.headline ?? defaultProfileData.headline,
    summary: roleOverride.summary ?? defaultProfileData.summary,
    aboutSummary: roleOverride.aboutSummary ?? roleOverride.summary ?? defaultProfileData.summary,
    experienceOrder: roleOverride.experienceOrder,
    skillsOrder: roleOverride.skillsOrder,
    projectOrder: roleOverride.projectOrder,
  };
}

/** Get all role slugs from merged content (used for routing) */
export function getAllRoleSlugsFromContent(content: PortfolioContent): string[] {
  return Object.keys(content?.roles ?? {});
}
