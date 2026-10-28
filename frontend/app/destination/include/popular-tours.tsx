import Link from "next/link";
import { allTours } from "../../home/include/catalog";
import TourCard from "../../home/include/tour-card";
import { btnBlue, container, cx, Heading } from "../../home/include/ui";

/** First three catalogue tours on a soft background, with a link to the full list. */
export default function PopularTours() {
  return (
    <section className="bg-soft py-[120px] max1024:py-[90px] max767:py-[70px]">
      <div className={container}>
        <Heading tag="Popular Tours" title="Most Booked This Season" center className="mb-[54px]" />
        <div className="grid grid-cols-[repeat(3,1fr)] gap-[30px] max1024:grid-cols-[1fr_1fr] max767:grid-cols-[1fr]">
          {allTours.slice(0, 3).map((t) => (
            <TourCard key={t.slug} tour={t} />
          ))}
        </div>
        <div className="mt-[50px] text-center">
          <Link href="/tours-page" className={cx(btnBlue)}>
            View All Tours <i className="fa-solid fa-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}
