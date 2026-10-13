import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ResortImage } from "@/components/resort-image";
import { SectionHeading } from "@/components/home/section-heading";
import { gallery } from "@/content/home";
import { cn } from "@/lib/utils";

export function GalleryPreview() {
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Gallery" title="A glimpse of island life" />
          <Reveal className="shrink-0">
            <Button asChild variant="outline">
              <Link href="/gallery" transitionTypes={["nav-forward"]}>
                Open the gallery <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 columns-2 gap-3 sm:gap-5 lg:columns-4">
          {gallery.map((img, i) => {
            const span = "span" in img ? img.span : undefined;
            return (
              <Reveal key={img.src} delay={(i % 4) * 0.08} className="mb-3 break-inside-avoid sm:mb-5">
                <figure
                  className={cn(
                    "group relative overflow-hidden rounded-2xl sm:rounded-3xl",
                    span === "tall" ? "aspect-[3/4.4]" : span === "wide" ? "aspect-[4/3]" : "aspect-square",
                  )}
                >
                  <ResortImage
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-deep-950/80 to-transparent p-4 text-xs text-white/90 transition-transform duration-500 group-hover:translate-y-0">
                    {img.alt}
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
