import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent, type SiteContent } from "@/lib/content";
import { uploadImage } from "@/lib/blob";

const ALLOWED_KEYS = ["heroImage", "aboutImage", "artistImage"] as const;
type Key = (typeof ALLOWED_KEYS)[number];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const key = formData.get("key")?.toString();

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "No image provided." }, { status: 400 });
    }
    if (!ALLOWED_KEYS.includes(key as Key)) {
      return NextResponse.json({ error: "Invalid image slot." }, { status: 400 });
    }

    const imageUrl = await uploadImage(file, "site");
    const content = await getContent();
    content[key as Key] = imageUrl;
    await saveContent(content satisfies SiteContent);

    return NextResponse.json({ ok: true, url: imageUrl });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
