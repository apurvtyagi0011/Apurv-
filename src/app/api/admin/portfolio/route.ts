import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";
import { uploadImage } from "@/lib/blob";
import { portfolioCategories, type PortfolioCategory } from "@/data/portfolio";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const category = formData.get("category")?.toString() as PortfolioCategory;
    const title = formData.get("title")?.toString().trim() || category;
    const featured = formData.get("featured") === "on";

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "No image provided." }, { status: 400 });
    }
    if (!portfolioCategories.includes(category)) {
      return NextResponse.json({ error: "Invalid category." }, { status: 400 });
    }

    const imageUrl = await uploadImage(file, "portfolio");
    const content = await getContent();

    const newItem = {
      id: `${category.toLowerCase().replace(/[^a-z]+/g, "-")}-${Date.now()}`,
      category,
      title,
      image: imageUrl,
      alt: `${title} by Faces by Sakshi`,
      featured,
    };
    content.portfolioItems = [newItem, ...content.portfolioItems];
    await saveContent(content);

    return NextResponse.json({ ok: true, item: newItem });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
