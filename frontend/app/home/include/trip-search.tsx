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
        <form
          ref={ref}
          className={cx(
            "grid grid-cols-[repeat(4,minmax(0,1fr))_170px] gap-[10px] p-[10px] bg-white rounded-[18px] [border:1px_solid_var(--color-line)]",
            shadow,
            "max1024:grid-cols-[1fr_1fr] max767:grid-cols-[1fr] max767:gap-[8px] max767:p-[8px]"
          )}
          onSubmit={submit}
        >
          {fields.map((f) => {
            const active = open === f.key;
            const picked = values[f.key];
            return (
              <div
                key={f.key}
                className={cx(
                  "group/field relative flex items-center gap-[14px] min-w-0 py-[16px] px-[16px] rounded-[12px] cursor-pointer [border:1px_solid_transparent] [transition:background_0.25s_ease,border-color_0.25s_ease,box-shadow_0.25s_ease]",
                  active
                    ? "bg-white !border-blue [box-shadow:0_0_0_3px_rgba(1,95,201,0.12)]"
                    : "bg-soft hover:bg-white hover:!border-line hover:[box-shadow:0_8px_20px_rgba(16,26,44,0.06)]"
                )}
                role="button"
                tabIndex={0}
                aria-expanded={active}
                onClick={() => setOpen(active ? null : f.key)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpen(active ? null : f.key);
                  }
                }}
              >
                <span
                  className={cx(
                    "inline-flex shrink-0 items-center justify-center w-[44px] h-[44px] rounded-[50%] text-[18px] [transition:background_0.25s_ease,color_0.25s_ease]",
                    active ? "bg-blue text-white" : "bg-[rgba(1,95,201,0.1)] text-blue group-hover/field:bg-blue group-hover/field:text-white"
                  )}
                >
                  <i className={f.icon} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block mb-[2px] text-blue text-[12px] font-semibold leading-[1.3] tracking-[0.6px] uppercase">{f.label}</span>
                  <strong className={cx("block overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-semibold leading-[1.5]", picked ? "text-navy" : "text-body")}>
                    {picked?.label ?? f.placeholder}
                  </strong>
                </span>
                <i className={cx("fa-solid fa-chevron-down shrink-0 text-[12px] text-body [transition:transform_0.25s_ease]", active && "[transform:rotate(180deg)] text-blue")} />
                {active && (
                  <div
                    className={cx(
                      "absolute top-[calc(100%+10px)] left-0 right-0 z-10 min-w-[220px] max-h-[280px] overflow-y-auto p-[6px] bg-white rounded-[12px] [border:1px_solid_var(--color-line)]",
                      shadow
                    )}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {f.options.length === 0 && <button type="button" className={cx(option, "px-[14px] text-body text-[15px]")} disabled>No options yet</button>}
                    {f.options.map((o) => {
                      const selected = picked?.value === o.value;
                      return (
                        <button
                          type="button"
                          key={o.value}
                          className={cx(
                            option,
                            "flex items-center justify-between gap-[10px] rounded-[8px] [transition:background_0.2s_ease,color_0.2s_ease]",
                            o.child ? "pr-[14px] pl-[30px] text-[14px]" : "px-[14px] text-[15px]",
                            selected ? "bg-[rgba(1,95,201,0.08)] text-blue font-semibold" : "text-navy hover:bg-soft hover:text-blue"
                          )}
                          onClick={() => {
                            setValues((v) => ({ ...v, [f.key]: o }));
                            setOpen(null);
                          }}
                        >
                          {o.label}
                          {selected && <i className="fa-solid fa-check text-[12px]" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          <button
            type="submit"
            className={cx(
              "flex items-center justify-center gap-[10px] [border:0] rounded-[12px] bg-blue text-white text-[17px] font-semibold [box-shadow:0_10px_20px_rgba(1,95,201,0.25)] [transition:background_0.25s_ease,transform_0.25s_ease] hover:bg-orange hover:!text-white hover:[transform:translateY(-2px)]",
              "max1024:[grid-column:span_2] max1024:py-[16px] max767:[grid-column:auto]"
            )}
          >
            <i className="fa-solid fa-magnifying-glass" /> Search
          </button>
        </form>
      </div>
    </div>
  );
}
