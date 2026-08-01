// Portfolio images. To add a real photo:
//   1. Drop the image file into /public/images/portfolio/
//   2. Set `image` below to that path, e.g. "/images/portfolio/bridal-1.jpg"
//   3. Set `featured: true` to also show it on the Home page (pick 4-6 total).
// Leave `image` as an empty string to keep the placeholder tile until you have a photo.
export type PortfolioCategory =
  | "Bridal"
  | "Party"
  | "Engagement"
  | "Editorial/Photoshoot"
  | "Bridesmaid"
  | "Occasional";

export type PortfolioItem = {
  id: string;
  category: PortfolioCategory;
  title: string;
  image: string;
  alt: string;
  featured?: boolean;
};

export const portfolioCategories: PortfolioCategory[] = [
  "Bridal",
  "Party",
  "Engagement",
  "Editorial/Photoshoot",
  "Bridesmaid",
  "Occasional",
];

export const portfolioItems: PortfolioItem[] = [
  { id: "bridal-1", category: "Bridal", title: "Bridal Look", image: "", alt: "Bridal makeup look by Faces by Sakshi", featured: true },
  { id: "bridal-2", category: "Bridal", title: "Bridal Look", image: "", alt: "Bridal makeup look by Faces by Sakshi", featured: true },
  { id: "bridal-3", category: "Bridal", title: "Bridal Look", image: "", alt: "Bridal makeup look by Faces by Sakshi" },
  { id: "engagement-1", category: "Engagement", title: "Engagement Look", image: "", alt: "Engagement makeup look by Faces by Sakshi", featured: true },
  { id: "engagement-2", category: "Engagement", title: "Engagement Look", image: "", alt: "Engagement makeup look by Faces by Sakshi" },
  { id: "party-1", category: "Party", title: "Party Look", image: "", alt: "Party makeup look by Faces by Sakshi", featured: true },
  { id: "party-2", category: "Party", title: "Party Look", image: "", alt: "Party makeup look by Faces by Sakshi" },
  { id: "editorial-1", category: "Editorial/Photoshoot", title: "Editorial Look", image: "", alt: "Editorial makeup look by Faces by Sakshi", featured: true },
  { id: "editorial-2", category: "Editorial/Photoshoot", title: "Editorial Look", image: "", alt: "Editorial photoshoot makeup by Faces by Sakshi" },
  { id: "bridesmaid-1", category: "Bridesmaid", title: "Bridesmaid Look", image: "", alt: "Bridesmaid makeup look by Faces by Sakshi", featured: true },
  { id: "bridesmaid-2", category: "Bridesmaid", title: "Bridesmaid Look", image: "", alt: "Bridesmaid makeup look by Faces by Sakshi" },
  { id: "occasional-1", category: "Occasional", title: "Occasional Look", image: "", alt: "Occasion makeup look by Faces by Sakshi" },
  { id: "occasional-2", category: "Occasional", title: "Occasional Look", image: "", alt: "Occasion makeup look by Faces by Sakshi" },
];
