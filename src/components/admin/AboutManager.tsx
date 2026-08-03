"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AboutContent } from "@/data/about";

export default function AboutManager({ initial }: { initial: AboutContent }) {
  const router = useRouter();
  const [bioParagraph1, setBioParagraph1] = useState(initial.bioParagraph1);
  const [bioParagraph2, setBioParagraph2] = useState(initial.bioParagraph2);
  const [artistIntro1, setArtistIntro1] = useState(initial.artistIntro1);
  const [artistIntro2, setArtistIntro2] = useState(initial.artistIntro2);
  const [signatureStyles, setSignatureStyles] = useState(initial.signatureStyles.join(", "));
  const [premiumBrands, setPremiumBrands] = useState(initial.premiumBrands.join(", "));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);

    const body: AboutContent = {
      bioParagraph1,
      bioParagraph2,
      artistIntro1,
      artistIntro2,
      signatureStyles: signatureStyles.split(",").map((s) => s.trim()).filter(Boolean),
      premiumBrands: premiumBrands.split(",").map((s) => s.trim()).filter(Boolean),
    };

    const res = await fetch("/api/admin/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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
      <h3 className="font-serif text-lg text-black">About Page</h3>
      <p className="mt-1 text-sm text-charcoal/60">Bio text, signature styles, and brands.</p>

      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-charcoal">Bio — Paragraph 1</span>
          <textarea
            value={bioParagraph1}
            onChange={(e) => {
              setBioParagraph1(e.target.value);
              setSaved(false);
            }}
            rows={3}
            className="form-input mt-1.5 resize-none"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-charcoal">Bio — Paragraph 2</span>
          <textarea
            value={bioParagraph2}
            onChange={(e) => {
              setBioParagraph2(e.target.value);
              setSaved(false);
            }}
            rows={3}
            className="form-input mt-1.5 resize-none"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-charcoal">
            Meet the Artist — Paragraph 1
          </span>
          <textarea
            value={artistIntro1}
            onChange={(e) => {
              setArtistIntro1(e.target.value);
              setSaved(false);
            }}
            rows={3}
            className="form-input mt-1.5 resize-none"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-charcoal">
            Meet the Artist — Paragraph 2
          </span>
          <textarea
            value={artistIntro2}
            onChange={(e) => {
              setArtistIntro2(e.target.value);
              setSaved(false);
            }}
            rows={2}
            className="form-input mt-1.5 resize-none"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-charcoal">
            Signature Styles (comma-separated)
          </span>
          <input
            type="text"
            value={signatureStyles}
            onChange={(e) => {
              setSignatureStyles(e.target.value);
              setSaved(false);
            }}
            className="form-input mt-1.5"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-charcoal">
            Premium Brands (comma-separated)
          </span>
          <input
            type="text"
            value={premiumBrands}
            onChange={(e) => {
              setPremiumBrands(e.target.value);
              setSaved(false);
            }}
            className="form-input mt-1.5"
          />
        </label>
      </div>

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
