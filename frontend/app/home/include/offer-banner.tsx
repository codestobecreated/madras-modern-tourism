/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { asset } from "./data";
import { btnWhite, container, cx } from "./ui";

const bounce = "[animation:mmt-scale-out-3_3.8s_ease_infinite]";

export default function OfferBanner() {
  return (
    <section className="relative min-h-[592px] overflow-hidden bg-blue max1024:min-h-[538px]">
      <img className="absolute inset-0 w-full h-full object-cover pointer-events-none" src={asset("offer/offer-bg")} alt="" />
      <div className={cx(container, "relative grid grid-cols-[1fr_1fr] items-stretch min-h-[592px] max1024:min-h-[538px] max1024:grid-cols-[1fr]")}>
        <div
          className={cx(
            "relative z-[1] [align-self:start] max-w-[450px] pt-[120px] pb-[90px] [color:rgba(255,255,255,0.9)] text-[15px]",
            "max1024:max-w-none max1024:pt-[70px] max1024:pb-[30px]"
          )}
        >
          <span className="font-grace text-orange font-semibold text-[30px] leading-[28px] [letter-spacing:normal] uppercase">Special offer for you</span>
          <h2 className="mt-[10px] mx-0 mb-[2px] text-white text-[40px] leading-[46px] max767:text-[30px]">Let’s Make Your Travel Dreams Come True</h2>
          <p className="mb-[30px] [color:rgba(241,241,241,0.99)] text-[16px] font-medium leading-[30px]">
            Get up to 50% off on hand-picked Tamil Nadu packages when you book this season.
          </p>
          <Link href="/tours-page" className={btnWhite}>Start Booking</Link>
          {/* plane sits behind the copy, like the reference */}
          <img
            className="absolute z-[-1] left-[170px] top-[265px] w-[437px] max-w-none max1024:left-auto max1024:top-auto max1024:right-[-10px] max1024:bottom-[70px] max1024:w-[140px]"
            src={asset("about/about-plane")}
            alt=""
          />
        </div>
        <div className="relative self-stretch max1024:min-h-[420px] max767:min-h-[340px]">
          <img className={cx("absolute top-0 left-[241px] w-[344px] max1024:left-auto max1024:right-0 max1024:w-[62%] max1024:max-w-[344px]", bounce)} src={asset("offer/offer-suitcase")} alt="" />
          <img
            className={cx("absolute top-[1px] left-[-74px] w-[658px] max-w-none max1024:top-auto max1024:bottom-0 max1024:left-[-10%] max1024:w-[104%] max1024:max-w-[620px]", bounce)}
            src={asset("offer/offer-man")}
            alt="Excited traveller with a backpack"
            loading="lazy"
          />
          <img
            className="absolute top-[101px] left-[-93px] w-[196px] [animation:mmt-scale-out-2_5s_ease_infinite] max1024:top-[110px] max1024:left-[-15%] max1024:w-[190px] max767:top-[30px] max767:left-0 max767:w-[100px]"
            src={asset("offer/offer-discount")}
            alt="50% discount"
          />
        </div>
      </div>
    </section>
  );
}
