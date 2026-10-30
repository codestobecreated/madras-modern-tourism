"use client";

import { useMemo, useState } from "react";
import TourCard from "../../home/include/tour-card";
import { allTours, destinations, tourTypeList } from "../../home/include/catalog";
import { cx } from "../../home/include/ui";

type Sort = "default" | "price-asc" | "price-desc" | "rating";

const maxTourPrice = Math.max(...allTours.map((t) => t.price));
const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;
/** Day count from a duration like "5 Days - 4 Nights". */
const daysOf = (duration: string) => Number.parseInt(duration, 10) || 0;
// "Price on request" tours (price 0) sort after priced ones in both directions.
const sortPrice = (p: number, dir: 1 | -1) => (p > 0 ? p * dir : Number.POSITIVE_INFINITY);

const panelSection = "py-[22px] border-t border-solid border-line first:border-t-0 first:pt-0";
const sectionTitle = "mb-[14px] text-navy text-[15px] font-semibold uppercase tracking-[0.6px]";
const field =
  "w-full h-[46px] px-[16px] rounded-[10px] border border-solid border-line bg-soft text-[15px] text-navy outline-none [transition:border-color_0.2s_ease,background_0.2s_ease] focus:border-blue focus:bg-white";
const chip = (on: boolean) =>
  cx(
    "inline-flex items-center gap-[8px] px-[14px] py-[8px] rounded-[30px] border border-solid text-[14px] font-medium cursor-pointer [transition:all_0.2s_ease]",
    on ? "bg-blue border-blue text-white" : "bg-white border-line text-navy hover:border-blue hover:text-blue"
  );

// only offer destinations / types / lengths that actually have tours
const destOptions = destinations.filter((d) => allTours.some((t) => t.destination === d.slug));
const typeOptions = tourTypeList.filter((ty) => allTours.some((t) => t.type === ty.slug));
const dayOptions = [...new Set(allTours.map((t) => daysOf(t.duration)))].sort((a, b) => a - b);

function toggle<T>(list: T[], v: T) {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
}

