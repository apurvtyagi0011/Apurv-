import { cache } from "react";
import { put, head } from "@vercel/blob";
import { portfolioItems as seedPortfolioItems, type PortfolioItem } from "@/data/portfolio";
import { testimonials as seedTestimonials, type Testimonial } from "@/data/testimonials";
import {
  serviceCategories as seedServiceCategories,
  pricingNotes as seedPricingNotes,
  type ServiceCategory,
} from "@/data/services";
import { defaultSiteSettings, type SiteSettings } from "@/data/site";
import { defaultAboutContent, type AboutContent } from "@/data/about";

const CONTENT_PATHNAME = "content/site-content.json";

export type SiteContent = {
  heroImage: string;
  aboutImage: string;
  artistImage: string;
  portfolioItems: PortfolioItem[];
  testimonials: Testimonial[];
  site: SiteSettings;
  about: AboutContent;
  services: ServiceCategory[];
  pricingNotes: string[];
};

const DEFAULT_CONTENT: SiteContent = {
  heroImage: "",
  aboutImage: "",
  artistImage: "",
  portfolioItems: seedPortfolioItems,
  testimonials: seedTestimonials,
  site: defaultSiteSettings,
  about: defaultAboutContent,
  services: seedServiceCategories,
  pricingNotes: seedPricingNotes,
};

// Falls back to the bundled placeholder content until a Blob store is
// connected and/or nothing has been saved through /admin yet.
// Wrapped in React's cache() so multiple reads within one request (layout +
// page + generateMetadata) only hit Blob once.
export const getContent = cache(async (): Promise<SiteContent> => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return DEFAULT_CONTENT;

  try {
    const blob = await head(CONTENT_PATHNAME);
    const res = await fetch(blob.url, { cache: "no-store" });
    if (!res.ok) return DEFAULT_CONTENT;
    const data = (await res.json()) as Partial<SiteContent>;
    return {
      ...DEFAULT_CONTENT,
      ...data,
      site: { ...DEFAULT_CONTENT.site, ...data.site },
      about: { ...DEFAULT_CONTENT.about, ...data.about },
    };
  } catch {
    return DEFAULT_CONTENT;
  }
});

export async function saveContent(content: SiteContent) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      "Image storage isn't set up yet. Connect a Vercel Blob store to this project first."
    );
  }
  await put(CONTENT_PATHNAME, JSON.stringify(content), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}
