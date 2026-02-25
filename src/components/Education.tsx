import type { EducationItem } from "@/data/content";

type EducationProps = { education: EducationItem | EducationItem[] };

function EducationItemCard({ education }: { education: EducationItem }) {
  return (
    <article className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <h3 className="mb-1 text-lg font-semibold text-foreground">
        {education.school}
      </h3>
      <p className="mb-2 text-sm text-muted">{education.location}</p>
      <p className="mb-1 font-medium text-accent">{education.degree}</p>
      {education.period && (
        <p className="mb-1 text-sm text-muted">{education.period}</p>
      )}
      {education.detail && (
        <p className="text-sm text-muted">{education.detail}</p>
      )}
    </article>
  );
}

export function Education({ education }: EducationProps) {
  const items = Array.isArray(education) ? education : [education];
  return (
    <div className="space-y-6">
      {items.map((item, i) => (
        <EducationItemCard key={i} education={item} />
      ))}
    </div>
  );
}
