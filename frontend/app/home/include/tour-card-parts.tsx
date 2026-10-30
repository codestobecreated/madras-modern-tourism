"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cx } from "./ui";
import { inr, type Tour } from "./data";

export function WishButton() {
  const [on, setOn] = useState(false);
  return (
    <button
      className={cx(
        "absolute top-[14px] right-[14px] w-[36px] h-[36px] [border:0] rounded-[50%] bg-white hover:text-[#e8484f]",
        on ? "text-[#e8484f]" : "text-navy"
      )}
      aria-label="Add to wishlist"
      aria-pressed={on}
      onClick={() => setOn(!on)}
    >
      <i className={on ? "fa-solid fa-heart" : "fa-regular fa-heart"} />
    </button>
  );
}

export function TourPrice({ tour }: { tour: Tour }) {
  return (
    <div className="leading-[1.2]">
      {tour.badge ? (
        <span className="table mb-[1px] px-[8px] py-[3px] rounded-[10px] bg-orange text-white text-[10px] font-medium leading-[10px]">{tour.badge}</span>
      ) : tour.price > 0 && (
        <small className="block mb-[1px] text-[14px] leading-[14px]">From</small>
      )}
      <strong className="inline-block text-navy text-[22px] font-bold leading-[22px]">{inr(tour.price)}</strong>
      {tour.oldPrice && <del className="ml-[8px] text-[16px] font-medium leading-[16px]">{inr(tour.oldPrice)}</del>}
    </div>
  );
}

/** Sample clip until each tour has its own video. */
export const defaultTourVideo = "/videos/tour-preview.mp4";

const mediaBtn =
  "inline-flex items-center justify-center w-[40px] h-full [border:0] bg-transparent text-white text-[16px] hover:text-orange focus-visible:text-orange";
const closeBtn =
  "absolute top-[16px] right-[16px] z-[2] w-[44px] h-[44px] rounded-[50%] [border:0] bg-white/15 text-white text-[20px] hover:bg-orange";
const navBtn =
  "absolute top-[50%] z-[2] w-[46px] h-[46px] -translate-y-1/2 rounded-[50%] [border:0] bg-white/15 text-white text-[18px] hover:bg-orange max767:w-[38px] max767:h-[38px]";

/**
 * Full-screen popup that plays a video or browses photos (arrows, thumbnails, keyboard).
 * Esc, the close button or a click on the backdrop closes it.
 */
export function MediaModal({ title, mode, images = [], video = defaultTourVideo, start = 0, onClose }: {
  title: string;
  mode: "video" | "gallery";
  images?: string[];
  video?: string;
  start?: number;
  onClose: () => void;
}) {
  const [shown, setShown] = useState(start);
  const count = images.length;
  const go = (step: number) => setShown((i) => (i + step + count) % count);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (mode === "gallery" && e.key === "ArrowRight") setShown((i) => (i + 1) % count);
      if (mode === "gallery" && e.key === "ArrowLeft") setShown((i) => (i - 1 + count) % count);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [mode, count, onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={mode === "video" ? `${title} video` : `${title} photos`}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center gap-[16px] p-[60px_16px_24px] bg-[rgba(10,16,28,0.9)]"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button type="button" className={closeBtn} aria-label="Close" onClick={onClose}>
        <i className="fa-solid fa-xmark" />
      </button>

      {mode === "video" ? (
        <video src={video} controls autoPlay playsInline className="w-full max-w-[960px] max-h-[80vh] rounded-[12px] bg-black" />
      ) : (
        <>
          <div className="relative w-full max-w-[1000px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[shown]} alt={`${title}, photo ${shown + 1} of ${count}`} className="block mx-auto w-auto max-w-full max-h-[70vh] rounded-[12px] object-contain" />
            {count > 1 && (
              <>
                <button type="button" className={cx(navBtn, "left-[8px]")} aria-label="Previous photo" onClick={() => go(-1)}>
                  <i className="fa-solid fa-chevron-left" />
                </button>
                <button type="button" className={cx(navBtn, "right-[8px]")} aria-label="Next photo" onClick={() => go(1)}>
                  <i className="fa-solid fa-chevron-right" />
                </button>
              </>
            )}
          </div>
          <p className="m-0 text-white/80 text-[14px]">{shown + 1} / {count}</p>
          <div className="flex max-w-full gap-[10px] overflow-x-auto pb-[4px]">
            {images.map((src, i) => (
              <button
                key={src + i}
                type="button"
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === shown || undefined}
                onClick={() => setShown(i)}
                className={cx("shrink-0 w-[72px] h-[52px] p-0 overflow-hidden rounded-[8px] [border:2px_solid_transparent]", i === shown ? "!border-orange" : "opacity-60 hover:opacity-100")}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>,
    document.body
  );
}

/** The blue tab on a tour card: the video button plays the tour video, the camera button opens its photos. */
export function TourMedia({ title, images, video = defaultTourVideo }: { title: string; images: string[]; video?: string }) {
  const [open, setOpen] = useState<"video" | "gallery" | null>(null);

  return (
    <>
      <span className="absolute top-[-35px] left-[30px] inline-flex items-stretch h-[36px] px-[4px] rounded-[10px_10px_0_0] bg-blue [box-shadow:0_10px_20px_rgba(0,0,0,0.1)]">
        <button type="button" className={mediaBtn} aria-label={`Play ${title} video`} onClick={() => setOpen("video")}>
          <i className="fa-solid fa-video" aria-hidden />
        </button>
        <span className="my-[9px] w-px bg-white/40" aria-hidden />
        <button type="button" className={mediaBtn} aria-label={`Open ${title} photo gallery`} onClick={() => setOpen("gallery")}>
          <i className="fa-solid fa-camera" aria-hidden />
        </button>
      </span>
      {open && <MediaModal title={title} mode={open} images={images} video={video} onClose={() => setOpen(null)} />}
    </>
  );
}
