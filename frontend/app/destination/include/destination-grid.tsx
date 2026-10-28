/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { allTours, destinations } from "../../home/include/catalog";
import { container, cx, Heading, reveal, section } from "../../home/include/ui";

const tourCount = (slug: string) => allTours.filter((t) => t.destination === slug).length;

/** Every destination as a photo card with its tour count and a link to the filtered tour list. */
export default function DestinationGrid() {
  return (
    <section className={section}>
      <div className={container}>
        <Heading
          tag="Destinations"
          title="Explore Our Holiday Destinations"
          text="Island escapes, city breaks and heritage towns. Pick a place and see every package we run there."
          center
        />
        <div className="grid grid-cols-[repeat(3,1fr)] gap-[30px] max1024:grid-cols-[1fr_1fr] max767:grid-cols-[1fr]">
          {destinations.map((d) => {
            const count = tourCount(d.slug);
            return (
              <article key={d.slug} className={cx(reveal, "overflow-hidden rounded-[10px] bg-white [box-shadow:0_10px_20px_rgba(0,0,0,0.08)]")}>
                <Link href={`/tours-page?destination=${d.slug}`} className="relative block h-[240px] overflow-hidden bg-[#ccc]">
                  <img src={d.image} alt={d.name} loading="lazy" className="w-full h-full object-cover [transition:transform_0.8s_ease] hover:[transform:scale(1.05)]" />
                  <span className="absolute top-[15px] left-[15px] px-[12px] py-[8px] rounded-[20px] bg-orange text-white text-[12px] font-semibold leading-[12px]">
                    {count} {count === 1 ? "Tour" : "Tours"}
                  </span>
                </Link>
                <div className="p-[30px]">
                  <span className="text-[13px] font-semibold tracking-[1px] text-blue">{d.subtitle}</span>
                  <h3 className="mt-[6px] text-[24px] leading-[30px] text-navy">
                    <Link href={`/tours-page?destination=${d.slug}`} className="hover:text-orange">{d.name}</Link>
                  </h3>
                  <p className="mt-[10px] text-[15px] font-medium leading-[26px]">{d.text}</p>
                  <div className="mt-[20px] flex items-center justify-between border-t border-line pt-[18px]">
                    <span className="text-[14px] font-medium">
                      <i className="fa-solid fa-location-dot mr-[8px] text-orange" />
                      {d.country}
                    </span>
                    <Link href={`/tours-page?destination=${d.slug}`} className="text-[15px] font-bold text-navy hover:text-orange">
                      View tours <i className="fa-solid fa-arrow-right ml-[6px]" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
