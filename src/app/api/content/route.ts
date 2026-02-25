import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getStoredContent, saveContent, hasDb } from "@/lib/db";
import type { PortfolioContent } from "@/lib/content-types";
import {
  EXPERIENCE,
  PROJECTS,
  EDUCATION,
  SKILLS_LIST,
} from "@/data/content";
import { defaultProfile, getRoleProfile, getAllRoleSlugs } from "@/data/roles";

function getStaticContent(): PortfolioContent {
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

function mergeContent(
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
    roles: stored.roles
      ? { ...staticContent.roles, ...stored.roles }
      : staticContent.roles,
  };
}

export async function GET() {
  const staticContent = getStaticContent();
  const stored = await getStoredContent();
  const merged = mergeContent(staticContent, stored);
  return Response.json({ ...merged, _hasSupabase: hasDb });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hasDb) {
    return Response.json(
      {
        error:
          "No database configured. Add DATABASE_URL (Neon) or NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (Supabase) to .env",
      },
      { status: 503 }
    );
  }

  const body = (await request.json()) as Partial<PortfolioContent>;
  const staticContent = getStaticContent();
  const stored = await getStoredContent();
  const merged = mergeContent(staticContent, { ...stored, ...body });

  const { error } = await saveContent(merged);
  if (error) {
    return Response.json({ error }, { status: 500 });
  }
  return Response.json({ ok: true });
}
