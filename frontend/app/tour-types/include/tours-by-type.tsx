import Link from "next/link";
import { allTours, tourTypeList } from "../../home/include/catalog";
import TourCard from "../../home/include/tour-card";
import { container } from "../../home/include/ui";

/** One block per tour type that has tours: up to three cards and a "see all" link. */
export default function ToursByType() {
  const groups = tourTypeList
    .map((type) => ({ type, tours: allTours.filter((t) => t.type === type.slug) }))
    .filter((g) => g.tours.length > 0);

  return (
    <section className="bg-soft py-[100px] max1024:py-[80px] max767:py-[60px]">
      <div className={container}>
        {groups.map(({ type, tours }, i) => (
          <div key={type.slug} className={i > 0 ? "mt-[80px] max767:mt-[60px]" : undefined}>
            <div className="mb-[30px] flex items-end justify-between gap-[20px] max767:flex-col max767:items-start">
              <h2 className="text-[32px] leading-[40px] max767:text-[26px]">
                <i className={`${type.icon} mr-[12px] text-orange`} />
                {type.title} tours
              </h2>
              <Link href={`/tours-page?type=${type.slug}`} className="text-[15px] font-bold text-navy hover:text-orange">
                See all {tours.length} <i className="fa-solid fa-arrow-right ml-[6px]" />
              </Link>
            </div>
            <div className="grid grid-cols-[repeat(3,1fr)] gap-[30px] max1024:grid-cols-[1fr_1fr] max767:grid-cols-[1fr]">
              {tours.slice(0, 3).map((t) => (
                <TourCard key={t.slug} tour={t} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
