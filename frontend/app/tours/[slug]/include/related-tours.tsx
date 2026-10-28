import TourCard from "../../../home/include/tour-card";
import { allTours, type TourDetail } from "../../../home/include/catalog";
import { container, Heading, section } from "../../../home/include/ui";

/** Up to three other tours in the same destination or of the same type (topped up with others). */
export default function RelatedTours({ tour }: { tour: TourDetail }) {
  const others = allTours.filter((t) => t.slug !== tour.slug);
  const related = others.filter((t) => t.destination === tour.destination || t.type === tour.type);
  const list = [...related, ...others.filter((t) => !related.includes(t))].slice(0, 3);

  return (
    <section className={`${section} bg-soft`}>
      <div className={container}>
        <Heading tag="You may also like" title="Related tours" center reveal={false} />
        <div className="grid grid-cols-3 gap-[30px] max1024:grid-cols-2 max767:grid-cols-1">
          {list.map((t) => (
            <TourCard key={t.slug} tour={t} animate={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
