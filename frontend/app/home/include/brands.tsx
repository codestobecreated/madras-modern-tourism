import { brands } from "./data";
import { container, cx } from "./ui";

export default function Brands() {
  return (
    <section className="pb-[82px]">
      <div className={container}>
        {/* Title sits on a hairline that runs the full container width */}
        <p
          className={cx(
            "relative !mb-[40px] text-navy text-[16px] font-bold tracking-[-0.02em] text-center",
            "before:content-[''] before:absolute before:top-1/2 before:left-0 before:right-0 before:border-t before:border-t-line",
          )}
        >
          <span className="relative px-[20px] bg-white">2k + Brands Trust Us</span>
        </p>
        <div className="flex flex-wrap items-center justify-around gap-[30px]">
          {brands.map((b, i) => (
            <span
              className={cx(
                "inline-flex items-center gap-[6px] text-[30px] font-medium tracking-[-0.03em] [transition:color_0.3s_ease] max767:text-[22px] hover:text-ink",
                i === 2 ? "text-ink" : "text-[#b6bcc8]",
              )}
              key={`${b}-${i}`}
            >
              <i className="fa-solid fa-leaf text-[20px]" />
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
