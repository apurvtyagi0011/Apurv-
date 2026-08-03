import type { Metadata } from "next";
import { Suspense } from "react";
import SectionHeading from "@/components/SectionHeading";
import BookingForm from "@/components/BookingForm";
import { whatsappHref, phoneHref } from "@/data/site";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book Now | Makeup Artist in Noida",
  description:
    "Book your bridal, engagement or party makeup appointment with Faces by Sakshi, a makeup artist serving Noida and Delhi NCR.",
};

export default async function BookingPage() {
  const { site, services } = await getContent();

  return (
    <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionHeading
        eyebrow="Booking"
        title="Let's Lock In Your Date"
        subtitle="Fill in the details below and we'll confirm availability within 24 hours."
      />
      <div className="mt-12 rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
        <Suspense fallback={null}>
          <BookingForm site={site} serviceCategories={services} />
        </Suspense>
      </div>
      <p className="mt-8 text-center text-sm text-charcoal/60">
        Prefer to talk directly? Call{" "}
        <a href={phoneHref(site.phoneDigits)} className="text-gold underline">
          {site.phoneDisplay}
        </a>{" "}
        or{" "}
        <a
          href={whatsappHref(site.phoneDigits, `Hi ${site.artistName}, I'd like to enquire about booking.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold underline"
        >
          message on WhatsApp
        </a>
        .
      </p>
    </div>
  );
}
