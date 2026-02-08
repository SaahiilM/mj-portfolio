export function Hero() {
  return (
    <section className="py-16 sm:py-24 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent">
          MBA Candidate · Graduating May 2025
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Maitreyee Jaiswal
        </h1>
        <p className="mb-8 max-w-xl text-lg text-muted sm:text-xl">
          Marketing & Operations professional focused on reporting, documentation,
          and process improvement. Data-driven, detail-oriented, and ready to
          contribute from day one.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Get in touch
          </a>
          <a
            href="#experience"
            className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
          >
            View experience
          </a>
        </div>
      </div>
    </section>
  );
}
