"use client";

import { motion } from "motion/react";
import { Clock, MapPin, Navigation, Plane, Sailboat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/home/section-heading";
import { site } from "@/content/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const travel = [
  { icon: Plane, title: "Seaplane", body: "35 minutes from Velana International Airport, with views over five atolls." },
  { icon: Sailboat, title: "Speedboat + domestic flight", body: "25-minute flight to Dharavandhoo, then a 15-minute boat ride." },
  { icon: Clock, title: "Time zone", body: "Maldives Time (GMT+5). We run on island time — an hour ahead of Malé." },
];

// Scattered reef islets for the stylised atoll map.
const islets: [number, number, number][] = [
  [128, 120, 3], [150, 98, 2.5], [182, 86, 3.5], [218, 84, 2], [252, 96, 3], [276, 122, 2.5],
  [290, 156, 3], [288, 192, 2], [270, 226, 3.5], [240, 250, 2.5], [204, 258, 3], [168, 250, 2],
  [138, 230, 3], [116, 200, 2.5], [108, 166, 3], [196, 150, 2], [226, 176, 2.5],
  [420, 330, 3], [446, 318, 2.5], [470, 336, 3], [482, 364, 2.5], [470, 392, 3], [440, 404, 2],
  [412, 388, 3], [402, 358, 2.5],
];

export function Location() {
  const { lat, lng } = site.location.coordinates;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <section className="section-y">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
        <Reveal className="relative order-last overflow-hidden rounded-[2rem] bg-deep text-pearl ring-1 ring-white/10 lg:order-first dark:bg-deep-950">
          <svg viewBox="0 0 600 480" className="h-auto w-full" role="img" aria-labelledby="map-title">
            <title id="map-title">
              Map showing Nalhoara Island in Baa Atoll and the seaplane route from Malé
            </title>
            <defs>
              <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.12" />
              </pattern>
              <radialGradient id="lagoon-glow">
                <stop offset="0%" stopColor="#3fa2b0" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#3fa2b0" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="600" height="480" fill="url(#dots)" />

            {/* Baa Atoll */}
            <ellipse cx="200" cy="172" rx="130" ry="115" fill="url(#lagoon-glow)" />
            <ellipse
              cx="200" cy="172" rx="96" ry="90"
              fill="none" stroke="#a8dadc" strokeOpacity="0.45" strokeWidth="1.2" strokeDasharray="2 5"
            />
            {/* North Malé Atoll */}
            <ellipse cx="442" cy="362" rx="80" ry="70" fill="url(#lagoon-glow)" />
            <ellipse
              cx="442" cy="362" rx="44" ry="48"
              fill="none" stroke="#a8dadc" strokeOpacity="0.45" strokeWidth="1.2" strokeDasharray="2 5"
            />
            {islets.map(([x, y, r], i) => (
              <circle key={i} cx={x} cy={y} r={r} fill="#efe6d6" opacity="0.7" />
            ))}

            {/* Seaplane route */}
            <motion.path
              d="M 452 372 C 420 250, 320 190, 236 176"
              fill="none"
              stroke="#f4c95d"
              strokeWidth="2"
              strokeDasharray="6 8"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 2.2, ease: EASE, delay: 0.3 }}
            />

            {/* Malé */}
            <circle cx="452" cy="372" r="5" fill="#a8dadc" />
            <text x="466" y="392" fill="currentColor" fontSize="13" fontWeight="600" opacity="0.8">
              Malé · MLE
            </text>

            {/* Resort marker */}
            <g transform="translate(236 176)">
              <motion.circle
                r="10"
                fill="#f4c95d"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              />
              <circle r="7" fill="#f4c95d" stroke="#0b3c49" strokeWidth="3" />
            </g>
            <text x="252" y="164" fill="currentColor" fontSize="15" fontFamily="var(--font-fraunces)">
              Azure Lagoon
            </text>
            <text x="252" y="182" fill="currentColor" fontSize="11" opacity="0.6" letterSpacing="2">
              BAA ATOLL
            </text>

            {/* Compass */}
            <g transform="translate(548 52)" opacity="0.6">
              <circle r="18" fill="none" stroke="currentColor" strokeOpacity="0.4" />
              <path d="M0 -13 L4 0 L0 13 L-4 0 Z" fill="currentColor" />
              <text y="-24" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="700">
                N
              </text>
            </g>
          </svg>
          <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs backdrop-blur-md">
            <MapPin className="size-3.5 text-mango" />
            {lat.toFixed(4)}° N, {lng.toFixed(4)}° E
          </div>
        </Reveal>

        <div>
          <SectionHeading
            eyebrow="Getting here"
            title="Remote, never hard to reach"
            description={`${site.location.island} lies in the ${site.location.atoll}, a UNESCO Biosphere Reserve 120 km north-west of Malé. Our team meets every guest at arrivals.`}
          />
          <Stagger className="mt-10 space-y-6">
            {travel.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title} className="flex gap-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-foreground/10 text-secondary">
                  <Icon className="size-[1.1rem]" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.2} className="mt-10">
            <Button asChild variant="outline">
              <a href={mapsUrl} target="_blank" rel="noreferrer">
                <Navigation /> Open in Google Maps
              </a>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
