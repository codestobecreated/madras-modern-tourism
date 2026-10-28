"use client";

import { useState } from "react";
import { container, cx, Heading, section } from "../../home/include/ui";

const faqs = [
  { q: "How do I book a tour?", a: "Open any tour, press Book Now, choose your date and group size and submit the form. You will get a confirmation straight away." },
  { q: "Can I change my travel date?", a: "Yes. Date changes are free up to 48 hours before the start, subject to availability on the new date." },
  { q: "What is the cancellation policy?", a: "Cancel at least 48 hours before the tour for a full refund. Later cancellations are refunded at 50%." },
  { q: "Are entry tickets included?", a: "Most tours include entry tickets, a guide and pick-up. Each tour page lists exactly what is included and excluded." },
  { q: "Do you run private tours?", a: "Every tour can be booked as a private trip for your group. Contact us with your dates and we will send a quote." },
  { q: "Which languages do your guides speak?", a: "All guides speak English and Tamil; Hindi, French and German guides are available on request." },
];

/** Accordion: one answer open at a time, the first open by default. */
export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={section}>
      <div className={cx(container, "max-w-[900px]")}>
        <Heading tag="FAQ" title="Frequently Asked Questions" center />
        <div className="flex flex-col gap-[16px]">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={cx("rounded-[14px] border", isOpen ? "border-blue bg-white [box-shadow:0_10px_20px_rgba(0,0,0,0.06)]" : "border-line bg-soft")}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-[20px] bg-transparent px-[26px] py-[20px] text-left text-[18px] font-bold leading-[26px] text-navy cursor-pointer max767:px-[18px] max767:text-[16px]"
                >
                  {f.q}
                  <span className={cx("inline-flex shrink-0 items-center justify-center w-[32px] h-[32px] rounded-full text-[14px]", isOpen ? "bg-blue text-white" : "bg-white text-navy")}>
                    <i className={isOpen ? "fa-solid fa-minus" : "fa-solid fa-plus"} />
                  </span>
                </button>
                {isOpen && <p className="px-[26px] pb-[22px] text-[15px] font-medium leading-[27px] max767:px-[18px]">{f.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
