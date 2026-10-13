export const currencies = ["USD", "BDT"] as const;
export type Currency = (typeof currencies)[number];

/** Display-only conversion. Stripe always charges in USD. Moves to `settings` in Supabase. */
export const USD_TO_BDT = 122;

const formatters: Record<Currency, Intl.NumberFormat> = {
  USD: new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }),
  BDT: new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }),
};

export function convertCents(usdCents: number, currency: Currency) {
  return currency === "USD" ? usdCents : Math.round(usdCents * USD_TO_BDT);
}

export function formatMoney(usdCents: number, currency: Currency = "USD") {
  return formatters[currency].format(convertCents(usdCents, currency) / 100);
}
