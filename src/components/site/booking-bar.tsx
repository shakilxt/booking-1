"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addDays, differenceInCalendarDays, format, startOfToday } from "date-fns";
import type { DateRange } from "react-day-picker";
import { CalendarDays, Minus, Plus, Search, Users } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useMediaQuery } from "@/lib/use-media-query";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAX_GUESTS = 6;

export function BookingBar({ className }: { className?: string }) {
  const router = useRouter();
  const [range, setRange] = useState<DateRange | undefined>();
  const [datesOpen, setDatesOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const nights =
    range?.from && range?.to ? differenceInCalendarDays(range.to, range.from) : 0;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!range?.from || !range?.to) {
      setDatesOpen(true);
      return;
    }
    const params = new URLSearchParams({
      checkIn: format(range.from, "yyyy-MM-dd"),
      checkOut: format(range.to, "yyyy-MM-dd"),
      adults: String(adults),
      children: String(children),
    });
    router.push(`/rooms?${params}`, { transitionTypes: ["nav-forward"] });
  }

  return (
    <form
      onSubmit={submit}
      aria-label="Check availability"
      className={cn(
        "grid w-full gap-1 rounded-[1.75rem] border border-white/40 bg-white/85 p-2 text-deep shadow-[0_30px_80px_-30px_rgb(5_35_44/0.55)] backdrop-blur-2xl backdrop-saturate-150 md:grid-cols-[2fr_1fr_auto] md:items-center md:rounded-full dark:border-white/10 dark:bg-deep/80 dark:text-pearl",
        className,
      )}
    >
      <Popover open={datesOpen} onOpenChange={setDatesOpen}>
        <PopoverAnchor asChild>
          <div className="grid grid-cols-2 gap-1">
            <FieldButton
              icon={<CalendarDays className="size-4" />}
              label="Check-in"
              value={range?.from ? format(range.from, "EEE, d MMM") : "Add date"}
              muted={!range?.from}
              aria-haspopup="dialog"
              aria-expanded={datesOpen}
              onClick={() => setDatesOpen(true)}
            />
            <FieldButton
              icon={<CalendarDays className="size-4" />}
              label="Check-out"
              value={range?.to ? format(range.to, "EEE, d MMM") : "Add date"}
              muted={!range?.to}
              divider
              aria-haspopup="dialog"
              aria-expanded={datesOpen}
              onClick={() => setDatesOpen(true)}
            />
          </div>
        </PopoverAnchor>
        <PopoverContent align="start" className="w-auto max-w-[calc(100vw-1.5rem)] p-5">
          <DatesPanel range={range} setRange={setRange} nights={nights} onDone={() => setDatesOpen(false)} />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <FieldButton
            icon={<Users className="size-4" />}
            label="Guests"
            value={`${adults} adult${adults > 1 ? "s" : ""}${children ? `, ${children} child${children > 1 ? "ren" : ""}` : ""}`}
            divider
          />
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80 p-2">
          <Stepper
            label="Adults"
            hint="Ages 13+"
            value={adults}
            min={1}
            max={MAX_GUESTS - children}
            onChange={setAdults}
          />
          <Stepper
            label="Children"
            hint="Ages 2–12"
            value={children}
            min={0}
            max={MAX_GUESTS - adults}
            onChange={setChildren}
          />
          <p className="px-4 pt-1 pb-3 text-xs text-muted-foreground">
            Infants under 2 stay free and don&apos;t count towards occupancy.
          </p>
        </PopoverContent>
      </Popover>

      <Button type="submit" variant="cta" size="lg" className="mt-1 h-14 md:mt-0 md:ml-1 md:h-15 md:px-8">
        <Search className="size-4" />
        Check availability
      </Button>
    </form>
  );
}

function DatesPanel({
  range,
  setRange,
  nights,
  onDone,
}: {
  range: DateRange | undefined;
  setRange: (r: DateRange | undefined) => void;
  nights: number;
  onDone: () => void;
}) {
  // Rendered only while the popover is open, so "today" is evaluated on the client.
  const today = startOfToday();
  const wide = useMediaQuery("(min-width: 768px)");

  return (
    <div>
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={wide ? 2 : 1}
        min={1}
        startMonth={today}
        endMonth={addDays(today, 540)}
        disabled={{ before: today }}
        defaultMonth={range?.from ?? today}
      />
      <div className="mt-4 flex items-center justify-between gap-6 border-t pt-4">
        <p className="text-sm text-muted-foreground">
          {nights > 0 ? (
            <>
              <span className="font-semibold text-foreground">{nights} nights</span> ·{" "}
              {format(range!.from!, "d MMM")} – {format(range!.to!, "d MMM yyyy")}
            </>
          ) : range?.from ? (
            "Select your check-out date"
          ) : (
            "Select your check-in date"
          )}
        </p>
        <div className="flex gap-2">
          {range?.from && (
            <Button type="button" variant="ghost" size="sm" onClick={() => setRange(undefined)}>
              Clear
            </Button>
          )}
          <Button type="button" size="sm" disabled={nights === 0} onClick={onDone}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

function FieldButton({
  icon,
  label,
  value,
  muted,
  divider,
  ...props
}: React.ComponentProps<"button"> & {
  icon: React.ReactNode;
  label: string;
  value: string;
  muted?: boolean;
  divider?: boolean;
}) {
  return (
    <button
      type="button"
      className={cn(
        "group relative flex h-16 w-full min-w-0 cursor-pointer items-center gap-3 rounded-full px-3 text-left sm:px-6 transition-colors hover:bg-deep/5 aria-expanded:bg-deep/5 dark:hover:bg-white/5 dark:aria-expanded:bg-white/5",
        divider &&
          "md:before:absolute md:before:top-1/2 md:before:left-0 md:before:h-8 md:before:w-px md:before:-translate-y-1/2 md:before:bg-current/12",
      )}
      {...props}
    >
      <span className="hidden size-9 shrink-0 place-items-center rounded-full bg-seafoam/40 min-[400px]:grid text-deep dark:bg-seafoam/15 dark:text-seafoam">
        {icon}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-[0.68rem] font-bold tracking-[0.18em] whitespace-nowrap uppercase opacity-60">{label}</span>
        <span className={cn("truncate text-[0.95rem] font-semibold", muted && "font-medium opacity-55")}>
          {value}
        </span>
      </span>
    </button>
  );
}

function Stepper({
  label,
  hint,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl px-4 py-3">
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      <div className="flex items-center gap-3">
        <StepButton aria-label={`Fewer ${label.toLowerCase()}`} disabled={value <= min} onClick={() => onChange(value - 1)}>
          <Minus className="size-3.5" />
        </StepButton>
        <span className="w-5 text-center font-semibold tabular-nums" aria-live="polite">
          {value}
        </span>
        <StepButton aria-label={`More ${label.toLowerCase()}`} disabled={value >= max} onClick={() => onChange(value + 1)}>
          <Plus className="size-3.5" />
        </StepButton>
      </div>
    </div>
  );
}

function StepButton(props: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      className="grid size-9 cursor-pointer place-items-center rounded-full border border-foreground/15 transition-colors hover:border-foreground/50 disabled:cursor-not-allowed disabled:opacity-30"
      {...props}
    />
  );
}
