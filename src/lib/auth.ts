export const ADMIN_COOKIE_NAME = "admin_session";

async function sha256Hex(value: string) {
  const data = new TextEncoder().encode(value);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// The session cookie is a hash of the admin password rather than the
// password itself, so it isn't readable if the cookie ever leaks.
export async function getSessionToken(): Promise<string | null> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return sha256Hex(password);
}

export async function isValidSession(cookieValue: string | undefined | null) {
  if (!cookieValue) return false;
  const expected = await getSessionToken();
  return expected !== null && cookieValue === expected;
}
