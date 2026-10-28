"use client";

import { useEffect, useState } from "react";
import { cx } from "./ui";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      className={cx(
        "fixed right-[24px] bottom-[24px] z-[60] w-[48px] h-[48px] [border:0] rounded-[50%] bg-orange text-white",
        "[box-shadow:0_20px_50px_rgba(16,26,44,0.08)] [transition:all_0.3s_ease]",
        show ? "opacity-100 visible [transform:translateY(0)]" : "opacity-0 invisible [transform:translateY(20px)]",
      )}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <i className="fa-solid fa-arrow-up" />
    </button>
  );
}
