export const site = {
  name: "Azure Lagoon Resort",
  shortName: "Azure Lagoon",
  description:
    "Twenty-two hectares of coral island in the Baa Atoll UNESCO Biosphere Reserve — overwater villas, a house reef at your doorstep and barefoot luxury in the Maldives.",
  location: {
    island: "Nalhoara Island",
    atoll: "Baa Atoll",
    country: "Republic of Maldives",
    coordinates: { lat: 5.2412, lng: 73.0891 },
    airport: "Velana International Airport (MLE)",
    transfer: "35 minutes by seaplane",
  },
  contact: {
    phone: "+960 660 2026",
    email: "stay@azurelagoon.demo",
    whatsapp: "+960 790 2026",
  },
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    pinterest: "https://pinterest.com",
  },
  nav: [
    { label: "Rooms & Villas", href: "/rooms" },
    { label: "Experiences", href: "/experiences" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
