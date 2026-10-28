"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { cx } from "../../../home/include/ui";

/** Main photo with clickable thumbnails underneath. */
export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="h-[460px] overflow-hidden rounded-[12px] bg-[#ccc] max767:h-[260px]">
        <img src={images[active]} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="mt-[15px] grid grid-cols-4 gap-[15px] max767:gap-[8px]">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show photo ${i + 1}`}
            aria-pressed={i === active}
            className={cx(
              "h-[90px] overflow-hidden rounded-[8px] p-0 border-2 border-solid max767:h-[60px]",
              i === active ? "border-orange" : "border-transparent opacity-70 hover:opacity-100"
            )}
          >
            <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
