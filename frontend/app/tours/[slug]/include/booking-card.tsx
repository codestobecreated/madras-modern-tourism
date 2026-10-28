"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { priceFor, type TourDetail } from "../../../home/include/catalog";
import { btnBlue, btnMotion, cx } from "../../../home/include/ui";

const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const today = () => new Date().toISOString().slice(0, 10);

/** Sticky sidebar: pick a date and guests, then continue to /booking. */
export default function BookingCard({ tour: t }: { tour: TourDetail }) {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);
  // rate depends on group size for packages priced per number of travellers
  const each = priceFor(t, guests);

  const book = (e: React.FormEvent) => {
    e.preventDefault();
    const q = new URLSearchParams({ tour: t.slug, guests: String(guests) });
    if (date) q.set("date", date);
    router.push(`/booking?${q.toString()}`);
  };

  return (
    <aside className="sticky top-[110px] max1024:static">
      <form onSubmit={book} className="p-[30px] rounded-[12px] bg-white [box-shadow:0_10px_30px_rgba(0,0,0,0.1)]">
        <div className="pb-[20px] border-b border-solid border-line">
          <small className="block text-[14px]">From</small>
          <strong className="text-navy text-[30px] leading-[1.2]">{fmt(t.price)}</strong>
          {t.oldPrice && <del className="ml-[10px] text-[16px]">{fmt(t.oldPrice)}</del>}
          <span className="ml-[6px] text-[14px]">/ person</span>
        </div>
        <ul className="py-[20px] grid gap-[8px] text-[15px] font-medium border-b border-solid border-line">
          <li><i className="fa-solid fa-clock mr-[10px] text-orange" />{t.duration}</li>
          <li><i className="fa-solid fa-users mr-[10px] text-orange" />Group of {t.group}</li>
          <li><i className="fa-solid fa-location-dot mr-[10px] text-orange" />{t.location}</li>
        </ul>

        <label className="mt-[20px] block text-navy text-[15px] font-semibold" htmlFor="tour-date">Date</label>
        <input
          id="tour-date"
          type="date"
          min={today()}
          suppressHydrationWarning
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-[8px] w-full h-[48px] px-[16px] rounded-[8px] border border-solid border-line text-navy outline-none focus:border-blue"
        />

        <span className="mt-[20px] block text-navy text-[15px] font-semibold">Guests</span>
        <div className="mt-[8px] flex items-center justify-between h-[48px] px-[8px] rounded-[8px] border border-solid border-line">
          <button type="button" aria-label="Fewer guests" onClick={() => setGuests(Math.max(1, guests - 1))} className="w-[34px] h-[34px] rounded-[50%] [border:0] bg-soft text-navy hover:bg-blue hover:text-white">
            <i className="fa-solid fa-minus" />
          </button>
          <span className="text-navy font-semibold" aria-live="polite">{guests} {guests === 1 ? "guest" : "guests"}</span>
          <button type="button" aria-label="More guests" onClick={() => setGuests(Math.min(20, guests + 1))} className="w-[34px] h-[34px] rounded-[50%] [border:0] bg-soft text-navy hover:bg-blue hover:text-white">
            <i className="fa-solid fa-plus" />
          </button>
        </div>

        <div className="mt-[20px] flex justify-between text-[15px]">
          <span>{fmt(each)} × {guests}</span>
          <strong className="text-navy">{fmt(each * guests)}</strong>
        </div>

        <button type="submit" className={cx(btnBlue, btnMotion, "mt-[20px] w-full justify-center")}>
          Book Now <i className="fa-solid fa-arrow-right" />
        </button>
      </form>
    </aside>
  );
}
