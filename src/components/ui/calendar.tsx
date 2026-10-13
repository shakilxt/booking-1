"use client";

import * as React from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Range-friendly calendar styled for the resort. Range days get a continuous
 * seafoam band with solid deep-teal endpoints.
 */
function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const d = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("relative select-none", className)}
      classNames={{
        root: cn(d.root, "w-fit"),
        months: "relative flex flex-col gap-8 sm:flex-row",
        month: "flex flex-col gap-4",
        nav: "absolute inset-x-0 top-0 flex items-center justify-between",
        button_previous:
          "z-10 grid size-9 cursor-pointer place-items-center rounded-full border border-foreground/10 transition-colors hover:bg-foreground/5 disabled:opacity-30",
        button_next:
          "z-10 grid size-9 cursor-pointer place-items-center rounded-full border border-foreground/10 transition-colors hover:bg-foreground/5 disabled:opacity-30",
        month_caption: "flex h-9 items-center justify-center",
        caption_label: "font-display text-lg",
        month_grid: "border-collapse",
        weekdays: "flex",
        weekday: "w-10 pb-2 text-[0.7rem] font-semibold tracking-widest text-muted-foreground uppercase",
        week: "mt-1 flex",
        day: "group/day relative size-10 p-0 text-center text-sm",
        day_button:
          "relative z-10 grid size-10 cursor-pointer place-items-center rounded-full transition-colors outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed",
        today: "font-bold text-secondary",
        selected: "",
        range_start:
          "rounded-l-full bg-seafoam/40 dark:bg-seafoam/15 [&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary",
        range_end:
          "rounded-r-full bg-seafoam/40 dark:bg-seafoam/15 [&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary",
        range_middle:
          "bg-seafoam/40 dark:bg-seafoam/15 [&>button]:rounded-none [&>button]:hover:bg-transparent",
        disabled: "text-muted-foreground/40 [&>button]:line-through [&>button]:decoration-1",
        outside: "text-muted-foreground/40",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className }) =>
          orientation === "left" ? (
            <ChevronLeft className={cn("size-4", className)} />
          ) : (
            <ChevronRight className={cn("size-4", className)} />
          ),
      }}
      {...props}
    />
  );
}

export { Calendar };
