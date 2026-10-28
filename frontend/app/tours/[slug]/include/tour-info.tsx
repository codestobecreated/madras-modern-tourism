import { Stars } from "../../../home/include/tour-card";
import type { RateTable, TourDetail } from "../../../home/include/catalog";
import { cx } from "../../../home/include/ui";

const h2 = "mb-[18px] text-[26px] leading-[1.3]";
const block = "mt-[45px]";

/** Overview, highlights, itinerary, rates, hotels, includes/excludes and policy notes for a tour. */
export default function TourInfo({ tour: t }: { tour: TourDetail }) {
  return (
    <div>
      <div className="mt-[35px] flex flex-wrap items-center gap-x-[25px] gap-y-[8px] text-[15px] font-medium">
        <span className="flex items-center gap-[6px]"><Stars rating={t.rating} />{t.rating} ({t.reviews} Reviews)</span>
        <span><i className="fa-solid fa-location-dot mr-[8px] text-orange" />{t.location}</span>
        <span><i className="fa-solid fa-clock mr-[8px] text-orange" />{t.duration}</span>
        <span><i className="fa-solid fa-users mr-[8px] text-orange" />{t.group} people</span>
      </div>

      <div className="mt-[35px]">
        <h2 className={h2}>Overview</h2>
        <p className="text-[16px] leading-[30px]">{t.overview}</p>
      </div>

      <div className={block}>
        <h2 className={h2}>Highlights</h2>
        <ul className="grid gap-[10px]">
          {t.highlights.map((h) => (
            <li key={h} className="flex items-start gap-[12px] text-[16px]">
              <i className="fa-solid fa-circle-check mt-[6px] text-orange" />{h}
            </li>
          ))}
        </ul>
      </div>

      <div className={block}>
        <h2 className={h2}>Itinerary</h2>
        <div className="grid gap-[12px]">
          {t.itinerary.map((d, i) => (
            <details key={d.day} open={i === 0} className="group rounded-[10px] border border-solid border-line bg-white">
              <summary className="flex cursor-pointer list-none items-center gap-[15px] p-[18px] [&::-webkit-details-marker]:hidden">
                <span className="shrink-0 px-[14px] py-[4px] rounded-[20px] bg-blue text-white text-[13px] font-semibold">{d.day}</span>
                <span className="text-navy text-[17px] font-semibold">{d.title}</span>
                <i className="fa-solid fa-chevron-down ml-auto text-[13px] text-body [transition:transform_0.25s_ease] group-open:[transform:rotate(180deg)]" />
              </summary>
              <ul className="grid gap-[6px] px-[18px] pb-[18px]">
                {d.points.map((p) => (
                  <li key={p} className="flex items-start gap-[10px] text-[15px] leading-[26px]">
                    <i className="fa-solid fa-circle text-[6px] mt-[11px] text-orange" />{p}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>

      {t.rates && t.rates.length > 0 && <Rates tables={t.rates} />}

      {t.hotels && t.hotels.length > 0 && (
        <div className={block}>
          <h2 className={h2}>Hotel options</h2>
          <ul className="grid gap-[10px]">
            {t.hotels.map((h) => (
              <li key={h} className="flex items-start gap-[12px] text-[16px]">
                <i className="fa-solid fa-hotel mt-[5px] text-blue" />{h}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={cx(block, "grid grid-cols-2 gap-[30px] max767:grid-cols-1")}>
        <div className="p-[25px] rounded-[10px] bg-soft">
          <h3 className="mb-[15px] text-[20px]">Included</h3>
          <ul className="grid gap-[8px]">
            {t.includes.map((x) => (
              <li key={x} className="flex items-start gap-[10px] text-[15px]"><i className="fa-solid fa-check mt-[6px] text-[#2a9d5c]" />{x}</li>
            ))}
          </ul>
        </div>
        <div className="p-[25px] rounded-[10px] bg-soft">
          <h3 className="mb-[15px] text-[20px]">Not included</h3>
          <ul className="grid gap-[8px]">
            {t.excludes.map((x) => (
              <li key={x} className="flex items-start gap-[10px] text-[15px]"><i className="fa-solid fa-xmark mt-[6px] text-[#e8484f]" />{x}</li>
            ))}
          </ul>
        </div>
      </div>

      {t.notes?.map((n) => (
        <div key={n.title} className={block}>
          <h2 className={h2}>{n.title}</h2>
          <ul className="grid gap-[8px]">
            {n.items.map((x) => (
              <li key={x} className="flex items-start gap-[10px] text-[15px] leading-[26px]">
                <i className="fa-solid fa-circle-info mt-[6px] text-blue" />{x}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/**
 * Per-person rates by group size. One table: simple two-column list.
 * Several tables (one per hotel): a grid with group sizes as columns.
 */
function Rates({ tables }: { tables: RateTable[] }) {
  const sizes = [...new Set(tables.flatMap((t) => t.rows.map((r) => r.pax)))].sort((a, b) => a - b);
  // column heading: the row label when the rates are per room sharing ("Double sharing"), else "N Pax"
  const paxLabel = (n: number) => tables.flatMap((t) => t.rows).find((r) => r.pax === n && r.label)?.label ?? `${n} Pax`;
  const cell = "px-[14px] py-[12px] border-b border-solid border-line text-[15px]";
  return (
    <div className={block}>
      <h2 className={h2}>Package rates</h2>
      <p className="mb-[16px] text-[14px]">Per person, in INR{tables.some((t) => t.rows.some((r) => r.label)) ? ", by room sharing" : ", by number of travellers"}.{tables.length === 1 && tables[0].note ? ` ${tables[0].note}.` : ""}</p>
      <div className="overflow-x-auto rounded-[10px] border border-solid border-line">
        <table className="w-full min-w-[480px] border-collapse bg-white text-left">
          <thead className="bg-soft text-navy">
            <tr>
              <th className={cx(cell, "font-semibold")}>{tables.length > 1 ? "Hotel" : "Travellers"}</th>
              {tables.length > 1
                ? sizes.map((s) => <th key={s} className={cx(cell, "font-semibold text-right")}>{paxLabel(s)}</th>)
                : <th className={cx(cell, "font-semibold text-right")}>Rate / person</th>}
            </tr>
          </thead>
          <tbody>
            {tables.length > 1
              ? tables.map((t) => (
                  <tr key={t.title}>
                    <td className={cell}>
                      <span className="block text-navy font-semibold">{t.title}</span>
                      {t.note && <span className="text-[13px]">{t.note}</span>}
                    </td>
                    {sizes.map((s) => {
                      const row = t.rows.find((r) => r.pax === s);
                      return <td key={s} className={cx(cell, "text-right whitespace-nowrap")}>{row ? fmt(row.price) : "–"}</td>;
                    })}
                  </tr>
                ))
              : tables[0].rows.map((r) => (
                  <tr key={r.pax}>
                    <td className={cell}>{r.label ?? `${String(r.pax).padStart(2, "0")} Pax`}</td>
                    <td className={cx(cell, "text-right text-navy font-semibold")}>{fmt(r.price)}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
