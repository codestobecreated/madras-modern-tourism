"use client";

import { useEffect, useRef, useState } from "react";
import { counters, testimonials, Tour } from "./data";

/** Adds `.in` to every `.mmt-reveal` element as it scrolls into view. */
export function RevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll(".mmt-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      className={`mmt-to-top${show ? " show" : ""}`}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <i className="fa-solid fa-arrow-up" />
    </button>
  );
}

export function WishButton() {
  const [on, setOn] = useState(false);
  return (
    <button className={`mmt-tour-wish${on ? " on" : ""}`} aria-label="Add to wishlist" aria-pressed={on} onClick={() => setOn(!on)}>
      <i className={on ? "fa-solid fa-heart" : "fa-regular fa-heart"} />
    </button>
  );
}

export function TourPrice({ tour }: { tour: Tour }) {
  const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;
  return (
    <div className="mmt-tour-price">
      {tour.badge ? <span className="mmt-tour-off">{tour.badge}</span> : <small>From</small>}
      <strong>{fmt(tour.price)}</strong>
      {tour.oldPrice && <del>{fmt(tour.oldPrice)}</del>}
    </div>
  );
}

export function Testimonials() {
  const count = testimonials.length;
  const [active, setActive] = useState(1);

  useEffect(() => {
    const id = window.setInterval(() => setActive((i) => (i + 1) % count), 6000);
    return () => window.clearInterval(id);
  }, [active, count]);

  // Always show three cards: the previous, the active (centre) and the next.
  const visible = [-1, 0, 1].map((o) => (active + o + count) % count);

  return (
    <section className="mmt-section mmt-testi-section" id="testimonials">
      <div className="mmt-container">
        <div className="mmt-heading center mmt-reveal">
          <span className="mmt-pill"><i className="fa-solid fa-plane" />Testimonial</span>
          <h2>See what they are<br />talking about?</h2>
        </div>
        <div className="mmt-testi-track">
          {visible.map((idx, pos) => {
            const t = testimonials[idx];
            return (
              <figure key={`${idx}-${pos}`} className={`mmt-testi${pos === 1 ? " active" : ""}`} onClick={() => setActive(idx)}>
                <figcaption className="mmt-testi-person">
                  <span className="mmt-testi-avatar">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.image} alt={t.name} loading="lazy" />
                  </span>
                  <div>
                    <div className="mmt-testi-stars" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }, (_, i) => <i key={i} className="fa-solid fa-star" />)}
                    </div>
                    <h4>{t.name}</h4>
                    <span>{t.role}</span>
                  </div>
                </figcaption>
                <blockquote>{t.text}</blockquote>
                <i className="fa-solid fa-quote-left mmt-testi-quote" />
              </figure>
            );
          })}
        </div>
        <div className="mmt-testi-dots">
          {testimonials.map((t, i) => (
            <button key={t.name} className={i === active ? "active" : undefined} aria-label={`Show testimonial ${i + 1}`} onClick={() => setActive(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ value, decimals, suffix, label, icon }: (typeof counters)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / 1800, 1);
        setN(value * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <div className="mmt-counter" ref={ref}>
      <span className="mmt-counter-icon"><i className={icon} /></span>
      <strong>{n.toFixed(decimals)}{suffix}</strong>
      <span>{label}</span>
    </div>
  );
}

export function Counters() {
  return (
    <section className="mmt-counters-wrap">
      <div className="mmt-container">
        <div className="mmt-counters">
          {counters.map((c) => <Counter key={c.label} {...c} />)}
        </div>
      </div>
    </section>
  );
}

export function Newsletter() {
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
      <div className="mmt-newsletter">
        <input type="email" required placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email address" />
        <button type="submit" aria-label="Subscribe"><i className="fa-solid fa-paper-plane" /></button>
      </div>
      <label className="mmt-footer-agree">
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} /> I agree to the privacy policy.
      </label>
      {msg && <p className="mmt-footer-msg">{msg}</p>}
    </form>
  );
}
