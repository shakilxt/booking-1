import { images, type ResortImage } from "@/lib/images";

/**
 * Demo room inventory. Mirrors the `rooms` table proposed in docs/ARCHITECTURE.md
 * and will become the Supabase seed in Stage 2.
 */
export type RoomCategory = "suite" | "beach_villa" | "pool_villa" | "overwater_villa";

export const categoryLabels: Record<RoomCategory, string> = {
  suite: "Lagoon Suite",
  beach_villa: "Beach Villa",
  pool_villa: "Pool Villa",
  overwater_villa: "Overwater Villa",
};

export type Room = {
  slug: string;
  name: string;
  category: RoomCategory;
  tagline: string;
  description: string;
  baseRateCents: number;
  weekendRateCents: number | null;
  maxAdults: number;
  maxChildren: number;
  maxGuests: number;
  bedConfig: string;
  sizeSqm: number;
  view: string;
  amenities: string[];
  images: ResortImage[];
  featured?: boolean;
};

export const rooms: Room[] = [
  {
    slug: "azure-sanctuary",
    name: "The Azure Sanctuary",
    category: "overwater_villa",
    tagline: "Our signature two-bedroom villa at the edge of the reef",
    description:
      "Set apart at the end of the jetty, the Sanctuary spans two pavilions linked by a sun deck, a 14-metre infinity pool and a glass-floored lounge above the lagoon. A dedicated host, private chef and sunset dhoni are yours for the stay.",
    baseRateCents: 145000,
    weekendRateCents: 162000,
    maxAdults: 4,
    maxChildren: 2,
    maxGuests: 6,
    bedConfig: "2 King beds + daybed",
    sizeSqm: 410,
    view: "Open ocean",
    amenities: ["Infinity pool", "Glass floor", "Private chef", "Butler", "Steam room", "Sunset deck"],
    images: [images.overwater, images.bedroomLuxe, images.poolView, images.hero],
    featured: true,
  },
  {
    slug: "overwater-pool-villa",
    name: "Overwater Pool Villa",
    category: "overwater_villa",
    tagline: "Steps from bed to lagoon, with a plunge pool in between",
    description:
      "Suspended above the house reef with direct lagoon access, a plunge pool and an outdoor rain shower. Watch reef sharks and rays drift beneath the lounge's glass panels at breakfast.",
    baseRateCents: 98000,
    weekendRateCents: 112000,
    maxAdults: 2,
    maxChildren: 1,
    maxGuests: 3,
    bedConfig: "1 King bed",
    sizeSqm: 165,
    view: "Lagoon & sunset",
    amenities: ["Plunge pool", "Lagoon ladder", "Glass panels", "Outdoor shower", "Espresso bar", "Bose sound"],
    images: [images.hero, images.bedroomOcean, images.poolDeck, images.ocean],
    featured: true,
  },
  {
    slug: "sunrise-water-villa",
    name: "Sunrise Water Villa",
    category: "overwater_villa",
    tagline: "East-facing mornings over a glassy lagoon",
    description:
      "A light-filled villa on the eastern jetty, made for slow mornings. Floor-to-ceiling doors fold away to a deck with a hammock net strung over the water.",
    baseRateCents: 82000,
    weekendRateCents: 94000,
    maxAdults: 2,
    maxChildren: 1,
    maxGuests: 3,
    bedConfig: "1 King bed",
    sizeSqm: 140,
    view: "Sunrise lagoon",
    amenities: ["Hammock net", "Lagoon ladder", "Soaking tub", "Outdoor shower", "Minibar", "Yoga mat"],
    images: [images.overwater, images.bedroomCoastal, images.ocean, images.shoreline],
  },
  {
    slug: "reef-pool-villa",
    name: "Reef Pool Villa",
    category: "pool_villa",
    tagline: "A walled garden, a private pool and the beach beyond",
    description:
      "Tucked behind sea grape and frangipani, with a 10-metre pool, a shaded sala and a sandy path to a quiet stretch of beach. Ideal for families, with a second bedroom for little ones.",
    baseRateCents: 76000,
    weekendRateCents: 86000,
    maxAdults: 3,
    maxChildren: 2,
    maxGuests: 5,
    bedConfig: "1 King + 2 Twin beds",
    sizeSqm: 240,
    view: "Garden & beach",
    amenities: ["Private pool", "Outdoor sala", "Kids' room", "Bathtub", "Bicycles", "Kitchenette"],
    images: [images.villaPool, images.bedroomVilla, images.palmPool, images.resortGarden],
    featured: true,
  },
  {
    slug: "sunset-pool-villa",
    name: "Sunset Pool Villa",
    category: "pool_villa",
    tagline: "Golden-hour views from your own infinity edge",
    description:
      "Facing west across the atoll, this villa's infinity pool seems to pour into the sea. Evenings come with a complimentary sundowner set up on your deck.",
    baseRateCents: 84000,
    weekendRateCents: 96000,
    maxAdults: 2,
    maxChildren: 2,
    maxGuests: 4,
    bedConfig: "1 King bed + sofa bed",
    sizeSqm: 210,
    view: "Sunset ocean",
    amenities: ["Infinity pool", "Sundowner service", "Outdoor bath", "Daybed", "Wine fridge", "Bicycles"],
    images: [images.infinityPool, images.bedroomLuxe, images.poolNight, images.beach],
  },
  {
    slug: "beachfront-villa",
    name: "Beachfront Villa",
    category: "beach_villa",
    tagline: "Fall asleep to the surf, wake with sand underfoot",
    description:
      "Thatched-roof villa opening straight onto the beach, with a shaded terrace, an open-air bathroom in a coral-stone courtyard and your own loungers at the waterline.",
    baseRateCents: 62000,
    weekendRateCents: 70000,
    maxAdults: 2,
    maxChildren: 1,
    maxGuests: 3,
    bedConfig: "1 King bed",
    sizeSqm: 130,
    view: "Beach",
    amenities: ["Beach access", "Open-air bathroom", "Terrace", "Loungers", "Snorkel kit", "Nespresso"],
    images: [images.beachLoungers, images.bedroomCoastal, images.beach, images.shoreline],
  },
  {
    slug: "family-beach-villa",
    name: "Family Beach Villa",
    category: "beach_villa",
    tagline: "Two bedrooms, one beach, endless sandcastles",
    description:
      "A generous beach villa with two en-suite bedrooms, a shaded lounge and a garden lawn. Kids' club drop-off is a two-minute buggy ride away.",
    baseRateCents: 74000,
    weekendRateCents: 84000,
    maxAdults: 4,
    maxChildren: 2,
    maxGuests: 6,
    bedConfig: "1 King + 2 Twin beds",
    sizeSqm: 220,
    view: "Beach & garden",
    amenities: ["Two bathrooms", "Garden lawn", "Kids' amenities", "Beach access", "Game console", "Bicycles"],
    images: [images.beach, images.bedroomGarden, images.resortGarden, images.beachLoungers],
  },
  {
    slug: "lagoon-suite",
    name: "Lagoon Suite",
    category: "suite",
    tagline: "Treetop calm with views over the lagoon",
    description:
      "Elevated among the palms on the island's quiet side, with a wraparound balcony, a deep soaking tub and a short stroll to the main pool and restaurants.",
    baseRateCents: 42000,
    weekendRateCents: 48000,
    maxAdults: 2,
    maxChildren: 0,
    maxGuests: 2,
    bedConfig: "1 King bed",
    sizeSqm: 85,
    view: "Lagoon",
    amenities: ["Balcony", "Soaking tub", "Rain shower", "Minibar", "Smart TV", "Yoga mat"],
    images: [images.bedroomSuite, images.resortView, images.palmPool, images.ocean],
  },
  {
    slug: "garden-suite",
    name: "Garden Suite",
    category: "suite",
    tagline: "A calm retreat wrapped in tropical greenery",
    description:
      "Our most intimate suite, opening onto a private garden terrace with an outdoor shower. Moments from the spa and the main pool.",
    baseRateCents: 38000,
    weekendRateCents: 44000,
    maxAdults: 2,
    maxChildren: 1,
    maxGuests: 3,
    bedConfig: "1 King bed or 2 Twin beds",
    sizeSqm: 72,
    view: "Garden",
    amenities: ["Garden terrace", "Outdoor shower", "Minibar", "Smart TV", "Nespresso", "Bicycles"],
    images: [images.bedroomGarden, images.resortGarden, images.spaStones, images.poolDeck],
  },
];

export const featuredRooms = rooms.filter((r) => r.featured);
