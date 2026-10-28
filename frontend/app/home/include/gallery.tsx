/* eslint-disable @next/next/no-img-element */
import { gallery } from "./data";
import { cx } from "./ui";

/** Round photo with a "+" overlay; the third photo always shows it, like the reference. */
const photo = cx(
  "group relative block flex-[1_1_0] max-w-[300px] aspect-[275/312] overflow-hidden rounded-[50%]",
  "after:content-['+'] after:absolute after:inset-0 after:flex after:items-center after:justify-center",
  "after:bg-[rgba(16,26,44,0.55)] after:text-white after:text-[40px] after:font-light after:opacity-0 after:[transition:opacity_0.3s_ease]",
  "max1024:basis-[30%] max767:basis-[45%]",
  "hover:after:opacity-100 nth-3:after:opacity-100",
);

export default function Gallery() {
  return (
    <section
      className="flex justify-center gap-[8px] px-[16px] py-[120px] max1024:flex-wrap max1024:gap-[12px] max767:py-[60px]"
      aria-label="Instagram gallery"
    >
      {gallery.map((src, i) => (
        <a href="#" className={photo} key={src} aria-label={`Gallery photo ${i + 1}`}>
          <img
            src={src}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover [transition:transform_0.8s_ease] group-hover:[transform:scale(1.1)]"
          />
        </a>
      ))}
    </section>
  );
}
