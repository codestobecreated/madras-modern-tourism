/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { posts } from "./data";
import { allPosts } from "./catalog";
import { Heading, container, cx, reveal, section } from "./ui";

// The card's own `transition: all` lost to the reveal transition in the design, so only `reveal` sets it.
const post = cx("group/post flex flex-col overflow-hidden rounded-[10px] bg-[#f2f5f9]", reveal);

export default function Blog() {
  return (
    <section className={section} id="news">
      <div className={container}>
        <Heading tag="Articles" title={<>Latest News & Articles from<br />the Blog Posts</>} center />
        <div className="grid grid-cols-[repeat(3,1fr)] gap-[28px] max1024:grid-cols-[1fr_1fr] max767:grid-cols-[1fr]">
          {posts.map((p, i) => (
            <article className={post} key={p.title}>
              <div className="relative h-[245px] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover [transition:transform_0.35s_ease] group-hover/post:[transform:scale(1.1)]"
                />
                <span className="absolute left-[30px] bottom-0 px-[16px] py-[4px] rounded-[8px_8px_0_0] bg-blue text-white text-[12px] font-semibold">
                  <b className="text-[20px] font-bold leading-[20px]">{p.date}</b> {p.month}
                </span>
              </div>
              <div className="flex-1 p-[30px]">
                <div className="flex gap-[20px] text-[14px] font-medium leading-[14px]">
                  <span><i className="fa-regular fa-circle-user mr-[6px] text-blue [transition:color_0.35s_ease] group-hover/post:text-orange" />admin</span>
                  <span><i className="fa-regular fa-comments mr-[6px] text-blue [transition:color_0.35s_ease] group-hover/post:text-orange" />0 Comments</span>
                </div>
                <h3 className="mt-[10px] text-[22px] leading-[30px]"><Link href={`/news/${allPosts[i]?.slug ?? ""}`} className="hover:text-orange">{p.title}</Link></h3>
              </div>
              <Link
                href={`/news/${allPosts[i]?.slug ?? ""}`}
                className="flex items-center justify-between px-[30px] py-[16px] border-t border-t-[#e2e8f0] !text-[#666] text-[14px] font-semibold hover:!text-orange"
              >
                Read More <i className="fa-solid fa-arrow-right" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
