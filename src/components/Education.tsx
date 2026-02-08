import type { EducationItem } from "@/data/content";

type EducationProps = { education: EducationItem };

export function Education({ education }: EducationProps) {
  return (
    <article className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <h3 className="mb-1 text-lg font-semibold text-foreground">
        {education.school}
      </h3>
      <p className="mb-2 text-sm text-muted">{education.location}</p>
      <p className="mb-1 font-medium text-accent">{education.degree}</p>
      <p className="text-sm text-muted">{education.detail}</p>
    </article>
  );
}
