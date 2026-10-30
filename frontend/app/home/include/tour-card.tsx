/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Tour } from "./data";
import { TourMedia, TourPrice, WishButton } from "./tour-card-parts";
import { cx, reveal } from "./ui";

// Reference: 109x40 pill, 14px/500, 28.8px line-height.
const bookBtn =
  "inline-flex items-center px-[20px] py-[5.6px] [border:0] rounded-[30px] bg-blue !text-white text-[14px] font-medium leading-[28.8px] whitespace-nowrap hover:bg-orange hover:!text-white";

const metaIcon = "mr-[8px] text-orange";

/** Filled stars in orange over grey ones, like the reference rating. */
export function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex">
      {Array.from({ length: 5 }, (_, i) => (
        <i key={i} className={cx("fa-solid fa-star w-[16px] text-[15px]", i < Math.round(rating) ? "text-orange" : "text-[#d4d8df]")} />
      ))}
    </span>
  );
}

/**
 * Tour card used on the home page and the tour listings; title opens the tour, Book Now opens booking.
 * Cards in a row share one height: the details box and price sit at the bottom of the card.
 */
export default function TourCard({ tour: t, animate = true }: { tour: Tour & { gallery?: string[]; video?: string }; animate?: boolean }) {
  return (
    <article className={cx(animate && reveal, "flex h-full flex-col rounded-[10px] hover:[transform:none]")}>
      <div className="relative h-[308px] shrink-0 overflow-hidden rounded-[10px_10px_0_0] bg-[#ccc]">
        <Link href={`/tours/${t.slug}`}>
          <img src={t.image} alt={t.title} loading="lazy" className="w-full h-full object-cover [transition:transform_0.8s_ease] hover:[transform:scale(1.05)]" />
        </Link>
        {t.badge && (
          <span className="absolute top-[15px] left-[15px] px-[12px] py-[8px] rounded-[20px] bg-orange text-white text-[12px] font-semibold leading-[12px]">{t.badge}</span>
        )}
        <WishButton />
      </div>
      {/* white body overlaps the photo by 16px; the blue video/gallery tab sits on its top edge */}
      <div className="relative flex flex-1 flex-col mt-[-16px] p-[30px] rounded-[0_0_10px_10px] bg-white [box-shadow:0_10px_20px_rgba(0,0,0,0.1)]">
        <TourMedia title={t.title} images={t.gallery?.length ? t.gallery : [t.image]} video={t.video} />
        <h3 className="mb-[15px] text-[21px] leading-[25.2px]"><Link href={`/tours/${t.slug}`} className="hover:text-orange">{t.title}</Link></h3>
        <p className="mb-[20px] text-[15px] leading-[24px]">{t.text}</p>
        <div className="mt-auto mb-[25px] pt-[18px] px-[18px] pb-[12px] border-[0.8px] border-solid border-[#dfdfdf] rounded-[12px] text-body text-[14px] font-medium leading-[28.8px]">
          <div className="flex items-center gap-[2px] mb-[3px] leading-[20px]">
            <Stars rating={t.rating} />
            <span>{t.rating} ({t.reviews} Reviews)</span>
          </div>
          <div className="flex flex-wrap gap-x-[16px] gap-y-0">
            <span><i className={cx("fa-solid fa-clock", metaIcon)} />{t.duration}</span>
            <span><i className={cx("fa-solid fa-users", metaIcon)} />{t.group}</span>
          </div>
          <div className="flex flex-wrap gap-x-[16px] gap-y-0"><span><i className={cx("fa-solid fa-location-dot", metaIcon)} />{t.location}</span></div>
        </div>
        <div className="flex items-end justify-between gap-[10px]">
          <TourPrice tour={t} />
          <Link href={`/booking?tour=${t.slug}`} className={bookBtn}>Book Now</Link>
        </div>
      </div>
    </article>
  );
}
