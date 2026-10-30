"use client";

import { useEffect, useRef, useState } from "react";
import { counters } from "./data";
import { cx } from "./ui";

// Each stat is its own tile: icon on the left, number and label beside it (stacked and centred on phones).
// Orange hover fill sits under the content and fades in, since gradients can't transition.
const box = cx(
  "group/counter relative isolate flex items-center gap-[18px] min-w-0 overflow-hidden py-[26px] px-[22px] rounded-[18px] bg-cream [border:1px_solid_rgba(255,157,61,0.18)]",
  "before:content-[''] before:absolute before:inset-0 before:-z-[1] before:bg-[linear-gradient(135deg,#ffad5c,#f28a22)] before:opacity-0 before:[transition:opacity_0.35s_ease] hover:before:opacity-100",
  "[transition:transform_0.35s_ease,box-shadow_0.35s_ease] hover:[transform:translateY(-4px)] hover:[box-shadow:0_16px_32px_rgba(242,138,34,0.35)]",
  "max767:flex-col max767:gap-[12px] max767:py-[22px] max767:px-[12px] max767:text-center"
);
const icon = cx(
  "inline-flex shrink-0 items-center justify-center w-[64px] h-[64px] rounded-[16px]",
  "bg-orange text-white text-[26px] [box-shadow:0_8px_18px_rgba(255,157,61,0.35)] [transition:background_0.35s_ease,color_0.35s_ease,box-shadow_0.35s_ease]",
  "group-hover/counter:bg-white group-hover/counter:text-orange group-hover/counter:[box-shadow:0_8px_18px_rgba(0,0,0,0.12)]",
  "max767:w-[54px] max767:h-[54px] max767:text-[22px]"
);

function Counter({ value, decimals, suffix, label, icon: iconClass }: (typeof counters)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / 1800, 1);
        setN(value * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <div className={box} ref={ref}>
      <i className={cx(iconClass, "absolute right-[-8px] bottom-[-14px] -z-[1] text-[86px] text-orange opacity-[0.08] [transition:opacity_0.35s_ease,color_0.35s_ease] group-hover/counter:text-white group-hover/counter:opacity-[0.18] max767:hidden")} aria-hidden />
      <span className={icon}><i className={iconClass} /></span>
      <span className="min-w-0">
        <strong className="block text-navy text-[34px] font-bold leading-[1.1] tabular-nums [transition:color_0.35s_ease] group-hover/counter:text-white max767:text-[28px]">
          {n.toFixed(decimals)}{suffix}
        </strong>
        <span className="block mt-[4px] text-body text-[15px] font-medium leading-[1.4] [transition:color_0.35s_ease] group-hover/counter:text-white/85 max767:text-[14px]">{label}</span>
      </span>
    </div>
  );
}

export default function Counters() {
  return (
    <section className="relative z-[2] mt-[-30px]">
      <div className="w-full max-w-[1232px] mx-auto px-[16px]">
        <div
          className={cx(
            "grid grid-cols-[repeat(4,minmax(0,1fr))] gap-[12px] max-w-[1200px] mx-auto p-[12px] rounded-[26px] bg-white [border:1px_solid_var(--color-line)]",
            "[box-shadow:0_20px_50px_rgba(16,26,44,0.1)] max1024:grid-cols-[repeat(2,minmax(0,1fr))] max767:gap-[8px] max767:p-[8px]"
          )}
        >
          {counters.map((c) => <Counter key={c.label} {...c} />)}
        </div>
      </div>
    </section>
  );
}
