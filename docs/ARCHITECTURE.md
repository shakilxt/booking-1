# Azure Lagoon Resort — Architecture Proposal

Status: **Draft, awaiting approval.** Nothing is scaffolded yet. Once this is
approved, Stage 1 (design tokens, layout, landing page) starts.

## Stack (current versions on npm as of 2026‑10‑13)

| Package | Version | Notes |
| --- | --- | --- |
| `next` | 16.4.x | App Router, Turbopack, `proxy.ts`, Cache Components, View Transitions |
| `react` / `react-dom` | 19.x | `<ViewTransition>`, Actions, `useOptimistic` |
| `tailwindcss` | 4.3.x | CSS-first `@theme` in `globals.css`, no `tailwind.config.*` |
| `shadcn` | 4.x | Components generated into `src/components/ui` |
| `motion` | 14.x | Imported from `motion/react` |
| `@supabase/supabase-js` + `@supabase/ssr` | 2.x / 0.12.x | Auth + Postgres |
| `stripe` + `@stripe/stripe-js` + `@stripe/react-stripe-js` | latest | Test mode, Payment Element |
| `vitest` | latest | Unit tests for pricing and availability logic |

Package manager: npm. Node 22.

## Folder structure

```
.
├── proxy.ts                         # Refreshes Supabase session; gates /admin/*
├── next.config.ts                   # cacheComponents, viewTransition, Unsplash remotePatterns
├── components.json                  # shadcn config
├── supabase/
│   ├── config.toml
│   ├── migrations/
│   │   ├── 0001_schema.sql          # tables, enums, constraints
│   │   ├── 0002_functions.sql       # is_admin(), availability RPCs, triggers
│   │   └── 0003_rls.sql             # row-level security policies
│   └── seed.sql                     # rooms, images, seasons, add-ons, promos, bookings, reviews
├── scripts/
│   └── create-admin.ts              # Creates admin@azurelagoon.demo via service-role key
├── src/
│   ├── app/
│   │   ├── layout.tsx               # <html>, next/font (Fraunces + Manrope), theme provider
│   │   ├── globals.css              # @import "tailwindcss"; @theme tokens; dark variant
│   │   ├── (site)/                  # Public marketing site (shared header/footer)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx             # Home
│   │   │   ├── rooms/page.tsx       # Listing + filters (searchParams)
│   │   │   ├── rooms/[slug]/page.tsx
│   │   │   ├── experiences/page.tsx
│   │   │   ├── gallery/page.tsx
│   │   │   └── contact/page.tsx
│   │   ├── book/                    # Booking wizard (focused layout, no marketing chrome)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx             # Steps driven by ?step=dates|room|addons|details|payment
│   │   │   └── confirmation/[reference]/page.tsx
│   │   ├── admin/
│   │   │   ├── login/page.tsx
│   │   │   └── (dashboard)/
│   │   │       ├── layout.tsx       # Sidebar shell + server-side role check
│   │   │       ├── page.tsx         # Stats
│   │   │       ├── calendar/page.tsx
│   │   │       ├── bookings/page.tsx
│   │   │       ├── rooms/…          # list, new, [id]/edit
│   │   │       ├── rates/page.tsx   # Seasons + per-room overrides
│   │   │       ├── add-ons/page.tsx
│   │   │       └── promos/page.tsx
│   │   └── api/stripe/webhook/route.ts
│   ├── components/
│   │   ├── ui/                      # shadcn (generated, lightly themed)
│   │   ├── motion/                  # Reveal, Stagger, Parallax helpers
│   │   ├── site/                    # Header, Footer, BookingBar, ThemeToggle, CurrencyToggle
│   │   ├── home/                    # Hero, Intro, FeaturedRooms, Amenities, Experiences, …
│   │   ├── rooms/                   # RoomCard, Filters, Lightbox, AvailabilityCalendar
│   │   ├── booking/                 # Wizard, step components, PriceSummary
│   │   └── admin/                   # StatCard, Timeline, DataTable, forms
│   ├── lib/
│   │   ├── supabase/                # server.ts, client.ts, proxy.ts, admin.ts (service role)
│   │   ├── stripe.ts
│   │   ├── pricing.ts               # Pure nightly-rate + totals engine (shared client/server)
│   │   ├── availability.ts
│   │   ├── currency.ts              # USD/BDT formatting + conversion
│   │   ├── images.ts                # Curated Unsplash URLs + alt text
│   │   └── utils.ts                 # cn(), date helpers
│   ├── data/                        # Cached reads ("use cache" + cacheTag)
│   ├── actions/                     # Server Actions (booking, admin CRUD, newsletter, contact)
│   └── types/database.ts            # `supabase gen types` output
└── tests/                           # Vitest: pricing, availability, promo validation
```