/** Sidebar filters (search, destination, type, length, max price) with sort, active-filter chips and the 2-column grid. */
export default function FilterTours() {
  const [q, setQ] = useState("");
  const [dests, setDests] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [days, setDays] = useState<number[]>([]);
  const [maxPrice, setMaxPrice] = useState(maxTourPrice);
  const [sort, setSort] = useState<Sort>("default");
  const [showFilters, setShowFilters] = useState(false);

  const tours = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = allTours.filter(
      (t) =>
        (!term || `${t.title} ${t.text} ${t.location}`.toLowerCase().includes(term)) &&
        (dests.length === 0 || dests.includes(t.destination)) &&
        (types.length === 0 || types.includes(t.type)) &&
        (days.length === 0 || days.includes(daysOf(t.duration))) &&
        t.price <= maxPrice
    );
    if (sort === "price-asc") list.sort((a, b) => sortPrice(a.price, 1) - sortPrice(b.price, 1));
    if (sort === "price-desc") list.sort((a, b) => sortPrice(a.price, -1) - sortPrice(b.price, -1));
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [q, dests, types, days, maxPrice, sort]);

  const reset = () => {
    setQ("");
    setDests([]);
    setTypes([]);
    setDays([]);
    setMaxPrice(maxTourPrice);
    setSort("default");
  };

  // removable chips for everything currently narrowing the list
  const active = [
    ...(q.trim() ? [{ key: "q", label: `“${q.trim()}”`, clear: () => setQ("") }] : []),
    ...dests.map((s) => ({ key: `d-${s}`, label: destinations.find((d) => d.slug === s)?.name ?? s, clear: () => setDests(toggle(dests, s)) })),
    ...types.map((s) => ({ key: `t-${s}`, label: tourTypeList.find((t) => t.slug === s)?.title ?? s, clear: () => setTypes(toggle(types, s)) })),
    ...days.map((n) => ({ key: `n-${n}`, label: `${n} Days`, clear: () => setDays(toggle(days, n)) })),
    ...(maxPrice < maxTourPrice ? [{ key: "p", label: `Up to ${fmt(maxPrice)}`, clear: () => setMaxPrice(maxTourPrice) }] : []),
  ];
  const pricePct = (maxPrice / maxTourPrice) * 100;

  return (
    <div className="grid grid-cols-[310px_minmax(0,1fr)] gap-[30px] [align-items:start] max1024:grid-cols-1">
      <button
        type="button"
        onClick={() => setShowFilters(!showFilters)}
        aria-expanded={showFilters}
        className="hidden max1024:flex items-center justify-center gap-[10px] h-[48px] rounded-[12px] [border:1px_solid_var(--color-line)] bg-white text-navy font-semibold"
      >
        <i className="fa-solid fa-sliders text-blue" />
        {showFilters ? "Hide filters" : "Show filters"}
        {active.length > 0 && <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-[6px] rounded-[11px] bg-orange text-white text-[12px]">{active.length}</span>}
      </button>

      <aside
        className={cx(
          "sticky top-[110px] p-[24px] rounded-[18px] bg-white [border:1px_solid_var(--color-line)] [box-shadow:0_14px_40px_rgba(16,26,44,0.07)]",
          "max1024:static",
          !showFilters && "max1024:hidden"
        )}
      >
        <div className="flex items-center justify-between pb-[16px]">
          <h2 className="flex items-center gap-[10px] text-[20px] text-navy">
            <i className="fa-solid fa-sliders text-[16px] text-blue" /> Filters
            {active.length > 0 && <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-[6px] rounded-[11px] bg-orange text-white text-[12px]">{active.length}</span>}
          </h2>
          <button type="button" onClick={reset} disabled={active.length === 0} className="[border:0] bg-transparent text-[14px] font-semibold text-orange hover:text-blue disabled:text-body disabled:opacity-50">
            Reset
          </button>
        </div>

        <div className={panelSection}>
          <h3 className={sectionTitle}>Search</h3>
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute top-1/2 left-[16px] [transform:translateY(-50%)] text-[14px] text-body" />
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tour name or place" className={cx(field, "pl-[42px]")} aria-label="Search tours" />
          </div>
        </div>

        <div className={panelSection}>
          <h3 className={sectionTitle}>Destination</h3>
          <ul className="grid gap-[4px]">
            {destOptions.map((d) => {
              const on = dests.includes(d.slug);
              return (
                <li key={d.slug}>
                  <label className={cx("flex items-center gap-[12px] px-[10px] py-[8px] rounded-[10px] cursor-pointer text-[15px] [transition:background_0.2s_ease]", on ? "bg-[rgba(1,95,201,0.08)] text-blue font-semibold" : "text-navy hover:bg-soft")}>
                    <input type="checkbox" className="peer sr-only" checked={on} onChange={() => setDests(toggle(dests, d.slug))} />
                    <span className={cx("inline-flex shrink-0 items-center justify-center w-[20px] h-[20px] rounded-[6px] border-[1.5px] border-solid text-[11px] text-white peer-focus-visible:[outline:2px_solid_var(--color-blue)] peer-focus-visible:[outline-offset:2px]", on ? "bg-blue border-blue" : "bg-white border-[#c9d1dd]")}>
                      {on && <i className="fa-solid fa-check" />}
                    </span>
                    {d.name}
                    <span className={cx("ml-auto inline-flex items-center justify-center min-w-[26px] h-[22px] px-[7px] rounded-[11px] text-[12px] font-semibold", on ? "bg-blue text-white" : "bg-soft text-body")}>
                      {allTours.filter((t) => t.destination === d.slug).length}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={panelSection}>
          <h3 className={sectionTitle}>Tour Type</h3>
          <div className="flex flex-wrap gap-[8px]">
            {typeOptions.map((ty) => {
              const on = types.includes(ty.slug);
              return (
                <button type="button" key={ty.slug} aria-pressed={on} onClick={() => setTypes(toggle(types, ty.slug))} className={chip(on)}>
                  <i className={cx(ty.icon, on ? "text-white" : "text-orange")} />
                  {ty.title}
                </button>
              );
            })}
          </div>
        </div>

        <div className={panelSection}>
          <h3 className={sectionTitle}>Duration</h3>
          <div className="flex flex-wrap gap-[8px]">
            {dayOptions.map((n) => {
              const on = days.includes(n);
              return (
                <button type="button" key={n} aria-pressed={on} onClick={() => setDays(toggle(days, n))} className={chip(on)}>
                  <i className={cx("fa-regular fa-clock", on ? "text-white" : "text-orange")} />
                  {n} Days
                </button>
              );
            })}
          </div>
        </div>

        <div className={panelSection}>
          <div className="flex items-baseline justify-between mb-[14px]">
            <h3 className={cx(sectionTitle, "mb-0")}>Max Price</h3>
            <strong className="text-blue text-[16px]">{fmt(maxPrice)}</strong>
          </div>
          <input
            type="range"
            min={0}
            max={maxTourPrice}
            step={500}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-[6px] rounded-[3px] appearance-none cursor-pointer accent-blue"
            style={{ background: `linear-gradient(to right, var(--color-blue) ${pricePct}%, var(--color-line) ${pricePct}%)` }}
            aria-label="Maximum price"
          />
          <div className="mt-[10px] flex justify-between text-[13px] text-body">
            <span>{fmt(0)}</span>
            <span>{fmt(maxTourPrice)}</span>
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        <div className="mb-[24px] p-[14px_18px] rounded-[14px] bg-soft">
          <div className="flex flex-wrap items-center justify-between gap-[12px]">
            <p className="m-0 text-[15px] text-body">
              <strong className="text-navy text-[17px]">{tours.length}</strong> of {allTours.length} tours found
            </p>
            <label className="flex items-center gap-[10px] whitespace-nowrap text-[14px] text-body">
              Sort by
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className={cx(field, "w-[190px] h-[42px] bg-white")}>
                <option value="default">Recommended</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
            </label>
          </div>
          {active.length > 0 && (
            <div className="flex flex-wrap items-center gap-[8px] mt-[12px] pt-[12px] border-t border-solid border-line">
              {active.map((a) => (
                <button
                  type="button"
                  key={a.key}
                  onClick={a.clear}
                  aria-label={`Remove filter ${a.label}`}
                  className="inline-flex items-center gap-[8px] px-[12px] py-[5px] rounded-[30px] [border:1px_solid_var(--color-line)] bg-white text-navy text-[13px] font-medium hover:border-orange hover:text-orange"
                >
                  {a.label}
                  <i className="fa-solid fa-xmark text-[11px]" />
                </button>
              ))}
              <button type="button" onClick={reset} className="[border:0] bg-transparent text-[13px] font-semibold text-orange hover:text-blue">
                Clear all
              </button>
            </div>
          )}
        </div>

        {tours.length > 0 ? (
          <div className="grid grid-cols-2 gap-[30px] max767:grid-cols-1">
            {tours.map((t) => (
              <TourCard key={t.slug} tour={t} animate={false} />
            ))}
          </div>
        ) : (
          <div className="py-[60px] px-[20px] text-center rounded-[18px] [border:1px_dashed_#c9d1dd] bg-soft">
            <span className="inline-flex items-center justify-center w-[80px] h-[80px] rounded-[50%] bg-white text-blue text-[34px] [box-shadow:0_10px_25px_rgba(16,26,44,0.08)]">
              <i className="fa-solid fa-filter-circle-xmark" />
            </span>
            <h3 className="mt-[18px] text-[22px]">No tours match these filters</h3>
            <p className="mt-[6px] text-[15px]">Try removing a filter, or ask our planners to build a custom trip.</p>
            <button type="button" onClick={reset} className="mt-[20px] h-[44px] px-[24px] rounded-[30px] [border:0] bg-blue text-white font-semibold hover:bg-orange">
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
