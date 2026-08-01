// PLACEHOLDER testimonials — replace with real client quotes & (optional) photos.
// Leave `image` empty to show an initials avatar instead of a photo.
export type Testimonial = {
  id: string;
  name: string;
  event: string;
  quote: string;
  image: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Client Name",
    event: "Bride, Wedding Day",
    quote:
      "PLACEHOLDER TESTIMONIAL — Sakshi made me feel like the most beautiful version of myself. The makeup lasted the entire day without a single touch-up!",
    image: "",
  },
  {
    id: "t2",
    name: "Client Name",
    event: "Bride, Engagement",
    quote:
      "PLACEHOLDER TESTIMONIAL — Professional, punctual, and so talented. She understood exactly the look I wanted and brought it to life perfectly.",
    image: "",
  },
  {
    id: "t3",
    name: "Client Name",
    event: "Guest, Sangeet",
    quote:
      "PLACEHOLDER TESTIMONIAL — Booked her for a party look and got so many compliments all night. Highly recommend Faces by Sakshi!",
    image: "",
  },
];
