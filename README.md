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

## Contact form & scheduling

- **Contact form**: Add `RESEND_API_KEY` (and optionally `CONTACT_EMAIL`) to send form submissions to your email via [Resend](https://resend.com). Copy `.env.example` to `.env` and fill in values.
- **Schedule a chat**: Set `NEXT_PUBLIC_CALENDLY_URL` to your Calendly (or similar) link so the “Schedule a chat” button points there.

## Build & deploy

```bash
bun run build
bun run start
```

Deploy to Vercel, Netlify, or any Node/Bun-compatible host. Set the env vars in the dashboard for contact and scheduling.
