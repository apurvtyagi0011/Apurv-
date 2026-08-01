"use client";

import { useEffect, useState } from "react";
import SmartImage from "./SmartImage";
import type { Testimonial } from "@/data/testimonials";

type TestimonialsCarouselProps = {
  testimonials: Testimonial[];
  variant?: "light" | "dark";
};

export default function TestimonialsCarousel({
  testimonials,
  variant = "light",
}: TestimonialsCarouselProps) {
  const [index, setIndex] = useState(0);
  const isDark = variant === "dark";

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;
  const current = testimonials[index];

  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="mx-auto h-16 w-16 overflow-hidden rounded-full">
        <SmartImage
          src={current.image}
          alt={current.name}
          label="Photo"
          rounded
          className="h-16 w-16"
        />
      </div>

      <svg viewBox="0 0 24 24" className="mx-auto mt-5 h-6 w-6 text-gold" fill="currentColor">
        <path d="M7.17 6.5C4.87 8 3.5 10.44 3.5 13.24c0 2.9 1.99 4.76 4.29 4.76 1.98 0 3.53-1.5 3.53-3.44 0-1.83-1.28-3.2-2.98-3.2-.3 0-.6.04-.85.13.2-1.55 1.62-3.28 3.48-4.19L7.17 6.5Zm9.5 0c-2.3 1.5-3.67 3.94-3.67 6.74 0 2.9 1.99 4.76 4.29 4.76 1.98 0 3.53-1.5 3.53-3.44 0-1.83-1.28-3.2-2.98-3.2-.3 0-.6.04-.85.13.2-1.55 1.62-3.28 3.48-4.19L16.67 6.5Z" />
      </svg>

      <p
        className={`mt-4 font-serif text-xl leading-relaxed sm:text-2xl ${
          isDark ? "text-ivory" : "text-black"
        }`}
      >
        &ldquo;{current.quote}&rdquo;
      </p>

      <p className={`mt-5 text-sm font-medium ${isDark ? "text-ivory/90" : "text-charcoal"}`}>
        {current.name}
      </p>
      <p className={`text-xs uppercase tracking-wide ${isDark ? "text-gold-light" : "text-gold"}`}>
        {current.event}
      </p>

      <div className="mt-7 flex justify-center gap-2">
        {testimonials.map((t, i) => (
          <button
            key={t.id}
            type="button"
            aria-label={`Show testimonial ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-gold" : isDark ? "w-2 bg-ivory/20" : "w-2 bg-black/15"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
