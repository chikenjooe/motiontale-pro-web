# Motiontale Pro

Marketing site + early access app shell.

## Local dev

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000

## Supabase Auth setup

This project uses Supabase Auth for:

- Google OAuth
- Email + password sign up / sign in

### 1) Create a Supabase project

In Supabase Dashboard:

- Authentication → Providers → enable **Google**
- Authentication → URL Configuration:
  - Site URL:
    - local: `http://localhost:3000`
    - production: `https://<your-domain>` (or GitHub Pages URL)
  - Redirect URLs:
    - `http://localhost:3000/auth/callback`
    - `https://<your-domain>/auth/callback`

### 2) Set env vars

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

> Note: `anon` key is safe to expose client-side.

## Pages

- `/` marketing
- `/pricing`
- `/login`
- `/auth/callback` (OAuth callback)
- `/app` (protected UI shell)
- `/terms-of-service`
- `/terms-of-use`
- `/privacy-policy`
