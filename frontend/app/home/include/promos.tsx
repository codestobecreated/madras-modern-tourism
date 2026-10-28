/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { asset, promos } from "./data";
import { container, cx, reveal } from "./ui";

// Smaller pill than the shared `btn`: 10/20 padding, 14px text.
const promoBtn =
  "inline-flex items-center gap-[10px] px-[20px] py-[10px] [border:0] rounded-[30px] text-[14px] font-bold leading-none whitespace-nowrap hover:[transform:translateY(-2px)]";

export default function Promos() {
  return (
    <section className="relative z-[1]">
      <div className={cx(container, "grid grid-cols-[1fr_1fr] gap-[30px] max1024:grid-cols-[1fr]")}>
        {promos.map((p) => {
          const blue = p.tone === "blue";
          return (
            <div
              className={cx(
                "group/promo relative flex items-center min-h-[261px] overflow-hidden rounded-[30px_30px_30px_0]",
                blue ? "bg-blue" : "flex-row-reverse bg-orange text-right",
                "max767:flex-col max767:items-stretch max767:text-left",
                reveal,
              )}
              key={p.title}
            >
              <div className={cx("relative z-[1] flex-[1_0_45%]", blue ? "p-[60px_0_60px_40px]" : "p-[60px_40px_60px_0]")}>
                <span className={cx("block font-grace text-[20px] font-medium leading-[28.8px]", blue ? "text-orange" : "text-white")}>{p.tag}</span>
                <h3 className={cx("mt-[4px] mb-[16px] max-w-[250px] text-[24px] leading-[30px]", blue ? "text-white" : "ml-auto text-white")}>{p.title}</h3>
                <Link
                  href="/tours-page"
                  className={cx(promoBtn, blue ? "bg-orange !text-white hover:bg-blue hover:!text-white" : "bg-white !text-navy hover:bg-orange hover:!text-white")}
                >
                  Book Now
                </Link>
              </div>
              {/* max-width stays the base 100% (it beat the design's 320px cap) */}
              <img
                className={cx(
                  "self-stretch w-[55%] object-cover [transition:transform_2.2s_ease] group-hover/promo:[transform:scale(1.2)]",
                  blue ? "object-[left_bottom]" : "object-[right_bottom]",
                  "max767:self-end max767:w-[70%]",
                )}
                src={p.image}
                alt=""
                loading="lazy"
              />
              {blue && (
                <img
                  className="absolute left-[40%] bottom-[20px] w-[110px] opacity-[0.9]"
                  src={asset("promos/promo-leaf")}
                  alt=""
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
