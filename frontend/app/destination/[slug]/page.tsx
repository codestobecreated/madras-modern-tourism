/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "../../home/include/site-shell";
import TourCard from "../../home/include/tour-card";
import { allTours, destinations, tourTypeList } from "../../home/include/catalog";
import { btn, btnBlue, btnMotion, container, cx, section } from "../../home/include/ui";

type Params = Promise<{ slug: string }>;

const findDestination = (slug: string) => destinations.find((d) => d.slug === slug);
const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const d = findDestination((await params).slug);
  const name = d ? (d.name === d.country ? d.name : `${d.name}, ${d.country}`) : "Destination not found";
  return { title: `${name} | Madras Modern Tourism`, description: d?.text };
}

/** One destination: intro and quick facts, highlights and photos from its packages, the packages themselves, and other destinations. */
export default async function DestinationDetailPage({ params }: { params: Params }) {
  const d = findDestination((await params).slug);
  if (!d) notFound();

  const tours = allTours.filter((t) => t.destination === d.slug);
  const priced = tours.map((t) => t.price).filter((p) => p > 0);
  const from = priced.length ? Math.min(...priced) : 0;
  const lengths = [...new Set(tours.map((t) => t.duration.split(" - ")[0]))];
  const styles = tourTypeList.filter((ty) => tours.some((t) => t.type === ty.slug)).map((ty) => ty.title);
  const highlights = [...new Set(tours.flatMap((t) => t.highlights))].slice(0, 6);
  const photos = [...new Set([d.image, ...tours.flatMap((t) => t.gallery)])].slice(0, 5);
  const others = destinations.filter((o) => o.slug !== d.slug);

  const facts = [
    { icon: "fa-solid fa-suitcase-rolling", label: "Packages", value: String(tours.length) },
    { icon: "fa-solid fa-indian-rupee-sign", label: "Starting from", value: from ? `${fmt(from)} / person` : "On request" },
    { icon: "fa-regular fa-clock", label: "Trip length", value: lengths.join(", ") || "Custom" },
    { icon: "fa-solid fa-compass", label: "Travel style", value: styles.join(", ") || "Custom" },
  ];

  return (
    <SiteShell current="/destination" title={d.name}>
      <section className={cx(section, "!pt-[50px] !pb-[60px] max1024:!pt-[40px] max767:!pt-[32px]")}>
        <div className={container}>
          <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-[40px] items-center max1024:grid-cols-1">
            <div className="relative h-[420px] overflow-hidden rounded-[24px] max767:h-[260px]">
              <img src={d.image} alt={`${d.name}, ${d.country}`} className="w-full h-full object-cover" />
              <span className="absolute left-[18px] bottom-[18px] inline-flex items-center gap-[8px] px-[16px] py-[8px] rounded-[30px] bg-white/90 text-navy text-[14px] font-semibold">
                <i className="fa-solid fa-location-dot text-orange" /> {d.country}
              </span>
            </div>
            <div>
              <span className="text-[13px] font-semibold tracking-[1px] text-blue uppercase">{d.subtitle}</span>
              <h2 className="mt-[6px] text-[40px] leading-[1.15] max767:text-[30px]">{d.name}</h2>
              <p className="mt-[14px] text-[17px] leading-[1.7]">{d.text}</p>
              <div className="mt-[24px] grid grid-cols-2 gap-[12px] max767:grid-cols-1">
                {facts.map((f) => (
                  <div key={f.label} className="flex items-start gap-[12px] p-[14px] rounded-[14px] bg-soft">
                    <span className="inline-flex shrink-0 items-center justify-center w-[40px] h-[40px] rounded-[12px] bg-orange text-white"><i className={f.icon} /></span>
                    <span className="min-w-0">
                      <span className="block text-[12px] uppercase tracking-[0.6px]">{f.label}</span>
                      <strong className="block text-navy text-[15px] leading-[1.4]">{f.value}</strong>
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-[24px] flex flex-wrap gap-[12px]">
                <a href="#packages" className={cx(btnBlue, btnMotion)}>View packages</a>
                <Link href="/custom-tour" className={btn}>Plan a custom trip</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {highlights.length > 0 && (
        <section className="pb-[60px]">
          <div className={container}>
            <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-[30px] max1024:grid-cols-1">
              <div className="p-[30px] rounded-[24px] bg-navy text-white/80 max767:p-[20px]">
                <h2 className="text-white text-[26px]">Highlights of {d.name}</h2>
                <ul className="mt-[18px] grid gap-[12px]">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-start gap-[12px] text-[15px] leading-[1.6]">
                      <i className="fa-solid fa-circle-check mt-[4px] text-orange" /> {h}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-3 grid-rows-2 gap-[12px] h-[100%] min-h-[320px] max767:grid-cols-2 max767:min-h-0">
                {photos.map((src, i) => (
                  <div key={src} className={cx("overflow-hidden rounded-[16px] bg-[#ccc] max767:h-[140px]", i === 0 && "col-span-2 row-span-2 max767:row-span-1 max767:h-[200px]")}>
                    <img src={src} alt={`${d.name} photo ${i + 1}`} loading="lazy" className="w-full h-full object-cover [transition:transform_0.8s_ease] hover:scale-[1.06]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section id="packages" className="py-[70px] bg-soft scroll-mt-[90px] max767:py-[50px]">
        <div className={container}>
          <div className="mb-[30px] flex flex-wrap items-end justify-between gap-[16px]">
            <div>
              <span className="text-[13px] font-semibold tracking-[1px] text-blue uppercase">Holiday packages</span>
              <h2 className="mt-[4px] text-[32px] max767:text-[26px]">{d.name} tour packages</h2>
            </div>
            <Link href={`/tours-page?destination=${d.slug}`} className="text-[15px] font-bold text-navy hover:text-orange">
              Open in tours list <i className="fa-solid fa-arrow-right ml-[6px]" />
            </Link>
          </div>
          {tours.length > 0 ? (
            <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-[30px] max1024:grid-cols-[1fr_1fr] max767:grid-cols-[1fr]">
              {tours.map((t) => <TourCard key={t.slug} tour={t} animate={false} />)}
            </div>
          ) : (
            <p className="text-center">No fixed packages yet. Our planners can build one for you.</p>
          )}
        </div>
      </section>

      <section className="py-[70px] max767:py-[50px]">
        <div className={container}>
          <div className="flex flex-wrap items-center justify-between gap-[20px] p-[34px] rounded-[24px] bg-[linear-gradient(135deg,#015fc9,#014a9e)] text-white max767:p-[22px]">
            <div>
              <h2 className="text-white text-[26px] max767:text-[22px]">Want {d.name} your way?</h2>
              <p className="mt-[6px] text-white/80">Tell us your dates, budget and interests and we&apos;ll build a personalised itinerary.</p>
            </div>
            <Link href="/custom-tour" className={cx(btn, btnMotion)}>Plan my trip</Link>
          </div>

          <h2 className="mt-[60px] mb-[24px] text-[28px] max767:text-[24px]">Other destinations</h2>
          <div className="grid grid-cols-[repeat(5,minmax(0,1fr))] gap-[16px] max1024:grid-cols-[repeat(3,minmax(0,1fr))] max767:grid-cols-[repeat(2,minmax(0,1fr))]">
            {others.map((o) => (
              <Link key={o.slug} href={`/destination/${o.slug}`} className="group/dest relative block h-[180px] overflow-hidden rounded-[18px] bg-[#ccc]">
                <img src={o.image} alt="" loading="lazy" className="w-full h-full object-cover [transition:transform_0.8s_ease] group-hover/dest:scale-[1.08]" />
                <span className="absolute inset-0 bg-[linear-gradient(to_top,rgba(16,26,44,0.75),transparent_60%)]" />
                <span className="absolute left-[14px] bottom-[12px] text-white">
                  <strong className="block text-[17px] leading-[1.2]">{o.name}</strong>
                  <span className="text-[12px] text-white/80">{o.country}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
