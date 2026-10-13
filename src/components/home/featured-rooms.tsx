import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowRight, ArrowUpRight, BedDouble, Maximize2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/currency-provider";
import { ResortImage } from "@/components/resort-image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/home/section-heading";
import { categoryLabels, featuredRooms, rooms, type Room } from "@/content/rooms";

export function FeaturedRooms() {
  return (
    <section className="section-y bg-surface">
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Rooms & villas"
            title="Your own corner of the Indian Ocean"
            description="From treetop suites to our signature two-bedroom Sanctuary at the end of the jetty — every stay comes with a dedicated villa host."
          />
          <Reveal className="shrink-0">
            <Button asChild variant="outline">
              <Link href="/rooms" transitionTypes={["nav-forward"]}>
                View all {rooms.length} stays <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>

        <Stagger
          stagger={0.12}
          className="-mx-5 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0"
        >
          {featuredRooms.map((room) => (
            <StaggerItem key={room.slug} className="w-[82%] shrink-0 snap-start sm:w-[60%] md:w-auto">
              <RoomCard room={room} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function RoomCard({ room }: { room: Room }) {
  return (
    <Link
      href={`/rooms/${room.slug}`}
      transitionTypes={["nav-forward"]}
      className="group block rounded-[1.75rem] outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem]">
        <ViewTransition name={`room-image-${room.slug}`} share="morph" default="none">
          <div className="absolute inset-0">
            <ResortImage
              src={room.images[0].src}
              alt={room.images[0].alt}
              fill
              sizes="(min-width: 768px) 30vw, 80vw"
              className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
            />
          </div>
        </ViewTransition>
        <div className="absolute inset-0 bg-gradient-to-t from-deep-950/70 via-transparent to-transparent" />
        <span className="absolute top-4 left-4 rounded-full bg-white/85 px-3 py-1.5 text-[0.7rem] font-bold tracking-[0.14em] text-deep uppercase backdrop-blur-md">
          {categoryLabels[room.category]}
        </span>
        <span className="absolute top-4 right-4 grid size-10 translate-y-2 place-items-center rounded-full bg-white text-deep opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-4" />
        </span>
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <p className="text-sm text-white/75">from</p>
          <p className="font-display text-3xl">
            <Price cents={room.baseRateCents} />
            <span className="ml-1 font-sans text-sm text-white/75">/ night</span>
          </p>
        </div>
      </div>
      <div className="px-1 pt-5">
        <h3 className="text-2xl transition-colors group-hover:text-secondary">{room.name}</h3>
        <p className="mt-1.5 line-clamp-1 text-sm text-muted-foreground">{room.tagline}</p>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.8rem] font-medium text-muted-foreground">
          <li className="flex items-center gap-1.5">
            <Maximize2 className="size-3.5" /> {room.sizeSqm} m²
          </li>
          <li className="flex items-center gap-1.5">
            <Users className="size-3.5" /> Up to {room.maxGuests}
          </li>
          <li className="flex items-center gap-1.5">
            <BedDouble className="size-3.5" /> {room.bedConfig}
          </li>
        </ul>
      </div>
    </Link>
  );
}
