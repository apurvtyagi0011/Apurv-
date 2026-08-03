import Link from "next/link";
import { whatsappHref, phoneHref, type SiteSettings } from "@/data/site";

const quickLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services & Pricing" },
  { href: "/about", label: "About" },
  { href: "/booking", label: "Booking" },
  { href: "/contact", label: "Contact" },
];

export default function Footer({ site }: { site: SiteSettings }) {
  return (
    <footer className="mt-auto border-t border-black/10 bg-black text-ivory/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <span className="font-serif text-2xl text-ivory">{site.businessName}</span>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory/60">
            {site.tagline}. Based in {site.city}, serving brides across Delhi NCR
            and destination weddings.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:border-gold hover:text-gold"
            >
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href={whatsappHref(site.phoneDigits)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:border-gold hover:text-gold"
            >
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor">
                <path d="M12.02 2C6.5 2 2 6.5 2 12.02c0 1.79.47 3.47 1.28 4.93L2 22l5.2-1.24a9.97 9.97 0 0 0 4.82 1.23h.01c5.52 0 10.02-4.5 10.02-10.02C22.05 6.5 17.55 2 12.02 2Z" opacity="0.15" />
                <path d="M17.47 14.38c-.28-.14-1.63-.8-1.88-.9-.25-.09-.44-.14-.62.14-.19.28-.72.9-.88 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.43-2.24-1.38-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.62-1.5-.85-2.05-.22-.55-.45-.47-.62-.48h-.53c-.18 0-.48.07-.73.34-.25.28-.96.94-.96 2.29 0 1.35.98 2.65 1.12 2.83.14.18 1.93 2.95 4.68 4.14.66.28 1.17.45 1.57.58.66.21 1.26.18 1.73.11.53-.08 1.63-.67 1.86-1.32.23-.65.23-1.2.16-1.32-.07-.11-.25-.18-.53-.32Z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-ivory/70 transition-colors hover:text-ivory">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Get in Touch
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-ivory/70">
            <li>{site.address}</li>
            <li>
              <a href={phoneHref(site.phoneDigits)} className="hover:text-ivory">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-ivory">
                {site.email}
              </a>
            </li>
            <li>
              {site.workingDays} · {site.workingHours}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10 px-5 py-5 text-center text-xs text-ivory/40 sm:px-8">
        © {new Date().getFullYear()} {site.businessName}. All rights reserved.
      </div>
    </footer>
  );
}
