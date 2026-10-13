"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ResortImage } from "@/components/resort-image";
import { stats } from "@/content/home";
import { images } from "@/lib/images";

export function Intro() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBack = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yFront = useTransform(scrollYProgress, [0, 1], [90, -70]);

  return (
    <section id="intro" ref={ref} className="section-y relative overflow-hidden">
      <div className="container-page grid items-center gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-secondary">
              <span className="h-px w-8 bg-current" />
              Welcome to Nalhoara
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 font-display text-3xl leading-[1.2] font-light sm:text-4xl lg:text-[2.75rem]">
              A barefoot island where{" "}
              <em className="text-secondary italic">time slows to the rhythm of the tide</em>,
              and every villa opens onto sand, sea or sky.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-xl leading-relaxed text-muted-foreground">
              Azure Lagoon sits within the Baa Atoll UNESCO Biosphere Reserve, where manta rays gather
              each monsoon and the reef glows after dark. We built nine villas, not ninety — so the
              beach always feels like yours, and our hosts know your name before the seaplane lands.
            </p>
          </Reveal>

          <Stagger className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t pt-10 sm:grid-cols-4">
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <p className="font-display text-4xl text-secondary lg:text-5xl">{s.value}</p>
                <p className="mt-2 text-sm leading-snug text-muted-foreground">{s.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="relative mb-10 h-[26rem] sm:h-[34rem] lg:mb-0 lg:h-[40rem]">
          <motion.div
            style={{ y: yBack }}
            className="absolute top-0 right-0 h-[80%] w-[72%] overflow-hidden rounded-[2rem]"
          >
            <ResortImage
              src={images.infinityPool.src}
              alt={images.infinityPool.alt}
              fill
              sizes="(min-width: 1024px) 35vw, 70vw"
              className="object-cover"
            />
          </motion.div>
          <motion.div
            style={{ y: yFront }}
            className="absolute bottom-0 left-0 h-[55%] w-[52%] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_rgb(5_35_44/0.5)] ring-8 ring-background"
          >
            <ResortImage
              src={images.beachLoungers.src}
              alt={images.beachLoungers.alt}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute top-[58%] right-[6%] hidden rounded-2xl bg-card px-5 py-4 shadow-xl sm:block">
            <p className="eyebrow text-[0.65rem] text-muted-foreground">Water today</p>
            <p className="mt-1 font-display text-3xl">
              28.5<span className="text-lg">°C</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
