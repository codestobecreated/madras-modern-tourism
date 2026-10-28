import Link from "next/link";
import { btnWhite, container, cx } from "../../home/include/ui";

/** Blue strip pointing visitors from single activities to full tours. */
export default function ActivitiesCta() {
  return (
    <section className="pb-[120px] max1024:pb-[90px] max767:pb-[70px]">
      <div className={container}>
        <div className="flex items-center justify-between gap-[30px] rounded-[20px] bg-blue px-[60px] py-[50px] max1024:px-[40px] max767:flex-col max767:items-start max767:px-[24px] max767:py-[36px]">
          <div>
            <span className="font-grace text-[24px] text-white">Want more than a few hours?</span>
            <h2 className="mt-[6px] text-[32px] leading-[42px] !text-white max767:text-[24px] max767:leading-[32px]">
              Combine activities into a full guided tour
            </h2>
          </div>
          <Link href="/tours-page" className={cx(btnWhite, "shrink-0")}>
            Browse Tours <i className="fa-solid fa-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}
