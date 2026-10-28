"use client";

import { useMemo, useState } from "react";
import TourCard from "../../home/include/tour-card";
import { allTours, destinations, tourTypeList } from "../../home/include/catalog";
import { cx } from "../../home/include/ui";

type Sort = "default" | "price-asc" | "price-desc" | "rating";

const maxTourPrice = Math.max(...allTours.map((t) => t.price));
const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const box = "mb-[30px] p-[25px] rounded-[10px] bg-soft";
const boxTitle = "mb-[15px] text-[18px] text-navy";
const field = "w-full h-[48px] px-[16px] rounded-[8px] border border-solid border-line bg-white text-[15px] text-navy outline-none focus:border-blue";

// only offer destinations / types that actually have tours
const destOptions = destinations.filter((d) => allTours.some((t) => t.destination === d.slug));
const typeOptions = tourTypeList.filter((ty) => allTours.some((t) => t.type === ty.slug));

function toggle(list: string[], v: string) {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
}

/** Sidebar filters (search, destination, type, max price, sort) and the filtered 2-column grid. */
export default function FilterTours() {
  const [q, setQ] = useState("");
  const [dests, setDests] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(maxTourPrice);
  const [sort, setSort] = useState<Sort>("default");

  const tours = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = allTours.filter(
      (t) =>
        (!term || `${t.title} ${t.text} ${t.location}`.toLowerCase().includes(term)) &&
        (dests.length === 0 || dests.includes(t.destination)) &&
        (types.length === 0 || types.includes(t.type)) &&
        t.price <= maxPrice
    );
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [q, dests, types, maxPrice, sort]);

  const reset = () => {
    setQ("");
    setDests([]);
    setTypes([]);
    setMaxPrice(maxTourPrice);
    setSort("default");
  };

  return (
    <div className="grid grid-cols-[300px_1fr] gap-[30px] max1024:grid-cols-1">
      <aside>
        <div className={box}>
          <h3 className={boxTitle}>Search</h3>
          <div className="relative">
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tour name or place" className={cx(field, "pr-[44px]")} aria-label="Search tours" />
            <i className="fa-solid fa-magnifying-glass absolute top-1/2 right-[16px] [transform:translateY(-50%)] text-body" />
          </div>
        </div>

        <div className={box}>
          <h3 className={boxTitle}>Destination</h3>
          <ul className="grid gap-[8px]">
            {destOptions.map((d) => (
              <li key={d.slug}>
                <label className="flex items-center gap-[10px] cursor-pointer text-[15px]">
                  <input type="checkbox" className="w-[16px] h-[16px] accent-blue" checked={dests.includes(d.slug)} onChange={() => setDests(toggle(dests, d.slug))} />
                  {d.name}
                  <span className="ml-auto text-[13px]">({allTours.filter((t) => t.destination === d.slug).length})</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className={box}>
          <h3 className={boxTitle}>Tour Type</h3>
          <ul className="grid gap-[8px]">
            {typeOptions.map((ty) => (
              <li key={ty.slug}>
                <label className="flex items-center gap-[10px] cursor-pointer text-[15px]">
                  <input type="checkbox" className="w-[16px] h-[16px] accent-blue" checked={types.includes(ty.slug)} onChange={() => setTypes(toggle(types, ty.slug))} />
                  <i className={cx(ty.icon, "w-[18px] text-orange")} />
                  {ty.title}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className={box}>
          <h3 className={boxTitle}>Max Price</h3>
          <input type="range" min={0} max={maxTourPrice} step={100} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-blue" aria-label="Maximum price" />
          <div className="mt-[8px] flex justify-between text-[14px]">
            <span>{fmt(0)}</span>
            <strong className="text-navy">Up to {fmt(maxPrice)}</strong>
          </div>
        </div>

        <button type="button" onClick={reset} className="w-full h-[48px] rounded-[30px] [border:0] bg-blue text-white font-bold hover:bg-orange hover:text-white">
          Reset filters
        </button>
      </aside>

      <div>
        <div className="mb-[30px] flex flex-wrap items-center justify-between gap-[15px]">
          <p className="text-[15px] font-medium text-navy">
            Showing {tours.length} of {allTours.length} tours
          </p>
          <label className="flex items-center gap-[10px] text-[15px]">
            Sort by
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className={cx(field, "w-[200px] h-[42px]")}>
              <option value="default">Recommended</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="rating">Top rated</option>
            </select>
          </label>
        </div>

        {tours.length > 0 ? (
          <div className="grid grid-cols-2 gap-[30px] max767:grid-cols-1">
            {tours.map((t) => (
              <TourCard key={t.slug} tour={t} animate={false} />
            ))}
          </div>
        ) : (
          <div className="py-[60px] text-center rounded-[10px] bg-soft">
            <i className="fa-solid fa-filter-circle-xmark text-[44px] text-blue" />
            <h3 className="mt-[16px] text-[22px]">No tours match these filters</h3>
            <button type="button" onClick={reset} className="mt-[20px] text-orange font-semibold [border:0] bg-transparent hover:text-blue">
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
