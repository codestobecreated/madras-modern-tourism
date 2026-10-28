"use client";

import { useEffect, useRef, useState } from "react";
import { counters } from "./data";
import { cx } from "./ui";

const box = cx(
  "group/counter pt-[30px] px-[15px] pb-[30px] text-center",
  "not-first:[border-left:1px_solid_#dfdfdf]",
  // Two per row at ≤1024: no divider before the 3rd, a top rule on the second row.
  "max1024:nth-3:[border-left:0] max1024:nth-[n+3]:[border-top:1px_solid_#e8ebf1]"
);
const icon = cx(
  "inline-flex items-center justify-center w-[100px] h-[100px] mb-[10px] border border-[#dfdfdf] rounded-[50%]",
  "bg-white text-orange text-[38px] [transition:all_0.5s_ease]",
  "group-hover/counter:border-blue group-hover/counter:bg-blue group-hover/counter:text-white"
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
      <span className={icon}><i className={iconClass} /></span>
      <strong className="block text-navy text-[40px] font-bold leading-[1.1] max767:text-[30px]">{n.toFixed(decimals)}{suffix}</strong>
      <span className="block mt-[6px] text-[16px] font-medium [transition:color_0.5s_ease]">{label}</span>
    </div>
  );
}

export default function Counters() {
  return (
    <section className="relative z-[2] mt-[-30px]">
      <div className="w-full max-w-[1232px] mx-auto px-[16px]">
        <div
          className={cx(
            "grid grid-cols-[repeat(4,1fr)] max-w-[1200px] mx-auto overflow-hidden rounded-[30px] bg-white",
            "[box-shadow:0_4px_40px_rgba(0,0,0,0.15)] max1024:grid-cols-[repeat(2,1fr)]"
          )}
        >
          {counters.map((c) => <Counter key={c.label} {...c} />)}
        </div>
      </div>
    </section>
  );
}
