/* eslint-disable @next/next/no-img-element */
import type { Post } from "../../../home/include/catalog";
import { cx, reveal } from "../../../home/include/ui";

const shares = [
  { icon: "fa-brands fa-facebook-f", label: "Share on Facebook" },
  { icon: "fa-brands fa-x-twitter", label: "Share on X" },
  { icon: "fa-brands fa-whatsapp", label: "Share on WhatsApp" },
  { icon: "fa-brands fa-linkedin-in", label: "Share on LinkedIn" },
];

export default function Article({ post: p }: { post: Post }) {
  return (
    <article className={reveal}>
      <img src={p.image} alt={p.title} className="w-full h-[460px] rounded-[10px] object-cover max767:h-[260px]" />
      <div className="mt-[24px] flex flex-wrap gap-[24px] text-[14px] font-medium">
        <span><i className="fa-regular fa-calendar mr-[6px] text-blue" />{p.date} {p.month}</span>
        <span><i className="fa-regular fa-circle-user mr-[6px] text-blue" />{p.author}</span>
      </div>
      <h2 className="mt-[12px] text-[34px] leading-[44px] max767:text-[26px] max767:leading-[34px]">{p.title}</h2>
      <p className="mt-[16px] text-navy text-[18px] font-semibold leading-[30px]">{p.excerpt}</p>
      {p.body.map((para, i) => (
        <p key={i} className="mt-[16px] text-[16px] font-medium leading-[30px]">{para}</p>
      ))}

      <div className={cx("mt-[36px] py-[20px] border-y border-y-[#e2e8f0] flex flex-wrap items-center gap-[14px]")}>
        <span className="text-navy text-[16px] font-bold">Share:</span>
        {shares.map((s) => (
          <a
            key={s.label}
            href="#"
            aria-label={s.label}
            className="flex items-center justify-center w-[40px] h-[40px] rounded-[50%] bg-[#f2f5f9] text-navy hover:bg-orange hover:!text-white"
          >
            <i className={s.icon} />
          </a>
        ))}
      </div>
    </article>
  );
}
