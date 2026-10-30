import Link from "next/link";
import { contact } from "./data";
import { container, cx, section } from "./ui";

export type LegalSection = { id: string; title: string; body: (string | string[])[] };

const policies = [
  { href: "/privacy-policy", label: "Privacy Policy", icon: "fa-solid fa-user-shield" },
  { href: "/terms-and-conditions", label: "Terms & Conditions", icon: "fa-solid fa-file-contract" },
  { href: "/refund-policy", label: "Refund Policy", icon: "fa-solid fa-rotate-left" },
];

/**
 * Shared layout for policy pages: an intro card, numbered sections (a string is a paragraph,
 * a string[] is a bullet list), and a sticky sidebar with the contents and the other policies.
 */
export default function LegalPage({ current, updated, intro, sections }: { current: string; updated: string; intro: string; sections: LegalSection[] }) {
  return (
    <section className={cx(section, "!pt-[50px] max1024:!pt-[40px] max767:!pt-[32px]")}>
      <div className={container}>
        <div className="grid grid-cols-[280px_minmax(0,1fr)] gap-[40px] [align-items:start] max1024:grid-cols-1">
          <aside className="sticky top-[110px] grid gap-[20px] max1024:static">
            <nav aria-label="On this page" className="p-[22px] rounded-[18px] bg-soft max1024:hidden">
              <h2 className="mb-[12px] text-[16px] uppercase tracking-[0.6px]">Contents</h2>
              <ol className="m-0 grid gap-[6px] text-[14px]">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="flex gap-[8px] text-body hover:text-orange">
                      <span className="text-blue font-semibold">{String(i + 1).padStart(2, "0")}</span> {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="p-[22px] rounded-[18px] bg-white [border:1px_solid_var(--color-line)]">
              <h2 className="mb-[12px] text-[16px] uppercase tracking-[0.6px]">Our policies</h2>
              <ul className="m-0 grid gap-[6px]">
                {policies.map((p) => {
                  const on = p.href === current;
                  return (
                    <li key={p.href}>
                      <Link href={p.href} aria-current={on ? "page" : undefined} className={cx("flex items-center gap-[10px] px-[12px] py-[9px] rounded-[10px] text-[14px] font-semibold", on ? "bg-blue !text-white" : "text-navy hover:bg-soft hover:text-blue")}>
                        <i className={cx(p.icon, "w-[16px]", on ? "text-white" : "text-orange")} /> {p.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          <article className="min-w-0">
            <div className="p-[26px] rounded-[18px] bg-cream max767:p-[18px]">
              <span className="inline-flex items-center gap-[8px] text-[13px] font-semibold text-blue">
                <i className="fa-regular fa-calendar" /> Last updated: {updated}
              </span>
              <p className="mt-[10px] mb-0 text-[16px] leading-[1.75] text-navy">{intro}</p>
            </div>

            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-[110px] pt-[34px]">
                <h2 className="flex items-baseline gap-[12px] text-[24px] leading-[1.3] max767:text-[20px]">
                  <span className="text-orange text-[18px]">{String(i + 1).padStart(2, "0")}</span> {s.title}
                </h2>
                {s.body.map((b, j) =>
                  Array.isArray(b) ? (
                    <ul key={j} className="mt-[12px] grid gap-[8px] text-[15px] leading-[1.7]">
                      {b.map((li) => (
                        <li key={li} className="flex gap-[10px]"><i className="fa-solid fa-check mt-[6px] text-[12px] text-blue" /> <span>{li}</span></li>
                      ))}
                    </ul>
                  ) : (
                    <p key={j} className="mt-[12px] mb-0 text-[15px] leading-[1.8]">{b}</p>
                  )
                )}
              </section>
            ))}

            <div className="mt-[40px] flex flex-wrap items-center justify-between gap-[16px] p-[24px] rounded-[18px] bg-navy text-white/80">
              <div>
                <h2 className="text-white text-[18px]">Questions about this policy?</h2>
                <p className="m-0 text-[14px]">Madras Modern Tourism LLC, {contact.address}</p>
              </div>
              <div className="flex flex-wrap gap-[16px] text-[14px]">
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="!text-white hover:!text-orange"><i className="fa-solid fa-phone mr-[8px] text-orange" />{contact.phone}</a>
                <a href={`mailto:${contact.email}`} className="!text-white hover:!text-orange"><i className="fa-solid fa-envelope mr-[8px] text-orange" />{contact.email}</a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
