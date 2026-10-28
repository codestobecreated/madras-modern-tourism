import Link from "next/link";
import TourCard from "../../home/include/tour-card";
import { allTours, destinations, tourTypeList } from "../../home/include/catalog";
import { btnBlue, container, cx, Heading, section } from "../../home/include/ui";

/** All tours in a 3-column grid, optionally narrowed by `?destination=` / `?type=`. */
export default function ToursGrid({ destination, type }: { destination?: string; type?: string }) {
  const tours = allTours.filter((t) => (!destination || t.destination === destination) && (!type || t.type === type));
  const destName = destination && (destinations.find((d) => d.slug === destination)?.name ?? destination);
  const typeName = type && (tourTypeList.find((t) => t.slug === type)?.title ?? type);
  const filtered = Boolean(destName || typeName);

  return (
    <section className={section}>
      <div className={container}>
        <Heading tag="Holiday Packages" title="Find your next tour" text="Bali, Kuala Lumpur and Vietnam packages with hotels, transfers and sightseeing included." center reveal={false} />

        {filtered && (
          <div className="mb-[40px] flex flex-wrap items-center justify-center gap-[10px] text-[15px]">
            <span className="text-navy font-semibold">Showing tours for:</span>
            {destName && (
              <span className="inline-flex items-center gap-[8px] px-[16px] py-[6px] rounded-[30px] bg-soft text-navy font-medium">
                <i className="fa-solid fa-location-dot text-orange" />{destName}
              </span>
            )}
            {typeName && (
              <span className="inline-flex items-center gap-[8px] px-[16px] py-[6px] rounded-[30px] bg-soft text-navy font-medium">
                <i className="fa-solid fa-tag text-orange" />{typeName}
              </span>
            )}
            <Link href="/tours-page" className="inline-flex items-center gap-[6px] text-orange font-semibold hover:text-blue">
              <i className="fa-solid fa-xmark" />Clear
            </Link>
          </div>
        )}

        {tours.length > 0 ? (
          <div className={cx("grid grid-cols-3 gap-[30px] max1024:grid-cols-2 max767:grid-cols-1")}>
            {tours.map((t) => (
              <TourCard key={t.slug} tour={t} animate={false} />
            ))}
          </div>
        ) : (
          <div className="py-[60px] text-center">
            <i className="fa-solid fa-map-location-dot text-[48px] text-blue" />
            <h3 className="mt-[20px] text-[24px]">No tours found</h3>
            <p className="mt-[10px] text-[16px]">We don&apos;t have a packaged tour here yet, but our planners can build one for you.</p>
            <div className="mt-[30px] flex flex-wrap justify-center gap-[15px]">
              <Link href="/tours-page" className={btnBlue}>See all tours</Link>
              <Link href="/contact" className="inline-flex items-center px-[30px] py-[18px] rounded-[30px] border border-solid border-line text-navy font-bold leading-none hover:text-orange">Contact us</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
