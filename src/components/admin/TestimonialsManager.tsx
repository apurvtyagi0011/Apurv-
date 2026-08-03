"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Testimonial } from "@/data/testimonials";

export default function TestimonialsManager({ items }: { items: Testimonial[] }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/testimonials", { method: "POST", body: formData });
    setSaving(false);

    if (res.ok) {
      formRef.current?.reset();
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Save failed.");
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    setError("");
    const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    setDeletingId(null);
    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Delete failed.");
    }
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5">
      <h3 className="font-serif text-lg text-black">Testimonials</h3>
      <p className="mt-1 text-sm text-charcoal/60">
        Shown in the Home page carousel. Photo is optional.
      </p>

      <form ref={formRef} onSubmit={handleAdd} className="mt-4 grid gap-3 sm:grid-cols-2">
        <input type="text" name="name" placeholder="Client name" required className="form-input" />
        <input type="text" name="event" placeholder="Event (e.g. Bride, Wedding Day)" className="form-input" />
        <textarea
          name="quote"
          placeholder="Testimonial quote"
          required
          rows={3}
          className="form-input resize-none sm:col-span-2"
        />
        <input
          type="file"
          name="file"
          accept="image/jpeg,image/png,image/webp"
          className="form-input sm:col-span-2"
        />
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-black px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-ivory transition-colors hover:bg-charcoal disabled:opacity-60 sm:col-span-2"
        >
          {saving ? "Saving..." : "Add Testimonial"}
        </button>
        {error && <p className="text-sm text-red-600 sm:col-span-2">{error}</p>}
      </form>

      <div className="mt-6 space-y-3">
        {items.map((t) => (
          <div
            key={t.id}
            className="flex items-start gap-3 rounded-lg border border-black/10 p-3"
          >
            {t.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={t.image} alt={t.name} className="h-12 w-12 shrink-0 rounded-full object-cover" />
            ) : (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blush/40 text-[10px] uppercase text-charcoal/50">
                No photo
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-charcoal">{t.name}</p>
              <p className="text-xs uppercase tracking-wide text-gold">{t.event}</p>
              <p className="mt-1 line-clamp-2 text-sm text-charcoal/70">{t.quote}</p>
            </div>
            <button
              type="button"
              onClick={() => handleDelete(t.id)}
              disabled={deletingId === t.id}
              className="shrink-0 rounded-full border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
            >
              Delete
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="py-4 text-center text-sm text-charcoal/50">No testimonials yet.</p>
        )}
      </div>
    </div>
  );
}
