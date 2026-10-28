"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BACKEND_BASE } from "./data";
import { destinations, tourTypeList } from "./catalog";
import { container, cx } from "./ui";

const shadow = "[box-shadow:0_20px_50px_rgba(16,26,44,0.08)]";
const option = "block w-full [border:0] [background:none] text-left py-[8px]";

type Loc = { id: number; name: string; slug: string; children?: Loc[] };
type TripType = { id: number; name: string; slug: string };
type Option = { label: string; value: string; child?: boolean };

const durations: Option[] = [
  { label: "0 Days - 3 Days", value: "0-3" },
  { label: "4 Days - 7 Days", value: "4-7" },
  { label: "8+ Days", value: "8-30" },
];

const prices: Option[] = [
  { label: "₹999 - ₹4,999", value: "999-4999" },
  { label: "₹5,000 - ₹9,999", value: "5000-9999" },
  { label: "₹10,000+", value: "10000-100000" },
];

type FieldKey = "location" | "type" | "duration" | "price";

export default function TripSearch() {
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState<FieldKey | null>(null);
  // Catalogue options until the backend answers (it replaces them when it has data).
  const [locations, setLocations] = useState<Option[]>(destinations.map((d) => ({ label: d.name, value: d.slug })));
  const [types, setTypes] = useState<Option[]>(tourTypeList.map((t) => ({ label: t.title, value: t.slug })));
  const [values, setValues] = useState<Record<FieldKey, Option | null>>({
    location: null,
    type: null,
    duration: durations[0],
    price: null,
  });

  useEffect(() => {
    fetch(`${BACKEND_BASE}/api/hero-filters/`)
      .then((r) => r.json())
      .then((data: { locations?: Loc[]; trip_types?: TripType[] }) => {
        if (data.locations?.length)
          setLocations(
            data.locations.flatMap((loc) => [
              { label: loc.name, value: loc.slug },
              ...(loc.children ?? []).map((c) => ({ label: c.name, value: c.slug, child: true })),
            ])
          );
        if (data.trip_types?.length) setTypes(data.trip_types.map((t) => ({ label: t.name, value: t.slug })));
      })
      .catch(() => {
        // Backend offline: the fields still work with no options.
      });
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const fields: { key: FieldKey; label: string; placeholder: string; icon: string; options: Option[] }[] = [
    { key: "location", label: "Location", placeholder: "Where to Next?", icon: "fa-solid fa-location-dot", options: locations },
    { key: "type", label: "Type", placeholder: "Trip Type", icon: "fa-solid fa-person-hiking", options: types },
    { key: "duration", label: "Duration", placeholder: "Any Duration", icon: "fa-regular fa-calendar", options: durations },
    { key: "price", label: "Price", placeholder: "Any Budget", icon: "fa-solid fa-wallet", options: prices },
  ];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    (Object.keys(values) as FieldKey[]).forEach((k) => {
      const v = values[k];
      // the tours page filters by `destination`
      if (v) params.set(k === "location" ? "destination" : k, v.value);
    });
    router.push(`/tours-page?${params.toString()}`);
  };

  return (
    <div className="relative z-[5] mt-[-50px]">
      <div className={container}>
        <form ref={ref} className={cx(
            "grid grid-cols-[repeat(4,1fr)_170px] bg-white rounded-[14px]",
            shadow,
            "max1024:grid-cols-[1fr_1fr] max767:grid-cols-[1fr]"
          )}
          onSubmit={submit}>
          {fields.map((f, i) => (
            <div
              key={f.key}
              className={cx(
                "relative flex items-center justify-between gap-[12px] py-[26px] px-[28px] border-r border-r-line cursor-pointer",
                // 2x2 grid at ≤1024 (top row ruled below, right column unruled), one column at ≤767.
                i === 1 ? "max1024:[border-right:0]" : "max767:[border-right:0]",
                i < 2 ? "max1024:border-b max1024:border-b-line" : "max767:border-b max767:border-b-line"
              )}
              role="button"
              tabIndex={0}
              aria-expanded={open === f.key}
              onClick={() => setOpen(open === f.key ? null : f.key)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpen(open === f.key ? null : f.key);
                }
              }}
            >
              <div>
                <label className="block text-body text-[13px] font-medium leading-[1.3] cursor-pointer">{f.label}</label>
                <strong className="block text-navy text-[16px] font-semibold leading-[1.5] whitespace-nowrap">{values[f.key]?.label ?? f.placeholder}</strong>
              </div>
              <i className={cx(f.icon, "text-orange text-[20px]")} />
              {open === f.key && (
                <div className={cx(
                    "absolute top-[calc(100%+8px)] left-0 right-0 z-10 max-h-[280px] overflow-y-auto py-[10px] bg-white rounded-[12px]",
                    shadow
                  )} onClick={(e) => e.stopPropagation()}>
                  {f.options.length === 0 && <button type="button" className={cx(option, "px-[22px] text-navy text-[15px] hover:text-orange")} disabled>No options yet</button>}
                  {f.options.map((o) => (
                    <button
                      type="button"
                      key={o.value}
                      className={cx(
                        option,
                        o.child ? "pr-[22px] pl-[38px] text-[14px]" : "px-[22px] text-[15px]",
                        values[f.key]?.value === o.value ? "text-orange" : "text-navy hover:text-orange"
                      )}
                      onClick={() => {
                        setValues((v) => ({ ...v, [f.key]: o }));
                        setOpen(null);
                      }}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button type="submit" className={cx(
              "flex items-center justify-center gap-[10px] [border:0] rounded-[0_14px_14px_0] bg-orange text-white text-[17px] font-semibold [transition:background_0.25s_ease] hover:bg-blue hover:!text-white",
              "max1024:[grid-column:span_2] max1024:p-[20px] max1024:rounded-[0_0_14px_14px] max767:[grid-column:auto]"
            )}>
            <i className="fa-solid fa-magnifying-glass" /> Search
          </button>
        </form>
      </div>
    </div>
  );
}
