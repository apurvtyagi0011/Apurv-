import { getContent } from "@/lib/content";
import { portfolioCategories } from "@/data/portfolio";
import SingleImageUploader from "@/components/admin/SingleImageUploader";
import PortfolioManager from "@/components/admin/PortfolioManager";
import SiteSettingsForm from "@/components/admin/SiteSettingsForm";
import AboutManager from "@/components/admin/AboutManager";
import ServicesManager from "@/components/admin/ServicesManager";
import TestimonialsManager from "@/components/admin/TestimonialsManager";
import LogoutButton from "@/components/admin/LogoutButton";

export const dynamic = "force-dynamic";

const sections = [
  { id: "photos", label: "Photos" },
  { id: "settings", label: "Business Info" },
  { id: "about", label: "About Page" },
  { id: "services", label: "Services & Pricing" },
  { id: "testimonials", label: "Testimonials" },
];

export default async function AdminPage() {
  const content = await getContent();

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-8">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl text-black">Manage Website Content</h1>
        <LogoutButton />
      </div>
      <p className="mt-2 text-sm text-charcoal/60">
        Changes appear on the live site within a few seconds.
      </p>

      <nav className="mt-6 flex flex-wrap gap-2">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="rounded-full border border-black/15 px-4 py-2 text-xs font-medium uppercase tracking-wide text-charcoal/70 transition-colors hover:border-gold hover:text-gold"
          >
            {s.label}
          </a>
        ))}
      </nav>

      <section id="photos" className="mt-10 scroll-mt-6">
        <h2 className="font-serif text-xl text-black">Photos</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-3">
          <SingleImageUploader
            label="Home Hero Photo"
            keyName="heroImage"
            currentUrl={content.heroImage}
          />
          <SingleImageUploader
            label="About Page Photo"
            keyName="aboutImage"
            currentUrl={content.aboutImage}
          />
          <SingleImageUploader
            label="Artist Photo"
            keyName="artistImage"
            currentUrl={content.artistImage}
          />
        </div>
        <div className="mt-5">
          <PortfolioManager items={content.portfolioItems} categories={portfolioCategories} />
        </div>
      </section>

      <section id="settings" className="mt-10 scroll-mt-6">
        <h2 className="font-serif text-xl text-black">Business Info</h2>
        <div className="mt-4">
          <SiteSettingsForm initial={content.site} />
        </div>
      </section>

      <section id="about" className="mt-10 scroll-mt-6">
        <h2 className="font-serif text-xl text-black">About Page</h2>
        <div className="mt-4">
          <AboutManager initial={content.about} />
        </div>
      </section>

      <section id="services" className="mt-10 scroll-mt-6">
        <h2 className="font-serif text-xl text-black">Services & Pricing</h2>
        <div className="mt-4">
          <ServicesManager
            initialCategories={content.services}
            initialPricingNotes={content.pricingNotes}
          />
        </div>
      </section>

      <section id="testimonials" className="mt-10 scroll-mt-6 pb-10">
        <h2 className="font-serif text-xl text-black">Testimonials</h2>
        <div className="mt-4">
          <TestimonialsManager items={content.testimonials} />
        </div>
      </section>
    </div>
  );
}
