const SKILLS = [
  "Compliance Support",
  "Reporting & Documentation",
  "Data Analysis",
  "Process Improvement",
  "Risk Awareness",
  "Excel",
  "PowerPoint",
  "Google Analytics",
];

export function Skills() {
  return (
    <div className="flex flex-wrap gap-3">
      {SKILLS.map((skill) => (
        <span
          key={skill}
          className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
        >
          {skill}
        </span>
      ))}
    </div>
  );
}
