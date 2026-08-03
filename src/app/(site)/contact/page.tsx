import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { whatsappHref, phoneHref, buildMapUrls } from "@/data/site";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact | Makeup Artist in Noida",
  description:
    "Get in touch with Faces by Sakshi — makeup artist based in Noida, Uttar Pradesh, serving Delhi NCR. Call, email, or message on WhatsApp.",
};

export default async function ContactPage() {
  const { site } = await getContent();
  const { mapEmbedSrc } = buildMapUrls(site.address);

  const socials = [
    { label: "Instagram", handle: site.instagramHandle, href: site.instagramUrl },
    { label: "Facebook", handle: site.facebookUrl ? "Visit Page" : "[Add Facebook link]", href: site.facebookUrl },
    { label: "YouTube", handle: site.youtubeUrl ? "Visit Channel" : "[Add YouTube link]", href: site.youtubeUrl },
  ];

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionHeading
        eyebrow="Contact"
        title="We'd Love to Hear From You"
        subtitle="Reach out for availability, custom packages, or any questions about your big day."
      />

      <div className="mt-14 grid gap-10 md:grid-cols-2">
        <div className="space-y-8">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Address
            </h3>
            <p className="mt-2 text-charcoal/75">{site.address}</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Phone</h3>
            <a href={phoneHref(site.phoneDigits)} className="mt-2 block text-charcoal/75 hover:text-gold">
              {site.phoneDisplay}
            </a>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Email</h3>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 block text-charcoal/75 hover:text-gold"
            >
              {site.email}
            </a>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Working Hours
            </h3>
            <p className="mt-2 text-charcoal/75">
              {site.workingDays} · {site.workingHours}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Follow & Message
            </h3>
            <div className="mt-3 flex flex-col gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href || "#"}
                  target={s.href ? "_blank" : undefined}
                  rel={s.href ? "noopener noreferrer" : undefined}
                  className={`text-charcoal/75 hover:text-gold ${!s.href ? "cursor-default opacity-60" : ""}`}
                >
                  {s.label}: {s.handle}
                </a>
              ))}
            </div>
            <a
              href={whatsappHref(site.phoneDigits, `Hi ${site.artistName}, I'd like to get in touch.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-black/10">
          <iframe
            src={mapEmbedSrc}
            title={`${site.businessName} location map`}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 420 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
