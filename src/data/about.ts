// Default About page text, used until an admin edits these via /admin.
export type AboutContent = {
  bioParagraph1: string;
  bioParagraph2: string;
  artistIntro1: string;
  artistIntro2: string;
  signatureStyles: string[];
  premiumBrands: string[];
};

export const defaultAboutContent: AboutContent = {
  bioParagraph1:
    "Every bride deserves to feel confident, beautiful, and truly herself on her special day. At Faces by Sakshi, makeup is more than just enhancing features—it's about bringing your unique story to life.",
  bioParagraph2:
    "Founded in 2025, Faces by Sakshi is a premium freelance bridal makeup service based in Noida, offering personalized makeup experiences for brides across Delhi NCR and destination weddings. Whether it's your Roka, Engagement, Mehendi, Haldi, Wedding, Reception, or any special celebration, Sakshi travels to your venue to create a flawless look that reflects your personality and style.",
  artistIntro1:
    "I'm a professionally trained makeup artist certified by the Academy of Freelance Makeup, Dubai. I chose makeup as my profession because I truly believe that every face tells a story—and I love being a part of that story. Nothing brings me more joy than seeing a bride smile with confidence when she looks in the mirror for the first time.",
  artistIntro2:
    "My goal is never to change who you are but to enhance your natural beauty and make you feel like the most beautiful version of yourself.",
  signatureStyles: [
    "Soft Glam",
    "Minimal & Elegant Makeup",
    "Smokey Eye Looks",
    "Natural Radiant Bridal Makeup",
    "Modern Glam Bridal Looks",
  ],
  premiumBrands: [
    "Charlotte Tilbury",
    "MAC Cosmetics",
    "Huda Beauty",
    "Too Faced",
    "Forever52",
    "& other professional luxury brands",
  ],
};
