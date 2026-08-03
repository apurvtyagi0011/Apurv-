import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import SmartImage from "@/components/SmartImage";
import Button from "@/components/Button";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About | Meet Your Makeup Artist in Noida",
  description:
    "Meet Sakshi Tyagi, a certified bridal makeup artist based in Noida — trained by the Academy of Freelance Makeup, Dubai, serving Delhi NCR and destination weddings.",
};

export default async function AboutPage() {
  const content = await getContent();
  const { site, about } = content;

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
            <p>{about.bioParagraph1}</p>
            <p>{about.bioParagraph2}</p>
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
              alt={site.artistName}
              label="Artist Photo — Upload your photo here"
              rounded
              className="mx-auto aspect-square w-40 sm:w-52 md:mx-0"
            />
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                Meet the Artist
              </span>
              <h2 className="mt-3 font-serif text-3xl text-black sm:text-4xl">
                Hi, I&rsquo;m {site.artistName}
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-charcoal/75">
                <p>{about.artistIntro1}</p>
                <p>{about.artistIntro2}</p>
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
          {about.signatureStyles.map((style) => (
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
            {about.premiumBrands.map((brand) => (
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
