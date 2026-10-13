import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full text-sm font-semibold whitespace-nowrap transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-out outline-none select-none focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        /** Mango — reserved for booking calls to action */
        cta: "bg-cta text-cta-foreground shadow-[0_8px_24px_-10px_rgb(244_201_93/0.8)] hover:bg-cta-hover hover:shadow-[0_12px_28px_-10px_rgb(244_201_93/0.9)]",
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        outline:
          "border border-foreground/20 bg-transparent text-foreground hover:border-foreground/40 hover:bg-foreground/5",
        glass:
          "border border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20",
        ghost: "hover:bg-foreground/5",
        link: "rounded-none px-0 text-foreground underline-offset-8 hover:underline",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-[0.8125rem]",
        lg: "h-13 px-8 text-[0.9375rem]",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
