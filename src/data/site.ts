// Default business info, used until an admin edits these via /admin.
// Editable live at runtime after that — see src/lib/content.ts.
export type SiteSettings = {
  businessName: string;
  artistName: string;
  tagline: string;
  shortIntro: string;
  city: string;
  address: string;
  phoneDisplay: string;
  phoneDigits: string; // country code + number, no plus/spaces (for tel: and wa.me links)
  email: string;
  instagramHandle: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  workingHours: string;
  workingDays: string;
  // Used by the booking form (Formspree). See README for setup.
  formspreeEndpoint: string;
};

export const defaultSiteSettings: SiteSettings = {
  businessName: "Faces by Sakshi",
  artistName: "Sakshi Tyagi",
  tagline: "Bridal & Party Makeup Artist in Delhi NCR",
  shortIntro:
    "Founded in 2025, Faces by Sakshi is a premium freelance bridal makeup service based in Noida, offering personalized makeup experiences for brides across Delhi NCR and destination weddings.",
  city: "Noida",
  address: "N Block, Vivek Vihar, Sector 82, Noida, Uttar Pradesh 201304",
  phoneDisplay: "+91 72176 66375",
  phoneDigits: "917217666375",
  email: "sakshityagi1422@gmail.com",
  instagramHandle: "@facesbysakshi_",
  instagramUrl: "https://instagram.com/facesbysakshi_",
  facebookUrl: "",
  youtubeUrl: "",
  workingHours: "10:00 AM – 10:00 PM",
  workingDays: "Open all days",
  formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
};

export function whatsappHref(phoneDigits: string, message?: string) {
  const base = `https://wa.me/${phoneDigits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function phoneHref(phoneDigits: string) {
  return `tel:+${phoneDigits}`;
}

export function buildMapUrls(address: string) {
  const q = encodeURIComponent(address);
  return {
    mapEmbedSrc: `https://www.google.com/maps?q=${q}&output=embed`,
    mapLinkHref: `https://maps.google.com/?q=${q}`,
  };
}
