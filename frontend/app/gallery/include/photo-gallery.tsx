"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { allTours, destinations } from "../../home/include/catalog";
import { MediaModal } from "../../home/include/tour-card-parts";
import { cx } from "../../home/include/ui";

type Photo = { src: string; destination: string; caption: string };

// Destination covers plus every package photo, each photo listed once.
const photos: Photo[] = (() => {
  const seen = new Set<string>();
  const list: Photo[] = [];
  const add = (p: Photo) => {
    if (seen.has(p.src)) return;
    seen.add(p.src);
    list.push(p);
  };
  destinations.forEach((d) => add({ src: d.image, destination: d.slug, caption: `${d.name}, ${d.country}` }));
  allTours.forEach((t) => t.gallery.forEach((src) => add({ src, destination: t.destination, caption: t.title })));
  return list;
})();

const filters = [{ slug: "all", name: "All" }, ...destinations.filter((d) => photos.some((p) => p.destination === d.slug))];

/** Filterable photo wall; a photo opens the lightbox on the current filter's photos. */
export default function PhotoGallery() {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<number | null>(null);
  const shown = filter === "all" ? photos : photos.filter((p) => p.destination === filter);

  return (
    <>
      <div className="mb-[30px] flex flex-wrap justify-center gap-[10px]" role="tablist" aria-label="Filter photos by destination">
        {filters.map((f) => {
          const on = f.slug === filter;
          const count = f.slug === "all" ? photos.length : photos.filter((p) => p.destination === f.slug).length;
          return (
            <button
              key={f.slug}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setFilter(f.slug)}
              className={cx(
                "inline-flex items-center gap-[8px] h-[42px] px-[18px] rounded-[30px] border border-solid text-[14px] font-semibold [transition:all_0.2s_ease]",
                on ? "bg-blue border-blue text-white" : "bg-white border-line text-navy hover:border-blue hover:text-blue"
              )}
            >
              {f.name}
              <span className={cx("inline-flex items-center justify-center min-w-[22px] h-[20px] px-[6px] rounded-[10px] text-[11px]", on ? "bg-white/20" : "bg-soft text-body")}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="columns-3 gap-[16px] max1024:columns-2 max767:columns-1">
        {shown.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Open photo: ${p.caption}`}
            className="group/photo relative block w-full mb-[16px] p-0 overflow-hidden rounded-[18px] [border:0] bg-[#ccc] [break-inside:avoid]"
          >
            <img src={p.src} alt={p.caption} loading="lazy" className={cx("block w-full object-cover [transition:transform_0.8s_ease] group-hover/photo:scale-[1.06]", i % 3 === 1 ? "h-[360px]" : "h-[260px]", "max767:h-[240px]")} />
            <span className="absolute inset-0 flex items-end p-[16px] bg-[linear-gradient(to_top,rgba(16,26,44,0.75),transparent_55%)] opacity-0 [transition:opacity_0.3s_ease] group-hover/photo:opacity-100 group-focus-visible/photo:opacity-100">
              <span className="flex w-full items-center justify-between gap-[10px] text-left text-white text-[14px] font-semibold">
                {p.caption}
                <i className="fa-solid fa-expand shrink-0" />
              </span>
            </span>
          </button>
        ))}
      </div>

      {open !== null && (
        <MediaModal title="Gallery" mode="gallery" images={shown.map((p) => p.src)} start={open} onClose={() => setOpen(null)} />
      )}
    </>
  );
}
