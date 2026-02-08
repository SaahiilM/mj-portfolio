import type { RoleProfile } from "@/data/roles";
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

const DEFAULT_ABOUT =
  "Detail-oriented MBA candidate with experience supporting reporting, documentation, and process-driven initiatives across marketing and operations. I focus on analyzing data accurately, managing quality checks, and working across stakeholders while maintaining high standards of integrity, compliance, and accountability.";

type PortfolioContentProps = {
  profile?: RoleProfile | null;
  basePath?: string;
};

export function PortfolioContent({
  profile,
  basePath = "",
}: PortfolioContentProps) {
  const aboutSummary =
    profile?.aboutSummary ?? profile?.summary ?? DEFAULT_ABOUT;
  const content = getContentForRole(profile ?? null);

  return (
    <div className="min-h-screen">
      <Header basePath={basePath} />
      <main>
        <Hero profile={profile ?? defaultProfile} basePath={basePath} />
        <Section id="about" title="About">
          <p className="max-w-2xl text-base leading-relaxed text-foreground sm:text-lg">
            {aboutSummary}
          </p>
        </Section>
        <Section id="experience" title="Experience">
          <Experience jobs={content.experience} />
        </Section>
        <Section id="education" title="Education">
          <Education education={content.education} />
        </Section>
        {content.projects.length > 0 && (
          <Section id="academic" title="Academic & Project Experience">
            <Project projects={content.projects} />
          </Section>
        )}
        <Section id="skills" title="Skills">
          <Skills skills={content.skills} />
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
            New York, NY · Graduating May 2025
          </p>
        </div>
      </footer>
    </div>
  );
}
