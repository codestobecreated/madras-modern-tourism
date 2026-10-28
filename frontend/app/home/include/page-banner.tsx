/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { container } from "./ui";

/** Page title banner used at the top of every inner page (337px, title and breadcrumb centred). The default art is already tinted navy. */
export default function PageBanner({ title, image = "/images/shared/page-banner.webp" }: { title: string; image?: string }) {
  return (
    <section className="relative h-[337px] overflow-hidden rounded-[16px] max767:h-[240px]">
      <img className="absolute inset-0 w-full h-full max-w-none object-cover" src={image} alt="" />
      <div className={`${container} relative pt-[120px] text-center max767:pt-[80px]`}>
        <h1 className="text-white text-[36px] leading-[43.2px] max767:text-[28px]">{title}</h1>
        <nav aria-label="Breadcrumb" className="mt-[28px] flex items-center justify-center gap-[10px] text-white text-[16px] font-medium leading-[16px]">
          <Link href="/" className="hover:text-orange">Home</Link>
          <i className="fa-solid fa-angle-right text-[12px] text-orange" aria-hidden />
          <span>{title}</span>
        </nav>
      </div>
    </section>
  );
}
