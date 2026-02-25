import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { getRoleProfile } from "@/data/roles";
import { getPortfolioContent } from "@/lib/content-server";
import { contentToRoleProfile } from "@/lib/content";
import { PortfolioContent } from "@/components/PortfolioContent";

type Props = { params: Promise<{ role: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role } = await params;
  const content = await getPortfolioContent();
  let target = role;
  while (content.roleRedirects?.[target]) target = content.roleRedirects[target];
  if (target !== role) return { title: "Maitreyee Jaiswal" };
  const roleOverride = content.roles?.[role];
  const profile = roleOverride
    ? contentToRoleProfile(role, roleOverride, content)
    : getRoleProfile(role);
  if (!profile) return { title: "Maitreyee Jaiswal" };
  return {
    title: `Maitreyee Jaiswal | Applying for ${profile.label}`,
    description: profile.summary,
  };
}

export default async function RolePage({ params }: Props) {
  const { role } = await params;
  const content = await getPortfolioContent();

  // Old URL? Redirect permanently so shared links keep working
  let target = role;
  while (content.roleRedirects?.[target]) {
    target = content.roleRedirects[target];
  }
  if (target !== role) {
    permanentRedirect(`/p/${target}`);
  }

  const roleOverride = content.roles?.[role];
  const profile = roleOverride
    ? contentToRoleProfile(role, roleOverride, content)
    : getRoleProfile(role);
  if (!profile) notFound();
  return (
    <PortfolioContent
      profile={profile}
      basePath={`/p/${profile.slug}`}
      editableContent={content}
    />
  );
}
