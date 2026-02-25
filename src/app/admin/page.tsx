"use client";

import { useEffect, useState } from "react";
import type { PortfolioContent } from "@/lib/content-types";
import type { RoleOverride } from "@/lib/content-types";
import { getSectionContentForRole } from "@/lib/content";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

type Section = "hero" | "about" | "experience" | "education" | "projects" | "skills" | "roles";

export default function AdminPage() {
  const [content, setContent] = useState<PortfolioContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [saveProgressText, setSaveProgressText] = useState<string | null>(null);
  const [activeRole, setActiveRole] = useState("");
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const [supabaseReady, setSupabaseReady] = useState(true);
  const [dbProvider, setDbProvider] = useState<"neon" | "supabase" | null>(null);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((data) => {
        const { _hasSupabase, _dbProvider, ...rest } = data;
        setContent(rest);
        setSupabaseReady(!!_hasSupabase);
        setDbProvider((_dbProvider as "neon" | "supabase" | null) ?? null);
      })
      .catch(() => setContent(null))
      .finally(() => setLoading(false));
  }, []);

  async function save(partial: Partial<PortfolioContent>) {
    setSaving(true);
    setMessage(null);
<<<<<<< codex/fix-save-button-requests-to-database-vngj63
    setSaveProgressText("Saving changes to database…");
=======
>>>>>>> main
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(partial),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage({ type: "error", text: data.error ?? `Failed to save (${res.status})` });
<<<<<<< codex/fix-save-button-requests-to-database-vngj63
        setSaveProgressText(null);
=======
>>>>>>> main
        return;
      }
      setContent((prev) => (prev ? { ...prev, ...partial } : null));
      setMessage({ type: "ok", text: "Saved" });