Key conventions:

- Route groups keep the marketing site, booking wizard and admin on
  separate layouts.
- Reads live in `src/data` and use `"use cache"` with `cacheTag("rooms")` and
  similar tags. Admin mutations in `src/actions` call `revalidateTag`.
  Availability and anything per-user stays dynamic behind `<Suspense>`.
- `proxy.ts` makes a fast session check for `/admin/:path*` (except
  `/admin/login`). The dashboard layout and every admin action check
  `is_admin` again, because the proxy is only an optimistic gate.
- `lib/pricing.ts` is a pure function. The client calls it for the live
  breakdown and the server calls it again before charging, so the browser
  never decides the price.

## Supabase schema

All money is stored as **integer USD cents**. BDT is display-only and uses a
configurable rate in `settings`. Stripe charges in USD.

**Decision to confirm:** each `rooms` row is one bookable unit, such as
"Overwater Villa 3". This suits a small boutique resort with 8–10 units and
makes the room-by-date admin timeline a direct mapping. A chain hotel would
instead use room types with inventory counts.

```sql
create extension if not exists btree_gist;
create extension if not exists citext;

create type room_category  as enum ('suite', 'beach_villa', 'pool_villa', 'overwater_villa');
create type booking_status as enum ('pending', 'confirmed', 'checked_in', 'completed', 'cancelled');
create type addon_unit     as enum ('per_stay', 'per_night', 'per_guest', 'per_guest_per_night');
create type discount_type  as enum ('percent', 'fixed');

-- Admin flag for auth users
create table profiles (
  id          uuid primary key references auth.users on delete cascade,
  full_name   text,
  role        text not null default 'guest' check (role in ('guest', 'admin')),
  created_at  timestamptz not null default now()
);

-- Global config (single row)
create table settings (
  id                 boolean primary key default true check (id),
  tax_rate           numeric(5,4) not null default 0.15,   -- VAT + service
  usd_to_bdt         numeric(10,4) not null default 122.0,
  pending_hold_mins  int not null default 20,              -- how long an unpaid booking holds dates
  check_in_time      time not null default '14:00',
  check_out_time     time not null default '11:00'
);

create table rooms (
  id                 uuid primary key default gen_random_uuid(),
  slug               text unique not null,
  name               text not null,
  category           room_category not null,
  tagline            text,
  description        text not null,
  base_rate_cents    int not null check (base_rate_cents > 0),     -- Sun–Thu nights
  weekend_rate_cents int check (weekend_rate_cents > 0),           -- Fri/Sat nights; null = base
  max_adults         int not null,
  max_children       int not null default 0,
  max_guests         int not null,
  bed_config         text not null,          -- "1 King + daybed"
  size_sqm           int not null,
  view               text,                   -- "Lagoon", "Ocean", "Garden"
  amenities          text[] not null default '{}',
  is_active          boolean not null default true,
  sort_order         int not null default 0,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create table room_images (
  id          uuid primary key default gen_random_uuid(),
  room_id     uuid not null references rooms on delete cascade,
  url         text not null,
  alt         text not null,
  sort_order  int not null default 0
);

-- Seasonal pricing: a multiplier for all rooms, optionally overridden per room
create table seasons (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,                 -- "Peak Winter", "Monsoon Escape"
  start_date  date not null,
  end_date    date not null,                 -- inclusive
  multiplier  numeric(4,2) not null default 1.00,
  priority    int not null default 0,        -- if seasons overlap, higher priority wins
  check (end_date >= start_date)
);

create table room_season_rates (
  room_id           uuid references rooms on delete cascade,
  season_id         uuid references seasons on delete cascade,
  nightly_rate_cents int not null check (nightly_rate_cents > 0),
  primary key (room_id, season_id)
);

-- Maintenance or owner blocks (shown in the admin timeline, blocked on the public calendar)
create table room_blocks (
  id          uuid primary key default gen_random_uuid(),
  room_id     uuid not null references rooms on delete cascade,
  start_date  date not null,
  end_date    date not null,                 -- exclusive
  reason      text,
  check (end_date > start_date)
);

create table add_ons (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  name         text not null,                -- "Island Breakfast", "Lagoon Spa Ritual", "Seaplane Transfer"
  description  text,
  price_cents  int not null check (price_cents >= 0),
  unit         addon_unit not null,
  icon         text,                         -- lucide icon name
  is_active    boolean not null default true,
  sort_order   int not null default 0
);

create table promo_codes (
  id               uuid primary key default gen_random_uuid(),
  code             citext unique not null,   -- "LAGOON10", "HONEYMOON"
  description      text,
  discount_type    discount_type not null,
  discount_value   int not null,             -- percent (1–100) or USD cents
  min_nights       int not null default 1,
  valid_from       date,
  valid_to         date,
  max_redemptions  int,
  times_redeemed   int not null default 0,
  is_active        boolean not null default true
);

create table bookings (
  id                  uuid primary key default gen_random_uuid(),
  reference           text unique not null,          -- "AZL-7K3QF"
  room_id             uuid not null references rooms,
  status              booking_status not null default 'pending',
  check_in            date not null,
  check_out           date not null,
  adults              int not null check (adults >= 1),
  children            int not null default 0,
  guest_first_name    text not null,
  guest_last_name     text not null,
  guest_email         citext not null,
  guest_phone         text,
  guest_country       text,
  special_requests    text,
  promo_code_id       uuid references promo_codes,
  display_currency    text not null default 'USD' check (display_currency in ('USD', 'BDT')),
  rooms_cents         int not null,   -- sum of nightly rates
  addons_cents        int not null default 0,
  discount_cents      int not null default 0,
  tax_cents           int not null,
  total_cents         int not null,
  price_breakdown     jsonb not null, -- per-night rates + season labels, frozen at booking time
  stripe_payment_intent_id text unique,
  hold_expires_at     timestamptz,    -- set while status = 'pending'
  paid_at             timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  check (check_out > check_in),

  -- Postgres itself rejects double bookings, so two checkouts racing for the
  -- same dates cannot both succeed
  exclude using gist (
    room_id with =,
    daterange(check_in, check_out, '[)') with &&
  ) where (status <> 'cancelled')
);

create table booking_add_ons (
  booking_id        uuid references bookings on delete cascade,
  add_on_id         uuid references add_ons,
  quantity          int not null default 1,
  unit_price_cents  int not null,   -- price at the time of booking
  total_cents       int not null,
  primary key (booking_id, add_on_id)
);

create table reviews (
  id           uuid primary key default gen_random_uuid(),
  room_id      uuid references rooms on delete set null,
  guest_name   text not null,
  guest_country text,
  rating       int not null check (rating between 1 and 5),
  title        text,
  body         text not null,
  stayed_on    date,
  is_featured  boolean not null default false,   -- shown in the homepage testimonials
  created_at   timestamptz not null default now()
);

create table newsletter_subscribers (
  email       citext primary key,
  created_at  timestamptz not null default now()
);

create table contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       citext not null,
  subject     text,
  message     text not null,
  created_at  timestamptz not null default now()
);
```

