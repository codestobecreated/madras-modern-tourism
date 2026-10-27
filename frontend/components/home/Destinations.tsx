"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { asset, BACKEND_BASE } from "./data";

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
  title: "Explore the Beautiful Places Around Tamil Nadu",
  description: "Discover hand-picked destinations, breathtaking landscapes, and unforgettable cultural experiences.",
  button_label: "Discover More",
  button_url: "/destination",
};

const fallbackDestinations: Destination[] = [
  { id: 1, name: "Chennai", slug: "chennai", subtitle: "PLACES IN", listings_count: 5, image_url: asset("dest-beach"), card_style: "orange" },
  { id: 2, name: "Madurai", slug: "madurai", subtitle: "PLACES IN", listings_count: 3, image_url: asset("dest-plaza"), card_style: "blue" },
  { id: 3, name: "Mahabalipuram", slug: "mahabalipuram", subtitle: "TRAVEL TO", listings_count: 3, image_url: asset("dest-harbour"), card_style: "orange" },
  { id: 4, name: "Ooty", slug: "ooty", subtitle: "TRAVEL TO", listings_count: 2, image_url: asset("tour-hiker"), card_style: "orange" },
];

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
    <section className="mmt-section mmt-dest-section">
      <div className="mmt-dest">
        <div className="mmt-heading">
          <span className="mmt-pill"><i className="fa-solid fa-plane" />{section.tagline}</span>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
          <Link href={section.button_url} className="mmt-btn">{section.button_label}</Link>
        </div>

        <div
          className="mmt-dest-viewport"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            ref={trackRef}
            className="mmt-dest-cards"
            style={{ transform: `translateX(-${index * step}px)`, transition: animate ? "transform 0.8s ease" : "none" }}
            onTransitionEnd={onTransitionEnd}
          >
          {[0, 1].flatMap((copy) => items.map((d) => (
            <Link
              key={`${d.id}-${copy}`}
              href={`/destination?location=${d.slug}`}
              className={`mmt-dest-card ${d.card_style}`}
              aria-hidden={copy === 1 || undefined}
              tabIndex={copy === 1 ? -1 : undefined}
            >
              <span className="mmt-dest-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.image_url} alt={d.name} loading="lazy" />
                <span className="mmt-dest-count">{d.listings_count} Listings</span>
              </span>
              <span className="mmt-dest-info">
                <small>{d.subtitle}</small>
                <h3 className={d.name.length > 11 ? "long" : undefined}>{d.name}</h3>
              </span>
            </Link>
          )))}
          </div>
        </div>
      </div>
    </section>
  );
}
