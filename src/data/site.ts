// Core business info. Edit these values any time — no other code changes needed.
export const siteConfig = {
  businessName: "Faces by Sakshi",
  artistName: "Sakshi Tyagi",
  tagline: "Bridal & Party Makeup Artist in Delhi NCR",
  shortIntro:
    "Founded in 2025, Faces by Sakshi is a premium freelance bridal makeup service based in Noida, offering personalized makeup experiences for brides across Delhi NCR and destination weddings.",
  city: "Noida",
  region: "Uttar Pradesh",
  country: "India",
  address: "N Block, Vivek Vihar, Sector 82, Noida, Uttar Pradesh 201304",
  mapEmbedSrc:
    "https://www.google.com/maps?q=N+Block,+Vivek+Vihar,+Sector+82,+Noida,+Uttar+Pradesh+201304&output=embed",
  mapLinkHref:
    "https://maps.google.com/?q=N+Block,+Vivek+Vihar,+Sector+82,+Noida,+Uttar+Pradesh+201304",
  phoneDisplay: "+91 72176 66375",
  phoneHref: "tel:+917217666375",
  whatsappNumber: "917217666375", // country code + number, no plus/spaces (for wa.me links)
  email: "sakshityagi1422@gmail.com",
  instagramHandle: "@facesbysakshi_",
  instagramUrl: "https://instagram.com/facesbysakshi_",
  // PLACEHOLDER: add real links if/when these are live.
  facebookUrl: "",
  youtubeUrl: "",
  workingHours: "10:00 AM – 10:00 PM",
  workingDays: "Open all days",
  // Used by Formspree (see src/data and README for setup). Replace with your form ID.
  formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
};

export function whatsappHref(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
