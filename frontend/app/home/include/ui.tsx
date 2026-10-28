// Shared Tailwind class sets and the section heading used across the home page.

/** Join class names, skipping falsy values. */
export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

export const container = "w-full max-w-[1202px] mx-auto px-[16px]";

/** Default section spacing: 120/90, 90 at ≤1024, 70 at ≤767. */
export const section = "pt-[120px] pb-[90px] max1024:py-[90px] max767:py-[70px]";

/** Handwritten accent font. */
export const script = "font-grace text-orange font-normal";

/**
 * Pill buttons. `<a>` buttons only transition their text colour (like the design),
 * real `<button>`s also ease background and lift — add `btnMotion` for those.
 */
const btnBase =
  "inline-flex items-center gap-[10px] px-[30px] py-[18px] [border:0] rounded-[30px] text-[16px] font-bold leading-none whitespace-nowrap hover:[transform:translateY(-2px)]";
export const btn = `${btnBase} bg-orange !text-white hover:bg-blue hover:!text-white`;
export const btnBlue = `${btnBase} bg-blue !text-white hover:bg-orange hover:!text-white`;
export const btnWhite = `${btnBase} bg-white !text-navy hover:bg-orange hover:!text-white`;
export const btnMotion = "[transition:background_0.25s_ease,transform_0.25s_ease]";

/** Fades/slides in when `.in` is added by <RevealOnScroll />. */
export const reveal =
  "js-reveal opacity-0 [transform:translateY(40px)] [transition:opacity_0.9s_ease,transform_0.9s_ease] [&.in]:opacity-100 [&.in]:[transform:none] motion-reduce:opacity-100 motion-reduce:[transform:none]";

export const pill =
  "inline-flex items-center gap-[8px] px-[20px] py-[8px] rounded-[30px] bg-[#f1f5fa] text-navy text-[13px] font-semibold leading-[28px] tracking-[1px] uppercase";

export const headingTitle = "mt-[16px] text-[clamp(32px,3.5vw,50px)] leading-[1.2] max767:text-[30px] max767:[&_br]:hidden";
export const headingText = "mt-[20px] max-w-[560px] text-body text-[16px] font-medium leading-[30px]";

type HeadingProps = {
  tag: string;
  title: React.ReactNode;
  text?: string;
  center?: boolean;
  reveal?: boolean;
  /** Replace (not extend) the default classes of each part when a section needs different sizing. */
  className?: string;
  titleClassName?: string;
  textClassName?: string;
  children?: React.ReactNode;
};

export function Heading({ tag, title, text, center, reveal: withReveal = true, className, titleClassName, textClassName, children }: HeadingProps) {
  return (
    <div className={cx(className ?? "mb-[50px]", center && "text-center", withReveal && reveal)}>
      <span className={pill}><i className="fa-solid fa-plane text-blue" />{tag}</span>
      <h2 className={titleClassName ?? headingTitle}>{title}</h2>
      {text && <p className={cx(textClassName ?? headingText, center && "mx-auto")}>{text}</p>}
      {children}
    </div>
  );
}
