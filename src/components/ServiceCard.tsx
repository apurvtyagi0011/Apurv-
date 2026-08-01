import Link from "next/link";
import type { ServiceItem } from "@/data/services";

export default function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <div
      className={`relative flex flex-col justify-between gap-6 rounded-2xl border p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-black/5 sm:flex-row sm:items-center ${
        item.popular ? "border-gold bg-blush/30" : "border-black/10 bg-white"
      }`}
    >
      {item.popular && (
        <span className="absolute -top-3 left-6 rounded-full bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-black">
          Most Booked
        </span>
      )}
      <div>
        <h3 className="font-serif text-lg text-black sm:text-xl">{item.name}</h3>
        {item.description && (
          <p className="mt-1.5 max-w-md text-sm leading-relaxed text-charcoal/65">
            {item.description}
          </p>
        )}
      </div>
      <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end sm:gap-3">
        <span className="font-serif text-2xl text-gold">{item.price}</span>
        <Link
          href={`/booking?package=${encodeURIComponent(item.name)}`}
          className="whitespace-nowrap rounded-full border border-black px-5 py-2 text-xs font-medium uppercase tracking-wide text-black transition-colors hover:bg-black hover:text-ivory"
        >
          Book This Package
        </Link>
      </div>
    </div>
  );
}
