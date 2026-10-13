/**
 * Curated Unsplash photography. Everything image-related goes through here so a
 * photo can be swapped in one place. URLs are rendered through next/image.
 */
export type ResortImage = { src: string; alt: string };

const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop`;

export const images = {
  hero: {
    src: u("1514282401047-d79a71a590e8"),
    alt: "Aerial view of overwater villas over a turquoise Maldivian lagoon",
  },
  overwater: {
    src: u("1573843981267-be1999ff37cd"),
    alt: "Thatched overwater villas on stilts above clear blue water",
  },
  infinityPool: {
    src: u("1520250497591-112f2f40a3f4"),
    alt: "Infinity pool with sun loungers framed by palm trees",
  },
  palmPool: {
    src: u("1540541338287-41700207dee6"),
    alt: "Resort pool surrounded by palms at golden hour",
  },
  poolDeck: {
    src: u("1571896349842-33c89424de2d"),
    alt: "Private pool deck overlooking the ocean",
  },
  poolNight: {
    src: u("1566073771259-6a8506099945"),
    alt: "Lantern-lit pool and villas at dusk",
  },
  beach: {
    src: u("1507525428034-b723cf961d3e"),
    alt: "White sand beach meeting a turquoise sea",
  },
  beachLoungers: {
    src: u("1506953823976-52e1fdc0149a"),
    alt: "Beach loungers under a palm on white sand",
  },
  shoreline: {
    src: u("1519046904884-53103b34b206"),
    alt: "Gentle waves washing over a sandy shoreline",
  },
  ocean: {
    src: u("1505228395891-9a51e7e86bf6"),
    alt: "Ocean waves seen from above in deep blue tones",
  },
  resortGarden: {
    src: u("1582719508461-905c673771fd"),
    alt: "Resort pool and tropical gardens",
  },
  resortView: {
    src: u("1571003123894-1f0594d2b5d9"),
    alt: "Tropical resort terrace overlooking the sea",
  },
  spa: {
    src: u("1544161515-4ab6ce6db874"),
    alt: "Guest relaxing during a spa massage",
  },
  spaStones: {
    src: u("1540555700478-4be289fbecef"),
    alt: "Spa treatment table with candles and towels",
  },
  dining: {
    src: u("1414235077428-338989a2e8c0"),
    alt: "Plated fine-dining dish",
  },
  diningTerrace: {
    src: u("1559339352-11d035aa65de"),
    alt: "Candlelit restaurant terrace at dusk",
  },
  diningRoom: {
    src: u("1517248135467-4c7edcad34c4"),
    alt: "Warmly lit restaurant interior",
  },
  breakfast: {
    src: u("1504674900247-0877df9cc836"),
    alt: "Fresh breakfast spread with fruit",
  },
  diving: {
    src: u("1544551763-46a013bb70d5"),
    alt: "Diver swimming above a coral reef with tropical fish",
  },
  surf: {
    src: u("1502680390469-be75c86b636f"),
    alt: "Surfer riding a clear blue wave",
  },
  bedroomOcean: {
    src: u("1618773928121-c32242e63f39"),
    alt: "Bright bedroom with crisp white linens",
  },
  bedroomSuite: {
    src: u("1611892440504-42a792e24d32"),
    alt: "Suite with king bed and soft neutral tones",
  },
  bedroomVilla: {
    src: u("1590490360182-c33d57733427"),
    alt: "Villa bedroom with natural wood and linen",
  },
  bedroomGarden: {
    src: u("1578683010236-d716f9a3f461"),
    alt: "Elegant bedroom with warm lighting",
  },
  bedroomLuxe: {
    src: u("1631049307264-da0ec9d70304"),
    alt: "Luxury bedroom with a view",
  },
  bedroomCoastal: {
    src: u("1582719478250-c89cae4dc85b"),
    alt: "Coastal-styled hotel room with ocean light",
  },
  villaPool: {
    src: u("1584132967334-10e028bd69f7"),
    alt: "Private villa pool with lounge chairs",
  },
  poolView: {
    src: u("1499793983690-e29da59ef1c2"),
    alt: "Pool edge overlooking the sea",
  },
} satisfies Record<string, ResortImage>;

export type ImageKey = keyof typeof images;
