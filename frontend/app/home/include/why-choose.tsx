/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { asset, whyChoose } from "./data";
import { Heading, btnBlue, container, cx, reveal } from "./ui";

/** 2x2 feature card grid with hairlines between cells (one column on phones). */
const item = (compact: boolean) => cx(
  "group/item flex items-center justify-center gap-[20px] px-[10px]",
  compact ? "py-[30px]" : "py-[32px]",
  "even:[border-left:1px_solid_#dfdfdf] nth-[n+3]:[border-top:1px_solid_#dfdfdf]",
  "max767:even:[border-left:0] max767:nth-[n+2]:[border-top:1px_solid_#e8ebf1]",
);

// `!` is needed to beat Font Awesome's own `display: inline-block` on the icon.
const icon = cx(
  "!inline-flex flex-[0_0_80px] items-center justify-center h-[80px] rounded-[50%]",
  "bg-[#fdf8f4] text-navy text-[45px] [transition:all_0.35s_ease]",
  "group-hover/item:bg-orange group-hover/item:text-white",
);

/** Circle photos with a white frame; the big one has a speech-bubble tail. */
const frame = "absolute border-solid border-white rounded-[50%]";
const big = cx(
  frame,
  "overflow-visible top-[-10px] left-[55px] right-auto w-[540px] h-[540px] border-[22px]",
  "after:content-[''] after:absolute after:left-[30px] after:bottom-[-70px] after:w-[60px] after:h-[110px] after:bg-white",
  "after:[clip-path:polygon(30%_0,100%_10%,0_100%)]",
  "max1440:w-[470px] max1440:h-[470px] max1440:left-[40px] max1280:w-[440px] max1280:h-[440px]",
  "max767:w-[300px] max767:h-[300px] max767:border-[10px]",
);
// About page: 581px ring (30px border) and 324px ring (15px border), like its reference.
const bigAbout = cx(
  frame,
  "overflow-visible top-[-60px] left-[31px] w-[581px] h-[581px] border-[30px]",
  "after:content-[''] after:absolute after:left-[30px] after:bottom-[-70px] after:w-[60px] after:h-[110px] after:bg-white",
  "after:[clip-path:polygon(30%_0,100%_10%,0_100%)]",
  "max1280:w-[440px] max1280:h-[440px] max1280:border-[22px] max767:w-[300px] max767:h-[300px] max767:border-[10px]",
);
const smallAbout = cx(
  frame,
  "overflow-hidden z-1 top-[227px] left-[31px] w-[324px] h-[324px] border-[15px]",
  "max1280:w-[250px] max1280:h-[250px] max1280:top-[230px] max1280:left-[10px] max767:w-[170px] max767:h-[170px] max767:border-[8px]",
);
const small = cx(
  frame,
  "overflow-hidden z-1 top-[255px] left-[30px] bottom-auto w-[300px] h-[300px] border-[12px]",
  "max1440:w-[250px] max1440:h-[250px] max1440:top-[230px] max1440:left-[10px]",
  "max767:w-[170px] max767:h-[170px] max767:border-[8px]",
);

/** `compact`: the About page variant (box rows 4px shorter, 20px before the button, 567px photo column, its own photos). */
export default function WhyChoose({ compact = false }: { compact?: boolean }) {
  return (
    <section
      className={cx(
        "relative overflow-hidden pt-[120px] pb-[120px] max767:py-[70px]",
        "[background:#fdf6ee_url(/images/home/why-choose/why-bg.webp)_center/cover]",
      )}
    >
      {/* Huge orange ellipse behind the photos */}
      <span
        className="absolute top-[117px] right-[-1557px] bottom-auto w-[2914px] h-[2486px] rounded-[50%] bg-orange pointer-events-none max1024:w-full"
        aria-hidden="true"
      />
      {/* The generic one-column ≤1024 two-col rule lost to the section's own columns, so they stay two columns */}
      <div className={cx(container, "relative grid grid-cols-[641px_minmax(0,1fr)] gap-[30px] [align-items:start] max1280:grid-cols-[1.1fr_0.9fr]")}>
        <div className={reveal}>
          <Heading tag="Why choose us" title={<>Why You Should Choose<br />Our Company</>} className="mb-[34px]" />
          <div className={cx("grid grid-cols-[1fr_1fr] overflow-hidden rounded-[30px] bg-white [box-shadow:0_10px_30px_rgba(0,0,0,0.1)] max767:grid-cols-[1fr]", compact ? "mb-[20px]" : "mb-[30px]")}>
            {whyChoose.map((w) => (
              <div className={item(compact)} key={w.title}>
                <i className={cx(w.icon, icon)} />
                <h4 className="max-w-[140px] text-[20px] leading-[30px]">{w.title}</h4>
              </div>
            ))}
          </div>
          <Link href="/about" className={btnBlue}>Explore More</Link>
        </div>
        <div className={cx(compact ? "min-h-[567px]" : "min-h-[585px]", "relative max1024:min-h-[480px] max1024:max-w-[520px] max767:min-h-[360px]", reveal)}>
          <div className={compact ? bigAbout : big}><img src={compact ? "/images/about/why-choose/big-photo.webp" : asset("about/about-couple")} alt="Travellers exploring together" className="w-full h-full object-cover rounded-[50%]" /></div>
          <div className={compact ? smallAbout : small}><img src={compact ? "/images/about/why-choose/small-photo.webp" : asset("tours/tour-hiker")} alt="Hiker enjoying the mountain view" className="w-full h-full object-cover" /></div>
        </div>
      </div>
    </section>
  );
}
