/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Stars } from "../../home/include/tour-card";
import { TourPrice, WishButton } from "../../home/include/tour-card-parts";
import type { TourDetail } from "../../home/include/catalog";
import { cx, reveal } from "../../home/include/ui";

const metaIcon = "mr-[8px] text-orange";
const smallBtn = "inline-flex items-center px-[20px] py-[6px] rounded-[30px] text-[14px] font-medium leading-[28px] whitespace-nowrap";

/** One horizontal tour row: photo on the left, details and actions on the right. */
export default function TourRow({ tour: t }: { tour: TourDetail }) {
  return (
    <article className={cx(reveal, "grid grid-cols-[370px_1fr] overflow-hidden rounded-[10px] bg-white [box-shadow:0_10px_20px_rgba(0,0,0,0.1)] max767:grid-cols-1")}>
      <div className="relative min-h-[280px] overflow-hidden bg-[#ccc] max767:h-[240px] max767:min-h-0">
        <Link href={`/tours/${t.slug}`}>
          <img src={t.image} alt={t.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover [transition:transform_0.8s_ease] hover:[transform:scale(1.05)]" />
        </Link>
        {t.badge && (
          <span className="absolute top-[15px] left-[15px] px-[12px] py-[8px] rounded-[20px] bg-orange text-white text-[12px] font-semibold leading-[12px]">{t.badge}</span>
        )}
        <WishButton />
      </div>
      <div className="flex flex-col p-[30px] max767:p-[24px]">
        <div className="flex items-center gap-[6px] text-[14px] font-medium">
          <Stars rating={t.rating} />
          <span>{t.rating} ({t.reviews} Reviews)</span>
        </div>
        <h3 className="mt-[10px] text-[23px] leading-[1.3]">
          <Link href={`/tours/${t.slug}`} className="hover:text-orange">{t.title}</Link>
        </h3>
        <p className="mt-[10px] text-[15px] leading-[26px]">{t.text}</p>
        <div className="mt-[15px] flex flex-wrap gap-x-[20px] gap-y-[4px] text-[14px] font-medium">
          <span><i className={cx("fa-solid fa-clock", metaIcon)} />{t.duration}</span>
          <span><i className={cx("fa-solid fa-users", metaIcon)} />{t.group}</span>
          <span><i className={cx("fa-solid fa-location-dot", metaIcon)} />{t.location}</span>
        </div>
        <div className="flex-1 min-h-[20px]" />
        <div className="pt-[20px] flex flex-wrap items-end justify-between gap-[15px] border-t border-solid border-line">
          <TourPrice tour={t} />
          <div className="flex flex-wrap gap-[10px]">
            <Link href={`/tours/${t.slug}`} className={cx(smallBtn, "border border-solid border-blue text-blue hover:bg-blue hover:text-white")}>View Details</Link>
            <Link href={`/booking?tour=${t.slug}`} className={cx(smallBtn, "bg-blue !text-white hover:bg-orange hover:!text-white")}>Book Now</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
