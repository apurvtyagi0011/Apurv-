import { put } from "@vercel/blob";

const MAX_SIZE = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function uploadImage(file: File, folder: string): Promise<string> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      "Image storage isn't set up yet. Connect a Vercel Blob store to this project first."
    );
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Only JPG, PNG, or WEBP images are allowed.");
  }
  if (file.size > MAX_SIZE) {
    throw new Error("Image must be smaller than 8MB.");
  }

  const ext = file.type.split("/")[1];
  const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const blob = await put(filename, file, {
    access: "public",
    contentType: file.type,
  });
  return blob.url;
}
