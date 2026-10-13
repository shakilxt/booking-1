const words = [
  "Overwater villas",
  "House reef",
  "Manta season",
  "Sandbank dinners",
  "Seaplane arrivals",
  "Lagoon spa",
  "Barefoot luxury",
];

export function Marquee() {
  const row = [...words, ...words];
  return (
    <div className="overflow-hidden border-y bg-background py-6" aria-hidden>
      <div className="flex w-max animate-marquee gap-10 motion-reduce:animate-none">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl whitespace-nowrap italic sm:text-3xl">
            {w}
            <span className="size-2 rounded-full bg-mango" />
          </span>
        ))}
      </div>
    </div>
  );
}
