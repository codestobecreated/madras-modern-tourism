"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { BACKEND_BASE } from "./data";
import { allTours, destinations as catalogDestinations } from "./catalog";
import { btn, cx, Heading, headingText, section as sectionSpacing } from "./ui";

type Destination = {
  id: number;
  name: string;
  slug: string;
  subtitle: string;
  listings_count: number;
  image_url: string;
  card_style: "orange" | "blue";
};

type Section = { tagline: string; title: string; description: string; button_label: string; button_url: string };

const fallbackSection: Section = {
  tagline: "Destination List",
  title: "Explore Our Beautiful Holiday Destinations",
  description: "Discover hand-picked destinations, breathtaking landscapes, and unforgettable cultural experiences.",
  button_label: "Discover More",
  button_url: "/destination",
};

// Package destinations from the shared catalogue, used until the backend answers.
const fallbackDestinations: Destination[] = catalogDestinations.map((d, i) => ({
  id: i + 1,
  name: d.name,
  slug: d.slug,
  subtitle: d.subtitle,
  listings_count: allTours.filter((t) => t.destination === d.slug).length,
  image_url: d.image,
  card_style: i % 2 ? "blue" : "orange",
}));

/* Row = full width with 3% side padding (16px minimum); the heading column is 36% of it minus the 30px gap (one column below 1025). */
const row = cx(
  "grid grid-cols-[347px_minmax(0,1fr)] gap-[30px] [align-items:center] px-[max(16px,3%)]",
  "max1024:grid-cols-[1fr]",
  "min1025:grid-cols-[calc(36%_-_30px)_minmax(0,1fr)]"
);

/*
 * The slider shows exactly --n whole cards (3, 4 on screens 1600px and wider, 2 on phones), so none is cut off at the edge.
 * --w is the card width; the cream base (::before) and its blue hover layer (::after) start halfway down the photo.
 */
const viewport = "overflow-hidden [container-type:inline-size] [--n:3] [--gap:30px] min-[1600px]:[--n:4] max767:[--n:2] max767:[--gap:16px]";
const card = cx(
  "group/card relative flex flex-col flex-[0_0_var(--w)] [--w:calc((100cqw_-_(var(--n)_-_1)_*_var(--gap))_/_var(--n))]",
  "[transition:transform_0.4s_ease] hover:[transform:translateY(-6px)] focus-visible:[transform:translateY(-6px)]",
  "before:content-[''] before:absolute before:top-[calc(var(--w)_*_299_/_236_/_2)] before:right-0 before:bottom-0 before:left-0 before:rounded-[0_0_0_calc(var(--w)_*_0.3)] before:bg-cream",
  "after:content-[''] after:absolute after:top-[calc(var(--w)_*_299_/_236_/_2)] after:right-0 after:bottom-0 after:left-0 after:rounded-[0_0_0_calc(var(--w)_*_0.3)]",
  "after:bg-blue after:opacity-0 after:[transition:opacity_0.4s_ease] hover:after:opacity-100 focus-visible:after:opacity-100"
);
const arrow =
  "w-[46px] h-[46px] rounded-[50%] [border:1px_solid_var(--color-line)] bg-white text-navy [transition:background_0.25s_ease,color_0.25s_ease] hover:bg-blue hover:text-white hover:border-blue";

