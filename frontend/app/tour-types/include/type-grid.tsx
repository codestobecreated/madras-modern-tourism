import Link from "next/link";
import { allTours, tourTypeList } from "../../home/include/catalog";
import { container, cx, Heading, section } from "../../home/include/ui";

// Cards are links: keep the reveal without its own transition so it doesn't fight `.mmt a { transition: color }`.
const typeReveal =
  "js-reveal opacity-0 [transform:translateY(40px)] [&.in]:opacity-100 [&.in]:[transform:none] motion-reduce:opacity-100 motion-reduce:[transform:none]";

const countFor = (slug: string) => allTours.filter((t) => t.type === slug).length;

/** All tour types; each card opens the tour list filtered by that type. */
export default function TypeGrid() {
  return (
    <section className={section}>
      <div className={container}>
        <Heading tag="Tour Types" title="Travel The Way You Like" text="From ridge treks to temple trails, pick a style and see the matching tours." center />
        <div className="grid grid-cols-[repeat(3,1fr)] gap-[30px] max1024:grid-cols-[1fr_1fr] max767:grid-cols-[1fr]">
          {tourTypeList.map((t) => {
            const count = countFor(t.slug);
            return (
              <Link
                key={t.slug}
                href={`/tours-page?type=${t.slug}`}
                className={cx(
                  typeReveal,
                  "group/type flex flex-col items-center rounded-[20px] border border-[#dfe5ee] bg-white px-[30px] pt-[40px] pb-[34px] text-center hover:border-blue hover:bg-blue"
                )}
              >
                <span className="inline-flex items-center justify-center w-[90px] h-[90px] rounded-full bg-cream text-orange text-[38px] group-hover/type:bg-white">
                  <i className={t.icon} />
                </span>
                <h3 className="mt-[22px] text-[22px] leading-[28px] text-navy group-hover/type:text-white">{t.title}</h3>
                <p className="mt-[8px] text-[15px] font-medium leading-[26px] text-body group-hover/type:text-white">{t.text}</p>
                <span className="mt-[18px] text-[14px] font-semibold text-blue group-hover/type:text-white">
                  {count} {count === 1 ? "Tour" : "Tours"} <i className="fa-solid fa-arrow-right ml-[6px]" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
