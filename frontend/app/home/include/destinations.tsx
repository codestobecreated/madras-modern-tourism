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

/*
 * Row = from the 1170px container's left edge to the screen's right edge.
 * Heading column = 28.85% of the row minus the 30px gap (347px below 1025).
 */
const row = cx(
  "grid grid-cols-[347px_minmax(0,1fr)] gap-[30px] [align-items:start] pl-[max(16px,calc((100%_-_1170px)_/_2))]",
  "max1024:grid-cols-[1fr]",
  "min1025:[container-type:inline-size] min1025:grid-cols-[calc(28.85%_-_30px)_minmax(0,1fr)]"
);

/*
 * --w is the card width: 236px by default, 220px on phones, and fluid on desktop
 * (4 cards in 79% of the row: 236px at 1440, ~281 at 1910).
 * The cream/blue base (::before) and its blue hover layer (::after) start halfway down the photo.
 */
const card = cx(
  "group/card relative flex flex-col flex-[0_0_var(--w,236px)] snap-start",
  "before:content-[''] before:absolute before:top-[calc(var(--w,236px)_*_299_/_236_/_2)] before:right-0 before:bottom-0 before:left-0 before:rounded-[0_0_0_calc(var(--w,236px)_*_0.57)]",
  "after:content-[''] after:absolute after:top-[calc(var(--w,236px)_*_299_/_236_/_2)] after:right-0 after:bottom-0 after:left-0 after:rounded-[0_0_0_calc(var(--w,236px)_*_0.57)]",
  "after:bg-blue after:opacity-0 after:[transition:opacity_0.39s_ease] hover:after:opacity-100",
  "max767:[--w:220px] max767:basis-[220px] min1025:[--w:calc(19.75cqw_-_22.5px)]"
);

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

  const onTransitionEnd = () => {
    if (index >= items.length) {
      setAnimate(false);
      setIndex(index - items.length);
    }
  };

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
          className="mb-0 max1024:pr-[16px]"
          textClassName={`${headingText} mb-[34px]`}
        >
          <Link href={section.button_url} className={btn}>{section.button_label}</Link>
        </Heading>

        <div
          className="overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            ref={trackRef}
            className="flex w-max gap-[30px] p-0 [scrollbar-width:none] will-change-transform [&::-webkit-scrollbar]:hidden"
            style={{ transform: `translateX(-${index * step}px)`, transition: animate ? "transform 0.8s ease" : "none" }}
            onTransitionEnd={onTransitionEnd}
          >
          {[0, 1].flatMap((copy) => items.map((d) => {
            const blue = d.card_style === "blue";
            return (
              <Link
                key={`${d.id}-${copy}`}
                href={`/tours-page?destination=${d.slug}`}
                className={cx(card, blue ? "before:bg-blue" : "before:bg-cream")}
                aria-hidden={copy === 1 || undefined}
                tabIndex={copy === 1 ? -1 : undefined}
              >
                <span className="relative z-[1] block flex-[0_0_auto] w-full aspect-[236/299] overflow-hidden rounded-[999px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={d.image_url} alt={d.name} loading="lazy" className="w-full h-full object-cover [transition:transform_0.8s_ease]" />
                  <span
                    className={cx(
                      "absolute left-[50%] bottom-[24px] px-[16px] py-[4px] rounded-[20px] text-[12px] font-semibold leading-[12px] whitespace-nowrap [transform:translateX(-50%)]",
                      blue ? "bg-blue text-white" : "bg-orange text-white"
                    )}
                  >
                    {d.listings_count} Listings
                  </span>
                </span>
                <span className="relative z-[1] flex flex-[0_0_90px] flex-col items-center justify-center pt-0 leading-[1.2]">
                  <small className="mb-[4px] text-orange text-[12px] font-semibold leading-[16px] tracking-[0.8px] uppercase">{d.subtitle}</small>
                  <h3
                    className={cx(
                      d.name.length > 11 ? "text-[18px]" : "text-[22px]",
                      "[transition:color_0.35s_ease] group-hover/card:text-white",
                      blue && "text-white"
                    )}
                  >
                    {d.name}
                  </h3>
                </span>
              </Link>
            );
          }))}
          </div>
        </div>
      </div>
    </section>
  );
}