export default function Destinations() {
  const [items, setItems] = useState<Destination[]>(fallbackDestinations);
  const [section, setSection] = useState<Section>(fallbackSection);

  // Auto-sliding loop carousel, like the reference: one card every 3s.
  // The list is rendered twice; after sliding past the first copy we jump back
  // without a transition, so the loop is seamless.
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [step, setStep] = useState(266);
  const [paused, setPaused] = useState(false);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    setStep(card.offsetWidth + gap);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure, items]);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setAnimate(true);
      setIndex((i) => i + 1);
    }, 3000);
    return () => window.clearInterval(id);
  }, [paused]);

  // Past the first copy (or before it), jump back to the same card in the other copy without a transition.
  const onTransitionEnd = () => {
    if (index >= items.length) {
      setAnimate(false);
      setIndex(index - items.length);
    }
  };

  const next = () => {
    setAnimate(true);
    setIndex((i) => i + 1);
  };
  const prev = () => {
    if (index > 0) {
      setAnimate(true);
      setIndex(index - 1);
      return;
    }
    setAnimate(false);
    setIndex(items.length);
    // let the jump paint first, then slide back one card
    window.setTimeout(() => {
      setAnimate(true);
      setIndex(items.length - 1);
    }, 30);
  };

  // enough copies that the visible window never runs out of cards
  const copies = Math.max(2, Math.ceil(4 / Math.max(items.length, 1)) + 1);

  useEffect(() => {
    fetch(`${BACKEND_BASE}/api/locations/`)
      .then((r) => r.json())
      .then((data: { locations?: Destination[] }) => {
        const withImages = (data.locations ?? []).filter((l) => l.image_url);
        if (withImages.length) setItems(withImages);
      })
      .catch(() => {});

    fetch(`${BACKEND_BASE}/api/section-content/?key=destination_list`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: (Section & { status: string }) | null) => {
        if (data?.status === "success") {
          setSection({
            tagline: data.tagline || fallbackSection.tagline,
            title: data.title || fallbackSection.title,
            description: data.description || fallbackSection.description,
            button_label: data.button_label || fallbackSection.button_label,
            button_url: data.button_url && data.button_url !== "#" ? data.button_url : fallbackSection.button_url,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className={cx(sectionSpacing, "overflow-hidden")}>
      <div className={row}>
        <Heading
          tag={section.tagline}
          title={section.title}
          text={section.description}
          reveal={false}
          className="mb-0"
          textClassName={`${headingText} mb-[34px]`}
        >
          <div className="flex items-center gap-[12px]">
            <Link href={section.button_url} className={btn}>{section.button_label}</Link>
            <button type="button" aria-label="Previous destination" onClick={prev} className={cx(arrow, "ml-auto min1025:ml-[8px]")}>
              <i className="fa-solid fa-arrow-left" />
            </button>
            <button type="button" aria-label="Next destination" onClick={next} className={arrow}>
              <i className="fa-solid fa-arrow-right" />
            </button>
          </div>
        </Heading>

        <div
          className={viewport}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div
            ref={trackRef}
            className="flex gap-[var(--gap)] pt-[8px] will-change-transform"
            style={{ transform: `translateX(-${index * step}px)`, transition: animate ? "transform 0.8s ease" : "none" }}
            onTransitionEnd={onTransitionEnd}
          >
          {Array.from({ length: copies }, (_, copy) => items.map((d) => (
            <Link
              key={`${d.id}-${copy}`}
              href={`/destination/${d.slug}`}
              className={card}
              aria-hidden={copy > 0 || undefined}
              tabIndex={copy > 0 ? -1 : undefined}
            >
              <span className="relative z-[1] block w-full aspect-[236/299] overflow-hidden rounded-[999px] [box-shadow:0_10px_25px_rgba(16,26,44,0.12)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.image_url} alt={d.name} loading="lazy" className="w-full h-full object-cover [transition:transform_0.8s_ease] group-hover/card:scale-[1.08]" />
                <span className="absolute inset-x-0 bottom-0 h-[45%] bg-[linear-gradient(to_top,rgba(16,26,44,0.45),transparent)]" />
                <span className="absolute left-[50%] bottom-[22px] px-[14px] py-[6px] rounded-[20px] bg-orange text-white text-[12px] font-semibold leading-[12px] whitespace-nowrap [transform:translateX(-50%)]">
                  {d.listings_count} {d.listings_count === 1 ? "Package" : "Packages"}
                </span>
              </span>
              <span className="relative z-[1] flex h-[104px] flex-col items-center justify-center px-[20px] text-center max767:h-[84px] max767:px-[10px]">
                <small className="block mb-[6px] text-blue text-[12px] font-semibold leading-[14px] tracking-[0.8px] uppercase [transition:color_0.35s_ease] group-hover/card:text-white/80">{d.subtitle}</small>
                <h3 className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-navy text-[22px] leading-[1.2] [transition:color_0.35s_ease] group-hover/card:text-white max767:text-[17px]">
                  {d.name}
                </h3>
              </span>
            </Link>
          )))}
          </div>
        </div>
      </div>
    </section>
  );
}
