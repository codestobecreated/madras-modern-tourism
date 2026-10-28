"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { btn, container, cx, Heading } from "../../home/include/ui";
import { reviews } from "./data";

/** Cards are 469px wide with a 29px gap; the row slides one card every 5s. */
const step = 469 + 29;

export default function Reviews() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % reviews.length), 5000);
    return () => window.clearInterval(id);
  }, []);

  return (
    // 282px bottom padding: the call-to-action strip below overlaps it by 180px
    <section className="overflow-hidden bg-[#f2f5f9] pt-[120px] pb-[282px] max1024:pt-[90px] max767:pt-[70px]">
      <div className={cx(container, "grid grid-cols-[397px_minmax(0,1fr)] gap-[31px] max1024:grid-cols-[1fr]")}>
        <div>
          <Heading
            reveal={false}
            tag="Testimonials"
            title={<>See What They Are<br />Talking About?</>}
            titleClassName="mt-[8px] text-[50px] leading-[60px] max767:text-[30px] max767:leading-[38px]"
            text="Real trips, real travellers. Here is what people say after exploring Tamil Nadu with our planners and guides."
            textClassName="max-w-none text-body text-[16px] font-medium leading-[30px]"
            className="mb-[30px]"
          />
          <Link href="/about" className={cx(btn, "px-[30px] py-[18px]")}>Read More</Link>
        </div>

        {/* clip only the left edge: slid cards must not cover the heading, but may run off to the right and hang below */}
        <div className="min-w-0 [clip-path:inset(-60px_-100vw_-100px_0)] max1024:overflow-hidden max1024:[clip-path:none]">
          <div
            className="flex gap-[29px] [transition:transform_0.8s_ease]"
            style={{ transform: `translateX(-${index * step}px)` }}
          >
            {[...reviews, ...reviews].map((r, i) => (
              <figure
                key={`${r.name}-${i}`}
                className="relative flex-[0_0_469px] min-h-[370px] py-[50px] px-0 rounded-[0_50px_0_50px] bg-white max767:flex-[0_0_300px]"
                aria-hidden={i >= reviews.length || undefined}
              >
                <figcaption className="flex items-center gap-[12px] pl-[20px]">
                  <img className="w-[100px] h-[100px] rounded-[50%] object-cover" src={r.image} alt={r.name} />
                  <div className="flex-1">
                    <div className="text-orange text-[14px]" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }, (_, s) => <i key={s} className="fa-solid fa-star mr-[3px]" />)}
                    </div>
                    <h4 className="text-[20px] font-semibold leading-[28.8px]">{r.name}</h4>
                    <span className="text-[15px] font-medium leading-[28.8px]">{r.role}</span>
                  </div>
                  {/* date sits in a grey pill flush with the card edge */}
                  <span className="inline-flex items-center h-[60px] px-[20px] rounded-[40px_0_0_40px] bg-[#f2f5f9] text-navy text-[14px] font-medium leading-[14px] whitespace-nowrap">{r.date}</span>
                </figcaption>
                <blockquote className="pt-[30px] px-[50px] pb-[20px] text-navy text-[18px] font-medium leading-[30px] max767:px-[20px]">{r.text}</blockquote>
                <span className="absolute left-1/2 bottom-[-42px] inline-flex items-center justify-center w-[95px] h-[80px] -translate-x-1/2 rounded-[50%] bg-[#f2f5f9]">
                  <i className="fa-solid fa-quote-right text-navy text-[27px]" />
                </span>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
