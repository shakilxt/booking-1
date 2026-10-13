import { Baby, Dumbbell, Plane, Sailboat, Sparkles, UtensilsCrossed, Waves, Wifi, type LucideIcon } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/home/section-heading";
import { amenities } from "@/content/home";

const icons: Record<(typeof amenities)[number]["icon"], LucideIcon> = {
  Waves,
  Sparkles,
  UtensilsCrossed,
  Sailboat,
  Dumbbell,
  Plane,
  Baby,
  Wifi,
};

export function Amenities() {
  return (
    <section className="section-y">
      <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="On the island"
            title="Everything, within a barefoot stroll"
            description="The island is small enough to cross in ten minutes and generous enough to fill a fortnight. Bicycles wait outside every villa."
          />
        </div>

        <Stagger className="grid gap-px overflow-hidden rounded-[2rem] border bg-border sm:grid-cols-2">
          {amenities.map((a) => {
            const Icon = icons[a.icon];
            return (
              <StaggerItem
                key={a.title}
                className="group relative bg-background p-8 transition-colors duration-500 hover:bg-surface lg:p-10"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-seafoam/35 text-deep transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-6deg] dark:bg-seafoam/12 dark:text-seafoam">
                  <Icon className="size-5" strokeWidth={1.6} />
                </span>
                <h3 className="mt-6 text-xl">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
