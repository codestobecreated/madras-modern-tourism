/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { aboutChecks, aboutFeatures, asset } from "./data";
import { btn, cx, Heading, headingText, headingTitle } from "./ui";

/*
 * Get To Know Us. From 1200px the row starts 15px from the left and its right edge
 * lines up with the 1170px container; images take 55%, text 45% (with 32px left padding).
 * The 620px photo group moves right as the screen widens (76px into its column at 1440).
 */
const row = cx(
  "w-full max-w-[1202px] mx-auto px-[16px] grid grid-cols-[1fr_1fr] gap-[45px] [align-items:start]",
  "max1024:grid-cols-[1fr]",
  "min1200:max-w-none min1200:m-0 min1200:pl-[15px] min1200:pr-[max(16px,calc((100%_-_1170px)_/_2))] min1200:grid-cols-[55%_45%] min1200:gap-0"
);

const images = cx(
  "relative min-h-[740px]",
  "max1199:w-auto max1199:ml-0 max1024:max-w-[620px] max767:min-h-[480px]",
  "min1200:w-[620px] min1200:ml-[calc(76px_+_(100%_-_709px)_*_0.77)]"
);

const mainImg = cx(
  "absolute top-0 left-0 w-[570px] h-[611px] object-cover object-center rounded-[40px] [transition:scale_5s_ease] hover:[scale:1.05]",
  "max1199:w-[92%] max1199:h-[540px] max767:w-[88%] max767:h-[380px]"
);

const discountImg = cx(
  "absolute top-[175px] left-[400px] right-auto w-[155px] [animation:mmt-scale-out-2_3s_ease_infinite]",
  "max1199:left-auto max1199:right-[4%] max767:top-[90px] max767:right-[14%] max767:w-[100px]"
);

// Grows from 333px at 1440; light frame only on the top and left edges.
const smallImg = cx(
  "absolute top-auto right-0 bottom-[8px] left-auto w-[clamp(300px,calc(333px_+_(100vw_-_1440px)_*_0.0574),380px)] h-auto aspect-[360/290] object-cover",
  "border-solid border-[#f2f5f9] border-t-[15px] border-r-0 border-b-0 border-l-[15px] rounded-[40px] [transition:scale_5s_ease] hover:[scale:1.05]",
  "max1199:w-[55%] max767:w-[60%] max767:bottom-0 max767:border-t-[8px] max767:border-l-[8px]"
);

const palmsImg = cx(
  "absolute bottom-[-12px] left-[-140px] w-[560px] pointer-events-none",
  "max1199:left-[-40px] max1199:w-[400px] max767:left-[-20px] max767:w-[250px]"
);

export default function About() {
  return (
    <section className="relative overflow-hidden pt-0 pb-[110px] max1024:py-[90px] max767:py-[70px]">
      <img className="absolute right-[3%] bottom-0 w-[190px] opacity-60 pointer-events-none" src={asset("about/about-tower")} alt="" />
      <div className={row}>
        <div className={images}>
          <img className={mainImg} src={asset("about/about-couple")} alt="Couple planning a trip with a map" loading="lazy" />
          <img className={discountImg} src={asset("about/about-discount")} alt="50% discount" />
          <img className={smallImg} src={asset("about/about-beach")} alt="Beach lounge" loading="lazy" />
          <img className={palmsImg} src={asset("about/about-palms")} alt="" />
        </div>
        <div className="min1200:pl-[32px]">
          <Heading
            reveal={false}
            tag="Get to know us"
            title="Experience Tamil Nadu with Our Company"
            text="From the shores of Marina Beach to the misty Nilgiris, we design trips that let you slow down, eat well and see the real South India."
            className="mb-[50px] min1200:mb-[30px]"
            titleClassName={`${headingTitle} min1200:mt-[10px]`}
            textClassName={`${headingText} min1200:max-w-none`}
          />
          <div className="grid grid-cols-[1fr_1fr] my-[30px] pb-[30px] border-b border-solid border-b-[#dfdfdf] max767:grid-cols-[1fr] max767:gap-[24px] min1200:mt-0">
            {aboutFeatures.map((f, i) => (
              <div
                className={cx(
                  i > 0 && "pl-[34px] border-l border-solid border-l-[#dfdfdf] max767:pl-0 max767:[border-left-width:0] max767:[border-left-style:none] min1200:pl-[41px]"
                )}
                key={f.title}
              >
                <div className="flex items-center gap-[16px] mb-[14px]">
                  <span className="inline-flex flex-[0_0_70px] items-center justify-center h-[70px] rounded-[50%] bg-blue text-white text-[28px]"><i className={f.icon} /></span>
                  <h4 className="text-[20px] leading-[25px]">{f.title}</h4>
                </div>
                <p className="text-[16px] font-medium leading-[30px]">{f.text}</p>
              </div>
            ))}
          </div>
          <div className="flex items-start gap-[93px] max767:flex-col max767:gap-[24px]">
            <div className="flex flex-[0_0_180px] flex-col items-center justify-center gap-[16px] h-[201px] p-[20px] border border-solid border-[#dfdfdf] rounded-[30px] bg-[#fdf8f4] text-navy text-[16px] font-bold leading-[1.2] tracking-[-0.02em] text-center">
              <i className="fa-solid fa-trophy text-blue text-[50px]" />
              <span>Award Winning Agency</span>
            </div>
            <div>
              <ul className="mb-[30px]">
                {aboutChecks.map((c, i) => (
                  <li key={c} className={cx("flex items-center gap-[12px] text-navy text-[16px] font-medium leading-[20px]", i > 0 && "mt-[15px]")}>
                    <i className="fa-solid fa-circle-check text-blue" />{c}
                  </li>
                ))}
              </ul>
              <Link href="/about" className={btn}>Explore More</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
