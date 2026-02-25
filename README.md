# Maitreyee Jaiswal – Portfolio

Professional portfolio site (MBA candidate, Marketing & Operations). Built with Next.js, Tailwind CSS, and Bun.

## Run locally

Bun only (no Node required). Scripts use `bun --bun` so Next runs on Bun’s runtime.

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Role-based links (for job applications)

Use a dedicated URL per role so recruiters see tailored copy. The hero and About section change by role.

- **Default**: `yoursite.com` — general portfolio
- **Marketing Manager**: `yoursite.com/p/marketing-manager`
- **Product Manager**: `yoursite.com/p/product-manager`
- **Operations**: `yoursite.com/p/operations`

Add or edit roles in `src/data/roles.ts` (slug, label, headline, summary, aboutSummary). Unknown slugs 404.

## Contact form

The form posts to `/api/contact`, which uses [Resend](https://resend.com) to email you.

1. Get an API key at [resend.com](https://resend.com).
2. In `.env`: set `RESEND_API_KEY` and `RESEND_TO` (your inbox). Optionally set `RESEND_FROM` (default: `Portfolio <onboarding@resend.dev>` for testing; use a verified domain in production).
3. If Resend isn’t configured or the request fails, the form falls back to a `mailto:` draft.

## Schedule a chat

Set `NEXT_PUBLIC_CALENDLY_URL` to your Cal.com event URL (e.g. https://cal.com/username/30min) so the “Schedule a chat” button points there.

## Admin (edit portfolio content)

Visit `/admin` to edit Hero, About, Experience, Education, Projects, Skills, and role-specific content.

1. **Auth**: Set `ADMIN_PASSWORD` and `AUTH_SECRET` (run `openssl rand -base64 32`) in `.env`.
2. **Storage**: Use one of:
   - **[Neon](https://neon.tech)** (recommended): Create project, run `neon-schema.sql` in SQL Editor, add `DATABASE_URL` to `.env`
   - **[Supabase](https://supabase.com)**: Create project, run `supabase-schema.sql` in SQL Editor, add `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to `.env`
3. Without Supabase, the admin shows content but cannot save.

## Theme

- Built-in dark mode toggle in the header.
- Preference is saved in `localStorage` and defaults to the system color scheme.

## Build & deploy

```bash
bun run build
bun run start
```

Deploy to any Node.js host (e.g. [Vercel](https://vercel.com), Railway, or your own server). Set the same env vars in your deployment dashboard.
