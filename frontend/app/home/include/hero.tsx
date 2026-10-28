"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { asset, heroSlides } from "./data";
import { cx } from "./ui";

/*
 * Layout copied from the reference slider (1240 x 806 grid, centred, full-width stage).
 * Every size is written in reference pixels and multiplied by a unit that follows the
 * slider's levels:
 *   ≥1025px  --u = --s = 1px, grid centred (--g = 50% - 620px), stage 806px tall
 *   ≤1024px  everything scales with the width, grid = full width
 *   ≤778px   / ≤479px  same, with the slider's shorter mobile stage heights
 * --u scales the images, --s the text (the reference sets separate text sizes per level).
 */
const stage = cx(
  // isolate keeps the layer z-indexes inside the hero, so the search card can overlap it
  "relative isolate overflow-hidden",
  "h-[806px] max1024:h-[calc(806*100cqw/1240)] max778:h-[calc(550*100cqw/778)] max479:h-[calc(360*100cqw/480)]",
  "[--g:calc(50%_-_620px)] [--u:1px] [--s:1px]",
  "max1024:[--g:0px] max1024:[--u:calc(1024*100cqw/1537600)] max1024:[--s:calc(100cqw/1240)]",
  "max778:[--u:calc(100cqw/1240)] max778:[--s:calc(100cqw/778)] max479:[--s:calc(100cqw/480)]"
);

const art = "absolute max-w-none pointer-events-none select-none";

/** Text layers are vertically centred on the stage, offset like the reference. */
const middle = "absolute [translate:0_-50%]";