### Functions

- `is_admin()` is a `security definer` function that reads
  `profiles.role` for `auth.uid()`. RLS policies use it.
- `get_booked_ranges(room_id, from, to)` returns `[check_in, check_out)`
  ranges from active bookings and `room_blocks`, without guest data. The
  public date-range picker uses it to disable dates.
- `search_available_rooms(check_in, check_out, guests)` returns active
  rooms that have capacity and no overlapping booking or block.
- `release_expired_holds()` cancels `pending` bookings whose
  `hold_expires_at` has passed. The booking action calls it before
  inserting, and an optional `pg_cron` job can run it every 5 minutes.
- An `updated_at` trigger on `rooms` and `bookings`.

### Row-level security

| Table | anon / guest | admin |
| --- | --- | --- |
| rooms, room_images, seasons, add_ons, reviews | `select` active rows | full CRUD |
| room_season_rates, settings | `select` | full CRUD |
| promo_codes | none (checked by a server action) | full CRUD |
| bookings, booking_add_ons | none (created by a server action with the service role; read via the RPCs above) | full CRUD |
| room_blocks | none (exposed only through `get_booked_ranges`) | full CRUD |
| newsletter_subscribers, contact_messages | `insert` only | `select` / `delete` |
| profiles | `select` own row | full |

