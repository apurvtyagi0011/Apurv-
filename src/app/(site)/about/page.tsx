import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import SmartImage from "@/components/SmartImage";
import Button from "@/components/Button";
import { siteConfig } from "@/data/site";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About | Meet Your Makeup Artist in Noida",
  description:
    "Meet Sakshi Tyagi, a certified bridal makeup artist based in Noida — trained by the Academy of Freelance Makeup, Dubai, serving Delhi NCR and destination weddings.",
};

const signatureStyles = [
  "Soft Glam",
  "Minimal & Elegant Makeup",
  "Smokey Eye Looks",
  "Natural Radiant Bridal Makeup",
  "Modern Glam Bridal Looks",
];

const premiumBrands = [
  "Charlotte Tilbury",
  "MAC Cosmetics",
  "Huda Beauty",
  "Too Faced",
  "Forever52",
  "& other professional luxury brands",
];

export default async function AboutPage() {
  const content = await getContent();

  return (
    <div>
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionHeading
          eyebrow="About Us"
          title="Every Bride Deserves to Feel Beautiful"
          align="left"
          className="mx-0"
        />
        <div className="mt-8 grid gap-10 md:grid-cols-2 md:items-start">
          <div className="space-y-4 text-base leading-relaxed text-charcoal/75">
            <p>
              Every bride deserves to feel confident, beautiful, and truly herself on her
              special day. At {siteConfig.businessName}, makeup is more than just enhancing
              features—it&rsquo;s about bringing your unique story to life.
            </p>
            <p>
              Founded in 2025, {siteConfig.businessName} is a premium freelance bridal makeup
              service based in {siteConfig.city}, offering personalized makeup experiences for
              brides across Delhi NCR and destination weddings. Whether it&rsquo;s your Roka,
              Engagement, Mehendi, Haldi, Wedding, Reception, or any special celebration,
              Sakshi travels to your venue to create a flawless look that reflects your
              personality and style.
            </p>
          </div>
          <SmartImage
            src={content.aboutImage}
            alt="Bridal makeup by Faces by Sakshi"
            label="About Photo — Add a signature look here"
            className="aspect-[4/5] w-full rounded-2xl"
          />
        </div>
      </section>

      <section className="bg-blush/25 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="grid gap-10 md:grid-cols-[minmax(0,220px)_1fr] md:items-start">
            <SmartImage
              src={content.artistImage}
              alt={siteConfig.artistName}
              label="Artist Photo — Upload your photo here"
              rounded
              className="mx-auto aspect-square w-40 sm:w-52 md:mx-0"
            />
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                Meet the Artist
              </span>
              <h2 className="mt-3 font-serif text-3xl text-black sm:text-4xl">
                Hi, I&rsquo;m {siteConfig.artistName}
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-charcoal/75">
                <p>
                  I&rsquo;m a professionally trained makeup artist certified by the Academy of
                  Freelance Makeup, Dubai. I chose makeup as my profession because I truly
                  believe that every face tells a story—and I love being a part of that story.
                  Nothing brings me more joy than seeing a bride smile with confidence when she
                  looks in the mirror for the first time.
                </p>
                <p>
                  My goal is never to change who you are but to enhance your natural beauty and
                  make you feel like the most beautiful version of yourself.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionHeading
          eyebrow="Signature Style"
          title="A Look Customised Just for You"
          subtitle="Every bride is unique, which is why every look is customised to suit her personality, outfit, skin tone, and wedding theme."
        />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {signatureStyles.map((style) => (
            <span
              key={style}
              className="rounded-full border border-gold/40 bg-blush/30 px-5 py-2.5 text-sm font-medium text-charcoal"
            >
              {style}
            </span>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-charcoal/65">
          From timeless elegance to bold glamour, I work closely with every bride to create a
          look she&rsquo;ll cherish forever because it is one of the biggest memories of your
          life. The risk of getting it wrong is high, which is why every look is tailored
          carefully — for a low-risk, lifetime of beautiful memories.
        </p>
      </section>

      <section className="bg-black py-16 text-ivory sm:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <SectionHeading
            eyebrow="Premium Products"
            title="A Flawless Finish, Every Time"
            subtitle="Your skin deserves the best. That's why I use only authentic, high-end international makeup brands known for their quality, longevity, and flawless finish."
            variant="dark"
          />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {premiumBrands.map((brand) => (
              <span
                key={brand}
                className="rounded-full border border-gold-light/40 px-5 py-2.5 text-sm text-ivory/85"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-20">
        <h2 className="font-serif text-3xl text-black sm:text-4xl">
          Let&rsquo;s Create Your Story
        </h2>
        <div className="mt-8">
          <Button href="/booking" variant="primary">
            Book a Consultation
          </Button>
        </div>
      </section>
    </div>
  );
}
