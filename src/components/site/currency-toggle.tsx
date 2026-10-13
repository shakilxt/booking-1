"use client";

import { motion } from "motion/react";
import { useCurrency } from "@/components/currency-provider";
import { currencies } from "@/lib/currency";
import { cn } from "@/lib/utils";

export function CurrencyToggle({ className, id = "currency" }: { className?: string; id?: string }) {
  const { currency, setCurrency } = useCurrency();

  return (
    <div
      role="radiogroup"
      aria-label="Display currency"
      className={cn(
        "relative flex h-9 items-center rounded-full border border-current/20 p-0.5 text-xs font-semibold",
        className,
      )}
    >
      {currencies.map((c) => {
        const active = c === currency;
        return (
          <button
            key={c}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setCurrency(c)}
            className="relative z-10 h-full cursor-pointer rounded-full px-3 tracking-wider"
          >
            {active && (
              <motion.span
                layoutId={`${id}-pill`}
                className="absolute inset-0 -z-10 rounded-full bg-current/15"
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
              />
            )}
            {c}
          </button>
        );
      })}
    </div>
  );
}
