import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://facesbysakshi.example.com"),
  title: {
    default: `${siteConfig.businessName} | Makeup Artist in ${siteConfig.city}`,
    template: `%s | ${siteConfig.businessName}`,
  },
  description: `${siteConfig.tagline}. Premium bridal, engagement & party makeup by ${siteConfig.artistName}, serving ${siteConfig.city} and Delhi NCR.`,
  keywords: [
    "makeup artist Noida",
    "bridal makeup artist Delhi NCR",
    "makeup artist Delhi NCR",
    "engagement makeup Noida",
    "party makeup artist Noida",
    siteConfig.businessName,
  ],
  openGraph: {
    title: `${siteConfig.businessName} | Makeup Artist in ${siteConfig.city}`,
    description: siteConfig.tagline,
    siteName: siteConfig.businessName,
    locale: "en_IN",
    type: "website",
  },
};

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
