import { put, head } from "@vercel/blob";
import { portfolioItems as seedPortfolioItems, type PortfolioItem } from "@/data/portfolio";

const CONTENT_PATHNAME = "content/site-content.json";

export type SiteContent = {
  heroImage: string;
  aboutImage: string;
  artistImage: string;
  portfolioItems: PortfolioItem[];
};

const DEFAULT_CONTENT: SiteContent = {
  heroImage: "",
  aboutImage: "",
  artistImage: "",
  portfolioItems: seedPortfolioItems,
};

// Falls back to the bundled placeholder content until a Blob store is
// connected and/or nothing has been uploaded through /admin yet.
export async function getContent(): Promise<SiteContent> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return DEFAULT_CONTENT;

  try {
    const blob = await head(CONTENT_PATHNAME);
    const res = await fetch(blob.url, { cache: "no-store" });
    if (!res.ok) return DEFAULT_CONTENT;
    const data = (await res.json()) as Partial<SiteContent>;
    return { ...DEFAULT_CONTENT, ...data };
  } catch {
    return DEFAULT_CONTENT;
  }
}

export async function saveContent(content: SiteContent) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      "Image storage isn't set up yet. Connect a Vercel Blob store to this project first."
    );
  }
  await put(CONTENT_PATHNAME, JSON.stringify(content), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}