### Pricing rule (`lib/pricing.ts`)

For each night in `[check_in, check_out)`:

```
season  = highest-priority season covering that night (if any)
nightly = room_season_rates[room, season]                       -- per-room override
       ?? (isFriOrSat(night) ? weekend_rate : base_rate) × (season?.multiplier ?? 1)

rooms_cents    = Σ nightly
addons_cents   = Σ price × units  (units from addon_unit: nights, guests, or both)
discount_cents = promo applied to rooms_cents + addons_cents (checks min_nights, dates, redemption limit)
tax_cents      = round((rooms + addons − discount) × tax_rate)
total_cents    = rooms + addons − discount + tax
```

### Booking and payment flow

1. Steps 1–4 keep their state in the URL (`searchParams`) plus a small
   client store, so back/forward navigation and refreshes work.
2. Entering the payment step runs a server action that releases expired
   holds and recomputes the price on the server. It then inserts a
   `pending` booking with a 20-minute hold; if the exclusion constraint
   rejects it, the guest sees "these dates were just booked". It creates a
   Stripe PaymentIntent (USD) and returns its `client_secret`.
3. The Stripe Payment Element runs inside the wizard. The test card is
   `4242 4242 4242 4242`.
4. The `payment_intent.succeeded` webhook sets the booking to `confirmed`,
   sets `paid_at`, and increments the promo's `times_redeemed`. The
   confirmation page polls briefly in case the webhook hasn't arrived yet.

## Seed data

- 9 units in 4 categories: 2 Lagoon Suites, 3 Beach Villas, 2 Pool
  Villas, and 2 Overwater Villas (one of them the "Azure Sanctuary"
  signature villa). Rates run from about $380 to $1,450 per night.
- 4–6 curated Unsplash images per room, plus hero, spa, dining, and gallery
  images (about 30 images in all).
- Seasons: Peak (Dec 15 – Jan 10, ×1.35), High (Nov–Feb, ×1.15), and Monsoon
  (Jun–Aug, ×0.85).
- Add-ons: Island Breakfast (per guest per night), Lagoon Spa Ritual (per
  guest), Seaplane or Airport Transfer (per stay), Sunset Cruise, and
  Private Beach Dinner.
- Promo codes: `LAGOON10` (10% off), `HONEYMOON` (15% off, minimum 4
  nights), and `EARLYBIRD` ($100 off).
- About 40 bookings spread from 60 days ago to 90 days ahead, in every
  status, so the occupancy, revenue, and timeline views have data.
- About 24 reviews, 6 of them featured.
- Admin user `admin@azurelagoon.demo` / `demo1234`, created by
  `scripts/create-admin.ts`. Seeding auth users through raw SQL is
  fragile, so the script uses the Supabase Admin API instead.

## Environment variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=                 # server only (service role)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=  # pk_test_…
STRIPE_SECRET_KEY=                   # sk_test_…
STRIPE_WEBHOOK_SECRET=               # whsec_…
NEXT_PUBLIC_SITE_URL=
```

## Open questions

1. **Location:** where is the fictional resort, for the map and copy?
   The default is a fictional private island in the Maldives (overwater
   villas and seaplane transfers fit the brand). Another option is
   somewhere in Bangladesh, such as St. Martin's Island, which would fit
   the BDT toggle.
2. **Supabase:** will you use a hosted Supabase project (free tier, which I
   recommend) or the local Supabase CLI with Docker? I can't create the
   project for you. I'll provide migrations and seed files that you apply
   with `supabase db push`, or by pasting them into the SQL editor.
3. **Guest accounts:** the plan is guest checkout only, with auth used just
   for the admin. Guest sign-up and a "My bookings" page can be added
   later.
4. **Units versus room types:** see the decision above. Do you approve
   one row per bookable unit?
