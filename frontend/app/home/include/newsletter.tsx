"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [msg, setMsg] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!agree) return setMsg("Please accept the privacy policy.");
        setMsg("Thanks! You're subscribed.");
        setEmail("");
      }}
    >
      <div className="flex overflow-hidden rounded-[10px] bg-white">
        <input
          className="flex-1 min-w-0 px-[14px] py-0 [border:0] bg-transparent text-navy [font-family:inherit] text-[13px] [outline:none]"
          type="email"
          required
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
        />
        <button className="w-[54px] h-[54px] [border:0] bg-orange text-white text-[14px]" type="submit" aria-label="Subscribe">
          <i className="fa-solid fa-paper-plane" />
        </button>
      </div>
      <label className="flex items-center gap-[8px] mt-[15px] text-white text-[15px] leading-[18px] tracking-[-0.02em]">
        <input className="accent-orange" type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} /> I agree to the privacy policy.
      </label>
      {msg && <p className="mt-[8px] text-orange text-[13px]">{msg}</p>}
    </form>
  );
}
