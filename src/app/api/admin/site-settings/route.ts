import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";
import type { SiteSettings } from "@/data/site";

export async function PUT(request: NextRequest) {
  try {
    const body = (await request.json()) as SiteSettings;
    const content = await getContent();
    content.site = body;
    await saveContent(content);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Save failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
