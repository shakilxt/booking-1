"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ResortImage } from "@/components/resort-image";
import { SectionHeading } from "@/components/home/section-heading";
import { experiences } from "@/content/home";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Experiences() {
  const [active, setActive] = useState(0);

  return (
    <section className="section-y relative overflow-hidden bg-deep text-pearl dark:bg-deep-900">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -bottom-40 size-[40rem] rounded-full bg-lagoon/30 blur-3xl"
      />
      <div className="container-page relative">
        <SectionHeading
          tone="inverse"
          eyebrow="Experiences"
          title="Days shaped by the ocean"
          description="Spa rituals above the water, dinners on a floodlit sandbank and manta encounters in Hanifaru Bay — curated by your villa host."
        />

        <div className="mt-14 flex flex-col gap-4 lg:h-[36rem] lg:flex-row">
          {experiences.map((exp, i) => {
            const isActive = i === active;
            return (
              <motion.div
                key={exp.slug}
                layout
                transition={{ duration: 0.8, ease: EASE }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={cn(
                  "relative h-[26rem] overflow-hidden rounded-[2rem] sm:h-[30rem] lg:h-auto",
                  isActive ? "lg:flex-[2.4]" : "lg:flex-1",
                )}
              >
                <Link
                  href={`/experiences#${exp.slug}`}
                  className="group absolute inset-0 block outline-none focus-visible:ring-4 focus-visible:ring-seafoam/50"
                >
                  <ResortImage
                    src={exp.image.src}
                    alt={exp.image.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className={cn(
                      "object-cover transition-transform duration-[1.6s] ease-out",
                      isActive ? "scale-100" : "scale-110",
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-950/90 via-deep-950/20 to-transparent" />
                  <span className="absolute top-6 right-6 grid size-12 place-items-center rounded-full border border-pearl/30 backdrop-blur-sm transition-colors group-hover:border-mango group-hover:bg-mango group-hover:text-deep">
                    <ArrowUpRight className="size-5" />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-7 lg:p-9">
                    <div className="max-w-md">
                      <p className="eyebrow text-seafoam">{exp.eyebrow}</p>
                      <h3 className="mt-3 text-3xl whitespace-nowrap lg:text-4xl">{exp.title}</h3>
                      <p
                        className={cn(
                          "mt-4 text-sm leading-relaxed text-pearl/80 transition-[opacity,translate] duration-700 lg:text-base",
                          isActive ? "opacity-100" : "lg:translate-y-4 lg:opacity-0",
                        )}
                      >
                        {exp.body}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
