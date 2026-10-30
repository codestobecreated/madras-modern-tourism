"use client";

import { useState } from "react";
import Link from "next/link";
import { allTours, destinations, priceFor } from "../../home/include/catalog";
import { contact } from "../../home/include/data";
import { btnBlue, btnMotion, cx } from "../../home/include/ui";

type Fields = {
  destination: string;
  tour: string;
  date: string;
  flexible: boolean;
  hotel: string;
  adults: number;
  children: number;
  rooms: number;
  name: string;
  phone: string;
  email: string;
  city: string;
  notes: string;
};
type Errors = Partial<Record<keyof Fields, string>>;

const hotels = ["3 Star", "4 Star", "5 Star", "Not sure"];
const empty: Fields = {
  destination: "", tour: "", date: "", flexible: false, hotel: "3 Star",
  adults: 2, children: 0, rooms: 1, name: "", phone: "", email: "", city: "", notes: "",
};

const card = "p-[28px] rounded-[20px] bg-white [border:1px_solid_var(--color-line)] [box-shadow:0_14px_40px_rgba(16,26,44,0.06)] max767:p-[18px]";
const label = "block mb-[8px] text-navy text-[14px] font-semibold";
const input = "w-full h-[50px] px-[16px] rounded-[10px] border border-solid bg-soft text-[15px] text-navy outline-none [transition:border-color_0.2s_ease,background_0.2s_ease] focus:bg-white focus:border-blue";
const errText = "mt-[6px] text-[13px] text-[#e8484f]";
const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const today = () => new Date().toISOString().slice(0, 10);

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.destination) e.destination = "Please choose a destination.";
  if (!f.date && !f.flexible) e.date = "Pick a travel date, or tick “My dates are flexible”.";
  if (!f.name.trim()) e.name = "Please enter your full name.";
  if (f.phone.replace(/\D/g, "").length < 10) e.phone = "Please enter a phone number with at least 10 digits.";
  if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = "Please enter a valid email address.";
  return e;
}

export function StepTitle({ n, title, text }: { n: number; title: string; text: string }) {
  return (
    <div className="flex items-start gap-[14px] mb-[22px]">
      <span className="inline-flex shrink-0 items-center justify-center w-[38px] h-[38px] rounded-[12px] bg-orange text-white text-[16px] font-bold">{n}</span>
      <div>
        <h2 className="text-[20px] leading-[1.3]">{title}</h2>
        <p className="m-0 text-[14px]">{text}</p>
      </div>
    </div>
  );
}

