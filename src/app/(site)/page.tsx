import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import SmartImage from "@/components/SmartImage";
import PortfolioGallery from "@/components/PortfolioGallery";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Reveal from "@/components/Reveal";
import { whatsappHref } from "@/data/site";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

const trustPoints = [
  {
    title: "Certified Artist",
    description: "Trained & certified by the Academy of Freelance Makeup, Dubai.",
  },
  {
    title: "Premium Products",
    description: "Charlotte Tilbury, MAC, Huda Beauty & other luxury brands only.",
  },
  {
    title: "Personalized Looks",
    description: "Every look is customised to your skin tone, outfit & theme.",
  },
];

export default async function Home() {
  const content = await getContent();
  // Never show seeded placeholder cards on the public homepage. Use photos
  // explicitly marked as featured first; if none were selected during upload,
  // fall back to the newest real portfolio images so uploaded work is visible.
  const uploadedItems = content.portfolioItems.filter((item) => Boolean(item.image));
  const featuredItems = uploadedItems.filter((item) => item.featured);
  const homepageItems = (featuredItems.length > 0 ? featuredItems : uploadedItems).slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blush/50 via-ivory to-ivory">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 md:items-center md:py-24">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              {content.site.businessName}
            </span>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-black sm:text-5xl md:text-6xl">
              {content.site.tagline}
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-charcoal/70">
              {content.site.shortIntro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Button href="/portfolio" variant="primary">
                View Portfolio
              </Button>
              <Button href="/services" variant="outline">
                See Pricing
              </Button>
              <Button href="/booking" variant="secondary">
                Book Now
              </Button>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <SmartImage
              src={content.heroImage}
              alt="Signature bridal makeup look by Faces by Sakshi"
              label="Hero Photo — Add your best bridal look here"
              className="aspect-[4/5] w-full rounded-3xl shadow-xl shadow-black/10"
              priority
            />
          </Reveal>
        </div>

        <div className="border-y border-black/5 bg-white/60">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-10 sm:grid-cols-3 sm:px-8">
            {trustPoints.map((point) => (
              <div key={point.title} className="text-center sm:text-left">
                <h3 className="font-serif text-lg text-black">{point.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-charcoal/65">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Portfolio */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Portfolio"
            title="Recent Work"
            subtitle="A glimpse into looks crafted for brides and clients across Delhi NCR."
          />
        </Reveal>
        {homepageItems.length > 0 ? (
          <>
            <Reveal delay={100} className="mt-12">
              <PortfolioGallery items={homepageItems} />
            </Reveal>
            <div className="mt-10 text-center">
              <Button href="/portfolio" variant="outline">
                View Full Portfolio
              </Button>
            </div>
          </>
        ) : (
          <p className="mt-10 text-center text-sm text-charcoal/55">
            New portfolio looks are coming soon.
          </p>
        )}
      </section>

      {/* Testimonials */}
      <section className="bg-charcoal py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Testimonials"
              title="Kind Words From Clients"
              variant="dark"
            />
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <TestimonialsCarousel testimonials={content.testimonials} variant="dark" />
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
        <Reveal>
          <h2 className="font-serif text-3xl text-black sm:text-4xl">
            Ready to look your best?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-charcoal/70">
            Let&rsquo;s create a look you&rsquo;ll cherish forever. Reach out today to check
            availability for your date.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <Button href="/booking" variant="primary">
              Book Now
            </Button>
            <Button
              href={whatsappHref(
                content.site.phoneDigits,
                `Hi ${content.site.artistName}, I'd like to enquire about your makeup services.`
              )}
              variant="outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
