import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-ivory">
      <div className="border-b border-black/10 px-5 py-4 sm:px-8">
        <span className="font-serif text-lg text-black">Faces by Sakshi — Admin</span>
      </div>
      {children}
    </div>
  );
}
