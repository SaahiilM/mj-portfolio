import type { ProjectItem } from "@/data/content";

type ProjectProps = { projects: ProjectItem[] };

export function Project({ projects }: ProjectProps) {
  if (projects.length === 0) return null;

  return (
    <div className="space-y-10 sm:space-y-12">
      {projects.map((proj) => (
        <article
          key={proj.id}
          className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8"
        >
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            {proj.title}
          </h3>
          <ul className="list-inside list-disc space-y-2 text-sm text-foreground sm:text-base">
            {proj.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
