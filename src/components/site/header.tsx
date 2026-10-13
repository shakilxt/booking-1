"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { CurrencyToggle } from "@/components/site/currency-toggle";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  // Pages with a full-bleed photographic hero get a transparent header at the top.
  const overHero = pathname === "/" && !scrolled;

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    // Tuck the header away when scrolling down, bring it back when scrolling up.
    setHidden(y > 400 && y > prev && !open);
  });

  // Close the mobile menu on navigation (state adjusted during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        style={{ viewTransitionName: "site-header" }}
        animate={{ y: hidden ? "-110%" : 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow,backdrop-filter] duration-500",
          open
            ? "bg-transparent text-pearl"
            : overHero
              ? "bg-transparent text-white"
              : "bg-background/80 text-foreground shadow-[0_1px_0_0_var(--color-border)] backdrop-blur-xl backdrop-saturate-150",
        )}
      >
        <div className="container-page flex h-18 items-center justify-between gap-6 lg:h-20">
          <Link href="/" aria-label={`${site.name} home`} className="relative z-10">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {site.nav.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group relative px-4 py-2 text-sm font-medium tracking-wide"
                    >
                      {item.label}
                      <span
                        className={cn(
                          "absolute inset-x-4 -bottom-0.5 h-px origin-left bg-current transition-transform duration-500 ease-out",
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-1.5 sm:gap-2">
            <CurrencyToggle className="hidden md:flex" id="header-currency" />
            <ThemeToggle />
            <Button asChild variant="cta" size="sm" className="hidden sm:inline-flex">
              <Link href="/book">Book your stay</Link>
            </Button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-10 cursor-pointer place-items-center rounded-full transition-colors hover:bg-current/10 lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col bg-deep pt-24 text-pearl lg:hidden"
          >
            <nav aria-label="Mobile" className="container-page flex-1">
              <ul className="flex flex-col">
                {[{ label: "Home", href: "/" }, ...site.nav].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.06 }}
                    className="border-b border-pearl/10"
                  >
                    <Link
                      href={item.href}
                      className="flex items-center justify-between py-5 font-display text-3xl"
                    >
                      {item.label}
                      <ArrowUpRight className="size-5 opacity-50" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="container-page flex items-center justify-between gap-4 pb-10"
            >
              <CurrencyToggle id="mobile-currency" />
              <Button asChild variant="cta" size="lg">
                <Link href="/book">Book your stay</Link>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
