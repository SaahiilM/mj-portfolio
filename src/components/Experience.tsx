const EXPERIENCE = [
  {
    company: "Bejou",
    location: "New York, NY",
    role: "Brand Marketing Manager",
    period: "Jun 2025 – Sep 2025",
    bullets: [
      "Analyzed performance data across campaigns and community initiatives, ensuring accuracy and consistency in reporting",
      "Maintained documentation, managed timelines, and coordinated vendors while enforcing quality and compliance standards",
      "Created client-ready reports and dashboards using analytics and AI tools to improve reporting efficiency",
    ],
  },
  {
    company: "Hiroshop.in",
    location: "Mumbai, India",
    role: "Marketing Manager",
    period: "Dec 2022 – Nov 2023",
    bullets: [
      "Conducted structured market and consumer analysis to support data-backed business decisions",
      "Introduced automation and quality-control processes to improve operational efficiency and consistency",
      "Managed multiple stakeholders while adhering to internal standards and reporting requirements",
    ],
  },
];

export function Experience() {
  return (
    <div className="space-y-10 sm:space-y-12">
      {EXPERIENCE.map((job) => (
        <article
          key={job.company}
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