<<<<<<< codex/fix-save-button-requests-to-database-vngj63
      setSaveProgressText("Saved successfully");
      setTimeout(() => {
        setMessage(null);
        setSaveProgressText(null);
      }, 2000);
    } catch {
      setMessage({ type: "error", text: "Network error while saving. Check deployment logs and database env vars." });
      setSaveProgressText(null);
=======
      setTimeout(() => setMessage(null), 2000);
    } catch {
      setMessage({ type: "error", text: "Network error while saving. Check deployment logs and database env vars." });
>>>>>>> main
    } finally {
      setSaving(false);
    }
  }

  function saveRoleOverride(slug: string, override: Partial<RoleOverride>) {
    const existing = content?.roles?.[slug] ?? { label: slug.replace(/-/g, " "), headline: "", summary: "" };
    const roles = { ...content?.roles, [slug]: { ...existing, ...override } };
    save({ roles });
  }

  if (loading || !content) {
    return (
      <div className="py-12 text-center text-muted">Loading…</div>
    );
  }

  const sectionContent = getSectionContentForRole(content, activeRole || null);
  const isDefault = !activeRole;

  const roleOptions = [
    { value: "", label: "Default" },
    ...Object.entries(content?.roles ?? {}).map(([slug, r]) => ({
      value: slug,
      label: r.label || slug.replace(/-/g, " "),
    })),
  ];

  const sections: { id: Section; label: string }[] = [
    { id: "hero", label: "Hero" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "roles", label: "Roles" },
  ];

  return (
    <div className="space-y-6">
      {!supabaseReady && (
        <div className="rounded-lg border border-amber-500/50 bg-amber-500/10 p-4 text-sm text-amber-700 dark:text-amber-400">
          Database not configured. Add <code className="rounded bg-black/10 px-1">DATABASE_URL</code>{" "}
          (or <code className="rounded bg-black/10 px-1">POSTGRES_URL</code>) for Neon, or{" "}
          <code className="rounded bg-black/10 px-1">NEXT_PUBLIC_SUPABASE_URL</code> +{" "}
          <code className="rounded bg-black/10 px-1">SUPABASE_SERVICE_ROLE_KEY</code> (Supabase) to .env, then run{" "}
          <code className="rounded bg-black/10 px-1">neon-schema.sql</code> or{" "}
          <code className="rounded bg-black/10 px-1">supabase-schema.sql</code> to enable saving.
        </div>
      )}
      {message && (
        <p className={message.type === "ok" ? "text-sm text-green-600" : "text-sm text-red-500"}>
          {message.text}
        </p>
      )}
<<<<<<< codex/fix-save-button-requests-to-database-vngj63
      {saveProgressText && (
        <div className="flex items-center gap-2 text-sm text-muted">
          {saving && <span className="inline-block size-3 animate-spin rounded-full border-2 border-muted border-t-accent" />}
          <span>{saveProgressText}</span>
        </div>
      )}
=======
>>>>>>> main
      <p className="text-xs text-muted">Detected storage provider: <strong>{dbProvider ?? "none"}</strong></p>

      <div className="rounded-xl border border-border bg-card p-4">
        <label className="mb-2 block text-sm font-medium text-foreground">Editing for</label>
        <div className="flex flex-wrap gap-2">
          {roleOptions.map((opt) => (
            <button
              key={opt.value || "default"}
              type="button"
              onClick={() => setActiveRole(opt.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeRole === opt.value
                  ? "bg-accent text-white"
                  : "border border-border bg-background text-foreground hover:bg-foreground/5"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">
          {isDefault
            ? "Default content shown on the main portfolio. Roles inherit from this unless overridden."
            : `Customizing content for /p/${activeRole}`}
        </p>
      </div>

      <nav className="flex flex-wrap gap-2">
        {sections.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveSection(s.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeSection === s.id
                ? "bg-accent text-white"
                : "bg-card border border-border text-foreground hover:bg-foreground/5"
            }`}
          >
            {s.label}
          </button>
        ))}
      </nav>

      {activeSection === "hero" && (
        isDefault && content.hero ? (
          <HeroForm
            hero={content.hero}
            onSave={(h) => save({ hero: h })}
            saving={saving}
          />
        ) : (
          <RoleHeroForm
            key={activeRole}
            defaultName={content.hero?.name ?? "Maitreyee Jaiswal"}
            badge={sectionContent.profile.badge}
            headline={sectionContent.profile.headline}
            onSave={(h) => saveRoleOverride(activeRole, h)}
            saving={saving}
          />
        )
      )}

      {activeSection === "about" && (
        isDefault && content.about ? (
          <AboutForm
            about={content.about}
            onSave={(a) => save({ about: a })}
            saving={saving}
          />
        ) : (
          <RoleAboutForm
            key={activeRole}
            aboutSummary={sectionContent.profile.aboutSummary}
            onSave={(a) => saveRoleOverride(activeRole, a)}
            saving={saving}
          />
        )
      )}

      {activeSection === "experience" && (
        <ExperienceForm
          key={`exp-${activeRole || "default"}`}
          experience={sectionContent.experience ?? []}
          onSave={(e) =>
            isDefault ? save({ experience: e }) : saveRoleOverride(activeRole, { experience: e })
          }
          saving={saving}
        />
      )}

      {activeSection === "education" && (
        <EducationForm
          education={sectionContent.education}
          onSave={(e) => save({ education: e })}
          saving={saving}
          readOnly={!isDefault}
          switchToDefault={() => setActiveRole("")}
        />
      )}

      {activeSection === "projects" && (
        <ProjectsForm
          key={`proj-${activeRole || "default"}`}
          projects={sectionContent.projects ?? []}
          onSave={(p) =>
            isDefault ? save({ projects: p }) : saveRoleOverride(activeRole, { projects: p })
          }
          saving={saving}
        />
      )}

      {activeSection === "skills" && (
        <SkillsForm
          key={`skills-${activeRole || "default"}`}
          skills={sectionContent.skills}
          onSave={(s) =>
            isDefault ? save({ skills: s }) : saveRoleOverride(activeRole, { skills: s })
          }
          saving={saving}
        />
      )}

      {activeSection === "roles" && (
        <RolesForm
          roles={content.roles ?? {}}
          roleRedirects={content.roleRedirects ?? {}}
          onSave={(updates) => save(updates)}
          saving={saving}
          activeRole={activeRole}
          onRoleChange={(slug) => {
            setActiveRole(slug);
            setActiveSection("hero");
          }}
          onRoleRemoved={(slug) => {
            if (activeRole === slug) setActiveRole("");
          }}
        />
      )}
    </div>
  );
}

function RolesForm({
  roles,
  roleRedirects,
  onSave,
  saving,
  activeRole,
  onRoleChange,
  onRoleRemoved,
}: {
  roles: Record<string, RoleOverride>;
  roleRedirects: Record<string, string>;
  onSave: (updates: Partial<PortfolioContent>) => void;
  saving: boolean;
  activeRole: string;
  onRoleChange: (slug: string) => void;
  onRoleRemoved: (slug: string) => void;
}) {
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [newLabel, setNewLabel] = useState("");
  const [addMode, setAddMode] = useState(false);

  const entries = Object.entries(roles);

  function addRole() {
    const slug = slugify(newLabel) || `role-${Date.now()}`;
    if (!slug) return;
    if (roles[slug]) {
      setNewLabel("");
      setAddMode(false);
      return;
    }
    const updated = {
      ...roles,
      [slug]: {
        label: newLabel.trim() || slug.replace(/-/g, " "),
        headline: "",
        summary: "",
      },
    };
    onSave({ roles: updated });
    setNewLabel("");
    setAddMode(false);
    onRoleChange(slug);
  }

  function removeRole(slug: string) {
    if (!confirm(`Remove role "${roles[slug]?.label ?? slug}"? This cannot be undone.`)) return;
    const updated = { ...roles };
    delete updated[slug];
    onSave({ roles: updated });
    if (editingSlug === slug) setEditingSlug(null);
    onRoleRemoved(slug);
  }

  function renameRole(oldSlug: string, newSlug: string, newLabel: string) {
    const labelChanged = (roles[oldSlug]?.label ?? oldSlug.replace(/-/g, " ")) !== newLabel;
    const slugChanged = oldSlug !== newSlug;
    if (!labelChanged && !slugChanged) {
      setEditingSlug(null);
      return;
    }
    const updated = { ...roles };
    const data = updated[oldSlug] ?? { label: oldSlug.replace(/-/g, " "), headline: "", summary: "" };
    delete updated[oldSlug];
    updated[newSlug] = { ...data, label: newLabel.trim() || newSlug.replace(/-/g, " ") };

    // Preserve old URLs: anyone with /p/old-slug gets 308 → /p/new-slug
    const redirects = { ...roleRedirects };
    if (slugChanged) {
      redirects[oldSlug] = newSlug;
      // Update any redirects pointing to oldSlug to point to newSlug
      for (const [from, to] of Object.entries(redirects)) {
        if (to === oldSlug) redirects[from] = newSlug;
      }
    }
    onSave({ roles: updated, roleRedirects: redirects });
    setEditingSlug(null);
    if (activeRole === oldSlug) onRoleChange(newSlug);
  }

  return (
    <FormSection title="Roles">
      <p className="mb-4 text-sm text-muted">
        Add, remove, or edit role names. Each role has its own URL: <code className="rounded bg-muted px-1">/p/[slug]</code>
        {" "}Old URLs redirect automatically when you rename a role, so shared links keep working.
      </p>
      <div className="space-y-3">
        {entries.map(([slug, r]) => (
          <div
            key={slug}
            className="flex flex-wrap items-center gap-2 rounded-lg border border-border p-4"
          >
            {editingSlug === slug ? (
              <>
                <input
                  type="text"
                  placeholder="Label"
                  defaultValue={r.label || slug.replace(/-/g, " ")}
                  id={`edit-label-${slug}`}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-foreground"
                />
                <input
                  type="text"
                  placeholder="URL slug"
                  defaultValue={slug}
                  id={`edit-slug-${slug}`}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-foreground font-mono text-sm"
                />
                <button
                  type="button"
                  onClick={() => {
                    const labelEl = document.getElementById(`edit-label-${slug}`) as HTMLInputElement;
                    const slugEl = document.getElementById(`edit-slug-${slug}`) as HTMLInputElement;
                    const newLabel = labelEl?.value?.trim() || slug.replace(/-/g, " ");
                    const newSlug = slugify(slugEl?.value || slug) || slug;
                    if (newSlug !== slug && roles[newSlug]) {
                      alert(`Slug "${newSlug}" already exists. Choose a different URL.`);
                      return;
                    }
                    renameRole(slug, newSlug, newLabel);
                  }}
                  disabled={saving}
                  className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-60"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingSlug(null)}
                  className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-foreground/5"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="font-medium">{r.label || slug.replace(/-/g, " ")}</span>
                <code className="rounded bg-muted px-2 py-0.5 text-xs">/p/{slug}</code>
                <button
                  type="button"
                  onClick={() => setEditingSlug(slug)}
                  className="text-sm text-accent hover:underline"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => removeRole(slug)}
                  className="text-sm text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </>
            )}
          </div>
        ))}
        {addMode ? (
          <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border border-dashed p-4">
            <input
              type="text"
              placeholder="Role label (e.g. Marketing Manager)"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addRole()}
              className="rounded-lg border border-border bg-background px-3 py-2 text-foreground"
              autoFocus
            />
            <button
              type="button"
              onClick={addRole}
              disabled={saving || !newLabel.trim()}
              className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-60"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => { setAddMode(false); setNewLabel(""); }}
              className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-foreground/5"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setAddMode(true)}
            className="rounded-full border border-accent bg-transparent px-4 py-2 text-sm font-medium text-accent hover:bg-accent/10"
          >
            + Add role
          </button>
        )}
      </div>
    </FormSection>
  );
}

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-4 text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  );
}

function HeroForm({
  hero,
  onSave,
  saving,
}: {
  hero: NonNullable<PortfolioContent["hero"]>;
  onSave: (h: NonNullable<PortfolioContent["hero"]>) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState(hero);
  return (
    <FormSection title="Hero">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(form);
        }}
        className="space-y-4"
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Badge</label>
          <input
            type="text"
            value={form.badge}
            onChange={(e) => setForm({ ...form, badge: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
            placeholder="e.g. MBA Candidate · Graduating May 2026"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Headline</label>
          <textarea
            value={form.headline}
            onChange={(e) => setForm({ ...form, headline: e.target.value })}
            rows={3}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </form>
    </FormSection>
  );
}

function RoleHeroForm({
  defaultName,
  badge: initialBadge,
  headline: initialHeadline,
  onSave,
  saving,
}: {
  defaultName: string;
  badge: string;
  headline: string;
  onSave: (h: Partial<RoleOverride>) => void;
  saving: boolean;
}) {
  const [badge, setBadge] = useState(initialBadge);
  const [headline, setHeadline] = useState(initialHeadline);
  return (
    <FormSection title="Hero">
      <p className="mb-4 text-sm text-muted">Name is shared from Default. Edit badge and headline for this role.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave({ badge, headline });
        }}
        className="space-y-4"
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Name (from Default)</label>
          <input type="text" value={defaultName} disabled className="w-full rounded-lg border border-border bg-muted/30 px-3 py-2 text-muted" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Badge</label>
          <input
            type="text"
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
            placeholder="e.g. Applying for Marketing Manager · Graduating May 2026"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Headline</label>
          <textarea
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </form>
    </FormSection>
  );
}

function AboutForm({
  about,
  onSave,
  saving,
}: {
  about: NonNullable<PortfolioContent["about"]>;
  onSave: (a: NonNullable<PortfolioContent["about"]>) => void;
  saving: boolean;
}) {
  const [summary, setSummary] = useState(about.summary);
  return (
    <FormSection title="About">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave({ summary });
        }}
        className="space-y-4"
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Summary (supports bold, bullets)</label>
          <RichTextEditor
            value={summary}
            onChange={setSummary}
            placeholder="Write your about summary…"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </form>
    </FormSection>
  );
}

function RoleAboutForm({
  aboutSummary,
  onSave,
  saving,
}: {
  aboutSummary: string;
  onSave: (a: Partial<RoleOverride>) => void;
  saving: boolean;
}) {
  const [summary, setSummary] = useState(aboutSummary);
  return (
    <FormSection title="About">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave({ aboutSummary: summary });
        }}
        className="space-y-4"
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Summary (supports bold, bullets)</label>
          <RichTextEditor
            value={summary}
            onChange={setSummary}
            placeholder="Write your about summary for this role…"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </form>
    </FormSection>
  );
}

function bulletsToLines(bullets: string[]) {
  return bullets.join("\n");
}
function linesToBullets(s: string) {
  return s.split("\n").map((l) => l.trim()).filter(Boolean);
}

const newExperienceItem = (): NonNullable<PortfolioContent["experience"]>[number] => ({
  id: `exp-${Date.now()}`,
  company: "",
  location: "",
  role: "",
  period: "",
  bullets: [],
});

function ExperienceForm({
  experience,
  onSave,
  saving,
}: {
  experience: NonNullable<PortfolioContent["experience"]>;
  onSave: (e: NonNullable<PortfolioContent["experience"]>) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState(experience);
  return (
    <FormSection title="Experience">
      <div className="space-y-6">
        {form.map((job, i) => (
          <div key={job.id} className="space-y-3 rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted">Job {i + 1}</span>
              <button
                type="button"
                onClick={() => setForm(form.filter((_, j) => j !== i))}
                className="text-sm text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Role"
                value={job.role}
                onChange={(e) => {
                  const next = [...form];
                  next[i] = { ...next[i], role: e.target.value };
                  setForm(next);
                }}
                className="rounded-lg border border-border bg-background px-3 py-2 text-foreground"
              />
              <input
                type="text"
                placeholder="Company"
                value={job.company}
                onChange={(e) => {
                  const next = [...form];
                  next[i] = { ...next[i], company: e.target.value };
                  setForm(next);
                }}
                className="rounded-lg border border-border bg-background px-3 py-2 text-foreground"
              />
              <input
                type="text"
                placeholder="Period"
                value={job.period}
                onChange={(e) => {
                  const next = [...form];
                  next[i] = { ...next[i], period: e.target.value };
                  setForm(next);
                }}
                className="rounded-lg border border-border bg-background px-3 py-2 text-foreground"
              />
              <input
                type="text"
                placeholder="Location"
                value={job.location}
                onChange={(e) => {
                  const next = [...form];
                  next[i] = { ...next[i], location: e.target.value };
                  setForm(next);
                }}
                className="rounded-lg border border-border bg-background px-3 py-2 text-foreground"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-muted">Bullets (one per line)</label>
              <textarea
                value={bulletsToLines(job.bullets)}
                onChange={(e) => {
                  const next = [...form];
                  next[i] = { ...next[i], bullets: linesToBullets(e.target.value) };
                  setForm(next);
                }}
                rows={4}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
              />
            </div>
          </div>
        ))}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setForm([...form, newExperienceItem()])}
            className="rounded-full border border-accent bg-transparent px-4 py-2 text-sm font-medium text-accent hover:bg-accent/10"
          >
            + Add job
          </button>
          <button
            type="button"
            onClick={() => onSave(form)}
            disabled={saving}
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </FormSection>
  );
}

const newEducationItem = () => ({
  school: "",
  location: "",
  degree: "",
  period: "",
  detail: "",
});

function EducationForm({
  education,
  onSave,
  saving,
  readOnly,
  switchToDefault,
}: {
  education: NonNullable<PortfolioContent["education"]>;
  onSave: (e: NonNullable<PortfolioContent["education"]>) => void;
  saving: boolean;
  readOnly?: boolean;
  switchToDefault?: () => void;
}) {
  const normalized = Array.isArray(education) ? education : education ? [education] : [];
  const [form, setForm] = useState(normalized);

  if (readOnly) {
    return (
      <FormSection title="Education">
        <p className="mb-4 text-sm text-muted">
          Education is shared across all roles.{" "}
          <button type="button" onClick={switchToDefault} className="font-medium text-accent hover:underline">
            Switch to Default
          </button>{" "}
          to edit.
        </p>
        <div className="space-y-4">
          {normalized.map((edu, i) => (
            <div key={i} className="rounded-lg border border-border p-4">
              <p className="font-medium">{edu.school}</p>
              <p className="text-sm text-muted">{edu.degree} · {edu.period}</p>
            </div>
          ))}
        </div>
      </FormSection>
    );
  }

  return (
    <FormSection title="Education">
      <div className="space-y-6">
        {form.map((edu, i) => (
          <div key={i} className="space-y-3 rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted">Education {i + 1}</span>
              <button
                type="button"
                onClick={() => setForm(form.filter((_, j) => j !== i))}
                className="text-sm text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
            {(["school", "location", "degree", "period", "detail"] as const).map((key) => (
              <div key={key}>
                <label className="mb-1 block text-sm font-medium text-foreground capitalize">{key}</label>
                <input
                  type="text"
                  value={edu[key] ?? ""}
                  placeholder={key === "period" ? "e.g. Jul 2024 – Present" : undefined}
                  onChange={(e) => {
                    const next = [...form];
                    next[i] = { ...next[i], [key]: e.target.value };
                    setForm(next);
                  }}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
                />
              </div>
            ))}
          </div>
        ))}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setForm([...form, newEducationItem()])}
            className="rounded-full border border-accent bg-transparent px-4 py-2 text-sm font-medium text-accent hover:bg-accent/10"
          >
            + Add education
          </button>
          <button
            type="button"
            onClick={() => onSave(form)}
            disabled={saving}
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </FormSection>
  );
}

const newProjectItem = (): NonNullable<PortfolioContent["projects"]>[number] => ({
  id: `proj-${Date.now()}`,
  title: "",
  bullets: [],
});

function ProjectsForm({
  projects,
  onSave,
  saving,
}: {
  projects: NonNullable<PortfolioContent["projects"]>;
  onSave: (p: NonNullable<PortfolioContent["projects"]>) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState(projects);
  return (
    <FormSection title="Projects">
      <div className="space-y-6">
        {form.map((proj, i) => (
          <div key={proj.id} className="space-y-3 rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted">Project {i + 1}</span>
              <button
                type="button"
                onClick={() => setForm(form.filter((_, j) => j !== i))}
                className="text-sm text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
            <input
              type="text"
              placeholder="Title"
              value={proj.title}
              onChange={(e) => {
                const next = [...form];
                next[i] = { ...next[i], title: e.target.value };
                setForm(next);
              }}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
            />
            <div>
              <label className="mb-1 block text-sm text-muted">Bullets (one per line)</label>
              <textarea
                value={bulletsToLines(proj.bullets)}
                onChange={(e) => {
                  const next = [...form];
                  next[i] = { ...next[i], bullets: linesToBullets(e.target.value) };
                  setForm(next);
                }}
                rows={3}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
              />
            </div>
          </div>
        ))}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setForm([...form, newProjectItem()])}
            className="rounded-full border border-accent bg-transparent px-4 py-2 text-sm font-medium text-accent hover:bg-accent/10"
          >
            + Add project
          </button>
          <button
            type="button"
            onClick={() => onSave(form)}
            disabled={saving}
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </FormSection>
  );
}

function SkillsForm({
  skills,
  onSave,
  saving,
}: {
  skills: NonNullable<PortfolioContent["skills"]>;
  onSave: (s: NonNullable<PortfolioContent["skills"]>) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState(skills);
  return (
    <FormSection title="Skills">
      <div className="space-y-4">
        {form.map((skill, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={skill}
              onChange={(e) => {
                const next = [...form];
                next[i] = e.target.value;
                setForm(next);
              }}
              placeholder="Skill name"
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-foreground"
            />
            <button
              type="button"
              onClick={() => setForm(form.filter((_, j) => j !== i))}
              className="rounded px-2 py-1 text-sm text-red-500 hover:bg-red-500/10"
              aria-label="Remove skill"
            >
              Remove
            </button>
          </div>
        ))}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setForm([...form, ""])}
            className="rounded-full border border-accent bg-transparent px-4 py-2 text-sm font-medium text-accent hover:bg-accent/10"
          >
            + Add skill
          </button>
          <button
            type="button"
            onClick={() => onSave(form.filter(Boolean))}
            disabled={saving}
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </FormSection>
  );
}