/** Each line rises in on slide change, staggered like the reference timeline. */
const rise = [
  "[animation:mmt-rise_1s_ease_both]",
  "[animation:mmt-rise_1s_ease_0.3s_both]",
  "[animation:mmt-rise_1s_ease_0.55s_both]",
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setActive((i) => (i + 1) % heroSlides.length), 7000);
    return () => window.clearInterval(id);
  }, [active]);

  const slide = heroSlides[active];

  return (
    <section className="relative bg-white [container-type:inline-size]" aria-roledescription="carousel">
      <div className={stage}>
        <img
          className={cx(
            art,
            "left-[calc(var(--g)_-_260*var(--u))] top-[calc(100*var(--u))] w-[calc(220*var(--u))] h-[calc(169*var(--u))] z-[6]",
            "origin-top [animation:mmt-turn_4s_ease-in-out_infinite_alternate]"
          )}
          src={asset("hero/clouds")}
          alt=""
        />
        <img
          className={cx(art, "left-[calc(-5*var(--u))] top-[calc(90*var(--u))] w-[calc(289*var(--u))] h-[calc(403*var(--u))] z-[7]")}
          src={asset("hero/plane-path")}
          alt=""
        />
        <img
          className={cx(art, "left-[calc(-5*var(--u))] bottom-[calc(-5*var(--u))] w-[calc(380*var(--u))] h-[calc(397*var(--u))] z-[8]")}
          src={asset("hero/suitcases")}
          alt=""
        />
        <img
          className={cx(
            art,
            "left-[calc(var(--g)_+_550*var(--u))] top-[calc(111*var(--u))] w-[calc(131*var(--u))] h-[calc(57*var(--u))] z-[9]",
            "[transform-origin:50%_200%] [animation:mmt-swing_1.5s_ease-in-out_infinite_alternate]"
          )}
          src={asset("hero/birds")}
          alt=""
        />
        <img
          className={cx(art, "right-[calc(-5*var(--u))] bottom-[calc(-5*var(--u))] w-[calc(723*var(--u))] h-[calc(511*var(--u))] z-[10]")}
          src={asset("hero/wave-blue")}
          alt=""
        />
        <img
          className={cx(art, "right-[calc(-5*var(--u))] bottom-[calc(-5*var(--u))] w-[calc(1022*var(--u))] h-[calc(930*var(--u))] z-[11]")}
          src={asset("hero/brush")}
          alt=""
        />
        <img
          className={cx(
            art,
            "right-[calc(-5*var(--u))] bottom-[calc(-6*var(--u))] w-[calc(428*var(--u))] h-[calc(221*var(--u))] z-[12] object-cover object-bottom"
          )}
          src={asset("hero/wave-orange")}
          alt=""
        />
        <img
          className={cx(art, "left-[calc(var(--g)_+_1288*var(--u))] top-[calc(500*var(--u))] w-[calc(178*var(--u))] h-[calc(201*var(--u))] z-[13]")}
          src={asset("hero/camera")}
          alt=""
        />
        <img
          className={cx(art, "right-[calc(var(--g)_-_45*var(--u))] top-[calc(73*var(--u))] w-[calc(304*var(--u))] h-[calc(304*var(--u))] z-[14]")}
          src={asset("hero/beach-circle")}
          alt=""
        />
        <img
          className={cx(art, "right-[calc(var(--g)_-_50*var(--u))] bottom-0 w-[calc(728*var(--u))] h-[calc(766*var(--u))] z-[15]")}
          src={asset("hero/traveller")}
          alt="Traveller reading a guide book"
          fetchPriority="high"
        />

        <div className="contents" key={active} aria-live="polite">
          <span
            className={cx(
              middle,
              "z-[18] whitespace-nowrap font-grace font-normal text-orange",
              "left-[calc(var(--g)_+_15*var(--s))] top-[calc(50%_-_199*var(--s))] [font-size:36px] leading-[25px]",
              "max1024:left-[calc(var(--g)_+_12*var(--s))] max1024:top-[calc(50%_-_164*var(--s))] max1024:[font-size:calc(29*var(--s))] max1024:leading-[calc(20*var(--s))]",
              "max778:left-[calc(var(--g)_+_15*var(--s))] max778:top-[calc(50%_-_148*var(--s))] max778:[font-size:calc(26*var(--s))] max778:leading-[calc(25*var(--s))]",
              "max479:top-[calc(50%_-_99*var(--s))] max479:[font-size:calc(20*var(--s))] max479:leading-[calc(20*var(--s))]",
              rise[0]
            )}
          >
            {slide.script}
          </span>
          <h1
            className={cx(
              middle,
              "z-[17] m-0 font-bold text-navy tracking-normal",
              "left-[calc(var(--g)_+_10*var(--s))] top-[calc(50%_-_5*var(--s))] w-[calc(678*var(--s))] h-[calc(320*var(--s))] [font-size:80px] leading-[86px]",
              "max1024:left-[calc(var(--g)_+_8*var(--s))] max1024:top-[calc(50%_-_4*var(--s))] max1024:w-[calc(559*var(--s))] max1024:h-[calc(264*var(--s))] max1024:[font-size:calc(66*var(--s))] max1024:leading-[calc(71*var(--s))]",
              "max778:left-[calc(var(--g)_+_15*var(--s))] max778:top-[calc(50%_-_26*var(--s))] max778:w-[calc(424*var(--s))] max778:h-[calc(200*var(--s))] max778:[font-size:calc(58*var(--s))] max778:leading-[calc(58*var(--s))]",
              "max479:top-[calc(50%_-_20*var(--s))] max479:w-[calc(245*var(--s))] max479:h-[calc(123*var(--s))] max479:[font-size:calc(32*var(--s))] max479:leading-[calc(36*var(--s))]",
              rise[1]
            )}
          >
            {slide.title}
          </h1>
          <Link
            href="/tours-page"
            className={cx(
              middle,
              "z-[16] inline-block whitespace-nowrap rounded-[25px] bg-orange font-bold !text-white hover:bg-blue hover:!text-white",
              "left-[calc(var(--g)_+_15*var(--s))] top-[calc(50%_+_149*var(--s))] px-[20px] [font-size:16px] leading-[50px]",
              "max1024:left-[calc(var(--g)_+_12*var(--s))] max1024:top-[calc(50%_+_123*var(--s))] max1024:px-[calc(17*var(--s))] max1024:[font-size:calc(13*var(--s))] max1024:leading-[calc(41*var(--s))]",
              "max778:left-[calc(var(--g)_+_15*var(--s))] max778:top-[calc(50%_+_98*var(--s))] max778:px-[calc(18*var(--s))] max778:pt-[calc(2*var(--s))] max778:pb-[calc(4*var(--s))] max778:[font-size:calc(16*var(--s))] max778:leading-[calc(32*var(--s))]",
              "max479:top-[calc(50%_+_62*var(--s))] max479:px-[calc(20*var(--s))] max479:pt-0 max479:pb-[calc(2*var(--s))] max479:[font-size:calc(14*var(--s))] max479:leading-[calc(35*var(--s))]",
              rise[2]
            )}
          >
            Discover More
          </Link>
        </div>
      </div>
    </section>
  );
}
