"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { PortfolioCategory, PortfolioItem } from "@/data/portfolio";

type Props = {
  items: PortfolioItem[];
  categories: PortfolioCategory[];
};

export default function PortfolioManager({ items, categories }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/portfolio", { method: "POST", body: formData });
    setUploading(false);

    if (res.ok) {
      formRef.current?.reset();
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Upload failed.");
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    setError("");
    const res = await fetch(`/api/admin/portfolio/${id}`, { method: "DELETE" });
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
      <h3 className="font-serif text-lg text-black">Portfolio Photos</h3>

      <form ref={formRef} onSubmit={handleAdd} className="mt-4 grid gap-3 sm:grid-cols-2">
        <input
          type="file"
          name="file"
          accept="image/jpeg,image/png,image/webp"
          required
          className="form-input sm:col-span-2"
        />
        <select name="category" required defaultValue="" className="form-input">
          <option value="" disabled>
            Category
          </option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input type="text" name="title" placeholder="Title (optional)" className="form-input" />
        <label className="flex items-center gap-2 text-sm text-charcoal/70 sm:col-span-2">
          <input type="checkbox" name="featured" className="h-4 w-4" />
          Show on homepage
        </label>
        <button
          type="submit"
          disabled={uploading}
          className="rounded-full bg-black px-5 py-2.5 text-xs font-medium uppercase tracking-wide text-ivory transition-colors hover:bg-charcoal disabled:opacity-60 sm:col-span-2"
        >
          {uploading ? "Uploading..." : "Add Photo"}
        </button>
        {error && <p className="text-sm text-red-600 sm:col-span-2">{error}</p>}
      </form>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative aspect-[3/4] overflow-hidden rounded-lg border border-black/10"
          >
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.image} alt={item.alt} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center bg-blush/30 text-center text-[10px] uppercase tracking-wide text-charcoal/50">
                No photo
              </div>
            )}
            <span className="absolute left-1.5 top-1.5 rounded-full bg-black/70 px-2 py-0.5 text-[10px] text-ivory">
              {item.category}
            </span>
            <button
              type="button"
              onClick={() => handleDelete(item.id)}
              disabled={deletingId === item.id}
              aria-label="Delete photo"
              className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-ivory transition-colors hover:bg-red-600 disabled:opacity-60"
            >
              ×
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="col-span-full py-6 text-center text-sm text-charcoal/50">
            No portfolio photos yet — add one above.
          </p>
        )}
      </div>
    </div>
  );
}
