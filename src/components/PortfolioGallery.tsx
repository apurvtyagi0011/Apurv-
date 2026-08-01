"use client";

import { useMemo, useState } from "react";
import SmartImage from "./SmartImage";
import type { PortfolioCategory, PortfolioItem } from "@/data/portfolio";

type PortfolioGalleryProps = {
  items: PortfolioItem[];
  categories?: PortfolioCategory[];
  filterable?: boolean;
};

export default function PortfolioGallery({
  items,
  categories = [],
  filterable = false,
}: PortfolioGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory | "All">("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (!filterable || activeCategory === "All") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory, filterable]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filteredItems.length) % filteredItems.length));
  const showNext = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filteredItems.length));

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div>
      {filterable && (
        <div className="mb-10 flex flex-wrap justify-center gap-2.5">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat as PortfolioCategory | "All")}
              className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors ${
                activeCategory === cat
                  ? "border-black bg-black text-ivory"
                  : "border-black/15 text-charcoal/70 hover:border-gold hover:text-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filteredItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => openLightbox(index)}
            className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-black/5"
          >
            <SmartImage
              src={item.image}
              alt={item.alt}
              label={item.title}
              className="h-full w-full transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 23vw, (min-width: 640px) 31vw, 46vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="text-xs font-medium uppercase tracking-wide text-ivory">
                {item.category}
              </span>
            </div>
          </button>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className="py-16 text-center text-sm text-charcoal/50">
          No images in this category yet — check back soon.
        </p>
      )}

      {activeItem && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-colors hover:border-gold hover:text-gold"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous image"
            className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-colors hover:border-gold hover:text-gold sm:left-6"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div
            className="relative aspect-[3/4] w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <SmartImage
              src={activeItem.image}
              alt={activeItem.alt}
              label={activeItem.title}
              className="h-full w-full rounded-lg"
              sizes="90vw"
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
            className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-colors hover:border-gold hover:text-gold sm:right-6"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
