import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";
import { uploadImage } from "@/lib/blob";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get("name")?.toString().trim();
    const event = formData.get("event")?.toString().trim() ?? "";
    const quote = formData.get("quote")?.toString().trim();
    const file = formData.get("file");

    if (!name || !quote) {
      return NextResponse.json({ error: "Name and quote are required." }, { status: 400 });
    }

    let image = "";
    if (file instanceof File && file.size > 0) {
      image = await uploadImage(file, "testimonials");
    }

    const content = await getContent();
    const newTestimonial = {
      id: `testimonial-${Date.now()}`,
      name,
      event,
      quote,
      image,
    };
    content.testimonials = [newTestimonial, ...content.testimonials];
    await saveContent(content);

    return NextResponse.json({ ok: true, testimonial: newTestimonial });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Save failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
