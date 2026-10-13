"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Star } from "lucide-react";
import { BookingBar } from "@/components/site/booking-bar";
import { ResortImage } from "@/components/resort-image";
import { images } from "@/lib/images";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-deep text-white"
    >
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        initial={{ clipPath: "inset(8% 8% 8% 8% round 2rem)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0% round 0rem)" }}
        transition={{ duration: 1.6, ease: EASE }}
        className="absolute inset-0 -z-10"
      >
        <ResortImage
          src={images.hero.src}
          alt={images.hero.alt}
          fill
          preload
          quality={85}
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      {/* Legibility gradients */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(5_35_44/0.55)_0%,rgb(5_35_44/0.05)_35%,rgb(5_35_44/0.15)_60%,rgb(5_35_44/0.85)_100%)]"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-page flex flex-1 flex-col justify-end pt-32 pb-8 md:justify-center md:pb-40"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
          className="eyebrow flex items-center gap-3 text-seafoam"
        >
          <span className="h-px w-8 bg-current" />
          Baa Atoll · Maldives
        </motion.p>

        <h1 className="mt-6 max-w-5xl text-[clamp(3rem,9vw,8.5rem)] leading-[0.92] font-light tracking-[-0.03em]">
          {["Where the lagoon", "meets the sky"].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.75 + i * 0.12 }}
              >
                {i === 1 ? (
                  <>
                    meets the <em className="font-normal text-seafoam italic">sky</em>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.15 }}
          className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
            Nine private villas on a coral island ringed by a living house reef — thirty-five
            minutes by seaplane from Malé.
          </p>
          <div className="flex items-center gap-3 text-sm text-white/85">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-mango text-mango" />
              ))}
            </div>
            <span>
              <strong className="font-semibold text-white">4.9</strong> from 1,200+ guest reviews
            </span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 1.35 }}
        className="container-page relative z-10 pb-6 md:absolute md:inset-x-0 md:bottom-10 md:pb-0"
      >
        <BookingBar className="mx-auto max-w-5xl" />
      </motion.div>

      <motion.a
        href="#intro"
        aria-label="Scroll to content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute right-6 bottom-36 hidden size-11 place-items-center rounded-full border border-white/30 text-white/80 backdrop-blur-sm transition-colors hover:bg-white/10 xl:grid"
      >
        <ArrowDown className="size-4 animate-float" />
      </motion.a>
    </section>
  );
}
