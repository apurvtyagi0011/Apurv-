# Faces by Sakshi — Website

A Next.js + Tailwind CSS website for Sakshi Tyagi's makeup artist business.

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content

Almost everything on the site — text, prices, photos, testimonials — can be
edited live from the **`/admin`** page (see below), no code or GitHub needed.

The files in `src/data/` (`site.ts`, `services.ts`, `portfolio.ts`,
`testimonials.ts`, `about.ts`) only serve as the **starting/fallback
content** shown before anyone has edited anything through `/admin`, and as a
reference for developers. Editing them requires a code change + deploy, so
prefer `/admin` for day-to-day updates.

## Admin dashboard (`/admin`)

A password-protected admin page where the site owner can update everything
without touching code:

- **Photos** — Home hero photo, About page photo, Artist photo, and the full
  Portfolio gallery (add/delete, category, title, "show on homepage" toggle).
- **Business Info** — name, tagline, phone, email, address, socials, working
  hours, and the Formspree endpoint for booking emails.
- **About Page** — bio paragraphs, "Meet the Artist" text, signature styles,
  and the premium brands list.
- **Services & Pricing** — packages, prices, descriptions, "Most Booked"
  flag, and the "Good to Know" notes, fully add/remove/edit.
- **Testimonials** — add or remove client testimonials with an optional
  photo.

Changes go live within a few seconds — no redeploy needed.

### One-time setup (do this after deploying to Vercel)

1. **Set an admin password.** In the Vercel project → Settings →
   Environment Variables, add:
   ```
   ADMIN_PASSWORD=choose-a-strong-password
   ```
2. **Connect image storage.** In the Vercel project → Storage tab → Create
   Database → **Blob** → connect it to this project. Vercel automatically
   adds a `BLOB_READ_WRITE_TOKEN` environment variable — no manual copying
   needed. (This also stores all the text content edited via `/admin`, not
   just photos.)
3. Redeploy (or it will pick up the new env vars on the next deploy).
4. Visit `https://yoursite.com/admin`, log in with the password from step 1,
   and start editing.

Until both env vars are set, the site shows the placeholder/default content
as before, and `/admin` will show a clear error if you try to save —
nothing breaks.

### Testing admin locally

Create a `.env.local` file (already gitignored) with:
```
ADMIN_PASSWORD=any-password-for-local-testing
```
You can log in and browse `/admin` locally without a Blob store, but saving
will show a "storage isn't set up yet" message until you also pull the
`BLOB_READ_WRITE_TOKEN` from Vercel (`vercel env pull .env.local`) or set one
up separately for local use.

## Booking form (email notifications)

The booking form uses [Formspree](https://formspree.io) — free, no backend
required. To receive booking enquiries by email:

1. Create a free account at [formspree.io](https://formspree.io) using
   `sakshityagi1422@gmail.com`.
2. Create a new form and copy its endpoint URL (looks like
   `https://formspree.io/f/xxxxabcd`).
3. Paste it into the **Formspree Endpoint** field under Business Info in
   `/admin` (or `formspreeEndpoint` in `src/data/site.ts` as the fallback).

Until this is set, form submissions will fail with an error message that
also shows a fallback email/phone for the client to contact directly.

## Contact page map

The embedded Google Map is generated automatically from the **Full Address**
field in `/admin` → Business Info — no separate map URL to manage.

## Deploying

This is a standard Next.js app — deploy directly to
[Vercel](https://vercel.com/new) by importing this repository. See the
"Admin dashboard" section above for the two environment variables to add
after the first deploy.
