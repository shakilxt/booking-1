"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig } from "motion/react";
import { CurrencyProvider } from "@/components/currency-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <CurrencyProvider>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </CurrencyProvider>
    </ThemeProvider>
  );
}
