import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import Button from "@/components/Button";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services & Pricing | Makeup Artist in Noida",
  description:
    "Bridal, engagement and party makeup pricing by Faces by Sakshi — a makeup artist based in Noida serving Delhi NCR. Add-ons include saree draping & hair styling.",
};

export default async function ServicesPage() {
  const { services, pricingNotes } = await getContent();

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionHeading
        eyebrow="Services & Pricing"
        title="Packages Tailored to Your Occasion"
        subtitle="Every package includes a personal consultation to match your outfit, skin tone & event theme."
      />

      <div className="mt-14 space-y-14">
        {services.map((category) => (
          <div key={category.id}>
            <h3 className="font-serif text-2xl text-black">{category.title}</h3>
            <div className="mt-6 space-y-4">
              {category.items.map((item) => (
                <ServiceCard key={item.name} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-2xl border border-gold/30 bg-blush/25 p-6">
        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Good to Know
        </h4>
        <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-charcoal/75">
          {pricingNotes.map((note) => (
            <li key={note} className="flex gap-2.5">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 text-center">
        <Button href="/booking" variant="primary">
          Book Your Date
        </Button>
      </div>
    </div>
  );
}
