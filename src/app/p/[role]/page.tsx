import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getRoleProfile } from "@/data/roles";
import { getPortfolioContent } from "@/lib/content";
import { PortfolioContent } from "@/components/PortfolioContent";

type Props = { params: Promise<{ role: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role } = await params;
  const profile = getRoleProfile(role);
  if (!profile) return { title: "Maitreyee Jaiswal" };
  return {
    title: `Maitreyee Jaiswal | Applying for ${profile.label}`,
    description: profile.summary,
  };
}

export default async function RolePage({ params }: Props) {
  const { role } = await params;
  const profile = getRoleProfile(role);
  if (!profile) notFound();
  const content = await getPortfolioContent();
  return (
    <PortfolioContent
      profile={profile}
      basePath={`/p/${profile.slug}`}
      editableContent={content}
    />
  );
}
