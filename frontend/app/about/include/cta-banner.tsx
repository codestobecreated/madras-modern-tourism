/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { cx } from "../../home/include/ui";
import { aboutImg } from "./data";

/** Blue strip that overlaps the testimonials above by 180px; the plane art pokes out on the left. */
export default function CtaBanner() {
  return (
    <section className="relative z-[1] mt-[-180px] h-[319px] pt-[70px] max1024:h-auto max1024:pb-[40px]">
      <img
        className="absolute left-0 top-[-40px] z-[1] w-[424px] h-[359px] object-contain pointer-events-none max1280:top-[10px] max1280:w-[280px] max1280:h-[237px] max1024:hidden"
        src={aboutImg("cta/plane")}
        alt=""
      />
      <div
        className={cx(
          "relative mx-auto max-w-[1200px] min-h-[214px] flex items-center justify-between gap-[30px]",
          "pt-[60px] pr-[15px] pb-[60px] pl-[250px] rounded-[40px_40px_0_0] bg-blue",
          "max1024:mx-[16px] max1024:pl-[40px] max1024:pr-[40px] max767:flex-col max767:items-start max767:pl-[24px] max767:pr-[24px] max767:pt-[40px] max767:pb-[40px]"
        )}
      >
        <h2 className="max-w-[745px] text-white text-[36px] leading-[47px] max767:text-[26px] max767:leading-[34px]">
          Madras Modern Tourism is Tamil Nadu’s Leading Online Tour Booking Platform
        </h2>
        <Link
          href="/tours-page"
          className="mr-[18px] inline-flex shrink-0 items-center px-[30px] py-[18px] rounded-[30px] bg-orange !text-white text-[16px] font-bold leading-[16px] whitespace-nowrap hover:bg-white hover:!text-navy"
        >
          Discover More
        </Link>
      </div>
    </section>
  );
}
