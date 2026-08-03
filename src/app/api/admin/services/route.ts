import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";
import type { ServiceCategory } from "@/data/services";

export async function PUT(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      categories: ServiceCategory[];
      pricingNotes: string[];
    };
    const content = await getContent();
    content.services = body.categories;
    content.pricingNotes = body.pricingNotes;
    await saveContent(content);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Save failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
