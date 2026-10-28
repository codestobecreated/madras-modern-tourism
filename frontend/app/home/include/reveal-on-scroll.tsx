"use client";

import { useEffect } from "react";

/** Adds `.in` to every `.js-reveal` element as it scrolls into view. */
export default function RevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll(".js-reveal");
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
