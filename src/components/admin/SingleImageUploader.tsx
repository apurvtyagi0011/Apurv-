"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  label: string;
  keyName: "heroImage" | "aboutImage" | "artistImage";
  currentUrl: string;
};

export default function SingleImageUploader({ label, keyName, currentUrl }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("key", keyName);

    const res = await fetch("/api/admin/site-image", { method: "POST", body: formData });
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";

    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Upload failed.");
    }
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5">
      <h3 className="font-serif text-lg text-black">{label}</h3>
      <div className="mt-3 aspect-video w-full overflow-hidden rounded-lg bg-blush/30">
        {currentUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={currentUrl} alt={label} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-center text-[11px] uppercase tracking-wide text-charcoal/50">
            No photo yet
          </div>
        )}
      </div>
      <label className="mt-4 inline-block cursor-pointer rounded-full border border-black px-5 py-2 text-xs font-medium uppercase tracking-wide transition-colors hover:bg-black hover:text-ivory">
        {uploading ? "Uploading..." : "Upload New Photo"}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleChange}
          disabled={uploading}
          className="hidden"
        />
      </label>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
