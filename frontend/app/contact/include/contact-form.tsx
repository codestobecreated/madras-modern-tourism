"use client";

import { useState } from "react";
import { btn, btnMotion, cx, reveal } from "../../home/include/ui";

const field =
  "w-full px-[20px] py-[14px] rounded-[8px] border border-[#e2e8f0] bg-white text-navy text-[15px] font-medium outline-none focus:border-blue";
const label = "block mb-[8px] text-navy text-[14px] font-semibold";

/** Dummy contact form: native required validation, then a thank-you state (no backend yet). */
export default function ContactForm() {
  const [sentTo, setSentTo] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = String(new FormData(e.currentTarget).get("name") || "").trim();
    setSentTo(name || "there");
  }

  return (
    <div className={cx("p-[40px] rounded-[10px] bg-[#f2f5f9] max767:p-[24px]", reveal)}>
      {sentTo ? (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center" role="status">
          <span className="flex items-center justify-center w-[80px] h-[80px] rounded-[50%] bg-blue text-white text-[34px]">
            <i className="fa-solid fa-check" />
          </span>
          <h3 className="mt-[24px] text-[28px] leading-[36px]">Thank you, {sentTo}!</h3>
          <p className="mt-[12px] max-w-[380px] text-[16px] font-medium">
            Your message has been received. Our travel team will get back to you within one working day.
          </p>
          <button type="button" onClick={() => setSentTo(null)} className={cx(btn, btnMotion, "mt-[30px] cursor-pointer")}>
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="grid grid-cols-[1fr_1fr] gap-[20px] max767:grid-cols-[1fr]">
          <h3 className="col-span-full text-[28px] leading-[36px]">Send Us a Message</h3>
          <div>
            <label htmlFor="cf-name" className={label}>Your Name *</label>
            <input id="cf-name" name="name" required autoComplete="name" className={field} placeholder="Full name" />
          </div>
          <div>
            <label htmlFor="cf-email" className={label}>Email *</label>
            <input id="cf-email" name="email" type="email" required autoComplete="email" className={field} placeholder="you@example.com" />
          </div>
          <div>
            <label htmlFor="cf-phone" className={label}>Phone *</label>
            <input id="cf-phone" name="phone" type="tel" required autoComplete="tel" className={field} placeholder="Mobile number" />
          </div>
          <div>
            <label htmlFor="cf-subject" className={label}>Subject *</label>
            <select id="cf-subject" name="subject" required defaultValue="" className={field}>
              <option value="" disabled>Choose a subject</option>
              <option value="general">General</option>
              <option value="booking">Booking</option>
              <option value="custom">Custom trip</option>
            </select>
          </div>
          <div className="col-span-full">
            <label htmlFor="cf-message" className={label}>Message *</label>
            <textarea id="cf-message" name="message" required rows={6} className={cx(field, "resize-y")} placeholder="Tell us about your plans" />
          </div>
          <div className="col-span-full">
            <button type="submit" className={cx(btn, btnMotion, "cursor-pointer")}>
              Send Message <i className="fa-solid fa-paper-plane" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
