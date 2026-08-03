"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ServiceCategory, ServiceItem } from "@/data/services";

type Props = {
  initialCategories: ServiceCategory[];
  initialPricingNotes: string[];
};

export default function ServicesManager({ initialCategories, initialPricingNotes }: Props) {
  const router = useRouter();
  const [categories, setCategories] = useState<ServiceCategory[]>(initialCategories);
  const [notesText, setNotesText] = useState(initialPricingNotes.join("\n"));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  function touch() {
    setSaved(false);
  }

  function updateCategoryTitle(catIndex: number, title: string) {
    touch();
    setCategories((cats) =>
      cats.map((c, i) => (i === catIndex ? { ...c, title } : c))
    );
  }

  function updateItem(catIndex: number, itemIndex: number, patch: Partial<ServiceItem>) {
    touch();
    setCategories((cats) =>
      cats.map((c, i) =>
        i === catIndex
          ? { ...c, items: c.items.map((it, j) => (j === itemIndex ? { ...it, ...patch } : it)) }
          : c
      )
    );
  }

  function addItem(catIndex: number) {
    touch();
    setCategories((cats) =>
      cats.map((c, i) =>
        i === catIndex
          ? { ...c, items: [...c.items, { name: "New Package", price: "₹[Add Price]" }] }
          : c
      )
    );
  }

  function removeItem(catIndex: number, itemIndex: number) {
    touch();
    setCategories((cats) =>
      cats.map((c, i) =>
        i === catIndex ? { ...c, items: c.items.filter((_, j) => j !== itemIndex) } : c
      )
    );
  }

  function addCategory() {
    touch();
    setCategories((cats) => [
      ...cats,
      { id: `category-${Date.now()}`, title: "New Category", items: [] },
    ]);
  }

  function removeCategory(catIndex: number) {
    touch();
    setCategories((cats) => cats.filter((_, i) => i !== catIndex));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);

    const pricingNotes = notesText
      .split("\n")
      .map((n) => n.trim())
      .filter(Boolean);

    const res = await fetch("/api/admin/services", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categories, pricingNotes }),
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
      <h3 className="font-serif text-lg text-black">Services & Pricing</h3>
      <p className="mt-1 text-sm text-charcoal/60">
        Edit packages, prices, and the notes shown at the bottom of the Services page.
      </p>

      <div className="mt-5 space-y-6">
        {categories.map((category, catIndex) => (
          <div key={category.id} className="rounded-xl border border-black/10 p-4">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={category.title}
                onChange={(e) => updateCategoryTitle(catIndex, e.target.value)}
                className="form-input flex-1 font-serif text-base"
                placeholder="Category title"
              />
              <button
                type="button"
                onClick={() => removeCategory(catIndex)}
                className="shrink-0 rounded-full border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                Remove Category
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {category.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="grid gap-2 rounded-lg bg-ivory-dark/40 p-3 sm:grid-cols-[1fr_120px_auto]"
                >
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(catIndex, itemIndex, { name: e.target.value })}
                    className="form-input"
                    placeholder="Package name"
                  />
                  <input
                    type="text"
                    value={item.price}
                    onChange={(e) => updateItem(catIndex, itemIndex, { price: e.target.value })}
                    className="form-input"
                    placeholder="₹0"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(catIndex, itemIndex)}
                    className="rounded-full border border-red-300 px-3 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 sm:px-4"
                  >
                    Remove
                  </button>
                  <textarea
                    value={item.description ?? ""}
                    onChange={(e) =>
                      updateItem(catIndex, itemIndex, { description: e.target.value })
                    }
                    rows={2}
                    className="form-input resize-none sm:col-span-3"
                    placeholder="Description (optional)"
                  />
                  <label className="flex items-center gap-2 text-sm text-charcoal/70 sm:col-span-3">
                    <input
                      type="checkbox"
                      checked={item.popular ?? false}
                      onChange={(e) =>
                        updateItem(catIndex, itemIndex, { popular: e.target.checked })
                      }
                      className="h-4 w-4"
                    />
                    Mark as &ldquo;Most Booked&rdquo;
                  </label>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => addItem(catIndex)}
              className="mt-3 rounded-full border border-black/20 px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors hover:bg-black hover:text-ivory"
            >
              + Add Package
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addCategory}
        className="mt-4 rounded-full border border-black px-5 py-2.5 text-xs font-medium uppercase tracking-wide transition-colors hover:bg-black hover:text-ivory"
      >
        + Add Category
      </button>

      <label className="mt-6 block">
        <span className="text-sm font-medium text-charcoal">
          Pricing Notes (one per line)
        </span>
        <textarea
          value={notesText}
          onChange={(e) => {
            setNotesText(e.target.value);
            touch();
          }}
          rows={4}
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
