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

## Contact form (GitHub Pages compatible)

This project is configured for static export so it can deploy to GitHub Pages.

- Set `NEXT_PUBLIC_CONTACT_SERVICE_URL` to a form/email endpoint that accepts JSON `POST` payloads (`name`, `email`, `message`) and responds with a 2xx status on success.
- Optional: set `NEXT_PUBLIC_CONTACT_EMAIL` to control the fallback destination.
- If the external service is missing or fails, the form falls back to opening a `mailto:` draft in the visitor's email app.

## Schedule a chat

Set `NEXT_PUBLIC_CALENDLY_URL` to your Calendly (or similar) link so the “Schedule a chat” button points there.

## Theme

- Built-in dark mode toggle in the header.
- Preference is saved in `localStorage` and defaults to the system color scheme.

## Build & deploy (GitHub Pages)

```bash
bun run build
```

Next.js generates static files in `out/` (via `output: "export"`). Publish that directory to GitHub Pages (for example with a GitHub Actions workflow).
