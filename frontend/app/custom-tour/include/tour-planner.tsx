"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { destinations } from "../../home/include/catalog";
import { contact } from "../../home/include/data";
import { btnBlue, btnMotion, cx } from "../../home/include/ui";
import { StepTitle, Stepper } from "../../book-now/include/book-now-form";

type Fields = {
  places: string[];
  styles: string[];
  month: string;
  nights: number;
  budget: string;
  hotel: string;
  adults: number;
  children: number;
  name: string;
  phone: string;
  email: string;
  notes: string;
};
type Errors = Partial<Record<keyof Fields, string>>;

const placeOptions = [...destinations.map((d) => ({ value: d.slug, label: d.name, image: d.image })), { value: "other", label: "Somewhere else", image: "" }];
const styleOptions = [
  { value: "beach", label: "Beaches & Islands", icon: "fa-solid fa-umbrella-beach" },
  { value: "adventure", label: "Adventure", icon: "fa-solid fa-person-hiking" },
  { value: "family", label: "Family & Kids", icon: "fa-solid fa-children" },
  { value: "culture", label: "Culture & Heritage", icon: "fa-solid fa-landmark" },
  { value: "honeymoon", label: "Honeymoon", icon: "fa-solid fa-heart" },
  { value: "shopping", label: "Shopping & City", icon: "fa-solid fa-bag-shopping" },
  { value: "nature", label: "Nature & Wildlife", icon: "fa-solid fa-tree" },
  { value: "food", label: "Food & Nightlife", icon: "fa-solid fa-utensils" },
];
const budgets = ["Under ₹25,000", "₹25,000 – ₹50,000", "₹50,000 – ₹1,00,000", "Above ₹1,00,000"];
const hotels = ["3 Star", "4 Star", "5 Star", "Luxury resort"];

// The next 12 months, e.g. "December 2026". Built in the browser only, so the static HTML
// (generated at build time) never disagrees with the visitor's current month.
const nextMonths = () =>
  Array.from({ length: 12 }, (_, i) => {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() + i);
    return d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  });
const subscribeNever = () => () => {};

const empty: Fields = {
  places: [], styles: [], month: "", nights: 4, budget: budgets[1], hotel: hotels[0],
  adults: 2, children: 0, name: "", phone: "", email: "", notes: "",
};

const card = "p-[28px] rounded-[20px] bg-white [border:1px_solid_var(--color-line)] [box-shadow:0_14px_40px_rgba(16,26,44,0.06)] max767:p-[18px]";
const label = "block mb-[8px] text-navy text-[14px] font-semibold";
const input = "w-full h-[50px] px-[16px] rounded-[10px] border border-solid bg-soft text-[15px] text-navy outline-none [transition:border-color_0.2s_ease,background_0.2s_ease] focus:bg-white focus:border-blue";
const errText = "mt-[8px] text-[13px] text-[#e8484f]";
const chip = (on: boolean) =>
  cx(
    "inline-flex items-center gap-[8px] min-h-[42px] px-[16px] rounded-[30px] border border-solid text-[14px] font-medium [transition:all_0.2s_ease]",
    on ? "bg-blue border-blue text-white" : "bg-white border-line text-navy hover:border-blue hover:text-blue"
  );

function toggle(list: string[], v: string) {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
}

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.places.length === 0) e.places = "Pick at least one place you'd like to visit.";
  if (!f.month) e.month = "Choose when you'd like to travel.";
  if (!f.name.trim()) e.name = "Please enter your full name.";
  if (f.phone.replace(/\D/g, "").length < 10) e.phone = "Please enter a phone number with at least 10 digits.";
  if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = "Please enter a valid email address.";
  return e;
}

/**
 * Custom tour request: places, interests, timing, budget and travellers, with a live plan summary.
 * Submitting shows a confirmation with a reference only — nothing is sent anywhere yet.
 */
