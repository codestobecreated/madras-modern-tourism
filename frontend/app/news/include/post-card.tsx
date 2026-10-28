/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Post } from "../../home/include/catalog";
import { cx, reveal } from "../../home/include/ui";

/** News list card, same look as the home page blog cards plus an excerpt. */
export default function PostCard({ post: p }: { post: Post }) {
  const href = `/news/${p.slug}`;
  return (
    <article className={cx("group/post flex flex-col overflow-hidden rounded-[10px] bg-[#f2f5f9]", reveal)}>
      <Link href={href} className="relative block h-[245px] overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          className="w-full h-full object-cover [transition:transform_0.35s_ease] group-hover/post:[transform:scale(1.1)]"
        />
        <span className="absolute left-[30px] bottom-0 px-[16px] py-[4px] rounded-[8px_8px_0_0] bg-blue text-white text-[12px] font-semibold">
          <b className="text-[20px] font-bold leading-[20px]">{p.date}</b> {p.month}
        </span>
      </Link>
      <div className="flex-1 p-[30px]">
        <span className="text-[14px] font-medium leading-[14px]">
          <i className="fa-regular fa-circle-user mr-[6px] text-blue" />
          {p.author}
        </span>
        <h3 className="mt-[10px] text-[22px] leading-[30px]">
          <Link href={href} className="hover:text-orange">{p.title}</Link>
        </h3>
        <p className="mt-[12px] text-[15px] font-medium leading-[26px]">{p.excerpt}</p>
      </div>
      <Link
        href={href}
        className="flex items-center justify-between px-[30px] py-[16px] border-t border-t-[#e2e8f0] !text-[#666] text-[14px] font-semibold hover:!text-orange"
      >
        Read More <i className="fa-solid fa-arrow-right" />
      </Link>
    </article>
  );
}
