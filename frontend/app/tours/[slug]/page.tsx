import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteShell from "../../home/include/site-shell";
import { allTours, findTour } from "../../home/include/catalog";
import { container, section } from "../../home/include/ui";
import Gallery from "./include/gallery";
import TourInfo from "./include/tour-info";
import BookingCard from "./include/booking-card";
import RelatedTours from "./include/related-tours";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return allTours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const tour = findTour((await params).slug);
  return { title: `${tour?.title ?? "Tour not found"} | Madras Modern Tourism`, description: tour?.text };
}

export default async function TourDetailPage({ params }: { params: Params }) {
  const tour = findTour((await params).slug);
  if (!tour) notFound();

  return (
    <SiteShell current="/tours-page" title={tour.title}>
      <section className={section}>
        <div className={container}>
          <div className="grid grid-cols-[1fr_370px] gap-[40px] items-start max1024:grid-cols-1">
            <div className="min-w-0">
              <Gallery images={tour.gallery} title={tour.title} />
              <TourInfo tour={tour} />
            </div>
            <BookingCard tour={tour} />
          </div>
        </div>
      </section>
      <RelatedTours tour={tour} />
    </SiteShell>
  );
}
