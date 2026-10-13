Build a luxury beach resort booking website for a fictional resort called
"Azure Lagoon Resort". This is a portfolio project, so prioritize polish,
smooth animations, and realistic demo content.

STACK (use latest versions; check installed versions with `npm ls` and follow
their current docs, not older patterns):
- Next.js 16 (App Router, Turbopack, proxy.ts instead of middleware,
  Cache Components where useful)
- React 19.2, TypeScript
- Tailwind CSS v4 (CSS-first @theme config, no tailwind.config.js)
- shadcn/ui (latest)
- Motion (import from "motion/react", not framer-motion)
- Supabase (auth + database), Stripe in test mode
- Deploy target: Vercel

DESIGN:
- Colors as Tailwind v4 @theme tokens:
  deep teal #0B3C49 (primary), lagoon #1A7F8E (secondary),
  seafoam #A8DADC (soft accents), pearl #F7FAFA (background),
  mango #F4C95D (CTA buttons only)
- Dark mode using deep teal as the background
- Fonts via next/font: Fraunces (headings), Manrope (body)
- Mobile-first, generous whitespace, large imagery, subtle scroll
  animations, View Transitions between pages
- Unsplash images via next/image (beach villas, infinity pools, ocean,
  spa, dining)

PUBLIC SITE:
- Home: full-screen hero with floating booking bar (check-in, check-out,
  guests, "Check availability"), intro, featured rooms, amenities,
  experiences, gallery, testimonials, location map, FAQ, newsletter
- Rooms and villas listing with filters (price, guests, type)
- Room detail: gallery with lightbox, amenities, bed/size info,
  price per night, availability calendar, "Book now"
- Experiences (spa, dining, activities), gallery (masonry), contact

BOOKING FLOW (step wizard with animated transitions):
dates and guests → room → add-ons (breakfast, spa, airport pickup)
→ guest details → Stripe payment → confirmation
- Block already-booked dates in the date-range picker
- Live price breakdown: nights × rate + add-ons + tax
- Seasonal and weekend pricing, promo codes
- Currency toggle (USD / BDT)

ADMIN DASHBOARD (protected via proxy.ts):
- Stats: occupancy rate, revenue, today's check-ins and check-outs
- Room-by-date timeline calendar
- CRUD for rooms, rates (incl. seasonal), and add-ons
- Booking management table with status
  (pending, confirmed, checked-in, completed, cancelled)

DATA:
- Seed realistic demo data: 8–10 rooms/villas, bookings, reviews
- Demo admin login: admin@azurelagoon.demo / demo1234

PROCESS:
First, propose the folder structure and Supabase schema and wait for my
approval. Then build in stages:
1. Design tokens + layout + landing page
2. Rooms listing and detail
3. Booking flow + Stripe
4. Admin dashboard
After each stage, stop so I can review.
