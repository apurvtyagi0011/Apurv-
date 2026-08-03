import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";
import type { AboutContent } from "@/data/about";

export async function PUT(request: NextRequest) {
  try {
    const body = (await request.json()) as AboutContent;
    const content = await getContent();
    content.about = body;
    await saveContent(content);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Save failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
