"use client";

import { useState } from "react";
import Link from "next/link";
import { priceFor, type TourDetail } from "../../home/include/catalog";
import { btn, btnBlue, btnMotion, cx } from "../../home/include/ui";
import OrderSummary, { fmtDate, fmtPrice } from "./order-summary";

type Fields = { name: string; email: string; phone: string; date: string; guests: number; notes: string };
type Errors = Partial<Record<keyof Fields, string>>;

const label = "block mb-[8px] text-navy text-[15px] font-semibold";
const input = "w-full h-[50px] px-[16px] rounded-[8px] border border-solid bg-white text-[15px] text-navy outline-none focus:border-blue";
const errText = "mt-[6px] text-[13px] text-[#e8484f]";

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (f.phone.replace(/\D/g, "").length < 10) e.phone = "Please enter a phone number with at least 10 digits.";
  if (!f.date) e.date = "Please pick a travel date.";
  if (!(f.guests >= 1 && f.guests <= 20)) e.guests = "Guests must be between 1 and 20.";
  return e;
}

/** Traveller details form + order summary; on submit shows a dummy confirmation (no backend call). */
export default function BookingForm({ tour, initialDate, initialGuests }: { tour: TourDetail; initialDate: string; initialGuests: number }) {
  const [f, setF] = useState<Fields>({ name: "", email: "", phone: "", date: initialDate, guests: initialGuests, notes: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [reference, setReference] = useState<string | null>(null);

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    setF((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(f);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setReference(`MMT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fieldClass = (k: keyof Fields) => cx(input, errors[k] ? "border-[#e8484f]" : "border-line");

  if (reference) {
    return (
      <div className="max-w-[720px] mx-auto text-center">
        <span className="inline-flex items-center justify-center w-[80px] h-[80px] rounded-[50%] bg-[#e6f6ec] text-[#2a9d5c] text-[36px]">
          <i className="fa-solid fa-check" />
        </span>
        <h2 className="mt-[20px] text-[32px] leading-[1.25]">Booking confirmed!</h2>
        <p className="mt-[10px] text-[16px]">
          Thanks, {f.name.trim().split(" ")[0]}. A confirmation has been sent to <strong className="text-navy">{f.email}</strong>.
        </p>
        <p className="mt-[20px] inline-block px-[20px] py-[8px] rounded-[30px] bg-soft text-navy text-[15px]">
          Booking reference: <strong>{reference}</strong>
        </p>
        <div className="mt-[30px] p-[25px] rounded-[12px] border border-solid border-line text-left">
          {[
            ["Tour", tour.title],
            ["Date", fmtDate(f.date)],
            ["Guests", String(f.guests)],
            ["Lead traveller", f.name],
            ["Phone", f.phone],
            ["Total", fmtPrice(priceFor(tour, f.guests) * f.guests)],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-[15px] py-[8px] text-[15px] border-b border-solid border-line last:border-b-0">
              <span>{k}</span>
              <strong className="text-navy text-right">{v}</strong>
            </div>
          ))}
          {f.notes.trim() && <p className="mt-[12px] text-[14px]"><strong className="text-navy">Special requests:</strong> {f.notes}</p>}
        </div>
        <div className="mt-[30px] flex flex-wrap justify-center gap-[15px]">
          <Link href="/" className={btnBlue}>Back to home</Link>
          <Link href="/tours-page" className={btn}>Browse more tours</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[1fr_370px] gap-[40px] items-start max1024:grid-cols-1">
      <form onSubmit={submit} noValidate className="p-[35px] rounded-[12px] bg-soft max767:p-[22px]">
        <h2 className="text-[26px] leading-[1.3]">Traveller details</h2>
        <p className="mt-[6px] mb-[25px] text-[15px]">
          Booking <Link href={`/tours/${tour.slug}`} className="text-orange font-semibold hover:text-blue">{tour.title}</Link>. Fields marked * are required.
        </p>

        <div className="grid grid-cols-2 gap-[20px] max767:grid-cols-1">
          <div className="col-span-2 max767:col-span-1">
            <label className={label} htmlFor="b-name">Full name *</label>
            <input id="b-name" className={fieldClass("name")} value={f.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" aria-invalid={!!errors.name} />
            {errors.name && <p className={errText}>{errors.name}</p>}
          </div>
          <div>
            <label className={label} htmlFor="b-email">Email *</label>
            <input id="b-email" type="email" className={fieldClass("email")} value={f.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" aria-invalid={!!errors.email} />
            {errors.email && <p className={errText}>{errors.email}</p>}
          </div>
          <div>
            <label className={label} htmlFor="b-phone">Phone *</label>
            <input id="b-phone" type="tel" className={fieldClass("phone")} value={f.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" aria-invalid={!!errors.phone} />
            {errors.phone && <p className={errText}>{errors.phone}</p>}
          </div>
          <div>
            <label className={label} htmlFor="b-date">Travel date *</label>
            <input id="b-date" type="date" className={fieldClass("date")} value={f.date} onChange={(e) => set("date", e.target.value)} aria-invalid={!!errors.date} />
            {errors.date && <p className={errText}>{errors.date}</p>}
          </div>
          <div>
            <label className={label} htmlFor="b-guests">Guests *</label>
            <input
              id="b-guests"
              type="number"
              min={1}
              max={20}
              className={fieldClass("guests")}
              value={f.guests}
              onChange={(e) => set("guests", Number(e.target.value))}
              aria-invalid={!!errors.guests}
            />
            {errors.guests && <p className={errText}>{errors.guests}</p>}
          </div>
          <div className="col-span-2 max767:col-span-1">
            <label className={label} htmlFor="b-notes">Special requests</label>
            <textarea
              id="b-notes"
              rows={4}
              className={cx(input, "h-auto py-[12px] border-line resize-y")}
              value={f.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Dietary needs, pick-up location, accessibility…"
            />
          </div>
        </div>

        <button type="submit" className={cx(btnBlue, btnMotion, "mt-[25px]")}>
          Confirm booking <i className="fa-solid fa-arrow-right" />
        </button>
      </form>

      <aside className="sticky top-[110px] max1024:static">
        <OrderSummary tour={tour} date={f.date} guests={f.guests >= 1 ? f.guests : 1} />
      </aside>
    </div>
  );
}
