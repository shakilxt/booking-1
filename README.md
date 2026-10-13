# Azure Lagoon Resort

A luxury beach-resort booking site for a fictional resort in the Maldives — a
portfolio project focused on polish, motion and realistic demo content.

**Stack:** Next.js 16 (App Router, Turbopack, Cache Components, View
Transitions) · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui (Radix) ·
Motion · Supabase · Stripe (test mode) · Vercel.

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the folder structure,
database schema, pricing rules and build stages.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional for Stage 1
npm run dev                  # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run lint` | ESLint |

## Design system

Defined CSS-first in `src/app/globals.css` (no `tailwind.config.*`):

| Token | Hex | Use |
| --- | --- | --- |
| `deep` | `#0B3C49` | Primary; dark-mode background |
| `lagoon` | `#1A7F8E` | Secondary, links, accents |
| `seafoam` | `#A8DADC` | Soft accents, calendar ranges |
| `pearl` | `#F7FAFA` | Light background |
| `mango` | `#F4C95D` | Booking CTAs only (`<Button variant="cta">`) |

Semantic shadcn tokens (`background`, `primary`, `muted`…) map onto the palette
and are redefined under `.dark`. Fonts: Fraunces (display) and Manrope (body)
via `next/font`.

## Notes

- Photography is from Unsplash, curated in `src/lib/images.ts` — swap any photo
  there. Images fade in over a lagoon-gradient placeholder, which also covers a
  photo that fails to load.
- Prices are stored in USD cents; the USD/BDT toggle is display-only (rate in
  `src/lib/currency.ts`).
