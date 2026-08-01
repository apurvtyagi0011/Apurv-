# Faces by Sakshi — Website

A Next.js + Tailwind CSS website for Sakshi Tyagi's makeup artist business.

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content (no code changes needed)

All editable business content lives in `src/data/`:

- `site.ts` — business name, contact info, socials, address, working hours, Formspree endpoint.
- `services.ts` — pricing packages and add-ons, shown on the Services page.
- `portfolio.ts` — portfolio images and their categories, shown on the Home and Portfolio pages.
- `testimonials.ts` — client testimonials shown in the Home page carousel.

### Adding real photos

Every image on the site currently shows a labeled placeholder tile because no
photos have been supplied yet. To add a real photo:

1. Put the image file in `public/images/portfolio/` (or `public/images/misc/`
   for the hero/about/artist photos).
2. In the relevant data file, set the `image` field to the path, e.g.
   `"/images/portfolio/bridal-1.jpg"`.
3. For the Home page hero photo and the About page photos, edit the `src=""`
   props directly in `src/app/page.tsx` and `src/app/about/page.tsx`.

Leaving `image` as `""` keeps the placeholder tile showing — nothing breaks.

### Adding more portfolio items or price packages

Just add another object to the array in `portfolio.ts` or `services.ts` —
no other code changes are required.

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

The embedded Google Map in `src/data/site.ts` (`mapEmbedSrc`) currently
points to a generic "Noida, Uttar Pradesh" search. Replace it with an exact
address embed from Google Maps (Share → Embed a map) once the precise studio
address is finalised.

## Deploying

This is a standard Next.js app — deploy directly to
[Vercel](https://vercel.com/new) by importing this repository. No
environment variables are required since content lives in `src/data/`.
