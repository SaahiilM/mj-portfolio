type SkillsProps = { skills: string[] };

export function Skills({ skills }: SkillsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {skills.map((skill) => (
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
