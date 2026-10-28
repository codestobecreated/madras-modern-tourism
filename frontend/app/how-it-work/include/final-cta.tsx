import Link from "next/link";
import { btn, container, cx } from "../../home/include/ui";

/** Closing call to action that sends visitors to the tour list. */
export default function FinalCta() {
  return (
    <section className="pb-[120px] max1024:pb-[90px] max767:pb-[70px]">
      <div className={container}>
        <div className="rounded-[20px] bg-cream px-[40px] py-[60px] text-center max767:px-[20px] max767:py-[44px]">
          <span className="font-grace text-[26px] text-orange">Ready when you are</span>
          <h2 className="mt-[8px] text-[36px] leading-[46px] max767:text-[26px] max767:leading-[34px]">Find your next Tamil Nadu trip</h2>
          <Link href="/tours-page" className={cx(btn, "mt-[30px]")}>
            Explore Tours <i className="fa-solid fa-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}
