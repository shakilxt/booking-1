import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/home/section-heading";
import { faqs } from "@/content/home";
import { site } from "@/content/site";

export function Faq() {
  return (
    <section className="section-y bg-surface">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
        <div>
          <SectionHeading
            eyebrow="Good to know"
            title="Questions, answered"
            description="Can't find what you're looking for? Our reservations team replies within the hour."
          />
          <Reveal delay={0.2} className="mt-8 space-y-1 text-sm">
            <p>
              <a href={`mailto:${site.contact.email}`} className="font-semibold underline-offset-4 hover:underline">
                {site.contact.email}
              </a>
            </p>
            <p className="text-muted-foreground">
              or visit our{" "}
              <Link href="/contact" className="text-foreground underline underline-offset-4">
                contact page
              </Link>
            </p>
          </Reveal>
        </div>
        <Reveal>
          <Accordion type="single" collapsible defaultValue="item-0" className="border-t border-foreground/10">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
