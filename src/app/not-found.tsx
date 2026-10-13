import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/site/logo";

export default function NotFound() {
  return (
    <main className="relative grid min-h-svh place-items-center overflow-hidden bg-deep px-6 text-center text-pearl">
      <div aria-hidden className="absolute -top-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-lagoon/30 blur-3xl" />
      <div className="relative max-w-lg">
        <LogoMark className="mx-auto size-14 text-seafoam" />
        <p className="eyebrow mt-8 text-seafoam">404 · Adrift</p>
        <h1 className="mt-4 text-5xl font-light sm:text-6xl">This page drifted out to sea</h1>
        <p className="mt-6 text-pearl/70">
          It may still be on its way — some of the resort is being built in stages. Let&apos;s get you
          back to shore.
        </p>
        <Button asChild variant="cta" size="lg" className="mt-10">
          <Link href="/">Return home</Link>
        </Button>
      </div>
    </main>
  );
}
