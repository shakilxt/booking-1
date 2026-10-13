"use client";

import { useActionState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { subscribe, type NewsletterState } from "@/actions/newsletter";
import { Button } from "@/components/ui/button";
import { Reveal, RevealWords } from "@/components/motion/reveal";
import { ResortImage } from "@/components/resort-image";
import { images } from "@/lib/images";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Newsletter() {
  const [state, action, pending] = useActionState<NewsletterState, FormData>(subscribe, {
    status: "idle",
  });

  return (
    <section className="relative isolate overflow-hidden py-28 text-pearl md:py-40">
      <div className="absolute inset-0 -z-10">
        <ResortImage src={images.ocean.src} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-deep/80" />
      </div>

      <div className="container-page text-center">
        <Reveal>
          <p className="eyebrow text-seafoam">The Lagoon Letter</p>
        </Reveal>
        <h2 className="mx-auto mt-5 max-w-3xl text-4xl leading-[1.05] font-light sm:text-5xl lg:text-6xl">
          <RevealWords text="Postcards from the island, a few times a year" />
        </h2>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-lg text-pearl/75">
            Manta season alerts, new menus and members-only rates. No spam — just the occasional
            sunset.
          </p>
        </Reveal>

        <Reveal delay={0.25} className="mx-auto mt-10 max-w-lg">
          <AnimatePresence mode="wait" initial={false}>
            {state.status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="flex items-center justify-center gap-3 rounded-full border border-seafoam/30 bg-white/10 px-6 py-4 backdrop-blur-md"
                role="status"
              >
                <span className="grid size-7 place-items-center rounded-full bg-mango text-deep">
                  <Check className="size-4" />
                </span>
                You&apos;re on the list — welcome aboard.
              </motion.div>
            ) : (
              <motion.form
                key="form"
                action={action}
                exit={{ opacity: 0, scale: 0.96 }}
                className="flex flex-col gap-2 rounded-[1.75rem] border border-white/20 bg-white/10 p-1.5 backdrop-blur-md sm:flex-row sm:rounded-full"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-invalid={state.status === "error"}
                  aria-describedby={state.status === "error" ? "newsletter-error" : undefined}
                  className="h-12 flex-1 rounded-full bg-transparent px-5 text-pearl outline-none placeholder:text-pearl/50"
                />
                <Button type="submit" variant="cta" className="h-12" disabled={pending}>
                  {pending ? <LoaderCircle className="animate-spin" /> : <ArrowRight />}
                  Subscribe
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
          {state.status === "error" && (
            <p id="newsletter-error" className="mt-3 text-sm text-mango" role="alert">
              {state.message}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
