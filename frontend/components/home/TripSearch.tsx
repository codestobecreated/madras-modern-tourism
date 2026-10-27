"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BACKEND_BASE } from "./data";

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
  const [locations, setLocations] = useState<Option[]>([]);
  const [types, setTypes] = useState<Option[]>([]);
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
        setLocations(
          (data.locations ?? []).flatMap((loc) => [
            { label: loc.name, value: loc.slug },
            ...(loc.children ?? []).map((c) => ({ label: c.name, value: c.slug, child: true })),
          ])
        );
        setTypes((data.trip_types ?? []).map((t) => ({ label: t.name, value: t.slug })));
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
      if (v) params.set(k, v.value);
    });
    router.push(`/tours-page?${params.toString()}`);
  };

  return (
    <div className="mmt-search-wrap">
      <div className="mmt-container">
        <form ref={ref} className="mmt-search" onSubmit={submit}>
          {fields.map((f) => (
            <div
              key={f.key}
              className="mmt-search-field"
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
                <label>{f.label}</label>
                <strong>{values[f.key]?.label ?? f.placeholder}</strong>
              </div>
              <i className={f.icon} />
              {open === f.key && (
                <div className="mmt-dropdown" onClick={(e) => e.stopPropagation()}>
                  {f.options.length === 0 && <button type="button" disabled>No options yet</button>}
                  {f.options.map((o) => (
                    <button
                      type="button"
                      key={o.value}
                      className={`${o.child ? "child " : ""}${values[f.key]?.value === o.value ? "selected" : ""}`}
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
          <button type="submit" className="mmt-search-submit">
            <i className="fa-solid fa-magnifying-glass" /> Search
          </button>
        </form>
      </div>
    </div>
  );
}
