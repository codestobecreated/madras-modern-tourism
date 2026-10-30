/* eslint-disable @next/next/no-img-element */
import { allTours } from "./catalog";
import { asset } from "./data";
import TourCard from "./tour-card";
import { container, cx, Heading } from "./ui";

export default function FeaturedTours() {
  return (
    <section className={cx("relative pt-[60px] pb-[80px] max1024:pt-[50px] max1024:pb-[70px] max767:pt-[40px] max767:pb-[60px] [background:#f2f5f9_url(/images/home/tours/tours-pattern.webp)_center_/_cover]")}>
      <img className="absolute right-0 bottom-0 z-0 w-[300px] pointer-events-none" src={asset("tours/tours-globe")} alt="" />
      <div className={cx(container, "relative z-[1]")}>
        <Heading tag="Featured Tours" title="Most Favorite Tour Place" center className="mb-[54px]" />
        <div className="grid grid-cols-[repeat(3,1fr)] gap-[30px] max1024:grid-cols-[1fr_1fr] max767:grid-cols-[1fr]">
          {allTours.slice(0, 3).map((t) => (
            <TourCard key={t.slug} tour={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
