import { NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const content = await getContent();
    content.portfolioItems = content.portfolioItems.filter((item) => item.id !== id);
    await saveContent(content);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Delete failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
