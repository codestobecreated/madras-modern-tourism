/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { allPosts, tourTypeList } from "../../home/include/catalog";
import { cx, reveal } from "../../home/include/ui";

const box = cx("p-[30px] rounded-[10px] bg-[#f2f5f9]", reveal);
const boxTitle = "mb-[20px] pb-[12px] border-b border-b-[#e2e8f0] text-[22px] leading-[28px]";

/** Right-hand column shared by the news list and the article page. `exclude` hides the current post. */
export default function NewsSidebar({ exclude }: { exclude?: string }) {
  const recent = allPosts.filter((p) => p.slug !== exclude);
  return (
    <aside className="flex flex-col gap-[30px]">
      <div className={box}>
        <h3 className={boxTitle}>Search</h3>
        {/* Dummy search: no results page yet. */}
        <form role="search" action="/news" className="relative">
          <input
            type="search"
            name="q"
            aria-label="Search articles"
            placeholder="Search articles..."
            className="w-full pl-[20px] pr-[56px] py-[14px] rounded-[30px] border border-[#e2e8f0] bg-white text-navy text-[15px] font-medium outline-none focus:border-blue"
          />
          <button
            type="submit"
            aria-label="Search"
            className="absolute right-[6px] top-[6px] w-[40px] h-[40px] rounded-[50%] bg-blue text-white cursor-pointer hover:bg-orange hover:text-white"
          >
            <i className="fa-solid fa-magnifying-glass" />
          </button>
        </form>
      </div>

      <div className={box}>
        <h3 className={boxTitle}>Recent Posts</h3>
        <ul className="flex flex-col gap-[20px]">
          {recent.map((p) => (
            <li key={p.slug} className="flex items-center gap-[16px]">
              <img src={p.image} alt="" loading="lazy" className="w-[80px] h-[80px] shrink-0 rounded-[8px] object-cover" />
              <div className="min-w-0">
                <span className="text-blue text-[13px] font-semibold">
                  <i className="fa-regular fa-calendar mr-[6px]" />
                  {p.date} {p.month}
                </span>
                <h4 className="text-[16px] leading-[22px]">
                  <Link href={`/news/${p.slug}`} className="hover:text-orange">{p.title}</Link>
                </h4>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={box}>
        <h3 className={boxTitle}>Tour Types</h3>
        <div className="flex flex-wrap gap-[10px]">
          {tourTypeList.map((t) => (
            <Link
              key={t.slug}
              href={`/tours-page?type=${t.slug}`}
              className="px-[16px] py-[6px] rounded-[30px] bg-white text-navy text-[14px] font-semibold hover:bg-orange hover:!text-white"
            >
              {t.title}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
