import type { ExperienceItem } from "@/data/content";

type ExperienceProps = { jobs: ExperienceItem[] };

export function Experience({ jobs }: ExperienceProps) {
  return (
    <div className="space-y-10 sm:space-y-12">
      {jobs.map((job) => (
        <article
          key={job.id}
          className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8"
        >
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {job.role}
              </h3>
              <p className="text-base font-medium text-accent">{job.company}</p>
            </div>
            <span className="text-sm text-muted">{job.period}</span>
          </div>
          <p className="mb-4 text-sm text-muted">{job.location}</p>
          <ul className="list-inside list-disc space-y-2 text-sm text-foreground sm:text-base">
            {job.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
