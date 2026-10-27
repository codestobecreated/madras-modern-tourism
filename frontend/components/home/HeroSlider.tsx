"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { heroSlides } from "./data";

const art = "/images/home";

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setActive((i) => (i + 1) % heroSlides.length), 7000);
    return () => window.clearInterval(id);
  }, [active]);

  const slide = heroSlides[active];

  return (
    <section className="mmt-hero" aria-roledescription="carousel">
      <img className="mmt-hero-art brush" src={`${art}/brush.webp`} alt="" />
      <img className="mmt-hero-art wave-blue" src={`${art}/wave-blue.webp`} alt="" />
      <img className="mmt-hero-art wave-orange" src={`${art}/wave-orange.webp`} alt="" />
      <img className="mmt-hero-art clouds" src={`${art}/clouds.webp`} alt="" />
      <img className="mmt-hero-art plane-path" src={`${art}/plane-path.webp`} alt="" />
      <img className="mmt-hero-art suitcases" src={`${art}/suitcases.webp`} alt="" />
      <img className="mmt-hero-art birds" src={`${art}/birds.webp`} alt="" />
      <img className="mmt-hero-art camera" src={`${art}/camera.webp`} alt="" />
      <img className="mmt-hero-art beach" src={`${art}/beach-circle.webp`} alt="" />
      <img className="mmt-hero-art traveller" src={`${art}/traveller.webp`} alt="Traveller reading a guide book" fetchPriority="high" />

      <div className="mmt-hero-content">
        <div className="mmt-hero-text swap" key={active} aria-live="polite">
          <span className="mmt-script mmt-anim">{slide.script}</span>
          <h1 className="mmt-anim">{slide.title}</h1>
          <div className="mmt-anim">
            <Link href="/tours-page" className="mmt-btn">Discover More</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
