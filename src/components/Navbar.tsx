"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services & Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ivory/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
          : "bg-ivory/60 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-serif text-xl tracking-wide text-black sm:text-2xl">
            {siteConfig.businessName}
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-gold sm:text-xs">
            Makeup Artist
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-gold ${
                pathname === link.href ? "text-gold" : "text-charcoal"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/booking"
            className="rounded-full bg-black px-5 py-2.5 text-sm font-medium uppercase tracking-wide text-ivory transition-colors hover:bg-charcoal"
          >
            Book Now
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-black/10 bg-ivory px-5 pb-6 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-3 text-base font-medium ${
                  pathname === link.href ? "bg-blush/60 text-gold" : "text-charcoal"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="mt-2 rounded-full bg-black px-5 py-3 text-center text-sm font-medium uppercase tracking-wide text-ivory"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
