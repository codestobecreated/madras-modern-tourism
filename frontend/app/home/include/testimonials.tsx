"use client";

import { useEffect, useState } from "react";
import { testimonials } from "./data";
import { Heading, cx } from "./ui";

const card = (active: boolean) =>
  cx(
    "mt-[30px] mx-0 mb-0 pt-0 px-[20px] pb-[30px] border border-[#dfdfdf] rounded-[30px] bg-white text-center",
    "[box-shadow:0_10px_18px_rgba(0,0,0,0.1)] [transition:transform_0.6s_ease]",
    // The centre card sits 30px higher; the side cards are hidden once the track is a single column.
    active ? "cursor-default [transform:translateY(-30px)]" : "cursor-pointer max1024:hidden"
  );

// Side cards use grey accents, the centre card blue/orange.
const accent = (active: boolean, on: string) => (active ? on : "text-[#cbcbcc]");

export default function Testimonials() {
  const count = testimonials.length;
  const [active, setActive] = useState(1);

  useEffect(() => {
    const id = window.setInterval(() => setActive((i) => (i + 1) % count), 6000);
    return () => window.clearInterval(id);
  }, [active, count]);

  // Always show three cards: the previous, the active (centre) and the next.
  const visible = [-1, 0, 1].map((o) => (active + o + count) % count);

  return (
    <section className="pt-[110px] pb-[115px] max1024:py-[90px] max767:py-[70px]" id="testimonials">
      <div className="w-full max-w-[1440px] mx-auto px-[16px]">
        <Heading tag="Testimonial" title={<>See what they are<br />talking about?</>} center className="mb-[54px]" />
        <div className="grid grid-cols-[repeat(3,1fr)] gap-[20px] [align-items:start] max1024:grid-cols-[1fr] max1024:max-w-[480px] max1024:mx-auto">
          {visible.map((idx, pos) => {
            const t = testimonials[idx];
            const on = pos === 1;
            return (
              <figure key={`${idx}-${pos}`} className={card(on)} onClick={() => setActive(idx)}>
                {/* person block inside the card top; the avatar tab pokes 10px above it */}
                <figcaption className="inline-flex items-start gap-[30px] h-[117px] mx-0 mb-[33px] pr-[22px] rounded-[30px] bg-[#f2f5f9] text-left">
                  <span
                    className={cx(
                      "relative block w-[112px] h-[127px] mt-[-10px] pb-[15px] rounded-[100px_100px_0_100px] text-[14px] font-medium",
                      on ? "bg-blue" : "bg-[#cbcbcc]"
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.image} alt={t.name} loading="lazy" className="w-[112px] h-[112px] object-cover rounded-[100px_100px_0_100px]" />
                  </span>
                  <div className="pt-[22px]">
                    <div className={cx("text-[14px] tracking-[2px]", accent(on, "text-orange"))} aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }, (_, i) => <i key={i} className="fa-solid fa-star" />)}
                    </div>
                    <h4 className="mt-[2px] text-[22px] leading-[26.4px]">{t.name}</h4>
                    <span className="text-[14px] font-medium leading-[28.8px]">{t.role}</span>
                  </div>
                </figcaption>
                <blockquote className="min-h-[120px] mt-0 mx-0 mb-[24px] text-navy text-[18px] font-medium leading-[30px]">{t.text}</blockquote>
                <i className={cx("fa-solid fa-quote-left text-[26px]", accent(on, "text-orange"))} />
              </figure>
            );
          })}
        </div>
        <div className="flex justify-center gap-[8px] mt-[10px]">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              className={cx("w-[35px] h-[3px] p-0 [border:0] rounded-[5px]", i === active ? "bg-orange" : "bg-[#dfdfdf]")}
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
