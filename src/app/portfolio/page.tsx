import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import PortfolioGallery from "@/components/PortfolioGallery";
import { portfolioCategories, portfolioItems } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Portfolio | Bridal & Party Makeup Looks in Noida",
  description:
    "Browse bridal, engagement, party, editorial and bridesmaid makeup looks by Faces by Sakshi, a makeup artist based in Noida, Delhi NCR.",
};

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionHeading
        eyebrow="Portfolio"
        title="Every Look Tells a Story"
        subtitle="Filter by category to explore bridal, party, engagement, editorial, bridesmaid & occasional looks."
      />
      <div className="mt-12">
        <PortfolioGallery items={portfolioItems} categories={portfolioCategories} filterable />
      </div>
    </div>
  );
}
