"use client";

import { useState } from "react";
import { cx } from "./ui";
import type { Tour } from "./data";

export function WishButton() {
  const [on, setOn] = useState(false);
  return (
    <button
      className={cx(
        "absolute top-[14px] right-[14px] w-[36px] h-[36px] [border:0] rounded-[50%] bg-white hover:text-[#e8484f]",
        on ? "text-[#e8484f]" : "text-navy"
      )}
      aria-label="Add to wishlist"
      aria-pressed={on}
      onClick={() => setOn(!on)}
    >
      <i className={on ? "fa-solid fa-heart" : "fa-regular fa-heart"} />
    </button>
  );
}

export function TourPrice({ tour }: { tour: Tour }) {
  const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;
  return (
    <div className="leading-[1.2]">
      {tour.badge ? (
        <span className="table mb-[1px] px-[8px] py-[3px] rounded-[10px] bg-orange text-white text-[10px] font-medium leading-[10px]">{tour.badge}</span>
      ) : (
        <small className="block mb-[1px] text-[14px] leading-[14px]">From</small>
      )}
      <strong className="inline-block text-navy text-[22px] font-bold leading-[22px]">{fmt(tour.price)}</strong>
      {tour.oldPrice && <del className="ml-[8px] text-[16px] font-medium leading-[16px]">{fmt(tour.oldPrice)}</del>}
    </div>
  );
}
