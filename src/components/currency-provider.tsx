"use client";

import { createContext, use, useCallback, useSyncExternalStore } from "react";
import { currencies, formatMoney, type Currency } from "@/lib/currency";

const STORAGE_KEY = "azure-currency";

// Tiny external store over localStorage, with an in-memory fallback when
// storage is unavailable (private mode, blocked site data).
let memory: Currency = "USD";
const listeners = new Set<() => void>();

function isCurrency(value: unknown): value is Currency {
  return typeof value === "string" && (currencies as readonly string[]).includes(value);
}

function read(): Currency {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isCurrency(stored)) return stored;
  } catch {}
  return memory;
}

function write(next: Currency) {
  memory = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

type CurrencyContextValue = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  format: (usdCents: number) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const currency = useSyncExternalStore(subscribe, read, () => "USD" as const);
  const format = useCallback((usdCents: number) => formatMoney(usdCents, currency), [currency]);

  return (
    <CurrencyContext value={{ currency, setCurrency: write, format }}>{children}</CurrencyContext>
  );
}

export function useCurrency() {
  const ctx = use(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used inside <CurrencyProvider>");
  return ctx;
}

export function Price({ cents, className }: { cents: number; className?: string }) {
  const { format } = useCurrency();
  return <span className={className}>{format(cents)}</span>;
}
