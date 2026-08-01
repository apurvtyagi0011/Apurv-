"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { serviceCategories } from "@/data/services";
import { siteConfig } from "@/data/site";

const eventTypes = [
  "Wedding",
  "Engagement / Roka",
  "Mehendi / Haldi",
  "Reception",
  "Sangeet / Party",
  "Bridesmaid",
  "Editorial / Photoshoot",
  "Other",
];

const locationOptions = [
  "At my venue / home (Sakshi travels to you)",
  "Sakshi's studio, Noida",
];

const packageOptions = serviceCategories.flatMap((category) =>
  category.items.map((item) => `${item.name} — ${item.price}`)
);

type Status = "idle" | "submitting" | "success" | "error";

export default function BookingForm() {
  const searchParams = useSearchParams();
  const prefilledPackage = searchParams.get("package") ?? "";
  const [status, setStatus] = useState<Status>("idle");

  const matchedPackage = prefilledPackage
    ? packageOptions.find((opt) => opt.startsWith(prefilledPackage)) ?? ""
    : "";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Simple honeypot: bots tend to fill every field, humans never see this one.
    if (formData.get("company")) {
      setStatus("success");
      form.reset();
      return;
    }

    try {
      const res = await fetch(siteConfig.formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-gold/30 bg-blush/25 p-8 text-center">
        <h3 className="font-serif text-2xl text-black">Thank you!</h3>
        <p className="mt-3 text-charcoal/75">
          Your booking request has been received. {siteConfig.artistName} will get back to you
          shortly to confirm availability for your date.
        </p>
        <p className="mt-4 text-sm text-charcoal/60">
          For urgent enquiries, call{" "}
          <a href={siteConfig.phoneHref} className="text-gold underline">
            {siteConfig.phoneDisplay}
          </a>{" "}
          or message on WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <input type="hidden" name="_subject" value="New booking enquiry — Faces by Sakshi website" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" required>
          <input
            type="text"
            name="name"
            required
            className="form-input"
            placeholder="Your name"
          />
        </Field>
        <Field label="Phone Number" required>
          <input
            type="tel"
            name="phone"
            required
            className="form-input"
            placeholder="+91 12345 67890"
          />
        </Field>
      </div>

      <Field label="Email" required>
        <input
          type="email"
          name="email"
          required
          className="form-input"
          placeholder="you@example.com"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Event Date" required>
          <input
            type="date"
            name="eventDate"
            required
            min={new Date().toISOString().split("T")[0]}
            suppressHydrationWarning
            className="form-input"
          />
        </Field>
        <Field label="Event Type" required>
          <select name="eventType" required defaultValue="" className="form-input">
            <option value="" disabled>
              Select event type
            </option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Package">
          <select name="package" defaultValue={matchedPackage} className="form-input">
            <option value="">Not sure yet</option>
            {packageOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Location" required>
          <select name="location" required defaultValue="" className="form-input">
            <option value="" disabled>
              Select location
            </option>
            {locationOptions.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message">
        <textarea
          name="message"
          rows={4}
          className="form-input resize-none"
          placeholder="Tell us about your event, venue, and the look you have in mind..."
        />
      </Field>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong sending your request. Please try again, or contact us directly at{" "}
          <a href={`mailto:${siteConfig.email}`} className="underline">
            {siteConfig.email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-black px-7 py-3.5 text-sm font-medium uppercase tracking-wide text-ivory transition-colors hover:bg-charcoal disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending..." : "Send Booking Request"}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-charcoal">
        {label} {required && <span className="text-gold">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
