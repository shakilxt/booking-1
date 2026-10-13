"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        "relative grid size-10 cursor-pointer place-items-center rounded-full transition-colors hover:bg-current/10",
        className,
      )}
      aria-label="Toggle dark mode"
    >
      <Sun className="size-[1.05rem] scale-100 rotate-0 transition-transform duration-500 dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-[1.05rem] scale-0 rotate-90 transition-transform duration-500 dark:scale-100 dark:rotate-0" />
    </button>
  );
}
