import Link from "next/link";
import { tourTypes } from "./data";
import { Heading, cx } from "./ui";

// Cards are <a>s: in the design `.mmt a { transition: color }` beat both the card's and the reveal's
// transition, so the card keeps the base-layer transition and reveals without easing.
const typeReveal =
  "js-reveal opacity-0 [transform:translateY(40px)] [&.in]:opacity-100 [&.in]:[transform:none] motion-reduce:opacity-100 motion-reduce:[transform:none]";

// The second card is shown in its hover state; the colours swap instead of stacking two values.
const card = (active: boolean) =>
  cx(
    "group/type relative min-h-[214px] pt-[30px] px-[20px] pb-[22px] border rounded-[20px] text-center",
    active ? "border-blue bg-blue" : "border-[#dfe5ee] bg-white hover:border-blue hover:bg-blue"
  );
// The number sits in the card's top-left corner as a 60px tab.
const num = (active: boolean) =>
  cx(
    "absolute top-0 left-0 inline-flex items-center justify-center w-[60px] h-[60px]",
    "rounded-[20px_0_20px_0] text-[18px] font-bold leading-[28.8px]",
    active ? "text-white" : "text-body group-hover/type:text-white"
  );
const icon = (active: boolean) =>
  cx("block mb-[15px] text-[60px] leading-none [transition:color_0.3s_ease]", active ? "text-white" : "text-orange group-hover/type:text-white");
const title = (active: boolean) =>
  cx("text-[20px] leading-[24px] [transition:color_0.3s_ease]", active ? "text-white" : "group-hover/type:text-white");
const text = (active: boolean) =>
  cx("mt-[10px] text-[14px] font-medium leading-[24px] [transition:color_0.3s_ease]", active ? "text-white" : "group-hover/type:text-white");

export default function TourTypes() {
  return (
    <section className="pt-[120px] pb-0 max1024:pt-[90px] max767:pt-[60px]">
      <div className="w-full max-w-[1402px] mx-auto px-[16px]">
        <div
          className={cx(
            "relative max-w-[1370px] mx-auto pt-[120px] px-[100px] pb-[120px] overflow-hidden rounded-[24px]",
            "[background:#f1f5fb_url(/images/home/tour-types/types-city.webp)_center/cover_no-repeat]",
            "max1280:pt-[80px] max1280:px-[40px] max1280:pb-[100px] max767:pt-[60px] max767:px-[20px] max767:pb-[70px]"
          )}
        >
          <svg className="absolute inset-0 w-full h-[60%] pointer-events-none" viewBox="0 0 900 300" fill="none" aria-hidden="true">
            <path d="M-20 180 C 80 60, 160 260, 260 150 S 380 20, 420 90" stroke="#c5cfdd" strokeWidth="2" strokeDasharray="8 8" />
            <path d="M560 10 C 640 120, 760 20, 800 110 S 880 220, 940 160" stroke="#c5cfdd" strokeWidth="2" strokeDasharray="8 8" />
            <circle cx="820" cy="80" r="34" stroke="#c5cfdd" strokeWidth="2" strokeDasharray="6 6" />
          </svg>
          <Heading className="relative mb-[54px]" tag="Service" title={<>Choose Our Tour Types<br />& Enjoy Now</>} center />
          <div className="relative grid grid-cols-[repeat(5,1fr)] gap-[30px] max1024:grid-cols-[repeat(3,1fr)] max1024:gap-y-[34px] max767:grid-cols-[1fr_1fr]">
            {tourTypes.map((t, i) => {
              const active = i === 1;
              return (
                <Link href="/tour-types" className={cx(card(active), typeReveal)} key={t.title}>
                  <span className={num(active)}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={icon(active)}><i className={t.icon} /></span>
                  <h4 className={title(active)}>{t.title}</h4>
                  <p className={text(active)}>Curated trips planned around what you love.</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
