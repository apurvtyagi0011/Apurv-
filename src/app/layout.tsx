import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { getContent } from "@/lib/content";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getContent();
  return {
    metadataBase: new URL("https://facesbysakshi.example.com"),
    title: {
      default: `${site.businessName} | Makeup Artist in ${site.city}`,
      template: `%s | ${site.businessName}`,
    },
    description: `${site.tagline}. Premium bridal, engagement & party makeup by ${site.artistName}, serving ${site.city} and Delhi NCR.`,
    keywords: [
      "makeup artist Noida",
      "bridal makeup artist Delhi NCR",
      "makeup artist Delhi NCR",
      "engagement makeup Noida",
      "party makeup artist Noida",
      site.businessName,
    ],
    openGraph: {
      title: `${site.businessName} | Makeup Artist in ${site.city}`,
      description: site.tagline,
      siteName: site.businessName,
      locale: "en_IN",
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">{children}</body>
    </html>
  );
}
