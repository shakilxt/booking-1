import { images } from "@/lib/images";

export const stats = [
  { value: "22", label: "hectares of coral island" },
  { value: "9", label: "private villas & suites" },
  { value: "35", label: "minutes by seaplane" },
  { value: "1:4", label: "guest to host ratio" },
];

export const amenities = [
  { icon: "Waves", title: "House reef", body: "Snorkel with turtles and reef sharks a few fin-kicks from your villa." },
  { icon: "Sparkles", title: "Overwater spa", body: "Six treatment pavilions with glass floors above the lagoon." },
  { icon: "UtensilsCrossed", title: "Three restaurants", body: "Reef-to-table seafood, Maldivian home cooking and a wine cellar." },
  { icon: "Sailboat", title: "Sunset dhoni", body: "Traditional sailing boat for dolphin cruises and sandbank picnics." },
  { icon: "Dumbbell", title: "Wellness pavilion", body: "Open-air gym, sunrise yoga and a 25-metre lap pool." },
  { icon: "Plane", title: "Seaplane transfer", body: "Met on arrival at Velana airport and flown over the atolls." },
  { icon: "Baby", title: "Little Fish Club", body: "Marine-biology adventures for kids aged 4–12." },
  { icon: "Wifi", title: "Island-wide Wi-Fi", body: "Fast fibre everywhere — even on the sandbank, if you must." },
] as const;

export const experiences = [
  {
    slug: "spa",
    eyebrow: "Spa & wellness",
    title: "The Lagoon Spa",
    body: "Rituals rooted in Dhivehi tradition — coconut, pandanus and sea salt — in pavilions suspended above the water.",
    image: images.spa,
  },
  {
    slug: "dining",
    eyebrow: "Dining",
    title: "Reef-to-table",
    body: "Line-caught fish grilled over coconut husk, a sommelier-led cellar and private dinners on a floodlit sandbank.",
    image: images.diningTerrace,
  },
  {
    slug: "activities",
    eyebrow: "Ocean",
    title: "Into the blue",
    body: "Manta season at Hanifaru Bay, guided dives, surf breaks and sunrise paddleboarding across a mirror-flat lagoon.",
    image: images.diving,
  },
];

export const gallery = [
  { ...images.hero, span: "tall" },
  { ...images.infinityPool, span: "wide" },
  images.spaStones,
  images.diningRoom,
  { ...images.beachLoungers, span: "tall" },
  images.poolNight,
  images.breakfast,
  { ...images.surf, span: "wide" },
] as const;

export const testimonials = [
  {
    quote:
      "We've stayed across the Maldives and nothing compares to waking up in the Overwater Pool Villa. The team remembered every small detail — down to our coffee orders.",
    name: "Amelia & James Carter",
    location: "London, UK",
    stay: "Overwater Pool Villa · March 2026",
    rating: 5,
  },
  {
    quote:
      "Our kids still talk about the Little Fish Club and the night the bioluminescent plankton lit up the beach. A truly magical family trip.",
    name: "Farhana Rahman",
    location: "Dhaka, Bangladesh",
    stay: "Family Beach Villa · December 2025",
    rating: 5,
  },
  {
    quote:
      "The Azure Sanctuary is in a league of its own. Private chef, sunset dhoni, mantas at Hanifaru — the best ten days of our lives.",
    name: "Kenji Watanabe",
    location: "Tokyo, Japan",
    stay: "The Azure Sanctuary · July 2026",
    rating: 5,
  },
  {
    quote:
      "Impeccable without being stiff. Barefoot luxury done right — and the spa's coconut ritual is worth the trip alone.",
    name: "Sofia Moretti",
    location: "Milan, Italy",
    stay: "Sunset Pool Villa · February 2026",
    rating: 5,
  },
];

export const faqs = [
  {
    q: "How do I get to Azure Lagoon?",
    a: "Our team meets you at Velana International Airport (MLE) in Malé and escorts you to a scenic 35-minute seaplane flight to Nalhoara Island. Seaplanes operate during daylight; late arrivals stay overnight in Malé as our guests.",
  },
  {
    q: "What are check-in and check-out times?",
    a: "Check-in is from 2:00 pm and check-out is until 11:00 am. Your villa host will happily arrange early arrival or late departure, subject to availability.",
  },
  {
    q: "Which meal plans are available?",
    a: "Every stay can be booked room-only, with daily breakfast, or on our Lagoon Inclusive plan covering all meals, house wines and one spa treatment per guest. Add breakfast during booking or upgrade on arrival.",
  },
  {
    q: "When is the best time to visit?",
    a: "December to April brings dry, sunny days and calm seas. June to October is manta season in Baa Atoll, with lush scenery and our best seasonal rates.",
  },
  {
    q: "Is the resort suitable for children?",
    a: "Absolutely. Children of all ages are welcome in our beach and pool villas, and the Little Fish Club runs daily marine-biology adventures for ages 4–12.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Cancel free of charge up to 30 days before arrival. Within 30 days, the first night is charged. Peak-season (20 Dec – 10 Jan) bookings are non-refundable within 45 days.",
  },
];
