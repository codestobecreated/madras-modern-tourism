/* eslint-disable @next/next/no-img-element */
import { asset } from "../../home/include/data";
import { container, cx, Heading, reveal } from "../../home/include/ui";

const reasons = [
  { icon: "fa-solid fa-user-shield", title: "Verified local guides", text: "Every guide is licensed and reviewed by past travellers." },
  { icon: "fa-solid fa-indian-rupee-sign", title: "Clear pricing", text: "One price per person with entries and transport included." },
  { icon: "fa-solid fa-rotate-left", title: "Free cancellation", text: "Cancel up to 48 hours before the start for a full refund." },
  { icon: "fa-solid fa-headset", title: "Support on the trip", text: "A planner is a phone call away from pick-up to drop." },
];

/** Photo on the left, four reasons on the right; stacks on small screens. */
export default function WhyBook() {
  return (
    <section className="bg-soft py-[120px] max1024:py-[90px] max767:py-[70px]">
      <div className={cx(container, "grid grid-cols-[1fr_1fr] items-center gap-[60px] max1024:grid-cols-[1fr] max1024:gap-[40px]")}>
        <div className={cx(reveal, "relative")}>
          <img src={asset("tours/tour-hiker")} alt="Travellers on a guided hill walk" className="w-full h-[480px] rounded-[20px] object-cover max767:h-[320px]" />
          <div className="absolute bottom-[30px] left-[30px] rounded-[14px] bg-white px-[24px] py-[16px] [box-shadow:0_10px_20px_rgba(0,0,0,0.1)]">
            <strong className="block text-[28px] leading-none text-navy">4.8/5</strong>
            <span className="text-[14px] font-medium">Average traveller rating</span>
          </div>
        </div>
        <div>
          <Heading
            tag="Why Book With Us"
            title="Trips Planned by Locals Who Know the Way"
            text="We have run tours across Tamil Nadu for years. Here is what you get with every booking."
            className="mb-[36px]"
          />
          <ul className="grid grid-cols-[1fr_1fr] gap-[26px] max767:grid-cols-[1fr]">
            {reasons.map((r) => (
              <li key={r.title} className={cx(reveal, "flex gap-[16px]")}>
                <span className="inline-flex shrink-0 items-center justify-center w-[54px] h-[54px] rounded-[14px] bg-white text-orange text-[22px] [box-shadow:0_6px_14px_rgba(0,0,0,0.06)]">
                  <i className={r.icon} />
                </span>
                <div>
                  <h3 className="text-[18px] leading-[24px]">{r.title}</h3>
                  <p className="mt-[6px] text-[14px] font-medium leading-[24px]">{r.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
