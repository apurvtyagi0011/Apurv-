# Faces by Sakshi — Website

A Next.js + Tailwind CSS website for Sakshi Tyagi's makeup artist business.

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content (no code changes needed)

Most business content lives in `src/data/`:

- `site.ts` — business name, contact info, socials, address, working hours, Formspree endpoint.
- `services.ts` — pricing packages and add-ons, shown on the Services page.
- `portfolio.ts` — default/seed portfolio images and categories.
- `testimonials.ts` — client testimonials shown in the Home page carousel.

Photos (hero, about, artist, portfolio) are managed through the **`/admin`
page** described below — you don't need to touch code or GitHub for those.

### Adding more price packages or testimonials

Just add another object to the array in `services.ts` or `testimonials.ts` —
no other code changes are required.

## Admin photo uploads (`/admin`)

There's a password-protected admin page at `/admin` where photos can be
uploaded directly from a browser — no code editing or GitHub required:

- Upload/replace the Home hero photo, About page photo, and Artist photo.
- Add or delete Portfolio photos, with category, title, and a "show on
  homepage" toggle.

Changes go live within a few seconds, no redeploy needed.

### One-time setup (do this after deploying to Vercel)

1. **Set an admin password.** In the Vercel project → Settings →
   Environment Variables, add:
   ```
   ADMIN_PASSWORD=choose-a-strong-password
   ```
2. **Connect image storage.** In the Vercel project → Storage tab → Create
   Database → **Blob** → connect it to this project. Vercel automatically
   adds a `BLOB_READ_WRITE_TOKEN` environment variable — no manual copying
   needed.
3. Redeploy (or it will pick up the new env vars on the next deploy).
4. Visit `https://yoursite.com/admin`, log in with the password from step 1,
   and start uploading.

Until both env vars are set, the site shows the placeholder tiles as before,
and `/admin` will show a clear error if you try to upload — nothing breaks.

### Testing admin locally

Create a `.env.local` file (already gitignored) with:
```
ADMIN_PASSWORD=any-password-for-local-testing
```
You can log in and browse `/admin` locally without a Blob store, but actual
uploads will show a "storage isn't set up yet" message until you also pull
the `BLOB_READ_WRITE_TOKEN` from Vercel (`vercel env pull .env.local`) or set
one up separately for local use.

## Booking form (email notifications)

The booking form uses [Formspree](https://formspree.io) — free, no backend
required. To receive booking enquiries by email:

1. Create a free account at [formspree.io](https://formspree.io) using
   `sakshityagi1422@gmail.com`.
2. Create a new form and copy its endpoint URL (looks like
   `https://formspree.io/f/xxxxabcd`).
3. Paste it into `formspreeEndpoint` in `src/data/site.ts`.

Until this is set, form submissions will fail with an error message that
also shows a fallback email/phone for the client to contact directly.

## Contact page map

The embedded Google Map in `src/data/site.ts` (`mapEmbedSrc`) points to the
studio address (N Block, Vivek Vihar, Sector 82, Noida). Update it the same
way (Google Maps → Share → Embed a map) if the address ever changes.

## Deploying

This is a standard Next.js app — deploy directly to
[Vercel](https://vercel.com/new) by importing this repository. See the
"Admin photo uploads" section above for the two environment variables to add
after the first deploy.
