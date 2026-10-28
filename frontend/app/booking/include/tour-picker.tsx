/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { allTours } from "../../home/include/catalog";
import { Heading } from "../../home/include/ui";

const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** Shown when /booking has no (or an unknown) tour: pick one to continue. */
export default function TourPicker({ missing }: { missing: boolean }) {
  return (
    <div>
      <Heading
        tag="Booking"
        title="Choose a tour to book"
        text={missing ? "We couldn't find that tour. Pick one of our current trips below." : "Select a tour to continue with your booking."}
        center
        reveal={false}
      />
      <div className="grid grid-cols-3 gap-[20px] max1024:grid-cols-2 max767:grid-cols-1">
        {allTours.map((t) => (
          <Link
            key={t.slug}
            href={`/booking?tour=${t.slug}`}
            className="flex items-center gap-[15px] p-[12px] rounded-[10px] border border-solid border-line bg-white hover:border-blue hover:[box-shadow:0_10px_20px_rgba(0,0,0,0.08)]"
          >
            <img src={t.image} alt="" loading="lazy" className="w-[80px] h-[80px] shrink-0 rounded-[8px] object-cover" />
            <span className="min-w-0">
              <strong className="block text-navy text-[16px] leading-[1.3]">{t.title}</strong>
              <span className="block mt-[4px] text-[14px]">{t.duration} · from {fmt(t.price)}</span>
            </span>
          </Link>
        ))}
      </div>
      <p className="mt-[40px] text-center text-[15px]">
        Prefer to browse? <Link href="/tours-page" className="text-orange font-semibold hover:text-blue">See all tours</Link>
      </p>
    </div>
  );
}
