const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "#contact";

export function ScheduleCta() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <h3 className="mb-2 text-lg font-semibold text-foreground">
        Open to coffee chats & conversations
      </h3>
      <p className="mb-4 text-sm text-muted">
        I&apos;m happy to connect, share experiences, and explore opportunities.
        Schedule a short call or drop a message below.
      </p>
      <a
        href={CALENDLY_URL}
        target={CALENDLY_URL.startsWith("http") ? "_blank" : undefined}
        rel={CALENDLY_URL.startsWith("http") ? "noopener noreferrer" : undefined}
        className="inline-flex items-center justify-center rounded-full border border-accent bg-transparent px-6 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white"
      >
        Schedule a chat
      </a>
    </div>
  );
}
