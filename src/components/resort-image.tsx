"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * next/image with a branded fallback: a lagoon gradient shows while the photo
 * loads (and stays if a remote photo ever goes missing), then the image fades in.
 */
export function ResortImage({ className, onLoad, alt, ...props }: ImageProps) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");

  return (
    <>
      <span
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_10%,var(--color-seafoam)_0%,var(--color-lagoon)_45%,var(--color-deep)_100%)] opacity-90"
      />
      {state !== "error" && (
        <Image
          alt={alt}
          className={cn(
            "transition-[opacity,scale,filter] duration-1000 ease-out",
            state === "loaded" ? "opacity-100 blur-0" : "opacity-0 blur-md",
            className,
          )}
          onLoad={(e) => {
            setState("loaded");
            onLoad?.(e);
          }}
          onError={() => setState("error")}
          {...props}
        />
      )}
    </>
  );
}
