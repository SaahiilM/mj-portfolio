import type { RoleProfile } from "@/data/roles";
import type { PortfolioContent } from "@/lib/content-types";
import { getSectionContentForRole } from "@/lib/content";
import { getContentForRole } from "@/data/content";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Project } from "@/components/Project";
import { Skills } from "@/components/Skills";
import { ContactForm } from "@/components/ContactForm";
import { ScheduleCta } from "@/components/ScheduleCta";
import { defaultProfile } from "@/data/roles";

type PortfolioContentProps = {
  profile?: RoleProfile | null;
  basePath?: string;
  /** When provided, overrides static content (from admin edits) */
  editableContent?: PortfolioContent | null;
};

export function PortfolioContent({
  profile,
  basePath = "",
  editableContent,
}: PortfolioContentProps) {
  const useEditable = editableContent != null;
  const sectionContent = useEditable
    ? getSectionContentForRole(editableContent, profile?.slug ?? null)
    : getContentForRole(profile ?? null);

  const heroProfile = useEditable
    ? {
        badge: sectionContent.profile.badge,
        headline: sectionContent.profile.headline,
      }
    : profile ?? defaultProfile;

  const aboutSummary = useEditable
    ? sectionContent.profile.aboutSummary
    : profile?.aboutSummary ?? profile?.summary ?? "Detail-oriented MBA candidate with experience supporting reporting, documentation, and process-driven initiatives across marketing and operations.";

  const heroName = useEditable ? sectionContent.profile.name : "Maitreyee Jaiswal";

  return (
    <div className="min-h-screen">
      <Header basePath={basePath} />
      <main>
        <Hero
          profile={heroProfile}
          basePath={basePath}
          name={heroName}
        />
        <Section id="about" title="About">
          {useEditable && aboutSummary?.startsWith("<") ? (
            <div
              className="max-w-2xl text-base leading-relaxed text-foreground sm:text-lg [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-1"
              dangerouslySetInnerHTML={{ __html: aboutSummary }}
            />
          ) : (
            <p className="max-w-2xl text-base leading-relaxed text-foreground sm:text-lg">
              {aboutSummary}
            </p>
          )}
        </Section>
        <Section id="experience" title="Experience">
          <Experience jobs={sectionContent.experience} />
        </Section>
        <Section id="education" title="Education">
          <Education education={sectionContent.education} />
        </Section>
        {sectionContent.projects.length > 0 && (
          <Section id="academic" title="Academic & Project Experience">
            <Project projects={sectionContent.projects} />
          </Section>
        )}
        <Section id="skills" title="Skills">
          <Skills skills={sectionContent.skills} />
        </Section>
        <Section id="contact" title="Contact">
          <div className="space-y-8">
            <ScheduleCta />
            <div>
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Send a message
              </h3>
              <ContactForm />
            </div>
          </div>
        </Section>
      </main>
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted">
            <a
              href="mailto:mj29@fordham.edu"
              className="hover:text-foreground transition-colors"
            >
              mj29@fordham.edu
            </a>
            <a
              href="tel:551-352-8946"
              className="hover:text-foreground transition-colors"
            >
              551-352-8946
            </a>
            <a
              href="https://www.linkedin.com/in/maitreyee-jaiswal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
          </div>
          <p className="mt-4 text-center text-xs text-muted">
            New York, NY · Graduating May 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