export default function TourPlanner() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [reference, setReference] = useState<string | null>(null);
  const monthsKey = useSyncExternalStore(subscribeNever, () => nextMonths().join("|"), () => "");
  const months = monthsKey ? monthsKey.split("|") : [];

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    setF((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };
  const toggleIn = (k: "places" | "styles", v: string) => {
    setF((prev) => ({ ...prev, [k]: toggle(prev[k], v) }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };
  const fieldClass = (k: keyof Fields) => cx(input, errors[k] ? "border-[#e8484f]" : "border-line");
  const placeNames = f.places.map((p) => placeOptions.find((o) => o.value === p)?.label ?? p);
  const styleNames = f.styles.map((s) => styleOptions.find((o) => o.value === s)?.label ?? s);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(f);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`ct-${first}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setReference(`MMT-C${Math.random().toString(36).slice(2, 7).toUpperCase()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (reference) {
    return (
      <div className={cx(card, "max-w-[720px] mx-auto text-center py-[46px]")}>
        <span className="inline-flex items-center justify-center w-[80px] h-[80px] rounded-[50%] bg-[#e6f6ec] text-[#2a9d5c] text-[36px]">
          <i className="fa-solid fa-map-location-dot" />
        </span>
        <h2 className="mt-[20px] text-[30px] leading-[1.25]">Your trip request is in!</h2>
        <p className="mt-[10px] text-[16px]">
          Thanks, {f.name.trim().split(" ")[0]}. Our travel planner will prepare a custom itinerary for {placeNames.join(", ")} and call you on{" "}
          <strong className="text-navy">{f.phone}</strong>.
        </p>
        <p className="mt-[18px] inline-block px-[20px] py-[8px] rounded-[30px] bg-soft text-navy text-[15px]">
          Request reference: <strong>{reference}</strong>
        </p>
        <div className="mt-[28px] flex flex-wrap justify-center gap-[12px]">
          <Link href="/tours-page" className={cx(btnBlue, btnMotion)}>Browse ready packages</Link>
          <button type="button" onClick={() => { setF(empty); setReference(null); }} className="inline-flex items-center px-[28px] rounded-[30px] border border-solid border-line bg-white text-navy font-semibold hover:text-orange">
            Plan another trip
          </button>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit} className="grid grid-cols-[minmax(0,1fr)_340px] gap-[30px] [align-items:start] max1024:grid-cols-1">
      <div className="grid gap-[24px]">
        <section className={card} id="ct-places">
          <StepTitle n={1} title="Where would you like to go?" text="Choose one or more places. We can combine them in one trip." />
          <div className="grid grid-cols-[repeat(4,minmax(0,1fr))] gap-[12px] max1024:grid-cols-[repeat(3,minmax(0,1fr))] max767:grid-cols-[repeat(2,minmax(0,1fr))]">
            {placeOptions.map((o) => {
              const on = f.places.includes(o.value);
              return (
                <button
                  key={o.value}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleIn("places", o.value)}
                  className={cx("group/place relative h-[110px] overflow-hidden rounded-[14px] p-0 border-2 border-solid text-left [transition:all_0.2s_ease]", on ? "border-blue [box-shadow:0_10px_24px_rgba(1,95,201,0.25)]" : "border-transparent")}
                >
                  {o.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={o.image} alt="" className="absolute inset-0 w-full h-full object-cover [transition:transform_0.6s_ease] group-hover/place:scale-[1.08]" />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center bg-soft text-blue text-[28px]"><i className="fa-solid fa-earth-asia" /></span>
                  )}
                  <span className={cx("absolute inset-0", o.image ? "bg-[linear-gradient(to_top,rgba(16,26,44,0.8),transparent_65%)]" : "")} />
                  <strong className={cx("absolute left-[12px] bottom-[10px] text-[15px]", o.image ? "text-white" : "text-navy")}>{o.label}</strong>
                  {on && <i className="fa-solid fa-circle-check absolute top-[10px] right-[10px] text-[20px] text-white [filter:drop-shadow(0_2px_4px_rgba(0,0,0,0.4))]" />}
                </button>
              );
            })}
          </div>
          {errors.places && <p className={errText}>{errors.places}</p>}
        </section>

        <section className={card}>
          <StepTitle n={2} title="What do you enjoy?" text="Pick your interests so we can plan the right activities." />
          <div className="flex flex-wrap gap-[10px]">
            {styleOptions.map((o) => {
              const on = f.styles.includes(o.value);
              return (
                <button key={o.value} type="button" aria-pressed={on} onClick={() => toggleIn("styles", o.value)} className={chip(on)}>
                  <i className={cx(o.icon, on ? "text-white" : "text-orange")} /> {o.label}
                </button>
              );
            })}
          </div>
        </section>

        <section className={card}>
          <StepTitle n={3} title="When, how long & budget" text="A rough idea is enough. We'll fine-tune it with you." />
          <div className="grid grid-cols-2 gap-[18px] max767:grid-cols-1">
            <div>
              <label className={label} htmlFor="ct-month">Travel month *</label>
              <select id="ct-month" value={f.month} onChange={(e) => set("month", e.target.value)} className={fieldClass("month")}>
                <option value="">Choose a month</option>
                {months.map((m) => <option key={m} value={m}>{m}</option>)}
                <option value="Not decided">Not decided yet</option>
              </select>
              {errors.month && <p className={errText}>{errors.month}</p>}
            </div>
            <Stepper label="Nights" hint="Length of stay" value={f.nights} min={2} max={20} onChange={(v) => set("nights", v)} />
            <div>
              <span className={label}>Budget per person</span>
              <div className="flex flex-wrap gap-[8px]" role="radiogroup" aria-label="Budget per person">
                {budgets.map((b) => (
                  <button key={b} type="button" role="radio" aria-checked={f.budget === b} onClick={() => set("budget", b)} className={chip(f.budget === b)}>{b}</button>
                ))}
              </div>
            </div>
            <div>
              <span className={label}>Hotel preference</span>
              <div className="flex flex-wrap gap-[8px]" role="radiogroup" aria-label="Hotel preference">
                {hotels.map((h) => (
                  <button key={h} type="button" role="radio" aria-checked={f.hotel === h} onClick={() => set("hotel", h)} className={chip(f.hotel === h)}>
                    <i className={cx("fa-solid fa-star text-[11px]", f.hotel === h ? "text-white" : "text-orange")} /> {h}
                  </button>
                ))}
              </div>
            </div>
            <Stepper label="Adults" hint="12+ years" value={f.adults} min={1} max={30} onChange={(v) => set("adults", v)} />
            <Stepper label="Children" hint="2–11 years" value={f.children} min={0} max={10} onChange={(v) => set("children", v)} />
          </div>
        </section>

        <section className={card}>
          <StepTitle n={4} title="Your contact details" text="We'll send your custom itinerary and quote here." />
          <div className="grid grid-cols-2 gap-[18px] max767:grid-cols-1">
            <div>
              <label className={label} htmlFor="ct-name">Full name *</label>
              <input id="ct-name" value={f.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" className={fieldClass("name")} />
              {errors.name && <p className={errText}>{errors.name}</p>}
            </div>
            <div>
              <label className={label} htmlFor="ct-phone">Phone / WhatsApp *</label>
              <input id="ct-phone" type="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" placeholder="+91" className={fieldClass("phone")} />
              {errors.phone && <p className={errText}>{errors.phone}</p>}
            </div>
            <div className="col-span-2 max767:col-span-1">
              <label className={label} htmlFor="ct-email">Email *</label>
              <input id="ct-email" type="email" value={f.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" className={fieldClass("email")} />
              {errors.email && <p className={errText}>{errors.email}</p>}
            </div>
            <div className="col-span-2 max767:col-span-1">
              <label className={label} htmlFor="ct-notes">Anything else?</label>
              <textarea id="ct-notes" rows={4} value={f.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Special occasion, must-see places, food preferences, flights from…" className={cx(fieldClass("notes"), "h-auto py-[12px] resize-y")} />
            </div>
          </div>
        </section>
      </div>

      <aside className="sticky top-[110px] grid gap-[20px] max1024:static">
        <div className={card}>
          <h3 className="mb-[16px] flex items-center gap-[10px] text-[20px]"><i className="fa-solid fa-route text-orange" /> Your plan</h3>
          <dl className="m-0 grid gap-[10px] text-[14px]">
            {[
              ["Places", placeNames.join(", ") || "—"],
              ["Interests", styleNames.join(", ") || "—"],
              ["When", f.month || "—"],
              ["Length", `${f.nights} nights / ${f.nights + 1} days`],
              ["Budget", `${f.budget} pp`],
              ["Hotel", f.hotel],
              ["Travellers", `${f.adults} adult${f.adults === 1 ? "" : "s"}${f.children ? `, ${f.children} child${f.children === 1 ? "" : "ren"}` : ""}`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-[14px] pb-[10px] border-b border-solid border-line">
                <dt className="shrink-0">{k}</dt>
                <dd className="m-0 text-right text-navy font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <button type="submit" className={cx(btnBlue, btnMotion, "mt-[18px] w-full justify-center")}>
            Get my custom plan <i className="fa-solid fa-wand-magic-sparkles" />
          </button>
          <p className="mt-[10px] mb-0 text-center text-[12px]">Free planning. No payment needed now.</p>
        </div>

        <div className="p-[22px] rounded-[20px] bg-cream text-[14px]">
          <h3 className="mb-[10px] text-[17px]">How it works</h3>
          <ol className="m-0 grid gap-[8px] pl-[18px] list-decimal">
            <li>Share your ideas in this form.</li>
            <li>Our planner calls you to fine-tune details.</li>
            <li>You get a day-wise itinerary and quote.</li>
          </ol>
          <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="mt-[14px] flex items-center gap-[10px] font-semibold text-navy hover:text-orange">
            <i className="fa-solid fa-phone text-orange" /> {contact.phone}
          </a>
        </div>
      </aside>
    </form>
  );
}