export function Stepper({ label: text, hint, value, min, max, onChange }: { label: string; hint: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  const btnCls = "w-[36px] h-[36px] rounded-[50%] [border:0] bg-white text-navy [box-shadow:0_2px_6px_rgba(16,26,44,0.08)] hover:bg-blue hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-navy";
  return (
    <div className="flex items-center justify-between gap-[12px] p-[12px_14px] rounded-[12px] bg-soft">
      <div>
        <strong className="block text-navy text-[15px]">{text}</strong>
        <span className="text-[12px]">{hint}</span>
      </div>
      <div className="flex items-center gap-[12px]">
        <button type="button" className={btnCls} aria-label={`Fewer ${text.toLowerCase()}`} disabled={value <= min} onClick={() => onChange(value - 1)}>
          <i className="fa-solid fa-minus text-[12px]" />
        </button>
        <span className="w-[22px] text-center text-navy font-bold" aria-live="polite">{value}</span>
        <button type="button" className={btnCls} aria-label={`More ${text.toLowerCase()}`} disabled={value >= max} onClick={() => onChange(value + 1)}>
          <i className="fa-solid fa-plus text-[12px]" />
        </button>
      </div>
    </div>
  );
}

/**
 * Standalone booking request: trip, travellers and contact details with a live summary.
 * Submitting shows a confirmation with a reference only — nothing is sent anywhere yet.
 */
export default function BookNowForm() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [reference, setReference] = useState<string | null>(null);

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    setF((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const packages = allTours.filter((t) => t.destination === f.destination);
  const tour = allTours.find((t) => t.slug === f.tour);
  const destName = destinations.find((d) => d.slug === f.destination)?.name ?? (f.destination === "other" ? "Other / custom trip" : "");
  const each = tour ? priceFor(tour, f.adults) : 0;
  const fieldClass = (k: keyof Fields) => cx(input, errors[k] ? "border-[#e8484f]" : "border-line");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(f);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(`bn-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setReference(`MMT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (reference) {
    return (
      <div className={cx(card, "max-w-[720px] mx-auto text-center py-[46px]")}>
        <span className="inline-flex items-center justify-center w-[80px] h-[80px] rounded-[50%] bg-[#e6f6ec] text-[#2a9d5c] text-[36px]">
          <i className="fa-solid fa-check" />
        </span>
        <h2 className="mt-[20px] text-[30px] leading-[1.25]">Booking request received!</h2>
        <p className="mt-[10px] text-[16px]">
          Thanks, {f.name.trim().split(" ")[0]}. Our travel planner will call you on <strong className="text-navy">{f.phone}</strong> to confirm your {destName} trip.
        </p>
        <p className="mt-[18px] inline-block px-[20px] py-[8px] rounded-[30px] bg-soft text-navy text-[15px]">
          Request reference: <strong>{reference}</strong>
        </p>
        <div className="mt-[28px] flex flex-wrap justify-center gap-[12px]">
          <Link href="/tours-page" className={cx(btnBlue, btnMotion)}>Browse more tours</Link>
          <button type="button" onClick={() => { setF(empty); setReference(null); }} className="inline-flex items-center px-[28px] rounded-[30px] border border-solid border-line bg-white text-navy font-semibold hover:text-orange">
            New request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit} className="grid grid-cols-[minmax(0,1fr)_360px] gap-[30px] [align-items:start] max1024:grid-cols-1">
      <div className="grid gap-[24px]">
        <section className={card}>
          <StepTitle n={1} title="Trip details" text="Where and when would you like to go?" />
          <div className="grid grid-cols-2 gap-[18px] max767:grid-cols-1">
            <div>
              <label className={label} htmlFor="bn-destination">Destination *</label>
              <select
                id="bn-destination"
                value={f.destination}
                onChange={(e) => { set("destination", e.target.value); set("tour", ""); }}
                className={fieldClass("destination")}
              >
                <option value="">Choose a destination</option>
                {destinations.map((d) => <option key={d.slug} value={d.slug}>{d.name === d.country ? d.name : `${d.name}, ${d.country}`}</option>)}
                <option value="other">Other / custom trip</option>
              </select>
              {errors.destination && <p className={errText}>{errors.destination}</p>}
            </div>
            <div>
              <label className={label} htmlFor="bn-tour">Package</label>
              <select id="bn-tour" value={f.tour} onChange={(e) => set("tour", e.target.value)} disabled={packages.length === 0} className={cx(fieldClass("tour"), "disabled:opacity-60")}>
                <option value="">{f.destination && packages.length === 0 ? "Custom plan" : "Not sure yet / customise"}</option>
                {packages.map((t) => <option key={t.slug} value={t.slug}>{t.title}</option>)}
              </select>
            </div>
            <div>
              <label className={label} htmlFor="bn-date">Travel date {f.flexible ? "" : "*"}</label>
              <input id="bn-date" type="date" min={today()} suppressHydrationWarning value={f.date} onChange={(e) => set("date", e.target.value)} className={fieldClass("date")} />
              <label className="mt-[10px] flex items-center gap-[8px] text-[14px] cursor-pointer">
                <input type="checkbox" className="w-[16px] h-[16px] accent-blue" checked={f.flexible} onChange={(e) => { set("flexible", e.target.checked); setErrors((p) => ({ ...p, date: undefined })); }} />
                My dates are flexible
              </label>
              {errors.date && <p className={errText}>{errors.date}</p>}
            </div>
            <div>
              <span className={label}>Hotel category</span>
              <div className="flex flex-wrap gap-[8px]" role="radiogroup" aria-label="Hotel category">
                {hotels.map((h) => {
                  const on = f.hotel === h;
                  return (
                    <button
                      key={h}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => set("hotel", h)}
                      className={cx("inline-flex items-center gap-[6px] h-[40px] px-[14px] rounded-[30px] border border-solid text-[14px] font-medium [transition:all_0.2s_ease]", on ? "bg-blue border-blue text-white" : "bg-white border-line text-navy hover:border-blue hover:text-blue")}
                    >
                      {h !== "Not sure" && <i className={cx("fa-solid fa-star text-[11px]", on ? "text-white" : "text-orange")} />}
                      {h}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className={card}>
          <StepTitle n={2} title="Travellers" text="Tell us who is coming along." />
          <div className="grid grid-cols-3 gap-[12px] max1024:grid-cols-1">
            <Stepper label="Adults" hint="12+ years" value={f.adults} min={1} max={30} onChange={(v) => set("adults", v)} />
            <Stepper label="Children" hint="2–11 years" value={f.children} min={0} max={10} onChange={(v) => set("children", v)} />
            <Stepper label="Rooms" hint="Hotel rooms" value={f.rooms} min={1} max={15} onChange={(v) => set("rooms", v)} />
          </div>
        </section>

        <section className={card}>
          <StepTitle n={3} title="Your contact details" text="We'll use these to confirm your booking." />
          <div className="grid grid-cols-2 gap-[18px] max767:grid-cols-1">
            <div>
              <label className={label} htmlFor="bn-name">Full name *</label>
              <input id="bn-name" value={f.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" className={fieldClass("name")} />
              {errors.name && <p className={errText}>{errors.name}</p>}
            </div>
            <div>
              <label className={label} htmlFor="bn-phone">Phone / WhatsApp *</label>
              <input id="bn-phone" type="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" placeholder="+91" className={fieldClass("phone")} />
              {errors.phone && <p className={errText}>{errors.phone}</p>}
            </div>
            <div>
              <label className={label} htmlFor="bn-email">Email *</label>
              <input id="bn-email" type="email" value={f.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" className={fieldClass("email")} />
              {errors.email && <p className={errText}>{errors.email}</p>}
            </div>
            <div>
              <label className={label} htmlFor="bn-city">City</label>
              <input id="bn-city" value={f.city} onChange={(e) => set("city", e.target.value)} autoComplete="address-level2" placeholder="Where are you travelling from?" className={fieldClass("city")} />
            </div>
            <div className="col-span-2 max767:col-span-1">
              <label className={label} htmlFor="bn-notes">Special requests</label>
              <textarea id="bn-notes" rows={4} value={f.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Honeymoon, food preferences, extra activities, budget…" className={cx(fieldClass("notes"), "h-auto py-[12px] resize-y")} />
            </div>
          </div>
        </section>
      </div>

      <aside className="sticky top-[110px] grid gap-[20px] max1024:static">
        <div className={card}>
          <h3 className="mb-[16px] text-[20px]">Your trip summary</h3>
          <dl className="m-0 grid gap-[10px] text-[14px]">
            {[
              ["Destination", destName || "—"],
              ["Package", tour?.title ?? (f.destination ? "Custom plan" : "—")],
              ["Date", f.date ? new Date(`${f.date}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : f.flexible ? "Flexible" : "—"],
              ["Hotel", f.hotel],
              ["Travellers", `${f.adults} adult${f.adults === 1 ? "" : "s"}${f.children ? `, ${f.children} child${f.children === 1 ? "" : "ren"}` : ""}`],
              ["Rooms", String(f.rooms)],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-[14px] pb-[10px] border-b border-solid border-line">
                <dt>{k}</dt>
                <dd className="m-0 text-right text-navy font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-[16px] p-[14px] rounded-[12px] bg-cream">
            {each > 0 ? (
              <>
                <span className="block text-[13px]">Estimated from</span>
                <strong className="text-navy text-[24px]">{fmt(each)}</strong>
                <span className="text-[13px]"> / adult</span>
                <span className="block mt-[4px] text-[12px]">≈ {fmt(each * f.adults)} for {f.adults} adult{f.adults === 1 ? "" : "s"}. Final price is confirmed by our planner.</span>
              </>
            ) : (
              <span className="block text-[14px] text-navy font-medium">Price on request: our planner will share a quote for your trip.</span>
            )}
          </div>
          <button type="submit" className={cx(btnBlue, btnMotion, "mt-[18px] w-full justify-center")}>
            Send booking request <i className="fa-solid fa-paper-plane" />
          </button>
          <p className="mt-[10px] mb-0 text-center text-[12px]">No payment now. We&apos;ll confirm availability first.</p>
        </div>

        <div className="p-[22px] rounded-[20px] bg-navy text-white/80 text-[14px]">
          <h3 className="mb-[12px] text-white text-[17px]">Need help planning?</h3>
          <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-[10px] !text-white hover:!text-orange">
            <i className="fa-solid fa-phone text-orange" /> {contact.phone}
          </a>
          <a href={`mailto:${contact.email}`} className="mt-[8px] flex items-center gap-[10px] break-all !text-white hover:!text-orange">
            <i className="fa-solid fa-envelope text-orange" /> {contact.email}
          </a>
        </div>
      </aside>
    </form>
  );
}
