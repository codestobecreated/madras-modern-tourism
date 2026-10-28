import Link from "next/link";
import type { Post } from "../../../home/include/catalog";
import { cx } from "../../../home/include/ui";

const card = "flex-1 min-w-0 p-[20px] rounded-[10px] bg-[#f2f5f9] hover:bg-blue hover:!text-white group/nav";

export default function PostNav({ prev, next }: { prev?: Post; next?: Post }) {
  return (
    <nav aria-label="More articles" className="mt-[30px] flex gap-[20px] max767:flex-col">
      {prev ? (
        <Link href={`/news/${prev.slug}`} className={card}>
          <span className="text-[13px] font-semibold uppercase tracking-[1px]"><i className="fa-solid fa-arrow-left mr-[8px]" />Previous Post</span>
          <h4 className="mt-[6px] text-[18px] leading-[24px] group-hover/nav:!text-white">{prev.title}</h4>
        </Link>
      ) : (
        <span className="flex-1 max767:hidden" />
      )}
      {next ? (
        <Link href={`/news/${next.slug}`} className={cx(card, "text-right")}>
          <span className="text-[13px] font-semibold uppercase tracking-[1px]">Next Post<i className="fa-solid fa-arrow-right ml-[8px]" /></span>
          <h4 className="mt-[6px] text-[18px] leading-[24px] group-hover/nav:!text-white">{next.title}</h4>
        </Link>
      ) : (
        <span className="flex-1 max767:hidden" />
      )}
    </nav>
  );
}
