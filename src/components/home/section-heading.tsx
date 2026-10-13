import { Reveal, RevealWords } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  tone = "default",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  tone?: "default" | "inverse";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Reveal>
        <p
          className={cn(
            "eyebrow flex items-center gap-3",
            align === "center" && "justify-center",
            tone === "inverse" ? "text-seafoam" : "text-secondary",
          )}
        >
          <span className="h-px w-8 bg-current" />
          {eyebrow}
        </p>
      </Reveal>
      <h2 className="mt-5 text-4xl leading-[1.05] font-normal sm:text-5xl lg:text-6xl">
        <RevealWords text={title} />
      </h2>
      {description && (
        <Reveal delay={0.15}>
          <p
            className={cn(
              "mt-6 text-base leading-relaxed sm:text-lg",
              tone === "inverse" ? "text-pearl/70" : "text-muted-foreground",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
