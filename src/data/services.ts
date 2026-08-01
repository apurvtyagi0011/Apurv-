// Services & pricing. Add, remove, or edit packages here — the Services page
// and the Home page both read from this file automatically.
export type ServiceItem = {
  name: string;
  price: string;
  description?: string;
  popular?: boolean;
};

export type ServiceCategory = {
  id: string;
  title: string;
  items: ServiceItem[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "bridal",
    title: "Bridal Makeup",
    items: [
      {
        name: "Bridal Makeup",
        price: "₹9,999",
        description:
          "HD/airbrush finish, false lashes, draping assistance & touch-up kit for your big day.",
        popular: true,
      },
      {
        name: "Engagement Makeup",
        price: "₹5,599",
        description: "Soft glam or radiant look tailored to your outfit.",
      },
    ],
  },
  {
    id: "party",
    title: "Party & Occasion Makeup",
    items: [
      {
        name: "Party Makeup",
        price: "₹3,000",
        description: "Perfect for sangeet, cocktail nights & festive events.",
      },
      {
        name: "Bridesmaid Makeup",
        price: "₹[Add Price]",
        description: "PLACEHOLDER — add your bridesmaid package pricing.",
      },
      {
        name: "Editorial / Photoshoot Makeup",
        price: "₹[Add Price]",
        description: "PLACEHOLDER — add your editorial/photoshoot pricing.",
      },
    ],
  },
  {
    id: "addons",
    title: "Add-ons",
    items: [
      { name: "Saree Draping", price: "₹1,000" },
      { name: "Hair Styling", price: "₹1,500" },
    ],
  },
];

export const pricingNotes = [
  "Travel charges apply beyond Noida city limits and are calculated based on distance — please ask for an exact quote.",
  "A 50% advance deposit is required to confirm your booking date; the balance is due on the day of the event.",
  "Trials are available on request for bridal packages — ask while booking.",
];
