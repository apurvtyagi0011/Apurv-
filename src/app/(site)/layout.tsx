import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { site } = await getContent();

  return (
    <>
      <Navbar businessName={site.businessName} />
      <main className="flex-1">{children}</main>
      <Footer site={site} />
      <WhatsAppButton artistName={site.artistName} phoneDigits={site.phoneDigits} />
    </>
  );
}
