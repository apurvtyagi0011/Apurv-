"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SiteSettings } from "@/data/site";

const fields: { key: keyof SiteSettings; label: string; type?: string }[] = [
  { key: "businessName", label: "Business Name" },
  { key: "artistName", label: "Artist Name" },
  { key: "tagline", label: "Tagline" },
  { key: "city", label: "City" },
  { key: "address", label: "Full Address" },
  { key: "phoneDisplay", label: "Phone (display, e.g. +91 72176 66375)" },
  { key: "phoneDigits", label: "Phone (digits only, e.g. 917217666375)" },
  { key: "email", label: "Email", type: "email" },
  { key: "instagramHandle", label: "Instagram Handle" },
  { key: "instagramUrl", label: "Instagram URL" },
  { key: "facebookUrl", label: "Facebook URL (optional)" },
  { key: "youtubeUrl", label: "YouTube URL (optional)" },
  { key: "workingDays", label: "Working Days" },
  { key: "workingHours", label: "Working Hours" },
  { key: "formspreeEndpoint", label: "Formspree Endpoint (booking emails)" },
];

export default function SiteSettingsForm({ initial }: { initial: SiteSettings }) {
  const router = useRouter();
  const [values, setValues] = useState<SiteSettings>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  function updateField<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    setSaved(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);

    const res = await fetch("/api/admin/site-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setSaving(false);

    if (res.ok) {
      setSaved(true);
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Save failed.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-black/10 bg-white p-5">
      <h3 className="font-serif text-lg text-black">Business & Contact Info</h3>
      <p className="mt-1 text-sm text-charcoal/60">
        Shown across the navbar, footer, contact page, and booking confirmations.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <label key={f.key} className="block">
            <span className="text-sm font-medium text-charcoal">{f.label}</span>
            <input
              type={f.type ?? "text"}
              value={values[f.key]}
              onChange={(e) => updateField(f.key, e.target.value)}
              className="form-input mt-1.5"
            />
          </label>
        ))}
      </div>

      <label className="mt-4 block">
        <span className="text-sm font-medium text-charcoal">Short Intro (Home page)</span>
        <textarea
          value={values.shortIntro}
          onChange={(e) => updateField("shortIntro", e.target.value)}
          rows={3}
          className="form-input mt-1.5 resize-none"
        />
      </label>

      <div className="mt-5 flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-black px-6 py-2.5 text-xs font-medium uppercase tracking-wide text-ivory transition-colors hover:bg-charcoal disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
        {saved && <span className="text-sm text-green-700">Saved.</span>}
        {error && <span className="text-sm text-red-600">{error}</span>}
      </div>
    </form>
  );
}
