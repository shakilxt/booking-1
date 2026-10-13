"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { testimonials } from "@/content/home";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const INTERVAL = 7000;

export function Testimonials() {
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const t = testimonials[index];

  const go = (dir: number) =>
    setState(([i]) => [(i + dir + testimonials.length) % testimonials.length, dir]);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => go(1), INTERVAL);
    return () => clearTimeout(id);
  }, [index, paused]);

  return (
    <section
      className="section-y bg-surface"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-page">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="eyebrow flex items-center justify-center gap-3 text-secondary">
            <span className="h-px w-8 bg-current" />
            Guest stories
            <span className="h-px w-8 bg-current" />
          </p>

          <div className="relative mt-10 grid min-h-[22rem] sm:min-h-[18rem]" aria-live="polite">
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              <motion.figure
                key={index}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 60, filter: "blur(6px)" }),
                  center: { opacity: 1, x: 0, filter: "blur(0px)" },
                  exit: (d: number) => ({ opacity: 0, x: d * -60, filter: "blur(6px)" }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.8, ease: EASE }}
                className="col-start-1 row-start-1"
              >
                <div className="flex justify-center gap-1" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-mango text-mango" />
                  ))}
                </div>
                <blockquote className="mt-8 font-display text-2xl leading-snug font-light sm:text-3xl lg:text-[2.6rem] lg:leading-[1.2]">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-10">
                  <p className="font-semibold">{t.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t.location} · {t.stay}
                  </p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6">
            <CarouselButton aria-label="Previous review" onClick={() => go(-1)}>
              <ArrowLeft className="size-4" />
            </CarouselButton>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show review ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => setState(([cur]) => [i, i > cur ? 1 : -1])}
                  className="relative h-1.5 w-10 cursor-pointer overflow-hidden rounded-full bg-foreground/15"
                >
                  {i === index && (
                    <motion.span
                      key={`${index}-${paused}`}
                      className={cn("absolute inset-y-0 left-0 rounded-full bg-secondary")}
                      initial={{ width: paused ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: paused ? 0 : INTERVAL / 1000, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>
            <CarouselButton aria-label="Next review" onClick={() => go(1)}>
              <ArrowRight className="size-4" />
            </CarouselButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CarouselButton(props: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      className="grid size-12 cursor-pointer place-items-center rounded-full border border-foreground/15 transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
      {...props}
    />
  );
}
