import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className={cn("size-9", className)}>
      <circle cx="20" cy="20" r="19" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.2" />
      <circle cx="20" cy="15" r="5.5" fill="var(--color-mango)" />
      <path
        d="M6 23.5c2.4 0 2.4-1.8 4.8-1.8s2.4 1.8 4.8 1.8 2.4-1.8 4.8-1.8 2.4 1.8 4.8 1.8 2.4-1.8 4.8-1.8 2.4 1.8 4.8 1.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M9 28.5c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl tracking-tight">Azure Lagoon</span>
        <span className="mt-1 text-[0.6rem] font-semibold tracking-[0.32em] uppercase opacity-70">
          Resort · Maldives
        </span>
      </span>
    </span>
  );
}
