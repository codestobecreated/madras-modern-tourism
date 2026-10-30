"use client";

import Link from "next/link";
import { useState } from "react";
import { allTours, tourTypeList } from "../../home/include/catalog";
import TourCard from "../../home/include/tour-card";
import { container, cx, Heading, section } from "../../home/include/ui";

const all = { slug: "all", title: "All Tours", icon: "fa-solid fa-earth-asia", text: "Every package we offer, in one place." };
const options = [all, ...tourTypeList];
const countFor = (slug: string) => (slug === "all" ? allTours.length : allTours.filter((t) => t.type === slug).length);

/**
 * Tour types as a picker: choosing a type shows its tours right below, without leaving the page.
 * Each result block also links to the full tours page filtered by that type.
 */
export default function TypeExplorer() {
  const [picked, setPicked] = useState("all");
  const current = options.find((o) => o.slug === picked) ?? all;
  const tours = picked === "all" ? allTours : allTours.filter((t) => t.type === picked);

  return (
    <section className={cx(section, "!pt-[50px] max1024:!pt-[40px] max767:!pt-[32px]")}>
      <div className={container}>
        <Heading tag="Tour Types" title="Travel The Way You Like" text="Pick a travel style to see the matching packages instantly." center reveal={false} className="mb-[36px]" />

        <div role="tablist" aria-label="Tour types" className="grid grid-cols-[repeat(5,minmax(0,1fr))] gap-[14px] max1024:grid-cols-[repeat(3,minmax(0,1fr))] max767:grid-cols-[repeat(2,minmax(0,1fr))] max767:gap-[10px]">
          {options.map((o) => {
            const on = o.slug === picked;
            const count = countFor(o.slug);
            return (
              <button
                key={o.slug}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls="type-results"
                onClick={() => setPicked(o.slug)}
                className={cx(
                  "group/type relative flex flex-col items-start gap-[12px] p-[18px] rounded-[16px] border border-solid text-left cursor-pointer [transition:all_0.25s_ease]",
                  on
                    ? "bg-blue border-blue [box-shadow:0_14px_30px_rgba(1,95,201,0.25)]"
                    : "bg-white border-line hover:border-blue hover:[transform:translateY(-3px)] hover:[box-shadow:0_12px_26px_rgba(16,26,44,0.08)]",
                  o.slug === "all" && "max767:col-span-2"
                )}
              >
                <span className={cx("inline-flex items-center justify-center w-[48px] h-[48px] rounded-[14px] text-[20px] [transition:all_0.25s_ease]", on ? "bg-white text-blue" : "bg-cream text-orange group-hover/type:bg-orange group-hover/type:text-white")}>
                  <i className={o.icon} />
                </span>
                <span className="min-w-0">
                  <strong className={cx("block text-[16px] leading-[1.3]", on ? "text-white" : "text-navy")}>{o.title}</strong>
                  <span className={cx("block mt-[4px] text-[13px] font-medium", on ? "text-white/80" : "text-body")}>
                    {count} {count === 1 ? "package" : "packages"}
                  </span>
                </span>
                {on && <i className="fa-solid fa-circle-check absolute top-[14px] right-[14px] text-white text-[16px]" aria-hidden />}
              </button>
            );
          })}
        </div>

        <div id="type-results" role="tabpanel" className="mt-[30px] p-[30px] rounded-[24px] bg-soft max767:p-[16px] max767:mt-[20px]">
          <div className="mb-[24px] flex flex-wrap items-center justify-between gap-[14px]">
            <div className="flex items-center gap-[14px] min-w-0">
              <span className="inline-flex shrink-0 items-center justify-center w-[52px] h-[52px] rounded-[14px] bg-orange text-white text-[22px]">
                <i className={current.icon} />
              </span>
              <div className="min-w-0">
                <h2 className="text-[24px] leading-[1.3] max767:text-[20px]">{current.title}</h2>
                <p className="m-0 text-[15px]">{current.text}</p>
              </div>
            </div>
            <Link
              href={picked === "all" ? "/tours-page" : `/tours-page?type=${picked}`}
              className="inline-flex items-center gap-[8px] h-[44px] px-[20px] rounded-[30px] bg-white text-navy text-[14px] font-semibold border border-solid border-line hover:border-orange hover:text-orange"
            >
              View on tours page <i className="fa-solid fa-arrow-right text-[12px]" />
            </Link>
          </div>

          {tours.length > 0 ? (
            <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-[30px] max1024:grid-cols-[1fr_1fr] max767:grid-cols-[1fr] max767:gap-[20px]">
              {tours.map((t) => (
                <TourCard key={t.slug} tour={t} animate={false} />
              ))}
            </div>
          ) : (
            <div className="py-[50px] text-center">
              <i className="fa-solid fa-map-location-dot text-[44px] text-blue" />
              <h3 className="mt-[16px] text-[22px]">No packages in this style yet</h3>
              <p className="mt-[6px] text-[15px]">Our planners can build a custom trip for you.</p>
              <Link href="/contact" className="mt-[18px] inline-flex items-center h-[44px] px-[24px] rounded-[30px] bg-blue !text-white font-semibold hover:bg-orange">
                Contact us
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
