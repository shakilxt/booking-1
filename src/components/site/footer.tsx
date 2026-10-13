import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { FacebookIcon, InstagramIcon, PinterestIcon } from "@/components/site/social-icons";
import { site } from "@/content/site";

const columns = [
  {
    title: "Stay",
    links: [
      { label: "Overwater Villas", href: "/rooms?type=overwater_villa" },
      { label: "Pool Villas", href: "/rooms?type=pool_villa" },
      { label: "Beach Villas", href: "/rooms?type=beach_villa" },
      { label: "Lagoon Suites", href: "/rooms?type=suite" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "Spa & Wellness", href: "/experiences#spa" },
      { label: "Dining", href: "/experiences#dining" },
      { label: "Ocean Adventures", href: "/experiences#activities" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-deep-950 text-pearl">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-lagoon/25 blur-3xl"
      />
      <div className="container-page relative pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-6 text-sm leading-relaxed text-pearl/65">{site.description}</p>
            <div className="mt-8 flex gap-2">
              {[
                { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
                { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
                { href: site.social.pinterest, label: "Pinterest", Icon: PinterestIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-pearl/15 transition-colors hover:border-mango hover:text-mango"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="eyebrow text-seafoam">{col.title}</h3>
              <ul className="mt-6 space-y-3 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-pearl/75 transition-colors hover:text-pearl">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="eyebrow text-seafoam">Reach us</h3>
            <address className="mt-6 space-y-3 text-sm text-pearl/75 not-italic">
              <p>
                {site.location.island}, {site.location.atoll}
                <br />
                {site.location.country}
              </p>
              <p>
                <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="hover:text-pearl">
                  {site.contact.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.contact.email}`} className="hover:text-pearl">
                  {site.contact.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div
          aria-hidden
          className="mt-20 overflow-hidden pb-[0.18em] font-display text-[16.5vw] leading-[0.9] whitespace-nowrap tracking-tight text-pearl/[0.06] select-none lg:text-[13rem]"
        >
          Azure Lagoon
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-pearl/10 pt-8 text-xs text-pearl/50 sm:flex-row sm:items-center sm:justify-between">
          <p>A fictional resort — portfolio project. Photography via Unsplash.</p>
          <div className="flex gap-6">
            <Link href="/admin" className="hover:text-pearl">
              Staff login
            </Link>
            <Link href="/contact" className="hover:text-pearl">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
