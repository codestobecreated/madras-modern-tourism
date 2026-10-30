/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { activities } from "../../home/include/catalog";
import { btnBlue, container, cx, Heading, reveal, section } from "../../home/include/ui";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** Short experiences that can be added to any trip; each card leads to the contact form. */
export default function ActivityGrid() {
  return (
    <section className={cx(section, "!pt-[50px] max1024:!pt-[40px] max767:!pt-[32px]")}>
      <div className={container}>
        <Heading
          tag="Activities"
          title="Things To Do Across Tamil Nadu"
          text="Half-day and few-hour experiences you can book on their own or add to any tour."
          center
        />
        <div className="grid grid-cols-[repeat(3,1fr)] gap-[30px] max1024:grid-cols-[1fr_1fr] max767:grid-cols-[1fr]">
          {activities.map((a) => (
            <article key={a.title} className={cx(reveal, "flex flex-col rounded-[10px] bg-white [box-shadow:0_10px_20px_rgba(0,0,0,0.08)]")}>
              <div className="relative h-[230px] rounded-[10px_10px_0_0] bg-[#ccc]">
                <img src={a.image} alt={a.title} loading="lazy" className="w-full h-full rounded-[10px_10px_0_0] object-cover" />
                <span className="absolute bottom-[-28px] right-[30px] inline-flex items-center justify-center w-[56px] h-[56px] rounded-full border-[4px] border-white bg-orange text-white text-[22px]">
                  <i className={a.icon} />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-[30px]">
                <h3 className="text-[22px] leading-[28px] text-navy">{a.title}</h3>
                <p className="mt-[10px] flex-1 text-[15px] font-medium leading-[26px]">{a.text}</p>
                <div className="mt-[18px] flex items-center justify-between border-t border-line pt-[18px] text-[14px] font-medium">
                  <span>
                    <i className="fa-regular fa-clock mr-[8px] text-orange" />
                    {a.duration}
                  </span>
                  <span>
                    From <strong className="text-[18px] text-navy">{inr(a.price)}</strong>
                  </span>
                </div>
                <Link href="/contact" className={cx(btnBlue, "mt-[22px] justify-center !py-[14px]")}>
                  Enquire <i className="fa-solid fa-arrow-right" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
