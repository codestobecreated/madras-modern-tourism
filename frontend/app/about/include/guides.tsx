/* eslint-disable @next/next/no-img-element */
import { container, cx, Heading } from "../../home/include/ui";
import { guides } from "./data";

const socials = [
  { icon: "fa-brands fa-facebook-f", label: "Facebook" },
  { icon: "fa-brands fa-twitter", label: "Twitter" },
  { icon: "fa-brands fa-instagram", label: "Instagram" },
  { icon: "fa-brands fa-pinterest", label: "Pinterest" },
];

/** Slanted-top shapes from the reference theme, applied as CSS masks (written out in full so Tailwind sees them). */
const maskFit = "[mask-size:100%] [-webkit-mask-size:100%] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]";
const boxMask = `[mask-image:url(/images/about/guides/mask-box.png)] [-webkit-mask-image:url(/images/about/guides/mask-box.png)] ${maskFit}`;
const accentMask = `[mask-image:url(/images/about/guides/mask-accent.png)] [-webkit-mask-image:url(/images/about/guides/mask-accent.png)] ${maskFit}`;

export default function Guides() {
  return (
    <section className="overflow-hidden pt-[100px] pb-0 max767:pt-[70px]">
      <div className={container}>
        <Heading tag="Our Guide" title="Meet Our Experience Guide" center className="mb-[44px]" />
        <div className="grid grid-cols-[repeat(3,370px)] gap-[30px] max1280:grid-cols-[repeat(3,1fr)] max1024:grid-cols-[1fr_1fr] max767:grid-cols-[1fr]">
          {guides.slice(0, 3).map((g, i) => {
            // the centre card is shown in its active state, like the reference carousel
            const on = i === 1;
            return (
              <article key={g.name} className="group/guide relative mb-[30px]">
                <div className="overflow-hidden rounded-[15px]">
                  <img className="w-full h-[389px] rounded-[15px] object-cover [transition:all_0.35s]" src={g.image} alt={g.name} />
                </div>

                {/* info box pulled 70px up over the photo; 30px right gap shows the photo corner */}
                <div className="relative z-[1] mt-[-70px] pr-[30px]">
                  {/* slanted accent peeking above the box: blue, orange when active */}
                  <span
                    aria-hidden
                    className={cx(
                      "absolute bottom-[30px] left-[30px] right-[50px] min-h-[152px] [transition:all_0.35s]",
                      accentMask,
                      on ? "bg-orange" : "bg-blue group-hover/guide:bg-orange"
                    )}
                  />

                  {/* social icons: hidden until hover (shown on the active card), lifting into a white pill */}
                  <div
                    className={cx(
                      "absolute bottom-full left-[40px] mb-[-65px] z-[2] p-[10px] rounded-[30px] bg-white [transition:all_0.35s]",
                      on ? "opacity-100 [transform:none]" : "opacity-0 [transform:translateY(30px)] group-hover/guide:opacity-100 group-hover/guide:[transform:none]"
                    )}
                  >
                    <div
                      className={cx(
                        "relative z-[-1] [transition:all_0.35s]",
                        on ? "[transform:none]" : "[transform:translateY(30px)] group-hover/guide:[transform:none]"
                      )}
                    >
                      {socials.map((s) => (
                        <a
                          key={s.label}
                          href="#"
                          aria-label={`${g.name} on ${s.label}`}
                          className="flex items-center justify-center w-[36px] h-[36px] mb-[5px] rounded-[50%] bg-[#f2f5f9] text-navy text-[14px] [transition:all_0.35s] hover:bg-orange hover:text-white"
                        >
                          <i className={s.icon} />
                        </a>
                      ))}
                    </div>
                  </div>

                  <div
                    className={cx(
                      "relative flex items-end w-full min-h-[159px] overflow-hidden pt-[40px] pr-[10px] pb-[20px] pl-[25px] rounded-[0_20px_20px_20px]",
                      "[box-shadow:0_4px_25px_rgba(0,0,0,0.06)] [transition:all_0.35s]",
                      boxMask,
                      on ? "bg-blue" : "bg-[#f2f5f9] group-hover/guide:bg-blue"
                    )}
                  >
                    <div>
                      <h4 className={cx("text-[18px] leading-[21.6px] [transition:all_0.35s]", on ? "text-white" : "group-hover/guide:text-white")}>{g.name}</h4>
                      <span className={cx("block text-[14px] font-medium leading-[28.8px] [transition:all_0.35s]", on ? "text-white" : "text-body group-hover/guide:text-white")}>{g.role}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
