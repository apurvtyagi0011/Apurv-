"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-full border border-black/20 px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors hover:bg-black hover:text-ivory"
    >
      Log Out
    </button>
  );
}
