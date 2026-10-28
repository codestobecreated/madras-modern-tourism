/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { btn, container, cx, Heading, reveal } from "../../home/include/ui";
import { knowUs } from "./data";

export default function GetToKnow() {
  const f = knowUs.feature;
  return (
    <section className="py-[120px] max1024:py-[90px] max767:py-[70px]">
      <div className={cx(container, "grid grid-cols-[492px_minmax(0,1fr)] gap-[60px] max1024:grid-cols-[1fr]")}>
        <div className={cx("relative", reveal)}>
          {/* dotted plane path beside the heading */}
          <img className="absolute top-0 right-0 w-[183px] h-[174px] pointer-events-none max767:hidden" src={knowUs.shape} alt="" />
          <Heading
            reveal={false}
            tag="Get to know us"
            title="Experience the World with Our Company"
            titleClassName="mt-[8px] max-w-[350px] text-[50px] leading-[60px] max767:text-[30px] max767:leading-[38px] max767:max-w-none"
            text={knowUs.text}
            textClassName="max-w-none text-body text-[16px] font-medium leading-[30px]"
            className="mb-[30px]"
          />

          {/* round photo overlapping the left edge of the grey feature box */}
          <div className="relative flex items-center min-h-[147px] max767:flex-col max767:items-start">
            <img className="relative z-[1] w-[126px] h-[126px] rounded-[50%] object-cover" src={f.image} alt="" />
            <div className="absolute left-[64px] right-0 top-0 bottom-0 pt-[30px] pr-[30px] pb-[30px] pl-[93px] rounded-[6px] bg-[#f2f5f9] max767:static max767:mt-[-63px] max767:w-full max767:pt-[80px] max767:pl-[30px]">
              <h4 className="text-[20px] leading-[24px]">{f.title}</h4>
              <p className="mt-[15px] text-[16px] font-medium leading-[24px]">{f.text}</p>
            </div>
          </div>

          <ul className="mt-[30px] mb-[23px]">
            {knowUs.checks.map((c, i) => (
              <li key={c} className={cx("flex items-center gap-[8px] text-navy text-[16px] font-medium leading-[28.8px]", i > 0 && "mt-[10px]")}>
                <i className="fa-solid fa-circle-check text-blue text-[18px]" />
                {c}
              </li>
            ))}
          </ul>
          <Link href="/about" className={btn}>Explore More</Link>
        </div>

        {/* photos: big one top-left with an orange caption tab, badge top-right, small one overlapping bottom-right */}
        <div className={cx("relative min-h-[712px] max1024:min-h-[620px] max767:min-h-[460px]", reveal)}>
          <div className="absolute top-0 left-0 w-[440px] max767:w-[75%]">
            <img className="w-full h-[493px] rounded-[30px] object-cover max767:h-[320px]" src={knowUs.photoMain} alt="Tamil Nadu coastline" />
            <p className="ml-[50px] w-[390px] pt-[20px] pb-[20px] px-[30px] rounded-[0_0_0_30px] bg-orange text-white text-[20px] font-semibold leading-[28.8px] max767:w-auto">
              {knowUs.photoMainCaption}
            </p>
          </div>
          <img className="absolute top-[60px] right-0 w-[148px] h-[151px] object-contain max767:w-[100px] max767:h-auto" src={knowUs.badge} alt="Up to 50% off" />
          <img
            className="absolute top-[331px] right-0 w-[307px] h-[381px] rounded-[30px] object-cover border-[6px] border-white max767:top-auto max767:bottom-0 max767:w-[55%] max767:h-[260px]"
            src={knowUs.photoSmall}
            alt="Hiker above the clouds"
          />
        </div>
      </div>
    </section>
  );
}
